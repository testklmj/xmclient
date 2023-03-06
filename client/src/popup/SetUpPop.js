/**
 * Created by Administrator on 2016/6/27.
 */

var SetUpPop = BasePopup.extend({

    ctor: function (showExit) {
        this.showExit = showExit || false;
        this._super("res/setup.json");
    },

    selfRender: function () {

        this.Button_20 = this.getWidget("Button_20");
        UITools.addClickEvent(this.Button_20,this,this.onBtn3);

        this.Button_change = this.getWidget("Button_change");
        UITools.addClickEvent(this.Button_change,this,this.onPhoneChange);

        this.Button_cancel = this.getWidget("Button_cancel");
        UITools.addClickEvent(this.Button_cancel,this,this.onPhoneCancel);

        this.state1 = PlayerModel.isMusic;
        this.state2 = PlayerModel.isEffect;
        cc.log("PlayerModel.isMusic , PlayerModel.isEffect..." , PlayerModel.isMusic , PlayerModel.isEffect);
        var slider1 = this.getWidget("Slider_7");
        slider1.temp = 1;
        slider1.addEventListener(this.sliderEvent,this);
        slider1.setPercent(this.state1);
        var slider2 = this.getWidget("Slider_8");
        slider2.temp = 2;
        slider2.addEventListener(this.sliderEvent,this);
        slider2.setPercent(this.state2);
        if(LayerManager.isInRoom()){
            this.bgMusic = 2;
        }else{
            this.bgMusic = 1;
        }


        if(this.showExit)
           UITools.addClickEvent(this.Button_20,this,this.onBtn3);
        else
            this.Button_20.visible = this.Button_change.visible = this.Button_cancel.visible = false;

    },

    sliderEvent: function (sender, type) {
        if(type==ccui.Slider.EVENT_PERCENT_CHANGED){
            var temp = sender.temp;
            var percent = sender.getPercent();
            var volume = percent/100;
            if(temp==1){
                this.state1 = percent;
                AudioManager.setBgVolume(volume);
            }else{
                this.state2 = percent;
                AudioManager.setEffectsVolume(volume);
            }
        }
    },

    onPhoneChange:function(){
        if (PlayerModel.phoneNum){
            var _type  = 4;
            PopupManager.addPopup(new PhoneManagePop(_type));
        }else{
            FloatLabelUtil.comText("暂未绑定手机号");
        }
        cc.log("PlayerModel.phoneNum==",PlayerModel.phoneNum)
    },

    onPhoneCancel:function(){
        if (PlayerModel.phoneNum){
            var _type  = 9;
            PopupManager.addPopup(new PhoneManagePop(_type));
        }else{
            FloatLabelUtil.comText("暂未绑定手机号");
        }
        cc.log("PlayerModel.phoneNum==",PlayerModel.phoneNum)


    },

    onBtn3:function(){
        AlertPop.show("您确定退出登录吗？",function(){
            PopupManager.removeAll();
            WXHelper.cleanCache();//清除掉微信的值
            XLHelper.xl_cleanCache();//清除掉闲聊的值
            var userInfo = cc.sys.localStorage;
            userInfo.removeItem("pdkFlatId");//游客账号
            WXHeadIconManager.clean();
            AudioManager.stop_bg();
            NetErrorPopData.mc = null;
            PingClientModel.reset();
            PlayerModel.clear();
            sySocket.disconnect();
            LayerManager.dispose();//ui
            LayerManager.showLayer(LayerFactory.LOGIN);
            IMSdkUtil.gotyeExit();
        });
    },

    onClose:function(){
        PlayerModel.isMusic = this.state1;
        PlayerModel.isEffect = this.state2;
        PlayerModel.musicType = this.bgMusic;
        AudioManager.reloadFromData(this.state1,this.state2,this.bgMusic);
        sySocket.sendComReqMsg(10,[this.state1,this.state2,this.state1,this.state2,this.bgMusic]);
    },
});

