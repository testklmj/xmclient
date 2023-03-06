/**
 * Created by Administrator on 2017/7/21.
 */


var ClubItem = ccui.Widget.extend({

    ctor:function(data , parentNode){
        this.data = data;
        this.limitNum = 500;//最大成员数目（500人）
        this.parentNode = parentNode;
        this._super();
        this.setContentSize(348, 120);

        var Panel_16=this.Panel_16= UICtor.cPanel(cc.size(730,68),cc.color(150,200,255),0);
        Panel_16.setAnchorPoint(cc.p(0,0));
        Panel_16.setPosition(0,0);
        var cellBgBtn=this.cellBgBtn= UICtor.cBtnBright("res/ui/dtzjulebu/julebu/qunCellBg.png","res/ui/dtzjulebu/julebu/qunCellBg2.png");
        cellBgBtn.setPosition(172,55);
        Panel_16.addChild(cellBgBtn);
        var lableClubName=this.lableClubName= UICtor.cLabel("我的俱乐部测试",28,cc.size(200,36),cc.color(135,47,16),0,1);
        lableClubName.setAnchorPoint(cc.p(0,0.5));
        lableClubName.setPosition(cc.p(-60+cellBgBtn.getAnchorPointInPoints().x, 25+cellBgBtn.getAnchorPointInPoints().y));
        cellBgBtn.addChild(lableClubName);
        var lbRooms=this.lbRooms= UICtor.cLabel("66",28,cc.size(0,0),cc.color(135,47,16),0,1);
        lbRooms.setAnchorPoint(cc.p(0,0.5));
        lbRooms.setPosition(cc.p(106+cellBgBtn.getAnchorPointInPoints().x, -20+cellBgBtn.getAnchorPointInPoints().y));
        cellBgBtn.addChild(lbRooms);
        var icon=this.icon= UICtor.cImg("res/ui/dtz/images/default_m.png");
        icon.setPosition(cc.p(-115+cellBgBtn.getAnchorPointInPoints().x, 3+cellBgBtn.getAnchorPointInPoints().y));
        cellBgBtn.addChild(icon);
        var Image_25=this.Image_25= UICtor.cImg("res/ui/dtzjulebu/julebu/members.png");
        Image_25.setPosition(cc.p(-42+cellBgBtn.getAnchorPointInPoints().x, -21+cellBgBtn.getAnchorPointInPoints().y));
        cellBgBtn.addChild(Image_25);
        var Image_25_0=this.Image_25_0= UICtor.cImg("res/ui/dtzjulebu/julebu/rooms.png");
        Image_25_0.setPosition(cc.p(79+cellBgBtn.getAnchorPointInPoints().x, -21+cellBgBtn.getAnchorPointInPoints().y));
        cellBgBtn.addChild(Image_25_0);
        var lbMembers=this.lbMembers= UICtor.cLabel("88",28,cc.size(0,0),cc.color(135,47,16),0,1);
        lbMembers.setAnchorPoint(cc.p(0,0.5));
        lbMembers.setPosition(cc.p(-13+cellBgBtn.getAnchorPointInPoints().x, -20+cellBgBtn.getAnchorPointInPoints().y));
        cellBgBtn.addChild(lbMembers);

        this.addChild(Panel_16);
        //添加点击事件
        UITools.addClickEvent(this.cellBgBtn, this, this.updateClubItemMsg);//onClick


        //刷新俱乐部显示
        this.setData(this.data);

        //创建选中特效
        //
        this.quanAnimate = new AnimateSprite("res/plist/clickQuan.plist","clickQuan",1/10);
        if(this.quanAnimate){
            this.quanAnimate.visible = false;
            this.quanAnimate.x = this.width * 0.5;
            this.quanAnimate.y = this.height * 0.5;
            this.quanAnimate.play();
            this.addChild(this.quanAnimate);
        }
    },

    /**
     * 每次点击某个俱乐部 刷新该俱乐部本身的数据
     */
    updateClubItemMsg:function(){
        if(!ClickClubModel.timeEnough()){
            FloatLabelUtil.comText("请不要切换亲友圈太快哦！");
            return;
        }

        var self = this;
        sy.scene.showLoading("获取亲友圈数据");
        NetworkJT.loginReq("groupAction", "loadUser", {oUserId:PlayerModel.userId,groupId:self.getGroupId(),checkGroup:1}, function (data) {
            if (data) {
                sy.scene.hideLoading();
                //cc.log("getClubListData::"+JSON.stringify(data));
                //self.refreshClubList(data.message.list);
                if(data.message){
                    //cc.log("刷新当前俱乐部数据...");
                    var clubMsg = data.message;
                    self.setData(clubMsg , true);
                    self.onClick(clubMsg);
                }
            }
        }, function (data) {
            sy.scene.hideLoading();
            //cc.log("getClubListData::"+JSON.stringify(data));
            FloatLabelUtil.comText(data.message);
        });
        sy.scene.hideLoading();
    },

    onClick:function(clubMsg){
        if(this.parentNode){
            var clickClubData ={};
            clickClubData.itemSelf = this;
            clickClubData.clickId = this.clickId;
            clickClubData.keyId = this.keyId;
            clickClubData.groupName = this.groupName;
            clickClubData.userRole = this.userRole;
            clickClubData.isOpenForbidJoinClub = 0;//暂未用改功能
            clickClubData.isOpenLeaderPay = this.isOpenLeaderPay;
            clickClubData.isOpenFastCreate = this.isOpenFastCreate;
            clickClubData.isOpenCreateRoom = this.isOpenCreateRoom;
            clickClubData.isAutoCreateRoom = this.isAutoCreateRoom;
            clickClubData.isBanVoiceAndProps = this.isBanVoiceAndProps;
            clickClubData.clubImgUrl = this.clubImgUrl;
            clickClubData.clubRoomNum = this.clubRoomNum;
            clickClubData.clubMemberNum = this.clubMemberNum;
            clickClubData.clubTeamId = this.userTeamId;
            clickClubData.ksppCount = this.ksppCount;
            clickClubData.isOpenCredit = this.isOpenCredit;
            clickClubData.creditAllotMode = this.creditAllotMode;
            clickClubData.promoterLevel = this.promoterLevel;
            clickClubData.clubMsg = clubMsg;

            ClickClubModel.init(clickClubData);

            this.parentNode.hideAllTouchedEffect();
            this.parentNode.onClickClub({
                itemSelf:this,
                clickId : this.clickId ,    //俱乐部ID
                keyId : this.keyId ,        //俱乐部主键 搞不懂后台为毛单独要搞个这个 就算搞 给前段是为何
                groupName:this.groupName,   //俱乐部名字
                userRole:this.userRole,     //我在这个俱乐部的身份
                leaderPay:this.isOpenLeaderPay,   //是否开启了群主支付
                createRoom:this.isOpenCreateRoom,  //是否开启普通玩家创房
                openFast:this.isOpenFastCreate,
                autoCreate:this.isAutoCreateRoom,
                isBanVoiceAndProps:this.isBanVoiceAndProps,
                isForbidJoinClub:this.isForbidJoinClub //是否开启禁止加入俱乐部功能
            });

            this.parentNode.Label_myCount.setString(""+this.lbMembers.getString());
            var lbRooms = this.lbRooms.getString();
            if (parseInt(lbRooms) >= 50){
                lbRooms = 50;
            }
            this.parentNode.Label_myClub.setString(""+lbRooms);
        }
        this.cellBgBtn.setTouchEnabled(false);
        this.cellBgBtn.setBright(false);
        this.quanAnimate.visible = true;
        //请求这个俱乐部里的房间信息
    },

    updateIsOpenForbidJoinClub:function(bool){
        this.isForbidJoinClub = bool;
    },

    updateCreateRoomType:function(type){
        this.isOpenFastCreate = type;
    },

    updateIsLeaderPay:function(bool){
        this.isOpenLeaderPay = bool;
    },

    updateIsOpenCreateRoom:function(bool){
        this.isOpenCreateRoom = bool;
    },

    updateIsAutoCreateRoom:function(bool){
        this.isAutoCreateRoom = bool;
    },

    updateMemberNumber:function(newNum){
        if(newNum && this.clickId == ClickClubModel.getCurClubId()){
            this.lbMembers.setString(newNum + "");
        }
    },

    updateClubName:function(newName){
        //修改俱乐部名字
        if(newName){
            this.lableClubName.setString(newName + "");
        }
    },

    addMemberNumber:function(){
        var curNumber = this.lbMembers.getString();
        if(parseInt(curNumber) >= 0){
            var newNum = parseInt(curNumber) + 1;
            this.lbMembers.setString(newNum + "");
        }
    },

    fixShow:function(){
        this.cellBgBtn.setTouchEnabled(true);
        this.cellBgBtn.setBright(true);
        if (this.quanAnimate)
            this.quanAnimate.visible = false;
    },

    getGroupId:function(){
        return this.clickId;
    },

    setData:function(itemData){
        //cc.log("itemData..." , JSON.stringify(itemData));
        //俱乐部号+人数
        this.clickId = itemData.groupId;
        this.keyId = itemData.groupKeyId;
        this.groupName = itemData.groupName;
        this.userRole = itemData.userRole;
        this.userTeamId = itemData.userGroup;
        this.extMsg = {};
        if(itemData.extMsg){
            this.extMsg = JSON.parse(itemData.extMsg);
        }
        this.isOpenLeaderPay = 0;//默认是关闭的
        this.isOpenCreateRoom = 1;//默认是开启的
        this.isOpenFastCreate = 1;//默认是开启的 快速创房
        this.isAutoCreateRoom = 0;//默认是关闭的  智能开房
        this.ksppCount = 0; //开启快速匹配的人数，0是关闭
        this.isForbidJoinClub = (this.groupMode == 1); //0 可邀请可申请 1只可邀请其他玩家 拒绝申请加入
        this.isBanVoiceAndProps = 0;
        if(this.extMsg.pc != null){
            this.isOpenLeaderPay = (this.extMsg.pc == "+p3"); //+p3 开启 -p3关闭
        }
        if(this.extMsg.cr != null){
            this.isOpenCreateRoom = (this.extMsg.cr == "+r"); //+r 开启 -r关闭 别喷前段 我也不知道老李为什么要这么定
            //cc.log("this.isOpenCreateRoom..." , this.isOpenCreateRoom);
        }
        if(this.extMsg.oq != null){
            this.isOpenFastCreate = (this.extMsg.oq == "+q"); //+q 开启 -q关闭 别喷前段 我也不知道老李为什么要这么定
            //cc.log("this.isOpenFastCreate..." , this.isOpenFastCreate);
        }

        if(this.extMsg.ac != null){
            this.isAutoCreateRoom = (this.extMsg.ac == "+a"); //+a 开启 -a关闭 别喷前段 我也不知道老李为什么要这么定
            //cc.log("this.isAutoCreateRoom..." , this.isAutoCreateRoom);
        }

        if(this.extMsg.chat != null){
            this.isBanVoiceAndProps = (this.extMsg.chat == "1"); //1 禁止 0 开启
            //cc.log("this.isAutoCreateRoom..." , this.isAutoCreateRoom);
        }

        if(this.extMsg.match != null){
            this.ksppCount = this.extMsg.match; //开启快速匹配的人数，0是关闭
            //cc.log("this.extMsg.match..." , this.extMsg.match);
        }


        //cc.log("this.extMsg..." , JSON.stringify(this.extMsg));
        var clubIdAndMenbers = itemData.groupId + " ( "+ itemData.currentCount + " )";
        this.lableClubName.setString(itemData.groupName);
        var tables = itemData.tables;
        if (parseInt(tables) >= 50){
            tables = 50;
        }
        //已开房间数量
        this.lbRooms.setString(tables + "");
        this.clubMemberNum = itemData.currentCount;
        var limitNum = itemData.currentCount;
        if (limitNum > this.limitNum){
            limitNum = this.limitNum;
        }
        this.lbMembers.setString(limitNum + "");
        this.showIcon(itemData.masterImg , 1);
        this.clubImgUrl = itemData.masterImg;

        this.clubRoomNum = tables;
        this.isOpenCredit = itemData.creditOpen || 0;
        this.creditAllotMode = itemData.creditAllotMode || 1;
        this.promoterLevel = itemData.promoterLevel || 0;
    },


    showIcon: function (iconUrl, sex) {
        //iconUrl = "http://wx.qlogo.cn/mmopen/25FRchib0VdkrX8DkibFVoO7jAQhMc9pbroy4P2iaROShWibjMFERmpzAKQFeEKCTdYKOQkV8kvqEW09mwaicohwiaxOKUGp3sKjc8/0";
        var url = iconUrl;
        //var icon = this.getWidget("icon_" + index);
        var icon = this.icon;
        var sex = sex || 1;
        var defaultimg = (sex == 1) ? "res/ui/dtz/images/default_m.png" : "res/ui/dtz/images/default_w.png";

        if(icon.curShowIconUrl == null || (icon.curShowIconUrl != iconUrl)){//头像不同才加载

            if (icon.getChildByTag(345)) {
                icon.removeChildByTag(345);
            }
            var sprite = new cc.Sprite(defaultimg);
            sprite.x = icon.width * 0.5;
            sprite.y = icon.height * 0.5;
            icon.addChild(sprite, 5, 345);
            if (iconUrl) {
                //this.parentNode.clubremoteImageLoadQueue.push(iconUrl, function (img) {
                //    sprite.setTexture(img);
                //    icon.curShowIconUrl = iconUrl;
                //});

                cc.loader.loadImg(iconUrl, {width: 252, height: 252}, function (error, img) {
                    if (!error) {
                        sprite.setTexture(img);
                        icon.curShowIconUrl = iconUrl
                    }
                });
            }
        }


    },
});

