/**
 * Created by leiwenwen on 2019/5/24.
 */
var CreateRoomHZMJ = BasePopup.extend({
    ctor: function (isSaveChoose, wanfaList, isLeaderPay) {
        this.isClubSaveConfig = isSaveChoose || false;
        this.wanfaList = wanfaList;
        this.isLeaderPay = isLeaderPay || false;
        this._super("res/createRoomHZMJ.json");
    },

    saveConfig: function () {
        //cc.log("this.hzJushu===========",this.hzJushu)
        cc.sys.localStorage.setItem("sy_hzmj_costWay", this.hzCostWay);
        cc.sys.localStorage.setItem("sy_hzmj_jushu", this.hzJushu);
        cc.sys.localStorage.setItem("sy_hzmj_khqd", this.hzKhqd);
        cc.sys.localStorage.setItem("sy_hzmj_zhuangxian", this.hzZhuangXian);
        cc.sys.localStorage.setItem("sy_hzmj_renshu", this.hzRenshu);
        cc.sys.localStorage.setItem("sy_hzmj_niaoway", this.hzNiaoway);
        var hzdph = 0;
        if (this.hzZmh == 0) {
            hzdph = 1;
        }
        cc.sys.localStorage.setItem("sy_hzmj_piaofen", this.hzPiaoFen);
        cc.sys.localStorage.setItem("sy_hzmj_ypbh", this.hzYpbh);
        cc.sys.localStorage.setItem("sy_hzmj_niao", this.hzNiao);
        cc.sys.localStorage.setItem("sy_hzmj_qgh", this.hzQgh);
        cc.sys.localStorage.setItem("sy_hzmj_qghbsj", this.hzQghbsj);
        cc.sys.localStorage.setItem("sy_hzmj_tuoguan", this.hzTuoguan);
        cc.sys.localStorage.setItem("sy_hzmj_isDouble", this.hzIsDouble);
        cc.sys.localStorage.setItem("sy_hzmj_dScore", this.hzDScore);
        cc.sys.localStorage.setItem("sy_hzmj_doubleNum", this.hzDoubleNum);
        cc.sys.localStorage.setItem("sy_hzmj_ynqz", this.hzYnqz);
        cc.sys.localStorage.setItem("sy_hzmj_niaofen", this.hzNiaoFen);
    },

    getWanfas: function () {
        var wanfas = [MJWanfaType.HZMJ, this.hzCostWay, this.hzJushu, this.hzRenshu];
        return wanfas;
    },

    selfRender: function () {
        this.getWanfaRecord();

        this.Panel_double = this.getWidget("Panel_double");
        this.Panel_times = this.getWidget("Panel_times");

        var btn = this.Button_17 = this.getWidget("Button_140");
        UITools.addClickEvent(btn, this, this.onDaiCreate);
        var btn = this.Button_17 = this.getWidget("Button_143");
        UITools.addClickEvent(btn, this, this.onDaiKaiList);


        this.widget_fangfei = {
            "btn_fangfei_1": 1,
            "btn_fangfei_2": 2,
            "btn_fangfei_3": 3,
            "txt_fangfei_1": 1,
            "txt_fangfei_2": 2,
            "txt_fangfei_3": 3
        };
        this.getWidget("txt_fangfei_" + 3).visible = this.getWidget("btn_fangfei_" + 3).visible = false;
        if (this.isClubSaveConfig) {
            if (this.isLeaderPay) {
                this.getWidget("txt_fangfei_3").x = this.getWidget("txt_fangfei_1").x;
                this.getWidget("btn_fangfei_3").x = this.getWidget("btn_fangfei_1").x;
                this.getWidget("txt_fangfei_" + 3).visible = this.getWidget("btn_fangfei_" + 3).visible = true;
                this.hzCostWay = 3;
                for (var i = 1; i <= 2; i++) {
                    this.getWidget("txt_fangfei_" + i).visible = this.getWidget("btn_fangfei_" + i).visible = false;
                }
            }
        }

        this.addClickEvent(this.widget_fangfei, this.onCostWayClick);
        this.displayCostWay();

        //??????
        var widget_jushu = {
            "btn_jushu_1": 1,
            "btn_jushu_2": 2,
            "txt_jushu_1": 1,
            "txt_jushu_2": 2,
            "btn_jushu_3": 3,
            "txt_jushu_3": 3,
            "btn_jushu_4": 4,
            "txt_jushu_4": 4
        };
        this.addClickEvent(widget_jushu, this.onJushuClick);
        this.displayJushu();

        //??????
        var widget_renshu = {
            "btn_renshu_1": 1,
            "btn_renshu_2": 2,
            "txt_renshu_1": 1,
            "txt_renshu_2": 2,
            "btn_renshu_3": 3,
            "txt_renshu_3": 3
        };
        this.addClickEvent(widget_renshu, this.onRenshuClick);
        this.displayRenshu();


        //??????159??????
        var widget159Niao = {"btn_wanfa_1": 1, "txt_wanfa_1": 1};
        this.addClickEvent(widget159Niao, this.onNiaoWayClick);
        this.displayNiaoWay();


        //??????
        var widget_niao = {
            "btn_niao_1": 1, "btn_niao_2": 2, "btn_niao_3": 3, "btn_niao_4": 4,
            "txt_niao_1": 1, "txt_niao_2": 2, "txt_niao_3": 3, "txt_niao_4": 4
        };
        this.addClickEvent(widget_niao, this.onNiaoClick);
        this.displayNiao();

        //??????????????????
        var widget159Niao = {"btn_niao_5": 1, "txt_niao_5": 1};
        this.addClickEvent(widget159Niao, this.onYnqzClick);
        this.displayYnqz();

        //????????????????????????
        var widgetZhuang = {"btn_kexuan_1": 1, "txt_kexuan_1": 1};
        this.addClickEvent(widgetZhuang, this.onZhuangClick);
        this.displayZhuang();

        //???????????????
        var widgetDph = {"btn_kexuan_2": 1, "txt_kexuan_2": 1};
        this.addClickEvent(widgetDph, this.onDphClick);
        this.displayDph();

        //??????????????????
        var widgetQiDui = {"btn_kexuan_6": 1, "txt_kexuan_6": 1};
        this.addClickEvent(widgetQiDui, this.onQiDuiClick);
        this.displayQiDui();

        //????????????????????????
        var widgetQghbsj = {"btn_kexuan_4": 1, "txt_kexuan_4": 1};
        this.addClickEvent(widgetQghbsj, this.onQghbsjClick);
        this.displayQghbsj();

        //??????????????????
        var widgetYpbh = {"btn_kexuan_5": 1, "txt_kexuan_5": 1};
        this.addClickEvent(widgetYpbh, this.onYpbhClick);
        this.displayYpbh();

        //???????????????
        var widgetQgh = {"btn_kexuan_3": 1, "txt_kexuan_3": 1};
        this.addClickEvent(widgetQgh, this.onQghClick);
        this.displayQgh();

        //????????????
        var widgetPiaoFen = {"btn_kexuan_7": 1, "txt_kexuan_7": 1};
        this.addClickEvent(widgetPiaoFen, this.onPiaoFenClick);
        this.displayPiaoFen();

        //????????????
        var widgetTuoguan = {"btn_kexuan_8": 1, "txt_kexuan_8": 1};
        this.addClickEvent(widgetTuoguan, this.onTuoguanClick);
        this.displayTuoguan();

        //this.btn_kexuan_8.visible = this.txt_kexuan_8.visible = false;


        var widgetNiaoFen = {"Button_niaofen1": 1, "Button_niaofen2": 2, "Label_niaofen1": 1, "Label_niaofen2": 2};
        this.addClickEvent(widgetNiaoFen, this.onNiaoFenClick);
        this.displayNiaoFen();

        var widgetDouble = {"Button_double1": 1, "Button_double2": 2, "Label_double1": 1, "Label_double2": 2};
        this.addClickEvent(widgetDouble, this.onDoubleClick);
        this.displayDouble();

        var widgetsTimes = {
            "btn_times1": 1,
            "txt_times1": 1,
            "btn_times2": 2,
            "txt_times2": 2,
            "btn_times3": 3,
            "txt_times3": 3
        };
        this.addClickEvent(widgetsTimes, this.onTimesClick);
        this.displayTimes();


        var widgetChange = {"Button_reduce": 1, "Button_add": 2};
        this.addClickEvent(widgetChange, this.onChangeScoreClick);
        this.displayChangeScore();

        if (SdkUtil.isYYBReview()) {
            this.getWidget("Panel_FangFei").visible = false;
            //this.getWidget("Panel_jushu").y += 70;
            //this.getWidget("Panel_kuxuan").y += 70;
            //this.getWidget("Panel_renshu").y += 70;
            //this.getWidget("Label_18").visible = false;
        }
    },

    getWanfaRecord: function () {
        if (this.isClubSaveConfig && this.wanfaList.length > 0) {
            var wanfaList = [];
            for (var index = 0; index < this.wanfaList.length; index++) {
                wanfaList[index] = parseInt(this.wanfaList[index]);
            }
            var costWay = wanfaList[2] || 1;
            this.hzCostWay = costWay;
            this.hzJushu = wanfaList[0] || 8;
            this.hzRenshu = wanfaList[7] || 4;
            this.hzNiaoway = wanfaList[19] || 0;
            this.hzYnqz = wanfaList[12] || 0;
            this.hzNiao = wanfaList[3] || 0;
            this.hzDifen = 1;
            this.hzZhuangXian = wanfaList[5] || 0;
            this.hzKhqd = wanfaList[6] || 0;
            this.hzQgh = wanfaList[9] || 0;
            this.hzQghbsj = wanfaList[10] || 0;
            this.hzYpbh = wanfaList[15] || 0;
            if (wanfaList[4] == 0) {
                this.hzZmh = 0;
            } else {
                this.hzZmh = 1;
            }
            this.hzPiaoFen = wanfaList[17] || 0;
            this.hzTuoguan = wanfaList[8] || 0;
            this.hzIsDouble = wanfaList[20] || 0;
            this.hzDScore = wanfaList[21] || 5;
            this.hzDoubleNum = wanfaList[22] || 2;
            this.hzNiaoFen = wanfaList[14] || 1;
        } else {
            var costWay = this.getLocalItem("sy_hzmj_costWay") || 1;
            this.hzCostWay = costWay;
            this.hzJushu = this.getLocalItem("sy_hzmj_jushu") || 8;
            this.hzRenshu = this.getLocalItem("sy_hzmj_renshu") || 4;
            this.hzNiaoway = this.getLocalItem("sy_hzmj_niaoway") || 0;
            this.hzNiao = this.getLocalItem("sy_hzmj_niao") || 0;
            this.hzDifen = 1;
            this.hzZhuangXian = this.getLocalItem("sy_hzmj_zhuangxian") || 0;
            this.hzKhqd = this.getLocalItem("sy_hzmj_khqd") || 0;
            this.hzQgh = this.getLocalItem("sy_hzmj_qgh") || 0;
            this.hzQghbsj = this.getLocalItem("sy_hzmj_qghbsj") || 0;
            this.hzYpbh = this.getLocalItem("sy_hzmj_ypbh") || 0;
            if (this.getLocalItem("sy_hzmj_hzdph") == 1) {
                this.hzZmh = 0;
            } else {
                this.hzZmh = 1;
            }
            //cc.log("this.hzZmh=============",this.hzZmh)
            this.hzPiaoFen = this.getLocalItem("sy_hzmj_piaofen") || 0;
            this.hzTuoguan = this.getLocalItem("sy_hzmj_tuoguan") || 0;
            this.hzIsDouble = this.getLocalItem("sy_hzmj_isDouble") || 0;
            this.hzDScore = this.getLocalItem("sy_hzmj_dScore") || 5;
            this.hzDoubleNum = this.getLocalItem("sy_hzmj_doubleNum") || 2;
            this.hzYnqz = this.getLocalItem("sy_hzmj_ynqz") || 0;
            this.hzNiaoFen = this.getLocalItem("sy_hzmj_niaofen") || 1;
        }
    },

    //??????????????????AA??????
    onCostWayClick: function (obj) {
        var temp = parseInt(obj.temp);
        var values = [1, 2, 3];
        for (var i = 1; i <= values.length; i++) {
            if (i != temp) {
                this["btn_fangfei_" + i].setBright(false);
                this.getWidget("txt_fangfei_" + i).setColor(cc.color("ffffff"));
            }
        }
        var btn = this["btn_fangfei_" + temp];
        this.getWidget("txt_fangfei_" + temp).setColor(cc.color("d91010"));
        btn.setBright(true);

        this.hzCostWay = obj.temp;

        this.updateCostDiamond();

    },

    displayCostWay: function () {
        var values = [1, 2, 3];
        for (var i = 1; i <= values.length; i++) {
            var btn = this["btn_fangfei_" + i];
            btn.setBright(false);
            if (this.hzCostWay == values[i - 1] && !btn.isBright())
                this.onCostWayClick(btn);
        }
    },

    onNiaoWayClick: function () {
        var btn = this["btn_wanfa_1"];
        var txt = this["txt_wanfa_1"];
        if (this.hzNiao == 0) {
            this.hzNiaoway = 0;
            txt.setColor(cc.color("ffffff"));
            btn.setBright(false);
        } else {
            this.hzNiaoway = 1;
            txt.setColor(cc.color("d91010"));
            btn.setBright(true);
        }
    },

    displayNiaoWay: function () {
        var btn = this["btn_wanfa_1"];
        var txt = this["txt_wanfa_1"];
        if (this.hzNiao) {
            this.hzNiaoway = 1;
            txt.setColor(cc.color("d91010"));
            btn.setBright(true);
        } else {
            this.hzNiaoway = 0;
            txt.setColor(cc.color("ffffff"));
            btn.setBright(false);
        }
    },

    onYnqzClick: function () {
        var btn = this.getWidget("btn_niao_5");
        var txt = this.getWidget("txt_niao_5");
        this.hzYnqz = 1;
        txt.setColor(cc.color("d91010"));
        btn.setBright(true);
        this.hzNiao = 0;
        for (var i = 1; i <= 4; i++) {
            this.getWidget("btn_niao_" + i).setBright(false);
            this.getWidget("txt_niao_" + i).setColor(cc.color("ffffff"));
        }
        this.displayNiaoWay();
    },

    displayYnqz: function () {
        var btn = this.getWidget("btn_niao_5");
        var txt = this.getWidget("txt_niao_5");
        if (this.hzYnqz) {
            this.hzYnqz = 1;
            this.hzNiao = 0;
            for (var i = 1; i <= 4; i++) {
                this.getWidget("btn_niao_" + i).setBright(false);
                this.getWidget("txt_niao_" + i).setColor(cc.color("ffffff"));
            }
            this.displayNiaoWay();
            txt.setColor(cc.color("d91010"));
            btn.setBright(true);
        } else {
            this.hzYnqz = 0;
            txt.setColor(cc.color("ffffff"));
            btn.setBright(false);
        }
    },

    onNiaoClick: function (obj) {
        var temp = parseInt(obj.temp);
        var values = [0, 2, 4, 6];
        for (var i = 1; i <= values.length; i++) {
            if (i != temp) {
                this.getWidget("btn_niao_" + i).setBright(false);
                this.getWidget("txt_niao_" + i).setColor(cc.color("ffffff"));
            }
        }
        var btn = this.getWidget("btn_niao_" + temp);
        this.getWidget("txt_niao_" + temp).setColor(cc.color("d91010"));
        btn.setBright(true);
        this.hzNiao = values[temp - 1];
        this.displayNiaoWay();
        this.hzYnqz = 0;
        this.displayYnqz();
    },

    displayNiao: function () {
        var values = [0, 2, 4, 6];
        for (var i = 1; i <= values.length; i++) {
            var btn = this.getWidget("btn_niao_" + i);
            btn.setBright(false);
            if (this.hzNiao == values[i - 1]) {
                this.getWidget("btn_niao_" + i).setBright(true);
                this.getWidget("txt_niao_" + i).setColor(cc.color("d91010"));
            } else {
                this.getWidget("btn_niao_" + i).setBright(false);
                this.getWidget("txt_niao_" + i).setColor(cc.color("ffffff"));
            }
        }
    },

    onJushuClick: function (obj) {
        var temp = parseInt(obj.temp);
        var values = [1,8, 12, 16];
        for (var i = 1; i <= values.length; i++) {
            if (i != temp) {
                this["btn_jushu_" + i].setBright(false);
                this["txt_jushu_" + i].setColor(cc.color("ffffff"));
            }
        }
        var btn = this["btn_jushu_" + temp];
        btn.setBright(true);
        this["txt_jushu_" + temp].setColor(cc.color("d91010"));
        this.hzJushu = values[temp - 1];
        this.updateCostDiamond();
    },


    displayJushu: function () {
        var values = [1,8, 12, 16];
        //cc.log("this.hzJushu===",this.hzJushu)
        for (var i = 1; i <= values.length; i++) {
            var btn = this["btn_jushu_" + i];
            btn.setBright(false);
            if (this.hzJushu == values[i - 1] && !btn.isBright())
                this.onJushuClick(btn);
        }
    },

    onRenshuClick: function (obj) {
        var temp = parseInt(obj.temp);
        var values = [4, 3, 2];
        for (var i = 1; i <= values.length; i++) {
            if (i != temp) {
                this["btn_renshu_" + i].setBright(false);
                this["txt_renshu_" + i].setColor(cc.color("ffffff"));
            }
        }
        var btn = this["btn_renshu_" + temp];
        btn.setBright(true);
        this["txt_renshu_" + temp].setColor(cc.color("d91010"));
        this.hzRenshu = values[temp - 1];

        if (this.hzRenshu == 2) {
            this.getWidget("Panel_double").visible = true;
            if (this.hzIsDouble && parseInt(this.hzIsDouble)) {
                this.getWidget("Image_double").visible = true;
                this.getWidget("Panel_times").visible = true;
            }
        } else {
            this.getWidget("Panel_double").visible = false;
            this.getWidget("Panel_times").visible = false;
        }

        this.updateCostDiamond();
    },


    displayRenshu: function () {
        var values = [4, 3, 2];
        for (var i = 1; i <= values.length; i++) {
            var btn = this["btn_renshu_" + i];
            btn.setBright(false);
            if (this.hzRenshu == values[i - 1] && !btn.isBright())
                this.onRenshuClick(btn);
        }
    },

    onZhuangClick: function () {
        var btn = this["btn_kexuan_1"];
        var txt = this["txt_kexuan_1"];
        if (btn.isBright()) {
            txt.setColor(cc.color("ffffff"));
            btn.setBright(false);
            this.hzZhuangXian = 0;
        } else {
            txt.setColor(cc.color("d91010"));
            btn.setBright(true);
            this.hzZhuangXian = 1;
        }
    },

    displayZhuang: function () {
        var btn = this["btn_kexuan_1"];
        var txt = this["txt_kexuan_1"];
        if (this.hzZhuangXian == 1) {
            txt.setColor(cc.color("d91010"));
            btn.setBright(true);
        } else {
            txt.setColor(cc.color("ffffff"));
            btn.setBright(false);
        }
    },

    onDphClick: function () {
        var btn = this["btn_kexuan_2"];
        var txt = this["txt_kexuan_2"];
        if (btn.isBright()) {
            txt.setColor(cc.color("ffffff"));
            btn.setBright(false);
            this.hzZmh = 1;
            this.hzYpbh = 0;
            this.displayYpbh();
        } else {
            txt.setColor(cc.color("d91010"));
            btn.setBright(true);
            this.hzZmh = 0;
        }
        cc.log("this.hzZmh", this.hzZmh)
    },

    displayDph: function () {
        var btn = this["btn_kexuan_2"];
        var txt = this["txt_kexuan_2"];
        if (this.hzZmh == 0) {
            txt.setColor(cc.color("d91010"));
            btn.setBright(true);
        } else {
            txt.setColor(cc.color("ffffff"));
            btn.setBright(false);
        }
    },

    onQiDuiClick: function () {
        var btn = this["btn_kexuan_6"];
        var txt = this["txt_kexuan_6"];
        if (btn.isBright()) {
            txt.setColor(cc.color("ffffff"));
            btn.setBright(false);
            this.hzKhqd = 0;
        } else {
            txt.setColor(cc.color("d91010"));
            btn.setBright(true);
            this.hzKhqd = 1;
        }
    },

    displayQiDui: function () {
        var btn = this["btn_kexuan_6"];
        var txt = this["txt_kexuan_6"];
        if (this.hzKhqd == 1) {
            txt.setColor(cc.color("d91010"));
            btn.setBright(true);
        } else {
            txt.setColor(cc.color("ffffff"));
            btn.setBright(false);
        }
    },

    onQghClick: function () {
        var btn = this["btn_kexuan_3"];
        var txt = this["txt_kexuan_3"];
        if (btn.isBright()) {
            txt.setColor(cc.color("ffffff"));
            btn.setBright(false);
            this.hzQgh = 0;
        } else {
            txt.setColor(cc.color("d91010"));
            btn.setBright(true);
            this.hzQgh = 1;
        }
    },

    displayQgh: function () {
        var btn = this["btn_kexuan_3"];
        var txt = this["txt_kexuan_3"];
        if (this.hzQgh == 1) {
            txt.setColor(cc.color("d91010"));
            btn.setBright(true);
        } else {
            txt.setColor(cc.color("ffffff"));
            btn.setBright(false);
            this.hzYpbh = 0;
        }
    },

    onQghbsjClick: function () {
        var btn = this["btn_kexuan_4"];
        var txt = this["txt_kexuan_4"];
        if (btn.isBright()) {
            txt.setColor(cc.color("ffffff"));
            btn.setBright(false);
            this.hzQghbsj = 0;
        } else {
            txt.setColor(cc.color("d91010"));
            btn.setBright(true);
            this.hzQghbsj = 1;
        }
    },

    displayQghbsj: function () {
        var btn = this["btn_kexuan_4"];
        var txt = this["txt_kexuan_4"];
        if (this.hzQghbsj == 1) {
            txt.setColor(cc.color("d91010"));
            btn.setBright(true);
        } else {
            txt.setColor(cc.color("ffffff"));
            btn.setBright(false);
        }
    },

    onYpbhClick: function () {
        var btn = this["btn_kexuan_5"];
        var txt = this["txt_kexuan_5"];
        if (btn.isBright() || this.hzZmh) {
            txt.setColor(cc.color("ffffff"));
            btn.setBright(false);
            this.hzYpbh = 0;
        } else {
            txt.setColor(cc.color("d91010"));
            btn.setBright(true);
            this.hzYpbh = 1;
        }
    },

    displayYpbh: function () {
        var btn = this["btn_kexuan_5"];
        var txt = this["txt_kexuan_5"];
        if (this.hzYpbh == 1 && !this.hzZmh) {
            txt.setColor(cc.color("d91010"));
            btn.setBright(true);
        } else {
            txt.setColor(cc.color("ffffff"));
            btn.setBright(false);
        }
    },

    //??????
    onPiaoFenClick: function () {
        var btn = this["btn_kexuan_7"];
        var txt = this["txt_kexuan_7"];
        if (btn.isBright()) {
            txt.setColor(cc.color("ffffff"));
            btn.setBright(false);
            this.hzPiaoFen = 0;
        } else {
            txt.setColor(cc.color("d91010"));
            btn.setBright(true);
            this.hzPiaoFen = 1;
        }
    },

    displayPiaoFen: function () {
        var btn = this["btn_kexuan_7"];
        var txt = this["txt_kexuan_7"];
        if (this.hzPiaoFen == 1) {
            txt.setColor(cc.color("d91010"));
            btn.setBright(true);
        } else {
            txt.setColor(cc.color("ffffff"));
            btn.setBright(false);
        }
    },

    //
    onTuoguanClick: function () {
        var btn = this["btn_kexuan_8"];
        var txt = this["txt_kexuan_8"];
        if (btn.isBright()) {
            txt.setColor(cc.color("ffffff"));
            btn.setBright(false);
            this.hzTuoguan = 0;
        } else {
            txt.setColor(cc.color("d91010"));
            btn.setBright(true);
            this.hzTuoguan = 1;
        }
    },

    displayTuoguan: function () {
        var btn = this["btn_kexuan_8"];
        var txt = this["txt_kexuan_8"];
        if (this.hzTuoguan == 1) {
            txt.setColor(cc.color("d91010"));
            btn.setBright(true);
        } else {
            txt.setColor(cc.color("ffffff"));
            btn.setBright(false);
        }
    },

    onNiaoFenClick: function (obj) {
        var temp = parseInt(obj.temp);
        var values = [1, 2];
        for (var i = 1; i <= values.length; i++) {
            var btn = this["Button_niaofen" + i];
            var txt = this["Label_niaofen" + i];
            if (temp == i) {
                txt.setColor(cc.color(cc.color("d91010")));
                btn.setBright(true);
            } else {
                txt.setColor(cc.color(cc.color("ffffff")));
                btn.setBright(false);
            }
        }
        this.hzNiaoFen = values[temp - 1];
    },

    displayNiaoFen: function () {
        var values = [1, 2];
        for (var i = 1; i <= values.length; i++) {
            var btn = this["Button_niaofen" + i];
            var txt = this["Label_niaofen" + i];
            if (this.hzNiaoFen == values[i - 1]) {
                txt.setColor(cc.color(cc.color("d91010")));
                btn.setBright(true);
            } else {
                txt.setColor(cc.color(cc.color("ffffff")));
                btn.setBright(false);
            }
        }
    },


    onDoubleClick: function (obj) {
        var temp = parseInt(obj.temp);
        var values = [0, 1];
        for (var i = 1; i <= values.length; i++) {
            var btn = this["Button_double" + i];
            var txt = this["Label_double" + i];
            if (temp == i) {
                txt.setColor(cc.color(cc.color("d91010")));
                btn.setBright(true);
            } else {
                txt.setColor(cc.color(cc.color("ffffff")));
                btn.setBright(false);
            }
        }
        this.hzIsDouble = values[temp - 1];

        if (this.hzIsDouble && parseInt(this.hzIsDouble) && this.hzRenshu == 2) {
            this.getWidget("Image_double").visible = true;
            this.getWidget("Panel_times").visible = true;
        } else {
            this.getWidget("Image_double").visible = false;
            this.getWidget("Panel_times").visible = false;
        }
    },

    displayDouble: function () {
        var values = [0, 1];
        for (var i = 1; i <= values.length; i++) {
            var btn = this["Button_double" + i];
            var txt = this["Label_double" + i];
            if (this.hzIsDouble == values[i - 1]) {
                txt.setColor(cc.color(cc.color("d91010")));
                btn.setBright(true);
            } else {
                txt.setColor(cc.color(cc.color("ffffff")));
                btn.setBright(false);
            }
        }

        cc.log("this.hzIsDouble", this.hzIsDouble, this.hzRenshu);
        if (this.hzIsDouble && parseInt(this.hzIsDouble) && this.hzRenshu == 2) {
            this.getWidget("Image_double").visible = true;
            this.getWidget("Panel_times").visible = true;
        } else {
            this.getWidget("Image_double").visible = false;
            this.getWidget("Panel_times").visible = false;
        }
    },

    onTimesClick: function (obj) {
        var temp = parseInt(obj.temp);
        var values = [2, 3, 4];
        for (var i = 1; i <= values.length; i++) {
            var btn = this["btn_times" + i];
            var txt = this["txt_times" + i];
            if (temp == i) {
                txt.setColor(cc.color(cc.color("d91010")));
                btn.setBright(true);
            } else {
                txt.setColor(cc.color(cc.color("ffffff")));
                btn.setBright(false);
            }
        }
        this.hzDoubleNum = values[temp - 1];
        //cc.log("this.hzDoubleNum==="+this.hzDoubleNum)
    },

    displayTimes: function () {
        var values = [2, 3, 4];
        for (var i = 1; i <= values.length; i++) {
            var btn = this["btn_times" + i];
            var txt = this["txt_times" + i];
            if (this.hzDoubleNum == values[i - 1]) {
                txt.setColor(cc.color(cc.color("d91010")));
                btn.setBright(true);
            } else {
                txt.setColor(cc.color(cc.color("ffffff")));
                btn.setBright(false);
            }
        }
    },


    onChangeScoreClick: function (obj) {
        var temp = parseInt(obj.temp);
        var num = this.hzDScore;
        if (temp == 1) {
            if (this.hzDScore == 10) {
                num = 5;
            } else {
                num = num - 10;
            }
        } else {
            if (this.hzDScore == 5) {
                num = 10;
            } else {
                num = num + 10;
            }
        }
        if (num && num >= 5 && num <= 30) {
            this.hzDScore = num;
        }
        this.displayChangeScore();
    },

    displayChangeScore: function () {
        this.getWidget("Label_dScore").setString("??????" + this.hzDScore + "???");
    },


    addClickEvent: function (widgets, selector) {
        for (var key in widgets) {
            var widget = this[key] = this.getWidget(key);
            if (!widget) {
                //cc.log("1111");
            } else {
                widget.temp = parseInt(widgets[key]);
                UITools.addClickEvent(widget, this, selector);
            }
        }
    },

    getWidget: function (name) {
        return ccui.helper.seekWidgetByName(this.root, name);
    },

    //????????????????????????
    updateCostDiamond:function(){
            //??????????????????

            var aaStr = "";
            var fzStr = "";
            if(this.jushu == 8) {
                aaStr = "15/???";
                fzStr = "x40";
            }else if(this.jushu == 1){
                var allNum = 6;
                var oneNum = Math.ceil(allNum/this.renshu);
                aaStr = oneNum + "/???";
                fzStr = "x" + allNum;
            }else{
                aaStr = "20/???";
                fzStr = "x" + 60;
            }

            if (this.bbt_fangfei == 1){
                costlable.setString("" + aaStr)
            }else{
                costlable.setString("" + fzStr)
            }
        },

    //???????????????????????????
    updateCostDiamond: function () {
        var costlable = this.getWidget("txt_cost");
        var diamondFangzhu = 8;
        var diamondAA = 3;
        var diamondQunzhu = 8;
        if(this.hzJushu == 1){
            diamondFangzhu = 6;
            diamondAA = 2;
            diamondQunzhu = 6;
            if(this.hzJushu == 2){
                diamondFangzhu = 6;
                diamondQunzhu = 6;
                diamondAA = 3;
            }else if(this.hzJushu == 3){
                diamondFangzhu = 6;
                diamondQunzhu = 6;
                diamondAA = 2;
            }
        }else if (this.hzJushu == 8) {
            diamondFangzhu = 40;
            diamondAA = 10;
            diamondQunzhu = 40;
            if (this.hzRenshu == 2) {
                diamondFangzhu = 30;
                diamondQunzhu = 30;
                diamondAA = 20;
            } else if (this.hzRenshu == 3) {
                diamondFangzhu = 40;
                diamondQunzhu = 40;
                diamondAA = 14;
            }
        } else if (this.hzJushu == 12) {
            diamondFangzhu = 60;
            diamondQunzhu = 60;
            diamondAA = 15;
            if (this.hzRenshu == 2) {
                diamondFangzhu = 45;
                diamondQunzhu = 45;
                diamondAA = 30;
            } else if (this.hzRenshu == 3) {
                diamondFangzhu = 60;
                diamondQunzhu = 60;
                diamondAA = 20;
            }
        } else if (this.hzJushu == 16) {
            diamondFangzhu = 80;
            diamondQunzhu = 80;
            diamondAA = 20;
            if (this.hzRenshu == 2) {
                diamondFangzhu = 60;
                diamondQunzhu = 60;
                diamondAA = 40;
            } else if (this.hzRenshu == 3) {
                diamondFangzhu = 80;
                diamondQunzhu = 80;
                diamondAA = 27;
            }
        }

        if (this.hzCostWay == 1){
            costlable.setString(diamondAA + "/???")
        }else{
            costlable.setString("x" + diamondFangzhu)
        }
    },

    getLocalItem: function (key) {
        var val = cc.sys.localStorage.getItem(key);
        if (val)
            val = parseInt(val);
        return val;
    },

    getWanfaList: function (idex) {
        //this.saveConfig();
        var wanfaList = [];
        if (this.hzRenshu != 2) {
            this.hzIsDouble = 0;
        }
        //cc.log("this.hzTuoguan==========",this.hzTuoguan)
        wanfaList = [
            this.hzJushu, MJWanfaType.HZMJ, this.hzCostWay, this.hzNiao, this.hzZmh, this.hzZhuangXian, this.hzKhqd,
            this.hzRenshu, this.hzTuoguan, this.hzQgh, this.hzQghbsj, 0, this.hzYnqz, 0, this.hzNiaoFen,
            this.hzYpbh, 0, this.hzPiaoFen, 1, this.hzNiaoway, this.hzIsDouble, this.hzDScore, this.hzDoubleNum
        ];
        for (var index = 0; index < wanfaList.length; index++) {
            wanfaList[index] = parseInt(wanfaList[index]);
        }
        return wanfaList;
    },

});
