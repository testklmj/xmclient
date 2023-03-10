/**
 * Created by Administrator on 2017/7/21.
 */

/**
 * 俱乐部战绩弹框
 */
var ClubRecordPop = BasePopup.extend({

    ctor:function(clubId,clubRole,clubName,parentNode){
        this.curClubId = clubId;
        this.curClubRole = clubRole;
        this.curClubName = clubName;
        this.parentNode = parentNode;
        this._super("res/clubRecordPop.json");
    },

    selfRender:function(){
        this.btnDtz = this.getWidget("btnDtz");
        this.btnPdk = this.getWidget("btnPdk");
        this.btnPhz = this.getWidget("btnPhz");
        this.btnBbt = this.getWidget("btnBbt");
        //转让群主
        UITools.addClickEvent(this.btnDtz, this , this.onDtzRecord);
        //踢出成员
        UITools.addClickEvent(this.btnPdk, this , this.onPdkRecord);
        //转让群主
        UITools.addClickEvent(this.btnPhz, this , this.onPhzRecord);
        //转让群主
        UITools.addClickEvent(this.btnBbt, this , this.onBbtRecord);

    },

    onDtzRecord:function(){
        this.wanfaList = "113,114,115,116,117,118";
        PlayerModel.checkRecordType = 8;
        this.onGetRecord();
        PopupManager.remove(this);
    },

    onPdkRecord:function(){
        this.wanfaList = "15,16";
        PlayerModel.checkRecordType = 1;
        this.onGetRecord();
        PopupManager.remove(this);
    },

    onPhzRecord:function(){
        this.wanfaList = "32,33";
        PlayerModel.checkRecordType = 4;
        this.onGetRecord();
        PopupManager.remove(this);
    },

    onBbtRecord:function(){
        this.wanfaList = "131";
        PlayerModel.checkRecordType = 10;
        this.onGetRecord();
        PopupManager.remove(this);
    },


    onGetRecord:function(){
        if(this.curClubId == 0){
            FloatLabelUtil.comText("当前未选择亲友圈");
            return;
        }

        var tall = "";
        if(this.curClubRole == 0 || this.curClubRole == 1){
            tall = "all";
        }

        var self = this;
        NetworkJT.loginReq("groupAction", "loadTableLogs", {wanfas:this.wanfaList ,groupId:this.curClubId , oUserId:PlayerModel.userId , all : tall}, function (data) {
            if (data) {
                //点击详情需要的参数groupId oUserId all logId
                var tableLogs = data.tableLogs;
                //infoList.all = tall;
                cc.log("loadTableLogs::"+JSON.stringify(data));
                cc.log("tableLogs::"+JSON.stringify(tableLogs));
                var mc = new DTZTotalRecordPop(data,false,tableLogs);
                TotalRecordModel.init(data);
                PopupManager.addPopup(mc);
            }
        }, function (data) {
            cc.log("onShowZJ::"+JSON.stringify(data));
            FloatLabelUtil.comText(data.message);
        });
    },


});


/**
 * 俱乐部修 改名字弹框
 */
var ClubAmendNamePop = BasePopup.extend({

    ctor:function(clubId , homePanel){
        this.curClubId = clubId;
        this.homePanel = homePanel;
        this._super("res/clubAmendNamePop.json");
    },

    selfRender:function(){
        this.btnTrue = this.getWidget("btnTrue");
        var leaderName = this.getWidget("leaderName");
        UITools.addClickEvent(this.btnTrue, this , this.onTrue);

        var inputIdImg = this.getWidget("inputBg");
        this.inputId = new cc.EditBox(cc.size(244, 44),new cc.Scale9Sprite("res/ui/dtzjulebu/julebu/inputBg.png"));
        this.inputId.setString("");
        this.inputId.x = inputIdImg.width/2;
        this.inputId.y = inputIdImg.height/2;
        this.inputId.setFontColor(cc.color("FFFFFF"));
        this.inputId.setDelegate(this);
        this.inputId.setFont("Arial",26);
        this.inputId.setMaxLength(30);
        this.inputId.setPlaceHolder("输入群名字");
        this.inputId.setPlaceholderFont("Arial" , 26);
        inputIdImg.addChild(this.inputId,0);
    },

    onTrue:function(){
        var name = this.inputId.getString();
        var self =  this;
        if(name){
            NetworkJT.loginReq("groupAction", "updateGroupInfo", {groupName:name,keyId:ClickClubModel.getCurClubKeyId(),userId:PlayerModel.userId  ,subId:0}, function (data) {
                if (data) {
                    cc.log("updateGroupInfo::"+JSON.stringify(data));
                    FloatLabelUtil.comText("修改成功");
                    if(self.homePanel && ClickClubModel.getCurClubItem()){
                        ClickClubModel.getCurClubItem().updateClubName(name);
                    }
                    PopupManager.remove(self);
                }
            }, function (data) {
                FloatLabelUtil.comText(data.message);
                //PopupManager.remove(self);
            });
        }else{
            FloatLabelUtil.comText("请输入正确的群名");
        }


    },
});


/**
 * 俱乐部修改包厢名字
 */
var ClubBagNamePop = BasePopup.extend({

    ctor:function(modeId , subId){
        this.modeId = modeId;
        this.subId = subId;
        this._super("res/clubAmendNamePop.json");
    },

    selfRender:function(){
        this.btnTrue = this.getWidget("btnTrue");
        var leaderName = this.getWidget("leaderName");
        leaderName.setString("包厢名");
        UITools.addClickEvent(this.btnTrue, this , this.onTrue);

        var inputIdImg = this.getWidget("inputBg");
        this.inputId = new cc.EditBox(cc.size(244, 44),new cc.Scale9Sprite("res/ui/dtzjulebu/julebu/inputBg.png"));
        this.inputId.setString("");
        this.inputId.x = inputIdImg.width/2;
        this.inputId.y = inputIdImg.height/2;
        this.inputId.setFontColor(cc.color("7D2E00"));
        this.inputId.setDelegate(this);
        this.inputId.setFont("Arial",26);
        this.inputId.setMaxLength(30);
        this.inputId.setPlaceHolder("输入包厢名字");
        this.inputId.setPlaceholderFont("Arial" , 26);
        inputIdImg.addChild(this.inputId,0);
    },

    onTrue:function(){
        var name = this.inputId.getString();
        var self =  this;
        cc.log("self.modeId=="+self.modeId);
        if(name){
            NetworkJT.loginReq("groupAction", "updateGroupInfo", {groupName: name,groupMode:0,
                keyId:self.modeId,groupId:ClickClubModel.clickClubId,
                userId:PlayerModel.userId,subId:self.subId}, function (data) {
                if (data) {
                    var index = -1;
                    ComReq.comReqGetClubRoomsData([ClickClubModel.getCurClubId(), 1, 100, 1, 1],["" + index ]);
                    PopupManager.remove(self);
                    FloatLabelUtil.comText("修改包厢名称成功");
                }
            }, function (data) {
                //cc.log("onTrue::"+JSON.stringify(data));
                FloatLabelUtil.comText(data.message);
            });
        }else{
            FloatLabelUtil.comText("请输入正确的包厢名");
        }


    },
});


