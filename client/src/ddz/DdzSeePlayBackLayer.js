/**
 * Created by hujincheng on 2016/7/29.
 * 回放游戏记录
 * @class
 * @extend {Room}
 */
var DdzSeePlayBackLayer = BaseLayer.extend({
	_dt:null,
	_step:0,
	_cardPanel:null,
	_cardW:400,
	_bigCardW:140,
	_cardG:45,
	/**
	 * {Array.<DdzBigCard>}
	 */
	_players:null,
	_lastCardPattern:null,
	seatSeq:{},
	outCards:{},
	handCards:{},
	card1:[],
	card2:[],
	card3:[],
	outCard1:[],
	outCard2:[],
	outCard3:[],
	playBackState:false,

	ctor:function(){
		this._players = {};
		this.playBackState = false;
		this._dt = 0;
		this._step = 0;
		this.card1 = [];
		this.card2 = [];
		this.card3 = [];
		this.outCard1 = [];
		this.outCard2 = [];
		this.outCard3 = [];
		this.seatSeq = PlayBackModel.seatSeq;
		this._super(LayerFactory.SEEPLAYBACK);
	},

	/**
	 * 初始化房间数据
	 */
	initData:function(){
		this.playBackState = false;
		this._step = 0;
		this.card1 = [];
		this.card2 = [];
		this.card3 = [];
		this.outCard1 = [];
		this.outCard2 = [];
		this.outCard3 = [];
		this.dzcard = null;
		this.seatSeq = PlayBackModel.seatSeq;
		if(PlayBackModel.list.length!=2){
			this.img_qipai.visible = false
		}
		for(var i=1;i<=3;i++){
			this.getWidget("player"+i).visible = false;
			this.getWidget("ybq"+i).visible = false;
			this.getWidget("small"+i).removeAllChildren(true);
			this.getWidget("cardPanel"+i).removeAllChildren(true);
			if(i>1)
				this.getWidget("bt"+i).visible = false;
		}
		for(var i=1; i<=4; i++ ){
			this["Image_dp"+(i)] = this.getWidget("Image_dp"+i);
			this["Image_dp"+(i)].visible = false;
			this["Image_dp"+(i)].removeAllChildren();
		}

		if(this.dzcard != null){
			this.removeChild(this.dzcard);
			this.dzcard = null;
		}

		this.updateCard(0,false);
		//this.Label_27.setString(PlayBackModel.tableId);
		this.showTime();
		this.onStep();
		this.scheduleUpdate();
		this.Button_30.loadTextureNormal("res/ui/ddz/buttons/playback3.png");
	},

	selfRender:function(){
		for(var i=1;i<=3;i++){
			if(i>1)
				this.getWidget("bt"+i).visible = false;
			this.getWidget("ybq"+i).visible = false;
			UITools.addClickEvent(this.getWidget("player"+i),this,this.onPlayerInfo);
		}
		this._step = 0;
		this.Button_4 = this.getWidget("Button_4");//后退
		this.Button_6 = this.getWidget("Button_6");//快进
		this.Button_30 = this.getWidget("Button_30");//暂停
		var cardPanel1 = this._cardPanel1 = ccui.helper.seekWidgetByName(this.root,"cardPanel1");
		var cardPanel2 = this._cardPanel2 = ccui.helper.seekWidgetByName(this.root,"cardPanel2");
		var cardPanel3 = this._cardPanel3 = ccui.helper.seekWidgetByName(this.root,"cardPanel3");
		//this.Panel_37 = this.getWidget("Panel_37");
		this.Panel_15 = this.getWidget("Panel_15");
		this.Label_38 = this.getWidget("Label_38");
		this.Label_84 = this.getWidget("Label_84");
		this.battery = this.getWidget("battery");
		this.netType = this.getWidget("netType");
		this.Button_25 = this.getWidget("Button_25");
		//this.Label_27 = this.getWidget("Label_27");
		this.Label_39 = this.getWidget("Label_39");//时间
		this.Label_38_1 = this.getWidget("Label_38_1");//房号
		this.img_qipai = this.getWidget("Image_7");
		//this.Label_27 = new cc.LabelBMFont("","res/font/font_res_huang1.fnt");
		//this.Label_27.x = this.Panel_37.width/2-17;
		//this.Label_27.y = this.Panel_37.height/2;
		//this.Panel_37.addChild(this.Label_27);
		UITools.addClickEvent(this.Button_25,this,this.onReturnHome);
		UITools.addClickEvent(this.Button_30,this,this.onPlayOrPause);
		UITools.addClickEvent(this.Button_4,this,this.onFallBack);
		UITools.addClickEvent(this.Button_6,this,this.onFastForward);

	},

	onPlayerInfo:function(obj){
		this._players[obj.temp].showInfo();
	},

	/**
	 * 解散
	 */
	onReturnHome:function(){
		var layer = LayerFactory.HOME;
		if(LayerManager.getCurrentLayer() != layer){
			this.onStop();
			LayerManager.showLayer(layer);
		}
		if(TotalRecordModel.isShowRecord){
			PopupManager.showPopup(DTZTotalRecordPop);
			TotalRecordModel.isShowRecord = false;
		}
		if(RecordModel.isShowRecord){
			var mc = new RecordPop(RecordModel.data);
			PopupManager.open(mc,true);
			RecordModel.isShowRecord = false;
		}
	},

	/**
	 * 播放或者暂停
	 */
	onPlayOrPause:function(){
		if(this._step != PlayBackModel.step){
			if(!this.playBackState){
				this.onStop();
				this.Button_30.loadTextureNormal("res/ui/ddz/buttons/playback5.png");
				this.playBackState = !this.playBackState;
			}else{
				this.scheduleUpdate();
				this.Button_30.loadTextureNormal("res/ui/ddz/buttons/playback3.png");
				this.playBackState = !this.playBackState;
			}
		}else{
			this.initData();
			this.Button_30.loadTextureNormal("res/ui/ddz/buttons/playback3.png");
			this.playBackState = false;
		}
	},

	/**
	 * 后退
	 */
	onFallBack:function(){
		if(this._step == 0){
			FloatLabelUtil.comText("无法再后退！");
		}else{
			this.updateCard(this._step,true);
			this._step--;
			this.onStep();
			if(!this.playBackState){
				this.onStop();
				this.Button_30.loadTextureNormal("res/ui/ddz/buttons/playback5.png");
				this.playBackState = !this.playBackState;
			}
		}
	},

	/**
	 * 快进
	 */
	onFastForward:function(){
		if(this._step == PlayBackModel.step){
			this.onStop();
			return FloatLabelUtil.comText("无法再快进！");
		}else{
			this._step++;
			this.onStep();
			this.updateCard(this._step,false);
			if(!this.playBackState){
				this.onStop();
				this.Button_30.loadTextureNormal("res/ui/ddz/buttons/playback5.png");
				this.playBackState = !this.playBackState;
			}
			if(this._step == PlayBackModel.step){
				this.onChangeBtnStauts();
				return FloatLabelUtil.comText("记录结束！");
			}

		}
	},

	/**
	 * 播放完成改变按钮状态
	 * @param event
	 */
	onChangeBtnStauts:function(){
		if(this._step == PlayBackModel.step){
			this.onStop();
			this.Button_30.loadTextureNormal("res/ui/ddz/buttons/playback5.png");
			this.playBackState = false;
		}
	},

	showTime:function(){
		cc.log("12345"+PlayBackModel.time);
		this.Label_39.setString(PlayBackModel.time);
		this.Label_38_1.setString("房号："+PlayBackModel.tableId);

	},

	onStop:function(){
		this.unscheduleUpdate();
	},

	onStep:function(){
		this.Label_84.setString("进度："+this._step+"/"+PlayBackModel.step);
	},

	update:function(dt){
		this._dt += dt;
		if(this._dt>=2){
			this._dt = 0;
			if(PlayBackModel.step == 0){
				this.onChangeBtnStauts();
				isOver = true;
				FloatLabelUtil.comText("记录结束！");
				return;
			}
			this._step++;
			var isOver = false;
			if(this._step == PlayBackModel.step){
				this.onChangeBtnStauts();
				isOver = true;
				FloatLabelUtil.comText("记录结束！");
			}
			this.onStep();
			//刷新玩家牌
			this.updateCard(this._step,false);
		}
	},

	getPlayerSeq:function(userId,ownSeat,seat){
		if(userId == PlayerModel.userId)
			return 1;
		var seqArray = this.seatSeq[ownSeat];
		var seq = ArrayUtil.indexOf(seqArray,seat)+1;
		return seq;
	},

	cleanXiazhu:function()
	{
		for(var i in this._players){
			this._players[i].hideXiazhu();
		}

	},
	diDzPai:function(dipai)
	{
		if(this.dzcard){
			this.removeChild(this.dzcard);
			this.dzcard = null;
		}
		var cardst = DdzAI.getCardDef(dipai);
		this.dzcard = new DdzBigCard(cardst);
		this.dzcard.anchorX=this.dzcard.anchorY=0.5;
		this.dzcard.x = 640;
		this.dzcard.y = 360;
		this.addChild(this.dzcard);
	},
	updateCard:function(step,fal){
		PlayBackModel.setData(step,fal);
		cc.log("fffstepstep"+step);
		var state = false;
		if(step == 0){
			for(var i=0;i<PlayBackModel.list.length;i++){
				var seq = this.getPlayerSeq(PlayBackModel.list[i].userId,PlayBackModel.mySeat, PlayBackModel.list[i].seat);
				this.initCard(PlayBackModel["cardData"+seq],PlayBackModel.list[i]);
			}
		}else{
			if(PlayBackModel.players[step+(PlayBackModel.list.length-1)].split("_")[1] == 2){
				var xiazhuSeat = PlayBackModel.players[step+(PlayBackModel.list.length-1)].split("_")[0];
				var bet = PlayBackModel.players[step+(PlayBackModel.list.length-1)].split("_")[2];
				this._players[xiazhuSeat].xiaZhu(bet);
			}else if(PlayBackModel.players[step+(PlayBackModel.list.length-1)].split("_")[1] == 3) {
				var zjSeat = PlayBackModel.players[step+(PlayBackModel.list.length-1)].split("_")[0];
				this._players[zjSeat].showDIzhu();
				var that = this;
				if(this.dzcard){
					var action = cc.sequence(cc.delayTime(0.8), cc.moveTo(0.2,that._players[zjSeat].iconbg.x, that._players[zjSeat].iconbg.y), cc.delayTime(1.5), cc.callFunc(function () {
						that.removeChild(that.dzcard);
						that.dzcard = null;
					}));
					this.dzcard.runAction(action);
				}
				var handles = PlayBackModel.players[step+(PlayBackModel.list.length-1)].split("_")[2];
				var dipai =  handles.split(",");
				var curSeq = this.getPlayerSeq(-1,PlayBackModel.mySeat,zjSeat);
				for(var j=0;j<dipai.length;j++){
					var card = new DdzBigCard(DdzAI.getCardDef(dipai[j]));
					card.anchorX = card.anchorY = 0.5;
					card.x = this["Image_dp"+(j+1)].width/2;
					card.y = this["Image_dp"+(j+1)].height/2;
					this["Image_dp"+(j+1)].visible = true;
					this["Image_dp"+(j+1)].addChild(card);
					if(PlayBackModel["cardData"+curSeq].indexOf(dipai[j]) == -1){
						PlayBackModel["cardData"+curSeq].push(dipai[j]);
					}
				}

				for(var i=0;i<PlayBackModel.list.length;i++){
					if(PlayBackModel.list[i].seat == zjSeat){
						this.updateHandCard(PlayBackModel["cardData"+curSeq],PlayBackModel.list[i],fal);
						this.cleanTestOutCards(PlayBackModel["outCardData"+curSeq],zjSeat,fal,state);//清掉出过的牌
					}
				}
			}else if(PlayBackModel.players[step+(PlayBackModel.list.length-1)].split("_")[1] == 4){
				var Pai = PlayBackModel.players[step+(PlayBackModel.list.length-1)].split("_")[2];
				this.diDzPai(Pai);

			}else{
				if(step <=7){
					this.cleanXiazhu();
				}
				var seat = PlayBackModel.players[step+(PlayBackModel.list.length-1)].split("_")[0];
				var curSeq = this.getPlayerSeq(-1,PlayBackModel.mySeat,seat);
				for(var i=0;i<PlayBackModel.list.length;i++){
					if(PlayBackModel.list[i].seat == seat){
						this.updateHandCard(PlayBackModel["cardData"+curSeq],PlayBackModel.list[i],fal);
					}
				}
				this.updateOutCards(PlayBackModel["outCardData"+curSeq],seat,fal,state);//更新出过的牌
				if(step>1 && fal==true){
					state = true;
					var beforeSeat = PlayBackModel.players[step+(PlayBackModel.list.length-2)].split("_")[0];
					var beforeSeq = this.getPlayerSeq(-1,PlayBackModel.mySeat,beforeSeat);
					this.updateOutCards(PlayBackModel["outCardData"+beforeSeq],beforeSeat,fal,state);//更新上首出过的牌
					if(step>2 && PlayBackModel.list.length>2){
						var nextSeat = PlayBackModel.players[step].split("_")[0];
						var nextSeq = this.getPlayerSeq(-1,PlayBackModel.mySeat,nextSeat);
						this.updateOutCards(PlayBackModel["outCardData"+nextSeq],nextSeat,fal,state,true);//更新下首出过的牌
					}
				}
			}

		}
	},

	initCard:function(cards,list){
		var handcard = [];
		for(var key in cards){
			handcard.push(DdzAI.getCardDef(cards[key]));
		}
		var p = list;
		p.handCardIds = handcard;
		p.ip = "xxx";
		if(this.card1.length == 0 || this.card2.length == 0 || this.card3.length == 0){
			var index = this.getPlayerSeq(list.userId,PlayBackModel.mySeat, list.seat);
			this.getWidget("cardPanel"+index).removeAllChildren(true);
			var seq = this.getPlayerSeq(p.userId,PlayBackModel.mySeat, p.seat);
			var CardPlayBack = this._players[p.seat] = new DdzCardPlayBack(p,this.root,seq);
			this.createCard(p, 0);
		}
	},

	updateHandCard:function(cards,list,fal){
		var p = list;
		var handcard = [];
		for(var key in cards){
			handcard.push(DdzAI.getCardDef(cards[key]));
		}
		var p = list;
		p.handCardIds = handcard;
		if(p.seat == PlayBackModel.mySeat){
			this._cardPanel1.removeAllChildren(true);
			this.card1 = [];
		}else if(p.seat == this.seatSeq[PlayBackModel.mySeat][1]){
			this._cardPanel2.removeAllChildren(true);
			this.card2 = [];
		}else{
			this._cardPanel3.removeAllChildren(true);
			this.card3 = [];
		}
		this.createCard(p);
		if(handcard.length == 1){
			this._players[p.seat].baoting();
		}else{
			this._players[p.seat]._isBt = false;
			if(p.seat != PlayBackModel.mySeat){
				this._players[p.seat].bt.visible = false;
			}
		}
	},

	cleanTestOutCards:function(cards,seat,fal,state,play){
		this._lastCardPattern = null;
		var mySeat = PlayBackModel.mySeat;
		if(fal == false){
			var nextSeq = this.getPlayerSeq(-1,mySeat,this.seatSeq[seat][1]);
			this.getWidget("small"+nextSeq).removeAllChildren(true);
			this.getWidget("ybq"+nextSeq).visible = false;
		}
		if(fal == false){
			var nextSeq = this.getPlayerSeq(-1,mySeat,this.seatSeq[seat][1]);
			this.getWidget("small"+nextSeq).removeAllChildren(true);
			this.getWidget("ybq"+nextSeq).visible = false;
		}
		if(cards.length == 0 && fal == false){
			return;
		}else if(fal == true && !state){
			var curSeq = this.getPlayerSeq(-1,mySeat,seat);
			this.getWidget("small"+curSeq).removeAllChildren(true);
			return;
		}
		if(cards.length == 0 && fal == true){
			return;
		}
	},

	updateOutCards:function(cards,seat,fal,state,play){
		this._lastCardPattern = null;
		var buyao = false;
		var mySeat = PlayBackModel.mySeat;
		if(fal == false){
			var nextSeq = this.getPlayerSeq(-1,mySeat,this.seatSeq[seat][1]);
			this.getWidget("small"+nextSeq).removeAllChildren(true);
			this.getWidget("ybq"+nextSeq).visible = false;
		}
		if(cards.length == 0 && fal == false){
			buyao = true;
			this._players[seat].showStatus(-1);
			return;
		}else if(fal == true && !state){
			var curSeq = this.getPlayerSeq(-1,mySeat,seat);
			this.getWidget("small"+curSeq).removeAllChildren(true);
			this.getWidget("ybq"+curSeq).visible = false;
			return;
		}
		if(cards.length == 0 && fal == true){
			buyao = true;
			var curSeq = this.getPlayerSeq(-1,mySeat,seat);
			this.getWidget("ybq"+curSeq).visible = true;
			return;
		}
		AudioManager.play("res/audio/common/audio_card_out.mp3");
		var seq = 1;
		if(seat == PlayBackModel.mySeat){
			seq = 1;
		}else if(seat == this.seatSeq[PlayBackModel.mySeat][1]){
			seq = this.getPlayerSeq(-1,mySeat,seat);
		}else if(seat == this.seatSeq[mySeat][2]){
			seq = this.getPlayerSeq(-1,mySeat,seat);
		}
		var handcard = [];
		for(var key in cards){
			handcard.push(DdzAI.getCardDef(cards[key]));
		}

		if(!play){
				this._lastCardPattern = DdzAI.filterCards(handcard);
				if(!buyao)
					DdzRoomSound.letOutSound(this._players[seat].getPlayerVo().userId,this._lastCardPattern,-1);
				DdzRoomEffects.play(this.root,this._lastCardPattern);
		}
		var copyCardIds = ArrayUtil.clone(cards);
		length = copyCardIds.length;
		var smallW = this._bigCardW*0.6;
		if(seq == 1){
			initX = (800 - (smallW+30*(length-1)))/2;
		}else if(seq == 2) {
			initX = (800-smallW);
			copyCardIds.reverse();
		}else{
			initX = 0;
		}
		for(var i=0;i<length;i++){
			var smallCard = new DdzSmallCard(DdzAI.getCardDef(copyCardIds[i]));
			smallCard.anchorX=smallCard.anchorY=0;
			smallCard.scale = 0.6;
			if(seq == 2){
				smallCard.x = initX-i*30;
				smallCard.setLocalZOrder(length-i);
			}else{
				smallCard.x = initX+i*30;
			}
			smallCard.y = 0;
			this.getWidget("small"+seq).addChild(smallCard);
		}
	},

	createCard:function(p,step){
		var cards = p.handCardIds;
		if(cards.length>0){
			this._players[p.seat].deal(p.handCardIds);
			var winSize = cc.director.getWinSize();
			var centerX = (winSize.width - this._cardW)/2;
			var initX = (winSize.width - (this._cardW+this._cardG*(cards.length-1)))/2;
			var initY = (winSize.height - (this._cardW+0.4*this._cardG*(cards.length-1)))/2;
			for(var i=0;i<cards.length;i++){
				var card = new DdzBigCard(cards[i]);
				card.cardId = i;
				card.anchorX=card.anchorY=0;
				var realX = initX+i*this._cardG;
				card.x = centerX;
				card.y = 0;
				if(p.seat == PlayBackModel.mySeat){
					card.setScale(0.8);
					this.card1.push(card);
					this._cardPanel1.addChild(card);
				}else if(p.seat == this.seatSeq[PlayBackModel.mySeat][1]){
					card.setScale(0.6);
					realX = initY+i*20;
					this.card2.push(card);
					this._cardPanel2.addChild(card);
				}else{
					card.setScale(0.6);
					realX = initY+i*20;
					this.card3.push(card);
					this._cardPanel3.addChild(card);
				}
				if(step == 0)
					card.letOutAnimate(realX);
			}
			if(step != 0 && p.handCardIds.length>0){
				if(p.seat == PlayBackModel.mySeat){
					var length = this.card1.length;
					if(length>0){
						for(var i=0;i<length;i++){
							this.card1[i].x = realX = initX+i*this._cardG;
							this.card1[i].cardId = i;
						}
					}
				}else if(p.seat == this.seatSeq[PlayBackModel.mySeat][1]){
					var length = this.card2.length;
					if(length>0){
						for(var i=0;i<length;i++){
							this.card2[i].x = realX = initY+i*20;
							this.card2[i].cardId = i;
						}
					}
				}else{
					var length = this.card3.length;
					if(length>0){
						for(var i=0;i<length;i++){
							this.card3[i].x = realX = initY+i*20;
							this.card3[i].cardId = i;
						}
					}
				}
			}
		}
	}
});