/**
 * Created by cyp on 2019/3/21.
 */
var RuleSelect_PDK = RuleSelectBase.extend({
    ctor:function(isSaveChoose, wanfaList,isLeaderPay){
        this._super(isSaveChoose, wanfaList,isLeaderPay);
        this.addCardsItem();
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
        this.ruleConfig = [
            {title:"房费",type:1,content:["AA支付","房主支付"]},// 0
            {title:"人数",type:1,content:["3人","2人"]},// 1
            {title:"局数",type:1,content:["1局","10局","15局","20局"],col:3},// 2
            {title:"红10",type:1,content:["不选红10","5分","10分","翻倍"]},// 3
            {title:"玩法",type:1,content:["16张(三个A,一个2)","15张(三个K,一个A,一个2)"],col:2},// 4
            {title:"四带",type:1,content:["不选四带","4带3、2、1","4带2、1"]},// 5
            {title:"可选",type:2,content:["显示剩余牌数","三张和飞机可少带接完","首局必出黑桃3","托管"],col:2},// 6
            {title:"加倍",type:1,content:["不加倍","加倍"]},//7
            {title:"倍数",type:1,content:["翻2倍","翻3倍","翻4倍"]},//8
            {title:"加分",type:2,content:["低于"]},//9
        ];

        this.defaultConfig = [[1],[0],[0],[0],[0],[0],[1],[1],[0],[9]];
        this.diScore = parseInt(cc.sys.localStorage.getItem("PDK_diScore")) || 20;
        this.addScore = parseInt(cc.sys.localStorage.getItem("PDK_addBoxScore")) || 10;/** 加xx分 **/
        this.allowScore = parseInt(cc.sys.localStorage.getItem("PDK_allowBoxScore")) || 10;/** 低于xx分 **/

        if(this.isClubSaveConfig){
            if(ClickClubModel.getClubIsOpenLeaderPay()){
                this.ruleConfig[0].content = ["群主支付"];
                this.defaultConfig[0][0] = 0;
            }

            var params = this.wanfaList;
            if(params[1] == 15 || params[1] == 16){
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

    changeHandle:function(item){
        var tag = item.getTag();
        if(tag < 300){
            this.updateZsNum();
        }

        // if(tag == 100 || tag == 101){
        //     this.updateItemShow();
        // }

        this.updateItemShow();
    },

    createChangeScoreBox:function(row){
        if(!this.layoutArr[row]){
            return;
        }
        this.addNumBox = new changeEditBox(["",10,"分"],1);
        //参数1 显示文字（分三段，第二个参数必须是值）参数2 点击按钮每次改变值 （参数3 最小值默认1，参数4 最大值默认100）
        this.addNumBox.setWidgetPosition(850,0);//设置位置
        this.addNumBox.setScoreLabel(this.addScore);//设置初始值
        this.layoutArr[row].addChild(this.addNumBox);
        this.allowNumBox = new changeEditBox(["",10,"分"],1);

        this.addLabel = UICtor.cLabel("加",38,null,cc.color(126,49,2));
        this.addLabel.setAnchorPoint(0.5,0.5);
        this.addLabel.setPosition(770,0);
        this.layoutArr[row].addChild(this.addLabel);

        this.allowNumBox.setWidgetPosition(380,0);
        this.allowNumBox.setScoreLabel(this.allowScore);
        this.layoutArr[row].addChild(this.allowNumBox);
    },

    updateItemShow:function(){
        if(this.getItemByIdx(1,1).isSelected()){
            // this.layoutArr[6].itemArr[3].setVisible(false);
            this.layoutArr[11].setVisible(true);
            if(this.getItemByIdx(11,0).isSelected()){
                this.layoutArr[12].setVisible(false);
                this.numBox.visible=false;
            }else{
                this.layoutArr[12].setVisible(true);
                this.numBox.visible=true;
            }
            this.layoutArr[13].setVisible(true);
            this.addNumBox.itemBox.visible = true;
            this.allowNumBox.itemBox.visible = true;
            var isOpen = this.getItemByIdx(13,0).isSelected();
            this.addNumBox.setTouchEnable(isOpen);
            this.allowNumBox.setTouchEnable(isOpen);
        }else{
            // this.layoutArr[6].itemArr[3].setVisible(true);
            this.layoutArr[11].setVisible(false);
            this.layoutArr[12].setVisible(false);
            this.numBox.visible=false;
            this.layoutArr[13].setVisible(false);
            this.addNumBox.itemBox.visible = false;
            this.allowNumBox.itemBox.visible = false;
        }

        if (this.getItemByIdx(7,0).isSelected()){
            this.layoutArr[8].visible = false;
        }else{
            this.layoutArr[8].visible = true;
        }

        if(!this.getItemByIdx(9,0).isSelected()){
            this.getItemByIdx(10,0).setSelected(true);
            for (var i= 1;i<6;i++){
                this.getItemByIdx(10,i).setItemState(false);
            }
            for (var i= 1;i<4;i++){
                this.getItemByIdx(9,i).setItemState(true);
            }
        }else{
            for (var i= 1;i<6;i++){
                this.getItemByIdx(10,i).setItemState(true);
            }
        }
        if(!this.getItemByIdx(10,0).isSelected()){
            this.getItemByIdx(9,0).setSelected(true);
            for (var i= 1;i<6;i++){
                this.getItemByIdx(10,i).setItemState(true);
            }
            for (var i= 1;i<4;i++){
                this.getItemByIdx(9,i).setItemState(false);
            }
        }else{
            for (var i= 1;i<4;i++){
                this.getItemByIdx(9,i).setItemState(true);
            }
        }
    },

    updateZsNum:function(){
        if(this.isClubSaveConfig){
            this.updateDouziNum();
            return;
        }

        var zsNum = 5;
        var zsNumArr = [1,3,5,5,8,10];
        var temp = 0;
        var renshu = 3;
        for(var i = 0;i<2;++i){
            if(this.getItemByIdx(1,i).isSelected()){
                renshu = 3-i;
                break;
            }
        }

        for(var i = 0;i<zsNumArr.length;++i){
            var item = this.getItemByIdx(2,i);
            if(item.isSelected()){
                temp = i;
                break;
            }
        }

        if(this.isClubSaveConfig && ClickClubModel.getClubIsOpenLeaderPay()){
            zsNum = zsNumArr[temp];
        }else{
            //if(this.getItemByIdx(0,0).isSelected()){
            //    zsNum = Math.ceil(zsNumArr[temp]/renshu);
            //}else{
            //    zsNum = zsNumArr[temp]
            //}
            zsNum = 10;
        }

//        this.updateZsNum()
    },

    updateDouziNum:function(){
        var renshu = 3;
        for(var i = 0;i<2;++i){
            if(this.getItemByIdx(1,i).isSelected()){
                renshu = 3-i;
                break;
            }
        }

        var temp = 0;
        for(var i = 0;i<5;++i){
            var item = this.getItemByIdx(2,i);
            if(item.isSelected()){
                temp = i;
                break;
            }
        }

        var configArr = [
            {2:2000,3:1500},{2:3000,3:2000},{2:3000,3:2000},{2:4500,3:3000},{2:5000,3:3500}
        ]

        var num = configArr[temp][renshu];

//        this.createRoomLayer && this.createRoomLayer.updateZsNum(num);
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

    onChangeScoreClick:function(obj){
        var temp = parseInt(obj.temp);
        var num = this.diScore;

        if (temp == 1){
            num = num - 10;
        }else{
            num = num + 10;
        }

        if (num && num >= 10 && num < 60){
            this.diScore = num;
        }else if ( num < 10){
            this.diScore = 10;
        }
        // cc.log("this.diScore =",this.diScore);
        this.scoreLabel.setString("低于"+ this.diScore + "分");
    },
    getWanfaList:function(){
        var data = {params:[],strParams:""};

        var renshu = 3;
        for(var i = 0;i<2;++i){
            if(this.getItemByIdx(1,i).isSelected()){
                renshu = 3-i;
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

        var jushu = 5;
        var jushuList = [1,5,8,10,15,20];
        for(var i = 0;i<jushuList.length;++i){
            if(this.getItemByIdx(2,i).isSelected()){
                jushu = jushuList[i];
                break;
            }
        }

        var heitao3 = 0;
        if(this.getItemByIdx(6,2).isSelected())heitao3 = 1;
        // if(renshu == 2)heitao3 = 0;

        var showCardNum = 0;
        if(this.getItemByIdx(6,0).isSelected())showCardNum = 1;

        var hongshi = 0;
        for(var i = 0;i<4;++i){
            if(this.getItemByIdx(3,i).isSelected()){
                hongshi = i;
                break;
            }
        }

        var siDaiNum = 0;
        if(this.getItemByIdx(5,1).isSelected())siDaiNum = 3;
        if(this.getItemByIdx(5,2).isSelected())siDaiNum = 2;

        var threeFj = 1;
        if(this.getItemByIdx(6,1).isSelected())threeFj = 0;


        var autoPlay = 0;
        for(var i = 0;i<4;++i){
            if(this.getItemByIdx(7,i).isSelected()){
                autoPlay = i*60;
                break;
            }
        }
        if(this.getItemByIdx(7,4).isSelected()){
            autoPlay = 300;
        }

        var wuzhadan = 0;
        if(this.getItemByIdx(6,3).isSelected())wuzhadan = 1;

        var huikan = 0;
        if(this.getItemByIdx(6,4).isSelected())huikan = 1;

        var zdbkc = 1;
        if(this.getItemByIdx(6,5).isSelected())zdbkc = 0;

        var saszd = 0;
        if(this.getItemByIdx(6,6).isSelected())saszd = 1;

        var wanfa = 16;
        if(this.getItemByIdx(4,1).isSelected())wanfa = 15;

        var dScore = this.diScore;
        cc.sys.localStorage.setItem("PDK_diScore",dScore);

        var daniao = 0;
        var niaoArr = [0,10,20,50];
        for(var i = 0;i<4;++i){
            if(this.getItemByIdx(9,i).isSelected()){
                daniao = niaoArr[i];
            }
        }

        var doubleNum = 2;
        for(var i = 0;i<3;++i){
            if(this.getItemByIdx(12,i).isSelected()){
                doubleNum = 2 + i;
            }
        }

        var djtg = 1;
        if (this.getItemByIdx(8,1).isSelected()){
            djtg = 2;
        }else if (this.getItemByIdx(8,2).isSelected()){
            djtg = 3;
        }

        var piaofen = 0;
        for (var i = 0; i < 6; i++) {
            if (this.getItemByIdx(10,i).isSelected()){
                piaofen = i ;
            }
        }
        var isDouble = 0;
        if(this.getItemByIdx(11,1).isSelected())isDouble = 1;

        var morefen = 0;//低于多少分加多少分
        var allowScore = 0;
        if(this.getItemByIdx(13,0).isSelected()){//如果勾选
            morefen = this.addNumBox.localScore;
            allowScore = this.allowNumBox.localScore;
        }
        // cc.sys.localStorage.setItem("PDK_addBoxScore",morefen);
        // cc.sys.localStorage.setItem("PDK_allowBoxScore",allowScore);

        data.params = [
            jushu,//局数 0
            wanfa,//玩法ID 1 
            0,0,0,0,
            heitao3,//黑桃3 6
            renshu,//人数 7
            showCardNum,//显示剩余牌数 8
            costWay,//支付方式 9
            hongshi,//红10 10
            siDaiNum,//四带几的选项 11
            threeFj,//三张和飞机可少带接完 12
            0,0,0,0,0,0,0,0,
            autoPlay,//可托管 21
            isDouble,// 是否加倍 0 1 22
            dScore,// 低于多少分加倍 23
            doubleNum,// 加几倍 24
            wuzhadan,//无炸弹 25
            huikan,//回看 26
            djtg,//单局托管 27
            daniao,//打鸟28
            zdbkc,//炸弹不可拆 29
            saszd,//3A算炸弹 30
            piaofen,//飘分 31
            morefen,//加xx分 32
            allowScore,//低于xx分 33
        ];
        // cc.log("data.params = ",JSON.stringify(data.params));
        return data.params;
    },

    //单独获取游戏类型id,支付方式选项,局数,人数的项
    //用于俱乐部的创建
    getWanfas:function(){
        var renshu = 3;
        for(var i = 0;i<2;++i){
            if(this.getItemByIdx(1,i).isSelected()){
                renshu = 3-i;
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

        var jushu = 5;
        var jushuList = [1,5,8,10,15,20];
        for(var i = 0;i<jushuList.length;++i){
            if(this.getItemByIdx(2,i).isSelected()){
                jushu = jushuList[i];
                break;
            }
        }

        var wanfa = 16;
        if(this.getItemByIdx(4,1).isSelected())wanfa = 15;

        return [wanfa,costWay,jushu,renshu];

    },

    //俱乐部创建玩法包厢,读取配置选项
    readSelectData:function(params){
        cc.log("===========readSelectData============" + params);
        var defaultConfig = [[0],[0],[0],[0],[0],[0],[],[0],[0],[0],[0],[0],[0],[]];
        var jushuList = [1,5,8,10,15,20];
        var index = jushuList.indexOf(parseInt(params[0]));
        defaultConfig[0][0] = params[9] == 3||params[9] == 4?0:params[9] - 1;
        defaultConfig[1][0] = params[7] == 2 ? 1 : 0;
        defaultConfig[2][0] = index != -1 ? index : 0;
        defaultConfig[3][0] = params[10];
        defaultConfig[4][0] = params[1] == 15 ? 1 : 0;
        defaultConfig[5][0] = params[11] == 3 ? 1 : params[11] == 2 ? 2 : 0;
        defaultConfig[7][0] = params[21] == 1?1:params[21] == 300?4:params[21]/60;
        defaultConfig[8][0] = parseInt(params[27]) - 1 >= 0?parseInt(params[27]) - 1:1;
        defaultConfig[9][0] = params[28] == 10?1:params[28] == 20?2:params[28]==50?3:0;
        defaultConfig[10][0] = parseInt(params[31]);
        defaultConfig[11][0] = params[22] == 1 ? 1 : 0;
        defaultConfig[12][0] = params[24] - 2;

        if(params[8] == "1")defaultConfig[6].push(0);
        if(params[12] == "0")defaultConfig[6].push(1);
        if(params[6] == "1")defaultConfig[6].push(2);
        if(params[25] == "1")defaultConfig[6].push(3);
        if(params[26] == "1")defaultConfig[6].push(4);
        if(params[29] == "0")defaultConfig[6].push(5);
        if(params[30] == "1")defaultConfig[6].push(6);

        if(params[32] && parseInt(params[32]) > 0){
            defaultConfig[13].push(0);
        }
        this.diScore = parseInt(params[23]);
        this.addScore = parseInt(params[32])||10;
        this.allowScore = parseInt(params[33])||10;
        this.defaultConfig = defaultConfig;
    },
});