/**
 成员弹框
 */
var ClubMemberOpPop = BasePopup.extend({
    ctor:function(opData,parenNode){
        this.opUserId = opData.userId;
        this.opGroupId = opData.groupId;
        this.isForbid = opData.userLevel; //0禁止成员游戏  大于是允许成员游戏

        this.parentNode = parenNode;
        this._super("res/clubmemberOpPop.json");//zqHome
    },

    selfRender:function(){
        this.btnGiveLeader = this.getWidget("btnGiveLeader");
        this.btnDelete = this.getWidget("btnDelete");
        this.btnUp = this.getWidget("btnUp");
        this.btnDown = this.getWidget("btnDown");
        this.btnForbid = this.getWidget("btnForbid");

        cc.log("this.isForbid::"+this.isForbid);
        if (this.isForbid){
            this.btnForbid.loadTextureNormal("res/ui/dtzjulebu/julebu/btnForbid.png");
        }else{
            this.btnForbid.loadTextureNormal("res/ui/dtzjulebu/julebu/btnnotForbid.png");
        }
        this.mainPopup = this.getWidget("mainPopup");
        //转让群主
        UITools.addClickEvent(this.btnGiveLeader, this , this.onGiveLeader);
        //踢出成员
        UITools.addClickEvent(this.btnDelete, this , this.onDeleteIt);
        //晋升
        UITools.addClickEvent(this.btnUp, this , this.onUpMember);
        //降级
        UITools.addClickEvent(this.btnDown, this , this.onDownMmber);
        //禁止成员
        UITools.addClickEvent(this.btnForbid, this , this.onForbid);
    },

    onGiveLeader:function(){
        var self = this;
        if(this.opUserId == PlayerModel.userId){
            FloatLabelUtil.comText("不可对自己操作");
            return;
        }

        AlertPop.show("确定将亲友圈转让给其他成员吗？",function() {
            NetworkJT.loginReq("groupAction", "updateGroupUser", {oUserId:self.opUserId ,mUserId:PlayerModel.userId,userRole:0,groupId:self.opGroupId}, function (data) {
                if (data) {
                    cc.log("updateGroupUser::"+JSON.stringify(data));
                    FloatLabelUtil.comText(data.message);
                    //调用父节点的刷新
                    if(self.parentNode){
                        self.parentNode.getClubMenberListData();
                    }
                }
            }, function (data) {
                cc.log("updateGroupUser::"+JSON.stringify(data));
                FloatLabelUtil.comText(data.message);
            });
        })
    },

    onDeleteIt:function(){
        var self = this;
        if(this.opUserId == PlayerModel.userId){
            FloatLabelUtil.comText("不可对自己操作");
            return;
        }

        AlertPop.show("确定删除该成员吗？",function() {
            NetworkJT.loginReq("groupAction", "fire", {oUserId:self.opUserId ,mUserId:PlayerModel.userId,groupId:self.opGroupId}, function (data) {
                if (data) {
                    cc.log("fire::"+JSON.stringify(data));
                    FloatLabelUtil.comText(data.message);
                    //调用父节点的刷新
                    if(self.parentNode){
                        self.parentNode.getClubMenberListData();
                    }
                }
            }, function (data) {
                cc.log("fire::"+JSON.stringify(data));
                FloatLabelUtil.comText(data.message);
            });
        });

    },

    onUpMember:function(){
        var self = this;
        if(this.opUserId == PlayerModel.userId){
            FloatLabelUtil.comText("不可对自己操作");
            return;
        }

        AlertPop.show("晋升后将获得以下权限：一键创建多个房间、审批加入申请、删除成员，确定操作吗？",function() {
            NetworkJT.loginReq("groupAction", "updateGroupUser", {oUserId:self.opUserId ,mUserId:PlayerModel.userId,userRole:1,groupId:self.opGroupId}, function (data) {
                if (data) {
                    cc.log("updateGroupUser::"+JSON.stringify(data));
                    FloatLabelUtil.comText(data.message);
                    //调用父节点的刷新
                    if(self.parentNode){
                        self.parentNode.getClubMenberListData();
                    }
                }
            }, function (data) {
                cc.log("updateGroupUser::"+JSON.stringify(data));
                FloatLabelUtil.comText(data.message);
            });
        });

    },

    onDownMmber:function(){
        var self = this;
        if(this.opUserId == PlayerModel.userId){
            FloatLabelUtil.comText("不可对自己操作");
            return;
        }

        AlertPop.show("降级后该成员将失去多个重要权限，确定操作吗？",function() {
            NetworkJT.loginReq("groupAction", "updateGroupUser", {oUserId:self.opUserId ,mUserId:PlayerModel.userId,userRole:2,groupId:self.opGroupId}, function (data) {
                if (data) {
                    cc.log("updateGroupUser::"+JSON.stringify(data));
                    FloatLabelUtil.comText(data.message);
                    //调用父节点的刷新
                    if(self.parentNode){
                        self.parentNode.getClubMenberListData();
                    }
                }
            }, function (data) {
                cc.log("updateGroupUser::"+JSON.stringify(data));
                FloatLabelUtil.comText(data.message);
            });
        });

    },


    onForbid:function(){
        var self = this;
        if(this.opUserId == PlayerModel.userId){
            FloatLabelUtil.comText("不可对自己操作");
            return;
        }
        //userState(0禁止游戏，1可以游戏)
        var userState = 1;
        var desc = "确定解除禁止该成员在本亲友圈中进行游戏吗？";
        if (this.isForbid){
            desc = "确定禁止该成员在本亲友圈中进行游戏吗？";
            userState = 0;
        }


        AlertPop.show(desc,function() {
            NetworkJT.loginReq("groupAction", "updateGroupUser", {oUserId:self.opUserId ,mUserId:PlayerModel.userId,userState:userState,groupId:self.opGroupId}, function (data) {
                if (data) {
                    //cc.log("updateGroupUser::"+JSON.stringify(data));
                    if (self.isForbid){
                        self.btnForbid.loadTextureNormal("res/ui/dtzjulebu/julebu/btnnotForbid.png");
                    }else{
                        self.btnForbid.loadTextureNormal("res/ui/dtzjulebu/julebu/btnForbid.png");
                    }
                    FloatLabelUtil.comText(data.message);
                    //调用父节点的刷新
                    if(self.parentNode){
                        self.parentNode.getClubMenberListData();
                    }
                    PopupManager.remove(self);
                }
            }, function (data) {
                cc.log("updateGroupUser::"+JSON.stringify(data));
                FloatLabelUtil.comText(data.message);
                PopupManager.remove(self);
            });
        });

    },

});

