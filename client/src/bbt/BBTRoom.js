/**
 * Created by zhoufan on 2015/8/22.
 * @class
 * @extend {Room}
 */
var PlayBBTMessageSeq = {
	lastTime:0,
	isPlay:false,
	sequenceArray:[],
	dt:0,

	updateDT:function(dt){
		this.dt += dt;
		var intval = this.sequenceArray.length>0 ? this.sequenceArray[0].intval : 0.8;
		//var intval = this.sequenceArray.length>0 ? 2 : 2;
		if(this.dt>=intval){
			this.dt = 0;
			if(this.isNeedPlay()){
				this.playNextMessage();
			}

		}
	},

	clean:function(){
		this.dt = 0;
		this.lastTime = 0;
		this.isPlay = false;
		this.sequenceArray.length=0;
		this.currentlyMsg = null;
	},



	/**
	 * 播放下一个消息
	 */
	playNextMessage:function(){
		if(this.sequenceArray.length>0){
			this.isPlay = true;
			var message = this.sequenceArray.shift();
			this.currentlyMsg = message;
			BBTRoomModel.letOutCard(message);
		}
	},

	/**
	 * 是否还有剩余消息需要播放
	 * @returns {boolean}
	 */
	isNeedPlay:function(){
		if(this.isPlay || this.sequenceArray.length==0)
			return false;
		return true;
	},

	/**
	 * 完成消息播放
	 */
	finishPlay:function(){
		this.isPlay = false;
		this.dt = 0;
	},

	/**
	 * 收到新消息,如果间隔过短，放入队列
	 * @param message
	 */
	receive:function(message){
		message.intval = BBTRoomModel.isKingCard ? 0.3 : 2;
		this.sequenceArray.push(message);
	},
}



