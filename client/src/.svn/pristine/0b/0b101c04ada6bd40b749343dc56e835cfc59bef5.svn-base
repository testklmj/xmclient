/**
 * Created by leiwenwen on 2019/5/24.
 */

var CreateRoomPDK = BasePopup.extend({
    ctor: function (isSaveChoose, wanfaList,isLeaderPay) {
        this.isClubSaveConfig = isSaveChoose || false;
        this.wanfaList = wanfaList;
        this.isLeaderPay = isLeaderPay || false;
        this._super("res/createRoomPDK.json");
    },

    saveConfig:function(){
        //cc.log("保存 跑得快选项...");
        if(this.renshu == 2){
            this.heitao3 = 0;
        }else{
            this.isDouble = 0;
        }
        cc.sys.localStorage.setItem("sy_pdk_wanfa",this.wanfa);
        cc.sys.localStorage.setItem("sy_pdk_jushu",this.jushu);
        cc.sys.localStorage.setItem("sy_pdk_heitao3",this.heitao3);
        cc.sys.localStorage.setItem("sy_pdk_renshu",this.renshu);
        cc.sys.localStorage.setItem("sy_pdk_showCardNumber",this.showCardNumber);
        cc.sys.localStorage.setItem("sy_pdk_costWay" , this.costWay);
        cc.sys.localStorage.setItem("sy_pdk_hongshi" , this.hongshi);
        cc.sys.localStorage.setItem("sy_pdk_boomwithcard" , this.openBoomWithCard)
        cc.sys.localStorage.setItem("sy_pdk_isFanZuoBi" , this.isFanZuoBi);
        cc.sys.localStorage.setItem("sy_pdk_threefj" , this.threeFj);
        cc.sys.localStorage.setItem("sy_pdk_autoPlay" , this.autoPlay);
        cc.sys.localStorage.setItem("sy_pdk_isDouble" , this.isDouble);
        cc.sys.localStorage.setItem("sy_pdk_dScore" , this.dScore);
        cc.sys.localStorage.setItem("sy_pdk_doubleNum" , this.doubleNum);
    },

    getWanfas:function(){
        var wanfas = [this.wanfa,this.costWay,this.jushu,this.renshu];
        return wanfas;
    },

    selfRender:function(){
        this.getWanfaRecord();

        this.niao = 0;
        this.leixing = 0;
        this.zhuang = 0;
        this.niaoPoint = 0;

        var btn = this.Button_17 = this.getWidget("Button_140");
        UITools.addClickEvent(btn,this,this.onDaiCreate);
        var btn = this.Button_17 = this.getWidget("Button_143");
        UITools.addClickEvent(btn,this,this.onDaiKaiList);


        //
        this.widget_fangfei = {"btn_fangfei_1":1,"btn_fangfei_2":2,"txt_fangfei_1":1,"txt_fangfei_2":2};
        this.getWidget("txt_fangfei_"+3).visible = this.getWidget("btn_fangfei_"+3).visible = false;
        if(this.isClubSaveConfig){
            this.widget_fangfei = {"btn_fangfei_1":1,"btn_fangfei_2":2,"btn_fangfei_3":3,"txt_fangfei_1":1,"txt_fangfei_2":2,"txt_fangfei_3":3};
            if (this.isLeaderPay){
                this.getWidget("txt_fangfei_3").x = this.getWidget("txt_fangfei_1").x;
                this.getWidget("btn_fangfei_3").x = this.getWidget("btn_fangfei_1").x;
                this.costWay = 3;
                this.getWidget("txt_fangfei_"+3).visible = this.getWidget("btn_fangfei_"+3).visible = true;
                for ( var i = 1;i <= 2;i++){
                    this.getWidget("txt_fangfei_"+i).visible = this.getWidget("btn_fangfei_"+i).visible = false;
                }
            }
        }

        this.addClickEvent(this.widget_fangfei , this.onFangfeiClick);
        this.displayFangfei();

        var widgets = {"btn_wanfa_1":1,"btn_wanfa_2":2,"txt_wanfa_1":1,"txt_wanfa_2":2};
        this.addClickEvent(widgets,this.onZhuangClick);
        this.displayZhuang();
        var widget_jushu = { "btn_jushu_1":1,"btn_jushu_2":2,"btn_jushu_3":3,"btn_jushu_4":4,
            "txt_jushu_1":1,"txt_jushu_2":2,"txt_jushu_3":3,"txt_jushu_4":4};
        this.addClickEvent(widget_jushu,this.onJushuClick);
        this.displayJushu();
        var widget_renshu = { "btn_renshu_1":1,"btn_renshu_2":2,"txt_renshu_1":1,"txt_renshu_2":2};
        this.addClickEvent(widget_renshu,this.onRenshuClick);
        this.displayRenshu();
        var widget_heitao3 = { "btn_kexuan_1":1,"txt_kexuan_1":1};
        this.addClickEvent(widget_heitao3,this.onHeitao3Click);
        this.displayHeitao3();
        var widget_showCardNumber = { "btn_kexuan_2":1,"txt_kexuan_2":1};
        this.addClickEvent(widget_showCardNumber,this.onShowCardNumberClick);
        this.displayShowCardNumber();
        var widget_boomwithcard = {"btn_kexuan_3":1,"txt_kexuan_3":1};
        this.addClickEvent(widget_boomwithcard , this.onBoomWithCard);
        var widget_boomwith2card = {"btn_kexuan_4":1,"txt_kexuan_4":1};
        this.addClickEvent(widget_boomwith2card , this.onBoomWith2Card);
        this.displayBoomWithCard();
        //是否三带飞机最后一手少带可接
        var widget_threefj = {"btn_kexuan_5":0,"txt_kexuan_5":0};
        this.addClickEvent(widget_threefj , this.onThreeFj);
        this.displayThreeFj();

        //跑得快红十
        var hs_Widgets = {"btn_hs_1":1,"btn_hs_2":2,"btn_hs_3":3,"txt_hs_1":1,"txt_hs_2":2,"txt_hs_3":3};
        this.addClickEvent(hs_Widgets , this.onHongShiClick);
        this.displayHongShi();

        var widgetTrust= {"Button_wf3":1,"Label_wf3":1};
        this.addClickEvent(widgetTrust , this.onTrustClick);
        this.displayTrust();


        var widgetDouble = { "Button_double1":1,"Button_double2":2,"Label_double1":1,"Label_double2":2};
        this.addClickEvent(widgetDouble,this.onDoubleClick);
        this.displayDouble();

        var widgetsTimes= {"btn_times1":1,"txt_times1":1,"btn_times2":2,"txt_times2":2,"btn_times3":3,"txt_times3":3};
        this.addClickEvent(widgetsTimes , this.onTimesClick);
        this.displayTimes();


        var widgetChange = { "Button_reduce":1,"Button_add":2};
        this.addClickEvent(widgetChange,this.onChangeScoreClick);
        this.displayChangeScore();


        if(SdkUtil.isYYBReview()){
            this.getWidget("Panel_FangFei").visible = false;
        }
    },

    dealExBtns:function(){
        this.getWidget("txt_kexuan_1").visible = this.getWidget("btn_kexuan_1").visible = (this.renshu==3);

        //cc.log("txt_kexuan_1",this.getWidget("btn_kexuan_1").y,this.getWidget("btn_kexuan_1").x);
        //cc.log("txt_kexuan_2",this.getWidget("btn_kexuan_2").y,this.getWidget("btn_kexuan_2").x);
        //cc.log("txt_kexuan_3",this.getWidget("btn_kexuan_3").y,this.getWidget("btn_kexuan_3").x);
        //cc.log("txt_kexuan_4",this.getWidget("btn_kexuan_4").y,this.getWidget("btn_kexuan_4").x);
        //cc.log("txt_kexuan_5",this.getWidget("btn_kexuan_5").y,this.getWidget("btn_kexuan_5").x);

        if(this.renshu == 2){ // temp==2 this.renshu == 2
            this.getWidget("Panel_double").visible = true;
            this.getWidget("Panel_times").visible = true;
            this.getWidget("Image_double").visible = true;

            if(!this.isDouble){
                this.getWidget("Image_double").visible = false;
                this.getWidget("Panel_times").visible =  false;
            }

//            this.getWidget("btn_kexuan_3").x = 469;
//            this.getWidget("btn_kexuan_2").x = 162;
        }else{
//            this.getWidget("btn_kexuan_3").x = 726;
//            this.getWidget("btn_kexuan_2").x = 469;

            this.getWidget("Panel_double").visible = false;
            this.getWidget("Panel_times").visible = false;
        }
    },

    getWanfaRecord:function(){
        if (this.isClubSaveConfig && this.wanfaList.length > 0){
            var wanfaList = [];
            for(var index = 0 ; index < this.wanfaList.length ; index++){
                wanfaList[index] = parseInt(this.wanfaList[index]);
            }
            //cc.log("pdk this.wanfaList::" , this.wanfaList);
            this.jushu = wanfaList[0] || 10;
            this.wanfa = wanfaList[1] || 16 ;
            this.renshu = wanfaList[7]  || 3;
            this.showCardNumber = wanfaList[8]  || 0;
            this.heitao3 = wanfaList[6] || 0;
            this.costWay = wanfaList[9];
            this.hongshi = wanfaList[10] || 0;
            this.openBoomWithCard = wanfaList[11] || 0;
            this.threeFj = wanfaList[12] == 0 ? 0 : 1;
            this.autoPlay = wanfaList[21] || 0;
            this.isDouble = wanfaList[22] || 0;
            this.dScore = parseInt(wanfaList[23]) || 20;
            this.doubleNum = wanfaList[24] || 2;
        }else{
            var costWay  = this.getLocalItem("sy_pdk_costWay") || 1;
            if (!this.isClubSaveConfig && costWay == 3 ){
                costWay = 1;

            }
            this.costWay = costWay;
            this.jushu = this.getLocalItem("sy_pdk_jushu") || 10;
            this.wanfa = this.getLocalItem("sy_pdk_wanfa") || 16 ;
            this.heitao3 = this.getLocalItem("sy_pdk_heitao3") || 0;
            this.renshu = this.getLocalItem("sy_pdk_renshu")  || 3;
            this.showCardNumber = this.getLocalItem("sy_pdk_showCardNumber")  || 0;
            this.hongshi = this.getLocalItem("sy_pdk_hongshi") || 0;
            this.openBoomWithCard = this.getLocalItem("sy_pdk_boomwithcard") || 0;
            this.isFanZuoBi = this.getLocalItem("sy_pdk_isFanZuoBi") || 0;
            this.threeFj = this.getLocalItem("sy_pdk_threefj") == 0 ? 0 : 1;
            this.autoPlay = this.getLocalItem("sy_pdk_autoPlay") || 0;
            this.isDouble = this.getLocalItem("sy_pdk_isDouble") || 0;
            this.dScore = this.getLocalItem("sy_pdk_dScore") || 20;
            this.doubleNum = this.getLocalItem("sy_pdk_doubleNum") || 2;
        }
    },

    displayHeitao3:function(){
        var btn = this["btn_kexuan_1"];
        btn.setBright(false);
        if(this.heitao3==1 && !btn.isBright())
            this.onHeitao3Click(btn);
    },

    onHeitao3Click:function(obj){
        var btn = this["btn_kexuan_1"];
        if(btn.isBright()) {
            btn.setBright(false);
            this["txt_kexuan_1"].setColor(cc.color("ffffff"));
            this.heitao3 = 0;
        } else {
            btn.setBright(true);
            this["txt_kexuan_1"].setColor(cc.color("d91010"));
            this.heitao3 = 1;
        }
    },

    /**
     * 四带三的处理
     */
    displayBoomWithCard:function(){
        cc.log("this.openBoomWithCard：：" , this.openBoomWithCard);
        var btn4d3 = this["btn_kexuan_3"];
        var btn4d2 = this["btn_kexuan_4"];
        btn4d3.setBright(false);
        btn4d2.setBright(false);
        if(this.openBoomWithCard == 3 && !btn4d3.isBright()){
            this.onBoomWithCard(btn4d3);
        }
        else if(this.openBoomWithCard == 2 && !btn4d2.isBright()){
            this.onBoomWith2Card(btn4d2);
        }
    },

    onBoomWithCard:function(obj){
        var btn = this["btn_kexuan_3"];
        if(btn.isBright()) {
            btn.setBright(false);
            this["txt_kexuan_3"].setColor(cc.color("ffffff"));
            this.openBoomWithCard = 0;
        } else {
            btn.setBright(true);
            this["txt_kexuan_3"].setColor(cc.color("d91010"));
            //和四带二互斥
            var btnOther = this["btn_kexuan_4"];
            if(btnOther.isBright()){
                this.onBoomWith2Card();
            }
            this.openBoomWithCard = 3;
        }
    },

    onBoomWith2Card:function(){
        var btn = this["btn_kexuan_4"];
        if(btn.isBright()) {
            btn.setBright(false);
            this["txt_kexuan_4"].setColor(cc.color("ffffff"));
            this.openBoomWithCard = 0;
        } else {
            btn.setBright(true);
            this["txt_kexuan_4"].setColor(cc.color("d91010"));
            //和四带三互斥
            var btnOther = this["btn_kexuan_3"];
            if(btnOther.isBright()){
                this.onBoomWithCard();
            }
            this.openBoomWithCard = 2;
        }
    },


    onThreeFj:function(obj){
        var btn = this["btn_kexuan_5"];
        if(btn.isBright()) {
            btn.setBright(false);
            this["txt_kexuan_5"].setColor(cc.color("ffffff"));
            this.threeFj = 1;
        } else {
            btn.setBright(true);
            this["txt_kexuan_5"].setColor(cc.color("d91010"));
            this.threeFj = 0;
        }
    },

    displayThreeFj:function(){
        var btn = this["btn_kexuan_5"];
        if(this.threeFj==0){
            btn.setBright(false);
        }else{
            btn.setBright(true);
        }
        this.onThreeFj(btn);
    },

    displayShowCardNumber:function(){
        var btn = this["btn_kexuan_2"];
        btn.setBright(false);
        if(this.showCardNumber==1 && !btn.isBright())
            this.onShowCardNumberClick(btn);
    },
    //跑得快红十
    onHongShiClick:function(obj){
        var temp = parseInt(obj.temp);
        var values = [1,2,3];
        for(var i = 1;i <= values.length; i++) {
            var btn = this["btn_hs_" + i];
            var label = this["txt_hs_" + i];
            if (temp == values[i-1]){
                if (btn.isBright()) {
                    btn.setBright(false);
                    this.hongshi = 0;
                    label.setColor(cc.color(cc.color("ffffff")));
                } else {
                    btn.setBright(true);
                    this.hongshi = values[i-1];
                    label.setColor(cc.color(cc.color("d91010")));
                }
            }else{
                label.setColor(cc.color(cc.color("ffffff")));
                btn.setBright(false);
            }
        }
        cc.log("this.hongshi"+this.hongshi);
    },

    displayHongShi:function(){
        var values = [1,2,3];
        cc.log("this.hongshi"+this.hongshi);
        for(var i = 1;i <= values.length; i++) {
            var btn = this["btn_hs_" + i];
            var label = this["txt_hs_" + i];
            if (this.hongshi == values[i-1]) {
                label.setColor(cc.color(cc.color("d91010")));
                btn.setBright(true);
            }else{
                label.setColor(cc.color(cc.color("ffffff")));
                btn.setBright(false);
            }
        }
    },

    onTrustClick:function(obj) {
        var temp = parseInt(obj.temp);
        var values = 0;
        var btn = this["Button_wf" + 3];
        var txt = this["Label_wf" + 3];
        if ( btn.isBright() ){
            btn.setBright(false);
            txt.setColor(cc.color(cc.color("ffffff")));
        }else{
            values = 1;
            btn.setBright(true);
            txt.setColor(cc.color(cc.color("d91010")));
        }
        this.autoPlay = values;
    },

    displayTrust:function(){
        //cc.log("this.chooseklz"+this.chooseklz);
        var btn = this["Button_wf" + 3];
        var txt = this["Label_wf" + 3];
        if (this.autoPlay == 1) {
            btn.setBright(true);
            txt.setColor(cc.color(cc.color("d91010")));
        }else{
            btn.setBright(false);
            txt.setColor(cc.color(cc.color("ffffff")));
        }
    },

    onDoubleClick:function(obj) {
        var temp = parseInt(obj.temp);
        var values = [0 , 1];
        for(var i=1;i <= values.length;i++){
            var btn = this["Button_double" + i];
            var txt = this["Label_double" + i];
            if(temp == i) {
                txt.setColor(cc.color(cc.color("d91010")));
                btn.setBright(true);
            }else{
                txt.setColor(cc.color(cc.color("ffffff")));
                btn.setBright(false);
            }
        }
        this.isDouble = values[temp-1];
        //cc.log("this.isDouble==="+this.isDouble)
        if (this.isDouble && parseInt(this.isDouble)  && this.renshu == 2){
            this.getWidget("Image_double").visible = true;
            this.getWidget("Panel_times").visible = true;
        }else{
            this.getWidget("Image_double").visible = false;
            this.getWidget("Panel_times").visible = false;
        }
    },

    displayDouble:function(){
        var values = [0 , 1];
        //cc.log("this.isDouble"+this.isDouble);
        for(var i = 1;i <= values.length; i++) {
            var btn = this["Button_double" + i];
            var txt = this["Label_double" + i];
            if (this.isDouble == values[i-1]) {
                txt.setColor(cc.color(cc.color("d91010")));
                btn.setBright(true);
            }else{
                txt.setColor(cc.color(cc.color("ffffff")));
                btn.setBright(false);
            }
        }
        if (this.isDouble && parseInt(this.isDouble) && this.renshu == 2){
            this.getWidget("Image_double").visible = true;
            this.getWidget("Panel_times").visible = true;
        }else{
            this.getWidget("Image_double").visible = false;
            this.getWidget("Panel_times").visible = false;
        }
    },

    onTimesClick:function(obj) {
        var temp = parseInt(obj.temp);
        var values = [2 , 3 , 4];
        for(var i=1;i <= values.length;i++){
            var btn = this["btn_times" + i];
            var txt = this["txt_times" + i];
            if(temp == i) {
                txt.setColor(cc.color(cc.color("d91010")));
                btn.setBright(true);
            }else{
                txt.setColor(cc.color(cc.color("ffffff")));
                btn.setBright(false);
            }
        }
        this.doubleNum = values[temp-1];
        //cc.log("this.doubleNum==="+this.doubleNum)
    },

    displayTimes:function(){
        var values = [2 , 3 , 4];
        //cc.log("this.limitScore"+this.limitScore);
        for(var i = 1;i <= values.length; i++) {
            var btn = this["btn_times" + i];
            var txt = this["txt_times" + i];
            if (this.doubleNum == values[i-1]) {
                txt.setColor(cc.color(cc.color("d91010")));
                btn.setBright(true);
            }else{
                txt.setColor(cc.color(cc.color("ffffff")));
                btn.setBright(false);
            }
        }
    },


    onChangeScoreClick:function(obj) {
        var temp = parseInt(obj.temp);
        var num = this.dScore;
        if (temp == 1){
            num = num - 10;
        }else{
            num = num + 10;
        }
        if (num && num >= 20 && num <= 50){
            this.dScore = num;
        }
        this.displayChangeScore();
    },

    displayChangeScore:function(){
        this.getWidget("Label_dScore").setString("小于"+ this.dScore + "分");
    },

    onShowCardNumberClick:function(obj){
        var btn = this["btn_kexuan_2"];
        if(btn.isBright()) {
            btn.setBright(false);
            this["txt_kexuan_2"].setColor(cc.color("ffffff"));
            this.showCardNumber = 0;
        } else {
            btn.setBright(true);
            this["txt_kexuan_2"].setColor(cc.color("d91010"));
            this.showCardNumber = 1;
        }
    },

    displayRenshu:function(){
        var values = [3,2];
        for(var i=1;i<=2;i++){
            var btn = this["btn_renshu_"+i];
            btn.setBright(false);
            if(this.renshu==values[i-1]&&!btn.isBright())
                this.onRenshuClick(btn);
        }
    },

    onRenshuClick:function(obj){
        var temp = parseInt(obj.temp);
        var values = [3,2];
        var lastRenshu = this.renshu;
        for(var i=1;i<=2;i++){
            if(i!=temp) {
                this["btn_renshu_" + i].setBright(false);
                this["txt_renshu_"+i].setColor(cc.color("ffffff"));
            }
        }
        var btn = this["btn_renshu_"+temp];
        btn.setBright(true);
        this["txt_renshu_"+temp].setColor(cc.color("d91010"));
        this.renshu = values[temp-1];
        this.getWidget("txt_kexuan_1").visible = this.getWidget("btn_kexuan_1").visible = (this.renshu==3);

        this.updateCostDiamond();
        this.dealExBtns();
    },

    displayJushu:function(){
        var values = [10,15,20,1];
        for(var i=1;i<=values.length;i++){
            var btn = this["btn_jushu_"+i];
            btn.setBright(false);
            if(this.jushu==values[i-1]&&!btn.isBright())
                this.onJushuClick(btn);
        }
    },

    onJushuClick:function(obj){
        var temp = parseInt(obj.temp);
        var values = [10,15,20,1];
        for(var i=1;i<=values.length;i++){
            if(i!=temp) {
                this["btn_jushu_" + i].setBright(false);
                this["txt_jushu_"+i].setColor(cc.color("ffffff"));
                //this.getWidget("Label_ff_"+i).setColor(cc.color("ffffff"));
            }
        }
        var btn = this["btn_jushu_"+temp];
        this["txt_jushu_"+temp].setColor(cc.color("d91010"));
        //this.getWidget("Label_ff_"+temp).setColor(cc.color("d91010"));
        btn.setBright(true);
        this.jushu = values[temp-1];
        this.updateCostDiamond();
    },

    //房主支付或者AA支付
    onFangfeiClick:function(obj){
        var temp = parseInt(obj.temp);
        var indexLength = 2;
        if(this.isClubSaveConfig){
            indexLength = 3;
        }

        for(var i = 1; i <= indexLength ; i ++){
            if(i != temp){
                this["btn_fangfei_"+i].setBright(false);
                this.getWidget("txt_fangfei_"+i).setColor(cc.color("ffffff"));
            }
        }
        var btn = this["btn_fangfei_" + temp];
        this.getWidget("txt_fangfei_" + temp).setColor(cc.color("d91010"));
        btn.setBright(true);
        this.costWay = obj.temp;
         this.updateCostDiamond();
    },

    onZhuangClick:function(obj){
        var temp = parseInt(obj.temp);
        var values = [16,15];
        for(var i=1;i<=2;i++){
            if(i!=temp) {
                this["btn_wanfa_" + i].setBright(false);
                this["txt_wanfa_"+i].setColor(cc.color("ffffff"));
            }
        }
        var btn = this["btn_wanfa_"+temp];
        this["txt_wanfa_"+temp].setColor(cc.color("d91010"));
        btn.setBright(true);
        this.wanfa = values[temp-1];
    },

    displayZhuang:function(){
        var values = [16,15];
        for(var i=1;i<=2;i++){
            var btn = this["btn_wanfa_"+i];
            btn.setBright(false);
            if(this.wanfa==values[i-1]&&!btn.isBright())
                this.onZhuangClick(btn);
        }
    },

    displayFangfei:function(){
        var values = [1 , 2 , 3];
        var btnNumber = 2;
        if(this.isClubSaveConfig){//俱乐部进入创建房间的逻辑
            btnNumber = 3
        }

        for(var i = 1 ; i <= btnNumber ; i ++){
            var btn = this["btn_fangfei_" + i];
            btn.setBright(false);
            if(this.costWay == values[i-1] && !btn.isBright())
                this.onFangfeiClick(btn);
        }
    },


    addClickEvent:function(widgets,selector){
        for(var key in widgets){
            var widget = this[key] = this.getWidget(key);
            if(!widget){
                //cc.log("1111");
            }else{
                widget.temp = parseInt(widgets[key]);
                UITools.addClickEvent(widget,this,selector);
            }
        }
    },

    getWidget:function(name){
        return ccui.helper.seekWidgetByName(this.root,name);
    },

    //刷新钻石的消耗显示
    updateCostDiamond:function(){
        var costlable = this.getWidget("txt_cost");
        var diamondFangzhu = 8;
        var diamondAA = 3;
        var diamondQunzhu = 8;
        if(this.jushu == 10){
            diamondFangzhu = 20;
            diamondAA = 10;
            diamondQunzhu = 20;
            if(this.renshu == 2){
                diamondFangzhu = 30;
                diamondQunzhu = 30;
                diamondAA = 15;
            }else if(this.renshu == 3){
                diamondFangzhu = 30;
                diamondQunzhu = 30;
                diamondAA = 10;
            }
        }else if(this.jushu == 15){
            diamondFangzhu = 60;
            diamondQunzhu = 60;
            diamondAA = 20;
            if(this.renshu == 2){
                diamondFangzhu = 45;
                diamondQunzhu = 45;
                diamondAA = 23;
            }else if(this.renshu == 3) {
                diamondFangzhu = 45;
                diamondQunzhu = 45;
                diamondAA = 15;
            }
        }else if(this.jushu == 20){
            diamondFangzhu = 60;
            diamondQunzhu = 60;
            diamondAA = 20;
            if(this.renshu == 2){
                diamondFangzhu = 60;
                diamondQunzhu = 60;
                diamondAA = 30;
            }else if(this.renshu == 3) {
                diamondFangzhu = 60;
                diamondQunzhu = 60;
                diamondAA = 20;
            }
        }else if(this.jushu == 1){
            diamondFangzhu = 6;
            diamondQunzhu = 6;
            diamondAA = 2;
            if(this.renshu == 2){
                diamondAA = 3;
            }
        }

        if (this.costWay == 1){
            costlable.setString(diamondAA + "/人")
        }else{
            costlable.setString("x" + diamondFangzhu)
        }

    },

    getLocalItem:function(key){
        var val = cc.sys.localStorage.getItem(key);
        if(val)
            val = parseInt(val);
        return val;
    },

    getWanfaList:function(idex){
        var wanfaList = [];
        if (this.renshu != 2){
            this.isDouble = 0;
        }
        wanfaList = [this.jushu,this.wanfa,this.niao,
            this.leixing,this.zhuang,this.niaoPoint,
            this.heitao3,this.renshu,this.showCardNumber,
            this.costWay,this.hongshi,this.openBoomWithCard,this.threeFj,
            0,0,0,0,0,0,0,0,this.autoPlay,this.isDouble,this.dScore,this.doubleNum];
        for(var index = 0 ; index < wanfaList.length ; index++){
            wanfaList[index] = parseInt(wanfaList[index]);
        }
        return wanfaList;
    }

});
