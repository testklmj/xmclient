/**
 * Created by Administrator on 2016/10/11.
 */
var DTZHomeLayer = HomeLayer.extend({
	iconContainer:null,
	point:null,
	day:null,
	isChangingSrv:false,
	ctor:function(){
		this._super(LayerFactory.DTZ_HOME);
	},

	initXueHuaParticle:function(){
		this.greenLight1 = new cc.ParticleSystem("res/particle/xue01.plist");
		this.greenLight1.x = 500;
		this.greenLight1.y = 500;
		this.addChild(this.greenLight1,0);

		this.greenLight2 = new cc.ParticleSystem("res/particle/xue02.plist");
		this.greenLight2.x = 500;
		this.greenLight2.y = 500;
		this.addChild(this.greenLight2,0);
	},

	removeXueHuaParticle:function(){
		if(this.greenLight2){
			this.greenLight2.removeFromParent(true);
			this.greenLight2 = null;
		}
		if(this.greenLight1){
			this.greenLight1.removeFromParent(true);
			this.greenLight1 = null;
		}
	},

	initParticle: function() {
		var greenLight1 = this.greenLight1 = new cc.ParticleSystem("res/particle/greenLight1.plist");
		greenLight1.x = 240;
		greenLight1.y = 360;
		this.getWidget("Panel_8").addChild(greenLight1,0);

		var greenLight2 = this.greenLight2 = new cc.ParticleSystem("res/particle/greenLight2.plist");
		greenLight2.x = 1040;
		greenLight2.y = 300;
		this.getWidget("Panel_8").addChild(greenLight2,0);
	},

	selfRender:function(){
		if (SdkUtil.isReview()) {
			//PopupManager.addPopup(new GPSReviewPop());
		}

		//this.initParticle();
		/*		var dtz_river = this.dtz_river = new AnimateSprite("res/plist/dtz_river.plist","dtz_river",1/10);
		 dtz_river.x = 680;
		 dtz_river.y = 360;
		 this.getWidget("Panel_8").addChild(dtz_river);
		 dtz_river.play();*/

		SignInModel.isClickCheck = false;
		cc.log("DTZHomeLayer...selfRender...");
		HomeLayer.prototype.selfRender.call(this);

		if(PlayerModel.sex != 1){
			if(this.getWidget("imgMan") ){
				this.getWidget("imgMan").visible = false;
			}
			if(this.getWidget("imgWeman") ){
				this.getWidget("imgWeman").visible = true;
			}
		}


		var Button_PDK = this.getWidget("Btn_CreatePDK");
		UITools.addClickEvent(Button_PDK , this , this.onCreatePDK);//onCreatePDK onCreatePHZ

		var Button_PHZ = this.getWidget("Btn_CreatePHZ");
		UITools.addClickEvent(Button_PHZ , this , this.onCreatePHZ);

		var Button_BBT = this.getWidget("Btn_CreateBBT");
		UITools.addClickEvent(Button_BBT , this , this.onCreateBBT);

		var Button_fx = this.getWidget("Button_fx");
		//UITools.addClickEvent(Button_fx,this,this.onShareDaily);
		UITools.addClickEvent(Button_fx,this,this.onActivityPop);



		/**
		 * ???????????????
		 */
		var Button_money = this.getWidget("btn_Money");
//		UITools.addClickEvent(Button_money , this , this.onMoneyBtn);
        Button_money.addTouchEventListener(this.onMoneyBtn,this);

		var Button_cd = this.getWidget("Button_cd");
		UITools.addClickEvent(Button_cd,this,this.onCaiDan);

		var Button_qd = this.getWidget("Button_qd");
		UITools.addClickEvent(Button_qd,this,this.onQiandao);

		var Button_charget = this.getWidget("btn_Charge");
		UITools.addClickEvent(Button_charget , this , this.onMoneyCharget);

		//????????????
		var Button_more = this.getWidget("Button_more");
		UITools.addClickEvent(Button_more,this,this.onMoreChoose);


		var Button_17 = this.getWidget("Button_17");
		UITools.addClickEvent(Button_17,this,this.onRedeemCode);

		var Button_yqm = this.getWidget("Button_yqm");
		UITools.addClickEvent(Button_yqm,this,this.onInviteCode);

		var Button_dl = this.getWidget("Button_dl");
		UITools.addClickEvent(Button_dl,this,this.onAgency);

		var Button_zj = this.getWidget("Button_zj");
		UITools.addClickEvent(Button_zj,this,this.onRecord);

		var Button_xx = this.getWidget("Button_xx");
		UITools.addClickEvent(Button_xx,this,this.onNotice);

		this.normolPanel = this.getWidget("normelPanel");
		this.moneyPanel = this.getWidget("moneyPanel");

		//????????????

		var Button_market = this.getWidget("Button_93");
		UITools.addClickEvent(Button_market , this , this.onMarket);

		//????????????
		var Button_back = this.getWidget("Button_back");
		UITools.addClickEvent(Button_back,this,this.onTuiChu);

		var Button_wanfa = this.getWidget("Button_wanfa");
		UITools.addClickEvent(Button_wanfa,this,this.onWanfa);

		var Button_yaoqing = this.getWidget("Button_yaoqing");
		UITools.addClickEvent(Button_yaoqing,this,this.onInvite);

		var Button_kefu = this.getWidget("Button_kefu");
		UITools.addClickEvent(Button_kefu,this,this.onService);

		var Button_wsk = this.getWidget("Button_wushik");
		UITools.addClickEvent(Button_wsk,this,this.onChangeWSK);

		//????????????
		var Button_sjbd = this.getWidget("Button_sjbd");
		UITools.addClickEvent(Button_sjbd,this,this.onBindWx);
		Button_sjbd.visible = false;

		var Button_match = this.getWidget("Button_match");
		Button_match.visible = false;
		Button_match.addTouchEventListener(this.onJoinMatch,this);

		var Button_Create = this.getWidget("Button_create");
		Button_Create.addTouchEventListener(this.onCreateAll,this);

		//???????????????
		var Button_Club = this.getWidget("Button_18");
		Button_Club.addTouchEventListener(this.onJoinClub,this);

		var Button_newActive1 = this.bindOldFriend = this.getWidget("Button_newActive1");
		Button_newActive1.temp = ActivityId.bind_oldFriend;
		UITools.addClickEvent(Button_newActive1,this,this.onNewActive);

		var Button_newActive2 = this.inviteNewFriend = this.getWidget("Button_newActive2");
		Button_newActive2.temp = ActivityId.invite_newFriend;
		UITools.addClickEvent(Button_newActive2,this,this.onNewActive);

		Button_newActive1.visible = Button_newActive2.visible = false;

		//??????
		var sten=new cc.Sprite("res/ui/dtz/HomeNew/home_3.png");
		var clipnode = new cc.ClippingNode();
		clipnode.attr({stencil:sten,anchorX:0.5,anchorY:0.5,x:68,y:677,alphaThreshold:1});
		var sprite = new cc.Sprite("res/ui/dtz/HomeNew/home_3.png");
		clipnode.addChild(sprite);
		sprite.scale = 1.1;
		this.root.addChild(clipnode,6);
		if(parseInt(PlayerModel.urlSchemeRoomId)>0){
			sy.scene.showLoading("??????????????????");
		}

		//???????????????
		if(this.getWidget("Label_version")){
			this.getWidget("Label_version").setString(SyVersion.v);
		}

		cc.loader.loadImg(PlayerModel.headimgurl,{width: 252, height:252},function(error, texture){
			if(error==null){
				sprite.setTexture(texture);
			}
			//??????socket
			if(PlayerModel.isDirect2Room()){
				if(PlayerModel.playTableId==0){
					SyEventManager.dispatchEvent(SyEvent.DIRECT_JOIN_ROOM);
				}else{//???????????????
					FloatLabelUtil.comText("??????????????????????????????????????????");
				}
			}else{
				if(!sySocket.isOpen()){
					sySocket.connect();
				}else{
					sy.scene.hideLoading();
				}
			}
		});

		if(LoginData.apkurl){//??????????????????
			AlertPop.showOnlyOk("?????????????????????????????????????????????", function(){
				OnlineUpdateUtil.downloadApk();
			});
		}

		//??????
//		this.initWaterAnimat();
//		this.homeAM1 = this.createHomeAm("renwu2",660,219 ,2 , this.normolPanel,"Animation");//????????????
//		this.homeAM2 = this.createHomeAm("renwu4",990,219 ,2, this.normolPanel,"Animation");//??????????????????
//        this.homeAM11 = this.createHomeAm("2sy",370,130 , 0 , this.normolPanel,"Animation");//?????????
		this.homeAM3 = this.createHomeAm("qt3",540,350 ,2, this.normolPanel,"Animation1");//???????????????
		this.homeAM4 = this.createHomeAm("qta",790,350 ,2, this.normolPanel,"Animation1");//???????????????
		this.homeAM5 = this.createHomeAm("renwua",200,290 , 2 , this.normolPanel,"Animation");//???????????????

		//this.homeAM6 = this.createHomeAm("hallAM6", 1136, 226, 2, this.normolPanel);//??????????????? //680
		//this.homeAM8 = this.createHomeAm("hallAM8", 540, 264, 2, this.normolPanel );//???????????????
		//?????????????????????
		//var matchBtnContent = Button_match.getContentSize();
//		this.homeAM9 = this.createHomeAm("saishi", 1192, 88, 2, this.normolPanel);//?????????????????????

		//this.homeXuehua = this.createHomeAm("xuehua" , 500 , 500 , 400);
		//this.initXueHuaParticle();
		//??????????????????????????????

//		this.schedule(this.showFish , 3);


		//???????????????
		var btn_CoinLevel1 = this.getWidget("btn_level1");
		var btn_CoinLevel2 = this.getWidget("btn_level2");
		var btn_CoinLevel3 = this.getWidget("btn_level3");
		var btn_quickJoin = this.getWidget("btn_quickJoin");
		var btn_backToHome = this.getWidget("btn_BackToHome");
		//btn_CoinLevel1.addTouchEventListener(this.onJoinMoneyLevel1,this);
		//btn_CoinLevel2.addTouchEventListener(this.onJoinMoneyLevel2,this);
		//btn_CoinLevel3.addTouchEventListener(this.onJoinMoneyLevel3,this);

		UITools.addClickEvent(btn_CoinLevel1,this,this.tryToJoinMoneyRoomLevel1);
		UITools.addClickEvent(btn_CoinLevel2,this,this.tryToJoinMoneyRoomLevel2);
		UITools.addClickEvent(btn_CoinLevel3,this,this.tryToJoinMoneyRoomLevel3);
		//UITools.addClickEvent(btn_backToHome,this,this.backToMainHome);
		UITools.addClickEvent(btn_quickJoin,this,this.tryToJoinMoneyRoom);

		//???????????????
		//this.addCustomEvent(SyEvent.SOCKET_OPENED,this,this.changeSrvOver);
		//this.addCustomEvent(SyEvent.GET_SERVER_SUC,this,this.onChooseCallBack);
		//this.addCustomEvent(SyEvent.NOGET_SERVER_ERR,this,this.onChooseCallBack);
		//this.addCustomEvent(SyEvent.GOTO_MONEY_HOME , this , this.onGotoMoneyPanel);
		//???????????????????????????
		this.addCustomEvent(SyEvent.GET_MONEY_CONFIG , this , this.onGotoMoneyPanel);
		this.addCustomEvent(SyEvent.HAS_NEW_ACTIVE , this , this.onShowNewActive);

		// this.MerryChristmasShareAutoShow();

		//?????? ????????????????????????
		//this.scheduleUpdate();
		//this.finalAngle = 225;//?????????????????????????????????????????????????????????
		//this.getWidget("Btn_CreatePDK").setRotation(this.finalAngle);
		//this.wheelState = 0;//??????????????????????????? 1 ???????????? 2 ???????????? 3????????????????????????
		//this.showTime = 2;//?????????????????????????????????
		//this.wheelTime = 0;//?????????????????????????????????????????????
		//this.wheelAngleSpeed = 5/60;//????????????????????????
		//this.wheelAddSpeed = 500/60;//??????????????????
		//this.wheelMaxSpeed = 60000/60;//?????????????????????
		//this.lastStatueHasWheelAngle = 0;
		//this.wheelSumSpeed = -20000/60;//?????????????????? this.getLastStatuSumSpeed(this.lastStatuAngle, this.wheelMaxSpeed , this.lastStatueNeedTime);
		//this.wheelEndNeedTime = Math.abs(this.wheelMaxSpeed / this.wheelSumSpeed);//6;//( this.wheelMaxSpeed - this.wheelMinSpeed ) / this.wheelSumSpeed;
		//this.lastStatuAngle = this.getAngleBySpeedAndAddSpeed(this.wheelMaxSpeed , this.wheelSumSpeed , this.wheelEndNeedTime);

		//this.wheelState = 1;//????????????



		//???????????????
		var Button_red = this.getWidget("Button_red");
		Button_red.visible = ActivityModel.isIntivingNew;
		UITools.addClickEvent(Button_red, this, this.onRedPacket);

		this.Button_olderBack = this.getWidget("Button_olderBack");
		UITools.addClickEvent(this.Button_olderBack , this , this.onOlderBack);
		if( ActivityModel.isOlderBackBtnOpen){
			this.Button_olderBack.visible = true;
		}else{
			this.Button_olderBack.visible = false;
		}

		this.Button_NewUser = this.getWidget("Button_NewUser");
		UITools.addClickEvent(this.Button_NewUser , this , this.onNewUser);
		if( ActivityModel.isNewUserHasGiftBtnOpen){
			this.Button_NewUser.visible = true;
		}else{
			this.Button_NewUser.visible = false;
		}
		//??????????????????
		//Button_red.visible = this.Button_olderBack.visible = this.Button_NewUser.visible = false;

        this.webViewNode = new cc.Node();
        // this.webViewNode.setRotation(90);
        this.addChild(this.webViewNode);
		this.Button_cq = this.getWidget("Button_cq");
		this.Button_cq.visible = false;
		UITools.addClickEvent(this.Button_cq , this , this.sendLegend);

		this.Button_jdqp = this.getWidget("Button_jdqp");
		this.Button_jdqp.visible = false;
		UITools.addClickEvent(this.Button_jdqp , this , this.sendJdqp);


//		this.homeAM9.visible = false;
		if(SdkUtil.isReview() || SdkUtil.isYYBReview()){
			Button_17.visible = false;
			Button_yqm.visible = false;
			Button_qd.visible = false;
			Button_market.visible = false;
			this.getWidget("Button_zj").x += 60;
			this.getWidget("Button_dl").x += 135;
			this.getWidget("Button_dl").loadTextureNormal("res/ui/dtz/dtzHome/btn_kefu.png");
			this.getWidget("Button_fx").visible = false;
			this.getWidget("Button_cq").visible = false;
			this.getWidget("Button_jdqp").visible = false;
			this.getWidget("Button_more").visible = false;
			this.getWidget("Button_match").visible = false;
//			this.homeAM9.visible = false;
			if (SdkUtil.isYYBReview()) {
				this.getWidget("btn_Charge").visible = false;
				this.getWidget("Image_48_0").visible = false;
				this.getWidget("Image_12_0").visible = false;
				this.getWidget("btn_Money").visible = false;
				this.getWidget("Button_18").visible = false;
			}
			if (SdkUtil.isReview()){
				this.getWidget("btn_Charge").visible = false;
			}
		}

		this.addCustomEvent(SyEvent.OPEN_INTIVE_BTN,this,this.onOpenIntiveBtn);
		this.addCustomEvent(SyEvent.GET_OLDERBACK_BTN,this,this.onOlderBackBtn);
		this.addCustomEvent(SyEvent.GET_NEWUSERHASGIFT_BTN,this,this.onNewUserBtn);
		//if (SyConfig.isIos() && SyConfig.PACKAGE_NAME != "cn.limsam.dtz") {
		//	AlertPop.show("??????????????????????????????", function() {
		//		SdkUtil.sdkOpenUrl("https://itunes.apple.com/cn/app/id1111771195?mt=8")
		//	})
		//}
		this.getWidget("Image_79").visible = false;
		this.getNoticeContent();


		//??????????????????
		if (!SignInModel.isHasSignIn){
			GoldRoomActivityModel.isAutoSendSignIn = true;
			setTimeout(function(){
				ComReq.comReqSignIn([1,0],["1"]);
			},1000)

		}
	},

	onBindWx:function(){
		// PopupManager.addPopup(new BindWxPop(),100);
	},
	restart:function(){
		//this.finalAngle = Math.random() * 360;//?????????????????????????????????????????????????????????
		//this.getWidget("Btn_CreatePDK").setRotation(this.finalAngle);
		//cc.log("?????????????????????" , this.finalAngle);

		//this.getWidget("Btn_CreateBBT").rotation = 0;
		//this.wheelAngleSpeed = 5/60;//????????????????????????
		//this.wheelState = 1;//????????????
		//this.lastStatueHasWheelAngle = 0;
	},

	update:function(dt){
		var targetNode = this.getWidget("Btn_CreateBBT");
		//????????????
		if(this.wheelState == 1){
			var tTargetCurRotation = targetNode.rotation;
			var tNewTargetRotation = tTargetCurRotation + this.wheelAngleSpeed * dt;
			targetNode.setRotation(tNewTargetRotation % 360);

			if(this.wheelAngleSpeed < this.wheelMaxSpeed){
				this.wheelAngleSpeed += this.wheelAddSpeed;
			}else{
				this.wheelAngleSpeed = this.wheelMaxSpeed;
				this.wheelState = 2;//????????????????????????
				this.wheelTime = 0;//????????????
				return;
			}
			//cc.log("???????????????????????????" , tNewTargetRotation +"->" + tNewTargetRotation % 360);

		}else if(this.wheelState == 2){
			this.wheelTime += dt;//dt;
			var tTargetCurRotation = targetNode.rotation;
			var tNewTargetRotation = tTargetCurRotation + this.wheelAngleSpeed * dt;

			//cc.log("???????????????????????????" , tNewTargetRotation +"->" + tNewTargetRotation % 360);
			if(this.wheelTime > this.showTime){
				//??????????????? ?????? ????????????????????? ??????????????????
				//????????????????????? ???????????????
				this.lastDelayAngle = this.lastStatuAngle % 360;//this.getAngleBySpeedAndAddSpeed(this.wheelAngleSpeed , this.wheelSumSpeed);
				//????????????????????????????????? ?????????????????????
				this.keyAngle = this.finalAngle - this.lastDelayAngle;
				if(this.keyAngle < 0){
					cc.log("??????keyAngle");
					this.keyAngle = this.keyAngle + 360;
				}
				cc.log("keyAngle::" , this.keyAngle);
				if(this.isNearValue(tTargetCurRotation , this.keyAngle , 10)){
					cc.log("??????????????????" , this.keyAngle , this.lastDelayAngle);
					tNewTargetRotation = this.keyAngle;
					targetNode.setRotation(tNewTargetRotation % 360);
					this.wheelState = 3;//?????????????????? ??????????????????
					this.sumDelayTime = 0;
					cc.log("??????????????????", this.finalAngle , "?????????" + targetNode.rotation ,"????????????" + this.lastDelayAngle);
					return;
				}
			}
			targetNode.setRotation(tNewTargetRotation % 360);
		}else if(this.wheelState == 3){

			//???????????? ???????????????????????? ??????????????????
			this.sumDelayTime += dt;
			if(this.sumDelayTime >= this.wheelEndNeedTime){
				this.sumDelayTime = this.wheelEndNeedTime;
			}

			this.lastStatueHasWheelAngle = this.getAngleBySpeedAndAddSpeed(this.wheelMaxSpeed , this.wheelSumSpeed , this.sumDelayTime);
			var tNewTargetRotation = this.keyAngle % 360 + this.lastStatueHasWheelAngle;
			if((this.lastStatueHasWheelAngle >= this.lastStatuAngle || (this.sumDelayTime == this.wheelEndNeedTime))){//
				cc.log("this.keyAngle % 360",this.keyAngle % 360);
				cc.log("???????????? ?????????????????????",this.lastStatueHasWheelAngle,this.lastStatueHasWheelAngle%360);
				cc.log("???????????? ???????????? ?????????" , tNewTargetRotation , tNewTargetRotation % 360);
				this.wheelState = 0;
				this.wheelAngleSpeed = 0;
				this.lastStatueHasWheelAngle = 0;
				//tNewTargetRotation = this.finalAngle;
				targetNode.setRotation(tNewTargetRotation % 360);
				cc.log("??????..." , tNewTargetRotation);
				FloatLabelUtil.comText(tNewTargetRotation);
				//cc.log("?????????????????????????????????:" , this.sumDelayTime , this.wheelEndNeedTime , (this.sumDelayTime - this.wheelEndNeedTime));
				//cc.log("?????????????????????????????????:" , this.lastStatueHasWheelAngle % 360 , this.lastDelayAngle , (this.lastStatueHasWheelAngle % 360 - this.lastDelayAngle) );
				return;

			}
			//cc.log("this.lastStatueHasWheelAngle ::" ,this.lastStatueHasWheelAngle , this.wheelAngleSpeed * dt );


			targetNode.setRotation(tNewTargetRotation % 360);

		}
	},


	/**
	 * ?????? ????????????????????????????????? , ??????, ????????????(????????????)
	 * ??? ?????????
	 */
	getLastStatuSumSpeed:function(angle , curSpeed , time){
		return (angle * 2 - 2 * curSpeed * time)/Math.pow(time , 2);
	},

	/**
	 * ?????? ?????? ????????? ??? ?????? ??????????????? (angle)
	 *  x = v0*t + 0.5at??????
	 */
	getAngleBySpeedAndAddSpeed:function(speed, addSpeed, needTime){
		//var needTime =  Math.abs((speed - this.wheelMinSpeed) / addSpeed);
		var angle = (speed * needTime + 0.5 * addSpeed * Math.pow(needTime,2));
		return angle;
	},

	/**
	 * ?????????
	 */
	isNearValue:function(tValue , targetValue , dif){
		if(targetValue - dif < tValue  && tValue < targetValue + dif){
			return true;
		}else{
			return false;
		}
	},


	tryToJoinMoneyRoom:function(){

		this.tryToJoinMoneyRoomLevel1();
		return;

		var curCoin = PlayerModel.getCoin();
		if( 20000 > curCoin && curCoin >= 500){
			this.tryToJoinMoneyRoomLevel1();
		}else if(300000 > curCoin && curCoin >= 20000){
			this.tryToJoinMoneyRoomLevel2();
		}else if(curCoin >= 300000){
			this.tryToJoinMoneyRoomLevel3();
		}else{
			FloatLabelUtil.comText("?????????????????????");
		}
	},

	tryToJoinMoneyRoomLevel1:function(){
		this.moneyRoomLevel = 1;
		this.askCheckServer();
	},

	tryToJoinMoneyRoomLevel2:function(){
		this.moneyRoomLevel = 2;
		this.askCheckServer();
	},

	tryToJoinMoneyRoomLevel3:function(){
		this.moneyRoomLevel = 3;
		this.askCheckServer();
	},

	askCheckServer:function(){
		if(this.isChangingSrv){
			return;
		}
		this.isChangingSrv = true;
		var strparams = [];
		var moneyWanfa = 115;
		var modeId = moneyWanfa * 10 + this.moneyRoomLevel;
		strparams.push("1");
		strparams.push(modeId+"");
		cc.log("?????????????????????..." , strparams );
		//sy.scene.showLoading("??????????????????...");
		var self = this;
		setTimeout(function(){
			self.isChangingSrv = false;
			sy.scene.hideLoading();
		} , 5000);
		sySocket.sendComReqMsg(29 , [moneyWanfa] , strparams);//??????????????????????????????
	},

	onSuc:function(){
		if(this.isChangingSrv){//??????????????????????????????????????????????????????
			this.doJoinMoneyRoom()
		}
	},

	changeSrvOver:function(){
		cc.log("???????????? ?????????????????????????????? PHZHomeLayer"  , this.isChangingSrv);
		if(this.isChangingSrv){//??????????????????????????????????????????????????????
			this.doJoinMoneyRoom();
		}
	},

	onChooseCallBack:function(event){
		var status = event.getUserData();
		if(status==ServerUtil.GET_SERVER_ERROR){
			sy.scene.hideLoading();
			this.isChangingSrv = false;
			//FloatLabelUtil.comText("?????????????????????");
		}else if(status==ServerUtil.NO_NEED_CHANGE_SOCKET){
			this.onSuc();
		}
	},

	doJoinMoneyRoom:function(){
		this.isChangingSrv = false;
		var moneyWanfa = 115;
		var roomTypeValue = moneyWanfa;
		var roomTypeAndLevel = moneyWanfa * 10 + this.moneyRoomLevel;
		//cc.log("roomTypeValue roomTypeAndLevel" , roomTypeValue,String(roomTypeAndLevel));
		sySocket.sendComReqMsg(2,[parseInt(1) , roomTypeValue],String(roomTypeAndLevel));
	},

	onGotoClub:function(){
		sy.scene.showLoading("?????????????????????");
		PopupManager.removeClassByPopup(ClubHomePop);
		var mc = new ClubHomePop();
		PopupManager.addPopup(mc);
	},


	MerryChristmasShareAutoShow:function(){
		MerryChristmasShare.show();
	},

	onChangeWSK:function(){
		var mc = new BBTCreateRoom();
		PopupManager.addPopup(mc);
	},

	onShow:function() {
		var bgMusic = 1;
		AudioManager.reloadFromData(PlayerModel.isMusic,PlayerModel.isEffect,bgMusic);

//		if(this.waterAnimate){
//			this.waterAnimate.play();
//		}else{
//			this.initWaterAnimat()
//		}
		//this.initXueHuaParticle();
//		this.homeAM1.getAnimation().play("hallAM1", -1, 1);
//		this.homeAM2.getAnimation().play("hallAM2", -1, 1);
		this.homeAM3.getAnimation().play("Animation1", -1, 1);
//		this.homeAM4.getAnimation().play("Animation1", -1, 1);
		this.homeAM5.getAnimation().play("Animation1", -1, 1);
//		this.homeAM11.getAnimation().play("Animation1", -1, 1);
		//this.homeAM6.getAnimation().play("hallAM6" , -1 , 1);
		//this.homeAM8.getAnimation().play("hallAM8" , -1 , 1);
//		this.homeAM9.getAnimation().play("saishi" , -1 , 1);
//		this.schedule(this.showFish , 3);
		/*this.dtz_river.play();
		 this.initParticle();*/


		//????????????
		var Button_red = this.getWidget("Button_red");
		Button_red.visible = ActivityModel.isIntivingNew;

		var Button_olderBack = this.getWidget("Button_olderBack");
		if( ActivityModel.isOlderBackBtnOpen){
			Button_olderBack.visible = true;
		}else{
			Button_olderBack.visible = false;
		}

		var Button_NewUser = this.getWidget("Button_NewUser");
		if( ActivityModel.isNewUserHasGiftBtnOpen){
			Button_NewUser.visible = true;
		}else{
			Button_NewUser.visible = false;
		}

	},

	onHide:function() {
//		this.homeAM1.getAnimation().stop();
//		this.homeAM2.getAnimation().stop();
		this.homeAM3.getAnimation().stop();
//		this.homeAM4.getAnimation().stop();
		this.homeAM5.getAnimation().stop();
//		this.homeAM11.getAnimation().stop();
//		//this.homeAM6.getAnimation().stop();
//		//this.homeAM8.getAnimation().stop();
//		this.homeAM9.getAnimation().stop();
//		this.removeXueHuaParticle();
//		this.unschedule(this.showFish);
		/*this.dtz_river.stop();
		 this.greenLight1.removeFromParent(true);
		 this.greenLight2.removeFromParent(true);*/
//		if(this.waterAnimate){
//			this.waterAnimate.stop();
//		}
	},

	initWaterAnimat:function(){
		this.waterAnimate = new AnimateSprite(10 , "res/plist/waterAnm" , 1/15 , 2 , cc.rect(0 , 0 , 763 , 330));
		this.waterAnimate.x = 731.0; //720
		this.waterAnimate.y = 0; //166
		this.waterAnimate.anchorX = this.waterAnimate.anchorY = 0.5
		this.waterAnimate.anchorY = 0;
		this.waterAnimate.setLocalZOrder(0);
		if(this.waterAnimate){
			this.waterAnimate.play();
		}
		this.root.addChild(this.waterAnimate , 0);
		//this.getWidget("Panel_8").addChild(this.waterAnimate , 0);
	},

	createHomeAm:function(armatureName,x,y,zOrder,parentNode,armatureName1) {
		var zOrder = zOrder  || 1;
		var tparentNode = parentNode || this.root;
		var armatureJson = "res/plist/"+armatureName+".ExportJson";
		ccs.armatureDataManager.addArmatureFileInfo(armatureJson);
		var armature = new ccs.Armature(armatureName);
		armature.x = x;
		armature.y = y;
		armature.anchorX = armature.anchorY = 0.5;
		tparentNode.addChild(armature , zOrder);
		armature.getAnimation().play(armatureName1 ? armatureName1 : armatureName, -1, 1);
		return armature;
	},

	showFish:function(){
		var fishType = 1;
		var initx = 800;
		var inity = 80;
		var offx = 100;
		var offy = 10;
		var x , y = 0;
		var scale = 1;
		fishType = parseInt(Math.random() * (3) + 1); //1 2 3
		if(fishType == 1){
			x = initx;
			y = inity;
			scale = 1;
		}else if(fishType == 2){
			x = initx - (fishType - 1) * offx;
			y = inity + (fishType - 1) * offy;
			scale = 0.9;
		}else if(fishType == 3){
			x = initx - (fishType - 1) * offx;
			y = inity + (fishType - 1) * offy;
			scale = 0.8;
		}

		//???????????????
		if(this.fishAnimation == null){
			var plist = "res/plist/hallAM7.plist";
			var fileName = "hallAM7";
			var unit = 1/16;
			this.fishAnimation = new AnimateSprite(plist , fileName ,unit);
			this.root.addChild(this.fishAnimation , 1);
		}
		this.fishAnimation.stop();
		this.fishAnimation.x = x;
		this.fishAnimation.y = y;
		this.fishAnimation.scale = scale;
		this.fishAnimation.play();

		//cc.log("???????????????..." , fishType);

	},

	onTuiChu:function(){
		var mc = new AlertPop("???????????????????????????",function(){
			sy.scene.exitGame();
		},function(){
			sy.scene.toplayer.removeAllChildren(true);
		});
		sy.scene.toplayer.addChild(mc);
	},

	onService:function(){
		if(SdkUtil.isReview()){
			AlertPop.showOnlyOk("???????????????4006567310");
		}else{
			ServicePop.showOnlyOk("res/servicePop.json","kuailewan666","??????????????????");
		}
	},

	onWanfa:function(){
		PopupManager.addPopup(new DTZWanfaPop());
	},

	onNotice:function(){
		cc.log("onNotice...");
		var value = {fal:false,index:1};
		SyEventManager.dispatchEvent(SyEvent.NEW_TIPS,value);
		sySocket.sendComReqMsg(12,[1]);
	},

	//onGiftChange:function(){
	//	cc.log("onGiftChange...");
	//	ComReq.comReqTaskGift([1]);
	//},

	onAgency:function(){
		if (SdkUtil.isReview()) {
			AlertPop.showOnlyOk("???????????????4006567310");
		}else {
			Network.loginReq("qipai", "angencyShow", {}, function (data) {
				if (data) {
					cc.log("????????????????????????..." , JSON.stringify(data));
					var dailiPop = new DailiPop(JSON.parse(data.angency));
					PopupManager.addPopup(dailiPop);
				}
			}.bind(this), function () {
				FloatLabelUtil.comText("????????????????????????");
			});
		}
	},

	//??????
	onQiandao:function(){
		SignInModel.isClickCheck = true;
		sySocket.sendComReqMsg(15,[1]);
	},

	//??????
	onCaiDan:function(){
		PopupManager.addPopup(new HomeSetPop());
	},

	onMoreChoose:function(){
		PopupManager.addPopup(new HomeBandingPop());
		//this.Image_rzBg.visible = true;
	},

	//????????????
	onRedPacket:function(){
		cc.log("???????????????");
		ActivityModel.isAutomaticOpen = false;
		sySocket.sendComReqMsg(1005,[0],["24"]);
	},
	//???????????????
	onOlderBack: function(){
		cc.log("???????????????");
		sySocket.sendComReqMsg(1005,[0],["25"]);
	},
	//???????????????
	onNewUser: function(){
		cc.log("???????????????");
		sySocket.sendComReqMsg(1005,[0],["26"]);
	},

	onOlderBackBtn: function(){
		this.Button_olderBack.visible = true;
	},

	onNewUserBtn: function(){
		this.Button_NewUser.visible = true;
	},

	onOpenIntiveBtn:function(){
		this.getWidget("Button_red").visible =true;
	},

	//????????????
	sendLegend: function(){
		var time = Math.floor(new Date().getTime()/1000);
		var sign = md5("0"+PlayerModel.userId+PlayerModel.username+time+"a4701f60719810263347242e3a992569");
		var url ="https://game.aimiplay.com/kuailewancq/login?"+"user_id="+PlayerModel.userId+"&game_id="+0 +"&username="+encodeURIComponent(PlayerModel.username)+"&sign="+sign+"&time="+time;
		//if (SdkUtil.is316Engine() && (SyConfig.isIos() || SyConfig.isAndroid())){
		//    var result = SdkUtil.setOrientation(2);
		//    if (result == false) {
		//    	SdkUtil.sdkOpenUrl(url);
		//    	return;
		//    }
        //
         //   if (ccui.WebView){
         //       var viewport = cc.visibleRect;
         //       cc.log("viewport...", viewport.width, viewport.height);
         //       var webView = this.webView = new ccui.WebView();
         //       webView.x = viewport.center.x;
         //       webView.y = viewport.center.y;
         //       webView.setScalesPageToFit(true);
         //       webView.setContentSize(viewport);
         //       webView.loadURL(url);
         //       webView.setJavascriptInterfaceScheme("dtzqp");
         //       this.webViewNode.addChild(webView);
         //       this.webView.reload();
        //
         //       webView.setOnJSCallback(function(sender, url) {
         //           SdkUtil.setOrientation(1);
         //           cc.log("OnJSCallback:" + url);
         //           if (url.indexOf("dtzqp://close") >= 0) {
         //               this.webView.removeFromParent();
         //               this.webView = null;
         //           }
         //       }.bind(this));
         //   }
		//}else{
			SdkUtil.sdkOpenUrl(url);
		//}
	},


	//????????????
	sendJdqp: function(){
		//??????7???16?????????10???????????????
		var limitData = "2019-07-16 10:00:00";
		var limitTime = limitData.replace(/-/g, '/');
		var openTime = Date.parse(limitTime);
		var nowTime = new Date().getTime();
		if (nowTime < openTime){
			FloatLabelUtil.comText("7???16?????????10????????????");
			return;
		}

		var time = Math.floor(nowTime/1000);
		var string = "game_id="+522+ "&server_id="+ 0 +"&time="+time+"&user_id="+PlayerModel.userId+"&username="+PlayerModel.username+"053733b0272abdb0d8f253d6a040183a";
		var sign = md5(string);
		var url ="https://game.aimiplay.com/Qipaicqcps/login?"+"user_id="+PlayerModel.userId+"&game_id="+522+ "&server_id="+ 0 +"&username="+encodeURIComponent(PlayerModel.username)+"&sign="+sign+"&time="+time;
        //
		//cc.log("url===",url);
		//if (SdkUtil.is316Engine() && (SyConfig.isIos() || SyConfig.isAndroid())){
		//	var result = SdkUtil.setOrientation(2);
		//	if (result == false) {
		//		SdkUtil.sdkOpenUrl(url);
		//		return;
		//	}
		//   if (ccui.WebView){
		//       var viewport = cc.visibleRect;
		//       var webView = this.webView = new ccui.WebView();
		//       webView.x = viewport.center.x;
		//       webView.y = viewport.center.y;
		//       webView.setScalesPageToFit(true);
		//       webView.setContentSize(viewport);
		//       webView.loadURL(url);
		//       webView.setJavascriptInterfaceScheme("dtzqp");
		//       this.webViewNode.addChild(webView);
		//       this.webView.reload();
        //
		//       webView.setOnJSCallback(function(sender, url) {
		//           SdkUtil.setOrientation(1);
		//           cc.log("OnJSCallback:" + url);
		//           if (url.indexOf("dtzqp://close") >= 0) {
		//               this.webView.removeFromParent();
		//               this.webView = null;
		//           }
		//       }.bind(this));
		//   }
		//}else{
			SdkUtil.sdkOpenUrl(url);
		//}
	},

	/**
	 * ???????????????
	 */
	onGotoMoneyPanel:function(){
		//cc.log("DtzHomeLayer::onGotoMoneyPanel");
		LayerManager.showLayer(LayerFactory.DTZ_MONEY_HOME);
	},

	//?????????????????????
	onCreate:function(){
		var mc = new DTZCreateRoom();
		//var mc = new DTZCreateRoom();
		PopupManager.addPopup(mc);
	},

	//?????????????????????
	onCreatePDK:function(){
		var mc = new PDKCreateRoom();
		PopupManager.addPopup(mc);
	},

	//?????????????????????
	onCreatePHZ:function(){
		var mc = new PHZCreateRoom();
		PopupManager.addPopup(mc);
	},

	//?????????????????????
	onCreateBBT:function(){
		var mc = new BBTCreateRoom();
		PopupManager.addPopup(mc);
	},

	/**
	 * ???????????????
	 */
	onMoneyBtn:function(obj,type){
		//??????????????????????????? ???????????????????????????DAU
		if(type == ccui.Widget.TOUCH_BEGAN) {
            this.homeAM3.scale = 1.1;
        } else if(type == ccui.Widget.TOUCH_ENDED) {
            this.homeAM3.scale = 1;
            AudioManager.play("res/audio/common/audio_button_click.mp3");
            this.onReqGotoMoneyHome();
        } else if(type == ccui.Widget.TOUCH_CANCELED) {
            this.homeAM3.scale = 1;
        } else if(type == ccui.Widget.TOUCH_MOVED) {
            this.homeAM3.scale = obj.isHighlighted() ? 1.1 : 1;
        }
	},

	/**
	 * ???????????????????????????
	 */
	onReqGotoMoneyHome:function(){
		DTZMoneyCfgModel.cleanConfig();//????????????????????????????????? ????????????
		//sySocket.sendComReqMsg(905 , [] , ["dtz"]);
		ComReq.comReqMoneyConfig([],["dtz,pdk,phz,ddz"]);
	},

	//????????????
	onRedeemCode:function(){
		var mc = new RedeemCodePop();
		PopupManager.addPopup(mc);
	},

	onInviteCode:function(){
		var mc = new InvitationCodePop();
		PopupManager.addPopup(mc);
	},

	onInvite:function(){
		var obj={};
		obj.tableId = 0;
		obj.userName=PlayerModel.username;
		obj.callURL=SdkUtil.SHARE_URL+'?userId='+encodeURIComponent(PlayerModel.userId);
		var content = ShareDailyModel.getFeedContent();
		obj.title=content;
		obj.pyq=content;
		obj.description=content;
		obj.shareType=1;
		if (content=="" && SyConfig.hasOwnProperty("HAS_PNG_SHARE")) {//
			obj.shareType=0;
			obj.png = "res/feed/feed.jpg";
		}
		SharePop.show(obj);
	},
	//????????????
	onActivityPop:function(){
		ActivityModel.isOpenAutumnPop = false;
		ActivityModel.sendOpenActivityMsg();
	},

	onShareDaily:function(){
		Network.loginReq("qipai","share",{action:1},function(data){
			cc.log("onShareDaily::"+JSON.stringify(data));
			ShareDailyModel.isShareToday = data.isShared;
			var obj={};
			obj.tableId = 0;
			obj.userName=PlayerModel.username;
			obj.callURL=SdkUtil.SHARE_URL+'?userId='+encodeURIComponent(PlayerModel.userId);
			var content = ShareDailyModel.getFeedContent();
			obj.title = content;
			obj.description = content;
			obj.shareType=1;
			if (content == "" && SyConfig.hasOwnProperty("HAS_PNG_SHARE")) {//
				obj.shareType=0;
				obj.png = "res/feed/feed.jpg";
			}
			PopupManager.addPopup(new ShareDailyPop(obj));
		},function(){
			FloatLabelUtil.comText("????????????????????????,?????????");
		});
	},

	onMarket:function(){
		//?????????
		cc.log("on Market...");
		if(SyConfig.isIos() ){
			ios_sdk_openUrl("http://www.51nmw.com/pdklogin/weixinShare.jsp");
		}else if(SyConfig.isAndroid()){
			cc.Application.getInstance().openURL("http://www.51nmw.com/pdklogin/weixinShare.jsp");
		}
	},

	onRecord:function(){
		var mc = new DTZTotalRecordPop(1);
		PopupManager.addPopup(mc);
		//PopupManager.addPopup(new RecordListPop());
	},

	onJoinClub:function(obj,type){
		if(type == ccui.Widget.TOUCH_BEGAN) {
//			this.homeAM4.scale = 1.1;
		} else if(type == ccui.Widget.TOUCH_ENDED) {
//			this.homeAM4.scale = 1;
			AudioManager.play("res/audio/common/audio_button_click.mp3");
			this.onGotoClub();
		} else if(type == ccui.Widget.TOUCH_CANCELED) {
//			this.homeAM4.scale = 1;
		} else if(type == ccui.Widget.TOUCH_MOVED) {
//			this.homeAM4.scale = obj.isHighlighted() ? 1.1 : 1;
		}
	},

	onJoinMatch:function(obj,type){
		if(type == ccui.Widget.TOUCH_BEGAN) {
//			this.homeAM9.scale = 1.1;
		} else if(type == ccui.Widget.TOUCH_ENDED) {
//			this.homeAM9.scale = 1;
			AudioManager.play("res/audio/common/audio_button_click.mp3");
			this.onReqGotoMatchHome();
		} else if(type == ccui.Widget.TOUCH_CANCELED) {
//			this.homeAM9.scale = 1;
		} else if(type == ccui.Widget.TOUCH_MOVED) {
//			this.homeAM9.scale = obj.isHighlighted() ? 1.1 : 1;
		}
	},

	onJoin:function(obj,type){
		//cc.log("onJoin..." , type);
		if(type == ccui.Widget.TOUCH_BEGAN) {
//			this.homeAM2.scale = 1.1;
		}else if(type == ccui.Widget.TOUCH_ENDED) {
			cc.log("??????????????????");
//			this.homeAM2.scale = 1.0;
			AudioManager.play("res/audio/common/audio_button_click.mp3");
			var mc = new JoinRoomPop(3);
			PopupManager.addPopup(mc);
		} else if(type == ccui.Widget.TOUCH_CANCELED) {
//			this.homeAM2.scale = 1.0;
		} else if(type == ccui.Widget.TOUCH_MOVED) {
//			this.homeAM2.scale = obj.isHighlighted() ? 1.1 : 1;
		}
	},

	onCreateAll:function(obj,type){
		//cc.log("onJoin..." , type);
		if(type == ccui.Widget.TOUCH_BEGAN) {
//			this.homeAM1.scale = 1.1;
		}else if(type == ccui.Widget.TOUCH_ENDED) {
//			this.homeAM1.scale = 1.0;
			AudioManager.play("res/audio/common/audio_button_click.mp3");
			var mc = new CreateRoomTotalPop();
			PopupManager.addPopup(mc);
		} else if(type == ccui.Widget.TOUCH_CANCELED) {
//			this.homeAM1.scale = 1.0;
		} else if(type == ccui.Widget.TOUCH_MOVED) {
//			this.homeAM1.scale = obj.isHighlighted() ? 1.1 : 1;
		}
	},

	onMoneyCharget:function(){
		PayPop.show(2);
	},


	onNewActive:function(obj){
		var num = obj.temp + "";
		DTZMoneyCfgModel.clickActiveId = num;
		this.onMoneyBtn();
	},

	onShowNewActive:function(){
		// cc.log("onShowNewActive=============",ActivityModel.isBindOldFriend,ActivityModel.isInviteNewFriend)
		this.bindOldFriend.visible = ActivityModel.isBindOldFriend;
		this.inviteNewFriend.visible = ActivityModel.isInviteNewFriend;
	},

	/**
	 * ???????????????????????????
	 */
	onReqGotoMatchHome:function(){
		/**
		 int?????????
		 0:0??????????????????1??????2??????3???????????????????????????
		 string?????????
		 0???gameCode???????????????????????????????????????jjs_share_pdk???
		 **/
		MatchCfgModel.cleanConfig();//????????????????????????????????? ????????????
		//ComReq.comReqMatchConfig([0,3],["jjs_share_pdk"]);
		var defaultPage = UITools.getLocalItem("sy_dtz_matchPage") || 1;
		var str = "jjs_dtz";
		if(defaultPage == 1){
			str = "jjs_dtz";
		}else if(defaultPage == 2){
			str = "jjs_share_pdk";
		}
		ComReq.comReqMatchConfig([0,3],["" + str]);
	},


	//?????????????????????????????????
	getNoticeContent:function(){
		var xhr = cc.loader.getXMLHttpRequest();
		xhr.open("GET", "http://wx.52bjd.com/Agent/Marquee/game_notice_develop?version=1");
		xhr.timeout = 12000;
		xhr.setRequestHeader("Content-Type","application/x-www-form-urlencoded;charset=utf-8");

		var self = this;
		var onerror = function(){
			xhr.abort();
		};
		xhr.onerror = onerror;
		xhr.onreadystatechange = function () {
			if (xhr.readyState == 4) {
				if(xhr.status == 200){
					var data = JSON.parse(xhr.responseText);
					if(data.code == 0) {
						if (data.data) {
							var noticeV = data.data.version || 0;
							//var isUpdate = UpdateNoticeModel.isPopOut(noticeV);
							UpdateNoticeModel.init(data.data);
							//if (isUpdate){
							//cc.log("***********************1")
								//if(!PopupManager.hasClassByPopup(ActivityListPopup)){
								//	var pop = new ActivityListPopup(36);
								//	PopupManager.addPopup(pop);
								//}
							//}
							//cc.log("getNoticeContent===",data.data.content,data.data.version)
						}
					}
				}else{
					onerror.call(self);
				}
			}
		}
		xhr.send();
	},
})