var SocketErrorModel = {
    _socketList:null,
    _httpIndex:0,
    _loginIndex:0,
    _loginPort:null,
    _connectHttpSuc:true,
    _connectLoginSuc:true,
    _isInitLoginSuc:false,

    init:function(){
        if (SyConfig.DEBUG) {
            return
        }
        this._socketList = {
            http:{
                ips:"http://dtz-login.bizfans.cn/",
                ports:""
            },
            login:{
                ips:"dtz-login.bizfans.cn",
                ports:"9001,9005"
            }
        }

        this._httpIndex  = UITools.getLocalItem("Socket_new_httpIndex")  || 0;
        this._loginIndex = UITools.getLocalItem("Socket_new_loginIndex") || 0;

        if (SyConfig.IS_CONFIGLIST){
            if (InitConfigList._httpUrlList){
                if (InitConfigList._httpUrlList.ips && InitConfigList._httpUrlList.ips != ""){
                    this._socketList.http.ips = InitConfigList._httpUrlList.ips;
                }
            }

            if (InitConfigList._loginUrlList){
                if (InitConfigList._loginUrlList.ips && InitConfigList._loginUrlList.ips != ""){
                    this._socketList.login.ips =  InitConfigList._loginUrlList.ips

                }
                if (InitConfigList._loginUrlList.ports && InitConfigList._loginUrlList.ports != ""){
                    this._socketList.login.ports = InitConfigList._loginUrlList.ports
                }
            }
        }


        var _http = this._socketList.http;
        var _httpHosts = GameConfig.parseHost(""+ _http.ips);
        SyConfig.REQ_URL   =  _httpHosts[this._httpIndex] + "pdklogin/" + "{0}!{1}.action";
        SyConfig.LOGIN_URL =  _httpHosts[this._httpIndex] + "pdklogin/" + "{0}!{1}.guajilogin";
        SyConfig.LOGIN_URL_NEW = _httpHosts[this._httpIndex];


        var _login = this._socketList.login;
        var _loginHosts = GameConfig.parseHost(""+ _login.ips);
        SyConfig.WS_HOST = _loginHosts[this._loginIndex];
        SyConfig.WS_PORT = _login.ports;

        this._connectHttpSuc = false;
        this._connectLoginSuc = false;
        this.updateHttpUrl()
        this.updateLoginUrl()

        // cc.log("LOGIN_URL===",this._loginIndex,SyConfig.REQ_URL,SyConfig.LOGIN_URL)
        // cc.log("WS_HOST===",this._loginIndex,SyConfig.WS_HOST,SyConfig.WS_PORT)
    },

    setHttpIndex:function(_httpIndex){
        this._httpIndex = _httpIndex;
        UITools.setLocalItem("Socket_new_httpIndex",_httpIndex);
    },

    setLoginIndex:function(_LoginIndex){
        this._loginIndex = _LoginIndex;
        UITools.setLocalItem("Socket_new_loginIndex",_LoginIndex);
    },

    updateHttpIndex:function(){
        if (this._socketList){
            var _http = this._socketList.http;
            var _httpHosts = GameConfig.parseHost(_http.ips);
            if (this._httpIndex + 1 >= _httpHosts.length){
                this._httpIndex = 0;
            }else{
                this._httpIndex = this._httpIndex + 1;
            }
            SyConfig.REQ_URL   =  _httpHosts[this._httpIndex] + "pdklogin/" + "{0}!{1}.action";
            SyConfig.LOGIN_URL =  _httpHosts[this._httpIndex] + "pdklogin/" + "{0}!{1}.guajilogin";
            SyConfig.LOGIN_URL_NEW = _httpHosts[this._httpIndex];
            this.setHttpIndex(this._httpIndex);
//            cc.log("updateHttpIndex===",this._httpIndex,SyConfig.REQ_URL,SyConfig.LOGIN_URL)
        }
    },

    updateLoginIndex:function(){
//      cc.log("updateLoginIndex===1",this._loginIndex,sySocket.url)
        if (this._socketList){
            var _login = this._socketList.login;
            var _loginHosts = GameConfig.parseHost(_login.ips);
            var _loginports = GameConfig.parseHost(_login.ports);
            var _loginport = SocketErrorModel._loginPort || 9001;
            if (this._loginIndex + 1 >= _loginHosts.length){
                this._loginIndex = 0;
            }else{
                this._loginIndex = this._loginIndex + 1;
            }
            SyConfig.WS_HOST = _loginHosts[this._loginIndex];
            SyConfig.WS_PORT = _loginport;
            sySocket.url = "ws://" + _loginHosts[this._loginIndex] + ":"  + _loginport;
            this.setLoginIndex(this._loginIndex);
//            cc.log("updateLoginIndex===2",this._loginIndex,sySocket.url)
        }
    },


    updateHttpUrl:function(){
        if (this._socketList){
            var _http = this._socketList.http;
            var _httpHosts = GameConfig.parseHost(_http.ips);
            var _http = _httpHosts[_httpHosts.length-1];
            for(var index = 0 ; index < _httpHosts.length-1 ; index++){
                _http = _httpHosts[index];
                var _url = _http;
                this.getHttpUrl(_url);
            }
        }
    },

    getHttpUrl:function(_url){
        var xhr = cc.loader.getXMLHttpRequest();
        xhr.open("GET", _url);
        xhr.timeout = 12000;
        xhr.setRequestHeader("Content-Type","application/x-www-form-urlencoded;charset=utf-8");
        cc.log("getHttpUrl============1",_url)
        var self = this;
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4) {
                if(xhr.status == 200){
                   if (!self._connectHttpSuc){
                       SyConfig.REQ_URL   =  _url + "pdklogin/" + "{0}!{1}.action";
                       SyConfig.LOGIN_URL =  _url + "pdklogin/" + "{0}!{1}.guajilogin";
                       SyConfig.LOGIN_URL_NEW = _url;
                       self._connectHttpSuc = true;
                        cc.log("getHttpUrl============2",_url)
                   }
                }
            }
        }
        xhr.send();
    },

    updateLoginUrl:function(){
        if (this._socketList){
            var _login = this._socketList.login;
            var _loginHosts = GameConfig.parseHost(_login.ips);
            var host_ = _loginHosts[_loginHosts.length-1];
            for(var index = 0 ; index < _loginHosts.length-1 ; index++){
                host_ = _loginHosts[index];
                var port_ = this._loginPort || 9001;
                var _url = "http://" + host_ + ":" + port_  + "/qipai/pdk.do";
//                http://119.23.109.103:9002/qipai/pdk.do
                this.getLoginUrl(_url,host_);
            }
        }
    },

    getLoginUrl:function(_url,host_){
        var xhr = cc.loader.getXMLHttpRequest();
        xhr.open("GET", _url);
        xhr.timeout = 12000;
        xhr.setRequestHeader("Content-Type","application/x-www-form-urlencoded;charset=utf-8");
        cc.log("getLoginUrl============1",_url,host_)
        var self = this;
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4) {
                if(xhr.status == 200){
                   if (!self._connectLoginSuc){
                       var _loginport = self._loginPort || 9001;
                       sySocket.url = "ws://" + host_ + ":"  + _loginport;
                       self._connectLoginSuc = true;
                       self._isInitLoginSuc = true;
                       cc.log("getLoginUrl============2",_url,sySocket.url)
                   }
                }
            }
        }
        xhr.send();
    }
}