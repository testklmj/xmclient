/**
 * 俱乐部手动添加玩家弹框
 */
var ClubCreateTeamPop = BasePopup.extend({

    ctor:function(){
        this.curClubId = ClickClubModel.getCurClubId();
        this._super("res/clubCreateTeamPop.json");
    },

    selfRender:function(){
        this.btnAdd = this.getWidget("btnAdd");
        this.btnSearch = this.getWidget("btnSearch");
        this.playerIcon = this.getWidget("icon");
        this.playerName = this.getWidget("lbName");

        UITools.addClickEvent(this.btnAdd, this , this.onInvite);
        UITools.addClickEvent(this.btnSearch, this , this.onSearch);
        var inputIdImg = this.getWidget("inputBg");
        this.inputId = new cc.EditBox(cc.size(240, 42),new cc.Scale9Sprite("res/ui/dtzjulebu/julebu/inputId.png"));
        this.inputId.setString("");
        this.inputId.x = inputIdImg.width/2;
        this.inputId.y = inputIdImg.height/2;

        this.inputId.setFontColor(cc.color("ffffff"));
        this.inputId.setDelegate(this);
        this.inputId.setFont("Arial",26);
        this.inputId.setMaxLength(30);
        this.inputId.setPlaceHolder("输入玩家ID");
        this.inputId.setPlaceholderFont("Arial" , 26);
        inputIdImg.addChild(this.inputId,0);

        var inputNameImg = this.getWidget("inputTeamNameBg");
        this.inputName = new cc.EditBox(cc.size(240, 42),new cc.Scale9Sprite("res/ui/dtzjulebu/julebu/inputId.png"));
        this.inputName.setString("");
        this.inputName.x = inputNameImg.width/2;
        this.inputName.y = inputNameImg.height/2;
        this.inputName.setFontColor(cc.color("ffffff"));
        this.inputName.setDelegate(this);
        this.inputName.setFont("Arial",26);
        this.inputName.setMaxLength(30);
        this.inputName.setPlaceHolder("输入小组名");
        this.inputName.setPlaceholderFont("Arial" , 26);
        inputNameImg.addChild(this.inputName,0);

        this.playerIcon.visible = false;
        this.btnSearch.visible = !this.playerIcon.visible;
        this.btnAdd.visible = this.playerIcon.visible;

    },

    onShowPlayer:function(playData){
        if(playData == null){
            return;
        }
        var tplayData = playData;
        if(this.playerIcon){
            this.playerIcon.visible = true;
            this.playerName.setString(tplayData.userName);
            this.showIcon(tplayData.headimgurl);

            this.btnSearch.visible = !this.playerIcon.visible;
            this.btnAdd.visible = this.playerIcon.visible;
        }
    },

    showIcon: function (iconUrl) {

        var icon = this.playerIcon;
        var defaultimg ="res/ui/dtz/images/default_m.png";
        if(icon.getChildByTag(345))
            icon.removeChildByTag(345);

        var sprite = new cc.Sprite(defaultimg);
        if(iconUrl){
            try{
                var sten = new cc.Sprite("res/ui/dtzjulebu/julebu/iconBg.png");
                var clipnode = new cc.ClippingNode();
                clipnode.attr({stencil: sten, anchorX: 0.5, anchorY: 0.5, x: 32, y: 32, alphaThreshold: 0.8});
                clipnode.scale = 0.95;
                clipnode.addChild(sprite);
                icon.addChild(clipnode,5,345);
                var self = this;
                cc.loader.loadImg(iconUrl, {width: 252, height: 252}, function (error, img) {
                    if (!error) {
                        sprite.setTexture(img);
                    }
                });
            }catch(e){}
        }else{
            sprite.x = 32;
            sprite.y = 32;
            icon.addChild(sprite,5,345);
        }
    },

    onSearch:function(){
        var userId = this.inputId.getString();
        var self =  this;
        if( parseInt(userId) > 0){
            NetworkJT.loginReq("groupAction", "loadUserBase", {userIds:userId}, function (data) {
                cc.log("loadUserBase..." , JSON.stringify(data));
                if (data && data.message.length > 0) {
                    self.onShowPlayer(data.message[0]);
                }else{
                    FloatLabelUtil.comText("玩家不存在");
                }
            }, function (data) {
                FloatLabelUtil.comText(data.message);
            });
        }else{
            FloatLabelUtil.comText("请输入正确的玩家ID");
        }
    },

    onInvite:function(){
        var userId = this.inputId.getString();
        var teamName = this.inputName.getString();
        var self =  this;

        if(teamName == ""){
            FloatLabelUtil.comText("请输入正确的小组名");
            return;
        }

        if(parseInt(userId) > 0){
            NetworkJT.loginReq("groupAction", "createGroupTeam", {
                oUserId:userId,
                mUserId:PlayerModel.userId ,
                groupId:self.curClubId ,
                teamName:teamName,
            }, function (data) {
                cc.log("inviteJoinGroup..." , JSON.stringify(data));
                if (data ) {
                    FloatLabelUtil.comText("创建小组成功");
                    SyEventManager.dispatchEvent(SyEvent.CLUB_CREATE_TEAM_SUC);
                    PopupManager.remove(self);
                }
            }, function (data) {
                var errorDesc = "创建小组失败";
                if(data.message){
                    errorDesc = data.message;
                }
                FloatLabelUtil.comText(errorDesc);
            });
        }else{
            FloatLabelUtil.comText("请输入正确的玩家ID");
        }
    },

});

