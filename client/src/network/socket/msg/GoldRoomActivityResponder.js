/**
 * Created by Administrator on 2016/6/27.
 */

var GoldRoomActivityModel = {
    isShareActive:false,
    isAutoSendSignIn:false,

    init:function(message){
        this.awardData = message;
        this.reqCode = message.reqCode;
        this.subsidyCount = message.subsidyCount;           // 破产补助：今天已领取次数
        this.signatureBook = message.signatureBook;  // 本周签到表
        this.totalWinCount = message.totalWinCount;          // 累计胜利：今天累计胜利次数
        this.totalWinAward = message.totalWinAward;          // 累计胜利：今天已抽奖次数
        this.totalWinAwardCount = message.totalWinAwardCount;     // 累计胜利：今天可抽奖励次数
        this.comboWinCount = message.comboWinCount;          // 连胜次数：当前连胜的次数
        this.comboWinAward = message.comboWinAward;          // 连胜奖励：列表记录有连胜次数的奖励，如，[3，4]表示还有3次，4次连胜奖励未领，领取一个删除一个
        this.inviterUserAwardCount = message.inviterUserAwardCount;  // 拉新：领取奖励人数
        this.inviterUserAwardGold = message.inviterUserAwardGold;   // 拉新：领取奖励积分数
        this.inviterUserCount1 = message.inviterUserCount1;     // 拉新：游戏3局以上人数
        this.inviterUserCount2 = message.inviterUserCount2;     // 拉新：所以有邀请的人
        this.awardList = message.awardList;             // 玩家获得奖励
        this.sysSignAward = message.sysSignAward;          // 签到奖励积分数，第一天到第七天
        this.sysSubsidyAward = message.sysSubsidyAward;       // 破产补助单次积分数
        this.sysInviteUserAward = message.sysInviteUserAward;    // 邀请玩家每人积分数
    },

    getTotalWinAwardCount:function(){
        return this.totalWinAwardCount;
    },

    getComboWinAward:function(){
        return (this.comboWinAward && this.comboWinAward.length > 0);
    },

    getTotalWinAward:function(){
        return this.totalWinAward;
    },

    getAwardData:function(){
        return this.awardData;
    },

    getAwardList:function(){
        return this.awardList;
    },

    getSubsidyCount:function(){
        return this.subsidyCount || 0;
    },

    getIsSignIned:function(){
        var myDate = new Date();
        var nowDays = myDate.getDay(); //当前星期几
        var signatureBook = this.signatureBook;
        for (var j = 0; j < signatureBook.length; j++) {
            if (nowDays == signatureBook[j].day && signatureBook[j].res >= 1){
                return true;
            }
        }
        return false;
    }

}

var GoldRoomActivityResponder = BaseResponder.extend({

    respond:function(message){
        cc.log("GoldRoomActivityResponder::"+JSON.stringify(message));
        var reqCode = message.reqCode ? parseInt(message.reqCode) : 0;
        GoldRoomActivityModel.init(message);
        if  (reqCode == 1){
            if(!LayerManager.isInRoom()){
                if ((GoldRoomActivityModel.isAutoSendSignIn && !GoldRoomActivityModel.getIsSignIned()) || !GoldRoomActivityModel.isAutoSendSignIn){
                    GoldRoomActivityModel.isAutoSendSignIn = false;
                    PopupManager.addPopup(new SignInMoneyPop(message));
                }

            }
        }else if  (reqCode == 2){
            SyEventManager.dispatchEvent(SyEvent.UPDATE_SIGNIN_STATE);
        }else if  (reqCode == 100 || reqCode == 101  || reqCode == 102 || reqCode == 103 || reqCode == 105 || reqCode == 106){
            /**
             * * 102请求领取连胜奖励
             * 103 请求领取累积奖励
             * 100 请求累积场数配置
             * 104 请求所有配置列表
             * 105 领取破产奖励
             * 106 领取邀请新人奖励
             * */
            SyEventManager.dispatchEvent(SyEvent.UPDATE_AWARD_STATE,{reqCode:reqCode,data:message});
        }else if  (reqCode == 104){
            if (message.subsidyCount < 1){
                var side = new FreeSubsidyPop();
                PopupManager.addPopup(side);
            }
        }else if  (reqCode == 107){//邀请新人
            var side = new InviteAwardPop();
            PopupManager.addPopup(side);
        }


    }
})