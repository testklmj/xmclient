/**
 * Created by zhoufan on 2016/6/24.
 */
var CreateTableResponder = BaseResponder.extend({

    loaderList:[],
    message:null,

    respond:function(message){
        this.message = message;
//        cc.log("CreateTableResponder::"+JSON.stringify(message));
        //sy.scene.hideLoading();
        PopupManager.removeAll();
        var players = message.players;
        var loaderList = this.loaderList = [];
        for(var i=0;i<players.length;i++){
            var p = players[i];
            p.icon = WXHeadIconManager.replaceUrl(p.icon);
            var userId = p.userId;
            var icon = p.icon;
            if(SyConfig.isIos()){
                if(WXHeadIconManager.isRemoteHeadImg(icon)){
                    var hasLocal = WXHeadIconManager.hasLocalHeadImg(userId);
                    if(hasLocal)
                        p.icon = WXHeadIconManager.getHeadImgPath(userId);
                    //if(WXHeadIconManager.isHeadImgRefresh(userId,icon) || !hasLocal){
                    //    if(!WXHeadIconManager.hasLoaded(userId))
                    //        loaderList.push({userId:userId,icon:icon});
                    //}else{
                    //    p.icon = WXHeadIconManager.getHeadImgPath(userId);
                    //}
                }
            }
        }


        GPSModel.clean();
        GPSSdkUtil.startLocation();
        for(var i=0;i<players.length;i++){
            var p = players[i];
            if(p.gps)
                GPSModel.updateGpsData(p.userId, p.gps);
        }

        if(loaderList.length>0){
            this.loadIcon();
        }else{
            this.toRoom(message);
        }
        if(message.fromOverPop == 1){//从结算弹框过来的createtable消息，重新再发个准备消息过去，防止createtable和deal消息先后顺序不对
            sySocket.sendComReqMsg(4);
        }
        GPSModel.calcDistance(PlayerModel.userId);

    },

    toRoom:function(message){
        var wanfa = message.wanfa;
         BaseRoomModel.curRoomData = message;
        //cc.log("创建房间成功 wafa ... " , wanfa);
        this.dealHandCard(message);
        switch (wanfa){
            case 113:
            case 114://打筒子
            case 115:
            case 116:
            case 117:
            case 118:
            case 210:
            case 211:
            case 212:
                DTZRoomModel.init(message);
                if(message.isGameSite>0){
                    LayerManager.showLayer(LayerFactory.MATCH_DTZ_ROOM);
                    var layer = LayerManager.getLayer(LayerFactory.MATCH_DTZ_ROOM);
                    layer.initData();
                }else {
                    var layerName = DTZRoomModel.is4Ren() ? LayerFactory.DTZ_ROOM : LayerFactory.DTZ_3REN_ROOM;
                    if (DTZRoomModel.isMatchRoom()) {
                        layerName = LayerFactory.MATCH_DTZ_ROOM;
                    }else if(DTZRoomModel.isMoneyRoom()){
                        layerName = LayerFactory.DTZ_MONEY_ROOM;
                    }
                    LayerManager.showLayer(layerName);
                    var layer = LayerManager.getLayer(layerName);
                    layer.initData();
                }
                break;
            case 15:
            case 16://跑得快
                PDKRoomModel.init(message);
                if(message.isGameSite>0){
                    LayerManager.showLayer(LayerFactory.MATCH_PDK_ROOM);
                    var layer = LayerManager.getLayer(LayerFactory.MATCH_PDK_ROOM);
                    layer.initData();
                }else {
                    var layerName = LayerFactory.PDK_ROOM;
                    if (PDKRoomModel.isMatchRoom()) {
                        layerName = LayerFactory.MATCH_PDK_ROOM;
                    }else if(PDKRoomModel.isMoneyRoom()){
                        layerName = LayerFactory.PDK_MONEY_ROOM;
                    }
                    LayerManager.showLayer(layerName);
                    cc.log("layerName==="+layerName)
                    var layer = LayerManager.getLayer(layerName);
                    layer.initData();
                }
                break;
            case PHZGameTypeModel.SYZP://邵阳字牌
            case PHZGameTypeModel.SYBP://邵阳剥皮
            case PHZGameTypeModel.LDFPF://娄底放炮罚
                PHZRoomModel.init(message);
                var LayerName = LayerFactory.PHZ_ROOM_MORE;
                if (message.renshu==3){
                    LayerName = LayerFactory.PHZ_ROOM;
                }else if (message.renshu==2){
                    LayerName = LayerFactory.PHZ_ROOM_LESS;
                }
                if(PHZRoomModel.isMoneyRoom()){
                    LayerName = LayerFactory.PHZ_MONEY_ROOM;
                }
                //cc.log("LayerName========"+LayerName)
                LayerManager.showLayer(LayerName);
                var layer = LayerManager.getLayer(LayerName);
                layer.initData();
                break;
            case 131:
                BBTRoomModel.init(message);
                var LayerName = LayerFactory.BBT_ROOM;
                LayerManager.showLayer(LayerName);
                var layer = LayerManager.getLayer(LayerName);
                layer.initData();
                break;
            case 91:
            case 92:
                DdzRoomModel.init(message);
                var LayerName = LayerFactory.DDZ_ROOM;
                if(DdzRoomModel.isMoneyRoom()){
                    LayerName = LayerFactory.DDZ_MONEY_ROOM;
                }
                LayerManager.showLayer(LayerName);
                var layer = LayerManager.getLayer(LayerName);
                layer.initData();
                break;
            case MJWanfaType.ZZMJ:
                MJRoomModel.init(message);
                var LayerName = LayerFactory.ZZMJ_ROOM;
                if(message.renshu == 3) {
                    LayerName = LayerFactory.ZZMJ_ROOM_THREE;
                } else if(message.renshu == 2){
                    LayerName = LayerFactory.ZZMJ_ROOM_TWO;
                }
                cc.log("message.renshu",message.renshu);
                LayerManager.showLayer(LayerName);
                var layer = LayerManager.getLayer(LayerName);
                layer.initData();
                break;
            case MJWanfaType.HZMJ:
                MJRoomModel.init(message);
                var LayerName = LayerFactory.HZMJ_ROOM;
                if(message.renshu == 3) {
                    LayerName = LayerFactory.HZMJ_ROOM_THREE;
                } else if(message.renshu == 2){
                    LayerName = LayerFactory.HZMJ_ROOM_TWO;
                }
                //cc.log("message.renshu",message.renshu);
                LayerManager.showLayer(LayerName);
                var layer = LayerManager.getLayer(LayerName);
                layer.initData();
                break;
            case MJWanfaType.SYMJ:
                MJRoomModel.init(message);
                var LayerName = LayerFactory.SYMJ_ROOM;
                if(message.renshu == 3) {
                    LayerName = LayerFactory.SYMJ_ROOM_THREE;
                } else if(message.renshu == 2){
                    LayerName = LayerFactory.SYMJ_ROOM_TWO;
                }
                //cc.log("message.renshu",message.renshu);
                LayerManager.showLayer(LayerName);
                var layer = LayerManager.getLayer(LayerName);
                layer.initData();
                break;
            case MJWanfaType.CSMJ:
                MJRoomModel.init(message);
                var LayerName = LayerFactory.CSMJ_ROOM;
                if(message.renshu == 3) {
                    LayerName = LayerFactory.CSMJ_ROOM_THREE;
                } else if(message.renshu == 2){
                    LayerName = LayerFactory.CSMJ_ROOM_TWO;
                }
                LayerManager.showLayer(LayerName);
                var layer = LayerManager.getLayer(LayerName);
                layer.initData();
                break;
        }
        IMSdkUtil.sdkApplyMessageKey("");
        SyEventManager.dispatchEvent("shazhu_get");
    },

    loadIcon:function(){
        if(this.loaderList.length<=0){
            this.toRoom(this.message);
            return;
        }
        var obj = this.loaderList.pop();
        WXHeadIconManager.saveFile(obj.userId,obj.icon,this.loadIcon,this);
        cc.log("weixinIconMsg..." , JSON.stringify(obj.icon));
    },


    dealHandCard:function(message){
        var jushu = 0;
        var seat = 0;
        if(message.wanfa == 8){          //打筒子
            jushu = DTZRoomModel.nowBurCount;
            if(DTZRoomModel.getPlayerVo()){
                seat = DTZRoomModel.getPlayerVo().seat;
            }else{
                seat = 1;
            }
        }else if(message.wanfa == 1){    //跑得快
            jushu = PDKRoomModel.nowBurCount;
            if(PDKRoomModel.getPlayerVo()){
                seat = PDKRoomModel.getPlayerVo().seat;
            }else{
                seat = 1;
            }
        }else if(message.wanfa == 4){    //跑胡子
            jushu = PHZRoomModel.nowBurCount;
            if(PHZRoomModel.getPlayerVo()){
                seat = PHZRoomModel.getPlayerVo().seat;
            }else{
                seat = 1;
            }
        }else if(message.wanfa == 10){
            jushu = BBTRoomModel.nowBurCount;
            if(BBTRoomModel.getPlayerVo()){
                seat = BBTRoomModel.getPlayerVo().seat;
            }else{
                seat = 1;
            }
        }else if(message.wanfa == 7){
            jushu = DdzRoomModel.nowBurCount;
            if(DdzRoomModel.getPlayerVo()){
                seat = DdzRoomModel.getPlayerVo().seat;
            }else{
                seat = 1;
            }
        }else if(message.wanfa == MJWanfaType.ZZMJ || MJWanfaType.HZMJ || MJWanfaType.SYMJ){
            jushu = MJRoomModel.nowBurCount;
            if(MJRoomModel.getPlayerVo()){
                seat = MJRoomModel.getPlayerVo().seat;
            }else{
                seat = 1;
            }
        }


         for(var i = 0;i < message.players.length;i++){
            var p = message.players[i];
            var _a =  message.players[i].seat + "" + message.nowBurCount;
//            cc.log("a================",message.players[i].handCardIds,message.players[i].cardStr);
            if((!message.players[i].handCardIds || message.players[i].handCardIds.length <= 0) && (message.players[i].cardStr && message.players[i].cardStr.length > 0)){
                message.players[i].handCardIds = [];
                for(var j = 0 ; j < message.players[i].cardStr.length ; ++j) {
                    var _newS = this.stringToChars(message.players[i].cardStr[j]  , Number(_a));
//                    cc.log("来了2222===========================",_newS);
                    message.players[i].handCardIds.push(Number(_newS));
                }
            }
//            cc.log("b================",_a,message.players[i].handCardIds)
        }

    },

    stringToChars:function(_s ,_a){
        var _r = "";
        for(var i = 0;i < _s.length;i++){
            _r += String.fromCharCode(_s.charCodeAt(i) ^ _a);
        }
        return _r;
    }
})
