/**
 * Created by Administrator on 2017/7/21.
 */

var ClubRoomItem = ccui.Widget.extend({

    ctor:function(roomData , clubHomeLayer){
        //this.roomData = JSON.parse(roomData);
        this.roomData = (roomData);
        this.parentNode = clubHomeLayer;
        //cc.log("this.roomData ..." , JSON.stringify(this.roomData));
        var tTagbleMsg = this.roomData.tableMsg;
        this.tableId = this.roomData.tableId;
        this.keyId = this.roomData.keyId;
        this.isStart = !this.roomData.notStart;
        var tJsonData = JSON.parse(tTagbleMsg);
        this.createRoomData = tJsonData.ints.split(",");
        var tStrData = tJsonData.strs.split(";");
        this.roomUserId = tStrData[0].split("_")[1];//老李你这个数据给的我想哭 "1_userId:groupId"
        //cc.log("this.roomUserId... " , this.roomUserId);
        this.isBegin = this.roomData.currentState;  //当前的房间状态
        this._super();
        var maxCount = this.roomData.maxCount;
        var nowCount = this.roomData.currentCount;
        var members = this.roomData.members;
        var tableId = this.roomData.tableId;
        this.props = tJsonData.props;
        var wanfaList =  tJsonData.ints;
        this.creditMsg = this.roomData.creditMsg;
        var dealCount = this.roomData.dealCount
        this.bagId = tJsonData.room;
        this.bagkeyId = this.roomData.configId;
        this.wanfaList = [];
        //cc.log("this.ClubRoomItem",this.bagId,this.bagkeyId);


        this.setContentSize(cc.size(300,280));

        var Panel_16=this.Panel_16= UICtor.cPanel(cc.size(300,280),cc.color(150,200,255),0);
        Panel_16.setAnchorPoint(cc.p(0,0));
        Panel_16.setPosition(0,0);
        var Button_roombg=this.Button_roombg= UICtor.cBtn("res/ui/dtzjulebu/julebu/roomCellBg.png");
        Button_roombg.setPosition(146,140);
        Panel_16.addChild(Button_roombg);
        var Label_State=this.Label_State= UICtor.cLabel("进行中",21,cc.size(0,0),cc.color(192,104,32),0,0);
        Label_State.setPosition(cc.p(0+Button_roombg.getAnchorPointInPoints().x, 2+Button_roombg.getAnchorPointInPoints().y));
        Button_roombg.addChild(Label_State);

        var ListView_bagName = this.ListView_bagName =  new ccui.ListView();
        ListView_bagName.setTouchEnabled(false);
        ListView_bagName.setContentSize(cc.size(135 , 30));
        ListView_bagName.setDirection(ccui.ScrollView.DIR_HORIZONTAL);
        ListView_bagName.setAnchorPoint(cc.p(0,0));
        ListView_bagName.setPosition(cc.p(-67+Button_roombg.getAnchorPointInPoints().x, 15+Button_roombg.getAnchorPointInPoints().y));
        Button_roombg.addChild(ListView_bagName);

        var listContentSize = this.listContentSize = ListView_bagName.getContentSize();
        var Label_bagName=this.Label_bagName= UICtor.cLabel("包厢名名字啊",26,cc.size(0,0),cc.color(208,53,3),0,0);
        Label_bagName.setPosition(cc.p(ListView_bagName.getAnchorPointInPoints().x,listContentSize.height*0.5+ListView_bagName.getAnchorPointInPoints().y));
        Label_bagName.setAnchorPoint(cc.p(0,0.5));
        ListView_bagName.addChild(Label_bagName);

        var Image_myroom=this.Image_myroom= UICtor.cImg("res/ui/dtzjulebu/julebu/imgMyRoom.png");
        Image_myroom.setPosition(cc.p(113+Button_roombg.getAnchorPointInPoints().x, 96+Button_roombg.getAnchorPointInPoints().y));
        Button_roombg.addChild(Image_myroom);
        var Label_gameroom=this.Label_gameroom= UICtor.cLabel("打筒子 房号：123456",20,cc.size(0,0),cc.color(192,104,32),0,0);
        Label_gameroom.setAnchorPoint(cc.p(0,0.5));
        Label_gameroom.setPosition(cc.p(-126+Button_roombg.getAnchorPointInPoints().x, -97+Button_roombg.getAnchorPointInPoints().y));
        Button_roombg.addChild(Label_gameroom);
        var Button_wanfatip=this.Button_wanfatip= UICtor.cBtn("res/ui/dtzjulebu/julebu/btn_wanfaTip.png");
        Button_wanfatip.setPosition(cc.p(115+Button_roombg.getAnchorPointInPoints().x, -100+Button_roombg.getAnchorPointInPoints().y));
        Button_roombg.addChild(Button_wanfatip);
        var Image_iconbg1=this.Image_iconbg1= UICtor.cImg("res/ui/dtzjulebu/julebu/iconBg.png");
        Image_iconbg1.setPosition(cc.p(-103+Button_roombg.getAnchorPointInPoints().x, 16+Button_roombg.getAnchorPointInPoints().y));
        Button_roombg.addChild(Image_iconbg1);
        var outline1=this.outline1= UICtor.cImg("res/ui/dtzjulebu/julebu/outLine.png");
        outline1.setPosition(cc.p(0+Image_iconbg1.getAnchorPointInPoints().x, -16+Image_iconbg1.getAnchorPointInPoints().y));
        outline1.setLocalZOrder(6);
        Image_iconbg1.addChild(outline1);
        var Image_iconbg2=this.Image_iconbg2= UICtor.cImg("res/ui/dtzjulebu/julebu/iconBg.png");
        Image_iconbg2.setPosition(cc.p(93+Button_roombg.getAnchorPointInPoints().x, 16+Button_roombg.getAnchorPointInPoints().y));
        Button_roombg.addChild(Image_iconbg2);
        var outline2=this.outline2= UICtor.cImg("res/ui/dtzjulebu/julebu/outLine.png");
        outline2.setPosition(cc.p(0+Image_iconbg2.getAnchorPointInPoints().x, -16+Image_iconbg2.getAnchorPointInPoints().y));
        outline2.setLocalZOrder(6);
        Image_iconbg2.addChild(outline2);
        var Image_iconbg3=this.Image_iconbg3= UICtor.cImg("res/ui/dtzjulebu/julebu/iconBg.png");
        Image_iconbg3.setPosition(cc.p(0+Button_roombg.getAnchorPointInPoints().x, 79+Button_roombg.getAnchorPointInPoints().y));
        Button_roombg.addChild(Image_iconbg3);
        var outline3=this.outline3= UICtor.cImg("res/ui/dtzjulebu/julebu/outLine.png");
        outline3.setPosition(cc.p(0+Image_iconbg3.getAnchorPointInPoints().x, -16+Image_iconbg3.getAnchorPointInPoints().y));
        outline3.setLocalZOrder(6);
        Image_iconbg3.addChild(outline3);
        var Image_iconbg4=this.Image_iconbg4= UICtor.cImg("res/ui/dtzjulebu/julebu/iconBg.png");
        Image_iconbg4.setPosition(cc.p(0+Button_roombg.getAnchorPointInPoints().x, -43+Button_roombg.getAnchorPointInPoints().y));
        Button_roombg.addChild(Image_iconbg4);
        var outline4=this.outline4= UICtor.cImg("res/ui/dtzjulebu/julebu/outLine.png");
        outline4.setPosition(cc.p(0+Image_iconbg4.getAnchorPointInPoints().x, -17+Image_iconbg4.getAnchorPointInPoints().y));
        outline4.setLocalZOrder(6);
        Image_iconbg4.addChild(outline4);
        var Label_name1=this.Label_name1= UICtor.cLabel("",12,cc.size(60,16),cc.color(135,47,16),1,1);
        Label_name1.setPosition(cc.p(-92+Button_roombg.getAnchorPointInPoints().x, -4+Button_roombg.getAnchorPointInPoints().y));
        Button_roombg.addChild(Label_name1);
        var Label_name2=this.Label_name2= UICtor.cLabel("",12,cc.size(60,16),cc.color(135,47,16),1,1);
        Label_name2.setPosition(cc.p(92+Button_roombg.getAnchorPointInPoints().x, -4+Button_roombg.getAnchorPointInPoints().y));
        Button_roombg.addChild(Label_name2);
        var Label_name3=this.Label_name3= UICtor.cLabel("",12,cc.size(60,16),cc.color(135,47,16),1,1);
        Label_name3.setPosition(cc.p(0+Button_roombg.getAnchorPointInPoints().x, 77+Button_roombg.getAnchorPointInPoints().y));
        Button_roombg.addChild(Label_name3);
        var Label_name4=this.Label_name4= UICtor.cLabel("",12,cc.size(60,16),cc.color(135,47,16),1,1);
        Label_name4.setPosition(cc.p(0+Button_roombg.getAnchorPointInPoints().x, -63+Button_roombg.getAnchorPointInPoints().y));
        Button_roombg.addChild(Label_name4);
        var Image_wanfatip=this.Image_wanfatip= UICtor.cImg("res/ui/dtzjulebu/julebu/imgRoomwfBg.png");
        Image_wanfatip.setPosition(cc.p(0+Button_roombg.getAnchorPointInPoints().x, 55+Button_roombg.getAnchorPointInPoints().y));
        Image_wanfatip.setLocalZOrder(1);
        Button_roombg.addChild(Image_wanfatip);
        var Label_wanfa=this.Label_wanfa= UICtor.cLabel("打筒子",21,cc.size(250,120),cc.color(255,238,238),0,0);
        Label_wanfa.setAnchorPoint(cc.p(0,1));
        Label_wanfa.setPosition(cc.p(-123+Image_wanfatip.getAnchorPointInPoints().x, 64+Image_wanfatip.getAnchorPointInPoints().y));
        Image_wanfatip.addChild(Label_wanfa);
        var Image_select=this.Image_select= UICtor.cImg("res/ui/dtzjulebu/julebu/imgSelect.png");
        Image_select.setPosition(cc.p(-90+Button_roombg.getAnchorPointInPoints().x, 93+Button_roombg.getAnchorPointInPoints().y));
        Button_roombg.addChild(Image_select);
        var btnJiesan=this.btnJiesan= UICtor.cBtn("res/ui/dtzjulebu/julebu/btn_jieCLose.png");
        btnJiesan.setPosition(cc.p(-110+Button_roombg.getAnchorPointInPoints().x, 95+Button_roombg.getAnchorPointInPoints().y));
        Button_roombg.addChild(btnJiesan,2);
        var Image_13=this.Image_13= UICtor.cImg("res/ui/dtzjulebu/julebu/imgWaiting.png");
        Image_13.setPosition(cc.p(1+Button_roombg.getAnchorPointInPoints().x, 23+Button_roombg.getAnchorPointInPoints().y));
        Button_roombg.addChild(Image_13);
        var Image_credit=this.Image_credit= UICtor.cImg("res/ui/dtzjulebu/julebu/Credit/img_23.png");
        Image_credit.setPosition(cc.p(-114+Button_roombg.getAnchorPointInPoints().x, 93+Button_roombg.getAnchorPointInPoints().y));
        Button_roombg.addChild(Image_credit);
        var Image_order=this.Image_order= UICtor.cImg("res/ui/dtzjulebu/julebu/BagManage/img_order1.png");
        Image_order.setPosition(cc.p(108+Button_roombg.getAnchorPointInPoints().x, 94+Button_roombg.getAnchorPointInPoints().y));
        Button_roombg.addChild(Image_order);

        var BitmapLabel_order = this.BitmapLabel_order = new cc.LabelBMFont( 1 + "", "res/font/font_res_order.fnt");
        BitmapLabel_order.setPosition(cc.p(-7+Image_order.getAnchorPointInPoints().x, -1+Image_order.getAnchorPointInPoints().y));
        Image_order.addChild(BitmapLabel_order);



        btnJiesan.visible = Image_order.visible = false;
        Image_iconbg1.visible = Image_iconbg2.visible = Image_iconbg3.visible = Image_iconbg4.visible = false;
        outline1.visible = outline2.visible = outline3.visible = outline4.visible = false;
        Image_13.visible = Image_credit.visible = false;

        //显示房间状态
        if (this.isStart == false){
            if(nowCount < maxCount){
                Label_State.setString("可加入")
            }else{
                Label_State.setString("待开局");
            }
        }else{
            //显示具体局数 李周说要+1显示
            Label_State.setString("第"+dealCount+"局");
        }


        //显示是否私密
        Image_select.visible = false;
        if (this.props == 0){
            Image_select.visible = true;
        }
        for(var i = 0 ; i < maxCount ; i++){
            var Image_iconbg = null;
            var Label_name = null;
            var outLine = this["outline" + (i + 1)];
            if (i == 0){
                Image_iconbg = Image_iconbg1;
                Label_name = Label_name1;
            }else if (i == 1){
                Image_iconbg = Image_iconbg2;
                Label_name = Label_name2;
            }else if (i == 2){
                Image_iconbg = Image_iconbg3;
                Label_name = Label_name3;
            }else if (i == 3){
                Image_iconbg = Image_iconbg4;
                Label_name = Label_name4;
            }
            if(Image_iconbg){
                Image_iconbg.visible = true;
            }
            for(var j = 0 ; j < members.length; j++){
                if (i == j){
                    this.showIcon(Image_iconbg,members[j].headimgurl,1);
                    if(members[j].isOnLine == 0){
                        //玩家离线
                        outLine.visible = true;
                        //cc.log("当前玩家离线")
                    }
                }
            }
        }
        //显示是否是房主
        Image_myroom.visible = false;
        //隐藏玩法文字bg
        this.Image_wanfatip.visible = false;
        //显示玩法
        var wanfaStr =  this.parentNode.onShowWanfaLabel(wanfaList);
        //Label_wanfa.setString(wanfaStr + "");

        //显示游戏和房间
        var gameStr = "";
        this.roomGameType = 0;
        var createPara = wanfaList.split(",");
        var creditMsg = this.creditMsg ? this.creditMsg.split(",") : [];
        var creditStr = "";
        this.wanfaList = createPara;
        if (creditMsg && creditMsg[0]){
            Image_credit.visible = true;
            creditStr = "比赛房";
        }
        if (this.parentNode.isDTZWanfa(createPara[1])){
            this.roomGameType = 1;
            gameStr = "打筒子";
            if (createPara[14] == 1){
                Image_credit.visible = true;
            }
        }else if (this.parentNode.isPDKWanfa(createPara[1])){
            this.roomGameType = 2;
            gameStr = "跑得快";
            if (createPara[13] == 1){
                Image_credit.visible = true;
            }
        }else if (this.parentNode.isPHZWanfa(createPara[1])){
            this.roomGameType = 3;
            gameStr = "跑胡子";
            if (createPara[1] == PHZGameTypeModel.SYZP ) {
                gameStr = "邵阳字牌";
            } else if(createPara[1] ==  PHZGameTypeModel.SYBP) {
                gameStr = "邵阳剥皮";
            } else if(createPara[1] ==  PHZGameTypeModel.LDFPF) {
                gameStr = "娄底放炮罚";
            }
            if (createPara[15] == 1){
                Image_credit.visible = true;
            }
        }else if(this.parentNode.isBBTWanfa(createPara[1])){
            this.roomGameType = 4;
            gameStr = "半边天"
        }else if(ClubRecallDetailModel.isHZMJWanfa(createPara[1])){
            this.roomGameType = MJWanfaType.HZMJ;
            gameStr = "红中麻将";
        }else if(ClubRecallDetailModel.isCSMJWanfa(createPara[1])){
            this.roomGameType = MJWanfaType.CSMJ;
            gameStr = "长沙麻将";
        }else if(ClubRecallDetailModel.isSYMJWanfa(createPara[1])){
            this.roomGameType = MJWanfaType.SYMJ;
            gameStr = "邵阳麻将";
        }
        Label_wanfa.setString(wanfaStr + creditStr + "");
        var roomStr = " 房间号 " + tableId;
        if (this.roomUserId != PlayerModel.userId && this.props == 0){
            roomStr = "";
        }
        gameStr = gameStr + roomStr;
        Label_gameroom.setString(gameStr + "");

        this.getBagName();
        this.addChild(Panel_16);
        this.setData(this.roomData);

        //添加点击事件
        UITools.addClickEvent(this.Button_wanfatip, this, this.showWanfaTip);
        UITools.addClickEvent(this.Button_roombg, this, this.clickRoomItem);
        if(ClickClubModel.isClubCreaterOrLeader()){//只有群主和管理有这个功能
            UITools.addClickEvent(this.btnJiesan, this, this.closeJLBRoom);
        }
    },

    getBagName:function(){
        var name = "";
        if (this.parentNode && this.parentNode.allBagsData){
            for(var index = 0 ; index < this.parentNode.allBagsData.length; index++){
                var data = this.parentNode.allBagsData[index];
                if (this.bagId == data.groupId){
                    name = data.groupName;
                    break;
                }
            }
        }
        this.Label_bagName.setString(""+name);
        //this.Label_bagName.setString("1包厢名名字啊2包厢名名字啊3包厢名名字啊4包厢名名字啊5包厢名名字啊6包厢名名字啊");

        var bagNameContentSize = this.Label_bagName.getContentSize();
        var moveX = bagNameContentSize.width - this.listContentSize.width;
        var actionTime = (moveX/this.listContentSize.width)*3;
        var delayTime = 0.5;
        var action1 = cc.moveBy(actionTime , cc.p(-moveX , 0));
        var action2 = cc.moveBy(0 , cc.p(moveX, 0));
        var action3 = cc.delayTime(delayTime);
        var allAction = cc.sequence(action1 ,action3, action2, action3);
        var allRepeate = cc.repeatForever(allAction);
        if (moveX > 0){
            this.Label_bagName.runAction(allRepeate);
        }else{
            this.Label_bagName.setAnchorPoint(cc.p(0.5,0.5));
            this.Label_bagName.setPosition(cc.p(this.listContentSize.width*0.5 +this.ListView_bagName.getAnchorPointInPoints().x,this.listContentSize.height*0.5+this.ListView_bagName.getAnchorPointInPoints().y));

        }
        //cc.log("moveX",moveX,actionTime,delayTime);
    },

    showOrHideJiesanBtn:function(){
        if(ClickClubModel.isClubCreaterOrLeader()){
            if(this.btnJiesan){
                this.btnJiesan.visible = !this.btnJiesan.visible;
            }
        }else{
            this.btnJiesan.visible = false;
        }

    },

    closeJLBRoom:function(){
        var roomId = this.tableId;
        var keyid = this.keyId;
        cc.log("roomId"+roomId+"keyid"+keyid);
        AlertPop.show("确定要解散该房间吗？",function(){
            sySocket.sendComReqMsg(7,[],[roomId+"",keyid+""]);
        })
    },

    showIcon: function (iconBg,iconUrl, sex) {
        //iconUrl = "http://wx.qlogo.cn/mmopen/25FRchib0VdkrX8DkibFVoO7jAQhMc9pbroy4P2iaROShWibjMFERmpzAKQFeEKCTdYKOQkV8kvqEW09mwaicohwiaxOKUGp3sKjc8/0";
        var url = iconUrl;
        var sex = sex || 1;
        var defaultimg = (sex == 1) ? "res/ui/dtz/images/default_m.png" : "res/ui/dtz/images/default_w.png";

        if (iconBg.getChildByTag(345)) {
            iconBg.removeChildByTag(345);
        }
        var sprite = new cc.Sprite(defaultimg);
        sprite.x = iconBg.width * 0.5;
        sprite.y = iconBg.height * 0.5;
        sprite.scale = 0.73;
        iconBg.addChild(sprite, 5, 345);
        if (iconUrl) {
            cc.loader.loadImg(iconUrl, {width: 252, height: 252}, function (error, img) {
                if (!error) {
                    if (sprite){
                        sprite.setTexture(img);
                    }
                }
            });
        }
    },

    getMemberDatas:function(){
        return  this.roomData.members || null;
    },

    setData:function(){
        //cc.log("this.bagId",this.bagId)
        var order = (this.bagId -1)%6 + 1 || 1;
        //cc.log("************",order)
        if (this.bagId){
            this.Image_order.visible = true;
            if (order >= 1 && order <= 6){
                var path = "res/ui/dtzjulebu/julebu/BagManage/img_order"+ order +".png";
                this.Image_order.loadTexture(path);
            }
            this.BitmapLabel_order.setString("" + this.bagId);
        }
    },
    showWanfaTip:function() {
        if (this.Image_wanfatip.isVisible()){
            this.Image_wanfatip.visible = false;
        }else{
            this.Image_wanfatip.visible = true;
        }

    },

    /**
     * 点击房间
     */
    clickRoomItem:function(){
        if(!this.isStart){
            this.onJoinRoom();
        }else{
            //请求弹出房间细节框
            cc.log("req roomdetail msg");
            ClubRoomModel.clickClubRoomType = this.roomGameType;
            ComReq.comReqClugRoomDetail([], [ClickClubModel.clickClubId+"" , this.keyId+""]);
        }
    },

    onJoinRoom:function(){
        this.parentNode.clickBtnType = 2;//点击加入房间
        SyEventManager.dispatchEvent(SyEvent.UPDATE_SHOW_BAGWANFA, {modeId: this.bagkeyId});
        if (this.props == 0){
            if ( PlayerModel.userId == this.roomUserId) {
                if (this.parentNode) {
                    this.parentNode.joinRoom(this.tableId);
                }
            }else{
                var mc = new JoinRoomPop();
                PopupManager.addPopup(mc);
            }
        }else{
            if(this.parentNode){
                this.parentNode.joinRoom(this.tableId);
            }
        }
    },

    getRoomId:function(){
        return this.roomData.tableId;
    },



});

