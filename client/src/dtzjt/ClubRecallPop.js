/**
 * Created by Administrator on 2017/7/21.
 */
/**
 * 战绩界面
 */

var ClubRecallPop = BasePopup.extend({

    ctor:function(clickGroupId,clickClubRole){
        this.opGroupId = clickGroupId || 0;
        this.role = clickClubRole;
        this._super("res/clubRecallPop.json");
    },

    selfRender:function(){

        cc.sys.localStorage.setItem("sy_recall_endTimeSingle",(0));
        this.lbNoData = this.getWidget("labelNoData");
        this.lbNoData.visible = false;

        //排行榜当前页码 , 最大页码
        this.curDetailPage = 1;
        this.rankMaxPage = 1;

        this.maxPageSize = 30;//每页最多显示多少条

        this.date = 1;//当前是第几天的战绩 1今天 2昨天 3前天

        this.searchTableId = 0; //通过桌号id查找
        this.searchUserId = 0; //通过玩家id查找


        this.condition = "2,4";//2 正常结束 , 3未开局被解散, 4中途解散

        this.Panel_down = this.getWidget("Panel_down");//翻页层
        //this.Panel_down.visible = false;

        this.pageBg = this.getWidget("pageBg");//翻页层


        this.lbDataPage = this.getWidget("lbDataPage");//当前是哪一页
        this.lbDataPage.setString("1");


        this.lbAllGmaes = this.getWidget("lbAllGmaes");//总条数



        var CheckBox_diss = this.CheckBox_diss = this.getWidget("CheckBox_diss");
        CheckBox_diss.addEventListener(this.onCheckBoxDiss,this);
        CheckBox_diss.setSelected(false);


        for (var i = 1;i <= 3;i++){
            this["Image_record" + i] = this.getWidget("Image_record" + i);
            this["Image_record" + i].visible = false;
            if (i == 1){
                this["Image_record" + i].visible = true;
            }
        }
        //玩法选择
        var widgetsDate = {"Label_date1":1,"Label_date2":2,"Label_date3":3};
        this.addClickEvent(widgetsDate,this.onDateClick);

        var btnRankLeft = this.getWidget("btnDataLeft");
        if(btnRankLeft){
            UITools.addClickEvent(btnRankLeft , this , this.onDetailUpPage);
        }

        var btnRankRight = this.getWidget("btnDataRight");
        if(btnRankRight){
            UITools.addClickEvent(btnRankRight , this , this.onDetailDownPage);
        }

        //选择某一天
        this.dataTouchPanel1 = this.getWidget("dataTouchPanel1");
        this.dataTouchPanel1.setTouchEnabled(true);
        UITools.addClickEvent(this.dataTouchPanel1 , this , this.onOpenSingleTimePop);

        this.detailViewList = this.getWidget("ListView_Winner");


        var inputIdImg = this.getWidget("inputBg"); //房间id
        //初始化两个输入框
        this.inputId = new cc.EditBox(cc.size(248, 56),new cc.Scale9Sprite("res/ui/dtzjulebu/clubRecallPop/img_4.png"));
        this.inputId.setString("");
        this.inputId.x = inputIdImg.width/2;
        this.inputId.y = inputIdImg.height/2;
        this.inputId.setFontColor(cc.color("efd9b9"));
        this.inputId.setDelegate(this);
        this.inputId.setFont("Arial",26);
        this.inputId.setMaxLength(30);
        this.inputId.setPlaceHolder("输入房号查询");
        this.inputId.setPlaceholderFont("Arial" , 26);
        this.inputId.setPlaceholderFontColor(cc.color(239,217,185));//230 218 207
        if (this.role != 0 && this.role != 1){
            this.inputId.setTouchEnabled(false)
        }
        inputIdImg.addChild(this.inputId,0);


        var inputImgId = this.getWidget("inputBgId"); //用户id
        //初始化两个输入框
        this.inputUserId = new cc.EditBox(cc.size(248, 56),new cc.Scale9Sprite("res/ui/dtzjulebu/clubRecallPop/img_4.png"));
        this.inputUserId.setString("");
        this.inputUserId.x = inputImgId.width/2;
        this.inputUserId.y = inputImgId.height/2;
        this.inputUserId.setFontColor(cc.color("efd9b9"));
        this.inputUserId.setDelegate(this);
        this.inputUserId.setFont("Arial",26);
        this.inputUserId.setMaxLength(30);
        this.inputUserId.setPlaceHolder("输入用户ID查询");
        this.inputUserId.setPlaceholderFont("Arial" , 26);
        this.inputUserId.setPlaceholderFontColor(cc.color(239,217,185));//230 218 207
        if (this.role != 0 && this.role != 1){
            this.inputUserId.setTouchEnabled(false)
        }
        inputImgId.addChild(this.inputUserId,0);

        //房间ID查询
        var localUser = this.getWidget("localUser");
        localUser.temp = 1;
        if(localUser){
            UITools.addClickEvent(localUser , this , this.localUser);
        }

        //用户ID查询
        var localUserId = this.getWidget("localUserId");
        localUserId.temp = 2;
        if(localUserId){
            UITools.addClickEvent(localUserId , this , this.localUserId);
        }

        this.endTimeLabel = this.getWidget("endTimeLabel");
        //打开选择时间界面
        var tBegin = new Date();
        this.endTimeSingle = UITools.getLocalItem("sy_recall_endTimeSingle") || tBegin;
        this.endTimeLabel.setString(this.formatTime(this.endTimeSingle));

        this.onDateClick(this.Label_date1);

        this.addCustomEvent(SyEvent.RESET_SINGLE_TIME, this, this.changeSingleTime);

    },

    //选择第几天
    onDateClick:function(obj){
        var clickId = parseInt(obj.temp);
        var values = [1,2,3];
        for(var i=1;i<=values.length;i++){
            if(i != clickId){
                this["Image_record" + i].visible = false;
            }
        }
        var img = this["Image_record" + clickId];
        img.visible = true;
        this.date = clickId;
        cc.log("点击了第"+clickId+"天");
        this.getRecordData(this.curDetailPage);
    },


    onOpenSingleTimePop:function(){
        var endTime = this.endTimeSingle || 0;
        var mc = new ClubSingleTimePop(this  , endTime,7);
        PopupManager.addPopup(mc);
    },

    changeSingleTime:function(event){
        var data = event.getUserData();
        this.endTimeLabel.setString(this.formatTime(data.endTime));
        this.endTimeSingle = data.endTime;
        cc.sys.localStorage.setItem("sy_recall_endTimeSingle",(this.endTimeSingle));
        this.getRecordData(this.curDetailPage);
    },

    formatTime:function(shijianchuo) {
        //shijianchuo是整数，否则要parseInt转换
        //cc.log("shijianchuo ..." , shijianchuo);
        var time = new Date(shijianchuo);
        var y = time.getFullYear();
        var m = time.getMonth()+1;
        var d = time.getDate();
        var h = time.getHours();
        var mm = time.getMinutes();
        var s = time.getSeconds();
        //return y+'-'+this.add0(m)+'-'+this.add0(d)+' '+this.add0(h)+':'+this.add0(mm)+':'+this.add0(s);
        return this.add0(m)+'月'+this.add0(d)+'日'
    },


    add0:function(m){
        return m<10?'0'+m:m+'';
    },


    formatDataToSever:function(time,isEnd){
        var time = new Date(time);
        var y = time.getFullYear();
        var m = time.getMonth()+1;
        var d = time.getDate();
        if(m<10)m = "0" + m;
        if(d<10)d = "0" + d;

        var ret = y + "-" + m + "-" + d;
        if(isEnd)ret += " 23:59:59";
        else ret += " 00:00:00";
        return ret;
    },

    updateAllGmaesStr:function(_num){
        this.lbAllGmaes.setString("总局数："+_num);
    },


    addClickEvent:function(widgets,selector,defaultState){
        var btnState = defaultState || false;
        for(var key in widgets){
            var widget = this[key] = this.getWidget(key);
            widget.temp = parseInt(widgets[key]);
            UITools.addClickEvent(widget,this,selector);
            widget.setBright(btnState)
        }
    },

    getWidget:function(name){
        return ccui.helper.seekWidgetByName(this.root,name);
    },

    /**
     * 获取战绩数据
     */
    getRecordData:function(detailPage){
        var self = this;
        sy.scene.showLoading("正在获取战绩数据");
        var date = this.date;
        var page = detailPage;
        var startDate = this.formatDataToSever(this.endTimeSingle);
        var endDate = this.formatDataToSever(this.endTimeSingle,true);
        NetworkJT.loginReq("groupAction", "loadTablePlayLogs", {groupId:this.opGroupId,
            // queryDate:date,  //当前日期
            pageNo:page,  //当前页数
            pageSize:this.maxPageSize,
            condition:""+this.condition,  //2 正常结束 , 3未开局被解散, 4中途解散
            queryUserId:this.searchUserId,
            queryTableId:this.searchTableId,
            startDate:startDate,
            endDate:endDate,
            userId:PlayerModel.userId}, function (data) {
            if (data) {
                cc.log("loadTablePlayLogs::"+JSON.stringify(data));
                sy.scene.hideLoading();
                ClubRecallModel.init(data);
                ClubRecallModel.clubId = self.opGroupId;
                ClubRecallModel.clubRole = self.role;
                if(data.message.list.length > 0) {//获取当前页 有数据的情况
                    self.lbNoData.visible = false;
                    self.curDetailPage = page;
                    self.lbDataPage.setString(""+self.curDetailPage);
                    self.detailViewList.removeAllChildren();
                    self.pageBg.visible = true;
                }else{
                    if( self.curDetailPage == page){
                        self.lbNoData.visible = true;
                        self.pageBg.visible = false;
                        self.detailViewList.removeAllChildren();
                    }else{
                        FloatLabelUtil.comText("没有更多数据了");
                        return;
                    }
                }
                self.updateAllGmaesStr(data.message.tables);
                for(var index = 0 ; index < data.message.list.length ; index ++) {
                    var listData = data.message.list[index];
                    var detailItem = new clubRecallItem(listData, index+1 , self);
                    self.detailViewList.pushBackCustomItem(detailItem);
                }
            }
        }, function (data) {
            sy.scene.hideLoading();
            FloatLabelUtil.comText("获取战绩数据失败");
        });


    },

    //请求中途解散的数据
    onCheckBoxDiss:function(obj,type){
        //俱乐部管理员和会长
        if (this.role == 0 || this.role == 1){
            if(type == ccui.CheckBox.EVENT_SELECTED){
                this.condition = "4";
                this.CheckBox_diss.setSelected(true);
            }
            if(type == ccui.CheckBox.EVENT_UNSELECTED){
                this.condition = "2,4";
                this.CheckBox_diss.setSelected(false);
            }
            cc.log("获取提前解散的房间数据",this.condition);
            this.curDetailPage = 1;
            this.getRecordData(this.curDetailPage);
        }else{
            this.condition = "2,4";
            this.CheckBox_diss.setSelected(false);
            FloatLabelUtil.comText("只有管理员以上权限才能查询");
        }
    },

    localUser:function(){
        //俱乐部管理员和会长
        if (this.role == 0 || this.role == 1) {
            this.searchUserId = 0; //通过玩家id查找
            this.inputUserId.setString("");
            var curNameOrUserId = this.inputId.getString();
            cc.log("根据房间ID" + curNameOrUserId + "去查询数据");
            this.searchTableId = curNameOrUserId;
            this.getRecordData(this.curDetailPage);
        }else{
            this.searchUserId = 0; //通过玩家id查找
            this.searchTableId = 0; //通过桌号id查找
            this.inputId.setString("");
            this.inputUserId.setString("");
            FloatLabelUtil.comText("只有管理员以上权限才能查询");
        }

    },

    localUserId:function(){
        //俱乐部管理员和会长
        if (this.role == 0 || this.role == 1) {
            this.searchTableId = 0; //通过桌号id查找
            this.inputId.setString("");
            var curNameOrUserId = this.inputUserId.getString();
            cc.log("根据用户ID" + curNameOrUserId + "去查询数据");
            this.searchUserId = curNameOrUserId;
            this.getRecordData(this.curDetailPage);
        }else{
            this.searchUserId = 0; //通过玩家id查找
            this.searchTableId = 0; //通过桌号id查找
            this.inputId.setString("");
            this.inputUserId.setString("");
            FloatLabelUtil.comText("只有管理员以上权限才能查询");
        }
    },

    /**
     * 排行榜下翻
     */
    onDetailDownPage:function(){
        var detailPage = this.curDetailPage + 1;
        cc.log("获取下一页数据" , detailPage);
        this.getRecordData(detailPage);
    },

    /**
     * 排行榜上翻
     */
    onDetailUpPage:function(){
        var detailPage = this.curDetailPage;
        if (this.curDetailPage > 1){
            detailPage = this.curDetailPage - 1;
        }else{
            FloatLabelUtil.comText("没有更多数据了");
            return;
        }
        cc.log("获取上一页数据" , detailPage);
        this.getRecordData(detailPage)
    },

    onClose:function(){
        //this._super();
    }
});

