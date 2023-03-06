/**
 * Created by Administrator on 2016/6/27.
 */
var ChatData = {
    lastChatTime:0,
    selected:1,
    pdk_fix_msg:["大家好，很高兴见到各位","你的牌打的也太好了","哈哈，手气真好","快点吧，我等到花儿都谢了",
        "不要走，决战到天亮","今天真高兴","怎么又断线了，网络怎么这么差啊","君子报仇，十盘不算晚","打错了，呜呜",
        "各位，真是不好意思，我得离开一会儿","再见了，我会想念大家的"],
    pdk_fix_msg_name:["fix_msg_djh","fix_msg_ddh","fix_msg_sqh","fix_msg_kdb",
        "fix_msg_byz","fix_msg_gx","fix_msg_dx","fix_msg_jzbc","fix_msg_dcl",
        "fix_msg_lk","fix_msg_zj"],

    mj_fix_msg:["大家好，很高兴见到各位","你的牌打的也太好了","哈哈，手气真好","快点吧，我等到花儿都谢了","不要走，决战到天亮",
        "这个吃的好","你放炮我不胡","真不好意思，又胡了","今天真高兴","怎么又断线了，网络怎么这么差啊","君子报仇，十盘不算晚",
        "打错了，呜呜","各位，真是不好意思，我得离开一会儿","再见了，我会想念大家的"],
    mj_fix_msg_name:["fix_msg_djh","fix_msg_ddh","fix_msg_sqh","fix_msg_kdb","fix_msg_byz",
        "fix_msg_cdh","fix_msg_nfp","fix_msg_yhl","fix_msg_gx","fix_msg_dx","fix_msg_jzbc",
        "fix_msg_dcl","fix_msg_lk","fix_msg_zj"],

    dn_fix_msg:["大家好，很高兴见到各位","哈哈，手气真好","快点吧，我等到花儿都谢了","不要走，决战到天亮",
        "今天真高兴","怎么又断线了，网络怎么这么差啊",
        "各位，真是不好意思，我得离开一会儿","再见了，我会想念大家的"],
    dn_fix_msg_name:["fix_msg_djh","fix_msg_sqh","fix_msg_kdb","fix_msg_byz","fix_msg_gx","fix_msg_dx","fix_msg_lk","fix_msg_zj"],

    phz_fix_msg:["大家好，很高兴见到各位","你的牌打的也太好了","哈哈，手气真好","快点吧，我等到花儿都谢了","不要走，决战到天亮",
        "这个吃的好","你放炮我不胡","真不好意思，又胡了","今天真高兴","怎么又断线了，网络怎么这么差啊","君子报仇，十盘不算晚",
        "打错了，呜呜","各位，真是不好意思，我得离开一会儿","再见了，我会想念大家的"],
    phz_fix_msg_name:["fix_msg_djh","fix_msg_ddh","fix_msg_sqh","fix_msg_kdb","fix_msg_byz",
        "fix_msg_cdh","fix_msg_nfp","fix_msg_yhl","fix_msg_gx","fix_msg_dx","fix_msg_jzbc",
        "fix_msg_dcl","fix_msg_lk","fix_msg_zj"],

    dtz_fix_msg:["快点,你在塞毛哦","你能走上游不" ,"让我来打", "你要么子","你能管么","你牌好打么","牌不好打",
        "你管好自己","我先走对你有用没有","我先走了","要单张",
        "要多连对","要飞机","要连对","要三个头","不好意思,又要第一了" , "接个电话等我一下"],
    dtz_fix_msg_name:["_voice0","_voice5","_voice8","_voice2","_voice4","_voice6","_voice7",
        "_voice3", "_voice9","_voice10","_voice11",
        "_voice12", "_voice13", "_voice14","_voice15","_voice16" , "_voice1"],
    ddt_fix_msg:["大家好，很高兴见到各位","你的牌打的也太好了","哈哈，手气真好","快点吧，我等到花儿都谢了",
        "不要走，决战到天亮","今天真高兴","怎么又断线了，网络怎么这么差啊","君子报仇，十盘不算晚","打错了，呜呜",
        "各位，真是不好意思，我得离开一会儿","再见了，我会想念大家的"],
    ddt_fix_msg_name:["fix_msg_djh","fix_msg_ddh","fix_msg_sqh","fix_msg_kdb",
        "fix_msg_byz","fix_msg_gx","fix_msg_dx","fix_msg_jzbc","fix_msg_dcl",
        "fix_msg_lk","fix_msg_zj"],
};
var ChatPop = BasePopup.extend({

    ctor: function (json) {
        var json = json || "res/chat.json";
        this._super(json);
    },

    selfRender: function () {
        //this.PLACEHOLDER="#";
        UITools.addClickEvent(this.getWidget("main1"),this,this.onMainClick);
        this.main2 = this.getWidget("main2");
        //this.currentlyText = new cc.EditBox(cc.size(470, 83),new cc.Scale9Sprite("res/ui/dtz/otherImg/img_chat_2.png"));
        //this.currentlyText.setString("");
        //this.currentlyText.x = 269;
        //this.currentlyText.y = 72;
        //this.currentlyText.setFontColor(cc.color("#FF361e06"));
        //this.currentlyText.setDelegate(this);
        //this.main2.addChild(this.currentlyText,0);
        //this.currentlyText.setFont("Arial",30);
        //this.currentlyText.setMaxLength(30);
        this.listView1 = this.getWidget("ListView_26");
        this.listView1.removeAllItems();
        this.listView2 = this.getWidget("ListView_27");
        this.listView2.removeAllItems();
        this.Button_19 = this.getWidget("Button_19");
        this.Button_19.temp = 1;
        this.Button_20 = this.getWidget("Button_20");
        this.Button_20.temp = 2;
        //this.Button_28 = this.getWidget("Button_28");
        this.Panel_10 = this.getWidget("Panel_10");
        this.Panel_10.visible = false;
        UITools.addClickEvent(this.Button_19,this,this.onSwitch);
        UITools.addClickEvent(this.Button_20,this,this.onSwitch);
        //UITools.addClickEvent(this.Button_28,this,this.onSend);
        if(ChatData.selected==1)
            this.onSwitch(this.Button_19);
        else
            this.onSwitch(this.Button_20);
    },

    sendMsg:function(a,b,c){
        var now = new Date().getTime();
        if((now-ChatData.lastChatTime)>3000){
            ChatData.lastChatTime = now;
            sySocket.sendComReqMsg(a,b,c);
            return true
        }else{
            FloatLabelUtil.comText("发送间隔不能小于3秒");
            return false;
        }
    },

    onSend:function(){
        var txt=this.currentlyText.getString();
        if(txt.length>0){
            if(txt.indexOf("#")>=0){
                return FloatLabelUtil.comText("包含特殊字符");
            }
            if(txt.length<=30){
                var bool = this.sendMsg(9,[0],[txt]);
                if(bool){
                    this.currentlyText.setString("");
                    PopupManager.remove(this);
                }
            }else{

            }
        }
    },

    createFastChat:function(label,temp){
        var ui = new ccui.Widget();
        ui.temp = temp;
        ui.setTouchEnabled(true);
        ui.setContentSize(400,64);
        var sprite = new cc.Sprite("res/ui/dtz/images/img_chat_1.png");
        sprite.x = ui.width/2;
        sprite.y = ui.height/2;
        ui.addChild(sprite);

        var fontSize = 26;
        var isDTZ = (LayerManager.isInDTZ());
        if(isDTZ){
            fontSize = 26;
        }else{
            fontSize = 22;
        }

        var label = UICtor.cLabel(label,fontSize,cc.size(400,35),cc.color("#d0f8fd"),1,1);
        label.x = sprite.width/2;
        label.y = sprite.height/2;
        sprite.addChild(label);
        UITools.addClickEvent(ui,this,this.onFastChat);
        return ui;
    },

    createEmoji:function(faceArray){
        var ui = new ccui.Widget();
        ui.setContentSize(400,740);
        for(var i=1;i<=4;i++){
            var ri = i-1;
            var max = i*2;
            var min = max-2;
            var rIndex = 0;
            for(var j=min;j<max;j++){
                var sprite = new ccui.Button();
                sprite.loadTextureNormal("res/ui/dtz/chat/Expression"+(j+1)+".png");
                sprite.setZoomScale(0);
                sprite.temp = j+1;
                ui.addChild(sprite);
                sprite.x = 120+rIndex*155;
                if(rIndex>0)
                    sprite.x-=rIndex*2;
                sprite.y =670-ri*150;
                if(ri>0)
                    sprite.y+=ri*2;
                UITools.addClickEvent(sprite,this,this.onEmoji);
                rIndex++;
            }
        }
        return ui;

    },

    onFastChat:function(obj){
        var bool = this.sendMsg(9,[obj.temp],[]);
        if(bool){
            if(this.json=="res/dtzChat.json"){
                DTZRoomSound.fixMsg(PlayerModel.userId,obj.temp);
            }
            PopupManager.remove(this);
        }
    },

    editBoxEditingDidBegin: function (editBox) {
        if(SyConfig.isIos())
            this.Panel_10.visible = true;
        cc.log("editBox DidBegin !");
    },

    editBoxEditingDidEnd: function (editBox) {
        if(SyConfig.isIos()){
            var self = this;
            setTimeout(function(){self.Panel_10.visible = false;},30);
        }
        cc.log("editBox DidEnd !");
    },

    onMainClick:function(){
        cc.log("onMainClick.......... !");
        PopupManager.remove(this);
    },

    onEmoji:function(obj){
        var bool = this.sendMsg(9,[-1],[obj.temp+""]);
        if(bool)
            PopupManager.remove(this);
    },

    onSwitch:function(obj){
        var temp = obj.temp;
        ChatData.selected = temp;
        this.listView1.visible = this.listView2.visible = false;

        var isPHZ = (LayerManager.getCurrentLayer()==LayerFactory.PHZ_ROOM ||
        LayerManager.getCurrentLayer()==LayerFactory.PHZ_ROOM_MORE ||
        LayerManager.getCurrentLayer()==LayerFactory.PHZ_ROOM_LESS ||
        LayerManager.getCurrentLayer()==LayerFactory.PHZ_MONEY_ROOM);
        var isPDK = (LayerManager.isInPDK());
        var isDTZ = (LayerManager.isInDTZ());
        var isBBT = (LayerManager.getCurrentLayer()==LayerFactory.BBT_ROOM);
        var isDDZ = (LayerManager.isInDDZ());
        var isMJ = (LayerManager.isInMJ());

        if(temp == 1){
            if(this.listView1.getItems().length==0){
                var array = [];
                cc.log("DTZRoomModel.wanfa..." , DTZRoomModel.wanfa);
                if(this.json=="res/chat.json"){
                    if(isDTZ){
                        array = ChatData.dtz_fix_msg;
                    }else if(isPDK || isBBT){
                        array = ChatData.pdk_fix_msg;
                    } else if(isPHZ){
                        array = ChatData.phz_fix_msg;
                    } else if(isDDZ){
                        array = ChatData.ddt_fix_msg;
                    } else if(isMJ){
                        array = ChatData.mj_fix_msg;
                    }
                }else{
                    array = ChatData.mj_fix_msg;
                }
                for(var i=0;i < array.length;i++){

                    this.listView1.pushBackCustomItem(this.createFastChat(array[i],(i+1)));
                }
            }
            this.listView1.visible = true;
            this.Button_19.setBright(true);
            this.Button_20.setBright(false);
        }else{
            if(this.listView2.getItems().length==0)
                this.listView2.pushBackCustomItem(this.createEmoji());
            this.listView2.visible = true;
            this.Button_19.setBright(false);
            this.Button_20.setBright(true);
        }
    }
});