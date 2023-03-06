/**
 * Created by admin on 2018/9/15.
 */
/**
 * Created by admin on 2018/9/5.
 */

var OlderBackActivityPop=BasePopup.extend({
    day:-1,
    _dt:0,
    ctor: function (data) {
        this.data = data;
        this.params = JSON.parse(this.data.params);
        this.comParams= this.params.comParams.split("_");
        this._super("res/olderBackActivity.json");
    },

    selfRender: function () {
        this.Panel_mian = this.getWidget("Panel_main");
        this.Panel_jiaangli = this.getWidget("Panel_jiaangli");
        this.Panel_tishi = this.getWidget("Panel_tishi");
        this.Panel_rule  = this.getWidget("Panel_rule");
        this.Panel_jiaangli.visible = false;
        this.Panel_tishi .visible = false;
        this.Panel_rule .visible = false;

        this.Image_tixian  = this.getWidget("Image_tixian");
        this.Image_tixian.loadTexture("res/ui/dtz/newActivity/activity/olderBack/redbag.png")
        // this.Image_tixian.visible = false;
        this.Button_help = this.getWidget("Button_help");
        UITools.addClickEvent(this.Button_help, this, this.onShowRule);

        this.Button_closerule = this.getWidget("Button_closerule");
        UITools.addClickEvent(this.Button_closerule, this, this.onCloseRule);

        this.Button_get = this.getWidget("Button_get");
        UITools.addClickEvent(this.Button_get, this, this.onGet);

        this.Button_tishi = this.getWidget("Button_tishi");
        this.Button_tishi .addTouchEventListener(this.showTishi,this);

        this.Button_closetishi = this.getWidget("Button_closetishi");
        UITools.addClickEvent(this.Button_closetishi, this, this.closeTiShi);

        this.Button_close = this.getWidget("Button_close");
        UITools.addClickEvent(this.Button_close, this, this.allClose);

        this.Button_sure = this.getWidget("Button_sure");
        this.Button_sure .addTouchEventListener(this.onCloseGift,this);

        this.onShow();
        this.homeAM1 = this.createHomeAm("linhongbao",0,0);
        this.initLayer();
        this.addCustomEvent(SyEvent.GET_OLDERBACK_GIFT , this , this.onShowGift);
    },

    initLayer:function(){
        this.getWidget("Label_word").setString("累计登录七天可领取最高88元红包,活动剩余时间:"+this.params.countdown);
        for (var i= 0;i<7;i++){
            if(this.params.recordState[i]==1){
                this.day =i;
                break;
            }
        }
        for (var i= 1;i<8;i++){
            var Image_dailingqu =this.getWidget("Image_dailingqu_"+i);
            Image_dailingqu.visible = false;
            if(this.day>=0&&i==this.day+1&&this.params.dayState==1){
                //Image_dailingqu.visible = true;
                var plist,name;
                if(i==7){
                    plist = "res/plist/dakuang.plist";
                    name = "dakuang";
                }else{
                    plist = "res/plist/xiaokuang.plist";
                    name = "xiaokuang";
                }
                this.kuang = new AnimateSprite(plist,name,1/8);
                //this.kuang.anchorX=getGift.anchorY=0;
                this.kuang.x = Image_dailingqu.x+2;
                this.kuang.y = Image_dailingqu.y;
                /* getGift.setRepeatTimes(1);
                 getGift.setCallBack(this.onRemoveSelfgetGift,this);*/
                this.kuang.play();
                Image_dailingqu.getParent().addChild(this.kuang,10);
            }
            var remark =this.getWidget("Image_remark_"+i);
            //奖励状态 recordState  0已领取  1可以领取  2不是当天
            /* recordState 非当天 0已领取 1未领取
             dayState 当天 0已领取 1未领取 2红包待提现*/

            remark.visible = false;
            if(this.params.recordState[i-1]==0){
                remark.visible = true;
            }else if(this.params.recordState[i-1]==2&&i== 7){//提现
                this.Image_tixian.loadTexture("res/ui/dtz/newActivity/activity/olderBack/Img_daitixian.png")
                remark.loadTexture("res/ui/dtz/newActivity/activity/olderBack/waitTixian.png");
                this.Image_tixian.visible = true;
                remark.visible = false;
            }
        }
        for(var i=1;i<7;i++){
            var label_Num = this.getWidget("Label_Num_"+i);
            /* label_Num.visible =false;
             var fnt = "res/font/olderbackFont.fnt";
             var scoreLabel = new cc.LabelBMFont("*"+this.params.rewardDiam[i-1].reward,fnt);
             scoreLabel.x=label_Num.x;
             scoreLabel.y=label_Num.y;
             label_Num.getParent().addChild(scoreLabel);*/
            label_Num.setString("x"+this.params.rewardDiam[i-1].reward);
        }
        if (this.params.dayState==1){
            //正常代领取；
        }else{
            this.Button_get.setTouchEnabled(false);
            this.Button_get.setBright(false);
        }
        if (this.params.redBagReward ){
            this.getWidget("Label_money").setString(+this.params.redBagReward);
            this.getWidget("Label_money").visible = true;
        }else{
            this.getWidget("Label_money").visible = false;
        }
        this.scheduleUpdate();
    },
    onShowRule:function(){
        this.Panel_rule.visible = true;
    },

    onCloseRule:function(){
        this.Panel_rule.visible = false;
    },
    onGet:function(){
        for (var i= 0;i<7;i++){
            if(this.params.recordState[i]==1){
                this.day =i;
                break;
            }
        }
        if(this.day>=0) {
            cc.log("ffffsl",this.day);
            sySocket.sendComReqMsg(1005, [1, this.day], ["25"]);
        }
    },
    onCloseGift:function(){
        this.Panel_jiaangli.visible = false;
    },
    onShowGift:function(event){
        var data = event.getUserData();
        this.kuang.removeFromParent();
        var i = this.day+1;
        var Image_dailingqu =this.getWidget("Image_dailingqu_"+i);
        Image_dailingqu.visible = false;
        if(i!=7)
            this.getWidget("Image_remark_"+i).visible = true;
        var reward = data.reward;
        var rewardType = data.rewardType;
        if (rewardType==1){//钻石
            this.getWidget("Label_shuliang").setString("x"+reward);
            this.getWidget("Label_shuliang").visible = false;
            var fnt = "res/font/olderbackFont.fnt";
            var scoreLabel = new cc.LabelBMFont("*"+reward,fnt);
            scoreLabel.x= this.getWidget("Label_shuliang").x;
            scoreLabel.y= this.getWidget("Label_shuliang").y;
            this.getWidget("Label_shuliang").getParent().addChild(scoreLabel);


            this.getWidget("Label_shuliang_1").visible = false;
        }else if(rewardType==2){
            cc.log("11111111111111111111111111111111",reward);
            this.getWidget("Label_shuliang_1").setString(reward+"");
            /* var fnt = "res/font/olderbackFont.fnt";
             var scoreLabel = new cc.LabelBMFont("*"+reward,fnt);
             scoreLabel.x= this.getWidget("Label_shuliang_1").x;
             scoreLabel.y= this.getWidget("Label_shuliang_1").y;
             this.getWidget("Label_shuliang_1").getParent().addChild(scoreLabel);*/

            this.getWidget("Label_shuliang").visible = false;
            this.getWidget("Label_shuliang_1").visible = true;
            this.getWidget("Label_28").setString("现金红包");
            this.Image_tixian.loadTexture("res/ui/dtz/newActivity/activity/olderBack/Img_daitixian.png")
            this.getWidget("Image_wuping").loadTexture("res/ui/dtz/newActivity/activity/olderBack/gift.png");
            //this.getWidget("Image_remark_"+i).loadTexture("res/ui/dtz/newActivity/activity/olderBack/waitTixian.png");
            this.Image_tixian.visible = true;
            this.getWidget("Label_money").setString(reward);
            this.getWidget("Label_money").visible = true;
        }
        this.Button_get.setTouchEnabled(false);
        this.Button_get.setBright(false);
        this.Panel_jiaangli.visible = true;
        ccs.armatureDataManager.addArmatureFileInfo(
            "res/plist/huodeyuan0.png",
            "res/plist/huodeyuan0.plist",
            "res/plist/huodeyuan.ExportJson");
        this.huodeyuan = new ccs.Armature("huodeyuan");
        this.huodeyuan.x = 640;
        this.huodeyuan.y = 360;
        this.Panel_jiaangli.addChild(this.huodeyuan,1);
        //this.hongbaoArmature.getAnimation().setSpeedScale(0.5);
        this.huodeyuan.getAnimation().play("huodeyuan",-1,0);

        ccs.armatureDataManager.addArmatureFileInfo(
            "res/plist/huodexing0.png",
            "res/plist/huodexing0.plist",
            "res/plist/huodexing.ExportJson");
        this.huodexing = new ccs.Armature("huodexing");
        this.huodexing.x =  this.getWidget("Image_wuping").x;
        this.huodexing.y =  this.getWidget("Image_wuping").y;
        this.getWidget("Image_wuping").getParent().addChild(this.huodexing,1);
        //this.hongbaoArmature.getAnimation().setSpeedScale(0.5);
        this.huodexing.getAnimation().play("huodexing",-1,1);
        this.huodexing.scale = 0.6;

        var getGift = new AnimateSprite("res/plist/getGift.plist","getGift",1/10);
        getGift.anchorX=getGift.anchorY=0;
        getGift.x = 300;
        getGift.y = 550;
        getGift.setRepeatTimes(1);
        getGift.setCallBack(this.onRemoveSelfgetGift,this);
        getGift.play();
        this.Panel_jiaangli.addChild(getGift,10,997);

    },
    onRemoveSelfgetGift:function(){
        this.Panel_jiaangli.removeChildByTag(997);
    },
    update:function(dt){
        this._dt += dt;
        if (this._dt >= 10) {
            this._dt=0;
            this.onShow();
        }
    },

    onShow:function(){


        var caidai = new AnimateSprite("res/plist/caidai.plist","caidai",1/10);
        caidai.anchorX=caidai.anchorY=0;
        caidai.x = 150;
        caidai.y = 0;
        caidai.setRepeatTimes(1);
        caidai.setCallBack(this.onRemoveSelf,this);
        caidai.play();

        this.Panel_mian.addChild(caidai,100,998);
        var caidai1 = new AnimateSprite("res/plist/caidai.plist","caidai",1/10);
        caidai1.anchorX=caidai1.anchorY=0;
        caidai1.x = 700;
        caidai1.y = 0;
        caidai1.setFlippedX(180);
        caidai1.setRepeatTimes(1);
        caidai1.play();
        this.Panel_mian.addChild(caidai1,100,999);

    },
    onRemoveSelf:function(){
        this.Panel_mian.removeChildByTag(999);
        this.Panel_mian.removeChildByTag(998);
    },
    createHomeAm:function(armatureName,x,y) {
        var armatureJson = "res/plist/"+armatureName+".ExportJson";
        ccs.armatureDataManager.addArmatureFileInfo(armatureJson);
        var armature = new ccs.Armature(armatureName);
        armature.x =this.Button_tishi.getContentSize().width/2;
        armature.y = this.Button_tishi.getContentSize().height/2;
        armature.anchorX = armature.anchorY = 0.5;
        this.Button_tishi.addChild(armature,2);
        armature.getAnimation().play(armatureName, -1, 1);
        return armature;
    },
    allClose:function(){
        PopupManager.remove(this);
    },
    closeTiShi:function(){
        this.Panel_tishi.visible = false;
    },

    showTishi:function(obj,type) {
        if (type == ccui.Widget.TOUCH_BEGAN) {
            this.homeAM1.scale = 1.1;
        } else if (type == ccui.Widget.TOUCH_ENDED) {
            this.homeAM1.scale = 1;
            AudioManager.play("res/audio/common/audio_button_click.mp3");
            this.onShowTishi();
        } else if (type == ccui.Widget.TOUCH_CANCELED) {
            this.homeAM1.scale = 1;
        } else if (type == ccui.Widget.TOUCH_MOVED) {
            this.homeAM1.scale = obj.isHighlighted() ? 1.1 : 1;
        }
    },
    onShowTishi:function(){
        this.Panel_tishi.visible = true;
    }

})