var PHZSetUpPop = BasePopup.extend({

    ctor: function () {
        this._super("res/phzSetPop.json");
    },

    selfRender: function () {
        this.state1 = PlayerModel.isMusic;
        this.state2 = PlayerModel.isEffect;
        cc.log("PlayerModel.isMusic , PlayerModel.isEffect..." , PlayerModel.isMusic , PlayerModel.isEffect);
        var slider1 = this.getWidget("Slider_7");
        slider1.temp = 1;
        slider1.addEventListener(this.sliderEvent,this);
        slider1.setPercent(this.state1);
        var slider2 = this.getWidget("Slider_8");
        slider2.temp = 2;
        slider2.addEventListener(this.sliderEvent,this);
        slider2.setPercent(this.state2);
        this.bgMusic = 2;

        this.getLocalRecord();//获取本地记录


        this.gnPanel = this.getWidget("Panel_gn");
        this.hmPanel = this.getWidget("Panel_hm");

        this.Button_gn = this.getWidget("Button_gn");
        this.Button_hm = this.getWidget("Button_hm");

        UITools.addClickEvent(this.Button_gn, this, this.onGn);
        UITools.addClickEvent(this.Button_hm, this, this.onHm);
        this.onGn();

        //画面设置界面的逻辑
        //快速吃牌
        var widgetKscp = {"Button_kscp1":1,"Button_kscp2":2,"Label_kscp1":1,"Label_kscp2":2};
        this.addClickEvent(widgetKscp , this.onKscpClick);
        this.displayKscp();

        //开启听牌
        var widgetKqtp = {"Button_kqtp1":1,"Button_kqtp2":2,"Label_kqtp1":1,"Label_kqtp2":2};
        this.addClickEvent(widgetKqtp , this.onKqtpClick);
        this.displaykqtp();

        //语音选择
        var widgetYyxz = {"Button_yyxz1":1,"Button_yyxz2":2,"Button_yyxz3":3,"Label_yyxz1":1,"Label_yyxz2":2,"Label_yyxz3":3};
        this.addClickEvent(widgetYyxz , this.onYyxzClick);
        this.displayYyxz();

        //出牌速度
        var widgetCpsd = {"Button_cpsd1":1,"Button_cpsd2":2,"Button_cpsd3":3,"Button_cpsd4":4,"Label_cpsd1":1,"Label_cpsd2":2,"Label_cpsd3":3,"Label_cpsd4":4};
        this.addClickEvent(widgetCpsd , this.onCpsdClick);
        this.displayCpsd();

        //字牌大小
        var widgetZpdx = {"Button_zpdx1":1,"Button_zpdx2":2,"Button_zpdx3":3,"Button_zpdx4":4,"Label_zpdx1":1,"Label_zpdx2":2,"Label_zpdx3":3,"Label_zpdx4":4};
        this.addClickEvent(widgetZpdx , this.onZpdxClick);
        this.displayZpdx();

        //虚线选择
        var widgetXxxz = {"Button_xxxz1":1,"Button_xxxz2":2,"Label_xxxz1":1,"Label_xxxz2":2};
        this.addClickEvent(widgetXxxz , this.onXxxzClick);
        this.displayXxxz();

        //字牌选择
        var widgetZpxz = {"Button_zpxz1":1,"Button_zpxz2":2,"Button_zpxz3":3,"Image_zpxz1":1,"Image_zpxz2":2,"Image_zpxz3":3};
        this.addClickEvent(widgetZpxz , this.onZpxzClick);
        this.displayZpxz();

        //桌面背景
        var widgetZmbj = {"Button_zmbj1":1,"Button_zmbj2":2,"Button_zmbj3":3,"Button_zmbj4":4,
            "Image_zmbj1":1,"Image_zmbj2":2,"Image_zmbj3":3,"Image_zmbj4":4};
        this.addClickEvent(widgetZmbj , this.onZmbjClick);
        this.displayZmbj();
    },

    onGn: function() {
        this.gnPanel.visible = true;
        this.hmPanel.visible = false;
        this.Button_gn.setBright(false);
        this.Button_hm.setBright(true);
        this.Button_gn.setTouchEnabled(false);
        this.Button_hm.setTouchEnabled(true);
    },

    onHm: function() {
        this.gnPanel.visible = false;
        this.hmPanel.visible = true;
        this.Button_gn.setBright(true);
        this.Button_hm.setBright(false);
        this.Button_gn.setTouchEnabled(true);
        this.Button_hm.setTouchEnabled(false);
    },

    getLocalItem:function(key){
        var val = cc.sys.localStorage.getItem(key);
        if(val)
            val = parseInt(val);
        return val;
    },

    setLocalItem:function(key,values){
        cc.sys.localStorage.setItem(key,values);
    },

    getLocalRecord: function () {
        this.kscp = parseInt(this.getLocalItem("sy_phz_kscp")) == 0 ? 0:1;  //1,0
        this.kqtp = parseInt(this.getLocalItem("sy_phz_kqtp")) == 0 ? 0:1;  //1,0
        this.yyxz = parseInt(this.getLocalItem("sy_phz_yyxz")) || 3;  //1,2,3
        this.cpsd = this.getLocalItem("sy_phz_cpsd") || 1;  //1,2,3
        this.zpdx = parseInt(this.getLocalItem("sy_phz_zpdx")) || 2;  //1,2,3
        this.xxxz = parseInt(this.getLocalItem("sy_phz_xxxz")) == 1 ? 1:0;  //1,0
        this.zpxz = this.getLocalItem("sy_phz_zpxz") || 1;  //1,2,3
        this.zmbj = this.getLocalItem("sy_phz_zmbj") || 1;  //1,2,3
    },

    onKscpClick: function (obj) {
        var temp = parseInt(obj.temp);
        var values = [1,0];
        for(var i = 1;i <= values.length; i++) {
            var btn = this["Button_kscp" + i];
            if (temp == i){
                btn.setBright(true);
            }else{
                btn.setBright(false);
            }
        }
        this.kscp = values[temp-1];
        if (PHZSetModel.kscp != this.kscp){
            PHZSetModel.kscp = this.kscp;
            this.setLocalItem("sy_phz_kscp",this.kscp);
            SyEventManager.dispatchEvent(SyEvent.UPDATE_SET_KSCP);
        }
        //cc.log("this.kscp"+this.kscp);
    },

    displayKscp:function(){
        var values = [1,0];
        //cc.log("this.kscp"+this.kscp);
        for(var i = 1;i <= values.length; i++) {
            var btn = this["Button_kscp" + i];
            if (this.kscp == values[i-1]) {
                btn.setBright(true);
            }else{
                btn.setBright(false);
            }
        }
    },

    onKqtpClick: function (obj) {
        var temp = parseInt(obj.temp);
        var values = [1,0];
        //if (temp == 1) {
        //    FloatLabelUtil.comText("暂未开放");
        //    return
        //}
        for(var i = 1;i <= values.length; i++) {
            var btn = this["Button_kqtp" + i];
            if (temp == i){
                btn.setBright(true);
            }else{
                btn.setBright(false);
            }
        }
        this.kqtp = values[temp-1];
        if (PHZSetModel.kqtp != this.kqtp){
            PHZSetModel.kqtp = this.kqtp;
            this.setLocalItem("sy_phz_kqtp",this.kqtp);  //1,0
            SyEventManager.dispatchEvent(SyEvent.UPDATE_SET_KQTP,2);
        }
        //cc.log("this.kqtp"+this.kqtp);
    },

    displaykqtp:function(){
        var values = [1,0];
        //cc.log("this.kqtp"+this.kqtp);
        for(var i = 1;i <= values.length; i++) {
            var btn = this["Button_kqtp" + i];
            if (this.kqtp == values[i-1]) {
                btn.setBright(true);
            }else{
                btn.setBright(false);
            }
        }
    },


    onYyxzClick: function (obj) {
        var temp = parseInt(obj.temp);
        var values = [1,2,3];
        for(var i = 1;i <= values.length; i++) {
            var btn = this["Button_yyxz" + i];
            if (temp == i){
                btn.setBright(true);
            }else{
                btn.setBright(false);
            }
        }
        this.yyxz = values[temp-1];
        if (PHZSetModel.yyxz != this.yyxz){
            PHZSetModel.yyxz = this.yyxz;
            this.setLocalItem("sy_phz_yyxz",this.yyxz);  //1,0
            SyEventManager.dispatchEvent(SyEvent.UPDATE_SET_YYXZ);
        }
        //cc.log("this.yyxz"+this.yyxz);
    },

    displayYyxz:function(){
        var values = [1,2,3];
        //cc.log("this.yyxz"+this.yyxz);
        for(var i = 1;i <= values.length; i++) {
            var btn = this["Button_yyxz" + i];
            if (this.yyxz == values[i-1]) {
                btn.setBright(true);
            }else{
                btn.setBright(false);
            }
        }
    },

    onCpsdClick: function (obj) {
        var temp = parseInt(obj.temp);
        var values = [4,3,2,1];
        for(var i = 1;i <= values.length; i++) {
            var btn = this["Button_cpsd" + i];
            if (temp == i){
                btn.setBright(true);
            }else{
                btn.setBright(false);
            }
        }
        this.cpsd = values[temp-1];
        if (PHZSetModel.cpsd != this.cpsd){
            PHZSetModel.cpsd = this.cpsd;
            this.setLocalItem("sy_phz_cpsd",this.cpsd);  //1,2,3
            SyEventManager.dispatchEvent(SyEvent.UPDATE_SET_CPSD);
        }
        //cc.log("this.cpsd"+this.cpsd);
    },

    displayCpsd:function(){
        var values = [4,3,2,1];
        //cc.log("this.cpsd"+this.cpsd);
        for(var i = 1;i <= values.length; i++) {
            var btn = this["Button_cpsd" + i];
            if (this.cpsd == values[i-1]) {
                btn.setBright(true);
            }else{
                btn.setBright(false);
            }
        }
    },


    onZpdxClick: function (obj) {
        var temp = parseInt(obj.temp);
        var values = [1,2,3,4];
        for(var i = 1;i <= values.length; i++) {
            var btn = this["Button_zpdx" + i];
            if (temp == i){
                btn.setBright(true);
            }else{
                btn.setBright(false);
            }
        }
        this.zpdx = values[temp-1];
        if (PHZSetModel.zpdx != this.zpdx){
            PHZSetModel.zpdx = this.zpdx;
            this.setLocalItem("sy_phz_zpdx",this.zpdx);  //0,1
            SyEventManager.dispatchEvent(SyEvent.UPDATE_SET_ZPDX);
        }
        //cc.log("this.zpdx"+this.zpdx);
    },

    displayZpdx:function(){
        var values = [1,2,3,4];
        //cc.log("this.zpdx"+this.zpdx);
        for(var i = 1;i <= values.length; i++) {
            var btn = this["Button_zpdx" + i];
            if (this.zpdx == values[i-1]) {
                btn.setBright(true);
            }else{
                btn.setBright(false);
            }
        }
    },


    onXxxzClick: function (obj) {
        var temp = parseInt(obj.temp);
        var values = [0,1];
        for(var i = 1;i <= values.length; i++) {
            var btn = this["Button_xxxz" + i];
            if (temp == i){
                btn.setBright(true);
            }else{
                btn.setBright(false);
            }
        }
        this.xxxz = values[temp-1];
        if (PHZSetModel.xxxz != this.xxxz){
            PHZSetModel.xxxz = this.xxxz;
            this.setLocalItem("sy_phz_xxxz",this.xxxz);  //0,1
            SyEventManager.dispatchEvent(SyEvent.UPDATE_SET_XXXZ);
        }
        //cc.log("this.xxxz"+this.xxxz);
    },

    displayXxxz:function(){
        var values = [0,1];
        //cc.log("this.xxxz"+this.xxxz);
        for(var i = 1;i <= values.length; i++) {
            var btn = this["Button_xxxz" + i];
            if (this.xxxz == values[i-1]) {
                btn.setBright(true);
            }else{
                btn.setBright(false);
            }
        }
    },


    onZpxzClick: function (obj) {
        var temp = parseInt(obj.temp);
        var values = [1,2,3];
        for(var i = 1;i <= values.length; i++) {
            var btn = this["Button_zpxz" + i];
            if (temp == values[i-1]){
                btn.setBright(true);
            }else{
                btn.setBright(false);
            }
        }
        this.zpxz = values[temp-1];
        if (PHZSetModel.zpxz != this.zpxz){
            PHZSetModel.zpxz = this.zpxz;
            this.setLocalItem("sy_phz_zpxz",this.zpxz);  //1,2,3
            SyEventManager.dispatchEvent(SyEvent.UPDATE_SET_ZPXZ);
        }
        //cc.log("this.zpxz===",this.zpxz)
    },

    displayZpxz:function(){
        var values = [1,2,3];
        //cc.log("this.zpxz"+this.zpxz);
        for(var i = 1;i <= values.length; i++) {
            var btn = this["Button_zpxz" + i];
            if (this.zpxz == values[i-1]) {
                btn.setBright(true);
            }else{
                btn.setBright(false);
            }
        }
    },


    onZmbjClick: function (obj) {
        var temp = parseInt(obj.temp);
        var values = [1,2,3,4];
        for(var i = 1;i <= values.length; i++) {
            var btn = this["Button_zmbj" + i];
            if (temp == values[i-1]){
                btn.setBright(true);
            }else{
                btn.setBright(false);
            }
        }
        this.zmbj = values[temp-1];
        //cc.log("this.zmbj"+this.zmbj);
        PHZSetModel.zmbj = this.zmbj;
        this.setLocalItem("sy_phz_zmbj",this.zmbj);  //1,2,3
        SyEventManager.dispatchEvent(SyEvent.UPDATE_BG_YANSE);

    },

    displayZmbj:function(){
        var values = [1,2,3,4];
        //cc.log("this.zmbj"+this.zmbj);
        for(var i = 1;i <= values.length; i++) {
            var btn = this["Button_zmbj" + i];
            if (this.zmbj == values[i-1]) {
                btn.setBright(true);
            }else{
                btn.setBright(false);
            }
        }
    },



    addClickEvent:function(widgets , selector){
        for(var key in widgets){
            var widget = this[key] = this.getWidget(key);
            //cc.log("key ..." , widgets , key)
            widget.temp = parseInt(widgets[key]);
            UITools.addClickEvent(widget,this,selector);
        }
    },

    sliderEvent: function (sender, type) {
        if(type==ccui.Slider.EVENT_PERCENT_CHANGED){
            var temp = sender.temp;
            var percent = sender.getPercent();
            var volume = percent/100;
            if(temp==1){
                this.state1 = percent;
                AudioManager.setBgVolume(volume);
            }else{
                this.state2 = percent;
                AudioManager.setEffectsVolume(volume);
            }
        }
    },

    onClose:function(){
        PlayerModel.isMusic = this.state1;
        PlayerModel.isEffect = this.state2;
        PlayerModel.musicType = this.bgMusic;

        cc.log("fuck u ::" , AudioManager._bgMusic);
        AudioManager.reloadFromData(this.state1,this.state2,AudioManager._bgMusic || 3);
        sySocket.sendComReqMsg(10,[this.state1,this.state2,this.state1,this.state2,this.bgMusic]);
        //
        //AudioManager.reloadFromData(this.state1,this.state2,this.bgMusic);
        //sySocket.sendComReqMsg(10,[this.state1,this.state2,this.state1,this.state2,this.bgMusic]);
    },
});

