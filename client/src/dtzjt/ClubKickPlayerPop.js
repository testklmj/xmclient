/**
 * Created by leiwenwen on 2018/10/15.
 */

var ClubKickPlayerCell = ccui.Widget.extend({
    ctor:function(data,root,index){
        this._super();

        this.index = index;
        this.data = data;
        this.root = root;

        //cc.log("ClubKickPlayerCell",JSON.stringify(data));

        this.isSelect = data.isSelect || false;
        this.setContentSize(956, 109);

        var Panel_21=this.Panel_21= UICtor.cPanel(cc.size(956,104),cc.color(150,200,255),0);
        Panel_21.setAnchorPoint(cc.p(0,0));
        Panel_21.setPosition(0,0);
        var Image_bg=this.Image_bg= UICtor.cImg("res/ui/dtzjulebu/julebu/Credit/img_1.png");
        Image_bg.setPosition(478,52);
        Panel_21.addChild(Image_bg);
        var Image_head=this.Image_head= UICtor.cImg("res/ui/dtzjulebu/julebu/Rank/icon.png");
        Image_head.setPosition(cc.p(-407+Image_bg.getAnchorPointInPoints().x, 2+Image_bg.getAnchorPointInPoints().y));
        Image_bg.addChild(Image_head);
        var Label_name=this.Label_name= UICtor.cLabel("100",24,cc.size(0,0),cc.color(138,75,14),1,0);
        Label_name.setPosition(cc.p(-121+Image_bg.getAnchorPointInPoints().x, 0+Image_bg.getAnchorPointInPoints().y));
        Image_bg.addChild(Label_name);
        var Label_id=this.Label_id= UICtor.cLabel("100",24,cc.size(0,0),cc.color(138,75,14),0,0);
        Label_id.setPosition(cc.p(145+Image_bg.getAnchorPointInPoints().x, 0+Image_bg.getAnchorPointInPoints().y));
        Image_bg.addChild(Label_id);
        var Button_choose=this.Button_choose= UICtor.cBtn("res/ui/dtz/dtzCreateRoom/btn2_1.png");
        Button_choose.setPosition(cc.p(369+Image_bg.getAnchorPointInPoints().x, 0+Image_bg.getAnchorPointInPoints().y));
        Image_bg.addChild(Button_choose);

        Button_choose.loadTextureDisabled("res/ui/dtz/dtzCreateRoom/btn2_2.png", 0);
        this.addChild(Panel_21);

        UITools.addClickEvent(Button_choose,this,this.onChoose);

        this.setData(data);

        //cc.log("this.isSelect",this.isSelect);

        if (this.isSelect){
            this.Button_choose.setBright(false);
        }else{
            this.Button_choose.setBright(true);
        }
    },

    //显示数据
    setData:function(data){
        if (data.userName){
            var nameStr = data.userName;
            nameStr = UITools.truncateLabel(nameStr,6);
            this.Label_name.setString(""+nameStr);
        }

        if (data.userId){
            this.Label_id.setString("" + data.userId);
        }
        //this.Label_id.setString(""+ this.index);

        this.showIcon(data.headimgurl);
    },

    showIcon: function (iconUrl, sex) {
        //iconUrl = "http://wx.qlogo.cn/mmopen/25FRchib0VdkrX8DkibFVoO7jAQhMc9pbroy4P2iaROShWibjMFERmpzAKQFeEKCTdYKOQkV8kvqEW09mwaicohwiaxOKUGp3sKjc8/0";
        var icon = this.Image_head;
        var sex = sex || 1;
        var defaultimg = (sex == 1) ? "res/ui/dtz/images/default_m.png" : "res/ui/dtz/images/default_w.png";

        if(icon.curShowIconUrl == null || (icon.curShowIconUrl != iconUrl)) {//头像不同才加载
            if (icon.getChildByTag(345)) {
                icon.removeChildByTag(345);
            }
            var sprite = new cc.Sprite(defaultimg);
            sprite.x = icon.width * 0.5;
            sprite.y = icon.height * 0.5;
            icon.addChild(sprite, 5, 345);
            if (iconUrl) {
                cc.loader.loadImg(iconUrl, {width: 252, height: 252}, function (error, img) {
                    if (!error) {
                        if (sprite) {
                            sprite.setTexture(img);
                            icon.curShowIconUrl = iconUrl
                        }
                    }
                });
            }
        }
    },


    onChoose: function(){
        if (this.Button_choose.isBright()){
            this.isSelect = true;
            this.Button_choose.setBright(false);
            this.root.curNum = this.root.curNum + 1;
        }else{
            this.isSelect = false;
            this.Button_choose.setBright(true);
            this.root.curNum = this.root.curNum - 1;
        }
        this.root.showChooseNum(this.root.curNum);
        this.data.isSelect = this.isSelect;
    }

})