var BBTRoom = BaseRoom.extend({//Room
	/** @lends PDKRoom.prototype */

	//----------------------------------------------------------------//
	_cardPanel:null,
	_cardW:240,
	_cardG:55,//65
	/**
	 * {Array.<BigCard>}
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

	//----------------------------------------------------------------//
	_statusMap:null,
	_dt:null,
	_loacationDt:0,
	_countDown:null,
	_timedt:null,
	typePX:1,
	showTuoGuanTimeOutHandle:null,



	ctor:function(){
		this.typePX = 1;
		this._statusMap = {};
		this._dt = 0;
		this._timedt = 0;
		this._loacationDt = 0;
		this.showTuoGuanTimeOutHandle = null;
		this._super(LayerFactory.BBT_ROOM);
		this._letOutButtonTouchable = true;
		this._cards = [];
		this._allCards = [];
		this._touchedCards = [];
		this._players = {};
		this._countDown = BBTRoomModel.timeOut || 30;
		this.seatSeq = BBTRoomModel.seatSeq;
	},

	updateRoomdetail:function(){
		var isZwsk ="正510K不分花色";
		if(BBTRoomModel.ext[5] == 1){
			isZwsk = "正510K分花色";
		}

		var iskc ="";
		if(BBTRoomModel.ext[4] == 1){
			iskc = "可锤";
		}

		var iszd ="";
		if(BBTRoomModel.ext[6] ==1){
			iszd = "助陡";
		}

		var ispaishu ="";
		if(BBTRoomModel.ext[9] == 1){
			ispaishu = "显示剩余牌数";
		}

		var isdaisan ="";
		if(BBTRoomModel.ext[10] == 1){
			isdaisan = "可四带三";
		}

		var daiWangStr = "";
		if(BBTRoomModel.renshu == 2 && BBTRoomModel.ext[12] == 1){
			daiWangStr = "带大王";
		}

		this.Label_RoomDetail.setString(csvhelper.strFormat("{0} {1} {2} {3} {4} {5}",iskc,isZwsk,iszd,ispaishu,isdaisan,daiWangStr));
	},
	/**
	 * 初始化房间数据
	 */
	initData:function(){
		cc.log("initData...BBT");
		//this.Image_qiepai.visible = false;
		PlayBBTMessageSeq.clean();
		this.seatSeq = BBTRoomModel.seatSeq;
		sy.scene.hideLoading();
		//PopupManager.removeClassByPopup(CutCardPop);
		//this.Label_38.setString(BBTRoomModel.wanfa+"张玩法");
		//this.Button_qiepai.visible = false;
		this.Image_40.visible = false;
		this.Image_baodan.visible = false;
		this.updateRoomdetail();
		if(this.labelRand){
			//this.labelRand.setString(BBTRoomModel.nowBurCount + "/" + BBTRoomModel.totalBurCount);
			this.labelRand.setString(BBTRoomModel.nowBurCount);
		}

		if(this.bg_CancelTuoguan){
			this.bg_CancelTuoguan.visible = false;
		}

		if(this.showTuoGuanTimeOutHandle){
			clearTimeout(this.showTuoGuanTimeOutHandle);
			this.showTuoGuanTimeOutHandle = null;
		}


		var countDown = BBTRoomModel.timeOut || 30;
		this._players = {};
		var players = BBTRoomModel.players;
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
		this.getWidget("Panel_zj").removeAllChildren(true);
		this.getWidget("Panel_xj").removeAllChildren(true);
		this._lastCardPattern = null;
		this.Button_buyao.visible = this.btnBreak.visible = this.Button_4.visible = false;
		this.Button_30.visible = true;
		var isContinue = false;//是否是恢复牌局
		this.showScore();
		this.refreshStatus();
		for(var i=0;i<players.length;i++){
			var p = players[i];
			isContinue = (p.handCardIds.length>0 || p.outCardIds.length>0);
			if(isContinue)
				break;
		}
		this.getWidget("Panel_fenpai").removeAllChildren(true);
		if(BBTRoomModel.scoreCard.length > 0 ){
			var initX  = (120 - ((BBTRoomModel.scoreCard.length) * 20)/2);
			for(var i=0; i<BBTRoomModel.scoreCard.length; i++){
				var newsmallCard = new BBTSmallCard(BBTAI.getCardDef(BBTRoomModel.scoreCard[i]) , 2);
				newsmallCard.scale = 0.25;
				newsmallCard.anchorX=newsmallCard.anchorY=0;
				newsmallCard.x = initX+(i+1)*20;
				newsmallCard.y = 0;
				this.getWidget("Panel_fenpai").addChild(newsmallCard);
			}
		}
		BBTRoomModel.zjScorePai = [];
		BBTRoomModel.xjScorePai = [];
		for(var i=0;i<players.length;i++) {
			var p = players[i];
			if (p.outCardIds.length > 0) {//模拟最后一个人出牌
				if (p.userId == PlayerModel.userId && BBTRoomModel.nextSeat == p.seat) {
					this._lastCardPattern = null;
				} else {
					var cardTransData = [];
					for (var j = 0; j < p.outCardIds.length; j++) {
						cardTransData.push(BBTAI.getCardDef(p.outCardIds[j]));
					}
					this._lastCardPattern = BBTAI.filterCards(cardTransData);
					cc.log("this._lastCardPattern"+this._lastCardPattern.type);
				}
			}
		}
		for(var i=0;i<players.length;i++){
			var isYbq = false;
			var p = players[i];
			var seq = this.getPlayerSeq(p.userId,BBTRoomModel.mySeat, p.seat);
			var cardPlayer = this._players[p.seat] = new BBTCardPlayer(p,this.root,seq);
			if(p.scoreCard.length > 0){
				if(BBTRoomModel.getBrankerSeat() == p.seat){
					BBTRoomModel.zjScorePai = ArrayUtil.merge(BBTRoomModel.zjScorePai,p.scoreCard);
				}else{
					BBTRoomModel.xjScorePai = ArrayUtil.merge(BBTRoomModel.xjScorePai,p.scoreCard);
				}
			}
			if(!isContinue){
				if(p.status && BBTRoomModel.getCurrentStage() <= 1)
					cardPlayer.showStatus(p.status);
				else{
					cardPlayer.showStatus(-2);
				}
			}else{//恢复牌局
				if(p.outCardIds.length>0){//模拟最后一个人出牌
					if(p.userId == PlayerModel.userId && BBTRoomModel.nextSeat== p.seat){
						this._lastCardPattern = null;
					}else{
						var cardTransData = [];
						for(var j=0;j<p.outCardIds.length;j++){
							cardTransData.push(BBTAI.getCardDef(p.outCardIds[j]));
						}
						this._lastCardPattern = BBTAI.filterCards(cardTransData);

						//cc.log("BBTRoomModel.roundCardType",BBTRoomModel.roundCardType)
						if (BBTRoomModel.roundCardType){	//连对牌型 后台传的连对数值(5)和前段的数值(3)不一致，那前段只在炸弹带牌和三带这类有误差的牌型上做修正类型即可
							this.fixCardType(BBTRoomModel.roundCardType);
						}
					}
					this._lastLetOutSeat = p.seat;
					p.ext[1]+=p.outCardIds.length;
					cc.log("p.seat"+p.seat);
					this.letOutCards(p.outCardIds,p.seat,false,true);

					//为什么出牌人的保单状态不考虑？
					if(p.recover.length > 2){
						if(p.recover[1]==1){
							cardPlayer.baoting();
						}
					}

				}else{
					cc.log("p.recover value ..." , p.recover);
					if(p.recover.length>0){//恢复牌局的状态重设
						if(p.recover[0]==0){
							//cardPlayer.showStatus(-1);
							if(p.userId == PlayerModel.userId && BBTRoomModel.nextSeat== p.seat){//要不起，轮到我出牌，需要通知后台
								if(BBTRoomModel.getCurrentStage() == BBTRoomModel.PLAY){
									this.Button_buyao.visible = true;
								}
								this.btnBreak.visible = this.Button_4.visible = false;
							}else if(p.userId == PlayerModel.userId && BBTRoomModel.nextSeat!= p.seat){
								cardPlayer.showStatus(-1);
							}else if(p.userId != PlayerModel.userId){
								cardPlayer.showStatus(-1);
							}
						}else{
							if(this._lastCardPattern){
								cc.log("this._lastCardPattern"+this._lastCardPattern.type);
							}else{
								cc.log("没有上个牌型");
							}
							if(p.userId == PlayerModel.userId && BBTRoomModel.nextSeat== p.seat){
								if(BBTRoomModel.getCurrentStage() == BBTRoomModel.PLAY && this._lastCardPattern){
									this.Button_buyao.visible = true;
									this.Button_buyao.x  = 427;
									this.Button_4.x = 640;
									cc.log("show buyao btn");
								}else if(BBTRoomModel.getCurrentStage() == BBTRoomModel.PLAY && !this._lastCardPattern){
									this.Button_buyao.visible = false;
								}

								//if(p.recover[3] == 2){ //打不起
								//	this.btnBreak.visible = this.Button_4.visible = false;
								//}
							}
						}
						if(p.recover[1]==1){
							cc.log("p.recover[1]..." , p.seat , cardPlayer.seq);
							cardPlayer.baoting();
						}

						cardPlayer.leaveOrOnLine(p.recover[2]);
					}
				}
				cardPlayer.showLastCard();
			}

			if (p.seat == BBTRoomModel.nextSeat){
				countDown = p.ext[9];
			}

			if (BBTRoomModel.isAutoPlay() && BBTRoomModel.getPlayerIsNowTuoguan(p)){
				cardPlayer.updateTuoguan(true)
			}

			if(p.userId ==PlayerModel.userId){//自己的状态处理
				if(p.handCardIds.length>0){
						this.typePX = 1;
						this.initMorenPaix();
				}else{
					//if(p.ext.length>0 && p.ext[0]==1 && p.status==0)
					//	this.Button_qiepai.visible = true;
				}
				if(p.status)
					this.Button_30.visible = false;


				//判断是否需要显示 取消托管按钮
				if(this.bg_CancelTuoguan){
					var isMeTuoguan = BBTRoomModel.getPlayerIsNowTuoguan(p);
					cc.log("断线重连判断是否是托管状态..."  , isMeTuoguan);
					this.bg_CancelTuoguan.visible = isMeTuoguan;
				}
			}
		}
		if(isContinue){
			this._countDown = countDown || BBTRoomModel.timeOut;
			var countDown1 = (this._countDown<10) ? "0"+this._countDown : ""+this._countDown;
			this._countDown = this._countDown - 1;
			this.countDownLabel.setString(countDown1);

			this.showJianTou(BBTRoomModel.nextSeat);
			//this.Button_20.visible = false;
			//if(BBTRoomModel.isNextSeatBt()){
			//	this.Image_baodan.visible = true;
			//}
			//this.Image_qiepai.visible = (BBTRoomModel.renshu==2);
		}
		this.addShowPai(this.getWidget("Panel_zj"),BBTRoomModel.zjScorePai,true);
		this.addShowPai(this.getWidget("Panel_xj"),BBTRoomModel.xjScorePai,false);
		//this.uidText.setString("UID："+PlayerModel.userId);
		this.Button_17.visible = (players.length<BBTRoomModel.renshu);
		//this.Button_20.visible = (BBTRoomModel.nowBurCount==1);
		//this.Label_27.setString(BBTRoomModel.tableId);
		if(this.labelRoomId){
			this.labelRoomId.setString(BBTRoomModel.tableId);
		}

		//cc.log("this.myseat"+BBTRoomModel.mySeat+"BBTRoomModel.getBrankerSeat()"+BBTRoomModel.getBrankerSeat());
		if(BBTRoomModel.getCurrentStage() == BBTRoomModel.DOU){
			this.Panel_tu.visible = false;
			if (BBTRoomModel.renshu == 2){
				for(var i=0;i<players.length;i++){
					var p = players[i];
					if(p.userId == PlayerModel.userId){
						if(BBTRoomModel.getPlayerDou(p) == 0 ){
							if (BBTRoomModel.renshu == 2){
								this.Panel_tu.visible = true;
							}
						}
					}
				}
			}else{
				if(BBTRoomModel.isYDou()){
					for(var i=0;i<players.length;i++){
						var p = players[i];
						if(p.userId ==PlayerModel.userId){
							if(BBTRoomModel.getPlayerDou(p) == 0 ){
								if(p.seat == BBTRoomModel.getBrankerSeat() ){ //庄并且没选择陡
									this.Panel_fantu.visible = true;
								}else if(p.seat != BBTRoomModel.getBrankerSeat()){
									this.Panel_tu.visible = true;
								}
							}
						}
					}
				}else{
					cc.log("111111fffffffffffff");
					for(var i=0;i<players.length;i++){
						var p = players[i];
						if(p.userId ==PlayerModel.userId){
							if(BBTRoomModel.getPlayerDou(p) == 0 ){
								if(p.seat != BBTRoomModel.getBrankerSeat() ){ //庄并且没选择陡
									this.Panel_tu.visible = true;
								}else {
									this.Panel_tu.visible = false;
								}
							}
						}
					}
			}
				//if(BBTRoomModel.getPlayerDou(p) == 0 ){
				//	if(p.userId ==PlayerModel.userId){
				//		cc.log("p.seat"+p.seat+"BBTRoomModel.getBrankerSeat()"+BBTRoomModel.getBrankerSeat());
				//		if(p.seat != BBTRoomModel.getBrankerSeat() ) {
				//			this.Panel_tu.visible = true;
				//		}else{
				//			this.Panel_tu.visible = false;
				//		}
				//	}
				//}
			}
		}
		//IP相同的显示
		if(players.length>1){
			var seats = BBTRoomModel.isIpSame();
			if(seats.length>0){
				for(var i=0;i<seats.length;i++) {
					this._players[seats[i]].isIpSame(true);
				}
			}
		}
		this.isCanLetOut();

	},

	isForceRemove:function(){
		return true;
	},

	/**
	 * button名称定义
	 */
	BTN_READY:"BTN_READY",
	BTN_INVITE:"BTN_INVITE",
	BTN_BREAK:"BTN_BREAK",
	BTN_SETUP:"BTN_SETUP",
	BTN_LEAVE:"BTN_LEAVE",
	BTN_CHAT:"BTN_CHAT",
	BTN_YUYIN:"BTN_YUYIN",
	NET_TYPE:"NET_TYPE",
	BATTERY:"BATTERY",
	/**
	// * 获取指定按钮的名字
	// * @param wName
	// */
	getWidgetName:function(wName){
		var name = "";
		switch(wName){
			case this.BTN_READY:
				name = "Button_30";
				break;
			case this.BTN_INVITE:
				name = "Button_17";
				break;
			case this.BTN_BREAK:
				name = "Button_6";
				break;
			case this.BTN_SETUP:
				name = "Button_75";
				break;
			case this.BTN_LEAVE:
				name = "Button_7";
				break;
			case this.BTN_CHAT:
				name = "Button_42";
				break;
			case this.BTN_YUYIN:
				name = "Button_40";
				break;
			case this.NET_TYPE:
				name = "netType";
				break;
			case this.BATTERY:
				name = "battery";
				break;
		}
		return name;
	},

	selfRender:function(){
		//Room.prototype.selfRender.call(this);
		BaseRoom.prototype.selfRender.call(this);//这里面可能会有部分不兼容的控件名
		//------------------------------------------------------------------------//
		cc.log("BBTRoom selfRender...");
		for(var i=1;i<=3;i++){
			if(i>1)
				this.getWidget("bt"+i).visible = false;
			this.getWidget("ybq"+i).visible = false;
			UITools.addClickEvent(this.getWidget("player"+i),this,this.onPlayerInfo);
			UITools.addClickEvent(this.getWidget("icon"+i),this,this.onPlayerInfo);
		}
		this.yuyin.visible = false;
		this.Image_40 = this.getWidget("Image_40");//闹钟
		this.Label_56 = this.getWidget("Label_56");//第几局
		this.Button_4 = this.getWidget("Button_4")//提示;
		this.Button_buyao = this.getWidget("Button_buyao")//buyao;
		this.Button_30 = this.getWidget("Button_30");//准备
		this.Button_sset = this.getWidget("Button_sset");
		UITools.addClickEvent(this.Button_sset,this,this.onZhanKai)
		this.btnBreak.visible = this.Button_4.visible = false;
		this.Button_17 = this.getWidget("Button_17");//邀请微信好友
		this.Button_17.visible = false;
		this.Label_27 = this.getWidget("Label_27");
		this.Label_39 = this.getWidget("Panel_time");//时间
		this.labelTime = this.getWidget("LableTime");
		this.Button_40 =this.getWidget("Button_40");//语音按钮
		this.Button_42 =this.getWidget("Button_42");//快捷聊天
		UITools.addClickEvent(this.Button_42,this,this.onChat);
		var cardPanel = this._cardPanel = ccui.helper.seekWidgetByName(this.root,"cardPanel");
		if (SdkUtil.is316Engine()) {
			cardPanel.setSwallowTouches(true)
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
		//------------------------------------------------------------------------//

		this.Image_qiepai = this.getWidget("Image_qiepai");
		this.Image_baodan = this.getWidget("Image_baodan");
		this.uidText = this.getWidget("uid1");
		this.Panel_37 = this.getWidget("Panel_fh");
		this.labelRand = this.getWidget("Label_jtjs");
		this.labelRoomId = this.getWidget("Label_jtfh");
		this.wanfaImg = this.getWidget("Image_wanfa");
		this.Panel_36 = this.getWidget("Panel_jushu");
		this.Panel_15 = this.getWidget("Panel_1");
		this.Label_38 = this.getWidget("Label_38");
		this.battery = this.getWidget("battery");
		this.netType = this.getWidget("netType");
		this.Button_qiepai = this.getWidget("Button_qiepai");
		this.Panel_chui = this.getWidget("Panel_chui");
		this.Panel_tu = this.getWidget("Panel_tu");
		this.Panel_qiang = this.getWidget("Panel_qiang");
		this.Panel_kaiqiang = this.getWidget("Panel_kaiqiang");
		this.Panel_fantu = this.getWidget("Panel_fantu");
		this.Button_chui = this.getWidget("Button_chui");
		this.Button_chui.temp = 1;
		this.Button_bchui = this.getWidget("Button_bchui");
		this.Button_bchui.temp = 2;
		this.Button_tu = this.getWidget("Button_tu");
		this.Button_tu.temp = 1;
		this.Button_btu = this.getWidget("Button_btu");
		this.Button_btu.temp = 2;
		this.Button_qiang = this.getWidget("Button_qiang");
		this.Button_qiang.temp = 1;
		this.Button_bqiang = this.getWidget("Button_bqiang");
		this.Button_bqiang.temp = 2;
		this.Button_kaiqiang = this.getWidget("Button_kaiqiang");
		this.Button_kaiqiang.temp = 1;
		this.Button_touxiang = this.getWidget("Button_touxiang");
		this.Button_touxiang.temp = 2;

		this.Button_fantu = this.getWidget("Button_fantu");
		this.Button_fantu.temp = 1;
		this.Button_bfantu = this.getWidget("Button_bfantu");
		this.Button_bfantu.temp = 2;

		this.Label_RoomDetail = this.getWidget("Label_RoomDetail");
		this.Button_sort = this.getWidget("Button_sort");
		UITools.addClickEvent(this.Button_sort,this,this.onSortTxPx);


		UITools.addClickEvent(this.Button_chui,this,this.onChuiClick);
		UITools.addClickEvent(this.Button_bchui,this,this.onChuiClick);

		UITools.addClickEvent(this.Button_tu,this,this.onTuClick);
		UITools.addClickEvent(this.Button_btu,this,this.onTuClick);

		UITools.addClickEvent(this.Button_qiang,this,this.onQiangClick);
		UITools.addClickEvent(this.Button_bqiang,this,this.onQiangClick);

		UITools.addClickEvent(this.Button_kaiqiang,this,this.onKaiqiangClick);
		UITools.addClickEvent(this.Button_touxiang,this,this.onKaiqiangClick);

		UITools.addClickEvent(this.Button_fantu,this,this.onTuClick);
		UITools.addClickEvent(this.Button_bfantu,this,this.onTuClick);
		//cc.log("ffffffffffffffffffffffffffff");

		this.btn_Gps = this.getWidget("btn_Gps");
		if(SyConfig.HAS_GPS && BBTRoomModel.renshu > 2){
			this.btn_Gps.visible = true;
		}else{
			this.btn_Gps.visible = false;
		}
		if(GPSModel.getGpsData(PlayerModel.userId) == null){
			this.btn_Gps.setBright(false);
			//this.btn_Gps.setTouchEnabled(false);
		}else{
			this.btn_Gps.setBright(true);
			this.btn_Gps.setTouchEnabled(true);
		}
		if (SdkUtil.isReview()){
			this.btn_Gps.visible = false;
		}

		this.roomName_label = new cc.LabelTTF("","Arial",26,cc.size(500, 30));
		this.addChild(this.roomName_label, 10);
		if (BBTRoomModel.roomName){
			this.roomName_label.setString(BBTRoomModel.roomName);
			this.roomName_label.setColor(cc.color(255,255,255));
			this.roomName_label.setHorizontalAlignment(cc.TEXT_ALIGNMENT_CENTER);
			this.roomName_label.setVerticalAlignment(cc.VERTICAL_TEXT_ALIGNMENT_CENTER);
			this.roomName_label.x = cc.winSize.width/2 + 280;
			this.roomName_label.y = cc.winSize.height/2 + 320;
		}


		this.btn_CancelTuoguan = this.getWidget("btn_CancelTuoguan");//取消托管按钮
		this.bg_CancelTuoguan = this.getWidget("bg_CancelTuoguan");
		if(this.bg_CancelTuoguan && this.btn_CancelTuoguan){
			this.bg_CancelTuoguan.visible = false;
			this.bg_CancelTuoguan.setLocalZOrder(100);
			UITools.addClickEvent(this.btn_CancelTuoguan, this, this.onCancelTuoguan);
		}

		UITools.addClickEvent(this.btn_Gps ,this,this.onGpsPop);

		UITools.addClickEvent(this.Panel_15,this,this.onCancelSelect,false);
		UITools.addClickEvent(this.btnBreak,this,this.onPlayCard);
		UITools.addClickEvent(this.Button_4,this,this.onPlayTip);
		UITools.addClickEvent(this.Button_buyao,this,this.onBuyaoClick);
		UITools.addClickEvent(this.Button_17,this,this.onInvite);
		UITools.addClickEvent(this.Button_30,this,this.onReady);
		//cc.log(".........PDKRoom addClickEvent");

		this.addCustomEvent(SyEvent.DOUNIU_INTERACTIVE_PROP,this,this.runPropAction);
		this.addCustomEvent(SyEvent.DTZ_UPDATE_GPS,this,this.updateGpsBtn);
		this.addCustomEvent(SyEvent.ROOM_ROLD_ICON,this,this.setRoldPlayerIcon);
		this.addCustomEvent(SyEvent.BBT_DECIDE_ZHUANG,this,this.onDecideZhuang);
		this.addCustomEvent(SyEvent.SHOW_WANG,this,this.onShowWang);
		this.addCustomEvent(SyEvent.SHOW_HTTHREE,this,this.onShowHTthress);
		this.addCustomEvent(SyEvent.UPDATE_TUOGUAN , this,this.updatePlayTuoguan);
		this.countDownLabel = new cc.LabelBMFont("","res/font/font_res_tu.fnt");
		this.countDownLabel.x = this.Image_40.width/2;
		this.countDownLabel.y = this.Image_40.height/2+8;
		this.Image_40.addChild(this.countDownLabel);
		this.calcTime();
		this.calcWifi();
		this.scheduleUpdate();
		//语音状态，是否可以使用了
		this.addCustomEvent(SyEvent.BBT_STATUS_UPDATE,this,this.refreshStatus);
		this.addCustomEvent(SyEvent.SHOW_CHUi,this,this.showChui);
		this.addCustomEvent(SyEvent.SHOW_KAIQIANG,this,this.showKaiQiang);
		this.addCustomEvent(SyEvent.SHOW_ROBBER,this,this.showRobber);
		this.addCustomEvent(SyEvent.SHOW_TU,this,this.showTu);
		this.addCustomEvent(SyEvent.SHOW_SCORE,this,this.showFixScole);
		this.addCustomEvent(SyEvent.CLEAN_CURLUN,this,this.cleanCurData);
		//var imgPath = "res/ui/pdk/pdkRoom/15wanfa.png";
		//if(BBTRoomModel.wanfa == 15){
		//	imgPath = "res/ui/pdk/pdkRoom/15wanfa.png";
		//}else if (BBTRoomModel.wanfa == 16){
		//	imgPath = "res/ui/pdk/pdkRoom/16wanfa.png";
		//}
		//if(this.wanfaImg){
		//	this.wanfaImg.loadTexture(imgPath);
		//}
		this.showScore();
		this.pxValue = 0;
		if (SdkUtil.isIphoneX()) {
			this.getWidget("player3").x += 30;
			this.btn_Gps.x += 20;
			this.getWidget("small3").x += 30;
		}

		this.onShowVoiceAndProps();
	},

	/**
	 * 俱乐部房间关闭语音和道具处理
	 */
	onShowVoiceAndProps:function(){
		if (BBTRoomModel.isBanVoiceAndProps()){
			this.recordBtn.visible = false;
			this.recordBtn.isBright = false;
		}
	},


	onTouchCardPanel:function(obj,type) {
		cc.log("onTouchCardPanel=========",type)
		if (type == ccui.Widget.TOUCH_BEGAN){
			this.isTuoguan = false;
			this.isTuoguan = BBTCardDelegate.dealTouchBegin(this , obj , type);
		}else if(type == ccui.Widget.TOUCH_MOVED && this.isTuoguan){
			BBTCardDelegate.dealTouchMove(this , obj , type);
		}else if(type == ccui.Widget.TOUCH_ENDED && this.isTuoguan){
			BBTCardDelegate.dealTouchEnded(this , obj , type);
		}else if(type == ccui.Widget.TOUCH_CANCELED && this.isTuoguan){
			BBTCardDelegate.dealTouchEnded(this , obj , type);
		}
		if(type == ccui.Widget.TOUCH_ENDED && !this.isTuoguan){
			this.onCancelSelect();
		}
	},

	onSortTxPx:function(){
		cc.log("this.typePX"+this.typePX +"this.pxValue"+this.pxValue);
		if(this.typePX == 1 ){
			if(this.pxValue == 1){
				if(this._players[BBTRoomModel.mySeat].isHasTHXPx(BBTRoomModel.getPlayerVo().handCardIds)){
					this._players[BBTRoomModel.mySeat].sortTHXDeal(BBTRoomModel.getPlayerVo().handCardIds);
					this.initCards(BBTRoomModel.getPlayerVo().handCardIds);
					this.pxValue = 2;
					return ;
				}else{
					if(this._players[BBTRoomModel.mySeat].isHasBobmPx(BBTRoomModel.getPlayerVo().handCardIds)){
						this._players[BBTRoomModel.mySeat].sortBOMBDeal(BBTRoomModel.getPlayerVo().handCardIds);
						this.initCards(BBTRoomModel.getPlayerVo().handCardIds);
						this.pxValue = 3;
						return ;
					}else{
						if(this._players[BBTRoomModel.mySeat].isHasWSKPx(BBTRoomModel.getPlayerVo().handCardIds)){
							this._players[BBTRoomModel.mySeat].sortWSKDeal(BBTRoomModel.getPlayerVo().handCardIds);
							this.initCards(BBTRoomModel.getPlayerVo().handCardIds);
							this.pxValue = 4;
							return ;
						}else{
							this._players[BBTRoomModel.mySeat].deal(BBTRoomModel.getPlayerVo().handCardIds);
							this.initCards(BBTRoomModel.getPlayerVo().handCardIds);
							this.typePX = 0;
							return ;
						}
					}
				}
			}else if(this.pxValue == 0){
				if(this._players[BBTRoomModel.mySeat].isHasDIZHAPx(BBTRoomModel.getPlayerVo().handCardIds)){
					this._players[BBTRoomModel.mySeat].sortDeal(BBTRoomModel.getPlayerVo().handCardIds);
					this.initCards(BBTRoomModel.getPlayerVo().handCardIds);
					this.pxValue = 1;
					return ;
				}else{
					if(this._players[BBTRoomModel.mySeat].isHasTHXPx(BBTRoomModel.getPlayerVo().handCardIds)){
						this._players[BBTRoomModel.mySeat].sortTHXDeal(BBTRoomModel.getPlayerVo().handCardIds);
						this.initCards(BBTRoomModel.getPlayerVo().handCardIds);
						this.pxValue = 2;
						return ;
					}else{
						if(this._players[BBTRoomModel.mySeat].isHasBobmPx(BBTRoomModel.getPlayerVo().handCardIds)){
							this._players[BBTRoomModel.mySeat].sortBOMBDeal(BBTRoomModel.getPlayerVo().handCardIds);
							this.initCards(BBTRoomModel.getPlayerVo().handCardIds);
							this.pxValue = 3;
							return ;
						}else{
							if(this._players[BBTRoomModel.mySeat].isHasWSKPx(BBTRoomModel.getPlayerVo().handCardIds)){
								this._players[BBTRoomModel.mySeat].sortWSKDeal(BBTRoomModel.getPlayerVo().handCardIds);
								this.initCards(BBTRoomModel.getPlayerVo().handCardIds);
								this.pxValue = 4;
								return ;
							}else{
								this._players[BBTRoomModel.mySeat].deal(BBTRoomModel.getPlayerVo().handCardIds);
								this.initCards(BBTRoomModel.getPlayerVo().handCardIds);
								this.typePX = 0;
								return ;
							}
						}
					}
				}
			}else if(this.pxValue == 2){
				if(this._players[BBTRoomModel.mySeat].isHasBobmPx(BBTRoomModel.getPlayerVo().handCardIds)){
					this._players[BBTRoomModel.mySeat].sortBOMBDeal(BBTRoomModel.getPlayerVo().handCardIds);
					this.initCards(BBTRoomModel.getPlayerVo().handCardIds);
					this.pxValue = 3;
					return ;
				}else{
					if(this._players[BBTRoomModel.mySeat].isHasWSKPx(BBTRoomModel.getPlayerVo().handCardIds)){
						this._players[BBTRoomModel.mySeat].sortWSKDeal(BBTRoomModel.getPlayerVo().handCardIds);
						this.initCards(BBTRoomModel.getPlayerVo().handCardIds);
						this.pxValue = 4;
						return ;
					}else{
						this._players[BBTRoomModel.mySeat].deal(BBTRoomModel.getPlayerVo().handCardIds);
						this.initCards(BBTRoomModel.getPlayerVo().handCardIds);
						this.typePX = 0;
						return ;
					}
				}
			}else if(this.pxValue == 3){
				if(this._players[BBTRoomModel.mySeat].isHasWSKPx(BBTRoomModel.getPlayerVo().handCardIds)){
					this._players[BBTRoomModel.mySeat].sortWSKDeal(BBTRoomModel.getPlayerVo().handCardIds);
					this.initCards(BBTRoomModel.getPlayerVo().handCardIds);
					this.pxValue = 4;
					return ;
				}else{
					this._players[BBTRoomModel.mySeat].deal(BBTRoomModel.getPlayerVo().handCardIds);
					this.initCards(BBTRoomModel.getPlayerVo().handCardIds);
					this.typePX = 0;
					return ;
				}
			}else if(this.pxValue == 4){
				this._players[BBTRoomModel.mySeat].deal(BBTRoomModel.getPlayerVo().handCardIds);
				this.initCards(BBTRoomModel.getPlayerVo().handCardIds);
				this.typePX = 0;
				return ;
			}
		}else if(this.typePX == 0){
			this.typePX = 1;
			this.initMorenPaix();
			return ;
		}
	},

	getLocalItem:function(key){
		var val = cc.sys.localStorage.getItem(key);
		if(val)
			val = parseInt(val);
		return val;
	},

	getCards:function(){
		var result = [];
		for(var i=0;i<this._cards.length;i++){
			result.push(this._cards[i].getData());
		}
		return result;
	},

	onDecideZhuang:function(event){
		var obj = event.getUserData();
		var seat = obj.seat;
		var qiangZhuang = obj.zhuang;
		var self = this;
		//this.hideAllBanker();

		if(qiangZhuang != null){
			if(qiangZhuang.length ==1){
				this._players[seat].isBanker(true);
			}else{
				if(qiangZhuang.length == 0){
					for(var i=0;i<BBTRoomModel.players.length;i++){
						this._players[BBTRoomModel.players[i].seat].play();
					}
				}else{
					for(var i=0;i<BBTRoomModel.players.length;i++){
						for(var j=0;j<qiangZhuang.length;j++){
							if(BBTRoomModel.players[i].seat == qiangZhuang[j]){
								this._players[BBTRoomModel.players[i].seat].play();
							}
						}
					}
				}
				setTimeout(function() {
					self._players[seat].isBanker(true);
				},2100);
			}
		}else{
			this._players[seat].isBanker(true);
		}
	},

	showFixScole:function(event){
		var message = event.getUserData();
		if(message.zj == 1){
			this.addShowPai(this.getWidget("Panel_zj"),BBTRoomModel.zjScorePai,true);
		}else{
			this.addShowPai(this.getWidget("Panel_xj"),BBTRoomModel.xjScorePai,false);
		}
		this.showScore();
	},

	addShowPai:function(panel,pai,flag)
	{
		var realPai = [];
		for(var i=0;i<pai.length;i++){
			realPai.push(BBTAI.getCardDef(pai[i]));
		}
		panel.removeAllChildren(true);
		for(var i=0; i<realPai.length; i++){
			var card = new BBTBigCard(realPai[i],true);
			card.anchorX=card.anchorY=0;
			card.scale = 0.3;
			if(flag){
				card.setLocalZOrder(100 - i);
				var realX = 255 - i*20;
				card.x = realX;
			}else{
				var realX = 0+i*20;
				card.x = realX;
			}
			card.y =-10;
			panel.addChild(card);
		}
	},

	showScore:function(){
		if(BBTRoomModel.getZjScore() >= 100){
			this.getWidget("Label_zjf1").setString("1");
			this.getWidget("Label_zjf2").setString("0");
			this.getWidget("Label_zjf3").setString("0");
		}else{
			this.getWidget("Label_zjf1").setString("0");
			this.getWidget("Label_zjf2").setString(parseInt(BBTRoomModel.getZjScore()/10));
			this.getWidget("Label_zjf3").setString(parseInt(BBTRoomModel.getZjScore()%10));
		}
		if(BBTRoomModel.getxjScore() >= 100){
			this.getWidget("Label_xjf1").setString("1");
			this.getWidget("Label_xjf2").setString("0");
			this.getWidget("Label_xjf3").setString("0");
		}else{
			this.getWidget("Label_xjf1").setString("0");
			this.getWidget("Label_xjf2").setString(parseInt(BBTRoomModel.getxjScore()/10));
			this.getWidget("Label_xjf3").setString(parseInt(BBTRoomModel.getxjScore()%10));
		}
	},

	onBuyaoClick:function()
	{
		cc.log("1234");
		this.sendPlayCardMsg(0,[]);
	},

	showTu:function(event){
		var message = event.getUserData();
		var seat = message.seat;
		var tu = message.tu;
		if(message.firstTu == 1){
			this._players[seat].showFirstTu(true);
		}
		this._players[seat].showTu(tu);
		if(tu == 1){
			if(seat == BBTRoomModel.ext[3]){
				AudioManager.play(BBTRoomSound.getPath(1,"fandou.wav"));
			}else{
				AudioManager.play(BBTRoomSound.getPath(1,"dou.wav"));
			}

		}else{
			//AudioManager.play(BBTRoomSound.getPath(1,"bufanqiang.wav"));
		}
		if(seat == BBTRoomModel.mySeat){
			this.Panel_tu.visible = false;
			this.Panel_fantu.visible = false;
		}
	},

	showRobber:function(event){
		var message = event.getUserData();
		var seat = message.seat;
		var robber = message.robber;
		this._players[seat].showRobber(robber);
		if(robber == 1){
			AudioManager.play(BBTRoomSound.getPath(1,"fanqiang.wav"));
		}else{
			AudioManager.play(BBTRoomSound.getPath(1,"bufanqiang.wav"));
		}
		if(seat == BBTRoomModel.mySeat){
			this.Panel_qiang.visible = false;
		}
	},

	showKaiQiang:function(event){
		var message = event.getUserData();
		var seat = message.seat;
		var kaiqiang = message.kaiqiang;
		this._players[seat].showKaiqiang(kaiqiang);
		if(kaiqiang == 1){
			AudioManager.play(BBTRoomSound.getPath(1,"kaiqiang.wav"));
		}else{
			AudioManager.play(BBTRoomSound.getPath(1,"touxiang.wav"));
		}
		if(seat == BBTRoomModel.mySeat){
			this.Panel_kaiqiang.visible = false;
		}

	},

	showChui:function(event){
		var message = event.getUserData();
		var seat = message.seat;
		var chui = message.chui;
		this._players[seat].showChui(chui);
		if(chui == 1){
			AudioManager.play(BBTRoomSound.getPath(1,"chui.wav"));
		}else{
			AudioManager.play(BBTRoomSound.getPath(1,"buchui.wav"));
		}
		if(seat == BBTRoomModel.mySeat){
			this.Panel_chui.visible = false;
		}

	},

	onKaiqiangClick:function(obj){
		var temp = parseInt(obj.temp);
		sySocket.sendComReqMsg(152,[temp]);
	},

	onQiangClick:function(obj){
		var temp = parseInt(obj.temp);
		sySocket.sendComReqMsg(153,[temp]);
	},

	onTuClick:function(obj){
		var temp = parseInt(obj.temp);
		sySocket.sendComReqMsg(154,[temp]);
	},

	onChuiClick:function(obj){
		var temp = parseInt(obj.temp);
		cc.log("chui");
		sySocket.sendComReqMsg(151,[temp]);
	},

		refreshStatus:function(){
			var stage=BBTRoomModel.getCurrentStage();
			cc.log("refreshStatus"+stage);
			var playerMe = BBTRoomModel.getPlayerVo();
			this.Panel_chui.visible =this.Panel_tu.visible = this.Panel_qiang.visible = this.Panel_kaiqiang.visible= this.Panel_fantu.visible = false;
			this.Button_buyao.visible = this.btnBreak.visible = this.Button_4.visible = false;
			if(stage < BBTRoomModel.PLAY){
				BBTRoomModel.ext[11] = 0;
				for(var key in this._players){
					this._players[key].showWangSP();
				}
			}
			switch (stage){
				case BBTRoomModel.ENTRY:
				case BBTRoomModel.READY://准备阶段
					break;
				case BBTRoomModel.CHUI://锤
					var bet = BBTRoomModel.getPlayerChui(BBTRoomModel.getPlayerVo());
					if( bet > 0 ){
						this.Panel_chui.visible = false;
					}else{
						this.Panel_chui.visible = true;
					}
					for(var key in this._players){
						this._players[key].showStatus();
					}
					break;
				case BBTRoomModel.KAIQIANG://开枪
					var bet = BBTRoomModel.getPlayerKaiqiang(BBTRoomModel.getPlayerVo());
					if(BBTRoomModel.mySeat == BBTRoomModel.getWangSeat()){
						if( bet > 0 ){
							this.Panel_kaiqiang.visible = false;
						}else{
							this.Panel_kaiqiang.visible = true;
						}
					}
					for(var key in this._players){
						this._players[key].showStatus();
					}
					break;
				case BBTRoomModel.ROBBANKER://抢庄
					cc.log("11111fff"+BBTRoomModel.getPlayerQz(BBTRoomModel.getPlayerVo()));
					if(BBTRoomModel.mySeat != BBTRoomModel.getWangSeat()){
						var bet = BBTRoomModel.getPlayerQz(BBTRoomModel.getPlayerVo());
						if( bet > 0 ){
							this.Panel_qiang.visible = false;
						}else{
							this.Panel_qiang.visible = true;
						}
					}
					break;
				case BBTRoomModel.DOU://陡
					cc.log("BBTRoomModel.isCanDu"+BBTRoomModel.isCanDu+"BBTRoomModel.getPlayerDou(BBTRoomModel.getPlayerVo())"+BBTRoomModel.getPlayerDou(BBTRoomModel.getPlayerVo()));
					if (BBTRoomModel.renshu == 2){

								//var bet = BBTRoomModel.getPlayerDou(BBTRoomModel.getPlayerVo());
								//if (bet > 0) {
								//	this.Panel_tu.visible = false;
								//} else {
								//	this.Panel_tu.visible = true;
								//}

						this.Panel_tu.visible = true;
					}else{
						switch (BBTRoomModel.isCanDu){
							case 0:
								break;
							case 1:
								cc.log("BBTRoomModel.getBrankerSeat()"+BBTRoomModel.getBrankerSeat());
								if(BBTRoomModel.mySeat == BBTRoomModel.getBrankerSeat()){
									this.Panel_fantu.visible = true;
								}else{
									this.Panel_tu.visible = true;
								}
								break;
							case 2:
								FloatLabelUtil.comText("没有两个炸不能陡");
								break;
							default :
								var bet = BBTRoomModel.getPlayerDou(BBTRoomModel.getPlayerVo());
								if( bet > 0 ){
									this.Panel_tu.visible = false;
								}else {
									this.Panel_tu.visible = true;
								}
								break;
						}
					}


					break;
				case BBTRoomModel.PLAY://玩
					this.Button_buyao.visible = this.btnBreak.visible = this.Button_4.visible = (BBTRoomModel.nextSeat==BBTRoomModel.mySeat);
					if(!this._lastCardPattern){
						this.Button_buyao.visible = false;
						this.Button_4.x = 427;
						if(this._allCards.length == 0){
							this.changeLetOutButton(false);
						}
					}
					break;
				case BBTRoomModel.OVER://结算
					BBTRoomModel.zjScorePai = [];
					BBTRoomModel.xjScorePai = [];
					this.getWidget("Panel_zj").removeAllChildren(true);
					this.getWidget("Panel_xj").removeAllChildren(true);
					if(this.getChildByTag(100)){
						this.removeChildByTag(100);
					}
					break;
			}
		},


	setRadioBtnImg:function(){
		this.audioBtnImg = "res/ui/pdk/pdkRoom/pdkRoom_4.png";
		this.btnUntouchImg = "res/ui/pdk/pdkRoom/pdkRoom_5.png";
	},


	//标记 玩家已经显示了头像
	setRoldPlayerIcon:function(event) {
		var seat = event.getUserData();
		//cc.log("修改玩家是否已经绘制完头像" , seat);
		var players = BBTRoomModel.players;
		for(var i=0;i<players.length;i++) {
			var p = players[i];
			if(p.seat ==seat){
				p.isRoladIcon = 1;
			}
		}
	},

	updateGpsBtn:function(){
		if(this.btn_Gps){
			if(GPSModel.getGpsData(PlayerModel.userId) == null){
				this.btn_Gps.setBright(false);
				//this.btn_Gps.setTouchEnabled(false);
			}else{
				this.btn_Gps.setBright(true);
				this.btn_Gps.setTouchEnabled(true);
			}
		}
	},

	onZhanKai:function(){
		var mc = new pdkRoomSetPop();
		PopupManager.addPopup(mc);
	},

	onPlayerInfo:function(obj){
		this._players[obj.temp].showInfo();
	},

	onChat:function(){
		var mc = new ChatPop();
		PopupManager.addPopup(mc);
	},

	onQiePai:function(){
		sySocket.sendComReqMsg(22,[]);
	},

	onGpsPop:function(){
		PopupManager.addPopup(new GpsPop(BBTRoomModel , 3));
	},

	runPropAction:function(event){
		//seat 接收者的座位号  userId表示发送者的userId  content表示道具的索引值
		var data = event.getUserData();
		var userId = data.userId;
		var seat = data.seat;
		var content = data.content;
		cc.log("content..." , content);
		var p = BBTRoomModel.getPlayerVo(userId);
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
	 * 在线或者离线状态
	 * @param event
	 */
	onOnline:function(event){
		var data = event.getUserData();
		this._players[data[0]].leaveOrOnLine(data[1]);
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
		cc.log("改变该座位玩家状态..." , seat);
		this._players[seat].showStatus(status);
		if(seat == BBTRoomModel.mySeat){
			this.Button_30.visible = /*this.Button_qiepai.visible =*/false;
			this.Button_17.visible = (ObjectUtil.size(this._players)<BBTRoomModel.renshu);
		}
	},

	unSelectAllCards:function(){
		for(var i=0;i<this._cards.length;i++){
			var card = this._cards[i];
			if(card.isSelected())
				card.unselected();
		}
	},

	enableAllCards:function(){
		for(var i=0;i<this._cards.length;i++){
			this._cards[i].enableAction();
		}
	},

	/**
	 * 当前牌局结束
	 * @param event
	 */
	onOver:function(event){
		BBTRoomModel.updateStatus(BBTRoomModel.OVER);
		var data = event.getUserData();
		for(var i=0;i<data.length;i++){
			this.letOutCards(data[i].cards,data[i].seat,true);
		}
		this.Button_buyao.visible = this.btnBreak.visible = this.Button_4.visible = false;
		this.Image_40.visible = /*this.Image_qiepai.visible =*/ false;
		var self = this;
		setTimeout(function(){//延迟弹出结算框
			for(var i=1;i<=3;i++){
				self.getWidget("small"+i).removeAllChildren(true);
				self.getWidget("ybq"+i).visible = false;
			}
			for(var i=0;i<data.length;i++){
				self._players[data[i].seat].updatePoint(data[i].totalPoint);
			}
			if(BBTRoomModel.nowBurCount == ClosingInfoModel.ext[4]){
				var mc = new BBTSmallResultPop(data);
				PopupManager.addPopup(mc);
			}
		},3000);
	},

	cleanCurData:function(){
		this._lastCardPattern = null;
		this.Button_buyao.visible = false;
		this.Button_4.x = 384;
		if(this._allCards.length > 0){
			this.changeLetOutButton(true);
		}
		this.getWidget("Panel_fenpai").removeAllChildren(true);
	},

	/**
	 * 修正前端错误的出牌类型
	 */
	fixCardType:function(cardType){
		if(this._lastCardPattern){
			if(this._lastCardPattern.type != cardType){
				cc.log("修正_lastCardPattern.type：", this._lastCardPattern.type  , cardType);
				this._lastCardPattern.type = cardType;//强行赋值！
			}
		}
	},

	/**
	 * 收到出牌消息，前台开始处理
	 * @param event
	 */
	onLetOutCard:function(event){
		this._countDown = BBTRoomModel.timeOut || 30;
		for(var i=1;i<=3;i++){
			this.getWidget("ybq"+i).visible = false;
		}
		var self = this;
		var buyao = false;
		var message = event.getUserData();
		var seat = message.seat;
		if(message.isFirstOut){
			this._players[seat].showRank(message.isFirstOut);
			this._players[seat].cleanBj();
		}
		if(seat == BBTRoomModel.mySeat){//我自己出牌了，清理掉选择的牌
			this._allCards.length = 0;
			this.enableAllCards();
		}
		if(message.cardIds.length==0){//要不起
			buyao = true;
			this._players[seat].showStatus(-1);
			if(seat == BBTRoomModel.mySeat){
				this._allCards.length = 0;
				this.enableAllCards();
				this.unSelectAllCards();
			}
		}else{
			//已经出牌了
			this._players[seat].hideLeaveSp();
			var ids = message.cardIds;
			var cardTransData = [];
			for(var i=0;i<ids.length;i++){
				cardTransData.push(BBTAI.getCardDef(ids[i]));
			}
			this._lastCardPattern = BBTAI.filterCards(cardTransData);
			if(this._lastCardPattern.type == BBTAI.KING){
				BBTRoomModel.ext[11] = 1;
				this._players[seat].showWangSP();
				BBTRoomModel.isKingCard = true;
			}else{
				BBTRoomModel.isKingCard = false;
			}
			if(message.cardType){
				this.fixCardType(message.cardType);
			}
			this._lastLetOutSeat = seat;
			BBTRoomEffects.play(this._players,this.root,this._lastCardPattern,seat);
			//BBTRoomEffects.play(this.root,this._lastCardPattern);
			//if(this._lastCardPattern && this._lastCardPattern.type==BBTAI.BOMB)
			//	RoomEffects.bomb(this._players,this.root,seat);
			cc.log("lastCardPattern::"+JSON.stringify(this._lastCardPattern));
		}
		//报停
		if(message.isBt ==  1){
			this._players[seat].baoting();
		}
		//下个出牌的位置
		//var nextSeat = this.seatSeq[seat][1];
		var nextSeat = message.nextSeat;
		if(nextSeat == BBTRoomModel.mySeat){//轮到我出牌了
			this.Button_buyao.visible = this.Button_4.visible = this.btnBreak.visible = true;
			//清理自己出的牌
			this.getWidget("small"+1).removeAllChildren(true);
			if(!this._lastCardPattern){
				this.Button_buyao.visible = false;
			}
			if(message.isLet===1){
				this.Button_buyao.x = 427;
				this.Button_4.x = 640;
				//this.Button_buyao.visible = this.Button_4.visible = this.btnBreak.visible = true;
				if(this._lastLetOutSeat == BBTRoomModel.mySeat){
					this._lastCardPattern = null;
					this.Button_buyao.visible = false;
					this.Button_4.x = 427;
					if(this._allCards.length > 0){
						this.changeLetOutButton(true);
					}
				}//转了一圈了
				var selectedCards =  this._allCards;
				var result = BBTAI.filterCards(selectedCards,this.getCardsOnHand(),this._lastCardPattern);
				if(result){
					if(!this._lastCardPattern || (this._lastCardPattern.type==result.type/* || result.type==BBTAI.BOMB*/)){
						//setTimeout(function(){
						//	self._allCards = selectedCards;
						//	self._cCardPattern = result;
						//	if(self.isBombBreak()){
						//		self._allCards.length=0;
						//		self._cCardPattern = null;
						//		return self.smartLetOut();
						//	}
						//	self.onPlayCard(this.btnBreak,true);
						//},300);
					  this.changeLetOutButton(true);
					}else{
						this.changeLetOutButton(true);
						//this.smartLetOut();
					}
				}else{
					this.changeLetOutButton(false);
					//this.smartLetOut();
				}
				this.showJianTou(nextSeat);
				if(this._allCards.length == 0){
					this.changeLetOutButton(false);
				}
			}else{//我也要不起
				setTimeout(function(){
					//self._players[BBTRoomModel.mySeat].showStatus(-1);
					//self.sendPlayCardMsg(0,[]);
					//self.letOutCards([],BBTRoomModel.mySeat);
					//self.showJianTou(self.seatSeq[BBTRoomModel.mySeat][1]);
				},1000);
				self.showJianTou(nextSeat);
				this.Button_buyao.visible = true;
				this.Button_buyao.x = 640;
				this.Button_4.visible = this.btnBreak.visible = false;
				//this.Button_4.visible = this.btnBreak.visible = false;
			}
		}else{
			this.showJianTou(nextSeat);
			this.Button_buyao.visible = this.Button_4.visible = this.btnBreak.visible = false;
		}
		if(!buyao)
			BBTRoomSound.letOutSound(message.userId,this._lastCardPattern);
		this.letOutCards(message.cardIds,message.seat);
		PlayBBTMessageSeq.finishPlay();
	},

	onTouchBegan: function (touch, event) {
		return BBTCardDelegate.dealTouchBegin(this, touch , event);
	},

	onTouchMoved: function (touch, event) {
		return BBTCardDelegate.dealTouchMove(this, touch , event);
	},

	onTouchEnded: function (touch, event) {
		return BBTCardDelegate.dealTouchEnded(this, touch , event);
	},

	changeLetOutButton:function(isTouch){
		if(isTouch == this._letOutButtonTouchable)
			return;
		this._letOutButtonTouchable = isTouch;
		if(isTouch){
			this.btnBreak.setTouchEnabled(true);
			this.btnBreak.loadTextureNormal("res/ui/pdk/pdkRoom/btn_2.png");
		}else{
			this.btnBreak.setTouchEnabled(false);
			this.btnBreak.loadTextureNormal("res/ui/pdk/pdkRoom/btn_5.png");
		}
	},

	isCanLetOut:function(){
		//cc.log("isCanLetOut1::"+JSON.stringify(this._lastCardPattern));
		this._cCardPattern = BBTAI.filterCards(this._allCards,this.getCardsOnHand(),this._lastCardPattern);
		//cc.log("isCanLetOut2::"+JSON.stringify(this._cCardPattern));
		if(this._lastCardPattern && this._cCardPattern && this._cCardPattern.type != this._lastCardPattern.type && !BBTAI.isTxPx(this._cCardPattern.type))
			this._cCardPattern = null;
		cc.log("isCanLetOut3::"+JSON.stringify(this._cCardPattern));
		this.changeLetOutButton((this._cCardPattern!=null));
		if(this._allCards.length<=0){
			BBTRoomModel.prompt(null);
			this.changeLetOutButton(false);
		}//把选中的牌全部取消了,提示的数据也需要清掉

	},

	getModel: function () {
		return BBTRoomModel;
	},

	getLabelTime: function () {
		return this.getWidget("LableTime");//时间;
	},

	/**
	 * 初始化卡牌
	 * @param cards {Array.<CardVo>}
	 */
	initCards:function(cards,flag){
		cc.log("initCards....111")
		if(this._cards.length>0){//清理掉上一局的牌
			for(var i=0;i<this._cards.length;i++){
				this._cardPanel.removeChild(this._cards[i]);
			}
			this._cards.length=0;
		}
		if(this._cards.length == 0){
			var winSize = cc.director.getWinSize();
			var centerX = ((winSize.width) - this._cardW)/2;
			var maxCard = 17;
			var offX = 60;
			if(cards.length > 1){
				offX = 60 * (cards.length - 1) / maxCard ;//手牌位置稍微往右移动一点
			}else{
				offX = 0;
			}
			var initX = (winSize.width  - (this._cardW+this._cardG*(cards.length-1)))/2 + offX;
			for(var i=0;i<cards.length;i++){
				var card = new BBTBigCard(cards[i]);
				card.scale = 0.9;
				card.cardId = i;
				card.anchorX=card.anchorY=0;
				var realX = initX+i*this._cardG;
				card.x = centerX;
				card.y = 0;
				this._cardPanel.addChild(card);
				this._cards.push(card);
				if(!flag){
					card.letOutAnimate(realX);
				}else{
					card.x = realX;
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

	getCardsNoBOBBOnHand:function(){
		 this.NObbhand = [];
		for(var i=0;i<this._cards.length;i++){
			if(this._cards[i].getData().sx == 1){
				this.NObbhand.push(this._cards[i].getData());
			}
		}
		return this.NObbhand;
	},

	getCardsNoBOBBandWSKOnHand:function(){
		this.NObbhand = [];
		for(var i=0;i<this._cards.length;i++){
			if(this._cards[i].getData().sx <= 3){
				this.NObbhand.push(this._cards[i].getData());
			}
		}
		return this.NObbhand;
	},

	getCardsNoBOBBandZWSKOnHand:function(){
		this.NObbhand = [];
		for(var i=0;i<this._cards.length;i++){
			if(this._cards[i].getData().sx <= 7){
				this.NObbhand.push(this._cards[i].getData());
			}
		}
		return this.NObbhand;
	},

	getCardsNoBOBBandBOMBOnHand:function(){
		this.NObbhand = [];
		for(var i=0;i<this._cards.length;i++){
			if(this._cards[i].getData().sx <= 8 ){
				this.NObbhand.push(this._cards[i].getData());
			}
		}
		return this.NObbhand;
	},

	getCardsNoBOBBandTHXOnHand:function(){
		this.NObbhand = [];
		for(var i=0;i<this._cards.length;i++){
			if(this._cards[i].getData().sx <= 9 ){
				this.NObbhand.push(this._cards[i].getData());
			}
		}
		return this.NObbhand;
	},

	getCardsNoBOBBandDIZHAOnHand:function(){
		this.NObbhand = [];
		for(var i=0;i<this._cards.length;i++){
			if(this._cards[i].getData().sx <= 10 ){
				this.NObbhand.push(this._cards[i].getData());
			}
		}
		return this.NObbhand;
	},


	letOutCards:function(cardIds,seat,isOver,isCL){
		if(!isOver){
			var nextSeq = this.getPlayerSeq(-1,BBTRoomModel.mySeat,this.seatSeq[seat][1]);
			this.getWidget("small"+nextSeq).removeAllChildren(true);
		}else{
			if(cardIds.length>0){
				var overSeq = this.getPlayerSeq(-1,BBTRoomModel.mySeat,seat);
				this.getWidget("small"+overSeq).removeAllChildren(true);
			}

		}
		if(cardIds.length==0)
			return;
		AudioManager.play("res/audio/common/audio_card_out.mp3");
		var seq = 1;
		if(seat == BBTRoomModel.mySeat){//自己出牌
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
			var handels = BBTRoomModel.getPlayerVo().handCardIds;
			for(var n=0;n<cardIds.length;n++){
				for(var i=0;i<handels.length;i++){
					var card = handels[i];
					if(card.c == cardIds[n]){
						BBTRoomModel.getPlayerVo().handCardIds.splice(i,1);
						break;
					}
				}
			}
			if(this.typePX == 1){
				if(this.pxValue == 1){
					this._players[BBTRoomModel.mySeat].sortDeal(BBTRoomModel.getPlayerVo().handCardIds);
				}else if(this.pxValue == 2){
					this._players[BBTRoomModel.mySeat].sortTHXDeal(BBTRoomModel.getPlayerVo().handCardIds);
				}else if(this.pxValue == 3){
					this._players[BBTRoomModel.mySeat].sortBOMBDeal(BBTRoomModel.getPlayerVo().handCardIds);
				}else if(this.pxValue == 4){
					this._players[BBTRoomModel.mySeat].sortWSKDeal(BBTRoomModel.getPlayerVo().handCardIds);
				}
				this.initCards(BBTRoomModel.getPlayerVo().handCardIds,true);
			}
			var winSize = cc.director.getWinSize();
			var length = this._cards.length;
			var maxCard = 17;
			var offX = 60;
			if(cards.length > 1){
				offX = 60 * (cards.length - 1)/maxCard ;//手牌位置稍微往右移动一点
			}else{
				offX = 0;
			}
			var initX = (winSize.width - (this._cardW+this._cardG*(cards.length-1)))/2 + offX;
			for(var i=0;i<length;i++){
				this._cards[i].x = initX+i*this._cardG;
				this._cards[i].cardId = i;
			}
		}else{
			seq = this.getPlayerSeq(-1,BBTRoomModel.mySeat,seat);
			if(!isCL){
				var playerVo=BBTRoomModel.getPlayerVoBySeat(seat);
				if(playerVo!=null){
					if(!isOver){
						playerVo.ext[0]-=cardIds.length;
					}
					if(this._players[seat]){
						this._players[seat].showLastCard();
					}
				}
			}
		}
		var copyCardIds = ArrayUtil.clone(cardIds);
		var offX = 33;
		var smallCardScale = 0.5;
		length = copyCardIds.length;
		var smallW = this._cardW * smallCardScale;
		if(seq == 1){
			initX = (800 - (smallW+offX*(length-1)))/2;
		}else if(seq == 2) {
			initX = (800-smallW);
			copyCardIds.reverse();
		}else{
			initX = 0;
		}
		this.getWidget("small"+seq).removeAllChildren(true);
		var count = this.getWidget("Panel_fenpai").getChildrenCount();

		var handPaiIsFenCount = 0;
		if(BBTRoomModel.getCurrentStage() == BBTRoomModel.PLAY && !isCL){
			for(var i=0;i<length;i++){
				var smallCard = BBTAI.getCardDef(copyCardIds[i])
				if(smallCard.i == 5 || smallCard.i == 10 || smallCard.i == 13){
					handPaiIsFenCount++;
				}
			}
		}

		for(var i=0;i<length;i++){
			var smallCard = new BBTSmallCard(BBTAI.getCardDef(copyCardIds[i]) , 2);
			smallCard.anchorX=smallCard.anchorY=0;
			smallCard.scale = smallCardScale;
			if(seq == 2){
				smallCard.x = initX - i*offX;
				smallCard.setLocalZOrder(length-i);
			}else{
				smallCard.x = initX + i*offX;
			}
			smallCard.y = 0;
			this.getWidget("small"+seq).addChild(smallCard);
			if(BBTRoomModel.getCurrentStage() == BBTRoomModel.PLAY && !isCL){
				if(smallCard.i == 5 || smallCard.i == 10 || smallCard.i == 13){
					var newsmallCard = new BBTSmallCard(BBTAI.getCardDef(copyCardIds[i]) , 2);
					newsmallCard.scale = 0.25;
					newsmallCard.anchorX=newsmallCard.anchorY=0;
					var pos = this.getWidget("small"+seq).convertToWorldSpace(cc.p(smallCard.x,smallCard.y));
					var posnew = this.getWidget("Panel_fenpai").convertToNodeSpace(pos);
					newsmallCard.x = posnew.x;
					newsmallCard.y = posnew.y;
					newsmallCard.setLocalZOrder(99999);
					this.getWidget("Panel_fenpai").addChild(newsmallCard);
					this.runAnimate(newsmallCard,count,handPaiIsFenCount);
				}
			}
		}
	},

	runZKAnimate:function(){
		var arr = this.getWidget("Panel_fenpai").getChildren();
		var initX  = (120 - ((arr.length) * 20)/2);
		for (var i = 0; i < arr.length; i++) {
			arr[i].visible = true;
			arr[i].x = initX+(i+1)*20;
		}
	},

	runAnimate:function(card,count,handPaiIsFenCount){
		if(count > 0){
			card.letYHandOutAnimate(this);
			//var arr = this.getWidget("Panel_fenpai").getChildren();
			//setTimeout(function() {
			//	var initX  = (120 - ((arr.length) * 20)/2);
			//	for (var i = 0; i < arr.length; i++) {
			//		arr[i].visible = true;
			//		arr[i].x = initX+(i+1)*20;
			//	}
			//},500);
		}else{
			var realcount = this.getWidget("Panel_fenpai").getChildrenCount();
			var initX  = (120 - ((handPaiIsFenCount) * 20)/2);
			card.letOutAnimate(realcount,initX);
		}
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
		sySocket.send(msg,msgType);
	},

	/**
	 * 是否有炸弹被拆散
	 * @returns {boolean}
	 */
	isBombBreak:function(){
		if(this._cCardPattern.type >= BBTAI.WUSHIK)
			return false;
		//var cardsOnHand = this.getCardsOnHand();
		//var temp = {};
		//var bombi = [];
		//for(var i=0;i<cardsOnHand.length;i++){
		//	var card = cardsOnHand[i];
		//	if(temp[card.i]){
		//		temp[card.i] += 1;
		//	}else{
		//		temp[card.i] = 1;
		//	}
		//	if(temp[card.i]==4)
		//		bombi.push(card.i);
		//}
		var isHas = false;
		for(var i=0;i<this._allCards.length;i++){
			var card = this._allCards[i];
			if(card.sx > 1 && card.sx < 11){
				return true;
			}
		}
		return isHas;
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
			this.sendPlayCardMsg(this._cCardPattern.type,this._allCards);
		}else{//有可能提前选择了牌，再次筛选一次
			if(this._allCards.length>0){
				this._cCardPattern = BBTAI.filterCards(this._allCards,this.getCardsOnHand(),this._lastCardPattern);
				if(this._cCardPattern){
					if(!bombBreak && this.isBombBreak()){
						AlertPop.show("炸弹被拆散，确定出牌吗？",function(){self.onPlayCard(obj,true);});
						return;
					}
					this.sendPlayCardMsg(this._cCardPattern.type,this._allCards);
				}
			}
		}
	},

	smartLetOut:function(){
		var result = [];
		var allCards = [];
		//下家报停，单张的情况
		if(BBTRoomModel.isNextSeatBt() && this._lastCardPattern && this._lastCardPattern.type==BBTAI.SINGLE){
			var resultbt = BBTAI.autoFilter(this.getCardsOnHand(), this._lastCardPattern,2);
			if(resultbt.length==1){
				result.push(0);
			}else if(resultbt.length>1){
				result = resultbt;
			}
		}else {
			if(!this._lastCardPattern || this._lastCardPattern.type!=BBTAI.THREE) {
				result = BBTAI.autoFilter(this.getCardsOnHand(), this._lastCardPattern,2);
				if (result.length > 0) {
					for (var i = 0; i < result.length; i++) {
						allCards.push(this._cards[result[i]].getData());
					}
					var selectedCards = ArrayUtil.clone(allCards);
					this._cCardPattern = BBTAI.filterCards(selectedCards, this.getCardsOnHand(), this._lastCardPattern);
					if(this._cCardPattern){
						if(this._cCardPattern.maxCount>=4&&this._cCardPattern.type!=BBTAI.BOMB){//防止3个带最后把炸弹带出去了
							result.length = 0;
						}else{
							BBTRoomModel.prompt(this._cCardPattern);
							var resultNext = BBTAI.autoFilter(this.getCardsOnHand(), this._lastCardPattern,2);
							//只有唯一可以出的牌
							if (resultNext.length > 0)
								result.length = 0;
							else{
								cc.log("只有唯一可以出的牌");
							}
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
		BBTRoomModel.prompt(null);
	},

	/**
	 * 提示动作
	 */
	onPlayTip:function(){
		var isNoboBBHand = true;
		if(this._lastCardPattern && ((this._lastCardPattern.type < BBTAI.WUSHIK) ||( BBTRoomModel.promptCardPattern && BBTRoomModel.promptCardPattern.type < BBTAI.WUSHIK))  && this.typePX == 1){
			//cc.log("fffffffffff"+this.getCardsNoBOBBOnHand()[0].c);
			isNoboBBHand = false;
			var result = BBTAI.autoFilter(this.getCardsNoBOBBOnHand(),this._lastCardPattern,1);
		}else{
			var result = BBTAI.autoFilter(this.getCardsOnHand(),this._lastCardPattern,1);
		}
		//var result = BBTAI.autoFilter(this.getCardsOnHand(),this._lastCardPattern,1);
		//if(BBTRoomModel.isNextSeatBt() && this._lastCardPattern && this._lastCardPattern.type==BBTAI.SINGLE){
		//	result = BBTAI.autoFilter(this.getCardsOnHand(),this._lastCardPattern,2);
		//}
		if(this.typePX == 1  && (result.length==0)) {
			if(this._lastCardPattern && ((this._lastCardPattern.type < BBTAI.WUSHIK) ||( BBTRoomModel.promptCardPattern && BBTRoomModel.promptCardPattern.type < BBTAI.WUSHIK))){
				isNoboBBHand = false;
				var result = BBTAI.autoFilter(this.getCardsNoBOBBandWSKOnHand(),this._lastCardPattern,1);
			}
		}

		if(this.typePX == 1  && (result.length==0)) {
			if(this._lastCardPattern && ((this._lastCardPattern.type <= BBTAI.WUSHIK) ||( BBTRoomModel.promptCardPattern && BBTRoomModel.promptCardPattern.type <= BBTAI.WUSHIK))){
				isNoboBBHand = false;
				var result = BBTAI.autoFilter(this.getCardsNoBOBBandZWSKOnHand(),this._lastCardPattern,1);
			}
		}

		if(this.typePX == 1  && (result.length==0)) {
			if(this._lastCardPattern && ((this._lastCardPattern.type <= BBTAI.BOMB) ||( BBTRoomModel.promptCardPattern && BBTRoomModel.promptCardPattern.type <= BBTAI.BOMB))){
				isNoboBBHand = false;
				var result = BBTAI.autoFilter(this.getCardsNoBOBBandBOMBOnHand(),this._lastCardPattern,1);
			}
		}

		if(this.typePX == 1  && (result.length==0)) {
			if(this._lastCardPattern && ((this._lastCardPattern.type <= BBTAI.TONGHUASHUN) ||( BBTRoomModel.promptCardPattern && BBTRoomModel.promptCardPattern.type <= BBTAI.TONGHUASHUN))){
				isNoboBBHand = false;
				var result = BBTAI.autoFilter(this.getCardsNoBOBBandTHXOnHand(),this._lastCardPattern,1);
			}
		}

		if(this.typePX == 1  && (result.length==0)) {
			if(this._lastCardPattern && ((this._lastCardPattern.type <= BBTAI.DIZHA) ||( BBTRoomModel.promptCardPattern && BBTRoomModel.promptCardPattern.type <= BBTAI.DIZHA))){
				isNoboBBHand = false;
				var result = BBTAI.autoFilter(this.getCardsNoBOBBandDIZHAOnHand(),this._lastCardPattern,1);
			}
		}

		if(this.typePX == 1  && (result.length==0)) {
			isNoboBBHand = true;
			var result = BBTAI.autoFilter(this.getCardsOnHand(), this._lastCardPattern, 1);
		}

		//没下个牌的提醒了，或者已经提示到了炸弹，停止往下搜索
		if(BBTRoomModel.promptCardPattern && (result.length==0 || BBTRoomModel.promptCardPattern.type == BBTAI.KING)){
			BBTRoomModel.prompt(null);
			this.onPlayTip();
			return;
		}
		//先把现在选中的牌取消
		this.unSelectAllCards();
		var allCards = [];
		if(!isNoboBBHand){
			for(var i=0;i<result.length;i++){
				for(var j=0;j<this._cards.length;j++){
					var card = this._cards[j];
					if(card.getData().c == this.NObbhand[result[i]].c){
						card.selectAction();
						if(card.isSelected())
							allCards.push(card.getData());
					}
				}
			}
		}else{
			for(var i=0;i<result.length;i++){
				var card = this._cards[result[i]];
				cc.log("ggg"+card.getData().c);
				card.selectAction();
				if(card.isSelected())
					allCards.push(card.getData());
			}
		}

			//for(var i=0;i<result.length;i++){
			//	var card = this._cards[result[i]];
			//	card.selectAction();
			//	if(card.isSelected())
			//		allCards.push(card.getData());
			//}

		this._allCards = allCards;
		this._cCardPattern = BBTAI.filterCards(this._allCards,this.getCardsOnHand(),this._lastCardPattern);
		BBTRoomModel.prompt(this._cCardPattern);
		this.isCanLetOut();
	},

	/**
	 * 邀请
	 */
	onInvite:function(){
		var obj={};
		obj.tableId=BBTRoomModel.tableId;
		obj.userName=PlayerModel.username;
		obj.callURL=SdkUtil.SHARE_URL+'?num='+BBTRoomModel.tableId+'&userId='+encodeURIComponent(PlayerModel.userId);
		obj.title='半边天炸   房号：'+BBTRoomModel.tableId;
		if(BBTRoomModel.tableType == 1){
			obj.title='[亲友圈]半边天炸   房号：'+BBTRoomModel.tableId;
		}

		var fanfei = BBTRoomModel.getFangFeiName(BBTRoomModel.ext[0]);
		var isZwsk ="正510K不分花色";
		if(BBTRoomModel.ext[5] == 1){
			isZwsk = "正510K分花色";
		}

		var iskc ="";
		if(BBTRoomModel.ext[4] == 1){
			iskc = "可锤";
		}

		var iszd ="";
		if(BBTRoomModel.ext[6] == 1){
			iszd = "助徒";
		}

		var ispaishu ="";
		if(BBTRoomModel.ext[9] == 1){
			ispaishu = "显示剩余牌数";
		}

		var isdaisan ="";
		if(BBTRoomModel.ext[10] == 1){
			isdaisan = "可四带三";
		}

		obj.description=csvhelper.strFormat("{0}人,{1}局,{2} {3} {4} {5} {6} {7}。",BBTRoomModel.renshu,BBTRoomModel.totalBurCount,fanfei,iskc,isZwsk,iszd,ispaishu,isdaisan);
		obj.shareType=1;
		ShareDTPop.show(obj);
	},

	/**
	 * 有人加入房间
	 * @param event
	 */
	onJoin:function(event){
		var p = event.getUserData();
		cc.log("p.seat , p.userId" , p.seat , p.userId);
		var seq = this.getPlayerSeq(p.userId,BBTRoomModel.mySeat, p.seat);
		this._players[p.seat] = new BBTCardPlayer(p,this.root,seq);
		this.Button_17.visible = (ObjectUtil.size(this._players)<BBTRoomModel.renshu);
		var seats = BBTRoomModel.isIpSame();
		if(seats.length>1){
			for(var i=0;i<seats.length;i++) {
				this._players[seats[i]].isIpSame(true);
			}
		}
	},

	onExitRoom:function(event){
		var p = event.getUserData();
		this._players[p.seat].exitRoom();
		delete this._players[p.seat];
		var seats = BBTRoomModel.isIpSame();
		for (var key in this._players) {
			if (ArrayUtil.indexOf(seats, key) < 0) {
				this._players[key].isIpSame(false);
			}
		}
	},


	/**
	 * 牌局开始
	 * @param event
	 */
	startGame:function(event){
		//PopupManager.removeClassByPopup(CutCardPop);
		for(var i=1;i<=3;i++){
			if(i>1)
				this.getWidget("bt"+i).visible = false;
			this.getWidget("ybq"+i).visible = false;
			if(this._players[i]!=null){
				this._players[i].showLastCard();
			}
		}
		//this.btnBreak.visible = this.Button_4.visible = (BBTRoomModel.nextSeat==BBTRoomModel.mySeat);
		this.Button_buyao.visible = this.btnBreak.visible = this.Button_4.visible = false;
		/*this.Button_qiepai.visible=*/this.Button_17.visible = this.Button_30.visible = /*this.Button_20.visible = */ this.Image_baodan.visible =false;
		//this.Image_qiepai.visible = (BBTRoomModel.renshu==2);
		var p = event.getUserData();
		//this._players[BBTRoomModel.mySeat].sort(p.handCardIds);
		//this.initCards(p.handCardIds,true);
		this.showJianTou();
		this._countDown = BBTRoomModel.timeOut || 30;
		this._lastCardPattern = null;
		this._lastLetOutSeat = 0;
		this.typePX = 1;
		this.initMorenPaix();
	},

	initMorenPaix:function(){
		if(this._players[BBTRoomModel.mySeat].isHasDIZHAPx(BBTRoomModel.getPlayerVo().handCardIds)){
			this._players[BBTRoomModel.mySeat].sortDeal(BBTRoomModel.getPlayerVo().handCardIds);
			this.initCards(BBTRoomModel.getPlayerVo().handCardIds);
			this.pxValue = 1;
			return ;
		}else{
			if(this._players[BBTRoomModel.mySeat].isHasTHXPx(BBTRoomModel.getPlayerVo().handCardIds)){
				this._players[BBTRoomModel.mySeat].sortTHXDeal(BBTRoomModel.getPlayerVo().handCardIds);
				this.initCards(BBTRoomModel.getPlayerVo().handCardIds);
				this.pxValue = 2;
				return ;
			}else{
				if(this._players[BBTRoomModel.mySeat].isHasBobmPx(BBTRoomModel.getPlayerVo().handCardIds)){
					this._players[BBTRoomModel.mySeat].sortBOMBDeal(BBTRoomModel.getPlayerVo().handCardIds);
					this.initCards(BBTRoomModel.getPlayerVo().handCardIds);
					this.pxValue = 3;
					return ;
				}else{
					if(this._players[BBTRoomModel.mySeat].isHasWSKPx(BBTRoomModel.getPlayerVo().handCardIds)){
						this._players[BBTRoomModel.mySeat].sortWSKDeal(BBTRoomModel.getPlayerVo().handCardIds);
						this.initCards(BBTRoomModel.getPlayerVo().handCardIds);
						this.pxValue = 4;
						return ;
					}else{
						this._players[BBTRoomModel.mySeat].deal(BBTRoomModel.getPlayerVo().handCardIds);
						this.initCards(BBTRoomModel.getPlayerVo().handCardIds);
						this.typePX = 0;
						this.pxValue = 0;
						return ;
					}
				}
			}
		}
	},

	onShowHTthress:function(){
		if (BBTRoomModel.renshu == 3) {
			this._players[BBTRoomModel.nextSeat].runH3Aimation();
			if (BBTRoomModel.nextSeat == BBTRoomModel.mySeat) {
				AudioManager.play(BBTRoomSound.getPath(1, "woyouhei3wochutou.wav"));
			}
		}
	},

	updatePlayTuoguan:function(event){
		var data = event.getUserData();
		cc.log("updatePlayTuoguan..." , data);
		//data = data.split(",");
		var self = this;
		if(data.length >= 2){
			//var userId = data[0];
			var seat = data[0];
			var isTuoguan = data[1];
			cc.log("seat , isTuoguan" , seat , isTuoguan);
			var player = this._players[seat];
			if(player){
				player.updateTuoguan(isTuoguan);
			}else{
				cc.log("!!!!!!!未获取到player");
			}
			if(seat == BBTRoomModel.mySeat && this.bg_CancelTuoguan){
				if (isTuoguan){
					this.showTuoGuanTimeOutHandle = setTimeout(function(){//很恶心的操作需要延时显示取消托管
						self.bg_CancelTuoguan.visible = isTuoguan;
					},2000);
				}else{
					self.bg_CancelTuoguan.visible = isTuoguan;
				}
			}
		}
	},

	onShowWang:function(){
		//cc.log("BBTRoomModel.ext[2]",BBTRoomModel.ext[2])
		this._players[BBTRoomModel.ext[2]].isWang(true);
		var seq = this.getPlayerSeq(-1,BBTRoomModel.mySeat,BBTRoomModel.ext[2]);
		if(seq == 1){
			AudioManager.play(BBTRoomSound.getPath(1,"tianzhadaowojia.wav"));
		}
		cc.log("seq"+seq);
	},

	/**
	 * 闹钟上面的箭头
	 * @param seat
	 */
	showJianTou:function(seat){
		this.Image_40.visible = true;
		seat = seat || BBTRoomModel.nextSeat;
		for(var i=1;i<=3;i++){
			this.getWidget("tip"+i).visible = false;
		}
		this.getWidget("tip"+this.getPlayerSeq("",BBTRoomModel.mySeat,seat)).visible = true;
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
		var time = hours+":"+minutes;
		if(this.labelTime){
			this.labelTime.setString(time);
		}
	},

	getNetTypePNG:function(type){
		return "res/ui/dtz/dtzRoom/net_"+type+".png";
	},

	update:function(dt){
		this._dt += dt;
		this.loacationDt += dt;

		PlayBBTMessageSeq.updateDT(dt);

		if(this._loacationDt >= 2){
			this._loacationDt = 0;
			if(GPSModel.getGpsData(PlayerModel.userId) == null){
				//cc.log("dtzRoom::update=====>startLocation");
				GPSSdkUtil.startLocation();
			}
		}

		if(this._dt>=1){
			this._dt = 0;
			if(this._countDown >= 0 && !ApplyExitRoomModel.isShow){
				var countDown = (this._countDown<10) ? "0"+this._countDown : ""+this._countDown
				this.countDownLabel.setString(countDown);
				this._countDown--;
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