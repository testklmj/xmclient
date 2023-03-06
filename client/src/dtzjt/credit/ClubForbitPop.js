/**
 * Created by leiwenwen on 2018/10/15.
 */
var ClubForbitPop = BasePopup.extend({
    ctor:function(data){
        this.stateType = 0;
        this.curUserId = 0;
        this._super("res/clubForbitPop.json");
    },

    selfRender:function(){

        var inputIdImg = this.inputIdImg = this.getWidget("Image_input");
        this.inputName = new cc.EditBox(cc.size(320, 61),new cc.Scale9Sprite("res/ui/dtzjulebu/julebu/Credit/forbit_9.png"));
        this.inputName.setString("");
        this.inputName.x = inputIdImg.width/2;
        this.inputName.y = inputIdImg.height/2;
        this.inputName.setFontColor(cc.color("ca9c91"));
        this.inputName.setDelegate(this);
        this.inputName.setFont("Arial",30);
        this.inputName.setMaxLength(30);
        this.inputName.setPlaceHolder("请输入用户ID");
        this.inputName.setPlaceholderFont("Arial" , 30);
        // this.inputName.setPlaceholderFontColor(cc.color(148,129,119));//230 218 207
        inputIdImg.addChild(this.inputName,0);


        var findBtn = this.getWidget("Button_167");
        UITools.addClickEvent(findBtn,this,this.onFind);

        this.Panel_info = this.getWidget("Panel_info");
        this.infoIcon = this.Panel_info.getChildByName("Image_icon");
        this.rLabel = this.Panel_info.getChildByName("Label_r");
        this.nLabel = this.infoIcon.getChildByName("Label_n");
        this.uLabel = this.infoIcon.getChildByName("Label_u");

        //禁止游戏图标
        this.forbidImg= UICtor.cImg("res/ui/dtzjulebu/julebu/img_forbid.png");
        this.forbidImg.setPosition(cc.p(25+this.infoIcon.getAnchorPointInPoints().x, 25+this.infoIcon.getAnchorPointInPoints().y));
        this.infoIcon.addChild(this.forbidImg,10);
        this.forbidImg.visible = false;

        var operationBtn = this.Panel_info.getChildByName("Button_165");
        operationBtn.temp = 1;
        UITools.addClickEvent(operationBtn,this,this.onPanel);
        var mainPopup = this.getWidget("mainPopup");
        mainPopup.temp = 2;
        UITools.addClickEvent(mainPopup,this,this.onPanel);

        this.Panel_t = this.getWidget("Panel_t");
        this.headImage = this.Panel_t.getChildByName("Image_head");
        this.nameLabel = this.headImage.getChildByName("Label_n");
        this.idLabel = this.headImage.getChildByName("Label_u");

        //禁止游戏图标
        this.limtImg = UICtor.cImg("res/ui/dtzjulebu/julebu/img_forbid.png");
        this.limtImg.setPosition(cc.p(25+this.headImage.getAnchorPointInPoints().x, 25+this.headImage.getAnchorPointInPoints().y));
        this.headImage.addChild(this.limtImg,10);
        this.limtImg.visible = false;

        //选择操作的人员1是自己 2是组员
        var widgetfinds = {"Button_level1" : 1 ,"Label_self" : 1  , "Button_level2" : 2 ,"Label_down" : 2 };
        this.addDtzClickEvent(widgetfinds , this.onLevel);
        this.onLevel(this.Button_level1);


        //操作类型1是禁止 2是允许
        var widgetoperations = {"Button_operation1" : 0  , "Button_operation2" : 1};
        this.addDtzClickEvent(widgetoperations , this.onOperation);



    },

    onFind:function(obj){
        obj.setTouchEnabled(false);
        this.runAction(cc.sequence(cc.delayTime(0.5), cc.callFunc(function () {
            obj.setTouchEnabled(true);
        })));

        var userId = this.inputName.getString();//查询ID
        if (!userId || userId == ""){
            FloatLabelUtil.comText("用户Id不能为空");
            return
        }

        if (Number(userId)  == PlayerModel.userId){
            return
        }
        var self = this;
        NetworkJT.loginReq("groupAction", "loadGroupUsers", {
            groupId:ClickClubModel.getCurClubId(),
            keyWord:""+userId,
            userId:PlayerModel.userId,
            sessCode:PlayerModel.sessCode,
        }, function (data) {
            if (data && data.message) {
                var list = data.message.list;
                self.Panel_info.visible = false;
                if (list && list.length > 0){
                    self.Panel_info.visible = true;
                    var data = list[0];
                    self.setInfo(data);
                }
                cc.log("***",JSON.stringify(data));
            }
        }, function (data) {
            FloatLabelUtil.comText(data.message);
        });
    },

    onOperation:function(obj){
        var temp = obj.temp;
        var self = this;
        var tipStr = "";
        if (temp == 0){
            if (self.stateType == 0){
                tipStr = "确定禁止该成员在亲友圈中进行游戏吗？";
            }else{
                tipStr = "确定禁止该成员及下级所有成员在亲友圈中进行游戏吗？";
            }
        }else {
            if (self.stateType == 0){
                tipStr = "确定允许该成员在亲友圈中进行游戏吗？";
            }else{
                tipStr = "确定允许该成员及下级所有成员在亲友圈中进行游戏吗？";
            }
        }


        AlertPop.show(tipStr, function () {
            NetworkJT.loginReq("groupAction", "updateGroupUser", {
                groupId:ClickClubModel.getCurClubId(),
                stateType:self.stateType,
                mUserId :PlayerModel.userId,
                sessCode:PlayerModel.sessCode,
                oUserId:self.curUserId,
                userState:temp,
            }, function (data) {
                if (data) {
                    FloatLabelUtil.comText("操作成功");
                    self.limtImg.visible = self.forbidImg.visible = temp != 1 ? true : false;
                    self.Panel_t.visible = false;
                    cc.log("***",JSON.stringify(data));
                }
            }, function (data) {
                FloatLabelUtil.comText(data.message);
            });
        });



    },


    showIcon: function (root,iconUrl, sex) {
        iconUrl = "http://wx.qlogo.cn/mmopen/25FRchib0VdkrX8DkibFVoO7jAQhMc9pbroy4P2iaROShWibjMFERmpzAKQFeEKCTdYKOQkV8kvqEW09mwaicohwiaxOKUGp3sKjc8/0";
        var sex = sex || 1;
        var defaultimg = (sex == 1) ? "res/ui/dtz/images/default_m.png" : "res/ui/dtz/images/default_w.png";
        if (root.getChildByTag(345)) {
            root.removeChildByTag(345);
        }

        var sprite = new cc.Sprite(defaultimg);
        sprite.x = root.width * 0.5;
        sprite.y = root.height * 0.5;
        root.addChild(sprite, 5, 345);
        sprite.scale = 1.1;
        if (iconUrl) {
            cc.loader.loadImg(iconUrl, {width: 252, height: 252}, function (error, img) {
                if (!error) {
                    sprite.setTexture(img);
                }
            });
        }
    },

    onPanel:function(obj){
        this.Panel_t.visible = obj.temp == 1  ? true : false;
    },

    onLevel:function(obj){
        var temp = obj.temp;
        var values = [1,2];
        for (var i = 1; i <= values.length; i++) {
            if (i != temp) {
                this["Button_level" + i].setBright(false);
            } else {
                this["Button_level" + i].setBright(true);
            }
        }
        this.stateType = temp - 1;
    },

    setInfo:function(data){
        this.nLabel.setString("" + data.userName || "");
        this.uLabel.setString("" + data.userId || "");
        this.rLabel.setString("" + ClickClubModel.getClubRoleName(data.userRole));
        this.showIcon(this.infoIcon, data.headimgurl);
        this.nameLabel.setString("" + data.userName || "");
        this.idLabel.setString("" + data.userId || "");
        this.showIcon(this.headImage, data.headimgurl);
        this.limtImg.visible = this.forbidImg.visible = data.userLevel != 1 ? true : false;
        this.curUserId = data.userId || 0;
        this.Button_level2.visible = data.userRole != 2 && data.userRole != 1;
    },


    addClickEvent:function(widgets,selector,defaultState){
        var btnState = defaultState || false;
        for(var key in widgets){
            var widget = this[key] = this.getWidget(key);
            widget.temp = parseInt(widgets[key]);
            UITools.addClickEvent(widget,this,selector);
            widget.setBright(btnState)
        }
    },

    addDtzClickEvent:function(widgets , selector){
        for(var key in widgets){
            var widget = this[key] = this.getWidget(key);
            //cc.log("key ..." , widgets , key)
            widget.temp = parseInt(widgets[key]);
            UITools.addClickEvent(widget,this,selector);
        }
    }

})