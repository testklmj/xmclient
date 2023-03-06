/**
 * Created by cyp on 2019/3/20.
 */
var RuleSelect_BBT = RuleSelectBase.extend({
    ctor:function(isSaveChoose, wanfaList,isLeaderPay){
        this._super(isSaveChoose, wanfaList,isLeaderPay);
//        this.createNumBox(7);
        this.addCardsItem();
//        this.createChangeScoreBox(9);//创建低于xx分加xx分
//        this.getItemByIdx(9,0).itemBtn.setContentSize(80,40);
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
            {title:"房费",type:1,content:["AA支付","房主支付"]},//0
            {title:"人数",type:1,content:["3人","2人"]},//1
            {title:"局数",type:1,content:["1局","8局","12局"]},//2
            {title:"玩法",type:2,content:["正510K分花色","可锤","助陡"]},//3
            {title:"可选",type:2,content:["显示剩余牌数","可4带3","带大王","托管"],col:3},//4
//            {title:"加倍",type:1,content:["不加倍","加倍"]},//7
//            {title:"倍数",type:1,content:["翻2倍","翻3倍","翻4倍"]},//8
//            {title:"加分",type:2,content:["低于"]},//10
            // {title:"翻倍上限",type:1,content:["小于20分","小于30分","小于40分","小于50分"]}//9
        ];

        this.defaultConfig = [[1],[0],[0],[1],[0]];
        this.dnScore = parseInt(cc.sys.localStorage.getItem("BBT_diScore")) || 5;

         if(this.isClubSaveConfig){
            if(ClickClubModel.getClubIsOpenLeaderPay()){
                this.ruleConfig[1].content = ["群主支付"];
                this.defaultConfig[1][0] = 0;
            }

            var params = this.wanfaList;
            if(params[1] == 131){
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
        this.addNumBox.setWidgetPosition(850,0);//设置位置
        this.addNumBox.setScoreLabel(this.addScore);//设置初始值
        this.layoutArr[row].addChild(this.addNumBox);

        this.addLabel = UICtor.cLabel("加",38,null,cc.color(126,49,2));
        //this.addLabel.setAnchorPoint(0.5,0.5);
        this.addLabel.setPosition(770,0);
        this.layoutArr[row].addChild(this.addLabel);

        this.allowNumBox = new changeEditBox(["",10,"分"],1);
        this.allowNumBox.setWidgetPosition(380,0);
        this.allowNumBox.setScoreLabel(this.allowScore);
        this.layoutArr[row].addChild(this.allowNumBox);
    },

    changeHandle:function(item){
        var tag = item.getTag();
        // if(tag < 200){
            this.updateZsNum();
        // }

        // var tagArr = [100,101,600,601];
        // if(ArrayUtil.indexOf(tagArr,tag) != -1){
            this.updateItemShow();
        // }
    },

    updateItemShow:function(){
        if(this.getItemByIdx(0,1).isSelected()){
            this.getItemByIdx(4,2).setVisible(false);
        }else{
            this.getItemByIdx(4,2).setVisible(true);
        }
        if(this.getItemByIdx(1,1).isSelected()){
            this.getItemByIdx(3,1).setVisible(false);
            this.getItemByIdx(3,2).setVisible(false);
        }else{
            this.getItemByIdx(3,1).setVisible(true);
            this.getItemByIdx(3,2).setVisible(true);
        }
        this.updateLayout();
    },

    updateZsNum:function(){

        var zsNum = 4;
        var zsNumArr1 = [1,1,1]
        var zsNumArr2 = [1,1,1]
        var renshu = 3;
        var temp = 0;
        for(var i = 0;i<2;++i){
            if(this.getItemByIdx(1,i).isSelected()){
                renshu = 3-i;
                break;
            }
        }
        var jushuIndex = 0;
        var jushuArr = [1,8,12]
        for(var i = 0;i<3;++i){
            if(this.getItemByIdx(2,i).isSelected()){
//                renshu = jushuArr[i];
                jushuIndex = i;
                break;
            }
        }
        if (renshu == 3){
           zsNumArr1 = [2,15,20]
           zsNumArr2 = [6,40,60]
        }else{
           zsNumArr1 = [3,15,20]
           zsNumArr2 = [6,40,60]
        }

        if(this.getItemByIdx(0,0).isSelected()){
            this.label_zuan.setString(zsNumArr1[jushuIndex] + "/人");
        }else{
            this.label_zuan.setString("x" + zsNumArr2[jushuIndex]);
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
        for(var i = 0;i<2;++i){
            var item = this.getItemByIdx(4,i);
            if(item.isSelected()){
                temp = i;
                break;
            }
        }

        var configArr = [
            {2:2500,3:1700},{2:4500,3:3000}
        ]

        var num = configArr[temp][renshu];

        this.updateZsNum();
    },

    //row 第几列
    createNumBox:function (row) {
        if (!this.layoutArr[row]){
            return null
        }
        if (this.numBox){
            return
        }
        var lineNum = Math.ceil(this.layoutArr[row].itemArr.length/3);
        var BoxBg = new cc.Sprite("res/ui/createRoom/createroom_img_bg_1.png");
        this.layoutArr[row].addChild(BoxBg);
        BoxBg.setAnchorPoint(0,0.5);
        BoxBg.x = 350 + (730/(this.layoutArr[row].itemArr.length));
        BoxBg.y = 70*(lineNum-1)/2 - 70*parseInt(this.layoutArr[row].itemArr.length/3);

        var reduceBtn = new ccui.Button();
        reduceBtn.loadTextureNormal("res/ui/createRoom/createroom_btn_sub.png");
        reduceBtn.setAnchorPoint(0,0);
        reduceBtn.setPosition(-5,-4);
        reduceBtn.temp = 1;
        BoxBg.addChild(reduceBtn,1);
        //
        var addBtn = new ccui.Button();
        addBtn.loadTextureNormal("res/ui/createRoom/createroom_btn_add.png");
        addBtn.setAnchorPoint(0,0);
        addBtn.setPosition(BoxBg.width-addBtn.width+5,-4);
        addBtn.temp = 2;
        BoxBg.addChild(addBtn,1);


        // cc.log("this.dnScore =",this.dnScore);
        var scoreLabel = this.scoreLabel = UICtor.cLabel(this.dnScore+"分",38,null,cc.color(126,49,2));
        scoreLabel.setPosition(BoxBg.width/2,BoxBg.height/2);
        BoxBg.addChild(scoreLabel,0);

        UITools.addClickEvent(reduceBtn,this,this.onChangeScoreClick);
        UITools.addClickEvent(addBtn,this,this.onChangeScoreClick);

        this.numBox = BoxBg;
        this.numBox.visible = false;
    },
    onChangeScoreClick:function(obj){
        var temp = parseInt(obj.temp);
        var num = this.dnScore;
        if (temp == 1){
            num = num - 5;
        }else{
            num = num + 5;
        }

        if (num && num >= 5 && num <= 100){
            this.dnScore = num;
        }
        // cc.log("this.dnScore =",this.dnScore);
        this.scoreLabel.setString(this.dnScore + "分");
    },
    getWanfaList:function(){
        var data = {params:[],strParams:""};
        var jushu = 1;
        if(this.getItemByIdx(2,1).isSelected()){
            jushu = 8;
        }else if(this.getItemByIdx(2,2).isSelected()){
            jushu = 12;
        }

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

        var bbt_kc = 0
        if(this.getItemByIdx(3,1).isSelected()){
            bbt_kc = 1;
        }

        var bbt_kt = 0
        if(this.getItemByIdx(3,2).isSelected()){
            bbt_kt = 1;
        }

        var bbt_wsk = 0
        if(this.getItemByIdx(3,0).isSelected()){
            bbt_wsk = 1;
        }

        var showCardNumber = 0
        if(this.getItemByIdx(4,0).isSelected()){
            showCardNumber = 1;
        }

        var isSidaisan = 0
        if(this.getItemByIdx(4,1).isSelected()){
            isSidaisan = 1;
        }
        var isDaidawang = 0
        if(this.getItemByIdx(4,3).isSelected()){
            isDaidawang = 1;
        }

        var autoPlay = 0
        if(this.getItemByIdx(4,3).isSelected()){
            autoPlay = 1;
        }

        data.params = [
            jushu,//局数 0 
            131,//玩法ID 1
            costWay,bbt_kc,bbt_wsk,bbt_kt,showCardNumber,
            renshu,//人数 7
            isSidaisan,
            isDaidawang,//支付方式 9
            autoPlay,//连庄上限 10
        ];

        return data.params;
    },

    //单独获取游戏类型id,支付方式选项,局数,人数的项
    //用于俱乐部的创建
    getWanfas:function(){
        var jushu = 1;
        if(this.getItemByIdx(2,1).isSelected()){
            jushu = 8;
        }else if(this.getItemByIdx(2,2).isSelected()){
            jushu = 16;
        }

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

        return [131,costWay,jushu,renshu];

    },

    //俱乐部创建玩法包厢,读取配置选项
    readSelectData:function(params){
        cc.log("===========readSelectData============" + params);
        var defaultConfig = [[0],[0],[0],[0],[0]];
        defaultConfig[0][0] = params[7] == 2 ? 1: 0;
        defaultConfig[1][0] = params[2] == 2 ? 1: 0;
        defaultConfig[2][0] = params[0]== 1 ? 0 : params[0]/8;
        defaultConfig[3][0] = params[4];
        defaultConfig[3][1] = params[3];
        defaultConfig[3][2] = params[5];
        defaultConfig[4][0] = params[6];
        defaultConfig[4][1] = params[8];
        defaultConfig[4][2] = params[9];
        defaultConfig[4][3] = params[10];

        this.dnScore = params[25]?parseInt(params[25]):5;
        // if(params[23] == "1")defaultConfig[2].push(0);

        this.defaultConfig = defaultConfig;
    },
});