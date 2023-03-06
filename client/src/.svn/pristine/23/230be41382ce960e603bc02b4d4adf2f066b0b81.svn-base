/**
 * Created by Administrator on 2016/6/27.
 */

var dkRecordModel = {
    data:null,
    isShowRecord:false,
    init:function(data){
        this.data = data;
    },

    setList:function(daikaiList){
        this.data.daikaiList = daikaiList;
    },

    setLog:function(playLogMap){
        this.data.playLogMap = playLogMap;
    },
}

var dkResultModel = {
    data:null,
    init:function(data){
        this.data = data;
    },
}

var RecordModel = {
    data: null,
    isShowRecord: false,
    init: function (data) {
        this.data = data;
        this.isShowRecord = false;
    },
}

var TotalRecordModel = {
    data: null,
    isShowRecord: false,
    isDaiKai: false,
    init: function (data,isDaiKai) {
        this.data = data;
        this.isDaiKai = isDaiKai || false;
        this.isShowRecord = false;
    },
}


var DTZRecordPop = BasePopup.extend({
    ctor: function (data) {
        this.data = data;
        cc.log(" " + JSON.stringify(this.data));
        this._super("res/DTZrecordDetail.json");

    },

    selfRender: function () {
        //加载玩家点击的那条记录数据
        this.totalNode = this.getWidget("totalMsg");
        this.roomIdlable = this.getWidget("Label_14");
        this.timelable = this.getWidget("Label_15");
        this.scoreLable1 = this.getWidget("scoreLable1");
        this.scoreLable2 = this.getWidget("scoreLable2");
        this.exScoreNode = this.getWidget("roomExScore");
        this.ImageWin = ccui.helper.seekWidgetByName(this.totalNode, "ImageWin");
        this.ImageLoss = ccui.helper.seekWidgetByName(this.totalNode, "ImageLoss");

        this.shareBtn = this.getWidget("Button_Share");
        this.returnBtn = this.getWidget("Button_Back");


        UITools.addClickEvent(this.returnBtn, this, this.onToHome);
        UITools.addClickEvent(this.shareBtn, this, this.onShare);
        this.roomIdlable.setString(DTZClickRecordModel.roomId);
        this.timelable.setString(DTZClickRecordModel.times);
        this.scoreLable1.setString(DTZClickRecordModel.team1Score);
        this.scoreLable2.setString(DTZClickRecordModel.team2Score);

        var myGroup = 0;
        for (var index = 1; index <= DTZClickRecordModel.playData.length; index++) {
            var iconNode = this["icon_" + index] = ccui.helper.seekWidgetByName(this.totalNode, "icon_" + index);
            var curPlayer = DTZClickRecordModel.playData[index - 1];
            if(index == 1){
                myGroup = curPlayer.group;
            }

            //显示名字
            var realName = this.getPalyerCanSeeName(curPlayer.name, 100, 25);
            this.getWidget("name_" + index).setString(realName);
            this.getWidget("id_" + index).setString("ID:"+curPlayer.userId);

            //分组标记
            if (curPlayer.group == 1) {
                ccui.helper.seekWidgetByName(iconNode, "ateam_" + index).visible = true;
                ccui.helper.seekWidgetByName(iconNode, "bteam_" + index).visible = false;
            } else {
                ccui.helper.seekWidgetByName(iconNode, "ateam_" + index).visible = false;
                ccui.helper.seekWidgetByName(iconNode, "bteam_" + index).visible = true;
            }

            //显示头像
            this.showIcon(curPlayer.icon, index, curPlayer.sex);
        }


        //显示房间附加分
        if (DTZClickRecordModel.roomExScore != null && DTZClickRecordModel.roomExScore != 0 && (DTZClickRecordModel.addExScoreTeam == 1 || DTZClickRecordModel.addExScoreTeam == 2)) {

            var label = new cc.LabelBMFont(DTZClickRecordModel.roomExScore + "", "res/font/dn_bigResult_font_1.fnt");
            label.x = this.exScoreNode.width / 2;
            label.y = this.exScoreNode.height / 2;
            label.scale = 0.6;
            this.exScoreNode.addChild(label);


            if(DTZClickRecordModel.addExScoreTeam == myGroup){
                label.x = label.x - 40;
            }else{
                label.x = label.x + 40;
            }

        }

        //判断胜负
        this.winOrLoss = DTZClickRecordModel.winorLoss;
        var lableFnt = this.winOrLoss == true ? "res/font/dn_bigResult_font_1.fnt" : "res/font/greeNum_0.fnt";
        var sign = "+";
        if (this.winOrLoss) { //胜利
            this.ImageWin.visible = true;
            this.scoreLable1.setColor(cc.color(255, 111, 24));
            this.scoreLable2.setColor(cc.color(65, 167, 31));
            sign = "+";
        } else {        //失
            this.ImageLoss.visible = true;
            this.scoreLable2.setColor(cc.color(255, 111, 24));
            this.scoreLable1.setColor(cc.color(65, 167, 31));
            sign = "-";
        }

        var offScore = DTZClickRecordModel.offScore ; //Math.abs(DTZClickRecordModel.team1Score - DTZClickRecordModel.team2Score);
        var scoreStr = "";
        if (offScore >= 0) {
            scoreStr = "+" + offScore + "";
            lableFnt = "res/font/dn_bigResult_font_1.fnt";
        } else {
            scoreStr = offScore + "";
            lableFnt = "res/font/greeNum_0.fnt";
        }
        cc.log("scoreDesc ...", scoreStr);
        //显示分差
        this.winScoreLable = ccui.helper.seekWidgetByName(this.totalNode, "lableOffScore");
        var label = new cc.LabelBMFont(scoreStr, lableFnt);
        label.x = this.winScoreLable.width / 2;
        label.y = this.winScoreLable.height / 2;
        label.scale = 0.8;
        this.winScoreLable.addChild(label);


        //显示每局的详情
        this.list = this.getWidget("ListView_6");
        var playLog = this.data.playLog;
        for (var i = 0; i < playLog.length; i++) {
            var item = new DTZRecordCell(playLog[i].playerMsg.length);
            item.setData(playLog[i]);
            this.list.pushBackCustomItem(item);
        }
    },

    showIcon: function (iconUrl, index, sex) {
        //iconUrl = "http://wx.qlogo.cn/mmopen/25FRchib0VdkrX8DkibFVoO7jAQhMc9pbroy4P2iaROShWibjMFERmpzAKQFeEKCTdYKOQkV8kvqEW09mwaicohwiaxOKUGp3sKjc8/0";
        cc.log("战绩 显示第" + index + "个玩家的头像" + " url:" + JSON.stringify(iconUrl));
        var url = iconUrl;
        //var icon = this.getWidget("icon_" + index);
        var icon = this["icon_" + index];

        var defaultimg = (sex == 1) ? "res/ui/dtz/images/default_m.png" : "res/ui/dtz/images/default_w.png";

        if (icon.getChildByTag(345)) {
            icon.removeChildByTag(345);
        }

        var sprite = new cc.Sprite(defaultimg);
        sprite.x = 0;
        sprite.y = 0;
        sprite.setScale(0.6);
        icon.addChild(sprite, 5, 345);
        if (iconUrl) {
            cc.loader.loadImg(iconUrl, {width: 252, height: 252}, function (error, img) {
                if (!error) {
                    sprite.setTexture(img);
                    sprite.scale = 0.6;
                }
            });
        }
    },

    //设置名字的方法 (限制长度)
    getPalyerCanSeeName: function (nameString, width, fontSize) {
        //nameString = "我1想lm试试中文";
        var length = nameString.length;
        var tlableForSize = null;
        var showName = nameString;
        var tName = null;
        var tWidth = 0;

        for (var curLenght = 2; curLenght <= length; curLenght++) {
            tName = nameString.substring(0, curLenght);
            tlableForSize = new cc.LabelTTF(tName, "Arial", fontSize);
            tWidth = tlableForSize.width;
            //cc.log("当前显示的文字为 " + tName + "宽度为:" + tWidth + "");
            if (tWidth >= width) {
                showName = nameString.substring(0, curLenght - 1);
                cc.log("实际显示的文字为:" + showName);
                break;
            }
        }
        return showName;
    },


    onToHome: function () {
        LayerManager.showLayer(LayerFactory.HOME);
        PopupManager.remove(this);
        PopupManager.removeAll();
    },

    onShare: function () {
        cc.log("share...");
        var winSize = cc.director.getWinSize();
        var texture = new cc.RenderTexture(winSize.width, winSize.height);
        if (!texture)
            return;
        texture.anchorX = 0;
        texture.anchorY = 0;
        texture.begin();
        this.visit();
        texture.end();
        texture.saveToFile("share_pdk.jpg", cc.IMAGE_FORMAT_JPEG, false);

        var obj = {};
        obj.tableId = DTZRoomModel.tableId;
        obj.userName = PlayerModel.username;
        obj.callURL = SdkUtil.SHARE_URL + '?userName=' + encodeURIComponent(PlayerModel.name);
        obj.title = "打筒子   房号:" + DTZRoomModel.tableId;
        obj.description = "我已在安化棋牌的跑得快开好房间,纯技术实力的对决,一起跑得快！";
        obj.shareType = 0;
        sy.scene.showLoading("正在截取屏幕");
        setTimeout(function () {
            sy.scene.hideLoading();
            //SharePop.show(obj);
            ShareDTPop.show(obj);
        }, 500);
    },

});

