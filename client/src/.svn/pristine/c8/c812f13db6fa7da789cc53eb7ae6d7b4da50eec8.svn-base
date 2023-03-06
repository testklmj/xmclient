var SyConfig = {
	DEBUG:false,
	H5_PUBLISH:false,
	DEFAULT_FLATID:"",
	DEFAULT_PASSWORD:"123456",
	IGNORE_HOTUPDATE:false,
	PF:"",
	WXPF:"",
	XLPF:"",
	WS_HOST:"",
	WS_PORT:"",
	LOGIN_URL:"",
	REQ_URL:"",
	VERSION_CODE:"",
	DIRECT2GAME:false,
	PACKAGE_NAME:"",
	HAS_GPS:true,
	HAS_PNG_SHARE:true,
	HAS_DTALK:true,
	AMAP:true,
	ROOT_CHECK:true,
	TJD:false,
	REVIEW_VERSION:"",
	IS_CONFIGLIST:false,
	init:function(json){
		this.DEBUG = json.debug;
		this.H5_PUBLISH = json.h5_publish;
		this.DEFAULT_FLATID = json.defaultFlatId;
		this.IGNORE_HOTUPDATE = json.ignore_hotupdate || false;
		this.PF = json.pf;
		this.WXPF = json.pf;
		this.XLPF = json.xlpf;
		this.VERSION_CODE = json.versionCode ? json.versionCode : "";
		this.LOGIN_URL = this.DEBUG ? json.loginUrlDebug : json.loginUrl;
		this.REQ_URL = this.LOGIN_URL+"{0}!{1}.action";
		this.LOGIN_URL += "{0}!{1}.guajilogin";
		this.WS_HOST = json.wsHost ? json.wsHost : "";
		this.WS_PORT = json.wsPort ? json.wsPort : "";
		this.PACKAGE_NAME = json.package_name ? json.package_name : "com.sy599.qp.paodekuai";
		this.HAS_GPS = json.hasOwnProperty("has_gps") ? json.has_gps : true;
		this.HAS_PNG_SHARE = json.hasOwnProperty("has_png_share") ? json.has_png_share : true;
		this.TJD = json.tjd ? json.tjd : false;
		this.REVIEW_VERSION = json.reviewVersion ? json.reviewVersion : "";
		this.IS_CONFIGLIST = json.isConfigList ? json.isConfigList : false;
	},

	isSdk:function(){
		return (cc.sys.isNative && this.PF!="self" && !cc.runtime);
	},

	isSelf:function(){
		return (this.PF=="self");
	},
    
	isAndroid:function(){
		return (cc.sys.os == cc.sys.OS_ANDROID);
	},
    
	isIos:function(){
		return (cc.sys.os == cc.sys.OS_IOS);
	},
    
	isWX:function(){
		return (this.PF.indexOf("weixin")!=-1 || this.PF.indexOf("xianliao")!=-1);
	}
}
