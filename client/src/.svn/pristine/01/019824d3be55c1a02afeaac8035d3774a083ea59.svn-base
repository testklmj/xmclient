/**
 * Created by Administrator on 2016/6/27.
 */
var JoinTableResponder = BaseResponder.extend({

    respond:function(message){
        //cc.log("JoinTableResponder::"+JSON.stringify(message));
        //{"player":{"userId":"111","name":"test111","seat":1,"sex":1,"icon":"123","point":0,"handCardIds":[],"outCardIds":[]},"nextSeat":null}
        var wanfa = message.wanfa;
        var p = message.player;
        if(WXHeadIconManager.isRemoteHeadImg(p.icon)){
            p.icon = WXHeadIconManager.replaceUrl(p.icon);
            if(WXHeadIconManager.hasLocalHeadImg(p.userId)){
                p.icon = WXHeadIconManager.getHeadImgPath(p.userId);
            }
        }
        switch (wanfa) {
            case 113:
            case 114://打筒子
            case 115:
            case 116:
            case 117:
            case 118:
            case 210:
            case 211:
            case 212:
                DTZRoomModel.join(message.player);
                break;
            case 15:
            case 16:
                PDKRoomModel.join(message.player);
                break;
            case PHZGameTypeModel.SYZP://邵阳字牌
            case PHZGameTypeModel.SYBP://邵阳剥皮
            case PHZGameTypeModel.LDFPF://娄底放炮罚
                PHZRoomModel.join(message.player);
                break;
            case 131:
                BBTRoomModel.join(message.player);
                break;
            case 91:
            case 92:
                DdzRoomModel.join(message.player);
                break;
            case MJWanfaType.ZZMJ:
            case MJWanfaType.HZMJ:
            case MJWanfaType.SYMJ:
            case MJWanfaType.CSMJ:
                MJRoomModel.join(message.player);
                break;
        }

    }
})