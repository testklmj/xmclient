/**
 * Created by Administrator on 2016/7/9.
 */
var NetErrorPopData = {
    mc:null
}
var NetErrorPop = BasePopup.extend({

    ctor: function (isError) {
        this.iserror = isError || false;
        this.timeId = -1;
        this.errorTimes = 0;
        this.errorLinkTimes = 0;
        this._super("res/loadingCircle.json");
    },

    selfRender: function () {
        this.Label_35 = this.getWidget("Label_35");
        this.addCustomEvent(SyEvent.SOCKET_OPENED,this,this.onSuc);
        var mc = this.lmc = this.getWidget("Image_7");
        mc.runAction(cc.rotateTo(3,720,720).repeatForever());
        this.reConnect();
    },

    reConnect:function(timing){
        var self = this;
        cc.log("reConnect========this.iserror================",this.iserror,timing)
        if(this.iserror){//sockect已经断开
            if(timing){
                if(this.timeId>=0)
                    return;
                self.errorTimes+=1;
//                self.errorLinkTimes+=1;
                SocketErrorModel._connectLoginSuc = false;
                SocketErrorModel.updateLoginUrl();
//                cc.log("self.errorLinkTimes===",self.errorLinkTimes)
//                if (self.errorLinkTimes > 3){
//                    self.errorLinkTimes = 0;
//                    SocketErrorModel.updateLoginIndex();
//                }
//                if(!sySocket.isOpen() && self.errorTimes>=3){
//                    cc.log("errorTimes..."+self.errorTimes);
//                    self.Label_35.setString("正在切换新线路，请稍侯");
//                    ServerUtil.connectBackupUrl();
//                }else{
//                    cc.log("reConnect===================",self.errorLinkTimes,)
                    SdkUtil.sdkLog("NetErrorPop socket error...try reconnect...1");
                    this.timeId = setTimeout(function(){
                        self.Label_35.setString("连接失败，正在进行第"+self.errorTimes+"次重连");
                        self.timeId = -1;
                        sySocket.connect();
                        if (self.errorTimes > 5){
                            if (!PopupManager.hasClassByPopup(AlertPop)) {
                                AlertPop.showOnlyOk("重连失败，请重新登录!", function () {
                                    self.onSuc();
                                    sySocket.disconnect();
                                    PopupManager.removeAll();
                                    LayerManager.showLayer(LayerFactory.LOGIN);
                                })
                            }
                            return;
                        }
                    },3000);
//                }
            }else{
                if(this.timeId>=0)
                    clearTimeout(this.timeId);
                SdkUtil.sdkLog("NetErrorPop socket error...try reconnect...2");
                this.timeId = -1;
                sySocket.connect();
            }
        }else{
            //if(this.timeId>=0)
            //    clearTimeout(this.timeId);
            //sySocket.sendComReqMsg(5,[1]);
            //this.timeId = setTimeout(function(){
            //    self.timeId = -1;
            //    if(PingClientModel.isRespond()){
            //        SdkUtil.sdkLog("NetErrorPop timeout is ready.....respond suc...");
            //        self.onSuc();
            //    }else{
            //        SdkUtil.sdkLog("NetErrorPop timeout is ready.....need to reconnect...");
            //        sySocket.connect();
            //    }
            //},3000);
        }
    },

    onSuc:function(){
        this.errorTimes=0;
        this.errorLinkTimes = 0;
        SdkUtil.sdkLog("NetErrorPop socket has connect success...");
        sy.scene.hideLoading();
        if(this.lmc)
            this.lmc.stopAllActions();
        clearTimeout(this.timeId);
        PopupManager.remove(this);
        NetErrorPopData.mc = null;
    }
});
NetErrorPop.show = function(isError){
    if(GameData.conflict)//账号冲突
        return;
    sy.scene.hideLoading();
    var nowmc = NetErrorPopData.mc;
    if(nowmc){
        if(nowmc.iserror && !isError)
            return;
        nowmc.iserror = isError;
        nowmc.reConnect(isError);
        return;
    }
    var mc = NetErrorPopData.mc = new NetErrorPop(isError);
    PopupManager.addPopup(mc);
}