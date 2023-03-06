/**
 * Created by Administrator on 2017/7/21.
 */
var ClubBagItem = ccui.Widget.extend({

    ctor:function(roomData , clubHomeLayer){
        this.roomData = (roomData);
        this.parentNode = clubHomeLayer;
        //cc.log("this.roomData ..." , JSON.stringify(this.roomData));
        var configMsg = this.roomData.config;
        this.groupId = configMsg.groupId;
        this.wanfa = 0;
        this.modeId = 0;
        this._super();
        var wanfaList =  configMsg.descMsg;
        var startedNum = this.roomData.startedNum || 0;
        this.setContentSize(cc.size(290,245));


        var Panel_16=this.Panel_16= UICtor.cPanel(cc.size(400,276),cc.color(150,200,255),0);
        Panel_16.setAnchorPoint(cc.p(0,0));
        Panel_16.setPosition(0,0);
        var Button_roombg=this.Button_roombg= UICtor.cBtn("res/ui/dtzjulebu/julebu/roomCellBg.png");
        Button_roombg.setPosition(146,122);
        Panel_16.addChild(Button_roombg);
        var Label_State=this.Label_State= UICtor.cLabel("包厢名称",26,cc.size(0,0),cc.color(135,47,16),0,0);
        Label_State.setPosition(cc.p(0+Button_roombg.getAnchorPointInPoints().x, 68+Button_roombg.getAnchorPointInPoints().y));
        Button_roombg.addChild(Label_State);
        var Label_gameroom=this.Label_gameroom= UICtor.cLabel("打筒子 房号：123456",20,cc.size(0,0),cc.color(135,47,16),0,0);
        Label_gameroom.setAnchorPoint(cc.p(0,0.5));
        Label_gameroom.setPosition(cc.p(-126+Button_roombg.getAnchorPointInPoints().x, -96+Button_roombg.getAnchorPointInPoints().y));
        Button_roombg.addChild(Label_gameroom);
        var Label_tip=this.Label_tip= UICtor.cLabel("点击加入房间",24,cc.size(0,0),cc.color(135,47,16),0,0);
        Label_tip.setPosition(cc.p(0+Button_roombg.getAnchorPointInPoints().x, 0+Button_roombg.getAnchorPointInPoints().y));
        Button_roombg.addChild(Label_tip);
        var Label_bagNum=this.Label_bagNum= UICtor.cLabel("0桌正在牌局",22,cc.size(0,0),cc.color(252,90,21),0,0);
        Label_bagNum.setPosition(cc.p(0+Button_roombg.getAnchorPointInPoints().x, -48+Button_roombg.getAnchorPointInPoints().y));
        Button_roombg.addChild(Label_bagNum);
        var Image_order=this.Image_order= UICtor.cImg("res/ui/dtzjulebu/julebu/BagManage/img_order1.png");
        Image_order.setPosition(cc.p(108+Button_roombg.getAnchorPointInPoints().x, 99+Button_roombg.getAnchorPointInPoints().y));
        Button_roombg.addChild(Image_order);
        var Image_wanfatip=this.Image_wanfatip= UICtor.cImg("res/ui/dtzjulebu/julebu/imgRoomwfBg.png");
        Image_wanfatip.setPosition(cc.p(0+Button_roombg.getAnchorPointInPoints().x, 55+Button_roombg.getAnchorPointInPoints().y));
        Image_wanfatip.setLocalZOrder(1);
        Button_roombg.addChild(Image_wanfatip);
        var Label_wanfa=this.Label_wanfa= UICtor.cLabel("打筒子",21,cc.size(250,120),cc.color(135,47,16),0,0);
        Label_wanfa.setAnchorPoint(cc.p(0,1));
        Label_wanfa.setPosition(cc.p(-123+Image_wanfatip.getAnchorPointInPoints().x, 64+Image_wanfatip.getAnchorPointInPoints().y));
        Image_wanfatip.addChild(Label_wanfa);
        var Button_wanfatip=this.Button_wanfatip= UICtor.cBtn("res/ui/dtzjulebu/julebu/btn_wanfaTip.png");
        Button_wanfatip.setPosition(cc.p(115+Button_roombg.getAnchorPointInPoints().x, -100+Button_roombg.getAnchorPointInPoints().y));
        Button_roombg.addChild(Button_wanfatip);
        this.Image_order.visible = this.Image_wanfatip.visible =false;

        if (this.groupId && this.groupId >= 1 && this.groupId <= 6){
            var path = "res/ui/dtzjulebu/julebu/BagManage/img_order"+ this.groupId +".png";
            this.Image_order.loadTexture(path);
            this.Image_order.visible = true;
        }
        //显示玩法
        var wanfaStr =  ClubRecallDetailModel.getWanfaStr(wanfaList);
        Label_wanfa.setString(wanfaStr + "");

        Label_State.setString(""+this.roomData.groupName);

        //显示游戏和房间
        var gameStr = "";
        this.roomGameType = 0;
        var createPara = wanfaList.split(",");
        var jushuStr = "";
        var renshuStr = ClubRecallDetailModel.getPlayerCount(createPara) + "人";
        this.wanfa = createPara[1];
        this.modeId = this.roomData.config.keyId;
        if (this.parentNode.isDTZWanfa(createPara[1])){
            this.roomGameType = 1;
            gameStr = "打筒子";
            jushuStr = createPara[3] + "分";
        }else if (this.parentNode.isPDKWanfa(createPara[1])){
            this.roomGameType = 2;
            gameStr = "跑得快";
            jushuStr = createPara[0] + "局";
        }else if (this.parentNode.isPHZWanfa(createPara[1])){
            this.roomGameType = 3;
            if (createPara[1] == PHZGameTypeModel.SYZP ) {
                gameStr = "邵阳字牌";
                jushuStr = createPara[0] + "局";
            } else if(createPara[1] ==  PHZGameTypeModel.SYBP) {
                gameStr = "邵阳剥皮";
                jushuStr =  "";
            } else if(createPara[1] ==  PHZGameTypeModel.LDFPF) {
                gameStr = "娄底放炮罚";
                jushuStr =  "";
            }
        }else if(this.parentNode.isBBTWanfa(createPara[1])){
            this.roomGameType = 4;
            gameStr = "半边天";
            jushuStr = createPara[0] + "局";
        }
        gameStr = gameStr + "  " +jushuStr + "  " + renshuStr;
        Label_gameroom.setString(gameStr + "");

        if (parseInt(startedNum) >= 50){
            startedNum = 50;
        }

        this.Label_bagNum.setString("" + startedNum + "桌正在牌局");

        this.addChild(Panel_16);

        //UITools.addClickEvent(this.Button_roombg, this, this.onJoinBag);
        UITools.addClickEvent(this.Button_roombg, this, this.onJoinRoom);
        //添加点击事件
        UITools.addClickEvent(this.Button_wanfatip, this, this.showWanfaTip);
    },

    /**
     * 进入某个包厢
     */
    onJoinBag: function(){
        if (this.groupId){
            cc.log("进入包厢"+this.groupId);
            var index = this.groupId;
            ComReq.comReqGetClubRoomsData([ClickClubModel.getCurClubId(), 1, 100, 1, 1],["" + index ]);
        }
    },

    /**
     * 进入房间或者创建此包厢房间
     */
    onJoinRoom: function(){
        //cc.log("onJoinRoom",this.wanfa,this.modeId)
        if (this.parentNode){
            this.parentNode.onBagJoinRoom(this.wanfa,this.modeId)
        }
    },

    showOrHideJiesanBtn:function(){

    },
    showWanfaTip:function() {
        if (this.Image_wanfatip.isVisible()){
            this.Image_wanfatip.visible = false;
        }else{
            this.Image_wanfatip.visible = true;
        }

    },


});

