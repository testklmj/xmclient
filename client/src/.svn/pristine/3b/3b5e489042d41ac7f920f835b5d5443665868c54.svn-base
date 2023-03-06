/**
 * Created by xiaofu on 2017/8/31.
 */
var BBTCardDelegate = {

    dealTouchBegin: function (pdkRoom ,touch, event) {
        var touchPoint = null;
        if (SdkUtil.is316Engine()){
            touchPoint = touch.getTouchBeganPosition();
        }else{
            touchPoint = touch.getLocation();
        }
        pdkRoom._touchBeganX = touchPoint.x;
        pdkRoom._startX = touchPoint.x;
        var length = pdkRoom._cards.length;
        pdkRoom._startId = -1;
        pdkRoom._currentlyMoveId = -1;
        for(var i=0;i<length;i++){
            var card = pdkRoom._cards[i];
            if(this.hitTest(card,touchPoint)){
                if(card.cardId>pdkRoom._startId){
                    pdkRoom._startId = card.cardId;
                    pdkRoom._currentlyMoveId = card.cardId;
                }
            }
        }
        if(pdkRoom._startId>=0){
            pdkRoom._cards[pdkRoom._startId].touched();
            return true;
        }else{
            pdkRoom._allCards.length = 0;
            pdkRoom.enableAllCards();
            pdkRoom.unSelectAllCards();
            BBTRoomModel.prompt(null);
            pdkRoom.changeLetOutButton(false);
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

    dealTouchMove: function (pdkRoom ,touch, event) {
        var touchPoint = null;
        if (SdkUtil.is316Engine()){
            touchPoint = touch.getTouchMovePosition();
        }else{
            touchPoint = touch.getLocation();
        }
        pdkRoom._isLeft2Right = (touchPoint.x>pdkRoom._startX);
        pdkRoom._isLeft2RightWithBegan = (touchPoint.x>pdkRoom._touchBeganX);
        pdkRoom._startX = touchPoint.x;
        var length = pdkRoom._cards.length;
        var endedId = -1;
        for(var i=0;i<length;i++){
            var card = pdkRoom._cards[i];
            if(this.hitTest(card,touchPoint)){
                if(card.cardId > endedId)
                    endedId = card.cardId;
            }
        }
        if(endedId < 0){
            if(pdkRoom._isLeft2Right){
                if(touchPoint.x>(pdkRoom._cards[length-1].x+100))//过滤掉边缘
                    endedId = AI.MAX_CARD-1;
            }else{
                if(touchPoint.x<pdkRoom._cards[0].x)
                    endedId = 0;
            }
            if(endedId<0)
                return;
        }
        for(var i=0;i<length;i++){
            var card = pdkRoom._cards[i];
            if(pdkRoom._isLeft2Right){
                if(card.cardId>=pdkRoom._currentlyMoveId && card.cardId<=endedId){
                    if(card.cardId==pdkRoom._startId && this.hitTest(card,touchPoint) && card.isEnable()){
                        //noting to do
                    }else{
                        pdkRoom._currentlyMoveId = card.cardId;
                        card.onTouchMove(pdkRoom._isLeft2Right);
                    }
                }
            }else{
                if(card.cardId>=endedId && card.cardId<=pdkRoom._currentlyMoveId){
                    if(card.cardId==endedId && this.hitTest(card,touchPoint) && card.isEnable()){
                        //noting to do
                    }else{
                        pdkRoom._currentlyMoveId = card.cardId;
                        card.onTouchMove(pdkRoom._isLeft2Right);
                    }
                }
            }
        }
    },

    dealTouchEnded: function (pdkRoom ,touch, event) {
        pdkRoom._allCards.length = 0;
        var touchPoint = null;
        if (SdkUtil.is316Engine()){
            touchPoint = touch.getTouchEndPosition();
        }else{
            touchPoint = touch.getLocation();
        }
        var length = pdkRoom._cards.length;
        var endedId = -1;
        for(var i=0;i<length;i++){
            var card = pdkRoom._cards[i];
            if(this.hitTest(card,touchPoint)){
                if(card.cardId > endedId)
                    endedId = card.cardId;
            }
        }
        if(endedId < 0){
            endedId = pdkRoom._isLeft2RightWithBegan ? AI.MAX_CARD-1 : 0;
        }
        for(var i=0;i<length;i++){
            var card = pdkRoom._cards[i];
            if(pdkRoom._isLeft2RightWithBegan){
                if(card.cardId>=pdkRoom._startId && card.cardId<=endedId)
                    card.touched();
            }else{
                if(card.cardId>=endedId && card.cardId<=pdkRoom._startId)
                    card.touched();
            }
        }
        var allCards = [];
        for (var i = 0; i < pdkRoom._cards.length; i++) {
            var card = pdkRoom._cards[i];
            card.clearDirect();
            if(card.isTouched()){
                card.selectAction();
            }
            card.untouched();
            if(card.isSelected())
                allCards.push(card.getData());
        }
        pdkRoom._allCards = allCards;
        pdkRoom.isCanLetOut();
        AudioManager.play("res/audio/common/audio_card_click.mp3");
    },

}