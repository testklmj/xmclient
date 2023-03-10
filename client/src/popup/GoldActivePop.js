/**
 * Created by Administrator on 2016/6/27.
 */
var GoldActivePop = BasePopup.extend({
    ctor: function (data) {

         this.data = data || [];
        this._super("res/goldActivePop.json");
    },

    selfRender: function () {

        cc.log("this.data===",JSON.stringify(this.data));

        this.btnStateList = [];


        var params = null;
        var rewardParams = null;
        this.btnState = 0;
        if (this.data.params){
            params = JSON.parse(this.data.params);
            cc.log("params==",JSON.stringify(params))
            if (params){
                if (params.battleCount >= params.comParams){
                    this.btnState = 1;
                    if (params.battleState >= 1){
                        this.btnState = 2;
                    }
                }
            }
        }


        this.Panel_tishi = this.getWidget("Panel_tishi");
        this.Panel_tishi.visible = false;

        this.Button_closetishi = this.getWidget("Button_closetishi");
        UITools.addClickEvent(this.Button_closetishi, this , this.onCloseRedPanel);

        this.btnTrue = this.getWidget("Button_true");
        UITools.addClickEvent(this.btnTrue, this , this.onTrue);

        this.Button_redBag = this.getWidget("Button_redBag");
        this.Button_redBag.visible = false;
        UITools.addClickEvent(this.Button_redBag, this , this.onRedBag);

        //当前完成的局数
        this.Label_jushu = this.getWidget("Label_jushu");
        if (params.battleCount >= params.comParams){
            params.battleCount = params.comParams;
        }
        this.Label_jushu.setString("今日已完成："+params.battleCount+"/"+ params.comParams);

        //当前按钮状态对应的提示
        this.Label_state = this.getWidget("Label_state");
        this.Label_state.setString("");

        cc.log("params.comParams ===",params.comParams )
        this.Label_tip = this.getWidget("Label_tip");
        this.Label_tip.setString("注：每日金币场完成"+ params.comParams + "局后可领取50-150随机钻石，第二日零点将重置活动，请及时领取；");


        this.btnStateList[0] = {path:"res/ui/dtz/goldActivePop/img_8.png",text:"今日局数暂未达" + params.comParams + "局，请再接再厉"};
        this.btnStateList[1] = {path:"res/ui/dtz/goldActivePop/img_6.png",text:"恭喜您今日游戏局数已达" + params.comParams + "局，分享领取奖励"};
        this.btnStateList[2] = {path:"res/ui/dtz/goldActivePop/img_7.png",text:"今日奖励已领取，请明日再来"};


        this.showBtnState();

        // this.addCustomEvent(SyEvent.UPDATA_GOLD_BTN_STATE,this,this.refreshBtnState);
        this.addCustomEvent(SyEvent.NEW_ACTIVE_REWARD , this , this.onShowReward);
    },


    onShowReward:function(event){
        var data = event.getUserData();
        if (data.id == ActivityId.everyday_game){
            var params = null;
            var rewards = null;
            if (data.params){
                params = JSON.parse(data.params);
                if (params.curReward){
                    rewards = params.curReward.split("_")[1];
                }
            }
            this.refreshBtnState();
            if (rewards){
                FloatLabelUtil.comText("领取成功x" + rewards + "钻石");
            }else{
                FloatLabelUtil.comText("领取成功");
            }
        }
    },

    refreshBtnState:function(){
        this.btnState = 2;
        this.showBtnState();
    },

    showBtnState:function(){
        this.btnTrue.loadTextureNormal(this.btnStateList[this.btnState].path);
        this.Label_state.setString(this.btnStateList[this.btnState].text);
    },

    onRedBag:function(){
        this.Panel_tishi.visible = true;
    },

    onCloseRedPanel:function(){
        this.Panel_tishi.visible = false;
    },

    onTrue:function(sender){
        sender.setTouchEnabled(false);
        this.runAction(cc.sequence(cc.delayTime(1),cc.callFunc(function(){
            sender.setTouchEnabled(true);
        })));
        if (this.btnState == 1){
            ActivityModel.sendActivity([1],"" + ActivityId.everyday_game);
        }
    },

    getShareContent: function() {
        var feeds = [
            "《熊猫麻将》欢迎老玩家回归，现在来玩，就有机会获得88元红包奖励",
            "欢迎新玩家，来就送88元红包奖励！就在《熊猫麻将》！！",
            "炎炎夏日、冰凉一夏！《熊猫麻将》四大活动齐上阵！",
            "畅玩打筒子、跑得快、麻将等游戏~还有红包送~《熊猫麻将》",
            "咱邵阳人自己的游戏~边玩边领红包~《熊猫麻将》",
            "我敢说这个游戏，10个邵阳人就有8个会玩！还能得红包哦",
            "每天免费畅玩熊猫麻将，美女们都在迷恋中？",
            "玩家数量遥遥领先，村长李锐邀您一起熊猫麻将！"
        ];
        var rand = MathUtil.mt_rand(1,feeds.length);
        return feeds[rand-1];
    }

});
