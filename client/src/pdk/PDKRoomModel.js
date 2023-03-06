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

var PDKRoomModel = {
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
    cleanCards:1,//清牌的逻辑开关
    //界面布局相关参数
    firstLineLimit : 23,
    initCardYLine1 : 95,
    initCardYLine2 : 15,
    initX : 100,
    _cardScale : 1.1,
    _letOutCardScale : 0.85,
    tableType : 0,//0普通 1军团 2练习
    countDown: 0,//托管时间
    matchKeyId: 0,//比赛场ID

    init: function (message) {
        //cc.log("PDKRoomModel init ..." , JSON.stringify(message));
        //cc.log("PDKRoomModel data..." , message.num5 , message.num10 , message.numk );
        //{"tableId":"100001","nowBurCount":1,"totalBurCount":10,"players":[{"userId":"999","name":"test","seat":3,"sex":1,"icon":"123","point":0,"handCardIds":[],"outCardIds":[]}],"nextSeat":null}
        this.wanfa = message.wanfa;
        this.renshu = message.renshu;
        this.curScore = message.score || 0;
        this.costFangFei = message.fangfei;
        this.nextSeat = message.nextSeat;
        this.tableType = message.tableType;
        this.timeOut = message.timeOut;//托管配置时间
        cc.log("this.timeOut::" , this.timeOut[0]);
        if (message.extStr){
            this.matchKeyId = message.extStr[0];
        }

        this.roomName = message.roomName;
        //cc.log("当前创建的房间的玩法为：" , this.wanfa);
        //cc.log("跑得快创建房间后台下发的部分数据为 ：",this.wanfa);

        if (this.renshu == 2) {
            this.seatSeq = {1: [1, 2], 2: [2, 1]};
        } else if (this.renshu == 3) {
            this.seatSeq = {1: [1, 2, 3], 2: [2, 3, 1], 3: [3, 1, 2]};
        } else if (this.renshu == 4) {
            this.seatSeq = {1: [1, 2, 3, 4], 2: [2, 3, 4, 1], 3: [3, 4, 1, 2] , 4: [4, 1, 2, 3] };
        }

        this.isCredit = message.ext[14];//是否是比赛房
        this.creditScore =  message.ext[17];//底分
        this.creditGiveNum =  message.ext[18];//赠送分
        this.creditType = message.ext[19];//赠送类型1固定2比例
        this.creditWay = message.ext[20];//赠送方式1大赢家2所有赢家

        AI.MAX_CARD = this.wanfa;
        this.tableId = message.tableId;
        this.nowBurCount = message.nowBurCount;
        this.totalBurCount = message.totalBurCount;
        this.players = message.players;
        //cc.log("后台下发的 玩家数量！！！！！！！！！！！！！！！：" , this.players.length);
        //cc.log("this.players :" + JSON.stringify(message.players) );
        this.ext = message.ext;
        //cc.log("创建房间的ext数据:" , this.ext);

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
                    cardIds.push(AI.getCardDef(ids[j]));
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

        this.isGameSite = 0;
        if(this.getPlayerVo()){
            this.mySeat = this.getPlayerVo().seat;
        }else{
            this.mySeat = 1;
        }

        if(this.ext[8] != 0){
            this.setFirstOutSeat(this.ext[8]);
        }
        this.cleanData();
        this.generalExt = message.generalExt || 0;
    },

    isBanVoiceAndProps: function() {
        var isOpen = false;
        if (this.generalExt && Number(this.generalExt[0])){
            isOpen = true;
        }
        return isOpen;
    },

    isMoneyRoom:function(){
        //cc.log("this.tableType..." , this.tableType , this.tableId);
        return this.tableType == 3;
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

    isMatchRoom:function(){
        return this.tableType == 4 ;
    },

    //最后一首是否可少牌接
    isLessThreeFj:function(){
        return this.ext[13] == 0;
    },

    //获取是否加倍
    isAutoPlay:function(){
        return (this.ext[21] || false);
    },

    //获取是否加倍
    isDouble:function(){
        return (this.ext[22] || false);
    },
    //获取加倍数
    getDoubleNum:function(){
        return (this.ext[24] || 0);
    },
    //获取小于多少分加倍
    getDScore:function(){
        return (this.ext[23] || 0);
    },

    getMatchInfos:function(playerVo){
        //ext[9]：0为预赛，大于0为复赛第几轮
        if(this.ext[9] <= 0){
            var name = "预赛 第"+playerVo.ext[7]+"局  "+"低于"+this.ext[10]+"分淘汰";
        }else{
            var name = "复赛 第"+this.ext[9]+"轮 第"+this.nowBurCount+"局";
        }
        return name;
    },

 	getPlayerIsTuoguan:function(playerVo){
        return playerVo.ext[8];
    },

    getPlayerIsNowTuoguan:function(playerVo){
        return playerVo.ext[13];
    },

    getPlayerTuoguanTime:function(playerVo){
        return playerVo.ext[12];
    },


    getMoneyModeId:function(){
        return this.ext[5];
    },

    getMoneyRoomBeilv:function(){
        return this.ext[6];
    },

    getTuoguanTime:function(){
        if (this.isAutoPlay()){
            return (this.timeOut[0] || 1000) / 1000 ;
        }else{
            return 30;
        }
    },

    getMatchTuoguanTime:function(_seat){
        var seat = _seat || this.nextSeat;
        var time = 0;
        for (var i = 0; i < this.players.length; i++) {
            var p = this.players[i];
            if (p.seat == seat) {
                time = p.ext[12];
                break;
            }
        }
        return parseInt(time / 1000);
    },

    getTuoguanRealTime:function(){
        return this.ext[26] || 30;//服务器告知 进入托管的剩余时间
    },

    /**
     * 是否开启炸弹带牌
     * 返回的是最大可带排数量 四带三返回3
     */
    isOpenBoomWithCard:function(){
        cc.log("this.ext[4]..." , this.ext[4]);
        return this.ext[4];
    },

    isClubRoom: function(_tableType) {
        return (_tableType == 1);
    },

    isPdkFangzhu:function(playerVo){
        return playerVo.ext[2] == 1;
    },

    getFirstOutSeat:function(){
        return this.firstOutSeat; //
    },

    setFirstOutSeat:function(value){
      this.firstOutSeat = value || 0;
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
        return this.ext[0] == 1;
    },

    isHongShi: function () {
        var isHongshi = false;
        if (this.ext[3] > 0){
            isHongshi = true
        }
        return isHongshi;
    },

    getHongShiName: function () {
        var nameList = ["","红10(5分)","红10(10分)","红10(翻倍)"];
        if(this.ext[3]){
            var name = nameList[this.ext[3]];
            return name;
        }
        return "";
    },

    //是否是AA支付
    getCostFangShi:function(){
        return this.ext[2];
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
        cc.log("PDKRoomModel this.players.length" , this.players.length);
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
        for(var i=0; i<this.players.length; i++){
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
    },

    /**
     * 发牌
     * @param message
     */
    dealCard: function (message) {
        this.cleanData();
        this.nextSeat = message.nextSeat;
        if(message.banker){
            this.setFirstOutSeat(message.banker);
        }
        //注释一下 。。。。。xiaohu 是数组 ，第0位是是否托管，第1位 是剩余时间
        if (message.xiaohu){
            var xiaohu = message.xiaohu;
            this.countDown = parseInt(xiaohu[1] / 1000);
            if (!this.isAutoPlay()){
                this.countDown = 30;
            }
        }
        for (var i = 0; i < this.players.length; i++) {
            var p = this.players[i];
            if (p.userId == PlayerModel.userId) {
                var ids = message.handCardIds;
                var cardIds = [];
                for (var j = 0; j < ids.length; j++) {
                    cardIds.push(AI.getCardDef(ids[j]));
                }
                p.handCardIds = cardIds;
                SyEventManager.dispatchEvent(SyEvent.START_PLAY, p);
                break;
            }
        }

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