var DTZTotalRecordPop = BasePopup.extend({
    layerType:1,
    zhanjiData:null,
    clubPage:1,
    maxClubItem:10,
    clubRecordData:null,
    isNeedMoreClubData:true,
    ctor: function (layerType) {
        this.layerType = layerType;

        this.zhanjiData = [];

        this._super("res/DTZrecord.json");
    },

    getZhanjiData:function(){
        sy.scene.showLoading("正在获取战绩");
        Network.loginReq("qipai","getUserPlayLog",{logType:0},function(data){
            sy.scene.hideLoading();
            if(data){
                this.handleZhanjiData(data);
            }
        }.bind(this),function(data){
            FloatLabelUtil.comText("获取数据失败");
            sy.scene.hideLoading();
        }.bind(this));
    },

    handleZhanjiData:function(data){
        // cc.log("============handleZhanjiData========" + JSON.stringify(data));
        this.zhanjiData = [];
        for(var i = 0;i<data.playLog.length;++i){
            var itemData = {type:2,gameName:ClubRecallDetailModel.getGameStr(data.playLog[i].playType)};
            itemData.time = data.playLog[i].time.substr(11,20);
            itemData.dayTime = data.playLog[i].time.substr(0,11);
            itemData.tempData = data.playLog[i];
            itemData.logType = data.logType;
            itemData.reshu = data.playLog[i].playerMsg.length;
            itemData.score = data.playLog[i].playerMsg[0].totalPoint;
            if (ClubRecallDetailModel.isDTZWanfa(data.playLog[i].playType)){
                itemData.score = data.playLog[i].playerMsg[0].winLossPoint;
            }
            var closingMsg = JSON.parse(data.playLog[i].closingMsg);
            // cc.log("data.playLog[i].playCount =",data.playLog[i].playCount);
            //这个局数数据后面临时加的，下标不同玩法不一样，暂时这么处理
            if(data.playLog[i].playType == PHZGameTypeModel.LDFPF) {
                itemData.jushu = closingMsg.ext[10];
            }else if(data.playLog[i].playType == MJWanfaType.BSMJ) {
                itemData.jushu = (closingMsg.ext[12] || 1) + "/" + data.playLog[i].totalCount;
            }else if(data.playLog[i].playType == MJWanfaType.HZMJ) {
                itemData.jushu = (closingMsg.ext[26] || 1) + "/" + data.playLog[i].totalCount;
            }else if(data.playLog[i].playType == PHZGameTypeModel.SYBP || data.playLog[i].playType == PHZGameTypeModel.SYZP){
                itemData.jushu = (closingMsg.ext[25] || 1) + "/" + data.playLog[i].totalCount;
            }else if(ClubRecallDetailModel.isPDKWanfa(data.playLog[i].playType)){
                itemData.jushu = closingMsg.ext[10] + "/" + data.playLog[i].totalCount;
            }else{
                itemData.jushu = (data.playLog[i].playCount || 1) + "/" + data.playLog[i].totalCount;
            }
            
            this.zhanjiData.push(itemData);
        }

        this.checkShowItem();

    },
    

    checkShowItem:function(){
        this.sortZhanjiData();
        this.updateOuterScroll(this.zhanjiData);
    },

    sortZhanjiData:function(){
        for(var i = 0;i<this.zhanjiData.length;++i){
            for(var j = i+1;j<this.zhanjiData.length;++j){
                if(this.zhanjiData[i].tempData.time < this.zhanjiData[j].tempData.time){
                    var temp = this.zhanjiData[i];
                    this.zhanjiData[i] = this.zhanjiData[j];
                    this.zhanjiData[j] = temp;
                }
            }
        }

        var lastTime = "";
        var newZhanjiData = [];
        var lastItem = null;
        for(var i = 0;i<this.zhanjiData.length;++i){
            if(!lastTime || lastTime != this.zhanjiData[i].dayTime){
                var itemData = {type:1,time:this.zhanjiData[i].dayTime,score:this.zhanjiData[i].score}
                newZhanjiData.push(itemData);
                lastItem = itemData;
            }else{
                lastItem && (lastItem.score += this.zhanjiData[i].score);
            }
            newZhanjiData.push(this.zhanjiData[i]);
            lastTime = this.zhanjiData[i].dayTime;
        }
        this.zhanjiData = newZhanjiData;
    },

    onEnter:function(){
        this._super();
        if(this.layerType == 1){
            this.getZhanjiData();
        }else if(this.layerType == 2){
            this.getClubRecordData();
        }
    },

    selfRender: function () {

        var tip_txt = this.getWidget("tip_txt");
        var tipStr = "小贴士:为避免数据过多造成困扰,战绩详情历史数据仅可查看最近50局哦!";
        if(this.layerType == 2){
            tipStr = "小贴士:为避免数据过多造成困扰,战绩详情历史数据仅可查看3天哦!";
        }
        tip_txt.setString(tipStr);

        this.myRecordBtn = this.getWidget("myRecord");
        this.pyqRecordBtn = this.getWidget("pyqRecord");

        this.panel_pyqzj = this.getWidget("panel_pyqzj");
        this.panel_detail_club = this.getWidget("Panel_detail_club");
        this.panel_detail_club.setVisible(false);

        this.clubjush = ccui.helper.seekWidgetByName(this.panel_pyqzj,"total_jushu_num");
        this.clubjush.setString("共0局");

        this.clubzongfen = ccui.helper.seekWidgetByName(this.panel_pyqzj,"total_score");
        this.clubzongfen.setString("总分:0");

        if(this.layerType == 2 && (!ClickClubModel.isClubCreaterOrLeader())){
            this.clubjush.setVisible(false);
            this.clubzongfen.y += 13;
        }

        this.btn_back_club = this.getWidget("btn_back_club");
        UITools.addClickEvent(this.btn_back_club , this , this.onClickClubBack);

        this.dayBtnArr = [];
        for(var i = 0;i<3;++i){
            this.dayBtnArr[i] = ccui.helper.seekWidgetByName(this.panel_pyqzj,"btn_" + (i+1));
            this.dayBtnArr[i].tempData = i+1;
            UITools.addClickEvent(this.dayBtnArr[i] , this , this.onClickSelectDay);
            if(i > 0){
                this.dayBtnArr[i].setBright(false);
            }
        }
        this.clubDayType = 1;

        this.isSelecZtjs = false;
        this.btn_ztjs = this.getWidget("btn_ztjs");
        this.btn_ztjs.setBright(false);
        UITools.addClickEvent(this.btn_ztjs , this , this.onClickZtjsBtn);

        this.labelPage = this.getWidget("lbDataPage");
        this.btn_left_page = this.getWidget("btnDataLeft");
        this.btn_right_page = this.getWidget("btnDataRight");
        UITools.addClickEvent(this.btn_left_page , this , this.onClickLeftPageBtn);
        UITools.addClickEvent(this.btn_right_page , this , this.onClickRightPageBtn);


        UITools.addClickEvent(this.getWidget("btn_check") , this , this.onClickCheckBtn);
        UITools.addClickEvent(this.myRecordBtn , this , this.onClickMyRecord);
        UITools.addClickEvent(this.pyqRecordBtn , this , this.onClickPyqRecord);

        //this.myRecordBtn.setTouchEnabled(false);
        //this.pyqRecordBtn.setTouchEnabled(false);

        this.scrollLayer1 = this.getWidget("scroll_info");
        this.scrollLayer1.setBounceEnabled(false);
        this.scrollTitleItem = ccui.helper.seekWidgetByName(this.scrollLayer1,"info_title1");
        this.scrollItem1 = ccui.helper.seekWidgetByName(this.scrollLayer1,"info_content1");
        this.scrollTitleItem.retain();
        this.scrollItem1.retain();
        this.scrollTitleItem.setVisible(false);
        this.scrollItem1.setVisible(false);

        var scrollView = this.getWidget("scroll_pyqzj");
        var info_item = ccui.helper.seekWidgetByName(scrollView,"info_item");
        info_item.setVisible(false);

        this.inputBox = new cc.EditBox(cc.size(200, 40),new cc.Scale9Sprite("res/ui/bjdmj/light_touming.png"));
        this.inputBox.x = 1010;
        this.inputBox.y = 666;
        this.inputBox.setPlaceHolder("输入回放码");
        this.inputBox.setPlaceholderFontColor(cc.color(255,255,255));
        this.inputBox.setMaxLength(12);
        this.inputBox.setInputMode(cc.EDITBOX_INPUT_MODE_NUMERIC);
        this.inputBox.setFont("Arial",28);
        this.inputBox.setPlaceholderFont("Arial",28);
        this.root.addChild(this.inputBox,1);

        var inputBg1 = ccui.helper.seekWidgetByName(this.panel_pyqzj,"inputBg1");
        var inputBg2 = ccui.helper.seekWidgetByName(this.panel_pyqzj,"inputBg2");

        this.inputRoomIdBox = new cc.EditBox(cc.size(120, 40),new cc.Scale9Sprite("res/ui/bjdmj/light_touming.png"));
        this.inputRoomIdBox.setPosition(this.inputRoomIdBox.width/2,inputBg1.height/2);
        this.inputRoomIdBox.setPlaceHolder("输入房号");
        this.inputRoomIdBox.setMaxLength(10);
        this.inputRoomIdBox.setInputMode(cc.EDITBOX_INPUT_MODE_NUMERIC);
        this.inputRoomIdBox.setFont("Arial",20);
        this.inputRoomIdBox.setPlaceholderFont("Arial",20);
        inputBg1.addChild(this.inputRoomIdBox,1);

        this.inputUserIdBox = new cc.EditBox(cc.size(120, 40),new cc.Scale9Sprite("res/ui/bjdmj/light_touming.png"));
        this.inputUserIdBox.setPosition(this.inputRoomIdBox.width/2,inputBg2.height/2);
        this.inputUserIdBox.setPlaceHolder("输入玩家ID");
        this.inputUserIdBox.setMaxLength(10);
        this.inputUserIdBox.setInputMode(cc.EDITBOX_INPUT_MODE_NUMERIC);
        this.inputUserIdBox.setFont("Arial",20);
        this.inputUserIdBox.setPlaceholderFont("Arial",20);
        inputBg2.addChild(this.inputUserIdBox,1);

        this.btn_search_room = ccui.helper.seekWidgetByName(this.panel_pyqzj,"btn_search1");
        this.btn_search_id = ccui.helper.seekWidgetByName(this.panel_pyqzj,"btn_search2");

        UITools.addClickEvent(this.btn_search_room , this , this.onClickClubSearchRoom);
        UITools.addClickEvent(this.btn_search_id , this , this.onClickClubSearchId);

        this.panel_detail = this.getWidget("Panel_detail");
        this.innerBackBtn = this.getWidget("btn_back");
        this.scrollDetail = this.getWidget("scroll_detail");

        this.detailItem = ccui.helper.seekWidgetByName(this.scrollDetail,"info_item");
        this.detailItem.retain();

        this.detailItemClub = ccui.helper.seekWidgetByName(this.panel_detail_club,"info_item");
        this.detailItemClub.retain();

        UITools.addClickEvent(this.innerBackBtn , this , this.onClickInnerBack);

        this.setBtnShowType(this.layerType);
    },

    onClickZtjsBtn:function(){

        var role = ClickClubModel.getCurClubRole();
        if(role != 0 && role != 1){
            FloatLabelUtil.comText("只有管理员以上权限才能查询");
            return;
        }

        this.isSelecZtjs = !this.isSelecZtjs;
        this.btn_ztjs.setBright(this.isSelecZtjs);

        if(this.isSelecZtjs){
            this.clubPage = 1;
            this.getClubRecordData(1,this.inputRoomIdBox.getString(),this.inputUserIdBox.getString());
        }
    },

    onClickClubSearchRoom:function(){
        var role = ClickClubModel.getCurClubRole();
        if(role != 0 && role != 1){
            FloatLabelUtil.comText("只有管理员以上权限才能查询");
            return;
        }

        this.clubPage = 1;
        this.getClubRecordData(1,this.inputRoomIdBox.getString(),0);
    },

    onClickClubSearchId:function(){
        var role = ClickClubModel.getCurClubRole();
        if(role != 0 && role != 1){
            FloatLabelUtil.comText("只有管理员以上权限才能查询");
            return;
        }

        this.clubPage = 1;
        this.getClubRecordData(1,0,this.inputUserIdBox.getString());
    },

    onClickLeftPageBtn:function(){
        if(this.clubPage > 1){
            this.getClubRecordData(this.clubPage - 1,this.inputRoomIdBox.getString(),this.inputUserIdBox.getString());
        }
    },

    onClickRightPageBtn:function(){
        this.getClubRecordData(this.clubPage + 1,this.inputRoomIdBox.getString(),this.inputUserIdBox.getString());
    },

    onClickSelectDay:function(sender){
        if(sender.tempData == this.clubDayType)return;

        this.clubDayType = sender.tempData;

        for(var i = 0;i<3;++i){
            this.dayBtnArr[i].setBright(sender == this.dayBtnArr[i]);
        }

        this.clubPage = 1;
        this.getClubRecordData(1,this.inputRoomIdBox.getString(),this.inputUserIdBox.getString());
    },

    setPyqZjLayer:function(data){
        this.clubRecordData = data;

        var scrollView = this.getWidget("scroll_pyqzj");
        var info_item = ccui.helper.seekWidgetByName(scrollView,"info_item");
        var jushu_bg = ccui.helper.seekWidgetByName(scrollView,"jushu_bg");
        jushu_bg.setVisible(false);
        info_item.setVisible(false);

        var listNum = data.length;
        var spaceH = 115;

        var contentH = Math.max(scrollView.height,listNum*spaceH);
        scrollView.setInnerContainerSize(cc.size(scrollView.width,contentH));

        this.pyqItemArr = this.pyqItemArr || [info_item];
        var totalScore = 0;
        for(var i = 0;i<listNum;++i){
            var newItem = this.pyqItemArr[i];
            if(!newItem){
                newItem = info_item.clone();
                scrollView.addChild(newItem);
                this.pyqItemArr[i] = newItem;
            }
            newItem.setVisible(true);
            newItem.y = contentH - (i+0.5)*spaceH;
            newItem.tempData = i;
            var label_idx = newItem.getChildByName("label_idx");
            var btn_xq = newItem.getChildByName("btn_xq");
            var label_room_id = newItem.getChildByName("label_room_id");
            var label_wanfa = newItem.getChildByName("label_wanfa");
            var label_time = newItem.getChildByName("label_time");
            var label_ztjs = newItem.getChildByName("label_ztjs");
            btn_xq.tempData = i;
            UITools.addClickEvent(btn_xq,this,this.onClickPyqXq);

            var dissStr = "正常结束";
            if (data[i].currentState == 2){
                dissStr = "正常结束";
            }else if (data[i].currentState == 3){
                dissStr = "未开局被解散";
            }else if (data[i].currentState == 4){
                dissStr = "中途解散\n" + "(第"+ data[i].playedBureau +"局)";
            }else if(data[i].currentState == 5){
                dissStr = "托管解散";
            }
            label_ztjs.setString(dissStr);
            label_idx.setString(i+1);
            label_room_id.setString(data[i].tableId || "");
            label_wanfa.setString(ClubRecallDetailModel.getGameStr(data[i].playType) + "\n" + data[i].roomName);
            label_time.setString(data[i].overTime);

            var icon_fz = newItem.getChildByName("icon_fz");
            icon_fz.setVisible(false);

            var nameArr = data[i].players.split(",");
            var scoreArr = data[i].point.split(",");
            var winArr = data[i].isWinner.split(",");

            for(var j = 0;j<4;++j){
                var label_name = newItem.getChildByName("label_name_" + (j + 1));
                var label_score = newItem.getChildByName("label_score_" + (j + 1));
                label_name.visible = label_score.visible = (j < nameArr.length);
                label_name.setString(nameArr[j] || "");
                this.setLabelScore(label_score,parseInt(scoreArr[j] || 0));

                if(nameArr[j] == PlayerModel.name){
                    totalScore += parseInt(scoreArr[j] || 0);
                }

                if(j == data[i].masterNameIndex && label_name.visible){
                    icon_fz.setVisible(true);
                    icon_fz.y = label_name.y;
                }
            }

        }

        this.clubzongfen.setString("总分:" + totalScore);

        for(;i<this.pyqItemArr.length;++i){
            this.pyqItemArr[i].setVisible(false);
        }

    },

    /**
     * 获取俱乐部战绩数据
     */
    getClubRecordData:function(page,roomId,userId){
        page = page || 1;
        roomId = roomId || 0;
        userId = userId || 0;

        var role = ClickClubModel.getCurClubRole();
        if(role != 0 && role != 1){
            roomId = 0;
            userId = 0;
        }

        var self = this;
        sy.scene.showLoading("正在获取战绩数据");
        NetworkJT.loginReq("groupAction", "loadTablePlayLogs", {groupId:ClickClubModel.getCurClubId(),
            queryDate:this.clubDayType,  //当前日期
            pageNo:page,  //当前页数
            pageSize:this.maxClubItem,
            condition:this.isSelecZtjs?"4":"2,4,5",  //2 正常结束 , 3未开局被解散, 4中途解散
            queryUserId:userId,
            queryTableId:roomId,
            userId:PlayerModel.userId}, function (data) {
            //cc.log("==========getClubRecordData============="+JSON.stringify(data));
            if (data) {
                sy.scene.hideLoading();
                ClubRecallModel.init(data);
                ClubRecallModel.clubId = ClickClubModel.getCurClubId();
                ClubRecallModel.clubRole = ClickClubModel.getCurClubRole();

                self.clubjush.setString("共" + (data.message.tables || 0) + "局");

                var label_no_data = self.getWidget("label_no_data");

                if(data.message.list.length > 0){
                    self.clubPage = page;
                    self.labelPage.setString(page);
                    label_no_data.setVisible(false);
                }else{
                    if(self.clubPage == page){
                        label_no_data.setVisible(true);
                    }else{
                        FloatLabelUtil.comText("没有更多数据了");
                        return;
                    }
                }
                self.setPyqZjLayer(data.message.list);
            }
        }, function (data) {
            sy.scene.hideLoading();
            FloatLabelUtil.comText("获取战绩数据失败");
        });


    },

    getClubDetailData:function(idx){
        //cc.log("请求战绩详情---------"+this.index)
        var tableNo = this.clubRecordData[idx].tableNo;
        var self = this;
        sy.scene.showLoading("正在获取战绩详情数据");
        NetworkJT.loginReq("groupAction", "loadTableRecord", {tableNo:tableNo, oUserId:PlayerModel.userId ,isClub:1}, function (data) {
            sy.scene.hideLoading();
            if (data) {
                //cc.log("==========getClubDetailData========"+JSON.stringify(data));
                ClubRecallDetailModel.init(data);
                self.showClubDetailZhanji(self.handleClubDetailData(data));

            }
        }, function (data) {
            cc.log("getUserPlayLog::"+JSON.stringify(data));
            sy.scene.hideLoading();
            FloatLabelUtil.comText("获取战绩详情数据失败");
        });

    },

    showClubDetailZhanji:function(data){
        this.panel_detail_club.setVisible(true);
        this.panel_pyqzj.setVisible(false);

        ccui.helper.seekWidgetByName(this.panel_detail_club,"gameName").setString(data.gameName);
        ccui.helper.seekWidgetByName(this.panel_detail_club,"reshu").setString(data.reshu + "人");
        ccui.helper.seekWidgetByName(this.panel_detail_club,"jushu").setString(data.jushu);
        ccui.helper.seekWidgetByName(this.panel_detail_club,"label_room_id").setString("房间号:" + data.room_id);
        ccui.helper.seekWidgetByName(this.panel_detail_club,"time_sec").setString(data.time_sec);
        ccui.helper.seekWidgetByName(this.panel_detail_club,"label_detail_info").setString(data.infoStr);

        var scorllDetail = ccui.helper.seekWidgetByName(this.panel_detail_club,"scroll_detail");

        for(var i = 1;i<=4;++i){
            var nameLabel = ccui.helper.seekWidgetByName(this.panel_detail_club,"playerName" + i);
            if(i<=data.players.length){
                nameLabel.setString(data.players[i-1]);
            }else{
                nameLabel.setString("");
            }
        }

        scorllDetail.removeAllChildren();
        var contentH = Math.max(scorllDetail.height,data.scoreItems.length*(this.detailItemClub.height+2));
        scorllDetail.setInnerContainerSize(cc.size(scorllDetail.width,contentH));


        for(var i = 0;i<data.scoreItems.length;++i){
            var newItem = this.detailItemClub.clone();
            newItem.getChildByName("index_label").setString(i+1);
            newItem.getChildByName("time_label").setString(data.scoreItems[i].time);
            var btn_fx = ccui.helper.seekWidgetByName(newItem,"btn_fenxiang");
            var btn_lx = ccui.helper.seekWidgetByName(newItem,"btn_luxiang");
            UITools.addClickEvent(btn_fx, this , this.onClickItemFx);
            UITools.addClickEvent(btn_lx, this , this.onClickItemLx);
            btn_fx.code = data.scoreItems[i].tempData.id;
            btn_lx.tempData = data.scoreItems[i].tempData;
            for(var j = 1;j<=4;++j){
                var numStr = (j<=data.players.length)?data.scoreItems[i].scores[j-1]:"";
                this.setLabelScore(newItem.getChildByName("score_" + j), numStr);
            }
            newItem.y = contentH - (newItem.height + 2)*(i + 0.5);
            scorllDetail.addChild(newItem);
        }

    },

    onClickPyqXq:function(sender){
        var newTime = new Date().getTime();
        if(this.clickTime && ((newTime - this.clickTime) < 300)){
            return;
        }
        this.clickTime = newTime;

        this.getClubDetailData(sender.tempData);

    },

    //根据数据显示亲友圈战绩局数
    showJushuByData:function(idx,data){
        var isHasShow = false;
        for (var i = 0; i < this.pyqItemArr.length; ++i) {
            var btn = this.pyqItemArr[i].getChildByName("btn_luxiang");
            if (btn.isShowJushu) {
                isHasShow = true;
                this.showPyqJush(false, i);
                btn.isShowJushu = false;
                break;
            }
        }

        var btn = this.pyqItemArr[idx].getChildByName("btn_luxiang");
        if (isHasShow) {
            setTimeout(function () {
                this.showPyqJush(true, idx, data);
                btn.isShowJushu = true;
            }.bind(this), 110);
        } else {
            this.showPyqJush(true, idx, data);
            btn.isShowJushu = true;
        }
    },

    setPyqLxBtnType:function(item,type){
        var btn = item.getChildByName("btn_luxiang");
        btn.loadTextureNormal(type == 2?"res/ui/gansu_mj/record/luxiang2.png":"res/ui/gansu_mj/record/luxiang1.png");
    },

    showPyqJush:function(isShow,idx,data){
        var scrollView = this.getWidget("scroll_pyqzj");
        var jushu_bg = ccui.helper.seekWidgetByName(scrollView,"jushu_bg");
        var btn_jushu = ccui.helper.seekWidgetByName(jushu_bg,"btn_jushu");
        btn_jushu.setVisible(false);

        if(isShow){
            var jushu = data.playLog.length;
        }

        this.setPyqLxBtnType(this.pyqItemArr[idx],isShow?2:1);

        if(isShow){
            var contentWidget = btn_jushu.getChildByName("contentWidget");
            if(contentWidget){
                contentWidget.removeFromParent(true);
            }
            contentWidget = new ccui.Widget();
            jushu_bg.addChild(contentWidget);

            var contentH = (Math.ceil(jushu/5)*75);

            jushu_bg.setContentSize(jushu_bg.width,contentH);
            for(var i = 0;i<jushu;++i){
                var btn = btn_jushu.clone();
                btn.setVisible(true);
                btn.x =100 +  (i%5)*184;
                btn.y = (contentH  - (Math.floor(i/5) + 0.5)*75);
                btn.getChildByName("txt_btn").setString("第" + (i+1) + "局");
                btn.tempData = data.playLog[i];
                UITools.addClickEvent(btn,this,this.onClickClubHuifang);
                contentWidget.addChild(btn);
            }

            jushu_bg.stopAllActions();
            jushu_bg.setVisible(true);
            jushu_bg.setScaleY(0);
            jushu_bg.setPositionY(this.pyqItemArr[idx].y - 38 + contentH);
            jushu_bg.runAction(cc.scaleTo(0.2,1,1));
            scrollView.setInnerContainerSize(cc.size(scrollView.width,scrollView.getInnerContainerSize().height + contentH));

            for(var i = 0;i<this.pyqItemArr.length;++i){
                this.pyqItemArr[i].y += contentH;
                if(i > idx){
                    this.pyqItemArr[i].stopAllActions();
                    this.pyqItemArr[i].runAction(cc.moveBy(0.2,0,-contentH));
                }
            }

        }else{
            if(jushu_bg.isVisible()){
                jushu_bg.stopAllActions();
                jushu_bg.runAction(cc.sequence(cc.scaleTo(0.1,1,0),cc.hide(),cc.callFunc(function(){
                    scrollView.setInnerContainerSize(cc.size(scrollView.width,scrollView.getInnerContainerSize().height - jushu_bg.height));
                    for(var i = 0;i<this.pyqItemArr.length;++i){
                        this.pyqItemArr[i].y -= jushu_bg.height;
                    }
                },this)));

                for(var i = idx + 1;i<this.pyqItemArr.length;++i){
                    this.pyqItemArr[i].stopAllActions();
                    this.pyqItemArr[i].runAction(cc.moveBy(0.1,0,jushu_bg.height));

                }

            }
        }
    },

    onClickClubHuifang:function(sender){
        cc.log("=============onClickItemLx==============" + sender.tempData.playType);
        var hfData = sender.tempData;

        PopupManager.hidePopup(DTZTotalRecordPop);

        this.playHuifang(hfData);
    },

    playHuifang:function(hfData){
        //cc.log("==========playHuifang=========" + JSON.stringify(hfData));
        // cc.log("hfData.playType =",hfData.playType);
        for(var i=0;i<PopupManager.popupList.length;i++){
            if(PopupManager.popupList[i]["constructor"] == DTZTotalRecordPop){
                TotalRecordModel.isShowRecord = true;
            }
        }
        if(hfData.playType == 15 || hfData.playType == 16){
            PlayBackModel.init(hfData,false);
            LayerManager.showLayer(LayerFactory.SEEPLAYBACK);
            var layer = LayerManager.getLayer(LayerFactory.SEEPLAYBACK);
            layer.initData();
        }else if(hfData.playType == PHZGameTypeModel.SYBP
            || hfData.playType == PHZGameTypeModel.SYZP
            || hfData.playType == PHZGameTypeModel.LDFPF){
            PHZRePlayModel.init(hfData);
            var layerName = LayerFactory.PHZ_REPLAY;
            if (PHZRePlayModel.players.length > 3){
                layerName = LayerFactory.PHZ_REPLAY_MORE;
            }else if (PHZRePlayModel.players.length == 2){
                layerName = LayerFactory.PHZ_REPLAY_LESS;
            }
            LayerManager.showLayer(layerName);
            var layer = LayerManager.getLayer(layerName);
            layer.initData();
        }else if(hfData.playType == MJWanfaType.HZMJ || hfData.playType == MJWanfaType.CSMJ){
            MJReplayModel.init(hfData);
            var layerName = LayerFactory.HZMJ_REPLAY;
            if (MJReplayModel.players.length == 2){
                layerName = LayerFactory.HZMJ_REPLAY_TWO;
            }else if (MJReplayModel.players.length == 3){
                layerName = LayerFactory.HZMJ_REPLAY_THREE;
            }
            LayerManager.showLayer(layerName);
            var layer = LayerManager.getLayer(layerName);
            layer.initData();
        }else if (ClubRecallDetailModel.isDTZWanfa(hfData.playType) ){
            PlayBackModel.init(hfData);
            var layerName = LayerFactory.DTZSEEPLAYBACK;
            if(PlayBackModel.players.length == 4){
                layerName = LayerFactory.DTZSEEPLAYBACK_MORE;
            }
            DTZRoomModel.wanfa = hfData.playType;
            LayerManager.showLayer(layerName);
            var layer = LayerManager.getLayer(layerName);
            layer.initData();
        }else if (hfData.playType == 131){
            BBTPlayBackModel.init(hfData);
            LayerManager.showLayer(LayerFactory.BBTSEEPLAYBACK);
            var layer = LayerManager.getLayer(LayerFactory.BBTSEEPLAYBACK);
            layer.initData();
        }else if(hfData.playType == MJWanfaType.SYMJ){/** 添加邵阳麻将回放 **/
            MJReplayModel.init(hfData);
            var layerName = LayerFactory.SYMJ_REPLAY;
            if (MJReplayModel.players.length == 2){
                layerName = LayerFactory.SYMJ_REPLAY_TWO;
            }else if (MJReplayModel.players.length == 3){
                layerName = LayerFactory.SYMJ_REPLAY_THREE;
            }
            LayerManager.showLayer(layerName);
            var layer = LayerManager.getLayer(layerName);
            layer.initData();
        }else if(hfData.playType==131){
            BBTPlayBackModel.init(hfData);
            LayerManager.showLayer(LayerFactory.BBTSEEPLAYBACK);
            var layer = LayerManager.getLayer(LayerFactory.BBTSEEPLAYBACK);
            layer.initData();
        }
    },

    updateOuterScroll:function(infoData){
        cc.log("===========updateOuterScroll============" ,JSON.stringify(infoData));
        this.scrollLayer1.removeAllChildren();
        if(infoData && infoData.length > 0){

            var tempH = infoData.length * (this.scrollItem1.height + 2) + 15;
            var contentH = Math.max(this.scrollLayer1.height,tempH);
            this.scrollLayer1.setInnerContainerSize(cc.size(this.scrollLayer1.width,contentH));

            var startY = contentH;
            for(var i = 0;i< infoData.length;++i){
                var newItem = null;
                if(infoData[i].type == 1){
                    newItem = this.scrollTitleItem.clone();
                    if(startY != contentH)startY -= 8;
                }else{
                    newItem = this.scrollItem1.clone();
                    newItem.getChildByName("gameName").setString(infoData[i].gameName);
                    newItem.getChildByName("reshu").setString(infoData[i].reshu + "人");
                    newItem.getChildByName("jushu").setString(infoData[i].jushu);
                    UITools.addClickEvent(newItem.getChildByName("check_btn") , this , this.onClickItemCheck);
                    newItem.getChildByName("check_btn").tempData = infoData[i].tempData;
                    newItem.getChildByName("check_btn").logType = infoData[i].logType;
                }
                newItem.setVisible(true);
                newItem.getChildByName("time_label").setString(infoData[i].time);
                this.setLabelScore(newItem.getChildByName("score_label"),(infoData[i].score));
                newItem.y = startY==contentH?(startY -= (newItem.height/2 + 15)):(startY -= (newItem.height/2 + 2));
                startY -= newItem.height/2;
                this.scrollLayer1.addChild(newItem);
            }
        }else{
            this.showNoZhanjiTip(this.scrollLayer1);
        }
    },

    showNoZhanjiTip:function(parent){
        var label = parent.getChildByName("NoTipLabel");
        if(!label){
            label = UICtor.cLabel("暂无战绩",40);
            label.setName("NoTipLabel");
            label.setPosition(parent.width/2,parent.height/2);
            parent.addChild(label,1);
        }

    },

    setDetailData:function(infoData){

        ccui.helper.seekWidgetByName(this.panel_detail,"gameName").setString(infoData.gameName);
        ccui.helper.seekWidgetByName(this.panel_detail,"reshu").setString(infoData.reshu + "人");
        ccui.helper.seekWidgetByName(this.panel_detail,"jushu").setString(infoData.jushu);
        ccui.helper.seekWidgetByName(this.panel_detail,"time_day").setString(infoData.time_day);
        ccui.helper.seekWidgetByName(this.panel_detail,"time_sec").setString(infoData.time_sec);

        for(var i = 1;i<=4;++i){
            var nameLabel = ccui.helper.seekWidgetByName(this.panel_detail,"playerName" + i);
            if(i<=infoData.players.length){
                nameLabel.setString(infoData.players[i-1]);
            }else{
                nameLabel.setString("");
            }
        }

        this.scrollDetail.removeAllChildren();
        var contentH = Math.max(this.scrollDetail.height,infoData.scoreItems.length*(this.detailItem.height+2));
        this.scrollDetail.setInnerContainerSize(cc.size(this.scrollDetail.width,contentH));

        var totalScores = [0,0,0,0];
        // cc.log("infoData.scoreItems =",JSON.stringify(infoData.scoreItems));
        for(var i = 0;i<infoData.scoreItems.length;++i){
            var newItem = this.detailItem.clone();
            newItem.getChildByName("index_label").setString(i+1);
            newItem.getChildByName("time_label").setString(infoData.scoreItems[i].time);
            var btn_fx = ccui.helper.seekWidgetByName(newItem,"btn_fenxiang");
            var btn_lx = ccui.helper.seekWidgetByName(newItem,"btn_luxiang");
            UITools.addClickEvent(btn_fx, this , this.onClickItemFx);
            UITools.addClickEvent(btn_lx, this , this.onClickItemLx);
            btn_fx.code = infoData.scoreItems[i].tempData.id;
            btn_lx.tempData = infoData.scoreItems[i].tempData;
            for(var j = 1;j<=4;++j){
                var numStr = (j<=infoData.players.length)?infoData.scoreItems[i].scores[j-1]:""
                this.setLabelScore(newItem.getChildByName("score_" + j), numStr);
                totalScores[j-1] += (infoData.scoreItems[i].scores[j-1] || 0);
            }
            newItem.y = contentH - (newItem.height + 2)*(i + 0.5);
            this.scrollDetail.addChild(newItem);

        }
        var infoTotal = ccui.helper.seekWidgetByName(this.panel_detail,"info_total");
        for(var i = 1;i<=4;++i){
            if(i<=infoData.players.length){
                this.setLabelScore(infoTotal.getChildByName("score_" + i),totalScores[i-1]);
            }else{
                infoTotal.getChildByName("score_" + i).setString("");
            }
        }
    },

    onClickItemFx:function(sender){
        cc.log("=============onClickItemFx==============" + sender.code);
        this.shareHuifangCode(sender.code);
    },

    onClickItemLx:function(sender){
        cc.log("=============onClickItemLx==============" + sender.tempData.playType);
        var hfData = sender.tempData;

        PopupManager.hidePopup(DTZTotalRecordPop);
        if(PopupManager.getClassByPopup(ClubHomePop)){
            PopupManager.hidePopup(ClubHomePop);
        }

        this.playHuifang(hfData);
    },

    setLabelScore:function(label,score){
        var scoreStr = score>0?("+" + score):("" + score);
        label.setString(scoreStr);
        var color = score>0?cc.color(201,44,29):cc.color(44,94,179);
        label.setColor(color);
    },
    initDtzClickRecordModel:function(des,tempData){
        des = des[0];
        var myTeamScore = 0;
        var otherTeamScore = 0;
        var myWinTeam = 0;
        var myTeamPaimianScore = 0;
        var otherTeamPaimianScore = 0;
        var winPlayer = [];
        var lossPlayer = [];
        var sortedPalyer = [];
        var winTeam = des.playerMsg[0].group;
        var totalPoint = 0;
        var secondPlayerScore = 0;
        var myScore = 0;
        for (var index = 0; index < des.playerMsg.length; index++) {
            var tPlayer = des.playerMsg[index];
            if (tPlayer.userId == PlayerModel.userId) {
                myWinTeam = tPlayer.group;
                myScore = tPlayer.winLossPoint;
                winPlayer.push(tPlayer);
            } else {
                lossPlayer.push(tPlayer);
            }
        }
        sortedPalyer = winPlayer.concat(lossPlayer);


        //if (sortedPalyer && sortedPalyer.length){
        //    for (var j = 0; j < sortedPalyer.length; j++) {
        //        if (sortedPalyer[j].userId == PlayerModel.userId){
        //            myWinTeam = sortedPalyer[j].group;
        //            myScore = sortedPalyer[j].winLossPoint;
        //        }
        //
        //    }
        //}

        cc.log("des.playerMsg.length==========",des.playerMsg.length)
        for (var i = 1; i <= tempData.playerMsg.length; i++) {
            //var tPlayerData = sortedPalyer[i - 1];
            //if (i == 1) {//要求后台传我自身作为第一个玩家
            //    myWinTeam = tPlayerData.group;
            //    // cc.log("myWinTeam =",myWinTeam);
            //    myScore = tPlayerData.winLossPoint;
            //}
            if (des.playerMsg.length == 3){
                if (tempData.playerMsg[i-1].group == myWinTeam) {
                    myTeamScore = tempData.playerMsg[i-1].winLossPoint;
                } else {
                    if (lossPlayer){
                        for (var j = 0; j < lossPlayer.length; j++) {
                            if (tempData.playerMsg[i-1].userId == lossPlayer[j].userId){
                                if ( j == 0){
                                    otherTeamScore = tempData.playerMsg[i-1].winLossPoint;
                                }else{
                                    secondPlayerScore = tempData.playerMsg[i-1].winLossPoint;
                                }
                            }
                        }
                    }
                }
            }else if (des.playerMsg.length == 4){
                if (tempData.playerMsg[i-1].group == myWinTeam) {
                    myTeamScore += tempData.playerMsg[i-1].totalPoint;
                } else {
                    otherTeamScore += tempData.playerMsg[i-1].totalPoint;
                }
            }else{
                if (tempData.playerMsg[i-1].group == myWinTeam) {
                    myTeamScore += tempData.playerMsg[i-1].winLossPoint;
                } else {
                    otherTeamScore += tempData.playerMsg[i-1].winLossPoint;
                }
            }
        }
        // cc.log("myTeamScore = ",myTeamScore,"otherTeamScore =",otherTeamScore);
        var curData = {};
        curData.roomId = "" + des.tableId;
        curData.times = "" + des.time.substr(0, 16);
        curData.winorLoss = myScore>=0;
        curData.team1Score = "" + myTeamScore;
        curData.team2Score = "" + otherTeamScore;
        var addExScoreGroup = tempData.playerMsg[0].winGroup;//如果是中途解散 -1 牌面分相同 0
        if(addExScoreGroup != null && (addExScoreGroup == 1 || addExScoreGroup == 2)){
            //计算附加分
            if (myWinTeam == addExScoreGroup) {
                myTeamScore += tempData.playerMsg[0].jiangli;
            } else {
                otherTeamScore += tempData.playerMsg[0].jiangli;
            }
        }

        curData.playData = sortedPalyer;
        curData.roomExScore = tempData.playerMsg[0].jiangli;
        // cc.log("curData.roomExScore =",curData.roomExScore);
        curData.offScore = (DTZRoomModel.dealScore(myTeamScore) - DTZRoomModel.dealScore(otherTeamScore));
        curData.addExScoreTeam = tempData.playerMsg[0].winGroup;
        if (des.playerMsg.length <= 3){
            curData.team3Score = secondPlayerScore;
        }
        DTZClickRecordModel.init(curData);
    },
    onClickItemCheck:function(sender){
        // cc.log("=============onClickItemCheck==============" + sender.logType,sender.tempData.id);
        // cc.log("sender.tempData =",JSON.stringify(sender.tempData));
        if(ClubRecallDetailModel.isDTZWanfa(sender.tempData.playType)){
            var self = this;
            // cc.log("this.clubRecordData =",JSON.stringify(this.clubRecordData));
            Network.loginReq("qipai","getUserPlayLog",{logType:8, logId:sender.tempData.id , userId:PlayerModel.userId}, function(data){
                sy.scene.hideLoading();
                if (data) {
                    // cc.log("loadTableRecord"+JSON.stringify(data));
                    self.initDtzClickRecordModel(data.playLog,sender.tempData);
                    var mc = null;
                    // RecordModel.init(data.playLogMap);
                    if (sender.tempData.playerMsg.length == 4){
                        mc = new DTZRecordPop(data);
                    }else{
                        mc = new DTZ3RecordPop(data);
                    }
                    RecordModel.init(data);
                    PopupManager.open(mc);
                }
            }, function (data) {
                sy.scene.hideLoading();
                FloatLabelUtil.comText("获取战绩详情数据失败");
            });
        }else{
            this.scrollLayer1.setVisible(false);
            this.panel_detail.setVisible(true);
            this.scrollDetail.removeAllChildren();
            Network.loginReq("qipai","getUserPlayLog",{logType:sender.logType, logId: sender.tempData.id, userId:PlayerModel.userId}, function(data){
                if(data){
                    // cc.log("getUserPlayLog::"+JSON.stringify(data)); 
                    this.setDetailData(this.handleDetailData(data));
                }
            }.bind(this),function(data){
                FloatLabelUtil.comText("获取数据失败");
            });
        }
            

    },

    handleDetailData:function(data){
        var retData = {};

        retData.gameName = ClubRecallDetailModel.getGameStr(data.playLog[0].playType);
        // cc.log("data =",JSON.stringify(data));
        if(data.playLog[0].playType == PHZGameTypeModel.LDFPF){
            retData.jushu = data.playLog.length;
        }else{
            retData.jushu = data.playLog.length + "/" + data.playLog[0].totalCount;
        }
        retData.reshu = data.playLog[0].maxPlayerCount;
        retData.time_day = data.playLog[0].time.substr(0,11);
        retData.time_sec = data.playLog[0].time.substr(11,20);
        retData.players = [];
        retData.scoreItems = [];

        var idArr = [];
        for(var i = 0;i<data.playLog[0].playerMsg.length;++i){
            retData.players.push(data.playLog[0].playerMsg[i].name);
            idArr.push(data.playLog[0].playerMsg[i].userId);
        }

        for(var i = 0;i<data.playLog.length;++i){
            var info = {};
            var lastMsgArr;
            if (i>0){
                lastMsgArr = data.playLog[i-1].playerMsg;
            }
            info.time = data.playLog[i].time.substr(11,20);
            info.scores = [];
            var msgArr = data.playLog[i].playerMsg;
            for(var j = 0;j<msgArr.length;++j){
                var idx = j;
                var lastidx = j;
                for(var t = 0;t<idArr.length;++t){
                    if(idArr[t] == msgArr[j].userId){
                        idx = t;
                        break;
                    }
                }
                if (i>0){
                    for(var t2 = 0;t2<lastMsgArr.length;++t2){
                        if(lastMsgArr[t2].userId == msgArr[j].userId){
                            lastidx = t2;
                            break;
                        }
                    }
                }
                if (ClubRecallDetailModel.isDTZWanfa(data.playLog[i].playType)){
                    info.scores[idx] = msgArr[j].totalPoint;
                    if (i>0){
                        info.scores[idx] = msgArr[j].totalPoint - lastMsgArr[lastidx].totalPoint;
                    }
                }else{
                    info.scores[idx] = msgArr[j].point;
                }
            }

            info.tempData = data.playLog[i];
            retData.scoreItems.push(info);
        }

        return retData;
    },

    handleClubDetailData:function(data){
        var retData = this.handleDetailData(data);
        retData.room_id = data.playLog[0].tableId;
        retData.gameName = ClubRecallDetailModel.getGameStr(data.playLog[0].playType);

        var detailInfoStr = "";

        var resultMsg = JSON.parse(data.resultMsg);
        var modeMsg = JSON.parse(data.modeMsg);
        var createTimeStr = resultMsg.createTime || "";

        var dissPlayerStr = ClubRecallDetailModel.getDissPlayerStr(resultMsg);

        var wanfaStr = ClubRecallDetailModel.getWanfaStr(modeMsg.ints);

        detailInfoStr += ("创建时间:" + createTimeStr);
        detailInfoStr += (" " + dissPlayerStr);
        detailInfoStr += ("\n" + wanfaStr);


        retData.infoStr = detailInfoStr;

        return retData;
    },

    onClickInnerBack:function(){
        if(this.layerType == 1){
            this.scrollLayer1.setVisible(true);
        }else if(this.layerType == 2){
            this.panel_pyqzj.setVisible(true);
        }

        this.panel_detail.setVisible(false);
    },

    onClickClubBack:function(){
        this.panel_pyqzj.setVisible(true);
        this.panel_detail_club.setVisible(false);
    },

    onExit:function(){

        this.scrollItem1 && this.scrollItem1.release();
        this.scrollTitleItem && this.scrollTitleItem.release();
        this.detailItem && this.detailItem.release();
        this.detailItemClub && this.detailItemClub.release();

        this._super();
    },

    getLogWithCode:function(code){
        Network.loginReq("qipai","getPlayBackLog",{logId:code, userId:PlayerModel.userId}, function(data){
            if(data){
                //cc.log("=========getLogWithCode==========" + JSON.stringify(data));
                if(data.playLog && data.playLog.length>0){
                    this.panel_pyqzj.setVisible(false);
                    this.scrollLayer1.setVisible(false);
                    this.panel_detail_club.setVisible(false);
                    this.panel_detail.setVisible(true);
                    this.setDetailData(this.handleDetailData(data));

                }else{
                    FloatLabelUtil.comText("没有该回放码的战绩");
                }
            }
        }.bind(this),function(data){
            //cc.log("=======getLogWithCode======error====" + JSON.stringify(data));
            FloatLabelUtil.comText(data.message);
        });
    },

    onClickCheckBtn:function(){
        cc.log("=============onClickCheckBtn==============");
        var code = this.inputBox.getString();
        if(!code){
            FloatLabelUtil.comText("请输入回放码");
            return;
        }
        this.getLogWithCode(code);
    },

    onClickMyRecord:function(){
        cc.log("=============onClickMyRecord==============");
        this.scrollLayer1.setVisible(true);
        this.panel_detail.setVisible(false);
        this.getZhanjiData();
    },

    onClickPyqRecord:function(){
        cc.log("=============onClickPyqRecord==============");
        this.panel_pyqzj.setVisible(true);
        this.panel_detail.setVisible(false);
        this.panel_detail_club.setVisible(false);
        this.inputRoomIdBox.setString("");
        this.inputUserIdBox.setString("");
        this.getClubRecordData(1);
    },

    setBtnShowType:function(type){
        if(type == 2){
            this.pyqRecordBtn.loadTextureNormal("res/ui/bjdmj/paiyouquan1.png");
            this.myRecordBtn.loadTextureNormal("res/ui/bjdmj/wodezhanji2.png");
            this.myRecordBtn.setVisible(false);
            this.pyqRecordBtn.setPosition(this.myRecordBtn.getPosition());
        }else{
            this.pyqRecordBtn.loadTextureNormal("res/ui/bjdmj/paiyouquan2.png");
            this.myRecordBtn.loadTextureNormal("res/ui/bjdmj/wodezhanji1.png");
            this.pyqRecordBtn.setVisible(false);
        }
        this.panel_pyqzj.setVisible(type == 2);
        this.scrollLayer1.setVisible(type == 1);
        this.panel_detail.setVisible(false);
        this.panel_detail_club.setVisible(false);

        this.layerType = type;
    },

    isPhz:function(value){
        var phzWanFaList = [113 , 114 , 115 , 116 , 117 , 118];
        return (ArrayUtil.indexOf(phzWanFaList , value) >= 0)
    },

    //战绩分享
    onSharePicture: function () {
        var winSize = cc.director.getWinSize();
        var texture = new cc.RenderTexture(winSize.width, winSize.height);
        if (!texture)
            return;
        texture.anchorX = 0;
        texture.anchorY = 0;
        texture.begin();
        this.visit();
        texture.end();
        texture.saveToFile("share_pdk.jpg", cc.IMAGE_FORMAT_JPEG, false);
        var obj = {};
        obj.tableId = 1;
        obj.userName = PlayerModel.username;
        obj.callURL = SdkUtil.SHARE_URL + '?userId=' + encodeURIComponent(PlayerModel.userId);
        obj.title = ""
        obj.description = "";
        obj.shareType = 0;
        sy.scene.showLoading("正在截取屏幕");
        var self = this;
        setTimeout(function () {
            sy.scene.hideLoading();
            //SharePop.show(obj);
            ShareDTPop.show(obj);
        }, 500);

    },

    shareHuifangCode:function(code){
        var obj={};
        obj.tableId = 0;
        obj.userName=PlayerModel.username;
        obj.callURL=SdkUtil.SHARE_URL+'?userId='+encodeURIComponent(PlayerModel.userId);
        var content = "战绩回放码:" + code + ",分享玩家:" + PlayerModel.name;
        var tip = "可在游戏内战绩界面输入回放码查看战绩";
        obj.title=content;
        obj.pyq=tip;
        obj.description=tip;
        obj.shareType=1;
        ShareDTPop.show(obj);
    },

});