/**
 创建俱乐部弹框
 */
var CreateClubPop = BasePopup.extend({
    ctor:function(homePanel){
        this.homePanel = homePanel;
        this._super("res/createJulebuPop.json");//zqHome
    },

    selfRender:function(){
        var btnCreate = this.getWidget("btnCreate");
        btnCreate.visible = false;
        var btnJoin = this.getWidget("btnJoin");
        var btnInviteMessage = this.getWidget("btnInvite");
        if(btnCreate && btnJoin && btnInviteMessage){
            UITools.addClickEvent(btnCreate,this,this.onCreateClub);
            UITools.addClickEvent(btnJoin , this , this.onJoinClub);
            UITools.addClickEvent(btnInviteMessage , this , this.showMessageList);
        }

        this.msgRedPoint = this.getWidget("redPoint");
        this.msgRedPoint.visible = false;
        this.showRedPoint();

    },

    onCreateClub:function(){
        if(this.homePanel){
            this.homePanel.clubListView.visible = false;
            this.homePanel.JoinPanel.visible = false;
            this.homePanel.CreatePanel.visible = true;
            this.homePanel.onRevealShowLeft();
        }
        PopupManager.remove(this);
    },

    onJoinClub:function(){
        if(this.homePanel){
            this.homePanel.clubListView.visible = false;
            this.homePanel.CreatePanel.visible = false;
            this.homePanel.JoinPanel.visible = true;
            this.homePanel.onRevealShowLeft();
        }
        PopupManager.remove(this);
    },

    showMessageList:function(){
        //if(ClickClubModel.getCurClubId() == 0){
        //    FloatLabelUtil.comText("当前未选择亲友圈");
        //    return;
        //}
        var mc = new ClubMessagePop(this);
        PopupManager.addPopup(mc);
        PopupManager.remove(this);
    },

    showRedPoint:function(){
        var self = this;
        NetworkJT.loginReq("groupAction", "groudReadPiont", {oUserId:PlayerModel.userId}, function (data) {
            if (data) {
                if (data.message && data.message.inviteReadPoint){
                    self.msgRedPoint.visible = true;
                }
            }
        }, function (data) {
            FloatLabelUtil.comText(data.message);
        });
    },

});

/**
 * 管理成员弹框
 */
var MemberPop = BasePopup.extend({
    ctor:function(homePanel){
        this.homePanel = homePanel;
        this._super("res/clubMemberPop.json");//zqHome
    },

    selfRender:function(){
        this.curPage = 1;
        this.maxPage = 1;
        this.limitPage = 100;//最大成员数目（100页 500人）
        this.membegImgLoad = new RemoteImageLoadQueue();
        this.menberListView = this.getWidget("menberListView");

        this.scheduleUpdate();
        this.membegImgLoad.stopLoad();
        cc.log("MemberPop 启动定时器...");

        var inputIdImg = this.getWidget("inputBg");
        var btnNext = this.getWidget("btnRight");
        var btnFront = this.getWidget("btnLeft");
        var btnSearch = this.getWidget("localUser");
        this.pageDesc = this.getWidget("pageDesc");
        if(btnNext && btnFront && btnSearch){
            UITools.addClickEvent(btnNext , this , this.nextPage);
            UITools.addClickEvent(btnFront , this , this.frontPage);
            UITools.addClickEvent(btnSearch , this , this.localUser);
        }

        //初始化两个输入框
        this.inputId = new cc.EditBox(cc.size(234, 44),new cc.Scale9Sprite("res/ui/dtzjulebu/julebu/inputBg.png"));
        this.inputId.setString("");
        this.inputId.x = inputIdImg.width/2;
        this.inputId.y = inputIdImg.height/2;
        this.inputId.setFontColor(cc.color("efd9b9"));
        this.inputId.setDelegate(this);
        this.inputId.setFont("Arial",26);
        this.inputId.setMaxLength(30);
        this.inputId.setPlaceHolder("成员ID或名字");
        this.inputId.setPlaceholderFont("Arial" , 26);
        this.inputId.setPlaceholderFontColor(cc.color(239,217,185));//230 218 207

        inputIdImg.addChild(this.inputId,0);

        this.getClubMenberListData(1);

    },

    update: function(dt) {
        this.membegImgLoad.update(dt);
    },

    onClose:function(){
        cc.log("MemberPop 关闭定时器...");
        this.membegImgLoad.stopLoad();
        this.unscheduleUpdate();
        this._super();
    },

    /**
     * 获取成员信息
     */
    getClubMenberListData:function(curPage , searchNameOrId){
        var curPage = curPage || 1;
        var searchNameOrId = searchNameOrId || "";
        this.membegImgLoad.stopLoad();
        var self = this;
        NetworkJT.loginReq("groupAction", "loadGroupUsers", {
            groupId:ClickClubModel.getCurClubId(),
            pageNo:curPage,pageSize:5,
            keyWord:searchNameOrId,
            userId:PlayerModel.userId,
            sessCode:PlayerModel.sessCode,
        }, function (data) {
            if (data) {
                //cc.log("loadGroupUsers::"+JSON.stringify(data));
                if(self){
                    self.curPage = curPage;
                    self.maxPage = data.message.pages || 1;
                    if (self.maxPage > self.limitPage){
                        self.maxPage =  self.limitPage;
                    }
                    if (self.pageDesc){
                        self.pageDesc.setString(self.curPage + "/" + self.maxPage);//loadGroupUsers::
                    }
                    self.refreshMemberList(data.message.list);
                }

            }
        }, function (data) {
            //cc.log("getClubListData::"+JSON.stringify(data));
            FloatLabelUtil.comText(data.message);
        });
    },

    nextPage:function(){
        var curNameOrUserId = this.inputId.getString();
        var curPage = Math.min(this.curPage + 1 , this.maxPage);
        cc.log("获取下一页数据" , curPage , this.maxPage);
        if(curPage == this.curPage || curPage > this.limitPage){
            return;
        }
        this.getClubMenberListData(curPage,curNameOrUserId)
    },

    frontPage:function(){
        var curNameOrUserId = this.inputId.getString();
        var curPage = Math.max(this.curPage - 1 , 1);
        cc.log("获取上一页数据" , curPage , this.maxPage);
        if(curPage == this.curPage){
            return;
        }
        this.getClubMenberListData(curPage,curNameOrUserId);
    },

    localUser:function(){
        var curPage = 1;
        var curNameOrUserId = this.inputId.getString();
        this.getClubMenberListData(curPage , curNameOrUserId);


    },

    refreshMemberList:function(menberDataList){
        if(this.menberListView){
            this.menberListView.removeAllChildren();
        }

        if(!menberDataList){
            //cc.log("获取俱乐部成员数据失败...");
            return;
        }

        this.menberListView.visible = (menberDataList.length > 0);
        for(var index = 0 ; index < menberDataList.length; index++){
            var memberItem = new MemberItem(menberDataList[index] , this );
            this.menberListView.pushBackCustomItem(memberItem);
        }

    },

});

