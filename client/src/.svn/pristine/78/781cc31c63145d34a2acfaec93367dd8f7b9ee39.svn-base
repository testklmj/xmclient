/**
 * Created by Administrator on 2017/4/18.
 */
var SignInModel = {
    data:null,
    curYear:0,
    curMonth :0,
    today:0,
    totalDay:0,
    firstWeek:0,
    qdArray:[],
    isClickCheck:false,
    isHasSignIn:false,
    init:function(message,data){
        this.data = parseInt(data);
        this.curYear = parseInt(data[0]);
        this.curMonth = parseInt(data[1]);
        this.today = parseInt(data[2]);
        this.firstWeek = parseInt(data[3]);
        this.totalDay = parseInt(data[4]);
        this.qdArray = message;
        cc.log("data::"+JSON.stringify(data)+"   array::"+JSON.stringify(this.qdArray));
    }
}
var SignInPop = BasePopup.extend({
    ctor:function(){
        this._super("res/signInPop.json");
    },

    selfRender:function() {
        this.signedDays = SignInModel.qdArray;
        this.curDay = SignInModel.today;
        this.Button_5 = this.getWidget("Button_5");
        var Label_12 = this.getWidget("Label_12");
        for (var i = 0; i < 7; i++) {
            this["label_" + i] = this.getWidget("Label_" + i);
        }
        UITools.addClickEvent(this.Button_5, this, this.onQiandao);
        var FirstDay = SignInModel.firstWeek;
        cc.log("FirstDay..." , SignInModel.firstWeek);
        var j = 1;
        if(SignInModel.firstWeek == 7){
            j = j - 1;
        }
        for (var i = 1; i <= SignInModel.totalDay; i++) {
            FirstDay = FirstDay % 7;
            j = FirstDay == 0 ? (++j) : j;
            var labelDay = this["label_" + FirstDay];
            var position = cc.p(labelDay.width / 2, 20 - 60 * j);

            var label = UICtor.cLabel(i, 30, cc.size(120, 40), cc.color("#FF8D5824"), 1, 1);
            label.setPosition(position);
            labelDay.addChild(label, 2);

            var url = "";
            if (ArrayUtil.indexOf(this.signedDays, i) != -1) {
                url = "res/ui/dtz/signInPop/img_1.png";
                position.x = labelDay.width / 2 + 40;
            }
            var dayBg = UICtor.cImg(url);
            dayBg.setPosition(position);
            labelDay.addChild(dayBg, 1);

            if (i == this.curDay && ArrayUtil.indexOf(this.signedDays, i) == -1) {
                dayBg.visible = false;
                this.signedImg = UICtor.cImg("res/ui/dtz/signInPop/img_2.png");
                this.signedImg.setPosition(position);
                labelDay.addChild(this.signedImg, 1);
            }
            if(i>this.curDay){
                dayBg.visible = false;
            }

            FirstDay++;
        }

        if(ArrayUtil.indexOf(this.signedDays,this.curDay)!=-1){
            this.Button_5.setBright(false);
            this.Button_5.setTouchEnabled(false);
        }
        Label_12.setString(SignInModel.curYear+"年"+SignInModel.curMonth+"月");
        var qiandaoDay  = this.signedDays.length;
        this.label_1 = new cc.LabelBMFont(""+qiandaoDay, "res/font/res_font_qiandao.fnt");//签到天数
        this.label_1.setPosition(40,17);
        this.getWidget("Panel_1").addChild(this.label_1);
        SyEventManager.addEventListener(SyEvent.QIANDAO,this,this.onReceiveQiandao);

    },

    onCloseHandler : function(){
        BasePopup.prototype.onCloseHandler.call(this);
        if(!SdkUtil.isReview() && ArrayUtil.indexOf(this.signedDays,this.curDay)==-1 && !SignInModel.isClickCheck){
            if(PlayerModel.payBindId==""){
                //var mc = new InvitationCodePop();
                //PopupManager.open(mc);
            }
        }

        //ShareDailyPop.show();
        ShareDailyModel.hasOpenByPushMsg = true;
        ActivityModel.sendOpenActivityMsg();
        //ShareDailyPop.show();


    },

    refresh:function(){
        if (this.signedImg) {
            this.signedImg.loadTexture("res/ui/dtz/signInPop/img_1.png");
            this.signedImg.x += 40;
        }
        this.Button_5.setBright(false);
        this.Button_5.setTouchEnabled(false);
        this.label_1.setString(this.signedDays.length+1);
    },


    onReceiveQiandao:function(event){
        var data = event.getUserData();
        var temp = data[0];
        var zuanNum = data[1];
        if(temp==1) {
            this.refresh();
            FloatLabelUtil.comText("恭喜您获得：钻石x"+zuanNum+"!");
            PlayerModel.updateCards(zuanNum);
            //SyEventManager.dispatchEvent(SyEvent.PLAYER_PRO_UPDATE,zuanNum);

            this.onCloseHandler();
        }
    },


    onQiandao:function(){
        sySocket.sendComReqMsg(15,[2,this.curDay]);
    },


})

