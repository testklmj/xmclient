/**
 * Created by leiwenwen on 2018/10/15.
 */
/**
 * 成员界面的item
 */
var ClubCreditMemberCell = ccui.Widget.extend({
    ctor:function(data,root,index){
        this.data = data;
        this.parentNode = root;

        this._super();
        this.setContentSize(956, 114);

        var Panel_21=this.Panel_21= UICtor.cPanel(cc.size(956,104),cc.color(150,200,255),0);
        Panel_21.setAnchorPoint(cc.p(0,0));
        Panel_21.setPosition(0,0);
        var Image_bg=this.Image_bg= UICtor.cImg("res/ui/dtzjulebu/julebu/Credit/img_1.png");
        Image_bg.setPosition(478,52);
        Panel_21.addChild(Image_bg);
        var Image_head=this.Image_head= UICtor.cImg("res/ui/dtzjulebu/julebu/Rank/icon.png");
        Image_head.setPosition(cc.p(-407+Image_bg.getAnchorPointInPoints().x, 2+Image_bg.getAnchorPointInPoints().y));
        Image_bg.addChild(Image_head);
        var Label_name=this.Label_name= UICtor.cLabel("爱吃鱼的猫",25,cc.size(130,30),cc.color("238B76"),1,0);
        Label_name.setPosition(cc.p(-216+Image_bg.getAnchorPointInPoints().x, 0+Image_bg.getAnchorPointInPoints().y));
        Image_bg.addChild(Label_name);
        var Label_id=this.Label_id= UICtor.cLabel("100",25,cc.size(0,0),cc.color("238B76"),0,0);
        Label_id.setPosition(cc.p(-23+Image_bg.getAnchorPointInPoints().x, 0+Image_bg.getAnchorPointInPoints().y));
        Image_bg.addChild(Label_id);
        var Label_score=this.Label_score= UICtor.cLabel("100",25,cc.size(0,0),cc.color("238B76"),0,0);
        Label_score.setPosition(cc.p(172+Image_bg.getAnchorPointInPoints().x, 0+Image_bg.getAnchorPointInPoints().y));
        Image_bg.addChild(Label_score);
        var Button_reduce=this.Button_reduce= UICtor.cBtn("res/ui/dtzjulebu/julebu/Credit/img_16.png");
        Button_reduce.setPosition(cc.p(310+Image_bg.getAnchorPointInPoints().x, 0+Image_bg.getAnchorPointInPoints().y));
        Image_bg.addChild(Button_reduce);
        var Button_add=this.Button_add= UICtor.cBtn("res/ui/dtzjulebu/julebu/Credit/img_28.png");
        Button_add.setPosition(cc.p(414+Image_bg.getAnchorPointInPoints().x, 0+Image_bg.getAnchorPointInPoints().y));
        Image_bg.addChild(Button_add);


        this.addChild(Panel_21);



        Button_reduce.visible = false;
        Button_add.visible = false;


        Button_reduce.temp = 1;
        UITools.addClickEvent(Button_reduce,this,this.onChange);
        Button_add.temp = 2;
        UITools.addClickEvent(Button_add,this,this.onChange);

        this.setData(data);

    },

    upDateCreditNum: function(data) {
        //var data = event.getUserData();
        var temp = data.temp || 0;
        var num = data.num || 0;
        var numStr = Number(num);
        if (temp == 5){
            this.onHttpChange(""+numStr);
        }else if (temp == 6){
            this.onHttpChange("-"+numStr);
        }
    },

    //显示数据
    setData:function(data){
        this.opUserId = data.userId;
        this.userRole = data.userRole;
        //0不能操作 1可以上下分 2只可以上分 3只可以下分 ----这个参数有点无敌，很贴心
        var opType = data.opType || 0;
        var score = data.credit || 0;
        this.Label_name.setString(""+data.userName);
        this.Label_id.setString(""+data.userId);
        this.Label_score.setString(""+score);
        this.showIcon(data.headimgurl , 1);

        //cc.log("opType:::"+opType)

        if (opType == 1) {
            this.Button_reduce.visible = true;
            this.Button_add.visible = true;
        }else if (opType == 2) {
            this.Button_reduce.visible = false;
            this.Button_add.visible = true;
        }else if (opType == 3) {
            this.Button_reduce.visible = false;
            this.Button_add.visible = true;
        }else{
            this.Button_reduce.visible = false;
            this.Button_add.visible = false;
        }

    },

    showIcon: function (iconUrl, sex) {
        //iconUrl = "http://wx.qlogo.cn/mmopen/25FRchib0VdkrX8DkibFVoO7jAQhMc9pbroy4P2iaROShWibjMFERmpzAKQFeEKCTdYKOQkV8kvqEW09mwaicohwiaxOKUGp3sKjc8/0";
        var icon = this.Image_head;
        var sex = sex || 1;
        var defaultimg = (sex == 1) ? "res/ui/dtz/images/default_m.png" : "res/ui/dtz/images/default_w.png";

        if(icon.curShowIconUrl == null || (icon.curShowIconUrl != iconUrl)) {//头像不同才加载
            if (icon.getChildByTag(345)) {
                icon.removeChildByTag(345);
            }

            var sprite = new cc.Sprite(defaultimg);
            sprite.x = icon.width * 0.5;
            sprite.y = icon.height * 0.5;
            icon.addChild(sprite, 5, 345);
            if (iconUrl) {
                cc.loader.loadImg(iconUrl, {width: 252, height: 252}, function (error, img) {
                    if (!error) {
                        if (sprite) {
                            sprite.setTexture(img);
                            icon.curShowIconUrl = iconUrl
                        }
                    }
                });
            }
        }
    },

    //temp 5 加 6 减
    onInputNumber: function(temp) {
        var mc = new ClubCreditInputPop(temp,this);
        PopupManager.addPopup(mc);
    },


    onChange: function (obj) {
        var temp = obj.temp;
        if (temp == 2){
            this.onInputNumber(5);
        }else{
            this.onInputNumber(6);
        }
    },
    /**
    *1、credit：修改的信用分值，正数代表增加，负数代表减少
     2、sessCode：调用接口的用户sessCode
    * **/
    onHttpChange:function(num){
        var self = this;

        NetworkJT.loginReq("groupCreditAction", "updateCredit", {
            destUserId:self.opUserId ,
            userId:PlayerModel.userId,
            groupId:ClickClubModel.getCurClubId(),
            credit:num,
            sessCode:PlayerModel.sessCode
        }, function (data) {
            if (data) {
                var score = data.message.credit || 0;
                FloatLabelUtil.comText("操作成功");
                //调用父节点的刷新
                if(self.parentNode){
                    var userId = self.parentNode.inputName.getString() || "";
                    //cc.log("userId",userId);
                    //Image_myLeadTeam
                    if (userId && userId != ""){
                        self.parentNode.onSearchMember(userId);
                    }else{
                        if ( ClickClubModel.getCurClubRole() == 2){
                            self.parentNode.getTeamListData();
                        }else{
                            self.parentNode.updateMeMberListData();
                        }

                    }
                }


            }
        }, function (data) {
            //FloatLabelUtil.comText("操作失败");
            FloatLabelUtil.comText(data.message);
        });

    },



})