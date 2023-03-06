/**
 * Created by Administrator on 2017/7/21.
 */
/**
 * 排行榜弹框
 */
var ClubRankPop = BasePopup.extend({

    ctor:function(clickGroupId , clickGroupRole ,parenNode){
        this.opGroupId = clickGroupId;
        this.opGroupRole = clickGroupRole;
        this.parentNode = parenNode;
        this._super("res/clubRankPop.json");
    },

    selfRender:function(){

        cc.sys.localStorage.setItem("sy_dn_beginTime",(0));
        cc.sys.localStorage.setItem("sy_dn_endTime",(0));

        this.membegImgLoad = new RemoteImageLoadQueue();
        this.scheduleUpdate();
        this.membegImgLoad.stopLoad();
        cc.log("ClubRank 启动定时器...");

        //排行榜当前页码 , 最大页码
        this.curRankPage = 1;
        this.rankMaxPage = 1;
        //记录当前viewlist中显示用的数据 如果有排序的需求就使用此数据
        this.showViewListData = [];
        this.maxRankPageSize = 10; //当前最多显示多少条数据

        this.returnOne = 0;//是不是请求多个数据
        this.rankType = "";//请求多个数据的rankType

        this.clickBtnIdenx = 1;  //当前点击的按钮

        this.openChoiceTime = this.getWidget("btnOpenChoiceTime");
        this.lbbeginTime = this.getWidget("beginTime");
        this.lbendTime = this.getWidget("endTime");
        this.rankViewList = this.getWidget("ListView_Winner");
        this.lbDataPage = this.getWidget("lbDataPage");
        this.lbBigWinner = this.getWidget("lbBigWinner");
        this.lbId = this.getWidget("lbId");
        this.lbName = this.getWidget("lbName");
        this.lbOp = this.getWidget("lbOp");
        this.myRank = this.getWidget("myRank");
        this.activeTime = this.getWidget("activeTime");
        this.activeTitile = this.getWidget("activeTitile");
        this.labelClubRankTip = this.getWidget("labelClubRankTip");
        this.labelClubRankTip.visible =  true;
        this.lbDataPage.setString("1");
        this.lbNoData = this.getWidget("labelNoData");
        this.touchPanel = this.getWidget("dataTouchPanel");
        this.touchPanel.setTouchEnabled(true);
        UITools.addClickEvent(this.touchPanel , this , this.onOpenChoiceTimePop);
        this.addCustomEvent(SyEvent.RESET_TIME, this, this.changeSearchTime);

        this.titlePanel1 = this.getWidget("Panel_title1");//老的标题层
        this.titlePanel2 = this.getWidget("Panel_title2");//新的标题层

        this.Panel_gamesContent = this.getWidget("Panel_gamesContent");  //局数详情活动层
        this.Panel_gamesContent.visible = false;

        this.Image_heidi = this.getWidget("Image_heidi");
        if (this.opGroupRole == 1){
            this.Image_heidi.visible = false;
        }

        this.Image_awardTip = this.getWidget("Image_awardTip");  //局数详情提示
        this.Image_awardTip.visible = false;
        this.Label_show1 = this.getWidget("Label_show1");  //局数详情活动层
        this.Label_show2 = this.getWidget("Label_show2");  //局数详情活动层
        for(var i=1;i <= 2;i++){
            this["Label_show"+i].setString("");
        }
        this.Label_num = this.getWidget("Label_num");  //钻石数目
        this.Label_num.setString("");

        this.Button_linqu = this.getWidget("Button_linqu");  //领取奖励
        if(this.Button_linqu){
            UITools.addClickEvent(this.Button_linqu , this , this.onLingqu);
        }
        this.Button_linqu.visible = false;

        this.Label_lqTip = this.getWidget("Label_lqTip");  //领奖提示
        this.Label_lqTip.setString("");

        this.Button_tip = this.getWidget("Button_tip");  //奖励提示

        if(this.Button_tip){
            UITools.addClickEvent(this.Button_tip , this , this.onshowAwardTip);
        }

        this.pageBg = this.getWidget("pageBg");//翻页层

        //选择总积分还是总局数
        var scoreGamesWidgets = {"lbData1":1,"lbData2":2};
        this.addClickEvent(scoreGamesWidgets,this.onScoreGames);

        var widgets = {"btn_Score_1":1,"btn_Score_2":2,"btn_Score_3":3,"btn_Score_4":4,"btn_Score_5":5,"btn_Score_6":6,"btn_Score_7":7};
        this.addClickEvent(widgets,this.onBtnListClick);

        //群主和管理才能看局数统计和俱乐部排名
        for(var i=6;i <= 7;i++){
            this.getWidget("btn_Score_"+i).visible = false;
        }
        if(this.opGroupRole == 0 || this.opGroupRole == 1){
            for(var i=6;i <= 7;i++){
                this.getWidget("btn_Score_"+i).visible = true;
            }
            if (this.opGroupRole == 1){
                this.getWidget("btn_Score_7").visible = false;
            }
        }

        this.lbrankPage = this.getWidget("lbPage");
        var btnSort = this.getWidget("btnSort");
        if(btnSort){
            UITools.addClickEvent(btnSort , this , this.onSortRank);
        }

        var btnRankLeft = this.getWidget("btnDataLeft");
        if(btnRankLeft){
            UITools.addClickEvent(btnRankLeft , this , this.onRankUpPage);
        }

        var btnRankRight = this.getWidget("btnDataRight");
        if(btnRankRight){
            UITools.addClickEvent(btnRankRight , this , this.onRankDownPage);
        }

        if(this.openChoiceTime){
            UITools.addClickEvent(this.openChoiceTime , this , this.onOpenChoiceTimePop)
        }

        //打开选择时间界面
        var tBegin = new Date();
        this.defaultBeginTime =  this.getLocalItem("sy_dn_beginTime") || tBegin;
        this.defaultendTime = this.getLocalItem("sy_dn_endTime") || tBegin;

        this.beginTime = this.defaultBeginTime;
        this.endTime = this.defaultendTime ;
        this.lbbeginTime.setString(this.formatTime(this.beginTime));
        this.lbendTime.setString(this.formatTime(this.endTime));

        this.onScoreGames("lbData1");
    },

    getLocalItem:function(key){
        var val = cc.sys.localStorage.getItem(key);
        if(val)
            val = parseInt(val);
        return val;
    },

    changeSearchTime:function(event){
        var data = event.getUserData();
        var beginTime = data.beginTime;
        var endTime = data.endTime;

        this.lbbeginTime.setString(this.formatTime(beginTime));
        this.lbendTime.setString(this.formatTime(endTime));
        this.beginTime = beginTime;
        this.endTime = endTime;
        this.rankParams.beginTime = this.beginTime;
        this.rankParams.endTime = this.endTime;
        this.rankParams.pageNo = 1;
        this.rankViewList.removeAllChildren();

        cc.sys.localStorage.setItem("sy_dn_beginTime",(this.beginTime));
        cc.sys.localStorage.setItem("sy_dn_endTime",(this.endTime));
        this.getRankData(this.rankParams)
    },


    onOpenChoiceTimePop:function(){
        var beginTime = this.getLocalItem("sy_dn_beginTime") || 0;
        var endTime = this.getLocalItem("sy_dn_endTime") || 0;
        var mc = new ClubChoiceTimePop(this , beginTime , endTime);
        PopupManager.addPopup(mc);
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
     * 点击总积分和总局数
     */
    onScoreGames:function(obj){
        var temp = parseInt(obj.temp) || 1;
        for(var i=1;i <= 2;i++){
            if(i!=temp) {
                this["lbData" + i].setColor(cc.color(116,94,71));
                this["lbData" + i].scale = 0.8;
            }else{
                this["lbData" + i].setColor(cc.color("238B76"));
                this["lbData" + i].scale = 1;
            }
        }
        if (temp == 1){
            this.rankType = "djsCount,zjfCount"
        }else if (temp == 2){
            this.rankType = "zjfCount,djsCount"
        }
        this.curRankPage = 1;
        this.onBtnListClick(this["btn_Score_1"]);
    },
    /**
     * 点击分页按钮
     */
    onBtnListClick:function(obj){
        var temp = parseInt(obj.temp);
        this.membegImgLoad.stopLoad();
        //this.hideAllPanel();
        this.showViewListData = null;
        this.clickBtnIdenx = temp;


        for(var i=1;i <= 7;i++){
            var txt_name = this["btn_Score_"+i].getChildByName("txt_name")
            if(i!=temp) {
                this["btn_Score_" + i].setBright(true);
                if (txt_name){
                    txt_name.setColor(cc.color(255 , 255 , 255))
                }
            }else{
                if (txt_name){
                    txt_name.setColor(cc.color(24 , 97 , 118))
                }
            }
        }
        var btn = this["btn_Score_"+temp];
        this.curRankPage = 1;
        var rankParams = {};
        rankParams.pageNo = this.curRankPage;
        rankParams.beginTime = this.beginTime;
        rankParams.endTime = this.endTime;
        rankParams.rankType = "";

        btn.setBright(false);
        this.returnOne = 0;
        if(temp == 1){
            this.returnOne = 1;
            this.lbOp.setString("");
            rankParams.rankType = this.rankType;
            if (this.opGroupRole  > 1){
                this.lbOp.setString("总局数");
                this.returnOne = 0;
                rankParams.rankType = "djsCount";
                var cur_txt_name = obj.getChildByName("txt_name")
                cur_txt_name.setString("局数统计")
//                var Image_166 = obj.getChildByName("Image_166")
//                Image_166.loadTexture("res/ui/dtzjulebu/julebu/Rank/rank_img_10.png");
            }
            cc.log("rankParams.rankType:::"+rankParams.rankType);
        }else if(temp == 2){
            rankParams.rankType = "dyjCount";
            this.lbOp.setString("次数");
        }else if(temp == 3){
            rankParams.rankType = "dfhCount";
            this.lbOp.setString("次数");
        }else if(temp == 4){
            rankParams.rankType = "winMaxScore";
            this.lbOp.setString("分数");
        }else if(temp == 5){
            rankParams.rankType = "loseMaxScore";
            this.lbOp.setString("分数");
        }else if(temp == 6){
            rankParams.rankType = "djsCount";
            this.lbOp.setString("");
        }else if(temp == 7){
            rankParams.rankType = "jlbCount";
            this.lbOp.setString("总局数");
        }

        this.rankViewList.removeAllChildren();
        this.rankParams = rankParams;
        this.changeTitleData(temp);    //修改发送请求前需要改变的参数和显示
        this.changeTitleStr(temp);  //修改发送请求前需要改变的显示

        //特殊处理第六条请求牌局统计数据
        if (temp == 6){
            this.getGamesCount();
        }else{
            this.getRankData(this.rankParams);
        }
    },

    changeTitleStr:function(temp) {
        this.myRank.setString("");
        this.activeTime.setString("");
        this.activeTitile.setString("");
        this.labelClubRankTip.setString("");
        if (temp == 7){
            this.maxRankPageSize = 50;
            this.lbBigWinner.setString("群主头像");
            this.lbId.setString("群主ID");
            this.lbName.setString("亲友圈ID");
            this.activeTime.setString("活动时间：7月19号-7月31号");
            //this.activeTitile.setString("春节十天乐");
        }else{
            this.maxRankPageSize = 10;
            this.lbBigWinner.setString("玩家");
            this.lbId.setString("ID");
            this.lbName.setString("昵称");
        }
    },

    changeTitleData:function(temp) {
        this.touchPanel.visible = true;
        this.titlePanel1.visible = true;
        this.titlePanel2.visible = false;
        this.pageBg.visible = true;
        this.Panel_gamesContent.visible = false;
        if(temp == 1 && (this.opGroupRole == 0 || this.opGroupRole == 1)){
            this.showGmaesScoreBtn(true);
        }else{
            if (temp == 6 || temp == 7){
                this.touchPanel.visible = false;
                this.pageBg.visible = false;
                if (temp == 6){
                    this.titlePanel1.visible = false;
                    this.titlePanel2.visible = true;
                }
            }
            this.showGmaesScoreBtn(false);
        }
    },

    showGmaesScoreBtn:function(bool) {
        for(var i=1;i <= 3;i++){
            this.getWidget("lbData" + i).visible = bool;
        }
    },


    add0:function(m){
        return m<10?'0'+m:m+"";
    },

    formatTime:function(shijianchuo) {
        //shijianchuo是整数，否则要parseInt转换
        cc.log("shijianchuo ..." , shijianchuo);
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

    /**
     * 老李要 20180123这样的日期 不要时间戳 喵了个咪
     */
    dealTimeToServer:function(shijianchuo){
        var time = new Date(shijianchuo);
        var y = time.getFullYear();
        var m = time.getMonth()+1;
        var d = time.getDate();
        var h = time.getHours();
        var mm = time.getMinutes();
        var s = time.getSeconds();
        return y+this.add0(m)+this.add0(d);
    },

    /**
     * 局数排行榜
     */
    getRankData:function(rankParams){
        if(rankParams){
            var pageNo = rankParams.pageNo;
            var curBeginTime = rankParams.beginTime;
            var curEndTime = rankParams.endTime;
            var rankType = rankParams.rankType;
        }
        cc.log("curBeginTime ..."  ,pageNo , this.maxRankPageSize);

        sy.scene.showLoading("正在获取排行榜数据");
        var self = this;

        NetworkJT.loginReq("dataAction", "loadGroupDataRank", {startDate:this.dealTimeToServer(curBeginTime) , endDate : this.dealTimeToServer(curEndTime),
                dataCode:"group" + this.opGroupId , dataTypes:rankType , pageNo:pageNo , pageSize:this.maxRankPageSize , returnOne:this.returnOne,
            userId:PlayerModel.userId,
            groupId:this.opGroupId}, function (data) {
            if (data) {
                //cc.log("loadGroupDataRank::"+JSON.stringify(data));
                sy.scene.hideLoading();
                if(self.rankViewList){
                    self.membegImgLoad.startLoad();
                    //var dataList = self.getRankItemData(rankType,data) || [];
                    if(data[rankType].length > 0){//获取当前页 有数据的情况
                        self.rankViewList.removeAllChildren();
                        self.curRankPage = data.pageNo || 1;
                        self.lbDataPage.setString(self.curRankPage);
                        self.lbNoData.visible = false;

                    }else{
                        if(pageNo == 1){
                            //FloatLabelUtil.comText("当前时间区间没有数据");
                            self.lbNoData.visible = true;
                        }else{
                            FloatLabelUtil.comText("没有更多数据了");
                            self.lbNoData.visible = false;
                        }
                    }
                    if (data.myRank != null){
                        if (data.myRank == 0){
                            self.lbNoData.visible = false;
                            self.labelClubRankTip.setString("前50名可查看排行榜");
                            self.myRank.setString("我的排名：未上榜");
                        }else{
                            self.myRank.setString("我的排名："+data.myRank);
                        }
                    }



                    for(var index = 0 ; index < data[rankType].length ; index ++){
                        //显示自己和前后一名
                        cc.log("self.curRankPage::" , self.curRankPage );
                        if (rankParams.rankType == "jlbCount"){
                            var isHide = false;//隐藏id后面两位
                            if (data.myRank && (data.myRank == (index + 1) || data.myRank == (index + 2) || data.myRank == index)){
                                if (data.myRank != index + 1){
                                    isHide = true;
                                }
                                var rankItem = new clubRankItem(data[rankType][index] , (self.curRankPage-1)*self.maxRankPageSize + index+1 , self, isHide);
                                self.rankViewList.pushBackCustomItem(rankItem);
                            }
                        }else{
                            var rankItem = new clubRankItem(data[rankType][index] , (self.curRankPage-1)*self.maxRankPageSize + index+1 , self);
                            self.rankViewList.pushBackCustomItem(rankItem);
                        }

                    }
                }
            }
        }, function (data) {
            FloatLabelUtil.comText(data.message);
            sy.scene.hideLoading();
        });

    },

    //获取多条数据的接口
    getRankItemData:function(rankType,data){
        var rankTypeList = rankType.split(",");
        var rankData = data[rankTypeList[0]];
        if (rankTypeList.length > 1){
            for (var i = 0; i < rankTypeList.length; i++){
                for(var index = 0 ; index < data[rankTypeList[i]].length ; index ++){
                    if (i > 0){
                        rankData[index].dataValue = rankData[index].dataValue + "/" + data[rankTypeList[i]][index].dataValue
                    }
                }
            }
        }
        return rankData;
    },

    getGamesCount:function(){
        var self = this;
        sy.scene.showLoading("正在获取局数统计数据");
        NetworkJT.loginReq("groupAction", "loadTableCount", {groupId:this.opGroupId,userId:PlayerModel.userId}, function (data) {
            if (data) {
                cc.log("loadTableCount::"+JSON.stringify(data));
                sy.scene.hideLoading();
                if(self.rankViewList){
                    self.membegImgLoad.startLoad();
                    self.showAwardData(data.message);
                    if(data.message.list.length > 0){//获取当前页 有数据的情况
                        self.rankViewList.removeAllChildren();
                        self.curRankPage = data.pageNo || 1;
                        self.lbDataPage.setString(self.curRankPage);
                        self.lbNoData.visible = false;
                    }else{
                        self.lbNoData.visible = true;
                    }
                    var gamesCount = 0;
                    for(var index = 0 ; index <= data.message.list.length ; index ++){
                        var listData = {};

                        if (index == data.message.list.length) {
                            listData.ctime = "合计";
                            listData.c = gamesCount;
                        }else{
                            listData.ctime = data.message.list[index].ctime;
                            if (index == 0) {
                                listData.ctime = "今日";
                            }
                            listData.c = data.message.list[index].c;
                            gamesCount = gamesCount + parseInt(listData.c);
                        }
                        var rankItem = new clubRankGamesItem(listData, index+1 , self);
                        self.rankViewList.pushBackCustomItem(rankItem);

                    }
                }
            }
        }, function (data) {
            FloatLabelUtil.comText(data.message);
            sy.scene.hideLoading();
        });

    },

    //发送领奖请求
    onLingqu:function(){
        var self = this;
        sy.scene.showLoading("正在领奖");
        NetworkJT.loginReq("groupAction", "drawPrize", {groupId:this.opGroupId,userId:PlayerModel.userId}, function (data) {
            if (data) {
                cc.log("drawPrize::"+JSON.stringify(data));
                sy.scene.hideLoading();
                if(data.message && data.message.status == 2) {
                    self.showLqBtnstatus(false);
                    FloatLabelUtil.comText("领奖"+ data.message.award +"钻成功");
                }else{
                    FloatLabelUtil.comText("领奖失败");
                }
            }
        }, function (data) {
            sy.scene.hideLoading();
            FloatLabelUtil.comText(data.message);
        });
    },

    //显示领奖提示
    onshowAwardTip:function(){
        if (this.Image_awardTip.visible == false){
            this.Image_awardTip.visible = true;
        }else{
            this.Image_awardTip.visible = false;
        }
    },

    showAwardData:function(data){
        if (data.activity && data.activity == 1 || data.activity == 2){
            this.Panel_gamesContent.visible = true;
            // 1是进行中 2是领奖励
            if (data.activity == 1) {
                this.Label_lqTip.setString("活动进行中");
                this.Button_linqu.visible = false;
                var nextCount = parseInt(data.nextCount) - parseInt(data.count)
                this.Label_show1.setString("当前局数："+data.count+"局，奖励"+data.award+"钻");
                this.Label_show2.setString("再进行"+nextCount+"局可获得奖励"+data.nextAward+"钻");
                if (data.nextCount == 0){
                    this.Label_show2.setString("恭喜您获得最高奖励");
                }
            }else if (data.activity == 2){
                this.Label_lqTip.setString("");
                this.Button_linqu.visible = true;
                this.showLqBtnstatus(true);
                this.Label_show1.setString("活动累计总局数："+data.count+"局");
                this.Label_show2.setString("可获得奖励："+data.award+"钻");
                if (data.status == 2){
                    this.showLqBtnstatus(false);
                }else if (data.status == -1){
                    this.Button_linqu.visible = false;
                    this.Label_lqTip.setString("活动已结束");
                }
            }
            this.Label_num.setString("" + data.award);
        }
    },

    //显示领取按钮状态
    showLqBtnstatus:function(bool){
        this.Button_linqu.setBright(bool);
        this.Button_linqu.setTouchEnabled(bool);
    },

    /**
     * 排行榜上翻
     */
    onRankUpPage:function(){
        var curPage = Math.max(this.curRankPage - 1 , 1);
        cc.log("获取上一页数据" , curPage , this.rankMaxPage);
        if(curPage == this.curRankPage){
            return;
        }
        this.membegImgLoad.stopLoad();
        this.rankParams.pageNo = curPage;
        this.getRankData(this.rankParams);
    },

    /**
     * 排行榜下翻
     */
    onRankDownPage:function(){
        var curPage = Math.min(this.curRankPage + 1 , 99999);
        cc.log("获取下一页数据" , curPage , 99999);
        if(curPage == this.curRankPage){
            return;
        }
        this.membegImgLoad.stopLoad();
        this.rankParams.pageNo = curPage;
        this.getRankData(this.rankParams)
    },

    update: function(dt) {
        this.membegImgLoad.update(dt);
    },

    onClose:function(){
        cc.log("ClubRank 关闭定时器...");
        this.membegImgLoad.stopLoad();
        this.unscheduleUpdate();
        this._super();
    },
});


/**
 * 排行榜item
 */

var clubRankItem = ccui.Widget.extend({

    ctor:function(data ,index, parentNode,isHide){
        this.data = data;
        this.index = index;
        this.parentNode = parentNode;
        this.isHide = isHide || false;

        this._super();
        this.setContentSize(733, 120);

        var Panel_16=this.Panel_16= UICtor.cPanel(cc.size(730,68),cc.color(150,200,255),0);
        Panel_16.setAnchorPoint(cc.p(0,0));
        Panel_16.setPosition(0,0);

        var imgBg=this.imgBg= UICtor.cImg("res/ui/dtzjulebu/julebu/Rank/cellBg.png");
        imgBg.scaleX = (this.width - 15)/imgBg.width;
        imgBg.scaleY = this.height/imgBg.height;
        imgBg.setPosition(367,59);
        Panel_16.addChild(imgBg);
        var userId=this.userId= UICtor.cLabel("800800",22,cc.size(0,0),cc.color("238B76"),0,1);
        userId.setPosition(cc.p(-160+imgBg.getAnchorPointInPoints().x, 3+imgBg.getAnchorPointInPoints().y));
        Panel_16.addChild(userId);

        var userName=this.userName= UICtor.cLabel("野狼教授阿什顿",25,cc.size(190,36),cc.color("238B76"),1,1);
        userName.setPosition(cc.p(14+imgBg.getAnchorPointInPoints().x, 1+imgBg.getAnchorPointInPoints().y));
        Panel_16.addChild(userName);

        var socre=this.socre= UICtor.cLabel("8888",25,cc.size(0,0),cc.color("238B76"),0,1);
        socre.setPosition(cc.p(190+imgBg.getAnchorPointInPoints().x, 1+imgBg.getAnchorPointInPoints().y));
        Panel_16.addChild(socre);
        var icon=this.icon= UICtor.cImg("res/ui/dtzjulebu/julebu/Rank/icon.png");
        icon.setPosition(cc.p(-280+imgBg.getAnchorPointInPoints().x, 1+imgBg.getAnchorPointInPoints().y));
        Panel_16.addChild(icon);
        var mingciSp=this.mingciSp= UICtor.cImg("res/ui/dtzjulebu/julebu/Rank/rank1.png");
        mingciSp.setPosition(cc.p(-395+imgBg.getAnchorPointInPoints().x, 2+imgBg.getAnchorPointInPoints().y));
        Panel_16.addChild(mingciSp);
        var labelRank=this.labelRank= UICtor.cLabel("4",28,cc.size(0,0),cc.color("238B76"),0,0);
        labelRank.setPosition(cc.p(-395+imgBg.getAnchorPointInPoints().x, 4+imgBg.getAnchorPointInPoints().y));
        Panel_16.addChild(labelRank);


        this.mingciSp.visible = false;
        this.labelRank.visible = false;


        this.addChild(Panel_16);
        //添加点击事件

        //刷新俱乐部显示
        this.setData(this.data);
    },


    setData:function(data){
        if(this.index <= 3){
            this.mingciSp.loadTexture("res/ui/dtzjulebu/julebu/Rank/rank"+this.index + ".png");
        }else{
            this.labelRank.setString(this.index);
        }
        this.mingciSp.visible = (this.index <= 3);
        this.labelRank.visible = !(this.index <= 3);
        var dataValue = "";
        if (data.dataValue){
            dataValue = data.dataValue;
        }

        if (data.djsCount){
            dataValue = "";
            dataValue = data.djsCount
        }
        if (data.zjfCount != null){
            dataValue = dataValue + "/"+data.zjfCount;
        }
        this.socre.setString(dataValue);
        var groupId = "";
        if (this.parentNode.clickBtnIdenx == 7){
            var dataCode = data.dataCode.substring(5); //group1866服务器要求截取group
            this.userName.setString(dataCode);
            groupId = dataCode;
        }else{
            this.userName.setString(data.userName);
            groupId = data.userName;
        }
        var idStr = data.userId;
        if (data.hideId){
            idStr = UITools.dealUserId(data.userId);
        }
        this.userId.setString(idStr);
        this.showIcon(data.headimgurl);

        if (this.isHide) {
            var useridStr = UITools.dealUserId("******");
            var groupidStr = UITools.dealId("****");
            this.userId.setString(useridStr);
            this.userName.setString(groupidStr);
            this.icon.visible = false;
            this.mingciSp.visible = false;
            this.labelRank.visible = false;
        }
    },


    showIcon: function (iconUrl, sex) {
        //iconUrl = "http://wx.qlogo.cn/mmopen/25FRchib0VdkrX8DkibFVoO7jAQhMc9pbroy4P2iaROShWibjMFERmpzAKQFeEKCTdYKOQkV8kvqEW09mwaicohwiaxOKUGp3sKjc8/0";
        var url = iconUrl;
        var icon = this.icon;
        var sex = sex || 1;
        var defaultimg = (sex == 1) ? "res/ui/dtz/images/default_m.png" : "res/ui/dtz/images/default_w.png";

        if (icon.getChildByTag(345)) {
            icon.removeChildByTag(345);
        }

        var sprite = new cc.Sprite(defaultimg);
        sprite.x = icon.width * 0.5;
        sprite.y = icon.height * 0.5;
        icon.addChild(sprite, 5, 345);
        if (iconUrl) {
            this.parentNode.membegImgLoad.push(iconUrl, function (img) {
                if(sprite){
                    sprite.setTexture(img);
                }
            });
        }
    },

});


/**
 * 排行榜局数统计item
 */

var clubRankGamesItem = ccui.Widget.extend({

    ctor:function(data ,index, parentNode){
        this.data = data;
        this.index = index;
        this.parentNode = parentNode;

        this._super();
        this.setContentSize(733, 120);

        var maxDetail = 3;

        var Panel_16=this.Panel_16= UICtor.cPanel(cc.size(730,68),cc.color(150,200,255),0);
        Panel_16.setAnchorPoint(cc.p(0,0));
        Panel_16.setPosition(0,0);
        var imgBg=this.imgBg= UICtor.cImg("res/ui/dtzjulebu/julebu/Rank/cellBg.png");
        imgBg.scaleX = (this.width - 15)/imgBg.width;
        imgBg.scaleY = this.height/imgBg.height;
        imgBg.setPosition(367,59);
        Panel_16.addChild(imgBg);


        var date=this.date= UICtor.cLabel("8888",25,cc.size(0,0),cc.color("238B76"),0,1);
        date.setPosition(cc.p(-243+imgBg.getAnchorPointInPoints().x, 1+imgBg.getAnchorPointInPoints().y));
        Panel_16.addChild(date);

        var gamesCount=this.gamesCount= UICtor.cLabel("野狼教授阿什顿",25,cc.size(190,36),cc.color("238B76"),1,1);
        gamesCount.setPosition(cc.p(138+imgBg.getAnchorPointInPoints().x, 1+imgBg.getAnchorPointInPoints().y));
        Panel_16.addChild(gamesCount);


        this.maxPageSize = 30;//详情最多条数
        if (this.index <= maxDetail){
            var Button_detail = this.Button_detail= UICtor.cBtn("res/ui/dtzjulebu/julebu/Rank/gameDetails.png");
            Button_detail.setPosition(cc.p(368+imgBg.getAnchorPointInPoints().x, 1+imgBg.getAnchorPointInPoints().y));
            Panel_16.addChild(Button_detail);
            //添加点击事件
            UITools.addClickEvent(this.Button_detail, this, this.showDetail);
        }


        this.addChild(Panel_16);

        //刷新俱乐部显示
        this.setData(this.data);

    },

    setData:function(data){
        this.gamesCount.setString(data.c);
        this.date.setString(data.ctime);
    },

    showDetail:function(){
        cc.log("点击了详情");
        var self = this;
        sy.scene.showLoading("正在获取统计详情数据");
        var date = "";
        if (this.index > 1){
            date = this.date.getString();
        }

        NetworkJT.loginReq("groupAction", "loadTableCountDetails", {groupId:this.parentNode.opGroupId,
            queryDate:date,  //当前日期
            pageNo:1,  //当前页数
            pageSize:this.maxPageSize,
            condition:"2,4",  //2 正常结束 , 3未开局被解散, 4中途解散
            userId:PlayerModel.userId}, function (data) {
            if (data) {
                cc.log("loadTableCountDetails::"+JSON.stringify(data));
                sy.scene.hideLoading();
                var mc = new ClubGamesDetailPop(self.parentNode.opGroupId,data.message,self);
                PopupManager.addPopup(mc);
            }
        }, function (data) {
            FloatLabelUtil.comText(data.message);
            sy.scene.hideLoading();
        });




    }


});


