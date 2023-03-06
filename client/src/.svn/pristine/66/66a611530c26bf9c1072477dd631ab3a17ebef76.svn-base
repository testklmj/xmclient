/**
 * Created by zhoufan on 2017/7/13.
 */
var ActivityInfoResponder = BaseResponder.extend({

    respond:function(message){
        if (SdkUtil.isReview() || SdkUtil.isYYBReview()) {
            return;
        }
        // cc.log("ActivityInfoResponder::"+JSON.stringify(message));
        var lastTime = new Date().getTime();
        ActivityModel.setLastTime(lastTime);

        var id = message.id || 0;
        //注释最新活动
        var data = JSON.parse(message.params);
        // if(id==24){
        //     ActivityModel.isIntivingNew = true;
        //     SyEventManager.dispatchEvent(SyEvent.OPEN_INTIVE_BTN);
        //     if(ActivityModel.isAutomaticOpen) {
        //         for (var i = 1; i <= 3; i++) {
        //             if (data.process < data.comParams[i - 1] || data.receiveRedbag < i) {//wei领取)
        //                 break;
        //             }
        //             if (i == 3) {
        //                 return;
        //             }
        //         }
        //     }
        //     var side = new IntivingNewRedPacketActivityPopup(message);
        //     PopupManager.addPopup(side);
        //     return;
        // }
        // if(id == 25){
        //     ActivityModel.wasOlderBackOpen = true;
        //     var params = JSON.parse(message.params);
        //     if(params.requestType){//0打开，1领取
        //         SyEventManager.dispatchEvent(SyEvent.GET_OLDERBACK_GIFT,params);
        //         return;
        //     }
        //     if(params.isVolverPlayer) {//不是老玩家就不显示了
        //         var side = new OlderBackActivityPop(message);
        //         PopupManager.addPopup(side);
        //     }
        //     return;
        // }
        // if(id==26){
        //     ActivityModel.wasNewUserHasGiftOpen = true;
        //     var params = JSON.parse(message.params);
        //     if(params.requestType){//0打开，1领取
        //         SyEventManager.dispatchEvent(SyEvent.GET_NEWUSERHASGIFT_GIFT,params);
        //         return;
        //     }
        //     var side = new NewUserHasGiftActivityPop(message);
        //     PopupManager.addPopup(side);
        //     return;
        // }

        if(id==ActivityId.everyday_game || id==ActivityId.invite_newFriend || id==ActivityId.bind_oldFriend){
            var params = null;
            if (message.params) {
                params = JSON.parse(message.params);
            }
            if (!params.curReward){
                var side = null;
                if (id==ActivityId.everyday_game){
                    side = new GoldActivePop(message);
                }else if(id==ActivityId.invite_newFriend){
                    side = new InviteNewFriend(message);
                }else if(id==ActivityId.bind_oldFriend){
                    side = new BindOldFriend(message);
                }
                if (side){
                    PopupManager.addPopup(side);
                }
            }else{
                SyEventManager.dispatchEvent(SyEvent.NEW_ACTIVE_REWARD,message);
            }
            return;
        }

        if(id==ActivityId.invite_newFriend){
            var side = new InviteNewFriend(message);
            PopupManager.addPopup(side);
            return;
        }

        if(id==ActivityId.bind_oldFriend){
            var side = new BindOldFriend(message);
            PopupManager.addPopup(side);
            return;
        }

        // var isUpdate = UpdateNoticeModel.isPopOut();
        cc.log("&&&&&&&&&&&&&&&&&&&&&&&&&&&",id)
        if (!LayerManager.isInRoom()) {
            PopupManager.removeClassByPopup(ActivityListPopup);
            if (!ActivityModel.isOpenAutumnPop){
                ActivityModel.isOpenAutumnPop = true;
                var side = new ActivityListPopup(message.params,ActivityId.invite_newFriend);
                PopupManager.addPopup(side);
            }else{
                var side = new ActivityListPopup(message.params, id);
                PopupManager.addPopup(side);
            }

        }
    }
})
