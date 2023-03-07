/**
 * Created by Administrator on 2016/6/24.
 */
var LoginLayer = BaseLayer.extend({

    ctor:function(){
        this._super(LayerFactory.LOGIN);
    },

    reviewPost:function(){
        var self = this;
        var url = csvhelper.strFormat(ServerUtil.defaultLoginUrl,"user","getLoginConfig");
        Network.sypost(url,"getLoginConfig",{},function(data){
            LoginData.onReview(data);
            self.displayLoginBtn();
            GreenUtil.isGreen(self,self.onGreenS);
        },function(){
            sy.scene.hideLoading();
            AlertPop.showOnlyOk("获取登录信息失败，点击确定重试",function(){
                sy.scene.showLoading("正在登录");
                self.reviewPost();
            })
        });
    },

    onGreenS: function() {
        sy.scene.hideLoading();
        cc.log("开始登录逻辑展示...");
        if(SdkUtil.isIosReviewVersion()){//ios检测下ip
            this.reviewPost();
        }else{//不是审核阶段，直接按正常流程显示
            this.displayLoginBtn();
        }
    },


    selfRender:function(){

        var ports = "8001-8023";
        var tmp_ports = ports.split("-");
        var ports_str = "";
        for (var i = parseInt(tmp_ports[0]); i <= parseInt(tmp_ports[1]); i++) {
            if (i != 8019){
                if (ports_str == "") {
                    ports_str += i;
                }
                else {
                    ports_str += "," + i;
                }
            }
        }

        // cc.log("ports_str===",ports_str)
		// if (SyConfig.isSdk()) {
            SyConfig.TJD = false;
            SyConfig.LOGIN_URL = "http://dtz-login.bizfans.cn/pdklogin/{0}!{1}.guajilogin";
            SyConfig.REQ_URL = "http://dtz-login.bizfans.cn/pdklogin/{0}!{1}.action";
			ServerUtil.defaultLoginUrl = SyConfig.LOGIN_URL;
			ServerUtil.defaultReqUrl = SyConfig.REQ_URL;
            SyConfig.WS_HOST = "dtz-login.bizfans.cn";
            SyConfig.WS_PORT = ports_str;

        // }


        if (SyConfig.DEBUG) {
            this.setSelectServer();
        }else{
            //初始化网络列表
            SocketErrorModel.init();
        }

        ServerUtil.getServerFromTJD();
        //获取versioncode
        LoginData.versionCode = OnlineUpdateUtil.getVersionCode();
        //SdkUtil.sdkRootCheck("dev");
        sy.login=this;
        var btn = this.getWidget("Button_1");
        var btn_wx = this.getWidget("Button_2");
        var btn_xl = this.getWidget("Button_21");
        var btn_phone = this.getWidget("Button_3");
        btn.visible=btn_wx.visible=btn_xl.visible = false;
        UITools.addClickEvent(btn_wx,this,this.onWx);
        UITools.addClickEvent(btn,this,this.onVisitor);
        UITools.addClickEvent(btn_xl,this,this.onXl);
        UITools.addClickEvent(btn_phone,this,this.onPhone);
        var checkbox = this.getWidget("CheckBox_20");
        checkbox.addEventListener(this.onCheckBox,this);
        checkbox.setSelected(true);
        var checkbox2 = this.getWidget("CheckBox_20_0");
        checkbox2.addEventListener(this.onCheckBox,this);
        checkbox2.setSelected(true);
        var Panel_21 = this.getWidget("Panel_21");
        UITools.addClickEvent(Panel_21,this,this.onXieyi);
        var Panel_22 = this.getWidget("Panel_22");
        UITools.addClickEvent(Panel_22,this,this.onXieyi);
        //显示版本号
        if(this.getWidget("Label_version")){
            this.getWidget("Label_version").setString(SyVersion.v);
        }
        this.selected = true;


        // if (!SyConfig.TJD && !SyConfig.DEBUG && !SyConfig.isSelf() && SyConfig.isSdk()){
        //    AlertNewPop.showOnlyOk("当前版本过低，请重新下载游戏", function(){
        //        SdkUtil.sdkOpenUrl("http://www.klwgame.com/pdklogin/happygame.jsp");
        //        if(cc.sys.os == cc.sys.OS_IOS){
        //            ios_sdk_exit();
        //        }else{
        //            cc.director.end();
        //        }
        //    });
        //    return;
        // }

        sy.scene.showLoading("正在登录");
        GreenUtil.isGreen(this,this.onGreenS);


        var Label_outTest = this.Label_outTest = this.Label_outTest = this.getWidget("Label_outTest");
        var Label_inTest = this.Label_inTest  =  this.Label_inTest = this.getWidget("Label_inTest");
        this.Label_outTest.visible = this.Label_inTest.visible = false;

        PhoneLoginModel.init();


//        var url = SocketErrorModel.getLoginUrl();
//        cc.log("url========================",url)


//         if (!PopupManager.hasClassByPopup(JumpNewPop)) {
//             PopupManager.addPopup(new JumpNewPop(),120);
//         }
    },

    setSelectServer:function(){
        var configArr = [
            {name:"现网环境",url:"http://47.106.145.177/pdklogin/",host:"47.106.145.177",port:"9001"},
            {name:"test环境",url:"http://121.40.94.173:9050/pdklogin/",host:"121.40.94.173",port:"9001"},
            {name:"本地服",url:"http://192.168.2.4:8080/guajilogin/",host:"192.168.2.4",port:"8109"},
        ]
        this.selectBtnArr = [];
        for(var i = 0;i<configArr.length;++i){
            var btn = ccui.Button();
            btn.setTitleText(configArr[i].name);
            btn.setTitleFontName("Arial");
            btn.setTitleFontSize(36);
            btn.setPosition(cc.winSize.width - 150,cc.winSize.height/2 + 210 - i*60);
            btn.configData = configArr[i];
            this.addChild(btn,1);
            UITools.addClickEvent(btn,this,this.onClickServerBtn);
            this.selectBtnArr[i] = btn;
            btn.visible = false
        }
        this.onClickServerBtn(this.selectBtnArr[0]);
    },


    onClickServerBtn:function(sender){
        var data = sender.configData;

        SyConfig.WS_HOST = data.host;
        SyConfig.WS_PORT = data.port;

        SyConfig.LOGIN_URL = data.url + "{0}!{1}.guajilogin";
        SyConfig.REQ_URL= data.url + "{0}!{1}.action";

        cc.log("SyConfig.WS_HOST==",SyConfig.WS_HOST,SyConfig.WS_PORT)

        for(var i = 0;i<this.selectBtnArr.length;++i){
            this.selectBtnArr[i].setTitleColor(sender == this.selectBtnArr[i]?cc.color.RED:cc.color.WHITE);
        }
    },

    displayLoginBtn:function(){
        var btn = this.getWidget("Button_1");
        var btn_wx = this.getWidget("Button_2");
        var btn_xl = this.getWidget("Button_21");
        var btn_phone = this.getWidget("Button_3");

        btn_xl.visible = false;
        btn_wx.visible = true;
        btn.visible = false;
		btn_phone.visible = SdkUtil.isYYBReview() ? false : true;

        if((SyConfig.isIos() && SdkUtil.isReview()) || SyConfig.PF=="self"){
            btn.visible = true;
            //老版的ios包
            if(SdkUtil.isExitsFunction("ios_sdk_isHasWX") && ios_sdk_isHasWX()=="0"){
                btn_wx.visible=false;
            }
            //新版支持了闲聊的ios包
            if(SdkUtil.isExitsFunction("ios_sdk_isInstallApp")){
                if (ios_sdk_isInstallApp("weixin") == "0") {
                    btn_wx.visible=false;
                }
                if (ios_sdk_isInstallApp("xianliao") == "0") {
                    btn_xl.visible=false;
                }
            }
        }

        if (SyConfig.DEBUG) {
		    btn.visible = true;
		 }

        var btnArr = [btn_phone];
        if(btn.visible)btnArr.push(btn);
        if(btn_xl.visible)btnArr.push(btn_xl);
        if(btn_wx.visible)btnArr.push(btn_wx);

        var spaceX = 1280/btnArr.length;
        var startX = 640 - spaceX * (btnArr.length-1)/2;
        for(var i = 0;i<btnArr.length;++i){
            btnArr[i].x = startX;
            startX += spaceX;
        }

        if(SyConfig.isSdk()){//微信自动登录
            if (SdkUtil.isWeiXinLogin() || !SdkUtil.hasXianLiao()) {
                if (SdkUtil.hasXianLiao()) {
                    SyConfig.PF = SyConfig.WXPF;
                }
                WXHelper.check_access_token();
            } else {
                SyConfig.PF = SyConfig.XLPF;
                XLHelper.xl_check_access_token();
            }
        }
    },

    onXieyi:function(){
        var mc = new AgreementPop();
        PopupManager.addPopup(mc);
    },

    adjustViewPort:function(){
        //cc.log("cc.director.getVisibleSize()===",cc.director.getVisibleSize().width,cc.director.getVisibleSize().height);
        //cc.log("cc.director.getWinSize()===",cc.director.getWinSize().width,cc.director.getWinSize().height);
        //cc.log("cc.director.getVisibleSize()===",cc.director.getVisibleSize().width,cc.director.getVisibleSize().height);
        //this.x = (cc.director.getVisibleSize().width - 1280)/2;
    },

    isLiuHaiorAll:function(){
        if (SyConfig.isAndroid()){
            var winSizeWidth = cc.director.getWinSize().width;
            var winSizeHeight = cc.director.getWinSize().height;
            if (winSizeWidth/winSizeHeight > 2.03){
                //var x = (cc.SCENWIDTH - 1280 )/2;
                return 1;
            }
            return 0;
        }
    },

    onCheckBox:function(obj,type){
        if(type == ccui.CheckBox.EVENT_SELECTED){
            this.selected = true;
        }
        if(type == ccui.CheckBox.EVENT_UNSELECTED){
            this.selected = false;
        }
    },

    realLogin:function(params,onError){
        cc.log("realLogin::"+SyConfig.LOGIN_URL);
    	var pf = SyConfig.isSelf()||(params.visitor&&params.visitor==true) ? "" : SyConfig.PF;
        if (params.phoneLogin){
            pf = "phoneLogin";
        }
        params.p = pf;
        params.vc = LoginData.versionCode;
        params.os = cc.sys.os;
        params.syvc = LoginData.versionCode;
        params.gamevc = SyVersion.v;
       // params.ps = "123456";
        //获取android平台的渠道号，机型等登录参数        
        try{
        	var androidParams=JSON.parse(SdkUtil.sdkGetLoginParams());
        	for(var key in androidParams){
        		params[key]=androidParams[key];
        	}
        	if(androidParams.hasOwnProperty("roomId") && PlayerModel.loginTimes==0){
        		PlayerModel.urlSchemeRoomId=androidParams["roomId"];
        	}
        	//SdkUtil.sdkLog(JSON.stringify(params));
        }catch(e){
        	SdkUtil.sdkLog("realLogin exception::"+e.toString());
        }
        sy.scene.showLoading("正在登录");

        var self = this;
        Network.loginReq(
            "user","login",params,
            function(obj){
                cc.log("login=========",JSON.stringify(obj));
                if (SyConfig.PF == "xianliaodtz") {
                    WXHelper.cleanCache();
                    XLHelper.xl_setCache(obj);
                } else {
                    XLHelper.xl_cleanCache();
                    if (SyConfig.PF.indexOf("weixin")!=-1) {
                        WXHelper.setCache(obj);
                    }
                }
                if (pf == "phoneLogin"){
                    PhoneLoginModel.setPhone(params.u);
                    PhoneLoginModel.setPhonePassword(params.ps);
                }else if(SyConfig.isSelf()){
                    cc.sys.localStorage.setItem("login_u",params.u);
                    cc.sys.localStorage.setItem("login_psd",params.ps);
                }

                if (params.u && params.ps){
                    cc.sys.localStorage.setItem("login_u",params.u);
                    cc.sys.localStorage.setItem("login_psd",params.ps);
                }

                PopupManager.removeAll();
                obj.user.bindLink = obj.bindLink;
                obj.user.bindResult = obj.bindResult;
                obj.user.bindRewardState = obj.bindRewardState;
                PlayerModel.init(obj.user);
                if (obj.user && obj.user.phoneNum){
                    PhoneLoginModel.setPhone(obj.user.phoneNum);
                }
                LoginData.onLogin(obj);
                if(obj.agencyInfo){
                    AgentModel.init(obj.agencyInfo);
                }else{
                    AgentModel.init();
                }
                SdkUtil.sdkLog("uid::"+PlayerModel.username+" name::"+PlayerModel.name+" has login suc..."+obj.isIosAudit);
                if(obj.hasOwnProperty("isIosAudit"))
                    SdkUtil.isIosAudit = obj.isIosAudit;
                sySocket.isConflict = false;
                IMSdkUtil.gotyeLogin();
                cc.log("PlayerModel.connectHost==========",PlayerModel.connectHost);
                sy.scene.hideLoading();
                if (SocketErrorModel._isInitLoginSuc) {
                    if (sySocket.url && sySocket.url != PlayerModel.connectHost){
                        sySocket.url = ArrayUtil.findAndReplace(sySocket.url,PlayerModel.connectHost);
                        PlayerModel.connectHost = sySocket.url
                    }
                }else{
                    sySocket.url = PlayerModel.connectHost;
                    if (PlayerModel.connectHost){
                        SocketErrorModel._loginPort = PlayerModel.connectHost.substr(PlayerModel.connectHost.length - 4,PlayerModel.connectHost.length - 1);
                    }
                }


                SdkUtil.SHARE_URL = SdkUtil.SHARE_URL + encodeURIComponent(PlayerModel.userId);
                if(PlayerModel.matchId>0 || PlayerModel.playTableId>0){
                    var index = sySocket.url.substr(sySocket.url.length - 1, sySocket.url.length - 1);
                    sy.scene.showLoading("正在进入房间" + index);
//                    if(!sySocket.isOpen()){
                        sySocket.connect();
//                    }
                }else{
                    sy.scene.showLoading("正在进入大厅");
                    WXHeadIconManager.saveFile(PlayerModel.userId,PlayerModel.headimgurl,self.onLoadIconSuc,self);
                }
            },
            function(obj){
                SdkUtil.sdkLog("real Login fail...");

                cc.log("JSON.stringify(obj)===",JSON.stringify(obj))
                sy.scene.hideLoading();
				AlertPop.showOnlyOk("登录失败，请重新尝试!" + JSON.stringify(obj));
                if(obj.code){
                    if(obj.code == 2017){//版本过低，退出游戏重新进
                        AlertPop.showOnlyOk(obj.msg,function(){
                            if(cc.sys.os == cc.sys.OS_IOS){
                                ios_sdk_exit();
                            }else{
                                cc.director.end();
                            }
                        });
                    }else{
                        AlertPop.showOnlyOk(obj.msg,function(){
                            if(onError!=null){
                                onError();
                            }
                        });
                    }
                }else{
                    AlertPop.showOnlyOk("登录失败，请重新尝试!");
                }
            }
        );

    },

    onLoadIconSuc:function(){
        if(WXHeadIconManager.hasLocalHeadImg(PlayerModel.userId)
            && !WXHeadIconManager.isHeadImgRefresh(PlayerModel.userId,PlayerModel.headimgurl)){
            PlayerModel.headimgurl = WXHeadIconManager.getHeadImgPath(PlayerModel.userId);
        }else{
            WXHeadIconManager.saveFile(PlayerModel.userId,PlayerModel.headimgurl);
        }
        LayerManager.showLayer(LayerFactory.DTZ_HOME);
        // if (!PlayerModel.isBindWx &&!PopupManager.hasClassByPopup(BindWxPop)) {
        //     PopupManager.addPopup(new BindWxPop(),100);
        // }
    },


    onVisitor:function(){
	    if(!this.selected)
    		return;
    	var mc = new UserLoginLayer();
    	PopupManager.addPopup(mc);
    	return;
    },

    onWx:function(){
        if(!this.selected)return;
    	if(SyConfig.isSdk()){
    		SdkUtil.sdkLogin();
    	}
    },

    onXl:function() {
        if(!this.selected)return;
        if(SyConfig.isSdk()){
            SdkUtil.sdkXLLogin();
        }
    },

    onPhone:function() {
        var _type  = 2;
        PopupManager.addPopup(new PhoneManagePop(_type));
    },
})