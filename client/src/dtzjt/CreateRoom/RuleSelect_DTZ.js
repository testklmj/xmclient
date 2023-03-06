/**
 * Created by cyp on 2019/3/21.
 */
var RuleSelect_DTZ = RuleSelectBase.extend({
     ctor:function(isSaveChoose, wanfaList,isLeaderPay){
        this._super(isSaveChoose, wanfaList,isLeaderPay);
//        this.createNumBox(8);
        this.addCardsItem();
//        this.createChangeScoreBox(10);//创建低于xx分加xx分
//        this.getItemByIdx(10,0).itemBtn.setContentSize(80,40);
//        this.updateItemShow();
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
        this.ruleConfig = [
            {title:"房费",type:1,content:["AA支付","房主支付"]},// 0
            {title:"游戏",type:1,content:["4人打筒子","3人打筒子","2人打筒子"]},// 1
            {title:"分数",type:1,content:["600分","1000分"]},// 2
            {title:"玩法",type:1,content:["三副牌","四副牌","快乐四喜"]},// 3
            {title:"奖励",type:1,content:["无奖励","100分","200分","300分","500分","800分","1000分"]},// 4
            {title:"可选",type:2,content:["可带牌","暗8张底牌","显示剩余牌","随机出头","王筒子","有牌必打","托管","1局"]},// 5
        ];

        this.defaultConfig = [[1],[1],[0],[0],[0],[0,2,3],[0],[1]];
         if(this.isClubSaveConfig){
            if(ClickClubModel.getClubIsOpenLeaderPay()){
                this.ruleConfig[0].content = ["群主支付"];
                this.defaultConfig[0][0] = 0;
            }

            var params = this.wanfaList;
            if(ClubRecallDetailModel.isDTZWanfa(params[1])){
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

    //row 第几列
    createNumBox:function (row) {
        if (!this.layoutArr[row]){
            return null
        }
        var BoxBg = new cc.Sprite("res/ui/phz/phzCreateRoom/img_15.png");
        this.layoutArr[row].addChild(BoxBg);
        BoxBg.setAnchorPoint(0,0.5);
        BoxBg.x = 180 + (788/(this.layoutArr[row].itemArr.length));

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

        var scoreLabel = this.scoreLabel = UICtor.cLabel("小于"+this.csDScore+"分",24,null,cc.color(126,49,2));
        scoreLabel.setAnchorPoint(0,0);
        scoreLabel.setPosition(55,0);
        BoxBg.addChild(scoreLabel,0);

        UITools.addClickEvent(reduceBtn,this,this.onChangeScoreClick);
        UITools.addClickEvent(addBtn,this,this.onChangeScoreClick);

        this.numBox = BoxBg;
        this.numBox.visible = false;
    },

     createChangeScoreBox:function(row){
        if(!this.layoutArr[row]){
            return;
        }
        this.addNumBox = new changeEditBox(["",10,"分"],1);
        //参数1 显示文字（分三段，第二个参数必须是值）参数2 点击按钮每次改变值 （参数3 最小值默认1，参数4 最大值默认100）
        this.addNumBox.setWidgetPosition(540,0);//设置位置
        this.addNumBox.setScoreLabel(this.addScore);//设置初始值
        this.layoutArr[row].addChild(this.addNumBox);

        this.addLabel = UICtor.cLabel("加",24,null,cc.color(126,49,2));
        this.addLabel.setAnchorPoint(0.5,0.5);
        this.addLabel.setPosition(490,0);
        this.layoutArr[row].addChild(this.addLabel);

        this.allowNumBox = new changeEditBox(["",10,"分"],1);
        this.allowNumBox.setWidgetPosition(240,0);
        this.allowNumBox.setScoreLabel(this.allowScore);
        this.layoutArr[row].addChild(this.allowNumBox);
    },


    changeHandle:function(item){
        var tag = item.getTag();
        if(tag < 400){
            this.updateZsNum();
        }

        var tagArr = [100,101,102,300,301,302,501,504,600,601,602,603,604];
        if(ArrayUtil.indexOf(tagArr,tag) >= 0){
            this.updateItemShow();
        }
    },

    updateItemShow:function() {

        var idx1 = 0;
        var idx2 = 0;
        for (var i = 0; i < 3; ++i) {
            if (this.getItemByIdx(1, i).isSelected())idx1 = i;
            if (this.getItemByIdx(3, i).isSelected())idx2 = i;
        }


        //4人 3副牌 暗8张底牌 可带牌 托管 记牌器(显示剩余牌)
        //3人 3副牌 暗8张底牌 可带牌 托管 显示剩余牌 随机出头 王筒子
        //2人 3副牌 暗8张底牌 可带牌 托管 显示剩余牌 随机出头 王筒子 有牌必打

        //4人 4副牌 暗8张底牌 可带牌 托管 记牌器(显示剩余牌)
        //3人 4副牌 暗8张底牌 可带牌 托管 显示剩余牌 随机出头
        //2人 4副牌 暗8张底牌 可带牌 托管 显示剩余牌 随机出头 有牌必打

        //4人 快乐四喜 可带牌 托管 记牌器(显示剩余牌)
        //3人 快乐四喜 暗8张底牌 可带牌 托管 显示剩余牌 随机出头
        //2人 快乐四喜 暗8张底牌 可带牌 托管 显示剩余牌 随机出头 有牌必打

        var arr = [0, 1,2];
        if (!(idx1 == 0 && idx2 == 2)) {
            arr.push(1);//暗底牌选项
        }
        if (idx1 == 1 || idx1 == 2) {
            arr.push(3);//随机出头选项
        }
        if ((idx1 == 1 || idx1 == 2) && idx2 == 0) {
            arr.push(4);//王筒子选项
        }
        if (idx1 == 2) {
            arr.push(5);//有牌必打选项
        }
        for (var i = 0; i < this.layoutArr[5].itemArr.length; ++i) {
            var flag = ArrayUtil.indexOf(arr, i) >= 0;
            if (i < 6){
                this.layoutArr[5].itemArr[i].setItemState(flag);
            }

        }

        this.getItemByIdx(5,2).itemLabel.setString(idx1 == 0 ? "记牌器" : "显示剩余牌");
        if (idx1 != 0) {//2人3人默认选中暗牌选项
            this.getItemByIdx(5,1).setSelected(true);
        }

        var numConfig = [[8, 9, 66], [8, 52, 96], [8, 44, 88]];
        var darkNum = numConfig[idx2][idx1];

        if(this.getItemByIdx(5,4).isSelected()){
            darkNum += 6;
        }

        this.getItemByIdx(5,1).itemLabel.setString("暗" + darkNum + "张底牌");
        this.getItemByIdx(5,1).visible = true;
        if(this.getItemByIdx(2,0).isSelected() && this.getItemByIdx(3,2).isSelected())  this.getItemByIdx(5,1).visible = false;
        this.updateLayout();
    },

    updateZsNum:function(){

        var zsNum = 0;
        var zsNumArr1 = [1,1]
        var zsNumArr2 = [1,1]
        var renshu = 4;
        var temp = 0;
        for(var i = 0;i<3;++i){
            if(this.getItemByIdx(1,i).isSelected()){
                renshu = 4-i;
                break;
            }
        }
        var jushuIndex = 0;
        for(var i = 0;i<2;++i){
            if(this.getItemByIdx(2,i).isSelected()){
                jushuIndex = i;
                break;
            }
        }
        if (renshu == 4){
           zsNumArr1 = [10,15]
           zsNumArr2 = [40,60]
        } else if (renshu == 3){
           zsNumArr1 = [10,20]
           zsNumArr2 = [30,60]
        }else{
           zsNumArr1 = [15,30]
           zsNumArr2 = [30,60]
        }

        var zsNumstr = "";
        cc.log("jushuIndex---------------",jushuIndex)
        if(this.getItemByIdx(0,0).isSelected()){
            zsNumstr = zsNumArr1[jushuIndex] + "/人";
            if(this.getItemByIdx(5,7).isSelected()) zsNumstr = 2 + "/人";
        }else{
            zsNumstr = "x" + zsNumArr2[jushuIndex];
            if(this.getItemByIdx(5,7).isSelected()) zsNumstr = "x" + 6;
        }

        this.label_zuan.setString(zsNumstr);

    },

    updateDouziNum:function(){
        var renshu = 4;
        for(var i = 0;i<3;++i){
            if(this.getItemByIdx(1,i).isSelected()){
                renshu = 4-i;
                break;
            }
        }

        var fentype = 0;
        if(this.getItemByIdx(2,1).isSelected())fentype = 1;

        var paitype = 0;
        if(this.getItemByIdx(3,1).isSelected())paitype = 1;
        if(this.getItemByIdx(3,2).isSelected())paitype = 2;


        var configArr = [
            [{2:1500,3:1000,4:1000},{2:1500,3:1000,4:1000},{2:2000,3:1300,4:1000}],
            [{2:3000,3:2000,4:1500},{2:3000,3:2000,4:1500},{2:3500,3:2300,4:1800}]
        ]

        var num = configArr[fentype][paitype][renshu];

//        this.createRoomLayer && this.createRoomLayer.updateZsNum(num);
    },

    getWanfaList:function(){
        var data = {params:[],strParams:""};

        var renshu = 4;
        for(var i = 0;i<3;++i){
            if(this.getItemByIdx(1,i).isSelected()){
                renshu = 4-i;
                break;
            }
        }
        var costWay = 1;
        if(this.isClubSaveConfig) {
            costWay = 4;
        }else if(this.isClubSaveConfig && ClickClubModel.getClubIsOpenLeaderPay()){
            costWay = 3;
        }else{
            if(this.getItemByIdx(0,1).isSelected())costWay = 2;
        }


        var maxScore = 600;
        if(this.getItemByIdx(2,1).isSelected())maxScore = 1000;

        var exScore = 0;
        var exScoreArr = [0,100,200,300,500,800,1000];
        for(var i = 0;i<7;++i){
            if(this.getItemByIdx(4,i).isSelected()){
                exScore = exScoreArr[i];
                break;
            }
        }

        var isDark8 = 0;
        if(this.getItemByIdx(5,1).isSelected())isDark8 = 1;

        var isShowNumber = 0;
        if(this.getItemByIdx(5,2).isSelected())isShowNumber = 1;

        var isFirstOut = 0;
        if(this.getItemByIdx(5,3).isSelected())isFirstOut = 1;

        var isDaiPai = 0;
        if(this.getItemByIdx(5,0).isSelected())isDaiPai = 1;

        var isWangTongZi = 0;
        if(this.getItemByIdx(5,4).isSelected())isWangTongZi = 1;

        var isBida = 0;
        if(this.getItemByIdx(5,5).isSelected())isBida = 1;

        var autoPlay = 0;
        if(this.getItemByIdx(5,6).isSelected())autoPlay = 1;

        var yiju = 0;
        if(this.getItemByIdx(5,7).isSelected())yiju = 1;

        var typeConfig = {4:[113,114,212],3:[115,116,211],2:[117,118,210]};
        var wanfaIdx = 0;
        if(this.getItemByIdx(3,1).isSelected())wanfaIdx = 1;
        if(this.getItemByIdx(3,2).isSelected())wanfaIdx = 2;

        data.params = [
            yiju==1?1:0, // 0
            typeConfig[renshu][wanfaIdx], //1
            costWay,//2
            maxScore,//3
            exScore,//4
            isDark8,//5
            0,//6
            renshu,//7,
            isShowNumber,//8 
            isFirstOut , //9
            isBida,//10
            isWangTongZi,//11
            autoPlay,//12
            isDaiPai,//13
        ];

        return data.params;
    },

    //单独获取游戏类型id,支付方式选项,局数,人数的项
    //用于俱乐部的创建
    getWanfas:function(){
        var renshu = 4;
        for(var i = 0;i<3;++i){
            if(this.getItemByIdx(1,i).isSelected()){
                renshu = 4-i;
                break;
            }
        }
        var costWay = 1;
        if(this.isClubSaveConfig) {
            costWay = 4;
        }else if(this.isClubSaveConfig && ClickClubModel.getClubIsOpenLeaderPay()){
            costWay = 3;
        }else{
            if(this.getItemByIdx(0,1).isSelected())costWay = 2;
        }

        var typeConfig = {4:[113,114,212],3:[115,116,211],2:[117,118,210]};
        var wanfaIdx = 0;
        if(this.getItemByIdx(3,1).isSelected())wanfaIdx = 1;
        if(this.getItemByIdx(3,2).isSelected())wanfaIdx = 2;

        return [typeConfig[renshu][wanfaIdx],costWay,30,renshu];

    },

    //俱乐部创建玩法包厢,读取配置选项
    readSelectData:function(params){
        cc.log("===========readSelectData============" + params);
        var defaultConfig = [[1],[1],[0],[0],[0],[],[0],[0]];

        defaultConfig[0][0] = params[2] == 3||params[2] == 4?0:params[2] - 1;
        defaultConfig[1][0] = params[7] == 3 ? 1 : params[7] == 2 ? 2 : 0;
        defaultConfig[2][0] = params[3] == 1000 ? 1 : 0;
        defaultConfig[3][0] = params[14] || 0;//暂时不知道怎么做
        defaultConfig[4][0] = params[4] == 100 ? 1 :params[4] == 200 ? 2 :params[4] == 300 ? 3 :params[4] == 500 ? 4
                            :params[4] == 800 ? 5:params[4] == 1000 ? 6:0;
        defaultConfig[6][0] = params[12]==1?1:params[12] == 300?4:params[12]/60;
        defaultConfig[7][0] = params[15]?params[15]-1:1;



        if(params[13] == "1")defaultConfig[5].push(0);
        if(params[5] == "1")defaultConfig[5].push(1);
        if(params[8] == "1")defaultConfig[5].push(2);
        if(params[9] == "1")defaultConfig[5].push(3);
        if(params[11] == "1")defaultConfig[5].push(4);
        if(params[10] == "1")defaultConfig[5].push(5);

        if(params[12] == 1)defaultConfig[5].push(6);
        if(params[0] == 1)defaultConfig[5].push(7);

        this.defaultConfig = defaultConfig;
    },
});