/**
 * Created by zhoufan on 2016/11/29.
 */
var ClosingPhzInfoResponder = BaseResponder.extend({

    respond:function(message) {
        //cc.log("ClosingPhzInfoResponder::"+JSON.stringify(message));
        var players = message.closingPlayers;
        for(var i=0;i<players.length;i++){
            var p = players[i];
            if(!LoginData.isLoadIcon()){//屏蔽头像加载
                p.icon = "";
                cc.log("head icon has blocked, now icon url is::"+ p.icon);
            }
            if(WXHeadIconManager.isRemoteHeadImg(p.icon)){
                p.icon = WXHeadIconManager.replaceUrl(p.icon);
                if(WXHeadIconManager.hasLocalHeadImg(p.userId)){
                    p.icon = WXHeadIconManager.getHeadImgPath(p.userId);
                }
            }
        }
        ClosingInfoModel.round = message.ext[5];
        ClosingInfoModel.ext = message.ext;
        ClosingInfoModel.isReplay = false;
        ClosingInfoModel.closingPlayers = message.closingPlayers;
        ClosingInfoModel.cards = message.cards;
        ClosingInfoModel.leftCards = message.leftCards;
        ClosingInfoModel.tun = message.tun;
        ClosingInfoModel.fan = message.fan;
        ClosingInfoModel.huxi = message.huxi;
        ClosingInfoModel.huSeat = message.huSeat;
        ClosingInfoModel.huCard = message.huCard;
        ClosingInfoModel.totalTun = message.totalTun;
        ClosingInfoModel.fanTypes = message.fanTypes;
        ClosingInfoModel.firstCard = message.firstCard;
        ClosingInfoModel.startLeftCards = message.startLeftCards || [];
        ClosingInfoModel.groupLogId = message.groupLogId||0;//俱乐部名片id
        var wanfa = message.wanfa;
        if(message.isBreak){
            if(PopupManager.hasClassByPopup(PHZSmallResultPop)){
                PopupManager.removeClassByPopup(PHZSmallResultPop);
            }
            var mc = new PHZBigResultPop(message.closingPlayers);
            PopupManager.addPopup(mc);
        }else{
            SyEventManager.dispatchEvent(SyEvent.OVER_PLAY,message.closingPlayers);
        }
    }

});