var DTZSetUpPop = BasePopup.extend({
    ctor: function () {
        this._super("res/dtzSetup.json");
    },

    selfRender: function () {

        this.pz = this.getLocalItem("sy_dtz_pz") || 1;

        this["CheckBox_bg1"] = this.getWidget("CheckBox_bg1");
        this["CheckBox_bg1"].addEventListener(this.onClickPz1, this);
        this["CheckBox_bg2"] = this.getWidget("CheckBox_bg2");
        this["CheckBox_bg2"].addEventListener(this.onClickPz2, this);
        this["CheckBox_bg3"] = this.getWidget("CheckBox_bg3");
        this["CheckBox_bg3"].addEventListener(this.onClickPz3, this);

        this.displayPz();

        this.state1 = PlayerModel.isMusic;
        this.state2 = PlayerModel.isEffect;
        var slider1 = this.getWidget("Slider_7");
        slider1.temp = 1;
        slider1.addEventListener(this.sliderEvent,this);
        slider1.setPercent(this.state1);
        var slider2 = this.getWidget("Slider_8");
        slider2.temp = 2;
        slider2.addEventListener(this.sliderEvent,this);
        slider2.setPercent(this.state2);

        if(LayerManager.isInRoom()){
            this.bgMusic = 2;
        }else{
            this.bgMusic = 1;
        }

        this.Button_music = this.getWidget("Button_music");
        this.Button_effect = this.getWidget("Button_effect");
        UITools.addClickEvent(this.Button_music, this, this.onClickYl);
        UITools.addClickEvent(this.Button_effect, this, this.onClickYx);

        //cc.log("stata1"+this.state1 + "this.state2" +this.state2);
        this.updateBtnState();
    },

    updateBtnState:function(){
        this.Button_effect.setBright(this.state2 != 0);
        this.Button_music.setBright(this.state1 != 0);
    },


    onClickYx:function(){
        if(this.Button_effect.isBright()){
            this.state2 = 0;
        }else{
            this.state2 =  PlayerModel.isMusic;
        }
        this.Button_effect.setBright(!this.Button_effect.isBright());
        AudioManager.setEffectsVolume(this.state2);
        this.getWidget("Slider_8").setPercent(this.state2);
    },

    onClickYl:function(){
        if(this.Button_music.isBright()){
            this.state1 = 0;
        }else{
            this.state1 =  PlayerModel.isEffect;
        }
        this.Button_music.setBright(!this.Button_music.isBright());
        AudioManager.setBgVolume(this.state1);
        this.getWidget("Slider_7").setPercent(this.state1);
    },

    displayPz:function(){
        this.getWidget("CheckBox_bg1").setSelected(this.pz==1);
        this.getWidget("CheckBox_bg2").setSelected(this.pz==2);
        this.getWidget("CheckBox_bg3").setSelected(this.pz==3);
        cc.sys.localStorage.setItem("sy_dtz_pz",this.pz);
        SyEventManager.dispatchEvent(SyEvent.UPDATE_BG_YANSE,this.pz);
    },

    onClickPz1:function(obj,type){
        if (type == ccui.CheckBox.EVENT_SELECTED) {
            this.pz = 1
        }
        if(type == ccui.CheckBox.EVENT_UNSELECTED){
            this.pz = 2
        }
        this.displayPz();
    },

    onClickPz2:function(obj,type){
        if (type == ccui.CheckBox.EVENT_SELECTED) {
            this.pz = 2
        }
        if(type == ccui.CheckBox.EVENT_UNSELECTED){
            this.pz = 3
        }
        this.displayPz();
    },
    onClickPz3:function(obj,type){
        if (type == ccui.CheckBox.EVENT_SELECTED) {
            this.pz = 3
        }
        if(type == ccui.CheckBox.EVENT_UNSELECTED){
            this.pz = 1
        }
        this.displayPz();
    },

    sliderEvent: function (sender, type) {
        if(type==ccui.Slider.EVENT_PERCENT_CHANGED){
            var temp = sender.temp;
            var percent = sender.getPercent();
            var volume = percent/100;
            if(temp==1){
                this.state1 = percent;
                if(this.state1 == 0){
                    this.Button_music.setBright(false);
                }else{
                    this.Button_music.setBright(true);
                }
                AudioManager.setBgVolume(volume);
            }else{
                this.state2 = percent;
                if(this.state2 == 0){
                    this.Button_effect.setBright(false);
                }else{
                    this.Button_effect.setBright(true);
                }
                AudioManager.setEffectsVolume(volume);
            }
        }
    },

    onClose:function(){
        PlayerModel.isMusic = this.state1;
        PlayerModel.isEffect = this.state2;
        PlayerModel.musicType = this.bgMusic;
        AudioManager.reloadFromData(this.state1,this.state2,this.bgMusic);
        sySocket.sendComReqMsg(10,[this.state1,this.state2,this.state1,this.state2,this.bgMusic]);

    },

    getLocalItem:function(key){
        var val = cc.sys.localStorage.getItem(key);
        if(val)
            val = parseInt(val);
        return val;
    },

    addClickEvent:function(widgets,selector){
        for(var key in widgets){
            var widget = this[key] = this.getWidget(key);
            widget.temp = parseInt(widgets[key]);
            UITools.addClickEvent(widget,this,selector);
        }
    },

    getWidget:function(name){
        return ccui.helper.seekWidgetByName(this.root,name);
    },

});