/**
 * 战绩界面的item
 */
var clubRecallItem = ccui.Widget.extend({

    ctor:function(data ,index, parentNode){
        this.data = data;
        this.index = index;
        this.parentNode = parentNode;
        this.playerLength = 0;
        this.wanfaType = 0;

        this._super();
        this.setContentSize(1120, 148);

        var Panel_16=this.Panel_16= UICtor.cPanel(cc.size(1120,145),cc.color(150,200,255),0);
        Panel_16.setAnchorPoint(cc.p(0,0));
        Panel_16.setPosition(0,0);
        var imgBg=this.imgBg= UICtor.cImg("res/ui/dtzjulebu/clubRecallPop/img_3.png");
        imgBg.setPosition(559,72);
        imgBg.setScaleX(0.99)
        Panel_16.addChild(imgBg);
        var indexStr=this.indexStr= UICtor.cLabel("序号",25,cc.size(0,0),cc.color("238B76"),0,0);
        indexStr.setPosition(cc.p(-508+imgBg.getAnchorPointInPoints().x, 0+imgBg.getAnchorPointInPoints().y));
        imgBg.addChild(indexStr);
        var time=this.time= UICtor.cLabel("时间",25,cc.size(0,0),cc.color("238B76"),0,0);
        time.setPosition(cc.p(-413+imgBg.getAnchorPointInPoints().x, 0+imgBg.getAnchorPointInPoints().y));
        imgBg.addChild(time);
        var tableId=this.tableId= UICtor.cLabel("123456",25,cc.size(0,0),cc.color(255,111,24),0,0);
        tableId.setPosition(cc.p(-286+imgBg.getAnchorPointInPoints().x, 0+imgBg.getAnchorPointInPoints().y));
        imgBg.addChild(tableId);
        var dissState=this.dissState= UICtor.cLabel("解散状态",25,cc.size(0,0),cc.color("238B76"),0,0);
        dissState.setPosition(cc.p(0+imgBg.getAnchorPointInPoints().x, 0+imgBg.getAnchorPointInPoints().y));
        imgBg.addChild(dissState);
        var lbWanfa=this.lbWanfa= UICtor.cLabel("玩法详情",25,cc.size(0,0),cc.color("238B76"),0,0);
        lbWanfa.setPosition(cc.p(-162+imgBg.getAnchorPointInPoints().x, 0+imgBg.getAnchorPointInPoints().y));
        imgBg.addChild(lbWanfa);
        var member1=this.member1= UICtor.cLabel("",24,cc.size(120,28),cc.color("238B76"),0,0);
        member1.setPosition(cc.p(181+imgBg.getAnchorPointInPoints().x, 45+imgBg.getAnchorPointInPoints().y));
        imgBg.addChild(member1);
        var member2=this.member2= UICtor.cLabel("",24,cc.size(120,28),cc.color("238B76"),0,0);
        member2.setPosition(cc.p(181+imgBg.getAnchorPointInPoints().x, 14+imgBg.getAnchorPointInPoints().y));
        imgBg.addChild(member2);
        var member3=this.member3= UICtor.cLabel("",24,cc.size(120,28),cc.color("238B76"),0,0);
        member3.setPosition(cc.p(181+imgBg.getAnchorPointInPoints().x, -17+imgBg.getAnchorPointInPoints().y));
        imgBg.addChild(member3);
        var member4=this.member4= UICtor.cLabel("",24,cc.size(120,28),cc.color("238B76"),0,0);
        member4.setPosition(cc.p(181+imgBg.getAnchorPointInPoints().x, -48+imgBg.getAnchorPointInPoints().y));
        imgBg.addChild(member4);
        var Label_score1=this.Label_score1= UICtor.cLabel("Text Label",24,cc.size(0,0),cc.color("238B76"),0,0);
        Label_score1.setAnchorPoint(cc.p(0,0.5));
        Label_score1.setPosition(cc.p(266+imgBg.getAnchorPointInPoints().x, 45+imgBg.getAnchorPointInPoints().y));
        imgBg.addChild(Label_score1);
        var Label_score2=this.Label_score2= UICtor.cLabel("Text Label",24,cc.size(0,0),cc.color("238B76"),0,0);
        Label_score2.setAnchorPoint(cc.p(0,0.5));
        Label_score2.setPosition(cc.p(266+imgBg.getAnchorPointInPoints().x, 14+imgBg.getAnchorPointInPoints().y));
        imgBg.addChild(Label_score2);
        var Label_score3=this.Label_score3= UICtor.cLabel("Text Label",24,cc.size(0,0),cc.color("238B76"),0,0);
        Label_score3.setAnchorPoint(cc.p(0,0.5));
        Label_score3.setPosition(cc.p(266+imgBg.getAnchorPointInPoints().x, -16+imgBg.getAnchorPointInPoints().y));
        imgBg.addChild(Label_score3);
        var Label_score4=this.Label_score4= UICtor.cLabel("Text Label",24,cc.size(0,0),cc.color("238B76"),0,0);
        Label_score4.setAnchorPoint(cc.p(0,0.5));
        Label_score4.setPosition(cc.p(266+imgBg.getAnchorPointInPoints().x, -48+imgBg.getAnchorPointInPoints().y));
        imgBg.addChild(Label_score4);
        var Image_dyj1=this.Image_dyj1= UICtor.cImg("res/ui/dtzjulebu/clubRecallPop/img_16.png");
        Image_dyj1.setPosition(cc.p(388+imgBg.getAnchorPointInPoints().x, 44+imgBg.getAnchorPointInPoints().y));
        imgBg.addChild(Image_dyj1);
        var Image_dyj2=this.Image_dyj2= UICtor.cImg("res/ui/dtzjulebu/clubRecallPop/img_16.png");
        Image_dyj2.setPosition(cc.p(388+imgBg.getAnchorPointInPoints().x, 14+imgBg.getAnchorPointInPoints().y));
        imgBg.addChild(Image_dyj2);
        var Image_dyj3=this.Image_dyj3= UICtor.cImg("res/ui/dtzjulebu/clubRecallPop/img_16.png");
        Image_dyj3.setPosition(cc.p(388+imgBg.getAnchorPointInPoints().x, -16+imgBg.getAnchorPointInPoints().y));
        imgBg.addChild(Image_dyj3);
        var Image_dyj4=this.Image_dyj4= UICtor.cImg("res/ui/dtzjulebu/clubRecallPop/img_16.png");
        Image_dyj4.setPosition(cc.p(388+imgBg.getAnchorPointInPoints().x, -47+imgBg.getAnchorPointInPoints().y));
        imgBg.addChild(Image_dyj4);
        var Button_xq=this.Button_xq= UICtor.cBtn("res/ui/dtzjulebu/clubRecallPop/btn_1.png");
        Button_xq.setPosition(cc.p(488+imgBg.getAnchorPointInPoints().x, 0+imgBg.getAnchorPointInPoints().y));
        imgBg.addChild(Button_xq);
        Button_xq.scale = 0.85;
        var dissStateRound=this.dissStateRound= UICtor.cLabel("",25,cc.size(0,0),cc.color("238B76"),0,0);
        dissStateRound.setPosition(cc.p(0+imgBg.getAnchorPointInPoints().x, -35+imgBg.getAnchorPointInPoints().y));
        imgBg.addChild(dissStateRound);
        var fangzhuSp1=this.fangzhuSp1= UICtor.cImg("res/ui/dtz/dtzRoom/fangzhu.png");
        fangzhuSp1.setPosition(cc.p(98+imgBg.getAnchorPointInPoints().x, 45+imgBg.getAnchorPointInPoints().y));
        imgBg.addChild(fangzhuSp1);
        var fangzhuSp2=this.fangzhuSp2= UICtor.cImg("res/ui/dtz/dtzRoom/fangzhu.png");
        fangzhuSp2.setPosition(cc.p(98+imgBg.getAnchorPointInPoints().x, 13+imgBg.getAnchorPointInPoints().y));
        imgBg.addChild(fangzhuSp2);
        var fangzhuSp3=this.fangzhuSp3= UICtor.cImg("res/ui/dtz/dtzRoom/fangzhu.png");
        fangzhuSp3.setPosition(cc.p(98+imgBg.getAnchorPointInPoints().x, -17+imgBg.getAnchorPointInPoints().y));
        imgBg.addChild(fangzhuSp3);
        var fangzhuSp4=this.fangzhuSp4= UICtor.cImg("res/ui/dtz/dtzRoom/fangzhu.png");
        fangzhuSp4.setPosition(cc.p(99+imgBg.getAnchorPointInPoints().x, -49+imgBg.getAnchorPointInPoints().y));
        imgBg.addChild(fangzhuSp4);


        this.fangzhuSp1.visible = this.fangzhuSp2.visible = this.fangzhuSp3.visible = this.fangzhuSp4.visible = false;
        this.fangzhuSp1.scale = this.fangzhuSp2.scale = this.fangzhuSp3.scale = this.fangzhuSp4.scale = 0.7;
        this.addChild(Panel_16);
        //添加点击事件

        for (var i = 1;i <= 4;i++){
            this["Label_score"+i].setString("");
            this["Image_dyj"+i].setVisible(false);
        }

        //刷新俱乐部显示
        this.setData(this.data);

        UITools.addClickEvent(this.Button_xq,this,this.onDetailRecord);
    },

    //返回游戏
    geGameStr:function(wanfaType){
        var gameStr = "";
        if (ClubRecallDetailModel.isDTZWanfa(wanfaType)){
            gameStr = "打筒子"
        }else if (ClubRecallDetailModel.isPDKWanfa(wanfaType)){
            gameStr = "跑得快"
        }else if (ClubRecallDetailModel.isPHZWanfa(wanfaType)){
            gameStr = ClubRecallDetailModel.getGameStr(wanfaType);
        }else if (ClubRecallDetailModel.isBBTWanfa(wanfaType)){
            gameStr = "半边天"
        }else if (ClubRecallDetailModel.isHZMJWanfa(wanfaType)){
            gameStr = "红中麻将"
        }else if (ClubRecallDetailModel.isSYMJWanfa(wanfaType)){
            gameStr = "邵阳麻将"
        }else if(ClubRecallDetailModel.isCSMJWanfa(wanfaType)){
            gameStr = "长沙麻将";
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
        this.lbWanfa.setString(this.geGameStr(data.playType));
        this.wanfaType = data.playType;
        this.fangzhuIndex = data.masterNameIndex;
        var dissStr = "正常结束";
        if (data.currentState == 2){
            dissStr = "正常结束";
        }else if (data.currentState == 3){
            dissStr = "未开局被解散";
        }else if (data.currentState == 4){
            dissStr = "中途解散";
            this.dissStateRound.setString( "(第"+ data.playedBureau +"局)")
        }
        this.dissState.setString(dissStr);
        var players = data.players.split(",");
        var point = [];
        if (data.point){
            point = data.point.split(",");
        }
        var isWinner = [];
        if (data.isWinner){
            isWinner = data.isWinner.split(",");
        }
        this.playerLength = players.length;
        for (var i = 0; i < players.length; i++){
            var idex = i + 1;
            if (this["member"+idex]){
                this["member"+idex].setString(players[i] || "");
            }

            if(i == this.fangzhuIndex && idex >= 1 && idex <= 4){
                this["fangzhuSp" + idex].visible = true;
            }

            if (this["Label_score"+idex] && point[i] != null){
                var pointStr =  parseInt(point[i]);
                if (pointStr > 0){
                    pointStr = "+" + pointStr;
                }
                this["Label_score"+idex].setString(pointStr);
            }
            if (this["Image_dyj"+idex] && isWinner[i] && isWinner[i] == 1 && point[i] > 0){
                if (this["Label_score"+idex]){
                    this["Label_score"+idex].setColor(cc.color(255,111,24))
                }
                this["Image_dyj"+idex].setVisible(true);
            }
        }

    },

    onDetailRecord:function(){
        //cc.log("请求战绩详情---------"+this.index)
        var tableNo = this.data.tableNo;
        var self = this;
        sy.scene.showLoading("正在获取战绩详情数据");
        NetworkJT.loginReq("groupAction", "loadTableRecord", {tableNo:tableNo, oUserId:PlayerModel.userId ,isClub:1}, function (data) {
            sy.scene.hideLoading();
            if (data) {
                cc.log("loadTableRecord"+JSON.stringify(data));
                var mc = null;
                if (self.isDTZWanfa(self.wanfaType)){
                    if (self.playerLength == 4){
                        mc = new ClubDtzRecallDetailPop(data);
                    }else{
                        mc = new Club3DtzRecallDetailPop(data);
                    }
                }else if (self.isPDKWanfa(self.wanfaType)){
                    mc = new ClubPdkRecallDetailPop(data);
                }else if (ClubRecallDetailModel.isPHZWanfa(self.wanfaType)){
                    mc = new ClubPhzRecallDetailPop(data);
                }else if (self.isBBTWanfa(self.wanfaType)){
                    mc = new ClubBbtzRecallDetailPop(data);
                }else if (ClubRecallDetailModel.isHZMJWanfa(self.wanfaType) || ClubRecallDetailModel.isCSMJWanfa(self.wanfaType)){
                    mc = new ClubHzmjRecallDetailPop(data);
                }else if (ClubRecallDetailModel.isSYMJWanfa(self.wanfaType)){
                    mc = new ClubSymjRecallDetailPop(data);
                }
                if (mc){
                    ClubRecallDetailModel.init(data);
                    ClubRecallDetailModel.renLength = self.playerLength;
                    PopupManager.open(mc);
                }


            }
        }, function (data) {
            cc.log("getUserPlayLog::"+JSON.stringify(data));
            sy.scene.hideLoading();
            FloatLabelUtil.comText("获取战绩详情数据失败");
        });

    }

});




