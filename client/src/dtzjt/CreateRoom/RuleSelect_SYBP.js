 /**
 * Created by cyp on 2019/3/20.
 */
var RuleSelect_SYBP = RuleSelectBase.extend({
    ctor:function(isSaveChoose, wanfaList,isLeaderPay){
        this._super(isSaveChoose, wanfaList,isLeaderPay);
        this.createNumBox(8);
        this.addCardsItem();
        this.createChangeScoreBox(10);//创建低于xx分加xx分
        this.getItemByIdx(10,0).itemBtn.setContentSize(80,40);
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
            {title:"人数",type:1,content:["4人","3人","2人"]},//1
            {title:"可选",type:2,content:["红黑胡","可连庄","1局"]},//2
            {title:"抽牌",type:1,content:["不抽底牌","抽牌10张","抽牌20张"]},//3
            {title:"连庄上限",type:1,content:["不封顶","150分","200分","300分"]},//4
            {title:"托管",type:1,content:["不托管","1分钟","2分钟","3分钟","5分钟"],col:3},//5
            {title:"托管",type:1,content:["单局托管","整局托管","三局托管"],col:3},//6
            {title:"加锤",type:1,content:["不锤","锤"],col:3},//7
            {title:"加倍",type:1,content:["不加倍","加倍"]},//8
            {title:"倍数",type:1,content:["翻2倍","翻3倍","翻4倍"]},//9
            {title:"加分",type:2,content:["低于"]},//10
        ];

        this.defaultConfig = [[1],[0],[],[0],[0],[0],[1],[0],[0],[0],[]];
        this.dnScore = parseInt(cc.sys.localStorage.getItem("SYBP_diScore")) || 5;
        this.addScore = parseInt(cc.sys.localStorage.getItem("SYBP_addBoxScore")) || 10;/** 加xx分 **/
        this.allowScore = parseInt(cc.sys.localStorage.getItem("SYBP_allowBoxScore")) || 10;/** 低于xx分 **/

        if(this.isClubSaveConfig){
            if(ClickClubModel.getClubIsOpenLeaderPay()){
                this.ruleConfig[0].content = ["群主支付"];
                this.defaultConfig[0][0] = 0;
            }

            var params = this.wanfaList;
            if(params[1] == PHZGameTypeModel.SYBP){
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
        if(tag == 201){
            this.getItemByIdx(2,2).setSelected(false);
        }
        if(tag == 202){
            this.getItemByIdx(2,1).setSelected(false);
        }
        if(tag < 203 ){
            this.updateZsNum();
        }
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

         this.addLabel = UICtor.cLabel("加",38,null,cc.color(126,49,2));
         this.addLabel.setAnchorPoint(0.5,0.5);
         this.addLabel.setPosition(770,0);
         this.layoutArr[row].addChild(this.addLabel);

         this.allowNumBox = new changeEditBox(["",10,"分"],1);
         this.allowNumBox.setWidgetPosition(380,0);
         this.allowNumBox.setScoreLabel(this.allowScore);
         this.layoutArr[row].addChild(this.allowNumBox);
     },

    updateItemShow:function(){
        var item = this.getItemByIdx(2,1);
        this.layoutArr[4].setVisible(item.isSelected());

        if(this.getItemByIdx(1,2).isSelected()){
            this.layoutArr[8].setVisible(true);
            this.layoutArr[3].setVisible(true);
            if(this.getItemByIdx(8,0).isSelected()){
                this.layoutArr[9].setVisible(false);
                this.numBox.setVisible(false);
            }else{
                this.numBox.setVisible(true);
                this.layoutArr[9].setVisible(true);
            }
            this.layoutArr[10].setVisible(true);
            this.addNumBox.itemBox.visible = true;
            this.allowNumBox.itemBox.visible = true;
            var isOpen = this.getItemByIdx(10,0).isSelected();
            this.addNumBox.setTouchEnable(isOpen);
            this.allowNumBox.setTouchEnable(isOpen);
        }else{
            this.layoutArr[8].setVisible(false);
            this.layoutArr[9].setVisible(false);
            this.numBox.setVisible(false);
            this.layoutArr[3].setVisible(false);
            this.layoutArr[10].setVisible(false);
            this.addNumBox.itemBox.visible = false;
            this.allowNumBox.itemBox.visible = false;
        }
        if (this.getItemByIdx(5,0).isSelected()){
            this.layoutArr[6].setVisible(false);
        }else{
            this.layoutArr[6].setVisible(true);
        }
        this.updateLayout();
    },

    updateZsNum:function(){
        if(this.isClubSaveConfig){
            this.updateDouziNum();
            return;
        }

        var zsNum = 4;
        var renshu = 4;
        for(var i = 0;i<3;++i){
            if(this.getItemByIdx(1,i).isSelected()){
                renshu = 4-i;
                break;
            }
        }

        if(this.isClubSaveConfig && ClickClubModel.getClubIsOpenLeaderPay()){
            zsNum = 4;
        }else{
            //if(this.getItemByIdx(0,0).isSelected()){
            //    zsNum = Math.ceil(4/renshu);
            //}else{
            //    zsNum = 4;
            //}
            zsNum = 10;
        }
        if(this.getItemByIdx(2,2).isSelected()) zsNum = 2;
//        this.updateZsNum()
    },

     updateDouziNum:function(){
         var renshu = 4;
         for(var i = 0;i<3;++i){
             if(this.getItemByIdx(1,i).isSelected()){
                 renshu = 4-i;
                 break;
             }
         }

         var temp = 0;
         if(this.getItemByIdx(2,2).isSelected())temp = 1;

         var configArr = [
             {2:2500,3:1700,4:1300},{2:500,3:500,4:500}
         ]

         var num = configArr[temp][renshu];

         this.createRoomLayer && this.createRoomLayer.updateZsNum(num);
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
        var scoreLabel = this.scoreLabel = UICtor.cLabel("低于"+this.dnScore+"分",38,null,cc.color(126,49,2));
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
        this.scoreLabel.setString("低于"+this.dnScore + "分");
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

        var limitScore = 0;
        var limitScoreArr = [0,150,200,300];
        for(var i = 0;i<4;++i){
            if(this.getItemByIdx(4,i).isSelected()){
                limitScore = limitScoreArr[i];
                break;
            }
        }
        var hongheihu = 0;
        if(this.getItemByIdx(2,0).isSelected())hongheihu = 1;

        var kelianzhuang = 0;
        if(this.getItemByIdx(2,1).isSelected())kelianzhuang = 1;

        var jushu = 10;
        if(this.getItemByIdx(2,2).isSelected())jushu = 1;

        var choupai = 0;
        var choupaiArr = [0,10,20];
        for(var i = 0;i<3;++i){
            if(this.getItemByIdx(3,i).isSelected()){
                choupai = choupaiArr[i];
                break;
            }
        }

        var autoPlay = 0;
        for(var i = 0;i<4;++i){
            if(this.getItemByIdx(5,i).isSelected()){
                autoPlay = i*60;
                break;
            }
        }
        if(this.getItemByIdx(5,4).isSelected()){
            autoPlay = 300;
        }

        var isDouble = 0;
        if(this.getItemByIdx(8,1).isSelected())isDouble = 1;

        // var dScore = 20;
        // for(var i = 0;i<4;++i){
        //     if(this.getItemByIdx(9,i).isSelected()){
        //         dScore = 20 + i*10;
        //         break;
        //     }
        // }
        var dScore = 0;
        dScore = this.dnScore;
        cc.sys.localStorage.setItem("SYBP_diScore",dScore);

        var doubleNum = 2;
        for(var i = 0;i<3;++i){
            if(this.getItemByIdx(9,i).isSelected()){
                doubleNum = 2 + i;
            }
        }
        var djtg = 2;
        if (this.getItemByIdx(6,0).isSelected()){
            djtg = 1;
        }else if (this.getItemByIdx(6,2).isSelected()){
            djtg = 3;
        }
        var chui = 0;
        if (this.getItemByIdx(7,1).isSelected()) chui = 1;

        var morefen = 0;
        var allowScore= 0;
        if(this.getItemByIdx(10,0).isSelected()){//如果勾选
            morefen = this.addNumBox.localScore;
            allowScore = this.allowNumBox.localScore;
        }
        cc.sys.localStorage.setItem("SYBP_addBoxScore",morefen);
        cc.sys.localStorage.setItem("SYBP_allowBoxScore",allowScore);

        data.params = [
            jushu,//局数 0
            PHZGameTypeModel.SYBP,//玩法ID 1
            0,0,0,0,0,
            renshu,//人数 7
            200,
            costWay,//支付方式 9
            limitScore,//连庄上限 10 
            hongheihu,//红黑胡选项 11
            kelianzhuang,//可连庄 12
            3,//多少息一屯 13
            choupai,//抽牌 14
            0,0,0,0,0,0,0,0,
            autoPlay,//可托管 23
            isDouble,//是否翻倍 24
            dScore,//翻倍上限 25 
            doubleNum,//翻倍倍数 26
            djtg,//单局托管 27
            chui,//锤 0不锤 1锤 28
            morefen,//29 "加xx分"
            allowScore,//30 "低于xx分"
        ];

        return data.params;
    },

    //单独获取游戏类型id,支付方式选项,局数,人数的项
    //用于俱乐部的创建
    getWanfas:function(){
        var costWay = 1;
        var jushu = 10;
        if(this.getItemByIdx(2,2).isSelected())jushu = 1;

        if(this.isClubSaveConfig) {
            costWay = 4;
        }else if(this.isClubSaveConfig && ClickClubModel.getClubIsOpenLeaderPay()){
            costWay = 3;
        }else{
            if(this.getItemByIdx(0,1).isSelected())costWay = 2;
        }

        var renshu = 4;
        for(var i = 0;i<3;++i){
            if(this.getItemByIdx(1,i).isSelected()){
                renshu = 4-i;
                break;
            }
        }
        return [PHZGameTypeModel.SYBP,costWay,jushu,renshu];
    },

    //俱乐部创建玩法包厢,读取配置选项
    readSelectData:function(params){
        //cc.log("===========readSelectData============" + params);
        var defaultConfig = [[0],[0],[],[0],[0],[0],[0],[0],[0],[0],[]];

        defaultConfig[0][0] = params[9] == 3||params[9] == 4?0:params[9] - 1;
        defaultConfig[1][0] = params[7] == 3 ? 1:params[7] == 2 ? 2: 0;
        defaultConfig[3][0] = params[14] == 10?1:params[14] == 20?2:0;
        defaultConfig[4][0] = params[10] == 150 ? 1 :params[10]==200?2:params[10]==300?3: 0;
        defaultConfig[5][0] = params[23]==1?1:params[23] == 300?4:params[23]/60;
        defaultConfig[6][0] = params[27]== 1 ? 0:params[27]== 2 ? 1 : 2;//单局托管/整局/三局
        defaultConfig[7][0] = parseInt(params[28]);
        defaultConfig[8][0] = params[24] == 1 ? 1 :0;
        defaultConfig[9][0] = params[26] == 3 ? 1 :params[26]==4?2:0;
        // defaultConfig[9][0] = ((params[25] -20)/10) || 0;
        this.dnScore = params[25]?parseInt(params[25]):5;
        if(params[29] && parseInt(params[29]) > 0){
            defaultConfig[10].push(0);
        }
        if(params[11] == "1")defaultConfig[2].push(0);
        if(params[12] == "1")defaultConfig[2].push(1);
        if(params[0] == "1")defaultConfig[2].push(2);

        this.addScore = parseInt(params[29])||10;
        this.allowScore = parseInt(params[30])||10;
        this.defaultConfig = defaultConfig;
    },
});