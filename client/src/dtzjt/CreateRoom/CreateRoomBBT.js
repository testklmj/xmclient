/**
 * Created by leiwenwen on 2019/5/24.
 */

var CreateRoomBBT = BasePopup.extend({
    ctor: function (isSaveChoose, wanfaList,isLeaderPay) {
        this.isClubSaveConfig = isSaveChoose || false;
        this.wanfaList = wanfaList;
        this.isLeaderPay = isLeaderPay || false;
        this._super("res/createRoomBBT.json");
    },

    selfRender:function(){
        //读取配置记录
        this.getWanfaRecord();

        //cc.log("this.jushu"+this.jushu);
        var btn = this.Button_17 = this.getWidget("Button_28");
        UITools.addClickEvent(btn,this,this.onDaikai);
        var btn = this.Button_18 = this.getWidget("Button_29");
        UITools.addClickEvent(btn,this,this.onYikai);

        //支付房费
        var widgetsCost = {"btn_cost_1":1,"btn_cost_2":2,"txt_cost_1":1,"txt_cost_2":2};
        this.getWidget("txt_cost_"+3).visible = this.getWidget("btn_cost_"+3).visible = false;
        if(this.isClubSaveConfig){
            widgetsCost = {"btn_cost_1":1,"btn_cost_2":2,"btn_cost_3":3,"txt_cost_1":1,"txt_cost_2":2,"txt_cost_3":3};
            if (this.isLeaderPay){
                this.getWidget("txt_cost_3").x = this.getWidget("txt_cost_1").x;
                this.getWidget("btn_cost_3").x = this.getWidget("btn_cost_1").x;
                this.getWidget("txt_cost_"+3).visible = this.getWidget("btn_cost_"+3).visible = true;
                this.bbt_fangfei = 3;
                for ( var i = 1;i <= 2;i++){
                    this.getWidget("txt_cost_"+i).visible = this.getWidget("btn_cost_"+i).visible = false;
                }
            }
        }

        this.costConfig = [1 , 2]; //AA 房主支付
        if(this.isClubSaveConfig){
            this.costConfig = [1 ,2 ,3];
        }

        this.addClickEvent(widgetsCost,this.onCostClick);
        this.displayCost();

        var widget_kechui = { "btn_kc":1,"txt_kc":1};
        this.addClickEvent(widget_kechui,this.onKechuiClick);
        this.displayKeChui();

        var widget_wushik = { "btn_wsk":1,"txt_wsk":1};
        this.addClickEvent(widget_wushik,this.onWushikClick);
        this.displayWushik();

        var widget_zhutu = { "btn_zt":1,"txt_zt":1};
        this.addClickEvent(widget_zhutu,this.onZhutuClick);
        this.displayZhutu();

        var widget_jushu = { "btn_js_1":1,"btn_js_2":2,"btn_js_3":3,"txt_js_1":1,"txt_js_2":2,"txt_js_3":3};
        this.addClickEvent(widget_jushu,this.onJushuClick);
        this.displayJushu();


        var widget_renshu = { "btn_renshu_1":1,"btn_renshu_2":2,"txt_renshu_1":1,"txt_renshu_2":2};
        this.addClickEvent(widget_renshu,this.onRenshuClick);
        this.displayRenshu();

        var widget_daidawang = { "btn_kexuan_3":1,"txt_kexuan_3":1};
        this.addClickEvent(widget_daidawang,this.onShowDaiDaWangClick);
        this.displayShowDaiDaWang();


//        this.getWidget("txt_js_2").setString("12局");

        var widget_showCardNumber = { "btn_kexuan_1":1,"txt_kexuan_1":1};
        this.addClickEvent(widget_showCardNumber,this.onShowCardNumberClick);
        this.displayShowCardNumber();

        var widget_foudaisan = { "btn_kexuan_2":1,"txt_kexuan_2":1};
        this.addClickEvent(widget_foudaisan,this.onShowFoudaisanClick);
        this.displayShowFourdaisan();

        var widgetTrust= {"btn_kexuan_4":1,"txt_kexuan_4":1};
        this.addClickEvent(widgetTrust , this.onTrustClick);
        this.displayTrust();

        //this.btn_kexuan_4.visible = this.txt_kexuan_4.visible = false;

    },

    getWanfaRecord:function(){
        cc.log("this.wanfaList..." , this.wanfaList);
        if (this.isClubSaveConfig && this.wanfaList.length > 0){
            cc.log("1111 读取传进来的配置");
            var wanfaList = this.wanfaList;
            //打筒子
            this.jushu = wanfaList[0];
            this.wanfa =  wanfaList[1];
            this.renshu =  wanfaList[7] || 3;
            this.bbt_kc = wanfaList[3];
            this.bbt_wsk = wanfaList[4];
            this.bbt_kt = wanfaList[5];
            this.bbt_fangfei = wanfaList[2];
            this.showCardNumber = wanfaList[6];
            this.isSidaisan = wanfaList[8];
            this.isDaidawang = wanfaList[9];
            this.autoPlay = wanfaList[10] || 0;

        }else{
            //打筒子
            //cc.log("2222 读取本地配置");
            var costWay  = this.getLocalItem("sy_bbt_fangfei") || 1;
            if (!this.isClubSaveConfig && costWay == 3 ){
                costWay = 1;
            }
            this.bbt_fangfei = costWay;
            this.jushu = this.getLocalItem("sy_bbt_jushu") || 8;
            this.wanfa =  131;
            this.renshu =  this.getLocalItem("sy_bbt_renshu") || 3;
            this.bbt_kc = this.getLocalItem("sy_bbt_kc") || 0;
            this.bbt_wsk = this.getLocalItem("sy_bbt_wsk") || 0;
            this.bbt_kt = this.getLocalItem("sy_bbt_kt") || 0;
            this.showCardNumber = this.getLocalItem("sy_bbt_showCardNumber")  || 0;
            this.isSidaisan = this.getLocalItem("sy_bbt_fourDaisan")  || 0;
            this.isFanZuoBi = this.getLocalItem("sy_bbt_isFanZuoBi") || 0;
            this.isDaidawang = this.getLocalItem("sy_bbt_isDaidawang") || 0;
            this.autoPlay = this.getLocalItem("sy_bbt_isDaidawang") || 0;
        }
    },

    getLocalItem:function(key){
        var val = cc.sys.localStorage.getItem(key);
        if(val)
            val = parseInt(val);
        return val;
    },

    getWanfas:function(){
        var wanfas = [this.wanfa,this.bbt_fangfei,this.jushu,this.renshu];
        return wanfas;
    },

    getWanfaList:function(idex){
        //this.saveConfig();
       var wanfaList = [];
       wanfaList = [this.jushu , this.wanfa , this.bbt_fangfei ,
            this.bbt_kc , this.bbt_wsk , this.bbt_kt ,
            this.showCardNumber, this.renshu, this.isSidaisan, this.isDaidawang,this.autoPlay
       ];

        for(var index = 0 ; index < wanfaList.length ; index++){
            wanfaList[index] = parseInt(wanfaList[index]);
        }
        return wanfaList;
    },

    saveConfig:function(){
        //cc.log("保存 半边天选项...");
        this.wanfa = 131;
        if (this.renshu == 2){
            this.bbt_kc = 0;
            this.bbt_kt = 0;
        }
        cc.sys.localStorage.setItem("sy_bbt_jushu" , this.jushu);
        cc.sys.localStorage.setItem("sy_bbt_kc",this.bbt_kc);
        cc.sys.localStorage.setItem("sy_bbt_wsk",this.bbt_wsk);
        cc.sys.localStorage.setItem("sy_bbt_kt" , this.bbt_kt);
        cc.sys.localStorage.setItem("sy_bbt_fangfei" , this.bbt_fangfei);
        cc.sys.localStorage.setItem("sy_bbt_showCardNumber" , this.showCardNumber);
        cc.sys.localStorage.setItem("sy_bbt_fourDaisan" , this.isSidaisan);
        cc.sys.localStorage.setItem("sy_bbt_isFanZuoBi" , this.isFanZuoBi);
        cc.sys.localStorage.setItem("sy_bbt_renshu" , this.renshu);
        cc.sys.localStorage.setItem("sy_bbt_isDaidawang" , this.isDaidawang);
        cc.sys.localStorage.setItem("sy_bbt_autoPlay" , this.autoPlay);
    },


    displayShowFourdaisan:function(){
        var btn = this["btn_kexuan_2"];
        btn.setBright(false);
        if(this.isSidaisan==1 && !btn.isBright())
            this.onShowFoudaisanClick(btn);
    },

    onShowFoudaisanClick:function(obj){
        var btn = this["btn_kexuan_2"];
        if(btn.isBright()) {
            btn.setBright(false);
            this["txt_kexuan_2"].setColor(cc.color("ffffff"));
            this.isSidaisan = 0;
        } else {
            btn.setBright(true);
            this["txt_kexuan_2"].setColor(cc.color("d91010"));
            this.isSidaisan = 1;
        }
    },

    onShowCardNumberClick:function(obj){
        var btn = this["btn_kexuan_1"];
        if(btn.isBright()) {
            btn.setBright(false);
            this["txt_kexuan_1"].setColor(cc.color("ffffff"));
            this.showCardNumber = 0;
        } else {
            btn.setBright(true);
            this["txt_kexuan_1"].setColor(cc.color("d91010"));
            this.showCardNumber = 1;
        }
    },

    displayShowCardNumber:function(){
        var btn = this["btn_kexuan_1"];
        btn.setBright(false);
        if(this.showCardNumber==1 && !btn.isBright())
            this.onShowCardNumberClick(btn);
    },

    displayWushik:function(){
        var btn = this["btn_wsk"];
        btn.setBright(false);
        if(this.bbt_wsk==1 && !btn.isBright())
            this.onWushikClick(btn);
    },

    onWushikClick:function(obj){
        var btn = this["btn_wsk"];
        if(btn.isBright()) {
            btn.setBright(false);
            this["txt_wsk"].setColor(cc.color("ffffff"));
            this.bbt_wsk = 0;
        } else {
            btn.setBright(true);
            this["txt_wsk"].setColor(cc.color("d91010"));
            this.bbt_wsk = 1;
        }
    },

    displayZhutu:function(){
        var btn = this["btn_zt"];
        btn.setBright(false);
        if(this.bbt_kt==1 && !btn.isBright())
            this.onZhutuClick(btn);
    },

    onZhutuClick:function(obj){
        var btn = this["btn_zt"];
        if(btn.isBright()) {
            btn.setBright(false);
            this["txt_zt"].setColor(cc.color("ffffff"));
            this.bbt_kt = 0;
        } else {
            btn.setBright(true);
            this["txt_zt"].setColor(cc.color("d91010"));
            this.bbt_kt = 1;
        }
    },

    displayKeChui:function(){
        var btn = this["btn_kc"];
        btn.setBright(false);
        if(this.bbt_kc==1 && !btn.isBright())
            this.onKechuiClick(btn);
    },

    onKechuiClick:function(obj){
        var btn = this["btn_kc"];
        if(btn.isBright()) {
            btn.setBright(false);
            this["txt_kc"].setColor(cc.color("ffffff"));
            this.bbt_kc = 0;
        } else {
            btn.setBright(true);
            this["txt_kc"].setColor(cc.color("d91010"));
            this.bbt_kc = 1;
        }
    },

    onDaikai:function(){
        this.isDaiKaiRoom = true;
        var self = this;
        AlertPop.show("代开房间将立即扣除房卡，且消耗不计入抽奖次数，房间24小时未使用将自动解散并退还房卡。确定要代开房间吗？",function(){
            sy.scene.showLoading("正在创建房间");
            self.isCreate=true;
            self.onSuc();
        });
        //FloatLabelUtil.comText("即将开放");
    },

    onYikai:function(){
        //FloatLabelUtil.comText("即将开放");
        Network.loginReq("qipai","exec",{actionType:6,funcType:1},function(data){
            if(data){
                dkRecordModel.init(data);
                var mc = new DaiKaiRoomPop();
                PopupManager.open(mc,false);
            }
        });
    },

    //刷新钻石消耗显示
    updateCost:function(){
        //刷新钻石显示
        var costlable = this.getWidget("txt_cost");
        var aaStr = "";
        var fzStr = "";
        if(this.jushu == 8) {
            aaStr = "15/人";
            fzStr = "x40";
        }else if(this.jushu == 1){
            var allNum = 6;
            var oneNum = Math.ceil(allNum/this.renshu);
            aaStr = oneNum + "/人";
            fzStr = "x" + allNum;
        }else{
            aaStr = "20/人";
            fzStr = "x" + 60;
        }

        if (this.bbt_fangfei == 1){
            costlable.setString("" + aaStr)
        }else{
            costlable.setString("" + fzStr)
        }
    },

    onCostClick:function(obj){
        var clickId = parseInt(obj.temp);
        cc.log("onCostClick..." , clickId);
        var values = this.costConfig;
        var indexLength = 2;
        if(this.isClubSaveConfig){
            indexLength = 3;
        }

        for(var i=1;i<=indexLength;i++){
            if(i != clickId){
                this["btn_cost_" + i].setBright(false);
                this["txt_cost_" + i].setColor(cc.color("ffffff"));
            }

        }
        var btn = this["btn_cost_" + clickId];
        var txt = this["txt_cost_" + clickId];
        txt.setColor(cc.color("d91010"));
        btn.setBright(true);
        this.bbt_fangfei = values[clickId - 1];
        this.updateCost();
    },

    displayCost:function(){
        cc.log("this.bbt_fangfei===",this.bbt_fangfei)
        var values = [1,2];
        if(this.isClubSaveConfig){
            values = [1,2,3];
        }
        for(var i=1;i<=values.length;i++){
            var btn = this["btn_cost_"+i];
            btn.setBright(false);
            if(this.bbt_fangfei==values[i-1]&&!btn.isBright())
                this.onCostClick(btn);
        }
    },

    displayJushu:function(){
        var values = [8,12,1];
        for(var i=1;i<=3;i++){
            var btn = this["btn_js_"+i];
            btn.setBright(false);
            if(this.jushu==values[i-1]&&!btn.isBright())
                this.onJushuClick(btn);
        }
    },

    onJushuClick:function(obj){
        var temp = parseInt(obj.temp);
        for(var i=1;i<=3;i++){
            if(i!=temp) {
                this["btn_js_" + i].setBright(false);
                this["txt_js_"+i].setColor(cc.color("ffffff"));
            }
        }
        var btn = this["btn_js_"+temp];
        this["txt_js_"+temp].setColor(cc.color("d91010"));
        btn.setBright(true);
        var values = [8,12,1];
        this.jushu = values[temp - 1];
        this.updateCost();
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
        for(var i=1;i<=2;i++){
            if(i!=temp) {
                this["btn_renshu_" + i].setBright(false);
                this["txt_renshu_"+i].setColor(cc.color("ffffff"));
            }
        }
        var btn = this["btn_renshu_"+temp];
        this["txt_renshu_"+temp].setColor(cc.color("d91010"));
        btn.setBright(true);
        this.renshu = values[temp-1];
        this.updateCost();
        if (this.renshu == 2){
            this.getWidget("btn_zt").visible = false;
            this.getWidget("btn_kc").visible = false;
            this.getWidget("btn_kexuan_3").visible = true;
        }else{
            this.getWidget("btn_zt").visible = true;
            this.getWidget("btn_kc").visible = true;
            this.getWidget("btn_kexuan_3").visible = false;
        }
    },


    displayShowDaiDaWang:function(){
        var btn = this["btn_kexuan_3"];
        btn.setBright(false);
        if(this.isDaidawang==1 && !btn.isBright())
            this.onShowDaiDaWangClick(btn);
    },

    onShowDaiDaWangClick:function(obj){
        var btn = this["btn_kexuan_3"];
        if(btn.isBright()) {
            this["txt_kexuan_3"].setColor(cc.color("ffffff"));
            btn.setBright(false);
            this.isDaidawang = 0;
        } else {
            this["txt_kexuan_3"].setColor(cc.color("d91010"));
            btn.setBright(true);
            this.isDaidawang = 1;
        }
    },


    onTrustClick:function(obj) {
        var temp = parseInt(obj.temp);
        var values = 0;
        var btn = this["btn_kexuan_" + 4];
        var txt = this["txt_kexuan_" + 4];
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
        var btn = this["btn_kexuan_" + 4];
        var txt = this["txt_kexuan_" + 4];
        if (this.autoPlay == 1) {
            btn.setBright(true);
            txt.setColor(cc.color(cc.color("d91010")));
        }else{
            btn.setBright(false);
            txt.setColor(cc.color(cc.color("ffffff")));
        }
    },


    addClickEvent:function(widgets,selector){
        for(var key in widgets){
            var widget = this[key] = this.getWidget(key);
            if(!widget){
                cc.log("1111");
            }else{
                widget.temp = parseInt(widgets[key]);
                UITools.addClickEvent(widget,this,selector);
            }
        }
    },

    getWidget:function(name){
        return ccui.helper.seekWidgetByName(this.root,name);
    }
});