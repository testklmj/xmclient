/**
 * Created by Administrator on 2016/8/30.
 */
var MJReplayModel = {
    tableId:0,
    players:[],
    mySeat:0,
    steps:[],
    step:0,
    dataByStep:{},
    outSeatByStep:{},
    closingData:[],
    baoPaiId:0,
    init:function(data){
        cc.log("data::"+JSON.stringify(data));
        this.tableId = data.tableId;
        this.wanfa = data.playType;
        this.renshu = data.playerMsg.length;
        this.dataByStep = {};
        this.outSeatByStep = {};
        this.roomName ="";
        if(data.generalExt){
            var ext = JSON.parse(data.generalExt);
            // cc.log("ext.roomName =",ext.roomName);
            if(ext.roomName){
                this.roomName =ext.roomName;
            }
        }
        if(this.renshu == 3){
            this.seatSeq = {
                1:[1,2,3],
                2:[2,3,1],
                3:[3,1,2]}
        }else if(this.renshu == 4){
            this.seatSeq = {
                1:[1,2,3,4],
                2:[2,3,4,1],
                3:[3,4,1,2],
                4:[4,1,2,3]}
        }else if(this.renshu == 2){
            this.seatSeq = {
                1:[1,2],
                2:[2,1]}
        }
        this.players.length=0;
        this.closingMsg = JSON.parse(data.closingMsg);
        this.closingData.length=0;
        for(var i=0;i<data.resList.length;i++){
            this.players.push(JSON.parse(data.resList[i]));
            this.closingData.push(JSON.parse(data.resList[i]));
            this.closingData[i].dahus = this.closingData[i].dahus || [];
            this.closingData[i].xiaohus = this.closingData[i].xiaohus || [];
            this.closingData[i].mcards = this.closingData[i].mcards || [];
            this.closingData[i].moldPais = this.closingData[i].moldPais || [];
        }
        this.closingMsg.closingPlayers = this.closingData;
        var playLogs = data.play.split(";");

        for(var i=0;i<this.renshu;i++){
            for(var j=0;j<this.players.length;j++){
                if(this.players[j].seat == (i+1)){
                    this.players[j].handCardIds = playLogs[i+1].split(",");
                }
            }
        }
        this.steps.length=0;
        this.step = 0;
        for(;i<playLogs.length;i++){
            var temp = playLogs[i].split("_");
            if(temp.length>=3){
                if(parseInt(temp[2])==12 && this.isShowOperate())//??????????????????????????????????????????
                    continue;
                this.steps.push(temp);
            }
        }
        //this.mySeat = this.getPlayerVo().seat;
        var isDaiKai = data.isDaiKai;
        if(!this.getPlayerVo()){
            this.mySeat = this.players[0].seat;
        }else{
            this.mySeat = this.getPlayerVo().seat;
        }
        var closingMsg = JSON.parse(data.closingMsg);
        ClosingInfoModel.ext = closingMsg.ext;
        ClosingInfoModel.isReplay = true;

        var huList = closingMsg.huList;
        this.huList = {};
        if(huList) {
            for (var i = 0; i < huList.length; i++) {
                var huRecord = huList[i];
                var huSeat = huRecord.ext[0];
                if (!this.huList[huSeat]) {
                    this.huList[huSeat] = [];
                }
                this.huList[huSeat].push(huRecord);
            }
        }
      this.checkTuoGuan();
    },

    checkTuoGuan:function(){
        this.tgState = {1:[0],2:[0],3:[0],4:[0]};
        var curState = {1:0,2:0,3:0,4:0};
        for(var i = 0;i<this.steps.length;++i){
            var data = this.steps[i];
            if(data[2] == 100){
                curState[data[1]] = Number(data[3].split(",")[0]);
            }
            for(var key in this.tgState){
                this.tgState[key].push(curState[key]);
            }
        }
    },

    isShowOperate:function(){
        return (this.wanfa != MJWanfaType.JCHS && this.wanfa != MJWanfaType.TSMJ && this.wanfa != MJWanfaType.JNMJ
        && this.wanfa != MJWanfaType.PLMJ && this.wanfa != MJWanfaType.LXMJ && this.wanfa != MJWanfaType.WWMJ && !this.isAllJQMJ());
    },

    isAllJQMJ:function(){
        return (this.wanfa == MJWanfaType.JQEB || this.wanfa == MJWanfaType.JQMJ || this.wanfa == MJWanfaType.JQSB || this.wanfa == MJWanfaType.JQTJ)
    },

    getHuRecordById: function(seat, mjId) {
        var list = this.huList[seat];
        var record = null;
        if (list) {
            for (var i=0;i<list.length;i++) {
                var huRecord = list[i];
                if(huRecord.ext[2] == mjId) {
                    record = huRecord;
                    break;
                }
            }
        }
        return record;
    },

    getPlayerBySeat:function(seat){
        var userId = 0;
        for(var j=0;j<this.players.length;j++){
            var p = this.players[j];
            if(p.seat == seat){
                userId = p.userId;
                break;
            }
        }
        return userId;
    },

    getHuPoint: function(playerVo) {
        if (!playerVo.hasOwnProperty("huPoint")) {
            playerVo.huPoint = 0;
        }
        return playerVo.huPoint;
    },

    setHuPoint: function(playerVo, currentPoint) {
        playerVo.huPoint = currentPoint;
    },

    getNextSeat:function(){
        var seat = -1;
        var step = this.getCurrentlyStep();
        if(step)
            seat = step.seat;
        return seat;
    },

    saveDataByStep:function(step,direct,data1,data2,data3,data4){
        var prefix = step+"_"+direct;
        if(!this.dataByStep[prefix]){
            this.dataByStep[prefix] = {data1:data1,data2:data2,data3:data3,data4:data4};
        }
    },

    saveLastOutSeatByStep:function(step,seat){
        seat = (step==-1) ? -1 : seat;
        this.outSeatByStep[step] = seat;
    },

    getDataByStep:function(step,direct){
        var prefix = step+"_"+direct;
        return this.dataByStep[prefix];
    },

    getLastOutSeatByStep:function(step){
        return this.outSeatByStep[step];
    },

    isFinish:function(){
        return (this.step==this.steps.length);
    },

    rew:function(){
        if(this.step>0)
            this.step--;
    },

    ff:function(){
        if(this.step<this.steps.length)
            this.step++;
    },

    getBaoPaiId:function(){
        for(var i=0;i<this.steps.length;i++){
            var temp = this.steps[i];
            if(temp[2]==23) {
                this.baoPaiId = temp[3];
                break;
            }
        }
    },

    getCurrentlyStep:function(){
        var temp = this.steps[this.step];
        if(!temp)
            return null;


        var stepVo = {};//??????????????????
        stepVo.seat = parseInt(temp[1]);
        stepVo.action = parseInt(temp[2]);
        stepVo.ids = temp.length>3 ? temp[3].split(",") : "";
        stepVo.type = temp.length>4 ? temp[4].split(",") : 0;
        cc.log("getCurrentlyStep===",JSON.stringify(this.steps[this.step]),temp[5])
        if (temp[5] && parseInt(temp[5]) == -1){
            return null;
        }
        return stepVo;
    },

    getNextStep:function(){
        var temp = this.steps[this.step+1];
        if(!temp)
            return null;
        var stepVo = {};//??????????????????
        stepVo.seat = parseInt(temp[1]);
        stepVo.action = parseInt(temp[2]);
        stepVo.ids = temp[3].split(",");
        stepVo.type = temp.length>4 ? temp[4] : 0;
        return stepVo;
    },

    getLastStep:function(){
        var temp = this.steps[this.step - 1];
        if (!temp)
            return null;
        var stepVo = {};//??????????????????
        stepVo.seat = parseInt(temp[1]);
        stepVo.action = parseInt(temp[2]);
        stepVo.ids = temp[3].split(",");
        stepVo.type = temp.length > 4 ? temp[4] : 0;
        return stepVo;
    },

    getPlayerVo:function(userId){
        userId = userId || PlayerModel.userId;
        var player = null;
        for(var i=0;i<this.players.length;i++){
            var p = this.players[i];
            if(p.userId == userId){
                player = p;
                break;
            }
        }
        return player;
    },

    getPlayerSeq:function(userId,ownSeat,seat){
        if(userId == PlayerModel.userId)
            return 1;
        var seqArray = this.seatSeq[ownSeat];
        var seq = ArrayUtil.indexOf(seqArray,seat)+1;
        return seq;
    },

    getPaoJianTou: function(paoSeq) {
        var seq = this.seatSeq[1];
        var index = ArrayUtil.indexOf(seq, paoSeq);
        if(this.renshu == 3 && paoSeq == 3){
            index = 3;
        }
        if(this.renshu == 2 && paoSeq == 2){
            index = 2;
        }
        var tex = "jt_";
        switch (index) {
            case 0:
                tex += "bottom";
                break;
            case 1:
                tex += "next";
                break;
            case 2:
                tex += "up";
                break;
            case 3:
                tex += "last";
                break;
        }
        tex += ".png";
        return tex;
    },


    isGSMJ: function() {
        return (this.wanfa==101);
    },

    isLNMJ: function() {
        return (this.wanfa==102);
    },

    isKETMJ: function() {
        return (this.wanfa==103);
    },

    isHuiPai: function() {
        return (this.wanfa==104);
    },

    isZYMJ: function() {
        return (this.wanfa==106);
    },

    isGCMJ: function() {
        return (this.wanfa==105);
    },

    isJQMJ:function(){
        return (this.wanfa==506);
    },

    isJQSB:function(){
        return (this.wanfa==507);
    },

    isJQTJ:function(){
        return (this.wanfa==508);
    },

    isJQEB:function(){
        return (this.wanfa==509);
    },

    isLZEB:function(){
        return (this.wanfa==510);
    },

}