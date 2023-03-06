/**
 * 卡牌的数据映射
 * @type {{t: number, n: number, i: number, c: number}}
 */
var CardVo = {
    t:0,//花色
    n:0,//数字
    i:0, //大小排序
    c:0 //后台索引
};

/**
 * 牌型
 * @type {{type: number, sortedCards: Array.<CardVo>, length: number, minIndex: number, maxIndex: number, planeCount: number, maxCount: number}}
 */
var CardPattern = {
    type:0,//牌型
    sortedCards:[],//排序好了的牌
    length:0,//牌的数量
    minIndex:0,//最小的牌(针对飞机)
    maxIndex:0,//最大数量牌的大小
    planeCount:0,//飞机的个数
    maxCount:0//同样的牌最大的数量
}

var BBTAI = {
    SINGLE:1,//单张
    PAIR:2,//对子
    THREE:3,//三个带
    FOURDAISAN:4,//四带三
    SHUNZI:5,//顺子
    LIANDUI:6,//连队
    PLANE:7,//飞机带翅膀
    WUSHIK:8,//五十k
    BOMB:9,//炸弹
    TONGHUASHUN:10,//同花顺
    DIZHA:11, //地炸
    KING:12,//大小王炸弹
    MAX_CARD:16,

    CARDS:[
        //方片
        {t:1,n:1,i:14,c:114},
        {t:1,n:2,i:15,c:115},
        {t:1,n:3,i:3,c:103},
        {t:1,n:4,i:4,c:104},
        {t:1,n:5,i:5,c:105},
        {t:1,n:6,i:6,c:106},
        {t:1,n:7,i:7,c:107},
        {t:1,n:8,i:8,c:108},
        {t:1,n:9,i:9,c:109},
        {t:1,n:10,i:10,c:110},
        {t:1,n:11,i:11,c:111},
        {t:1,n:12,i:12,c:112},
        {t:1,n:13,i:13,c:113},
        //梅花
        {t:2,n:1,i:14,c:214},
        {t:2,n:2,i:15,c:215},
        {t:2,n:3,i:3,c:203},
        {t:2,n:4,i:4,c:204},
        {t:2,n:5,i:5,c:205},
        {t:2,n:6,i:6,c:206},
        {t:2,n:7,i:7,c:207},
        {t:2,n:8,i:8,c:208},
        {t:2,n:9,i:9,c:209},
        {t:2,n:10,i:10,c:210},
        {t:2,n:11,i:11,c:211},
        {t:2,n:12,i:12,c:212},
        {t:2,n:13,i:13,c:213},
        //红桃
        {t:3,n:1,i:14,c:314},
        {t:3,n:2,i:15,c:315},
        {t:3,n:3,i:3,c:303},
        {t:3,n:4,i:4,c:304},
        {t:3,n:5,i:5,c:305},
        {t:3,n:6,i:6,c:306},
        {t:3,n:7,i:7,c:307},
        {t:3,n:8,i:8,c:308},
        {t:3,n:9,i:9,c:309},
        {t:3,n:10,i:10,c:310},
        {t:3,n:11,i:11,c:311},
        {t:3,n:12,i:12,c:312},
        {t:3,n:13,i:13,c:313},
        //黑桃
        {t:4,n:1,i:14,c:414},
        {t:4,n:2,i:15,c:415},
        {t:4,n:3,i:3,c:403},
        {t:4,n:4,i:4,c:404},
        {t:4,n:5,i:5,c:405},
        {t:4,n:6,i:6,c:406},
        {t:4,n:7,i:7,c:407},
        {t:4,n:8,i:8,c:408},
        {t:4,n:9,i:9,c:409},
        {t:4,n:10,i:10,c:410},
        {t:4,n:11,i:11,c:411},
        {t:4,n:12,i:12,c:412},
        {t:4,n:13,i:13,c:413},
        //大小王
        {t:5,n:16,i:16,c:516},
        {t:5,n:17,i:17,c:517}
        //{t:4,n:2,i:14,c:516},
        //{t:4,n:2,i:15,c:517}

    ],

    /**
     * 获取牌的定义对象
     * @param id
     * @returns {CardVo}
     */
    getCardDef:function(id){
        var res = null;
        for(var i=0;i<this.CARDS.length;i++){
            var card = this.CARDS[i];
            if(card.c == id){
                res = card;
                break;
            }
        }
        return res;
    },

    /**
     * 洗牌
     * @returns {Array.<CardVo>}
     */
    shuffle:function(){
        var cards = ArrayUtil.shuffle(ArrayUtil.clone(this.CARDS));
        return cards;
    },

    /**
     * 按大小排序
     * @param card1 {CardVo}
     * @param card2 {CardVo}
     * @private
     * @return {number}
     */
    _sortByIndex:function(card1,card2){
        return card1.i-card2.i;
    },

    /**
     * 获得牌型的对象
     * @param type 牌型
     * @param sortedCards 排序好了的牌
     * @param length 牌的数量
     * @param maxIndex 最大的牌
     * @param maxCount 相同牌的最大数量
     * @param minIndex 最小的牌(针对飞机)
     * @param planeCount 飞机的个数
     * @returns {CardPattern}
     * @private
     */
    _newCardPattern:function(type,sortedCards,maxIndex,maxCount,needMaxIndex,minIndex,planeCount,yanse){
        if(maxIndex>needMaxIndex){
            if(type == this.WUSHIK){
               // cc.log("maxIndex"+maxIndex);
            }
            return {type:type,sortedCards:sortedCards,length:sortedCards.length,maxIndex:maxIndex,minIndex:minIndex,planeCount:planeCount,maxCount:maxCount,yanse:yanse};
        }
        return null;
    },

    /**
     * 筛选牌型
     * @param selectedCards {Array.<CardVo>}
     * @param currentlyCards {Array.<CardVo>}
     * @param lastCards {CardPattern}
     * @return {CardPattern}
     */
    filterCards:function(selectedCards,currentlyCards,lastCards){
        currentlyCards = currentlyCards || [];
        var length = selectedCards.length;
        if(length==0)
            return null;
        selectedCards.sort(this._sortByIndex);
        var maxNeedIndex = lastCards ? lastCards.maxIndex : 0;
        var maxNeedPaixingIndex = lastCards ? lastCards.type : 0;
        //天王炸
        if(length == 1 && (selectedCards[0].c == 517))
        {
            return this._newCardPattern(this.KING, selectedCards,1,0,0);
        }
        //单张
        if(length == 1){
            if(BBTRoomModel.mySeat){
                //if(BBTRoomModel.isNextSeatBt() && currentlyCards.length>0){
                //    if(selectedCards[0].i == currentlyCards[0].i)
                //        return this._newCardPattern(this.SINGLE,selectedCards,selectedCards[0].i,1,maxNeedIndex);
                //}else{
                //    return this._newCardPattern(this.SINGLE,selectedCards,selectedCards[0].i,1,maxNeedIndex);
                //}
                return this._newCardPattern(this.SINGLE,selectedCards,selectedCards[0].i,1,maxNeedIndex);
            }else{
                //if(PlayBackModel.isNextSeatBt() && currentlyCards.length>0){
                //    if(selectedCards[0].i == currentlyCards[0].i)
                //        return this._newCardPattern(this.SINGLE,selectedCards,selectedCards[0].i,1,maxNeedIndex);
                //}else{
                //    return this._newCardPattern(this.SINGLE,selectedCards,selectedCards[0].i,1,maxNeedIndex);
                //}
                return this._newCardPattern(this.SINGLE,selectedCards,selectedCards[0].i,1,maxNeedIndex);
            }
        }
        var firstCard = selectedCards[0];
        var lastCard =  selectedCards[length-1];
        var temp = {};
        var maxCount = 1;//同数字牌的数量
        var numberCount = 0;//不同数字的牌的数量
        for(var i=0;i<length;i++){
            var card = selectedCards[i];
            if(temp[card.i]){
                temp[card.i] += 1;
                if(parseInt(temp[card.i]) > maxCount)
                    maxCount = parseInt(temp[card.i]);
            }else{
                numberCount++;
                temp[card.i] = 1;
            }
        }
        var yanseTemp = {};
        var maxyanseCount = 1;
        var yanseCount = 0;
        for(var i=0; i<length; i++){
            var card = selectedCards[i];
            if(yanseTemp[card.t]){
                yanseTemp[card.t] += 1;
                if(parseInt(yanseTemp[card.t]) > maxyanseCount)
                    maxyanseCount = parseInt(yanseTemp[card.t]);
            }else{
                yanseCount++;
                yanseTemp[card.t] = 1;
            }

        }
       // cc.log("maxyanseCount"+maxyanseCount +"length"+length);
        //顺子 必须5张起，最大只能到A
        if(length>=5 && maxCount==1 && lastCard.i <= 14 && maxyanseCount != length){
            if((lastCard.i-firstCard.i) == (length-1) && (!lastCards || length==lastCards.length))
                return this._newCardPattern(this.SHUNZI,selectedCards,lastCard.i,maxCount,maxNeedIndex);
        }else if(length>=5 && maxCount==1 && lastCard.i <= 14 && maxyanseCount == length){
            if((lastCard.i-firstCard.i) == (length-1)){
                if(!lastCards || lastCards.type < this.TONGHUASHUN){
                    maxNeedIndex = 0;
                }else if(lastCards.type == this.TONGHUASHUN){
                    if(length > lastCards.length || (lastCard.i == maxNeedIndex && lastCard.t >lastCards.sortedCards[0].t)){
                        maxNeedIndex = 0;
                    }else if(length == lastCard.length && selectedCards[length -1] == maxNeedIndex && selectedCards[0].c > lastCard.yanse){
                        maxNeedIndex = 0;
                    }
                }
               // cc.log("11111maxNeedIndex"+maxNeedIndex);
                return this._newCardPattern(this.TONGHUASHUN,selectedCards,lastCard.i,maxCount,maxNeedIndex,0,0,selectedCards[0].t);
            }

        }
        var pairCount = 0;//连对数量
        var planeCount = 0;//三个带数量
        var maxIndex = 0;//最大的一张牌
        var planeMinCard = 100;
        var planeMaxCard = 0;
        var planeArray = [];
        for(var key in temp){
            var tempKey = parseInt(key);
            var tempVal = parseInt(temp[key]);
            if(tempVal == 2)
                pairCount++;
            if(tempVal >= 3)
                planeArray.push(tempKey);
            if (tempVal == maxCount && tempKey > maxIndex)
                maxIndex = tempKey;
        }
        //对子or连对
        if(length%2 == 0 && maxCount==2){
            //对子
            if(numberCount == 1 && (!lastCards || lastCards.length==2))
                return this._newCardPattern(this.PAIR,selectedCards,lastCard.i,maxCount,maxNeedIndex);
            //连对
            if(pairCount==numberCount && (lastCard.i-firstCard.i) == (numberCount-1) && lastCard.i <= 14 && (!lastCards || lastCards.length==length) && (length>=2 && length<=7))
                return this._newCardPattern(this.LIANDUI,selectedCards,lastCard.i,maxCount,maxNeedIndex);
            //地炸
            if(pairCount==numberCount && (lastCard.i-firstCard.i) == (numberCount-1) && (length>=8)){
                if(!lastCards || lastCards.type < this.DIZHA){
                    maxNeedIndex = 0;
                }else if(lastCards.type == this.DIZHA){
                    if(length > lastCards.length){
                        maxNeedIndex = 0;
                    }
                }
               // cc.log("maxNeedIndex"+maxNeedIndex);
                return this._newCardPattern(this.DIZHA,selectedCards,lastCard.i,maxCount,maxNeedIndex);
            }

        }

        //maxNeedIndex0表示普通五十K 1方块正 2 梅花
        //五十k
        if(length == 3 && (selectedCards[0].i == 5 && selectedCards[1].i == 10 && selectedCards[2].i == 13) ){
            if(!lastCards || lastCards.type < this.WUSHIK){
                maxNeedIndex = 0;
            }else if(lastCards.type == this.WUSHIK){
                if(lastCards.maxIndex == 1){
                    maxNeedIndex = 1;
                }else{
                    //不区分正五十块区最大花色值
                    if((lastCards.sortedCards[0].t == lastCards.sortedCards[1].t) && (lastCards.sortedCards[0].t == lastCards.sortedCards[2].t) && (lastCards.sortedCards[1].t == lastCards.sortedCards[2].t)){
                        maxNeedIndex = 4;
                    }
                }
            }
            if((selectedCards[0].t == selectedCards[1].t) && (selectedCards[0].t == selectedCards[2].t) && (selectedCards[1].t == selectedCards[2].t)){
                if(BBTRoomModel.isQFWSK()){
                    return this._newCardPattern(this.WUSHIK, selectedCards, 1+parseInt(selectedCards[0].t), maxCount,selectedCards[0].t ,selectedCards[0].t);
                }else{
                    return this._newCardPattern(this.WUSHIK, selectedCards, 4, maxCount,maxNeedIndex,1);
                }
            }
            return this._newCardPattern(this.WUSHIK, selectedCards, 1, maxCount,maxNeedIndex,0);
        }
        //炸弹
        if(maxCount == 4 && length==4) {
            if(!lastCards || lastCards.type!=this.BOMB)
                maxNeedIndex = 0;
            if (length == maxCount)
                return this._newCardPattern(this.BOMB, selectedCards, lastCard.i, maxCount,maxNeedIndex);
        }

        if(maxCount == 4 && length <= 7 && length >= 5){
            if(BBTRoomModel.isShowFoudaisan()){
               // cc.log("hahhahaha")
                if(!lastCards || (lastCards.type == this.FOURDAISAN)) {
                    return this._newCardPattern(this.FOURDAISAN, selectedCards, maxIndex, maxCount, maxNeedIndex);
                }
            }
        }
        //三个带
        if(maxCount == 3 || maxCount == 4){
            if(length <= 5){
                if(!lastCards || (lastCards.length<=5 && lastCards.type == this.THREE)) {
                    return this._newCardPattern(this.THREE, selectedCards, maxIndex, maxCount, maxNeedIndex);
                }
            }
            //if(length == maxCount && length==3){//仅3个
            //    return this._newCardPattern(this.THREE, selectedCards, maxIndex, maxCount,maxNeedIndex);
            //}
            //if(length == 4 && currentlyCards.length==4){//3带1
            //    return this._newCardPattern(this.THREE, selectedCards, maxIndex, maxCount,maxNeedIndex);
            //}
            //if(length == 5){//3带2
            //    if(!lastCards || lastCards.length==length)
            //        return this._newCardPattern(this.THREE, selectedCards, maxIndex, maxCount,maxNeedIndex);
            //}
            if(planeArray.length>1){//飞机带翅膀
                maxNeedIndex = 0;
                planeArray = ArrayUtil.sortNumerically(planeArray);
                var planeLength = planeArray.length;
                var planeLengthj = planeLength-1;
                var realPlaneArray = [];
                for(var i=0;i<planeLength;i++){//这里需要排除JJJQQQ带777的情况
                    var next = i+1;
                    var cVal = parseInt(planeArray[i]);
                    var nVal = parseInt(planeArray[next]);
                    if((i<planeLengthj) && Math.abs(cVal-nVal) == 1){
                        planeMinCard = (cVal<planeMinCard) ? cVal : planeMinCard;
                        planeMaxCard = (nVal>planeMaxCard) ? nVal : planeMaxCard;
                        if(ArrayUtil.indexOf(realPlaneArray,cVal)<0)
                            realPlaneArray.push(cVal);
                        if(ArrayUtil.indexOf(realPlaneArray,nVal)<0)
                            realPlaneArray.push(nVal);
                    }
                }
                if(planeMinCard<100 && planeMaxCard>0)
                    planeCount = planeMaxCard-planeMinCard+1;
                var mod = 0;
                if(length<planeCount*5){
                    var planeCeil = Math.ceil(length/5);
                    if(planeCeil<planeCount)
                        mod = planeCeil;
                }else{
                    mod = (length%5==0) ? length/5 : mod;
                }
                if(planeCount>=2){
                    if(mod<planeCount && mod>=2)//JJJQQQ带101010的情况
                        planeCount=mod;
                    if(planeCount<realPlaneArray.length){
                        realPlaneArray = ArrayUtil.sortNumerically(realPlaneArray);
                        planeMinCard = realPlaneArray[realPlaneArray.length-planeCount];
                        planeMaxCard = realPlaneArray[realPlaneArray.length-1];
                    }
                    if(length%5==0 || (length<planeCount*5)){
                        if(!lastCards || lastCards.type == this.PLANE)
                           // cc.log("PLANE");
                            return this._newCardPattern(this.PLANE, selectedCards, planeMaxCard, maxCount, maxNeedIndex,planeMinCard,planeCount);
                    }
                }
            }
        }
        return null;
    },

    /**
     * 是否为有序的数字数组
     * @param array {Array.<number>}
     * @private
     */
    _isSequence:function(array){
        var length = array.length;
        if(length < 2)  return true;
        var start = array[0];
        var end = start+length-1;
        var count = 0;
        for(var i=start;i<end;i++){
            if(array[count] == i)
                count++;
        }
        return (count == length);
    },

    /**
     * 查找连对或者顺子
     * @param cards {Array.<CardVo>}
     * @param seqs {Array.<number>}
     * @param type {number}
     * @return {Array.<number>}
     * @private
     */
    _findShunzi:function(cards,seqs,type){
        var max = (type == this.SHUNZI) ? 1 : 2;
        var temp = {};
        for(var i=0;i<seqs.length;i++){
            var seq = seqs[i];
            for(var j=0;j<cards.length;j++){
                var card = cards[j];
                if(card.i == seq){
                    var t = temp[seq];
                    if(t){
                        if(t.length < max)
                            temp[seq].push(j);
                    }else
                        temp[seq] = [j];
                }
            }
        }
        var result = [];
        var count = 0;
        for(var key in temp){
            if(temp[key].length == max){
                count++;
                ArrayUtil.merge(temp[key],result);
            }
        }
        result = (count == seqs.length) ? result : [];
        return result;
    },

    isTxPx:function(type){
        if(type == this.WUSHIK || type == this.TONGHUASHUN || type == this.DIZHA || type == this.BOMB || type == this.KING){
            return true;
        }
        return false;
    },

    _findTHShunzi:function(cards,seqs,yanse){
        var max = 1;
        var temp = {};
        for(var i=0;i<seqs.length;i++){
            var seq = seqs[i];
            for(var j=0;j<cards.length;j++){
                var card = cards[j];
                if(card.i == seq && card.t == yanse){
                    var t = temp[seq];
                    if(t){
                        if(t.length < max)
                            temp[seq].push(j);
                    }else
                        temp[seq] = [j];
                }
            }
        }
        var result = [];
        var count = 0;
        for(var key in temp){
            if(temp[key].length == max){
                count++;
                ArrayUtil.merge(temp[key],result);
            }
        }
        result = (count == seqs.length) ? result : [];
        return result;
    },

    /**
     * 查找单张
     * @param numberMapping {Object}
     * @param cardsOnHand {Array.<CardVo>}
     * @param lastHand {CardPattern}
     * @param findTimes {number}
     * @private
     */
    _autoSingle:function(numberMap,cardsOnHand,lastHand,findTimes){
        var result = [];
        var length = cardsOnHand.length;
        var maxIndex = BBTRoomModel.promptCardPattern ? BBTRoomModel.promptCardPattern.maxIndex : lastHand.maxIndex;
        //if(BBTRoomModel.isNextSeatBt()){//下家报停的情况
        //    for(var i=0;i<length;i++){
        //        var card = cardsOnHand[i];
        //        if(card.i > maxIndex){
        //            result.push(i);
        //            break;
        //        }
        //    }
        //}else{
            var seqs = [];
            for(var key in numberMap){
                key = parseInt(key);
                var val = parseInt(numberMap[key]);
                var bool = (key>maxIndex && key != 17);
                if(findTimes==1){
                    if(val==1 && bool)
                        seqs.push(key);
                }else{
                    if(val>=1 && val<4 && bool)
                        seqs.push(key);
                }
            }
            if(seqs.length>0){
                seqs = ArrayUtil.sortNumerically(seqs);
                var number = seqs[0];//拿出第一个
               // cc.log("numbernumber"+number);
                for(var i=0;i<cardsOnHand.length;i++){
                    var card = cardsOnHand[i];
                    if(card.i == number && result.length==0){
                        result.push(i);
                        break;
                    }
                }
            }else{
                if(findTimes==1)
                    return this._autoSingle(numberMap,cardsOnHand,lastHand,2);
            }

        return result;
    },

    /**
     * 查找单个对子
     * @param numberMapping {Object}
     * @param cardsOnHand {Array.<CardVo>}
     * @param lastHand {CardPattern}
     * @param findTimes {number}
     * @private
     */
    _autoPair:function(numberMap,cardsOnHand,lastHand,findTimes){
        var maxIndex = BBTRoomModel.promptCardPattern ? BBTRoomModel.promptCardPattern.maxIndex : lastHand.maxIndex;
        var seqs = [];
        for(var key in numberMap){
            key = parseInt(key);
            var val = parseInt(numberMap[key]);
            var bool = key>maxIndex;
            if(findTimes==1){
                if(val==2 && bool)
                    seqs.push(key);
            }else{
                if(val>=2 && val<4 && bool)
                    seqs.push(key);
            }
        }
        var result = [];
        if(seqs.length>0){
            var filter = [];
            seqs = ArrayUtil.sortNumerically(seqs);
            for(var i=0;i<seqs.length;i++){
                var seq = seqs[i];
                if(findTimes==1){
                    var last = seq-1;
                    var next = seq+1;
                    if(ArrayUtil.indexOf(seqs,last)<0 && ArrayUtil.indexOf(seqs,next)<0){//排除连对
                        filter.push(seq);
                        break;
                    }
                }else{
                    filter.push(seq);
                    break;
                }
            }
            if(filter.length==0 && findTimes==1)
                return this._autoPair(numberMap,cardsOnHand,lastHand,2);
            if(filter.length>0){
                var number = filter[0];//拿出第一个
                for(var i=0;i<cardsOnHand.length;i++){
                    var card = cardsOnHand[i];
                    if(card.i == number && result.length<2){
                        result.push(i);
                    }
                }
            }
        }else{
            if(findTimes==1)
                return this._autoPair(numberMap,cardsOnHand,lastHand,2);
        }
        return result;
    },

    /**
     * 通用查找对子、连对、顺子的提示方法
     * @param number {number}
     * @param numberMapping {Object}
     * @param cardsOnHand {Array.<CardVo>}
     * @param lastHand {CardPattern}
     * @private
     */
    _autoSequence:function(number,numberMap,cardsOnHand,lastHand){
        var result = [];
        var seqs = [];
        for(var key in numberMap){
            key = parseInt(key);
            if(parseInt(numberMap[key]) >= number){
                seqs.push(key);
            }
        }
        if(seqs.length > 0){
            var maxIndex = BBTRoomModel.promptCardPattern ? BBTRoomModel.promptCardPattern.maxIndex : lastHand.maxIndex;
            var type = (number==2) ? this.PAIR : this.SHUNZI;
            var sequence = lastHand.length/number;//有几对牌
            var start = maxIndex-sequence+2;//算出最小开始的数字,考虑了连对的情况
            var end = 14;
            for(var i=start;i<=end;i++){
                if((i+sequence-1) <= end){//这里要判断连对是否越界
                    var seqArray = [];
                    for(var j=0;j<sequence;j++){
                        seqArray.push(i+j);
                    }
                    result = this._findShunzi(cardsOnHand,seqArray,type);
                    if(result.length > 0)
                        break;
                }else{
                    break;
                }
            }
        }
        return result;
    },

    /**
     * 查找三个带
     * @param numberMapping {Object}
     * @param cardsOnHand {Array.<CardVo>}
     * @param lastHand {CardPattern}
     * @private
     */
    _autoThree:function(numberMap,cardsOnHand,lastHand){
        var result = [];
        var seqs = [];
        var noSingles = [];
        var maxIndex = BBTRoomModel.promptCardPattern ? BBTRoomModel.promptCardPattern.maxIndex : lastHand.maxIndex;
        for(var key in numberMap){
            key = parseInt(key);
            if(parseInt(numberMap[key]) == 3 && key>maxIndex){
                seqs.push(key);
            }
            //if(parseInt(numberMap[key]) > 1)
            //    noSingles.push(key);
        }
        if(seqs.length > 0){
            seqs = ArrayUtil.sortNumerically(seqs);
            var number = seqs[0];//拿出第一个
            for(var i=0;i<cardsOnHand.length;i++){
                var card = cardsOnHand[i];
                if(card.i == number){
                    result.push(i);
                }
            }
            //var filterFunc = function(findTimes){
            //    for(var i=(cardsOnHand.length-1);i>=0;i--){
            //        if(ArrayUtil.indexOf(result,i) < 0 && result.length<5){
            //            if(findTimes==1){
            //                if(ArrayUtil.indexOf(noSingles,cardsOnHand[i].i) < 0){
            //                    result.push(i);
            //                }
            //            }else{
            //                result.push(i);
            //            }
            //        }
            //    }
            //    if(result.length<5 && findTimes==1){
            //        filterFunc(2);
            //    }
            //}
            //filterFunc(1);
        }
        return result;
    },

    _autoKing:function(numberMap,cardsOnHand,lastHand)
    {
        var result = [];
        for(var i=0;i<cardsOnHand.length;i++){
            var card = cardsOnHand[i];
            if(card.c == 517 ){
                result.push(i);
            }
        }
        if(result.length == 1){
            return result;
        }else{
            return [];
        }
    },

    _autoLongTHX:function(cardsOnHand){
        var result = [];
        var HeiTHXList = [];
        var HongTHXList = [];
        var MeiTHXList = [];
        var FangTHXList = [];

        for(var i=0; i<cardsOnHand.length; i++){
            var card = cardsOnHand[i];
            if(card.t == 1 && card.i != 15){
                FangTHXList.push([i,card.i]);
               // cc.log("card.icard.i"+card.i);
            }else if(card.t == 2 && card.i != 15){
                MeiTHXList.push([i,card.i]);
            }else if(card.t == 3 && card.i != 15){
                HongTHXList.push([i,card.i]);
            }else if(card.t == 4 && card.i != 15){
                HeiTHXList.push([i,card.i]);
            }
        }

        var HeThxReu = [];
        var hetCount = 0;
        for(var i=0; i<HeiTHXList.length; i++){
            for(var j=0; j<HeiTHXList.length; j++) {
                if(i + j + 1 <= HeiTHXList.length - 1){
                    if (HeiTHXList[i + j][1] - HeiTHXList[i + j + 1][1] == 1 ) {
                        hetCount++;
                    }else{
                        if(hetCount>=4){
                            HeThxReu.push([i,hetCount]);
                            hetCount = 0;
                        }else{
                            hetCount = 0;
                            break;
                        }
                    }
                }else{
                    if(hetCount>=4){
                        HeThxReu.push([i,hetCount]);
                    }
                    hetCount = 0;
                    break;
                }
            }
        }

        var HongThxReu = [];
        var hongseCount = 0;
        for(var i=0; i<HongTHXList.length; i++){
            for(var j=0; j<HongTHXList.length; j++) {
                if(i + j + 1 <= HongTHXList.length - 1){
                    if (HongTHXList[i + j][1] - HongTHXList[i + j + 1][1] == 1  ) {
                        hongseCount++;
                    }else{
                        if(hongseCount>=4){
                            HongThxReu.push([i,hongseCount]);
                            hongseCount = 0;
                        }else{
                            hongseCount = 0;
                            break;
                        }
                    }
                }else{
                    if(hongseCount>=4){
                        HongThxReu.push([i,hongseCount]);
                    }
                    hongseCount = 0;
                    break;
                }
            }
        }

        var MeiThxReu = [];
        var meihCount = 0;
        for(var i=0; i<MeiTHXList.length; i++){
            for(var j=0; j<MeiTHXList.length; j++) {
                if(i + j + 1 <= MeiTHXList.length - 1){
                    if (MeiTHXList[i + j][1] - MeiTHXList[i + j + 1][1] == 1 ) {
                        meihCount++;
                    }else{
                        if(meihCount>=4){
                            MeiThxReu.push([i,meihCount]);
                            meihCount = 0;
                        }else{
                            meihCount = 0;
                            break;
                        }
                    }
                }else{
                    if(meihCount>=4){
                        MeiThxReu.push([i,meihCount]);
                    }
                    meihCount = 0;
                    break;
                }
            }
        }

        var FangThxReu = [];
        var fangkCount = 0;
        for(var i=0; i<FangTHXList.length; i++){
            for(var j=0; j<FangTHXList.length; j++) {
                if(i + j + 1 <= FangTHXList.length - 1){
                    if (FangTHXList[i + j][1] - FangTHXList[i + j + 1][1] == 1 ) {
                        fangkCount++;
                    }else{
                        if(fangkCount>=4){
                            FangThxReu.push([i,fangkCount]);
                            fangkCount = 0;
                        }else{
                            fangkCount = 0;
                            break;
                        }
                    }
                }else{
                    if(fangkCount>=4){
                        FangThxReu.push([i,fangkCount]);
                    }
                    fangkCount = 0;
                    break;
                }
            }
        }

        //找到i开头长度为j的同花顺
        for(var i=0;i<HeThxReu.length;i++){
            var obj = HeThxReu[i];
            var startIndex = obj[0];
            var endLength = obj[1];
            for(var j=0;j<cardsOnHand.length;j++){
                var card = cardsOnHand[j];
                if((card.i <= HeiTHXList[startIndex][1] && card.i >= HeiTHXList[startIndex][1]- endLength) && card.t == 4){
                    result.push(j);
                }
            }
        }

        for(var i=0;i<HongThxReu.length;i++){
            var obj = HongThxReu[i];
            var startIndex = obj[0];
            var endLength = obj[1];
            for(var j=0;j<cardsOnHand.length;j++){
                var card = cardsOnHand[j];
                if((card.i <= HongTHXList[startIndex][1] && card.i >= HongTHXList[startIndex][1]- endLength) && card.t == 3){
                    result.push(j);
                }
            }
        }

        for(var i=0;i<MeiThxReu.length;i++){
            var obj = MeiThxReu[i];
            var startIndex = obj[0];
            var endLength = obj[1];
            for(var j=0;j<cardsOnHand.length;j++){
                var card = cardsOnHand[j];
                if((card.i <= MeiTHXList[startIndex][1] && card.i >= MeiTHXList[startIndex][1]- endLength) && card.t == 2){
                    result.push(j);
                }
            }
        }

        for(var i=0;i<FangThxReu.length;i++){
            var obj = FangThxReu[i];
            var startIndex = obj[0];
            var endLength = obj[1];
            for(var j=0;j<cardsOnHand.length;j++){
                var card = cardsOnHand[j];
                if((card.i <= FangTHXList[startIndex][1] && card.i >= FangTHXList[startIndex][1]- endLength) && card.t == 1){
                   // cc.log("card.i"+card.i+"jj"+j);
                    result.push(j);
                }
            }
        }

        return result;
    },

    _autoTHX:function(numberMap,cardsOnHand,lastHand){
        var result = [];
        var seqs = [];
        for(var key in numberMap){
            key = parseInt(key);
            if(parseInt(numberMap[key]) >= 1){
                seqs.push(key);
            }
        }
        var maxIndex = 0;
        if(lastHand || BBTRoomModel.promptCardPattern){
            maxIndex = BBTRoomModel.promptCardPattern ? BBTRoomModel.promptCardPattern.maxIndex : lastHand.maxIndex;
            if(lastHand){
                if(lastHand.type < this.TONGHUASHUN){
                    maxIndex = 0;
                }
            }
            if(BBTRoomModel.promptCardPattern){
                if(BBTRoomModel.promptCardPattern.type < this.TONGHUASHUN){
                    maxIndex = 0;
                }
            }
        }
        cc.log("aaaa"+maxIndex);
        if(seqs.length >= 5){
            var sequence = 5;
            var start = 3;
            var yanse = 1;
            if(maxIndex != 0){
                sequence = lastHand.length;
                start = maxIndex-sequence+1;//算出最小开始的数字,考虑了连对的情况
                yanse = lastHand.sortedCards[0].t + 1;
            }
            var end = 14;
            cc.log("yanseyanse"+yanse);
            switch (yanse){
                case 0:
                case 1:
                    for(var i=start;i<=end;i++) {
                        if ((i + sequence - 1) <= end) {//这里要判断连对是否越界
                            var seqArray = [];
                            for (var j = 0; j < sequence; j++) {
                                seqArray.push(i + j);
                            }
                            result = this._findTHShunzi(cardsOnHand, seqArray, 1);
                            if (result.length == 0) {
                                result = this._findTHShunzi(cardsOnHand, seqArray, 2);
                            } else {
                                return result;
                            }

                            if (result.length == 0) {
                                result = this._findTHShunzi(cardsOnHand, seqArray, 3);
                            } else {
                                return result;
                            }

                            if (result.length == 0) {
                                result = this._findTHShunzi(cardsOnHand, seqArray, 4);
                            } else {
                                return result;
                            }
                            if (result.length > 0) {
                                return result;
                            }
                        } else {
                            break;
                        }
                    }
                    break;
                case 2:
                    for(var i=start;i<=end;i++) {
                        if ((i + sequence - 1) <= end) {//这里要判断连对是否越界
                            var seqArray = [];
                            for (var j = 0; j < sequence; j++) {
                                seqArray.push(i + j);
                            }
                            result = this._findTHShunzi(cardsOnHand, seqArray, 2);
                            if (result.length == 0) {
                                result = this._findTHShunzi(cardsOnHand, seqArray, 3);
                            } else {
                                return result;
                            }

                            if (result.length == 0) {
                                result = this._findTHShunzi(cardsOnHand, seqArray, 4);
                            } else {
                                return result;
                            }
                            if (result.length > 0) {
                                return result;
                            }
                        } else {
                            break;
                        }
                    }
                    break;
                case 3:
                    for(var i=start;i<=end;i++) {
                        if ((i + sequence - 1) <= end) {//这里要判断连对是否越界
                            var seqArray = [];
                            for (var j = 0; j < sequence; j++) {
                                seqArray.push(i + j);
                            }
                            result = this._findTHShunzi(cardsOnHand, seqArray, 3);
                            if (result.length == 0) {
                                result = this._findTHShunzi(cardsOnHand, seqArray, 4);
                            } else {
                                return result;
                            }
                            if (result.length > 0) {
                                return result;
                            }
                        } else {
                            break;
                        }
                    }
                    break;
                case 4:
                    for(var i=start;i<=end;i++) {
                        if ((i + sequence - 1) <= end) {//这里要判断连对是否越界
                            var seqArray = [];
                            for (var j = 0; j < sequence; j++) {
                                seqArray.push(i + j);
                            }
                            result = this._findTHShunzi(cardsOnHand, seqArray, 4);
                            if (result.length > 0) {
                                return result;
                            }
                        } else {
                            break;
                        }
                    }
                    break;
        }
            if(result.length == 0) {
                if (maxIndex != 0) {
                    sequence = lastHand.length;
                    start = maxIndex - sequence + 2;//算出最小开始的数字,考虑了连对的情况
                }
                var end = 14;
                for (var i = start; i <= end; i++) {
                    if ((i + sequence - 1) <= end) {//这里要判断连对是否越界
                        var seqArray = [];
                        for (var j = 0; j < sequence; j++) {
                            seqArray.push(i + j);
                        }
                        result = this._findTHShunzi(cardsOnHand, seqArray, 1);
                        if (result.length == 0) {
                            result = this._findTHShunzi(cardsOnHand, seqArray, 2);
                        } else {
                            return result;
                        }

                        if (result.length == 0) {
                            result = this._findTHShunzi(cardsOnHand, seqArray, 3);
                        } else {
                            return result;
                        }

                        if (result.length == 0) {
                            result = this._findTHShunzi(cardsOnHand, seqArray, 4);
                        } else {
                            return result;
                        }
                        if (result.length > 0) {
                            return result;
                        }
                    } else {
                        break;
                    }
                }
            }
            if(result.length == 0){
                if(lastHand){
                    sequence = lastHand.length +1 ;
                    start = 3;//算出最小开始的数字,考虑了连对的情况
                    for(var i=start;i<=end;i++){
                        if((i+sequence-1) <= end){//这里要判断连对是否越界
                            var seqArray = [];
                            for(var j=0;j<sequence;j++){
                                seqArray.push(i+j);
                            }
                            result = this._findTHShunzi(cardsOnHand,seqArray,1);
                            if(result.length == 0){
                                result = this._findTHShunzi(cardsOnHand,seqArray,2);
                            }else{
                                return result;
                            }

                            if(result.length == 0){
                                result = this._findTHShunzi(cardsOnHand,seqArray,3);
                            }else{
                                return result;
                            }

                            if(result.length == 0){
                                result = this._findTHShunzi(cardsOnHand,seqArray,4);
                            }else{
                                return result;
                            }
                            if(result.length > 0){
                                return result;
                            }
                        }else{
                            break;
                        }
                    }
                }
            }
        }
        return result;
    },

    _findZWSK:function(numberMap,cardsOnHand,lastHand,yanse){
        var ZWSKList = [];
        for(var i=0; i<cardsOnHand.length; i++){
            var card = cardsOnHand[i];
            if(card.t == yanse && (card.i == 13 || card.i == 10 || card.i == 5)){
                ZWSKList.push(i);
            }
        }
        if(ZWSKList.length == 3){
            return ZWSKList;
        }else{
            return [];
        }
    },

    _autoLongHeSWsk:function(cardsOnHand){
        var result = this._findZWSK("",cardsOnHand,"",4);
        return result;
    },
    _autoLongHoSWsk:function(cardsOnHand){
        var result = this._findZWSK("",cardsOnHand,"",3);
        return result;
    },
    _autoLongMhSWsk:function(cardsOnHand){
        var result = this._findZWSK("",cardsOnHand,"",2);
        return result;
    },
    _autoLongFkSWsk:function(cardsOnHand){
        var result = this._findZWSK("",cardsOnHand,"",1);
        return result;
    },
    _autoLongWsk:function(cardsOnHand){
        var result = [];
        for(var i=0;i<cardsOnHand.length;i++){
            var card = cardsOnHand[i];
            if(card.i == 13 || card.i == 10 || card.i == 5){
                result.push(i);
            }
        }
        var temp = {};
        var numberCount = 0;//不同数字的牌的数量
        var realResult = [];
        for(var i=0;i<result.length;i++){
            var card = cardsOnHand[result[i]];
            if(temp[card.i]){
            }else{
                numberCount++;
                temp[card.i] = 1;
                realResult.push(result[i]);
            }
        }

        if(realResult.length == 3 ){
            return realResult;
        }else{
            return [];
        }
    },

    _autoWSK:function(numberMap,cardsOnHand,lastHand)
    {
        var result = [];
        var maxIndex = 0;
        if(lastHand || BBTRoomModel.promptCardPattern){
            maxIndex = BBTRoomModel.promptCardPattern ? BBTRoomModel.promptCardPattern.maxIndex : lastHand.maxIndex;
            if(lastHand){
                if(lastHand.type < this.WUSHIK){
                    maxIndex = 0;
                }
            }
            if(BBTRoomModel.promptCardPattern){
                if(BBTRoomModel.promptCardPattern.type < this.WUSHIK){
                    maxIndex = 0;
                }
            }
        }

        if(lastHand){
            if(lastHand.type == this.WUSHIK){
                maxIndex = lastHand.maxIndex;
            }
        }
        cc.log("22211111bbb"+maxIndex);
        switch (maxIndex){
            case 0:
                for(var i=0;i<cardsOnHand.length;i++){
                    var card = cardsOnHand[i];
                    if(card.i == 13 || card.i == 10 || card.i == 5){
                        result.push(i);
                    }
                }
                var temp = {};
                var numberCount = 0;//不同数字的牌的数量
                var realResult = [];
                for(var i=0;i<result.length;i++){
                    var card = cardsOnHand[result[i]];
                    if(temp[card.i]){
                    }else{
                        numberCount++;
                        temp[card.i] = 1;
                        realResult.push(result[i]);
                    }
                }

                if(realResult.length == 3 ){
                    return realResult;
                }else{
                    return [];
                }
                break;
            case 1:
                var result = this._findZWSK(numberMap,cardsOnHand,lastHand,1);
                if(result.length == 0){
                    result = this._findZWSK(numberMap,cardsOnHand,lastHand,2);
                }
                if(result.length == 0){
                    result = this._findZWSK(numberMap,cardsOnHand,lastHand,3);
                }
                if(result.length == 0){
                    result = this._findZWSK(numberMap,cardsOnHand,lastHand,4);
                }
                cc.log("111result"+result.length);
                return result;
                break;
            case 2:
                var result = this._findZWSK(numberMap,cardsOnHand,lastHand,2);
                if(result.length == 0){
                    result = this._findZWSK(numberMap,cardsOnHand,lastHand,3);
                }
                if(result.length == 0){
                    result = this._findZWSK(numberMap,cardsOnHand,lastHand,4);
                }
                return result;
                break;
            case 3:
                var result = this._findZWSK(numberMap,cardsOnHand,lastHand,3);
                if(result.length == 0){
                    result = this._findZWSK(numberMap,cardsOnHand,lastHand,4);
                }
                return result;
                break;
            case 4:
                var result = this._findZWSK(numberMap,cardsOnHand,lastHand,4);
                return result;
                break;
            case 5:
                return [];
                break;
        }
    },
    _autoLongDizha:function(cardsOnHand){
        var result = [];
        var temp = [];
        for(var i=0;i<cardsOnHand.length;i++){
            var card = cardsOnHand[i];
            if(temp[card.i]){
                temp[card.i] += 1;
            }else{
                temp[card.i] = 1;
            }
        }
        var seqs = [];
        for(var key in temp){
            key = parseInt(key);
            if(parseInt(temp[key]) >= 2 && key<15){
                seqs.push(key);
            }
        }
        //cc.log("ffffffffffff"+seqs.length);
        var dizhaLength = 0;
        if(seqs.length >=4){
            var dizhaList = [];
            for(var i=0; i<seqs.length; i++){
                for(var j=0; j<seqs.length; j++) {
                    //cc.log("iii"+i+"jjj"+j);
                    if(i + j + 1 <= seqs.length - 1){
                        if (seqs[i + j] - seqs[i + j + 1] == -1 ) {
                            dizhaLength++
                        }else {
                            if(dizhaLength>=3){
                               // cc.log("ii"+i+"jj"+dizhaLength);
                                dizhaList.push([i,dizhaLength]);
                                dizhaLength = 0;
                            }else{
                                dizhaLength = 0;
                                break;
                            }
                        }
                    }else{
                        if(dizhaLength>=3){
                            cc.log("i"+i+"j"+dizhaLength);
                            dizhaList.push([i,dizhaLength]);
                            //if( i+j == seqs.length - 1){
                            //    dizhaList.push([i,j]);
                            //}else{
                            //    dizhaList.push([i,j-1]);
                            //}
                        }
                        dizhaLength = 0;
                       break;
                    }
                }
            }
            var numberTemp = [];
            //找到i开头长度为j的地炸
            for(var i=0;i<dizhaList.length;i++){
               var obj = dizhaList[i];
                var startIndex = obj[0];
                var endLength = obj[1];
               // cc.log("startIndex"+startIndex+"endLength"+endLength);
                for(var j=0;j<cardsOnHand.length;j++){
                    var card = cardsOnHand[j];
                   // cc.log("seqs[startIndex]"+seqs[startIndex] + "maxIndex"+(seqs[startIndex] + endLength)+"card.iii"+card.i);
                    if(card.i >= seqs[startIndex] && card.i <= (seqs[startIndex] + endLength) ){
                        if(numberTemp[card.i] && numberTemp[card.i] <= 1){
                            numberTemp[card.i] += 1;
                            result.push(j);
                        }else if(numberTemp[card.i] && numberTemp[card.i] >1){
                        }
                        else{
                            numberTemp[card.i] = 1;
                            result.push(j);
                        }
                    }
                }
            }
            return result;

        }
        return result;
    },

    _autoDizha:function(numberMap,cardsOnHand,lastHand){
         var result = [];
        var seqs = [];
        for(var key in numberMap){
            key = parseInt(key);
            if(parseInt(numberMap[key]) >= 2 && key<15){
                seqs.push(key);
            }
        }
        var maxIndex = 0;
        if(lastHand || BBTRoomModel.promptCardPattern){
            maxIndex = BBTRoomModel.promptCardPattern ? BBTRoomModel.promptCardPattern.maxIndex : lastHand.maxIndex;
            if(lastHand){
                if(lastHand.type < this.DIZHA){
                    maxIndex = 0;
                }
            }
            if(BBTRoomModel.promptCardPattern){
                if(BBTRoomModel.promptCardPattern.type < this.DIZHA){
                    maxIndex = 0;
                }
            }
        }
        if(seqs.length >= 4){
            var type = this.DIZHA;
            var sequence = 4;
            var start = 3;
            if(maxIndex != 0){
                sequence = lastHand.length/2;//有几对牌
                start = maxIndex-sequence+2;//算出最小开始的数字,考虑了连对的情况
            }
            var end = 14;
            for(var i=start;i<=end;i++){
                if((i+sequence-1) <= end){//这里要判断连对是否越界
                    var seqArray = [];
                    for(var j=0;j<sequence;j++){
                        seqArray.push(i+j);
                    }
                    result = this._findShunzi(cardsOnHand,seqArray,type);
                    if(result.length > 0){
                        return result;
                    }
                }else{
                    break;
                }
            }
            if(result.length == 0){
                if(lastHand){
                    sequence = lastHand.length/2 +1 ;
                    start = 3;//算出最小开始的数字,考虑了连对的情况
                    for(var i=start;i<=end;i++){
                        if((i+sequence-1) <= end){//这里要判断连对是否越界
                            var seqArray = [];
                            for(var j=0;j<sequence;j++){
                                seqArray.push(i+j);
                            }
                            result = this._findShunzi(cardsOnHand,seqArray,type);
                            if(result.length > 0){
                                return result;
                            }
                        }else{
                            break;
                        }
                    }
                }
            }
        }
        return result;

    },

    _autoLongBomb:function(cardsOnHand){
        var result = [];
        var temp = [];
        for(var i=0;i<cardsOnHand.length;i++){
            var card = cardsOnHand[i];
            if(temp[card.i]){
                temp[card.i] += 1;
            }else{
                temp[card.i] = 1;
            }
        }
        var seqs = [];
        for(var key in temp){
            key = parseInt(key);
            if(parseInt(temp[key]) >= 4){
                seqs.push(key);
            }
        }
        if(seqs.length > 0){
            for(var j=0; j<seqs.length; j++){
                var number = seqs[j];//拿出第一个
               // cc.log("number"+number);
                for(var i=0;i<cardsOnHand.length;i++){
                    var card = cardsOnHand[i];
                    if(card.i == number){
                        result.push(i);
                    }
                }
            }
        }
        return result;
    },

    /**
     * 查找炸弹
     * @param numberMapping {Object}
     * @param cardsOnHand {Array.<CardVo>}
     * @param lastHand {CardPattern}
     * @private
     */
    _autoBomb:function(numberMap,cardsOnHand,lastHand){
        var result = [];
        var seqs = [];
        var maxIndex = 0;
        if(lastHand || BBTRoomModel.promptCardPattern){
            maxIndex = BBTRoomModel.promptCardPattern ? BBTRoomModel.promptCardPattern.maxIndex : lastHand.maxIndex;
            if(lastHand){
                if(lastHand.type < this.BOMB){
                    maxIndex = 0;
                }
            }
            if(BBTRoomModel.promptCardPattern){
                if(BBTRoomModel.promptCardPattern.type < this.BOMB){
                    maxIndex = 0;
                }
            }
        }
        for(var key in numberMap){
            key = parseInt(key);
            if(parseInt(numberMap[key]) >= 4){
                if(lastHand){
                    if(key>maxIndex)
                        seqs.push(key);
                }else{
                    seqs.push(key);
                }
            }
        }
        if(seqs.length > 0){
            seqs = ArrayUtil.sortNumerically(seqs);
            var number = seqs[0];//拿出第一个
            for(var i=0;i<cardsOnHand.length;i++){
                var card = cardsOnHand[i];
                if(card.i == number){
                    result.push(i);
                }
            }
        }
        return result;
    },

    /**
     * 查找三个带
     * @param numberMapping {Object}
     * @param cardsOnHand {Array.<CardVo>}
     * @param lastHand {CardPattern}
     * @private
     */
    _autoPlane:function(numberMap,cardsOnHand,lastHand){
        var result = [];
        var planeArray = [];
        var minIndex = BBTRoomModel.promptCardPattern ? BBTRoomModel.promptCardPattern.minIndex : lastHand.minIndex;
        for(var key in numberMap){
            key = parseInt(key);
            if(parseInt(numberMap[key]) >= 3 && key>minIndex){
                planeArray.push(key);
            }
        }
        if(planeArray.length > 0){
            planeArray = ArrayUtil.sortNumerically(planeArray);
            var planeMinCard = 100;
            var planeMaxCard = 0;
            var planeLength = planeArray.length;
            var planeLengthj = planeLength-1;
            var planeCount = 0;
            var realPlaneArray = [];
            for(var i=0;i<planeLength;i++){//这里需要排除JJJQQQ带777的情况
                var next = i+1;
                var cVal = parseInt(planeArray[i]);
                var nVal = parseInt(planeArray[next]);
                if((i<planeLengthj) && Math.abs(cVal-nVal) == 1){
                    planeMinCard = (cVal<planeMinCard) ? cVal : planeMinCard;
                    planeMaxCard = (nVal>planeMaxCard) ? nVal : planeMaxCard;
                    if(ArrayUtil.indexOf(realPlaneArray,cVal)<0)
                        realPlaneArray.push(cVal);
                    if(ArrayUtil.indexOf(realPlaneArray,nVal)<0)
                        realPlaneArray.push(nVal);
                }
            }
            if(planeMinCard<100 && planeMaxCard>0)
                planeCount = planeMaxCard-planeMinCard+1;
            if(planeCount >= lastHand.planeCount){
                realPlaneArray = ArrayUtil.sortNumerically(realPlaneArray);
               //("realPlaneArray"+realPlaneArray);
                var tempMap = {};
                for(var p=0;p<lastHand.planeCount;p++){
                    for(var i=0;i<cardsOnHand.length;i++){
                        var card = cardsOnHand[i];
                        if(card.i == realPlaneArray[p]){
                            if(tempMap[card.i]){
                                tempMap[card.i] += 1;
                            }else{
                                tempMap[card.i] = 1;
                            }
                            if(parseInt(tempMap[card.i])<=3){
                                result.push(i);
                            }

                        }
                    }
                }
                //for(var i=(cardsOnHand.length-1);i>=0;i--){//三带二
                //    if(ArrayUtil.indexOf(result,i) < 0 && result.length<(lastHand.planeCount*5)){
                //        result.push(i)
                //    }
                //}
            }


        }
        return result;
    },

    /**
     * 智能提示
     * @param cardsOnHand {Array.<CardVo>}
     * @param lastHand {CardPattern}
     * @return {Array.<number>}
     */
    autoFilter:function(cardsOnHand,lastHand,findTimes){
        findTimes = findTimes || 1;
        if(!lastHand){
            return [cardsOnHand.length-1];
        }else{
            var result = [];
            var type = lastHand.type;
           // cc.log("111lastHand.type"+lastHand.type +"lastHand.maxIndex"+lastHand.maxIndex);
            if(type == this.KING){
                return result;
            }
            var length = cardsOnHand.length;
            var temp = {};
            for(var i=0;i<length;i++){
                var card = cardsOnHand[i];
                if(temp[card.i]){
                    temp[card.i] += 1;
                }else{
                    temp[card.i] = 1;
                }
            }
            if(BBTRoomModel.promptCardPattern){
               // cc.log("typetype"+type +"DdzRoomModel.promptCardPattern.type "+BBTRoomModel.promptCardPattern.type );
                if(BBTRoomModel.promptCardPattern.type == this.WUSHIK && type <= this.WUSHIK){
                    result = this._autoWSK(temp,cardsOnHand,BBTRoomModel.promptCardPattern)
                    if(result.length == 0){
                        result = this._autoBomb(temp,cardsOnHand);
                    }
                    if(result.length == 0){
                        result = this._autoTHX(temp,cardsOnHand);
                    }
                    if(result.length == 0){
                        result = this._autoDizha(temp,cardsOnHand);
                    }
                    if(result.length == 0){
                        result = this._autoKing(temp,cardsOnHand);
                    }
                    return result;
                }else if(BBTRoomModel.promptCardPattern.type == this.BOMB && type <= this.BOMB){
                    result = this._autoBomb(temp,cardsOnHand,BBTRoomModel.promptCardPattern);
                    if(result.length == 0){
                        result = this._autoTHX(temp,cardsOnHand);
                    }
                    if(result.length == 0){
                        result = this._autoDizha(temp,cardsOnHand);
                    }
                    if(result.length == 0){
                        result = this._autoKing(temp,cardsOnHand);
                    }
                    return result;
                }else if(BBTRoomModel.promptCardPattern.type == this.TONGHUASHUN && type <= this.TONGHUASHUN){
                    result = this._autoTHX(temp,cardsOnHand,BBTRoomModel.promptCardPattern);
                    if(result.length == 0){
                        result = this._autoDizha(temp,cardsOnHand);
                    }
                   // cc.log("ddd"+result.length);
                    if(result.length == 0){
                        result = this._autoKing(temp,cardsOnHand);
                       // cc.log("ggg"+result.length);
                    }
                    return result;
                }else if(BBTRoomModel.promptCardPattern.type == this.DIZHA && type <= this.DIZHA){
                    result = this._autoDizha(temp,cardsOnHand,BBTRoomModel.promptCardPattern);
                    if(result.length == 0){
                        result = this._autoKing(temp,cardsOnHand);
                    }
                    return result;
                }else if(BBTRoomModel.promptCardPattern.type == this.KING){
                    return [];
                }
            }
            switch (type){
                case this.SINGLE:
                    result = this._autoSingle(temp,cardsOnHand,lastHand,findTimes);
                   // cc.log("findSingle"+result[0]);
                    break;
                case this.PAIR:
                    if(lastHand.length==2){//单个对子的提示
                        result = this._autoPair(temp,cardsOnHand,lastHand,findTimes);
                    }
                    break;
                case this.LIANDUI:
                    result = this._autoSequence(2,temp,cardsOnHand,lastHand);
                    break;
                case this.THREE:
                    result = this._autoThree(temp,cardsOnHand,lastHand);
                    break;
                case this.BOMB:
                    result = this._autoBomb(temp,cardsOnHand,lastHand);
                    break;
                case this.SHUNZI:
                    result = this._autoSequence(1,temp,cardsOnHand,lastHand);
                    break;
                case this.PLANE:
                    result = this._autoPlane(temp,cardsOnHand,lastHand);
                    break;
                case this.WUSHIK:
                    result = this._autoWSK(temp,cardsOnHand,lastHand);
                    break;
                case this.DIZHA:
                    result = this._autoDizha(temp,cardsOnHand,lastHand);
                    break;
                case this.TONGHUASHUN:
                    result = this._autoTHX(temp,cardsOnHand,lastHand);
                    break;
            }
            if(result.length == 0 && type != this.KING){
                if(this.isTxPx(type)){
                    var findNextType = parseInt(type) +1;
                    switch (findNextType){
                        case 9:
                            result = this._autoBomb(temp,cardsOnHand);
                            if(result.length == 0){
                                result = this._autoTHX(temp,cardsOnHand);
                            }
                            if(result.length == 0){
                                result = this._autoDizha(temp,cardsOnHand);
                            }
                            break;
                        case 10:
                            result = this._autoTHX(temp,cardsOnHand);
                            if(result.length == 0){
                                result = this._autoDizha(temp,cardsOnHand);
                            }
                            break;
                        case 11:
                            result = this._autoDizha(temp,cardsOnHand);
                            break;
                    }

                }else{
                    result = this._autoWSK(temp,cardsOnHand);
                    if(result.length == 0){
                        result = this._autoBomb(temp,cardsOnHand);
                    }
                    if(result.length == 0){
                        result = this._autoTHX(temp,cardsOnHand);
                    }
                    if(result.length == 0){
                        result = this._autoDizha(temp,cardsOnHand);
                    }
                }

                if(result.length == 0){
                    result = this._autoKing(temp,cardsOnHand);
                }
            }
            return result;
        }
    }
}