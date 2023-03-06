/**
 * 接入SDK的util类
 */
var SdkUtil = {
	SHARE_URL:"https://fzapp.com.cn/a/4GxeGc",//"http://www.klwgame.com",//"http://a.app.qq.com/o/simple.jsp?pkgname=com.cb.dtz",
	//SHARE_CAED_URL:"http://dtztest.gm.52nmw.cn/pdkuposa/d9/", //测试服gm.dtz.klwgame.com
	SHARE_CAED_URL:"https://fzapp.com.cn/a/4GxeGc", //正式服
	COMMON_HTTP_AES:"gkdRv54cSOjUQrkB",
	isIosAudit:0,
	payType:"",

	isWeiXinLogin: function() {
		var access_token = cc.sys.localStorage.getItem("weixin_auto_login_data");
		return (access_token != null && access_token != "");
	},

	hasXianLiao: function() {
		return SyConfig.XLPF && !this.isYYBReview()? true : false;
	},

	isReview:function(){
		if(SyConfig.isIos()){
			//var now = new Date().getTime();
			return (SyConfig.VERSION_CODE=="3.0.2");
		}else{
			return false;
		}
	},

	hasDTalk: function() {
		if (SyConfig.isIos()) {
			return (SyConfig.VERSION_CODE=="1.0.5" || SyConfig.hasOwnProperty("XLPF"));
		} else {
			return SyConfig.hasOwnProperty("HAS_DTALK");
		}
	},

	isIphoneX: function() {
		//var iphone = SyConfig.isIos() ? ios_sdk_osinfo() : "";
		//return (iphone=="iPhone10,3" || iphone=="iPhone10,6");
		return (sy.is_iPhoneX == 1);
	},

	isIosReviewVersion:function(){
		return false;
		//return (SyConfig.isIos() && !LoginData.isCnUser() && PlayerModel.getLocalLoginLevel() < 30);
	},

	isYYBReview:function(){
		return false;
		// return (SyConfig.isAndroid() && LoginData.versionCode=="170");
	},

	is316Engine:function(){
		//return true;
		return cc.ENGINE_VERSION.indexOf("16") >= 0;
	},

	getPackageName:function(){
		if(!SyConfig.PACKAGE_NAME)
			return "com.cb.dtz";
		return SyConfig.PACKAGE_NAME;
	},

	sdkPaste:function(string){
		if(SyConfig.isSdk()==false) return;
		if(SyConfig.isAndroid()){
			jsb.reflection.callStaticMethod("net/sy599/common/SDKHelper", "sdkPaste", "(Ljava/lang/String;)V", string);
		}else if(SyConfig.isIos()){
			ios_sdk_paste(string);
		}
	},

	/**
	 * 检查root及开发者选项是否开启
	 * @returns {number}
	 */
	sdkRootCheck:function(checkType){
		var result = 0;
		if(SyConfig.isSdk()==false) return;
		if(SyConfig.isAndroid() && SyConfig.hasOwnProperty("ROOT_CHECK")){
			result = jsb.reflection.callStaticMethod("net/sy599/common/SDKHelper", "sdkRootCheck", "(Ljava/lang/String;)V", checkType);
		}
		return result;
	},

	/**
	 * SDK登录
	 */
	sdkLogin:function(){
		if(SyConfig.isSdk()==false) return;
		if (this.hasXianLiao()) {
			SyConfig.PF = SyConfig.WXPF;
		}
		if(SyConfig.isAndroid()){
			jsb.reflection.callStaticMethod("net/sy599/common/SDKHelper", "sdkLogin", "()V");
		}else if(SyConfig.isIos()){
			ios_sdk_login();
		}
	},

	sdkXLLogin:function(){
		SdkUtil.sdkLog("sdkXLLogin...");
		if(SyConfig.isSdk()==false) return;
		SyConfig.PF = SyConfig.XLPF;
		if(SyConfig.isAndroid()){
			jsb.reflection.callStaticMethod("net/sy599/common/SDKHelper", "sdkXLLogin", "()V");
		}else if(SyConfig.isIos()){
			ios_sdk_login("xianliao");
		}
	},

	/**
	 * 登录回调
	 * @param json {code:""}
	 */
	sdkLogincb:function(json){
		setTimeout(function(){
			if(SyConfig.isWX()){
				var params = JSON.parse(json);
				if (params.hasOwnProperty("isXL")) {
					SdkUtil.sdkLog("xian liao login callback...");
					XLHelper.xl_first_login(params);
				} else {
					SdkUtil.sdkLog("wei xin login callback...");
					WXHelper.first_login(json);
				}
			}
		},10);
	},

	sdkGetTJDServer:function(host, port){
		if(SyConfig.isSdk()==false) return;
		var params = {};
		params.host = host;
		params.port = port;
		if(SyConfig.isAndroid()){
			var json = jsb.reflection.callStaticMethod("net/sy599/common/TJDHelper", "getIp", "(Ljava/lang/String;)Ljava/lang/String;",JSON.stringify(params));
		} else {
			var json = ios_sdk_getTJDServer(JSON.stringify(params));
		}
		this.sdkLog("sdkGetTJDServer1::"+json);
		try{
			var obj = JSON.parse(json);
		}catch(e){
			this.sdkLog("json::"+e);
		}
		this.sdkLog("sdkGetTJDServer2::"+json);
		return obj;
	},


	isExitsFunction: function(funcName) {
		try {
			if (typeof(eval(funcName)) == "function") {
				return true;
			}
		} catch(e) {}
		return false;
	},

	sdkGetLoginParams:function(){
		if(SyConfig.isSdk()==false) return '{}';
		if(SyConfig.isAndroid()){
			return jsb.reflection.callStaticMethod("net/sy599/common/SDKHelper", "getLoginParams", "()Ljava/lang/String;");
		}else if(SyConfig.isIos()){
			if(this.isExitsFunction("ios_sdk_getLoginParams")){
				var lp =  ios_sdk_getLoginParams();
				return lp;
			}
		}
		return "{}";
	},
	/**
	 * sdk提交玩家数据
	 */
	sdkSubmitData:function(){
		if(SyConfig.isSdk()==false) return;
		var subJson = '{"flatId":"1111",';
		subJson += '"name":"'+PlayerModel.username+'",';
		subJson += '"uid":"'+PlayerModel.userId+'",';
		subJson += '"serverName":"test",';
		subJson += '"serverId":1}';
		if(SyConfig.isAndroid()){
			jsb.reflection.callStaticMethod("net/sy599/common/SDKHelper", "sdkSubmitData", "(Ljava/lang/String;)V", subJson);
		}else if(SyConfig.isIos()){
			if(this.isExitsFunction("ios_sdk_gotyeLogin")){
				ios_sdk_gotyeLogin(subJson);
			}
		}
	},

	/**
	 * 去浏览器打开链接
	 * @param url
	 */
	sdkOpenUrl: function(url) {
		if(SyConfig.isIos() ){
			ios_sdk_openUrl(url);
		}else{
			cc.Application.getInstance().openURL(url);
		}
	},



	/**
	 * SDK支付
	 * @param itemId
	 */
	sdkPay:function(num,id,agencyUserId,isDaiPay){
		//if(SyConfig.isSdk()==false) return;
		var self = this;
		//var payType="tonglian";//SyConfig.isIos()?"weixin":"tonglian";
		var payType = SdkUtil.isReview()?"apple":this.payType; //"webzyfdtz";
		sy.scene.showLoading("正在发起支付");
		var sekey = "mwFLeKLzNoL46dDn0vE2";
		var pname = encodeURIComponent(this.getPackageName());
		var param = {
			flat_id:PlayerModel.username,   //游客传userName weixin传openId
			server_id:1,
			p:PlayerModel.pf,
			itemid:id,
			total_fee:num,
			payType:payType,
			k:"",
			c:"",
			pname:pname,
			visitor:0  //0微信 1游客
		};
		param.agencyUserId = PlayerModel.userId;
		if(agencyUserId>0 && isDaiPay){
			param.agencyUserId = agencyUserId;
		}
		SdkUtil.sdkLog("===>start pay::"+JSON.stringify(param));
		param.k = md5(param.flat_id+param.server_id+param.p+param.itemid+sekey);
		Network.gameReq("ovali_com", param,
			function(data){
				if(payType!="apple")sy.scene.hideLoading();
				SdkUtil.sdkLog("===>ovali_com resp::"+JSON.stringify(data));
				if(data.code==0){
					if(data.hasOwnProperty("url")==false){
						cc.log("获取订单返回没有url参数");
						SdkUtil.sdkLog("获取订单返回没有url参数");
						return;
					}
					data.url.payType=payType;
					var str="";
					switch(payType){
						case "apple":
							str=JSON.stringify(data.url);
							if(SyConfig.isIos()){
								self.cacheOrderId=data.url.order_id;
								ios_sdk_applepay(str);
							}
							break;
						case "weixin":
							str=JSON.stringify(data.url);
							if(SyConfig.isAndroid()){
								jsb.reflection.callStaticMethod("net/sy599/common/SDKHelper", "sdkPay",  "(Ljava/lang/String;)V", str);
							}else if(SyConfig.isIos()){
								ios_sdk_pay(str);
							}
							break;
						case "aibei":
							var transId=data.url.transId;
							str="transid="+transId+"&appid=3005638180";
							if(SyConfig.isAndroid()){
								jsb.reflection.callStaticMethod("net/sy599/common/SDKHelper", "sdkPay",  "(Ljava/lang/String;)V", str);
							}else{
							}
							break;
						case "futong":
						case "futongnmw":
						case "tonglian"	:
							if(payType=="tonglian"){
								var backStr=data.url;
								backStr=backStr.substr(1,backStr.length-2);
								data.url=JSON.parse(backStr);
								data.url.payType=payType;
							}
							str=JSON.stringify(data.url);
							if(SyConfig.isAndroid()){
								//SdkUtil.getFutongWeixinUrl(data.url);
								jsb.reflection.callStaticMethod("net/sy599/common/SDKHelper", "sdkPay",  "(Ljava/lang/String;)V", str);
							}else if(SyConfig.isIos()){
								ios_sdk_pay(str);
							}
							break;
						case "webzyfdtz":
							var webUrl = data.url.pay_info;
							SdkUtil.sdkOpenUrl(webUrl);
							break;
						default:
							var webUrl = data.url.pay_info;
							SdkUtil.sdkOpenUrl(webUrl);
							break;
					}
				}else{
					return FloatLabelUtil.comText("获取支付订单失败");
				}
			},function(data){
				SdkUtil.sdkLog("===>ovali_com error::"+JSON.stringify(data));
				sy.scene.hideLoading();
				self.cacheOrderId = "";
				return FloatLabelUtil.comText("获取支付订单失败");
			}
		);
	},

	getFutongWeixinUrl:function(wftUrl){
		sy.scene.showLoading("正在调用微信客户端");
		var xhr = cc.loader.getXMLHttpRequest();
		xhr.open("GET", wftUrl);
		xhr.timeout = 12000;
		xhr.setRequestHeader("Content-Type","application/x-www-form-urlencoded;charset=utf-8");
		var self = this;
		var onerror = function(){
			xhr.abort();
			if(self._onErr)	self._onErr("");
			cc.log("NetWork error:status:"+xhr.status);
			sy.scene.hideLoading();
			return FloatLabelUtil.comText("调用微信支付失败");
		}
		xhr.onerror = onerror;
		xhr.onreadystatechange = function () {
			if (xhr.readyState == 4) {
				sy.scene.hideLoading();
				if(xhr.status == 200){
					var str=xhr.responseText;
					cc.log(str);
					var url=str.substr(str.lastIndexOf('location.href="weixin')+15,str.length);
					url=url.substr(0,url.indexOf('";'));
					cc.Application.getInstance().openURL(url);
					SdkUtil.sdkLog("===>url::"+url);
				}else{
					return FloatLabelUtil.comText("调用微信支付失败");
				}
			}
		}

		xhr.send(wftUrl);
	},


	/**
	 * 苹果支付完成，请求后台发房卡
	 */
	cacheOrderId:"",//这个需要缓存下，发给后台做参考
	applePaycb:function(receiptData){
		var self = this;
		setTimeout(function(){
			var obj={};
			obj.receipt_data=encodeURIComponent(receiptData);
			obj.order_id=self.cacheOrderId;
			Network.payReq("apple", obj,
				function(data){
					sy.scene.hideLoading();
					if(data.code==0){
						if(self.isExitsFunction("ios_sdk_showAlert")){
							var alertObj = {title:"支付结果",msg:"支付成功"};
							ios_sdk_showAlert(JSON.stringify(alertObj));
						}
					}
				},function(data){
					sy.scene.hideLoading();
					cc.log("applePaycb error::"+JSON.stringify(data));
					//var alertObj = {title:"支付结果",msg:"支付失败 code:"+data.code};
					//ios_sdk_showAlert(JSON.stringify(alertObj));
					self.applePaycb(receiptData);
				}
			);
		},10);
	},

	applePayProcess:function(){
		sy.scene.hideLoading();
	},

	sdkFeed:function(obj,isActivity){
		//将url修正成应用宝的url，不然链接参数接了两个问号有冲突
		//obj.callURL = this.SHARE_URL;
		if(!isActivity){
			obj.callURL = this.SHARE_URL;
		}
		if (!obj.hasOwnProperty("tableId")) {
			obj.tableId = "";
		} else {
			obj.tableId += "";
		}
		var str=JSON.stringify(obj);
		cc.log(str);
		if(SyConfig.isSdk()==false) return;
		if(SyConfig.isAndroid()){
			jsb.reflection.callStaticMethod("net/sy599/common/SDKHelper", "sdkFeed",  "(Ljava/lang/String;)V", str);
		}else if(SyConfig.isIos()){
			ios_sdk_share(str);
		}
	},

	sdkFeedcb:function(jsonStr){
		var json = JSON.parse(jsonStr);
		if(ShareDailyModel.isFromShareDaily){
			ShareDailyModel.isFromShareDaily = false;
			if(json.code==0){
				ActivityModel.setIsSendShareMsg(true);
				//Network.loginReq("qipai","share",{action:2},function(data){
				//	FloatLabelUtil.comText("分享成功！恭喜您获得：钻石x"+data.diamond+"!");
				//})
			}
		}else if(MatchClickModel.isFromShareMatch){
			MatchClickModel.isFromShareMatch = false;
			if(json.code==0){
				MatchClickModel.setIsSendMatchMsg(true);
			}
		}else if(ShareDailyModel.isFromGoldActive){
			ShareDailyModel.isFromGoldActive = false;
			if(json.code==0){
				ActivityModel.setIsSendShareGoldMsg(true);
			}
		}




			},

	sdkLog:function(str){
		if(SyConfig.isSdk()==false){
			cc.log(str);
			return;
		}
		if(SyConfig.isAndroid()){
			jsb.reflection.callStaticMethod("net/sy599/common/SDKHelper", "sdkLog",  "(Ljava/lang/String;)V", str);
		}else{
			//if(this.isExitsFunction("ios_sdk_log")){
			//	return ios_sdk_log(str);
			//}else{
			cc.log(str);
			//}
		}
	},
	sdkExit:function(){
		if(SyConfig.isSdk()==false)return;
		if(SyConfig.isAndroid()){
			jsb.reflection.callStaticMethod("net/sy599/common/SDKHelper", "onExit",  "()V");
		}else{

		}
	},
	/**
	 * 电量
	 * @returns {Number}
	 */
	getBatteryNum:function(){
		if(SyConfig.isSdk()==false)return 50;
		if(SyConfig.isAndroid()){
			//SdkUtil.sdkLog("battery:"+jsb.reflection.callStaticMethod("net/sy599/common/SDKHelper", "batteryNum",  "()I"));
			return jsb.reflection.callStaticMethod("net/sy599/common/SDKHelper", "batteryNum",  "()I");
		}else if(SyConfig.isIos()){
			if(this.isExitsFunction("ios_sdk_battery")){
				return ios_sdk_battery();
			}
		}
		return 0;
	},


    getVersionValue: function(versionCode) {
        var versionList = versionCode.split('.')
        var sum = 0;
        for (var i = 0; i < versionList.length; i++) {
            var count = parseInt(versionList[i]);
            sum += count;
        }
        return sum;
    },

    isVersionSmall: function(o2) {
        var o1 = SyConfig.VERSION_CODE;
        if (o1 == "" || o1 == "undefined" || o1 == null ) return true;
        if (this.getVersionValue(o1) < this.getVersionValue(o2)) {
            return true;
        } else {
            return false;
        }
    },

	/*
	* setOrientation
	*/
	setOrientation: function(orientation) {
		if (SyConfig.isIos() && this.isVersionSmall("2.0.100") || SyConfig.isAndroid() && this.isVersionSmall("2.0.100")) return false;
		var ret = null;
	    if (SyConfig.isAndroid()) {
            ret = jsb.reflection.callStaticMethod("net/sy599/common/SDKHelper", "setOrientation",  "(I)I", orientation);

        } else if (SyConfig.isIos()) {
        	var str = orientation == 1 ? "landscape" : "portrait";
            ios_sdk_setOrientation(str);
            ret = jsb.reflection.callStaticMethod("AppController", "setOrientation:", str);
        }

        var width = 0;
        var height = 0;
        if (orientation == 1) {
            width = 1280;
            height = 720;
        } else if (orientation == 2) {
            width = 720;
            height = 1280;
        }

        var size = cc.view.getFrameSize();
        cc.view.setFrameSize(size.height, size.width);
        cc.view.setDesignResolutionSize(width, height, cc.ResolutionPolicy.SHOW_ALL);
        return true;
	},

	/**
	 * 信号类型
	 * 1 wifi
	 * 2 2g
	 * 3 3g
	 * 4 4g
	 */
	getNetworkType:function(){
		if(SyConfig.isSdk()==false)return 1;
		if(SyConfig.isAndroid()){
			return jsb.reflection.callStaticMethod("net/sy599/common/SDKHelper", "getNetworkType",  "()I");
		}else if(SyConfig.isIos()){
			if(this.isExitsFunction("ios_sdk_nettype")){
				return ios_sdk_nettype();
			}
		}
		return 0;
	},

	/**
	 * webview切换横竖屏
	 */
	upAppOrientation:function(){
		//if(SyConfig.isSdk()==false)return 1;
		FloatLabelUtil.comText("uwebview切换横竖屏====");
		if(SyConfig.isAndroid()){
			FloatLabelUtil.comText("upAppOrientation====");
			jsb.reflection.callStaticMethod("net/sy599/common/WebviewHelper", "upAppOrientation",  "()I");
		}else if(SyConfig.isIos()){
			//if(this.isExitsFunction("ios_sdk_nettype")){
			//	return ios_sdk_nettype();
			//}
		}
		var displayMode = cc.ResolutionPolicy.SHOW_ALL;
		cc.view.adjustViewPort(true);
		cc.view.setDesignResolutionSize(720, 1280, displayMode);
		//return 0;
	}
}