var SignInMoneyPop = BasePopup.extend({
    ctor:function(signInData){
        this.bookData = signInData.signatureBook;
        this.signInData = signInData.sysSignAward;
        this._super("res/signInMoneyPop.json");
    },

    selfRender:function() {

        var myDate = new Date();
        var nowDays = myDate.getDay(); //当前星期几
        if (nowDays == 0){
            nowDays = 7;
        }
//        var armatureJson = "res/plist/bjd_qiandao.ExportJson";
//        ccs.armatureDataManager.addArmatureFileInfo(armatureJson);
        this.curBtn = null;
        if (this.signInData){
            cc.log("this.signInData.length===",this.signInData.length)
            for (var i = 0; i < this.signInData.length; i++) {
                var awardDate = this.signInData[i];
                var day = i + 1;
                var panel = this.getWidget("Panel_s_" + day);
                var Button_19 = panel.getChildByName("Button_19");
                var Image_18 = panel.getChildByName("Image_18");
                var Label_2 = panel.getChildByName("Label_2");//奖品数量
                if (awardDate.type == 1){
                    Label_2.setString("积分X" + awardDate.value)
                }
                Button_19.temp = day;
                Button_19.panel = panel;
                Button_19.signinType = 0;

                UITools.addClickEvent(Button_19, this, this.onSignIn);
                Button_19.setTouchEnabled(false);

                for (var j = 0; j < this.bookData.length; j++) {
                    if (day == this.bookData[j].day){
                        //是否签到(0否，1是)
                        var btnPath = "res/ui/dtz/signInMoneyPop/a4.png"
                        if (this.bookData[j].res >= 1){
                            Button_19.signinType = 1;
//                            var hasImg = new cc.Sprite("res/ui/dtz/signInMoneyPop/a8.png");
//                            //hasImg.x = -15;
//                            //hasImg.y = -11;
//                            hasImg.anchorX = hasImg.anchorY = 0;
//                            panel.addChild(hasImg,5);
                            if (day == nowDays){
                                SignInModel.isHasSignIn = true;
                            }
                            btnPath = "res/ui/dtz/signInMoneyPop/a8.png";
                        }else{
                            if ( day > nowDays){
                                btnPath = "res/ui/dtz/signInMoneyPop/a2.png";
                            }else if ( day < nowDays){
                                Button_19.signinType = 2;
                                Button_19.setTouchEnabled(true);
                                btnPath = "res/ui/dtz/signInMoneyPop/a6.png";
                            }else{
//                                if (day == 7){
//                                    Image_18.visible = false;
//                                    var armature = new ccs.Armature("bjd_qiandao");
//                                    armature.x = 47;
//                                    armature.y = 75;
//                                    armature.anchorX = armature.anchorY = 0;
//                                    panel.addChild(armature,3);
//                                    armature.getAnimation().play("baoxiang", -1, 1);
//                                    Button_19.ani = armature;
//                                } else{
//                                    var armature = new ccs.Armature("bjd_qiandao");
//                                    armature.x = -15;
//                                    armature.y = -11;
//                                    armature.anchorX = armature.anchorY = 0;
//                                    panel.addChild(armature);
//                                    armature.getAnimation().play("qiandao", -1, 1);
//                                    Button_19.ani = armature;
//                                }

                                Button_19.setTouchEnabled(true);
                            }
                        }
                        Button_19.loadTextureNormal(btnPath);
                        break;
                    }
                }
            }
        }

        this.addCustomEvent(SyEvent.UPDATE_SIGNIN_STATE , this,this.updateSignInImg);

    },

    onSignIn:function(sender){
        var panel = sender.panel;
        if (panel){
            this.curBtn = sender;
            var temp = sender.temp;
            cc.log("点击签到===",temp);
            if (temp){
                if (sender.signinType && sender.signinType == 2){
                    AlertPop.show("确认需要花费200积分补签吗？", function(){
                        ComReq.comReqSignIn([3,temp],["2"]);
                    });
                }else{
                    ComReq.comReqSignIn([3,temp],["2"]);
                }

            }
        }
    },

    updateSignInImg:function(sender){
        if (this.curBtn){
            PopupManager.addPopup(new AwardGetPop());
//            var panel = this.curBtn.panel;
            this.curBtn.loadTextureNormal("res/ui/dtz/signInMoneyPop/a8.png");
//            var hasImg = new cc.Sprite("res/ui/dtz/signInMoneyPop/a8.png");
//            hasImg.anchorX = hasImg.anchorY = 0;
//            panel.addChild(hasImg,5);
            this.curBtn.setTouchEnabled(false);
//            if (this.curBtn.ani){
//                this.curBtn.ani.visible = false;
//            }
        }
    }


})
