/**
 * Created by Administrator on 2017/7/21.
 */


var ClubTeamDetailItem = ccui.Widget.extend({

    ctor:function(data){
        this.data = data;
        this._super();
        this.setContentSize(880,90);

        var Panel_22=this.Panel_22= UICtor.cPanel(cc.size(880,90),cc.color(150,200,255),0);
        Panel_22.setAnchorPoint(cc.p(0,0));
        Panel_22.setPosition(0,0);
        var lbTeamLeaderName=this.lbTeamLeaderName= UICtor.cLabel("名字要六个字么",28,cc.size(191,36),cc.color(129,49,0),1,1);
        lbTeamLeaderName.setPosition(430,46);
        Panel_22.addChild(lbTeamLeaderName);
        var lballJushu=this.lballJushu= UICtor.cLabel("100",28,cc.size(0,0),cc.color(129,49,0),1,1);
        lballJushu.setPosition(619,46);
        Panel_22.addChild(lballJushu);
        var lbdayingjia=this.lbdayingjia= UICtor.cLabel("100",28,cc.size(0,0),cc.color(129,49,0),0,0);
        lbdayingjia.setPosition(753,46);
        Panel_22.addChild(lbdayingjia);
        var lbId=this.lbId= UICtor.cLabel("123456",28,cc.size(0,0),cc.color(129,49,0),0,0);
        lbId.setPosition(232,47);
        Panel_22.addChild(lbId);
        var icon=this.icon= UICtor.cImg("res/ui/dtz/images/default_m.png");
        icon.setPosition(77,46);
        Panel_22.addChild(icon);
        var Button_37=this.Button_37= UICtor.cBtn("res/ui/dtzjulebu/julebu/btn_jieCLose.png");
        Button_37.setPosition(835,44);
        Panel_22.addChild(Button_37);


        this.Button_37.visible = false;
        this.icon.scale = 0.8;
        Panel_22.setBackGroundImage("res/ui/dtzjulebu/julebu/wanfaBg.png");
        this.addChild(Panel_22);
        //添加点击事件
        UITools.addClickEvent(this.Button_37, this, this.onClickRemove);//onClick

        //刷新俱乐部显示
        this.setData(this.data);

    },

    setData:function(tData){
        this.lbTeamLeaderName.setString(tData.userName);
        this.lbdayingjia.setString(tData.dyjCount);
        this.lballJushu.setString(tData.zjsCount);
        this.lbId.setString(tData.userId);
        this.curPlayerId = tData.userId;
        UITools.showIcon(tData.headimgurl,this.icon);
    },

    showIcon: function (iconUrl) {
        //iconUrl = "http://wx.qlogo.cn/mmopen/25FRchib0VdkrX8DkibFVoO7jAQhMc9pbroy4P2iaROShWibjMFERmpzAKQFeEKCTdYKOQkV8kvqEW09mwaicohwiaxOKUGp3sKjc8/0";
        var icon = this.icon;
        var defaultimg = "res/ui/dtz/images/default_m.png"

        if(icon.curShowIconUrl == null || (icon.curShowIconUrl != iconUrl)){//头像不同才加载

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
                        if (sprite){
                            sprite.setTexture(img);
                            icon.curShowIconUrl = iconUrl
                        }
                    }
                });
            }
        }
    },

    showOrHideCloseBtn:function(){
        this.Button_37.visible = !this.Button_37.visible
    },

    onClickRemove:function(){
        AlertPop.show("确定移除该成员么？",this.deleteClubMember.bind(this));
    },

    deleteClubMember:function(){
        cc.log("this.curPlayerId::" , this.curPlayerId);
        var self = this;
        NetworkJT.loginReq("groupAction", "fire", {
            groupId:ClickClubModel.getCurClubId(),
            mUserId:PlayerModel.userId ,
            oUserId:this.curPlayerId,
        }, function (data) {
            cc.log("groupAction::fire..." , JSON.stringify(data));
            FloatLabelUtil.comText("删除成员成功");
            SyEventManager.dispatchEvent(SyEvent.UPDATE_CLUB_MEMBER_NUMBER);
            sy.scene.hideLoading();
        }, function (data) {
            //FloatLabelUtil.comText("删除成员失败");
            FloatLabelUtil.comText(data.message);
            sy.scene.hideLoading();
        });

    },
});

