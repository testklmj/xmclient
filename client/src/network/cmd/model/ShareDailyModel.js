/**
 * Created by zhoufan on 2017/5/4.
 */
var ShareDailyModel = {

    hasOpenByPushMsg:false, //记录是否由后台推送消息打开过
    isShareToday:0,
    isFromShareDaily:false,
    isFromGoldActive:false,

    reset:function(){
        this.isShareToday = 0;
        this.isFromShareDaily = false;
        this.isFromGoldActive = false;
    },



    getFeedContent: function() {
        var feeds = [
            "我敢说这个游戏，10个邵阳人就有8个会玩！",
            "作为一个邵阳人，别说你没玩过这个游戏！",
            "熊猫麻将，跑得快，跑胡子娱乐场比黄金岛更火爆哦？",
            "玩家数量遥遥领先，村长李锐邀您一起熊猫麻将！",
            "在家太无聊？跑得快，打筒子娱乐场必备打发时间神器！",
            "四人打筒子out啦！3人、2人筒子才是邵阳人真爱！",
            "减少非必要接触，减少外出，避免人群聚集的地方去，熊猫麻将更方便安全！",
            "注意个人卫生防护，养成良好的生活习惯，勤洗手，熊猫麻将与你携手相伴！",
            "疫情期间在家无聊的你，快来熊猫麻将线上娱乐吧！",
            ""
        ];
        var max = SyConfig.hasOwnProperty("HAS_PNG_SHARE") ? feeds.length : feeds.length - 1;
        var rand = MathUtil.mt_rand(1,max);
        //熊猫麻将-玩家数量遥遥领先，成为代理，惊喜等着你！

        return feeds[rand-1];
    },

    getShareContent: function() {
        var max = 16;
        var feeds = [
            "我敢说这个游戏，10个邵阳人就有8个会玩！",
            "作为一个邵阳人，别说你没玩过这个游戏！",
            "熊猫麻将，跑得快，跑胡子娱乐场比黄金岛更火爆哦？",
            "玩家数量遥遥领先，村长李锐邀您一起熊猫麻将！",
            "在家太无聊？跑得快，打筒子娱乐场必备打发时间神器！",
            "四人打筒子out啦！3人、2人筒子才是邵阳人真爱！",
            "减少非必要接触，减少外出，避免人群聚集的地方去，熊猫麻将更方便安全！",
            "注意个人卫生防护，养成良好的生活习惯，勤洗手，熊猫麻将与你携手相伴！",
            "疫情期间在家无聊的你，快来熊猫麻将线上娱乐吧！",
        ];
        var rand = MathUtil.mt_rand(1,feeds.length);
        //熊猫麻将-玩家数量遥遥领先，成为代理，惊喜等着你！
        return feeds[rand-1];
    }
}
