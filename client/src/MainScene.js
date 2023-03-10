var MainScene = cc.Scene.extend({
	loadingPlaying:null,
	_loading:null,
	_dt:null,
	_gpsDt:null,
	_loadingTime:0,
	onEnter:function(){
		this._super();
		WXHeadIconManager.clean();
		GameData.isHide = false;
		GameData.isShow = false;
		ServerUtil.initDefaultUrlConf();
		//审核
		if(SyConfig.isIos() && SdkUtil.isReview()){
			var url = SyConfig.LOGIN_URL;
			var reqUrl = SyConfig.REQ_URL;
			if(url.search(/dtz.login.52nmw.cn/) >= 0){
				SyConfig.LOGIN_URL = url.replace(/dtz.login.52nmw.cn/, "dtztest.login.52nmw.cn");
				SyConfig.REQ_URL = reqUrl.replace(/dtz.login.52nmw.cn/, "dtztest.login.52nmw.cn");
			}
			cc.log("LOGIN_URL::"+SyConfig.LOGIN_URL);
		}

		this._dt = 0;
		this._gpsDt = 0;
		sy.scene = this;
		this.loadingPlaying = false;
		MsgHandler.init();
		var mainlayer = this.mainlayer = new cc.Layer();
		this.addChild(mainlayer);
		var customlayer = this.customlayer = new cc.Layer();
		this.addChild(customlayer);
		var popuplayer = this.popuplayer = new cc.Layer();
		this.addChild(popuplayer);
		var floatlayer = this.floatlayer = new cc.Layer();
		this.addChild(floatlayer);
		var toplayer = this.toplayer = new cc.Layer();
		this.addChild(toplayer);
		LayerManager.init(this.mainlayer);
		PopupManager.init(this.popuplayer);
		//cc.loader.load([res.poker_plist,res.poker_png,res.majiang_plist,res.majiang_png], function () {
		//	cc.spriteFrameCache.addSpriteFrames(res.poker_plist);
		cc.spriteFrameCache.addSpriteFrames(res.phz_plist);
		//	cc.spriteFrameCache.addSpriteFrames(res.majiang_plist);
		cc.spriteFrameCache.addSpriteFrames(res.poker_plist);
		cc.spriteFrameCache.addSpriteFrames(res.PDKpoker_plist);
		cc.spriteFrameCache.addSpriteFrames(res.bbtpoker_plist);
		cc.spriteFrameCache.addSpriteFrames(res.bbtpoker1_plist);
		cc.spriteFrameCache.addSpriteFrames(res.phz_cards_plist);
		cc.spriteFrameCache.addSpriteFrames(res.ddz_poker_plist);
		cc.spriteFrameCache.addSpriteFrames(res.majiang_plist);
		cc.spriteFrameCache.addSpriteFrames(res.majiang_zi_plist);
		cc.spriteFrameCache.addSpriteFrames(res.majiang_ln_plist);
		cc.spriteFrameCache.addSpriteFrames(res.majiang_ln_zi_plist);
		cc.spriteFrameCache.addSpriteFrames(res.majiang_oldzi_plist);
		cc.spriteFrameCache.addSpriteFrames(res.majiang_thjzi_plist);
		// cc.spriteFrameCache.addSpriteFrames(res.majiang_oldbg_plist);
		cc.spriteFrameCache.addSpriteFrames(res.majiang_thjbg_plist);
		cc.spriteFrameCache.addSpriteFrames(res.majiang_yellowbg_plist);


		//cc.spriteFrameCache.addSpriteFrames(res.majiang_plist);
			//cc.spriteFrameCache.addSpriteFrames(res.emoji_plist);
			LayerManager.showLayer(LayerFactory.LOGIN);
		//});
		var self=this;
		cc.eventManager.addListener({
			event: cc.EventListener.KEYBOARD,
			onKeyReleased: function(keyCode, event) {
				if (keyCode == 6) {
					AlertPop.show("确定要退出游戏吗？",function(){
						self.exitGame();
					})
				}
			}}, this);
		//进入后台
		cc.eventManager.addCustomListener(cc.game.EVENT_HIDE, function(){
			GameData.isShow = false;
			if(SdkUtil.isReview()){
				if(LayerManager.isInRoom() && !GameData.isHide){
					sySocket.disconnect();
					GameData.isHide = true;
				}
			}else{
				if(!GameData.isHide){
					sySocket.disconnect();
					GameData.isHide = true;
				}
			}
			cc.director.pause();
		});
		//恢复显示
		cc.eventManager.addCustomListener(cc.game.EVENT_SHOW, function(){
			cc.director.resume();
			GameData.isHide = false;
			if(PlayerModel.userId>0 && LayerManager.getCurrentLayer()!=LayerFactory.LOGIN){
				var showLogic = true;
				if (SdkUtil.isReview()) {
					showLogic = (LayerManager.isInRoom() || !sySocket.isOpen());
				}
				if (showLogic) {
					if(!GameData.isShow){
						setTimeout(function(){
							sy.scene.showLoading("网络已断开，正在重新连接...")
						},10);
						sySocket.connect();
						GameData.isShow = true;
					}
				}
			}
		});

		//var message = {"closingPlayers":[{"userId":"1621887","name":"vkwuv9338729","leftCardNum":16,"point":0,"totalPoint":0,"boom":0,"winCount":1,"lostCount":0,"maxPoint":0,"totalBoom":0,"cards":[415,313,412,411,410,210,110,109,108,407,306,106,304,104,303,203],"seat":2,"sex":1,"icon":"","isHu":null,"actionCounts":[],"gangIds":[],"dahus":[],"xiaohus":[]},{"userId":"1621497","name":"jin","leftCardNum":16,"point":0,"totalPoint":0,"boom":0,"winCount":0,"lostCount":1,"maxPoint":0,"totalBoom":0,"cards":[214,413,213,113,312,112,311,310,409,209,408,207,406,405,404,403],"seat":1,"sex":1,"icon":"http://wx.qlogo.cn/mmopen/tbIqPFMDiclGcgPH4wO0Hia6mbYGW2d77pgK9Il9iaojsbUqn1gpMCmQtZyewMuaGQDzyr6klMk3AnU3AAiadc43JW75R1tRQCcv/132","isHu":null,"actionCounts":[],"gangIds":[],"dahus":[],"xiaohus":[]}],"bird":[],"birdSeat":[],"isBreak":1,"wanfa":1,"ext":["400564","1621497","2017-03-16 11:09:09","16"]};
		//var responder = new ClosingPhzInfoResponder();
		//responder.respond(message);
		//PopupManager.addPopup(new MJSmallResultPop(message.closingPlayers));
		this.headerIconSprite = new cc.Sprite("res/ui/dtz/images/default_m_big.png");
		this.headerIconSprite.anchorX=this.headerIconSprite.anchorY=this.headerIconSprite.x=this.headerIconSprite.y=0;
		this.floatlayer.addChild(this.headerIconSprite);
		this.headerIconSprite.visible = false;
		
		this.paomadeng = new PaoMaDeng();
		this.paomadeng.anchorX=this.paomadeng.anchorY=0;
		this.customlayer.addChild(this.paomadeng,100);
		this.paomadeng.updatePosition(10,550);
		this.paomadeng.visible = false;
		
		SyEventManager.addEventListener(SyEvent.SOCKET_OPENED,this,this.onSocketOpen);
		SyEventManager.addEventListener(SyEvent.DIRECT_JOIN_ROOM,this,this.onDirectToRoom);
		this.scheduleUpdate();
	},

	screenshotHeaderIcon:function(tex,userId,cb,target){
		if(tex){
			this.headerIconSprite.setTexture(tex);
			var self = this;
			setTimeout(function(){
				self.headerIconSprite.visible = true;
				var rt = new cc.RenderTexture(self.headerIconSprite.width, self.headerIconSprite.height);
				rt.begin();
				self.headerIconSprite.visit();
				rt.end();
				var file = WXHeadIconManager.getHeadImg(userId);
				rt.saveToFile(file, cc.IMAGE_FORMAT_JPEG, false);
				self.headerIconSprite.visible = false;
				if(cb && target){
					cb.call(target,WXHeadIconManager.SAVE_SUC);
				}
			},30);
		}else{
			if(cb && target){
				cb.call(target,WXHeadIconManager.SAVE_SUC);
			}
		}
	},

	onDirectToRoom:function(){
		SdkUtil.sdkLog("onDirectToRoom1::"+PlayerModel.urlSchemeRoomId);
		if(PlayerModel.urlSchemeRoomId<=0)
			return;
		if(PlayerModel.userId<=0){
			return FloatLabelUtil.comText("直接进入房间失败，请先登录！");
		}
		if(LayerManager.isInRoom()){
			return FloatLabelUtil.comText("您已有房间，无法加入好友房间");
		}
//		sy.scene.showLoading("正在进入房间");
//		SdkUtil.sdkLog("onDirectToRoom2::"+PlayerModel.urlSchemeRoomId);
//		Network.loginReq("qipai","getServerById",{tableId:PlayerModel.urlSchemeRoomId},function(data){
//			var url = data.server.connectHost;
//			sySocket.url = url;
//			sySocket.connect();
//		},function(){
//			sySocket.url = PlayerModel.connectHost;
//			sySocket.connect();
//		})
	},

	onSocketOpen:function(event) {
		var data = event.getUserData();
		if (data.roomId == 0)
			sy.scene.hideLoading();
		if (data.urlscheme == "fromUrlScheme" && PlayerModel.isDirect2Room()) {//直接进房间
			sySocket.sendComReqMsg(2, [parseInt(PlayerModel.urlSchemeRoomId)]);
			PlayerModel.urlSchemeRoomId = 0;
		}
		if (PlayerModel.gps == null) {
			GPSSdkUtil.startLocation();
		}
		if (ActivityModel.isNeedSendMsg()) {
			ActivityModel.sendActivity([1], "5");
			ActivityModel.setIsSendShareMsg(false);
		}

		//请求报名的状态
		if (MatchClickModel.isNeedSendMsg()) {
			MatchClickModel.ischangeSever = true;
			if (MatchClickModel.matchType && MatchClickModel.keyId) {
				ComReq.comReqMatchConfig([5], ["" + MatchClickModel.matchType, "" + MatchClickModel.keyId]);
			}
			MatchClickModel.clearClubData();
		}

		//当比赛场配置界面打开时
		if (LayerManager.getCurrentLayer() == LayerFactory.MATCH_HOME_LAYER) {
			if (!PopupManager.hasClassByPopup(MatchApplyPop)) {
				MatchCfgModel.cleanConfig();//重新进入金币场清空配置 重新获取
				ComReq.comReqMatchConfig([0, 3], ["jjs_share_pdk"]);
			}
		}

		if (ActivityModel.isNeedSendGoldMsg()) {
			ActivityModel.sendActivity([1], "29");
			ActivityModel.setIsSendShareGoldMsg(false);
			ActivityModel.updateGoldBtnState();
		}


		if (GoldRoomActivityModel.isShareActive) {
			GoldRoomActivityModel.isShareActive = false;
			ComReq.comReqSignIn([2, 1], ["105"]);
		} else if (InviteAwardModel.isShareInvite) {
			InviteAwardModel.isShareInvite = false;
			ComReq.comReqSignIn([6, 1], ["106"]);
		}
	},

	exitGame:function(){
		if(SyConfig.isIos()){
			ios_sdk_exit();
		}else{
			SdkUtil.sdkExit();
			cc.director.end();
		}
	},

	update:function(dt){
		this._dt+=dt;
		this._gpsDt += dt;
		if(LayerManager.isInRoom()){
			GvoiceMessageSeq.updateDT(dt);
			IMSdkUtil.gotyePoll();
		}

		if(this._dt>=1){
			this._dt = 0;
			if(!PingClientModel.isSocketClose){//socket已经关闭，只检测是否有网络断开的弹框
				if(PingClientModel.isNeedReconect(LayerManager.isInRoom())){//错误次数太多，直接重连
					NetErrorPop.show(true);
				}else{
					if(PingClientModel.isNetBad()){//网络不好 给出提示
						PingClientModel.sendMsg(true);
					}else{
						if(PingClientModel.isNeedSendMsg()){
							PingClientModel.sendMsg();
						}
					}
				}
			}

			//跑马灯检测
			if(!this.paomadeng.playing){
				if(PaoMaDengModel.isHasMsg(LayerManager.isInRoom())){
					var curMsg = PaoMaDengModel.getCurrentMsg();
					if(!curMsg){
						this.paomadeng.stop();
					}else{
						if(PaoMaDengModel.isHasImportMsg()){
							this.paomadeng.play(curMsg);
						}else{
							if((curMsg.type==1&&curMsg.delay>0&&PaoMaDengModel.intervalTime<curMsg.delay) || (curMsg.type==0&&LayerManager.isInRoom())
								|| LayerManager.isInReplay() ||(curMsg.type==2&&LayerManager.isInRoom()) ){
								this.paomadeng.stop();
							}else{
								if((curMsg.type==0&&!LayerManager.isInRoom()) || curMsg.type==1 || (curMsg.type==2&&!LayerManager.isInRoom()))
									this.paomadeng.play(curMsg);
							}
							PaoMaDengModel.intervalTime += 1;
						}
					}
				}else{
					this.paomadeng.stop();
				}
			}

			if (this._loadingTime && this._loadingTime > 0){
				//cc.log("this._loadingTime======",this._loadingTime);
				this._loadingTime = this._loadingTime - 1;
				if (this._loadingTime <= 0){
					this.hideLoading();
				}
			}
		}
	},

	showFloatLabel:function(data){
		if(!this._floatLabel){
			this._floatLabel=  new FloatLabel(data);
			this.floatlayer.addChild(this._floatLabel);
		}
		this._floatLabel.pushAll(data);
	},
	
	showLoading:function(str){
		if(this.loadingPlaying)
			return;
		if (str == "正在登录"){
			this._loadingTime = 5;//暂时写成5
		}
		if(!this._loading){
			this._loading = new LoadingCircle(str);
			this.floatlayer.addChild(this._loading);
		}else{
			if(this._loading.label){
				this._loading.label.setString(str);
				this._loading.show();
			}
		}
	},

	hideLoading:function(){
		if(this._loading && !this.loadingPlaying)	this._loading.hide();
	},
});