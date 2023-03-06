/**
 * Created by Administrator on 2017/7/21.
 */
//记录俱乐部战绩一些数据
var ClubRecallModel = {
    data: null,
    isShowRecord: false,
    clubId:0,
    clubRole:0,
    init: function (data) {
        this.data = data;
        this.isShowRecord = false;
        this.clubId = 0;
        this.clubRole = 0;
    },
}
//记录俱乐部战绩详情一些数据
var ClubRecallDetailModel = {
    data: null,
    isShowRecord: false,
    renLength:0,
    init: function (data) {
        this.data = data;
        this.isShowRecord = false;
        this.renLength = 0;
    },

    /**
     * wanfaList 玩法数组
     * isNotGame 不需要显示游戏类型
    *返回玩法
     */
    getWanfaStr:function(wanfaList,isNotGame){
        var createPara = wanfaList.split(",");
        var wanfaStr = this.getSpecificWanfa(createPara,isNotGame);
        return wanfaStr;
    },

    getSpecificWanfa:function(wanfaList,isNotGame){
        //cc.log("wanfaList::getBBTWanfa"+wanfaList);
        var wanfaStr = "";
        var wanfa = wanfaList[1];
        if(this.isPHZWanfa(wanfa)){
            wanfaStr = this.getPHZWanfa(wanfaList,isNotGame);
        }else if(this.isDTZWanfa(wanfa)){
            wanfaStr = this.getDTZWanfa(wanfaList,isNotGame);
        }else if(this.isPDKWanfa(wanfa)){
            wanfaStr = this.getPDKWanfa(wanfaList,isNotGame);
        }else if(this.isBBTWanfa(wanfa)){
            wanfaStr = this.getBBTWanfa(wanfaList,isNotGame);
        }else if(this.isHZMJWanfa(wanfa)){
            wanfaStr = this.getHZMJWanfa(wanfaList,isNotGame);
        }else if(this.isCSMJWanfa(wanfa)){
            wanfaStr = this.getCSMJWanfa(wanfaList,isNotGame);
        }else if(this.isSYMJWanfa(wanfa)){
            wanfaStr = this.getSYMJWanfa(wanfaList,isNotGame);
        }

        //cc.log("wanfaStr==="+wanfaStr);
        return wanfaStr;
    },


    getBBTWanfa:function(wanfaList,isNotGame){
        //cc.log("wanfaList::getBBTWanfa"+wanfaList);
        var gameStr = "半边天 ";
        var wskStr ="正510K不分花色 ";
        if(wanfaList[4] == 1){
            wskStr = "正510K分花色 ";
        }
        var kcStr ="";
        if(wanfaList[3] == 1){
            kcStr = "可锤 ";
        }

        var zdStr ="";
        if(wanfaList[5] == 1){
            zdStr = "助徒 ";
        }

        var paishuStr ="";
        if(wanfaList[6] == 1){
            paishuStr = "显示剩余牌数 ";
        }

        var daisanStr ="";
        if(wanfaList[8] == 1){
            daisanStr = "可四带三 ";
        }


        var costStr = "";
        if(wanfaList[2] == 1){
            costStr = "AA支付 ";
        }else if(wanfaList[2] == 2){
            costStr = "房主支付 ";
        }else if(wanfaList[2] == 3){
            costStr = "群主支付 ";
        }

        var jushuStr = wanfaList[0] + "局 ";
        var renshuStr = wanfaList[7] + "人 ";

        var daiWangStr = "";
        if(wanfaList[9] == 1){
            daiWangStr = "带大王 ";
        }

        var tuoguanStr = "";
        if(wanfaList[10] == 1){
            tuoguanStr = "托管 ";
        }


        if (isNotGame){
            gameStr = "";
        }

        var wanfaStr =  csvhelper.strFormat("{0}{1}{2}{3}{4}{5}{6}{7}{8}{9}{10}",
            gameStr,costStr,jushuStr,
            renshuStr,wskStr,kcStr,zdStr,
            paishuStr,daisanStr,daiWangStr,tuoguanStr);
        return wanfaStr;
    },

    getDTZWanfa:function(wanfaList,isNotGame){
        //cc.log("wanfaList"+wanfaList);
        var gameStr = "打筒子 ";
        var costStr = "";
        var tWanfa = wanfaList[1];
        if(wanfaList[2] == 1){
            costStr = "AA支付 ";
        }else if(wanfaList[2] == 2){
            costStr = "房主支付 ";
        }else if(wanfaList[2] == 3){
            costStr = "群主支付 ";
        }
        var maxScoreStr = wanfaList[3] + "分 ";

        var renshuNum = 0;
        if (DTZRoomModel.is2Ren(wanfaList[1])){
            renshuNum = 2;
        }else if(DTZRoomModel.is3Ren(wanfaList[1])) {
            renshuNum = 3;
        }else if(DTZRoomModel.is4Ren(wanfaList[1])) {
            renshuNum = 4;
        }
        var renshuStr = renshuNum + "人 ";

        if(wanfaList[0] == 1)renshuStr += "1局 ";

        var fuPaiStr = "四副牌 ";
        if (DTZRoomModel.is3FuPai(wanfaList[1])){
            fuPaiStr = "三副牌 ";
        }else if (DTZRoomModel.isKlsx(wanfaList[1])){
            fuPaiStr = "快乐四喜 ";
        }
        var rewardStr = "";
        if (wanfaList[4] > 0){
            rewardStr = "奖励分" + wanfaList[4] + " ";
        }

        var darkNUmStr = "";
        if(wanfaList[5] == 1){
            var darkNumber = 8;
            if(DTZRoomModel.is3FuPai(tWanfa)){//this.wanfa == 113 || this.wanfa == 115 || this.wanfa == 117
                if(renshuNum == 4){
                    darkNumber = 8;
                }else if(renshuNum == 3){
                    darkNumber = 9;
                }else if(renshuNum == 2){
                    darkNumber = 66;
                }
            }else if(DTZRoomModel.is4FuPai(tWanfa)) {
                //四副牌
                if(renshuNum == 4){
                    darkNumber = 8;
                }else if(renshuNum == 3){
                    darkNumber = 52;
                }else if(renshuNum == 2){
                    darkNumber = 96;
                }

                if (DTZRoomModel.isKlsx(tWanfa)){
                    //四副牌
                    if(renshuNum == 4){
                        darkNumber = 0;
                    }else if(renshuNum == 3){
                        darkNumber = 44;
                    }else if(renshuNum == 2){
                        darkNumber = 88;
                    }
                }
            }
            if((wanfaList[11] && wanfaList[11] == 1) && DTZRoomModel.is3FuPai(tWanfa) && !DTZRoomModel.is4Ren(tWanfa)){
                darkNumber = darkNumber + 6;
            }
            darkNUmStr = "暗"+darkNumber+"张牌 ";
            if (darkNumber == 0){
                darkNUmStr = "";
            }
        }

        var showCardStr = "";
        if(wanfaList[8] == 1){
            if(renshuNum == 4){
                showCardStr = "记牌器 "
            }else {
                showCardStr = "显示剩余牌 "
            }
        }

        var darkStr = "";
        if(wanfaList[9] == 1){
            darkStr = "随机出头 ";
            if (DTZRoomModel.is4Ren(tWanfa)){
                darkStr = "";
            }
        }

        var bidaStr = "";
        if(wanfaList[10] == 1 && !DTZRoomModel.is3Ren(tWanfa)){//三人默认是有牌必打 没必要显示
            bidaStr = "有牌必打 ";
        }

        var wtzStr = "";
        if(wanfaList[11] == 1){
            wtzStr = "王筒子 ";
        }

        var tuoguanStr = "";
        if(wanfaList[12] == 1){
            tuoguanStr = "可托管 ";
        }

        if (DTZRoomModel.isKlsx(wanfaList[1])){
            wtzStr = "";
        }

        var kedaipai = "";
        if(wanfaList[13] == 1){
            kedaipai = "可带牌 ";
        }else{
            kedaipai = "不可带牌 ";
        }

        if (isNotGame){
            gameStr = "";
        }

        var wanfaStr = csvhelper.strFormat("{0}{1}{2}{3}{4}{5}{6}{7}{8}{9}{10}{11}{12}",
            gameStr,costStr,renshuStr,maxScoreStr,fuPaiStr,
            rewardStr,darkNUmStr,showCardStr,darkStr,wtzStr,
            bidaStr,tuoguanStr,kedaipai);
        wanfaStr = wanfaStr.replace(/[}。]/g , ' ');
        wanfaStr = wanfaStr.replace( / {2,}/g , ' ');
        return wanfaStr;
    },

    getPHZWanfa:function(wanfaList,isNotGame){
        if (wanfaList[1] == PHZGameTypeModel.LDFPF){
           var str = this.getPHZLDWanfa(wanfaList,isNotGame);
            return str;
        }
        var gameStr = "邵阳字牌 ";
        var limitScoreStr = "";
        var jushuStr = wanfaList[0] + "局 ";
        var lzStr = "";
        var hhhStr = "";
        var hxwfStr = "";
        if (wanfaList[1] == PHZGameTypeModel.SYBP){
            gameStr = "邵阳剥皮 ";
            jushuStr = "局数不限 ";
            if(wanfaList[0] == 1) jushuStr = "1局 ";
            if (wanfaList[12] == 1){
                if(wanfaList[10] == 0){
                    limitScoreStr = "不封顶 ";
                }else{
                    limitScoreStr = wanfaList[10] + "息 ";
                }
                lzStr = "连庄 ";
            }else{
                lzStr = "不可连庄 ";
            }

            if (wanfaList[11] == 1){
                hhhStr = "红黑胡 ";
            }
        }else if (wanfaList[1] == PHZGameTypeModel.SYZP){
            hxwfStr = wanfaList[13] + "息1囤 "
        }
        var costStr = "";
        if(wanfaList[9] == 1){
            costStr = "AA支付 ";
        }else if(wanfaList[9] == 2){
            costStr = "房主支付 ";
        }else if(wanfaList[9] == 3){
            costStr = "群主支付 ";
        }
        var renshuStr = wanfaList[7] + "人 ";

        var tgStr = "";
        if (wanfaList[23] == 1){
            tgStr = "托管 ";
        }

        var doubleStr = "";
        if (wanfaList[24] == 1){
            doubleStr = "低于" + wanfaList[25] + "分翻" + wanfaList[26] +"倍 " ;
        }

        if (isNotGame){
            gameStr = "";
        }

        var wanfaStr =  csvhelper.strFormat("{0}{1}{2}{3}{4}{5}{6}{7}{8}{9}",gameStr,costStr,renshuStr,
            jushuStr,hxwfStr,hhhStr,lzStr,limitScoreStr,tgStr,doubleStr);
        return wanfaStr;
    },

    getPHZLDWanfa:function(wanfaList,isNotGame){
        var gameStr = "娄底放炮罚 ";
        var limitScoreStr = "";
        var jushuStr = "局数不限 ";

        if(wanfaList[0] == 1) jushuStr = "1局 ";

        if(wanfaList[10] == 0){
            limitScoreStr = "不封顶 ";
        }else{
            limitScoreStr = wanfaList[10] + "息 ";
        }

        var qhStr = "";
        if(wanfaList[13]){
            qhStr = wanfaList[13] + "胡起胡 ";
        }

        var randomStr = "";
        if (wanfaList[27] == 1){
            randomStr = "首局随机庄家 ";
        }

        var phStr = "";
        if (wanfaList[28] == 1){
            phStr = "飘胡 ";
        }

        var fpbhStr = "";
        if (wanfaList[33] == 1){
            fpbhStr = "放炮必胡 ";
        }

        var costStr = "";
        if(wanfaList[9] == 1){
            costStr = "AA支付 ";
        }else if(wanfaList[9] == 2){
            costStr = "房主支付 ";
        }else if(wanfaList[9] == 3){
            costStr = "群主支付 ";
        }
        var renshuStr = wanfaList[7] + "人 ";

        var tgStr = "";
        if (wanfaList[23] == 1){
            tgStr = "托管 ";
        }

        var doubleStr = "";
        if (wanfaList[30] == 1){
            doubleStr = "低于" + wanfaList[31] + "分翻" + wanfaList[32] +"倍 " ;
        }

        if (isNotGame){
            gameStr = "";
        }

        var wanfaStr =  csvhelper.strFormat("{0}{1}{2}{3}{4}{5}{6}{7}{8}{9}{10}",gameStr,costStr,renshuStr,
            jushuStr,qhStr,randomStr,phStr,fpbhStr,limitScoreStr,tgStr,doubleStr);
        return wanfaStr;
    },


    getPDKWanfa:function(wanfaList,isNotGame){
        var gameStr = "跑得快 ";
        var costStr = "";
        if(wanfaList[9] == 1){
            costStr = "AA支付 ";
        }else if(wanfaList[9] == 2){
            costStr = "房主支付 ";
        }else if(wanfaList[9] == 3){
            costStr = "群主支付 ";
        }

        var renshuStr = wanfaList[7] + "人 ";
        var jushuStr = wanfaList[0] + "局 ";
        var zhangDesc = wanfaList[1] + "张 ";
        var nameList = [" ","红10(5分) ","红10(10分) ","红10(翻倍) "];
        var hongshiStr = nameList[wanfaList[10]] || "";

        var cardNumStr = "";
        if(wanfaList[8] == 1){
            cardNumStr = "显示剩余牌数 ";
        }

        var heiStr = "";
        if(wanfaList[6] == 1 && wanfaList[7] != 2){
            heiStr = "首局必出黑桃三 ";
        }

        var boomWithCard = "";
        if(wanfaList[11] == 3){
            boomWithCard = "四带三 ";
        }else if(wanfaList[11] == 2){
            boomWithCard = "四带二 ";
        }


        var tgStr = "";
        if (wanfaList[21] == 1){
            tgStr = "托管 ";
        }

        var doubleStr = "";
        if (wanfaList[22] == 1){
            doubleStr = "低于" + wanfaList[23] + "分翻" + wanfaList[24] +"倍 " ;
        }

        if (isNotGame){
            gameStr = "";
        }

        var wanfaStr =  csvhelper.strFormat("{0}{1}{2}{3}{4}{5}{6}{7}{8}{9}{10}",
            gameStr,costStr,renshuStr,jushuStr,
            zhangDesc,hongshiStr,cardNumStr,
            heiStr,boomWithCard,tgStr,doubleStr);
        return wanfaStr;
    },

    getHZMJWanfa:function(wanfaList,isNotGame){
        var gameStr = "红中麻将 ";
        var costStr = "";
        if(wanfaList[2] == 1){
            costStr = "AA支付 ";
        }else if(wanfaList[2] == 2){
            costStr = "房主支付 ";
        }else if(wanfaList[2] == 3){
            costStr = "群主支付 ";
        }

        var renshuStr = wanfaList[7] + "人 ";
        var jushuStr = wanfaList[0] + "局 ";

        var zhuangStr = "";
        if(wanfaList[5] == 1){
            zhuangStr = "分庄闲 ";
        }

        var khqdStr = "";
        if(wanfaList[6] == 1){
            khqdStr = "可胡七对 ";
        }

        var niaoNumStr = "不抓鸟 ";
        if(wanfaList[3] && wanfaList[3] != 0){
            niaoNumStr = "抓"+ wanfaList[3] + "鸟 ";
        }


        var niaowayStr = "";
        if(wanfaList[19] == 1){
            niaowayStr = "159中鸟 ";
        }

        var niaoStr = "";
        if(wanfaList[12] == 1){
            niaoNumStr = "";
            niaoStr = "一鸟全中 ";
        }

        var niaofenStr = "";
        if(wanfaList[14]){
            niaofenStr = "无红中鸟+" + wanfaList[14] + " ";
        }

        var bsjStr = "";
        if(wanfaList[10] == 1){
            bsjStr = "抢杠胡包三家 ";
        }

        var dpdStr = "";
        if(wanfaList[4] == 0){
            dpdStr = "点炮胡 ";
        }

        var ypbhStr = "";
        if(wanfaList[15] == 1){
            ypbhStr = "有炮必胡 ";
        }

        var qghStr = "";
        if(wanfaList[9] == 1){
            qghStr = "抢杠胡 ";
        }

        var tgStr = "";
        if (wanfaList[8] == 1){
            tgStr = "托管 ";
        }
        var doubleStr = "";
        if (wanfaList[20] == 1){
            doubleStr = "低于" + wanfaList[21] + "分翻" + wanfaList[22] +"倍 " ;
        }

        if (isNotGame){
            gameStr = "";
        }

        var wanfaStr =  csvhelper.strFormat("{0}{1}{2}{3}{4}{5}{6}{7}{8}{9}{10}{11}{12}{13}{14}{15}",
            gameStr,costStr,renshuStr,jushuStr,
            zhuangStr,khqdStr,bsjStr,dpdStr,
            ypbhStr,qghStr,niaoNumStr,niaowayStr,niaoStr,niaofenStr,doubleStr,tgStr);
        return wanfaStr;
    },

    getCSMJWanfa:function(wanfaList,isNotGame){

        var infoArr = [];
        if(!isNotGame)infoArr.push("长沙麻将");
        infoArr.push(wanfaList[7] + "人");
        infoArr.push(wanfaList[0] + "局");
        infoArr.push(wanfaList[2] == 3?"群主支付":wanfaList[2] == 2?"房主支付":"AA支付");
        if(wanfaList[6] == 1)infoArr.push("缺一色");
        if(wanfaList[8] == 1)infoArr.push("一枝花");
        if(wanfaList[9] == 1)infoArr.push("六六顺");
        if(wanfaList[10] == 1)infoArr.push("四喜");
        if(wanfaList[11] == 1)infoArr.push("金童玉女");
        if(wanfaList[12] == 1)infoArr.push("节节高");
        if(wanfaList[13] == 1)infoArr.push("三同");
        if(wanfaList[14] == 1)infoArr.push("中途六六顺");
        if(wanfaList[15] == 1)infoArr.push("中途四喜");
        if(wanfaList[17] == 1)infoArr.push("板板胡");
        if(wanfaList[18] == 1)infoArr.push("庄闲算分");

        if(wanfaList[23] == 1)infoArr.push("不可吃");
        if(wanfaList[24] == 1)infoArr.push("只能大胡");
        if(wanfaList[25] == 1)infoArr.push("小胡自摸");
        if(wanfaList[26] == 1)infoArr.push("缺一门");
        if(wanfaList[27] == 1)infoArr.push("假将胡");
        if(wanfaList[30] == 1)infoArr.push("门清");
        if(wanfaList[32] == 1)infoArr.push("开四杠");
        if(wanfaList[33] == 1)infoArr.push("起手和中途胡不算鸟分");
        if(wanfaList[37] == 1)infoArr.push("全求人必须吊将");
        if(wanfaList[36] == 1)infoArr.push("杠/补算分");

        if(wanfaList[16] == 1)infoArr.push("自由飘分");
        else if(wanfaList[16] == 2)infoArr.push("飘1分");
        else if(wanfaList[16] == 3)infoArr.push("飘2分");
        else if(wanfaList[16] == 4)infoArr.push("飘3分");
        else infoArr.push("不飘分");

        if(wanfaList[28] > 0){
            if(wanfaList[29] == 1){
                infoArr.push("单局托管");
            }else if(wanfaList[29] == 3){
                infoArr.push("三局托管");
            }else{
                infoArr.push("整局托管");
            }
        }

        if(wanfaList[4] > 0){
            infoArr.push("抓" + wanfaList[4] + "鸟");

            if(wanfaList[3] == 3)infoArr.push("中鸟加倍");
            else if(wanfaList[3] == 2)infoArr.push("中鸟翻倍");
            else infoArr.push("中鸟加分");

            if(wanfaList[7] == 3){
                if(wanfaList[22] == 1)infoArr.push("四八空鸟");
                else infoArr.push("鸟不落空");
            }

        }

        if (wanfaList[7] == 2 && wanfaList[19] == 1){
            infoArr.push("低于" + wanfaList[20] + "分翻" + wanfaList[21] +"倍");
        }

        if(wanfaList[31] > 0){
            infoArr.push(wanfaList[31] + "分封顶");
        }

        if(wanfaList[7] == 2 && wanfaList[34] && parseInt(wanfaList[34]) > 0){
            infoArr.push("低于"+ (wanfaList[35] || 10) + "分，加"+wanfaList[34]+"分 ");
        }

        return infoArr.join(" ");
    },

    getSYMJWanfa:function(wanfaList,isNotGame){
        var gameStr = "邵阳麻将 ";
        var costStr = "";
        if(wanfaList[2] == 1){
            costStr = "AA支付 ";
        }else if(wanfaList[2] == 2){
            costStr = "房主支付 ";
        }else if(wanfaList[2] == 3){
            costStr = "群主支付 ";
        }

        var renshuStr = wanfaList[7] + "人 ";
        var jushuStr = wanfaList[0] + "局 ";

        var windStr = "";
        if(wanfaList[3] == 1){
            windStr = "带风 ";
        }

        var chiStr = "";
        if(wanfaList[4] == 1){
            chiStr = "可吃 ";
        }else if(wanfaList[4] == 2){
            chiStr = "清一色可吃 ";
        }


        var niaoNumStr = "不抓鸟 ";
        if(wanfaList[5] && wanfaList[11] != 0){
            niaoNumStr = "抓"+ wanfaList[3] + "鸟 ";
        }

        var chuiStr = "";
        if(wanfaList[6] == 1){
            chuiStr = "可锤 ";
        }

        var gghStr = "";
        if (wanfaList[9] == 1){
            gghStr = "可抢公杠胡 ";
        }

        var qghbsjStr = "";
        if (wanfaList[10] == 1){
            qghbsjStr = "抢杠胡包三家 ";
            if (wanfaList[7] == 3){
                qghbsjStr = "抢杠胡承包 ";
            }
        }

        var niaoStr = "";
        if(wanfaList[11] == 1){
            niaoNumStr = "";
            niaoStr = "上中下鸟 ";
        }

        var fghStr = "";
        if (wanfaList[12] == 1){
            fghStr = "可抢放杠胡 ";
        }

        var dgbsjStr = "";
        if(wanfaList[13] == 1){
            dgbsjStr = "点杠包三家 ";
            if (wanfaList[7] == 3){
                dgbsjStr = "点杠两家付 ";
            }
        }

        var dggkbsjStr = "";
        if(wanfaList[14] == 1){
            dggkbsjStr = "点杠杠开包三家 ";
            if (wanfaList[7] == 3){
                dggkbsjStr = "点杠杠开承包 ";
            }
        }


        var ghpbsjStr = "";
        if(wanfaList[15]){
            ghpbsjStr = "杠后炮三家付 ";
            if (wanfaList[7] == 3){
                ghpbsjStr = "杠后炮两家付 ";
            }
        }

        var qghszmStr = "";
        if(wanfaList[16]){
            qghszmStr = "抢杠胡算自摸 ";
        }

        var tgStr = "";
        if(wanfaList[8]){
            tgStr = "托管 ";
        }


        var doubleStr = "";
        if (wanfaList[20] == 1){
            doubleStr = "低于" + wanfaList[21] + "分翻" + wanfaList[22] +"倍 " ;
        }

        if (isNotGame){
            gameStr = "";
        }

        var wanfaStr =  csvhelper.strFormat("{0}{1}{2}{3}{4}{5}{6}{7}{8}{9}{10}{11}{12}{13}{14}{15}{16}{17}",
            gameStr,costStr,renshuStr,jushuStr,
            windStr,chiStr,chuiStr,gghStr,
            fghStr,dgbsjStr,niaoNumStr,dggkbsjStr,niaoStr,qghbsjStr,ghpbsjStr,qghszmStr,doubleStr,tgStr);
        return wanfaStr;
    },

    isDTZWanfa:function(wanfa){
        var isDtz = false ;
        if ((wanfa >= 113 && wanfa <= 118) || (wanfa >= 210 && wanfa <= 212))
            isDtz = true;
        return isDtz;
    },

    isPDKWanfa:function(wanfa){
        var isPdk = false ;
        if (wanfa == 15 || wanfa == 16)
            isPdk = true;
        return isPdk;
    },

    isPHZWanfa:function(wanfa){
        var isPhz = false ;
        if (wanfa == PHZGameTypeModel.SYZP || wanfa == PHZGameTypeModel.SYBP || wanfa == PHZGameTypeModel.LDFPF)
            isPhz = true;
        return isPhz;
    },

    isBBTWanfa:function(wanfa){
        var isBbt = false ;
        if (wanfa == 131)
            isBbt = true;
        return isBbt;

    },

    isHZMJWanfa:function(wanfa){
        var isHzmj = false ;
        if (wanfa == MJWanfaType.HZMJ)
            isHzmj = true;
        return isHzmj;
    },

    isCSMJWanfa:function(wanfa){
        var isHzmj = false ;
        if (wanfa == MJWanfaType.CSMJ)
            isHzmj = true;
        return isHzmj;
    },

    isSYMJWanfa:function(wanfa){
        var isSymj = false ;
        if (wanfa == MJWanfaType.SYMJ)
            isSymj = true;
        return isSymj;
    },

    /**wanfaList 创建房间时传的玩法集合
     * name  玩法名字
     * */
    getGameName:function(wanfaList){
        var wanfa = wanfaList[1];
        var name = this.getGameStr(wanfa);
        return name
    },

    /**wanfaList 创建房间时传的玩法集合
     * name  玩法名字
     * */
    getGameStr:function(wanfa){
        var name = "";
        if(this.isPHZWanfa(wanfa)){
            if (wanfa == PHZGameTypeModel.SYZP){
                name = "邵阳字牌";
            }else if(wanfa == PHZGameTypeModel.SYBP){
                name = "邵阳剥皮";
            }else if(wanfa == PHZGameTypeModel.LDFPF){
                name = "娄底放炮罚";
            }
        }else if(this.isDTZWanfa(wanfa)){
            name = "打筒子";
        }else if(this.isPDKWanfa(wanfa)){
            name = "跑得快";
        }else if(this.isBBTWanfa(wanfa)){
            name = "半边天";
        }else if(this.isHZMJWanfa(wanfa)){
            name = "红中麻将";
        }else if(this.isSYMJWanfa(wanfa)){
            name = "邵阳麻将";
        }else if(this.isCSMJWanfa(wanfa)){
            name = "长沙麻将";
        }

        return name;
    },

    /**wanfaList 创建房间时传的玩法集合
     * count  几人玩法
     * */
    getPlayerCount:function(wanfaList){
        var wanfa = wanfaList[1];
        var count = 0;
        if(this.isPHZWanfa(wanfa)){
            count = wanfaList[7];
        }else if(this.isDTZWanfa(wanfa)){
            if (DTZRoomModel.is2Ren(wanfa)){
                count = 2;
            }else if(DTZRoomModel.is3Ren(wanfa)) {
                count = 3;
            }else if(DTZRoomModel.is4Ren(wanfa)) {
                count = 4;
            }
        }else if(this.isPDKWanfa(wanfa)){
            count = wanfaList[7];
        }else if(this.isBBTWanfa(wanfa)){
            count = wanfaList[7];
        }else if(this.isHZMJWanfa(wanfa) || this.isCSMJWanfa(wanfa)){
            count = wanfaList[7];
        }else if(this.isSYMJWanfa(wanfa)){
            count = wanfaList[7];
        }
        return count;
    },

    getDissPlayerStr:function(resultMsg){
        var dissStr = "注：";
        var dissState = resultMsg.dissState;  //0正常结束1是群主解散2是中途玩家申请解散
        if (dissState == 1){
            dissStr = "注：群主解散房间";
        }else if (dissState == 2){
            dissStr = "注：";
            var shenqingStr = "";
            var tongyiStr = "";
            var dissPlayer = resultMsg.dissPlayer.split(",");
            for (var i = 0;i < dissPlayer.length;i++){
                if (i == 0){
                    shenqingStr =  dissPlayer[0];
                }else{
                    tongyiStr = tongyiStr + dissPlayer[i] + " ";
                }

            }
            shenqingStr = "申请解散:" + shenqingStr;
            tongyiStr = "同意解散:" + tongyiStr;
            dissStr = dissStr + shenqingStr + " " + tongyiStr;
        }else if (dissState == 0){
            dissStr = "注：正常打完结束";
        }
        return dissStr;
    },


    getLocalTime:function(inputTime) {

        var date = new Date(inputTime);
        var y = date.getFullYear();
        var m = date.getMonth() + 1;
        m = m < 10 ? ('0' + m) : m;
        var d = date.getDate();
        d = d < 10 ? ('0' + d) : d;
        var h = date.getHours();
        h = h < 10 ? ('0' + h) : h;
        var minute = date.getMinutes();
        var second = date.getSeconds();
        minute = minute < 10 ? ('0' + minute) : minute;
        second = second < 10 ? ('0' + second) : second;
        return y + '-' + m + '-' + d+'\n '+h+':'+minute+':'+second;

        //var now = new Date(time);
        //var year=now.getYear();
        //var month=now.getMonth()+1;
        //var date=now.getDate();
        //var hour=now.getHours();
        //var minute=now.getMinutes();
        //var second=now.getSeconds();
        //return "20"+year+"-"+month+"-"+date+"\n"+hour+":"+minute+":"+second;
    }
}