/**
 * 俱乐部消息弹框
 */
var MessagePop = BasePopup.extend({
    ctor:function(homePanel){
        this.homePanel = homePanel;
        this.userRole = ClickClubModel.getCurClubRole();
        cc.log("userRole .." , ClickClubModel.getCurClubRole());
        this._super("res/clubmessagePop.json");//zqHome
    },

    selfRender:function(){
        this.messageListView = this.getWidget("messageListView");
        this.noMsg = this.getWidget("noMsg");
        this.btnForbidJoinMsg = this.getWidget("btnForbidJoin");
        this.getClubMessageListData();

        if(this.btnForbidJoinMsg && this.getWidget("labelDesc")){
            this.btnForbidJoinMsg.visible = false;
            this.getWidget("labelDesc").visible = false;
        }
        //(this.userRole == 0);
        //
        //if(this.btnForbidJoinMsg && (this.userRole == 0)){
        //    this.btnForbidJoinMsg.setBright(this.homePanel.isForbidJoinClub);
        //    UITools.addClickEvent(this.btnForbidJoinMsg , this , this.onChangeInviteMode);
        //}
    },

    /**
     * 修改是否接受申请的开关
     */
    onChangeInviteMode:function(){
        var newState = 0;
        if(ClickClubModel.getClubIsOpenForbidJoinClub()){
            newState = 0;
        }else{
            newState = 1;
        }
        cc.log("onChangeInviteMode::" , newState);
        var self = this;
        NetworkJT.loginReq("groupAction", "updateGroupInfo", {
                keyId:ClickClubModel.getCurClubKeyId() ,userId:PlayerModel.userId , groupMode:newState},
            function (data) {
                if (data) {
                    cc.log("updateGroupInfo::"+JSON.stringify(data));
                    //ClickClubModel.updateIsOpenForbidJoinClub(newState);
                    ClickClubModel.updateIsOpenForbidJoinClub();
                    self.btnForbidJoinMsg.setBright(ClickClubModel.getClubIsOpenForbidJoinClub());
                    if(newState == 0){
                        FloatLabelUtil.comText("关闭禁止玩家申请成功");
                    }else{
                        FloatLabelUtil.comText("开启禁止玩家申请成功");
                    }

                }
            }, function (data) {
                cc.log("updateGroupInfo::"+JSON.stringify(data));
                var desc = "修改失败";
                if(data.message){
                    desc = data.message;
                }
                FloatLabelUtil.comText(desc);

            });

    },

    /**
     * 获取成员信息
     */
    getClubMessageListData:function(){
        var self = this;
        //这协议定的我醉了 身份是0或者1(管理员或者群主)传1给后台 身份是2 传0给后台。我就不能传身份给你么？！
        NetworkJT.loginReq("groupAction", "searchGroupReview", {
                groupId:ClickClubModel.getCurClubId() ,
                msgType:1 ,
                userId:PlayerModel.userId},
            function (data) {
                if (data) {
                    cc.log("searchGroupReview::"+JSON.stringify(data));

                    self.refeshMessageList(data.message);
                }
            }, function (data) {
                cc.log("searchGroupReview::"+JSON.stringify(data));
                FloatLabelUtil.comText(data.message);
            });
    },

    refeshMessageList:function(menberDataList){

        if(this.messageListView){
            this.messageListView.removeAllChildren();
        }

        if(!menberDataList){
            //cc.log("获取俱乐部成员数据失败...");
            this.noMsg.visible = true;
            return;
        }

        if(this.noMsg){
            this.noMsg.visible = (menberDataList.length == 0);
        }


        for(var index = 0 ; index < menberDataList.length; index++){
            var messageItem = new MessageItem(menberDataList[index] , this , this.homePanel);
            this.messageListView.pushBackCustomItem(messageItem);
        }

    },

    showIcon: function (iconUrl, sex) {
        //iconUrl = "http://wx.qlogo.cn/mmopen/25FRchib0VdkrX8DkibFVoO7jAQhMc9pbroy4P2iaROShWibjMFERmpzAKQFeEKCTdYKOQkV8kvqEW09mwaicohwiaxOKUGp3sKjc8/0";
        var url = iconUrl;
        var icon = this.icon;
        var sex = sex || 1;
        var defaultimg = (sex == 1) ? "res/ui/dtz/images/default_m.png" : "res/ui/dtz/images/default_w.png";

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
                    sprite.setTexture(img);
                }
            });
        }
    },

});

/**
 * 俱乐部消息弹框
 */
