/**
 * Created by Administrator on 2016/6/27.
 */
var CheckIdCardPop = BasePopup.extend({
    ctor: function () {
        this._super("res/checkIdCardPop.json");
    },

    selfRender: function () {

        this.btnTrue = this.getWidget("Button_true");
        UITools.addClickEvent(this.btnTrue, this , this.onTrue);
        this.btnTrue.visible = true;


        var inputNameImg = this.getWidget("inputName");
        this.inputName = new cc.EditBox(cc.size(420, 70),new cc.Scale9Sprite("res/ui/dtzjulebu/julebu/inputIdBg.png"));
        this.inputName.setString("");
        this.inputName.x = inputNameImg.width/2;
        this.inputName.y = inputNameImg.height/2;
        this.inputName.setFontColor(cc.color("7D2E00"));
        this.inputName.setDelegate(this);
        this.inputName.setFont("Arial",26);
        this.inputName.setMaxLength(30);
        this.inputName.setPlaceHolder("请输入姓名");
        this.inputName.setPlaceholderFont("Arial" , 26);
        inputNameImg.addChild(this.inputName,0);


        var inputIdCardImg = this.getWidget("inputIdCard");
        this.inputIdCard = new cc.EditBox(cc.size(420, 70),new cc.Scale9Sprite("res/ui/dtzjulebu/julebu/inputIdBg.png"));
        this.inputIdCard.setString("");
        this.inputIdCard.x = inputIdCardImg.width/2;
        this.inputIdCard.y = inputIdCardImg.height/2;
        this.inputIdCard.setFontColor(cc.color("7D2E00"));
        this.inputIdCard.setDelegate(this);
        this.inputIdCard.setFont("Arial",26);
        this.inputIdCard.setMaxLength(30);
        this.inputIdCard.setPlaceHolder("请输入身份证号");
        this.inputIdCard.setPlaceholderFont("Arial" , 26);
        inputIdCardImg.addChild(this.inputIdCard,0);

        this.onSearch();

    },

    onTrue:function(){
        var name = this.inputName.getString();
        var idCard = this.inputIdCard.getString();
        var self =  this;
        if(name){
            if (idCard){
                var msgStr = {realName:""+name,idCard:idCard};
                var msg = JSON.stringify(msgStr);
                NetworkJT.loginReq("user", "editUserMsg", {msg:msg,userId:PlayerModel.userId}, function (data) {
                    if (data) {
                        cc.log("editUserMsg::"+JSON.stringify(data));
                        FloatLabelUtil.comText("实名认证成功");
                        PopupManager.remove(self);
                    }
                }, function (data) {
                    FloatLabelUtil.comText(data.message);
                    //PopupManager.remove(self);
                });
            }else{
                FloatLabelUtil.comText("请输入身份证");
            }
        }else{
            FloatLabelUtil.comText("请输入姓名");
        }
    },

    onSearch:function(){
        var self =  this;
        NetworkJT.loginReq("user", "queryUserMsg", {userId:PlayerModel.userId}, function (data) {
            if (data) {
                cc.log("queryUserMsg::"+JSON.stringify(data));
                if (data.message) {
                    if (data.message.length >= 2) {
                        self.btnTrue.visible = false;
                        self.inputName.setString(data.message[0].msgValue);
                        self.inputIdCard.setString(data.message[1].msgValue);
                    }
                }
            }
        }, function (data) {
            FloatLabelUtil.comText(data.message);
            //PopupManager.remove(self);
        });
    }

});