var PDKSetUpPop = BasePopup.extend({
    ctor: function () {
        this._super("res/pdkSetup.json");
    },

    selfRender: function () {

        this.pz = this.getLocalItem("sy_pdk_pz") || 1;

        this["CheckBox_bg1"] = this.getWidget("CheckBox_bg1");
        this["CheckBox_bg1"].addEventListener(this.onClickPz1, this);
        this["CheckBox_bg2"] = this.getWidget("CheckBox_bg2");
        this["CheckBox_bg2"].addEventListener(this.onClickPz2, this);
        this["CheckBox_bg3"] = this.getWidget("CheckBox_bg3");
        this["CheckBox_bg3"].addEventListener(this.onClickPz3, this);

        this.displayPz();

        this.state1 = PlayerModel.isMusic;
        this.state2 = PlayerModel.isEffect;
        var slider1 = this.getWidget("Slider_7");
        slider1.temp = 1;
        slider1.addEventListener(this.sliderEvent,this);
        slider1.setPercent(this.state1);
        var slider2 = this.getWidget("Slider_8");
        slider2.temp = 2;
        slider2.addEventListener(this.sliderEvent,this);
        slider2.setPercent(this.state2);

        if(LayerManager.isInRoom()){
            this.bgMusic = 2;
        }else{
            this.bgMusic = 1;
        }

        this.Button_music = this.getWidget("Button_music");
        this.Button_effect = this.getWidget("Button_effect");
        UITools.addClickEvent(this.Button_music, this, this.onClickYl);
        UITools.addClickEvent(this.Button_effect, this, this.onClickYx);

        //cc.log("stata1"+this.state1 + "this.state2" +this.state2);
        this.updateBtnState();
    },

    updateBtnState:function(){
        this.Button_effect.setBright(this.state2 != 0);
        this.Button_music.setBright(this.state1 != 0);
    },


    onClickYx:function(){
        if(this.Button_effect.isBright()){
            this.state2 = 0;
        }else{
            this.state2 =  PlayerModel.isMusic;
        }
        this.Button_effect.setBright(!this.Button_effect.isBright());
        AudioManager.setEffectsVolume(this.state2);
        this.getWidget("Slider_8").setPercent(this.state2);
    },

    onClickYl:function(){
        if(this.Button_music.isBright()){
            this.state1 = 0;
        }else{
            this.state1 =  PlayerModel.isEffect;
        }
        this.Button_music.setBright(!this.Button_music.isBright());
        AudioManager.setBgVolume(this.state1);
        this.getWidget("Slider_7").setPercent(this.state1);
    },

    displayPz:function(){
        this.getWidget("CheckBox_bg1").setSelected(this.pz==1);
        this.getWidget("CheckBox_bg2").setSelected(this.pz==2);
        this.getWidget("CheckBox_bg3").setSelected(this.pz==3);
        cc.sys.localStorage.setItem("sy_pdk_pz",this.pz);
        SyEventManager.dispatchEvent(SyEvent.UPDATE_BG_YANSE,this.pz);
    },

    onClickPz1:function(obj,type){
        if (type == ccui.CheckBox.EVENT_SELECTED) {
            this.pz = 1
        }
        if(type == ccui.CheckBox.EVENT_UNSELECTED){
            this.pz = 2
        }
        this.displayPz();
    },

    onClickPz2:function(obj,type){
        if (type == ccui.CheckBox.EVENT_SELECTED) {
            this.pz = 2
        }
        if(type == ccui.CheckBox.EVENT_UNSELECTED){
            this.pz = 3
        }
        this.displayPz();
    },
    onClickPz3:function(obj,type){
        if (type == ccui.CheckBox.EVENT_SELECTED) {
            this.pz = 3
        }
        if(type == ccui.CheckBox.EVENT_UNSELECTED){
            this.pz = 1
        }
        this.displayPz();
    },

    sliderEvent: function (sender, type) {
        if(type==ccui.Slider.EVENT_PERCENT_CHANGED){
            var temp = sender.temp;
            var percent = sender.getPercent();
            var volume = percent/100;
            if(temp==1){
                this.state1 = percent;
                if(this.state1 == 0){
                    this.Button_music.setBright(false);
                }else{
                    this.Button_music.setBright(true);
                }
                AudioManager.setBgVolume(volume);
            }else{
                this.state2 = percent;
                if(this.state2 == 0){
                    this.Button_effect.setBright(false);
                }else{
                    this.Button_effect.setBright(true);
                }
                AudioManager.setEffectsVolume(volume);
            }
        }
    },

    onClose:function(){
        PlayerModel.isMusic = this.state1;
        PlayerModel.isEffect = this.state2;
        PlayerModel.musicType = this.bgMusic;
        AudioManager.reloadFromData(this.state1,this.state2,this.bgMusic);
        sySocket.sendComReqMsg(10,[this.state1,this.state2,this.state1,this.state2,this.bgMusic]);

    },

    getLocalItem:function(key){
        var val = cc.sys.localStorage.getItem(key);
        if(val)
            val = parseInt(val);
        return val;
    },

    addClickEvent:function(widgets,selector){
        for(var key in widgets){
            var widget = this[key] = this.getWidget(key);
            widget.temp = parseInt(widgets[key]);
            UITools.addClickEvent(widget,this,selector);
        }
    },

    getWidget:function(name){
        return ccui.helper.seekWidgetByName(this.root,name);
    },

});

