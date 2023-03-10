/**
 * Created by cyp on 2019/3/21.
 */
var RuleSelect_CSMJ = RuleSelectBase.extend({
    ctor:function(isSaveChoose, wanfaList,isLeaderPay){
        this._super(isSaveChoose, wanfaList,isLeaderPay);
        this.createNumBox(12);
        this.addCardsItem();
        this.createChangeScoreBox(14);//创建低于xx分加xx分
        this.getItemByIdx(14,0).itemBtn.setContentSize(80,40);
        this.updateItemShow();
    },

    addCardsItem:function(){
        var icon = new cc.Sprite("res/ui/dtz/dtzCreateRoom/imag_7.png");
        icon.setPosition(800,80);

        this.label_zuan = new cc.LabelTTF("4/人","Arial",28);
        this.label_zuan.setAnchorPoint(0,0.5);
        this.label_zuan.setPosition(830,80);
        this.label_zuan.setColor(cc.color.RED);

        this.addChild(icon);
        this.addChild(this.label_zuan);

        this.updateZsNum();
    },

    setConfigData:function(){
        this.gameType = "CSMJ";

        this.ruleConfig = [
            {title:"局数",type:1,content:["1局","8局","12局","16局"]},//0
            {title:"房费",type:1,content:["AA支付","房主支付"],col:3},//1
            {title:"人数",type:1,content:["4人","3人","2人"]},//2
            {title:"玩法",type:2,content:["六六顺","缺一色","板板胡","四喜","节节高","金童玉女","一枝花","中途四喜","中途六六顺","三同","假将胡","门清",
                "开四杠","起手和中途胡不算鸟分","\n全求人必须吊将","杠/补算分"],col:3},//3
            {title:"飘分",type:1,content:["不飘分","飘1分","飘2分","飘3分","自由飘分"],col:3},//4
            {title:"可选",type:2,content:["缺一门","不可吃","只能大胡","小胡自摸"]},//5
            {title:"抓鸟",type:1,content:["中鸟加分","中鸟翻倍","中鸟加倍"],col:3},//6
            {title:" ",type:1,content:["抓2鸟","抓4鸟","抓6鸟"],col:3},//7
            {title:" ",type:1,content:["鸟不落空","四八空鸟"],col:3},//8
            {title:"托管",type:1,content:["不托管","1分钟","2分钟","3分钟","5分钟"],col:3},//9
            {title:"托管",type:1,content:["单局托管","整局托管","三局托管"],col:3},//10
            {title:"封顶",type:1,content:["不封顶","15分封顶","21分封顶","42分封顶"]},//11
            {title:"玩法",type:1,content:["不加","加倍"],col:3},//12
            {title:"玩法",type:1,content:["翻2倍","翻3倍","翻4倍"],col:3},//13
            {title:"加分",type:2,content:["低于"]},//14
        ];

        this.defaultConfig = [[0],[1],[0],[0,1,2,3,10,13],[0],[],[0],[0],[0],[0],[1],[0],[0],[0],[]];
        this.csDScore = parseInt(cc.sys.localStorage.getItem("CSMJ_diScore")) || 5;
        this.addScore = parseInt(cc.sys.localStorage.getItem("CSMJ_addBoxScore")) || 10;/** 加xx分 **/
        this.allowScore = parseInt(cc.sys.localStorage.getItem("CSMJ_allowBoxScore")) || 10;/** 低于xx分 **/

        if(this.isClubSaveConfig){

            if(ClickClubModel.getClubIsOpenLeaderPay()){
                this.ruleConfig[1].content = ["群主支付"];
                this.defaultConfig[1][0] = 0;
            }

            var params = this.wanfaList;
            if(params[1] == MJWanfaType.CSMJ){
                this.readSelectData(params);
            }
        }

        return true;
    },

    onShow:function(){
        this.updateZsNum();
    },

    saveConfig:function(){
        this.saveRuleDataToLocal();
    },

    createChangeScoreBox:function(row){
        if(!this.layoutArr[row]){
            return;
        }
        this.addNumBox = new changeEditBox(["",10,"分"],1);
        //参数1 显示文字（分三段，第二个参数必须是值）参数2 点击按钮每次改变值 （参数3 最小值默认1，参数4 最大值默认100）
        this.addNumBox.setWidgetPosition(490,0);//设置位置
        this.addNumBox.setScoreLabel(this.addScore);//设置初始值
        this.layoutArr[row].addChild(this.addNumBox);

        this.addLabel = UICtor.cLabel("加",24,null,cc.color(126,49,2));
        this.addLabel.setAnchorPoint(0.5,0.5);
        this.addLabel.setPosition(440,0);
        this.layoutArr[row].addChild(this.addLabel);

        this.allowNumBox = new changeEditBox(["",10,"分"],1);
        this.allowNumBox.setWidgetPosition(190,0);
        this.allowNumBox.setScoreLabel(this.allowScore);
        this.layoutArr[row].addChild(this.allowNumBox);
    },

    changeHandle:function(item){
        var tag = item.getTag();
        if(tag < 300){
            this.updateZsNum();
        }

        //小胡自摸和只能大胡两个选项只能同时选中一个
        if(tag == 502 && item.isSelected()){
            this.getItemByIdx(5,3).setSelected(false);
        }
        if(tag == 503 && item.isSelected()){
            this.getItemByIdx(5,2).setSelected(false);
        }
        
        this.updateItemShow();
    },

    updateItemShow:function(){
        this.getLayoutByIdx(12).visible = false;
        this.getLayoutByIdx(13).visible = false;

        var is2ren = false;
        if(this.getItemByIdx(2,2).isSelected()){
            this.layoutArr[12].setVisible(true);
            if(this.getItemByIdx(12,0).isSelected()){
                this.layoutArr[13].setVisible(false);
                this.numBox.visible=false;
            }else{
                this.layoutArr[13].setVisible(true);
                this.numBox.visible=true;

            }
            this.layoutArr[14].setVisible(true);
            this.addNumBox.itemBox.visible = true;
            this.allowNumBox.itemBox.visible = true;
            var isOpen = this.getItemByIdx(14,0).isSelected();
            this.addNumBox.setTouchEnable(isOpen);
            this.allowNumBox.setTouchEnable(isOpen);
            is2ren = true;
        }else{
            this.layoutArr[12].setVisible(false);
            this.layoutArr[13].setVisible(false);
            this.numBox.visible=false;
            this.layoutArr[14].setVisible(false);
            this.addNumBox.itemBox.visible = false;
            this.allowNumBox.itemBox.visible = false;
        }

        //中鸟翻倍，中鸟加倍只能选2鸟
        //if(this.getItemByIdx(6,1).isSelected() || this.getItemByIdx(6,2).isSelected()){
        //    this.getItemByIdx(7,0).setSelected(true);
        //    this.getItemByIdx(7,1).setItemState(false);
        //    this.getItemByIdx(7,2).setItemState(false);
        //}else{
        //    this.getItemByIdx(7,1).setItemState(true);
        //    this.getItemByIdx(7,2).setItemState(true);
        //}

        this.layoutArr[5].setVisible(is2ren);

        for(var i = 0;i<this.layoutArr[5].itemArr.length;++i){
            this.layoutArr[5].itemArr[i].setItemState(is2ren);
        }

        //只有二人玩法有门清选项
        this.getItemByIdx(3,11).setItemState(is2ren);

        //选缺一门后没有金童玉女，三同
        var isqym = this.layoutArr[5].itemArr[0].isSelected();
        this.getItemByIdx(3,5).setItemState(!isqym);
        this.getItemByIdx(3,9).setItemState(!isqym);

        var is3ren = this.getItemByIdx(2,1).isSelected();
        this.layoutArr[8].setVisible(is3ren);

        for(var i = 0;i<this.layoutArr[8].itemArr.length;++i){
            this.layoutArr[8].itemArr[i].setItemState(is3ren);
        }

        var istg = !this.getItemByIdx(9,0).isSelected();
        this.layoutArr[10].setVisible(false);

        this.layoutArr[11].visible = is2ren;
        for(var i = 0;i<this.layoutArr[11].itemArr.length;++i){
            this.layoutArr[11].itemArr[i].setItemState(is2ren);
        }

        this.updateZsNum();
    },

    updateZsNum:function(){
        cc.log("updateZsNum in RuleSelect_CSMJ")
        var zsNum = 5;

        var config1 = {4:[2,10,15,20],3:[2,14,20,27],2:[3,20,30,40]};
        var config2 = {4:[6,40,60,80],3:[6,40,60,80],2:[6,30,45,60]};

        var temp = 0;
        var renshu = 4;
        for(var i = 0;i<3;++i){
            if(this.getItemByIdx(2,i).isSelected()){
                renshu = 4-i;
                break;
            }
        }


        for(var i = 0;i<3;++i){
            var item = this.getItemByIdx(0,i);
            if(item.isSelected()){
                temp = i;
                break;
            }
        }

        if(this.isClubSaveConfig && ClickClubModel.getClubIsOpenLeaderPay()){
            zsNum = config2[renshu][temp] || 0;
        }else{
            if(this.getItemByIdx(1,0).isSelected()){
                zsNum = config1[renshu][temp] || 0;
            }else{
                zsNum = config2[renshu][temp] || 0;
            }
        }

        if(this.getItemByIdx(1,0).isSelected()){
            this.label_zuan.setString(zsNum + "/人");
        }else{
            this.label_zuan.setString("x" + zsNum);
        }
    },

    //row 第几列
    createNumBox:function (row) {
        if (!this.layoutArr[row]){
            return null
        }
        var BoxBg = new cc.Scale9Sprite("res/ui/phz/phzCreateRoom/img_15.png",null,cc.rect(10,10,10,10));
        this.layoutArr[row].addChild(BoxBg);
        BoxBg.setAnchorPoint(0,0.5);
        BoxBg.x = 30 + (788/(this.layoutArr[row].itemArr.length));

        var reduceBtn = new ccui.Button();
        reduceBtn.loadTextureNormal("res/ui/phz/phzCreateRoom/img_16.png");
        reduceBtn.setAnchorPoint(0,0);
        reduceBtn.setPosition(-5,0);
        reduceBtn.temp = 1;
        BoxBg.addChild(reduceBtn,1);
        //
        var addBtn = new ccui.Button();
        addBtn.loadTextureNormal("res/ui/phz/phzCreateRoom/img_14.png");
        addBtn.setAnchorPoint(0,0);
        addBtn.setPosition(155,0);
        addBtn.temp = 2;
        BoxBg.addChild(addBtn,1);

        var scoreLabel = this.scoreLabel = UICtor.cLabel("小于"+this.csDScore+"分",24,null,cc.color(255,255,255));
        scoreLabel.setAnchorPoint(0,0);
        scoreLabel.setPosition(55,0);
        BoxBg.addChild(scoreLabel,0);

        UITools.addClickEvent(reduceBtn,this,this.onChangeScoreClick);
        UITools.addClickEvent(addBtn,this,this.onChangeScoreClick);

        this.numBox = BoxBg;
        this.numBox.visible = false;
    },

    onChangeScoreClick:function(obj){
        var temp = parseInt(obj.temp);
        var num = this.csDScore;

        if (temp == 1){
            num = num - 10;
        }else{
            num = num + 10;
        }

        if (num && num >= 10 && num < 40){
            if (num%10 == 5){
                this.csDScore = num - 5;
            }else{
                this.csDScore = num;
            }
        }else if ( num < 10){
            this.csDScore = 5;
        }
        cc.log("this.csDScore =",this.csDScore);
        this.scoreLabel.setString("小于"+ this.csDScore + "分");
    },

    getWanfaList:function(){
        var jushu = 1;
        if (this.getItemByIdx(0,1).isSelected()) jushu = 8;
        if (this.getItemByIdx(0,2).isSelected()) jushu = 12;
        if (this.getItemByIdx(0,3).isSelected()) jushu = 16;

        var costway = 1;
        if(this.isClubSaveConfig && ClickClubModel.getClubIsOpenLeaderPay()){
            costway = 3;
        }else{
            if(this.getItemByIdx(1,1).isSelected())costway = 2;
        }

        var renshu = 4;
        for(var i = 0;i<3;++i){
            if(this.getItemByIdx(2,i).isSelected()){
                renshu = 4-i;
                break;
            }
        }

        

        var queYiSe = 0;
        if (this.getItemByIdx(3,1).isSelected()) queYiSe =1;
        var banbanHu = 0;
        if (this.getItemByIdx(3,2).isSelected()) banbanHu =1;
        var yiZhiHua = 0;
        if (this.getItemByIdx(3,6).isSelected()) yiZhiHua =1;
        var liuliuShun = 0;
        if (this.getItemByIdx(3,0).isSelected()) liuliuShun =1;
        var daSiXi = 0;
        if (this.getItemByIdx(3,3).isSelected()) daSiXi =1;
        var jinTongYuNu = 0;
        if (this.getItemByIdx(3,5).isSelected()) jinTongYuNu =1;
        var jieJieGao = 0;
        if (this.getItemByIdx(3,4).isSelected()) jieJieGao =1;
        var sanTong = 0;
        if (this.getItemByIdx(3,9).isSelected()) sanTong =1;
        var zhongTuLiuLiuShun = 0;
        if (this.getItemByIdx(3,8).isSelected()) zhongTuLiuLiuShun =1;
        var zhongTuSiXi = 0;
        if (this.getItemByIdx(3,7).isSelected()) zhongTuSiXi =1;
        var isCalcBanker = 0;
        var jiajianghu = 0;
        if (this.getItemByIdx(3,10).isSelected()) jiajianghu =1;

        var kePiao = 0;
        if (this.getItemByIdx(4,1).isSelected()) kePiao =2;
        else if(this.getItemByIdx(4,2).isSelected())kePiao=3;
        else if(this.getItemByIdx(4,3).isSelected())kePiao=4;
        else if(this.getItemByIdx(4,4).isSelected())kePiao = 1;

        var queyimeng = 0;
        if (this.getItemByIdx(5,0).isSelected()) queyimeng =1;
        var bukechi = 0;
        if (this.getItemByIdx(5,1).isSelected()) bukechi =1;
        var zhinengdahu = 0;
        if (this.getItemByIdx(5,2).isSelected()) zhinengdahu =1;
        var xiaohuzimo = 0;
        if (this.getItemByIdx(5,3).isSelected()) xiaohuzimo =1;
        
        var calcBird =1;
        if (this.getItemByIdx(6,1).isSelected()) calcBird =2;
        else if(this.getItemByIdx(6,2).isSelected()) calcBird =3;

        var birdNum = 2;
        for(var i = 0;i<3;++i){
            if(this.getItemByIdx(7,i).isSelected()){
                birdNum = 2 +2*i;
                break;
            }
        }

        var kongniao = 2;
        if(this.getItemByIdx(8,1).isSelected())kongniao = 1;

        var csIsDouble = 0;
        if(this.getItemByIdx(12,1).isSelected()){
            csIsDouble = 1;
        }
        var gpsWarn = 0;//无用
        var csDScore = 0;
        csDScore = this.csDScore;
        cc.sys.localStorage.setItem("CSMJ_diScore",csDScore);
        var csDoubleNum = 2;
        for(var i = 0;i<3;++i){
            if(this.getItemByIdx(13,i).isSelected()){
                csDoubleNum = 2 + i;
                break;
            }
        }

        var csTuoguan =0;
        for(var i = 0;i<4;++i){
            if(this.getItemByIdx(9,i).isSelected()){
                csTuoguan = i*60;
                break;
            }
        }
        if(this.getItemByIdx(9,4).isSelected()){
            csTuoguan = 300;
        }
        var csDjtg = 2;
        //if (this.getItemByIdx(10,0).isSelected()){
        //    csDjtg = 1;
        //}else if (this.getItemByIdx(10,2).isSelected()){
        //    csDjtg = 3;
        //}

        var menqing = 0;
        if(this.getItemByIdx(3,11).isSelected()){
            menqing = 1;
        }

        var kaisigang = 0;
        if(this.getItemByIdx(3,12).isSelected()){
            kaisigang = 1;
        }

        var qshbsnf = 0;
        if(this.getItemByIdx(3,13).isSelected()){
            qshbsnf = 1;
        }

        var qqrbxdj = 0;
        if(this.getItemByIdx(3,14).isSelected()){
            qqrbxdj = 1;
        }

        var gbsf = 0;
        if(this.getItemByIdx(3,15).isSelected()){
            gbsf = 1;
        }

        var fengding = 0;
        var fengdingArr = [0,15,21,42];
        for(var i = 0;i<4;++i){
            if(this.getItemByIdx(11,i).isSelected()){
                fengding = fengdingArr[i];
                break;
            }
        }

        var morefen = 0;
        var allowScore= 0;
        if(this.getItemByIdx(14,0).isSelected()){//如果勾选
            morefen = this.addNumBox.localScore;
            allowScore = this.allowNumBox.localScore;
        }
        cc.sys.localStorage.setItem("CSMJ_addBoxScore",morefen);
        cc.sys.localStorage.setItem("CSMJ_allowBoxScore",allowScore);

        var wanfaList = [
            jushu,//局数 0
            MJWanfaType.CSMJ,//玩法ID 1
            costway,//支付方式 2
            calcBird,//鸟分 1乘法 2加法 3
            birdNum,//抓鸟数 4
            gpsWarn,//gps 无用 5
            queYiSe,//缺一色 6
            renshu,//人数 7
            yiZhiHua,//一枝花 8 
            liuliuShun,//六六顺 9
            daSiXi,//大四喜 10
            jinTongYuNu,//金童玉女 11
            jieJieGao,//节节高 12
            sanTong ,//三同 13
            zhongTuLiuLiuShun,//中途六六顺 14
            zhongTuSiXi,//中途四喜 15
            kePiao,//可飘 16
            banbanHu,//板板胡 17
            isCalcBanker,//庄闲算分 18
            csIsDouble,// 是否加倍 19
            csDScore,// 加倍分 20
            csDoubleNum,// 加倍数 21
            kongniao,//空鸟 22
            bukechi,//不能吃 23
            zhinengdahu,//只能大胡 24
            xiaohuzimo,//小胡自摸 25
            queyimeng,//缺一门 26
            jiajianghu,//假将胡 27
            csTuoguan,//托管时间//28
            csDjtg,//单局托管，和整局托管//29
            menqing,//门清30
            fengding,//封顶31
            kaisigang,//开四杠32
            qshbsnf,//起手和中途胡不算鸟分33
            morefen,//34 "加xx分"
            allowScore,//35 "低于xx分"
            gbsf,//36 杠补算分
            qqrbxdj,//37 全求人必须吊将
        ];

        cc.log("wanfaList =",JSON.stringify(wanfaList))
        return wanfaList;
    },

    //单独获取游戏类型id,支付方式选项,局数,人数的项
    //用于俱乐部的创建
    getWanfas:function(){
        var jushu = 4;
        for(var i = 0;i<3;++i){
            if(this.getItemByIdx(0,i).isSelected()){
                jushu = Math.pow(2,i)*4;
                break;
            }
        }

        var costway = 1;
        if(this.isClubSaveConfig && ClickClubModel.getClubIsOpenLeaderPay()){
            costway = 3;
        }else{
            if(this.getItemByIdx(1,1).isSelected())costway = 2;
        }


        var renshu = 4;
        for(var i = 0;i<3;++i){
            if(this.getItemByIdx(2,i).isSelected()){
                renshu = 4-i;
                break;
            }
        }
        return [MJWanfaType.CSMJ,costway,jushu,renshu];
    },

    //俱乐部创建玩法包厢,读取配置选项
    readSelectData:function(params){
        var defaultConfig = [[0],[1],[0],[],[0],[],[0],[0],[0],[0],[1],[0],[0],[0],[]];

        defaultConfig[0][0] = params[0] == 16?3:params[0] == 12?2:params[0] == 8?1:0;
        defaultConfig[1][0] = params[2] == 3?0:params[2] - 1;
        defaultConfig[2][0] = params[7] == 2?2:params[7] == 3?1:0;
        defaultConfig[4][0] = params[16] == 1?4:params[16] == 2?1:params[16] == 3?2:params[16] == 4?3:0;
        defaultConfig[6][0] = params[3]-1;
        defaultConfig[7][0] = params[4] == 6?2:params[4] == 4?1:0;
        defaultConfig[8][0] = params[22] == 1?1:0;
        defaultConfig[9][0] = params[28]?params[28] == 300?4:params[28]/60:0;
        defaultConfig[10][0] = params[29]== 1 ? 0:params[29]== 2 ? 1 : 2;//单局托管/整局/三局
        defaultConfig[11][0] = params[31] == 15?1:params[31]==21?2:params[31]==42?3:0;
        defaultConfig[12][0] = params[19] == 1?1:0;
        defaultConfig[13][0] = params[21] -2;

        if(params[34] && parseInt(params[34]) > 0)defaultConfig[14].push(0);
        this.csDScore = parseInt(params[20]);
        
        if(params[9] == "1")defaultConfig[3].push(0);
        if(params[6] == "1")defaultConfig[3].push(1);
        if(params[17] == "1")defaultConfig[3].push(2);
        if(params[10] == "1")defaultConfig[3].push(3);
        if(params[12] == "1")defaultConfig[3].push(4);
        if(params[11] == "1")defaultConfig[3].push(5);
        if(params[8] == "1")defaultConfig[3].push(6);
        if(params[15] == "1")defaultConfig[3].push(7);
        if(params[14] == "1")defaultConfig[3].push(8);
        if(params[13] == "1")defaultConfig[3].push(9);
        if(params[27] == "1")defaultConfig[3].push(10);
        if(params[30] == "1")defaultConfig[3].push(11);
        if(params[32] == "1")defaultConfig[3].push(12);
        if(params[33] == "1")defaultConfig[3].push(13);
        if(params[37] == "1")defaultConfig[3].push(14);
        if(params[36] == "1")defaultConfig[3].push(15);


        if(params[26] == "1")defaultConfig[5].push(0);
        if(params[23] == "1")defaultConfig[5].push(1);
        if(params[24] == "1")defaultConfig[5].push(2);
        if(params[25] == "1")defaultConfig[5].push(3);

        this.addScore = parseInt(params[34])||10;
        this.allowScore = parseInt(params[35])||10;
        this.defaultConfig = defaultConfig;
    },
});