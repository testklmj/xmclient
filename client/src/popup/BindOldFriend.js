/**
 * Created by Administrator on 2017/4/18.
 */
var BindOldFriend = BasePopup.extend({
    ctor:function(data){
        this.data = data || null;
        this._super("res/bindOldFriend.json");
    },

    selfRender:function() {

        var inputNameImg = this.getWidget("Image_15");
        this.inputName = new cc.EditBox(cc.size(378, 53),new cc.Sprite("res/ui/dtz/inviteCodePop/inviteCode_8.png"));
        this.inputName.setString("");
        this.inputName.x = inputNameImg.width/2 + 75;
        this.inputName.y = inputNameImg.height/2 - 12;
        this.inputName.setFontColor(cc.color("#fefefe"));
        this.inputName.setDelegate(this);
        this.inputName.setFont("Arial",30);
        this.inputName.setMaxLength(30);
        this.inputName.setPlaceHolder("输入ID");
        this.inputName.setPlaceholderFont("Arial" , 30);
        inputNameImg.addChild(this.inputName,0);


        var btn = this.getWidget("Button_17");
        UITools.addClickEvent(btn, this, this.onBind)


        var params = null;
        if (this.data.params){
            params = JSON.parse(this.data.params);
        }

        if (params && params.bindUserId ){
            this.inputName.setString("" + params.bindUserId);
            this.inputName.setTouchEnabled(false);
            btn.setTouchEnabled(false);
            btn.setBright(false);
        }

        this.addCustomEvent(SyEvent.NEW_ACTIVE_REWARD , this , this.onShowReward);

    },

    onShowReward:function(event){
        var data = event.getUserData();
        if (data.id == ActivityId.bind_oldFriend){
            PopupManager.remove(this);
            FloatLabelUtil.comText("领取成功");
        }
    },


    onBind:function(sender){
        sender.setTouchEnabled(false);
        this.runAction(cc.sequence(cc.delayTime(1),cc.callFunc(function(){
            sender.setTouchEnabled(true);
        })));
        var userId = this.inputName.getString();
        if (userId && userId != ""){
            ActivityModel.sendActivity([1],["" + ActivityId.bind_oldFriend,"",userId]);
        }
    },


})
