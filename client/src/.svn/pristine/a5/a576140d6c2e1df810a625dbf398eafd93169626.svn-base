/**
 * Created by leiwenwen on 2018/10/15.
 */
var ClubCreditRecordCell = ccui.Widget.extend({

    ctor:function(data ,index, parentNode){
        this.data = data;
        this.index = index;
        this.parentNode = parentNode;
        this.playerLength = 0;
        this.wanfaType = 0;

        this._super();
        this.setContentSize(975, 132);

        var Panel_21=this.Panel_21= UICtor.cPanel(cc.size(975,127),cc.color(150,200,255),0);
        Panel_21.setAnchorPoint(cc.p(0,0));
        Panel_21.setPosition(0,0);
        var imgBg=this.imgBg= UICtor.cImg("res/ui/dtzjulebu/julebu/Credit/img_37.png");
        imgBg.setPosition(487,63);
        Panel_21.addChild(imgBg);
        var indexStr=this.indexStr= UICtor.cLabel("序号",25,cc.size(0,0),cc.color(126,49,2),0,0);
        indexStr.setPosition(cc.p(-460+imgBg.getAnchorPointInPoints().x, 0+imgBg.getAnchorPointInPoints().y));
        imgBg.addChild(indexStr);
        var time=this.time= UICtor.cLabel("时间",25,cc.size(0,0),cc.color(126,49,2),0,0);
        time.setPosition(cc.p(-365+imgBg.getAnchorPointInPoints().x, 0+imgBg.getAnchorPointInPoints().y));
        imgBg.addChild(time);
        var tableId=this.tableId= UICtor.cLabel("123456",25,cc.size(0,0),cc.color(255,111,24),0,0);
        tableId.setPosition(cc.p(-231+imgBg.getAnchorPointInPoints().x, 0+imgBg.getAnchorPointInPoints().y));
        imgBg.addChild(tableId);
        var lbWanfa=this.lbWanfa= UICtor.cLabel("玩法详情",25,cc.size(0,0),cc.color(126,49,2),0.5,0.5);
        lbWanfa.setPosition(cc.p(-80+imgBg.getAnchorPointInPoints().x, 0+imgBg.getAnchorPointInPoints().y));
        imgBg.addChild(lbWanfa);
        var member1=this.member1= UICtor.cLabel("",24,cc.size(120,30),cc.color(126,49,2),0,0);
        member1.setPosition(cc.p(122+imgBg.getAnchorPointInPoints().x, 45+imgBg.getAnchorPointInPoints().y));
        imgBg.addChild(member1);
        var member2=this.member2= UICtor.cLabel("",24,cc.size(120,30),cc.color(126,49,2),0,0);
        member2.setPosition(cc.p(122+imgBg.getAnchorPointInPoints().x, 14+imgBg.getAnchorPointInPoints().y));
        imgBg.addChild(member2);
        var member3=this.member3= UICtor.cLabel("",24,cc.size(120,30),cc.color(126,49,2),0,0);
        member3.setPosition(cc.p(122+imgBg.getAnchorPointInPoints().x, -17+imgBg.getAnchorPointInPoints().y));
        imgBg.addChild(member3);
        var member4=this.member4= UICtor.cLabel("",24,cc.size(120,30),cc.color(126,49,2),0,0);
        member4.setPosition(cc.p(122+imgBg.getAnchorPointInPoints().x, -48+imgBg.getAnchorPointInPoints().y));
        imgBg.addChild(member4);
        var Label_score1=this.Label_score1= UICtor.cLabel("Text Label",24,cc.size(0,0),cc.color(126,49,2),0,0);
        Label_score1.setAnchorPoint(cc.p(0,0.5));
        Label_score1.setPosition(cc.p(194+imgBg.getAnchorPointInPoints().x, 45+imgBg.getAnchorPointInPoints().y));
        imgBg.addChild(Label_score1);
        var Label_score2=this.Label_score2= UICtor.cLabel("Text Label",24,cc.size(0,0),cc.color(126,49,2),0,0);
        Label_score2.setAnchorPoint(cc.p(0,0.5));
        Label_score2.setPosition(cc.p(194+imgBg.getAnchorPointInPoints().x, 14+imgBg.getAnchorPointInPoints().y));
        imgBg.addChild(Label_score2);
        var Label_score3=this.Label_score3= UICtor.cLabel("Text Label",24,cc.size(0,0),cc.color(126,49,2),0,0);
        Label_score3.setAnchorPoint(cc.p(0,0.5));
        Label_score3.setPosition(cc.p(194+imgBg.getAnchorPointInPoints().x, -16+imgBg.getAnchorPointInPoints().y));
        imgBg.addChild(Label_score3);
        var Label_score4=this.Label_score4= UICtor.cLabel("Text Label",24,cc.size(0,0),cc.color(126,49,2),0,0);
        Label_score4.setAnchorPoint(cc.p(0,0.5));
        Label_score4.setPosition(cc.p(194+imgBg.getAnchorPointInPoints().x, -48+imgBg.getAnchorPointInPoints().y));
        imgBg.addChild(Label_score4);
        var Image_dyj1=this.Image_dyj1= UICtor.cImg("res/ui/dtzjulebu/clubRecallPop/img_16.png");
        Image_dyj1.setPosition(cc.p(323+imgBg.getAnchorPointInPoints().x, 43+imgBg.getAnchorPointInPoints().y));
        imgBg.addChild(Image_dyj1);
        var Image_dyj2=this.Image_dyj2= UICtor.cImg("res/ui/dtzjulebu/clubRecallPop/img_16.png");
        Image_dyj2.setPosition(cc.p(323+imgBg.getAnchorPointInPoints().x, 13+imgBg.getAnchorPointInPoints().y));
        imgBg.addChild(Image_dyj2);
        var Image_dyj3=this.Image_dyj3= UICtor.cImg("res/ui/dtzjulebu/clubRecallPop/img_16.png");
        Image_dyj3.setPosition(cc.p(323+imgBg.getAnchorPointInPoints().x, -17+imgBg.getAnchorPointInPoints().y));
        imgBg.addChild(Image_dyj3);
        var Image_dyj4=this.Image_dyj4= UICtor.cImg("res/ui/dtzjulebu/clubRecallPop/img_16.png");
        Image_dyj4.setPosition(cc.p(323+imgBg.getAnchorPointInPoints().x, -48+imgBg.getAnchorPointInPoints().y));
        imgBg.addChild(Image_dyj4);
        var Button_xq=this.Button_xq= UICtor.cBtn("res/ui/dtzjulebu/clubRecallPop/btn_1.png");
        Button_xq.setPosition(cc.p(419+imgBg.getAnchorPointInPoints().x, 0+imgBg.getAnchorPointInPoints().y));
        imgBg.addChild(Button_xq);

        //var fangzhuSp1=this.fangzhuSp1= UICtor.cImg("res/ui/dtz/dtzRoom/fangzhu.png");
        //fangzhuSp1.setPosition(cc.p(98+imgBg.getAnchorPointInPoints().x, 45+imgBg.getAnchorPointInPoints().y));
        //imgBg.addChild(fangzhuSp1);
        //var fangzhuSp2=this.fangzhuSp2= UICtor.cImg("res/ui/dtz/dtzRoom/fangzhu.png");
        //fangzhuSp2.setPosition(cc.p(98+imgBg.getAnchorPointInPoints().x, 13+imgBg.getAnchorPointInPoints().y));
        //imgBg.addChild(fangzhuSp2);
        //var fangzhuSp3=this.fangzhuSp3= UICtor.cImg("res/ui/dtz/dtzRoom/fangzhu.png");
        //fangzhuSp3.setPosition(cc.p(98+imgBg.getAnchorPointInPoints().x, -17+imgBg.getAnchorPointInPoints().y));
        //imgBg.addChild(fangzhuSp3);
        //var fangzhuSp4=this.fangzhuSp4= UICtor.cImg("res/ui/dtz/dtzRoom/fangzhu.png");
        //fangzhuSp4.setPosition(cc.p(99+imgBg.getAnchorPointInPoints().x, -49+imgBg.getAnchorPointInPoints().y));
        //imgBg.addChild(fangzhuSp4);


        //this.fangzhuSp1.visible = this.fangzhuSp2.visible = this.fangzhuSp3.visible = this.fangzhuSp4.visible = false;
        //this.fangzhuSp1.scale = this.fangzhuSp2.scale = this.fangzhuSp3.scale = this.fangzhuSp4.scale = 0.7;
        this.addChild(Panel_21);
        //添加点击事件

        for (var i = 1;i <= 4;i++){
            this["Label_score"+i].setString("");
            this["Image_dyj"+i].setVisible(false);
        }

        this.setData(this.data);
    },

    //返回游戏
    geGameStr:function(wanfaType){
        var gameStr = "";
        if (this.isDTZWanfa(wanfaType)){
            gameStr = "打筒子"
        }else if (this.isPDKWanfa(wanfaType)){
            gameStr = "跑得快"
        }else if (this.isPHZWanfa(wanfaType)){
            gameStr = "跑胡子"
        }else if (this.isBBTWanfa(wanfaType)){
            gameStr = "半边天炸"
        }
        return gameStr;
    },

    isDTZWanfa:function(wanfa){
        //var isDtz = false ;
        //if (wanfa >= 113 && wanfa <= 118)
        //    isDtz = true;
        var isDtz = DTZRoomModel.isDTZ(wanfa);
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

    setData:function(data){
        this.indexStr.setString(this.index);
        this.time.setString(data.overTime || "");
        this.tableId.setString(data.tableId || "");
        var roomName = UITools.dealNameLength(data.roomName,7);
        this.lbWanfa.setString(ClubRecallDetailModel.getGameStr(data.playType) + "\n" + roomName);
        this.wanfaType = data.playType;
        this.fangzhuIndex = data.masterNameIndex;
        //winLoseCredit:胜负信用分
        //commissionCredit:信用分佣金
        //和point在一个数据结构一个层级
        var players = data.players.split(",");
        var creditPoints = [];
        if (data.winLoseCredit){
            creditPoints = data.winLoseCredit.split(",");
        }

        var isWinner = [];
        if (data.isWinner){
            isWinner = data.isWinner.split(",");
        }
        this.playerLength = players.length;
        for (var i = 0; i < players.length; i++){
            var idex = i + 1;
            if (this["member"+idex]){
                //this["member"+idex].setString("我来测试一下");
                this["member"+idex].setString(players[i] || "");
            }
            if (this["Label_score"+idex] && creditPoints[i] != null){
                var pointStr =  parseInt(creditPoints[i]);
                if (pointStr > 0){
                    pointStr = "+" + pointStr;
                }
                this["Label_score"+idex].setString(pointStr);
            }

            if (this["Image_dyj"+idex] && isWinner[i] && isWinner[i] == 1 && creditPoints[i] > 0){
                if (this["Label_score"+idex]){
                    this["Label_score"+idex].setColor(cc.color(255,111,24))
                }
                this["Image_dyj"+idex].setVisible(true);
            }
        }
        UITools.addClickEvent(this.Button_xq,this,this.onDetailRecord);
    },

    onDetailRecord:function(){
        //cc.log("请求战绩详情---------"+this.index)
        var tableNo = this.data.tableNo;
        var self = this;
        sy.scene.showLoading("正在获取战绩详情数据");
        NetworkJT.loginReq("groupAction", "loadTableRecord", {tableNo:tableNo, oUserId:PlayerModel.userId ,isClub:1}, function (data) {
            sy.scene.hideLoading();
            if (data) {
                var mc = null;
                PopupManager.hidePopup(ClubCreditPop);
                if (self.isDTZWanfa(self.wanfaType)){
                    if (self.playerLength == 4){
                        mc = new ClubDtzRecallDetailPop(data);
                    }else{
                        mc = new Club3DtzRecallDetailPop(data);
                    }
                }else if (self.isPDKWanfa(self.wanfaType)){
                    mc = new ClubPdkRecallDetailPop(data);
                }else if (self.isPHZWanfa(self.wanfaType)){
                    mc = new ClubPhzRecallDetailPop(data);
                }else if (self.isBBTWanfa(self.wanfaType)){
                    mc = new ClubBbtzRecallDetailPop(data);
                }else if (ClubRecallDetailModel.isHZMJWanfa(self.wanfaType) || ClubRecallDetailModel.isCSMJWanfa(self.wanfaType)){
                    mc = new ClubHzmjRecallDetailPop(data);
                }else if (ClubRecallDetailModel.isSYMJWanfa(self.wanfaType)){
                    mc = new ClubSymjRecallDetailPop(data);
                }
                if (mc){
                    PopupManager.open(mc);
                }
            }
        }, function (data) {
            //cc.log("getUserPlayLog::"+JSON.stringify(data));
            sy.scene.hideLoading();
            FloatLabelUtil.comText("获取战绩详情数据失败");
        });

    }

});
