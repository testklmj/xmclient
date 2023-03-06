/**
 * Created by zhoufan on 2016/6/30.
 */
var DdzMoneyResultPop = BasePopup.extend({

    ctor: function (data) {
        this.data = data;
        this._super("res/ddzMoneyResultPop.json");
    },

    selfRender: function () {
        //this.qiepaiImg = this.getWidget("Image_21");
        //this.qiepaiImg.visible = ClosingInfoModel.cutCard.length>0;
        //this.data.sort(this.sortByPoint);

        for(var i=1;i<=3;i++) {
            this.getWidget("shagnxianSign"+i).visible = false;
            this.getWidget("pochanSign"+i).visible = false;
        }


        for(var i=0;i<this.data.length;i++) {
            if (this.data[i].userId == PlayerModel.userId) {
                if(this.data[i].point < 0) {
                    this.getWidget("main2").loadTexture("res/ui/ddz/smallResult/shibai.png");
                    AudioManager.play("res/audio/common/audio_lose.mp3");
                }else {
                    AudioManager.play("res/audio/common/audio_win.mp3");
                }
                break;
            }
        }
        for(var i=0;i<this.data.length;i++){
            var seq = i+1;
            var user = this.data[i];
            this.getWidget("n"+seq).setString(user.name);

            if(user.userId == PlayerModel.userId && user.ext[3]){//溢出分数处理
                var score = parseInt(user.ext[3]);
                user.point = user.point - score;
                cc.log("处理溢出分数：" ,user.point , score );
                //显示溢出的标签
                this.getWidget("shagnxianSign" + seq).visible = (score > 0);
            }

            this.getWidget("pochanSign" + seq).visible = (user.ext[2] == 1);

            // this.getWidget("ID"+seq).setString("ID:"+user.userId);
            var fnt = (user.point>=0) ? "res/font/chenghong.fnt" : "res/font/lanse.fnt";
            var l = this.getWidget("df"+seq);
            l.setString(user.userId+"");

            var j = this.getWidget("bs"+seq);
            j.setString(ClosingInfoModel.ext[11]+"");

            var bomb = this.getWidget("bomb"+seq);
            bomb.setString("x"+user.boom);

            var fs = this.getWidget("fs"+seq);
            fs.setString("");


            var dz = this.getWidget("d"+seq);
            dz.visible = false;
            if(user.seat == ClosingInfoModel.ext[4]){
                dz.visible = true;
            }
            if(user.point > 0){
                user.point = "+"+user.point;
            }
            var zflabel = new cc.LabelBMFont(user.point+"",fnt);
            zflabel.x = fs.width/2;
            zflabel.y = fs.height*0.45;
            fs.addChild(zflabel);

            if(seq == 2 && (ClosingInfoModel.ext[10] == 1 || ClosingInfoModel.ext[10] == 2)){
                this.getWidget("qg"+seq).visible = true;
            }else{
                this.getWidget("qg"+seq).visible = false;
            }

        }
        for(;i<3;i++){
            var seq = i+1;
            this.getWidget("bs"+seq).visible = false;
            this.getWidget("fs"+seq).visible = false;
            this.getWidget("n"+seq).visible = false;
            this.getWidget("bomb"+seq).visible = false;
            this.getWidget("qg"+seq).visible = false;
            this.getWidget("df"+seq).visible = false;
            this.getWidget("d"+seq).visible = false;
            //  this.getWidget("ID"+seq).visible = false;
        }
        for(var j=0;j<ClosingInfoModel.cutCard.length;j++){
            var card = new DdzBigCard(DdzAI.getCardDef(ClosingInfoModel.cutCard[j]));
            card.scale=0.4;

            card.x = 640+j*25;
            card.y = 250;

            this.root.addChild(card);
        }
        this.issent = false;
        this.addCustomEvent(SyEvent.SETTLEMENT_SUCCESS,this,this.onSettlement);
        var btnok = this.getWidget("btnok");
        UITools.addClickEvent(btnok,this,this.onContinue);

        var btnReturn = this.getWidget("btnReturn");
        UITools.addClickEvent(btnReturn,this,this.onToHome);


        //this.getWidget("Label_bbh").setString(SyVersion.v);
        this.getWidget("Label_bbh").setString("");
        //this.Label_43 = this.getWidget("Label_43");
        //this.Label_43.visible = false;
        this.dt = 0;
        this.start = 3;
        if(DdzRoomModel.isGameSite>0)
            this.scheduleUpdate();



        this.moneyModeId = DdzRoomModel.getMoneyModeId();
        this.addCustomEvent(SyEvent.SETTLEMENT_SUCCESS,this,this.onSettlement);
        this.addCustomEvent(SyEvent.SOCKET_OPENED,this,this.changeSrvOver);
        this.addCustomEvent(SyEvent.GET_SERVER_SUC,this,this.onChooseCallBack);
        this.addCustomEvent(SyEvent.NOGET_SERVER_ERR,this,this.onChooseCallBack);
        this.onFreeSubsidy();
    },

    onFreeSubsidy:function(){
        if (PlayerModel.getCoin() < 3000){
            ComReq.comReqSignIn([1,0],["104"]); //请求一次配置
        }
    },

    onSettlement:function(){
        PopupManager.remove(this);
    },

    update:function(dt){
        this.dt += dt;
        //if(this.dt >= 1){
        //    this.dt = 0;
        //    if(!this.issent){
        //        this.start--;
        //        if(this.start <= 0){
        //            this.unscheduleUpdate();
        //            this.onOk();
        //            return;
        //        }
        //        this.Label_43.setString(this.start+"秒后自动关闭");
        //    }
        //}
    },

    onOk:function(){
        sySocket.sendComReqMsg(3);
    },

    /**
     * 返回大厅
     */
    onToHome: function () {
        this.onClose();
        LayerManager.showLayer(LayerFactory.DTZ_HOME);
        PopupManager.remove(this);
        PopupManager.removeAll();
    },

    onClose:function(){
        this.unscheduleUpdate();
    },

    askCheckServer:function(){
        this.isChangingSrv = true;
        var strparams = [];
        var moneyWanfa = 91;
        var modeId = this.moneyModeId;//moneyWanfa * 10 + this.moneyRoomLevel;
        strparams.push("1");
        strparams.push(modeId+"");
        cc.log("金币场请求切服..." , strparams );
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
        cc.log("选服完毕 请求后台加入房间消息 "  , this.isChangingSrv);
        if(this.isChangingSrv){//由切服出发的重连成功才继续进入金币场
            this.doJoinMoneyRoom();
        }
    },

    onChooseCallBack:function(event){
        var status = event.getUserData();
        if(status==ServerUtil.GET_SERVER_ERROR){
            sy.scene.hideLoading();
            SyEventManager.dispatchEvent(SyEvent.REMOVE_MONEY_LOADING,{});
            FloatLabelUtil.comText("加入金币场失败");
        }else if(status==ServerUtil.NO_NEED_CHANGE_SOCKET){
            this.onSuc();
        }
    },

    doJoinMoneyRoom:function(){
        var moneyWanfa = 91;
        var roomTypeValue = moneyWanfa;
        var roomTypeAndLevel = this.moneyModeId;// moneyWanfa * 10 + this.moneyRoomLevel;
        //cc.log("roomTypeValue roomTypeAndLevel" , roomTypeValue,String(roomTypeAndLevel));
        sySocket.sendComReqMsg(2,[parseInt(1) , roomTypeValue],String(roomTypeAndLevel));
        this.isChangingSrv = false;
        LayerManager.showLayer(LayerFactory.HOME);
        PopupManager.remove(this);
        //PopupManager.removeAll();

        //这里不再移除结算页面 一旦请求成功收到Createtable消息会移除所有弹框
    },

    /**
     * 金币场开始下一局
     */
    onContinue:function(){
        this.askCheckServer();
    },

});

