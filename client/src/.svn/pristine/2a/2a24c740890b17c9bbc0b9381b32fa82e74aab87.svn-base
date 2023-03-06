/**
 * Created by xiaofu on 2017/8/31.
 */
var DDZCardDelegate = {

    dealTouchBegin: function (ddzRoom ,touch, event) {
        var touchPoint = null;
        if (SdkUtil.is316Engine()){
            touchPoint = touch.getTouchBeganPosition();
        }else{
            touchPoint = touch.getLocation();
        }
        ddzRoom._touchBeganX = touchPoint.x;
        ddzRoom._startX = touchPoint.x;
        var length = ddzRoom._cards.length;
        ddzRoom._startId = -1;
        ddzRoom._currentlyMoveId = -1;
        for(var i=0;i<length;i++){
            var card = ddzRoom._cards[i];
            if(this.hitTest(card,touchPoint)){
                if(card.cardId>ddzRoom._startId){
                    ddzRoom._startId = card.cardId;
                    ddzRoom._currentlyMoveId = card.cardId;
                }
            }
        }
        if(ddzRoom._startId>=0){
            ddzRoom._cards[ddzRoom._startId].touched();
            return true;
        }

        return false;
    },

    hitTest: function (target,point){
        if (SdkUtil.is316Engine()){
            return target.hitTest(point,cc.Camera.getVisitingCamera(),null);
        }else{
            return target.hitTest(point);
        }
    },

    dealTouchMove: function (ddzRoom ,touch, event) {
        var touchPoint = null;
        if (SdkUtil.is316Engine()){
            touchPoint = touch.getTouchMovePosition();
        }else{
            touchPoint = touch.getLocation();
        }
        ddzRoom._isLeft2Right = (touchPoint.x>ddzRoom._startX);
        ddzRoom._isLeft2RightWithBegan = (touchPoint.x>ddzRoom._touchBeganX);

        // cc.log("dealTouchMove===",JSON.stringify())
        // 
        // cc.log("dealTouchMove===",touchPoint.x,ddzRoom._startX,ddzRoom._touchBeganX)
        ddzRoom._startX = touchPoint.x;

        var length = ddzRoom._cards.length;
        var endedId = -1;
        for(var i=0;i<length;i++){
            var card = ddzRoom._cards[i];
            if(this.hitTest(card,touchPoint)){
                if(card.cardId > endedId)
                    endedId = card.cardId;
            }
        }
        if(endedId < 0){
            if(ddzRoom._isLeft2Right){
                if(touchPoint.x>(ddzRoom._cards[length-1].x+100))//过滤掉边缘
                    endedId = DdzAI.MAX_CARD-1;
            }else{
                if(ddzRoom._cards[0] && touchPoint.x<ddzRoom._cards[0].x)
                    endedId = 0;
            }
            if(endedId<0)
                return;
        }
        for(var i=0;i<length;i++){
            var card = ddzRoom._cards[i];
            if(ddzRoom._isLeft2Right){
                if(card.cardId>=ddzRoom._currentlyMoveId && card.cardId<=endedId){
                    if(card.cardId==ddzRoom._startId && this.hitTest(card,touchPoint) && card.isEnable()){
                        //noting to do
                    }else{
                        ddzRoom._currentlyMoveId = card.cardId;
                        card.onTouchMove(ddzRoom._isLeft2Right);
                    }
                }
            }else{
                if(card.cardId>=endedId && card.cardId<=ddzRoom._currentlyMoveId){
                    if(card.cardId==endedId && this.hitTest(card,touchPoint) && card.isEnable()){
                        //noting to do
                    }else{
                        ddzRoom._currentlyMoveId = card.cardId;
                        card.onTouchMove(ddzRoom._isLeft2Right);
                    }
                }
            }
        }
    },

    dealTouchEnded: function (ddzRoom ,touch, event) {
        ddzRoom._allCards.length = 0;
        var touchPoint = null;
        if (SdkUtil.is316Engine()){
            touchPoint = touch.getTouchEndPosition();
        }else{
            touchPoint = touch.getLocation();
        }

        //cc.log("dealTouchEnded===",JSON.stringify(touchPoint));

        var length = ddzRoom._cards.length;
        var endedId = -1;
        for(var i=0;i<length;i++){
            var card = ddzRoom._cards[i];
            if(this.hitTest(card,touchPoint)){
                if(card.cardId > endedId)
                    endedId = card.cardId;
            }
        }

        //是否单击
        var hasSelectCards = false;
        for(var i=0;i<length;i++) {
            var card = ddzRoom._cards[i];
            if(card.isSelected()){
                hasSelectCards = true;
                break;
            }
        }

        if(endedId < 0){
            endedId = ddzRoom._isLeft2RightWithBegan ? DdzAI.MAX_CARD-1 : 0;
        }

        // cc.log("ddzRoom._isLeft2RightWithBegan===",ddzRoom._isLeft2RightWithBegan,endedId)

        for(var i=0;i<length;i++){
            var card = ddzRoom._cards[i];
            if(ddzRoom._isLeft2RightWithBegan){
                if(card.cardId>=ddzRoom._startId && card.cardId<=endedId)
                    card.touched();
            }else{
                if(card.cardId>=endedId && card.cardId<=ddzRoom._startId)
                    card.touched();
            }
        }
        var allCards = [];
        for (var i = 0; i < ddzRoom._cards.length; i++) {
            var card = ddzRoom._cards[i];
            card.clearDirect();
            if(card.isTouched()){
                card.selectAction();
            }
            card.untouched();
            if(card.isSelected())
                allCards.push(card.getData());
        }


        if(!hasSelectCards) {
            var removeCards = this.filterShunZi(allCards);
            for (var i = 0; i < removeCards.length; i++) {
                for (var j = 0; j < ddzRoom._cards.length; j++) {
                    var card = ddzRoom._cards[j];
                    if (card._cardVo.c == removeCards[i].c) {
                        card.selectAction();
                    }
                }
            }
        }

        ddzRoom._allCards = allCards;

        ddzRoom.isCanLetOut();
        AudioManager.play("res/audio/common/audio_card_click.mp3");
    },


    shunZiCondition : function(firstCard,lastCard,length,numberCount){
        return (((lastCard.i - firstCard.i) == 4 && length<=8 ) ||    //5顺
        ((lastCard.i - firstCard.i) == 5 && length <= 9 && numberCount == 6) ||  //6顺
        ((lastCard.i - firstCard.i) == 6 && length <= 10 && numberCount == 7) || //7顺
        ((lastCard.i - firstCard.i) == 7 && length <= 12 && numberCount == 8) || //8顺
        ((lastCard.i - firstCard.i) == 8 && length <= 14 && numberCount == 9) || //9顺
        ((lastCard.i - firstCard.i) == 9 && length <= 16 && numberCount == 10)|| //10
        ((lastCard.i - firstCard.i) == 10 && length <= 16 && numberCount == 11)|| //11
        ((lastCard.i - firstCard.i) == 11 && length <= 16 && numberCount == 12));
    },

    //筛选顺子
    filterShunZi:function(selectedCards){
        selectedCards.sort(DdzAI._sortByIndex);
        var length = selectedCards.length;
        var firstCard = selectedCards[0];
        var lastCard =  selectedCards[length-1];
        var temp = {};
        var maxCount = 1;//同数字牌的数量
        var numberCount = 0;//不同数字的牌的数量
        var maxTimesCardId = 0;//出现次数最多的牌的大小
        for(var i=0;i<length;i++){
            var card = selectedCards[i];
            if(temp[card.i]){
                temp[card.i] += 1;
                if(parseInt(temp[card.i]) > maxCount){
                    maxCount = parseInt(temp[card.i]);
                    maxTimesCardId = card.i;
                }
            }else{
                numberCount++;
                temp[card.i] = 1;
            }
        }
        var removeCards = [];
        if(numberCount>=5 && length>=5 && lastCard.i <= 14 && this.shunZiCondition(firstCard,lastCard,length,numberCount)){
            if(maxCount>=1 && maxCount<4){
                var indexI = [];
                for(var cardI in temp){
                    if(temp[cardI]==2 || temp[cardI]==3){
                        indexI.push(cardI);
                    }
                }
                for(var i=0;i<selectedCards.length;i++){
                    for(var j=0;j<indexI.length;j++) {
                        if (selectedCards[i].i == indexI[j]) {
                            var card = selectedCards.splice(i, 1);
                            ArrayUtil.merge(card,removeCards);
                        }
                    }
                }

            }
        }
        return removeCards;
    },

}