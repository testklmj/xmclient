/**
 * Created by leiwenwen on 2019/5/24.
 */
var CreateRoomPHZ = BasePopup.extend({
    ctor: function (isSaveChoose, wanfaList,isLeaderPay,newWanfa) {
        this.isClubSaveConfig = isSaveChoose || false;
        this.wanfaList = wanfaList;
        this.newWanfa = newWanfa;
        this.isLeaderPay = isLeaderPay || false;
        this._super("res/createRoomPHZ.json");
    },

    selfRender:function(){
        this.getWanfaRecord();
        if (this.newWanfa){
            this.wanfa = this.newWanfa;
        }

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
        this.getWidget("Panel_kuxuan").visible = false;

        this.Panel_huxi = this.getWidget("Panel_huxi");
        this.Panel_huxi.visible = false;


        var widget_jushu = { "btn_jushu_1":1,"btn_jushu_2":2,"btn_jushu_3":3,"btn_jushu_4":4,"txt_jushu_1":1,"txt_jushu_2":2,"txt_jushu_3":3,"txt_jushu_4":4};
        var widget_renshu = { "btn_renshu_1":1,"btn_renshu_2":2,"btn_renshu_3":3,"txt_renshu_1":1,"txt_renshu_2":2,"txt_renshu_3":3};
        var widget_kexuan = { "btn_kexuan_1":1,"txt_kexuan_1":1 , "btn_kexuan_2":2,"txt_kexuan_2":2 , "btn_kexuan_3":3,"txt_kexuan_3":3, "btn_kexuan_4":4,"txt_kexuan_4":4};
        var widget_choupai = { "btn_choupai_1":1,"btn_choupai_2":2,"btn_choupai_3":3,"txt_choupai_1":1,"txt_choupai_2":2,"txt_choupai_3":3};

        var widget_huxi = { "btn_huxi_1":1,"txt_huxi_1":1 , "btn_huxi_2":2,"txt_huxi_2":2};
        this.addClickEvent(widget_huxi,this.onHuxiClick);

        this.addClickEvent(this.widget_fangfei , this.onFangfeiClick);
        this.addClickEvent(widget_jushu,this.onJushuClick);
        this.addClickEvent(widget_renshu,this.onRenshuClick);
        this.addClickEvent(widget_kexuan,this.onLimitScoreClick);
        this.addClickEvent(widget_choupai,this.onChouPaiClick);

        var widgetsHhd= {"btn_mingtang_1":1,"txt_mingtang_1":1};
        this.addClickEvent(widgetsHhd , this.onHhdClick);
        this.displayHhd();

        var widgetsKlz= {"btn_mingtang_2":1,"txt_mingtang_2":1};
        this.addClickEvent(widgetsKlz , this.onKlzClick);
        this.displayKlz();

        var widgetTrust= {"Button_wf3":1,"Label_wf3":1};
        this.addClickEvent(widgetTrust , this.onTrustClick);
        this.displayTrust();

        var widgetJushu1 = {"Button_wf4":1,"Label_wf4":1};
        this.addClickEvent(widgetJushu1 , this.onJushu1Click);
        this.displayJushu1();

        this.displayFangfei();
        this.displayJushu();
        this.displayRenshu();
        this.displayLimitScoreClick();
        this.displayHuxi();
        this.displayZhuang();
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
            //this.getWidget("Panel_jushu").y += 70;
            //this.getWidget("Panel_kuxuan").y += 70;
            //this.getWidget("Panel_renshu").y += 70;
            //this.getWidget("Label_18").visible = false;
        }
    },

    onShow:function(temp){
        this.wanfa = PHZGameTypeModel.SYZP;
        if (temp == 4){
            this.wanfa = PHZGameTypeModel.SYBP;
        }
        this.displayZhuang();
    },

    saveConfig:function(){
        //cc.log("?????? ???????????????...");
        cc.sys.localStorage.setItem("sy_phz_wanfa",this.wanfa);
        cc.sys.localStorage.setItem("sy_phz_jushu",this.jushu);
        cc.sys.localStorage.setItem("sy_phz_renshu",this.renshu);
        cc.sys.localStorage.setItem("sy_phz_heitao3",this.heitao3);
        cc.sys.localStorage.setItem("sy_phz_fengding",this.showCardNumber);
        cc.sys.localStorage.setItem("sy_phz_costWay" , this.costWay);
        cc.sys.localStorage.setItem("sy_phz_limitScore" , this.limitScore);
        cc.sys.localStorage.setItem("sy_phz_hxwf",this.hxwf);
        cc.sys.localStorage.setItem("sy_phz_choosehhd" , this.choosehhd);
        cc.sys.localStorage.setItem("sy_phz_chooseklz" , this.chooseklz);
        cc.sys.localStorage.setItem("sy_phz_choupai" , this.choupai);
        cc.sys.localStorage.setItem("sy_phz_autoPlay" , this.autoPlay);
        cc.sys.localStorage.setItem("sy_phz_isDouble" , this.isDouble);
        cc.sys.localStorage.setItem("sy_phz_dScore" , this.dScore);
        cc.sys.localStorage.setItem("sy_phz_doubleNum" , this.doubleNum);
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
            this.wanfa = parseInt(wanfaList[1]) || PHZGameTypeModel.SYBP;
            this.renshu = parseInt(wanfaList[7]) || 3;
            this.showCardNumber = wanfaList[8] || 200;
            this.heitao3 = wanfaList[6] || 0;
            this.costWay = wanfaList[9] || 1;
            this.limitScore = parseInt(wanfaList[10]) || 150;
            if (wanfaList[10] == 0){
                this.limitScore = 0;
            }
            this.choosehhd = parseInt(wanfaList[11]) || 0;
            this.chooseklz = parseInt(wanfaList[12]) || 0;
            this.hxwf = wanfaList[13] || 3;
            this.choupai = wanfaList[14] || 0;
            this.autoPlay = wanfaList[23] || 0;
            this.isDouble = parseInt(wanfaList[24]) || 0;
            this.dScore = parseInt(wanfaList[25]) || 20;
            this.doubleNum = wanfaList[26] || 2;
        }else{
            var costWay  = this.getLocalItem("sy_phz_costWay") || 1;
            if (!this.isClubSaveConfig && costWay == 3 ){
                costWay = 1;
            }
            this.costWay = costWay;
            this.jushu = this.getLocalItem("sy_phz_jushu") || 10;
            this.wanfa = this.getLocalItem("sy_phz_wanfa") || PHZGameTypeModel.SYBP;
            this.renshu = this.getLocalItem("sy_phz_renshu") || 3;
            this.showCardNumber = this.getLocalItem("sy_phz_fengding") || 200;
            this.heitao3 = this.getLocalItem("sy_phz_heitao3") || 0;
            //this.costWay = this.getLocalItem("sy_phz_costWay") || 1;
            this.limitScore = this.getLocalItem("sy_phz_limitScore") || 0;
            this.hxwf = this.getLocalItem("sy_phz_hxwf") || 3;
            this.choosehhd = this.getLocalItem("sy_phz_choosehhd") || 0;
            this.chooseklz = this.getLocalItem("sy_phz_chooseklz") || 0;
            this.choupai = this.getLocalItem("sy_phz_choupai") || 0;
            this.autoPlay = UITools.getLocalItem("sy_phz_autoPlay") || 0;
            this.isDouble = UITools.getLocalItem("sy_phz_isDouble") || 0;
            this.dScore = UITools.getLocalItem("sy_phz_dScore") || 20;
            this.doubleNum = UITools.getLocalItem("sy_phz_doubleNum") || 2;
        }
    },

    displayZhuang:function(){
        if(this.wanfa == PHZGameTypeModel.SYBP) {
            this.Panel_huxi.visible = false;
            this.getWidget("Panel_mingtang").visible = true;
            this.getWidget("Panel_jushu").visible = false;
            this.getWidget("Panel_renshu").visible = true;
            this.getWidget("Panel_kuxuan").visible = true;
            this.displayKlz();
            this.getWidget("txt_jushu_1").setString("??????");
            this.getWidget("btn_jushu_1").setBright(true);
            this.getWidget("txt_jushu_2").visible = this.getWidget("btn_jushu_2").visible = false;
            this.getWidget("txt_jushu_3").visible = this.getWidget("btn_jushu_3").visible = false;
            this.getWidget("txt_renshu_3").visible = this.getWidget("btn_renshu_3").visible = true;
            this.getWidget("Button_wf4").visible = true;
            this.getWidget("Label_wf4").visible = true;
        }
        else if(this.wanfa == PHZGameTypeModel.SYZP){
            this.getWidget("Button_wf4").visible = false;
            this.getWidget("Label_wf4").visible = false;
            this.displayJushu();
            this.Panel_huxi.visible = true;
            this.getWidget("Panel_mingtang").visible = false;
            this.getWidget("Panel_jushu").visible = true;
            this.getWidget("txt_jushu_1").setString("1???");
            this.getWidget("txt_jushu_3").visible = this.getWidget("btn_jushu_3").visible = true;
            this.getWidget("txt_jushu_2").visible = this.getWidget("btn_jushu_2").visible = true;
            this.getWidget("txt_renshu_3").visible = this.getWidget("btn_renshu_3").visible = false;
            this.getWidget("Panel_renshu").visible = true;
            this.getWidget("Panel_kuxuan").visible = false;
        }
        this.showChoupaiPos();
        this.updateCostDiamond();
    },

    showChoupaiPos:function(){
        //cc.log("Panel_mingtang",this.getWidget("Panel_mingtang").y);
        //cc.log("Panel_choupai",this.getWidget("Panel_choupai").y);
        //cc.log("Panel_kuxuan",this.getWidget("Panel_kuxuan").y);
        //cc.log("Panel_double",this.getWidget("Panel_double").y);
        //cc.log("Panel_times",this.getWidget("Panel_times").y);
        //cc.log("Panel_trust",this.getWidget("Panel_trust").y);
        //cc.log("Panel_huxi",this.getWidget("Panel_huxi").y);
        if (this.renshu == 2){
            this.getWidget("Panel_double").visible = true;
            this.getWidget("Panel_times").visible = true;
            this.getWidget("Image_double").visible = true;
            this.getWidget("Panel_choupai").visible = true;
            this.getWidget("Panel_mingtang").y = 98;
            this.getWidget("Panel_trust").y = 100;
            this.getWidget("Panel_choupai").y = 45;
            this.getWidget("Panel_kuxuan").y = 90;
            this.getWidget("Panel_double").y = 80;
            this.getWidget("Panel_times").y = 80;
            if (!this.chooseklz){
                this.getWidget("Panel_double").y = 140;
                this.getWidget("Panel_times").y = 140;
            }
            if(this.wanfa == PHZGameTypeModel.SYZP){
                this.getWidget("Panel_choupai").y = -12;
                this.getWidget("Panel_trust").y = 48;
                this.getWidget("Panel_huxi").y = -15;
                this.getWidget("Panel_double").y = 97;
                this.getWidget("Panel_times").y = 97;
            }

            if(!this.isDouble){
                this.getWidget("Panel_times").visible =  false;
                this.getWidget("Image_double").visible = false;
            }

        }else{
            this.getWidget("Panel_double").visible = false;
            this.getWidget("Panel_times").visible = false;
            this.getWidget("Panel_choupai").visible = false;
            this.getWidget("Panel_mingtang").y = 152;
            this.getWidget("Panel_trust").y = 156;
            this.getWidget("Panel_kuxuan").y = 140;
            if(this.wanfa == PHZGameTypeModel.SYZP){
                this.getWidget("Panel_trust").y = 104;
                this.getWidget("Panel_huxi").y = 38;
            }
        }

        //this.getWidget("Panel_double").visible = false;
        //this.getWidget("Panel_times").visible = false;
        //this.getWidget("Button_wf3").visible = false;
        //this.getWidget("Label_wf3").visible = false;
    },

    displayLimitScoreClick:function(){
        var values = [0 , 150 , 200 , 300];
        for(var i=1;i<=values.length;i++){
            var btn = this["btn_kexuan_"+i];
            btn.setBright(false);
            if(this.limitScore == values[i-1] && !btn.isBright())
                this.onLimitScoreClick(btn);
        }
    },

    onLimitScoreClick:function(obj){
        var limitScore = [0 , 150 , 200,300];
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

    displayJushu:function(){
        var values = [1,5,10,20];
        for(var i=1;i<=values.length;i++){
            var btn = this["btn_jushu_"+i];
            btn.setBright(false);
            if(this.jushu==values[i-1]&&!btn.isBright())
                this.onJushuClick(btn);
        }
    },

    onJushuClick:function(obj){
        var temp = parseInt(obj.temp);
        var values = [1,5,10,20];
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

    displayHuxi:function(){
        var values = [5,3];
        for(var i=1;i<=values.length;i++){
            var btn = this["btn_huxi_"+i];
            btn.setBright(false);
            if(this.hxwf==values[i-1]&&!btn.isBright())
                this.onHuxiClick(btn);
        }
        cc.log("this.hxwf=="+this.hxwf);
    },

    onHuxiClick:function(obj){
        var temp = parseInt(obj.temp);
        var values = [5,3];
        for(var i=1;i<=2;i++){
            if(i!=temp) {
                this["btn_huxi_" + i].setBright(false);
                this["txt_huxi_"+i].setColor(cc.color("ffffff"));
            }
        }
        var btn = this["btn_huxi_"+temp];
        btn.setBright(true);
        this["txt_huxi_"+temp].setColor(cc.color("d91010"));
        this.hxwf = values[temp-1];
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
        this.choosehhd = values;
        cc.log("this.choosehhd==="+this.choosehhd)
    },

    displayHhd:function(){
        cc.log("this.choosehhd"+this.choosehhd);
        var btn = this["btn_mingtang_" + 1];
        var txt = this["txt_mingtang_"+1]
        if (this.choosehhd == 1) {
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
            this.getWidget("Panel_kuxuan").visible = false;
            txt.setColor(cc.color("ffffff"));
            btn.setBright(false);
        }else{
            values = 1;
            txt.setColor(cc.color("d91010"));
            this.getWidget("Panel_kuxuan").visible = true;
            btn.setBright(true);
        }
        this.chooseklz = values;
        this.showChoupaiPos();
        //cc.log("this.chooseklz==="+this.chooseklz)
    },

    displayKlz:function(){
        //cc.log("this.chooseklz"+this.chooseklz);
        var btn = this["btn_mingtang_" + 2];
        var txt = this["txt_mingtang_"+2];
        if (this.chooseklz == 1) {
            btn.setBright(true);
            txt.setColor(cc.color("d91010"));
            this.getWidget("Panel_kuxuan").visible = true;
        }else{
            txt.setColor(cc.color("ffffff"));
            this.getWidget("Panel_kuxuan").visible = false;
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

    onJushu1Click:function(obj) {
        var temp = parseInt(obj.temp);
        var values = 0;
        var btn = this["Button_wf" + 4];
        var txt = this["Label_wf" + 4];
        if ( btn.isBright() ){
            btn.setBright(false);
            txt.setColor(cc.color(cc.color("ffffff")));
        }else{
            values = 1;
            btn.setBright(true);
            txt.setColor(cc.color(cc.color("d91010")));
        }
        this.jushu = values;
        this.updateCostDiamond();
    },

    displayJushu1:function(){
        //cc.log("this.chooseklz"+this.chooseklz);
        var btn = this["Button_wf" + 4];
        var txt = this["Label_wf" + 4];
        if (this.jushu == 1) {
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
        this.getWidget("Label_dScore").setString("??????"+ this.dScore + "???");
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

    //??????????????????AA??????
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
        this.getWidget("txt_fangfei_" + temp).setColor(cc.color("d91010"));;
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

    //???????????????????????????
    updateCostDiamond:function(){

        var diamondFangzhu = 40;
        var diamondAA = 8;
        var diamondQunzhu = 40;

        if(this.wanfa == PHZGameTypeModel.SYBP){//??????
            //cc.log("this.renshu..." , this.renshu);
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
        }else if (this.wanfa == PHZGameTypeModel.SYZP){//??????
            if(this.jushu == 10){
                diamondAA = 8;
                diamondFangzhu = 20;
                diamondQunzhu = 20;
                if(this.renshu == 2){
                    diamondFangzhu = 15;
                    diamondQunzhu = 15;
                }
            }else if(this.jushu == 20){
                diamondAA = 15;
                diamondFangzhu = 40;
                diamondQunzhu = 40;
                if(this.renshu == 2){
                    diamondFangzhu = 30;
                    diamondQunzhu = 30;
                }
            }else if(this.jushu == 5){
                diamondAA = 4;
                diamondFangzhu = 10;
                diamondQunzhu = 10;
                if(this.renshu == 2){
                    diamondFangzhu = 8;
                    diamondQunzhu = 8;
                }
            }else if(this.jushu == 1){
                diamondAA = 2;
                diamondFangzhu = 6;
                diamondQunzhu = 6;
                if(this.renshu == 2){
                    diamondAA = 3;
                }
            }
        }
        var costlable = this.getWidget("txt_cost");
        if (this.costWay == 1){
            costlable.setString(diamondAA + "/???")
        }else{
            costlable.setString("x" + diamondFangzhu)
        }
    },

    getWanfaList:function(idex){
        //this.saveConfig();
        var wanfaList = [];
        if(this.wanfa == PHZGameTypeModel.SYBP){
            if(this.jushu != 1){
                this.jushu = 10;//??????????????????10
            }
        }
        if (this.renshu != 2){
            this.choupai = 0;
            this.isDouble = 0;
        }
        if (this.wanfa == PHZGameTypeModel.SYZP && this.renshu == 4){
            this.renshu = 3;
        }
        wanfaList = [this.jushu,this.wanfa,this.niao,this.leixing,this.zhuang,this.niaoPoint,
            this.heitao3,this.renshu,this.showCardNumber,this.costWay , this.limitScore,
            this.choosehhd,this.chooseklz,this.hxwf,this.choupai,
            0,0,0,0,0,0,0,0,this.autoPlay,this.isDouble,this.dScore,this.doubleNum];
        for(var index = 0 ; index < wanfaList.length ; index++){
            wanfaList[index] = parseInt(wanfaList[index]);
        }
        return wanfaList;
    }

});

