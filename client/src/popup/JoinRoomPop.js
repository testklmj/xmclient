/**
 * Created by Administrator on 2016/6/27.
 */
var JoinRoomPop = BasePopup.extend({

    inputArray:[],
    gameType:1,

    ctor: function (gType) {
        this.inputArray = [];
        this.gameType = gType || 1;
        this._super("res/joinRoom.json");
    },

    selfRender: function () {
        this.nums = [];
        this.TextField_211 = this.getWidget("TextField_211");

        for(var i=0;i<=9;i++){
            var btn = this.getWidget("btn"+i);
            btn.temp = i;
            UITools.addClickEvent(btn,this,this.onClick);
        }
        this.resp = true;
        var btndel = this.getWidget("btnd");
        UITools.addClickEvent(btndel,this,this.onDel);
        var btnreset = this.getWidget("btnr");
        UITools.addClickEvent(btnreset,this,this.onReset);
        this.addCustomEvent(SyEvent.SOCKET_OPENED,this,this.onSuc);
        this.addCustomEvent(SyEvent.GET_SERVER_SUC,this,this.onChooseCallBack);
        this.addCustomEvent(SyEvent.NOGET_SERVER_ERR,this,this.onChooseCallBack);
    },

    onDel:function(){
        if(this.inputArray.length>0){
            this.inputArray.pop();
        }
       var roomNum = "";
       if(this.inputArray.length>0){
           for(var i=0;i<this.inputArray.length;i++){
                roomNum+=this.inputArray[i];
           }
       }else{
            roomNum = "请输入六位房间号";
       }
       this.TextField_211.setString("" + roomNum);
    },

    onReset:function(){
        this.inputArray.length = 0;
        this.TextField_211.setString("请输入六位房间号");
    },

    onSuc:function(){
        //sy.scene.hideLoading();
        this.resp = true;
        if(this.inputArray.length==6){
            var roomNum = "";
            for(var i=0;i<this.inputArray.length;i++){
                roomNum+=this.inputArray[i];
            }
            sySocket.sendComReqMsg(2,[parseInt(roomNum),this.gameType]);
        }
    },

    onChooseCallBack:function(event){
        var status = event.getUserData();
        this.resp = true;
        if(status==ServerUtil.GET_SERVER_ERROR){
            sy.scene.hideLoading();
            FloatLabelUtil.comText("加入房间失败");
        }else if(status==ServerUtil.NO_NEED_CHANGE_SOCKET){
            this.onSuc();
        }
    },

    onClick:function(obj){
        var temp = obj.temp;
        var roomNum = "";
        this.inputArray.push(temp)
        for(var i=0;i<this.inputArray.length;i++){
            roomNum+=this.inputArray[i];
        }
        this.TextField_211.setString("" + roomNum);
        if(this.inputArray.length==6){
            if(!this.resp)
                return;
            sy.scene.showLoading("正在进入房间");
            this.resp = false;
            var self = this;
            Network.loginReq("qipai","getServerById",{tableId:roomNum},function(data){
                //{"server":{"httpUrl":"http://192.168.1.111:8020/qipai/pdk.do","serverId":1,"connectHost":"ws://192.168.1.111:8020"},"code":0}
                self.resp = true;
                var url = data.server.connectHost;
                if(sySocket.url != url){
                    sySocket.url = url;
                    sySocket.isCrossServer = true;
                    sySocket.disconnect(function(){
                        sySocket.connect();
                    });
                }else{
                    self.onSuc();
                }
            },function(){
                sy.scene.hideLoading();
                self.resp = true;
                FloatLabelUtil.comText("加入房间失败");
            })
        }
    }
});