var ClubMessagePop = BasePopup.extend({
    ctor:function(homePanel){
        this.homePanel = homePanel;
        this.userRole = ClickClubModel.getCurClubRole();
        cc.log("userRole .." , ClickClubModel.getCurClubRole());
        this._super("res/clubMessageBigPop.json");//zqHome
    },

    selfRender:function(){
        this.messageListView = this.getWidget("messageListView");
        this.noMsg = this.getWidget("noMsg");
        this.btnForbidJoinMsg = this.getWidget("btnForbidJoin");
        this.getClubMessageListData();

        if(this.btnForbidJoinMsg && this.getWidget("labelDesc")){
            this.btnForbidJoinMsg.visible = false;
            this.getWidget("labelDesc").visible = false;
        }
        this.noMsg.setString("暂无消息");
    },

    /**
     * 修改是否接受申请的开关
     */
    onChangeInviteMode:function(){
        var newState = 0;
        if(ClickClubModel.getClubIsOpenForbidJoinClub()){
            newState = 0;
        }else{
            newState = 1;
        }
        cc.log("onChangeInviteMode::" , newState);
        var self = this;
        NetworkJT.loginReq("groupAction", "updateGroupInfo", {
                keyId:ClickClubModel.getCurClubKeyId() ,userId:PlayerModel.userId , groupMode:newState},
            function (data) {
                if (data) {
                    cc.log("updateGroupInfo::"+JSON.stringify(data));
                    //ClickClubModel.updateIsOpenForbidJoinClub(newState);
                    ClickClubModel.updateIsOpenForbidJoinClub();
                    self.btnForbidJoinMsg.setBright(ClickClubModel.getClubIsOpenForbidJoinClub());
                    if(newState == 0){
                        FloatLabelUtil.comText("关闭禁止玩家申请成功");
                    }else{
                        FloatLabelUtil.comText("开启禁止玩家申请成功");
                    }

                }
            }, function (data) {
                cc.log("updateGroupInfo::"+JSON.stringify(data));
                var desc = "修改失败";
                if(data.message){
                    desc = data.message;
                }
                FloatLabelUtil.comText(desc);

            });

    },

    /**
     * 获取成员信息
     */
    getClubMessageListData:function(){
        var self = this;
        //这协议定的我醉了 身份是0或者1(管理员或者群主)传1给后台 身份是2 传0给后台。我就不能传身份给你么？！
        NetworkJT.loginReq("groupAction", "searchGroupReview", {
                //groupId:ClickClubModel.getCurClubId() ,
                msgType:0,
                userId:PlayerModel.userId},
            function (data) {
                if (data) {
                    cc.log("searchGroupReview::"+JSON.stringify(data));
                    self.refeshMessageList(data);
                }
            }, function (data) {
                cc.log("searchGroupReview::"+JSON.stringify(data));
                FloatLabelUtil.comText(data.message);
            });
    },

    refeshMessageList:function(data){

        var menberDataList = data.message;
        var oData  = data.data;
        if(this.messageListView){
            this.messageListView.removeAllChildren();
        }

        if(!menberDataList){
            //cc.log("获取俱乐部成员数据失败...");
            this.noMsg.visible = true;
            return;
        }

        if(this.noMsg){
            this.noMsg.visible = (menberDataList.length == 0);
        }


        for(var index = 0 ; index < menberDataList.length; index++){
            var messageItem = new ClubMessageItem(menberDataList[index] , this , this.homePanel,oData[index]);
            this.messageListView.pushBackCustomItem(messageItem);
        }

    },

    showIcon: function (iconUrl, sex) {
        //iconUrl = "http://wx.qlogo.cn/mmopen/25FRchib0VdkrX8DkibFVoO7jAQhMc9pbroy4P2iaROShWibjMFERmpzAKQFeEKCTdYKOQkV8kvqEW09mwaicohwiaxOKUGp3sKjc8/0";
        var url = iconUrl;
        var icon = this.icon;
        var sex = sex || 1;
        var defaultimg = (sex == 1) ? "res/ui/dtz/images/default_m.png" : "res/ui/dtz/images/default_w.png";

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
                    sprite.setTexture(img);
                }
            });
        }
    },

});

