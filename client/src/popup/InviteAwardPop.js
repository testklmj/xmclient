/**
 * Created by Administrator on 2017/4/18.
 */
var InviteAwardModel = {
    data:null,
    curYear:0,
    curMonth :0,
    today:0,
    totalDay:0,
    firstWeek:0,
    qdArray:[],
    isClickCheck:false,
    isShareInvite:false,
    init:function(message,data){
        this.data = parseInt(data);
        this.curYear = parseInt(data[0]);
        this.curMonth = parseInt(data[1]);
        this.today = parseInt(data[2]);
        this.firstWeek = parseInt(data[3]);
        this.totalDay = parseInt(data[4]);
        this.qdArray = message;
        cc.log("data::"+JSON.stringify(data)+"   array::"+JSON.stringify(this.qdArray));
    }
}

var InviteAwardPop = BasePopup.extend({
    ctor:function(){
        this._super("res/inviteAwardPop.json");
    },

    selfRender:function() {

        this.Label_6 = this.getWidget("Label_6");
        this.Label_7 = this.getWidget("Label_7");
        this.Label_8 = this.getWidget("Label_8");

        this.Label_8.x = 755;
        this.Label_8.setFontSize(50);


        var double_btn = this.double_btn = this.getWidget("double_btn");
        var single_btn = this.single_btn = this.getWidget("single_btn");
        var invite_btn = this.getWidget("invite_btn");
        this.imgInvite = this.getWidget("Image_110");

        UITools.addClickEvent(double_btn,this,this.onDouble);
        UITools.addClickEvent(single_btn,this,this.onSingle);
        UITools.addClickEvent(invite_btn,this,this.onInvite);


        this.addCustomEvent(SyEvent.UPDATE_AWARD_STATE,this,this.updateAwardState);

        this.showInviteLabel();

    },

    onInvite:function(){
        var content = "签到、破产补助、累积连胜抽奖、拉新奖励疯狂送，总有一个让你满意！";
        var obj={};
        obj.tableId = 0;
        obj.userName = PlayerModel.username;
        obj.callURL = SdkUtil.SHARE_URL;//邀请好友的地址
        obj.title = "红包福利超级多，福利满满大丰收，村长李锐邀您熊猫麻将！";
        obj.description= content;
        obj.pyq=content;
        obj.shareType = 1;
        obj.session = 0;
        SdkUtil.sdkFeed(obj,true);
    },

    onDouble:function(){
        InviteAwardModel.isShareInvite = true;
        var obj={};
        obj.tableId = 0;
        obj.userName=PlayerModel.username;
        obj.callURL=SdkUtil.SHARE_URL+'?userId='+encodeURIComponent(PlayerModel.userId);
        var content = "签到、破产补助、累积连胜抽奖、拉新奖励疯狂送，总有一个让你满意！";
        //var content = ShareDailyModel.getFeedContent();
        obj.title=content;
        obj.pyq=content;
        obj.description=content;
        obj.shareType=1;
        if (content=="" && SyConfig.hasOwnProperty("HAS_PNG_SHARE")) {//
            obj.shareType=0;
            obj.png = "res/feed/feed.jpg";
        }
        SharePop.show(obj);
    },

    onSingle:function(){
        ComReq.comReqSignIn([6,0],["106"]);
    },

    showInviteLabel:function(){
        var data = GoldRoomActivityModel.getAwardData();
        if (data){
            var inviterUserAwardCount = data.inviterUserAwardCount || 0;  // 拉新：领取奖励人数
            var inviterUserAwardGold = data.inviterUserAwardGold || 0;   // 拉新：领取奖励积分数
            var inviterUserCount1 = data.inviterUserCount1 || 0;     // 拉新：游戏3局以上人数
            var inviterUserCount2 = data.inviterUserCount2 || 0;     // 拉新：所以有邀请的人

            this.Label_6.setString("" + inviterUserCount2);
            this.Label_7.setString("" + inviterUserCount1);
            inviterUserAwardGold = Number(inviterUserAwardGold);
            if (inviterUserAwardGold >= 10000){
                inviterUserAwardGold = inviterUserAwardGold/10000 + "万";
            }
            this.Label_8.setString("" + inviterUserAwardGold);

            if (inviterUserCount1 > inviterUserAwardCount){
                this.imgInvite.visible = true;
            }else{
                this.imgInvite.visible = false;
            }
        }

    },

    updateAwardState:function(event){
        var data = event.getUserData();
        var msg = data.data;
        var reqCode = data.reqCode;
        this.showInviteLabel();
        if(reqCode == 106){
            PopupManager.addPopup(new AwardGetPop());
        }

    }



})