//空房间选择玩法
var ClubNullRoomItem = ccui.Widget.extend({

    ctor:function(allBagsData , clubHomeLayer){
        this.allBagsData = allBagsData || allBagsData;

        this._super();
        this.setContentSize(cc.size(288,260));

        var Panel_16=this.Panel_16= UICtor.cPanel(cc.size(400,300),cc.color(150,200,255),0);
        Panel_16.setAnchorPoint(cc.p(0,0));
        Panel_16.setPosition(0,0);
        var Button_roombg=this.Button_roombg= UICtor.cBtn("res/ui/dtzjulebu/julebu/roomCellBg.png");
        Button_roombg.setPosition(146,150);
        Panel_16.addChild(Button_roombg);
//        var Image_State=this.Image_iconbg1= UICtor.cImg("res/ui/dtzjulebu/julebu/img_999.png");
//        Image_State.setPosition(cc.p(0+Button_roombg.getAnchorPointInPoints().x, 30+Button_roombg.getAnchorPointInPoints().y));
//        Button_roombg.addChild(Image_State);
        var Image_iconbg1=this.Image_iconbg1= UICtor.cImg("res/ui/dtzjulebu/julebu/iconBg.png");
        Image_iconbg1.setPosition(cc.p(-103+Button_roombg.getAnchorPointInPoints().x, 16+Button_roombg.getAnchorPointInPoints().y));
        Button_roombg.addChild(Image_iconbg1);
        var Image_iconbg2=this.Image_iconbg2= UICtor.cImg("res/ui/dtzjulebu/julebu/iconBg.png");
        Image_iconbg2.setPosition(cc.p(93+Button_roombg.getAnchorPointInPoints().x, 16+Button_roombg.getAnchorPointInPoints().y));
        Button_roombg.addChild(Image_iconbg2);

        var Label_State_tip=this.Label_State_tip= UICtor.cLabel("玩法开局",22,cc.size(0,0),cc.color(255,238,238),0,0);
        Label_State_tip.setPosition(cc.p(0+Button_roombg.getAnchorPointInPoints().x, 10+Button_roombg.getAnchorPointInPoints().y));
        Button_roombg.addChild(Label_State_tip);

        var Label_State_tip1=this.Label_State_tip1= UICtor.cLabel("玩法开局",22,cc.size(0,0),cc.color(192,104,32),0,0);
        Label_State_tip1.setPosition(cc.p(0+Button_roombg.getAnchorPointInPoints().x, Button_roombg.getAnchorPointInPoints().y));
        Button_roombg.addChild(Label_State_tip1);

        var Label_State_tip2=this.Label_State_tip2= UICtor.cLabel("点击选择",22,cc.size(0,0),cc.color(192,104,32),0,0);
        Label_State_tip2.setPosition(cc.p(0+Button_roombg.getAnchorPointInPoints().x, 30 + Button_roombg.getAnchorPointInPoints().y));
        Button_roombg.addChild(Label_State_tip2);

        var Label_bagNum=this.Label_bagNum= UICtor.cLabel("0桌正在牌局",28,cc.size(0,0),cc.color(208,53,3),0,0);
        Label_bagNum.setPosition(cc.p(0+Button_roombg.getAnchorPointInPoints().x, -68+Button_roombg.getAnchorPointInPoints().y));
        Button_roombg.addChild(Label_bagNum);


        this.addChild(Panel_16);

        this.setData(this.allBagsData);

        UITools.addClickEvent(this.Button_roombg, this, this.onOpenRuleChoose);
    },

    setData:function(data){
        var num = 0;
        for(var index = 0 ; index < data.length; index++){
            var startedNum = data[index].startedNum || 0;
            num = num + parseInt(startedNum);
        }
        //cc.log("setData",JSON.stringify(data));

        if (parseInt(num) >= 50){
            num = 50;
        }
        this.Label_bagNum.setString("" + num + "桌正在牌局");

    },


    onOpenRuleChoose:function(){
        var mc = new ClubRuleManagePop(this.allBagsData,ClickClubModel.getCurClubBagModeId());
        PopupManager.addPopup(mc);
    },

    showOrHideJiesanBtn:function(){

    },

});