var ClubKickPlayerPop = BasePopup.extend({
    ctor:function(data){
        this.data = data || null;
        this.allChoose = true;
        this.allNum = 0;
        this.curNum = 0;
        //cc.log("ClubBagManagePop",JSON.stringify(this.data));
        this._super("res/clubKickPlayerPop.json");
    },

    selfRender:function(){

        var closeBtn = this.getWidget("close_btn");  // 前往大厅
        if(closeBtn){
            UITools.addClickEvent(closeBtn,this,this.onClose);
        }

        var Button_all = this.Button_all = this.getWidget("Button_all");  // 全选
        Button_all.setBright(true);
        if(Button_all){
            UITools.addClickEvent(Button_all,this,this.onAll);
        }

        var Button_kick = this.getWidget("Button_kick");  // 踢出
        //Button_kick.setBright(false);
        if(Button_kick){
            UITools.addClickEvent(Button_kick,this,this.onKick);
        }


        this.ListView_rule = this.getWidget("ListView_rule");


        //今天昨天前天文字
        var widgetsDate = {"Button_month1":1,"Button_month2":2,"Button_month3":3};
        this.addClickEvent(widgetsDate,this.onDateClick);
        this.onDateClick(this.Button_month1);


        var btnRankLeft = this.getWidget("btnDataLeft");
        if(btnRankLeft){
            UITools.addClickEvent(btnRankLeft , this , this.onDetailUpPage);
        }

        var btnRankRight = this.getWidget("btnDataRight");
        if(btnRankRight){
            UITools.addClickEvent(btnRankRight , this , this.onDetailDownPage);
        }

        this.labelNoData = this.getWidget("labelNoData");//暂无数据
        this.labelNoData.visible = false;


        this.Label_8 = this.getWidget("Label_8");
        this.Label_8.setString("");

        this.lbDataPage = this.getWidget("lbDataPage");
        this.lbDataPage.setString("");

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

    /**
     * 排行榜上翻
     */
    onDetailUpPage:function(){
        var detailPage = this.curPage;
        if (this.curPage > 1){
            detailPage = this.curPage - 1;
        }else{
            FloatLabelUtil.comText("没有更多数据了");
            return;
        }
        this.onShowPlayerItem(detailPage);
    },


    /**
     * 排行榜下翻
     */
    onDetailDownPage:function(){
        var detailPage = this.curPage + 1;
        this.onShowPlayerItem(detailPage);
    },


    //选择第几天
    onDateClick:function(obj){
        var clickId = parseInt(obj.temp);
        if (this.date == 0 || this.date != clickId){
            var values = [1,2,3];
            for(var i=1;i<=values.length;i++){
                if(i != clickId){
                    this["Button_month" + i].setBright(false);
                }else{
                    this["Button_month" + i].setBright(true);
                }
            }
            this.getkickPlayerData(clickId)
        }

    },

    getkickPlayerData: function(dateType){
        var self = this;
        NetworkJT.loginReq("groupAction", "loadInactiveUserList", {
                groupId:ClickClubModel.getCurClubId() ,
                sessCode:PlayerModel.sessCode,
                userId:PlayerModel.userId,
                dateType:dateType
            },
            function (data) {
                if (data) {
                    self.ListView_rule.removeAllItems();
                    cc.log("loadInactiveUserList::"+JSON.stringify(data));
                    self.data = data.message.list;
                    self.curPage = 1;
                    self.lbDataPage.setString(""+self.curPage);
                    self.onShowPageData();
                    var allNum = 0;
                    if (data && data.message && data.message.list){
                        allNum = data.message.list.length;
                    }
                    if (allNum > 0){
                        self.labelNoData.visible = false;
                    }else{
                        self.labelNoData.visible = true;
                    }
                    self.allNum = allNum;
                    self.curNum = allNum;
                    self.showChooseNum();
                }
            }, function (data) {
                FloatLabelUtil.comText(data.message);
            }
        );
    },

    showChooseNum: function(){
        this.Label_8.setString("共"+this.allNum+"条,已选中"+this.curNum+"条");
        if (this.allNum == this.curNum){
            this.allChoose = true;
            this.Button_all.setBright(true);
        }else{
            this.allChoose = false;
            this.Button_all.setBright(false);
        }
    },

    onAll: function(){
        if (this.Button_all.isBright()){
            this.allChoose = false;
            this.Button_all.setBright(false);
            this.curNum = 0;
        }else{
            this.allChoose = true;
            this.Button_all.setBright(true);
            this.curNum = this.allNum;
        }
        this.showChooseNum();
        this.onDealPageData(this.curPage);
    },

    onShowPageData: function(){
        this.allChoose = true;
        this.Button_all.setBright(true);
        this.onDealPageData(this.curPage);
    },

    onKick: function(){
        var userIds = this.getchooseUsers();
        if (userIds && userIds.length > 0){
            var self = this;
            AlertPop.show("确认一键踢出已选中的玩家吗？",function(){
                NetworkJT.loginReq("groupAction", "fireInactiveUser", {
                        sessCode:PlayerModel.sessCode,
                        userId:PlayerModel.userId,
                        userIds:userIds,
                        groupId:ClickClubModel.getCurClubId()
                    },
                    function (data) {
                        if (data) {
                            cc.log("fireInactiveUser::"+JSON.stringify(data));
                            if (data.message){
                                FloatLabelUtil.comText(data.message);
                            }
                            PopupManager.remove(self);
                        }
                    }, function (data) {
                        FloatLabelUtil.comText(data.message);
                    }
                );
            })
        }
    },

    onDealPageData : function(_curPage){
        this.pageList = [];
        this.curPage = 1;
        this.maxPageSize = 20;//每页最多显示多少条
        var isSelect = false;
        if (this.allChoose){
            isSelect = true;
        }
        //cc.log("this.datathis.data==",JSON.stringify(this.data));
        if (this.data){
            var index = 0;
            for (var i = 0 ; i < this.data.length ;i++) {
                this.data[i].isSelect = isSelect;
                index = Math.floor(i/this.maxPageSize) + 1;
                if (!(i%this.maxPageSize)){
                    this.pageList[index] = [];
                    //cc.log("index===",index)
                }
                this.pageList[index].push(this.data[i]);
            }
            this.onShowPlayerItem(_curPage);
        }

    },

    //显示所有的包厢
    onShowPlayerItem : function(_curPage){
        if (this.pageList[_curPage]){
            this.curPage = _curPage || 1;
            this.lbDataPage.setString(""+this.curPage);
            this.ListView_rule.removeAllItems();
            for (var i = 0; i < this.pageList[this.curPage].length ;i++) {
                var data = this.pageList[this.curPage];
                var bagItem = new ClubKickPlayerCell(data[i], this,i+1);
                this.ListView_rule.pushBackCustomItem(bagItem);
            }
            //for (var i = 0; i < 10 ;i++) {
            //    var data = [];
            //    var bagItem = new ClubKickPlayerCell(data[i], this,i+1);
            //    this.ListView_rule.pushBackCustomItem(bagItem);
            //}
        }else{
            FloatLabelUtil.comText("没有更多数据了");
        }
    },

    getchooseUsers: function(){
        var userIds = [];
        if (this.pageList){
            for (var i = 0; i < this.pageList.length ;i++) {
                var pageList =  this.pageList[i];

                if (pageList && pageList.length > 0){
                    //cc.log("pageList===",JSON.stringify(pageList))
                    for (var j = 0; j < pageList.length ;j++) {
                        var data = pageList[j];
                        if (data.isSelect){
                            userIds.push(data.userId);
                        }
                    }
                }
            }
        }
        //cc.log("userIds",JSON.stringify(userIds))
        return userIds;
    },

    onClose : function(){
        PopupManager.remove(this);
    }

})