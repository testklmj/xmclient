/**
 * Created by Administrator on 2017/4/18.
 */
var InviteNewFriend = BasePopup.extend({
    ctor:function(data){
        this.data = data || [];
        this.count2 = 0;
        this.curBtn = null;
        this._super("res/inviteNewFriend.json");
    },

    selfRender:function() {
        var Label_invite = this.getWidget("Label_invite");
        var Label_game = this.getWidget("Label_game");
        var Label_games = this.getWidget("Label_games");
        this.Image_rule = this.getWidget("Image_rule");
        this.Image_rule.visible = false;
        var Button_help = this.getWidget("Button_help");
        Button_help.temp = 1;
        var Button_rlClose = this.getWidget("Button_rlClose");
        Button_rlClose.temp = 2;
        UITools.addClickEvent(Button_help, this, this.onRule)
        UITools.addClickEvent(Button_rlClose, this, this.onRule)
        var Label_rule = this.getWidget("Label_rule");
        Label_rule.setString(
            "规则说明：\n" +
            "1.活动时间5月24日-6月6日\n" +
            "2.新用户绑定自己id后才可成为自己的邀请用户\n" +
            "3.邀请用户累计打满任意20局金币场游戏即可算一个有效用户\n" +
            "4.每完成一个进度即可领取对应钻石奖励")
        var params = null;
        if (this.data.params){
            params = JSON.parse(this.data.params);
            cc.log("params==",JSON.stringify(params))
        }
        if (params){
            Label_game.setString("" + params.count2);
            Label_games.setString("" + params.comParams);
            Label_invite.setString("" + params.count1);
            this.count2 = params.count2;
        }
        this.initInviteData(params);

        this.addCustomEvent(SyEvent.NEW_ACTIVE_REWARD , this , this.onShowReward);
    },

    onRule:function(sender) {
        this.Image_rule.visible = sender.temp == 1;
    },

    initInviteData:function(params) {
        var newRewards = null;
        if (params.rewardParams) {
            newRewards = params.rewardParams.split(";");
        }
        var rewarded = params.rewards;
        // cc.log("newRewards==", newRewards,newRewards.length)
        if (newRewards.length <= 4) {
            for (var i = 0; i < newRewards.length; i++) {
                var index = i + 1;
                var rewards = newRewards[i].split("_");
                // cc.log("rewards===",rewards)
                var Image_award = this.getWidget("Image_award" + index);
                var Label_rate = Image_award.getChildByName("Label_rate");
                var Image_30 = Image_award.getChildByName("Image_30");
                var Button_get = Image_award.getChildByName("Button_get");
                var Label_32 = Image_30.getChildByName("Label_32");
                var rate = this.count2 >= rewards[0] ? rewards[0] : this.count2;
                Label_rate.setString("进度" + rate + "/" + rewards[0])
                Label_32.setString("x" + rewards[2])
                Button_get.temp = rewards[0];
                UITools.addClickEvent(Button_get, this, this.onGet)
                Button_get.setBright(this.count2 >= rewards[0]);
                if (rewarded[i] && rewarded[i] > 0){
                    Button_get.setBright(true);
                    Button_get.setTouchEnabled(false);
                    Button_get.loadTextureNormal("res/ui/dtz/inviteNewFriend/invite_10.png")
                }
            }
        }
    },


    onGet:function(sender){
        sender.setTouchEnabled(false);
        this.runAction(cc.sequence(cc.delayTime(1),cc.callFunc(function(){
            sender.setTouchEnabled(true);
        })));
        this.curBtn = sender;
        var temp = Number(sender.temp);
        cc.log("sender.temp===",sender.temp)
        ActivityModel.sendActivity([1,temp],"" + ActivityId.invite_newFriend);
    },


    onShowReward:function(event){
        var data = event.getUserData();
        if (data.id == ActivityId.invite_newFriend){
            FloatLabelUtil.comText("领取成功");
            if (this.curBtn){
                this.curBtn.setBright(true);
                this.curBtn.setTouchEnabled(false);
                this.curBtn.loadTextureNormal("res/ui/dtz/inviteNewFriend/invite_10.png")
                this.curBtn = null;
            }
        }
    },
})
