/**
 * Created by admin on 2018/9/5.
 */
var RedItemCell = ccui.Widget.extend({

    ctor: function () {
        this._super();
        var Panel_item=this.Panel_item= UICtor.cPanel(cc.size(915,54),cc.color(150,200,255),0);
        Panel_item.setAnchorPoint(cc.p(0,0));
        Panel_item.setPosition(0,0);
        var Label_index=this.Label_index= UICtor.cLabel("Text Label",24,cc.size(110,32),cc.color(134,73,32),1,0);
        Label_index.setPosition(70,27);
        Panel_item.addChild(Label_index);
        var Label_id=this.Label_id= UICtor.cLabel("Text Label",24,cc.size(117,32),cc.color(134,73,32),1,0);
        Label_id.setPosition(210,29);
        Panel_item.addChild(Label_id);
        var Label_name=this.Label_name= UICtor.cLabel("Text Label",24,cc.size(174,32),cc.color(134,73,32),1,0);
        Label_name.setPosition(385,29);
        Panel_item.addChild(Label_name);
        var Label_ing=this.Label_ing= UICtor.cLabel("Text Label",24,cc.size(202,32),cc.color(180, 73, 0),1,0);
        Label_ing.setPosition(825,29);
        Panel_item.addChild(Label_ing);
        var Label_time=this.Label_time= UICtor.cLabel("Text Label",24,cc.size(201,32),cc.color(134,73,32),1,0);
        Label_time.setPosition(600,29);
        Panel_item.addChild(Label_time);
        var Image_line=this.Image_line= UICtor.cImg("res/ui/dtz/newActivity/activity/invitionRedPacket/xian.png");
        Image_line.setPosition(463,7);
        Panel_item.addChild(Image_line);
        this.addChild(Panel_item);
        this.setContentSize(Panel_item.width+4,Panel_item.height+3);
    },
    setData:function(obj){
        this.Label_index.setString(obj.index);
        this.Label_id.setString(obj.userId);
        this.Label_name.setString(obj.name);
        this.Label_time.setString(obj.regTime);
        var str = obj.active ? "已邀请":"未激活";
        this.Label_ing.setString( str);
    }
})

