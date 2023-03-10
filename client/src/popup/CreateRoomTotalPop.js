var CreateRoomTotalPop = CreateRoomPop.extend({

    ctor:function(modeId,clickClubId,clickClubRole,wanfaList,isSaveChoose,isLeaderPay,subId,bagName,creditMsg){
        this.modeId = modeId||0;
        this.clickClubId = clickClubId||0;
        this.isLeader = (clickClubRole == 0);
        this.wanfaList = [];
        this.wanfa = 113;
        if (wanfaList){
            this.wanfa = wanfaList[1] || 113;
            this.wanfaList = wanfaList;
        }else{
            var wanfa = UITools.getLocalItem("sy_dtz_game_wanfa");
            this.wanfa = wanfa || 113;
        }
        this.createRoomNum = 1;
        this.isSecrete = false;
        this.isSaveChoose = isSaveChoose || false; //是否是保存配置
        this.isLeaderPay = isLeaderPay || false;
        this.resp = false;
        this.ksppCount = ClickClubModel.getKsppCount() || 0;
        this.recordksppCount = this.ksppCount;
        this.subId = subId || 0;
        this.bagDataName = bagName || "";
        this.creditParms = [];
        this.creditMsg = creditMsg || [];
        this.clazz = [];
        this._super("res/createRoomTotalPop.json");
    },


    selfRender:function(){
        CreateRoomPop.prototype.selfRender.call(this);
        this.Panel_game1 = this.getWidget("Panel_game1");
        this.Panel_game2 = this.getWidget("Panel_game2");
        this.Panel_game3 = this.getWidget("Panel_game3");

        //for(var i= 1; i <= 6; i++){
        //    this["Panel_wanfa"+i] = this.getWidget("Panel_wanfa"+i);
        //}

        this.wanfaPanel = this.getWidget("Panel_wanfa");

        this.Image_ExScore = this.getWidget("Image_ExScore");
        this.Image_exChoice = this.getWidget("Image_exChoice");

        this.addCustomEvent(SyEvent.UPDATA_CREDIT_PARMS,this,this.upDateCreditParms);

        var btnSaveChoose = this.btnSaveChoose = this.getWidget("btnSaveChoose");
        UITools.addClickEvent(btnSaveChoose,this,this.onCreateBag);


        var wanfaWidgets = {"wanfaBtn1":1,"wanfaBtn2":2,"wanfaBtn3":3,"wanfaBtn4":4,"wanfaBtn5":5,"wanfaBtn6":6,"wanfaBtn7":7,"wanfaBtn8":8,"wanfaBtn9":9};
        //将控件初始化
        for(var key in wanfaWidgets){
            var widget = this[key] = this.getWidget(key);
            widget.temp = parseInt(wanfaWidgets[key]);
            UITools.addClickEvent(widget,this,this.onWanFaClick);
        }

        var Label_18 = this.Label_18 = this.getWidget("Label_18");
        var mapping =  this.mapping = {"gameBtn1":1,"gameBtn2":2,"gameBtn3":3};
        //将控件初始化
        for(var key in mapping){
            var widget = this[key] = this.getWidget(key);
            widget.temp = parseInt(mapping[key]);
            UITools.addClickEvent(widget,this,this.onUIClick);
        }


        var daikaiBtn = this.getWidget("Button_28");
        if(daikaiBtn){
            UITools.addClickEvent(daikaiBtn,this,this.onDaiCreate);
        }
        this.daikaiBtn = daikaiBtn;

        var daikaiListBtn = this.getWidget("Button_29");
        if(daikaiListBtn){
            UITools.addClickEvent(daikaiListBtn,this,this.onDaiKaiList);
        }



        this.btn_creditChange = this.getWidget("btn_creditChange");
        UITools.addClickEvent(this.btn_creditChange, this , this.onCreditChange);

        //比赛房
        this.Panel_credit = this.getWidget("Panel_credit");
        this.Panel_credit.visible = true;

        //开启还是关闭比赛房
        var widgetCredit = {"btn_credit" : 1  , "txt_credit" : 1};
        this.addDtzClickEvent(widgetCredit,this.onCredit);

        this.btn_credittip = this.getWidget("btn_credittip");
        UITools.addClickEvent(this.btn_credittip, this , this.onCreditTip);


        var inputIdImg = this.getWidget("inputBg");
        this.inputName = new cc.EditBox(cc.size(204, 51),new cc.Scale9Sprite("res/ui/dtzjulebu/julebu/inputIdBg.png"));
        this.inputName.setString("");
        this.inputName.x = inputIdImg.width/2;
        this.inputName.y = inputIdImg.height/2;
        this.inputName.setFontColor(cc.color("7D2E00"));
        this.inputName.setDelegate(this);
        this.inputName.setFont("Arial",26);
        this.inputName.setMaxLength(30);
        this.inputName.setPlaceHolder("输入包厢名字");
        this.inputName.setPlaceholderFont("Arial" , 26);
        this.inputName.setPlaceholderFontColor(cc.color(230,218,207));//230 218 207
        inputIdImg.addChild(this.inputName,0);


        if (this.isSaveChoose){
            this.Button_17.visible = false;
            daikaiListBtn.visible = false;
            daikaiBtn.visible = false;
            this.btnSaveChoose.visible = true;
            this.initCreditParms();
            this.initCreditTip();
            inputIdImg.visible = true;
            this.getWidget("leaderName").visible = true;
            if (this.bagDataName){
                this.inputName.setString(""+this.bagDataName);
                this.inputName.setTouchEnabled(false);
            }
        }else{
            this.Button_17.visible = true;
            daikaiListBtn.visible = false;
            daikaiBtn.visible = false;
            this.btnSaveChoose.visible = false;
            inputIdImg.visible = false;
            this.getWidget("leaderName").visible = false;
            this.Panel_credit.visible = false;
        }


        this.Panel_15 = this.getWidget("Panel_15");
        UITools.addClickEvent(this.Panel_15, this , this.onHideSprite);

        var idex = this.getWanfaIdex();
        this.wanfaIdex = idex;
        this.gameIdex = this.getGameIdex();
        this.showBtn(this.gameIdex,this.wanfaIdex);

        //this.getWidget("wanfaBtn8").visible = false;
    },

    onHideSprite:function(){
        if (this.Image_creditTip){
            this.Image_creditTip.visible = false;
        }
    },

    onCreateBag:function(){
        var self = this;
        if (this.modeId) {
            self.onSaveChoose();
        }else{
            self.onSaveChoose();
        }
    },

    onSaveChoose:function(){
        var bagName = this.inputName.getString();
        if(bagName == ""){
            FloatLabelUtil.comText("请输入包厢名字");
            return;
        }
        var wanfaList = this.WanfaPop.getWanfaList(this.wanfaIdex);
        var creditParms = this.getCreditParms();
        var wanfas = this.WanfaPop.getWanfas();
        var that = this;
        var lastScene = this.getLocalItem("sy_lastClick_scene") || -1;
        if (this.modeId) {
            NetworkJT.loginReq("groupAction", "updateTableConfig", {
                gameType:wanfas[0],
                payType:wanfas[1],
                gameCount:wanfas[2],
                playerCount:wanfas[3],
                modeMsg:wanfaList,
                tableName:bagName,
                descMsg:wanfaList,
                tableMode:wanfaList,
                tableOrder:1,
                userId:PlayerModel.userId,
                keyId:that.modeId,
                subId:that.subId,
                groupId:that.clickClubId,
                room:that.subId,
                creditMsg:creditParms
            }, function (data) {
                if (data) {
                    FloatLabelUtil.comText("配置修改成功");
                    var num = data.message || 0;
                    if (Number(num)){
                        that.onReleaseBagRoom(num);
                    }else{
                        SyEventManager.dispatchEvent(SyEvent.GET_CLUB_ALLBAGS,lastScene);
                    }
                    SyEventManager.dispatchEvent(SyEvent.CLOSE_CLUB_BAGS);
                    //cc.log("createPJ::"+JSON.stringify(data));
                    PopupManager.remove(that);
                }
            }, function (data) {
                //cc.log("createPJ::"+JSON.stringify(data));
                FloatLabelUtil.comText(data.message);
            });

        }else{
            NetworkJT.loginReq("groupAction", "createGroupRoom", {
                groupName: bagName,
                gameType:wanfas[0],
                payType:wanfas[1],
                gameCount:wanfas[2],
                playerCount:wanfas[3],
                modeMsg:wanfaList,
                tableName:456789,
                descMsg:wanfaList,
                tableMode:wanfaList,
                tableOrder:1,
                userId:PlayerModel.userId,
                subId:that.subId,
                groupId:that.clickClubId,
                creditMsg:creditParms
            }, function (data) {
                if (data) {
                    that.subId = data.subId || 0;
                    SyEventManager.dispatchEvent(SyEvent.GET_CLUB_ALLBAGS,lastScene);
                    SyEventManager.dispatchEvent(SyEvent.CLOSE_CLUB_BAGS);
                    //cc.log("createPJ::"+JSON.stringify(data));
                    FloatLabelUtil.comText("配置玩法成功");
                    PopupManager.remove(that);
                }
            }, function (data) {
                FloatLabelUtil.comText(data.message);
            });

        }

    },


    isPDK:function(){
        return ArrayUtil.indexOf([15,16] , this.wanfa) >= 0;
    },

    isBBT:function(){
        return (this.wanfa == 131);
    },

    isHZMJ:function(){
        return (this.wanfa == MJWanfaType.HZMJ);
    },

    isSYMJ:function(){
        return (this.wanfa == MJWanfaType.SYMJ);
    },

    isPHZ:function(){
        return ArrayUtil.indexOf([PHZGameTypeModel.SYZP , PHZGameTypeModel.SYBP  , PHZGameTypeModel.LDFPF] , this.wanfa) >= 0;
    },

    //换皮后启用
    isDTZ:function(){
        return ArrayUtil.indexOf([113 , 114 , 115 , 116 , 117 , 118, 210 , 211,212] , this.wanfa) >= 0;
    },

    getWanfaIdex:function(){
        var idex = 1;
        if (this.isDTZ()){
            idex = 1;
        } else if (this.isPHZ()){
            idex = 4;
            if (this.wanfa == PHZGameTypeModel.SYZP){
                idex = 5;
            }else if (this.wanfa == PHZGameTypeModel.LDFPF){
                idex = 7;
            }
        } else if (this.isPDK()){
            idex = 2;
        }else if (this.isBBT()) {
            idex = 3;
        }else if (this.isHZMJ()) {
            idex = 6;
        }else if (this.isSYMJ()) {
            idex = 8;
        }else if(this.wanfa == MJWanfaType.CSMJ){
            idex = 9;
        }
        return idex;
    },

    getGameIdex:function(){
        var idex = 1;
        if (this.isDTZ()){
            idex = 1;
        } else if (this.isPHZ()){
            idex = 2;
            if (this.wanfa == PHZGameTypeModel.SYZP){
                idex = 2;
            }
        } else if (this.isPDK()){
            idex = 1;
        }else if (this.isBBT()) {
            idex = 1;
        }else if (this.isHZMJ()) {
            idex = 3;
        }else if (this.isSYMJ()) {
            idex = 3;
        }else if(this.wanfa == MJWanfaType.CSMJ){
            idex = 3;
        }
        return idex;
    },
    saveChoice:function(){
        cc.log("call save choice..." , this.wanfaIdex);
        this.WanfaPop.saveConfig();
    },

    initCreditParms: function(){
        this.creditParms = [];
        var wanfaIdex = this.getWanfaIdex();
        if (this.getWanfaIdex() == wanfaIdex){
            if (this.creditMsg && this.creditMsg.length > 1){
                for(var i = 1; i < this.creditMsg.length; i++){
                    var data = this.creditMsg[i] || 0;
                    this.creditParms.push(data);
                }
            }else{
                if (wanfaIdex == 1){
                    for(var i = 15; i <= 21; i++){
                        var data = this.wanfaList[i] || 0;
                        this.creditParms.push(data);
                    }
                }else if (wanfaIdex == 4 || wanfaIdex == 5){
                    for(var i = 16; i <= 22; i++){
                        var data = this.wanfaList[i] || 0;
                        this.creditParms.push(data);
                    }
                }else if (wanfaIdex == 2){
                    for(var i = 14; i <= 20; i++){
                        var data = this.wanfaList[i] || 0;
                        this.creditParms.push(data);
                    }
                }else if ( wanfaIdex == 6 ||  wanfaIdex == 7 || wanfaIdex == 3 || wanfaIdex == 8 || wanfaIdex == 9){
                    for(var i = 1; i < this.creditMsg.length; i++){
                        var data = this.creditMsg[i] || 0;
                        this.creditParms.push(data);
                    }
                }
            }
        }



    },

    initCreditTip: function(){
        this.Label_creditTip = this.getWidget("Label_creditTip");
        this.Image_creditTip = this.getWidget("Image_creditTip");
        this.Image_creditTip.visible = false;
        var str = "1、比赛房勾选后开始设定比赛房限制；\n" +
            "2、参与最低比赛分：玩家比赛分低于设定值时不可进入房间；\n" +
            "3、踢出最低比赛分：牌局中当任意玩家比赛分低于设定值时将提前解散房间；\n" +
            "4、赠送群主比赛分：固定赠送，牌局结算后大赢家或所有赢家自动赠送群主设定的比赛分；比例赠送，牌局结算后打赢大赢家或所有赢家自动赠送群主赢分的设定比例的比赛分；\n" +
            "5、底分：牌局中获得的输赢积分*底分=输赢比赛分；\n" +
            "6、参与最低比赛分必须大于踢出最低比赛分；" ;
        this.Label_creditTip.setString(""+str);

        this.mainPop = this.getWidget("mainPopup");
        UITools.addClickEvent(this.mainPop, this , this.onClickMainPop);
    },

    getCredit: function(){
        var credit = 0 ;
        if (this.getWanfaIdex() == this.wanfaIdex){
            if (this.creditMsg && this.creditMsg.length > 1){
                credit = this.creditMsg[0];
            }else{
                if (this.wanfaIdex == 1){
                    credit = this.wanfaList[14];
                }else if (this.wanfaIdex == 4 || this.wanfaIdex == 5){
                    credit = this.wanfaList[15];
                }else if (this.wanfaIdex == 2){
                    credit = this.wanfaList[13];
                }else if (this.wanfaIdex == 3){
                    credit = this.wanfaList[14];
                }else if (this.wanfaIdex == 6 || this.wanfaIdex == 7 || this.wanfaIdex == 3|| this.wanfaIdex == 8 || this.wanfaIdex == 9){
                    credit = this.creditMsg[0];
                }
            }
        }
        this.credit = credit || 0;
    },

    getCreditParms: function(){
        var creditParms = [];
        if (this.credit == 1){
            creditParms.push(this.credit);
            if (this.creditParms && this.creditParms.length > 0){
                for(var i = 0; i < this.creditParms.length; i++){
                    var data = this.creditParms[i];
                    creditParms.push(data);
                }
            }
        }
        return creditParms;
    },

    upDateCreditParms: function(event){
        var parms = event.getUserData();
        this.creditParms = [];
        if (this.credit == 1){
            this.creditParms = parms;
        }else{
            this.parms = [];
        }
    },


    onCredit: function(){
        var btn = this.btn_credit;
        var txt = this.txt_credit;
        if (this.credit == 0){
            this.onCreditChange();
        }
        if(btn.isBright()){
            txt.setColor(cc.color(93 , 33 , 7));
            btn.setBright(false);
            this.btn_creditChange.visible = false;
            this.credit = 0;
        }else{
            txt.setColor(cc.color(254 , 115 , 34));
            btn.setBright(true);
            this.btn_creditChange.visible = true;
            this.credit = 1;
        }
    },

    displayCredit: function(){
        var btn = this.btn_credit;
        var txt = this.txt_credit;
        if (this.credit  && parseInt(this.credit)){
            txt.setColor(cc.color(254 , 115 , 34));
            btn.setBright(true);
            this.btn_creditChange.visible = true;
        }else{
            txt.setColor(cc.color(93 , 33 , 7));
            btn.setBright(false);
            this.btn_creditChange.visible = false;
        }
    },

    onCreditTip: function(){
        this.Image_creditTip.visible = true;
    },

    onClickMainPop: function(){
        this.Image_creditTip.visible = false;
    },

    onCreditChange: function(){
        var credit = 0 ;
        if (this.getWanfaIdex() == this.wanfaIdex){
            if (this.creditMsg && this.creditMsg.length > 1){
                credit = this.creditMsg[0];
            }else{
                if (this.wanfaIdex == 1){
                    credit = this.wanfaList[14];
                }else if (this.wanfaIdex == 4 ||this.wanfaIdex == 5){
                    credit = this.wanfaList[15];
                }else if (this.wanfaIdex == 2){
                    credit = this.wanfaList[13];
                }else if (this.wanfaIdex == 6 || this.wanfaIdex == 7 || this.wanfaIdex == 3 || this.wanfaIdex == 8 || this.wanfaIdex == 9){
                    credit = this.creditMsg[0];
                }
            }
        }
        var mc = new ClubCreditCreatePop(this.creditParms,credit);
        PopupManager.addPopup(mc);
    },

    showBtn:function(temp,wanfaTemp){
        for(var i = 1; i <= 3; i++){
            var btn = this.getWidget("gameBtn"+i);
            if( i == temp){
                btn.setBright(false);
                btn.setLocalZOrder(20);
                this["Panel_game"+i].visible = true;
            }else{
                btn.setBright(true);
                btn.setLocalZOrder(10);
                this["Panel_game"+i].visible = false;
            }
        }
        this.showWanFaPanel(wanfaTemp);
    },

    onUIClick:function(obj){
        var temp = parseInt(obj.temp) || 1;
        var temps = [1,4,6];
        this.showBtn(temp,temps[temp-1]);
    },

    onWanFaClick:function(obj){
        var temp = parseInt(obj.temp) || 1;
        this.showWanFaPanel(temp);
    },

    showWanFaPanel:function(temp){
        for(var i = 1; i <= 9; i++){
            var tempPanel = i;
            if ( i >= 5){
                tempPanel = i -1;
            }
            var Label_game_name = this["wanfaBtn"+i].getChildByName("Label_game_name");
            if( i == temp){
                this["wanfaBtn"+i].setBright(false);
                if (Label_game_name){
                    Label_game_name.setColor(cc.color(24 , 97 , 118))
                }
            }else{
                this["wanfaBtn"+i].setBright(true);
                if (Label_game_name){
                    Label_game_name.setColor(cc.color(255 , 255 , 255))
                }
            }
        }

        var tempPanel = temp;
        if ( temp >= 5){
            tempPanel = temp -1;
        }
        this.WanfaPop = null;

        for(var j = 1 ; j <= 9; j++){
            //cc.log("************",j,tempPanel)
            if (this.clazz[j]){
                if(tempPanel == j) {
                    //cc.log("show===========*",this.clazz[j].json);
                    this.clazz[j].visible = true;
                    this.WanfaPop = this.clazz[j];
                    if (tempPanel == 4){
                        this.clazz[j].onShow(temp);
                    }
                }else{
                    //cc.log("hide===========*",this.clazz[j].json);
                    this.clazz[j].visible = false;
                }
            }
        }

        //var isMj = (temp == 6 || temp == 8 || temp == 9);
        //this.daikaiBtn.setVisible(!isMj);

        var wanfaList = [];
        if (this.getWanfaIdex() == temp){
            wanfaList = this.wanfaList;
        }
        var isLeaderPay = this.isLeaderPay;
        switch (temp){
            case 1:
                if(!this.clazz[tempPanel]) {
                    this.WanfaPop = this.clazz[tempPanel] = new CreateRoomDTZ(this.isSaveChoose,wanfaList,isLeaderPay);
                    this.wanfaPanel.addChild(this.clazz[tempPanel]);
                }
                break;
            case 2:
                if(!this.clazz[tempPanel]) {
                    this.WanfaPop = this.clazz[tempPanel] = new CreateRoomPDK(this.isSaveChoose,wanfaList,isLeaderPay);
                    this.wanfaPanel.addChild(this.clazz[tempPanel]);
                }
                break;
            case 3:
                if(!this.clazz[tempPanel]) {
                    this.WanfaPop = this.clazz[tempPanel] = new CreateRoomBBT(this.isSaveChoose,wanfaList,isLeaderPay);
                    this.wanfaPanel.addChild(this.clazz[tempPanel]);
                }
                break;
            case 4:
            case 5:
                var newWanfa = 0;
                if (temp == 4){
                    newWanfa = PHZGameTypeModel.SYBP;
                }else{
                    newWanfa = PHZGameTypeModel.SYZP;
                }
                if(!this.clazz[tempPanel]) {
                    this.WanfaPop = this.clazz[tempPanel] = new CreateRoomPHZ(this.isSaveChoose,wanfaList,isLeaderPay,newWanfa);
                    this.wanfaPanel.addChild(this.clazz[tempPanel]);
                    //this.WanfaPop.onShow(temp);
                }
                break;
            case 6:
                if(!this.clazz[tempPanel]) {
                    this.WanfaPop = this.clazz[tempPanel] = new CreateRoomHZMJ(this.isSaveChoose,wanfaList,isLeaderPay);
                    this.wanfaPanel.addChild(this.clazz[tempPanel]);
                }
                break;
            case 7:
                if(!this.clazz[tempPanel]) {
                    this.WanfaPop = this.clazz[tempPanel] = new CreateRoomLDFPF(this.isSaveChoose,wanfaList,isLeaderPay);
                    this.wanfaPanel.addChild(this.clazz[tempPanel]);
                }
                break;
            case 8:
                if(!this.clazz[tempPanel]) {
                    this.WanfaPop = this.clazz[tempPanel] = new CreateRoomSYMJ(this.isSaveChoose,wanfaList,isLeaderPay);
                    this.wanfaPanel.addChild(this.clazz[tempPanel]);
                }
                break;
            case 9:
                if(!this.clazz[tempPanel]) {
                    this.WanfaPop = this.clazz[tempPanel] = new RuleSelect_CSMJ(this.isSaveChoose,wanfaList,isLeaderPay);
                    this.wanfaPanel.addChild(this.clazz[tempPanel]);
                }
                break;
        }

        this.wanfaIdex = temp;
        if (ClickClubModel.getClubIsOpenCredit() && this.isSaveChoose){
            this.Panel_credit.visible = true;
        }else{
            this.Panel_credit.visible = false;
        }
        ////获取是否选中比赛分
        this.getCredit();
        if (this.wanfaIdex != temp){
            this.credit = 0;
        }
        this.displayCredit();
    },

    //获取最新的玩法列表
    getWanfaList:function(){
        var wanfaList = [];
        if (this.WanfaPop){
            wanfaList = this.WanfaPop.getWanfaList();
            this.wanfa = wanfaList[1];
        }
        return wanfaList;
    },


    //存在本地最新的玩法列表
    saveConfig:function(){
        if (this.WanfaPop){
            this.WanfaPop.saveConfig();
        }
    },


    onReleaseBagRoom:function(num){
        var lastScene = UITools.getLocalItem("sy_lastClick_scene") || -1;
        var self = this;
        AlertPop.show("当前包厢有"+num+"间未开局房间,是否将其解散吗？",function(){
            NetworkJT.loginReq("groupAction", "dissTable", {
                groupId:ClickClubModel.getCurClubId() ,
                oUserId:PlayerModel.userId,
                room:self.subId,
                needAdd:1
            }, function (data) {
                if (data) {
                    if(data.count != 0){
                        SyEventManager.dispatchEvent(SyEvent.GET_CLUB_ALLBAGS,lastScene);
                    }
                    FloatLabelUtil.comText(data.message);
                }
            }, function (data) {
                FloatLabelUtil.comText(data.message);
            });
        }, function(){
            SyEventManager.dispatchEvent(SyEvent.GET_CLUB_ALLBAGS, lastScene);
        })
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

    getLocalItem:function(key){
        var val = cc.sys.localStorage.getItem(key);
        if(val)
            val = parseInt(val);
        return val;
    },

    addDtzClickEvent:function(widgets , selector){
        for(var key in widgets){
            var widget = this[key] = this.getWidget(key);
            //cc.log("key ..." , widgets , key)
            widget.temp = parseInt(widgets[key]);
            UITools.addClickEvent(widget,this,selector);
        }
    }

})