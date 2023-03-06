/**
 * Created by Administrator on 2016/6/24.
 */
var ClickClubModel = {
    clickClubTime:0,            //上次点击俱乐部某条目的时间
    clickClubObj:null,          //俱乐部cell自身
    clickClubId:0,              //当前的俱乐部id
    clickKeyId:0,               //当前俱乐部keyid
    clickClubName:"",           //俱乐部名字
    clickClubRole:2,            //我在当前俱乐部的身份 0群主 1管理员 2普通成员
    clickClubIsOpenLeaderPay:0, //当前俱乐部是否开启群主支付
    clickClubIsOpenFastCreate:0,//当前俱乐部是否开启快速创房
    clickClubIsOpenCreate:0,    //当前俱乐部是否开启普通玩家创建房间
    clickClubIsAutoCreate:0,    //当前俱乐部是否开启智能创房
    isOpenForbidJoinClub:0,     //当前俱乐部是否开启禁止申请加入
    clickClubMyTeamId:0,        //我在当前俱乐部的分组id
    clickClubImgUrl:"",
    clickClubKsppCount:0, //开启快速匹配的的人数  0 是不开启
    clickClubIsOpenCredit:0, //当前俱乐部是否开启"比赛房"
    clickClubBagModeId:0,              //当前选择的包厢的modeId
    clickClubAllotMode:1, //当前俱乐部比赛房的分成方式1大赢家分成，2参与分成
    promoterLevel:0,            //拉手等级
    clickClubIsBanVoiceAndProps:0,    //当前俱乐部是否禁止语音和道具
    dismissCount:0,//解散房间次数

    clearClubData:function(){
        this.clickClubObj = null;
        this.clickClubId = 0;
        this.clickKeyId = 0;
        this.clickClubName = "";
        this.clickClubRole = 2;
        this.isOpenForbidJoinClub = 0;
        this.clickClubIsOpenLeaderPay = 0;
        this.clickClubIsOpenCreate = 0 ;
        this.clickClubIsOpenFastCreate = 1;
        this.clickClubIsAutoCreate = 0;
        this.clickClubImgUrl = "";
        this.clickClubRooms = 0;
        this.clickClubMembers = 0;
        this.clickClubMyTeamId = 0;
        this.hasNewMsg = false;
        this.clickClubKsppCount = 0;
        this.clickClubIsOpenCredit = 0;
        this.clickClubBagModeId = 0;              //当前选择的包厢的modeId
        this.clickClubAllotMode = 1;
        this.promoterLevel = 0;
        this.clickClubIsBanVoiceAndProps = 0;
        this.dismissCount = 0;

    },

    init:function(data){
        this.clearClubData();
        this.clickClubObj = data.itemSelf;
        this.clickClubId = data.clickId;
        this.clickKeyId = data.keyId;
        this.clickClubName = data.groupName;
        this.clickClubRole = data.userRole;
        this.clickClubIsForbideJoinClub = data.isOpenForbidJoinClub;
        this.clickClubIsOpenLeaderPay = data.isOpenLeaderPay;
        this.clickClubIsOpenFastCreate = data.isOpenFastCreate;
        this.clickClubIsOpenCreate = data.isOpenCreateRoom;
        this.clickClubIsAutoCreate = data.isAutoCreateRoom;
        this.clickClubImgUrl = data.clubImgUrl;
        this.clickClubRooms = data.clubRoomNum;
        this.clickClubMembers = data.clubMemberNum;
        this.clickClubMyTeamId = data.clubTeamId;
        this.clickClubTime = new Date();
        this.clickClubKsppCount = data.ksppCount;
        this.clickClubIsOpenCredit = data.isOpenCredit;
        this.clickClubAllotMode = data.creditAllotMode;
        this.promoterLevel = data.promoterLevel;
        this.clickClubIsBanVoiceAndProps = data.isBanVoiceAndProps;

        var extMsg = {};
        if(data.clubMsg && data.clubMsg.extMsg){
            extMsg = JSON.parse(data.clubMsg.extMsg);
        }
        if(extMsg.dismissCount){
            this.dismissCount = extMsg.dismissCount;
        }

        cc.log("this.dismissCount==",this.dismissCount);
        this.initClubBagModeId();
    },

    /**
     * 刷新解散房间限制次数
     */
    updateDismissCount:function(data){
        this.dismissCount = data;
    },

    /**
     * 获取解散房间限制次数
     */
    getDismissCount:function(){
        return this.dismissCount;
    },

    /**
     * 时间间隔是否足够 （上一次点击某条俱乐部 和 这一次的时间间隔 必须大于 长连接消息的时间间隔）
     */
    timeEnough:function(){
        if(this.clickClubTime){
            var tNewData = new Date();
            return (tNewData - this.clickClubTime > 1000);
        }else{
            return true;
        }

    },

    /**
     * 获取当前俱乐部名字
     */
    getCurClubImgUrl:function(){
        //cc.log("clickClubImgUrl..." , this.clickClubImgUrl);
        return this.clickClubImgUrl;
    },


    /**
     * 获取当前俱乐部房间数量
     */
    getCurClubRoomsNum:function(){
        return this.clickClubRooms;
    },

    /**
     * 获取当前俱乐部成员数量
     */
    getCurClubMemberNum:function(){
        return this.clickClubMembers;
    },

    updateClubRoomsNum:function(newNumber){
        this.clickClubRooms = newNumber;
        SyEventManager.dispatchEvent(SyEvent.UPDATE_CLUB_ROOM_NUMBER , {eventClubId:this.getCurClubId()});
    },


    updateClubMembersNum:function(newNumber){
        this.clickClubMembers = newNumber;
        SyEventManager.dispatchEvent(SyEvent.UPDATE_CLUB_MEMBER_NUMBER, {eventClubId:this.getCurClubId()});
    },

    updateClubName:function(newName){
        this.clickClubName = newName || "";
        SyEventManager.dispatchEvent(SyEvent.UPDATE_CLUB_NAME, {eventClubId:this.getCurClubId()});
    },


    /**
     * 是否开启群主支付
     * @returns {number}
     */
    getClubIsOpenLeaderPay:function(){
        return this.clickClubIsOpenLeaderPay;
    },

    /**
     * 是否开启快速创房
     */
    getClubIsOpenFastCreate:function(){
        return this.clickClubIsOpenFastCreate;

    },

    getClubIsOpenCreate:function(){
        return this.clickClubIsOpenCreate ;
    },

    getClubIsOpenAutoCreate:function(){
        return this.clickClubIsAutoCreate;
    },

    getClubIsBanVoiceAndProps:function(){
        return this.clickClubIsBanVoiceAndProps;
    },

    /**
     * 是否是可邀请可申请模式
     * @param type
     */
    getClubIsOpenForbidJoinClub:function(){
       return this.clickClubIsForbideJoinClub;
    },

    /**
     * 是否是开启“比赛房”
     * @param type
     */
    getClubIsOpenCredit:function(){
        return this.clickClubIsOpenCredit;
    },

    /**
     * 比赛房分成方式
     * @param type
     */
    getClubAllotMode:function(){
        return this.clickClubAllotMode;
    },

    updateIsOpenForbidJoinClub:function(bool){
        this.clickClubIsForbideJoinClub = bool;
    },

    updateIsFastCreateRoomType:function(type){
        this.clickClubIsOpenFastCreate = type;
    },

    updateIsLeaderPay:function(bool){
        this.clickClubIsOpenLeaderPay = bool;
    },

    updateIsOpenCreateRoom:function(bool){
        this.clickClubIsOpenCreate = bool;
    },

    updateIsBanVoiceAndProps:function(bool){
        this.clickClubIsBanVoiceAndProps = bool;
    },

    updateIsAutoCreateRoom:function(bool){
        this.clickClubIsAutoCreate = bool;
    },

    updateKsppCount:function(_count){
        this.clickClubKsppCount = _count;
        SyEventManager.dispatchEvent(SyEvent.UPDATE_CLUB_CHOOSE_PANEL,{eventClubId:this.getCurClubId()});
    },

    /**
     * 获取快速匹配的人数
     */
    getKsppCount:function(){
        return this.clickClubKsppCount || 0;
    },

    /**
     * 获取当前俱乐部条目
     */
    getCurClubItem:function(){
        return this.clickClubObj || null;
    },

    /**
    * 获取当前俱乐部ID
     */
    getCurClubId:function(){
        return this.clickClubId || 0;
    },

    initClubBagModeId:function(){
        var clubLocalList = ClubListModel.getClubLocalData();
        for(var j = 0 ; j < clubLocalList.length; j++){
            if (this.clickClubId == clubLocalList[j].clickId){
                this.clickClubBagModeId = clubLocalList[j].bagModeId;
            }
        }
        //cc.log("clubLocalList",JSON.stringify(clubLocalList));
        cc.log("this.clickClubBagModeId",this.clickClubBagModeId);
    },

    updateBagModeId:function(clickClubId,modeId){
        this.clickClubBagModeId = modeId;
        var clubLocalList = ClubListModel.getClubLocalData();
        for(var j = 0 ; j < clubLocalList.length; j++){
            if (clickClubId == clubLocalList[j].clickId){
                clubLocalList[j].bagModeId = modeId;
            }
        }
        UITools.setLocalJsonItem("Club_Local_Data",clubLocalList);
    },

    /**
     * 获取当前俱乐部选择的包厢的MOdeId
     */
    getCurClubBagModeId:function(){
        return this.clickClubBagModeId || 0;
    },

    /**
     * 获取当前俱乐部选择的包厢的Id
     */
    getCurClubBagId:function(allBagsData){
        var bagId = 0;
        if (allBagsData){
            for(var index = 0 ; index < allBagsData.length; index++){
                var data = allBagsData[index];
                var modeId = data.config.keyId;
                if (this.clickClubBagModeId == modeId) {
                    bagId = data.config.groupId;
                }
            }
        }
        return bagId;
    },

    /**
     * 获取俱乐部keyId
     */
    getCurClubKeyId:function(){
        return this.clickKeyId || 0;
    },

    /**
     * 获取我在当前俱乐部的身份
     */
    getCurClubRole:function(){
        return this.clickClubRole;
    },

    /**
     * 获取当前俱乐部名字
     */
    getCurClubName:function(){
        return this.clickClubName;
    },

    /**
     * 获取当前角色的名字
     */
    getClubRoleName:function(clickClubRole){
        var str = "";
        if (this.isClubCreater(clickClubRole)){
            str = "群主";
        }else if (this.isClubLeader(clickClubRole)){
            str = "管理";
        }else if (this.isClubTeamLeader(clickClubRole)){
            str = "组长";
        }else if (this.isClubAgency(clickClubRole)){
            str = "拉手";
        }else if (clickClubRole == 2){
            str = "普通成员";
        }
        return str;
    },


    /**
     * 是否是俱乐部创建者
     */
    isClubCreater:function(clickClubRole){
        var clickClubRole = clickClubRole || this.clickClubRole;
        return clickClubRole == 0;
    },

    /**
     * 是否是俱乐部管理员
     */
    isClubLeader:function(clickClubRole){
        var clickClubRole = clickClubRole || this.clickClubRole;
        return clickClubRole == 1;
    },

    /**
     * 是否是俱乐部拉手
     */
    isClubAgency:function(clickClubRole){
        var clickClubRole = clickClubRole || this.clickClubRole;
        return clickClubRole == 20;
    },

    /**
     * 是否是俱乐部4级拉手
     */
    isClubFourAgency:function(){
        //cc.log("this.promoterLevel",this.promoterLevel);
        if (this.isClubAgency()){
            return this.promoterLevel == 4;
        }
    },

    /**
     * 是否是俱乐部某组的组长
     */
    isClubTeamLeader:function(clickClubRole){
        var clickClubRole = clickClubRole || this.clickClubRole;
        return clickClubRole == 10;
    },

    /**
     * 是否是俱乐部某组组员
     */
    isClubTeamMembers:function(){
        return this.clickClubMyTeamId != 0;
    },

    /**
     * 获取所属的组keyId
     */
    getClubTeamKeyId:function(){
        return this.clickClubMyTeamId;
    },

    /**
     * 是否是俱乐部创建者或管理员
     */
    isClubCreaterOrLeader:function(clickClubRole){
        return this.clickClubRole == 0 || this.clickClubRole == 1
    },

    /**
     * 刷新是否该显示消息红点
     */
    updateClubHasNewMsg:function(data){
        this.hasNewMsg = data;
    },

    /**
     * 是否有未读消息
     */
    isClubHasNewMsg:function(){
        return this.hasNewMsg;
    }


}