//3人和2人的战绩详情
var DTZ3RecordPop = BasePopup.extend({
    ctor: function (data) {
        this.data = data;
        //cc.log("DTZ3RecordPop=== " + JSON.stringify(this.data));
        this._super("res/DTZ3recordDetail.json");

    },


    addScoreLable:function(score , fatherNode){

        //显示分数
        var lableFnt = score >= 0 ? "res/font/dn_bigResult_font_1.fnt" : "res/font/greeNum_0.fnt";
        var sign = score >= 0 ? "+" : "";
        var label = new cc.LabelBMFont(sign + score + "", lableFnt);

        label.x = fatherNode.width / 2 - label.width * 0.5 + 20;
        label.y = fatherNode.height / 2 - label.height * 0.5 ;
        label.scale = 0.8;
        fatherNode.addChild(label);
    },

    selfRender: function () {
        //加载玩家点击的那条记录数据
        this.totalNode = this.getWidget("totalMsg");
        this.roomIdlable = this.getWidget("Label_14");
        this.timelable = this.getWidget("Label_15");
        this.scoreLable1 = this.getWidget("scoreLable1");
        this.scoreLable2 = this.getWidget("scoreLable2");
        this.scoreLable3 = this.getWidget("scoreLable3");
        this.exScoreNode = this.getWidget("roomExScore");
        this.ImageWin = ccui.helper.seekWidgetByName(this.totalNode, "ImageWin");
        this.ImageLoss = ccui.helper.seekWidgetByName(this.totalNode, "ImageLoss");

        this.shareBtn = this.getWidget("Button_Share");
        this.returnBtn = this.getWidget("Button_Back");


        UITools.addClickEvent(this.returnBtn, this, this.onToHome);
        UITools.addClickEvent(this.shareBtn, this, this.onShare);

        this.roomIdlable.setString(DTZClickRecordModel.roomId);
        this.timelable.setString(DTZClickRecordModel.times);

        this.addScoreLable(DTZClickRecordModel.team1Score, this.scoreLable1);
        this.addScoreLable(DTZClickRecordModel.team2Score, this.scoreLable2);
        this.addScoreLable(DTZClickRecordModel.team3Score, this.scoreLable3);

        this.scoreLable1.setString("");
        this.scoreLable2.setString("");
        this.scoreLable3.setString("");

        var myGroup = 0;
        for (var index = 1; index <= DTZClickRecordModel.playData.length; index++) {
            var iconNode = this["icon_" + index] = ccui.helper.seekWidgetByName(this.totalNode, "icon_" + index);
            var curPlayer = DTZClickRecordModel.playData[index - 1];
            if(index == 1){
                myGroup = curPlayer.group;
            }

            //显示名字
            var realName = this.getPalyerCanSeeName(curPlayer.name, 100, 25);
            this.getWidget("name_" + index).setString(realName);
            this.getWidget("id_" + index).setString("ID:"+curPlayer.userId);

            //显示头像
            this.showIcon(curPlayer.icon, index, curPlayer.sex);
        }
        if(DTZClickRecordModel.playData.length == 2){
            this.scoreLable3.visible = false;
            this.getWidget("name_" + 3).visible = false;
            this.getWidget("id_" + 3).visible = false;
            ccui.helper.seekWidgetByName(this.totalNode, "icon_" + 3).visible = false;
        }


        //判断胜负
        this.winOrLoss = DTZClickRecordModel.winorLoss;
        var lableFnt = this.winOrLoss == true ? "res/font/dn_bigResult_font_1.fnt" : "res/font/greeNum_0.fnt";
        var sign = "+";
        if (this.winOrLoss) { //胜利
            this.ImageWin.visible = true;
            this.scoreLable1.setColor(cc.color(255, 111, 24));
            this.scoreLable2.setColor(cc.color(65, 167, 31));
            sign = "+";
        } else {        //失
            this.ImageLoss.visible = true;
            this.scoreLable2.setColor(cc.color(255, 111, 24));
            this.scoreLable1.setColor(cc.color(65, 167, 31));
            sign = "-";
        }

        //显示每局的详情
        this.list = this.getWidget("ListView_6");
        var playLog = this.data.playLog;
        for (var i = 0; i < playLog.length; i++) {
            var item = new DTZRecordCell(playLog[i].playerMsg.length);
            item.setData(playLog[i]);
            this.list.pushBackCustomItem(item);
        }
    },

    showIcon: function (iconUrl, index, sex) {
        //iconUrl = "http://wx.qlogo.cn/mmopen/25FRchib0VdkrX8DkibFVoO7jAQhMc9pbroy4P2iaROShWibjMFERmpzAKQFeEKCTdYKOQkV8kvqEW09mwaicohwiaxOKUGp3sKjc8/0";
        cc.log("战绩 显示第" + index + "个玩家的头像" + " url:" + JSON.stringify(iconUrl));
        var url = iconUrl;
        //var icon = this.getWidget("icon_" + index);
        var icon = this["icon_" + index];

        var defaultimg = (sex == 1) ? "res/ui/dtz/images/default_m.png" : "res/ui/dtz/images/default_w.png";

        if (icon.getChildByTag(345)) {
            icon.removeChildByTag(345);
        }

        var sprite = new cc.Sprite(defaultimg);
        sprite.x = 0;
        sprite.y = 0;
        sprite.setScale(0.6);
        icon.addChild(sprite, 5, 345);
        if (iconUrl) {
            cc.loader.loadImg(iconUrl, {width: 252, height: 252}, function (error, img) {
                if (!error) {
                    sprite.setTexture(img);
                    sprite.scale = 0.6;
                }
            });
        }
    },

    //设置名字的方法 (限制长度)
    getPalyerCanSeeName: function (nameString, width, fontSize) {
        //nameString = "我1想lm试试中文";
        var length = nameString.length;
        var tlableForSize = null;
        var showName = nameString;
        var tName = null;
        var tWidth = 0;

        for (var curLenght = 2; curLenght <= length; curLenght++) {
            tName = nameString.substring(0, curLenght);
            tlableForSize = new cc.LabelTTF(tName, "Arial", fontSize);
            tWidth = tlableForSize.width;
            //cc.log("当前显示的文字为 " + tName + "宽度为:" + tWidth + "");
            if (tWidth >= width) {
                showName = nameString.substring(0, curLenght - 1);
                cc.log("实际显示的文字为:" + showName);
                break;
            }
        }
        return showName;
    },


    onToHome: function () {
        LayerManager.showLayer(LayerFactory.HOME);
        PopupManager.remove(this);
        PopupManager.removeAll();
    },

    onShare: function () {
        cc.log("share...");
        var winSize = cc.director.getWinSize();
        var texture = new cc.RenderTexture(winSize.width, winSize.height);
        if (!texture)
            return;
        texture.anchorX = 0;
        texture.anchorY = 0;
        texture.begin();
        this.visit();
        texture.end();
        texture.saveToFile("share_pdk.jpg", cc.IMAGE_FORMAT_JPEG, false);

        var obj = {};
        obj.tableId = DTZRoomModel.tableId;
        obj.userName = PlayerModel.username;
        obj.callURL = SdkUtil.SHARE_URL + '?userName=' + encodeURIComponent(PlayerModel.name);
        obj.title = "打筒子   房号:" + DTZRoomModel.tableId;
        obj.description = "我已在安化棋牌的跑得快开好房间,纯技术实力的对决,一起跑得快！";
        obj.shareType = 0;
        sy.scene.showLoading("正在截取屏幕");
        setTimeout(function () {
            sy.scene.hideLoading();
            //SharePop.show(obj);
            ShareDTPop.show(obj);
        }, 500);
    },

});

