/**
 * Created by leiwenwen on 2019/5/24.
 */
var CreateRoomSYMJ = BasePopup.extend({
    ctor: function (isSaveChoose, wanfaList,isLeaderPay) {
        this.isClubSaveConfig = isSaveChoose || false;
        this.wanfaList = wanfaList;
        this.isLeaderPay = isLeaderPay || false;
        this._super("res/createRoomSYMJ.json");
    },

    saveConfig:function(){

        cc.sys.localStorage.setItem("sy_symj_costWay", this.syCostWay);
        cc.sys.localStorage.setItem("sy_symj_jushu", this.syJushu);
        cc.sys.localStorage.setItem("sy_symj_khqd", this.syKhqd);
        cc.sys.localStorage.setItem("sy_symj_renshu", this.syRenshu);
        cc.sys.localStorage.setItem("sy_symj_niao", this.syNiao);
        cc.sys.localStorage.setItem("sy_symj_qghbsj", this.syQghbsj);
        cc.sys.localStorage.setItem("sy_symj_tuoguan", this.syTuoguan);
        cc.sys.localStorage.setItem("sy_symj_isDouble", this.syIsDouble);
        cc.sys.localStorage.setItem("sy_symj_dScore", this.syDScore);
        cc.sys.localStorage.setItem("sy_symj_doubleNum", this.syDoubleNum);
        cc.sys.localStorage.setItem("sy_symj_wind", this.syWind);
        cc.sys.localStorage.setItem("sy_symj_eat", this.syEat);
        cc.sys.localStorage.setItem("sy_symj_mydouble", this.syMyDouble);
        cc.sys.localStorage.setItem("sy_symj_kqggh", this.syKqggh);
        cc.sys.localStorage.setItem("sy_symj_szxniao", this.sySzxNiao);
        cc.sys.localStorage.setItem("sy_symj_khfgh", this.syKhfgh);
        cc.sys.localStorage.setItem("sy_symj_dgljf", this.syDgljf);
        cc.sys.localStorage.setItem("sy_symj_dggkcb", this.syDggkcb);
        cc.sys.localStorage.setItem("sy_symj_ghpljf", this.syGhpljf);
        cc.sys.localStorage.setItem("sy_symj_qghszm", this.syQghszm);
    },

    getWanfas:function(){
        var wanfas = [MJWanfaType.SYMJ,this.syCostWay,this.syJushu,this.syRenshu];
        return wanfas;
    },

    selfRender:function(){
        this.getWanfaRecord();


        this.Panel_double = this.getWidget("Panel_double");
        this.Panel_times = this.getWidget("Panel_times");

        var btn = this.Button_17 = this.getWidget("Button_140");
        UITools.addClickEvent(btn,this,this.onDaiCreate);
        var btn = this.Button_17 = this.getWidget("Button_143");
        UITools.addClickEvent(btn,this,this.onDaiKaiList);


        this.widget_fangfei = {"btn_fangfei_1":1,"btn_fangfei_2":2,"btn_fangfei_3":3,"txt_fangfei_1":1,"txt_fangfei_2":2,"txt_fangfei_3":3};
        this.getWidget("txt_fangfei_"+3).visible = this.getWidget("btn_fangfei_"+3).visible = false;
        if(this.isClubSaveConfig){
            if (this.isLeaderPay){
                this.getWidget("txt_fangfei_3").x = this.getWidget("txt_fangfei_1").x;
                this.getWidget("btn_fangfei_3").x = this.getWidget("btn_fangfei_1").x;
                this.getWidget("txt_fangfei_"+3).visible = this.getWidget("btn_fangfei_"+3).visible = true;
                this.syCostWay = 3;
                for ( var i = 1;i <= 2;i++){
                    this.getWidget("txt_fangfei_"+i).visible = this.getWidget("btn_fangfei_"+i).visible = false;
                }
            }
        }

        this.addClickEvent(this.widget_fangfei , this.onCostWayClick);
        this.displayCostWay();

        //??????
        var widget_jushu = { "btn_jushu_1":1,"btn_jushu_2":2,"txt_jushu_1":1,"txt_jushu_2":2,
            "btn_jushu_3":3,"txt_jushu_3":3,"btn_jushu_4":4,"txt_jushu_4":4};
        this.addClickEvent(widget_jushu,this.onJushuClick);
        this.displayJushu();

        //??????
        var widget_renshu = { "btn_renshu_1":1,"btn_renshu_2":2,"txt_renshu_1":1,"txt_renshu_2":2,"btn_renshu_3":3,"txt_renshu_3":3};
        this.addClickEvent(widget_renshu,this.onRenshuClick);
        this.displayRenshu();


        //??????
        var widget_niao = {"btn_niao_1":1,"btn_niao_2":2,"btn_niao_3":3,"btn_niao_4":4,
            "txt_niao_1":1,"txt_niao_2":2,"txt_niao_3":3,"txt_niao_4":4};
        this.addClickEvent(widget_niao , this.onNiaoClick);
        this.displayNiao();

        //??????????????????
        var widgetszxNiao = {"btn_niao_5" : 1, "txt_niao_5" : 1};
        this.addClickEvent(widgetszxNiao , this.onSzxNiaoClick);
        this.displaySzxNiao();

        this.btn_niao_5.visible = this.txt_niao_5.visible = false;



        //????????????
        var widgetWind = {"btn_kexuan_1" : 1, "txt_kexuan_1" : 1};
        this.addClickEvent(widgetWind , this.onWindClick);
        this.displayWind();

        //????????????
        var widgetMyDouble = {"btn_kexuan_2" : 1, "txt_kexuan_2" : 1};
        this.addClickEvent(widgetMyDouble , this.onMyDoubleClick);
        this.displayMyDouble();

        //???????????????
        var widgetEat = {"btn_kexuan_3" : 1, "txt_kexuan_3" : 1};
        this.addClickEvent(widgetEat , this.onEatClick);
        this.displayEat();

        //?????????????????????
        var widgetSoncolorousEat = {"btn_kexuan_4" : 1, "txt_kexuan_4" : 1};
        this.addClickEvent(widgetSoncolorousEat , this.onColorEatClick);
        this.displayColorEat();

        //?????????????????????
        var widgetDgljf = {"btn_kexuan_5" : 1, "txt_kexuan_5" : 1};
        this.addClickEvent(widgetDgljf , this.onDgljfClick);
        this.displayDgljf();

        //????????????????????????
        var widgetKqggh = {"btn_kexuan_6" : 1, "txt_kexuan_6" : 1};
        this.addClickEvent(widgetKqggh , this.onKqgghClick);
        this.displayKqggh();

        //?????????????????????
        var widgetKhfgh = {"btn_kexuan_7" : 1, "txt_kexuan_7" : 1};
        this.addClickEvent(widgetKhfgh , this.onKhfghClick);
        this.displayKhfgh();

        //?????????????????????
        var widgetQghcb = {"btn_kexuan_8" : 1, "txt_kexuan_8" : 1};
        this.addClickEvent(widgetQghcb , this.onQghcbClick);
        this.displayQghcb();

        //????????????????????????
        var widgetDggkcb = {"btn_kexuan_9" : 1, "txt_kexuan_9" : 1};
        this.addClickEvent(widgetDggkcb , this.onDggkcbClick);
        this.displayDggkcb();

        //????????????????????????
        var widgetGhpljf = {"btn_kexuan_10" : 1, "txt_kexuan_10" : 1};
        this.addClickEvent(widgetGhpljf , this.onGhpljfClick);
        this.displayGhpljf();

        //????????????
        var widgetTuoguan = {"btn_kexuan_11" : 1, "txt_kexuan_11" : 1};
        this.addClickEvent(widgetTuoguan , this.onTuoguanClick);
        this.displayTuoguan();

        //????????????????????????
        var widgetQghszm = {"btn_kexuan_12" : 1, "txt_kexuan_12" : 1};
        this.addClickEvent(widgetQghszm , this.onQghszmClick);
        this.displayQghszm();

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

    getWanfaRecord:function(){
        if (this.isClubSaveConfig && this.wanfaList.length > 0){
            var wanfaList = [];
            for(var index = 0 ; index < this.wanfaList.length ; index++){
                wanfaList[index] = parseInt(this.wanfaList[index]);
            }
            var costWay  = wanfaList[2] || 1;
            this.syCostWay = costWay;
            this.syJushu = wanfaList[0] || 8;
            this.syRenshu = wanfaList[7] || 4;
            this.syWind = wanfaList[3] || 0;
            this.syEat = wanfaList[4] || 0;
            this.syNiao = wanfaList[5] || 0;
            this.syMyDouble = wanfaList[6] || 0;
            this.syTuoguan = wanfaList[8] || 0;
            this.syKqggh = wanfaList[9] || 0;
            this.syQghbsj = wanfaList[10] || 0;
            this.sySzxNiao = wanfaList[11] || 0;
            this.syKhfgh = wanfaList[12] || 0;
            this.syDgljf = wanfaList[13] || 0;
            this.syDggkcb = wanfaList[14] || 0;
            this.syGhpljf = wanfaList[15] || 0;
            this.syQghszm = wanfaList[16] || 0;
        }else{
            var costWay  = this.getLocalItem("sy_symj_costWay") || 1;
            this.syCostWay = costWay;
            this.syJushu = this.getLocalItem("sy_symj_jushu") || 8;
            this.syRenshu = this.getLocalItem("sy_symj_renshu") || 4;
            this.syNiao = this.getLocalItem("sy_symj_niao") || 0;
            this.syTuoguan = this.getLocalItem("sy_symj_tuoguan") || 0;
            this.syIsDouble = this.getLocalItem("sy_symj_isDouble") || 0;
            this.syDScore = this.getLocalItem("sy_symj_dScore") || 5;
            this.syDoubleNum = this.getLocalItem("sy_symj_doubleNum") || 2;
            this.syWind = this.getLocalItem("sy_symj_wind") || 0;
            this.syEat = this.getLocalItem("sy_symj_eat") || 0;
            this.syMyDouble = this.getLocalItem("sy_symj_mydouble") || 0;
            this.syKqggh = this.getLocalItem("sy_symj_kqggh") || 0;
            this.syQghbsj = this.getLocalItem("sy_symj_qghbsj") || 0;
            this.sySzxNiao = this.getLocalItem("sy_symj_szxniao") || 0;
            this.syKhfgh = this.getLocalItem("sy_symj_khfgh") || 0;
            this.syDgljf = this.getLocalItem("sy_symj_dgljf") || 0;
            this.syDggkcb = this.getLocalItem("sy_symj_dggkcb") || 0;
            this.syGhpljf = this.getLocalItem("sy_symj_ghpljf") || 0;
            this.syQghszm = this.getLocalItem("sy_symj_qghszm") || 0;

        }
    },

    //??????????????????AA??????
    onCostWayClick:function(obj){
        var temp = parseInt(obj.temp);
        var values = [1 , 2 ,3];
        for(var i = 1; i <= values.length; i ++){
            if(i != temp){
                this["btn_fangfei_"+i].setBright(false);
                this.getWidget("txt_fangfei_"+i).setColor(cc.color("ffffff"));
            }
        }
        var btn = this["btn_fangfei_" + temp];
        this.getWidget("txt_fangfei_" + temp).setColor(cc.color("d91010"));
        btn.setBright(true);

        this.syCostWay = obj.temp;
         this.updateCostDiamond();

    },

    displayCostWay:function(){
        var values = [1 , 2 ,3];
        for(var i = 1 ; i <= values.length; i ++){
            var btn = this["btn_fangfei_" + i];
            btn.setBright(false);
            if(this.syCostWay == values[i-1] && !btn.isBright())
                this.onCostWayClick(btn);
        }
    },

    onSzxNiaoClick:function(){
        var btn = this.getWidget("btn_niao_5");
        var txt = this.getWidget("txt_niao_5");
        this.sySzxNiao = 1;
        txt.setColor(cc.color("d91010"));
        btn.setBright(true);
        this.syNiao = 0;
        for(var i = 1 ; i <= 4; i ++){
            this.getWidget("btn_niao_" + i).setBright(false);
            this.getWidget("txt_niao_"+i).setColor(cc.color("ffffff"));
        }
        this.displayNiaoWay();
    },

    displaySzxNiao:function(){
        var btn = this.getWidget("btn_niao_5");
        var txt = this.getWidget("txt_niao_5");
        if(this.sySzxNiao){
            this.sySzxNiao = 1;
            this.syNiao = 0;
            for(var i = 1 ; i <= 4; i ++){
                this.getWidget("btn_niao_" + i).setBright(false);
                this.getWidget("txt_niao_"+i).setColor(cc.color("ffffff"));
            }
            this.displayNiaoWay();
            txt.setColor(cc.color("d91010"));
            btn.setBright(true);
        }else{
            this.sySzxNiao = 0;
            txt.setColor(cc.color("ffffff"));
            btn.setBright(false);
        }
    },

    onNiaoClick:function(obj){
        var temp = parseInt(obj.temp);
        var values = [0,2,4,6];
        for(var i = 1; i <= values.length; i ++){
            if(i != temp){
                this.getWidget("btn_niao_" + i).setBright(false);
                this.getWidget("txt_niao_"+i).setColor(cc.color("ffffff"));
            }
        }
        var btn = this.getWidget("btn_niao_" + temp);
        this.getWidget("txt_niao_" + temp).setColor(cc.color("d91010"));
        btn.setBright(true);
        this.syNiao = values[temp-1];
    },

    displayNiao:function(){
        var values = [0,2,4,6];
        for(var i = 1 ; i <= values.length; i ++){
            var btn = this.getWidget("btn_niao_" + i);
            btn.setBright(false);
            if(this.syNiao == values[i-1]){
                this.getWidget("btn_niao_" + i).setBright(true);
                this.getWidget("txt_niao_"+i).setColor(cc.color("d91010"));
            }else{
                this.getWidget("btn_niao_" + i).setBright(false);
                this.getWidget("txt_niao_"+i).setColor(cc.color("ffffff"));
            }
        }
    },

    onJushuClick:function(obj){
        var temp = parseInt(obj.temp);
        var values = [1,8,12,16];
        for(var i=1;i<= values.length;i++){
            if(i!=temp) {
                this["btn_jushu_" + i].setBright(false);
                this["txt_jushu_"+i].setColor(cc.color("ffffff"));
            }
        }
        var btn = this["btn_jushu_"+temp];
        btn.setBright(true);
        this["txt_jushu_"+temp].setColor(cc.color("d91010"));
        this.syJushu = values[temp-1];
        this.updateCostDiamond();
    },


    displayJushu:function(){
        var values = [1,8,12,16];
        //cc.log("this.syJushu===",this.syJushu)
        for(var i = 1;i <= values.length;i++){
            var btn = this["btn_jushu_"+i];
            btn.setBright(false);
            if(this.syJushu==values[i-1]&&!btn.isBright())
                this.onJushuClick(btn);
        }
    },

    onRenshuClick:function(obj){
        var temp = parseInt(obj.temp);
        var values = [4,3,2];
        for(var i=1;i<= values.length;i++){
            if(i!=temp) {
                this["btn_renshu_" + i].setBright(false);
                this["txt_renshu_"+i].setColor(cc.color("ffffff"));
            }
        }
        var btn = this["btn_renshu_"+temp];
        btn.setBright(true);
        this["txt_renshu_"+temp].setColor(cc.color("d91010"));
        this.syRenshu = values[temp-1];

        if (this.syRenshu == 2){
            this.getWidget("Panel_double").visible = true;
            if (this.syIsDouble && parseInt(this.syIsDouble)){
                this.getWidget("Image_double").visible = true;
                this.getWidget("Panel_times").visible = true;
            }
        }else{
            this.getWidget("Panel_double").visible = false;
            this.getWidget("Panel_times").visible = false;
        }

        this.getWidget("Panel_double").visible = false;

        this.updateCostDiamond();
        this.updateChooseBtn();
    },


    displayRenshu:function(){
        var values = [4,3,2];
        for(var i = 1;i <= values.length;i++){
            var btn = this["btn_renshu_"+i];
            btn.setBright(false);
            if(this.syRenshu==values[i-1]&&!btn.isBright())
                this.onRenshuClick(btn);
        }
    },

    onWindClick:function(){
        var btn = this["btn_kexuan_1"];
        var txt = this["txt_kexuan_1"];
        if(btn.isBright()){
            txt.setColor(cc.color("ffffff"));
            btn.setBright(false);
            this.syWind = 0;
        }else{
            txt.setColor(cc.color("d91010"));
            btn.setBright(true);
            this.syWind = 1;
        }
    },

    displayWind:function(){
        var btn = this["btn_kexuan_1"];
        var txt = this["txt_kexuan_1"];
        if(this.syWind == 1){
            txt.setColor(cc.color("d91010"));
            btn.setBright(true);
        }else{
            txt.setColor(cc.color("ffffff"));
            btn.setBright(false);
        }
    },

    onMyDoubleClick:function(){
        var btn = this["btn_kexuan_2"];
        var txt = this["txt_kexuan_2"];
        if(btn.isBright()){
            txt.setColor(cc.color("ffffff"));
            btn.setBright(false);
            this.syMyDouble = 0;
        }else{
            txt.setColor(cc.color("d91010"));
            btn.setBright(true);
            this.syMyDouble = 1;
        }
        //cc.log("this.syMyDouble",this.syMyDouble)
    },

    displayMyDouble:function(){
        var btn = this["btn_kexuan_2"];
        var txt = this["txt_kexuan_2"];
        if(this.syMyDouble == 1){
            txt.setColor(cc.color("d91010"));
            btn.setBright(true);
        }else{
            txt.setColor(cc.color("ffffff"));
            btn.setBright(false);
        }
    },

    onQiDuiClick:function(){
        var btn = this["btn_kexuan_6"];
        var txt = this["txt_kexuan_6"];
        if(btn.isBright()){
            txt.setColor(cc.color("ffffff"));
            btn.setBright(false);
            this.syKhqd = 0;
        }else{
            txt.setColor(cc.color("d91010"));
            btn.setBright(true);
            this.syKhqd = 1;
        }
    },

    displayQiDui:function(){
        var btn = this["btn_kexuan_6"];
        var txt = this["txt_kexuan_6"];
        if(this.syKhqd == 1){
            txt.setColor(cc.color("d91010"));
            btn.setBright(true);
        }else{
            txt.setColor(cc.color("ffffff"));
            btn.setBright(false);
        }
    },

    onEatClick:function(){
        var btn = this["btn_kexuan_3"];
        var txt = this["txt_kexuan_3"];
        if(btn.isBright()){
            txt.setColor(cc.color("ffffff"));
            btn.setBright(false);
            this.syEat = 0;
        }else{
            txt.setColor(cc.color("d91010"));
            btn.setBright(true);
            this.syEat = 1;
            this.displayColorEat();
        }
    },

    displayEat:function(){
        var btn = this["btn_kexuan_3"];
        var txt = this["txt_kexuan_3"];
        if(this.syEat == 1){
            txt.setColor(cc.color("d91010"));
            btn.setBright(true);
        }else{
            txt.setColor(cc.color("ffffff"));
            btn.setBright(false);
            //this.syEat = 0;
        }
    },

    displayColorEat:function(){
        var btn = this["btn_kexuan_4"];
        var txt = this["txt_kexuan_4"];
        if(this.syEat == 2){
            txt.setColor(cc.color("d91010"));
            btn.setBright(true);
        }else{
            txt.setColor(cc.color("ffffff"));
            btn.setBright(false);
        }
    },

    onColorEatClick:function(){
        var btn = this["btn_kexuan_4"];
        var txt = this["txt_kexuan_4"];
        if(btn.isBright()){
            txt.setColor(cc.color("ffffff"));
            btn.setBright(false);
            this.syEat = 0;
        }else{
            txt.setColor(cc.color("d91010"));
            btn.setBright(true);
            this.syEat = 2;
            this.displayEat();
        }
    },

    onDgljfClick:function(){
        var btn = this["btn_kexuan_5"];
        var txt = this["txt_kexuan_5"];
        if(btn.isBright()){
            txt.setColor(cc.color("ffffff"));
            btn.setBright(false);
            this.syDgljf = 0;
        }else{
            txt.setColor(cc.color("d91010"));
            btn.setBright(true);
            this.syDgljf = 1;
        }
    },

    displayDgljf:function(){
        var btn = this["btn_kexuan_5"];
        var txt = this["txt_kexuan_5"];
        if(this.syDgljf){
            txt.setColor(cc.color("d91010"));
            btn.setBright(true);
        }else {
            txt.setColor(cc.color("ffffff"));
            btn.setBright(false);
        }
    },


    onKqgghClick:function(){
        var btn = this["btn_kexuan_6"];
        var txt = this["txt_kexuan_6"];
        if(btn.isBright()){
            txt.setColor(cc.color("ffffff"));
            btn.setBright(false);
            this.syKqggh = 0;
        }else{
            txt.setColor(cc.color("d91010"));
            btn.setBright(true);
            this.syKqggh = 1;
        }
        this.displayQghszm();
        this.displayQghcb();
    },

    displayKqggh:function(){
        var btn = this["btn_kexuan_6"];
        var txt = this["txt_kexuan_6"];
        if(this.syKqggh){
            txt.setColor(cc.color("d91010"));
            btn.setBright(true);
        }else {
            txt.setColor(cc.color("ffffff"));
            btn.setBright(false);
        }
    },


    onKhfghClick:function(){
        var btn = this["btn_kexuan_7"];
        var txt = this["txt_kexuan_7"];
        if(btn.isBright()){
            txt.setColor(cc.color("ffffff"));
            btn.setBright(false);
            this.syKhfgh = 0;
        }else{
            txt.setColor(cc.color("d91010"));
            btn.setBright(true);
            this.syKhfgh = 1;
        }
        this.displayQghcb();
    },

    displayKhfgh:function(){
        var btn = this["btn_kexuan_7"];
        var txt = this["txt_kexuan_7"];
        if(this.syKhfgh){
            txt.setColor(cc.color("d91010"));
            btn.setBright(true);
        }else {
            txt.setColor(cc.color("ffffff"));
            btn.setBright(false);
        }
    },

    onQghcbClick:function(){
        var btn = this["btn_kexuan_8"];
        var txt = this["txt_kexuan_8"];
        if (this.syKqggh  || this.syKhfgh) {
            if (btn.isBright()) {
                txt.setColor(cc.color("ffffff"));
                btn.setBright(false);
                this.syQghbsj = 0;
            } else {
                txt.setColor(cc.color("d91010"));
                btn.setBright(true);
                this.syQghbsj = 1;
            }
        }
    },

    displayQghcb:function(){
        var btn = this["btn_kexuan_8"];
        var txt = this["txt_kexuan_8"];
        if(this.syQghbsj && (this.syKqggh || this.syKhfgh)){
            txt.setColor(cc.color("d91010"));
            btn.setBright(true);
            this.syQghbsj = 1;
        }else {
            txt.setColor(cc.color("ffffff"));
            btn.setBright(false);
            this.syQghbsj = 0;
        }
    },

    onDggkcbClick:function(){
        var btn = this["btn_kexuan_9"];
        var txt = this["txt_kexuan_9"];
        if(btn.isBright()){
            txt.setColor(cc.color("ffffff"));
            btn.setBright(false);
            this.syDggkcb = 0;
        }else{
            txt.setColor(cc.color("d91010"));
            btn.setBright(true);
            this.syDggkcb = 1;
        }
    },

    displayDggkcb:function(){
        var btn = this["btn_kexuan_9"];
        var txt = this["txt_kexuan_9"];
        if(this.syDggkcb){
            txt.setColor(cc.color("d91010"));
            btn.setBright(true);
        }else {
            txt.setColor(cc.color("ffffff"));
            btn.setBright(false);
        }
    },

    onGhpljfClick:function(){
        var btn = this["btn_kexuan_10"];
        var txt = this["txt_kexuan_10"];
        if(btn.isBright()){
            txt.setColor(cc.color("ffffff"));
            btn.setBright(false);
            this.syGhpljf = 0;
        }else{
            txt.setColor(cc.color("d91010"));
            btn.setBright(true);
            this.syGhpljf = 1;
        }
    },

    displayGhpljf:function(){
        var btn = this["btn_kexuan_10"];
        var txt = this["txt_kexuan_10"];
        if(this.syGhpljf){
            txt.setColor(cc.color("d91010"));
            btn.setBright(true);
        }else {
            txt.setColor(cc.color("ffffff"));
            btn.setBright(false);
        }
    },


    //
    onTuoguanClick:function(){
        var btn = this["btn_kexuan_11"];
        var txt = this["txt_kexuan_11"];
        if(btn.isBright()){
            txt.setColor(cc.color("ffffff"));
            btn.setBright(false);
            this.syTuoguan = 0;
        }else{
            txt.setColor(cc.color("d91010"));
            btn.setBright(true);
            this.syTuoguan = 1;
        }
    },

    displayTuoguan:function(){
        var btn = this["btn_kexuan_11"];
        var txt = this["txt_kexuan_11"];
        if(this.syTuoguan == 1){
            txt.setColor(cc.color("d91010"));
            btn.setBright(true);
        }else {
            txt.setColor(cc.color("ffffff"));
            btn.setBright(false);
        }
    },

    //
    onQghszmClick:function(){
        var btn = this["btn_kexuan_12"];
        var txt = this["txt_kexuan_12"];
        if (this.syKqggh){
            if(btn.isBright()){
                txt.setColor(cc.color("ffffff"));
                btn.setBright(false);
                this.syQghszm = 0;
            }else{
                txt.setColor(cc.color("d91010"));
                btn.setBright(true);
                this.syQghszm = 1;
            }
        }
    },

    displayQghszm:function(){
        var btn = this["btn_kexuan_12"];
        var txt = this["txt_kexuan_12"];
        if(this.syQghszm == 1 && this.syKqggh == 1){
            txt.setColor(cc.color("d91010"));
            btn.setBright(true);
            this.syQghszm = 1;
        }else {
            txt.setColor(cc.color("ffffff"));
            btn.setBright(false);
            this.syQghszm = 0;
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
        this.syIsDouble = values[temp-1];

        if (this.syIsDouble && parseInt(this.syIsDouble) && this.syRenshu == 2){
            this.getWidget("Image_double").visible = true;
            this.getWidget("Panel_times").visible = true;
        }else{
            this.getWidget("Image_double").visible = false;
            this.getWidget("Panel_times").visible = false;
        }
    },

    displayDouble:function(){
        var values = [0 , 1];
        for(var i = 1;i <= values.length; i++) {
            var btn = this["Button_double" + i];
            var txt = this["Label_double" + i];
            if (this.syIsDouble == values[i-1]) {
                txt.setColor(cc.color(cc.color("d91010")));
                btn.setBright(true);
            }else{
                txt.setColor(cc.color(cc.color("ffffff")));
                btn.setBright(false);
            }
        }

        cc.log("this.syIsDouble",this.syIsDouble,this.syRenshu);
        if (this.syIsDouble && parseInt(this.syIsDouble)  && this.syRenshu== 2){
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
        this.syDoubleNum = values[temp-1];
        //cc.log("this.syDoubleNum==="+this.syDoubleNum)
    },

    displayTimes:function(){
        var values = [2 , 3 , 4];
        for(var i = 1;i <= values.length; i++) {
            var btn = this["btn_times" + i];
            var txt = this["txt_times" + i];
            if (this.syDoubleNum == values[i-1]) {
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
        var num = this.syDScore;
        if (temp == 1){
            if (this.syDScore == 10){
                num = 5;
            }else{
                num = num - 10;
            }
        }else{
            if (this.syDScore == 5){
                num = 10;
            }else{
                num = num + 10;
            }
        }
        if (num && num >= 5 && num <= 30){
            this.syDScore = num;
        }
        this.displayChangeScore();
    },

    displayChangeScore:function(){
        this.getWidget("Label_dScore").setString("??????"+ this.syDScore + "???");
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
        var diamondFangzhu = 8;
        var diamondAA = 3;
        var diamondQunzhu = 8;
        if(this.syJushu == 1){
            diamondFangzhu = 6;
            diamondAA = 2;
            diamondQunzhu = 6;
            if(this.syRenshu == 2){
                diamondFangzhu = 6;
                diamondQunzhu = 6;
                diamondAA = 3;
            }else if(this.syRenshu == 3){
                diamondFangzhu = 6;
                diamondQunzhu = 6;
                diamondAA = 2;
            }
        }else if(this.syJushu == 8){
            diamondFangzhu = 40;
            diamondAA = 10;
            diamondQunzhu = 40;
            if(this.syRenshu == 2){
                diamondFangzhu = 30;
                diamondQunzhu = 30;
                diamondAA = 20;
            }else if(this.syRenshu == 3){
                diamondFangzhu = 40;
                diamondQunzhu = 40;
                diamondAA = 14;
            }
        }else if(this.syJushu == 12){
            diamondFangzhu = 60;
            diamondQunzhu = 60;
            diamondAA = 15;
            if(this.syRenshu == 2){
                diamondFangzhu = 45;
                diamondQunzhu = 45;
                diamondAA = 30;
            }else if(this.syRenshu == 3) {
                diamondFangzhu = 60;
                diamondQunzhu = 60;
                diamondAA = 20;
            }
        }else if(this.syJushu == 16){
            diamondFangzhu = 80;
            diamondQunzhu = 80;
            diamondAA = 20;
            if(this.syRenshu == 2){
                diamondFangzhu = 60;
                diamondQunzhu = 60;
                diamondAA = 40;
            }else if(this.syRenshu == 3) {
                diamondFangzhu = 80;
                diamondQunzhu = 80;
                diamondAA = 27;
            }
        }

         var costlable = this.getWidget("txt_cost");
        if (this.syCostWay == 1){
            costlable.setString(diamondAA + "/???")
        }else{
            costlable.setString("x" + diamondFangzhu)
        }

    },


    //???????????????????????????
    updateChooseBtn:function(){
        for ( var i = 5;i <= 12;i++){
            var btn = this.getWidget("btn_kexuan_"+i);
            var text = this.getWidget("txt_kexuan_"+i);
            if (btn && text){
                btn.visible = text.visible = false;
            }
        }
        var textX = this.getWidget("txt_kexuan_"+11).x;
        var textY = this.getWidget("txt_kexuan_"+11).y;

        var btnX = this.getWidget("btn_kexuan_"+8).x;
        var btnY = this.getWidget("btn_kexuan_"+8).y;


        //cc.log("updateChooseBtn==",textX,textY,btnX,btnY);

        var tuoguanBtn = this.getWidget("btn_kexuan_11");
        var tuoguanText = this.getWidget("txt_kexuan_11");
        if (this.syRenshu == 2){
            var qghzmBtn = this.getWidget("btn_kexuan_12");
            var qghzmText = this.getWidget("txt_kexuan_12");
            var kqgghBtn = this.getWidget("btn_kexuan_6");
            var kqgghText = this.getWidget("txt_kexuan_6");
//            tuoguanBtn.x  = 161;
//            tuoguanText.x  = 195;
//            tuoguanBtn.y  = tuoguanText.y = 80;
            kqgghBtn.visible = kqgghText.visible = qghzmBtn.visible = qghzmText.visible = true;
            tuoguanBtn.visible = tuoguanText.visible = true;
        }else if(this.syRenshu == 3 || this.syRenshu == 4){
            //var tuoguanBtn = this.getWidget("btn_kexuan_11");
            //var tuoguanText = this.getWidget("txt_kexuan_11");
            //tuoguanBtn.x  =
            for ( var i = 5;i <= 11;i++){
                var btn = this.getWidget("btn_kexuan_"+i);
                var text = this.getWidget("txt_kexuan_"+i);
                if (btn && text){
                    btn.visible = text.visible = true;
                }
            }
//            tuoguanBtn.x  = 466;
//            tuoguanText.x  = 500;
//            tuoguanBtn.y  = tuoguanText.y = 33;
            var text5 = "???????????????";
            var text8 = "???????????????";
            var text9 = "??????????????????";
            var text10 = "??????????????????";
            if (this.syRenshu == 4){
                text5 = "???????????????";
                text8 = "??????????????????";
                text9 = "?????????????????????";
                text10 = "??????????????????";
            }
            this.getWidget("txt_kexuan_5").setString(""+text5);
            this.getWidget("txt_kexuan_8").setString(""+text8);
            this.getWidget("txt_kexuan_9").setString(""+text9);
            this.getWidget("txt_kexuan_10").setString(""+text10);
        }

    },

    getLocalItem:function(key){
        var val = cc.sys.localStorage.getItem(key);
        if(val)
            val = parseInt(val);
        return val;
    },

    getWanfaList:function(idex){
        //this.saveConfig();
        var wanfaList = [];
        if (this.syRenshu != 2){
            this.syIsDouble = 0;
            this.syQghszm = 0;
        }
        wanfaList = [
            this.syJushu, MJWanfaType.SYMJ, this.syCostWay, this.syWind, this.syEat ,this.syNiao, this.syMyDouble,
            this.syRenshu, this.syTuoguan, this.syKqggh, this.syQghbsj, this.sySzxNiao, this.syKhfgh, this.syDgljf, this.syDggkcb,
            this.syGhpljf, this.syQghszm, 1, 0
        ];
        for(var index = 0 ; index < wanfaList.length ; index++){
            wanfaList[index] = parseInt(wanfaList[index]);
        }
        return wanfaList;
    }
});
