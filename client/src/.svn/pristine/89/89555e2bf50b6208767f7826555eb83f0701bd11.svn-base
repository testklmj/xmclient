/**
 * Created by xiaofu on 2017/9/1.
 */

/**
 * 卡牌的数据映射
 * @type {{userId: number, name: string, seat: number, sex: number, icon: string, point: number, status: number, ip: string}}
 */
var RoomPlayerVo = {
    userId: 0,
    name: 0,
    seat: 0,
    sex: 0,
    icon: "",
    point: 0,
    status: 0,
    handCardIds: null,
    outCardIds: null,
    recover: null,
    ip: "",
    outedIds: null,
    moldIds: null,
    angangIds: null,
    ext: [],
    needScore:100,
};

var BBTRoomModel = {
    seatSeq: {
        1: [1, 2, 3],
        2: [2, 3, 1],
        3: [3, 1, 2],
        4: [4 , 1 , 2 , 3]
    },
    tableId: 0,
    nowBurCount: 0,
    totalBurCount: 0,
    wanfa3:113,
    wanfa4:114,
    /**
     * {Array.<RoomPlayerVo>}
     */
    players: [],
    mySeat: 0,
    nextSeat: 0,
    btMap: {},
    promptCardPattern: null,
    lastTipCards:null,
    wanfa: 0,
    renshu: 0,
    _playersIp: [],
    ipSameTipStr: null,
    isStart: false,
    ext: [],
    cardsListNum:3,//几副牌模式
    isGameSite: 0,//是否比赛场
    gameSiteRound: 0,// 比赛场当前轮数
    promotionNum: 0,// 晋级人数
    integralTimes: 0,// 倍数加成
    roundNumber: 0,   // 当前轮参赛人数
    gameSiteMaxRound: 0,//比赛场最大轮数
    aTeamScore:0,//a组当前的总分数
    bTeamScore:0,//b组当前的总分数
    aTeamTongziScore:0,//a组所有筒子分
    bTeamTongziScore:0,//b组所有筒子分
    aTeamCurScore:0,//a组这一局的当前分数
    bTeamCurScore:0,//b组这一局的当前分数
    fiveNum:0,
    tenNum:0,
    kNum:0,
    cleanCards:1,//清牌的逻辑开关
    //界面布局相关参数
    firstLineLimit : 23,
    initCardYLine1 : 95,
    initCardYLine2 : 15,
    initX : 100,
    _cardScale : 1.1,
    _letOutCardScale : 0.85,

    ENTRY:0,
    READY:1,
    CHUI:2,
    KAIQIANG:3,
    ROBBANKER:4,
    DOU:5,
    PLAY:6,
    OVER:7,
    isCanDu:-2,
    zjScorePai:[],
    xjScorePai:[],
    isKingCard:false,
    init: function (message) {
        //cc.log("BBTRoomModel init ..." , JSON.stringify(message));
        //cc.log("BBTRoomModel data..." , message.num5 , message.num10 , message.numk );
        //{"tableId":"100001","nowBurCount":1,"totalBurCount":10,"players":[{"userId":"999","name":"test","seat":3,"sex":1,"icon":"123","point":0,"handCardIds":[],"outCardIds":[]}],"nextSeat":null}
        this.wanfa = message.wanfa;
        this.renshu = message.renshu;
        this.aTeamScore = message.apoint || 0;
        this.bTeamScore = message.bpoint || 0;
        this.curScore = message.score || 0;
        this.aTeamTongziScore = message.tzAgroup || 0;
        this.bTeamTongziScore = message.tzBgroup || 0;
        this.fiveNum = message.num5 || 0;
        this.tenNum = message.num10 || 0;
        this.kNum = message.numk || 0;
        this.aTeamCurScore = 0;
        this.bTeamCurScore = 0;
        this.exScore = message.jiangli;
        this.endScore = message.MaxScore;
        this.costFangFei = message.fangfei;
        this.nextSeat = message.nextSeat;
        this.scoreCard = message.scoreCard;
        this.isDark8 = 0;
        this.isRemove67 = 0;
        this.roundCardType = message.roundCardType || 0; //本轮出的牌型

        this.roomName = message.roomName;

        //cc.log("bbt当前创建的房间的玩法为：" , this.wanfa);
        //cc.log("bbt创建房间后台下发的部分数据为 ：",this.wanfa);
        this.loadExtData(message);

        if (this.renshu == 2) {
            this.seatSeq = {1: [1, 2], 2: [2, 1]};
        } else if (this.renshu == 3) {
            this.seatSeq = {1: [1, 2, 3], 2: [2, 3, 1], 3: [3, 1, 2]};
        } else if (this.renshu == 4) {
            this.seatSeq = {1: [1, 2, 3, 4], 2: [2, 3, 4, 1], 3: [3, 4, 1, 2] , 4: [4, 1, 2, 3] };
        }

        BBTAI.MAX_CARD = this.wanfa;
        this.tableId = message.tableId;
        this.nowBurCount = message.nowBurCount;
        this.totalBurCount = message.totalBurCount;
        this.players = message.players;
        //cc.log("后台下发的 玩家数量！！！！！！！！！！！！！！！：" , this.players.length);
        //cc.log("this.players :" + JSON.stringify(message.players) );
        this.ext = message.ext;
        //cc.log("创建房间的ext数据:" , this.ext);

        this.creditConfig = message.creditConfig || [];
        this.isCredit = this.creditConfig[0];//是否是比赛房
        this.creditScore =  this.creditConfig[3];//底分
        this.creditGiveNum =  this.creditConfig[4];//赠送分
        this.creditType = this.creditConfig[5];//赠送类型1固定2比例
        this.creditWay = this.creditConfig[6];//赠送方式1大赢家2所有赢家

        this.isStart = false;
        for (var i = 0; i < this.players.length; i++) {
            var p = this.players[i];
            p.isRoladIcon = 0;
            //cc.log("玩家的ext数据..." , this.players[i].ext);
            if (p.userId == PlayerModel.userId) {
                var ids = p.handCardIds;
                //cc.log("this.players handCardIds :" + ids.length + JSON.stringify( p.handCardIds) , p.handCardIds.length );
                var cardIds = [];
                for (var j = 0; j < ids.length; j++) {
                    cardIds.push(BBTAI.getCardDef(ids[j]));
                }
                p.handCardIds = cardIds;
                if (p.handCardIds.length > 0 || p.outCardIds.length > 0) {
                    this.isStart = true;
                }
                break;
            }
            if (p.handCardIds.length > 0 || p.outCardIds.length > 0) {
                this.isStart = true;
            }
        }

        //cc.log("后台下发的玩家当局分数为..." , this.aTeamCurScore , this.bTeamCurScore);

        this.isGameSite = 0;
        //比赛场信息
        if (message.matchExt) {
            this.isGameSite = message.matchExt[0];
            this.gameSiteRound = message.matchExt[1];
            this.promotionNum = message.matchExt[2];
            this.integralTimes = message.matchExt[3];
            this.roundNumber = message.matchExt[4];
            this.gameSiteMaxRound = message.matchExt[5];
        }
        this.mySeat = this.getPlayerVo().seat;
        this.cleanData();
        //if (this.players.length > 1 && this.isIpSame() && !this.isStart && (this.nowBurCount == 1)) {//第一局是否开始
        //    cc.log("显示IP冲突界面...BBTRoomModel" , this.isStart);
        //    this.showTipsIpSame();
        //}else{
        //    cc.log("不显示ip提示... 记录的相同ip的描述为..." , this.ipSameTipStr , this.nowBurCount , this.isStart);
        //}
        this.generalExt = message.generalExt || 0;

        this.isKingCard = false;
    },

    getPlayerIsNowTuoguan:function(playerVo){
        return playerVo.ext[8];
    },

    //获取是否托管
    isAutoPlay:function(){
        return (this.ext[20] || false);
    },

    isBanVoiceAndProps: function() {
        var isOpen = false;
        if (this.generalExt && Number(this.generalExt[0])){
            isOpen = true;
        }
        return isOpen;
    },

    //是否是比赛房
    isCreditRoom:function(){
        return this.isCredit;
    },

    //获取比赛分数
    getCreditNum: function(playerVo) {
        return (playerVo.credit || 0);
    },

    //获取比赛底分
    getCreditScore: function() {
        return this.creditScore;
    },

    //获取赠送的值或者比例
    getCreditGiveNum: function() {
        return this.creditGiveNum;
    },

    //获取赠送类型固定还是比例
    getCreditType: function() {
        return this.creditType;
    },

    //获取赠送方式大赢家还是所有赢家
    getCreditWay: function() {
        return this.creditWay;
    },

    getFangFeiName: function(val) {
        var def = ["AA支付","房主支付","群主支付"];
        return def[val-1];
    },

    isQFWSK:function(){
        return this.ext[5] == 1;
    },

    isZT:function(){
        return this.ext[6] == 1;
    },


    isYDou:function(){
        for(var i=0;i<this.players.length;i++){
            var p = this.players[i];
            if( p.ext[5] == 1){
                return true;
            }
        }
        return false;
    },

    rreshTuStatus:function(param){
        var message = [];
        message.seat = param[0];
        message.tu = param[1];
        if( param[2] == 1 && BBTRoomModel.isZT()){
            message.firstTu = 1;
        }
        for(var i=0;i<this.players.length;i++){
            var p = this.players[i];
            if(p.seat == message.seat){
                if( param[2] == 1 && BBTRoomModel.isZT()){
                    p.ext[7] = 1;
                }
                p.ext[5] = message.tu;
                SyEventManager.dispatchEvent(SyEvent.SHOW_TU, message);
            }
        }
    },

    rreshRobberStatus:function(param){
        var message = [];
        message.seat = param[0];
        message.robber = param[1];
        for(var i=0;i<this.players.length;i++){
            var p = this.players[i];
            if(p.seat == message.seat){
                p.ext[4] = message.robber;
                SyEventManager.dispatchEvent(SyEvent.SHOW_ROBBER, message);
            }
        }
    },

    rreshKaiqStatus:function(param){
        var message = [];
        message.seat = param[0];
        message.kaiqiang = param[1];
        for(var i=0;i<this.players.length;i++){
            var p = this.players[i];
            if(p.seat == message.seat){
                p.ext[3] = message.kaiqiang;
                SyEventManager.dispatchEvent(SyEvent.SHOW_KAIQIANG, message);
            }
        }
    },

    rreshChuiStatus:function(param){
        var message = [];
        cc.log("chui"+param[1]+"seat"+param[0]);
        message.seat = param[0];
        message.chui = param[1];
        for(var i=0;i<this.players.length;i++){
            var p = this.players[i];
            if(p.seat == message.seat){
                p.ext[2] = message.chui;
                SyEventManager.dispatchEvent(SyEvent.SHOW_CHUi, message);
            }
        }
    },

    getCurrentStage:function(){
        return this.ext[1];
    },

    updateStatus:function(param){
        if(param.length > 1){
            this.ext[3] = param[1]; //庄的位置
            this.isCanDu = param[2]; // 0表不显示途 1，显示 2，调试2个炸表不多
        }
        this.ext[1] = param[0];
        if(this.ext[1] == BBTRoomModel.PLAY ){
            SyEventManager.dispatchEvent(SyEvent.SHOW_HTTHREE);
        }
        SyEventManager.dispatchEvent(SyEvent.BBT_STATUS_UPDATE,this.ext[1]);
    },


    loadExtData:function(message){
        this.aTeamScore = message.ext[1] || 0;
        this.bTeamScore = message.ext[2] || 0;
        this.curScore = message.ext[3] || 0;

        this.fiveNum = message.ext[4] || 0;
        this.tenNum = message.ext[5] || 0;
        this.kNum = message.ext[6] || 0;

        this.aTeamTongziScore = message.ext[7] || 0;
        this.bTeamTongziScore = message.ext[8] || 0;

        this.costFangFei = message.ext[9];
        this.endScore = message.ext[10];
        this.exScore = message.ext[11];

        this.isDark8 = message.ext[12];//是否扑八张
        this.isRemove67 = message.ext[13];//是否移除67

        this.timeOut = message.ext[21];//托管时间
        if (this.timeOut){
            this.timeOut = Math.floor(this.timeOut/1000);
        }else{
            this.timeOut = 30;
        }
    },

    FixScore:function(param){
        var message = [];
        message.seat = param[0];
        message.zj = param[1];
        message.score = param[2];
        if(message.zj == 1){
            this.ext[7] =  message.score;
            for(var i=3; i<param.length; i++){
                this.zjScorePai.push(param[i]);
            }
        }else{
            this.ext[8] =  message.score;
            for(var i=3; i<param.length; i++){
                this.xjScorePai.push(param[i]);
            }
        }
        SyEventManager.dispatchEvent(SyEvent.SHOW_SCORE, message);
    },

    decideZhuang:function(seat,zhuang){
        var self = this;
        var obj = {};
        obj.seat = seat;
        obj.zhuang = zhuang;
        for(var i=0;i<this.players.length;i++){
            var p = this.players[i];
            if(p.seat==seat){
                this.ext[3] = seat;
                //庄家定了 进入下注状态
                SyEventManager.dispatchEvent(SyEvent.BBT_DECIDE_ZHUANG,obj);
                if(zhuang != null){
                    if(zhuang.length == 1){
                        //this.updateStatus(this.BET);
                    }else{
                        setTimeout(function() {
                            //self.updateStatus(self.BET);
                        },2000);
                    }
                }else{
                   // this.updateStatus(this.BET);
                }

                break;
            }
        }

    },

    isZj:function(playerVo){//玩家是否是庄家
      return (playerVo.ext[3]==1);
    },

    getZjScore:function(){
        return this.ext[7];
    },

    getxjScore:function(){
        return this.ext[8];
    },

    getPlayerMC:function(playerVo){
        return playerVo.ext[6];
    },

    getFirstDou:function(playerVo){
        return playerVo.ext[7];
    },

    getPlayerDou:function(playerVo){
        return playerVo.ext[5];
    },

    getPlayerChui:function(playerVo){
        return playerVo.ext[2];
    },

    getPlayerKaiqiang:function(playerVo){
        return playerVo.ext[3];
    },

    getPlayerQz:function(playerVo){
        return playerVo.ext[4];
    },

    getWangSeat:function(){
        return this.ext[2];
    },

    getBrankerSeat:function(){
        return this.ext[3];
    },


    //玩家的房内头像是否已经绘制完全
    isRoomIconRoad:function()
    {
        for(var i=0;i<this.players.length;i++){
            var p = this.players[i];
            if(p.isRoladIcon != 1 && p.seat != 0){
                return false;
            }
        }
        return true;

    },

    isWanfa15:function(){
        return this.wanfa == 15;
    },

    isWanfa16:function(){
        return this.wanfa == 16;
    },

    updateGPS: function (userId, gps) {
        var p = this.getPlayerVo(userId);
        p.gps = gps;
    },

    baoting: function (seat) {
        this.btMap[seat] = 1;
    },

    isNextSeatBt: function () {
        var nextSeat = this.seatSeq[this.mySeat][1];
        if (this.btMap[nextSeat])
            return true;
        return false;
    },

    isShowCardNumber: function () {
        return this.ext[9] == 1;
    },

    isShowFoudaisan: function () {
        return this.ext[10] == 1;
    },

    /**
     * 上一次提示出牌的数据
     * @param cardPattern {CardPattern}
     */
    prompt: function (cardPattern , cardsList) {
        this.promptCardPattern = cardPattern;
        this.lastTipCards = cardsList;
    },

    /**
     * 获取player对象
     * @param userId
     * @returns {RoomPlayerVo}
     */
    getPlayerVo: function (userId) {
        userId = userId || PlayerModel.userId;
        var player = null;
        for (var i = 0; i < this.players.length; i++) {
            var p = this.players[i];
            if (p.userId == userId) {
                player = p;
                break;
            }
        }
        return player;
    },
    /**
     * 获取player对象
     * @param userId
     * @returns {RoomPlayerVo}
     */
    getPlayerVoBySeat: function (seat) {
        var player = null;
        cc.log("BBTRoomModel this.players.length" , this.players.length);
        for (var i = 0; i < this.players.length; i++) {
            var p = this.players[i];
            if (p.seat == seat) {
                player = p;
                break;
            }
        }
        return player;
    },

    /**
     * player对象与其他人IP是否有相同
     * @returns {Array}
     */
    isIpSame: function () {
        var sameIpSeats = [];
        var allIPs = [];
        for(var i=0;i<this.players.length;i++){
            allIPs.push(this.players[i].ip);
        }
        for(var i=0;i<this.players.length-1;i++){
            var p = this.players[i];
            var meSeat = p.seat;
            for(var j=i+1;j<allIPs.length;j++){
                var himSeat = this.players[j].seat;
                if(p.ip == allIPs[j]){
                    if (ArrayUtil.indexOf(sameIpSeats,meSeat)<0) {
                        sameIpSeats.push(meSeat);
                    }
                    if (ArrayUtil.indexOf(sameIpSeats,himSeat)<0) {
                        sameIpSeats.push(himSeat);
                    }
                }
            }
        }
        return sameIpSeats;
    },

    /**
     *
     * @param player {RoomPlayerVo}
     * @return
     */
    join: function (player) {
        if (this.players.length >= 4)
            return;
        var isHas = false;
        for (var i = 0; i < this.players.length; i++) {
            var p = this.players[i];
            if (p.userId == player.userId) {
                isHas = true;
                break;
            }
        }
        if (!isHas) {
            player.isRoladIcon = 0;
            this.players.push(player);
            SyEventManager.dispatchEvent(SyEvent.JOIN_ROOM, player);
        }
    },

    exitRoom: function (userId) {
        var player = null;
        var index = -1;
        for (var i = 0; i < this.players.length; i++) {
            var p = this.players[i];
            if (p.userId == userId) {
                player = p;
                index = i;
                break;
            }
        }
        if (player) {
            this.players.splice(index, 1);
            SyEventManager.dispatchEvent(SyEvent.EXIT_ROOM, player);
        }
    },

    cleanData: function () {
        this.btMap = {};
        this.promptCardPattern = null;
        this.lastTipCards = null;
        this.isCanDu = -2;
    },

    /**
     * 发牌
     * @param message
     */
    dealCard: function (message) {
        this.cleanData();
        this.nextSeat = message.nextSeat;
        this.ext[2] = message.banker; //王的位置
        if (BBTRoomModel.renshu == 3){
            SyEventManager.dispatchEvent(SyEvent.SHOW_WANG);
        }
        for (var i = 0; i < this.players.length; i++) {
            var p = this.players[i];
            if (p.userId == PlayerModel.userId) {
                var ids = message.handCardIds;
                var cardIds = [];
                for (var j = 0; j < ids.length; j++) {
                    cardIds.push(BBTAI.getCardDef(ids[j]));
                }
                p.handCardIds = cardIds;
                SyEventManager.dispatchEvent(SyEvent.START_PLAY, p);
                break;
            }
        }
    },

    getWangSeat:function(){
        return this.ext[2];
    },


    /**
     * 出牌
     */
    letOutCard: function (message) {
        this.promptCardPattern = null;
        this.lastTipCards = null;
        SyEventManager.dispatchEvent(SyEvent.LET_OUT_CARD, message);
    }

}