var MemberItem = ccui.Widget.extend({

    ctor:function(data , parentNode){
        this.data = data;
        this.parentNode = parentNode;

        this._super();
        this.setContentSize(300, 100);

        var Panel_16=this.Panel_16= UICtor.cPanel(cc.size(730,68),cc.color(150,200,255),0);
        Panel_16.setAnchorPoint(cc.p(0,0));
        Panel_16.setPosition(0,0);
        var userName=this.userName= UICtor.cLabel("野狼教授阿什顿",26,cc.size(180,32),cc.color("8c9b51"),0,1);
        userName.setAnchorPoint(cc.p(0,0.5));
        userName.setPosition(100,70);
        Panel_16.addChild(userName);
        var userId=this.userId= UICtor.cLabel("UID:800800",26,cc.size(0,0),cc.color("759b48"),0,1);
        userId.setAnchorPoint(cc.p(0,0.5));
        userId.setPosition(100,27);
        Panel_16.addChild(userId);
        var icon=this.icon= UICtor.cImg("res/ui/dtz/images/default_m.png");
        icon.setPosition(45,46);
        Panel_16.addChild(icon);
        var titleImg=this.titleImg= UICtor.cImg("res/ui/dtzjulebu/julebu/titleImg1.png");
        titleImg.setPosition(cc.p(-19+icon.getAnchorPointInPoints().x, 22+icon.getAnchorPointInPoints().y));
        icon.addChild(titleImg);
        var line=this.line= UICtor.cImg("res/ui/dtzjulebu/julebu/memberLine.png");
        line.setPosition(152,99);
        Panel_16.addChild(line);
        var btnOpenOpView=this.btnOpenOpView= UICtor.cBtn("res/ui/dtzjulebu/julebu/btnOpenView.png");
        btnOpenOpView.setPosition(275,46);
        Panel_16.addChild(btnOpenOpView);
        var opView=this.opView= UICtor.cImg("res/ui/dtzjulebu/julebu/viewBg.png");
        opView.setPosition(212,-108);
        opView.setLocalZOrder(10);
        Panel_16.addChild(opView);
        var btnGiveLeader=this.btnGiveLeader= UICtor.cBtn("res/ui/dtzjulebu/julebu/btnTransferLeader.png");
        btnGiveLeader.setPosition(cc.p(0+opView.getAnchorPointInPoints().x, 82+opView.getAnchorPointInPoints().y));
        opView.addChild(btnGiveLeader);
        var btnUp=this.btnUp= UICtor.cBtn("res/ui/dtzjulebu/julebu/btnUp.png");
        btnUp.setPosition(cc.p(-12+opView.getAnchorPointInPoints().x, 28+opView.getAnchorPointInPoints().y));
        opView.addChild(btnUp);
        var btnDown=this.btnDown= UICtor.cBtn("res/ui/dtzjulebu/julebu/btnDown.png");
        btnDown.setPosition(cc.p(-13+opView.getAnchorPointInPoints().x, -29+opView.getAnchorPointInPoints().y));
        opView.addChild(btnDown);
        var btnDelete=this.btnDelete= UICtor.cBtn("res/ui/dtzjulebu/julebu/btndelete.png");
        btnDelete.setPosition(cc.p(0+opView.getAnchorPointInPoints().x, -87+opView.getAnchorPointInPoints().y));
        opView.addChild(btnDelete);

        //禁止游戏
        var forbidImg=this.forbidImg= UICtor.cImg("res/ui/dtzjulebu/julebu/img_forbid.png");
        forbidImg.setPosition(cc.p(25+icon.getAnchorPointInPoints().x, 25+icon.getAnchorPointInPoints().y));
        icon.addChild(forbidImg,10);
        forbidImg.visible = false;

        //在线
        var onLineImg=this.onLineImg= UICtor.cImg("res/ui/dtzjulebu/julebu/img_zaixian.png");
        onLineImg.setPosition(cc.p(icon.getAnchorPointInPoints().x, -29+icon.getAnchorPointInPoints().y));
        icon.addChild(onLineImg,10);
        onLineImg.visible = true;

        //离线
        var outLineImg=this.outLineImg= UICtor.cImg("res/ui/dtzjulebu/julebu/img_lixian.png");
        outLineImg.setPosition(cc.p(icon.getAnchorPointInPoints().x, -29+icon.getAnchorPointInPoints().y));
        icon.addChild(outLineImg,10);
        outLineImg.visible = false;

        //线
        var xianImg=this.xianImg= UICtor.cImg("res/ui/dtzjulebu/julebu/img_xian9.png");
        xianImg.setPosition(cc.p(100 + icon.getAnchorPointInPoints().x, -50+icon.getAnchorPointInPoints().y));
        icon.addChild(xianImg,10);


        this.titleImg.setLocalZOrder(6);
        UITools.addClickEvent(this.btnOpenOpView, this , this.onOpenOpView);

        UITools.addClickEvent(this.Panel_16, this, this.onClick);

        this.opView.visible = false;
        this.addChild(Panel_16);
        //添加点击事件

        //刷新俱乐部显示
        this.setData(this.data);
    },

    onOpenOpView:function(){
        if(this.parentNode.menberListView.getChildByTag(1314)){
            cc.log("已经添加弹出框...");
            this.parentNode.menberListView.getChildByTag(1314).removeFromParent(true);
        }else{
            var mc = new ClubMemberOpPop(this.data , this.parentNode);
            mc.setTag(1314);
            var offY = this.parentNode.menberListView.getInnerContainer().getPositionY();
            var posY = Math.max(this.getPositionY() + offY - 85 , 175); //

            cc.log("this.getPositionY()..." , offY ,this.getPositionY() , posY);
            mc.mainPopup.setPosition(this.getPositionX()+993, posY);
            PopupManager.addPopup(mc);
        }

        //this.opView.visible = !this.opView.visible;
    },


    setData:function(data){
        this.userName.setString(this.data.userName);
        var idStr = this.data.userId;
        if (this.data.hideId){
            idStr = this.dealUserId(this.data.userId);
        }

        this.userLevel = this.data.userRole;//玩家等级 0 群主 1 管理员 2 普通人员
        if(this.userLevel == 0){
            if (ClickClubModel.getCurClubRole() == 2){
                idStr = this.dealUserId(this.data.userId);
            }
            this.titleImg.loadTexture("res/ui/dtzjulebu/julebu/titleImg0.png");//替换
        }else if(this.userLevel == 1){
            this.titleImg.loadTexture("res/ui/dtzjulebu/julebu/titleImg1.png")
        }else{
            this.titleImg.visible = false;
        }
        this.userId.setString("ID:"+idStr);
        this.isGame = this.data.userLevel;//禁止游戏 // 0 禁止 1 允许
        if (this.isGame){
            this.forbidImg.visible = false;
        }else{
            this.forbidImg.visible = true;
        }
        // 0 离线 1 在线
        this.isOnLine = this.data.isOnLine;
        if(this.isOnLine){
            this.onLineImg.visible = true;
            this.outLineImg.visible = false;
        }else{
            this.onLineImg.visible = false;
            this.outLineImg.visible = true;
        }
        //this.userId.setString("ID:" + this.data.userId);
        //this.groupName = this.data.groupName;//俱乐部名字;
        this.showIcon(this.data.headimgurl , 1);
    },

    showIcon: function (iconUrl, sex) {
        //iconUrl = "http://wx.qlogo.cn/mmopen/25FRchib0VdkrX8DkibFVoO7jAQhMc9pbroy4P2iaROShWibjMFERmpzAKQFeEKCTdYKOQkV8kvqEW09mwaicohwiaxOKUGp3sKjc8/0";
        var url = iconUrl;
        var icon = this.icon;
        var sex = sex || 1;
        var defaultimg = (sex == 1) ? "res/ui/dtz/images/default_m.png" : "res/ui/dtz/images/default_w.png";

        if (icon.getChildByTag(345)) {
            icon.removeChildByTag(345);
        }

        var sprite = new cc.Sprite(defaultimg);
        sprite.x = icon.width * 0.5;
        sprite.y = icon.height * 0.5;
        icon.addChild(sprite, 5, 345);
        if (iconUrl) {
            this.parentNode.membegImgLoad.push(iconUrl, function (img) {
                sprite.setTexture(img);
            });

            //cc.loader.loadImg(iconUrl, {width: 252, height: 252}, function (error, img) {
            //    if (!error) {
            //        sprite.setTexture(img);
            //    }
            //});
        }
    },

    dealUserId: function (id) {
        var idStr = id.toString();
        var str = "";
        for(var i=0;i < idStr.length;i++){
            if (i == 0 || i == idStr.length -1){
                str = str + idStr[i];
            }else{
                str = str + "*";
            }
        }
        //cc.log("dealUserId",str);
        return str;
    },

});