var MjSetUpPop = BasePopup.extend({
    ctor: function () {
        this._super("res/mjSetup.json");
    },

    selfRender: function () {

        this.pp = parseInt(this.getLocalItem("sy_mj_pp"+MJRoomModel.wanfa))||this.getLocalItem("sy_mj_pp") || 1;
        this.pm = parseInt(this.getLocalItem("sy_mj_pm"+MJRoomModel.wanfa))||this.getLocalItem("sy_mj_pm") || 1;
        this.pz = parseInt(this.getLocalItem("sy_mj_pz"+MJRoomModel.wanfa))||this.getLocalItem("sy_mj_pz") || 2;

        this["CheckBox_bg1"] = this.getWidget("CheckBox_bg1");
        this["CheckBox_bg1"].addEventListener(this.onClickPz1, this);
        this["CheckBox_bg2"] = this.getWidget("CheckBox_bg2");
        this["CheckBox_bg2"].addEventListener(this.onClickPz2, this);
        this["CheckBox_bg3"] = this.getWidget("CheckBox_bg3");
        this["CheckBox_bg3"].addEventListener(this.onClickPz3, this);
        this["CheckBox_pm1"] = this.getWidget("CheckBox_pm1");
        this["CheckBox_pm1"].addEventListener(this.onClickPm1, this);
        this["CheckBox_pm2"] = this.getWidget("CheckBox_pm2");
        this["CheckBox_pm2"].addEventListener(this.onClickPm2, this);
        this["CheckBox_pm3"] = this.getWidget("CheckBox_pm3");
        // this["CheckBox_pm3"].visible = false;
        this["CheckBox_pm3"].addEventListener(this.onClickPm3, this);
        this["CheckBox_pp1"] = this.getWidget("CheckBox_pp1");
        this["CheckBox_pp1"].addEventListener(this.onClickPp1, this);
        this["CheckBox_pp2"] = this.getWidget("CheckBox_pp2");
        this["CheckBox_pp2"].addEventListener(this.onClickPp2, this);
        this["CheckBox_pp3"] = this.getWidget("CheckBox_pp3");
        this["CheckBox_pp3"].addEventListener(this.onClickPp3, this);
        // this["CheckBox_pp3"].visible = false;


        this.displayPz();
        this.displayPm();
        this.displayPp();


        this.state1 = PlayerModel.isMusic;
        this.state2 = PlayerModel.isEffect;
        var slider1 = this.getWidget("Slider_7");
        slider1.temp = 1;
        slider1.addEventListener(this.sliderEvent,this);
        slider1.setPercent(this.state1);
        var slider2 = this.getWidget("Slider_8");
        slider2.temp = 2;
        slider2.addEventListener(this.sliderEvent,this);
        slider2.setPercent(this.state2);

        if(LayerManager.isInRoom()){
            this.bgMusic = 2;
        }else{
            this.bgMusic = 1;
        }

        this.Button_music = this.getWidget("Button_music");
        this.Button_effect = this.getWidget("Button_effect");
        UITools.addClickEvent(this.Button_music, this, this.onClickYl);
        UITools.addClickEvent(this.Button_effect, this, this.onClickYx);

        //cc.log("stata1"+this.state1 + "this.state2" +this.state2);
        this.updateBtnState();
    },

    updateBtnState:function(){
        this.Button_effect.setBright(this.state2 != 0);
        this.Button_music.setBright(this.state1 != 0);
    },


    onClickYx:function(){
        if(this.Button_effect.isBright()){
            this.state2 = 0;
        }else{
            this.state2 =  PlayerModel.isMusic;
        }
        this.Button_effect.setBright(!this.Button_effect.isBright());
        AudioManager.setEffectsVolume(this.state2);
        this.getWidget("Slider_8").setPercent(this.state2);
    },

    onClickYl:function(){
        if(this.Button_music.isBright()){
            this.state1 = 0;
        }else{
            this.state1 =  PlayerModel.isEffect;
        }
        this.Button_music.setBright(!this.Button_music.isBright());
        AudioManager.setBgVolume(this.state1);
        this.getWidget("Slider_7").setPercent(this.state1);
    },

    displayPz:function(){
        this.getWidget("CheckBox_bg1").setSelected(this.pz==1);
        this.getWidget("CheckBox_bg2").setSelected(this.pz==2);
        this.getWidget("CheckBox_bg3").setSelected(this.pz==3);
        cc.sys.localStorage.setItem("sy_mj_pz"+MJRoomModel.wanfa,this.pz);
        SyEventManager.dispatchEvent(SyEvent.UPDATE_BG_YANSE,this.pz);
    },

    displayPm:function(){
        this.getWidget("CheckBox_pm1").setSelected(this.pm==1);
        this.getWidget("CheckBox_pm2").setSelected(this.pm==2);
        this.getWidget("CheckBox_pm3").setSelected(this.pm==3);
        cc.sys.localStorage.setItem("sy_mj_pm"+MJRoomModel.wanfa,this.pm);
        SyEventManager.dispatchEvent(SyEvent.CHANGE_MJ_CARDS,this.pm);
    },
    displayPp:function(){
        this.getWidget("CheckBox_pp1").setSelected(this.pp==1);
        this.getWidget("CheckBox_pp2").setSelected(this.pp==2);
        this.getWidget("CheckBox_pp3").setSelected(this.pp==3);
        cc.sys.localStorage.setItem("sy_mj_pp"+MJRoomModel.wanfa,this.pp);
        SyEventManager.dispatchEvent(SyEvent.CHANGE_MJ_BG,this.pp);
    },
    onClickPz1:function(obj,type){
        if (type == ccui.CheckBox.EVENT_SELECTED) {
            this.pz = 1
        }
        if(type == ccui.CheckBox.EVENT_UNSELECTED){
            this.pz = 2
        }
        this.displayPz();
    },

    onClickPz2:function(obj,type){
        if (type == ccui.CheckBox.EVENT_SELECTED) {
            this.pz = 2
        }
        if(type == ccui.CheckBox.EVENT_UNSELECTED){
            this.pz = 3
        }
        this.displayPz();
    },
    onClickPz3:function(obj,type){
        if (type == ccui.CheckBox.EVENT_SELECTED) {
            this.pz = 3
        }
        if(type == ccui.CheckBox.EVENT_UNSELECTED){
            this.pz = 1
        }
        this.displayPz();
    },

    onClickPm1:function(obj,type){
        if (type == ccui.CheckBox.EVENT_SELECTED) {
            this.pm = 1
        }
        if(type == ccui.CheckBox.EVENT_UNSELECTED){
            this.pm = 2
        }
        this.displayPm();
    },
    onClickPm2:function(obj,type){
        if (type == ccui.CheckBox.EVENT_SELECTED) {
            this.pm = 2
        }
        if(type == ccui.CheckBox.EVENT_UNSELECTED){
            this.pm = 3
        }
        this.displayPm();
    },
    onClickPm3:function(obj,type){
        if (type == ccui.CheckBox.EVENT_SELECTED) {
            this.pm = 3
        }
        if(type == ccui.CheckBox.EVENT_UNSELECTED){
            this.pm = 1
        }
        this.displayPm();
    },
    onClickPp1:function(obj,type){
        if (type == ccui.CheckBox.EVENT_SELECTED) {
            this.pp = 1
        }
        if(type == ccui.CheckBox.EVENT_UNSELECTED){
            this.pp = 2
        }
        this.displayPp();
    },
    onClickPp2:function(obj,type){
        if (type == ccui.CheckBox.EVENT_SELECTED) {
            this.pp = 2
        }
        if(type == ccui.CheckBox.EVENT_UNSELECTED){
            this.pp = 3
        }
        this.displayPp();
    },
    onClickPp3:function(obj,type){
        if (type == ccui.CheckBox.EVENT_SELECTED) {
            this.pp = 3
        }
        if(type == ccui.CheckBox.EVENT_UNSELECTED){
            this.pp = 1
        }
        this.displayPp();
    },
    sliderEvent: function (sender, type) {
        if(type==ccui.Slider.EVENT_PERCENT_CHANGED){
            var temp = sender.temp;
            var percent = sender.getPercent();
            var volume = percent/100;
            if(temp==1){
                this.state1 = percent;
                if(this.state1 == 0){
                    this.Button_music.setBright(false);
                }else{
                    this.Button_music.setBright(true);
                }
                AudioManager.setBgVolume(volume);
            }else{
                this.state2 = percent;
                if(this.state2 == 0){
                    this.Button_effect.setBright(false);
                }else{
                    this.Button_effect.setBright(true);
                }
                AudioManager.setEffectsVolume(volume);
            }
        }
    },

    onClose:function(){
        PlayerModel.isMusic = this.state1;
        PlayerModel.isEffect = this.state2;
        PlayerModel.musicType = this.bgMusic;
        AudioManager.reloadFromData(this.state1,this.state2,this.bgMusic);
        sySocket.sendComReqMsg(10,[this.state1,this.state2,this.state1,this.state2,this.bgMusic]);

    },

    getLocalItem:function(key){
        var val = cc.sys.localStorage.getItem(key);
        if(val)
            val = parseInt(val);
        return val;
    },

    addClickEvent:function(widgets,selector){
        for(var key in widgets){
            var widget = this[key] = this.getWidget(key);
            widget.temp = parseInt(widgets[key]);
            UITools.addClickEvent(widget,this,selector);
        }
    },

    getWidget:function(name){
        return ccui.helper.seekWidgetByName(this.root,name);
    },

});