/**
 * Created by Administrator on 2017/7/21.
 */

/**
 * 修改俱乐部弹框
 */
var ChangeClubPop = BasePopup.extend({

    ctor:function(homePanel , isOpenLeaderPay , isOpenCreateRoom,isOpenFastCreate,isAutoCreateRoom){
        this.homePanel = homePanel;
        this.clubRole = ClickClubModel.getCurClubRole();
        this.isOpenLeaderPay = ClickClubModel.getClubIsOpenLeaderPay() || 0;//isOpenLeaderPay || 0;
        this.isOpenCreateRoom = ClickClubModel.getClubIsOpenCreate() || 0;//isOpenCreateRoom || 0;
        this.isOpenFastCreate = ClickClubModel.getClubIsOpenFastCreate() || 0;
        this.isAutoCreateRoom = ClickClubModel.getClubIsOpenAutoCreate()|| 0;// isAutoCreateRoom || 0;
        this.isBanVoiceAndProps = ClickClubModel.getClubIsBanVoiceAndProps()|| 0;// isAutoCreateRoom || 0;
        this._super("res/clubChangeNamePop.json");//zqHome
    },

    selfRender:function(){
        var btnLeaderPay = this.getWidget("btnLeaderPay");
        var btnUngroup = this.getWidget("btnUngroup");
        var btnReleaceAllRooms = this.getWidget("btnReleaseAllRoom");
        var btnReleaceMyRooms = this.getWidget("btnReleaseMyRoom");
        var btnOpenCreateRoom = this.getWidget("btnOpenCreate");
        var btnOpenFastCreate = this.getWidget("btnOpenFastCreate");
        var btnChangeClubName = this.getWidget("btnChangeClubName");
        var btnAutoCreate = this.getWidget("btnAutoCreate");
        var btnReleaseBagRoom = this.getWidget("btnReleaseBagRoom");

        btnReleaceMyRooms.loadTextureNormal("res/ui/dtz/dtzCom/btn_dismiss.png");

        var isLeader = (this.clubRole == 0);

        if(btnLeaderPay && btnUngroup && btnOpenCreateRoom &&
            btnOpenFastCreate && btnChangeClubName && btnAutoCreate &&
            btnReleaceAllRooms && btnReleaceMyRooms){

            UITools.addClickEvent(btnLeaderPay,this,this.onOpenLeaderPay);
            UITools.addClickEvent(btnUngroup , this , this.onUngroup);
            UITools.addClickEvent(btnReleaceAllRooms , this , this.onReleaseAllRoom);//新增
            UITools.addClickEvent(btnOpenCreateRoom , this , this.onOpenVioiceAndProps);//新增
            UITools.addClickEvent(btnReleaceMyRooms , this , this.onReleaseMyRoom);
            UITools.addClickEvent(btnOpenFastCreate , this , this.onOpenFastCreate);
            UITools.addClickEvent(btnChangeClubName , this , this.onChangeClubName);
            UITools.addClickEvent(btnAutoCreate , this , this.onAutoCreateRoom);//
            UITools.addClickEvent(btnReleaseBagRoom , this , this.onReleaseBagRoom);//


            //UITools.addClickEvent(btnLeaderPay,this,this.onOpenLeaderPay);
            //UITools.addClickEvent(btnUngroup , this , this.onUngroup);
            //UITools.addClickEvent(btnOpenCreateRoom , this , this.onOpenCreateRoom);
            //UITools.addClickEvent(btnOpenFastCreate , this , this.onOpenFastCreate);
            //UITools.addClickEvent(btnChangeClubName , this , this.onChangeClubName);
            //UITools.addClickEvent(btnAutoCreate , this , this.onAutoCreateRoom);//
        }


        if(!isLeader && btnUngroup){
            btnUngroup.loadTextureNormal("res/ui/dtzjulebu/julebu/btnquitClub.png");
        }else{
            btnUngroup.loadTextureNormal("res/ui/dtzjulebu/julebu/btnUngroup.png");
        }

        if(this.isOpenLeaderPay){
            btnLeaderPay.loadTextureNormal("res/ui/dtzjulebu/julebu/btnClosePay.png");
        }else{
            btnLeaderPay.loadTextureNormal("res/ui/dtzjulebu/julebu/btnOpenPay.png");
        }

        //if(this.isOpenCreateRoom){
        //    btnOpenCreateRoom.loadTextureNormal("res/ui/dtzjulebu/julebu/closeCreateRoom.png");
        //}else{
        //    btnOpenCreateRoom.loadTextureNormal("res/ui/dtzjulebu/julebu/btnOpenCreateRoom.png");
        //}

        if(this.isOpenFastCreate){
            btnOpenFastCreate.loadTextureNormal("res/ui/dtzjulebu/julebu/btnOpenFree.png");
        }else{
            btnOpenFastCreate.loadTextureNormal("res/ui/dtzjulebu/julebu/btnOpenFast.png");
        }

        if(this.isAutoCreateRoom){
            btnAutoCreate.loadTextureNormal("res/ui/dtzjulebu/julebu/btnCloseAutoCreate.png");
        }else{
            btnAutoCreate.loadTextureNormal("res/ui/dtzjulebu/julebu/btnOpenAutoCreate.png");
        }
        //cc.log("isAutoCreateRoom:::::"+this.isAutoCreateRoom);
        //cc.log("isOpenFastCreate:::::"+this.isOpenFastCreate);


        if(this.isBanVoiceAndProps){
            btnOpenCreateRoom.loadTextureNormal("res/ui/dtzjulebu/julebu/btnOpenvoice.png");
        }else{
            btnOpenCreateRoom.loadTextureNormal("res/ui/dtzjulebu/julebu/btnClosevoice.png");
        }

    },


    onAutoCreateRoom:function(){
        var self = this;
        var desc = "";
        if(this.isAutoCreateRoom){
            desc = "关闭智能补房，确定关闭吗？";
        }else{
            desc = "开启智能补房，确定开启吗？";

        }

        var tipStr = "注：开启智能补房后系统将在亲友圈空闲房间低于2间时自动创建2间房";
        if(self.clubRole != 0 && self.clubRole != 1){
            FloatLabelUtil.comText("非管理员不可修改此选项");
            return;
        }

        AlertPop.show(desc,function(){
            var openOrClose = "-a";
            if(self.isAutoCreateRoom){
                openOrClose = "-a";
            }else{
                openOrClose = "+a";
            }
            cc.log("desc============",ClickClubModel.getCurClubKeyId(),PlayerModel.userId)
            NetworkJT.loginReq("groupAction", "updateGroupInfo", {keyId:ClickClubModel.getCurClubKeyId() ,userId:PlayerModel.userId , autoConfig:openOrClose}, function (data) {
                if (data) {
                    cc.log("updateGroupInfo::"+JSON.stringify(data));
                    if(openOrClose == "-a"){
                        //取消成功
                        FloatLabelUtil.comText("关闭智能开房成功");
                        if(self.homePanel ){
                            var bool = 0;
                            ClickClubModel.updateIsAutoCreateRoom(bool);
                        }
                    }else{
                        //开启成功
                        FloatLabelUtil.comText("开启智能开房成功");
                        if(self.homePanel){
                            var bool = 1;
                            ClickClubModel.updateIsAutoCreateRoom(bool);
                        }
                    }
                    PopupManager.remove(self);
                }
            }, function (data) {
                FloatLabelUtil.comText(data.message);
                PopupManager.remove(self);

            });
        },null,1,tipStr)
    },

    onOpenVioiceAndProps:function(){
        var self = this;
        var desc = "";
        if(this.isBanVoiceAndProps){
            desc = "允许后游戏内能发送语音和道具，确定允许吗？";
        }else{
            desc = "禁止后游戏内不能发送语音和道具，确定禁止吗？";
        }

        if(self.clubRole != 0 && self.clubRole != 1){
            FloatLabelUtil.comText("非管理员不可修改此选项");
            return;
        }

        AlertPop.show(desc,function(){
            var openOrClose = "0";

            if(self.isBanVoiceAndProps){
                openOrClose = "0";
            }else{
                openOrClose = "1";
            }
            NetworkJT.loginReq("groupAction", "updateGroupInfo", {keyId:ClickClubModel.getCurClubKeyId() ,userId:PlayerModel.userId , chatConfig:openOrClose}, function (data) {
                if (data) {
                    //cc.log("updateGroupInfo::"+JSON.stringify(data));
                    if(openOrClose == "0"){
                        //取消成功
                        FloatLabelUtil.comText("操作成功");
                        if(self.homePanel){
                            var bool = 0;
                            ClickClubModel.updateIsBanVoiceAndProps(bool);
                        }
                    }else{
                        //开启成功
                        FloatLabelUtil.comText("操作成功");
                        if(self.homePanel){
                            var bool = 1;
                            ClickClubModel.updateIsBanVoiceAndProps(bool);
                        }
                    }
                    PopupManager.remove(self);
                }
            }, function (data) {
                FloatLabelUtil.comText("修改失败");
                PopupManager.remove(self);

            });
        })
    },

    onOpenCreateRoom:function(){
        var self = this;
        var desc = "";
        if(this.isOpenCreateRoom){
            desc = "禁止后只有群主或管理员才能开房，确定禁止吗？";
        }else{
            desc = "允许后所有成员都可以自由开房，确定允许吗？";

        }

        if(self.clubRole != 0 && self.clubRole != 1){
            FloatLabelUtil.comText("非管理员不可修改此选项");
            return;
        }

        AlertPop.show(desc,function(){
            var openOrClose = "-r";

            if(self.isOpenCreateRoom){
                openOrClose = "-r";
            }else{
                openOrClose = "+r";
            }
            NetworkJT.loginReq("groupAction", "updateGroupInfo", {keyId:ClickClubModel.getCurClubKeyId() ,userId:PlayerModel.userId , tableConfig:openOrClose}, function (data) {
                if (data) {
                    cc.log("updateGroupInfo::"+JSON.stringify(data));
                    if(openOrClose == "-r"){
                        //取消成功
                        FloatLabelUtil.comText("关闭成员创房成功");
                        if(self.homePanel){
                            var bool = 0;
                            ClickClubModel.updateIsOpenCreateRoom(bool);
                        }
                    }else{
                        //开启成功
                        FloatLabelUtil.comText("开启成员创房成功");
                        if(self.homePanel){
                            var bool = 1;
                            ClickClubModel.updateIsOpenCreateRoom(bool);
                        }
                    }
                    PopupManager.remove(self);
                }
            }, function (data) {
                FloatLabelUtil.comText("修改失败");
                PopupManager.remove(self);

            });
        })
    },

    onReleaseAllRoom:function(){
        var self = this;
        AlertPop.show("确定一键解散亲友圈中所有未开局的房间吗？",function(){
            NetworkJT.loginReq("groupAction", "dissTable", {groupId:ClickClubModel.getCurClubId() ,oUserId:PlayerModel.userId,all:"all"}, function (data) {
                if (data) {
                    cc.log("dissTable::"+JSON.stringify(data));
                    if(data.count != 0){
                        //调用父节点的刷新
                        if(self.homePanel){
                            self.homePanel.getClubRoomListData();
                        }
                    }
                    FloatLabelUtil.comText(data.message);
                }
            }, function (data) {
                cc.log("dissTable::"+JSON.stringify(data));
                FloatLabelUtil.comText(data.message);
            });
        })
        PopupManager.remove(this);
    },

    onOpenLeaderPay:function(){
        var self = this;
        var desc = "";
        if(this.isOpenLeaderPay){
            desc = "关闭群主支付后，玩家创建房间将不再扣除群主的钻石，确定操作吗？";
        }else{
            desc = "开启群主支付后，玩家创建房间将消耗群主的钻石，确定开启吗？";

        }

        AlertPop.show(desc,function(){
            if(self.clubRole != 0 && self.clubRole != 1){
                FloatLabelUtil.comText("非管理员不可修改此选项");
                return;
            }
            var openOrClose = "-p3";
            if(self.isOpenLeaderPay){
                openOrClose = "-p3";
            }else{
                openOrClose = "+p3";
            }
            NetworkJT.loginReq("groupAction", "updateGroupInfo", {keyId:ClickClubModel.getCurClubKeyId() ,userId:PlayerModel.userId , payConfig:openOrClose}, function (data) {
                if (data) {
                    cc.log("updateGroupInfo::"+JSON.stringify(data));
                    if(openOrClose == "-p3"){
                        //取消成功
                        FloatLabelUtil.comText("取消群主支付成功");
                        if(self.homePanel){
                            var bool = 0;
                            ClickClubModel.updateIsLeaderPay(bool);
                        }
                    }else{
                        //开启成功
                        FloatLabelUtil.comText("开启群主支付成功");
                        if(self.homePanel){
                            var bool = 1;
                            ClickClubModel.updateIsLeaderPay(1);

                        }
                    }
                    PopupManager.remove(self);
                }
            }, function (data) {
                FloatLabelUtil.comText("修改失败");
                PopupManager.remove(self);

            });
        })

    },

    onOpenFastCreate:function(){
        var self = this;
        var desc = "";
        if(this.isOpenFastCreate){
            desc = "开启自由创房后，玩家可以自己创建房间，确定操作吗？";
        }else{
            desc = "开启快速创房后，确定开启吗？";

        }
        AlertPop.show(desc,function(){
            if(self.clubRole != 0 && self.clubRole != 1){
                FloatLabelUtil.comText("非管理员不可修改此选项");
                return;
            }
            var openOrClose = "-q";
            if(self.isOpenFastCreate){
                openOrClose = "-q";
            }else{
                openOrClose = "+q";
            }
            NetworkJT.loginReq("groupAction", "updateGroupInfo", {keyId:ClickClubModel.getCurClubKeyId() ,userId:PlayerModel.userId , quickConfig:openOrClose}, function (data) {
                if (data) {
                    cc.log("updateGroupInfo::"+JSON.stringify(data));
                    if(openOrClose == "-q"){
                        //取消成功
                        FloatLabelUtil.comText("开启自由创房成功");
                        if(self.homePanel){
                            //self.homePanel.clickClubIsOpenFastCreate = 0;
                            var type = 0;
                            ClickClubModel.updateIsFastCreateRoomType(type);
                            self.homePanel.changeCreateRoomType();
                            self.homePanel.getClubRoomListData();
                        }
                    }else{
                        //开启成功
                        FloatLabelUtil.comText("开启快速创房成功");
                        if(self.homePanel){
                            //self.homePanel.clickClubIsOpenFastCreate = 1;
                            var type = 1;
                            ClickClubModel.updateIsFastCreateRoomType(type);
                            self.homePanel.changeCreateRoomType();
                            self.homePanel.getClubRoomListData();
                        }
                    }
                    PopupManager.remove(self);
                }
            }, function (data) {
                FloatLabelUtil.comText("修改失败");
                PopupManager.remove(self);

            });
        })

    },

    onChangeClubName:function(){
        PopupManager.addPopup(new ClubAmendNamePop(ClickClubModel.getCurClubKeyId(), this.homePanel));
        PopupManager.remove(this);
    },

    onUngroup:function(){
        var self = this;

        var isLeader = (self.clubRole == 0);
        if(isLeader){
            AlertPop.show("解散亲友圈后无法恢复，确定吗？",function(){
                NetworkJT.loginReq("groupAction", "dissGroup", {keyId:ClickClubModel.getCurClubKeyId() ,userId:PlayerModel.userId}, function (data) {
                    if (data) {
                        cc.log("dissGroup::"+JSON.stringify(data));
                        FloatLabelUtil.comText(data.message);
                        //调用父节点的刷新
                        if(self.homePanel){
                            self.homePanel.getAllClubsData();
                        }
                    }
                }, function (data) {
                    cc.log("dissGroup::"+JSON.stringify(data));
                    FloatLabelUtil.comText(data.message);
                });
            })
        }else{
            AlertPop.show("确定要退出亲友圈吗？",function(){
                NetworkJT.loginReq("groupAction", "exitGroup", {
                    userId:PlayerModel.userId,
                    groupId:ClickClubModel.getCurClubId(),
                }, function (data) {
                    if (data) {
                        FloatLabelUtil.comText(data.message);
                        self.homePanel.getAllClubsData();
                    }
                }, function (data) {
                    cc.log("searchGroupInfo::"+JSON.stringify(data));
                    FloatLabelUtil.comText(data.message);
                });
            })
        }

        PopupManager.remove(this);
    },

    onReleaseMyRoom:function(){

        if(!ClickClubModel.isClubCreaterOrLeader()){
            FloatLabelUtil.comText("群主和管理员才可修改");
            return;
        }
        PopupManager.addPopup(new ClubDismissNumPop(ClickClubModel.getCurClubId() , this));
    },



    onReleaseBagRoom:function(){
        if (ClickClubModel.isClubCreaterOrLeader()){
            var mc = new ClubKickPlayerPop();
            PopupManager.addPopup(mc);
        }else{
            FloatLabelUtil.comText("没有权限");
        }

        //return;
    //    var lastScene = UITools.getLocalItem("sy_lastClick_scene") || -1;
    //    if (lastScene && lastScene == -1){
    //        FloatLabelUtil.comText("请先进入包厢后再解散包厢房间:");
    //        return
    //    }
    //    cc.log("onReleaseBagRoom",lastScene,this.homePanel.modeId);
    //    var self = this;
    //    AlertPop.show("确定解散当前包厢未开局的所有房间吗？",function(){
    //        NetworkJT.loginReq("groupAction", "dissTable", {groupId:ClickClubModel.getCurClubId() ,oUserId:PlayerModel.userId,room:lastScene}, function (data) {
    //            if (data) {
    //                cc.log("dissTable::"+JSON.stringify(data));
    //                if(data.count != 0){
    //                    //调用父节点的刷新
    //                    if(self.homePanel){
    //                        self.homePanel.getClubRoomListData();
    //                    }
    //                }
    //                FloatLabelUtil.comText(data.message);
    //            }
    //        }, function (data) {
    //            cc.log("dissTable::"+JSON.stringify(data));
    //            FloatLabelUtil.comText(data.message);
    //        });
    //    })
    //    PopupManager.remove(this);
    },

});

