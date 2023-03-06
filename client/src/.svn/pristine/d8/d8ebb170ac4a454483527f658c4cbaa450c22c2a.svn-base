/**
 * Created by zhoufan on 2017/7/13.
 */
var ActivityListInfosResponder = BaseResponder.extend({

    respond:function(message){
        if (SdkUtil.isReview() || SdkUtil.isYYBReview()) {
            return;
        }
        cc.log("ActivityListInfosResponder::" + JSON.stringify(message));
        ActivityModel.initActivityList(message.configInfos);
        if (!LayerManager.isInRoom()) {
            PopupManager.removeClassByPopup(ActivityListPopup);
            // var isUpdate = UpdateNoticeModel.isPopOut();
            cc.log("ActivityModel.isOpenAutumnPop===",ActivityModel.isOpenAutumnPop)
            if (ActivityModel.isOpenAutumnPop){
                var side = new ActivityListPopup(message.configInfos);
                PopupManager.addPopup(side);
            }
        }
        //注释最新活动
        var idArray = [];
        for (var i = 0; i < message.configInfos.length; i++) {
            idArray.push(message.configInfos[i].id)
        }

        ActivityModel.isBindOldFriend = false;
        ActivityModel.isInviteNewFriend = false;
        if (ArrayUtil.indexOf(idArray, ActivityId.bind_oldFriend) >= 0) {
            ActivityModel.isBindOldFriend = true;
        }
        if (ArrayUtil.indexOf(idArray, ActivityId.invite_newFriend) >= 0) {
            ActivityModel.isInviteNewFriend = true;
        }

        if (ActivityModel.isBindOldFriend || ActivityModel.isInviteNewFriend){
            SyEventManager.dispatchEvent(SyEvent.HAS_NEW_ACTIVE);
        }

        //
        // if (ArrayUtil.indexOf(idArray, 26) >= 0) {
        //     if (!ActivityModel.wasNewUserHasGiftOpen) {
        //         setTimeout(function () {
        //             sySocket.sendComReqMsg(1005, [0], ["26"]);
        //         }, 1000);
        //     }else{
        //         return;
        //     }
        // } else if (ArrayUtil.indexOf(idArray, 25) >= 0) {
        //     if (!ActivityModel.wasOlderBackOpen) {
        //         setTimeout(function () {
        //             sySocket.sendComReqMsg(1005, [0], ["25"]);
        //         }, 900);
        //     }else{
        //         return;
        //     }
        // } else if (ArrayUtil.indexOf(idArray, 24) >= 0) {
        //     var lastDenglu = cc.sys.localStorage.getItem("last_denglu_time") || 0;
        //     //var lastDenglu =0;
        //     if ((!ActivityModel.isInvitNewPopOpen) && ( new Date().getDate() != lastDenglu)) {
        //         setTimeout(function () {
        //             sySocket.sendComReqMsg(1005, [0], ["24"]);
        //             ActivityModel.isInvitNewPopOpen = true;
        //         }, 800);
        //     }else{
        //         return;
        //     }
        // }

    }
})
