/**
 * Created by zhoufan on 2015/8/15.
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
var DdzRoom = BaseLayer.extend({
	_cardPanel:null,
	_cardW:90,
	_cardG:48,
	/**
	 * {Array.<DdzBigCard>}
	 */
	_cards:[],
	_allCards:[],
	_cCardPattern:null,
	_lastCardPattern:null,
	_lastLetOutSeat:0,
	_touchedCards:null,
	_touchListener:null,
	_startId:null,
	_currentlyMoveId:null,
	_startX:null,
	_touchBeganX:null,
	_isLeft2Right:false,
	_isLeft2RightWithBegan:false,
	_players:null,
	seatSeq:{},
	_letOutButtonTouchable:null,

	ctor:function(json){
		this._letOutButtonTouchable = true;
		this._cards = [];
		this._allCards = [];
		this._touchedCards = [];
		this._players = {};
		this.seatSeq = DdzRoomModel.seatSeq;
		cc.log("json==="+json);
		this._super(json);
	},

	isForceRemove:function(){
		return true;
	},

	selfRender:function(){
		for(var i=1;i<=3;i++){
			if(i>1)
				this.getWidget("bt"+i).visible = false;
			this.getWidget("ybq"+i).visible = false;
			UITools.addClickEvent(this.getWidget("player"+i),this,this.onPlayerInfo);
		}
		this.yuyin = this.getWidget("yuyin");//语音
		this.yuyin.visible = false;
		this.Image_40 = this.getWidget("Image_40");//闹钟
		this.Label_56 = this.getWidget("Label_56");//第几局
		this.Button_6 = this.getWidget("Button_6")//出牌;
		this.Button_4 = this.getWidget("Button_4")//提示;
		this.Button_buyao = this.getWidget("Button_buyao")//buyao;
		this.Button_fen1 = this.getWidget("Button_fen1");
		this.Button_fen2 = this.getWidget("Button_fen2");
		this.Button_fen3 = this.getWidget("Button_fen3");
		this.Button_bj = this.getWidget("Button_bj");
		this.Button_30 = this.getWidget("Button_30");//准备
		//this.Button_20 = this.getWidget("Button_20");//退出房间
		this.Button_25 = this.getWidget("Button_54");//解散房间
		this.Image_set = this.getWidget("Image_set");
		//this.Button_sset = this.getWidget("Button_sset");
		//UITools.addClickEvent(this.Button_sset,this,this.onZhanKai)
		this.Button_6.visible = this.Button_4.visible = false;
		this.Button_17 = this.getWidget("Button_17");//邀请微信好友
		this.Button_17.visible = false;
		this.Label_27 = this.getWidget("Label_27");
		this.Label_39 = this.getWidget("Label_39");//时间
		this.Button_40 =this.getWidget("Button_40");//语音按钮
		this.Button_42 =this.getWidget("Button_42");//快捷聊天
		//this.Button_23 =this.getWidget("Button_23");//设置
		this.Button_55 =this.getWidget("Button_55");//wanfa
		this.Button_55.visible = true;
		//this.Image_dp1 =this.getWidget("Image_dp1");
		//this.Image_dp2 =this.getWidget("Image_dp2");
		//this.Image_dp3 =this.getWidget("Image_dp3");
		for(var i=1; i<=4; i++){
			this["Image_dp" + i] = this.getWidget("Image_dp"+i);
		}
		this.Label_35 =this.getWidget("Label_beilv");
		this.Image_7 = this.getWidget("Image_7");
		this.Button_21 = this.getWidget("Button_21");
		if(SyConfig.HAS_GPS && DdzRoomModel.renshu > 2 && DdzRoomModel.ext[6] == 1){
			this.Button_21.visible = true;
		}else{
			this.Button_21.visible = false;
		}
		if(GPSModel.getGpsData(PlayerModel.userId) == null){
			this.Button_21.setBright(false);
		}else{
			this.Button_21.setBright(true);
		}
		UITools.addClickEvent(this.Button_21,this,this.onGpsPop);

		//if(SyConfig.isIos())
		//  this.Button_40.visible = false;
		UITools.addClickEvent(this.Button_42,this,this.onChat);
		//UITools.addClickEvent(this.Button_23,this,this.onSetUp);
		UITools.addClickEvent(this.Button_55,this,this.onWanfaUp);
		var cardPanel = this._cardPanel = ccui.helper.seekWidgetByName(this.root,"cardPanel");
		if (SdkUtil.is316Engine()) {
			cardPanel.setSwallowTouches(true);
			cardPanel.setTouchEnabled(true);
			cardPanel.addTouchEventListener(this.onTouchCardPanel,this);
		}else{
			this._touchListener = cc.EventListener.create({
				event: cc.EventListener.TOUCH_ONE_BY_ONE,
				swallowTouches: true,
				onTouchBegan: this.onTouchBegan.bind(this),
				onTouchMoved: this.onTouchMoved.bind(this),
				onTouchEnded: this.onTouchEnded.bind(this)
			});
			cc.eventManager.addListener(this._touchListener, cardPanel);
		}

		this.addCustomEvent(SyEvent.DOUNIU_INTERACTIVE_PROP,this,this.runPropAction);
	},

	onTouchCardPanel:function(obj,type) {
		if (type == ccui.Widget.TOUCH_BEGAN){
			this.isTuoguan = false;
			this.isTuoguan = DDZCardDelegate.dealTouchBegin(this , obj , type);
		}else if(type == ccui.Widget.TOUCH_MOVED && this.isTuoguan){
			DDZCardDelegate.dealTouchMove(this , obj , type);
		}else if(type == ccui.Widget.TOUCH_ENDED && this.isTuoguan){
			DDZCardDelegate.dealTouchEnded(this , obj , type);
		}else if(type == ccui.Widget.TOUCH_CANCELED && this.isTuoguan){
			DDZCardDelegate.dealTouchEnded(this , obj , type);
		}
		if(type == ccui.Widget.TOUCH_ENDED && !this.isTuoguan){
			this.onCancelSelect();
		}
	},

	onGpsPop:function(){
		PopupManager.addPopup(new GpsPop(DdzRoomModel , DdzRoomModel.renshu));
	},

	onZhanKai:function(){
		this.Image_set.visible = !this.Image_set.visible;
	},

	onPlayerInfo:function(obj){
		this._players[obj.temp].showInfo();
	},

	onWanfaUp:function() {
		//this.Button_55.visible = false;
		if (DdzRoomModel.isMoneyRoom()){
			var mc = new SetUpPop();
			PopupManager.addPopup(mc);
		}else{
			var mc = new pdkRoomSetPop();
			PopupManager.addPopup(mc);
		}

		//var mc = new ZhankaiPop();
		//PopupManager.addPopup(mc);
	},

	onSetUp:function(){
		var mc = new SetUpPop();
		PopupManager.addPopup(mc);
	},

	onChat:function(){
		var mc = new ChatPop();
		PopupManager.addPopup(mc);
	},

	unSelectAllCards:function(){
		for(var i=0;i<this._cards.length;i++){
			var card = this._cards[i];
			if(card.isSelected())
				card.unselected();
		}
	},

	hitTest: function (target,point){
		if (SdkUtil.is316Engine()){
			return target.hitTest(point,cc.Camera.getVisitingCamera(),null);
		}else{
			return target.hitTest(point);
		}
	},

	enableAllCards:function(){
		for(var i=0;i<this._cards.length;i++){
			this._cards[i].enableAction();
		}
	},

	onTouchBegan: function (touch, event) {
		var touchPoint = null;
		if (SdkUtil.is316Engine()){
			touchPoint = touch.getTouchBeganPosition();
		}else{
			touchPoint = touch.getLocation();
		}
		this._touchBeganX = touchPoint.x;
		this._startX = touchPoint.x;
		var length = this._cards.length;
		this._startId = -1;
		this._currentlyMoveId = -1;
		for(var i=0;i<length;i++){
			var card = this._cards[i];
			if(this.hitTest(card,touchPoint)){
				if(card.cardId>this._startId){
					this._startId = card.cardId;
					this._currentlyMoveId = card.cardId;
				}
			}
		}
		if(this._startId>=0){
			this._cards[this._startId].touched();
			return true;
		}
		return false;
	},

	onTouchMoved: function (touch, event) {
		var touchPoint = null;
		if (SdkUtil.is316Engine()){
			touchPoint = touch.getTouchMovePosition();
		}else{
			touchPoint = touch.getLocation();
		}
		this._isLeft2Right = (touchPoint.x>this._startX);
		this._isLeft2RightWithBegan = (touchPoint.x>this._touchBeganX);
		this._startX = touchPoint.x;
		var length = this._cards.length;
		var endedId = -1;
		for(var i=0;i<length;i++){
			var card = this._cards[i];
			if(this.hitTest(card,touchPoint)){
				if(card.cardId > endedId)
					endedId = card.cardId;
			}
		}
		if(endedId < 0){
			if(this._isLeft2Right){
				if(touchPoint.x>(this._cards[length-1].x+100))//过滤掉边缘
					endedId = DdzAI.MAX_CARD-1;
			}else{
				if(touchPoint.x<this._cards[0].x)
					endedId = 0;
			}
			if(endedId<0)
				return;
		}
		for(var i=0;i<length;i++){
			var card = this._cards[i];
			if(this._isLeft2Right){
				if(card.cardId>=this._currentlyMoveId && card.cardId<=endedId){
					if(card.cardId==this._startId && this.hitTest(card,touchPoint) && card.isEnable()){
						//noting to do
					}else{
						this._currentlyMoveId = card.cardId;
						card.onTouchMove(this._isLeft2Right);
					}
				}
			}else{
				if(card.cardId>=endedId && card.cardId<=this._currentlyMoveId){
					if(card.cardId==endedId && this.hitTest(card,touchPoint) && card.isEnable()){
						//noting to do
					}else{
						this._currentlyMoveId = card.cardId;
						card.onTouchMove(this._isLeft2Right);
					}
				}
			}
		}
	},

	onTouchEnded: function (touch, event) {
		this._allCards.length = 0;
		var touchPoint = null;
		if (SdkUtil.is316Engine()){
			touchPoint = touch.getTouchMovePosition();
		}else{
			touchPoint = touch.getLocation();
		}
		var length = this._cards.length;
		var endedId = -1;
		for(var i=0;i<length;i++){
			var card = this._cards[i];
			if(this.hitTest(card,touchPoint)){
				if(card.cardId > endedId)
					endedId = card.cardId;
			}
		}

		//是否单击
		var hasSelectCards = false;
		for(var i=0;i<length;i++) {
			var card = this._cards[i];
			if(card.isSelected()){
				hasSelectCards = true;
				break;
			}
		}

		if(endedId < 0){
			endedId = this._isLeft2RightWithBegan ? DdzAI.MAX_CARD-1 : 0;
		}
		for(var i=0;i<length;i++){
			var card = this._cards[i];
			if(this._isLeft2RightWithBegan){
				if(card.cardId>=this._startId && card.cardId<=endedId)
					card.touched();
			}else{
				if(card.cardId>=endedId && card.cardId<=this._startId)
					card.touched();
			}
		}
		var allCards = [];
		for (var i = 0; i < this._cards.length; i++) {
			var card = this._cards[i];
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
				for (var j = 0; j < this._cards.length; j++) {
					var card = this._cards[j];
					if (card._cardVo.c == removeCards[i].c) {
						card.selectAction();
					}
				}
			}
		}

		this._allCards = allCards;
		this.isCanLetOut();
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

	changeLetOutButton:function(isTouch){
		if(isTouch == this._letOutButtonTouchable)
			return;
		this._letOutButtonTouchable = isTouch;
		if(isTouch){
			this.Button_6.setTouchEnabled(true);
			this.Button_6.loadTextureNormal("res/ui/ddz/room/room_an_0003.png");
		}else{
			this.Button_6.setTouchEnabled(false);
			this.Button_6.loadTextureNormal("res/ui/ddz/room/chupaihui.png");
		}
	},

	isCanLetOut:function(){
		//cc.log("isCanLetOut1::"+JSON.stringify(this._lastCardPattern));
		if(this._lastCardPattern){
			cc.log("this._lastCardPattern"+this._lastCardPattern.type);
		}else{
			cc.log("778899");
		}

		this._cCardPattern = DdzAI.filterCards(this._allCards,this.getCardsOnHand(),this._lastCardPattern);
		cc.log("isCanLetOut2::"+JSON.stringify(this._cCardPattern));
		if(this._lastCardPattern && this._cCardPattern && this._cCardPattern.type != this._lastCardPattern.type && this._cCardPattern.type != DdzAI.BOMB && this._cCardPattern.type != DdzAI.KING)
			this._cCardPattern = null;
		//cc.log("isCanLetOut3::"+JSON.stringify(this._cCardPattern));
		this.changeLetOutButton((this._cCardPattern!=null));

		if(this._allCards.length<=0)//把选中的牌全部取消了,提示的数据也需要清掉
			DdzRoomModel.prompt(null);
	},

	/**
	 * 初始化卡牌
	 * @param cards {Array.<CardVo>}
	 */
	initCards:function(cards){
		if(this._cards.length>0){//清理掉上一局的牌
			for(var i=0;i<this._cards.length;i++){
				this._cardPanel.removeChild(this._cards[i]);
			}
			this._cards.length=0;
		}
		if(this._cards.length == 0){
			var winSize = cc.director.getWinSize();
			var centerX = (winSize.width - this._cardW)/2;
			var initX = (winSize.width - (this._cardW+this._cardG*(cards.length-1)))/2;
			for(var i=0;i<cards.length;i++){
				var card = new DdzBigCard(cards[i]);
				card.cardId = i;
				card.anchorX=card.anchorY=0;
				var realX = initX+i*this._cardG;
				card.x = centerX;
				card.y = 20;
				this._cardPanel.addChild(card);
				this._cardPanel.setLocalZOrder(1);
				this._cards.push(card);
				card.letOutAnimate(realX);
				if(i == cards.length-1){
					if(DdzRoomModel.isDizhu(DdzRoomModel.getPlayerVo())){
						var sp = new cc.Sprite("res/ui/ddz/tongyong/dizhuPai.png");
						sp.x = card.width/3*2 -2;
						sp.y = card.height/4*3 -1;
						card.addChild(sp);
					}
				}
			}

		}
	},

	getPlayerSeq:function(userId,ownSeat,seat){
		if(userId == PlayerModel.userId)
			return 1;
		var seqArray = this.seatSeq[ownSeat];
		var seq = ArrayUtil.indexOf(seqArray,seat)+1;
		return seq;
	},

	/**
	 *
	 * @returns {Array.<CardVo>}
	 */
	getCardsOnHand:function(){
		var result = [];
		for(var i=0;i<this._cards.length;i++){
			result.push(this._cards[i].getData());
		}
		return result;
	},


	letOutCards:function(cardIds,seat,isOver){
		if(!isOver){
			var nextSeq = this.getPlayerSeq(-1,DdzRoomModel.mySeat,this.seatSeq[seat][1]);
			this.getWidget("small"+nextSeq).removeAllChildren(true);
		}else{
			if(cardIds.length>0){
				var overSeq = this.getPlayerSeq(-1,DdzRoomModel.mySeat,seat);
				this.getWidget("small"+overSeq).removeAllChildren(true);
			}
		}
		if(cardIds.length==0)
			return;
		AudioManager.play("res/audio/common/audio_card_out.mp3");
		var seq = 1;
		if(seat == DdzRoomModel.mySeat){//自己出牌
			var cards = this._cards;
			for(var n=0;n<cardIds.length;n++){
				for(var i=0;i<cards.length;i++){
					var card = cards[i];
					if(card.getData().c == cardIds[n]){
						this._cardPanel.removeChild(card);
						this._cards.splice(i,1);
						break;
					}
				}
			}
			var winSize = cc.director.getWinSize();
			var length = this._cards.length;
			var initX = (winSize.width - (this._cardW+this._cardG*(length-1)))/2;
			for(var i=0;i<length;i++){
				this._cards[i].x = initX+i*this._cardG;
				this._cards[i].cardId = i;
				if(i == length-1){
					if(DdzRoomModel.isDizhu(DdzRoomModel.getPlayerVo())){
						var sp = new cc.Sprite("res/ui/ddz/tongyong/dizhuPai.png");
						sp.x = this._cards[i].width/3*2 -2;
						sp.y = this._cards[i].height/4*3 -1;
						this._cards[i].addChild(sp);
					}
				}
			}
		}else{
			seq = this.getPlayerSeq(-1,DdzRoomModel.mySeat,seat);

			var playerVo=DdzRoomModel.getPlayerVoBySeat(seat);
			if(playerVo!=null){
				if(!isOver){
					playerVo.ext[1]-=cardIds.length;
				}
				if(this._players[seat]){
					this._players[seat].showLastCard();
				}
			}

		}
		var copyCardIds = ArrayUtil.clone(cardIds);
		copyCardIds.reverse();
		length = copyCardIds.length;
		var smallW = this._cardW*0.6;
		if(seq == 1){
			initX = (800 - (smallW+30*(length-1)))/2;
		}else if(seq == 2) {
			initX = (800-smallW);
			copyCardIds.reverse();
		}else{
			initX = 0;
		}
		this.getWidget("small"+seq).removeAllChildren(true);
		var dzLength = 0;
		var dimoveX = 0;
		for(var i=0;i<length;i++){
			var smallCard = new DdzSmallCard(DdzAI.getCardDef(copyCardIds[i]));
			smallCard.anchorX=smallCard.anchorY=0;
			smallCard.scale = 0.6;
			if(seq == 2){
				if(i>9){
					smallCard.x = initX-(i-10)*30;
					smallCard.y = -50;
					smallCard.setLocalZOrder(50+length-i);
				}else{
					smallCard.x = initX-i*30;
					smallCard.y = 0;
					smallCard.setLocalZOrder(length-i);
				}

			}else{
				if(seq == 3){
					if(i>9){
						smallCard.x = initX+(i-10)*30;
						smallCard.y = -50;
					}else{
						smallCard.x = initX+i*30;
						smallCard.y = 0;
					}
				}else if(seq == 1){
					smallCard.x = initX+i*30;
					smallCard.y = 0;
				}
			}

			if(seq != 2){
				dzLength = length-1;
				dimoveX = -12;
			}else{
				dimoveX = -11;
			}
			if(i == dzLength){
				if(DdzRoomModel.isDizhu(DdzRoomModel.getPlayerVoBySeat(seat))){
					var sp = new cc.Sprite("res/ui/ddz/tongyong/dizhuPai.png");
					sp.x = smallCard.width/4*3 -11;
					sp.y = smallCard.height/3*2 +13;
					smallCard.addChild(sp);
				}
			}

			this.getWidget("small"+seq).addChild(smallCard);
		}
	},

	runPropAction:function(event){
		//seat 接收者的座位号  userId表示发送者的userId  content表示道具的索引值
		var data = event.getUserData();
		var userId = data.userId;
		var seat = data.seat;
		var content = data.content;
		cc.log("content..." , content);
		var p = DdzRoomModel.getPlayerVo(userId);
		var fromPlayer = this._players[p.seat];
		var targetPlayer = this._players[seat];
		if(fromPlayer._playerVo.userId != targetPlayer._playerVo.userId) {
			var url = "res/ui/dtz/chat/prop" + content + ".png";
			var prop = new cc.Sprite(url);
			var initX = fromPlayer.getContainer().x;
			var initY = fromPlayer.getContainer().y;
			var x = initX;
			var y = initY;
			prop.setPosition(x, y);
			this.root.addChild(prop,2000);
			initX = targetPlayer.getContainer().x;
			initY = targetPlayer.getContainer().y;
			var targetX = initX;
			var targetY = initY - 40;
			cc.log("fromPlayer._playerVo.seat... " , p.seat , targetX , targetY);
			var action = cc.sequence(cc.moveTo(0.3, targetX, targetY), cc.callFunc(function () {
				targetPlayer.playPropArmature(content);
				prop.removeFromParent(true);
			}));
			prop.runAction(action);
		}else{
			targetPlayer.playPropArmature(content);
		}
	},
});