var MessageItem = ccui.Widget.extend({
    ctor:function(data , parentNode , homePanel){
        this.data = data;
        this.parentNode = parentNode;
        this.homePanel = homePanel;
        this.messageKeyId = this.data.keyId;
        this._super();
        this.setContentSize(560, 90);

        var Panel_16=this.Panel_16= UICtor.cPanel(cc.size(560,90),cc.color(150,200,255),0);
        Panel_16.setAnchorPoint(cc.p(0,0));
        Panel_16.setPosition(0,0);
        var userName=this.userName= UICtor.cLabel("野狼教授阿什顿",26,cc.size(190,36),cc.color(155,107,72),0,1);
        userName.setAnchorPoint(cc.p(0,0.5));
        userName.setPosition(70,68);
        Panel_16.addChild(userName);
        var userId=this.userId= UICtor.cLabel("UID:800800",26,cc.size(0,0),cc.color(155,107,72),0,1);
        userId.setAnchorPoint(cc.p(0,0.5));
        userId.setPosition(70,26);
        Panel_16.addChild(userId);
        var icon=this.icon= UICtor.cImg("res/ui/dtz/images/default_m.png");
        icon.setPosition(33,46);
        Panel_16.addChild(icon);
        var Button_5=this.Button_5= UICtor.cBtn("res/ui/dtzjulebu/julebu/btnFuckU.png");
        Button_5.setPosition(272,42);
        Panel_16.addChild(Button_5);
        var Button_6=this.Button_6= UICtor.cBtn("res/ui/dtzjulebu/julebu/btnRefuse.png");
        Button_6.setPosition(331,39);
        Panel_16.addChild(Button_6);
        var Button_7=this.Button_7= UICtor.cBtn("res/ui/dtzjulebu/julebu/btnAgree.png");
        Button_7.setPosition(478,39);
        Panel_16.addChild(Button_7);
        var Image_10=this.Image_10= UICtor.cImg("res/ui/dtzjulebu/julebu/msgLine.png");
        Image_10.setPosition(278,4);
        Panel_16.addChild(Image_10);


        this.addChild(Panel_16);
        //添加点击事件
        UITools.addClickEvent(this.Panel_16, this, this.onClick);

        if(this.icon){
            this.icon.scale = 0.8;
        }
        this.Button_5.visible = false;//暂时废弃
        UITools.addClickEvent(this.Button_6, this, this.onRefuse);
        UITools.addClickEvent(this.Button_7, this, this.onAgress);
        //Button_7
        this.setData(this.data);
    },

    onClick:function(){
        //cc.log("点击俱乐部消息...");
    },


    onRefuse:function(){
        cc.log("拒绝...");
        this.userRole = ClickClubModel.getCurClubRole();
        this.isGuanliYuan = this.userRole <= 1?1:0;
        var self = this;
        NetworkJT.loginReq("groupAction", "responseGroupReview", {
            userId:PlayerModel.userId,
            msgType:1,
            keyId:this.messageKeyId,
            value:0
        }, function (data) {
            if (data) {
                cc.log("searchGroupInfo::"+JSON.stringify(data));
                self.parentNode.getClubMessageListData();
            }
        }, function (data) {
            cc.log("searchGroupInfo::"+JSON.stringify(data));
            FloatLabelUtil.comText(data.message);
        });
    },

    onAgress:function(){
        cc.log("同意..." , this.messageKeyId);
        this.userRole = ClickClubModel.getCurClubRole();//this.homePanel.clickClubRole;
        this.isGuanliYuan = this.userRole <= 1?1:0;
        var self = this;
        NetworkJT.loginReq("groupAction", "responseGroupReview", {
            userId:PlayerModel.userId,
            msgType:1,
            value:1 ,
            keyId:this.messageKeyId
        }, function (data) {
            if (data) {
                cc.log("searchGroupInfo::"+JSON.stringify(data));
                self.parentNode.getClubMessageListData();
                SyEventManager.dispatchEvent(SyEvent.JOIN_CLUB_OK);
            }
        }, function (data) {
            cc.log("searchGroupInfo::"+JSON.stringify(data));
            FloatLabelUtil.comText(data.message);
        });
    },

    setData:function(data){
        this.userName.setString(this.data.userName);
        this.userId.setString("UID:" + this.data.userId);
        this.showIcon(this.data.headimgurl);
    },


    showIcon: function (iconUrl, sex) {
        //iconUrl = "http://wx.qlogo.cn/mmopen/25FRchib0VdkrX8DkibFVoO7jAQhMc9pbroy4P2iaROShWibjMFERmpzAKQFeEKCTdYKOQkV8kvqEW09mwaicohwiaxOKUGp3sKjc8/0";
        var url = iconUrl;
        var icon = this.icon;
        var sex = sex || 1;
        var defaultimg = (sex == 1) ? "res/ui/dtz/images/default_m.png" : "res/ui/dtz/images/default_m.png";

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
                    sprite.setTexture(img);
                }
            });
        }
    },


});


