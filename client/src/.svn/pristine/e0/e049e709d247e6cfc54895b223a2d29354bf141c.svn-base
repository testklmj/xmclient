/**
 * Created by zhoufan on 2016/11/7.
 */
var PHZRoomModel = {
    seatSeq:{
        1:[1,2,3],
        2:[2,3,1],
        3:[3,1,2]
    },
    tableId:0,
    nowBurCount:0,
    totalBurCount:0,
    /**
     * {Array.<RoomPlayerVo>}
     */
    players:[],
    mySeat:0,
    nextSeat:0,
    wanfa:0,
    remain:0,
    selfAct:[],
    banker:0,
    ext:[],
    mineRoot:null,
    currentAction:0,
    _playersIp:[],
    ipSameTipStr:null,
    isStart:false,
    renshu:0,
    lastMineSortedJson:null,
    timeSeat:0,
    fengding:0,
    choice:0,
    masterId:0,//创建或者代开房间的玩家id
    tableType : 0,//0普通 1军团 2练习
    sortCardWay : 0,//0默认1是按胡息，手牌排序方式
    wanfaHhd:0,//红黑点
    wanfaKlz:0,//可连庄
    costWay:1,//支付方式
    myOutHuxi:0,//当前自己的外面的胡息
    touchCardId:0,//当前选择的牌Id
    bankerSeat:-1,//庄的方位
    sxSeat:-1,//数醒的方位
    init:function(message){
        PHZSetModel.init();
        this.bankerSeat = -1;
        this.sxSeat = -1;
        this.myOutHuxi = 0;
        this.touchCardId = 0;
        this.wanfa = message.wanfa;
        this.tableId = message.tableId;
        this.nowBurCount = message.nowBurCount;
        this.totalBurCount = message.totalBurCount || 0;
        this.players = message.players;
        this.nextSeat = message.nextSeat;
        if(this.getPlayerVo()){
            this.mySeat = this.getPlayerVo().seat;
        }else{
            this.mySeat = 1;
        }

        this.intParams = message.intParams;//储存创房选择的玩法
        //this.mySeat = this.getPlayerVo().seat;
        this.remain = message.remain;
        this.masterId = message.masterId;
        this.ext = message.ext;
        this.isStart = false;
        this.renshu = message.renshu || 3;
        this.lastMineSortedJson = null;
        this.timeSeat = this.ext[0] || 0;
        this.fengding = this.ext[1] || 0;
        this.limitScore = this.ext[2] || 0;
        this.wanfaHhd = this.ext[3] || 0;
        this.wanfaKlz = this.ext[4] || 0;
        this.costWay = this.ext[1] || 1;
        this.choice = message.config || 0;
        this.tableType = message.tableType;
        this.timeOut = message.timeOut;//托管配置时间
    	if(this.renshu==3){
    		this.seatSeq={1:[1,2,3],2:[2,3,1],3:[3,1,2]};
    	}else if(this.renshu==2){
            this.seatSeq = {1:[1,2],2:[2,1]};
        }else{
    		this.seatSeq = {1:[1,2,3,4],2:[2,3,4,1],3:[3,4,1,2],4:[4,1,2,3]};
    	}

        this.creditConfig = message.creditConfig || [];
        this.isCredit = this.creditConfig[0];//是否是比赛房
        this.creditScore =  this.creditConfig[3];//底分
        this.creditGiveNum =  this.creditConfig[4];//赠送分
        this.creditType = this.creditConfig[5];//赠送类型1固定2比例
        this.creditWay = this.creditConfig[6];//赠送方式1大赢家2所有赢家

        for(var i=0;i<this.players.length;i++){
        	var p = this.players[i];
            p.isRoladIcon = 0;
        	if(p.userId == PlayerModel.userId){
        		if(p.handCardIds.length>0 || p.outedIds.length>0|| p.moldCards.length>0){
        			this.isStart = true;
        		}
        		if(p.ext[3]==PHZRoomModel.mySeat)
        			this.isStart = true;
        		break;
        	}
        }
        //cc.log("this.isStart============",this.isStart)
        this.cleanData();
        this.generalExt = message.generalExt || 0;

        this.roomName = message.roomName;
    },

    isBanVoiceAndProps: function() {
        var isOpen = false;
        if (this.generalExt && Number(this.generalExt[0])){
            isOpen = true;
        }
        return isOpen;
    },

    isClubRoom: function(_tableType) {
        return (_tableType == 1);
    },

    is3Ren: function() {
        return (this.renshu==3);
    },

    is2Ren: function() {
        return (this.renshu==2);
    },

    is4Ren: function() {
        return (this.renshu==4);
    },

    updateGPS:function(userId,gps){
        var p = this.getPlayerVo(userId);
        p.gps = gps;
    },

    //玩家的房内头像是否已经绘制完全
    isRoomIconRoad:function()
    {
        for(var i=0;i<this.players.length;i++){
            var p = this.players[i];
            if(p.isRoladIcon != 1){
                return false;
            }
        }
        return true;

    },

    getLimitDesc:function(){
        if(this.limitScore == 0){
            return "连庄上限不封顶。";
        }else{
            return "连庄上限"+ this.limitScore + "胡息";
        }
    },

    getWanFaDesc:function(){
        var str = "";
        if (this.wanfa == PHZGameTypeModel.SYZP){
            var tunStr = this.ext[5] || 3;
            var costStr = "";
            if (this.costWay == 1){
                costStr = "AA支付,";
            }else if (this.costWay == 2){
                costStr = "房主支付,";
            }else{
                costStr = "群主支付,";
            }
            str = costStr + tunStr + "息1囤";
        }else if(this.wanfa == PHZGameTypeModel.LDFPF){
            //cc.log("intParams = ",JSON.stringify(this.intParams));
            if (this.costWay == 1){
                costStr = "AA支付,";
            }else if (this.costWay == 2){
                costStr = "房主支付,";
            }else{
                costStr = "群主支付,";
            }
            costStr = costStr + this.intParams[13] + "胡起胡";
            if (this.intParams[23] == 1) {
                costStr = costStr + ",可托管";
            }
            if(this.intParams[0] == 1) costStr += "1局 ";
            //if (this.intParams[27] == 1) {
            //    costStr = costStr + ",首局随机庄家";
            //}
            if (this.intParams[28] == 1) {
                costStr = costStr + ",飘胡";
            }
            return costStr
        }
        else{
            var costStr = "";
            if (this.costWay == 1){
                costStr = "AA支付,";
            }else if (this.costWay == 2){
                costStr = "房主支付,";
            }else{
                costStr = "群主支付,";
            }
            if(SdkUtil.isYYBReview()){
                costStr = "";
            }
            if(this.intParams[0] == 1) costStr += "1局 ";

            var limitScoreStr = "";

            var hhdStr = "";
            if (this.wanfaHhd == 1){
                hhdStr = "红黑点,";
            }
            var klzStr = "";
            if (this.wanfaKlz == 1){
                klzStr = "可连庄,";
                if(this.limitScore == 0){
                    limitScoreStr = "不封顶";
                }else{
                    limitScoreStr = this.limitScore + "息";
                }
            }else{
                klzStr = "不可连庄";
            }
            str = costStr + hhdStr+ klzStr+limitScoreStr;
        }
        return str
    },

    getPlayerSeq:function(userId,seat){
        if(userId == PlayerModel.userId)
            return 1;
        var seqArray = this.seatSeq[this.mySeat];
        var seq = ArrayUtil.indexOf(seqArray,seat)+1;
        return seq;
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

    cleanData:function(){
        this.selfAct.length=0;
        this.currentAction=0;
        this.lastMineSortedJson = null;
    },

    cleanSPanel:function(){
        SyEventManager.dispatchEvent(SyEvent.PHZ_CLEAN_SPANEL);
    },

    getMoneyRoomBeilv:function(){
        return this.ext[7];
    },

    getTuoguanTime:function(){
        //return 120;
        return (this.timeOut[0] || 1000) / 1000 ;
    },

    //是否是托管房间
    isAutoPlay:function(){
        return this.ext[17];
    },

    getNewTuoguanTime:function(){
        //return 120;
        if (this.isAutoPlay()){
            if (this.timeOut[1]){
                return parseInt((this.timeOut[1] || 1000) / 1000);
            }else{
                return (this.timeOut[0] || 1000) / 1000 ;
            }
        }else{
            return 30;
        }
    },

    getPlayerIsTuoguan:function(playerVo){
        return playerVo.ext[6];
    },

    isShowFinger:function(){
        if(this.nextSeat==this.mySeat&&this.selfAct.length==0){
            return true;
            //if(this.remain==19)
            //    return true;
            //var actions = [2,3,4,6,7];
            //if(ArrayUtil.indexOf(actions,this.currentAction)>=0)
            //    return true;
        }
        return false;
    },

    //isAAzhifu
    getCostFangShi:function(){
        cc.log("this.ext..." , this.ext);
        return this.ext[1];
    },

    dealCard:function(message){
        this.cleanData();
        this.nextSeat = message.nextSeat;
        this.remain = message.remain;
        this.banker = message.banker;
        SyEventManager.dispatchEvent(SyEvent.START_PLAY,message);
    },

    sendPlayCardMsg:function(type,cardIds){
        var build = MsgHandler.getBuilder("proto/PlayCardReqMsg.txt");
        var msgType = build.msgType;
        var builder = build.builder;
        var PlayCardReq = builder.build("PlayCardReq");
        var msg = new PlayCardReq();
        msg.cardIds = cardIds;
        msg.cardType = type;
        sySocket.send(msg,msgType);
    },

    isMoneyRoom:function(){
        //cc.log("this.tableType..." , this.tableType , this.tableId);
        return this.tableType == 3 || this.tableId >= 10000000;
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

    join:function(player){
    	if(this.players.length>=PHZRoomModel.renshu)
            return;
        var isHas = false;
        for(var i=0;i<this.players.length;i++){
            var p = this.players[i];
            if(p.userId == player.userId){
                isHas = true;
                break;
            }
        }
        if(!isHas){
            player.isRoladIcon = 0;
            this.players.push(player);
            SyEventManager.dispatchEvent(SyEvent.JOIN_ROOM,player);
        }
    },

    exitRoom:function(userId){
        var player = null;
        var index = -1;
        for(var i=0;i<this.players.length;i++){
            var p = this.players[i];
            if(p.userId == userId){
                player = p;
                index = i;
                break;
            }
        }
        if(player){
            this.players.splice(index,1);
            SyEventManager.dispatchEvent(SyEvent.EXIT_ROOM,player);
        }
    },

    /**
     * 出牌
     */
    letOutCard:function(message){
        SyEventManager.dispatchEvent(SyEvent.LET_OUT_CARD,message);
    },

    simulateLetOutCard:function(id,curSortedData){
        var message = {"userId":PlayerModel.userId,"phzIds":[id],
            "action":0,"seat":this.mySeat,"selfAct":[],
            "fromSeat":null,"actType":2,"remain":(this.remain-1),
            "nextSeat":0,"huxi":null,"isZaiPao":null,simulate:1};
        //记录下出牌之前的手牌数据
        this.lastMineSortedJson = curSortedData;
        SyEventManager.dispatchEvent(SyEvent.LET_OUT_CARD,message);
    },

    moPai:function(message){
        SyEventManager.dispatchEvent(SyEvent.GET_MAJIANG,message);
    },
    
    isShowFangZhao:function(c){//是否放招
    	if(!this.getFangZhao(this.getPlayerVo())){
            var self = this;
    		AlertPop.show("放招后不能吃牌、碰牌，是否确定放招？",function(){
    			sySocket.sendComReqMsg(24,[c]);
    		},function(){
                //把打出去的牌还原回来，直接拿上一次的手牌数据来还原
                if(self.lastMineSortedJson){
                    self.nextSeat = self.mySeat;
                    PHZMineLayout.restoreCard(self.lastMineSortedJson);
                    self.mineRoot.cancelFangZhao();
                }
    		});
    	}
    },
    
    setFangZhao:function(message){
    	for(var i=0;i<this.players.length;i++){
    		var p = this.players[i];
    		if(p.userId == message.userId){
    			p.ext[1] = message.fangzhao;
    			SyEventManager.dispatchEvent(SyEvent.FANGZHAO,message);
    		}
    	}
    },
    
    getFangZhao:function(playerVo){//玩家是否没放招
        if (this.isMoneyRoom()){
            return false;
        }
    	return (playerVo.ext[1]==1);
    },

    getFangZhu:function(playerVo){//玩家是不是房主
        if (this.isMoneyRoom()){
            return false;
        }
        return (playerVo.ext[2]==1);
    },

    getName:function(wanfa){
        var str="";
        if(wanfa==PHZGameTypeModel.SYZP)
        	str = "邵阳字牌";
        if(wanfa==PHZGameTypeModel.SYBP)
        	str = "邵阳剥皮";
        if(wanfa==34)
        	str = "娄底放炮罚";
        if(wanfa==36)
        	str = "郴州跑胡子";
        if(wanfa==38)
        	str = "怀化红拐弯";
        return str;
    },

    //获取是否加倍
    isDouble:function(){
        return (this.ext[18] || false);
    },
    //获取加倍数
    getDoubleNum:function(){
        return (this.ext[20] || 0);
    },
    //获取小于多少分加倍
    getDScore:function(){
        return (this.ext[19] || 0);
    },


    setTouchCard:function(cardId){
        if (this.touchCardId != cardId){
            this.touchCardId = cardId;
        }
    },
    getTouchCard:function(){
        return this.touchCardId;
    }

}