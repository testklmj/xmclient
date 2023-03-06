var HttpUrlRequest = cc.Class.extend({

    _xmlhttp:null,
    _url:"",
    _reqtype:"POST",
    _command:0,
    _body:"",
    _params:null,
    _onSuc:null,
    _onErr:null,
    _timeoutl:null,
    _timeoutt:null,

    ctor:function(url, command, param, onSuccess, onError){
        this._timeoutl = this._timeoutt = null;
        this._url = url;
        this._command = command;
        this._onSuc = onSuccess;
        this._onErr = onError;
        this._reqtype = param.type || "POST";
        this._params = param;
        var data = param || {};
        data.type = command;
        if(PlayerModel.userId > 0){
            data.userId = PlayerModel.userId;
            data.sessCode = PlayerModel.sessCode;
            data.sytime = new Date().getTime();
            var sign = data.sytime+SdkUtil.COMMON_HTTP_AES;
            var md5str = md5(sign);
            data.sysign = md5str;
        }
        for(var key in data){
            var paramStr = key+"="+data[key];
            if(this._body == ""){
                this._body += paramStr;
            }else {
                this._body += "&"+paramStr;
            }
        }
    },

    response:function(responseText){
        if(responseText == ""){
            cc.log("NetWork response is null::"+this._command);
        }else{
            var json = {};
            try{
                json = JSON.parse(responseText);
            }catch(e){
                throw "network json parse exception::"+e;
            }
            var code = json.code;
            if(json.time){   // 校准时间
                ServerTimeManager.update(json.time);
            }
            if(!json.hasOwnProperty("code") || code == 0){
                if(this._onSuc)	this._onSuc(json);
            }else{
                ErrorUtil.handle(json);
                if(this._onErr)	this._onErr(json);
            }
        }
    },

    /**
     * 是否不转圈
     * @param command
     * @param param
     * @returns {Boolean}
     */
    isExclude:function(){
        var excludeFuncType = {
            "2":[],
            "3":[],
            "11":[1,8],
            "25":[7],
            "22":[]
        };
        var key = this._command+"";
        if(excludeFuncType.hasOwnProperty(key)){
            var array = excludeFuncType[key];
            if(array.length == 0){
                return true;
            }else{
                var funcType = this._params.funcType;
                if(funcType){
                    return (ArrayUtil.indexOf(array, funcType) >= 0);
                }
            }
        }
        return false;
    },

    request:function(){
        var xhr = this._xmlhttp = cc.loader.getXMLHttpRequest();
        //if(!cc.runtime){
        //    if(SyConfig.isNative() && (cc.sys.os == cc.sys.OS_IOS || cc.sys.os == cc.sys.OS_ANDROID)){
        //        xhr.setRequestHeader("Accept-Encoding","gzip,deflate");
        //    }
        //}
        xhr.open(this._reqtype, this._url);
        xhr.timeout = 12000;
        xhr.setRequestHeader("Content-Type","application/x-www-form-urlencoded;charset=utf-8");
        //if(!this.isExclude()){
            //var loadingop = function(){
                //if(sy.scene)  sy.scene.showLoading("正在请求网络...");
            //}
            //this._timeoutl = setTimeout(loadingop,2000);
        //}
        cc.log("NetWork error:"+" url:"+this._url+"?"+this._body);
        var self = this;
        var onerror = function(){
            xhr.abort();
            ServerUtil.getServerFromTJD();
            //if(sy.scene)  sy.scene.hideLoading();
            //if(self._timeoutl!=null)
            //    clearTimeout(self._timeoutl);
            FloatLabelUtil.comText("请求失败"+SocketErrorModel._loginIndex);
            SocketErrorModel._connectHttpSuc = false;
            SocketErrorModel.updateHttpUrl();
            if(self._onErr)	self._onErr("");
            cc.log("NetWork error:status:"+xhr.status+" url:"+self._url+"?"+self._body);
        }
        xhr.onerror = onerror;
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4) {
                if(xhr.status == 200){
                    //if(self._timeoutl!=null)
                    //    clearTimeout(self._timeoutl);
                    //if(sy.scene)
                    //    sy.scene.hideLoading();
                    //cc.log("NetWork error:status:"+xhr.status+" url:"+self._url+" body:"+self._body);
                    self.response(xhr.responseText);
                }else{
                    onerror.call(self);
                }
            }
        }
        xhr.send(this._body);
        return xhr;
    }
});

