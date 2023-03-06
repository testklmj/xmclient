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

var DdzAI = {
	SINGLE:1,//单张
	PAIR:2,//对子
	THREE:3,//三个不带
	BOMB:4,//炸弹
	THREEDAIONE:5, //三带一
	THREEDAITWO:6,//三带对
	FORUDAITWODAN: 7,//四代单
	FORUDAITWODUI: 8,//四带2对
	SHUNZI:9,//顺子
	LIANPAIR:10,//连队
	PLANEBUDAI:11,//飞机不带
	PLANEDAIDAN:12,//飞机带两单
	PLANEDAIDUI:13,//飞机带两对
	KING:20,//大小王炸弹
	LAZIBOMB:14,
	MAX_CARD:20,

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
		var l1 = card1.lazi;
		var l2 = card2.lazi;
		if(l1 == l2){
			return card1.i-card2.i;
		}else{
			return l1-l2;
		}
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
	_newCardPattern:function(type,sortedCards,maxIndex,maxCount,needMaxIndex,minIndex,planeCount){
		if(type == this.KING){
			return {type:type,sortedCards:sortedCards,length:sortedCards.length,maxIndex:maxIndex,minIndex:minIndex,planeCount:planeCount,maxCount:maxCount};
		}
		if(maxIndex>needMaxIndex)
			return {type:type,sortedCards:sortedCards,length:sortedCards.length,maxIndex:maxIndex,minIndex:minIndex,planeCount:planeCount,maxCount:maxCount};
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
		//单张
		var laziPaiCount = 0;//癞子牌数量
		//for(var i=0;i<length;i++){
		//	var card = selectedCards[i];
		//	if(card.lazi == 1){
		//		laziPaiCount++;
		//	}
		//}

		if(length == 1){
			if(DdzRoomModel.mySeat){
				if(DdzRoomModel.isNextSeatBt() && currentlyCards.length>0){
					if(selectedCards[0].i == currentlyCards[0].i)
						return this._newCardPattern(this.SINGLE,selectedCards,selectedCards[0].i,1,maxNeedIndex);
					return this._newCardPattern(this.SINGLE,selectedCards,selectedCards[0].i,1,maxNeedIndex);
				}else{
					return this._newCardPattern(this.SINGLE,selectedCards,selectedCards[0].i,1,maxNeedIndex);
				}
			}else{
				if(PlayBackModel.isNextSeatBt() && currentlyCards.length>0){
					if(selectedCards[0].i == currentlyCards[0].i)
						return this._newCardPattern(this.SINGLE,selectedCards,selectedCards[0].i,1,maxNeedIndex);
				}else{
					return this._newCardPattern(this.SINGLE,selectedCards,selectedCards[0].i,1,maxNeedIndex);
				}
			}
		}
		var firstCard = selectedCards[0];
		//正常牌的最后一张
		var lastCard =  selectedCards[length-1-laziPaiCount];
		var temp = {};
		var maxCount = 1;//同数字牌的数量
		var numberCount = 0;//不同数字的牌的数量
		for(var i=0;i<length;i++){
			var card = selectedCards[i];
			if(card.lazi == 1){
				continue;
			}
			if(temp[card.i]){
				temp[card.i] += 1;
				if(parseInt(temp[card.i]) > maxCount)
					maxCount = parseInt(temp[card.i]);
			}else{
				numberCount++;
				temp[card.i] = 1;
			}

		}

		if(length>=5 && maxCount==1 && lastCard.i <= 14){
			if((lastCard.i-firstCard.i) >= (length-1-laziPaiCount) && (lastCard.i-firstCard.i) <= (length-1)  && (!lastCards || length==lastCards.length))
				return this._newCardPattern(this.SHUNZI,selectedCards,lastCard.i,maxCount,maxNeedIndex);
		}
		var pairCount = 0;//连对数量
		var planeCount = 0;//三个带数量
		var maxIndex = 0;//最大的一张牌
		var planeMinCard = 100;
		var planeMaxCard = 0;
		var planeArray = [];
		var laziPlaneArray = [];
		var laziTwoPlaneArray = [];
		var lianduiTwoPlane = [];
		for(var key in temp){
			var tempKey = parseInt(key);
			var tempVal = parseInt(temp[key]);

			if(tempVal == 1){
				laziTwoPlaneArray.push(tempVal);
			}
			if(tempVal == 2){
				pairCount++;
				laziPlaneArray.push(tempVal);
				lianduiTwoPlane.push(tempVal);
			}

			if(tempVal >= 3){
				planeArray.push(tempKey);
			}

			if (tempVal == maxCount && tempKey > maxIndex)
				maxIndex = tempKey;
		}
		//对子
		if((length == 2 && maxCount==2) || (length == 2 && maxCount==1 && laziPaiCount >= 1)){
			//对子
			if(numberCount == 1 && (!lastCards || lastCards.length==2))
				return this._newCardPattern(this.PAIR,selectedCards,lastCard.i,maxCount,maxNeedIndex);

		}

		//连队
		if((length/2 >= 3 && length%2 == 0 && maxCount==2)){
			switch (laziPaiCount){
				case 0:
					if(pairCount==numberCount && pairCount >= 3  && (lastCard.i-firstCard.i) == (numberCount-1) && (!lastCards || lastCards.length==length) && lastCard.i <= 14){
						return this._newCardPattern(this.LIANPAIR,selectedCards,lastCard.i,maxCount,maxNeedIndex);
					}
					break;
				case 1:
					if(pairCount == numberCount-1 && pairCount >= 2  && (lastCard.i-firstCard.i) == (numberCount-1) && (!lastCards || lastCards.length==length) && lastCard.i <= 14){
						return this._newCardPattern(this.LIANPAIR,selectedCards,lastCard.i,maxCount,maxNeedIndex);
					}
					break;
				case 2:
					if(pairCount<=numberCount && pairCount >= 1  && (lastCard.i-firstCard.i) >= (numberCount-1-laziPaiCount) && (lastCard.i-firstCard.i) <= (numberCount-1) && (!lastCards || lastCards.length==length) && lastCard.i <= 14){
						//cc.log("liandui")
						return this._newCardPattern(this.LIANPAIR,selectedCards,lastCard.i,maxCount,maxNeedIndex);
					}
					break;
				case 3:
					//cc.log("pairCount"+pairCount +"numberCount"+numberCount);
					if(pairCount<=numberCount && pairCount >= numberCount -3  && (lastCard.i-firstCard.i) >= (numberCount-1-laziPaiCount) && (lastCard.i-firstCard.i) <= (numberCount) && (!lastCards || lastCards.length==length) && lastCard.i <= 14){
						//cc.log("liandui")
						return this._newCardPattern(this.LIANPAIR,selectedCards,lastCard.i,maxCount,maxNeedIndex);
					}
					break;
				case 4:
					if(pairCount<=numberCount && pairCount >= numberCount -4  && (lastCard.i-firstCard.i) >= (numberCount-1-laziPaiCount) && (lastCard.i-firstCard.i) <= (numberCount-1) && (!lastCards || lastCards.length==length) && lastCard.i <= 14){
						//cc.log("liandui")
						return this._newCardPattern(this.LIANPAIR,selectedCards,lastCard.i,maxCount,maxNeedIndex);
					}
					break;
			}
			//if(pairCount==numberCount && pairCount >= 3  && (lastCard.i-firstCard.i) == (numberCount-1) && (!lastCards || lastCards.length==length) && lastCard.i <= 14){
			//	cc.log("liandui")
			//	return this._newCardPattern(this.LIANPAIR,selectedCards,lastCard.i,maxCount,maxNeedIndex);
			//}
		}


		//炸弹
		if(maxCount == 4 && length==4) {
			if(!lastCards || lastCards.type!=DdzAI.BOMB)
				maxNeedIndex = 0;
			if (length == maxCount)
				return this._newCardPattern(this.BOMB, selectedCards, lastCard.i, maxCount,maxNeedIndex);
		}
		//癞子炸弹
		if(maxCount == 4-laziPaiCount && length==4) {
			if(!lastCards || lastCards.type!=DdzAI.LAZIBOMB)
				maxNeedIndex = 0;
			if (length == maxCount+laziPaiCount)
				return this._newCardPattern(this.LAZIBOMB, selectedCards, lastCard.i, maxCount,maxNeedIndex);
		}

		//天王炸

		if(length == 2 && (selectedCards[0].c == 516 && selectedCards[1].c == 517) || (selectedCards[0].c == 517 && selectedCards[1].c == 516))
		{
			//cc.log("kingbom"+maxIndex+"afd"+maxCount+"cc"+maxNeedIndex);
			return this._newCardPattern(this.KING, selectedCards, maxIndex, maxCount,maxNeedIndex);
		}
		//三个带
		//switch (laziPaiCount){
		//	case 0:
		//		if(maxCount == 3 || maxCount == 4) {
		//			if (length == 3) {//仅3个
		//				if (!lastCards || lastCards.length == length) {
		//					cc.log("3budai" + "maxIndex" + maxIndex + "maxCount" + maxCount + "maxNeedIndex" + maxNeedIndex);
		//					return this._newCardPattern(this.THREE, selectedCards, maxIndex, maxCount, maxNeedIndex);
		//				}
		//			}
		//			if(length == 4){//3带1
		//				if(!lastCards || lastCards.length==length){
		//					cc.log("3dai1"+"maxIndex"+maxIndex + "maxCount" +maxCount +"maxNeedIndex"+maxNeedIndex);
		//					return this._newCardPattern(this.THREEDAIONE, selectedCards, maxIndex, maxCount,maxNeedIndex);
		//				}
		//			}
		//			if(length == 5){//3带2
		//				if(!lastCards || lastCards.length==length){
		//					cc.log("pairCountpairCount"+pairCount);
		//					if(pairCount == 1){
		//						cc.log("3dai2");
		//						return this._newCardPattern(this.THREEDAITWO, selectedCards, maxIndex, maxCount,maxNeedIndex);
		//					}
		//				}
		//			}
		//			if(maxCount == 4){
		//				if(length == 6){ //四帶二
		//					if(!lastCards || lastCards.length==length){
		//						cc.log("4dai2"+"maxIndex"+maxIndex + "maxCount" +maxCount +"maxNeedIndex"+maxNeedIndex);
		//						return this._newCardPattern(this.FORUDAITWODAN, selectedCards, maxIndex, maxCount,maxNeedIndex);
		//					}
		//				}
		//				if(length == 8){
		//					if(!lastCards || lastCards.length==length){
		//						if(pairCount == 2){
		//							cc.log("4dai2dui"+"maxIndex"+maxIndex + "maxCount" +maxCount +"maxNeedIndex"+maxNeedIndex);
		//							return this._newCardPattern(this.FORUDAITWODUI, selectedCards, maxIndex, maxCount,maxNeedIndex);
		//						}
        //
		//					}
		//				}
		//			}
		//				if(planeArray.length>1){//飞机带翅膀
		//					maxNeedIndex = 0;
		//					planeArray = ArrayUtil.sortNumerically(planeArray);
		//					var planeLength = planeArray.length;
		//					var planeLengthj = planeLength-1;
		//					var realPlaneArray = [];
		//					for(var i=0;i<planeLength;i++){//这里需要排除JJJQQQ带777的情况
		//						var next = i+1;
		//						var cVal = parseInt(planeArray[i]);
		//						var nVal = parseInt(planeArray[next]);
		//						if((i<planeLengthj) && Math.abs(cVal-nVal) == 1){
		//							planeMinCard = (cVal<planeMinCard) ? cVal : planeMinCard;
		//							planeMaxCard = (nVal>planeMaxCard) ? nVal : planeMaxCard;
		//							if(ArrayUtil.indexOf(realPlaneArray,cVal)<0)
		//								realPlaneArray.push(cVal);
		//							if(ArrayUtil.indexOf(realPlaneArray,nVal)<0)
		//								realPlaneArray.push(nVal);
		//						}
		//					}
		//					if(planeMinCard<100 && planeMaxCard>0)
		//						planeCount = planeMaxCard-planeMinCard+1;
		//					var mod = 0;
		//					if(currentlyCards.length==planeCount*4){
		//							mod = planeCount;
		//					}else if(currentlyCards.length==planeCount*5){
		//						mod = planeCount;
        //
		//					}else if(currentlyCards.length==planeCount*3){
		//						mod = planeCount;
		//					}
		//					if(planeCount>=2){
		//						if(mod<planeCount && mod>=2)//JJJQQQ带101010的情况
		//							planeCount=mod;
		//						if(planeCount<realPlaneArray.length){
		//							realPlaneArray = ArrayUtil.sortNumerically(realPlaneArray);
		//							planeMinCard = realPlaneArray[realPlaneArray.length-planeCount];
		//							planeMaxCard = realPlaneArray[realPlaneArray.length-1];
		//						}
		//						if( (selectedCards.length==planeCount*3 && selectedCards.length==length)){
		//							if(!lastCards || lastCards.length==length){
		//								cc.log("feijibudai");
		//								return this._newCardPattern(this.PLANEBUDAI, selectedCards, planeMaxCard, maxCount, maxNeedIndex,planeMinCard,planeCount);
		//							}
        //
		//						}
		//						if((selectedCards.length==planeCount*4 && selectedCards.length==length)){
		//							if(!lastCards || lastCards.length==length){
		//								cc.log("feijidaidan");
		//								return this._newCardPattern(this.PLANEDAIDAN, selectedCards, planeMaxCard, maxCount, maxNeedIndex,planeMinCard,planeCount);
		//							}
        //
		//						}
		//						if((selectedCards.length==planeCount*5 && selectedCards.length==length)){
		//							if(!lastCards || lastCards.length==length){
		//								if(pairCount == 2*planeCount){
		//									cc.log("feijidaidui");
		//									return this._newCardPattern(this.PLANEDAIDUI, selectedCards, planeMaxCard, maxCount, maxNeedIndex,planeMinCard,planeCount);
		//								}
		//							}
        //
		//						}
		//					}
		//				}
        //
		//		}
		//		break;
		//	case 1:
		//		if(maxCount == 3-laziPaiCount || maxCount == 4 -laziPaiCount) {
		//			if (length == 3) {//仅3个
		//				if (!lastCards || lastCards.length == length) {
		//					cc.log("3budai" + "maxIndex" + maxIndex + "maxCount" + maxCount + "maxNeedIndex" + maxNeedIndex);
		//					return this._newCardPattern(this.THREE, selectedCards, maxIndex, maxCount, maxNeedIndex);
		//				}
		//			}
		//			if(length == 4){//3带1
		//				if(!lastCards || lastCards.length==length){
		//					cc.log("3dai1"+"maxIndex"+maxIndex + "maxCount" +maxCount +"maxNeedIndex"+maxNeedIndex);
		//					return this._newCardPattern(this.THREEDAIONE, selectedCards, maxIndex, maxCount,maxNeedIndex);
		//				}
		//			}
		//			if(length == 5){//3带2
		//				if(!lastCards || lastCards.length==length){
		//					cc.log("pairCountpairCount"+pairCount);
		//					if(pairCount == 2){
		//						cc.log("3dai2");
		//						return this._newCardPattern(this.THREEDAITWO, selectedCards, maxIndex, maxCount,maxNeedIndex);
		//					}
		//				}
		//			}
		//			if(maxCount == 4-laziPaiCount){
		//				if(length == 6){ //四帶二
		//					if(!lastCards || lastCards.length==length){
		//						cc.log("4dai2"+"maxIndex"+maxIndex + "maxCount" +maxCount +"maxNeedIndex"+maxNeedIndex);
		//						return this._newCardPattern(this.FORUDAITWODAN, selectedCards, maxIndex, maxCount,maxNeedIndex);
		//					}
		//				}
		//				if(length == 8){
		//					if(!lastCards || lastCards.length==length){
		//						if(pairCount == 2){
		//							cc.log("4dai2dui"+"maxIndex"+maxIndex + "maxCount" +maxCount +"maxNeedIndex"+maxNeedIndex);
		//							return this._newCardPattern(this.FORUDAITWODUI, selectedCards, maxIndex, maxCount,maxNeedIndex);
		//						}
        //
		//					}
		//				}
		//			}
		//			if(laziPlaneArray.length>1){//飞机带翅膀
		//				maxNeedIndex = 0;
		//				laziPlaneArray = ArrayUtil.sortNumerically(laziPlaneArray);
		//				var planeLength = laziPlaneArray.length;
		//				var planeLengthj = planeLength-1;
		//				var realPlaneArray = [];
		//				for(var i=0;i<planeLength;i++){//这里需要排除JJJQQQ带777的情况
		//					var next = i+1;
		//					var cVal = parseInt(laziPlaneArray[i]);
		//					var nVal = parseInt(laziPlaneArray[next]);
		//					if((i<planeLengthj) && Math.abs(cVal-nVal) == 1){
		//						planeMinCard = (cVal<planeMinCard) ? cVal : planeMinCard;
		//						planeMaxCard = (nVal>planeMaxCard) ? nVal : planeMaxCard;
		//						if(ArrayUtil.indexOf(realPlaneArray,cVal)<0)
		//							realPlaneArray.push(cVal);
		//						if(ArrayUtil.indexOf(realPlaneArray,nVal)<0)
		//							realPlaneArray.push(nVal);
		//					}
		//				}
		//				cc.log("realPlaneArray"+realPlaneArray+"planeMaxCard"+planeMaxCard + "planeMinCard"+planeMinCard);
		//				if(planeMinCard<100 && planeMaxCard>0)
		//					planeCount = planeMaxCard-planeMinCard+1;
		//				var mod = 0;
		//				if(currentlyCards.length==planeCount*4){
		//					mod = planeCount;
		//				}else if(currentlyCards.length==planeCount*5){
		//					mod = planeCount;
        //
		//				}else if(currentlyCards.length==planeCount*3){
		//					mod = planeCount;
		//				}
		//				if(planeCount>=2){
		//					if(mod<planeCount && mod>=2)//JJJQQQ带101010的情况
		//						planeCount=mod;
		//					if(planeCount<realPlaneArray.length){
		//						realPlaneArray = ArrayUtil.sortNumerically(realPlaneArray);
		//						planeMinCard = realPlaneArray[realPlaneArray.length-planeCount];
		//						planeMaxCard = realPlaneArray[realPlaneArray.length-1];
		//					}
		//					if( (selectedCards.length==planeCount*3 && selectedCards.length==length)){
		//						if(!lastCards || lastCards.length==length){
		//							cc.log("feijibudai");
		//							return this._newCardPattern(this.PLANEBUDAI, selectedCards, planeMaxCard, maxCount, maxNeedIndex,planeMinCard,planeCount);
		//						}
        //
		//					}
		//					if((selectedCards.length==planeCount*4 && selectedCards.length==length)){
		//						if(!lastCards || lastCards.length==length){
		//							cc.log("feijidaidan");
		//							return this._newCardPattern(this.PLANEDAIDAN, selectedCards, planeMaxCard, maxCount, maxNeedIndex,planeMinCard,planeCount);
		//						}
        //
		//					}
		//					if((selectedCards.length==planeCount*5 && selectedCards.length==length)){
		//						if(!lastCards || lastCards.length==length){
		//							if(pairCount == 2){
		//								cc.log("feijidaidui");
		//								return this._newCardPattern(this.PLANEDAIDUI, selectedCards, planeMaxCard, maxCount, maxNeedIndex,planeMinCard,planeCount);
		//							}
		//						}
        //
		//					}
		//				}
		//			}
        //
		//		}
		//		break;
		//	case 2:
		//		if(maxCount == 3-laziPaiCount || maxCount == 4 -laziPaiCount) {
		//			if (length == 3) {//仅3个
		//				if (!lastCards || lastCards.length == length) {
		//					cc.log("3budai" + "maxIndex" + maxIndex + "maxCount" + maxCount + "maxNeedIndex" + maxNeedIndex);
		//					return this._newCardPattern(this.THREE, selectedCards, maxIndex, maxCount, maxNeedIndex);
		//				}
		//			}
		//			if(length == 4){//3带1
		//				if(!lastCards || lastCards.length==length){
		//					cc.log("3dai1"+"maxIndex"+maxIndex + "maxCount" +maxCount +"maxNeedIndex"+maxNeedIndex);
		//					return this._newCardPattern(this.THREEDAIONE, selectedCards, maxIndex, maxCount,maxNeedIndex);
		//				}
		//			}
		//			if(length == 5){//3带2
		//				if(!lastCards || lastCards.length==length){
		//					cc.log("pairCountpairCount"+pairCount);
		//					if(pairCount == 1){
		//						cc.log("3dai2");
		//						return this._newCardPattern(this.THREEDAITWO, selectedCards, maxIndex, maxCount,maxNeedIndex);
		//					}
		//				}
		//			}
		//			if(maxCount == 4-laziPaiCount){
		//				if(length == 6){ //四帶二
		//					if(!lastCards || lastCards.length==length){
		//						cc.log("4dai2"+"maxIndex"+maxIndex + "maxCount" +maxCount +"maxNeedIndex"+maxNeedIndex);
		//						return this._newCardPattern(this.FORUDAITWODAN, selectedCards, maxIndex, maxCount,maxNeedIndex);
		//					}
		//				}
		//				if(length == 8){
		//					if(!lastCards || lastCards.length==length){
		//						if(pairCount == 3){
		//							cc.log("4dai2dui"+"maxIndex"+maxIndex + "maxCount" +maxCount +"maxNeedIndex"+maxNeedIndex);
		//							return this._newCardPattern(this.FORUDAITWODUI, selectedCards, maxIndex, maxCount,maxNeedIndex);
		//						}
        //
		//					}
		//				}
		//			}
		//			//2个癞子表示两连队 或者3个带一个
		//			if(pairCount >= 2 || planeArray>=1){//飞机带翅膀
		//				maxNeedIndex = 0;
		//				lianduiTwoPlane = this.findLianxuArray(lianduiTwoPlane);
		//				lianduiTwoPlane = this.findLianxuArrayTwoMax(lianduiTwoPlane);
        //
		//				cc.log("realPlaneArray"+realPlaneArray+"planeMaxCard"+planeMaxCard + "planeMinCard"+planeMinCard);
		//				if(planeMinCard<100 && planeMaxCard>0)
		//					planeCount = planeMaxCard-planeMinCard+1;
		//				var mod = 0;
		//				if(currentlyCards.length==planeCount*4){
		//					mod = planeCount;
		//				}else if(currentlyCards.length==planeCount*5){
		//					mod = planeCount;
        //
		//				}else if(currentlyCards.length==planeCount*3){
		//					mod = planeCount;
		//				}
		//				if(planeCount>=2){
		//					if(mod<planeCount && mod>=2)//JJJQQQ带101010的情况
		//						planeCount=mod;
		//					if(planeCount<realPlaneArray.length){
		//						realPlaneArray = ArrayUtil.sortNumerically(realPlaneArray);
		//						planeMinCard = realPlaneArray[realPlaneArray.length-planeCount];
		//						planeMaxCard = realPlaneArray[realPlaneArray.length-1];
		//					}
		//					if( (selectedCards.length==planeCount*3 && selectedCards.length==length)){
		//						if(!lastCards || lastCards.length==length){
		//							cc.log("feijibudai");
		//							return this._newCardPattern(this.PLANEBUDAI, selectedCards, planeMaxCard, maxCount, maxNeedIndex,planeMinCard,planeCount);
		//						}
        //
		//					}
		//					if((selectedCards.length==planeCount*4 && selectedCards.length==length)){
		//						if(!lastCards || lastCards.length==length){
		//							cc.log("feijidaidan");
		//							return this._newCardPattern(this.PLANEDAIDAN, selectedCards, planeMaxCard, maxCount, maxNeedIndex,planeMinCard,planeCount);
		//						}
        //
		//					}
		//					if((selectedCards.length==planeCount*5 && selectedCards.length==length)){
		//						if(!lastCards || lastCards.length==length){
		//							if(pairCount == 2){
		//								cc.log("feijidaidui");
		//								return this._newCardPattern(this.PLANEDAIDUI, selectedCards, planeMaxCard, maxCount, maxNeedIndex,planeMinCard,planeCount);
		//							}
		//						}
        //
		//					}
		//				}
		//			}
        //
		//		}
		//		break;
		//	case 3:
		//		if (length == 3) {//仅3个
		//			if (!lastCards || lastCards.length == length) {
		//				cc.log("3budai" + "maxIndex" + maxIndex + "maxCount" + maxCount + "maxNeedIndex" + maxNeedIndex);
		//				return this._newCardPattern(this.THREE, selectedCards, maxIndex, maxCount, maxNeedIndex);
		//			}
		//		}
		//		if(length == 4){//3带1
		//			if(!lastCards || lastCards.length==length){
		//				cc.log("3dai1"+"maxIndex"+maxIndex + "maxCount" +maxCount +"maxNeedIndex"+maxNeedIndex);
		//				return this._newCardPattern(this.THREEDAIONE, selectedCards, maxIndex, maxCount,maxNeedIndex);
		//			}
		//		}
		//		if(length == 5){//3带2
		//			if(!lastCards || lastCards.length==length){
		//				cc.log("pairCountpairCount"+pairCount);
		//				if(pairCount == 0){
		//					cc.log("3dai2");
		//					return this._newCardPattern(this.THREEDAITWO, selectedCards, maxIndex, maxCount,maxNeedIndex);
		//				}
		//			}
		//		}
		//		if(maxCount >= 4-laziPaiCount){
		//			if(length == 6){ //四帶二
		//				if(!lastCards || lastCards.length==length){
		//					cc.log("4dai2"+"maxIndex"+maxIndex + "maxCount" +maxCount +"maxNeedIndex"+maxNeedIndex);
		//					return this._newCardPattern(this.FORUDAITWODAN, selectedCards, maxIndex, maxCount,maxNeedIndex);
		//				}
		//			}
		//			if(length == 8){
		//				if(!lastCards || lastCards.length==length){
		//					if(pairCount == 2){
		//						cc.log("4dai2dui"+"maxIndex"+maxIndex + "maxCount" +maxCount +"maxNeedIndex"+maxNeedIndex);
		//						return this._newCardPattern(this.FORUDAITWODUI, selectedCards, maxIndex, maxCount,maxNeedIndex);
		//					}
        //
		//				}
		//			}
		//		}
		//		break;



		if(maxCount == 3 || maxCount == 4){
			if(length == 3){//仅3个
				if(!lastCards || lastCards.length==length) {
					//cc.log("3budai"+"maxIndex"+maxIndex + "maxCount" +maxCount +"maxNeedIndex"+maxNeedIndex);
					return this._newCardPattern(this.THREE, selectedCards, maxIndex, maxCount, maxNeedIndex);
				}
			}
			if(DdzRoomModel.ext[4] == 1){
				if(length == 4){//3带1
					if(!lastCards || lastCards.length==length){
						//cc.log("3dai1"+"maxIndex"+maxIndex + "maxCount" +maxCount +"maxNeedIndex"+maxNeedIndex);
						return this._newCardPattern(this.THREEDAIONE, selectedCards, maxIndex, maxCount,maxNeedIndex);
					}
				}
			}

			if(DdzRoomModel.ext[5] == 1){
				if(length == 5){//3带2
					if(!lastCards || lastCards.length==length){
						//cc.log("pairCountpairCount"+pairCount);
						if(pairCount == 1){
						//	cc.log("3dai2");
							return this._newCardPattern(this.THREEDAITWO, selectedCards, maxIndex, maxCount,maxNeedIndex);
						}
					}

				}
			}

			if(maxCount == 4){
				if(length == 6){ //四帶二
					if(!lastCards || lastCards.length==length){
						//cc.log("4dai2"+"maxIndex"+maxIndex + "maxCount" +maxCount +"maxNeedIndex"+maxNeedIndex);
						return this._newCardPattern(this.FORUDAITWODAN, selectedCards, maxIndex, maxCount,maxNeedIndex);
					}
				}
				if(length == 8){
					if(!lastCards || lastCards.length==length){
						if(pairCount == 2){
							//cc.log("4dai2dui"+"maxIndex"+maxIndex + "maxCount" +maxCount +"maxNeedIndex"+maxNeedIndex);
							return this._newCardPattern(this.FORUDAITWODUI, selectedCards, maxIndex, maxCount,maxNeedIndex);
						}

					}
				}
			}

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
					if((i<planeLengthj) && Math.abs(cVal-nVal) == 1 && cVal != 15 && nVal != 15){
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
				if(currentlyCards.length==planeCount*4){
						mod = planeCount;
				}else if(currentlyCards.length==planeCount*5){
					mod = planeCount;

				}else if(currentlyCards.length==planeCount*3){
					mod = planeCount;
				}
				if(planeCount>=2){
					if(mod<planeCount && mod>=2)//JJJQQQ带101010的情况
						planeCount=mod;
					if(planeCount<realPlaneArray.length){
						realPlaneArray = ArrayUtil.sortNumerically(realPlaneArray);
						planeMinCard = realPlaneArray[realPlaneArray.length-planeCount];
						planeMaxCard = realPlaneArray[realPlaneArray.length-1];
					}
					if( (selectedCards.length==planeCount*3 && selectedCards.length==length)){
						if(!lastCards || lastCards.length==length){
							//cc.log("feijibudai");
							return this._newCardPattern(this.PLANEBUDAI, selectedCards, planeMaxCard, maxCount, maxNeedIndex,planeMinCard,planeCount);
						}

					}
					if(DdzRoomModel.ext[4] == 1){
						if((selectedCards.length==planeCount*4 && selectedCards.length==length)){
							if(!lastCards || lastCards.length==length){
								//cc.log("feijidaidan");
								return this._newCardPattern(this.PLANEDAIDAN, selectedCards, planeMaxCard, maxCount, maxNeedIndex,planeMinCard,planeCount);
							}
						}
					}

					if(DdzRoomModel.ext[5] == 1){
						if((selectedCards.length==planeCount*5 && selectedCards.length==length)){
							if(!lastCards || lastCards.length==length){
								if(pairCount == planeCount){
									//cc.log("feijidaidui");
									return this._newCardPattern(this.PLANEDAIDUI, selectedCards, planeMaxCard, maxCount, maxNeedIndex,planeMinCard,planeCount);
								}
							}
						}
					}

				}
			}
		}
		return null;
	},

	findLianxuArray:function(planeArray)
	{

		planeArray = ArrayUtil.sortNumerically(planeArray);
		var planeLength = planeArray.length;
		var planeLengthj = planeLength-1;
		var realPlaneArray = [];
		for(var i=0;i<planeLength;i++){//这里需要排除JJJQQQ带777的情况
			var next = i+1;
			var cVal = parseInt(planeArray[i]);
			var nVal = parseInt(planeArray[next]);
			if((i<planeLengthj) && Math.abs(cVal-nVal) == 1){
				if(ArrayUtil.indexOf(realPlaneArray,cVal)<0)
					realPlaneArray.push(cVal);
				if(ArrayUtil.indexOf(realPlaneArray,nVal)<0)
					realPlaneArray.push(nVal);
			}
		}
		return realPlaneArray
	},

	findLianxuArrayTwoMax:function(array)
	{
		var length = array.length;
		var realPlaneArray = [];
		realPlaneArray.push(array[length-2]);
		realPlaneArray.push(array[length-1]);
		return realPlaneArray;

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
		var maxIndex = DdzRoomModel.promptCardPattern ? DdzRoomModel.promptCardPattern.maxIndex : lastHand.maxIndex;
		//if(DdzRoomModel.isNextSeatBt()){//下家报停的情况
		//	for(var i=0;i<length;i++){
		//		var card = cardsOnHand[i];
		//		if(card.i > maxIndex){
		//			result.push(i);
		//			break;
		//		}
		//	}
		//}else{
			var seqs = [];
			for(var key in numberMap){
				key = parseInt(key);
				var val = parseInt(numberMap[key]);
				var bool = key>maxIndex;
				if(findTimes==1){
					if(val==1 && bool && key != 16 && key != 17) //第一次排除大小王
						seqs.push(key);
				}else{
					if(val>=1 && val<4 && bool)
						seqs.push(key);
				}
			}
			if(seqs.length>0){
				seqs = ArrayUtil.sortNumerically(seqs);
				var number = seqs[0];//拿出第一个
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
		//}
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
		var maxIndex = DdzRoomModel.promptCardPattern ? DdzRoomModel.promptCardPattern.maxIndex : lastHand.maxIndex;
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
					if(ArrayUtil.indexOf(seqs,last)>0 && ArrayUtil.indexOf(seqs,next)>0){//排除连对

					}else{
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
			var maxIndex = DdzRoomModel.promptCardPattern ? DdzRoomModel.promptCardPattern.maxIndex : lastHand.maxIndex;
			var type = (number==2) ? this.LIANPAIR : this.SHUNZI;
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

	_autoThreeBudai:function(numberMap,cardsOnHand,lastHand)
	{
		var result = [];
		var seqs = [];
		var maxIndex = DdzRoomModel.promptCardPattern ? DdzRoomModel.promptCardPattern.maxIndex : lastHand.maxIndex;
		for(var key in numberMap){
			key = parseInt(key);
			if(parseInt(numberMap[key]) == 3 && key>maxIndex){
				seqs.push(key);
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
	 * 查找三个带1
	 * @param numberMapping {Object}
	 * @param cardsOnHand {Array.<CardVo>}
	 * @param lastHand {CardPattern}
	 * @private
	 */
	_autoThreeDaiDan:function(numberMap,cardsOnHand,lastHand){
		var result = [];
		var seqs = [];
		var noSingles = [];
		var maxIndex = DdzRoomModel.promptCardPattern ? DdzRoomModel.promptCardPattern.maxIndex : lastHand.maxIndex;
		for(var key in numberMap){
			key = parseInt(key);
			if(parseInt(numberMap[key]) == 3 && key>maxIndex){
				seqs.push(key);
			}
			if(parseInt(numberMap[key]) > 1)
				noSingles.push(key);
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
			var filterFunc = function(findTimes){
				for(var i=(cardsOnHand.length-1);i>=0;i--){
					if(ArrayUtil.indexOf(result,i) < 0 && result.length<4){
						if(findTimes==1){
							if(ArrayUtil.indexOf(noSingles,cardsOnHand[i].i) < 0){
								result.push(i);
							}
						}else{
							result.push(i);
						}
					}
				}
				if(result.length<4 && findTimes==1){
					filterFunc(2);
				}
			}
			filterFunc(1);
		}
		return result;
	},

	/**
	 * 查找三个带1dui
	 * @param numberMapping {Object}
	 * @param cardsOnHand {Array.<CardVo>}
	 * @param lastHand {CardPattern}
	 * @private
	 */
	_autoThreeDaiDui:function(numberMap,cardsOnHand,lastHand){
		var result = [];
		var seqs = [];
		var Singles = [];
		var maxIndex = DdzRoomModel.promptCardPattern ? DdzRoomModel.promptCardPattern.maxIndex : lastHand.maxIndex;
		for(var key in numberMap){
			key = parseInt(key);
			if(parseInt(numberMap[key]) == 3 && key>maxIndex){
				seqs.push(key);
			}
			if(parseInt(numberMap[key]) == 2 || parseInt(numberMap[key]) == 3)
				Singles.push(key);
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
			var filterFunc = function(findTimes){
				for(var i=(cardsOnHand.length-1);i>=0;i--){
					if(ArrayUtil.indexOf(result,i) < 0 && result.length<5){
						if(findTimes==1){
							var key = ArrayUtil.indexOf(Singles,cardsOnHand[i].i);
							if(key >= 0){
								result.push(i);
							}
						}
					}
				}
				if(result.length<5 && findTimes==1){
					filterFunc(2);
				}
			}
			filterFunc(1);
		}
		//找不到對子了
		if(result.length == 3){
			result = [];
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
		if(lastHand || DdzRoomModel.promptCardPattern)
			maxIndex = DdzRoomModel.promptCardPattern ? DdzRoomModel.promptCardPattern.maxIndex : lastHand.maxIndex;
		cc.log("maxindexmaxindex"+maxIndex);
		for(var key in numberMap){
			key = parseInt(key);
			if(parseInt(numberMap[key]) >= 4){
				if(lastHand ){
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
					cc.log("aaaaa"+card.i);
					result.push(i);
				}
			}
		}
		return result;
	},

	_autoFourDaiDui:function(numberMap,cardsOnHand,lastHand)
	{
		var result = [];
		var seqs = [];
		var Singles = [];
		var maxIndex = 0;
		if(lastHand || DdzRoomModel.promptCardPattern)
			maxIndex = DdzRoomModel.promptCardPattern ? DdzRoomModel.promptCardPattern.maxIndex : lastHand.maxIndex;
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
			if(parseInt(numberMap[key]) == 2 || parseInt(numberMap[key]) == 3)
				Singles.push(key);
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
			var filterFunc = function(findTimes){
				for(var i=(cardsOnHand.length-1);i>=0;i--){
					if(ArrayUtil.indexOf(result,i) < 0 && result.length<8){
						if(findTimes==1){
							if(ArrayUtil.indexOf(Singles,cardsOnHand[i].i) >= 0){
								result.push(i);
							}
						}
					}
				}
				if(result.length<8 && findTimes==1){
					filterFunc(2);
				}
			}
			filterFunc(1);
		}
		//找不到對子了
		if(result.length != 8 ){
			result = [];
		}
		return result;
	},

	_autoFourDaidan:function(numberMap,cardsOnHand,lastHand)
	{
		var result = [];
		var seqs = [];
		var noSingles = [];
		var maxIndex = 0;
		if(lastHand || DdzRoomModel.promptCardPattern)
			maxIndex = DdzRoomModel.promptCardPattern ? DdzRoomModel.promptCardPattern.maxIndex : lastHand.maxIndex;
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
			if(parseInt(numberMap[key]) > 1)
				noSingles.push(key);
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
			var filterFunc = function(findTimes){
				for(var i=(cardsOnHand.length-1);i>=0;i--){
					if(ArrayUtil.indexOf(result,i) < 0 && result.length<6){
						if(findTimes==1){
							if(ArrayUtil.indexOf(noSingles,cardsOnHand[i].i) < 0){
								result.push(i);
							}
						}else{
							result.push(i);
						}
					}
				}
				if(result.length<6 && findTimes==1){
					filterFunc(2);
				}
			}
			filterFunc(1);
		}
		return result;
	},
	_autoKing:function(numberMap,cardsOnHand,lastHand)
	{
		var result = [];
		for(var i=0;i<cardsOnHand.length;i++){
			var card = cardsOnHand[i];
			if(card.c == 516 || card.c == 517){
				result.push(i);
			}
		}
		if(result.length == 2){
			return result;
		}else{
			return [];
		}
	},

	/**
	 * 查找feiji帶個子
	 * @param numberMapping {Object}
	 * @param cardsOnHand {Array.<CardVo>}
	 * @param lastHand {CardPattern}
	 * @private
	 */
	_autoPlaneDaiDan:function(numberMap,cardsOnHand,lastHand){
		var result = [];
		var planeArray = [];
		var noSingles = [];
		for(var key in numberMap){
			key = parseInt(key);
			if(parseInt(numberMap[key]) >= 3 && key>lastHand.minIndex){
				planeArray.push(key);
			}
			if(parseInt(numberMap[key]) > 1)
				noSingles.push(key);
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
				var tempMap = {};
				for(var p=0;p<lastHand.planeCount;p++){
					for(var i=0;i<cardsOnHand.length;i++){
						var card = cardsOnHand[i];
						if(card.i == realPlaneArray[p]){
							if(tempMap[i]){
								tempMap[i] += 1;
							}else{
								tempMap[i] = 1;
							}
							if(parseInt(tempMap[i])<=3)
								result.push(i);
						}
					}
				}
				for(var i=(cardsOnHand.length-1);i>=0;i--){//三带1
					if(ArrayUtil.indexOf(result,i) < 0 && result.length<(lastHand.planeCount*4)){
						if(ArrayUtil.indexOf(noSingles,cardsOnHand[i].i) < 0){
							result.push(i);
						}else{
							result.push(i)
						}

					}
				}
			}


		}
		return result;
	},

	/**
	 * 查找feiji帶對子
	 * @param numberMapping {Object}
	 * @param cardsOnHand {Array.<CardVo>}
	 * @param lastHand {CardPattern}
	 * @private
	 */
	_autoPlaneDaiDui:function(numberMap,cardsOnHand,lastHand){
		var result = [];
		var planeArray = [];
		var Singles = [];
		for(var key in numberMap){
			key = parseInt(key);
			if(parseInt(numberMap[key]) >= 3 && key>lastHand.minIndex){
				planeArray.push(key);
			}
			if(parseInt(numberMap[key]) == 2 || parseInt(numberMap[key]) == 3)
				Singles.push(key);
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
				var tempMap = {};
				for(var p=0;p<lastHand.planeCount;p++){
					for(var i=0;i<cardsOnHand.length;i++){
						var card = cardsOnHand[i];
						if(card.i == realPlaneArray[p]){
							if(tempMap[i]){
								tempMap[i] += 1;
							}else{
								tempMap[i] = 1;
							}
							if(parseInt(tempMap[i])<=3)
								result.push(i);
						}
					}
				}
				for(var i=(cardsOnHand.length-1);i>=0;i--){//三带對
					if(ArrayUtil.indexOf(result,i) < 0 && result.length<(lastHand.planeCount*5)){
						if(ArrayUtil.indexOf(Singles,cardsOnHand[i].i) >= 0){
							result.push(i);
						}

					}
				}
			}


		}
		//找不到兩隊制空
		if(result.length<(lastHand.planeCount*5) ){
			result = [];
		}
		return result;
	},


	/**
	 * 智能提示
	 * @param cardsOnHand {Array.<CardVo>}
	 * @param lastHand {CardPattern}
	 * @return {Array.<number>}
	 */
	//SINGLE:1,//单张
	//PAIR:2,//对子
	//THREE:3,//三个不带
	//BOMB:4,//炸弹
	//THREEDAIONE:5, //三带一
	//THREEDAITWO:6,//三带对
	//FORUDAITWODAN: 7,//四代单
	//FORUDAITWODUI: 8,//四带2对
	//SHUNZI:9,//顺子
	//LIANPAIR:10,//连队
	//PLANEBUDAI:11,//飞机不带
	//PLANEDAIDAN:12,//飞机带两单
	//PLANEDAIDUI:13,//飞机带两对
	//KING:20,//大小王炸弹
	//MAX_CARD:20,
	autoFilter:function(cardsOnHand,lastHand,findTimes){
		findTimes = findTimes || 1;
		if(!lastHand){
			return [cardsOnHand.length-1];
		}else{
			var result = [];
			var type = lastHand.type;
			if(type == this.KING){
				return result;
			}
			var length = cardsOnHand.length;
			cc.log("lengthlengthlength"+length);
			var temp = {};
			for(var i=0;i<length;i++){
				var card = cardsOnHand[i];
				if(temp[card.i]){
					temp[card.i] += 1;
				}else{
					temp[card.i] = 1;
				}
				cc.log("cardcard"+card.i+ "temp[card.i]"+temp[card.i]);

			}

			if(DdzRoomModel.promptCardPattern){
				cc.log("typetype"+type +"DdzRoomModel.promptCardPattern.type "+DdzRoomModel.promptCardPattern.type );
				if(DdzRoomModel.promptCardPattern.type == this.BOMB && type != this.BOMB){
					result = this._autoBomb(temp,cardsOnHand,lastHand);
					if(result.length == 0){
						result = this._autoKing(temp,cardsOnHand);
					}
					return result;
				}
			}

			switch (type){
				case this.SINGLE:
					result = this._autoSingle(temp,cardsOnHand,lastHand,findTimes);
					break;
				case this.PAIR:
					if(lastHand.length==2){//单个对子的提示
						result = this._autoPair(temp,cardsOnHand,lastHand,findTimes);
					}
					break;
				case this.THREE:
					result = this._autoThreeBudai(temp,cardsOnHand,lastHand,findTimes);
					break;
				case this.THREEDAIONE:
					result = this._autoThreeDaiDan(temp,cardsOnHand,lastHand);
					break;
				case this.THREEDAITWO:
					result = this._autoThreeDaiDui(temp,cardsOnHand,lastHand);
					break;
				case this.FORUDAITWODAN:
					result = this._autoFourDaidan(temp,cardsOnHand,lastHand);
				case this.FORUDAITWODUI:
					result = this._autoFourDaiDui(temp,cardsOnHand,lastHand);
					break;
				case this.BOMB:
					cc.log("55555");
					result = this._autoBomb(temp,cardsOnHand,lastHand);
					break;
				case this.SHUNZI:
					result = this._autoSequence(1,temp,cardsOnHand,lastHand);
					break;
				case this.PLANEDAIDAN:
					result = this._autoPlaneDaiDan(temp,cardsOnHand,lastHand);
					break;
				case this.PLANEDAIDUI:
					result = this._autoPlaneDaiDui(temp,cardsOnHand,lastHand);
					break;
				case this.LIANPAIR:
					result = this._autoSequence(2,temp,cardsOnHand,lastHand);
					break;
			}
			if(result.length == 0 && type != this.KING){
				if(type == this.BOMB){
					result = this._autoBomb(temp,cardsOnHand,lastHand);
				}else{
					result = this._autoBomb(temp,cardsOnHand);
				}

				if(result.length == 0){
					result = this._autoKing(temp,cardsOnHand);
				}
			}
			return result;
		}
	}
}