var IntivingNewRedPacketActivityPopup=BasePopup.extend({
    chakanjilu:0,
    ctor: function (data) {
        var today = new Date().getDate();
        cc.sys.localStorage.setItem("last_denglu_time",today);
        this.data = data;
        this.params = JSON.parse(this.data.params);
        this.comParams= this.params.comParams.split("_");
        this._super("res/yaoxinhongbao.json");

    },
    selfRender: function () {
        this.Panel_mian = this.getWidget("Panel_mian");
        this.Panel_record = this.getWidget("Panel_record");
        this.Panel_shuoming = this.getWidget("Panel_shuoming");
        this.Panel_tishi = this.getWidget("Panel_tishi");
        this.ListView_record = this.getWidget("ListView_record");
        this.Panel_mian.visible = true;
        this.Panel_record.visible = false;
        this.Panel_shuoming.visible = false;
        this.Panel_tishi.visible =false;
        this.Button_Mianclose = this.getWidget("Button_Mianclose");
        UITools.addClickEvent(this.Button_Mianclose, this, this.allClose);
        this.Button_closeShuoming = this.getWidget("Button_closeShuoming");
        UITools.addClickEvent(this.Button_closeShuoming, this, this.closeShuoMing);
        this.Button_closeRecord = this.getWidget("Button_closeRecord");
        UITools.addClickEvent(this.Button_closeRecord, this, this.closeRecord);
        this.Panel_tishi = this.getWidget("Panel_tishi");
        this.Button_closetishi = this.getWidget("Button_closetishi");
        UITools.addClickEvent(this.Button_closetishi, this, this.closeTiShi);
        this.Image_tishi = this.getWidget("Image_tishi");

        this.Button_rule = this.getWidget("Button_rule");
        UITools.addClickEvent(this.Button_rule, this, this.showRule);
        this.Button_record = this.getWidget("Button_record");
        UITools.addClickEvent(this.Button_record, this, this.ShowRecord);
        this.Button_invite = this.getWidget("Button_invite");
        this.Button_invite .addTouchEventListener(this.onInvite1,this);
        //UITools.addClickEvent(this.Button_invite, this, this.onInvite);
        this.Button_invite2 = this.getWidget("Button_invite2");
        UITools.addClickEvent(this.Button_invite2, this, this.onInvite);
        this. Image_yaoqingtishi = this.getWidget("Image_yaoqingtishi");
        this. Label_noBaby = this.getWidget("Label_noBaby");
        this.Label_noBaby.setString("暂时还没有新用户通过你的邀请进入游戏。"+"\n\n"+"你也可以通过点击下方按钮，再邀请更多好友试试。");
        this.Label_noBaby.visible= !(this.params.myInvites.length>0);
        cc.log("this.params.myInvites.length",this.params.myInvites.length);
        for (var i=0;i<this.params.myInvites.length;i++){
            Item = new RedItemCell()
            this.ListView_record.pushBackCustomItem(Item);
            Item.setData(this.params.myInvites[i]);
        }
        this.ListView_record.visible = true;
        for (var i = 1;i<=3;i++){
            var item = this.getWidget("Panel_item"+i);
            var Label_shuoming = ccui.helper.seekWidgetByName(item,"Label_shuoming");
            var Label_jiangli = ccui.helper.seekWidgetByName(item,"Label_jiangli");
            Label_jiangli.setString("邀请"+this.comParams[i-1] +"名新玩家")
            var Button_lingqu = ccui.helper.seekWidgetByName(item,"Button_lingqu");
            var Image_tag = ccui.helper.seekWidgetByName(item,"Image_tag");
            UITools.addClickEvent(Button_lingqu, this, this.openTiShi);
            if (this.params.process>=this.comParams[i-1]&&this.params.receiveRedbag<i){//可以领取

            }else if(this.params.process>=this.comParams[i-1]&&this.params.receiveRedbag>=i){//已领取
                Button_lingqu.setTouchEnabled(false);
                Image_tag.loadTexture("res/ui/dtz/newActivity/activity/invitionRedPacket/yilingquzi.png");
                Button_lingqu.loadTextureNormal("res/ui/dtz/newActivity/activity/invitionRedPacket/yilingqu.png");
            }else if(this.params.process<this.comParams[i-1]){//未完成
                Button_lingqu.setTouchEnabled(false);
                Button_lingqu.setBright(false);
                Image_tag.visible = false;
                var fnt =  "res/font/yaoxin.fnt";
                var point = this.params.process+"/"+this.comParams[i-1];
                var scoreLabel = new cc.LabelBMFont(point,fnt);
                scoreLabel.x = Button_lingqu.width/2;
                scoreLabel.y = Button_lingqu.height/2+6;
                Button_lingqu.addChild(scoreLabel);
            }
        }
        //this.onShow();
        var self = this;
        self.Image_tishi.visible =false;
        self.Image_tishi.runAction(cc.Sequence(cc.DelayTime(2),cc.Show(0.3),cc.DelayTime(4),cc.FadeOut(0.3)));
        // self.Button_invite.runAction(cc.RepeatForever(cc.Sequence(cc.ScaleTo(0.01,1.1),cc.DelayTime(1),cc.ScaleTo(0.01,1),cc.DelayTime(1))));
    },
    onShow:function(){
        //this.homeAM1 = this.createHomeAm("homeAM100",0,0);

    },
    createHomeAm:function(armatureName,x,y) {
        var armatureJson = "res/plist/"+armatureName+".ExportJson";
        ccs.armatureDataManager.addArmatureFileInfo(armatureJson);
        var armature = new ccs.Armature(armatureName);
        armature.x =this.Button_invite.getContentSize().width/2;
        armature.y = this.Button_invite.getContentSize().height/2;
        armature.anchorX = armature.anchorY = 0.5;
        this.Button_invite.addChild(armature,2);
        armature.getAnimation().play(armatureName, -1, 1);
        return armature;
    },
    allClose:function(){
        PopupManager.remove(this);
    },
    closeTiShi:function(){
        this.Panel_tishi.visible = false;
    },
    openTiShi:function(){
        this.Panel_tishi.visible = true;
    },
    closeShuoMing:function(){
        this.Panel_shuoming.visible = false;
    },
    closeRecord:function(){
        this.Panel_record.visible = false;
    },
    showRule:function(){
        this.Panel_shuoming.visible = true;
    },
    ShowRecord:function(){
        this.Panel_record.visible = true;
        this.Image_yaoqingtishi.visible =false;
        var self = this;
        //self.Image_yaoqingtishi.opacity = 0;
        /* setTimeout(function() {*/
        if (self.chakanjilu < 1){
            if (self.Panel_record){
                if (self.Panel_record.visible = true) {
                    self.Image_yaoqingtishi.runAction(cc.Sequence(cc.DelayTime(1),cc.Show(0.3), cc.DelayTime(3), cc.FadeOut(0.3)));
                    self.chakanjilu = 1;
                }
            }
        }
        //  },1000);
    },
    onInvite1:function(obj,type) {
        this.onInvite();
    },
    onInvite:function(obj,type){
        var obj={};
        obj.tableId = 0;
        this.url = SdkUtil.SHARE_URL;//现网
        //this.url = "http://testlx.gm.688gs.com/pdkuposa/v2/d8/"+PlayerModel.userId;//测试服
        obj.userName=PlayerModel.username;
        obj.callURL=this.url;
        var content = ShareDailyModel.getFeedContent();
        obj.title="熊猫麻将";
        obj.pyq=content;
        obj.description=content;
        obj.shareType=1;
        if (content=="" && SyConfig.hasOwnProperty("HAS_PNG_SHARE")) {
            obj.shareType=0;
            //var rand = MathUtil.mt_rand(1,3);
            //obj.png = "res/feed/feed_"+rand+".jpg";
            obj.png = "res/feed/feed.jpg";
        }
        obj.session = 0;
        SdkUtil.sdkFeed(obj,true);
        //SharePop.show(obj,true);
    }


})