/**
 * http请求
 * @author zhoufan
 * @date 2014年10月20日
 * @version v1.0
 */
var Network = {
    gameUrl:"",
    reqtimes:null,
    excludeFuncType:{
        "1":[],
        "24":[],
        "25":[],
        "11":[1,8,14,15]
    },

    /**
     * 是否跳过过快点击
     * @param command
     * @param param
     * @returns {Boolean}
     */
    isExclude:function(command,param){
        var key = command+"";
        if(command=="")return true;
        if(this.excludeFuncType.hasOwnProperty(key)){
            var array = this.excludeFuncType[key];
            if(array.length == 0){
                return true;
            }else{
                var funcType = param.funcType;
                if(funcType){
                    return (ArrayUtil.indexOf(array, funcType) >= 0);
                }
            }
        }
        return false;
    },

    /**
     * HTTP请求
     * @param {Integer} command
     * @param {Object} param
     * @param {Function} onSuccess
     * @param {Function} onError
     */
    sypost : function(url,command,param,onSuccess,onError) {
        //if(!this.reqtimes)
        //    this.reqtimes = new SimpleHashMap();
        //if(!this.isExclude(command, param)){
        //    var now = new Date().getTime();
        //    var lasttime = this.reqtimes.get(command);
        //    lasttime = lasttime || 0;
        //    var diff = now - lasttime;
        //    if(diff < 500){
        //        var funcType = param.hasOwnProperty("funcType") ? param.funcType : 0;
        //        cc.log("requet is too fast! diff is "+diff+", command is "+command+" funcType is "+funcType);
        //        return null;
        //    }
        //    this.reqtimes.put(command, now);
        //}
        var req = new HttpUrlRequest(url,command,param,onSuccess,onError);
        var xhr = req.request();
        return xhr;
    },

    gameReq:function(command,param,onSuccess,onError){
    	var url = csvhelper.strFormat(SyConfig.LOGIN_URL,"support",command);
    	return this.sypost(url,command,param,onSuccess,onError);
    },
    payReq:function(command,param,onSuccess,onError){
    	var url = csvhelper.strFormat(SyConfig.LOGIN_URL,"pay",command);
    	return this.sypost(url,command,param,onSuccess,onError);
    },

    logReq:function(msg){
        var object = {};
        object.userId = PlayerModel.userId;
        object.msg = msg;
        return this.loginReq("log","clientLog",{log:JSON.stringify(object)});
    },

    loginReq:function(act,command,param,onSuccess,onError){
        var url = csvhelper.strFormat(SyConfig.LOGIN_URL,act,command);
        this.sypost(url,command,param,onSuccess,onError);
    },

    ipReq:function() {
        var url = csvhelper.strFormat(ServerUtil.defaultLoginUrl,"user","load");
        var userId = PlayerModel.userId;
        var now = new Date().getTime();
        var sign = userId+""+now+SdkUtil.COMMON_HTTP_AES;
        var self = this;
        this.ipReqTimes += 1;
        Network.sypost(url,"load",{userId:userId, t:now, sign:sign},function(data){
            self.ipReqTimes = 0;
            cc.log("ipReq get ip success::"+data.message);
        },function(){
            if (self.ipReqTimes < 5) {
                self.ipReq();
            }
        });
    },

    startIpReq: function() {
        this.ipReqTimes = 0;
        this.ipReq();
    }
};
