/**
 * Created by zhoufan on 2016/7/28.
 */
var HZMJBigResultPop = BasePopup.extend({
    user:null,
    ctor: function (data,isDaiKai) {
        this.data = data;
        this.isDaiKai = isDaiKai;
        this._super("res/mjBigResult.json");
    },

    refreshSingle:function(widget,user){
        widget.visible = true;
        this.user=user;
        ccui.helper.seekWidgetByName(widget,"name").setString(user.name);
        ccui.helper.seekWidgetByName(widget,"id").setString("ID:"+user.userId);

        var birdSeat = this.data.birdSeat || [];
        //var niaoNum = birdSeat[user.seat] || 0;

        var zmCount = 0;
        var jpCount = 0;
        var fpCount = 0;
        var niaoCount = 0;
        if (user.actionCount){
            zmCount = user.actionCount[0] || 0;
            jpCount = user.actionCount[1] || 0;
            fpCount = user.actionCount[2] || 0;
            niaoCount = user.actionCount[5] || 0;

        }


        ccui.helper.seekWidgetByName(widget,"Label_zm").setString(zmCount+"");
        ccui.helper.seekWidgetByName(widget,"Label_zm_0").setString(jpCount+"");
        ccui.helper.seekWidgetByName(widget,"Label_zm_1").setString(fpCount+"");
        ccui.helper.seekWidgetByName(widget,"Label_zm_2").setString(niaoCount+"");

        var pointPanel = ccui.helper.seekWidgetByName(widget,"Panel_point");
        var fontPath = "res/font/font_point_2.fnt";
        var totalPoint = user.totalPoint;
        var png = "res/ui/mj/mjSmallResult/mjSmallResult_6.png";
        if (totalPoint >= 0){
            totalPoint = "+" + totalPoint;
            fontPath = "res/font/font_point_1.fnt";
            png = "res/ui/mj/mjSmallResult/mjSmallResult_5.png";
        }
        widget.setBackGroundImage(png);

        this.Label_point = new cc.LabelBMFont("" + totalPoint,fontPath);
        this.Label_point.x = pointPanel.width/2;
        this.Label_point.y = pointPanel.height/2;
        pointPanel.addChild(this.Label_point);

        var icon = ccui.helper.seekWidgetByName(widget,"icon");
        var defaultimg = "res/ui/mj/mjBigResult/default_m.png";
        if(icon.getChildByTag(345))
            icon.removeChildByTag(345);
        var sprite = new cc.Sprite(defaultimg);
        sprite.x = 40;
        sprite.y = 40;
        icon.addChild(sprite,5,345);
        if(user.icon){
            cc.loader.loadImg(user.icon, {width: 78, height: 78}, function (error, img) {
                if (!error) {
                    sprite.setTexture(img);
                    sprite.x = 40;
                    sprite.y = 40;
                }
            });
        }
        var Image_fh = ccui.helper.seekWidgetByName(widget,"Image_fh");
        var Image_dyj = ccui.helper.seekWidgetByName(widget,"Image_dyj");
        Image_fh.visible = false;
        Image_dyj.visible = false;
        if (user.zdyj == 1) {
            Image_dyj.visible = true;
        }
        if (user.dfh == 1) {
            Image_fh.visible = true;
        }

        ccui.helper.seekWidgetByName(widget,"Image_credit").visible = false;
        ccui.helper.seekWidgetByName(widget,"Label_credit").setString("");
        if (MJRoomModel.isCreditRoom()){
            ccui.helper.seekWidgetByName(widget,"Label_credit").setString(""+user.winLoseCredit);//比赛分
            //ccui.helper.seekWidgetByName(widget,"Label_credit").setString(""+user.ext[10]);//比赛分
            ccui.helper.seekWidgetByName(widget,"Image_credit").visible = true;
            pointPanel.y = pointPanel.y + 15;
        }
    },

    selfRender: function () {
        //版本号
        if(this.getWidget("Label_version")){
            this.getWidget("Label_version").setString(SyVersion.v);
        }

        if (MJRoomModel.roomName){
            var string = "";
            string = MJRoomModel.roomName + "   亲友圈ID：" + ClosingInfoModel.ext[0];
            this.getWidget("Label_roomname").setString(string);
        }else{
            this.getWidget("Label_roomname").visible = false;
        }

        var jushuStr = MJRoomModel.nowBurCount + "/" + MJRoomModel.totalBurCount;
        this.getWidget("jushu").setString(jushuStr);

        this.getWidget("wanfa_2").setString("红中麻将");

        this.getWidget("roomid").setString("" + MJRoomModel.tableId);

        this.closingPlayers = this.data.closingPlayers;
        var max = 0;
        var min = 0;
        for(var i=0;i<4;i++){
            var seq = i+1;
            this.getWidget("user"+seq).visible = false;
        }
        for(var i=0;i<this.closingPlayers.length;i++){
            var user = this.closingPlayers[i];
            if(user.totalPoint >= max)
                max = user.totalPoint;
            if(user.totalPoint <= min)
                min = user.totalPoint;
        }
        for(var i=0;i<this.closingPlayers.length;i++){
            var seq = i+1;
            var user = this.closingPlayers[i];
            if (user.totalPoint == max) {
                user.zdyj = 1;
            }
            if (user.totalPoint == min) {
                user.dfh = 1;
            }
            this.refreshSingle(this.getWidget("user"+seq),user);
        }

        var timeStr = ClosingInfoModel.ext[3];
        this.getWidget("time_2").setString(timeStr);

        var Button_20 = this.getWidget("Button_20");
        UITools.addClickEvent(Button_20,this,this.onShare);
        var Button_21 = this.getWidget("Button_21");
        UITools.addClickEvent(Button_21,this,this.onToHome);

        var Button_fxCard = this.getWidget("Button_fxCard");
        UITools.addClickEvent(Button_fxCard,this,this.onShareCard);
        Button_fxCard.visible = false;
        if(MJRoomModel.tableType == 1 && ClosingInfoModel.groupLogId){//亲友圈房间才可见;
            Button_fxCard.visible = true;
            //var Button_fxCard = UICtor.cBtn("res/ui/mj/mjBigResult/mjBigResult_fxCard.png");
            //Button_20.getParent().addChild(Button_fxCard);
            //Button_fxCard.y =  Button_20.y;
            //UITools.addClickEvent(Button_fxCard,this,this.onShareCard);
            //Button_21.x += 50;
            //Button_20.x +=172 ;
            //Button_fxCard.x = Button_20.x-(Button_21.x-Button_20.x);
        }

        var wfStr = "";
        if (MJRoomModel.isDouble() && MJRoomModel.renshu == 2){
            var dtimes = MJRoomModel.getDoubleNum();
            var dScore = MJRoomModel.getDScore();
            wfStr = wfStr + "小于"+ dScore +"分" + " 翻" + dtimes + "倍";
        }
        this.getWidget("Label_double").setString(""+wfStr);


        this.getWidget("Label_score").setString("");
        if (MJRoomModel.isCreditRoom()){
            //赠送分
            //固定赠送 大赢家 10
            //比例赠送 所有赢家 2%
            var giveStr = "";
            var giveType = MJRoomModel.getCreditType();
            var giveWay = MJRoomModel.getCreditWay();
            var giveNum = MJRoomModel.getCreditGiveNum();
            if (giveType == 1){
                giveStr = giveStr + "固定赠送,";
            }else{
                giveStr = giveStr + "比例赠送,";
            }
            if (giveWay == 1){
                giveStr = giveStr + "大赢家,";
            }else{
                giveStr = giveStr + "所有赢家,";
            }
            if (giveType == 1){
                giveStr = giveStr + giveNum;
            }else{
                giveStr = giveStr + giveNum + "%";
            }
            this.getWidget("Label_score").setString("底分:"+MJRoomModel.getCreditScore() + "," + giveStr);
        }

        var wanfaStr = "";
        if (ClosingInfoModel.ext){
            if (ClosingInfoModel.ext[4] == MJWanfaType.HZMJ){
                wanfaStr = this.getSpecificWanfa(ClosingInfoModel.ext);
            }
        }
        this.getWidget("Label_wf").setString("" + wanfaStr);
    },

    //显示具体玩法
    getSpecificWanfa:function(wanfaList) {
        var gameStr = "红中麻将 ";

        var costStr = "";

        var zhuangStr = "";
        if(wanfaList[7] == 1){
            zhuangStr = "分庄闲 ";
        }

        var khqdStr = "";
        if(wanfaList[8] == 1){
            khqdStr = "可胡七对 ";
        }

        var niaoNumStr = "不抓鸟 ";
        if(wanfaList[6] && wanfaList[6] != 0){
            niaoNumStr = "抓"+ wanfaList[6] + "鸟 ";
        }

        var niaowayStr = "";
        if(wanfaList[21] == 1){
            niaowayStr = "159中鸟 ";
        }

        var niaoStr = "";
        if(wanfaList[13] == 1){
            niaoNumStr = "";
            niaoStr = "一鸟全中 ";
        }

        var bsjStr = "";
        if(wanfaList[11] == 1){
            bsjStr = "抢杠胡包三家 ";
        }


        var dpdStr = "";
        if(wanfaList[5] == 0){
            dpdStr = "点炮胡 ";
        }

        var ypbhStr = "";
        if(wanfaList[15] == 1){
            ypbhStr = "有炮必胡 ";
        }

        var qghStr = "";
        if(wanfaList[10] == 1){
            qghStr = "抢杠胡 ";
        }

        var credit = "";
        //if (wanfaList[13] == 1){
        //    credit = "比赛房 "
        //}

        var tgStr = "";
        if (wanfaList[9] == 1){
            tgStr = "托管 ";
        }
        var doubleStr = "";
        if (wanfaList[23] == 1){
            doubleStr = "低于" + wanfaList[24] + "分翻" + wanfaList[25] +"倍 " ;
        }

        gameStr = "";

        var wanfaStr =  csvhelper.strFormat("{0}{1}{2}{3}{4}{5}{6}{7}{8}{9}{10}{11}{12}{13}",
            gameStr,costStr,
            zhuangStr,khqdStr,bsjStr,dpdStr,
            ypbhStr,qghStr,tgStr,niaoNumStr,niaowayStr,niaoStr,doubleStr,credit);
        return wanfaStr;
    },

    onShareCard:function() {
        this.shareCard(MJRoomModel, PlayerModel, ClosingInfoModel.groupLogId);
    },

    /**
     * 分享战报
     */
    onShare:function(){
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

        var obj={};
        var tableId = (this.isDaiKai) ? dkResultModel.data.tableId : MJRoomModel.tableId;
        obj.tableId=MJRoomModel.tableId;
        obj.userName=PlayerModel.username;
        obj.callURL=SdkUtil.SHARE_URL+'?num='+MJRoomModel.tableId+'userName='+encodeURIComponent(PlayerModel.name);
        obj.title='麻将   房号:'+MJRoomModel.tableId;
        obj.description="我已开好房间，【麻将】三缺一，就等你了！";
        obj.shareType=0;
        sy.scene.showLoading("正在截取屏幕");
        setTimeout(function(){
            sy.scene.hideLoading();
            ShareDTPop.show(obj);
        },500);
    },

    onToHome:function(){
        if(this.isDaiKai){
            dkRecordModel.isShowRecord = false;
            PopupManager.remove(this);
        }else{
            LayerManager.showLayer(LayerFactory.HOME);
            PopupManager.remove(this);
            PopupManager.removeAll();

            var isClubRoom =  (MJRoomModel.tableType ==1);
            if(isClubRoom ){
                PopupManager.removeClassByPopup(ClubHomePop);
                var mc = new ClubHomePop();//先不弹出吧
                PopupManager.addPopup(mc);
            }
        }
    }
});
