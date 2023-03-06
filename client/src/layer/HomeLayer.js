/**
 * Created by zhoufan on 2016/6/24.
 */
var HomeLayer = BaseLayer.extend({
    infoTips:null,
    effAnimate:null,
    luckDrawTips:null,
    ctor:function(json){
        this._super(json);
    },

    selfRender:function(){
        this.effAnimate = null;
        var btn = this.getWidget("Button_7");
        UITools.addClickEvent(btn,this,this.onCreate);
        var btn1 = this.getWidget("Button_8");
        btn1.addTouchEventListener(this.onJoin.bind(this));
        var btn3 = this.getWidget("Button_49");
        if(SdkUtil.isYYBReview()){
            this.getWidget("Image_48").visible = false;
            this.getWidget("Button_49").visible = false;
            this.getWidget("rcard").visible = false;
            this.getWidget("Image_12").visible = false;
        }else{
            var Image_48 = this.getWidget("Image_48");
            Image_48.setTouchEnabled(true);
            UITools.addClickEvent(Image_48,this,this.onPay);
        }
        UITools.addClickEvent(btn3,this,this.onPay);
        var Button_xx = this.getWidget("Button_xx");
        if(Button_xx){
            UITools.addClickEvent(Button_xx,this,this.onNotice);
        }

        var Button_zj = this.getWidget("Button_zj");
        if(Button_zj){
            UITools.addClickEvent(Button_zj,this,this.onRecord);
        }

        var Button_invite = this.getWidget("Button_invite");
        if(Button_invite){
            UITools.addClickEvent(Button_invite,this,this.onInvite);
        }


        var nameStr = PlayerModel.name;
        nameStr = UITools.truncateLabel(nameStr,5);
        this.getWidget("rname").setString(nameStr);
        this.getWidget("rid").setString("ID:"+PlayerModel.userId);
        this.rcard = this.getWidget("rcard");
        this.rcard.setString(PlayerModel.cards);
        this.coinNum = this.getWidget("coinNum");
        this.coinNum.setString(DTZRoomModel.moneyToStr(PlayerModel.getCoin()));
        this.addCustomEvent(SyEvent.PLAYER_PRO_UPDATE,this,this.onPlayerUpdate);
        this.addCustomEvent(SyEvent.NEW_TIPS,this,this.onShowTips);



    },

    onInvite:function(){

    },

    onWanfa:function(){
    },

    onService:function(){
        if(SdkUtil.isReview()){
        	return AlertPop.showOnlyOk("客服电话：18973105122");
           // AlertPop.showOnlyOk("问题反馈，请联系：\n\n客服微信号：ahqp01\n\n客服电话：15197765656");
        }else{//if(AgentModel.InvitationCode){
        	return AlertPop.showOnlyOk("客服电话：18973105122");
        }
    },

    onMatch:function(){
//        FloatLabelUtil.comText("暂未开放");
    },

    onNotice:function(){
    	var value = {fal:false,index:1};
    	ShowTipsModel.updataData(value);
    	SyEventManager.dispatchEvent(SyEvent.NEW_TIPS,value);
        sySocket.sendComReqMsg(12,[1]);
    },

    onAgency:function(){
        ServicePop.showOnlyOk("res/dailiPop.json","kuailewan666");
    },

    onRecord:function(){
//  	Network.loginReq("qipai","getUserPlayLog",{"flatId":PlayerModel.username,"pf":PlayerModel.pf,"logType":1},function(data) {
//        	var mc = new TotalRecordPop(data);
//            PopupManager.addPopup(mc);
//        });
    },

    onPlayerUpdate:function(){
        this.rcard.setString(PlayerModel.cards);
        this.coinNum.setString(DTZRoomModel.moneyToStr(PlayerModel.getCoin()));
    },

    onCreate:function(){
    },

    onJoin:function(){
        var mc = new JoinRoomPop();
        PopupManager.addPopup(mc);
    },

    onSetUp:function(){
        var mc = new SetUpPop(true);
        PopupManager.addPopup(mc);
    },

    onPay:function(){
        //if(SyConfig.isIos() && SdkUtil.isReview()){
        //    var mc = new PayPop();
        //    PopupManager.addPopup(mc);
        //}else{
        //    var mc = new PayPop();
        //    PopupManager.addPopup(mc);
        //    //AlertPop.showOnlyOk("购买房卡请联系所在微信群群主\n\n代理招募：ahqp01（微信）\n代理招募：ahqp02（微信）");
        //}

        PayPop.show();

        //AlertPop.show("购买钻石请联系所在群主或代理商！");
    },
    
    onLuckDraw:function(){
    	var value = {fal:false,index:2};
    	ShowTipsModel.updataData(value);
    	SyEventManager.dispatchEvent(SyEvent.NEW_TIPS,value);
        sy.scene.hideLoading();
        sySocket.sendComReqMsg(11,[1]);
    },
    onAcitivityTask:function(){
    	var mc=new ActivityTaskPopup();
    	PopupManager.addPopup(mc);
    },
    onBack:function(){
        //LayerManager.showLayer(LayerFactory.HALL);
    },

    onShowTips:function(event){
        var value = event.getUserData();
        if(value.fal) {
            this.createTips(value.index);
        }else{
            if(value.index == 1 && this.infoTips){
                this.infoTips.visible = false;
            }else if(value.index == 2 && this.luckDrawTips){
                //this.luckDrawTips.visible = false;
            }
        }
    },

    createTips:function(index){
        cc.log("createTips...");
        if(index == 1){
            var btn = this.getWidget("Button_xx");
            if(this.infoTips==null){
                this.infoTips = new cc.Sprite("res/ui/dtz/dtzHome/redPoint.png");
                this.infoTips.anchorX = this.infoTips.anchorY = 0;
                this.infoTips.x = btn.width-19;
                this.infoTips.y = btn.height-25;
                btn.addChild(this.infoTips);
            }
        }else if(index == 2){

        }
    }
})