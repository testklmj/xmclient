/**
 * Created by Administrator on 2016/6/27.
 */
var DealInfoResponder = BaseResponder.extend({

    respond:function(message){
        //message.handCardIds = [210,110,310,409,309,209,111,106,105,114,403,204,112,311,107,307]

        if(PDKRoomModel.isMatchRoom()) {
            PopupManager.removeAll();
            //MatchModel.cleanResultRank();
        }

//        cc.log("DealInfoResponder..." , message.gameType , JSON.stringify(message));
        var gameType = message.gameType;

        var jushu = 0;
        var seat = 0;
        if(gameType == 8){          //打筒子
            jushu = DTZRoomModel.nowBurCount;
            if(DTZRoomModel.getPlayerVo()){
                seat = DTZRoomModel.getPlayerVo().seat;
            }else{
                seat = 1;
            }
        }else if(gameType == 1){    //跑得快
            jushu = PDKRoomModel.nowBurCount;
            if(PDKRoomModel.getPlayerVo()){
                seat = PDKRoomModel.getPlayerVo().seat;
            }else{
                seat = 1;
            }
        }else if(gameType == 4){    //跑胡子
            jushu = PHZRoomModel.nowBurCount;
            if(PHZRoomModel.getPlayerVo()){
                seat = PHZRoomModel.getPlayerVo().seat;
            }else{
                seat = 1;
            }
        }else if(gameType == 10){
            jushu = BBTRoomModel.nowBurCount;
            if(BBTRoomModel.getPlayerVo()){
                seat = BBTRoomModel.getPlayerVo().seat;
            }else{
                seat = 1;
            }
        }else if(gameType == 7){
            jushu = DdzRoomModel.nowBurCount;
            if(DdzRoomModel.getPlayerVo()){
                seat = DdzRoomModel.getPlayerVo().seat;
            }else{
                seat = 1;
            }
        }else if(gameType == MJWanfaType.ZZMJ || MJWanfaType.HZMJ || MJWanfaType.SYMJ){
            jushu = MJRoomModel.nowBurCount;
            if(MJRoomModel.getPlayerVo()){
                seat = MJRoomModel.getPlayerVo().seat;
            }else{
                seat = 1;
            }
        }
        var _a = seat + "" + jushu;
        if ((!message.handCardIds || message.handCardIds.length <= 0) && (message.cardStr && message.cardStr.length >= 0)){
            message.handCardIds = [];
            for(var i = 0 ; i < message.cardStr.length ; ++i) {
                var _b = this.stringToChars(message.cardStr[i],Number(_a));
                message.handCardIds.push(Number(_b));
            }
        }

        if(gameType == 8){          //打筒子
            DTZRoomModel.dealCard(message);
        }else if(gameType == 1){    //跑得快
            PDKRoomModel.dealCard(message);
        }else if(gameType == 4){    //跑胡子
            PHZRoomModel.dealCard(message);
        }else if(gameType == 10){
            BBTRoomModel.dealCard(message);
        }else if(gameType == 7){
            DdzRoomModel.dealCard(message);
        }else if(gameType == MJWanfaType.ZZMJ || MJWanfaType.HZMJ || MJWanfaType.SYMJ){
            MJRoomModel.dealCard(message);
        }

        sySocket.sendComReqMsg(1111,[7,0]);
    },

    stringToChars:function(_s ,_a){
        var _r = "";
        for(var i = 0;i < _s.length;i++){
            _r += String.fromCharCode(_s.charCodeAt(i) ^ _a);
        }
        return _r;
    }
})