/**
 * Created by Administrator on 2017/7/21.
 */
/**
 * 局数统计详情
 */
var ClubGamesDetailPop = BasePopup.extend({

    ctor:function(clickGroupId ,date,parenNode){
        this.opGroupId = clickGroupId;
        this.parentNode = parenNode;
        this.detailDate = date || [];
        this._super("res/clubGamesDetailPop.json");
    },

    selfRender:function(){

        this.lbNoData = this.getWidget("labelNoData");
        this.lbNoData.visible = true;

        //排行榜当前页码 , 最大页码
        this.curDetailPage = 1;
        this.rankMaxPage = 1;
        ////重组数据 用来删选需要的数据
        //this.detailListData = [];

        this.condition = "2,4";//2 正常结束 , 3未开局被解散, 4中途解散

        this.Panel_down = this.getWidget("Panel_down");//翻页层
        this.Panel_down.visible = false;

        this.pageBg = this.getWidget("pageBg");//翻页层


        this.lbDataPage = this.getWidget("lbDataPage");//当前是哪一页
        this.lbDataPage.setString("1");


        this.lbAllGmaes = this.getWidget("lbAllGmaes");//总条数

        this.Button_diss = this.getWidget("Button_diss");//获取提前解散的房间数据
        this.Button_diss.setBright(false);

        UITools.addClickEvent(this.Button_diss , this , this.getDissDetail);


        var btnRankLeft = this.getWidget("btnDataLeft");
        if(btnRankLeft){
            UITools.addClickEvent(btnRankLeft , this , this.onDetailUpPage);
        }

        var btnRankRight = this.getWidget("btnDataRight");
        if(btnRankRight){
            UITools.addClickEvent(btnRankRight , this , this.onDetailDownPage);
        }

        this.detailViewList = this.getWidget("ListView_Winner");

        this.tables = 0;
        if (this.detailDate && this.detailDate.list.length > 0){
            this.lbNoData.visible = false;
            this.Panel_down.visible = true;
            this.tables = this.detailDate.tables;
            //this.detailListData = [];
            //this.detailListData = this.detailDate.list;
            for (var index = 0; index < this.detailDate.list.length; index++){
                var detailItem = new clubGameDetailItem(this.detailDate.list[index], index+1 , this);
                this.detailViewList.pushBackCustomItem(detailItem);
            }
        }

        this.updateAllGmaesStr(this.tables);
    },
    //后台要求前台筛选数据
    showDateToItem:function(_date){
        this.detailViewList.removeAllChildren();
        var normaOverlDate = [];
        var noStarOverDate = [];
        var dissOverDate = [];
        var allOverDate = [];
        var showListDate = [];
        for (var index = 0; index < _date.length; index++){
            if (_date[index].overDetail == 2){
                normaOverlDate.push(_date[index]);
                allOverDate.push(_date[index]);
            }else if (_date[index].overDetail == 3){
                noStarOverDate.push(_date[index]);
            } else if (_date[index].overDetail == 4){
                dissOverDate.push(_date[index]);
                allOverDate.push(_date[index]);
            }
        }
        if (this.condition == "2"){
            showListDate = normaOverlDate;
        }else if (this.condition == "3"){
            showListDate = noStarOverDate;
        }else if (this.condition == "4"){
            showListDate = dissOverDate;
        }else if (this.condition == "2,4"){
            showListDate = allOverDate;
        }

        cc.log("this.condition:::::",this.condition);

        for (var index = 0; index < showListDate.length; index++){
            var detailItem = new clubGameDetailItem(showListDate[index], index+1 , this);
            this.detailViewList.pushBackCustomItem(detailItem);
        }
    },

    updateAllGmaesStr:function(_num){
        this.lbAllGmaes.setString("总条数："+_num);
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
     * 详情数据
     */
    getDetailData:function(detailPage){
        cc.log("点击了详情");
        var self = this;
        sy.scene.showLoading("正在获取统计详情数据");
        var date = "";
        if (this.parentNode.index > 1){
            date = this.parentNode.date.getString();
        }
        var page = detailPage;
        NetworkJT.loginReq("groupAction", "loadTableCountDetails", {groupId:this.opGroupId,
            queryDate:date,  //当前日期
            pageNo:page,  //当前页数
            pageSize:this.parentNode.maxPageSize,
            condition:""+this.condition,  //2 正常结束 , 3未开局被解散, 4中途解散
            userId:PlayerModel.userId}, function (data) {
            if (data) {
                //cc.log("loadTableCountDetails::"+JSON.stringify(data));
                sy.scene.hideLoading();
                if(data.message.list.length > 0) {//获取当前页 有数据的情况
                    self.lbNoData.visible = false;
                    self.curDetailPage = page;
                    self.lbDataPage.setString(""+self.curDetailPage);
                    self.detailViewList.removeAllChildren();
                    self.pageBg.visible = true;
                    //self.detailListData = [];
                    //self.detailListData = data.message.list;
                    //self.showDateToItem(data.message.list);
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
                self.tables = data.message.tables;
                self.updateAllGmaesStr(self.tables);
                for(var index = 0 ; index < data.message.list.length ; index ++) {
                    var listData = data.message.list[index];
                    var detailItem = new clubGameDetailItem(listData, index+1 , self);
                    self.detailViewList.pushBackCustomItem(detailItem);
                }
            }
        }, function (data) {
            FloatLabelUtil.comText(data.message);
            sy.scene.hideLoading();
        });


    },

    /**
     * 中途解散
     */
    getDissDetail:function(){
        if(this.Button_diss.isBright()){
            this.condition = "2,4";
            this.Button_diss.setBright(false);
        }else{
            this.condition = "4";
            this.Button_diss.setBright(true);
        }
        this.curDetailPage = 1;
        this.getDetailData(this.curDetailPage);
        cc.log("获取提前解散的房间数据",this.condition);

    },

    /**
     * 排行榜下翻
     */
    onDetailDownPage:function(){
        var detailPage = this.curDetailPage + 1;
        cc.log("获取下一页数据" , detailPage);
        this.getDetailData(detailPage);
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
        this.getDetailData(detailPage)
    },

    onClose:function(){
        this._super();
    }
});


/**
 * 局数统计详情的item
 */

var clubGameDetailItem = ccui.Widget.extend({

    ctor:function(data ,index, parentNode){
        this.data = data;
        this.index = index;
        this.parentNode = parentNode;

        this._super();
        this.setContentSize(980, 85);

        var Panel_16=this.Panel_16= UICtor.cPanel(cc.size(730,76),cc.color(150,200,255),0);
        Panel_16.setAnchorPoint(cc.p(0,0));
        Panel_16.setPosition(0,0);

        var imgBg=this.imgBg= UICtor.cImg("res/ui/dtzjulebu/julebu/Rank/gameDetailItem.png");
        imgBg.setPosition(490,46);
        Panel_16.addChild(imgBg);


        var time =this.time= UICtor.cLabel("",24,cc.size(0,0),cc.color(126,49,2),0,1);
        time.setPosition(cc.p(-423+imgBg.getAnchorPointInPoints().x, imgBg.getAnchorPointInPoints().y));
        imgBg.addChild(time);

        var tableId =this.tableId= UICtor.cLabel("",24,cc.size(0,0),cc.color(255,111,24),0,1);
        tableId.setPosition(cc.p(-253+imgBg.getAnchorPointInPoints().x, imgBg.getAnchorPointInPoints().y));
        imgBg.addChild(tableId);

        var rule = this.rule = UICtor.cLabel("",24,cc.size(0,0),cc.color(126,49,2),0,1);
        rule.setPosition(cc.p(-83+imgBg.getAnchorPointInPoints().x, imgBg.getAnchorPointInPoints().y));
        imgBg.addChild(rule);

        var dissState=this.dissState= UICtor.cLabel("无",24,cc.size(190,36),cc.color(126,49,2),1,1);
        dissState.setPosition(cc.p(112+imgBg.getAnchorPointInPoints().x, imgBg.getAnchorPointInPoints().y));
        imgBg.addChild(dissState);

        var member1=this.member1= UICtor.cLabel("",20,cc.size(100,26),cc.color(126,49,2),1,1);
        member1.setPosition(cc.p(280+imgBg.getAnchorPointInPoints().x, 16+imgBg.getAnchorPointInPoints().y));
        imgBg.addChild(member1);

        var member2=this.member2= UICtor.cLabel("",20,cc.size(100,26),cc.color(126,49,2),1,1);
        member2.setPosition(cc.p(400+imgBg.getAnchorPointInPoints().x, 16+imgBg.getAnchorPointInPoints().y));
        imgBg.addChild(member2);

        var member3=this.member3= UICtor.cLabel("",20,cc.size(100,26),cc.color(126,49,2),1,1);
        member3.setPosition(cc.p(280+imgBg.getAnchorPointInPoints().x, -16+imgBg.getAnchorPointInPoints().y));
        imgBg.addChild(member3);

        var member4=this.member4= UICtor.cLabel("",20,cc.size(100,26),cc.color(126,49,2),1,1);
        member4.setPosition(cc.p(400+imgBg.getAnchorPointInPoints().x, -16+imgBg.getAnchorPointInPoints().y));
        imgBg.addChild(member4);


        this.addChild(Panel_16);
        //添加点击事件

        //刷新俱乐部显示
        this.setData(this.data);
    },

    getWanfaStr:function(wanfa){
        var str = "";
        if (this.isDTZWanfa(wanfa)){
            str = "打筒子"
        }else if (this.isPDKWanfa(wanfa)){
            str = "跑得快"
        }else if (this.isPHZWanfa(wanfa)){
            str = "跑胡子"
        }else if (this.isBBTWanfa(wanfa)){
            str = "半边天炸"
        }
        return str;
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


    setData:function(data){
        this.time.setString(data.overTime || "");
        this.tableId.setString(data.tableId || "");
        this.rule.setString(this.getWanfaStr(parseInt(data.playType)) || "");
        var dissStr = "正常结束";
        if (data.overDetail == 2){
            dissStr = "正常结束";
        }else if (data.overDetail == 3){
            dissStr = "未开局被解散";
        }else if (data.overDetail == 4){
            dissStr = "中途解散"+ "(第"+ data.playedBureau +"局)";
        }
        this.dissState.setString(dissStr);
        var players = data.players.split(",");
        for (var i = 0; i < players.length; i++){
            var member = null;
            if (i == 0){
                member = this.member1
            }else if(i == 1){
                member = this.member2
            }else if(i == 2){
                member = this.member3
            }else if(i == 3){
                member = this.member4
            }
            //member.setString("我来测试一下");
            if (member){
                member.setString(players[i] || "");
            }
        }

    }



});



