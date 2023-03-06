/**
 * Created by zhoufan on 2015/8/22.
 * @class
 * @extend {Room}
 */
var DdzOnlineRoom = DdzRoom.extend({
	/** @lends OnlineRoom.prototype */

	_statusMap:null,
	_dt:null,
	_countDown:null,
	_timedt:null,

	ctor:function(){
		this._statusMap = {};
		this._dt = 0;
		this._countDown = 30;
		this._loacationDt = 0;
		this.countDownLabel = null;
		this._timedt = 0;
		this._super(LayerFactory.DDZ_ROOM);
	},
	hideJiantou:function()
	{
		for(var i=1;i<=3;i++){
			this.getWidget("tip"+i).visible = false;
		}
	},

	/**
	 * 初始化房间数据
	 */
	initData:function(){
		this.Image_qiepai.visible = false;
		this.seatSeq = DdzRoomModel.seatSeq;
		sy.scene.hideLoading();
		PopupManager.removeClassByPopup(CutCardPop);
		this.Label_38.setString("房号"+ DdzRoomModel.tableId);
		this.Button_qiepai.visible = false;
		this.Button_55.visible = true;
		//this.Image_40.visible = false;
		this.hideJiantou();
		this.Image_baodan.visible = false;
		this.Label_jushu.setString("第"+DdzRoomModel.nowBurCount+"/"+DdzRoomModel.totalBurCount+"局");
		this.Label_35.setString(DdzRoomModel.ext[1]);
		this._players = {};
		var players = DdzRoomModel.players;
		for(var i=1;i<=3;i++){
			this.getWidget("player"+i).visible = false;
			this.getWidget("ybq"+i).visible = false;
			this.getWidget("small"+i).removeAllChildren(true);
			if(i>1)
				this.getWidget("bt"+i).visible = false;
		}
		if(this._cards.length>0){//清理掉上一局的牌
			for(var i=0;i<this._cards.length;i++){
				this._cardPanel.removeChild(this._cards[i]);
			}
			this._cards.length=0;
		}
		this._lastCardPattern = null;
		this.Button_30.visible = true;
		this.refreshStatus();
		var isContinue = false;//是否是恢复牌局
		for(var i=0;i<players.length;i++){
			var p = players[i];
			isContinue = (p.handCardIds.length>0 || p.outCardIds.length>0);
			if(isContinue)
				break;
		}
		for(var i=0;i<players.length;i++){
			var isYbq = false;
			var p = players[i];
			var seq = this.getPlayerSeq(p.userId,DdzRoomModel.mySeat, p.seat);
			var cardPlayer = this._players[p.seat] = new DdzCardPlayer(p,this.root,seq);
			if(p.status)
				cardPlayer.refreshStatus(p.status);
			if(DdzRoomModel.getCurrentStage() == DdzRoomModel.PLAY){
				this._players[p.seat].hideXiazhu();
			}
			if(DdzRoomModel.getCurrentStage() == DdzRoomModel.ROBBANKER){
				if(p.ext[2] != -1){
					this._players[p.seat].xiaZhu(p.ext[2]);
				}
			}
			if(!isContinue){
				if(p.status)
					cardPlayer.showStatus(p.status);
			}else{//恢复牌局
				if(p.outCardIds.length>0){//模拟最后一个人出牌
					if(p.userId == PlayerModel.userId && DdzRoomModel.nextSeat== p.seat){
						this._lastCardPattern = null;
						this.Button_buyao.visible = false;
					}else{
						var cardTransData = [];
						for(var j=0;j<p.outCardIds.length;j++){
							cardTransData.push(DdzAI.getCardDef(p.outCardIds[j]));
						}
						this._lastCardPattern = DdzAI.filterCards(cardTransData);
					}
					this._lastLetOutSeat = p.seat;
					p.ext[1]+=p.outCardIds.length;
					this.letOutCards(p.outCardIds,p.seat);
				}else{
					if(p.recover.length>0){//恢复牌局的状态重设
						if(p.recover[0]==1){
							if(p.userId == PlayerModel.userId && DdzRoomModel.nextSeat== p.seat){//要不起，轮到我出牌，需要通知后台
								this.Button_buyao.visible = true;
								this.Button_buyao.x = 640;
								this.Button_6.visible = this.Button_4.visible = false;
								//DdzCardPlayer.showStatus(-1);
								//isYbq = true;
								//this.sendPlayCardMsg(0,[]);
							}else if(p.userId == PlayerModel.userId && DdzRoomModel.nextSeat!= p.seat){
								cardPlayer.showStatus(-1);
							}else if(p.userId != PlayerModel.userId){
								cardPlayer.showStatus(-1);
							}
						}else{
							if(p.userId == PlayerModel.userId && DdzRoomModel.nextSeat== p.seat){
								if(DdzRoomModel.getCurrentStage() == DdzRoomModel.PLAY){
									this.Button_buyao.visible = true;
									this.Button_buyao.x  = this.Button_4.x;
									this.Button_4.x = 640;
								}
								if(p.recover[3] == 2){ //打不起
									this.Button_buyao.x = 640;
									this.Button_6.visible = this.Button_4.visible = false;
								}
							}
						}
						if(p.recover[1]==1){
							cardPlayer.baoting();
						}else if(p.recover[1]==3){
							cardPlayer.baotingThree();
						}
						cardPlayer.leaveOrOnLine(p.recover[2]);
					}
				}
				cardPlayer.showLastCard();
			}
			if(p.userId ==PlayerModel.userId){//自己的状态处理
				if(p.handCardIds.length>0){
					this._players[DdzRoomModel.mySeat].deal(p.handCardIds);
					this.initCards(p.handCardIds);
				}else{
					if(p.ext.length>0 && p.ext[0]==1 && p.status==0)
						this.Button_qiepai.visible = false;
				}
				if(p.status)
					this.Button_30.visible = false;

			}
		}
		if(isContinue){
			this.showJianTou(DdzRoomModel.nextSeat);
			//this.Button_20.visible = false;
			//if(DdzRoomModel.isNextSeatBt()){
			//	this.Image_baodan.visible = true;
			//}
			//this.Image_qiepai.visible = (DdzRoomModel.renshu==2);;
		}
		//this.uidText.setString("UID："+PlayerModel.userId);
		this.Button_17.visible = (players.length<DdzRoomModel.renshu);
		//this.Button_20.visible = (DdzRoomModel.nowBurCount==1);
		//this.Label_27.setString(DdzRoomModel.tableId);
		for(var i=0;i<players.length;i++) {
			var p = players[i];
			if(p.userId ==PlayerModel.userId){
				if(p.handCardIds.length == 0){
					for(var j=0;j<players.length;j++){
						var player = players[j];
						player.ext[3] = 0;
						player.ext[2] = 0;
					}
					for(var key in this._players){
						this._players[key].hideDIzhu();
						this._players[key].cleanBj();
					}
					p.angangIds = [];
				}

				break;
			}
		}

	},

	isForceRemove:function(){
		return true;
	},

	selfRender:function(){
		DdzRoom.prototype.selfRender.call(this);
		this.Image_qiepai = this.getWidget("Image_qiepai");
		this.Image_baodan = this.getWidget("Image_baodan");
		//this.uidText = this.getWidget("uid1");
		//this.Panel_37 = this.getWidget("Panel_37");
		//this.Panel_36 = this.getWidget("Panel_36");
		this.Panel_15 = this.getWidget("Panel_15");
		this.Label_38 = this.getWidget("Label_38");
		this.battery = this.getWidget("battery");
		this.netType = this.getWidget("netType");
		this.Button_qiepai = this.getWidget("Button_qiepai");
		this.Label_jushu = this.getWidget("Label_jushu");
		//this.Label_56 = new cc.LabelBMFont("","res/font/font_res_huang1.fnt");
		//this.Label_56.x = this.Panel_36.width/2;
		//this.Label_56.y = this.Panel_36.height/2;
		//this.Label_56.setScale(0.7);
		//this.Panel_36.addChild(this.Label_56);
		//this.Label_27 = new cc.LabelBMFont("","res/font/font_res_huang1.fnt");
		//this.Label_27.x = this.Panel_37.width/2-17;
		//this.Label_27.y = this.Panel_37.height/2;
		//this.Panel_37.addChild(this.Label_27);
		UITools.addClickEvent(this.Panel_15,this,this.onCancelSelect,false);
		UITools.addClickEvent(this.Button_6,this,this.onPlayCard);
		UITools.addClickEvent(this.Button_buyao,this,this.onBuyaoClick);
		for(var i=1;i<=3;i++){
			this["Button_fen"+i].temp = i;
			UITools.addClickEvent(this["Button_fen"+i],this,this.onJdzFenClick);
		}

		UITools.addClickEvent(this.Button_bj,this,this.onBjClick);

		UITools.addClickEvent(this.Button_4,this,this.onPlayTip);
		UITools.addClickEvent(this.Button_17,this,this.onInvite);
		UITools.addClickEvent(this.Button_30,this,this.onReady);
		//UITools.addClickEvent(this.Button_20,this,this.onLeave);
		UITools.addClickEvent(this.Button_25,this,this.onBreak);
		UITools.addClickEvent(this.Button_qiepai,this,this.onQiePai);
		this.addCustomEvent(SyEvent.JOIN_ROOM,this,this.onJoin);
		this.addCustomEvent(SyEvent.EXIT_ROOM,this,this.onExitRoom);
		this.addCustomEvent(SyEvent.START_PLAY,this,this.startGame);
		this.addCustomEvent(SyEvent.LET_OUT_CARD,this,this.onLetOutCard);
		this.addCustomEvent(SyEvent.OVER_PLAY,this,this.onOver);
		this.addCustomEvent(SyEvent.PLAYER_STATUS_CHANGE,this,this.onChangeStauts);
		this.addCustomEvent(SyEvent.ONLINE_OFFLINE_NOTIFY,this,this.onOnline);
		this.addCustomEvent(SyEvent.ROOM_FAST_CHAT,this,this.onFastChat);
		this.addCustomEvent(SyEvent.USER_AUDIO_PLAY_START,this,this.onStartSpeak);
		this.addCustomEvent(SyEvent.USER_AUDIO_PLAY_FINISH,this,this.onStopSpeak);
		this.addCustomEvent(SyEvent.DDZ_STATUS_UPDATE,this,this.refreshStatus);
		this.addCustomEvent(SyEvent.FRESH_HANDLES,this,this.refresHandles);
		this.addCustomEvent(SyEvent.DI_DIZHU_PAI,this,this.diDzPai);
		this.addCustomEvent(SyEvent.UPDATE_BEI_SHU,this,this.updateBeishu);
		this.addCustomEvent(SyEvent.DECIDE_DIZHU,this,this.decideDIzhu);

		this.addCustomEvent(SyEvent.SHOW_FENSHU,this,this.showFenshu);
		this.addCustomEvent(SyEvent.CLEAN_XIAZHU,this,this.cleanXiazhu);
		this.addCustomEvent(SyEvent.CHUN_TIAN,this,this.chunTian);
		this.addCustomEvent(SyEvent.REFRESH_HANDLES,this,this.dxHandles);
		this.addCustomEvent(SyEvent.SHOW_ZHANKAI,this,this.showZhankai);
		this.addCustomEvent(SyEvent.DTZ_UPDATE_GPS,this,this.updateGpsBtn);
		this.addCustomEvent(SyEvent.ROOM_ROLD_ICON,this,this.isRoldPlayerIcon);

		this.calcTime();
		this.calcWifi();
		this.scheduleUpdate();
		//语音状态，是否可以使用了
		if(!SdkUtil.isReview()){
			this.addCustomEvent(SyEvent.USER_AUDIO_READY,this,this.onRadioReady);
			var progbg = this.getWidget("progbg");
			this.progCycle = new cc.ProgressTimer(new cc.Sprite("res/ui/ddz/mj/img_audio_2.png"));
			this.progCycle.x = progbg.width/2;
			this.progCycle.y = progbg.height/2;
			this.progCycle.setPercentage(0);
			progbg.addChild(this.progCycle);
			var recordBtn = this.recordBtn = new RecordAudioButton(this.yuyin,this.progCycle);
			recordBtn.x = this.Button_40.x;
			recordBtn.y = this.Button_40.y;
			this.root.addChild(recordBtn);
			recordBtn.setBright(IMSdkUtil.isReady());
		}
		this.Button_40.visible = false;
		this.dzcard = null;
	},

	isRoldPlayerIcon:function(event)
	{
		var seat = event.getUserData();
		var players = DdzRoomModel.players;
		for(var i=0;i<players.length;i++) {
			var p = players[i];
			if(p.seat ==seat){
				p.isRoladIcon = 1;
			}
		}

	},

	updateGpsBtn:function(){
		//this.Button_21.setBright(true);
		if(this.Button_21){
			if(GPSModel.getGpsData(PlayerModel.userId) == null){
				this.Button_21.setBright(false);
				//this.btn_Gps.setTouchEnabled(false);
			}else{
				this.Button_21.setBright(true);
				this.Button_21.setTouchEnabled(true);
			}
		}
	},

	showZhankai:function()
	{
		this.Button_55.visible = true;
	},
	dxHandles:function(event)
	{
		if(this._cards.length>0){//清理掉上一局的牌
			for(var i=0;i<this._cards.length;i++){
				this._cardPanel.removeChild(this._cards[i]);
			}
			this.getWidget("small"+1).removeAllChildren(true);
			this._cards.length=0;
		}
		if(this._cards.length == 0){
			var ids = event.getUserData();
			var cardIds = [];
			for(var j=0;j<ids.length;j++){
				cardIds.push(DdzAI.getCardDef(ids[j]));
			}
			//this._players[DdzRoomModel.mySeat].handCardIds = cardIds;
			this._players[DdzRoomModel.mySeat].deal(cardIds);
			this.initCards(cardIds);
		}
		this.Button_6.visible = this.Button_4.visible = this.Button_buyao.visible = true;

	},

	chunTian:function(event)
	{
		var value = event.getUserData();
		var armatureJson = "res/plist/Spring"+".ExportJson";
		var armatureName = "Spring";
		ccs.armatureDataManager.addArmatureFileInfo(armatureJson);
		var chatArmature = new ccs.Armature(armatureName);
		chatArmature.x = 640;
		chatArmature.y = 360;
		chatArmature.setLocalZOrder(9999);
		this.addChild(chatArmature);

		chatArmature.getAnimation().setFrameEventCallFunc(function (bone, evt) {
		});
		chatArmature.getAnimation().play(armatureName, -1, 0);
		//if(value == 1){
		//	FloatLabelUtil.comText("春天");
		//}else{
		//	FloatLabelUtil.comText("反春天");
		//}
	},

	hideAllBanker:function(){
		if(this._players) {
			for (var key in this._players) {
				this._players[key].isBanker(false);
			}
		}
	},

	decideDIzhu:function(event)
	{
		var seat = event.getUserData();
		this.hideAllBanker();
		this._players[seat].isBanker(true);
	},

	showFenshu:function(event)
	{
		var message = event.getUserData();
		var seat = message.seat;
		var fenshu = message.playerState;
		this._players[seat].xiaZhu(fenshu);
		if(parseInt(fenshu) == 0){
			DdzRoomSound.bujiao(message.userId,fenshu);
		}else{
			DdzRoomSound.jiaofen(message.userId,fenshu);
		}

	},


	updateBeishu:function(event){
		var beishu = event.getUserData();
		this.Label_35.setString(beishu);
	},

	diDzPai:function(event)
	{
		var pai = event.getUserData();
		var cardst = DdzAI.getCardDef(pai);
		this.dzcard = new DdzBigCard(cardst);
		this.dzcard.anchorX=this.dzcard.anchorY=0.5;
		this.dzcard.x = 640;
		this.dzcard.y = 360;
		this.addChild(this.dzcard);


		//var color = cardst[0].t;
		//var number = cardst[0].n;
		//var sprite2 = new cc.Sprite("#scard_"+color+"_"+number+".png");
		//// sprite2.setPosition(-40,-30);
		//sprite2.x = sprite.width/2;
		//sprite2.y = sprite.height/2;
        //
		//sprite2.setScaleX(0.0);
		//var that = this;
		//var action = cc.sequence(cc.scaleTo(0.3,0,1),cc.callFunc(function(){
		//	sprite2.runAction( cc.scaleTo(0.3,0.8,0.8));
		//	sprite2.setPosition(that.Image_dui.width/2+1,that.Image_dui.height/2+12);
		//}));
		//sprite.runAction(action);

	},
	addCLShowDipai:function(handles)
	{
		cc.log("handles.length"+handles.length + "aa"+handles[0]);
		if(handles.length == 3){
			this["Image_dp4"].visible = false;
		}
		for(var j=0;j<handles.length;j++){
			var card = new DdzBigCard(DdzAI.getCardDef(handles[j]));
			card.anchorX = card.anchorY = 0.5;
			card.x = this["Image_dp"+(j+1)].width/2;
			card.y = this["Image_dp"+(j+1)].height/2;
			this["Image_dp"+(j+1)].addChild(card);
		}
	},
	refresHandles:function(event)
	{
		var message = event.getUserData();
		var zSeat = message.params[0];
		var handres = JSON.parse(message.strParams);
		if(handres.length == 3){
			this["Image_dp4"].visible = false;
		}
		cc.log("handreshandres"+handres);
		for(var j=0;j<handres.length;j++){
			this["Image_dp"+(j+1)].removeAllChildren(true);
			cc.log("fffff"+handres[j]);
			var card = new DdzBigCard(DdzAI.getCardDef(handres[j]));
			card.anchorX = card.anchorY = 0.5;
			card.x = this["Image_dp"+(j+1)].width/2;
			card.y = this["Image_dp"+(j+1)].height/2;
			this["Image_dp"+(j+1)].addChild(card);
		}
		var player = DdzRoomModel.players;

		for(var i=0; i<player.length; i++)
		{
			var p = player[i];
			if(p.seat==zSeat){
				p.ext[1] = 20;
				this._players[zSeat].showLastCard();
			}
			if(p.seat==zSeat && p.userId == PlayerModel.userId){
				this._players[DdzRoomModel.mySeat].deal(p.handCardIds);
				this.initCards(p.handCardIds);
			}
			//else if(p.seat != zSeat && p.userId == PlayerModel.userId){
			//	this._players[DdzRoomModel.mySeat].deal(p.handCardIds);
			//	this.initCards(p.handCardIds);
			//}

		}
		this.showJianTou(zSeat);
	},
	onJdzFenClick:function(obj)
	{
		var temp = parseInt(obj.temp);
		sySocket.sendComReqMsg(82,[temp]);
		this.Button_fen1.visible = this.Button_fen2.visible = this.Button_fen3.visible = this.Button_bj.visible = false;
	},

	onBjClick:function()
	{
		sySocket.sendComReqMsg(82,[0]);
	},

	onQiePai:function(){
		sySocket.sendComReqMsg(22,[]);
	},
	cleanXiazhu:function()
	{
		var players = DdzRoomModel.players;
		for(var i=0;i<players.length;i++) {
			var p = players[i];
			this._players[p.seat].hideXiazhu();
		}
	},
	showCLFenshu:function()
	{
		var players = DdzRoomModel.players;
		for(var i=0;i<players.length;i++) {
			var p = players[i];
			if(p.ext[2] != -1){
				this._players[p.seat].xiaZhu(p.ext[2]);
			}

		}
	},
	refreshStatus:function(){
		var stage=DdzRoomModel.getCurrentStage();
		switch (stage){
			case DdzRoomModel.ENTRY:
			case DdzRoomModel.READY://准备阶段
				this.Image_qiepai.visible = false;
				//this.recordBtn.visible = true;
				this.Button_6.visible = this.Button_4.visible = this.Button_buyao.visible = false;
				this.Button_fen1.visible = this.Button_bj.visible = false;
				this.Button_fen2.visible = this.Button_fen3.visible = false;
				this.Image_7.visible = false;
				for(var i=1; i<=4; i++){
					this["Image_dp"+(i)].visible = false;
				}
				for(var key in this._players){
					this._players[key].hideDIzhu();
				}
				break;
			case DdzRoomModel.ROBBANKER://抢庄
				this.Image_qiepai.visible = false;
				//this.recordBtn.visible = true;
				for(var i=1; i<=4; i++){
					this["Image_dp"+(i)].visible = false;
				}
				for(var key in this._players){
					this._players[key].refreshStatus();
				}
				//this.showCLFenshu();
				this.Button_6.visible = this.Button_4.visible = this.Button_buyao.visible = false;
				this.Image_7.visible = false;
				var playerMe = DdzRoomModel.getPlayerVo();
				cc.log("qiangzhuang");
				//this.Button_6.visible = this.Button_4.visible = this.Button_buyao = false;
				if(DdzRoomModel.nextSeat==DdzRoomModel.mySeat){
					for(var i=1;i<=3;i++){
						if(this["Button_fen"+i].temp <= DdzRoomModel.getRoomMaxFen()){
							//this["Button_fen"+i].setBright(false);
							this["Button_fen"+i].visible = false;
						}else{
							if(DdzRoomModel.getRoomMaxFen() > 0){
								if(i == 2){
									this["Button_fen"+i].visible = true;
									this["Button_fen"+2].x = 640;
								}
								if(DdzRoomModel.getRoomMaxFen() == 1){
									this.Button_bj.x = 420;
									this["Button_fen"+3].x = 860;
								}

								if(DdzRoomModel.getRoomMaxFen() == 2){
									this.Button_bj.x = 440;
									this["Button_fen"+3].x = 760;
								}
							}else{
								if(i == 2){
									this["Button_fen"+2].x = 720;
								}
								this.Button_bj.x = 280;
								this["Button_fen"+3].x = 940;
								this["Button_fen"+1].x = 500;
							}
							this["Button_fen"+i].visible = true;
						}
					}
					this.Button_bj.visible = true;
				}else{
					this.Button_fen1.visible = this.Button_bj.visible = false;
					this.Button_fen2.visible = this.Button_fen3.visible = false;
				}
				var bet = DdzRoomModel.getPlayerVo().ext[2];
				if( bet > 0 ){
					this.Button_fen1.visible = this.Button_bj.visible = false;
					this.Button_fen2.visible = this.Button_fen3.visible = false;
				}

				this.showJianTou(DdzRoomModel.nextSeat);

				break;
			case DdzRoomModel.BET://下注


				break;
			case DdzRoomModel.PLAY://玩
				this.Image_qiepai.visible = (DdzRoomModel.renshu==2);
				//this.recordBtn.visible = false;
				for(var i=1; i<=4; i++){
					this["Image_dp"+(i)].visible = true;
				//	if(DdzRoomModel.wanfa != 92){
						this["Image_dp"+4].visible = false;
				//	}
				}
				var playerMe = DdzRoomModel.getPlayerVo();
				this.Image_7.visible = true;
				this.Button_fen1.visible = this.Button_bj.visible = false;
				this.Button_fen2.visible = this.Button_fen3.visible = false;
				this.Button_6.visible = this.Button_4.visible = this.Button_buyao.visible = (DdzRoomModel.nextSeat==DdzRoomModel.mySeat);
				if(!this._lastCardPattern){
					this.Button_buyao.visible = false;
					this.Button_4.x = 384;
					if(this._allCards.length == 0){
						this.changeLetOutButton(false);
					}
				}
				//重连的底牌数据
				cc.log("12355"+playerMe.angangIds.length);
				if( playerMe.angangIds.length > 0)
				{
					this.addCLShowDipai(playerMe.angangIds);
				}
				break;
			case DdzRoomModel.OVER://结束
				//this.recordBtn.visible = true;
				for(var i=1; i<=4; i++){
					this["Image_dp"+(i)].visible = false;
				}

				this.Button_fen1.visible = this.Button_bj.visible = false;
				this.Button_fen2.visible = this.Button_fen3.visible = false;
				this.Button_6.visible = this.Button_4.visible = this.Button_buyao.visible = false;
				for(var key in this._players){
					this._players[key].cleanBj();
				}
				break;
		}
	},

	/**
	 * 快捷聊天
	 */
	onFastChat:function(event){
		var data = event.getUserData();
		var userId = data.userId;
		var p = DdzRoomModel.getPlayerVo(userId);
		this._players[p.seat].fastChat(data);
	},

	/**
	 * sdk调用，当语音使用状态改变
	 */
	onRadioReady:function(event){
		var useful = event.getUserData();
		if(useful){
			this.recordBtn.setBright(true);
		}else{
			this.recordBtn.setBright(false);
		}
	},

	onCancelSelect:function(){
		var isHas = false;
		for(var i=0;i<this._cards.length;i++){
			if(this._cards[i].isEnable()){
				isHas = true;
				break;
			}
		}
		if(!isHas){
			this.unSelectAllCards();
			this._allCards.length=0;
			this.isCanLetOut();
		}
	},

	/**
	 * 开始播放语音
	 * @param event
	 */
	onStartSpeak:function(event){
		var userId = event.getUserData();
		var p =DdzRoomModel.getPlayerVo(userId);
		if(p){
			this._players[p.seat].startSpeak();
		}
	},

	/**
	 * 语音播完了
	 * @param event
	 */
	onStopSpeak:function(event){
		var userId = event.getUserData();
		var p =DdzRoomModel.getPlayerVo(userId);
		if(p){
			this._players[p.seat].stopSpeak();
		}
	},

	/**
	 * 在线或者离线状态
	 * @param event
	 */
	onOnline:function(event){
		var data = event.getUserData();
		this._players[data[0]].leaveOrOnLine(data[1]);
	},

	/**
	 * 解散
	 */
	onBreak:function(){
		AlertPop.show("解散房间需所有玩家同意，确定要申请解散吗？",function(){
			sySocket.sendComReqMsg(7);
		})
	},

	/**
	 * 暂离房间
	 */
	onLeave:function(){
		sySocket.sendComReqMsg(6);
	},

	/**
	 * 状态改变
	 * @param event
	 */
	onChangeStauts:function(event){
		var message = event.getUserData();
		var params = message.params;
		var seat = params[0];
		var status = params[1];
		this._players[seat].showStatus(status);
		if(seat == DdzRoomModel.mySeat){
			this.Button_30.visible = this.Button_qiepai.visible =false;
			this.Button_17.visible = (ObjectUtil.size(this._players)<DdzRoomModel.renshu);
		}
	},

	/**
	 * 准备
	 */
	onReady:function(){
		sySocket.sendComReqMsg(4);
	},

	/**
	 * 当前牌局结束
	 * @param event
	 */
	onOver:function(event){
		var data = event.getUserData();
		var sortedData = ArrayUtil.clone(data);
		var zhuangIndex = 0;
		for(var i=0;i<sortedData.length;i++){
			if(sortedData[i].userId== PlayerModel.userId){
				zhuangIndex = i;
				break;
			}
		}
		var zhuang = sortedData.splice(zhuangIndex,1);

		sortedData.splice(0, 0, zhuang[0]);
		//sortedData.push(zhuang[0]);
		data = sortedData;

		for(var i=0;i<data.length;i++){
			this.letOutCards(data[i].cards,data[i].seat,true);
		}

		this.Button_buyao.visible = this.Button_6.visible = this.Button_4.visible = false;
		this.Image_qiepai.visible = false;
		//this.Image_40.visible = this.Image_qiepai.visible = false;
		this.hideJiantou();
		var self = this;
		setTimeout(function(){//延迟弹出结算框
			for(var i=1;i<=3;i++){
				self.getWidget("small"+i).removeAllChildren(true);
				self.getWidget("ybq"+i).visible = false;
			}
			for(var i=0;i<data.length;i++){
				self._players[data[i].seat].updatePoint(data[i].totalPoint);
			}
			var mc = new DdzSmallResultPop(data);
			PopupManager.addPopup(mc);
		},3000);
	},

	/**
	 * 收到出牌消息，前台开始处理
	 * @param event
	 */
	onLetOutCard:function(event){
		cc.log("88888888888888");
		//PlayCardResponder::{"userId":"120270","isPlay":2,"cardIds":[405,305],"cardType":2,"isBt":null,"seat":2,"isLet":null}
		this._countDown = 30;
		for(var i=1;i<=3;i++){
			this.getWidget("ybq"+i).visible = false;
		}
		var self = this;
		var buyao = false;
		var message = event.getUserData();
		var seat = message.seat;
		if(seat == DdzRoomModel.mySeat){//我自己出牌了，清理掉选择的牌
			this._allCards.length = 0;
			this.enableAllCards();
		}
		if(message.cardIds.length==0){//要不起
			buyao = true;
			this._players[seat].showStatus(-1);
		}else{
			//已经出牌了
			var ids = message.cardIds;
			var cardTransData = [];
			for(var i=0;i<ids.length;i++){
				cardTransData.push(DdzAI.getCardDef(ids[i]));
			}
			this._lastCardPattern = DdzAI.filterCards(cardTransData);
			this._lastLetOutSeat = seat;
			DdzRoomEffects.play(this._players,this.root,this._lastCardPattern,seat);
			if(this._lastCardPattern && this._lastCardPattern.type==DdzAI.KING)
				DdzRoomEffects.King(this._players,this.root,seat);
			cc.log("lastCardPattern::"+JSON.stringify(this._lastCardPattern));
		}
		//报停
		if(message.isBt == 1){
			this._players[seat].baoting();
			this._players[seat].hidebaotingThree();
			//if(DdzRoomModel.isNextSeatBt()){
			//	this.Image_baodan.visible = true;
			//}
		}else if(message.isBt == 3){
			this._players[seat].baotingThree();
		}else if(message.isBt == 2){
			this._players[seat].hidebaotingThree();
		}
		//下个出牌的位置
		var nextSeat = this.seatSeq[seat][1];
		if(nextSeat == DdzRoomModel.mySeat){//轮到我出牌了
			this.Button_buyao.visible = this.Button_4.visible = this.Button_6.visible = true;
			if(!this._lastCardPattern){
				this.Button_buyao.visible = false;
			}
			if(message.isLet===1){
				this.Button_buyao.x = 384;
				this.Button_4.x = 640;
				if(this._lastLetOutSeat == DdzRoomModel.mySeat){
					this._lastCardPattern = null;
					this.Button_buyao.visible = false;
					this.Button_4.x = 384;
					if(this._allCards.length > 0){
						this.changeLetOutButton(true);
					}
					//self.onPlayCard(this.Button_6,true);
				}//转了一圈了

				//var selectedCards = ArrayUtil.clone(this.getCardsOnHand());
				var selectedCards = this._allCards;
				var result = DdzAI.filterCards(selectedCards,this.getCardsOnHand(),this._lastCardPattern);
				if(result){
					if(!this._lastCardPattern || (this._lastCardPattern.type==result.type /*|| result.type==DdzAI.BOMB*/)){
						//setTimeout(function(){
						//	self._allCards = selectedCards;
						//	self._cCardPattern = result;
						//	if(self.isBombBreak()){
						//		self._allCards.length=0;
						//		self._cCardPattern = null;
						//		//return self.smartLetOut();
						//	}
						//	cc.log("zidongdapaile");
						//	self.onPlayCard(this.Button_6,true);
						//},300);
						this.changeLetOutButton(true);
					}else{
						//this.smartLetOut();
						this.changeLetOutButton(true);
					}
				}else{
					this.changeLetOutButton(false);
					//this.smartLetOut();
				}
				this.showJianTou(nextSeat);
				if(this._allCards.length == 0){
					cc.log("meixuanzhong");
					this.changeLetOutButton(false);

				}
			}else{//我也要不起
				setTimeout(function(){
					//self._players[DdzRoomModel.mySeat].showStatus(-1);
					//self.sendPlayCardMsg(0,[]);
					//self.letOutCards([],DdzRoomModel.mySeat);
					//self.showJianTou(self.seatSeq[DdzRoomModel.mySeat][1]);
				},1000);
				self.showJianTou(nextSeat);
				this.Button_buyao.visible = true;
				this.Button_buyao.x = 640;
				this.Button_4.visible = this.Button_6.visible = false;
			}
		}else{
			this.showJianTou(nextSeat);
			this.Button_buyao.visible = this.Button_4.visible = this.Button_6.visible = false;
		}
		if(!buyao)
			DdzRoomSound.letOutSound(message.userId,this._lastCardPattern);
		this.letOutCards(message.cardIds,message.seat);
	},

	/**
	 * 发送出牌消息
	 * @param type
	 * @param allCards
	 */
	sendPlayCardMsg:function(type,allCards){
		var build = MsgHandler.getBuilder("proto/PlayCardReqMsg.txt");
		var msgType = build.msgType;
		var builder = build.builder;
		var PlayCardReq = builder.build("PlayCardReq");
		var cardIds = [];
		for(var i=0;i<allCards.length;i++){
			cardIds.push(allCards[i].c);
		}
		var msg = new PlayCardReq();
		msg.cardIds = cardIds;
		msg.cardType = type;
		cc.log("msgType"+msgType);
		sySocket.send(msg,msgType);
	},

	/**
	 * 是否有炸弹被拆散
	 * @returns {boolean}
	 */
	isBombBreak:function(){
		if(this._cCardPattern.type == DdzAI.BOMB)
			return false;
		var cardsOnHand = this.getCardsOnHand();
		var temp = {};
		var bombi = [];
		for(var i=0;i<cardsOnHand.length;i++){
			var card = cardsOnHand[i];
			if(temp[card.i]){
				temp[card.i] += 1;
			}else{
				temp[card.i] = 1;
			}
			if(temp[card.i]==4)
				bombi.push(card.i);
		}
		var isHas = false;
		for(var i=0;i<this._allCards.length;i++){
			var card = this._allCards[i];
			if(ArrayUtil.indexOf(bombi,card.i) >= 0){
				isHas = true;
				break;
			}
		}
		return isHas;
	},


	onBuyaoClick:function()
	{
		this.sendPlayCardMsg(0,[]);
	},

	/**
	 * 出牌动作
	 */
	onPlayCard:function(obj,bombBreak){
		var self = this;
		if(this._cCardPattern){
			if(!bombBreak && this.isBombBreak()){
				AlertPop.show("炸弹被拆散，确定出牌吗？",function(){self.onPlayCard(obj,true);});
				return;
			}
			cc.log("this._cCardPattern.type"+this._cCardPattern.type +"123"+this._allCards);
			var playcard = [];
			for(var i=0; i<this._allCards.length; i++){
				playcard.push(this._allCards[i].c)
			}
			this.letOutCards(playcard,DdzRoomModel.mySeat);
			this.Button_buyao.visible = this.Button_6.visible = this.Button_4.visible = false;
			this.sendPlayCardMsg(this._cCardPattern.type,this._allCards);
		}else{//有可能提前选择了牌，再次筛选一次
			if(this._allCards.length>0){
				this._cCardPattern = DdzAI.filterCards(this._allCards,this.getCardsOnHand(),this._lastCardPattern);
				if(DdzRoomModel.ext[4] != 1){
					if(this._cCardPattern.type == DdzAI.THREEDAIONE || this._cCardPattern.type == DdzAI.PLANEDAIDAN){
						this._cCardPattern = null;
					}
				}else if(DdzRoomModel.ext[5] != 1){
					if(this._cCardPattern.type == DdzAI.THREEDAITWO || this._cCardPattern.type == DdzAI.PLANEDAIDUI ){
						this._cCardPattern = null;
					}
				}

				if(this._cCardPattern){
					if(!bombBreak && this.isBombBreak()){
						AlertPop.show("炸弹被拆散，确定出牌吗？",function(){self.onPlayCard(obj,true);});
						return;
					}
					var playcard = [];
					for(var i=0; i<this._allCards.length; i++){
						playcard.push(this._allCards[i].c)
					}
					this.letOutCards(playcard,DdzRoomModel.mySeat);
					this.Button_buyao.visible = this.Button_6.visible = this.Button_4.visible = false;
					this.sendPlayCardMsg(this._cCardPattern.type,this._allCards);
				}
			}
		}
	},

	smartLetOut:function(){
		var result = [];
		var allCards = [];
		//下家报停，单张的情况
		if(DdzRoomModel.isNextSeatBt() && this._lastCardPattern && this._lastCardPattern.type==DdzAI.SINGLE){
			var resultbt = DdzAI.autoFilter(this.getCardsOnHand(), this._lastCardPattern,2);
			if(resultbt.length==1){
				result.push(0);
			}else if(resultbt.length>1){
				result = resultbt;
			}
		}else {
			if(!this._lastCardPattern || this._lastCardPattern.type!=DdzAI.THREE) {
				result = DdzAI.autoFilter(this.getCardsOnHand(), this._lastCardPattern,2);
				if (result.length > 0) {
					for (var i = 0; i < result.length; i++) {
						allCards.push(this._cards[result[i]].getData());
					}
					var selectedCards = ArrayUtil.clone(allCards);
					this._cCardPattern = DdzAI.filterCards(selectedCards, this.getCardsOnHand(), this._lastCardPattern);
					if(this._cCardPattern){
						if(this._cCardPattern.maxCount>=4&&this._cCardPattern.type!=DdzAI.BOMB){//防止3个带最后把炸弹带出去了
							result.length = 0;
						}else{
							DdzRoomModel.prompt(this._cCardPattern);
							var resultNext = DdzAI.autoFilter(this.getCardsOnHand(), this._lastCardPattern,2);
							//只有唯一可以出的牌
							if (resultNext.length > 0)
								result.length = 0;
						}
					}else{
						result.length = 0;
					}
				}
			}
		}
		if(result.length>0){
			this.unSelectAllCards();
			allCards.length=0;
			for (var i = 0; i < this._cards.length; i++) {
				var card = this._cards[i];
				if (ArrayUtil.indexOf(result, i) >= 0) {
					card.selectAction();
					allCards.push(card.getData());
				} else {
					card.disableAction();
				}
			}
			this._allCards = allCards;
		}
		if(this._allCards.length==0){
			for (var i = 0; i < this._cards.length; i++) {
				var card = this._cards[i];
				if(card.isSelected())
					this._allCards.push(card.getData());
			}
		}
		this.isCanLetOut();
		DdzRoomModel.prompt(null);
	},

	/**
	 * 提示动作
	 */
	onPlayTip:function(){
		var result = DdzAI.autoFilter(this.getCardsOnHand(),this._lastCardPattern,1);
		//没下个牌的提醒了，或者已经提示到了炸弹，停止往下搜索
		if(DdzRoomModel.promptCardPattern && (result.length==0 || DdzRoomModel.promptCardPattern.type == DdzAI.KING)){
			DdzRoomModel.prompt(null);
			this.onPlayTip();
			return;
		}
		//先把现在选中的牌取消
		this.unSelectAllCards();
		var allCards = [];
		for(var i=0;i<result.length;i++){
			var card = this._cards[result[i]];
			card.selectAction();
			if(card.isSelected())
				allCards.push(card.getData());
		}
		this._allCards = allCards;
		this._cCardPattern = DdzAI.filterCards(this._allCards,this.getCardsOnHand(),this._lastCardPattern);
		DdzRoomModel.prompt(this._cCardPattern);
		this.isCanLetOut();
	},

	/**
	 * 邀请
	 */
	onInvite:function(){
		var obj={};
		obj.tableId=DdzRoomModel.tableId;
		obj.userName=PlayerModel.username;
		obj.callURL=SdkUtil.SHARE_URL+'?num='+DdzRoomModel.tableId+'&userId='+encodeURIComponent(PlayerModel.userId);
		obj.title='斗地主   房号：'+DdzRoomModel.tableId;
		var cardNum = "AA支付";
		if(DdzRoomModel.ext[3] != 1){
			cardNum = "房主支付";
		}

		if(DdzRoomModel.ext[6] == 1){
			var isGps = "GPS定位";
			obj.description=csvhelper.strFormat("{0}人,{1}局,{2},{3}。",DdzRoomModel.renshu,DdzRoomModel.totalBurCount,cardNum,isGps);
		}else{
			obj.description=csvhelper.strFormat("{0}人,{1}局,{2}。",DdzRoomModel.renshu,DdzRoomModel.totalBurCount,cardNum);
		}

		obj.shareType=1;
		SdkUtil.sdkFeed(obj);
	},

	/**
	 * 有人加入房间
	 * @param event
	 */
	onJoin:function(event){
		var p = event.getUserData();
		var seq = this.getPlayerSeq(p.userId,DdzRoomModel.mySeat, p.seat);
		this._players[p.seat] = new DdzCardPlayer(p,this.root,seq);
		this.Button_17.visible = (ObjectUtil.size(this._players)<DdzRoomModel.renshu);
		if(DdzRoomModel.isIpSame()){
			//DdzRoomModel.showTipsIpSame();
		}
	},

	onExitRoom:function(event){
		var p = event.getUserData();
		this._players[p.seat].exitRoom();
		delete this._players[p.seat];
	},

	/**
	 * 牌局开始
	 * @param event
	 */
	startGame:function(event){
		PopupManager.removeClassByPopup(CutCardPop);
		for(var i=1;i<=3;i++){
			if(i>1)
				this.getWidget("bt"+i).visible = false;
			this.getWidget("ybq"+i).visible = false;
			if(this._players[i]!=null){
				this._players[i].showLastCard();
			}
		}
		//this.Button_6.visible = this.Button_4.visible = (DdzRoomModel.nextSeat==DdzRoomModel.mySeat);
		this.Button_qiepai.visible=this.Button_17.visible = this.Button_30.visible  = this.Image_baodan.visible = false;
		this.Image_qiepai.visible = false;
		var p = event.getUserData();
		this._players[DdzRoomModel.mySeat].deal(p.handCardIds);
		this.showJianTou();
		this._countDown = 30;
		this._lastCardPattern = null;
		this._lastLetOutSeat = 0;
		this.initCards(p.handCardIds);
		var that = this;
		if(this.dzcard){
			var action = cc.sequence(cc.delayTime(0.8), cc.moveTo(0.2,that._players[DdzRoomModel.nextSeat].iconbg.x, that._players[DdzRoomModel.nextSeat].iconbg.y), cc.delayTime(1.5), cc.callFunc(function () {
				that.removeChild(that.dzcard);
				that.dzcard = null;
			}));
			this.dzcard.runAction(action);
		}

	},

	/**
	 * 闹钟上面的箭头
	 * @param seat
	 */
	showJianTou:function(seat){
		//this.Image_40.visible = true;
		seat = seat || DdzRoomModel.nextSeat;
		for(var i=1;i<=3;i++){
			this.getWidget("tip"+i).visible = false;
		}
		cc.log("showJianTou==",DdzRoomModel.mySeat,seat,this.getPlayerSeq("",DdzRoomModel.mySeat,seat));
		var tip = this.getWidget("tip"+this.getPlayerSeq("",DdzRoomModel.mySeat,seat));
		if (tip){
			tip.visible = true;
			tip.removeAllChildren();
			this.countDownLabel = new cc.LabelBMFont("30","res/font/qianlan.fnt");
			this.countDownLabel.x = tip.width/2;
			this.countDownLabel.y = tip.height/2;
			tip.addChild(this.countDownLabel);
		}
	},

	onShow:function(){
		this._dt = 0;
		this._timedt = 0;
		this.calcTime();
		this.scheduleUpdate();
	},

	onHide:function(){
		this.unscheduleUpdate();
	},

	calcTime:function(){
		var date = new Date();
		var hours = date.getHours().toString();
		hours = hours.length < 2 ? "0"+hours : hours;
		var minutes = date.getMinutes().toString();
		minutes = minutes.length < 2 ? "0"+minutes : minutes;
		this.Label_39.setString(hours+":"+minutes)
	},

	calcWifi:function(){
		var type = SdkUtil.getNetworkType();
		if(!type || type==0){
			this.netType.visible = false;
		}else{
			this.netType.loadTexture("res/ui/ddz/room/net_"+type+".png");
		}
		var batteryNum = Math.ceil(SdkUtil.getBatteryNum()/100*33);
		this.battery.width = batteryNum;
	},

	update:function(dt){
		this._dt += dt;
		this._loacationDt += dt;

		if(this._loacationDt >= 2){
			this._loacationDt = 0;
			if(GPSModel.getGpsData(PlayerModel.userId) == null){
				//cc.log("dtzRoom::update=====>startLocation");
				GPSSdkUtil.startLocation();
			}
		}

		if(this._dt>=1){
			this._dt = 0;
			if(this._countDown >= 0  && !ApplyExitRoomModel.isShow){
				var countDown = (this._countDown<10) ? "0"+this._countDown : ""+this._countDown
				if(this.countDownLabel){
					this.countDownLabel.setString(countDown);
					this._countDown--;
				}
			}
			this._timedt+=1;
			if(this._timedt%60==0)
				this.calcTime();
			if(this._timedt>=180){
				this._timedt = 0;
				this.calcWifi();
			}
		}
	}

});