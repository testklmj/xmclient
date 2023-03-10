/**
 * Created by Administrator on 2017/7/21.
 */

var ClubHomePop = BasePopup.extend({ //BasePopup

    ctor:function(data,matchData){
        this.data = data;
        this.zyormeJt = 0;
        this.meData = [];
        this.zyData = [];
        this.matchClubId = 0;
        this.matchTime = 0;
        if (matchData){
            this.matchClubId = matchData.matchClubId;
            this.matchTime = matchData.matchTime;
        }
        this.canLastItem = true;
        this.MaxRoomItem = 25;
        this._super("res/clubHome.json");//zqHome
        //this._super(LayerFactory.CLUB_HOME);
    },

    selfRender:function(){
        UITools.setLocalItem("sy_lastClick_scene" , -1);
        this.remoteImageLoadQueue = new RemoteImageLoadQueue();
        this.clubremoteImageLoadQueue = new RemoteImageLoadQueue();
        this.lastClickTime = 0;
        this.lastMatchTime = 0;
        this.gameType = 1;
        this.modeId = null;//玩法配置id
        this.bagName = "";//当前包厢的名字
        this.wanfaList = [];//玩法列表
        this.creditMsg = [];//比赛房配置列表
        this.curClubRoomNum = 0;//房间列表的长度
        this.curClubBagNum = 0;//包厢列表的长度
        this.resp = false;
        this.allUsersData = [];
        this.allBagsData = [];
        this.clickBtnType = -1;//0 创建私密 1是创建房间 2是加入房间
        this.roomScrollViewHeight = 538;//房间列表容器的高438
        this.roomNum = 1;//创建房间的个数
        this.isHasJunTuan = (PlayerModel.groupId != 0);//是否有军团
        this.matchDt = 1;//匹配倒计时 刷新间隔
        this.leftScene = -1;//切换左边
        this.rightScene = -1;//切换右边
        this.clubListView = this.getWidget("clubListView");//自由军团对应的ListView
        this.menberListView = this.getWidget("menberListView");//成员列表listview
        this.msgListView = this.getWidget("messageListView");
        this.roomScrollView = this.getWidget("RoomScrollView");
        this.JoinPanel = this.getWidget("PanelJoin");
        this.CreatePanel = this.getWidget("PanelCreate");
        this.deleteMenberBg = this.getWidget("deleteMenberBg");
        this.noClubTip = this.getWidget("noClubTip");
        this.bgRight =this.getWidget("bgRight");
        this.labelChoiceClubMsg = this.getWidget("labelChoiceClubMsg");
        this.labelChoiceClubMsg.setString("");
        this.labelChoiceClubName = this.getWidget("labelChoiceClubName");
        this.labelChoiceClubName.setString("");
        this.Label_myCount = this.getWidget("Label_myCount");
        this.Label_myCount.setString("0");
        this.Label_myClub = this.getWidget("Label_myClub");
        this.Label_myClub.setString("0");
        //显示配置玩法
        this.labelWanfaContent = this.getWidget("Label_wanfaContent");
        this.labelWanfaContent.setString("玩法：未设置");
        //配置玩法引导
        this.imgSetWanfayd = this.getWidget("Image_setWanfayd");
        this.imgSetWanfayd.visible = false;
        //创建房间引导
        this.imgCreateyd = this.getWidget("Image_createyd");
        this.imgCreateyd.visible = false;

        //快速创建房间引导
        this.imgFastcreateyd = this.getWidget("Image_fastcreateyd");
        this.imgFastcreateyd.visible = false;


        //显示玩法的背景；
        this.imgWanfaBg = this.getWidget("Image_wanfaBg");
        this.imgWanfaBg.visible = false;

        //显示自由开房按钮层；
        this.panelBtnBg = this.getWidget("Panel_btnBg");
        this.panelBtnBg.visible = false;


        //显示快速开房开房按钮层；
        this.panelFastBtnBg = this.getWidget("Panel_FastBtnBg");
        this.panelFastBtnBg.visible = false;

        //显示快速匹配的层
        this.Panel_fastMatch = this.getWidget("Panel_fastMatch");
        this.Panel_fastMatch.visible = false;


        //显示包厢管理的层
        this.Panel_switch = this.getWidget("Panel_switch");
        this.Panel_switch.visible = false;

        this.Image_switchBg = this.getWidget("Image_switchBg");
        this.Image_switchBg.visible = false;

        //
        this.Button_bagManage = this.getWidget("Button_bagManage");
        this.Button_bagManage.visible = false;
        this.Button_left = this.getWidget("Button_left");
        this.Button_left.temp = 1;
        this.Button_right = this.getWidget("Button_right");
        this.Button_right.temp = 2;

        this.Label_scene = this.getWidget("Label_scene");


        this.bagfastJoinBtn = this.getWidget("bagfastJoinBtn");//大厅界面的快速加入
        this.bagfastJoinBtn.visible = false;

        this.Image_ruleBg = this.getWidget("Image_ruleBg");//玩法选择的背景
        this.Image_ruleBg.visible = false;


        this.Label_ruleTip = this.getWidget("Label_ruleTip");//当前选择的玩法提示
        this.Label_ruleTip.setString("当前无玩法请先选择一个玩法后再快速加入");

        //没有包厢提示
        this.Image_bagcreateyd = this.getWidget("Image_bagcreateyd");
        this.Image_bagcreateyd.visible = false;

        //this.Button_bagManage.visible = true;

        //显示快速匹配的人数
        this.Image_fastMatchBg = this.getWidget("Image_fastMatchBg");
        this.Image_fastMatchBg.visible = false;

        this.fastBtnMatch = this.getWidget("fastBtnMatch");

        this.fastBtnMatchTip = this.getWidget("fastBtnMatchTip");

        this.Image_matchtip = this.getWidget("Image_matchtip");
        this.Image_matchtip.visible = false;

        this.Label_ppcount = this.getWidget("Label_ppcount");
        this.Label_ppcount.setString("");

        var ruleStr = "匹配模式规则:\n"+
                      "  1、设定人数上限,达到人数时才能随机匹配到房间;\n"+
                      "  2、匹配房间成功后自动开局;\n"+
                      "  3、匹配模式只针对3人玩法,不支持房主支付;";

        this.Label_matchtip = this.getWidget("Label_matchtip");
        this.Label_matchtip.setString(ruleStr);

        //this.bgRight.visible = false;
        var inputIdImg = this.getWidget("inputIDImg");
        var inputNameImg = this.getWidget("inputNameImg");
        var btnCraeteClub = this.getWidget("btnCreateClub");
        var btnSureJoin = this.getWidget("btnSureJoin");
        var btnSureCreate = this.getWidget("btnSureCreate");
        var btnCancelJoin = this.getWidget("btnCancelJoin");
        var btnCancelCreate = this.getWidget("btnCancelCreate");
        var btnCreateRoom = this.getWidget("btnCraeteRoom");
        var btnCreateSelect = this.getWidget("btnCreateSelect");
        var btnWanfaSet = this.btnWanfaSet = this.getWidget("Button_wanfaSet");
        btnWanfaSet.visible = false;
        var btnJoinRoom = this.getWidget("btnJoinRoom");
        var btnMembers = this.getWidget("btnMembers");
        var btnSet = this.getWidget("btnSet");
        var btnMessage = this.btnMsg = this.getWidget("btnMsg");
        var btnTeamManage = this.btnTeamManage = this.getWidget("btnTeamManage");
        btnTeamManage.visible = false;
        this.redPoint = this.getWidget("redPoint");
        var close_btn = this.getWidget("close_btn");
        var return_btn = this.getWidget("return_btn");
        var Button_8 = this.getWidget("Button_8");
        var btnSearch = this.getWidget("btnSearch");
        this.btnInvite = this.getWidget("btnInvite");
        this.btnJie = this.getWidget("btnJiesan");
        this.btnInvite.visible = false;
        this.btnRefresh = this.getWidget("btnRefresh");
        var Panel_upBg = this.Panel_upBg = this.getWidget("Panel_upBg");
        this.Panel_upBg.visible = false;
        var btnRank = this.getWidget("btnRank");
        this.msgRedPoint = this.getWidget("msgRedPoint");

        this.bgLeft = this.getWidget("bgLeft");
        this.bgLeft.visible = true;
        var Button_kai = this.Button_kai = this.getWidget("Button_kai");
        //显示和隐藏操作界面
        UITools.addClickEvent(Button_kai , this , this.onShowBgLeft);


        //快速开房模式下的 操作按钮
        this.fastBtnCraeteRoom = this.getWidget("fastBtnCraeteRoom");
        this.fastBtnJoinRoom = this.getWidget("fastBtnJoinRoom");
        this.fastBtnCreateSelect = this.getWidget("fastBtnCreateSelect");
        var Button_ruleChoose = this.getWidget("Button_ruleChoose");

        UITools.addClickEvent(this.fastBtnCreateSelect , this , this.onFastBtnCreateSelect);
        UITools.addClickEvent(this.fastBtnJoinRoom , this , this.onFastBtnJoinRoom);
        UITools.addClickEvent(this.fastBtnCraeteRoom , this , this.onFastBtnCraeteRoom);
        UITools.addClickEvent(this.btnJie , this , this.onShowOrHideJieBtn);
        UITools.addClickEvent(this.fastBtnMatch, this , this.onFastBtnMatch);

        this.redPoint.visible = this.msgRedPoint.visible = false;
        UITools.addClickEvent(btnCraeteClub , this , this.onShowCreatePop);
        UITools.addClickEvent(btnSureJoin , this , this.onJoinClub);
        UITools.addClickEvent(btnSureCreate , this , this.onCreateClub);
        UITools.addClickEvent(btnCancelJoin , this , this.onCancel);
        UITools.addClickEvent(btnCancelCreate , this , this.onCancel);
        UITools.addClickEvent(btnCreateRoom , this , this.clickCreateRoom);
        UITools.addClickEvent(btnCreateSelect , this , this.clickCreateSelect);
        UITools.addClickEvent(btnJoinRoom , this , this.clickJoinRoom);
        //UITools.addClickEvent(btnWanfaSet , this , this.clickWanfaSet);
        UITools.addClickEvent(btnMembers , this , this.showMenberList);
        UITools.addClickEvent(btnMessage , this , this.onClickCredit);
        UITools.addClickEvent(close_btn , this , this.onCloseClubHome);
        UITools.addClickEvent(return_btn , this , this.onCloseClubHome);
        UITools.addClickEvent(btnSet , this , this.onSet);
        UITools.addClickEvent(Button_8 , this, this.onXin);
        UITools.addClickEvent(btnSearch , this, this.onShowZJ);
        UITools.addClickEvent(this.btnInvite , this , this.onOpenInvite);
        UITools.addClickEvent(this.btnRefresh , this , this.clickRefresh);
        UITools.addClickEvent(btnRank , this, this.showClubRank);
        UITools.addClickEvent(this.fastBtnMatchTip, this , this.onMatchTip);
        UITools.addClickEvent(this.Button_bagManage, this , this.onBagManage);
        UITools.addClickEvent(this.Button_right, this , this.onSwitchScene);
        UITools.addClickEvent(this.Button_left, this , this.onSwitchScene);
        UITools.addClickEvent(this.bagfastJoinBtn, this , this.onBagFastJoin);
        UITools.addClickEvent(this.btnTeamManage, this , this.onClickTeamManager);
        UITools.addClickEvent(Button_ruleChoose, this , this.onOpenRuleChoose);


        this.addCustomEvent(SyEvent.SOCKET_OPENED,this,this.onSuc);
        this.addCustomEvent(SyEvent.GET_SERVER_SUC,this,this.onChooseCallBack);
        this.addCustomEvent(SyEvent.NOGET_SERVER_ERR,this,this.onChooseCallBack);
        this.addCustomEvent(SyEvent.ADD_JT_PAIJU,this,this.onChooseCallBack);
        this.addCustomEvent(SyEvent.GET_JT_PAIJU,this,this.onShowJTManage);
        this.addCustomEvent(SyEvent.UPDATE_JLB,this,this.onUpdateClubList);
        this.addCustomEvent(SyEvent.CLUB_DELETE_ONE,this,this.onHadDeleteOneRoom);
        this.addCustomEvent(SyEvent.CLUB_SHOW_MATCH_TIP,this,this.onGetMatchData);
        this.addCustomEvent(SyEvent.UPDATE_CLUB_CHOOSE_PANEL,this,this.showChoosePanel);
        this.addCustomEvent(SyEvent.GET_CLUB_ALLBAGS,this,this.refreshClubBagData);
        this.addCustomEvent(SyEvent.UPDATE_SHOW_BAGWANFA,this,this.onUpdateRuleTip);
        this.addCustomEvent(SyEvent.CLUB_BAG_FASTJOIN,this,this.onBagFastJoin);
        this.addCustomEvent(SyEvent.CLUB_BAG_CREATE,this,this.onBagFastCreate);
        //this.addCustomEvent(SyEvent)



        //初始化两个输入框
        this.inputId = new cc.EditBox(cc.size(263, 71),new cc.Scale9Sprite("res/ui/dtzjulebu/julebu/shurukuang.png"));
        this.inputId.setString("");
        this.inputId.x = inputIdImg.width/2;
        this.inputId.y = inputIdImg.height/2;
        this.inputId.setFontColor(cc.color("7D2E00"));
        this.inputId.setDelegate(this);
        this.inputId.setFont("Arial",26);
        this.inputId.setMaxLength(30);
        this.inputId.setPlaceHolder("输入亲友圈ID");
        this.inputId.setPlaceholderFont("Arial" , 26);
        inputIdImg.addChild(this.inputId,0);

        this.inputName = new cc.EditBox(cc.size(263, 71),new cc.Scale9Sprite("res/ui/dtzjulebu/julebu/shurukuang.png"));
        this.inputName.setString("");
        this.inputName.x = inputNameImg.width/2;
        this.inputName.y = inputNameImg.height/2;
        this.inputName.setFontColor(cc.color("7D2E00"));
        this.inputName.setDelegate(this);
        this.inputName.setFont("Arial",26);
        this.inputName.setMaxLength(30);
        this.inputName.setPlaceHolder("输入亲友圈名");
        this.inputName.setPlaceholderFont("Arial" , 26);
        inputNameImg.addChild(this.inputName,0);


        //this.Button_send = this.getWidget("Button_send");
        this.Button_ryq = this.getWidget("Button_ryq");
        var main = this.main = this.getWidget("main");
        var chengyuan = this.chengyuan = this.getWidget("chengyuan");
        var xiugai = this.xiugai = this.getWidget("xiugai");
        var manage = this.manage = this.getWidget("manage");
        var tongji = this.tongji = this.getWidget("tongji");
        var Button_xyf = this.getWidget("Button_xyf");

        //this.addCustomEvent(SyEvent.CREATE_CLUB_OK,this,this.onJoinJunTuan);
        this.addCustomEvent(SyEvent.CREATE_CLUB_OK,this,this.onCreateSucsuss);
        this.addCustomEvent(SyEvent.SEND_JOIN_CLUB_OK,this,this.onJoinSucsuss);
        this.addCustomEvent(SyEvent.JOIN_CLUB_OK , this,this.onSmOneJoinClub);
        this.addCustomEvent(SyEvent.UPDATE_CLUB_LIST , this , this.onUpdateClubList);
        this.addCustomEvent(SyEvent.OPEN_BYQ_PANEL,this,this.onHideHongDian);
        this.addCustomEvent(SyEvent.OPEN_SHENPI_PANEL,this,this.onHideSpHongDian);
        this.addCustomEvent(SyEvent.GET_CLUB_ROOMS , this ,this.respGetRoomsData);
        this.addCustomEvent(SyEvent.GET_CLUB_BAGS , this ,this.respGetBagsData);
        this.addCustomEvent(SyEvent.CLUB_ROOM_DETAILPOP,this,this.onShowRoomDetail);
        this.addCustomEvent(SyEvent.UPDATE_MESSAGE_REDPOINT,this,this.showRedPoint);
        this.initClickClubData();
        this.getAllClubsData();
        this.showRedPoint();
        this.scheduleUpdate();
        cc.log("启动定时器...");
    },

    onHadDeleteOneRoom:function(){
        this.doRefresh();
    },

    onShowRoomDetail:function(event){
        var allData = event.getUserData();
        PopupManager.addPopup(new ClubRoomDetailPop(allData));
    },

    onRevealShowLeft:function(){
        if(this.bgLeft.isMoveing == true ){
            return;
        }
        var time = 1;
        var endPos = cc.p(0 , this.bgLeft.y);
        if (this.Button_kai && !this.Button_kai.isBright()){
            this.Button_kai.setBright(true);
            endPos = cc.p(189 , this.bgLeft.y);

            var actionEndCallBack = cc.callFunc(this.actionEndCallBack, this);
            var moveAction = cc.moveTo(time , endPos);
            var move_ease_in = moveAction.clone().easing(cc.easeElasticOut(0.5));
            var rep = cc.sequence(move_ease_in ,  actionEndCallBack);
            this.bgLeft.runAction(rep);//move_ease_in
            this.bgLeft.isMoveing = true;
        }
    },

    onShowBgLeft:function(obj){
        if(this.bgLeft.isMoveing == true ){
            return;
        }
        var time = 1;
        var endPos = cc.p(0 , this.bgLeft.y);
        if (obj.isBright()){
            obj.setBright(false);
            endPos = cc.p(-189 , this.bgLeft.y);
        }else{
            obj.setBright(true);
            endPos = cc.p(189 , this.bgLeft.y);
        }
        var actionEndCallBack = cc.callFunc(this.actionEndCallBack, this);
        var moveAction = cc.moveTo(time , endPos);
        var move_ease_in = moveAction.clone().easing(cc.easeElasticOut(0.5));
        var rep = cc.sequence(move_ease_in ,  actionEndCallBack);
        this.bgLeft.runAction(rep);//move_ease_in
        this.bgLeft.isMoveing = true;
    },

    actionEndCallBack:function(sender){
        if(sender){
            sender.isMoveing = false;
        }
    },


    onShowOrHideJieBtn:function(){
        if(ClickClubModel.isClubCreaterOrLeader()){//this.clickClubRole == 0
            var items = this.roomScrollView.getChildren();
            for(var index = 0 ; index < items.length ; index++){
                var item = items[index];
                item.showOrHideJiesanBtn();
            }
        }else{
            FloatLabelUtil.comText("权限不足");
        }
    },

    getRoomItemByRoomId:function(tRoomId){
        var items = this.roomScrollView.getChildren();
        for(var index = 0 ; index < items.length ; index++){
           if(tRoomId == items[index].getRoomId()){
               return items[index];
           }
        }
        return null;
    },

    isRoomExist:function(tRoomId){
        var items = this.getRoomItemByRoomId(tRoomId);
        return (items == null);
    },


    update: function(dt) {
        this.matchDt = this.matchDt + dt;
        if (this.matchTime > 0){
            if (this.matchDt >= 1) {
                cc.log("this.matchTime=="+this.matchTime);
                this.matchTime = this.matchTime - 1;
                this.matchDt = 0;
                if (this.matchTime <= 0){
                    var matchData = [];
                    matchData[0] = 3;
                    matchData[4] = this.matchTime;
                    this.onShowMatchTipPop(matchData);
                }
            }

        }

        this.remoteImageLoadQueue.update(dt);
        this.clubremoteImageLoadQueue.update(dt);
    },


    isForceRemove:function(){
        return true;
    },


    joinRoom:function(tableId){
        this.tableId = tableId;
        var str = "正在进入房间";
        sy.scene.showLoading(str);
        this.resp = true;
        cc.log(str+"..." , this.tableId);

        sySocket.sendComReqMsg(29 , [0] , this.tableId + "");
    },

    createRoom:function(){
        if (!this.modeId){
            FloatLabelUtil.comText("未设置玩法配置");
            return;
        }
        var wanfa = this.wanfaList[1] || 113;
        var str = "";
        if (this.clickBtnType == 0){
            str = "正在创建私密房间";
        }else if (this.clickBtnType == 1){
            str = "正在创建房间";
        }
        sy.scene.showLoading(str);
        this.resp = true;
        sySocket.sendComReqMsg(29 , [parseInt(wanfa)] , "0");

    },
    fastCreateRoom:function(){
        if (!this.modeId){
            FloatLabelUtil.comText("未设置玩法配置");
            return;
        }
        var str = "正在加入";
        sy.scene.showLoading(str);
        var wanfa = this.wanfaList[1] || 113;
        this.resp = true;
        cc.log("wanfa:::::::::::::::"+wanfa);
        //后台需要加的["0",this.modeId+"",this.clickClubId+""]
        sySocket.sendComReqMsg(29 , [parseInt(wanfa)] , ["0",this.modeId+"",ClickClubModel.getCurClubId()+""]);
    },

    onSuc:function(){
        sy.scene.hideLoading();
        cc.log("切服成功...");
        cc.log("this.clickClubId...",this.clickClubId,this.clickBtnType);
        cc.log("this.this.modeId..."+this.modeId);
        cc.log("this.this.roomNum..."+this.roomNum);
        if(this.resp == true){
            this.resp = false;
            var rooNum = this.roomNum;
            //cc.log("this.modeId",this.modeId);
            if (this.clickBtnType == 0){
                //军团ID,
                //房间个数
                //房间可见性（私密传0）
                //房间模式Id（如果是纯数字则取参数，否则取军团中最新的一个模式）
                sySocket.sendComReqMsg(1, [],[ClickClubModel.getCurClubId()+"",rooNum + "","0",this.modeId+""]);
            }else if (this.clickBtnType == 1){
                sySocket.sendComReqMsg(1, [],[ClickClubModel.getCurClubId()+"",rooNum + "","1",this.modeId+""]);
            }else if (this.clickBtnType == 2){
                sySocket.sendComReqMsg(2,[parseInt(this.tableId),this.gameType]);
            }else if (this.clickBtnType == 3){
                cc.log("this.modeId==============",ClickClubModel.getCurClubId(),this.gameType,this.modeId,PlayerModel.clubTableId)
                ClickClubModel.updateBagModeId(ClickClubModel.getCurClubId(),this.modeId);
                if (PlayerModel.clubTableId == 0){
                    sySocket.sendComReqMsg(1, [],[ClickClubModel.getCurClubId()+"",1 + "","1",this.modeId+""]);
                }else{
                    sySocket.sendComReqMsg(2,[parseInt(PlayerModel.clubTableId),this.gameType,1,0,ClickClubModel.getCurClubId()],[this.modeId+""]);
                }
            }else if (this.clickBtnType == 4){
                ClickClubModel.updateBagModeId(ClickClubModel.getCurClubId(),this.modeId);
                sySocket.sendComReqMsg(1, [],[ClickClubModel.getCurClubId()+"",1 + "","1",this.modeId+""]);
            }

            //cc.log("你他妈进来了没！！！！！！！！！！！！！！！！！！！")

        }
    },

    onChooseCallBack:function(event){
        var status = event.getUserData();
        if(status == ServerUtil.GET_SERVER_ERROR){
            sy.scene.hideLoading();
            FloatLabelUtil.comText("切服失败");
        }else if(status == ServerUtil.NO_NEED_CHANGE_SOCKET){
            this.onSuc();
        }
    },

    onFastBtnCreateSelect:function(){
        if (ClickClubModel.isClubCreaterOrLeader()){
            this.clickBtnType = 1;
            this.roomNum = 10;
            this.createRoom();
        }else{
            this.clickBtnType = 0;
            this.roomNum = 1;
            this.createRoom();
        }
    },

    onFastBtnCraeteRoom:function(){
        this.roomNum = 1;
        this.clickBtnType = 1;
        this.createRoom();
    },

    onFastBtnJoinRoom:function(){
        this.clickBtnType = 3;
        this.fastCreateRoom();
    },

    onFastBtnMatch: function(obj,_state){
        cc.log("发送快速匹配请求");
        var curTime = new Date();

        cc.log("this.lastMatchTime.. ",this.lastMatchTime,curTime)
        if(this.lastMatchTime == 0 || this.lastMatchTime < curTime - 800){
            this.lastMatchTime = curTime;
        }else{
            FloatLabelUtil.comText("请不要点击太快哦！");
            return
        }

        this.resp = true;
        cc.log("ClickClubModel.getCurClubId()..." , ClickClubModel.getCurClubId());
        var state = _state || 1;//1加入2离开3查看 为3时下标1位为具体的消息
        cc.log("state.. ",state)
        sySocket.sendComReqMsg(97 , [state] , [ClickClubModel.getCurClubId() + ""]);
        //this.onShowMatchTipPop();
    },

    onMatchTip: function(){
        if (this.Image_matchtip.isVisible()){
            this.Image_matchtip.visible = false;
        }else{
            this.Image_matchtip.visible = true;
        }
    },

    //解析后台传过来的数据
    onGetMatchData: function(event) {
        var data = event.getUserData();
        this.onShowMatchTipPop(data);
    },

    onShowMatchTipPop: function(data) {
        var state = data[0];
        //（1加入、2离开、3查看0是匹配失败,4取消匹配剩余时间）
        this.matchClubId = 0;
        var self = this;
        if(PopupManager.hasClassByPopup(MacthTipPop))
            SyEventManager.dispatchEvent(SyEvent.REMOVE_MATCH_LOADING,{});
        if (state == 1 || state == 3){
            /**
            1：最少匹配人数
            2：当前人数
            3：还差多少人
            **/
            var nowCount = data[2] || 0;
            var needCount = data[3] || 0;
            var matchData = {};
            //matchData.nowCount = nowCount;
            //matchData.needCount = needCount;
            matchData.content = "反作弊模式匹配中，请您耐心等待……";
            matchData.matchTime = data[4];
            this.matchTime = data[4];
            AlertPop.showMacthTip(matchData,function(){
                self.onMatchShare(nowCount,needCount);
            },function(){
                //1加入2离开3查看 为3时下标1位为具体的消息
                sySocket.sendComReqMsg(97 , [2] , [ClickClubModel.getCurClubId() + ""]);
            })
        }else if(state == 2){
            FloatLabelUtil.comText("取消匹配成功");
        }else if(state == 0){
            //FloatLabelUtil.comText("匹配失败");
        }
    },

    getMatchShareContent:function(){
        //分享文本：亲友圈id，打筒子，几人玩法几缺几,目前有人正在匹配，等的就是你，速速行动吧）
        var gameName = ClubRecallDetailModel.getGameName(this.wanfaList);
        var shareContent =  gameName + ",目前有人正在匹配,等的就是你,速速行动吧";
        return shareContent;
    },

    onMatchShare:function(nowCount,needCount){
        var playerStr = "";
        //var playerStr = parseInt(needCount) + parseInt(nowCount) + "缺" + needCount;
        var obj = {};
        obj.tableId = 0;
        obj.userName = PlayerModel.username;
        obj.callURL=SdkUtil.SHARE_URL+'?userId='+encodeURIComponent(PlayerModel.userId);
        obj.title = '熊猫麻将  亲友圈ID:' + ClickClubModel.clickClubId + " " +playerStr;
        obj.description = this.getMatchShareContent(nowCount,needCount);
        obj.shareType = 1;
        obj.session = 0;
        SdkUtil.sdkFeed(obj);
    },


    onBagManage:function(){
        var role = ClickClubModel.getCurClubRole();
        if (role == 0 || role == 1){
            PopupManager.removeClassByPopup(ClubBagManagePop);
            PopupManager.addPopup(new ClubBagManagePop(this.allBagsData));
        }else{
            FloatLabelUtil.comText("您没有权限啊！");
        }

    },

    onSwitchScene:function(obj){
        cc.log("onSwitchScene=",this.leftScene,this.rightScene);
        var lastScene = this.getLocalItem("sy_lastClick_scene") || -1;
        var nowScene = lastScene;
        var changeScene = nowScene;
        if (obj.temp == 1){
            changeScene = this.leftScene;
        }else{
            changeScene = this.rightScene;
        }
        if (nowScene != changeScene){
            cc.log("changeScene=="+changeScene);
            this.getClubBagData(changeScene,true);
        }
    },

    showBagFastJoin:function(){
        this.bagfastJoinBtn.visible = false;
        this.Image_ruleBg.visible = false;
        if (this.allBagsData && this.allBagsData.length >= 1){
            this.bagfastJoinBtn.visible = true;
            this.Image_ruleBg.visible = true;
        }
    },

    onBagFastJoin:function(){
        var modeId = ClickClubModel.getCurClubBagModeId();
        for(var index = 0 ; index < this.allBagsData.length; index++){
            var data = this.allBagsData[index];
            if (modeId == data.config.keyId){
                this.wanfaList = data.config.modeMsg.split(",");
            }
        }
        if (!modeId){
            FloatLabelUtil.comText("当前无玩法请先选择一个玩法后再快速加入");
            return;
        }
        this.clickBtnType = 3;
        var str = "正在加入！";
        sy.scene.showLoading(str);
        this.resp = true;
        var wanfa = this.wanfaList[1] || 113;
        cc.log("onBagFastJoin",modeId,wanfa);
        this.modeId = modeId;
        sySocket.sendComReqMsg(29 , [parseInt(wanfa)] , ["0",modeId+"",ClickClubModel.getCurClubId()+""]);
    },

    onBagFastCreate:function(){
        var modeId = ClickClubModel.getCurClubBagModeId();
        for(var index = 0 ; index < this.allBagsData.length; index++){
            var data = this.allBagsData[index];
            if (modeId == data.config.keyId){
                //this.modeId = data.config.keyId;/
                this.wanfaList = data.config.modeMsg.split(",");
            }
        }

        if (!modeId){
            FloatLabelUtil.comText("当前无玩法请先选择一个玩法后再快速加入");
            return;
        }
        this.clickBtnType = 4;
        var str = "正在创建";
        sy.scene.showLoading(str);
        this.resp = true;
        var wanfa = this.wanfaList[1] || 113;
        cc.log("onBagFastCreate",modeId,wanfa);
        this.modeId = modeId;
        sySocket.sendComReqMsg(29 , [parseInt(wanfa)] , "0");
        //sySocket.sendComReqMsg(29 , [parseInt(wanfa)] , ["0",modeId+"",ClickClubModel.getCurClubId()+""]);
    },


    onBagJoinRoom:function(wanfa,modeId){
        this.clickBtnType = 3;
        var str = "正在加入";
        sy.scene.showLoading(str);
        this.resp = true;
        var wanfa = wanfa || 113;
        //cc.log("onBagJoinRoom",wanfa,modeId)
        this.modeId = modeId;
        cc.log("this.modeId",this.modeId)
        sySocket.sendComReqMsg(29 , [parseInt(wanfa)] , ["0",modeId+"",ClickClubModel.getCurClubId()+""]);
    },

    clickCreateRoom:function(){
        //var isSaveChoose = false;
        //var isLeaderPay = ClickClubModel.getClubIsOpenLeaderPay();// this.clickClubIsOpenLeaderPay;
        //var mc = new ClubCreateRoom(this.modeId,ClickClubModel.getCurClubId(),ClickClubModel.getCurClubRole() ,[],isSaveChoose,isLeaderPay);
        //PopupManager.addPopup(mc);
    },

    clickCreateSelect:function(){
        this.clickBtnType = 0;
        this.createRoom();
    },

    clickJoinRoom:function(){
        var mc = new JoinRoomPop();
        PopupManager.addPopup(mc);
    },

    onShowCreatePop:function(){
        this.noClubTip.visible = false;
        PopupManager.addPopup(new CreateClubPop(this));
    },

    onOpenInvite:function(){
        PopupManager.addPopup(new ClubInvitePop(this));
    },

    onOpenRuleChoose:function(){
        var mc = new ClubRuleManagePop(this.allBagsData,ClickClubModel.getCurClubBagModeId());
        PopupManager.addPopup(mc);
    },


    showMenberList:function(){
        if(ClickClubModel.getCurClubId() == 0){
            FloatLabelUtil.comText("您还没有亲友圈！");
            return;
        }
        var mc = new MemberPop(this);
        PopupManager.addPopup(mc);
    },

    showClubRank:function(){
        var mc = new ClubRankPop(ClickClubModel.getCurClubId() , ClickClubModel.getCurClubRole() ,this);
        PopupManager.addPopup(mc);

    },

    onSet:function(){
        var mc = new ChangeClubPop(this , this.clickClubIsOpenLeaderPay , this.clickClubIsOpenCreate,this.clickClubIsOpenFastCreate,this.clickClubIsAutoCreate);
        PopupManager.addPopup(mc);
    },

    onXin:function(){
        FloatLabelUtil.comText("即将开放...");
        return
    },

    onClickCredit:function(){
        if (ClickClubModel.getClubIsOpenCredit()){
            PopupManager.addPopup(new ClubCreditPop(this));
        }else{
            FloatLabelUtil.comText("暂未开放");
            return
        }
    },

    onClickTeamManager:function(){
        var self =  this;
        if(ClickClubModel.isClubCreaterOrLeader()){
            PopupManager.addPopup(new ClubTeamPop())
        }else if(ClickClubModel.isClubTeamLeader()){//直接显示我所在分组的详情
            PopupManager.addPopup(new ClubTeamDetailPop(ClickClubModel.getClubTeamKeyId()));
        }
    },


    onJoinClub:function(){
        //告知后台 加入俱乐部
        var self = this;
        var groupId = this.inputId.getString();

        NetworkJT.loginReq("groupAction", "applyJoinGroup", {groupId:groupId,userId:PlayerModel.userId}, function (data) {
            if (data) {
                FloatLabelUtil.comText(data.message);
                SyEventManager.dispatchEvent(SyEvent.SEND_JOIN_CLUB_OK);
            }
        }, function (data) {
            cc.log("onCreate::"+JSON.stringify(data));
            FloatLabelUtil.comText(data.message);
        });
    },

    onCreateClub:function(){
        //告知后台 创建俱乐部
        var name = this.inputName.getString();
        var self = this;

        NetworkJT.loginReq("groupAction", "createGroup", {groupName: name,userId:PlayerModel.userId,subId:0}, function (data) {
            if (data) {
                FloatLabelUtil.comText(data.message);
                self.getAllClubsData();
                SyEventManager.dispatchEvent(SyEvent.CREATE_CLUB_OK);
            }
        }, function (data) {
            if (data.code && data.code == 1401){
                var _type  = 1;
                PopupManager.addPopup(new PhoneManagePop(_type));
            }else{
                FloatLabelUtil.comText(data.message);
            }

        });
    },

    onShow:function(){
        this.getAllClubsData()
    },

    initClickClubData:function(){
        this.clickClubObj = null;
        this.clickClubId = 0;//当前的俱乐部id
        this.clickKeyId = 0;   //当前俱乐部keyid
        this.clickClubName = "";//俱乐部名字
        this.clickClubRole = 2;//我在当前俱乐部的身份
        this.clickClubIsOpenLeaderPay = 0; //当前俱乐部是否开启群主支付
        this.clickClubIsOpenCreate = 0 ;//当前俱乐部是否开启普通玩家创建房间
        this.clickClubIsOpenFastCreate = 1; //当前俱乐部是否开启快速创房
        this.clickClubIsAutoCreate = 0; //当前俱乐部是否开启智能创房
        this.clickClubIsForbideJoinClub = 0;//当前俱乐部是否开启禁止加入俱乐部功能
    },

    /**
     * 获取俱乐部信息
     */
    getAllClubsData:function(){
        var self = this;
        this.initClickClubData();
        NetworkJT.loginReq("groupAction", "loadUser", {oUserId:PlayerModel.userId,checkGroup:2}, function (data) {
            if (data) {
                ClubListModel.init(data.message.list);
                sy.scene.hideLoading();
                cc.log("getClubListData::"+JSON.stringify(data));
                if(data.message.list == null || data.message.list.length == 0){
                    if( self.noClubTip){
                        self.noClubTip.visible = true;
                    }
                    UITools.setLocalItem("sy_lastClick_scene" , 0);
                }else{
                    if( self.noClubTip) {
                        self.noClubTip.visible = false;
                    }
                    self.Panel_upBg.visible = true;
                }
                self.refreshClubList(data.message.list);
            }
        }, function (data) {
            sy.scene.hideLoading();
            //cc.log("getClubListData::"+JSON.stringify(data));
            FloatLabelUtil.comText(data.message + SocketErrorModel._loginIndex);
            //获取数据失败 弹框重新请求
            AlertPop.show("获取亲友圈数据失败，请重新尝试", function(){
                self.getAllClubsData()
            });

        });
        sy.scene.hideLoading();
    },


    showRedPoint:function(){
        var self = this;
        NetworkJT.loginReq("groupAction", "groudReadPiont", {oUserId:PlayerModel.userId}, function (data) {
            if (data) {
                if (data.message && data.message.inviteReadPoint){
                    self.msgRedPoint.visible = true;
                }else{
                    self.msgRedPoint.visible = false;
                }
            }
        }, function (data) {
            FloatLabelUtil.comText(data.message);
        });
    },

    isDTZWanfa:function(wanfa){
        var isDtz = false ;
        if ((wanfa >= 113 && wanfa <= 118) || (wanfa >= 210 && wanfa <= 212))
            isDtz = true;
        return isDtz;
    },

    isPDKWanfa:function(wanfa){
        var isPdk = false ;
        if (wanfa == 15 || wanfa == 16)
            isPdk = true;
        return isPdk;
    },

    isPHZWanfa:function(wanfa){
        var isPhz = false ;
        if (wanfa == PHZGameTypeModel.SYZP || wanfa == PHZGameTypeModel.SYBP || wanfa == PHZGameTypeModel.LDFPF)
            isPhz = true;
        return isPhz;
    },

    isBBTWanfa:function(wanfa){
        var isBbt = false ;
        if (wanfa == 131)
            isBbt = true;
        return isBbt;
    },

    onShowWanfaLabel:function(wanfaList){
        var modeDesc = ClubRecallDetailModel.getWanfaStr(wanfaList) || "";//
        //cc.log("俱乐部玩法说明：" , modeDesc);
        return modeDesc;
    },

    /**
     * 获取俱乐部房间信息
     */
    getClubRoomListData:function(){
        //cc.log("获取俱乐部房间信息")
        var lastScene = this.getLocalItem("sy_lastClick_scene") || -1;
        this.getClubBagData(lastScene);
    },

    /**
     * 这里后期改为用ClubRoomModel记录数据 为以后做界面动态刷新做准备。
     * @param event
     */
    respGetRoomsData:function(event){

        var allData = event.getUserData();
        var tData = allData.strParams;
        var iData = allData.params;
        var page = allData.params[1] || 1;
        cc.log("respGetBagsData",iData);
        var self = this;
        this.labelWanfaContent.setString("大厅");
        if (page == 1){
            this.curClubRoomNum = 0;
        }
        if (tData && tData.length > 0){
            var jsonData = JSON.parse(tData);
            this.addRoomList(jsonData.tables);
        }

    },

    /**
     * 这里后期改为用ClubRoomModel记录数据 为以后做界面动态刷新做准备。
     * @param event
     */
    respGetBagsData:function(event){
        var allData = event.getUserData();
        var tData = allData.strParams;
        var iData = allData.params;
        var page = allData.params[1] || 1;
        var self = this;
        this.labelWanfaContent.setString("大厅");


        if (tData && tData.length > 0){
            var jsonData = JSON.parse(tData);
            //var room = jsonData.room;
            var room = -1;
            if (room){
                //刷新自由开房和快速开房需要修改的参数
                this.changeCreateRoomType(room == -1,room);
                UITools.setLocalItem("sy_lastClick_scene" , -1);
                this.Image_bagcreateyd.visible = false;
                if (room == -1){
                    this.Label_scene.setString("大厅");
                    this.btnWanfaSet.visible = false;
                    //cc.log("respGetBagsData::\n"+JSON.stringify(tData));
                    this.allBagsData = jsonData.list || [];
                    //if (page > 1){
                    //    this.addRoomList(jsonData.tables);
                    //}else{
                    this.refreshBagList(jsonData);
                    var oldModeId = ClickClubModel.getCurClubBagModeId();
                    var newModeId = 0;
                    if (this.allBagsData && this.allBagsData.length > 0){
                        for(var index = 0 ; index < this.allBagsData.length; index++){
                            var data = this.allBagsData[index];
                            //if (index == 0){
                            //    var config = data.config;
                            //    this.rightScene = config.groupId
                            //}
                            //if(index == this.allBagsData.length-1){
                            //    var config = data.config;
                            //    this.leftScene = config.groupId
                            //}
                            if (data.groupState && parseInt(data.groupState) && data.config && oldModeId == data.config.keyId){
                                newModeId = oldModeId;
                            }
                        }
                    }else{
                        this.Image_bagcreateyd.visible = true;
                        this.rightScene = this.leftScene = -1;
                    }
                    ClickClubModel.updateBagModeId(ClickClubModel.getCurClubId(),newModeId);
                    this.bagName = "";
                    //刷新包厢管理界面
                    this.showRuleTip();
                    SyEventManager.dispatchEvent(SyEvent.UPDATE_CLUB_BAGS,this.allBagsData);
                    //}
                }
                this.showBagFastJoin();
            }
        }

    },

    dealClubRoomConfig:function(data){
        if (data.length > 0){
            var modeMsg = data[0].modeMsg;
            this.modeId = data[0].keyId;
            this.wanfaList = modeMsg.split(",");
            //cc.log("creditMsg",JSON.stringify(data[0].creditMsg));
            this.labelWanfaContent.setString("玩法："+this.onShowWanfaLabel(modeMsg));
            this.showChoosePanel();
        }else{
            this.modeId = 0;//辨别是是从服务器获取到的还是自己默认的
            //cc.log("that.modeId:::::::::::::"+this.modeId);
            if(this.curClubRoomNum <= 0 ){
                this.imgFastcreateyd.visible = false;
            }
            this.wanfaList = [];
            this.imgSetWanfayd.visible = true;
            this.labelWanfaContent.setString("玩法：未设置");
        }
    },

    showChoosePanel:function(){
        //var matchNum = ClickClubModel.getKsppCount() || 0;
        ////cc.log("dealClubRoomConfig...  ",ClickClubModel.getClubIsOpenFastCreate(),matchNum);
        //if (ClickClubModel.getClubIsOpenFastCreate()){//this.clickClubIsOpenFastCreate
        //    this.Panel_fastMatch.visible = false;
        //    this.panelFastBtnBg.visible = true;
        //    this.panelBtnBg.visible = false;
        //    if (matchNum && parseInt(matchNum) > 0){
        //        this.Panel_fastMatch.visible = true;
        //        this.Image_fastMatchBg.visible = false;
        //        //this.fastBtnMatch.x = 450;
        //        if(ClickClubModel.getCurClubRole() == 0){
        //            this.Image_fastMatchBg.visible = true;
        //            //this.fastBtnMatch.x = 570;
        //        }
        //
        //        this.panelFastBtnBg.visible = false;
        //        this.panelBtnBg.visible = false;
        //        this.Label_ppcount.setString("匹配模式："+matchNum+"人");
        //    }
        //}else{
        //    this.Panel_fastMatch.visible = false;
        //    this.panelFastBtnBg.visible = false;
        //    this.panelBtnBg.visible = true;
        //}
        //
        //var lastScene = this.getLocalItem("sy_lastClick_scene") || -1;
        //if (lastScene && lastScene == -1){
        //    this.Panel_fastMatch.visible = false;
        //    this.panelFastBtnBg.visible = false;
        //    this.panelBtnBg.visible = false;
        //    this.Button_bagManage.visible = true;
        //}

        this.Panel_fastMatch.visible = false;
        this.panelFastBtnBg.visible = false;
        this.panelBtnBg.visible = false;
        this.Button_bagManage.visible = true;
        this.Button_bagManage.visible  = ClickClubModel.isClubCreaterOrLeader();
    },

    onCancel:function(){
        this.CreatePanel.visible = false;
        this.JoinPanel.visible = false;
        this.clubListView.visible = true;
    },

    getLocalItem:function(key){
        var val = cc.sys.localStorage.getItem(key);
        if(val)
            val = parseInt(val);
        return val;
    },

    updateRedPoint:function(){
        var self = this;
        NetworkJT.loginReq("groupAction", "searchGroupReview", {groupId:ClickClubModel.getCurClubId() ,msgType:ClickClubModel.getCurClubRole() <= 1?1:0 , userId:PlayerModel.userId}, function (data) {
            if (data) {
                cc.log("searchGroupReview::"+JSON.stringify(data));
                if(data.message && data.message.length > 0){
                    ClickClubModel.updateClubHasNewMsg(true);
                    self.redPoint.visible = true;
                }else{
                    ClickClubModel.updateClubHasNewMsg(false);
                    self.redPoint.visible = false;
                }
            }
        }, function (data) {
            cc.log("searchGroupReview::"+JSON.stringify(data));
            //FloatLabelUtil.comText(data.message);
            self.redPoint.visible = false;
        });
    },

    /**
     * 刷新当前俱乐部消息按钮状态
     * 有人请求加入俱乐部并且身份是管理员或者群主才显示
     */
    updateMessageBtn:function(){
        this.updateRedPoint();

        //管理
        this.btnInvite.visible = ClickClubModel.isClubCreaterOrLeader();
        ////群组管理
        this.btnTeamManage.visible = (!ClickClubModel.isClubCreaterOrLeader() && ClickClubModel.isClubTeamLeader());

        if (this.btnTeamManage.isVisible()){
            this.btnInvite.visible = false;
        }

        if(this.btnJie){
            //cc.log("ClickClubModel.isClubCreaterOrLeader::" , ClickClubModel.isClubCreaterOrLeader());
            this.btnJie.visible = (ClickClubModel.isClubCreaterOrLeader());
        }
    },

    /**点击俱乐部条目后记录部分数据
     *
     */
    onClickClub:function(data){
        if (this.clickClubId && this.clickClubId != data.clickId){
            UITools.setLocalItem("sy_lastClick_scene" , -1);
        }
        this.modeId = null;//玩法配置id
        this.bagName = "";//当前包厢的名字
        this.curClubRoomNum = 0;
        this.curClubBagNum = 0;
        this.imgSetWanfayd.visible = false;
        this.imgCreateyd.visible = false;
        this.imgFastcreateyd.visible = false;
        this.clickClubObj = data.itemSelf;
        this.clickClubId = data.clickId;//当前的俱乐部id
        this.clickKeyId = data.keyId;   //当前俱乐部keyid
        this.clickClubName = data.groupName;//俱乐部名字
        this.clickClubRole = data.userRole;//我在当前俱乐部的身份
        this.clickClubIsOpenLeaderPay = data.leaderPay; //当前俱乐部是否开启群主支付
        this.clickClubIsOpenFastCreate = data.openFast; //当前俱乐部是否开启快速创房
        this.clickClubIsOpenCreate = data.createRoom; //当前俱乐部是否开启普通玩家创建房间
        this.clickClubIsAutoCreate = data.autoCreate; //当前俱乐部是否开启智能创房
        this.clickClubIsForbideJoinClub = data.isForbidJoinClub;//是否禁止玩家加入俱乐部
        this.labelChoiceClubMsg.setString("ID:" + ClickClubModel.getCurClubId() + "");//this.clickClubName +
        this.labelChoiceClubName.setString("" + ClickClubModel.getCurClubName() + "");//this.clickClubName +

        cc.sys.localStorage.setItem("sy_lastClick_groupId",ClickClubModel.getCurClubId());
        //cc.log("当前查看的俱乐部ID ：", this.clickClubId , this.clickKeyId);
        //cc.log("data.openFast ：", data.openFast);
        ////刷新自由开房和快速开房需要修改的参数
        //this.changeCreateRoomType(true);
        ////请求后台当前俱乐部的房间信息
        //this.getClubRoomListData();
        this.updateMessageBtn();

        var lastScene = this.getLocalItem("sy_lastClick_scene") || -1;
        this.getClubBagData(lastScene);

        //他妈的又改接口了。。。。。。。。。
        if (this.matchClubId == ClickClubModel.getCurClubId()){
            //（1加入、2离开、3查看0是匹配失败,4取消匹配剩余时间）
            var matchData = [];
            matchData[0] = 3;
            matchData[4] = this.matchTime;
            this.onShowMatchTipPop(matchData);
            //this.onFastBtnMatch(null,3)
        }

    },

    refreshClubBagData:function(event){
        var index = event.getUserData() || -1;
        this.getClubBagData(index);
    },

    /**
     * 刷新显示当前选择的玩法
     * ***/
    onUpdateRuleTip:function(event){
        var data = event.getUserData();
        this.modeId = data.modeId;
        ClickClubModel.updateBagModeId(ClickClubModel.getCurClubId(),this.modeId);
        this.showRuleTip();
    },

    /**
     * 显示当前选择的玩法
     * ***/
    showRuleTip:function(){
        var modeId = ClickClubModel.getCurClubBagModeId();
        var str = "当前无玩法请先选择一个玩法后再快速加入";
        var bagNameStr = "";
        //cc.log("showRuleTip",modeId)
        var creditStr = "";
        if (modeId){
            //cc.log("this.allBagsData",JSON.stringify(this.allBagsData))
            for(var index = 0 ; index < this.allBagsData.length; index++){
                var data = this.allBagsData[index];
                if (modeId == data.config.keyId && data.groupState && parseInt(data.groupState)){
                    this.wanfaList = data.config.modeMsg.split(",");
                    this.creditMsg = data.config.creditMsg.split(",");
                    if (this.creditMsg && this.creditMsg[0]){
                        creditStr = "比赛房";
                    }
                    str = ClubRecallDetailModel.getWanfaStr(data.config.modeMsg);
                    bagNameStr = "【" + data.groupName + "】";
                }
            }
        }
        str = bagNameStr + str + creditStr;
        this.Label_ruleTip.setString(str);
    },

    //isAuto是否切换
    getClubBagRoomsData:function(lastScene,CurPage){
        //str数组下标0小于0时代表获取包厢列表；
        var index = lastScene || -1;
        var isAutoNum = -1;
        //if (isAuto){
        //    isAutoNum = 1;
        //}
        var page = 1;
        if (CurPage){
            page = CurPage;
        }
        index = -1;
        ComReq.comReqGetClubBagRoomsData([ClickClubModel.getCurClubId(), page, this.MaxRoomItem, 1, 1],["" + index ,""+isAutoNum]);
    },

    //获取包厢列表
    getClubBagData:function(lastScene,CurPage){
        cc.log("请求了包厢数据====",ClickClubModel.getCurClubId())
        ComReq.comReqGetClubBagsData([ClickClubModel.getCurClubId()],[]);
    },

    /**
     * 刷新俱乐部列表
     */
    refreshClubList:function(clubDataList){
        this.clubremoteImageLoadQueue.stopLoad();
        var lastChoice = this.getLocalItem("sy_lastClick_groupId")||0;
        if(this.clubListView){
            this.clubListView.removeAllChildren();
        }
        if(!clubDataList){
            cc.log("获取俱乐部数据失败...");
            return;
        }

        for(var index = 0 ; index < clubDataList.length; index++){
            var clubItem = new ClubItem(clubDataList[index] , this);
            this.clubListView.pushBackCustomItem(clubItem);
        }
        this.clubListView.visible = true;
        cc.log("clubDataList.length============",clubDataList.length)
        if(clubDataList.length > 0){
            this.Panel_switch.visible = true;
            this.Button_kai.setBright(false);
            this.bgLeft.x = -189;
            var items = this.clubListView.getItems();
            var foundLastOne = false;
            //cc.log("items.length .. " ,items.length , lastChoice);
            for(var i = 0 ; i < items.length ; i++){
                //cc.log("items[i].getGroupId()" , items[i].getGroupId());
                if(items[i].getGroupId() == lastChoice){
                    items[i].onClick(clubDataList[i]);
                    foundLastOne = true;
                    if(i >= 5){
                        this.clubListView.scrollToPercentVertical(i/clubDataList.length , 1000 , false)
                    }
                }
            }

            if(foundLastOne == false){//没有上次选中的groupid 默认选中第一个
                UITools.setLocalItem("sy_lastClick_scene" , -1);
                items[0].onClick();
            }
        }
    },

    changeCreateRoomType:function(noNeedAskServer,room){
        var noNeedAskServer = noNeedAskServer || false;
        //cc.log("this.clickClubIsOpenFastCreate::" + this.clickClubIsOpenFastCreate + ClickClubModel.getClubIsOpenFastCreate())
        if (ClickClubModel.getClubIsOpenFastCreate()){//this.clickClubIsOpenFastCreate
            //this.imgWanfaBg.visible = true;
            //this.roomScrollViewHeight = 438;
            this.panelFastBtnBg.visible = true;
            this.panelBtnBg.visible = false;
            if (ClickClubModel.isClubCreaterOrLeader()){
                this.fastBtnCreateSelect.visible = true;
                this.fastBtnCreateSelect.loadTextureNormal("res/ui/dtzjulebu/julebu/BagManage/img_9.png");
                //this.fastBtnCraeteRoom.x = 433;
                //this.fastBtnJoinRoom.x = 733;
            }else{
                //this.fastBtnCreateSelect.loadTextureNormal("res/ui/dtz/dtzCreateRoom/btnCreateScrete.png");
                //屏蔽创建私密房功能
                this.fastBtnCreateSelect.visible = false;
                //修正剩下的按钮位置
                //cc.log(this.fastBtnCraeteRoom.x + "  jack slow fuck " + this.fastBtnJoinRoom.x);
                //this.fastBtnCraeteRoom.x = 433 - 200;
                //this.fastBtnJoinRoom.x = 733 - 100;

            }
            this.showChoosePanel();
            this.Button_bagManage.visible = false;
            if (room == -1){
                this.Panel_fastMatch.visible = false;
                this.panelFastBtnBg.visible = false;
                this.panelBtnBg.visible = false;
                this.Button_bagManage.visible = true;
                this.Button_bagManage.visible  = ClickClubModel.isClubCreaterOrLeader();
            }
            //if(!noNeedAskServer){
            //    this.onShowJTManage();
            //}
        }else {
            //this.imgWanfaBg.visible = false;
            //this.roomScrollViewHeight = 538;
            this.panelFastBtnBg.visible = false;
            this.panelBtnBg.visible = true;
            this.Panel_fastMatch.visible = false;
            if (room == -1) {
                this.panelFastBtnBg.visible = false;
                this.panelFastBtnBg.visible = false;
                this.panelBtnBg.visible = false;
            }
        }
    },

    /**
     * 刷新俱乐部房间列表
     * @param roomDataList
     */
    refreshRoomList:function(roomDataList){
        this.remoteImageLoadQueue.stopLoad();
        if(!roomDataList){
            //cc.log("获取俱乐部房间数据失败...");
            return;
        }

    },


    /**
     * 刷新俱乐部包厢列表
     * @param jsonData
     */
    refreshBagList:function(jsonData){
        this.remoteImageLoadQueue.stopLoad();
        if(!jsonData || !jsonData.list ){
            //cc.log("获取俱乐部房间数据失败...");
            return;
        }

        //获取房间数据
        this.getClubBagRoomsData();

        var bagDataList = jsonData.list || [];
        //var roomDataList = jsonData.tables || [];
        if(this.roomScrollView){
            this.roomScrollView.removeAllChildren();
            this.roomScrollView.removeFromParent();
            this.roomScrollView = null;
        }
        this.roomScrollView = new ccui.ScrollView();
        this.roomScrollView.setPosition(90 , 100);
        this.roomScrollView.setDirection(ccui.ScrollView.DIR_VERTICAL);
        this.roomScrollView.setTouchEnabled(true);
        this.roomScrollView.jumpToTop();
        this.roomScrollView.setBounceEnabled(true);
        this.roomScrollView.setContentSize(cc.size(1210, this.roomScrollViewHeight));
        this.roomScrollView.addEventListener(this.addScrollviewItem , this);
        this.bgRight.addChild(this.roomScrollView);

        //排除关闭入口的包厢
        var num = 0;
        for(var index = 0 ; index < bagDataList.length; index++) {
            var bagData = bagDataList[index];
            if (bagData && bagData.groupState && parseInt(bagData.groupState)) {
                num = num + 1;
            }
        }
        num = 1;
        var bagNum = this.curClubBagNum = num;
        if (bagNum >= this.MaxRoomItem){
            this.canLastItem = true;
        }else{
            this.canLastItem = false;
        }
        var lineNum = (bagNum % 4) == 0 ? parseInt(bagNum / 4) : Math.ceil(bagNum / 4);
        var startPox = 140;
        var offx = 300;
        var offy = 10;
        var tHeight = 256;
        var limitHeight = Math.max(tHeight * lineNum + offy * (lineNum - 1) , this.roomScrollViewHeight);
        this.roomScrollView.setInnerContainerSize(cc.size(1210, limitHeight));

        this.imgSetWanfayd.visible = false;
        this.imgFastcreateyd.visible = false;
        this.imgCreateyd.visible = false;

        var bagIndex = 0;


        //空房间显示玩法
        for(var index = 0 ; index < 1; index++){
            var roomItem = new ClubNullRoomItem(bagDataList , this);
            roomItem.scale = 0.95;
            roomItem.anchorY = 1;
            var tLine = parseInt(bagIndex / 4); //0 1 -> 0 , 2 3 -> 1 , 4, 5 -> 2
            var xIndex = (parseInt(bagIndex % 4)) //0 1 2
            var posX = 0;
            var posY = 0;
            posX = startPox + offx*xIndex;
            posY = limitHeight - tLine * tHeight - (tLine - 1) * offy - 45;

            roomItem.setPosition(posX , posY);
            this.roomScrollView.addChild(roomItem);
            bagIndex = bagIndex + 1;
        }


    },

    addScrollviewItem:function(target , event){
        if(event==ccui.ScrollView.EVENT_BOUNCE_BOTTOM && this.canLastItem){
            this.getbottomClubRoomListData()
        }

    },

    /**
     * 获取25以后亲友圈房间信息
     */
    getbottomClubRoomListData:function(){
        //sy.scene.showLoading("正在刷新房间信息")
        var page = Math.ceil(this.curClubRoomNum / this.MaxRoomItem);
        var nowPage = page + 1;
        this.getClubBagRoomsData(-1,nowPage);
        this.canLastItem = false;
        //this.addRoomList((data.list));
        //this.canLastItem = false;
    },

    addRoomList:function(roomDataList){
        if(roomDataList.length<1){
            return;
        }
        var oldRoomNum = this.curClubRoomNum + this.curClubBagNum;
        var nowRoomNum = this.curClubRoomNum + roomDataList.length;
        var allNum = roomDataList.length + oldRoomNum;


        if (roomDataList.length >= this.MaxRoomItem){
            this.canLastItem = true;
        }else{
            this.canLastItem = false;
        }

        //cc.log("roomDataList.length"+roomDataList.length)
        //cc.log("this.curClubRoomNum"+this.curClubRoomNum)

        var lineNum = (allNum % 4) == 0 ? parseInt(allNum / 4) : Math.ceil(allNum / 4);
        var startPox = 145;
        var offx = 300;
        var offy = 35;
        var tHeight = 230;

        var limitHeight = Math.max(tHeight * lineNum + offy * (lineNum - 1) , this.roomScrollViewHeight);
        var shangshenHight =limitHeight- this.roomScrollView.getInnerContainerSize().height;
        var Items= this.roomScrollView.getChildren();
        for (var item in Items){
            Items[item].y = Items[item].y+shangshenHight;
        }
        this.roomScrollView.setInnerContainerSize(cc.size(1210, limitHeight));


        var bagIndex = oldRoomNum || 0;
        //以前模式的列表
        for(var index = 0 ; index < roomDataList.length; index++){
            var roomItem = new ClubRoomItem(roomDataList[index] , this);
            roomItem.scale = 0.95;
            roomItem.anchorY = 1;
            var tLine = parseInt((bagIndex + index) / 4); //0 1 -> 0 , 2 3 -> 1 , 4, 5 -> 2
            var xIndex = (parseInt((bagIndex + index) % 4)) //0 1 2
            var posX = 0;
            var posY = 0;
            posX = startPox + offx*xIndex;
            posY = limitHeight - tLine * tHeight - (tLine - 1) * offy - 40;

            roomItem.setPosition(posX , posY);
            this.roomScrollView.addChild(roomItem);
        }
        this.curClubRoomNum = nowRoomNum;
    },

    hideAllTouchedEffect:function(){
        var items = this.clubListView.getItems();
        for(var index = 0 ; index < items.length ; index++){
            var item = items[index];
            item.fixShow();
        }
    },

    onCloseClubHome:function(){
        //LayerManager.showLayer(LayerFactory.DN_HOME);
        this.remoteImageLoadQueue.stopLoad();
        this.clubremoteImageLoadQueue.stopLoad();
        this.unscheduleUpdate();
        PopupManager.remove(this);
    },

    onClose:function(){
        cc.log("onClose 关闭定时器...");
        this.remoteImageLoadQueue.stopLoad();
        this.clubremoteImageLoadQueue.stopLoad();
        this.unscheduleUpdate();
        this._super();

    },


    onHideSpHongDian:function(){
        this.getWidget("Image_hongdian1").visible = false;
        this.getWidget("Image_hongdian2").visible = false;
    },

    onHideHongDian:function(){
        this.getWidget("Image_hongdian").visible = false;
    },


    onShowZJ:function(){
        var mc = new ClubRecallPop(ClickClubModel.getCurClubId(),ClickClubModel.getCurClubRole());
        PopupManager.addPopup(mc);
        return;
        //var mc = new ClubRecordPop(this.clickClubId , this.clickClubRole , this.clickClubName , this);
        //PopupManager.addPopup(mc);
        //return;
    },

    onCreateSucsuss:function(){
        this.clubListView.visible = true;
        this.CreatePanel.visible = false;
        this.JoinPanel.visible = false;

    },

    onJoinSucsuss:function(){
        this.clubListView.visible = true;
        this.CreatePanel.visible = false;
        this.JoinPanel.visible = false;
    },

    onSmOneJoinClub:function(){
        this.getAllClubsData();
    },

    onUpdateClubList:function(){
        this.getAllClubsData();
    },

    doRefresh:function(){
        var curTime = new Date();
        if(ClickClubModel.getCurClubItem() && ClickClubModel.getCurClubId() != 0){
            this.lastClickTime = curTime;
            this.hasClickRefresh = true;
            ClickClubModel.getCurClubItem().updateClubItemMsg();
        }else{
            FloatLabelUtil.comText("请选择亲友圈");
        }
    },

    clickRefresh:function(){
        var curTime = new Date();
        if(this.lastClickTime == 0 || this.lastClickTime < curTime - 3000){
            this.doRefresh();
        }else{
            FloatLabelUtil.comText("请不要点击太快哦！");
        }
    },

})