var ClubMessageItem = ccui.Widget.extend({
    //oData 恶心处理一下，因为有个头像数据需要在另一个数据结构取；
    ctor:function(data , parentNode , homePanel ,oData){
        this.data = data;
        this.oData = oData;
        this.parentNode = parentNode;
        this.homePanel = homePanel;
        this.messageKeyId = this.data.keyId;
        this._super();
        this.setContentSize(560, 120);

        //UID：120005
        //亲友圈ID：3456
        //亲友圈名：亲友圈3

        var Panel_16=this.Panel_16= UICtor.cPanel(cc.size(560,120),cc.color(150,200,255),0);
        Panel_16.setAnchorPoint(cc.p(0,0));
        Panel_16.setPosition(0,0);
        var gounpName=this.gounpName= UICtor.cLabel("野狼教授阿什顿",26,cc.size(280,36),cc.color(155,107,72),0,1);
        gounpName.setAnchorPoint(cc.p(0,0.5));
        gounpName.setPosition(105,26);
        Panel_16.addChild(gounpName);

        var gounpId=this.gounpId= UICtor.cLabel("野狼教授阿什顿",26,cc.size(280,36),cc.color(155,107,72),0,1);
        gounpId.setAnchorPoint(cc.p(0,0.5));
        gounpId.setPosition(105,63);
        Panel_16.addChild(gounpId);

        var userId=this.userId= UICtor.cLabel("UID:800800",26,cc.size(0,0),cc.color(155,107,72),0,1);
        userId.setAnchorPoint(cc.p(0,0.5));
        userId.setPosition(105,102);
        Panel_16.addChild(userId);

        var icon=this.icon= UICtor.cImg("res/ui/dtz/images/default_m.png");
        icon.setPosition(55,63);
        Panel_16.addChild(icon);

        var Button_5=this.Button_5= UICtor.cBtn("res/ui/dtzjulebu/julebu/btnFuckU.png");
        Button_5.setPosition(272,42);
        Panel_16.addChild(Button_5);
        var Button_6=this.Button_6= UICtor.cBtn("res/ui/dtzjulebu/julebu/btnRefuse.png");
        Button_6.setPosition(451,50);
        Panel_16.addChild(Button_6);
        var Button_7=this.Button_7= UICtor.cBtn("res/ui/dtzjulebu/julebu/btnAgree.png");
        Button_7.setPosition(598,50);
        Panel_16.addChild(Button_7);
        var Image_10=this.Image_10= UICtor.cImg("res/ui/dtzjulebu/julebu/msgLine.png");
        Image_10.setPosition(308,4);
        Panel_16.addChild(Image_10);


        this.addChild(Panel_16);

        this.Button_5.visible = false;//暂时废弃
        UITools.addClickEvent(this.Button_6, this, this.onRefuse);
        UITools.addClickEvent(this.Button_7, this, this.onAgress);
        //Button_7
        this.setData(this.data);
    },


    onRefuse:function(){
        cc.log("拒绝...");
        if (this.reviewMode == 3){
            var self = this;
            NetworkJT.loginReq("groupCreditAction", "responseInvite", {
                groupId:ClickClubModel.getCurClubId(),
                userId:PlayerModel.userId,
                sessCode:PlayerModel.sessCode,
                keyId:this.messageKeyId,
                respType:0//=进组操作的类型：1：同意，其他：拒绝
            }, function (data) {
                if (data) {
                    cc.log("searchGroupInfo::"+JSON.stringify(data));
                    self.parentNode.getClubMessageListData();
                }
            }, function (data) {
                cc.log("searchGroupInfo::"+JSON.stringify(data));
                FloatLabelUtil.comText(data.message);
            });
        }else{
            this.userRole = ClickClubModel.getCurClubRole();
            this.isGuanliYuan = this.userRole <= 1?1:0;
            var self = this;
            NetworkJT.loginReq("groupAction", "responseGroupReview", {
                userId:PlayerModel.userId,
                msgType:0,
                keyId:this.messageKeyId,
                value:0,
            }, function (data) {
                if (data) {
                    cc.log("searchGroupInfo::"+JSON.stringify(data));
                    self.parentNode.getClubMessageListData();
                }
            }, function (data) {
                cc.log("searchGroupInfo::"+JSON.stringify(data));
                FloatLabelUtil.comText(data.message);
            });
        }


    },

    onAgress:function(){
        cc.log("同意..." , this.messageKeyId);
        if (this.reviewMode == 3){
            var self = this;
            NetworkJT.loginReq("groupCreditAction", "responseInvite", {
                groupId:ClickClubModel.getCurClubId(),
                userId:PlayerModel.userId,
                sessCode:PlayerModel.sessCode,
                keyId:this.messageKeyId,
                respType:1//=进组操作的类型：1：同意，其他：拒绝
            }, function (data) {
                if (data) {
                    cc.log("searchGroupInfo::"+JSON.stringify(data));
                    self.parentNode.getClubMessageListData();
                    SyEventManager.dispatchEvent(SyEvent.UPDATE_MESSAGE_REDPOINT);
                }
            }, function (data) {
                cc.log("searchGroupInfo::"+JSON.stringify(data));
                FloatLabelUtil.comText(data.message);
            });
        }else {
            this.userRole = ClickClubModel.getCurClubRole();//this.homePanel.clickClubRole;
            this.isGuanliYuan = this.userRole <= 1 ? 1 : 0;
            var self = this;
            NetworkJT.loginReq("groupAction", "responseGroupReview", {
                userId: PlayerModel.userId,
                msgType: 0,
                value: 1,
                keyId: this.messageKeyId,
                reviewMode: this.reviewMode
            }, function (data) {
                if (data) {
                    cc.log("searchGroupInfo::" + JSON.stringify(data));
                    self.parentNode.getClubMessageListData();
                    SyEventManager.dispatchEvent(SyEvent.JOIN_CLUB_OK);
                    SyEventManager.dispatchEvent(SyEvent.UPDATE_MESSAGE_REDPOINT);
                }
            }, function (data) {
                cc.log("searchGroupInfo::" + JSON.stringify(data));
                FloatLabelUtil.comText(data.message);
            });
        }
    },

    setData:function(data){
        //UID：120005
        //亲友圈ID：3456
        //亲友圈名：亲友圈3
        this.reviewMode = data.reviewMode || 0;
        this.gounpId.setString("亲友圈ID："+this.data.groupId);
        this.gounpName.setString("亲友圈名："+this.data.groupName);
        this.userId.setString("邀请人ID：" + this.data.currentOperator);
        //cc.log("this.oData.headimgurl",this.oData.headimgurl)
        var headimgurl = null;
        if (this.oData && this.oData.headimgurl){
            headimgurl = this.oData.headimgurl;
        }
        this.showIcon(headimgurl , 1);
    },

    showIcon: function (iconUrl, sex) {
        //iconUrl = "http://wx.qlogo.cn/mmopen/25FRchib0VdkrX8DkibFVoO7jAQhMc9pbroy4P2iaROShWibjMFERmpzAKQFeEKCTdYKOQkV8kvqEW09mwaicohwiaxOKUGp3sKjc8/0";
        var url = iconUrl;
        var icon = this.icon;
        var sex = sex || 1;
        var defaultimg = (sex == 1) ? "res/ui/dtz/images/default_m.png" : "res/ui/dtz/images/default_w.png";

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
                    sprite.setTexture(img);
                }
            });
        }
    },

});

/**
 * 玩家拥有的俱乐部item
 */
var MyClubItem = ccui.Widget.extend({
    ctor:function(data , clubId , parentNode){
        this.data = data;
        this.parentNode = parentNode;
        this.curClubId = clubId;
        this.messageKeyId = this.data.keyId;
        this._super();
        this.setContentSize(730, 60);

        var Panel_16=this.Panel_16= UICtor.cPanel(cc.size(730,60),cc.color(150,200,255),0);
        Panel_16.setAnchorPoint(cc.p(0,0));
        Panel_16.setPosition(0,0);
        var clubId=this.clubId= UICtor.cLabel("10086",26,cc.size(190,36),cc.color(135,47,16),0,1);
        clubId.setAnchorPoint(cc.p(0,0.5));
        clubId.setPosition(71,30);
        Panel_16.addChild(clubId);
        var clubName=this.clubName= UICtor.cLabel("亲友圈名字",26,cc.size(0,0),cc.color(135,47,16),0,1);
        clubName.setPosition(364,31);
        Panel_16.addChild(clubName);
        var lbNumber=this.lbNumber= UICtor.cLabel("2",26,cc.size(0,0),cc.color(135,47,16),0,1);
        lbNumber.setPosition(596,33);
        Panel_16.addChild(lbNumber);

        Panel_16.setBackGroundImage("res/ui/dtzjulebu/julebu/clubListCellBg2.png");


        this.addChild(Panel_16);
        //添加点击事件
        this.Panel_16.setTouchEnabled(true);
        UITools.addClickEvent(this.Panel_16, this, this.onClick);

        //Button_7
        this.setData(this.data);
    },

    onClick:function(){
        //cc.log("点击俱乐部消息...");
        this.parentNode.fixShow();
        this.parentNode.loadClub(this.data.groupId);
        this.Panel_16.setBackGroundImage("res/ui/dtzjulebu/julebu/clubListCellBg1.png");
    },

    setData:function(){
        this.clubName.setString(this.data.groupName);
        this.clubId.setString("ID:" + this.data.groupId);
        this.lbNumber.setString(this.data.currentCount);
    },

});

