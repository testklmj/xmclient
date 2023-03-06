/**
 * Created by leiwenwen on 2019/5/24.
 */
var CreateRoomDTZ = BasePopup.extend({
    ctor: function (isSaveChoose, wanfaList,isLeaderPay) {
        this.isClubSaveConfig = isSaveChoose || false;
        this.wanfaList = wanfaList;
        this.isLeaderPay = isLeaderPay || false;
        this._super("res/createRoomDTZ.json");
    },
    selfRender:function(){
        this.choiceEndScore = 0;//了第几个终局奖励分数

        //打筒子
        this.getWanfaRecord();
        //
        this.hasKingCard = this.getLocalItem("sy_pkd_hasKingCard") || 0;

        //dtz游戏配置
        this.renshuConfig = [4, 3, 2];
        this.costConfig = [1 , 2]; //AA 房主支付
        this.typeConfig = {4:[113,114,212],3:[115,116,211],2:[117,118,210]};
        this.wanfaConfig = this.typeConfig[this.renshu];
        this.maxScoreConfig = [600 , 1000];
        this.exScoreConfig = [0 , 100 , 200 , 300 , 500 , 800, 1000];
        this.lbDisplayExscoreInPanel = this.getWidget("txt_exScoreDisplayReal");
        this.lbDisplayExscore = this.getWidget("txt_exScoreDisplayReal");
        this.panelExscore = this.getWidget("panelExScoreList");

        if(this.isClubSaveConfig){
            this.costConfig = [1 ,2 ,3];
        }

        //可选项

        ////是否随机先出
        var widgetFirstOut = {"txt_RandomFirstOut" : 1  , "btn_RandomFirstOut" : 1};
        this.addDtzClickEvent(widgetFirstOut , this.onClickFirstOut);
        this.updateFirstOut();

        // 是否增加王筒子
        var widgetFirstOut = {"txt_wangtongzi" : 1  , "btn_wangtongzi" : 1};
        this.addDtzClickEvent(widgetFirstOut , this.onClickWTZ);

        // 是否有牌必打
        var widgetFirstOut = {"txt_bida" : 1  , "btn_bida" : 1};
        this.addDtzClickEvent(widgetFirstOut , this.onClickBida);

        // 是否托管
        var widgetTuoguan = {"txt_tuoguan" : 1, "btn_tuoguan" : 1};
        this.addDtzClickEvent(widgetTuoguan , this.onClickTuoguan);

        //是否可带牌
        var widgetDaiPai = {"txt_kedaipai" : 1, "btn_kedaipai" : 1};
        this.addDtzClickEvent(widgetDaiPai , this.onClickDaiPai);

        //是否反作弊
        //var widgetFzb = {"txt_fanzuobi":1 , "btn_fanzuobi":1};
        //this.addDtzClickEvent(widgetFzb , this.onClickFzb);


        //游戏
        var widgetGame = {"btn_game_1":1,"btn_game_2":2,"btn_game_3":3,"txt_game_1":1,"txt_game_2":2,"txt_game_3":3};
        this.addDtzClickEvent(widgetGame , this.onGameClick);

        //支付房费
        var widgetsCost = {"btn_cost_1":1,"btn_cost_2":2,"txt_cost_1":1,"txt_cost_2":2};
        this.getWidget("txt_cost_"+3).visible = this.getWidget("btn_cost_"+3).visible = false;
        if(this.isClubSaveConfig){
            widgetsCost = {"btn_cost_1":1,"btn_cost_2":2,"btn_cost_3":3,"txt_cost_1":1,"txt_cost_2":2,"txt_cost_3":3};
            if (this.isLeaderPay){
                this.getWidget("txt_cost_"+3).visible = this.getWidget("btn_cost_"+3).visible = true;
                this.getWidget("txt_cost_3").x = this.getWidget("txt_cost_1").x;
                this.getWidget("btn_cost_3").x = this.getWidget("btn_cost_1").x;
                this.costWay = 3;
                for ( var i = 1;i <= 2;i++){
                    this.getWidget("txt_cost_"+i).visible = this.getWidget("btn_cost_"+i).visible = false;
                }
            }
        }
        this.addDtzClickEvent(widgetsCost,this.onCostClick);

        //玩法
        var widgetsPlay = {"btn_wanfa_1":1,"btn_wanfa_2":2,"btn_wanfa_3":3,"txt_wanfa_1":1,"txt_wanfa_2":2,"txt_wanfa_3":3};
        this.addDtzClickEvent(widgetsPlay,this.onTypeClick);


        //分数
        var widgetScore = {"btn_score_1":1 , "btn_score_2":2 , "txt_score_1":1 , "txt_score_2":2};// "txt_score_1":1 , "txt_socre_2":2
        this.addDtzClickEvent(widgetScore,this.onScoreClick);

        //终局奖励
        var widgetExScore = {"btn_EndScore_0":0 ,"btn_EndScore_1":1 , "btn_EndScore_2":2 , "btn_EndScore_3":3 , "btn_EndScore_4":4 ,
            "txt_EndScore_0":0 , "txt_EndScore_1":1 , "txt_EndScore_2":2 , "txt_EndScore_3":3 ,"txt_EndScore_4":4 ,"txt_EndScore_5":5 ,"txt_EndScore_6":6 ,};
        UITools.addClickEvent(this.getWidget("imgExScore") , this , this.showExscorePanel);
        UITools.addClickEvent(this.lbDisplayExscoreInPanel , this , this.showExscorePanel);
        this.addDtzClickEvent(widgetExScore , this.onExScoreClick);


        //添加复选框的文字点击事件
        var widgetExChoice = {"txt_ChoiceDarkCard" : 1  , "btn_ChoiceDarkCard" : 1  , "txt_ShowLastCardNum" : 2 , "btn_ShowLastCardNum" : 2 };//
        this.addDtzClickEvent(widgetExChoice , this.onClickExTxt);

        var yijuChoice = {"btn_yiju":1,"txt_yiju":1};
        this.addDtzClickEvent(yijuChoice , this.onClickYiju);

        //屏蔽按键
        this.addClickEvent({"mainMask":1} , this.onDoNothing);

        var daikaiBtn = this.Button_17 = this.getWidget("Button_28");
        if(daikaiBtn){
            UITools.addClickEvent(daikaiBtn,this,this.onDaiCreate);
        }

        var btn = this.Button_17 = this.getWidget("Button_29");
        if(btn){
            UITools.addClickEvent(btn,this,this.onDaiKaiList);
        }

        this.updateFirstOut();
        this.updateBida();
        this.updateWTZ();
        this.updateTuoguan();
        this.updateKeDaiPai();
        this.initBtnStatu();

        if(SdkUtil.isYYBReview()){
            this.getWidget("Image_Cost").visible = false;
        }
    },

    showExscorePanel:function(){
        cc.log("显示或者影藏这个垃圾玩意儿...")
      this.panelExscore.visible = !this.panelExscore.visible;
    },

    /**
     * 针对层出不穷的可选项需求 影藏 显示 位置移动 等处理
     */
    dealExBtns:function(){

        this.updateSelect();//老代码兼容

        //王筒子可选项 显示 影藏 位置更新
        var wtzBtn = this["btn_wangtongzi"];
        var wtzTxt = this["txt_wangtongzi"];
//        if(DTZRoomModel.is4Ren(this.wanfa)){
//            wtzBtn.x = 640;
//            wtzTxt.x = 676;
//        }else{
//            wtzBtn.x = 840;
//            wtzTxt.x = 876;
//        }
        wtzBtn.visible = (DTZRoomModel.is3FuPai(this.wanfa) && !DTZRoomModel.is4Ren(this.wanfa));
        wtzTxt.visible = (DTZRoomModel.is3FuPai(this.wanfa) && !DTZRoomModel.is4Ren(this.wanfa));

        //有牌必打可选项 显示 影藏 位置更新
        var bidaBtn = this["btn_bida"];
        var bidaTxt = this["txt_bida"];
        bidaBtn.visible = DTZRoomModel.is2Ren(this.wanfa);
        bidaTxt.visible = DTZRoomModel.is2Ren(this.wanfa);
        if(DTZRoomModel.is3Ren(this.wanfa)){//三人默认选中 但不显示
            this.isBida = 1;
        }else if(DTZRoomModel.is4Ren(this.wanfa)){//四人不选中 也无此选项
            this.isBida = 0;
        }
        cc.log("this.isBida..." , this.isBida);
        this.updateBida();

        //托管可选项 显示 影藏 位置更新
        var tuoguanBtn = this["btn_tuoguan"];
        var tuoguanTxt = this["txt_tuoguan"];
        tuoguanBtn.visible = tuoguanTxt.visible = false;
        //放开俱乐部托管
        if(DTZRoomModel.is3Ren(this.wanfa) || DTZRoomModel.is2Ren(this.wanfa)){
            if(DTZRoomModel.is3Ren(this.wanfa)){
                tuoguanBtn.visible = tuoguanTxt.visible = true;
//                tuoguanBtn.x = 153;
            }else{
//                bidaBtn.x = 153;
//                tuoguanBtn.x = 409;
                //this.isTuoguan = 0;
                this.updateTuoguan();
                tuoguanBtn.visible = tuoguanTxt.visible = false;
            }
        }else{
            //this.isTuoguan = 0;
            this.updateTuoguan();
//            tuoguanBtn.x = 409;
            tuoguanBtn.visible = tuoguanTxt.visible =false;
        }

//        tuoguanTxt.x = tuoguanBtn.x + 40;
//        bidaTxt.x = bidaBtn.x + 40;
        tuoguanBtn.visible = tuoguanTxt.visible = true;

        //可带排可选项的 显示影藏 -46
        var daipaiBtn = this["btn_kedaipai"];
        var daipaiTxt = this["txt_kedaipai"];
        daipaiBtn.visible = daipaiTxt.visible = true;
        if(DTZRoomModel.is3Ren(this.wanfa) || DTZRoomModel.is2Ren(this.wanfa)){
            if(DTZRoomModel.is2Ren(this.wanfa)){
            //if((this.isBida == 1) && DTZRoomModel.is2Ren(this.wanfa)){
//                daipaiBtn.x = 641;//如果托管放开了 要用新的位置
                //daipaiBtn.x = 410;
            }else{
//                daipaiBtn.x = 410;//152;
            }
            //daipaiTxt.x = daipaiBtn.x + 40;
        }else{
//            daipaiBtn.x = 152;
            //daipaiTxt.x = 192;
        }
//        daipaiTxt.x = daipaiBtn.x + 40;
        //三副牌默认勾选 四副牌默认不勾选
        if(!this._hasDefaultDaiPaiValue){
            if(DTZRoomModel.is3FuPai(this.wanfa)){
                this.isDaiPai = 1;
            }else{
                this.isDaiPai = 0;
            }
            this.updateKeDaiPai();
        }

    },

    saveConfig:function(){
        //cc.log("保存 打筒子选项..." , this.wanfa);
        if (this.wanfa == 112){//4人快乐四喜
            this.isDark8 = 0;
        }
        if (this.renshu == 4) {
            this.isFirstOut = 0;
        }
        cc.sys.localStorage.setItem("sy_dtz_cost" , this.costWay);
        cc.sys.localStorage.setItem("sy_dtz_wanfa",this.wanfa);
        cc.sys.localStorage.setItem("sy_dtz_maxScore",this.maxScore);
        cc.sys.localStorage.setItem("sy_dtz_exScore" , this.exScore);
        cc.sys.localStorage.setItem("sy_dtz_isDark8" , this.isDark8);
        cc.sys.localStorage.setItem("sy_dtz_isRemove67" , this.isRemove67);
        cc.sys.localStorage.setItem("sy_dtz_isShowNum" , this.isShowNumber);
        cc.sys.localStorage.setItem("sy_dtz_renshuv2" , this.renshu);
        cc.sys.localStorage.setItem("sy_dtz_isFirstOut" , this.isFirstOut);
        cc.sys.localStorage.setItem("sy_dtz_isWangTongZi" , this.isWangTongZi);
        cc.sys.localStorage.setItem("sy_dtz_isBida" , this.isBida);
        cc.sys.localStorage.setItem("sy_dtz_isTuoguan" , this.isTuoguan);
        cc.sys.localStorage.setItem("sy_dtz_isDaiPai" , this.isDaiPai);
        cc.sys.localStorage.setItem("sy_dtz_isFanZuoBi" , this.isFanZuoBi);
        cc.sys.localStorage.setItem("sy_dtz_jushu" , this.jushu);
    },

    getLocalItem:function(key){
        var val = cc.sys.localStorage.getItem(key);
        if(val)
            val = parseInt(val);
        return val;
    },

    getWanfas:function(){
        var wanfas = [this.wanfa,this.costWay,this.jushu==1?1:10,this.renshu];
        return wanfas;
    },

    getWanfaRecord:function(){
        cc.log("this.wanfaList..." , this.wanfaList);
        if (this.isClubSaveConfig && this.wanfaList.length > 0){
            cc.log("1111 读取传进来的配置");
            var wanfaList = this.wanfaList;
            //打筒子
            this.costWay = wanfaList[2];
            this.wanfa = wanfaList[1];
            this.maxScore = wanfaList[3] || 600;
            this.exScore = wanfaList[4] || 0;
            this.isDark8 = wanfaList[5] == 0 ? 0 : 1;
            this.isRemove67 = wanfaList[6] || 0;
            this.isShowNumber = wanfaList[8] == 0 ? 0 : 1;
            this.renshu = wanfaList[7] || 4;
            this.isFirstOut = wanfaList[9] || 0;
            this.isBida = wanfaList[10] || 0;
            this.isWangTongZi = wanfaList[11] || 0;
            this.isTuoguan = wanfaList[12] || 0;
            this.isDaiPai = wanfaList[13] || 0;
            //this.isFanZuoBi = wanfaList[14] || 0;
            this.jushu = wanfaList[0]==1?1:0;

            if(wanfaList[13] && (wanfaList[13] == 0 || wanfaList[13] == 1)){
                this._hasDefaultDaiPaiValue = true;
            }

        }else{
            //打筒子
            //cc.log("2222 读取本地配置");
            var costWay  = this.getLocalItem("sy_dtz_cost") || 1;
            if (!this.isClubSaveConfig && costWay == 3 ){
                costWay = 1;
            }
            this.costWay = costWay;
            this.wanfa = this.getLocalItem("sy_dtz_wanfa") || DTZRoomModel.wanfa3;
            this.maxScore = this.getLocalItem("sy_dtz_maxScore") || 600;
            this.exScore = this.getLocalItem("sy_dtz_exScore") || 0;
            this.isDark8 = parseInt(this.getLocalItem("sy_dtz_isDark8")) == 0 ? 0 : 1;
            this.isRemove67 = 0;//this.getLocalItem("sy_dtz_isRemove67") || 0;
            this.isShowNumber = parseInt(this.getLocalItem("sy_dtz_isShowNum")) == 0 ? 0 : 1;
            this.renshu = this.getLocalItem("sy_dtz_renshuv2")  || 4;
            this.isFirstOut = this.getLocalItem("sy_dtz_isFirstOut") || 0;
            this.isBida = parseInt(this.getLocalItem("sy_dtz_isBida")) == 1 ? 1 : 0 ;//新增有牌必打
            this.isWangTongZi = parseInt(this.getLocalItem("sy_dtz_isWangTongZi")) == 1 ? 1 : 0;// 新增王筒子
            this.isTuoguan = parseInt(this.getLocalItem("sy_dtz_isTuoguan")) == 1 ? 1 : 0;        //新增托管
            this.isDaiPai = parseInt(this.getLocalItem("sy_dtz_isDaiPai")) == 1? 1 : 0;           //新增是否可带牌
            this.isFanZuoBi = parseInt(this.getLocalItem("sy_dtz_isFanZuoBi")) == 1 ? 1 : 0; //反作弊
            this.jushu = parseInt(this.getLocalItem("sy_dtz_jushu")) == 1 ?1:0;

            if(isNaN(parseInt(this.getLocalItem("sy_dtz_isDaiPai")))){
                this._hasDefaultDaiPaiValue = false;
            }else{
                this._hasDefaultDaiPaiValue = true;
            }

        }
    },

    onDoNothing:function(){
        cc.log("点击在创建房间的背景图")
        return false;
    },

    //初始化按钮状态
    initBtnStatu:function(){
        var indexofGame = ArrayUtil.indexOf(this.renshuConfig , this.renshu) + 1;
        var indexofCost = ArrayUtil.indexOf(this.costConfig , this.costWay) + 1;
        var indexofWanfa = ArrayUtil.indexOf(this.wanfaConfig , this.wanfa) + 1;
        var indexofmaxScore = ArrayUtil.indexOf(this.maxScoreConfig , this.maxScore) + 1;
        var indexofExScore = ArrayUtil.indexOf(this.exScoreConfig , this.exScore);
        cc.log("初始化创建房间的按钮信息 " , indexofCost + " " + indexofWanfa + " " + indexofmaxScore  + " " + indexofExScore);

        //游戏
        for(var i = 1 ; i <= this.renshuConfig.length ; i ++) {
            this.getDtzWidget("btn_game_" + i).setBright(indexofGame == i);
            var txtItem = this.getDtzWidget("txt_game_" + i);
            if(indexofGame != i){
                txtItem.setColor(cc.color("ffffff"))
            }else{
                txtItem.setColor(cc.color("d91010"));
            }
        }

        //创房消耗
        for(var i = 1 ; i <= this.costConfig.length ; i ++){
            this.getDtzWidget("btn_cost_" + i).setBright(indexofCost == i);
            var txtItem = this.getDtzWidget("txt_cost_" + i);
            if(indexofCost != i){
                txtItem.setColor(cc.color("ffffff"))
            }else{
                txtItem.setColor(cc.color("d91010"));
            }
        }

        //玩法
        for(var i = 1 ; i <= this.wanfaConfig.length ; i ++){
            this.getDtzWidget("btn_wanfa_" + i).setBright(indexofWanfa == i);
            var txtItem = this.getDtzWidget("txt_wanfa_" + i);
            if(indexofWanfa != i){
                txtItem.setColor(cc.color("ffffff"))
            }else{
                txtItem.setColor(cc.color("d91010"));
            }
        }

        //分数
        for(var j = 1 ; j <= this.maxScoreConfig.length ; j ++){
            this.getDtzWidget("btn_score_" + j).setBright(indexofmaxScore == j);
            var txtItem = this.getDtzWidget("txt_score_" + j);
            if(indexofmaxScore != j){
                txtItem.setColor(cc.color("ffffff"));
            }else{
                txtItem.setColor(cc.color("d91010"));
            }

            //修改钻石消耗的描述
            this.updateCost();
        }

        //终局奖励
        var txtItem = this.getDtzWidget("txt_EndScore_" + indexofExScore);
        if(txtItem){
            this.onExScoreClick(txtItem);
        }else{
            txtItem = this.getDtzWidget("txt_EndScore_" + 0);
            this.onExScoreClick(txtItem);
        }
        this.panelExscore.visible = false;

        //可选
        this.initExSelect();
        this.dealExBtns();
        this.initYijuSelect();
    },

    initExSelect:function(){
        //可选
        var btn = this["btn_ChoiceDarkCard"];
        var txt = this["txt_ChoiceDarkCard"];
        if(this.isDark8){
            txt.setColor(cc.color("d91010"));
            btn.setBright(true);
        }else{
            txt.setColor(cc.color("ffffff"));
            btn.setBright(false);
        }

        btn = this["btn_ShowLastCardNum"];
        txt = this["txt_ShowLastCardNum"];
        if(this.isShowNumber){
            txt.setColor(cc.color("d91010"));
            btn.setBright(true);
        }else{
            txt.setColor(cc.color("ffffff"));
            btn.setBright(false);
        }
    },

    initYijuSelect:function(){
        var btn = this["btn_yiju"];
        var txt = this["txt_yiju"];
        if(this.jushu == 1){
            txt.setColor(cc.color("d91010"));
            btn.setBright(true);
        }else{
            txt.setColor(cc.color("ffffff"));
            btn.setBright(false);
        }
    },

    //刷新钻石消耗显示
    updateCost:function(){
        //刷新钻石显示
        var costlable = this.getDtzWidget("txt_cost");
        var aaStr = "";
        var fzStr = "";

        if(this.maxScore == 600){
            if(this.renshu == 4){
                aaStr = "10/人";
                fzStr = "x40";
            }else if(this.renshu == 3){
                aaStr = "10/人";
                fzStr = "x30";
            }else if(this.renshu == 2){
                aaStr = "15/人";
                fzStr = "x30";
            }

        }else if(this.maxScore == 1000){
            if(this.renshu == 4){
                aaStr = "15/人";
                fzStr = "x60";
            }else if(this.renshu == 3){
                aaStr = "20/人";
                fzStr = "x60";
            }else if(this.renshu == 2){
                aaStr = "30/人";
                fzStr = "x60";
            }
        }

        if(this.jushu == 1){
            var allNum = 6;
            var oneNum = Math.ceil(allNum/this.renshu);
            aaStr = oneNum + "/人";
            fzStr = "x" + allNum;
        }

        if (this.costWay == 1){
            costlable.setString("" + aaStr)
        }else{
            costlable.setString("" + fzStr)
        }

    },

    /**
     * 2人 3人默认要选中 暗牌选项
     */
    updateSelect:function(){
        if(this.renshu == 4){
            this.isDark8 = parseInt(this.getLocalItem("sy_dtz_isDark8")) == 0 ? 0 : 1;
            this.initExSelect();
            this["txt_ShowLastCardNum"].setString("记牌器");
            //隐藏随机出头选项
            this["txt_RandomFirstOut"].visible = false;
            this["btn_RandomFirstOut"].visible = false;
        }else{
            this.onClickExTxt(this["btn_ChoiceDarkCard"]);
            this["txt_ShowLastCardNum"].setString("显示剩余牌");
            //显示随机出头选项
            this["txt_RandomFirstOut"].visible = true;
            this["btn_RandomFirstOut"].visible = true;
        }
        var desc = "暗8张底牌";
        //三副牌
        var darkNumber = 8;
        if(DTZRoomModel.is3FuPai(this.wanfa)){//this.wanfa == 113 || this.wanfa == 115 || this.wanfa == 117
            if(this.renshu == 4){
                darkNumber = 8;
            }else if(this.renshu == 3){
                darkNumber = 9;
            }else if(this.renshu == 2){
                darkNumber = 66;
            }
        }else if(DTZRoomModel.is4FuPai(this.wanfa)) {
            //四副牌
            if(this.renshu == 4){
                darkNumber = 8;
            }else if(this.renshu == 3){
                darkNumber = 52;
            }else if(this.renshu == 2){
                darkNumber = 96;
            }
        }

        if((this.isWangTongZi == 1) && DTZRoomModel.is3FuPai(this.wanfa) && !DTZRoomModel.is4Ren(this.wanfa)){
            darkNumber = darkNumber + 6;
        }


        this["btn_ChoiceDarkCard"].visible = true;
        this["txt_ChoiceDarkCard"].visible = true;
//        this["btn_kedaipai"].y = -31.5;
//        this["txt_kedaipai"].y = -29.5;
        if (this.wanfa == 212){
            this["btn_ChoiceDarkCard"].visible = false;
            this["txt_ChoiceDarkCard"].visible = false;
//            this["btn_kedaipai"].y = 15.5;
//            this["txt_kedaipai"].y = 18.5;
        }else if (this.wanfa == 211){
            darkNumber = 44;
        }else if (this.wanfa == 210){
            darkNumber = 88;
        }

        desc = "暗"+darkNumber+"张底牌";
        this["txt_ChoiceDarkCard"].setString(desc);
    },

    //游戏
    onGameClick:function(obj){
        var clickId = parseInt(obj.temp);
        cc.log("onGameClick..." , clickId);
        var values = this.renshuConfig;
        for(var i=1;i<=3;i++){
            if(i != clickId){
                this["btn_game_" + i].setBright(false);
                this["txt_game_" + i].setColor(cc.color("ffffff"));
            }
        }
        var btn = this["btn_game_" + clickId];
        var txt = this["txt_game_" + clickId];
        txt.setColor(cc.color("d91010"));
        btn.setBright(true);
        var wanfaIndex = ArrayUtil.indexOf(this.wanfaConfig, this.wanfa);
        this.renshu = values[clickId - 1];
        this.wanfaConfig = this.typeConfig[this.renshu];
        this.wanfa = this.wanfaConfig[wanfaIndex];
        this.updateCost();
        //暗牌默认选中
        //this.updateSelect();
        this.dealExBtns();
    },


    //消耗房费方式
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
        this.costWay = values[clickId - 1];
        this.updateCost();
    },

    //玩法
    onTypeClick:function(obj){
        var clickId = parseInt(obj.temp);
        var values = this.typeConfig[this.renshu];
        for(var i=1;i<=3;i++){
            if(i != clickId){
                this["btn_wanfa_" + i].setBright(false);
                this["txt_wanfa_" + i].setColor(cc.color("ffffff"));
            }

        }
        var btn = this["btn_wanfa_" + clickId];
        var txt = this["txt_wanfa_" + clickId];
        txt.setColor(cc.color("d91010"));
        btn.setBright(true);
        this.wanfa = values[clickId - 1];
        this.dealExBtns();
        //this.updateSelect();
    },

    //分数
    onScoreClick:function(obj){
        var clickId = parseInt(obj.temp);
        var values = this.maxScoreConfig;
        for(var i=1;i<=2;i++){
            if(i != clickId){
                this["btn_score_" + i].setBright(false);
                this["txt_score_" + i].setColor(cc.color( "ffffff"));
            }
        }
        var btn = this["btn_score_" + clickId];
        var txt = this["txt_score_" + clickId];
        btn.setBright(true);
        txt.setColor(cc.color("d91010"));
        this.maxScore = values[clickId - 1];
        //修改钻石消耗的描述
        this.updateCost();
    },

    //终局奖励分数
    onExScoreClick:function(obj){
        var clickId = parseInt(obj.temp);
        var values = this.exScoreConfig;
        for(var i = 0 ; i <= this.exScoreConfig.length - 1 ; i ++){
            if(i != clickId){
                if(this["btn_EndScore_" + i]){
                    this["btn_EndScore_" + i].setBright(false);
                }
                this["txt_EndScore_" + i].setColor(cc.color("ffffff"));
            }
        }
        var btn = this["btn_EndScore_" + clickId];
        var txt = this["txt_EndScore_" + clickId];

        if(btn){
            btn.setBright(true);
        }
        this.choiceEndScore = clickId;
        txt.setColor(cc.color("d91010"));

        if(this.choiceEndScore == 0){
            this.exScore = 0;
        }else{
            this.exScore = values[clickId];
        }


        if(clickId >= 4){
            var btn = this["btn_EndScore_" + 4];
            if(btn){
                btn.setBright(true);
            }

            this.showExscorePanel();
            this.lbDisplayExscoreInPanel.setString(this.exScore + "分");
            this.lbDisplayExscore.setString(this.exScore + "分");
        }

    },

    //扑八张
    onClickDark8Card:function(){
        var btn = this["btn_ChoiceDarkCard"];
        var txt = this["txt_ChoiceDarkCard"];
        if(btn.isBright()){
            if(this.renshu != 4){//三人 两人 不可以取消
                return;
            }
            txt.setColor(cc.color("ffffff"));
            btn.setBright(false);
            this.isDark8 = 0;
        }else{
            txt.setColor(cc.color("d91010"));
            btn.setBright(true);
            this.isDark8 = 1;
        }
    },


    updateFirstOut:function(){
        this.onNormolUpdate("btn_RandomFirstOut","txt_RandomFirstOut","isFirstOut");
    },

    updateWTZ:function(){
        cc.log("updateWTZ..." , this.isWangTongZi)
        this.onNormolUpdate("btn_wangtongzi","txt_wangtongzi","isWangTongZi");
        this.dealExBtns();
    },

    updateBida:function(){
        this.onNormolUpdate("btn_bida","txt_bida","isBida");
    },


    updateTuoguan:function(){
        cc.log("updateTuoguan..." , this.isTuoguan);
        this.onNormolUpdate("btn_tuoguan","txt_tuoguan","isTuoguan");
    },


    updateKeDaiPai:function(){
        cc.log("updateKeDaiPai::" , this.isDaiPai);
        this.onNormolUpdate("btn_kedaipai","txt_kedaipai","isDaiPai");
    },

    /**
     * 通用可选项刷新代码
     */
    onNormolUpdate:function(btnName , txtName , paramName){
        if(btnName && txtName && paramName){
            var btn = this[btnName];
            var txt = this[txtName];
            if(this[paramName] == 1){
                txt.setColor(cc.color("d91010"));
                btn.setBright(true);
            }else if(this[paramName] == 0){
                txt.setColor(cc.color("ffffff"));
                btn.setBright(false);
            }
        }else{
            cc.log("onNormolUpdate error ::" , btnName , txtName , paramName);
        }
    },

    /**
     * 通用可选项点击代码
     * @param btn
     * @param txt
     * @param paramName
     */
    onNormolClick:function(btnName , txtName , paramName){
        if(btnName && txtName && paramName){
            var btn = this[btnName];
            var txt = this[txtName];
            if(btn.isBright()){
                txt.setColor(cc.color("ffffff"));
                btn.setBright(false);
                this[paramName] = 0;
            }else{
                txt.setColor(cc.color("d91010"));
                btn.setBright(true);
                this[paramName] = 1;
            }
        }else{
            cc.log("onNormolClick error ::" , btnName , txtName , paramName);
        }
    },


    //随机显出
    onClickFirstOut:function(){
        this.onNormolClick("btn_RandomFirstOut","txt_RandomFirstOut","isFirstOut");
    },

    //王筒子
    onClickWTZ:function(){
        this.onNormolClick("btn_wangtongzi","txt_wangtongzi","isWangTongZi");
        this.dealExBtns();
    },

    //有牌必打
    onClickBida:function(){
        this.onNormolClick("btn_bida","txt_bida","isBida");
        //刷新 托管的显示
        this.dealExBtns()
    },

    //托管
    onClickTuoguan:function(){
        this.onNormolClick("btn_tuoguan","txt_tuoguan","isTuoguan");
    },

    //可带牌
    onClickDaiPai:function(){
        this.onNormolClick("btn_kedaipai","txt_kedaipai","isDaiPai");
    },

    //反作弊
    onClickFzb:function(){
        this.onNormolClick("btn_fanzuobi","txt_fanzuobi","isFanZuoBi");
    },


    //是否显示剩余牌数
    onClickShowNum:function(){
        this.onNormolClick("btn_ShowLastCardNum","txt_ShowLastCardNum","isShowNumber");
    },

    //点击可选项的文字
    onClickExTxt:function(obj){
        var tag = parseInt(obj.temp);
        if(tag == 1){//扑八张
            this.onClickDark8Card();
        }else if (tag == 2){//
            this.onClickShowNum();
        }

    },

    onClickYiju:function(sender){
        this.jushu = this.jushu==1?0:1;
        this.initYijuSelect();
        this.updateCost();
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

    addDtzClickEvent:function(widgets , selector){
        for(var key in widgets){
            var widget = this[key] = this.getWidget(key);
            //cc.log("key ..." , widgets , key)
            widget.temp = parseInt(widgets[key]);
            UITools.addClickEvent(widget,this,selector);
        }
    },

    getWidget:function(name){
        return ccui.helper.seekWidgetByName(this.root,name);
    },

    getDtzWidget:function(name){
        //return ccui.helper.seekWidgetByName(this.getWidget("NodeDTZ") , name);
        if(ccui.helper.seekWidgetByName(this.root,name) == null){
            cc.log("获取Node失败..." , name);
        }
        return ccui.helper.seekWidgetByName(this.root,name);
    },

    getWanfaList:function(idex){
        //this.saveConfig();
        var wanfaList = [];
        wanfaList = [this.jushu==1?1:0, this.wanfa  , this.costWay , this.maxScore , this.exScore , this.isDark8 , this.isRemove67, this.renshu, this.isShowNumber, this.isFirstOut,
            this.isBida, this.isWangTongZi , this.isTuoguan , this.isDaiPai];
        //cc.log("传给后台的wanfalist..." , wanfaList);
        for(var index = 0 ; index < wanfaList.length ; index++){
            wanfaList[index] = parseInt(wanfaList[index]);
        }
        return wanfaList;
    }

});