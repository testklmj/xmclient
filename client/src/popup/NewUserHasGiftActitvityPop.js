/**
 * Created by admin on 2018/9/26.
 */

var NewUserHasGiftActivityPop = BasePopup.extend({
    ctor:function(data){
        this.data = data;
        this.params = JSON.parse(this.data.params);
        this._super("res/newUserHasGift.json")
    },
    selfRender:function(){
        this.Panel_mian = this.getWidget("Panel_mian");
        this.Panel_tishi = this.getWidget("Panel_tishi");
        this.Panel_rule = this.getWidget("Panel_rule");
        this.Button_help = this.getWidget("Button_help");
        this.ListView = this.getWidget("ListView");
        this.Panel_jiaangli = this.getWidget("Panel_jiaangli");
        this.Panel_mian.visible = true;
        this.Panel_rule.visible = false;
        this.Panel_tishi.visible =false;
        this.Panel_jiaangli.visible = false;
        this.Button_Allclose = this.getWidget("Button_Allclose");
        UITools.addClickEvent(this.Button_Allclose, this, this.allClose);
        this.Button_closerule = this.getWidget("Button_closerule");
        UITools.addClickEvent(this.Button_closerule, this, this.closeRule);
        this.Button_closetishi = this.getWidget("Button_closetishi");
        UITools.addClickEvent(this.Button_closetishi, this, this.closeTiShi);
        this.Image_tishi = this.getWidget("Image_tishi");


        this.getWidget("Image_32").visible = false;
        this.Button_help = this.getWidget("Button_help");
        UITools.addClickEvent(this.Button_help, this, this.showRule);

        this.Button_getRed = this.getWidget("Button_getRed");
        // UITools.addClickEvent(this.Button_getRed, this, this.ShowTiShi);
        this.Button_getRed .addTouchEventListener(this.showTishi,this);
        this.Button_sure = this.getWidget("Button_sure");
        this.Button_sure .addTouchEventListener(this.onCloseGift,this);
        this.progressBar = this.getWidget("ProgressBar_7");
        for (var i=0;i<4;i++){
            var Image_gift = this.getWidget("Image_gift"+(i+1));
            var Image_yilingqu = this.getWidget("Image_yilingqu_"+(i+1));
            Image_yilingqu.visible  =false;
            Image_gift.temp = i;
            UITools.addClickEvent(Image_gift, this,this.getGift);
        }
        this.homeAM1 = this.createHomeAm("xingrenhongbao",this.Button_getRed,0,0);
        this.homeAM1.y -= 4;
        this.initLayer();
        this.addCustomEvent(SyEvent.GET_NEWUSERHASGIFT_GIFT , this , this.onShowGift);
    },
    onCloseGift:function(){
        this.Panel_jiaangli.visible = false;
    },
    createHomeAm:function(armatureName,root,x,y) {
        var armatureJson = "res/plist/"+armatureName+".ExportJson";
        ccs.armatureDataManager.addArmatureFileInfo(armatureJson);
        var armature = new ccs.Armature(armatureName);
        armature.x =root.getContentSize().width/2;
        armature.y = root.getContentSize().height/2;
        armature.anchorX = armature.anchorY = 0.5;
        root.addChild(armature,2);
        armature.getAnimation().play(armatureName, -1, 1);
        return armature;
    },
    onRemoveSelfgetGift:function(){
        if(this.Panel_jiaangli.getChildByTag(997))
            this.Panel_jiaangli.removeChildByTag(997);
    },
    initLayer:function(){
        this.getWidget("Label_myhyd").setString(this.params.newPGLiv);
        this.getWidget("Label_time").setString(this.params.activeResTime);
        this.progressBar.setPercent(this.params.newPGLiv /180*100);
        for (var i=0;i<4;i++) {
            var Label_huoyuedu = this.getWidget("Label_huoyuedu_"+(i+1));
            Label_huoyuedu.setString(this.params.rewardDiam[i].liveness+"活跃度");
            var Image_node = this.getWidget("Image_node"+(i+1));
            Image_node.visible= false;
            if (this.params.newPGLiv>=this.params.rewardDiam[i].liveness){
                Image_node.visible= true;
            }
            //0未完成 1已领取 2可领取
            if(this.params.recordState[i] !=2){
                var Image_gift = this.getWidget("Image_gift"+(i+1));
                Image_gift.setTouchEnabled(false);

            }else{
                //特效

                var Image_gift = this.getWidget("Image_gift"+(i+1));
                Image_gift.setTouchEnabled(true);
                var homeAM2 = this.createHomeAm("dacheng",Image_gift,0,0);
                homeAM2.y-= 3;
                homeAM2.setTag(990);
            }
            if(this.params.recordState[i] ==1){
                //遮罩已领取
                var Image_yilingqu = this.getWidget("Image_yilingqu_"+(i+1));
                Image_yilingqu.visible  =true;
            }
        }

        for (var i= 0;i<5;i++){
            var Image_item = this.getWidget("Image_item_"+(i+1));
            var Label_jiangli = ccui.helper.seekWidgetByName(Image_item,"Label_jiangli");
            Label_jiangli.setString(this.params.livReward[i+1]+"活跃度");
            var Label_num = ccui.helper.seekWidgetByName(Image_item,"Label_num");
            var Button_goto = ccui.helper.seekWidgetByName(Image_item,"Button_goto");
            Button_goto.temp = i+1;
            UITools.addClickEvent(Button_goto, this, this.goto);
            Label_num.setString(this.params.newPGTNum[i+1]+"/"+this.params.needNum[i+1]);
            if(this.params.newPGTNum[i+1]>=this.params.needNum[i+1]){
                Button_goto.setTouchEnabled(false);
                Button_goto.setBright(false);
            }else{
                var goto = new AnimateSprite("res/plist/go.plist","go",1/10);
                goto.anchorX=goto.anchorY=0;
                goto.x = 0;
                goto.y = 0;
                goto.play();
                Button_goto.addChild(goto);

            }

        }
    },
    getGift:function(obj){
        obj.setTouchEnabled(false);
        this.gift = obj.temp;
        sySocket.sendComReqMsg(1005,[1,obj.temp],["26"]);
    },
    goto:function(obj){
        switch(obj.temp){
            case 2://分享朋友圈
                var obj = {};
                obj.tableId = 0;
                obj.userName=PlayerModel.username;
                var content = ShareDailyModel.getFeedContent();
                obj.title=content;
                obj.pyq=content;
                obj.description=content;
                obj.shareType=1;
                if (content=="" && SyConfig.hasOwnProperty("HAS_PNG_SHARE")) {
                    obj.shareType=0;
                    //var rand = MathUtil.mt_rand(1,3);
                    //obj.png = "res/feed/feed_"+rand+".jpg";
                    obj.png = "res/feed/feed.jpg";
                }
                ShareDailyModel.isFromShareDaily = true;
                obj.session = 1;
                SdkUtil.sdkFeed(obj);
                break;
            case 1://去牌局
            case 3://大赢家
                //var newWanfa = cc.sys.localStorage.getItem("sy_dtz_new_wanfa") ||  NewAddWanfa.TYPE;
                //var mc = new MJCreateRoom(newWanfa);
                //PopupManager.addPopup(mc);

                //var newWanfa = cc.sys.localStorage.getItem("sy_dtz_new_wanfa") ||  NewAddWanfa.TYPE;
                var mc = new DTZCreateRoom();
                PopupManager.addPopup(mc);
                break;
            case 4://充值
                PayPop.show();
                break;
            case 5://加入朋友圈
                sy.scene.showLoading("正在进入亲友圈");
                PopupManager.removeClassByPopup(ClubHomePop);
                var mc = new ClubHomePop();
                PopupManager.addPopup(mc);
                break;
            default:
                break;
        }
        this.allClose();
    },
    allClose:function(){
        PopupManager.remove(this);
    },
    closeRule:function(){
        this.Panel_rule.visible = false;
    },
    showRule:function(){
        this.Panel_rule.visible = true;
    },
    closeTiShi:function(){
        this.Panel_tishi.visible = false;
    },
    onShowTiShi:function(){
        this.Panel_tishi.visible = true;
    },
    showTishi:function(obj,type) {
        if (type == ccui.Widget.TOUCH_BEGAN) {
            this.homeAM1.scale = 1.1;
        } else if (type == ccui.Widget.TOUCH_ENDED) {
            this.homeAM1.scale = 1;
            AudioManager.play("res/audio/common/audio_button_click.mp3");
            this.onShowTiShi();
        } else if (type == ccui.Widget.TOUCH_CANCELED) {
            this.homeAM1.scale = 1;
        } else if (type == ccui.Widget.TOUCH_MOVED) {
            this.homeAM1.scale = obj.isHighlighted() ? 1.1 : 1;
        }
    },
    onShowGift:function(event){
        var data = event.getUserData();
        var i = this.gift+1;
        var Image_yilingqu =this.getWidget("Image_yilingqu_"+i);
        Image_yilingqu.visible = true;
        var Image_gift = this.getWidget("Image_gift"+i);
        if(Image_gift.getChildByTag(990))
            Image_gift.removeChildByTag(990);
        var reward = data.reward;
        var rewardType = data.rewardType;
        if (rewardType==1){//钻石
            this.getWidget("Label_shuliang").setString("x"+reward);
            this.getWidget("Label_shuliang").visible = false;
            this.getWidget("Image_wuping").loadTexture("res/ui/dtz/newActivity/pay/pay_2.png");
            var Label_shuliang = this.getWidget("Label_shuliang");
            if(Label_shuliang.getParent().getChildByTag(99))
                Label_shuliang.getParent().removeChildByTag(99);
            var fnt = "res/font/olderbackFont.fnt";
            var scoreLabel = new cc.LabelBMFont("*"+reward,fnt);
            scoreLabel.x= this.getWidget("Label_shuliang").x;
            scoreLabel.y= this.getWidget("Label_shuliang").y;
            this.getWidget("Label_shuliang").getParent().addChild(scoreLabel);
            scoreLabel.setTag(99);
            this.getWidget("Label_shuliang_1").visible = false;
            this.getWidget("Label_28").setString("钻石");
        }else if(rewardType==2){
            this.getWidget("Label_shuliang_1").setString(reward+"");
            var Label_shuliang = this.getWidget("Label_shuliang");
            if(Label_shuliang.getParent().getChildByTag(99))
                Label_shuliang.getParent().removeChildByTag(99);
            Label_shuliang.visible = false;
            this.getWidget("Label_shuliang_1").visible = true;
            this.getWidget("Label_28").setString("现金红包");
            this.getWidget("Image_wuping").loadTexture("res/ui/dtz/newActivity/activity/olderBack/gift.png");
        }
        this.Panel_jiaangli.visible = true;
        ccs.armatureDataManager.addArmatureFileInfo(
            "res/plist/huodeyuan0.png",
            "res/plist/huodeyuan0.plist",
            "res/plist/huodeyuan.ExportJson");
        this.huodeyuan = new ccs.Armature("huodeyuan");
        this.huodeyuan.x = 640;
        this.huodeyuan.y = 360;
        this.Panel_jiaangli.addChild(this.huodeyuan,1);
        this.huodeyuan.getAnimation().play("huodeyuan",-1,0);

        ccs.armatureDataManager.addArmatureFileInfo(
            "res/plist/huodexing0.png",
            "res/plist/huodexing0.plist",
            "res/plist/huodexing.ExportJson");
        this.huodexing = new ccs.Armature("huodexing");
        this.huodexing.x =  this.getWidget("Image_wuping").x;
        this.huodexing.y =  this.getWidget("Image_wuping").y;
        this.getWidget("Image_wuping").getParent().addChild(this.huodexing,1);
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

    }
})