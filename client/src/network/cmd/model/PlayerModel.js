/**
 * Created by Administrator on 2016/6/24.
 */
var PlayerModel = {

    //user":{"userId":3,"username":"wkvwvjxl278","pf":null,"name":"wkvwvjxl278","sex":0,"cards":null,"connectHost":"ws://192.168.111:8020","playedSid":null,"sessCode":"8c7c2b1ff840e73c99a59abcfdfceb69
    userId:0,
    username:"",
    c:"",
    pf:"",
    name:"",
    sex:0,
    cards:0,
    connectHost:"",
    playedSid:"",
    sessCode:"",
    headimgurl:"res/ui/dtz/dtzHome/testIcon.png",
    isMusic:1,
    isEffect:1,
    loginTimes:0,
    playTableId:0,
    urlSchemeRoomId:0,
    payBindId:"",
    isShowRankActivity:0,
    IsShowButton:0,
    gps:null,
    checkRecordType:0,//玩家当前选择查看的战绩对象
    clubTableId:0,
    goldUserInfo:{gold:0},
    phoneNum:0,
    bindWx:"",
    isBindWx:false,
    canZszs:false,
    isHasBindWx:false,
    init:function(user){
        this.userId = user.userId;
        this.username = user.username;
        this.pf = user.pf;
        this.name = user.name;
        this.sex = user.sex;
        this.cards = user.cards;
        this.sessCode = user.sessCode;
        this.connectHost = user.connectHost;
        this.serverId = user.serverId;
        this.playTableId = user.playTableId;
        this.getTotalCount = user.totalCount || 0;
        this.goldUserInfo = user.goldUserInfo || {gold:0};
        this.setLocalLoginLevel();
        if(user.headimgurl){
        	this.headimgurl=WXHeadIconManager.replaceUrl(user.headimgurl);
        }else{
            //this.headimgurl = "http://wx.qlogo.cn/mmopen/25FRchib0Vdk6ScHLsbXlT0A9SrBmpvb0Yzka1lOCfRDl2GqbicuHVhJ551LjTkfpnduvJl7Iqzsg1Ujs30mKZ0xYLNib9ndg7ib/132";
        	this.headimgurl=this.sex==1?"res/ui/dtz/dtzHome/testIcon.png":"res/ui/dtz/dtzHome/testIcon.png"; //"res/ui/dtz/images/default_m.png":"res/ui/images/default_w.png";
        }
        if(user.payBindId){
        	this.payBindId=user.payBindId;
        }
        if(user.isShowRankActivity){
        	this.isShowRankActivity = user.isShowRankActivity;
        }
        if(user.IsShowButton){
        	this.IsShowButton=user.IsShowButton;
        }
        this.loginTimes+=1;
        this.gps = null;
        this.phoneNum = user.phoneNum || 0;

        this.bindWx = user.bindLink;
        this.isBindWx = Number(user.bindResult) ? true : false;
        this.isHasBindWx = Number(user.bindRewardState) ? true : false;
    },

    getCoin:function(){
        return this.goldUserInfo.gold;
    },

    getDiamond:function(){
        return this.cards;
    },

    correctCoin:function(value){
        this.goldUserInfo.gold = Number(value);
        SyEventManager.dispatchEvent(SyEvent.PLAYER_PRO_UPDATE,{});
    },

    updateCoin:function(value){
        cc.log("this.goldUserInfo.gold" , this.goldUserInfo.gold);
        this.goldUserInfo.gold = Number(this.goldUserInfo.gold) + Number(value);
        SyEventManager.dispatchEvent(SyEvent.PLAYER_PRO_UPDATE,{});
    },

    getLocalLoginLevel:function(){
        var lv = cc.sys.localStorage.getItem(this.getLoginLevelPrefix());
        if(!lv)
            lv = 0;
        return lv;
    },

    setLocalLoginLevel:function(){
        cc.sys.localStorage.setItem(this.getLoginLevelPrefix(),this.getTotalCount);
    },

    getLoginLevelPrefix:function(){
        return "user_total_jushu_prefix";
    },

    updateServerInfo:function(server){
        this.serverId = server.serverId;
        this.connectHost = server.connectHost;
    },

    clear:function(){
        this.userId = 0;
        this.playTableId = 0;
        this.payBindId="";
    },

    correctCards:function(value){
        this.cards = value;
        SyEventManager.dispatchEvent(SyEvent.PLAYER_PRO_UPDATE,{});
    },

    updateCards:function(value){
    	this.cards += value;
        SyEventManager.dispatchEvent(SyEvent.PLAYER_PRO_UPDATE,{});
    },

    /**
     * 是否由url scheme带过来的房间ID进入房间
     */
    isDirect2Room:function(){
        return (this.loginTimes==1&&parseInt(this.urlSchemeRoomId)>0);
    }
}