var DTZRecordCell = ccui.Widget.extend({
    data: null,
    ctor: function (renLength,isDaiKai) {
        // cc.log("创建每局详情 ...");
        this.isDaiKai = isDaiKai || false;
        this._super();
        this.renLength = renLength;
        this.setContentSize(1128, 90);

        var Panel_7=this.Panel_7= UICtor.cPanel(cc.size(1159,141),cc.color(225,205,176),0);
        Panel_7.setAnchorPoint(cc.p(0,0));
        Panel_7.setPosition(0,0);
        var Label_Round=this.Label_Round= UICtor.cLabel("第一局",28,cc.size(0,0),cc.color(129,49,0),1,1);
        Label_Round.setPosition(52,48);
        Label_Round.setLocalZOrder(1);
        Panel_7.addChild(Label_Round);
        var Label_Time=this.Label_Time= UICtor.cLabel("2016-05-15 12:00",25,cc.size(140,80),cc.color(129,49,0),1,1);
        Label_Time.setPosition(178,46);
        Label_Time.setLocalZOrder(1);
        Panel_7.addChild(Label_Time);
        var PanelWin=this.PanelWin= UICtor.cPanel(cc.size(1138,90),cc.color(225,205,176),255);
        PanelWin.setAnchorPoint(cc.p(0,0));
        PanelWin.setPosition(1,1);
        Panel_7.addChild(PanelWin);
        var PanelLoss=this.PanelLoss= UICtor.cPanel(cc.size(1138,90),cc.color(240,224,200),255);
        PanelLoss.setAnchorPoint(cc.p(0,0));
        PanelLoss.setPosition(1,1);
        Panel_7.addChild(PanelLoss);
        var Image_25=this.Image_25= UICtor.cImg("res/ui/dtz/dtzSmallResult/dipai.png");
        Image_25.setPosition(521,26);
        PanelLoss.addChild(Image_25);
        var Image_37=this.Image_37= UICtor.cImg("res/ui/dtz/dtzSmallResult/jiantour.png");
        Image_37.setPosition(293,46);
        PanelLoss.addChild(Image_37);
        var Image_38=this.Image_38= UICtor.cImg("res/ui/dtz/dtzSmallResult/jiantoul.png");
        Image_38.setPosition(747,46);
        PanelLoss.addChild(Image_38);
        var Label_Score=this.Label_Score= UICtor.cLabel("积分",30,cc.size(0,0),cc.color(255,111,24),1,1);
        Label_Score.setPosition(801,47);
        Label_Score.setLocalZOrder(1);
        Panel_7.addChild(Label_Score);
        var Label_ScoreValue=this.Label_ScoreValue= UICtor.cLabel("",20,cc.size(0,0),cc.color(255,255,255),0,0);
        Label_ScoreValue.setPosition(902,49);
        Panel_7.addChild(Label_ScoreValue);

        //添加一个拖动框
        var cardlist = this.cardlist =  new ccui.ListView();
        cardlist.setTouchEnabled(true);
        cardlist.setContentSize(cc.size(400 , 90));
        cardlist.setDirection(ccui.ScrollView.DIR_HORIZONTAL);
        cardlist.setPosition(320 , 0);
        cardlist.setLocalZOrder(2);
        PanelLoss.addChild(cardlist);

        var huifangBtn = new ccui.Button();
        huifangBtn.loadTextureNormal("res/ui/pdk/PDKrecordSmall/seeBack.png");
        huifangBtn.setPosition(1050,49);
        Panel_7.addChild(huifangBtn);

        UITools.addClickEvent(huifangBtn,this,this.onHuiFang);

        this.addChild(Panel_7);

    },

    sortCardlists: function (vo1, vo2) {
        if(vo1 != null && vo2 != null){
            var item1 = DTZAI.getCardDef(vo1);
            var item2 = DTZAI.getCardDef(vo2);
            if (item1.i != item2.i) {
                return item1.i - item2.i;
            } else {
                return item1.t - item2.t;
            }
        }
        return false;

    },

    setData: function (data) {

        // cc.log("每局详情的数据..." , JSON.stringify(data));
        this.data = data;
        this.Label_Round.setString("第" + data.playCount + "局");
        this.Label_Time.setString(data.time.substr(0, 16));

        this.cutCardList = data.cutCardList;
        //显示扑八张
        var offX = 30;
        var beginX = 482;
        var beginY = 12;
        if(data.cutCardList && data.cutCardList.length != 0){
            data.cutCardList.sort(this.sortCardlists);
        }

        if(data.cutCardList != null && data.cutCardList.length > 0){
            for(var index = 0 ; index < this.cutCardList.length ; index ++){
                var cardMsg = DTZAI.getCardDef(this.cutCardList[index]);
                var cardItem = new DTZBigCard(cardMsg);
                cardItem.scale = 0.5;
                cardItem.anchorY = 0;
                cardItem.anchorX = 0;
                cardItem.width = cardItem.width * cardItem.scale * 0.3;
                cardItem.height = cardItem.height * cardItem.scale;
                this.cardlist.pushBackCustomItem(cardItem);
            }
            this.Image_25.setLocalZOrder(3);
        }else{
            this.Image_25.setVisible(false);
        }

        //显示分数
        var score = data.playerMsg[0].point;//totalPoint
        var team = data.playerMsg[0].group;
        var teamScore = 0;
        // cc.log("show team is ", team);
        //这里应该计算同一组的分数 而不是一个人的分数
        for (var index = 0; index < data.playerMsg.length; index++) {
            if (team == data.playerMsg[index].group) {
                teamScore += data.playerMsg[index].dtzOrXiScore;//totalPoint //dtzOrXiScore
                // cc.log("teamScore ...", teamScore);
            }
        }
        score = teamScore;

        /*
         cc.log("data.playerMsg[0].name" , data.playerMsg[0].name  +" "+ data.playerMsg[0].point +" "+ data.playerMsg[0].totalPoint );
         cc.log("data.playerMsg[1].name" , data.playerMsg[1].name  +" "+ data.playerMsg[1].point  +" "+ data.playerMsg[1].totalPoint );
         cc.log("data.playerMsg[2].name" , data.playerMsg[2].name  +" "+ data.playerMsg[2].point +" "+ data.playerMsg[2].totalPoint );
         cc.log("data.playerMsg[3].name" , data.playerMsg[3].name  +" "+ data.playerMsg[3].point  +" "+ data.playerMsg[3].totalPoint );
         */

        var sign = "+";
        var lableFnt = "res/font/font_res_huang.fnt";
        var lableFnt = score >= 0 ? "res/font/dn_bigResult_font_1.fnt" : "res/font/greeNum_0.fnt";
        if (score >= 0) {
            sign = "+";
        } else {
            sign = "";
        }
        var label = new cc.LabelBMFont(sign + score + "", lableFnt);
        label.x = this.Label_ScoreValue.width / 2;
        label.y = this.Label_ScoreValue.height / 2;
        label.scale = 0.8;
        this.Label_ScoreValue.addChild(label);

    },

    onHuiFang: function () {
        sy.scene.hideLoading();
        for (var i = 0; i < PopupManager.popupList.length; i++) {
            if (PopupManager.popupList[i]["constructor"] == DTZTotalRecordPop) {
                TotalRecordModel.isShowRecord = true;
            } else if (PopupManager.popupList[i]["constructor"] == DTZRecordPop ||PopupManager.popupList[i]["constructor"] == DTZ3RecordPop) {
                RecordModel.isShowRecord = true;
            }
        }
        PopupManager.removeAll();


        //cc.log("this.data.playerMsg.length"+this.data.playerMsg.length);

        var json = LayerFactory.DTZSEEPLAYBACK;
        if(this.data.playerMsg.length == 4){
            json = LayerFactory.DTZSEEPLAYBACK_MORE;
        }
        DTZRoomModel.wanfa = this.data.playType;
        PlayBackModel.init(this.data);
        LayerManager.showLayer(json);
        var layer = LayerManager.getLayer(json);
        layer.initData();

        //    if (this.data.playType == 15 || this.data.playType == 16) {
        //    PlayBackModel.init(this.data,this.isDaiKai);
        //    LayerManager.showLayer(LayerFactory.SEEPLAYBACK);
        //    var layer = LayerManager.getLayer(LayerFactory.SEEPLAYBACK);
        //    layer.initData(this.isDaiKai);
        //} else if (this.data.playType == 31) {
        //    //cc.log("this.data::"+JSON.stringify(this.data));
        //    PHZRePlayModel.init(this.data);
        //    LayerManager.showLayer(LayerFactory.PHZ_REPLAY);
        //    var layer = LayerManager.getLayer(LayerFactory.PHZ_REPLAY);
        //    layer.initData();
        //} else if (this.data.playType == 20 || this.data.playType == 21 || this.data.playType == 22 || this.data.playType == 23) {
        //    DNReplayModel.init(this.data);
        //    var layerName = LayerFactory.DN_REPLAY;
        //    if (DNReplayModel.players.length > 5)
        //        layerName = LayerFactory.DN_REPLAY_MORE;
        //    LayerManager.showLayer(layerName);
        //    var layer = LayerManager.getLayer(layerName);
        //    layer.initData();
        //} else {
        //    //return FloatLabelUtil.comText("暂未开放");
        //    MJReplayModel.init(this.data);
        //    LayerManager.showLayer(LayerFactory.MJ_REPLAY);
        //    var layer = LayerManager.getLayer(LayerFactory.MJ_REPLAY);
        //    layer.initData();
        //}
    }
});