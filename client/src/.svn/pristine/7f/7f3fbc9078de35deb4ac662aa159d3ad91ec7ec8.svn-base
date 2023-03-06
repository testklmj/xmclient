/**
 * Created by zhoufan on 2017/7/13.
 */
var ClosingMjInfoResponder = BaseResponder.extend({

    respond:function(message){
        cc.log("ClosingMjInfoResponder::"+JSON.stringify(message));
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
        ClosingInfoModel.ext = message.ext;
        ClosingInfoModel.isReplay = false;
        ClosingInfoModel.closingPlayers = message.closingPlayers;
        ClosingInfoModel.cutCard = message.cutCard || [];
        ClosingInfoModel.groupLogId = message.groupLogId || 0;
        var wanfa = message.wanfa;
        if(message.isBreak){
            if(wanfa==MJWanfaType.ZZMJ){
                var mc = new ZZMJBigResultPop(message);
                PopupManager.addPopup(mc);
            }else if(wanfa==MJWanfaType.HZMJ){
                var mc = new HZMJBigResultPop(message);
                PopupManager.addPopup(mc);
            }else if(wanfa==MJWanfaType.SYMJ){
                var mc = new SYMJBigResultPop(message);
                PopupManager.addPopup(mc);
            }else if(wanfa==MJWanfaType.CSMJ){
                var mc = new CSMJBigResultPop(message);
                PopupManager.addPopup(mc);
            }
        }else{
            SyEventManager.dispatchEvent(SyEvent.OVER_PLAY,message);
        }
    }
})
