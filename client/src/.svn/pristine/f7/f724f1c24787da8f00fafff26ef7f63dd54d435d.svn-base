/**
 * Created by zhoufan on 2016/6/25.
 */
var CreateRoomPop = BasePopup.extend({

    isDaiKaiRoom:false,
    localTime:0,

    ctor:function(json){
        this.hasClickCreateBtn = false;//记录是否点击了创建房间按钮 防止断线重连直接创建房间
        this.isDaiKaiRoom = false;
        json = json || "res/createRoom.json";
        this._super(json);
    },


    /**
     * 通用可选项刷新代码
     */
    onNormolUpdate:function(btnName , txtName , paramName){
        if(btnName && txtName && paramName){
            var btn = this[btnName];
            var txt = this[txtName];
            if(this[paramName] == 1){
                txt.setColor(cc.color(254 , 115 , 34));
                btn.setBright(true);
            }else if(this[paramName] == 0){
                txt.setColor(cc.color(93 , 33 , 7));
                btn.setBright(false);
            }
        }else{
            cc.log("onNormolUpdate error ::" , btnName , txtName , paramName);
        }
    },

    /**
     * 通用可选项点击代码
     * @param btn
     * @param txt
     * @param paramName
     */
    onNormolClick:function(btnName , txtName , paramName){
        if(btnName && txtName && paramName){
            var btn = this[btnName];
            var txt = this[txtName];
            if(btn.isBright()){
                txt.setColor(cc.color(93 , 33 , 7));
                btn.setBright(false);
                this[paramName] = 0;
            }else{
                txt.setColor(cc.color(254 , 115 , 34));
                btn.setBright(true);
                this[paramName] = 1;
            }
        }else{
            cc.log("onNormolClick error ::" , btnName , txtName , paramName);
        }
    },

    /**
     * 打开活动红包界面
     * 双明需求变化 不直接打开红包界面了
     */
    onOpenActivityPop:function(){
        //ActivityModel.reqOpenOneActivityById(9);
        ActivityModel.sendOpenActivityMsg();
    },

    getLocalItem:function(key){
        var val = cc.sys.localStorage.getItem(key);
        if(val)
            val = parseInt(val);
        return val;
    },

    isPDK:function(){
        var isPdk = ClubRecallDetailModel.isPDKWanfa(this.wanfa) || false;
        return isPdk;
    },

    isMJ:function(){
        var isHzmj = false;
        if (ClubRecallDetailModel.isHZMJWanfa(this.wanfa)
            || ClubRecallDetailModel.isSYMJWanfa(this.wanfa)
            || ClubRecallDetailModel.isCSMJWanfa(this.wanfa)){
            isHzmj = true;
        }
        return isHzmj;
    },


    isPHZ:function(){
        var isPhz = ClubRecallDetailModel.isPHZWanfa(this.wanfa) || false;
        return isPhz;
    },

    //换皮后启用
    isDTZ:function(){
        var isDtz = ClubRecallDetailModel.isDTZWanfa(this.wanfa) || false;
        return isDtz;
    },

    isBBT:function(){
        var isBbt = ClubRecallDetailModel.isBBTWanfa(this.wanfa) || false;
        return isBbt;
    },

    selfRender:function(){
        this.resp = true;
        this.renshu = 0;
        this.leixing = 0;
        this.niao = 0;
        this.heitao3 = 0;
        this.zhuang = 1;
        this.niaoPoint = 0;
        this.showCardNumber = 0;
        this.maxScore = 0;
        this.exScore = 0;
        this.isDark8 = 0;
        this.isRemove67 = 0;
        this.limitScore = 0;
        var btn = this.Button_17 = this.getWidget("Button_17");
        UITools.addClickEvent(btn,this,this.onCreate);
        this.addCustomEvent(SyEvent.SOCKET_OPENED,this,this.onSuc);
        this.addCustomEvent(SyEvent.GET_SERVER_SUC,this,this.onChooseCallBack);
        this.addCustomEvent(SyEvent.NOGET_SERVER_ERR,this,this.onChooseCallBack);

        //新增送钻石功能
        var btnSendDiamond = this.getWidget("btn_SendDimand");
        if(btnSendDiamond){
            if (SdkUtil.isYYBReview()) {
                btnSendDiamond.visible = false;
            }
            UITools.addClickEvent(btnSendDiamond , this , this.onOpenActivityPop)
        }

    },

    onSuc:function(){
        var command = this.isDaiKaiRoom ? 25 : 1;
        if(this.hasClickCreateBtn == false){
            cc.log("断线重连触发的onSuc 玩家未点击创建按钮");
            return;
        }else{
            this.hasClickCreateBtn = false;
        }
        cc.sys.localStorage.setItem("sy_dtz_game_wanfa" , this.wanfa);
        var wanfaList = this.getWanfaList();
        //cc.log("wanfaList==============",wanfaList);
        if(this.isMJ()){
            this.saveConfig();
            sySocket.sendComReqMsg(command,wanfaList);
            return;
        }else if(this.isPHZ()){
            this.saveConfig();
            sySocket.sendComReqMsg(command,wanfaList);
            return;
        }else if(this.isPDK()){
            this.saveConfig();
            var allWanfas = command == 25 ? "15,16" : "";
            sySocket.sendComReqMsg(command,wanfaList,allWanfas);
            return;
        }else if(this.isDTZ()){
            this.saveConfig();
            if (this.renshu == 4 && command == 25) {
                sy.scene.hideLoading();
                FloatLabelUtil.comText("暂未开放");
            }else{
                sySocket.sendComReqMsg(command,wanfaList);
            }
            return;

        }else if(this.isBBT()){
            this.saveConfig();
            sySocket.sendComReqMsg(command,wanfaList);
            return;
        }
    },

    onCreate:function(obj,isAlert){
        this.isDaiKaiRoom = false;
        cc.log("qiefuqiefu"+this.wanfa);
        var wanfaList = this.getWanfaList();
        if(this.wanfa>0 && wanfaList && wanfaList.length > 0){
            if(!this.resp)
                return;
            this.hasClickCreateBtn = true;
            this.resp = false;
            sy.scene.showLoading("正在创建房间");
            sySocket.sendComReqMsg(29,[this.wanfa],"0");
        }else{
            return FloatLabelUtil.comText("请选择局数或玩法");
        }
    },

    onChooseCallBack:function(event){
        var status = event.getUserData();
        this.resp = true;
        if(status==ServerUtil.GET_SERVER_ERROR){
            sy.scene.hideLoading();
            FloatLabelUtil.comText("创建房间失败");
        }else if(status==ServerUtil.NO_NEED_CHANGE_SOCKET){
            this.onSuc();
        }
    },

    onDaiCreate:function(){
        this.isDaiKaiRoom = true;
        var self = this;
        AlertPop.show("代开房间将立即扣除房卡，且消耗不计入抽奖次数，房间24小时未使用将自动解散并退还房卡。确定要代开房间吗？",function(){
            sy.scene.showLoading("正在创建房间");
            self.isCreate = true;
            self.hasClickCreateBtn = true;
            self.onSuc();
        });
    },

    onAACreate:function(){
        this.leixing = 1;
        this.onCreate(this.Button_17,true,true);
    },

    onDaiKaiList:function(){
        Network.loginReq("qipai","exec",{actionType:6,funcType:1},function(data){
            if(data){
                dkRecordModel.init(data);
                var mc = new DaiKaiRoomPop();
                PopupManager.open(mc,false);
            }
        });
    },

});