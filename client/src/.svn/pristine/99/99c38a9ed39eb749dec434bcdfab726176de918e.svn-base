/**
 * Created by leiwenwen on 2019/5/24.
 */
var CreateRoomLDFPF = BasePopup.extend({
    ctor: function (isSaveChoose, wanfaList,isLeaderPay) {
        this.isClubSaveConfig = isSaveChoose || false;
        this.wanfaList = wanfaList;
        this.isLeaderPay = isLeaderPay || false;
        this._super("res/createRoomLDFPF.json");
    },

    selfRender:function(){
        this.getWanfaRecord();
        //if (this.newWanfa){
        //    this.wanfa = this.newWanfa;
        //}

        this.niao = 0;
        this.leixing = 0;
        this.zhuang = 0;
        this.niaoPoint = 0;

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

        var widget_renshu = { "btn_renshu_1":1,"btn_renshu_2":2,"btn_renshu_3":3,"txt_renshu_1":1,"txt_renshu_2":2,"txt_renshu_3":3};
        var widget_kexuan = { "btn_kexuan_1":1,"txt_kexuan_1":1 , "btn_kexuan_2":2,"txt_kexuan_2":2};
        var widget_choupai = { "btn_choupai_1":1,"btn_choupai_2":2,"btn_choupai_3":3,"txt_choupai_1":1,"txt_choupai_2":2,"txt_choupai_3":3};

        var widget_huxi = { "btn_huxi_1":1,"txt_huxi_1":1 , "btn_huxi_2":2,"txt_huxi_2":2, "btn_huxi_3":3,"txt_huxi_3":3};
        this.addClickEvent(widget_huxi,this.onHuxiClick);

        this.addClickEvent(this.widget_fangfei , this.onFangfeiClick);
        this.addClickEvent(widget_renshu,this.onRenshuClick);
        this.addClickEvent(widget_kexuan,this.onLimitScoreClick);
        this.addClickEvent(widget_choupai,this.onChouPaiClick);

        var widgetsHhd= {"btn_mingtang_1":1,"txt_mingtang_1":1};
        this.addClickEvent(widgetsHhd , this.onHhdClick);
        this.displayHhd();

        var widgetsKlz= {"btn_mingtang_2":1,"txt_mingtang_2":1};
        this.addClickEvent(widgetsKlz , this.onKlzClick);
        this.displayKlz();


        var widgetsfpbh = {"btn_mingtang_3":1,"txt_mingtang_3":1};
        this.addClickEvent(widgetsfpbh , this.onFpbhClick);
        this.displayFpbh();

        var widgetjushu = {"btn_mingtang_4":1,"txt_mingtang_4":1};
        this.addClickEvent(widgetjushu , this.onJushuClick);
        this.displayJushu();

        var widgetTrust= {"Button_wf3":1,"Label_wf3":1};
        this.addClickEvent(widgetTrust , this.onTrustClick);
        this.displayTrust();

        this.displayFangfei();
        this.displayRenshu();
        this.displayLimitScoreClick();
        this.displayHuxi();
        this.displayChouPai();

        var widgetDouble = { "Button_double1":1,"Button_double2":2,"Label_double1":1,"Label_double2":2};
        this.addClickEvent(widgetDouble,this.onDoubleClick);
        this.displayDouble();

        var widgetsTimes= {"btn_times1":1,"txt_times1":1,"btn_times2":2,"txt_times2":2,"btn_times3":3,"txt_times3":3,"Button_fengding4":4,"Label_fengding4":4};
        this.addClickEvent(widgetsTimes , this.onTimesClick);
        this.displayTimes();


        var widgetChange = { "Button_reduce":1,"Button_add":2};
        this.addClickEvent(widgetChange,this.onChangeScoreClick);
        this.displayChangeScore();


        var daikaiBtn = this.Button_17 = this.getWidget("Button_140");
        UITools.addClickEvent(daikaiBtn,this,this.onDaiCreate);
        var btn = this.Button_17 = this.getWidget("Button_143");
        UITools.addClickEvent(btn,this,this.onDaiKaiList);

        if(SdkUtil.isYYBReview()){
            this.getWidget("Panel_FangFei").visible = false;
        }
    },

    saveConfig:function(){
        //cc.log("保存 跑胡子选项...");
        cc.sys.localStorage.setItem("sy_phz_wanfa",this.wanfa);
        cc.sys.localStorage.setItem("sy_phz_jushu",this.jushu);
        cc.sys.localStorage.setItem("sy_phz_renshu",this.renshu);
        cc.sys.localStorage.setItem("sy_phz_heitao3",this.heitao3);
        cc.sys.localStorage.setItem("sy_phz_fengding",this.showCardNumber);
        cc.sys.localStorage.setItem("sy_phz_costWay" , this.costWay);
        cc.sys.localStorage.setItem("sy_phz_limitScoreLd" , this.limitScore);
        cc.sys.localStorage.setItem("sy_phz_choosehhd" , this.choosehhd);
        cc.sys.localStorage.setItem("sy_phz_chooseklz" , this.chooseklz);
        cc.sys.localStorage.setItem("sy_phz_choupai" , this.choupai);
        cc.sys.localStorage.setItem("sy_phz_autoPlay" , this.autoPlay);
        cc.sys.localStorage.setItem("sy_phz_isDouble" , this.isDouble);
        cc.sys.localStorage.setItem("sy_phz_dScore" , this.dScore);
        cc.sys.localStorage.setItem("sy_phz_doubleNum" , this.doubleNum);
        cc.sys.localStorage.setItem("sy_phz_hxqh" , this.hxqh);
        cc.sys.localStorage.setItem("sy_phz_randomZhuang" , this.randomZhuang);
        cc.sys.localStorage.setItem("sy_phz_ph" , this.chooseph);
        cc.sys.localStorage.setItem("sy_phz_yphh" , this.chooseYphh);

    },

    getWanfas:function(){
        var wanfas = [this.wanfa,this.costWay,this.jushu,this.renshu];
        return wanfas;
    },

    getLocalItem:function(key){
        var val = cc.sys.localStorage.getItem(key);
        if(val)
            val = parseInt(val);
        return val;
    },

    getWanfaRecord:function(){
        if (this.isClubSaveConfig && this.wanfaList.length > 0){
            var wanfaList = this.wanfaList;
            for(var index = 0 ; index < this.wanfaList.length ; index++){
                wanfaList[index] = parseInt(this.wanfaList[index]);
            }
            this.jushu = parseInt(wanfaList[0]) || 10;
            this.wanfa = parseInt(wanfaList[1]) || PHZGameTypeModel.LDFPF;
            this.renshu = parseInt(wanfaList[7]) || 3;
            this.showCardNumber = wanfaList[8] || 200;
            this.heitao3 = wanfaList[6] || 0;
            this.costWay = wanfaList[9] || 1;
            this.limitScore = parseInt(wanfaList[10]) || 200;
            if (wanfaList[10] == 0){
                this.limitScore = 0;
            }
            this.choosehhd = parseInt(wanfaList[11]) || 0;
            this.chooseklz = parseInt(wanfaList[12]) || 0;
            this.choupai = wanfaList[29] || 0;
            this.autoPlay = wanfaList[23] || 0;
            this.isDouble = parseInt(wanfaList[30]) || 0;
            this.dScore = parseInt(wanfaList[31]) || 20;
            this.doubleNum = wanfaList[32] || 2;
            this.hxqh = wanfaList[13] || 15;
            this.randomZhuang = wanfaList[27] || 0;
            this.chooseph = wanfaList[28] || 0;
            this.chooseYphh = wanfaList[33] || 0;
        }else{
            var costWay  = this.getLocalItem("sy_phz_costWay") || 1;
            if (!this.isClubSaveConfig && costWay == 3 ){
                costWay = 1;
            }
            this.costWay = costWay;
            this.jushu = this.getLocalItem("sy_phz_jushu") || 10;
            this.wanfa = PHZGameTypeModel.LDFPF;
            this.renshu = this.getLocalItem("sy_phz_renshu") || 3;
            this.showCardNumber = this.getLocalItem("sy_phz_fengding") || 200;
            this.heitao3 = this.getLocalItem("sy_phz_heitao3") || 0;
            //this.costWay = this.getLocalItem("sy_phz_costWay") || 1;
            this.limitScore = this.getLocalItem("sy_phz_limitScoreLd") || 200;
            this.choosehhd = this.getLocalItem("sy_phz_choosehhd") || 0;
            this.chooseklz = this.getLocalItem("sy_phz_chooseklz") || 0;
            this.choupai = this.getLocalItem("sy_phz_choupai") || 0;
            this.autoPlay = UITools.getLocalItem("sy_phz_autoPlay") || 0;
            this.isDouble = UITools.getLocalItem("sy_phz_isDouble") || 0;
            this.dScore = UITools.getLocalItem("sy_phz_dScore") || 20;
            this.doubleNum = UITools.getLocalItem("sy_phz_doubleNum") || 2;
            this.hxqh = UITools.getLocalItem("sy_phz_hxqh") || 15;
            this.randomZhuang = UITools.getLocalItem("sy_phz_randomZhuang") || 0;
            this.chooseph = UITools.getLocalItem("sy_phz_ph") || 0;
            this.chooseYphh = UITools.getLocalItem("sy_phz_yphh") || 0;
        }
    },

    showChoupaiPos:function(){
        //cc.log("Panel_mingtang",this.getWidget("Panel_mingtang").y);
        //cc.log("Panel_choupai",this.getWidget("Panel_choupai").y);
        //cc.log("Panel_kuxuan",this.getWidget("Panel_kuxuan").y);
        //cc.log("Panel_double",this.getWidget("Panel_double").y);
        //cc.log("Panel_times",this.getWidget("Panel_times").y);
        //cc.log("Panel_trust",this.getWidget("Panel_trust").y);
        //cc.log("Panel_huxi",this.getWidget("Panel_huxi").y);

        this.getWidget("Panel_double").visible = false;
        this.getWidget("Panel_times").visible = false;
        if (this.renshu == 2){
            this.getWidget("Panel_choupai").visible = true;
            this.getWidget("Panel_double").visible = true;
            if(this.isDouble){
                this.getWidget("Panel_times").visible =  true;
                this.getWidget("Image_double").visible = true;
            }
            this.getWidget("Panel_double").y = this.getWidget("Panel_choupai").y = this.getWidget("Panel_times").y = 0;
        }else{
            this.getWidget("Panel_double").visible = false;
            this.getWidget("Panel_choupai").visible = false;
            this.getWidget("Panel_double").y = this.getWidget("Panel_choupai").y = this.getWidget("Panel_times").y = 60;
        }
    },

    displayLimitScoreClick:function(){
        var values = [200 , 400];
        for(var i=1;i<=values.length;i++){
            var btn = this["btn_kexuan_"+i];
            btn.setBright(false);
            if(this.limitScore == values[i-1] && !btn.isBright())
                this.onLimitScoreClick(btn);
        }
    },

    onLimitScoreClick:function(obj){
        var limitScore = [200 , 400];
        var temp = parseInt(obj.temp);
        for(var i = 1; i <= limitScore.length ; i ++){
            if(i != temp){
                this["btn_kexuan_"+i].setBright(false);
                this.getWidget("txt_kexuan_"+i).setColor(cc.color("ffffff"));
            }
        }
        var btn = this["btn_kexuan_" + temp];
        this.getWidget("txt_kexuan_" + temp).setColor(cc.color("d91010"));
        btn.setBright(true);
        this.limitScore = limitScore[obj.temp - 1];
    },

    displayRenshu:function(){
        var values = [2,3,4];
        for(var i=1;i<=values.length;i++){
            var btn = this["btn_renshu_"+i];
            btn.setBright(false);
            if(this.renshu==values[i-1]&&!btn.isBright())
                this.onRenshuClick(btn);
        }
    },

    onRenshuClick:function(obj){
        var temp = parseInt(obj.temp);
        var values = [2,3,4];
        for(var i=1;i<=values.length;i++){
            if(i!=temp) {
                this["btn_renshu_" + i].setBright(false);
                this["txt_renshu_"+i].setColor(cc.color("ffffff"));
            }
        }
        var btn = this["btn_renshu_"+temp];
        btn.setBright(true);
        this["txt_renshu_"+temp].setColor(cc.color("d91010"));
        this.renshu = values[temp-1];
        this.showChoupaiPos();
        this.updateCostDiamond();

    },

    displayChouPai:function(){
        var values = [20,10,0];
        for(var i=1;i<=values.length;i++){
            var btn = this["btn_choupai_"+i];
            btn.setBright(false);
            if(this.choupai==values[i-1]&&!btn.isBright())
                this.onChouPaiClick(btn);
        }
    },


    displayHuxi:function(){
        var values = [6,10,15];
        for(var i=1;i<=values.length;i++){
            var btn = this["btn_huxi_"+i];
            btn.setBright(false);
            if(this.hxqh==values[i-1]&&!btn.isBright())
                this.onHuxiClick(btn);
        }
    },

    onHuxiClick:function(obj){
        var temp = parseInt(obj.temp);
        var values = [6,10,15];
        for(var i=1;i<=values.length;i++){
            if(i!=temp) {
                this["btn_huxi_" + i].setBright(false);
                this["txt_huxi_"+i].setColor(cc.color("ffffff"));
            }
        }
        var btn = this["btn_huxi_"+temp];
        btn.setBright(true);
        this["txt_huxi_"+temp].setColor(cc.color("d91010"));
        this.hxqh = values[temp-1];
    },

    onHhdClick:function(obj) {
        var temp = parseInt(obj.temp);
        var btn = this["btn_mingtang_" + 1];
        var txt = this["txt_mingtang_"+1];
        var values = 0;
        if ( btn.isBright() ){
            btn.setBright(false);
            txt.setColor(cc.color("ffffff"));
        }else{
            values = 1;
            txt.setColor(cc.color("d91010"));
            btn.setBright(true);
        }
        this.randomZhuang = values;
    },

    displayHhd:function(){
        var btn = this["btn_mingtang_" + 1];
        var txt = this["txt_mingtang_" + 1]
        if (this.randomZhuang == 1) {
            txt.setColor(cc.color("d91010"));
            btn.setBright(true);
        }else{
            txt.setColor(cc.color("ffffff"));
            btn.setBright(false);
        }
    },

    onKlzClick:function(obj) {
        var temp = parseInt(obj.temp);
        var values = 0;
        var txt = this["txt_mingtang_"+2];
        var btn = this["btn_mingtang_" + 2];
        if ( btn.isBright() ){
            txt.setColor(cc.color("ffffff"));
            btn.setBright(false);
        }else{
            values = 1;
            txt.setColor(cc.color("d91010"));
            btn.setBright(true);
        }
        this.chooseph = values;
        this.showChoupaiPos();
        //cc.log("this.chooseklz==="+this.chooseklz)
    },

    displayKlz:function(){
        //cc.log("this.chooseklz"+this.chooseklz);
        var btn = this["btn_mingtang_" + 2];
        var txt = this["txt_mingtang_"+2];
        if (this.chooseph == 1) {
            btn.setBright(true);
            txt.setColor(cc.color("d91010"));
        }else{
            txt.setColor(cc.color("ffffff"));
            btn.setBright(false);
        }
    },

    onFpbhClick:function(obj) {
        var temp = parseInt(obj.temp);
        var values = 0;
        var txt = this["txt_mingtang_"+ 3];
        var btn = this["btn_mingtang_" + 3];
        if ( btn.isBright() ){
            txt.setColor(cc.color("ffffff"));
            btn.setBright(false);
        }else{
            values = 1;
            txt.setColor(cc.color("d91010"));
            btn.setBright(true);
        }
        this.chooseYphh = values;
        this.showChoupaiPos();
        //cc.log("this.chooseklz==="+this.chooseklz)
    },

    displayFpbh:function(){
        //cc.log("this.chooseklz"+this.chooseklz);
        var btn = this["btn_mingtang_" + 3];
        var txt = this["txt_mingtang_"+3];
        if (this.chooseYphh == 1) {
            btn.setBright(true);
            txt.setColor(cc.color("d91010"));
        }else{
            txt.setColor(cc.color("ffffff"));
            btn.setBright(false);
        }
    },

    onJushuClick:function(obj) {
        var temp = parseInt(obj.temp);
        var values = 0;
        var txt = this["txt_mingtang_"+ 4];
        var btn = this["btn_mingtang_" + 4];
        if ( btn.isBright() ){
            txt.setColor(cc.color("ffffff"));
            btn.setBright(false);
        }else{
            values = 1;
            txt.setColor(cc.color("d91010"));
            btn.setBright(true);
        }
        this.jushu = values;
        //this.showChoupaiPos();
        this.updateCostDiamond();
        //cc.log("this.chooseklz==="+this.chooseklz)
    },

    displayJushu:function(){
        //cc.log("this.chooseklz"+this.chooseklz);
        var btn = this["btn_mingtang_" + 4];
        var txt = this["txt_mingtang_"+4];
        if (this.jushu == 1) {
            btn.setBright(true);
            txt.setColor(cc.color("d91010"));
        }else{
            txt.setColor(cc.color("ffffff"));
            btn.setBright(false);
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

    onChouPaiClick:function(obj){
        var temp = parseInt(obj.temp);
        var values = [20,10,0];
        for(var i=1;i<=values.length;i++){
            if(i!=temp) {
                this["btn_choupai_" + i].setBright(false);
                this["txt_choupai_"+i].setColor(cc.color("ffffff"));
                //this.getWidget("Label_ff_"+i).setColor(cc.color("ffffff"));
            }
        }
        var btn = this["btn_choupai_"+temp];
        this["txt_choupai_"+temp].setColor(cc.color("d91010"));
        //this.getWidget("Label_ff_"+temp).setColor(cc.color("d91010"));
        btn.setBright(true);
        this.choupai = values[temp-1];
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

    displayFangfei:function(){
        var values = [1 , 2 , 3];
        var indexLength = 2;
        if(this.isClubSaveConfig){
            indexLength = 3;
        }

        for(var i = 1 ; i <= indexLength ; i ++){
            cc.log("add!" + "btn_fangfei_" + i);
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
    updateCostDiamond: function () {
        var costlable = this.getWidget("txt_cost");
        var diamondFangzhu = 40;
        var diamondAA = 8;
        var diamondQunzhu = 40;

        if(this.renshu == 3){
            if(this.jushu == 1){
                diamondAA = 2;
                diamondFangzhu = 6;
                diamondQunzhu = 6;
            }else{
                diamondAA = 15;
                diamondFangzhu = 40;
                diamondQunzhu = 40;
            }
        }else if(this.renshu == 4){
            if(this.jushu == 1){
                diamondAA = 2;
                diamondFangzhu = 6;
                diamondQunzhu = 6;
            }else{
                diamondAA = 15;
                diamondFangzhu = 60;
                diamondQunzhu = 60;
            }
        }else if(this.renshu == 2){
            if(this.jushu == 1){
                diamondAA = 3;
                diamondFangzhu = 6;
                diamondQunzhu = 6;
            }else{
                diamondAA = 15;
                diamondFangzhu = 30;
                diamondQunzhu = 30;
            }
        }

        if (this.costWay == 1){
            costlable.setString(diamondAA + "/人")
        }else{
            costlable.setString("x" + diamondFangzhu)
        }
    },


    getWanfaList:function(idex){
        //this.saveConfig();
        var wanfaList = [];
        if(this.wanfa == PHZGameTypeModel.LDFPF){
            if(this.jushu != 1){//未勾选1局
                this.jushu = 10;//后台只配置了10
            }
        }
        if (this.renshu != 2){
            this.choupai = 0;
            this.isDouble = 0;
        }

        var localJushu = this.jushu == 1 ? 1 : 1000;

        wanfaList = [
            localJushu,//局数
            PHZGameTypeModel.LDFPF,//玩法ID
            0,0,0,0,0,
            this.renshu,//人数
            200,
            this.costWay,//支付方式
            this.limitScore,//单局封顶
            0,//红黑胡选项
            0,//可连庄
            this.hxqh,//胡息 13
            0,0,0,0,0,0,0,0,0,
            this.autoPlay,//可托管 23
            0,0,0,
            this.randomZhuang,//首局随机庄家 27
            this.chooseph,//飘胡 28
            this.choupai,//抽牌 29
            this.isDouble,//是否翻倍 30
            this.dScore,//翻倍上限 31
            this.doubleNum,//翻倍倍数 32
            this.chooseYphh//放炮必胡 33
        ];

        for(var index = 0 ; index < wanfaList.length ; index++){
            wanfaList[index] = parseInt(wanfaList[index]);
        }
        return wanfaList;
    }

});
