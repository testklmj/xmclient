/**
 * Created by Administrator on 2016/10/11.
 */
var DTZMoneyHomeLayer = BaseLayer.extend({
	iconContainer:null,
	point:null,
	day:null,
	isChangingSrv:false,
	curWafa:1,
	ctor:function(){
		this._super(LayerFactory.DTZ_MONEY_HOME);
	},

	selfRender:function(){
		SignInModel.isClickCheck = false;
		this.getWidget("rname").setString(PlayerModel.name);
		this.getWidget("rid").setString("ID:"+PlayerModel.userId);
		this.rcard = this.getWidget("rcard");
		this.coinNum = this.getWidget("coinNum");
		this.rcard.setString(PlayerModel.cards);
		this.coinNum.setString(DTZRoomModel.moneyToStr(PlayerModel.getCoin()));
		this.addCustomEvent(SyEvent.PLAYER_PRO_UPDATE,this,this.onPlayerUpdate);


		if(PlayerModel.sex != 1){
			if(this.getWidget("imgMan") ){
				this.getWidget("imgMan").visible = false;
			}
			if(this.getWidget("imgWeman") ){
				this.getWidget("imgWeman").visible = true;
			}
		}

		/**
		 * 金币场按钮
		 */
		var Button_diamond = this.getWidget("Button_49");
		UITools.addClickEvent(Button_diamond , this , this.onDiamondBtn);

		var Button_Back = this.getWidget("btnBack");
		UITools.addClickEvent(Button_Back , this , this.onGotoNormolPanel);

		var Button_Set = this.getWidget("btnMoneySet");
		UITools.addClickEvent(Button_Set , this , this.onSetUp);

		var Button_Rule = this.getWidget("btnMoneyRule");
		UITools.addClickEvent(Button_Rule , this , this.onRule);

		var Button_charget = this.getWidget("btn_Charge");
		UITools.addClickEvent(Button_charget , this , this.onMoneyCharget);

		var btnGigtExchange = this.getWidget("btnGigtExchange");
		UITools.addClickEvent(btnGigtExchange , this , this.onGift);

		var btnGoldActive = this.getWidget("btnGoldActive");
		UITools.addClickEvent(btnGoldActive , this , this.onGoldActive);

		var btnInviteAward = this.getWidget("btnInviteAward");
		UITools.addClickEvent(btnInviteAward , this , this.onInviteAward);
		this.imgInvite = this.getWidget("Image_invite");
		this.imgInvite.visible = false;

		if(SdkUtil.isReview()){
			btnGigtExchange.visible = false;
			Button_charget.visible = false;
		}

		this.moneyPanel = this.getWidget("moneyPanel");

		//头像
		var sten = new cc.Sprite("res/ui/dtz/dtzCom/header_mask.png");
		var clipnode = new cc.ClippingNode();
		clipnode.attr({stencil:sten,anchorX:0.5,anchorY:0.5,x:86,y:676,alphaThreshold:0.8});
		var sprite = new cc.Sprite("res/ui/dtz/dtzHome/testIcon.png");
		clipnode.addChild(sprite);
		this.root.addChild(clipnode,6);
		if(parseInt(PlayerModel.urlSchemeRoomId)>0){
			sy.scene.showLoading("正在进入房间");
		}

		//显示版本号
		if(this.getWidget("Label_version")){
			this.getWidget("Label_version").setString(SyVersion.v);
		}

		cc.loader.loadImg(PlayerModel.headimgurl,{width: 252, height:252},function(error, texture){
			if(error==null){
				sprite.setTexture(texture);
			}
			//连接socket
			if(PlayerModel.isDirect2Room()){
				if(PlayerModel.playTableId==0){
					SyEventManager.dispatchEvent(SyEvent.DIRECT_JOIN_ROOM);
				}else{//身上有房号
					FloatLabelUtil.comText("您已有房间，无法加入好友房间");
				}
			}else{
				if(!sySocket.isOpen()){
					sySocket.connect();
				}else{
					sy.scene.hideLoading();
				}
			}
		});

		if(LoginData.apkurl){//安卓整包更新
			AlertPop.showOnlyOk("发现最新版本，请更新后进入游戏", function(){
				OnlineUpdateUtil.downloadApk();
			});
		}

		//特效
		//this.initWaterAnimat();
		//this.schedule(this.showFish , 3);
		//启动定时器显示鱼特效


		//金币场按钮
		var btn_CoinLevel1 = this.getWidget("btn_level1");
		var btn_CoinLevel2 = this.getWidget("btn_level2");
		var btn_CoinLevel3 = this.getWidget("btn_level3");
		var btn_quickJoin = this.getWidget("btn_quickJoin");
		this.btn_dtz = this.getWidget("btn_Dtz");
		this.btn_pdk = this.getWidget("btn_Pdk");
		this.btn_phz = this.getWidget("btn_Phz");
		this.btn_bbt = this.getWidget("btn_Bbt");
		this.btn_ddz = this.getWidget("btn_Ddz");
		this.btn_phz.setBright(this.curWafa == 3);
		this.btn_ddz.setBright(this.curWafa == 5);
		if (SdkUtil.isReview()) {
			this.btn_bbt.visible = false;
		}
		this.btn_dtz.btnTag = 1;
		this.btn_pdk.btnTag = 2;
		this.btn_phz.btnTag = 3;
		this.btn_bbt.btnTag = 4;
		this.btn_ddz.btnTag = 5;

		for(var index = 0 ; index < 6 ; index++){
			var btnNode = this.getWidget("btn_level"+(index+1));
			if(btnNode){
				btnNode.clickTag = index;
				//UITools.addClickEvent(btnNode , this, this.onJoinMoneyRoom);
				btnNode.addTouchEventListener(this.onClickMoneyRoom,this);
			}

		}

		//UITools.addClickEvent(btn_CoinLevel1,this,this.tryToJoinMoneyRoomLevel1);
		//UITools.addClickEvent(btn_CoinLevel2,this,this.tryToJoinMoneyRoomLevel2);
		//UITools.addClickEvent(btn_CoinLevel3,this,this.tryToJoinMoneyRoomLevel3);
		UITools.addClickEvent(btn_quickJoin,this,this.tryToJoinMoneyRoom);
		UITools.addClickEvent(this.btn_dtz , this , this.onChangeWanfa);
		UITools.addClickEvent(this.btn_pdk , this , this.onChangeWanfa);
		UITools.addClickEvent(this.btn_phz , this , this.onChangeWanfa);
		UITools.addClickEvent(this.btn_bbt , this , this.onChangeWanfa);
		UITools.addClickEvent(this.btn_ddz , this , this.onChangeWanfa);

		//金币场事件
		this.addCustomEvent(SyEvent.SOCKET_OPENED,this,this.changeSrvOver);
		this.addCustomEvent(SyEvent.GET_SERVER_SUC,this,this.onChooseCallBack);
		this.addCustomEvent(SyEvent.NOGET_SERVER_ERR,this,this.onChooseCallBack);
		this.addCustomEvent(SyEvent.GOTO_MONEY_HOME , this , this.onGotoMoneyPanel);
		this.addCustomEvent(SyEvent.GET_MONEY_CONFIG, this , this.onRespGetMoneyConfig);
		this.addCustomEvent(SyEvent.GET_MONEY_CONFIG, this , this.onRespGetMoneyConfig);
		this.addCustomEvent(SyEvent.UPDATE_AWARD_STATE , this,this.updateRedPointImg);

		//初始选中打筒子
		var defaultPage = UITools.getLocalItem("sy_dtz_moneyPage") || 1;
		if(defaultPage == 1){
			this.onChangeWanfa(this.btn_dtz);
		}else if(defaultPage == 2){
			this.onChangeWanfa(this.btn_pdk);
		}else if(defaultPage == 3){
			this.onChangeWanfa(this.btn_phz);
		}else if(defaultPage == 5){
			this.onChangeWanfa(this.btn_ddz);
		}
		this.posConfig = [252.5, 56.5 ,273.5];


		if (ActivityModel.isAutoOpenGoldActivePop()){
			// this.onGoldActive();
			ComReq.comReqSignIn([1,0],["106"]); //请求一次配置
		}else{
			this.onFreeSubsidy();
		}

		var Button_newActive1 = this.getWidget("Button_newActive1");
		Button_newActive1.temp = ActivityId.bind_oldFriend;
		UITools.addClickEvent(Button_newActive1,this,this.onNewActive);

		var Button_newActive2 = this.getWidget("Button_newActive2");
		Button_newActive2.temp = ActivityId.invite_newFriend;
		UITools.addClickEvent(Button_newActive2,this,this.onNewActive);

		cc.log("ActivityModel.isBindOldFriend==",ActivityModel.isBindOldFriend,ActivityModel.isInviteNewFriend)
		Button_newActive1.visible = ActivityModel.isBindOldFriend;
		Button_newActive2.visible = ActivityModel.isInviteNewFriend;

		if (DTZMoneyCfgModel.clickActiveId){
			ActivityModel.sendActivity([0],"" + DTZMoneyCfgModel.clickActiveId);
			DTZMoneyCfgModel.clickActiveId = 0;
		}
	},

	onNewActive:function(obj){
		var num = obj.temp + "";
		ActivityModel.sendActivity([0],"" + num);
	},

	onSetUp:function(){
		var mc = new SetUpPop(true);
		PopupManager.addPopup(mc);
	},

	/**
	 *
	 * 选择分页
	 */
	onChangeWanfa:function(obj){
		var tMoneyConfig = [];
		//cc.log("obj.btnTag::" , obj.btnTag);

		if(obj.btnTag == 1){
			this.curWafa = 1;
			tMoneyConfig = DTZMoneyCfgModel.getDtzConfig();
		}else if(obj.btnTag == 2){
			this.curWafa = 2;
			tMoneyConfig = DTZMoneyCfgModel.getPdkConfig();
		}else if(obj.btnTag == 3){
			this.curWafa = 3;
			tMoneyConfig = DTZMoneyCfgModel.getPhzConfig();
		}else if(obj.btnTag == 5){
			this.curWafa = 5;
			tMoneyConfig = DTZMoneyCfgModel.getDdzConfig();
		}else{
			FloatLabelUtil.comText("暂未开放");
			return;
		}
		//cc.log("obj.btnTag =============="+obj.btnTag);

		//本地有玩法配置的情况
		if(tMoneyConfig.length > 0){
			this.checkPage(obj.btnTag);
		}else{//本地没有配置 先隐藏操作按钮 获取到配置后再显示
			for(var index = 0 ; index < 6 ; index ++){
				var tBtnMoneyRoom = this.getWidget("btn_level" + (index + 1));
				if(tBtnMoneyRoom){
					tBtnMoneyRoom.visible = false;
				}
			}
		}

	},

	/**
	 * 获取到某种玩法的配置
	 */
	onRespGetMoneyConfig:function(event){
		this.checkPage(this.curWafa);
	},

	/**
	 * 本地有配置或者获取到配置后 刷新切页
	 * switch money game mode
	 */
	checkPage:function(curPage){
		UITools.setLocalItem("sy_dtz_moneyPage" , curPage);

		this.btn_dtz.setBright(curPage == 1);
		this.btn_pdk.setBright(curPage == 2);
		this.btn_phz.setBright(curPage == 3);
		this.btn_ddz.setBright(curPage == 5);
        for(var index = 1 ; index <= 5 ; index++) {
             var Label_game = this.getWidget("Label_game" + index);
             if (Label_game){
                if (index == curPage){
                    Label_game.setColor(cc.color(12 , 129 , 48))
                }else{
                    Label_game.setColor(cc.color(255 , 255 , 255))
                }
             }
        }
		//cc.log("checkPage===="+curPage);
		if(curPage == 1){
			this.loadConfig(DTZMoneyCfgModel.getDtzConfig());
		}else if(curPage == 2){
			this.loadConfig(DTZMoneyCfgModel.getPdkConfig());
		}else if(curPage == 3){
			this.loadConfig(DTZMoneyCfgModel.getPhzConfig());
		}else if(curPage == 5){
			this.loadConfig(DTZMoneyCfgModel.getDdzConfig());
		}
	},


	/**
	 * 加载金币场配置
	 */
	loadConfig:function(tMoneyConfig){
		//cc.log("loadConfig.................");
		var tAllConfig = tMoneyConfig;
		if(tAllConfig.length == 0){
			FloatLabelUtil.comText("娱乐场配置异常");
			LayerManager.showLayer(LayerFactory.DTZ_HOME);
			return;
		}

		var showPosY = 243;
		if(tAllConfig.length <= 3){//只有三个要显示在中间
			showPosY =  343;
		}

		for(var index = 0 ; index < 6 ; index++) {
			var tbeilv = this.getWidget("lbTitle" + (index + 1));
			var tminvalue = this.getWidget("lbBeilv" + (index + 1));
			var tbtnModeId = this.getWidget("btn_level" + (index + 1));
			if(index < tAllConfig.length){
				if(index < 3){
					tbtnModeId.y = showPosY;
				}
				tbtnModeId.visible = true;
				var tConfig = tAllConfig[index];
				tbeilv.setString("倍率 " + tConfig.ratio);
				tminvalue.setString("入场分 " + tConfig.min);
				if(tbtnModeId){
					tbtnModeId.modeId = tConfig.modeId;
					//cc.log("tbtnModeId.modeId..." ,tbtnModeId.modeId);
				}else{
					cc.log("can't get btn node");
				}
			}else{

				tbtnModeId.visible = false;
			}
		}
	},

	onPlayerUpdate:function(){
		this.rcard.setString(PlayerModel.cards);
		this.coinNum.setString(DTZRoomModel.moneyToStr(PlayerModel.getCoin()));
	},

	tryToJoinMoneyRoom:function(){
		var curCoin = PlayerModel.getCoin();
		var curWanfa = this.getWanfa();
		if(curCoin >= 50000 && curWanfa != "phz"){
			this.onJoinMoneyRoom(this.getWidget("btn_level2"));
		}else{
			this.onJoinMoneyRoom(this.getWidget("btn_level1"));
		}
	},

	getWanfa:function(){
		if(this.curWafa == 1){
			return "dtz";
		}else if(this.curWafa == 2){
			return "pdk";
		}else if(this.curWafa == 3){
			return "phz";
		}else if(this.curWafa == 5){
			return "ddz";
		}else{
			return "error";
		}
	},

	onClickMoneyRoom:function(obj , type){
		var touchIndex = obj.clickTag;

		var lbBeilv = this.getWidget("lbTitle" + (touchIndex + 1));
		var lbMin = this.getWidget("lbBeilv" + (touchIndex + 1));
		var renshuSign = this.getWidget("renshuSign" +  (touchIndex + 1));
		cc.log("cur Pos ::" , lbBeilv.y , lbMin.y , renshuSign.y);
		var poslbBeilv = this.posConfig[0];
		var poslbMin = this.posConfig[1];
		var posrenshuSign = this.posConfig[2];
		var offY = 10;

		if(type == ccui.Widget.TOUCH_BEGAN) {
			var offY = obj.isHighlighted() ? 10 : 0;
			var scale = obj.isHighlighted() ? 1.2:1;
//			lbBeilv.y = poslbBeilv + offY;
//			lbMin.y = poslbMin + offY;
			renshuSign.y = posrenshuSign + offY;
			lbBeilv.scale = scale;
			lbMin.scale = scale;
			renshuSign.scale = scale;
		} else if(type == ccui.Widget.TOUCH_ENDED) {
//			lbBeilv.y = poslbBeilv + 0;
//			lbMin.y = poslbMin + 0;
			renshuSign.y = posrenshuSign + 0;
			AudioManager.play("res/audio/common/audio_button_click.mp3");
			if (!this.onFreeSubsidy()){
				return
			}
			this.onJoinMoneyRoom(obj);
		} else if(type == ccui.Widget.TOUCH_CANCELED) {
//			lbBeilv.y = poslbBeilv + 0;
//			lbMin.y = poslbMin + 0;
			renshuSign.y = posrenshuSign + 0;
		} else if(type == ccui.Widget.TOUCH_MOVED) {
			var offY = obj.isHighlighted() ? 10 : 0;
			var scale = obj.isHighlighted() ? 1.1:1;

			//cc.log("offY2::" , offY2);
//			lbBeilv.y = poslbBeilv + offY;
//			lbMin.y = poslbMin + offY;
			renshuSign.y = posrenshuSign + offY;
			lbBeilv.scale = scale;
			lbMin.scale = scale;
			renshuSign.scale = scale;
		}
	},


	onJoinMoneyRoom:function(obj , ignoreLimit){
		var touchIndex = obj.clickTag;
		var curCoin = PlayerModel.getCoin();
		var ignoreLimit = ignoreLimit || false;
		var wanfa = this.getWanfa();
		cc.log("wanfa !!! " , wanfa);
		var tModeId = DTZMoneyCfgModel.getConfigModeId(this.getWanfa() , touchIndex);
		var self = this;
		var desc = "你的金币好多啊，去体验一把更刺激的中级场吧？（每天仅提示一次）";
		if(PlayerModel.sex == 1){
			desc = "小哥哥，你的金币好多啊，去体验一把更刺激的中级场吧？（每天仅提示一次）";
		}else{
			desc = "小姐姐，你的金币好多啊，去体验一把更刺激的中级场吧？（每天仅提示一次）";
		}

		//第一个按钮特殊处理
		if(touchIndex == 0){
			if(this.hasPlayCoinRoom() == false && ignoreLimit == false && curCoin > 20000 && curCoin < 50000 && wanfa != "phz"){
				var tDate = new Date();//记录这次弹框时间 用以判断当天是否已经已经弹出过
				cc.sys.localStorage.setItem("sy_lastMoneyTime" , tDate);

				AlertPop.show(desc,
					function(){
						self.onJoinMoneyRoom(self.getWidget("btn_level2"));
					},
					function(){
						self.onJoinMoneyRoom(self.getWidget("btn_level1") , true);
					});
				return;
			}else{
				if(curCoin >= 50000 && wanfa != "phz"){
					//弹框提示
					AlertPop.show("土豪，您的积分太多了，赶紧进入中级场挑战吧！", function(){
						self.onJoinMoneyRoom(self.getWidget("btn_level2"));
					});
				}else{
					this.curModeId = tModeId;
					cc.log("this.curModeId::" ,obj.modeId, this.curModeId);
					this.moneyRoomLevel = touchIndex + 1;
					this.askCheckServer();
				}
			}
		}else{//not first button click to money room
			this.curModeId = tModeId;
			cc.log("this.curModeId::" ,obj.modeId, this.curModeId);
			this.moneyRoomLevel = touchIndex + 1;
			this.askCheckServer();
		}

	},

	tryToJoinMoneyRoomLevel1:function(obj , ignoreLimit){
		var curCoin = PlayerModel.getCoin();
		var ignoreLimit = ignoreLimit || false;
		cc.log("PlayerModel.sex..." , PlayerModel.sex);
		if(this.hasPlayCoinRoom() == false && ignoreLimit == false && curCoin > 20000 && curCoin < 50000){
			var tDate = new Date();//记录这次弹框时间 用以判断当天是否已经已经弹出过
			cc.sys.localStorage.setItem("sy_lastMoneyTime" , tDate);
			cc.log("记录本次打金币场的时间：：",tDate);

			var self = this;
			var desc = "你的金币好多啊，去体验一把更刺激的中级场吧？（每天仅提示一次）";
			if(PlayerModel.sex == 1){
				desc = "小哥哥，你的金币好多啊，去体验一把更刺激的中级场吧？（每天仅提示一次）"
			}else{
				desc = "小姐姐，你的金币好多啊，去体验一把更刺激的中级场吧？（每天仅提示一次）"
			}

			AlertPop.show(desc,
				function(){
					self.tryToJoinMoneyRoomLevel2(self.getWidget("btn_level2") , true);
				},
				function(){
					self.tryToJoinMoneyRoomLevel1(self.getWidget("btn_level1") , true);
				});
			return;
		}else{
			if(curCoin >= 50000){
				//弹框提示
				var self = this;
				AlertPop.show("土豪，您的积分太多了，赶紧进入中级场挑战吧！", function(){
					self.tryToJoinMoneyRoomLevel2(self.getWidget("btn_level2"));
				});
			}else{
				this.curModeId = obj.modeId;

				this.moneyRoomLevel = 1;
				this.askCheckServer();
			}
		}
	},

	tryToJoinMoneyRoomLevel2:function(obj){
		this.curModeId = obj.modeId;
		this.moneyRoomLevel = 2;
		this.askCheckServer();
	},

	tryToJoinMoneyRoomLevel3:function(obj){
		this.curModeId = obj.modeId;
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
		if(this.curWafa == 2){
			moneyWanfa = 16;
		}else if(this.curWafa == 3){
			moneyWanfa = 33;
		}else if(this.curWafa == 5){
			moneyWanfa = 91;
		}
		//var modeId = moneyWanfa * 10 + this.moneyRoomLevel;
		var modeId = this.curModeId;
		strparams.push("1");
		strparams.push(modeId+"");
		cc.log("金币场请求切服..." , strparams );
		//sy.scene.showLoading("正在匹配玩家...");
		//LayerManager.showLayer(LayerFactory.DTZ_MONEY_LOADING);
		PopupManager.addPopup(new DTZMoneyLoadingPopup(moneyWanfa));
		var self = this;
		setTimeout(function(){
			self.isChangingSrv = false;
			SyEventManager.dispatchEvent(SyEvent.REMOVE_MONEY_LOADING,{});
			sy.scene.hideLoading();
		} , 5000);
		sySocket.sendComReqMsg(29 , [moneyWanfa] , strparams);//先请求后台分配服务器
	},

	onSuc:function(){
		if(this.isChangingSrv){//由切服出发的重连成功才继续进入金币场
			this.doJoinMoneyRoom()
		}
	},

	changeSrvOver:function(){
		cc.log("选服完毕 请求后台加入房间消息 PHZHomeLayer"  , this.isChangingSrv);
		if(this.isChangingSrv){//由切服出发的重连成功才继续进入金币场
			this.doJoinMoneyRoom();
		}
	},

	onChooseCallBack:function(event){
		var status = event.getUserData();
		if(status==ServerUtil.GET_SERVER_ERROR){
			sy.scene.hideLoading();
			SyEventManager.dispatchEvent(SyEvent.REMOVE_MONEY_LOADING,{});
			this.isChangingSrv = false;
			//FloatLabelUtil.comText("加入金币场失败");
		}else if(status==ServerUtil.NO_NEED_CHANGE_SOCKET){
			this.onSuc();
		}
	},

	doJoinMoneyRoom:function(){
		this.isChangingSrv = false;
		var moneyWanfa = 115;
		if(this.curWafa == 2){
			moneyWanfa = 16;
		}else if(this.curWafa == 3){
			moneyWanfa = 33;
		}else if(this.curWafa == 5){
			moneyWanfa = 91;
		}
		var roomTypeValue = moneyWanfa;
		var roomTypeAndLevel = this.curModeId;//moneyWanfa * 10 + this.moneyRoomLevel;
		sySocket.sendComReqMsg(2,[parseInt(1) , roomTypeValue],String(roomTypeAndLevel));
	},

	onShow:function() {
		cc.log("DTZMoneyHomeLayer::onShow...");

		if (DTZMoneyCfgModel.clickActiveId){
			ActivityModel.sendActivity([0],"" + DTZMoneyCfgModel.clickActiveId);
			DTZMoneyCfgModel.clickActiveId = 0;
		}

		var bgMusic = 1;
		AudioManager.reloadFromData(PlayerModel.isMusic,PlayerModel.isEffect,bgMusic);

		this.onFreeSubsidy();

		//if(this.waterAnimate){
		//	this.waterAnimate.play();
		//}else{
		//	this.initWaterAnimat()
		//}
		//this.schedule(this.showFish , 3);
	},

	onHide:function() {
		//this.unschedule(this.showFish);
		if(this.waterAnimate){
			//this.waterAnimate.stop();
		}
	},

	initWaterAnimat:function(){
		this.waterAnimate = new AnimateSprite(10 , "res/plist/waterAnm" , 1/15 , 2 , cc.rect(0 , 0 , 763 , 330));
		this.waterAnimate.x = 731.0; //720
		this.waterAnimate.y = 0; //166
		this.waterAnimate.anchorX = this.waterAnimate.anchorY = 0.5;
		this.waterAnimate.anchorY = 0;
		this.waterAnimate.setLocalZOrder(0);
		if(this.waterAnimate){
			this.waterAnimate.play();
		}
		this.root.addChild(this.waterAnimate , 0);
		//this.getWidget("Panel_8").addChild(this.waterAnimate , 0);
	},

	createHomeAm:function(armatureName,x,y,zOrder,parentNode) {
		var zOrder = zOrder  || 1;
		var tparentNode = parentNode || this.root;
		var armatureJson = "res/plist/"+armatureName+".ExportJson";
		ccs.armatureDataManager.addArmatureFileInfo(armatureJson);
		var armature = new ccs.Armature(armatureName);
		armature.x = x;
		armature.y = y;
		armature.anchorX = armature.anchorY = 0.5;
		tparentNode.addChild(armature , zOrder);
		armature.getAnimation().play(armatureName, -1, 1);
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

		//创建鱼动画
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

	},

	/**
	 * 返回普通场
	 */
	onGotoNormolPanel:function(){
		cc.log("点击返回普通场次...");
		LayerManager.showLayer(LayerFactory.DTZ_HOME);
	},


	/**
	 * 打开金币场规则
	 */
	onRule:function(){
		PopupManager.addPopup(new DTZMoneyRulePop());
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

	onDiamondBtn:function(){
		PayPop.show();
	},

	onMoneyCharget:function(){
		PayPop.show(2);
	},


	/**
	 * 请求兑换商城
	 */
	onGift:function(){
		FloatLabelUtil.comText("暂未开放");
		return
		//0:1单独获取任务列表3单独获取兑换礼品列表2获取任务列表和兑换礼品列表
		//ComReq.comReqTaskGift([2]);
	},

	onGoldActive:function(){
		ActivityModel.sendActivity([0],"" + ActivityId.everyday_game);
		//FloatLabelUtil.comText("暂未开放");
		//return
		//0:1单独获取任务列表3单独获取兑换礼品列表2获取任务列表和兑换礼品列表
		//ComReq.comReqTaskGift([2]);
	},

	onFreeSubsidy:function(){
		if (PlayerModel.getCoin() < 3000 && GoldRoomActivityModel.getSubsidyCount() < 1){
			ComReq.comReqSignIn([1,0],["104"]); //请求一次配置
			return false;
		}else{
			ComReq.comReqSignIn([1,0],["106"]); //请求一次配置
		}
		return true;
	},

	onInviteAward:function(){
		ComReq.comReqSignIn([1,0],["107"]); //请求一次配置
	},

	updateRedPointImg:function(){
		var data = GoldRoomActivityModel.getAwardData();
		if (data){
			var inviterUserAwardCount = data.inviterUserAwardCount || 0;  // 拉新：领取奖励人数
			var inviterUserCount1 = data.inviterUserCount1 || 0;     // 拉新：游戏3局以上人数
			if (inviterUserCount1 > inviterUserAwardCount){
				this.imgInvite.visible = true;
			}else{
				this.imgInvite.visible = false;
			}
		}
	},

	/**
	 * 判断当天是否打过金币场了
	 */

	hasPlayCoinRoom:function(){
		var tData = this.getLocalItem("sy_lastMoneyTime");
		cc.log("tData::" , tData);
		if(tData){
			return UITools.checkIsSameDay(tData);
		}else{
			return false;
		}
	},

	getLocalItem:function(key){
		var val = cc.sys.localStorage.getItem(key);
		return val || 0;
	}

})