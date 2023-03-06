/**
 * Created by Administrator on 2017/7/21.
 */


var ClubTeamItem = ccui.Widget.extend({

    ctor:function(data){
        this.data = data;
        this._super();
        this.setContentSize(880,90);

        var Panel_22=this.Panel_22= UICtor.cPanel(cc.size(880,90),cc.color(150,200,255),0);
        Panel_22.setAnchorPoint(cc.p(0,0));
        Panel_22.setPosition(0,0);
        var lbTeamName=this.lbTeamName= UICtor.cLabel("群组名群组名",28,cc.size(173,36),cc.color(129,49,0),1,1);
        lbTeamName.setAnchorPoint(cc.p(0,0.5));
        lbTeamName.setPosition(17,45);
        Panel_22.addChild(lbTeamName);
        var icon=this.icon= UICtor.cImg("res/ui/dtz/images/default_m.png");
        icon.setPosition(244,46);
        Panel_22.addChild(icon);
        var lbTeamLeaderName=this.lbTeamLeaderName= UICtor.cLabel("名字要六个字么",28,cc.size(173,36),cc.color(129,49,0),0,1);
        lbTeamLeaderName.setAnchorPoint(cc.p(0,0.5));
        lbTeamLeaderName.setPosition(cc.p(63+icon.getAnchorPointInPoints().x, 20+icon.getAnchorPointInPoints().y));
        icon.addChild(lbTeamLeaderName);
        var lbTeamLeaderName_0=this.lbTeamLeaderName_0= UICtor.cLabel("ID:123456",28,cc.size(0,0),cc.color(129,49,0),0,1);
        lbTeamLeaderName_0.setAnchorPoint(cc.p(0,0.5));
        lbTeamLeaderName_0.setPosition(cc.p(63+icon.getAnchorPointInPoints().x, -18+icon.getAnchorPointInPoints().y));
        icon.addChild(lbTeamLeaderName_0);
        var lbrenshu=this.lbrenshu= UICtor.cLabel("1",28,cc.size(0,0),cc.color(129,49,0),1,0);
        lbrenshu.setPosition(498,46);
        Panel_22.addChild(lbrenshu);
        var lbjushu=this.lbjushu= UICtor.cLabel("100",28,cc.size(0,0),cc.color(129,49,0),0,0);
        lbjushu.setPosition(617,46);
        Panel_22.addChild(lbjushu);
        var lbjuBigWinner=this.lbjuBigWinner= UICtor.cLabel("100",28,cc.size(0,0),cc.color(129,49,0),0,0);
        lbjuBigWinner.setPosition(746,46);
        Panel_22.addChild(lbjuBigWinner);
        var Button_Delete=this.Button_Delete= UICtor.cBtn("res/ui/dtzjulebu/julebu/btn_jieCLose.png");
        Button_Delete.setPosition(841,48);
        Panel_22.addChild(Button_Delete);



        this.icon.scale = 0.8;
        this.Button_Delete.visible = false;
        Panel_22.setBackGroundImage("res/ui/dtzjulebu/julebu/wanfaBg.png");
        this.Panel_22.setTouchEnabled(true);
        this.addChild(Panel_22);
        //添加点击事件
        UITools.addClickEvent(this.Button_Delete, this, this.onClickRemove);//onClick
        UITools.addClickEvent(this.Panel_22 , this , this.clubTeamDetail);

        //刷新俱乐部显示
        this.setData(this.data);
    },


    onClickRemove:function(){
        AlertPop.show("确定删除该小组和小组内所有成员么？",this.deleteClubTeam.bind(this))
    },

    //deleteClubTeam:function(){
    //
    //    var self = this;
    //    NetworkJT.loginReq("groupAction", "updateGroupTeam", {
    //        mUserId:PlayerModel.userId ,
    //        keyId:this.teamKeyId,
    //        teamName:"deleteTeam",
    //        msgType:"delete"
    //    }, function (data) {
    //        cc.log("updateGroupTeam..." , JSON.stringify(data));
    //        FloatLabelUtil.comText("删除小组成功");
    //        SyEventManager.dispatchEvent(SyEvent.CLUB_DELETE_TEAM_SUC ,{teamKeyId : self.teamKeyId});
    //        sy.scene.hideLoading();
    //    }, function (data) {
    //            FloatLabelUtil.comText(data.message);
    //            sy.scene.hideLoading();
    //    });
    //},

    deleteClubTeam:function(){
        var self = this;
        NetworkJT.loginReq("groupCreditAction", "deleteTeam", {
            userId:PlayerModel.userId ,
            groupId:ClickClubModel.getCurClubId(),
            userGroup:this.teamKeyId,
            sessCode:PlayerModel.sessCode
        }, function (data) {
            cc.log("updateGroupTeam..." , JSON.stringify(data));
            FloatLabelUtil.comText("删除小组成功");
            SyEventManager.dispatchEvent(SyEvent.CLUB_DELETE_TEAM_SUC ,{teamKeyId : self.teamKeyId});
            sy.scene.hideLoading();
        }, function (data) {
            FloatLabelUtil.comText(data.message);
            sy.scene.hideLoading();
        });
    },

    clubTeamDetail:function(){
        cc.log("click club Team item ");
        //直接显示界面在界面里去获取数据
        SyEventManager.dispatchEvent(SyEvent.OPEN_TEAM_DETAIL ,{teamKeyId : this.teamKeyId});
        //PopupManager.addPopup(new ClubTeamDetailPop(this.teamKeyId));
    },

    setData:function(itemData){
        var tData = itemData;
        this.teamName = itemData.teamName;
        this.teamKeyId = itemData.userGroup;
        this.leaderName = itemData.name;
        this.renshu = itemData.userCount;
        cc.log("ClubTeamItem setData::" , this.teamKeyId);
        this.lbTeamName.setString(itemData.teamName);
        this.lbTeamLeaderName.setString(itemData.name);
        this.lbrenshu.setString(itemData.userCount);
        this.lbjushu.setString(itemData.zjsCount);
        this.lbjuBigWinner.setString(itemData.dyjCount);
        this.lbTeamLeaderName_0.setString("ID:"+itemData.userId);

        this.showIcon(itemData.headimgurl);
    },

    showIcon: function (iconUrl) {
        //iconUrl = "http://wx.qlogo.cn/mmopen/25FRchib0VdkrX8DkibFVoO7jAQhMc9pbroy4P2iaROShWibjMFERmpzAKQFeEKCTdYKOQkV8kvqEW09mwaicohwiaxOKUGp3sKjc8/0";
        var url = iconUrl;
        //var icon = this.getWidget("icon_" + index);
        var icon = this.icon;
        var defaultimg = "res/ui/dtz/images/default_m.png";

        if(icon.curShowIconUrl == null || (icon.curShowIconUrl != iconUrl)){//头像不同才加载

            var sprite = new cc.Sprite(defaultimg);
            sprite.x = icon.width * 0.5;
            sprite.y = icon.height * 0.5;
            icon.addChild(sprite, 5, 345);
            if (iconUrl) {

                cc.loader.loadImg(iconUrl, {width: 252, height: 252}, function (error, img) {
                    if (!error) {
                        sprite.setTexture(img);
                        icon.curShowIconUrl = iconUrl
                    }
                });
            }
        }
    },

    getTeamKeyId:function(){
        return this.teamKeyId || 0;
    },

    showOrHideCloseBtn:function(){
        this.Button_Delete.visible = !this.Button_Delete.visible
    },
});

