/**
 * Created by leiwenwen on 2018/10/15.
 */


var ClubBagCell = ccui.Widget.extend({
    ctor:function(data,root){
        this._super();

        this.data = data;
        this.keyID = 0;
        this.bagKeyID = 0;
        var temp  = this.temp = data.groupId;
        this.root = root;
        this.groupState = 1;

        this.setContentSize(869, 128);


        var Panel_16=this.Panel_16= UICtor.cPanel(cc.size(869,122),cc.color(150,200,255),0);
        Panel_16.setAnchorPoint(cc.p(0,0));
        Panel_16.setPosition(0,0);
        var Button_roombg=this.Button_roombg= UICtor.cS9Img("res/ui/dtzjulebu/julebu/BagManage/newClub_33.png",cc.rect(10,10,10,10),cc.size(850,120));
        Button_roombg.setPosition(434,61);
        Panel_16.addChild(Button_roombg);
        var Label_detail=this.Label_detail= UICtor.cLabel("",22,cc.size(468,95),cc.color("489a91"),0,0);
        Label_detail.setAnchorPoint(cc.p(0,0.5));
        Label_detail.setPosition(cc.p(-344+Button_roombg.getAnchorPointInPoints().x, -17+Button_roombg.getAnchorPointInPoints().y));
        Button_roombg.addChild(Label_detail);

        var openBtn=this.openBtn= UICtor.cBtn("res/ui/dtz/dtzCreateRoom/btn_1.png");
        openBtn.setPosition(cc.p(164+Button_roombg.getAnchorPointInPoints().x, -35+Button_roombg.getAnchorPointInPoints().y));
        Button_roombg.addChild(openBtn);
        var txt_switch1=this.txt_switch1= UICtor.cLabel("关闭入口",20,cc.size(0,0),cc.color("487e9a"),0,1);
        txt_switch1.setAnchorPoint(cc.p(0,0.5));
        txt_switch1.setPosition(cc.p(23+openBtn.getAnchorPointInPoints().x, 0+openBtn.getAnchorPointInPoints().y));
        txt_switch1.setLocalZOrder(1);
        openBtn.addChild(txt_switch1);
        var chooseBtn=this.chooseBtn= UICtor.cBtn("res/ui/dtz/dtzCreateRoom/btn_2.png");
        chooseBtn.setPosition(cc.p(164+Button_roombg.getAnchorPointInPoints().x, -35+Button_roombg.getAnchorPointInPoints().y));
        Button_roombg.addChild(chooseBtn);
        var txt_switch2=this.txt_switch2= UICtor.cLabel("关闭入口",20,cc.size(0,0),cc.color("487e9a"),0,1);
        txt_switch2.setAnchorPoint(cc.p(0,0.5));
        txt_switch2.setPosition(cc.p(23+chooseBtn.getAnchorPointInPoints().x, 0+chooseBtn.getAnchorPointInPoints().y));
        txt_switch2.setLocalZOrder(1);
        chooseBtn.addChild(txt_switch2);

        var renameBtn=this.renameBtn= UICtor.cBtn("res/ui/dtzjulebu/julebu/BagManage/newClub_5.png");
        renameBtn.setPosition(cc.p(350+Button_roombg.getAnchorPointInPoints().x, 20+Button_roombg.getAnchorPointInPoints().y));
        Button_roombg.addChild(renameBtn);
        renameBtn.scale = 0.9
        var changeBtn=this.changeBtn= UICtor.cBtn("res/ui/dtzjulebu/julebu/BagManage/newClub_13.png");
        changeBtn.setPosition(cc.p(205+Button_roombg.getAnchorPointInPoints().x, 20+Button_roombg.getAnchorPointInPoints().y));
        Button_roombg.addChild(changeBtn);
        changeBtn.scale = 0.9
        var Image_74=this.Image_74= UICtor.cImg("res/ui/dtzjulebu/julebu/BagManage/newClub_14.png");
        Image_74.setPosition(cc.p(-388+Button_roombg.getAnchorPointInPoints().x, 0+Button_roombg.getAnchorPointInPoints().y));
        Button_roombg.addChild(Image_74);

        var BitmapLabel_order = this.BitmapLabel_order = new cc.LabelBMFont( 1 + "", "res/font/font_res_choose.fnt");
        BitmapLabel_order.setPosition(cc.p(-1+Image_74.getAnchorPointInPoints().x, 0+Image_74.getAnchorPointInPoints().y));
        Image_74.addChild(BitmapLabel_order);

        var Label_name=this.Label_name= UICtor.cLabel("包厢名：",22,cc.size(0,0),cc.color("487e9a"),0,1);
        Label_name.setAnchorPoint(cc.p(0,0.5));
        Label_name.setPosition(cc.p(-347+Button_roombg.getAnchorPointInPoints().x, 45+Button_roombg.getAnchorPointInPoints().y));
        Button_roombg.addChild(Label_name);
        var Label_bagName=this.Label_bagName= UICtor.cLabel("打筒子包厢名字啊",22,cc.size(180,27),cc.color("489a91"),0,1);
        Label_bagName.setAnchorPoint(cc.p(0,0.5));
        Label_bagName.setPosition(cc.p(-260+Button_roombg.getAnchorPointInPoints().x, 45+Button_roombg.getAnchorPointInPoints().y));
        Button_roombg.addChild(Label_bagName);
        var Label_wanfa=this.Label_wanfa= UICtor.cLabel("玩法类型：",22,cc.size(0,0),cc.color("487e9a"),0,1);
        Label_wanfa.setAnchorPoint(cc.p(0,0.5));
        Label_wanfa.setPosition(cc.p(-76+Button_roombg.getAnchorPointInPoints().x, 43+Button_roombg.getAnchorPointInPoints().y));
        Button_roombg.addChild(Label_wanfa);
        var Label_wanfaType=this.Label_wanfaType= UICtor.cLabel("跑胡子啊",22,cc.size(0,0),cc.color("489a91"),0,1);
        Label_wanfaType.setAnchorPoint(cc.p(0,0.5));
        Label_wanfaType.setPosition(cc.p(34+Button_roombg.getAnchorPointInPoints().x, 44+Button_roombg.getAnchorPointInPoints().y));
        Button_roombg.addChild(Label_wanfaType);
        var Label_wanfaDetail=this.Label_wanfaDetail= UICtor.cLabel("玩法详情：",22,cc.size(0,0),cc.color("487e9a"),0,1);
        Label_wanfaDetail.setAnchorPoint(cc.p(0,0.5));
        Label_wanfaDetail.setPosition(cc.p(-347+Button_roombg.getAnchorPointInPoints().x, 15+Button_roombg.getAnchorPointInPoints().y));
        Button_roombg.addChild(Label_wanfaDetail);

        this.addChild(Panel_16);


        //addBtn.temp = temp;
        openBtn.temp = temp;
        chooseBtn.temp = temp;
        renameBtn.temp = temp;
        changeBtn.temp = temp;
        //numberBtn.temp = temp;
        //deleteBtn.temp = temp;

        UITools.addClickEvent(openBtn,this,this.onSwitch);
        UITools.addClickEvent(chooseBtn,this,this.onSwitch);
        UITools.addClickEvent(renameBtn,this,this.onReName);
        UITools.addClickEvent(changeBtn,this,this.onChange);

        if (data){
            this.keyID = data.keyId;
            this.groupState = data.groupState;
            this.bagKeyID = data.config.keyId;
        }

        this.setData(data);
    },

    //显示数据
    setData:function(data){
        if (this.temp){
            this.BitmapLabel_order.setString("" + this.temp);
        }
        //显示游戏和房间
        var createPara = data.config.modeMsg.split(",");
        var gameStr = ClubRecallDetailModel.getGameName(createPara) || "";
        var creditStr = "";
        var wanfaStr = ClubRecallDetailModel.getWanfaStr(data.config.modeMsg,true) || "";
        var str = "                      ";
        if (data.config.creditMsg && data.config.creditMsg[0]){
            creditStr = "比赛房";
        }
        this.Label_wanfaType.setString("" +gameStr);
        var nameStr = data.groupName;
        nameStr = UITools.truncateLabel(nameStr,7);
        this.Label_bagName.setString(""+nameStr);
        this.Label_detail.setString(str + "" +wanfaStr + creditStr);

        this.showSwitch()
    },

    /**
     * 获取内部元素
     * @param name  部件名
     */
    getMyWidget: function(root,name){
        return ccui.helper.seekWidgetByName(root,name);
    },

    showSwitch: function(){
        if (this.groupState == 1){
            this.openBtn.visible = true;
            this.chooseBtn.visible = false;
        }else{
            this.openBtn.visible = false;
            this.chooseBtn.visible = true;
        }
    },


    /**
     * 入口开关
     */
    onSwitch: function(obj){
        var temp = obj.temp;
        var groupState = this.groupState;
        var desc = "";
        if (this.groupState == 0){
            groupState = 1;
            desc = "开启入口，确定开启吗？";
        }else{
            groupState = 0;
            desc = "关闭入口，确定关闭吗？";
        }
        var self = this;
        AlertPop.show(desc,function() {
            NetworkJT.loginReq("groupAction", "updateGroupInfo", {
                groupName: self.data.groupName, groupMode: 0,
                keyId: self.keyID, groupId: ClickClubModel.clickClubId, groupState: groupState,
                userId: PlayerModel.userId, subId: temp
            }, function (data) {
                if (data) {
                    self.groupState = groupState;
                    self.showSwitch();
                    PopupManager.remove(self.root);
                    SyEventManager.dispatchEvent(SyEvent.GET_CLUB_ALLBAGS);
                }
            }, function (data) {
                FloatLabelUtil.comText(data.message);
            });
        })
    },

    /**
     * 修改包厢名称
     */
    onReName: function(obj){
        var temp  = obj.temp;
        PopupManager.addPopup(new ClubBagNamePop(this.keyID, temp));
    },


    /**
     * 修改包厢内容
     */
    onChange: function(obj){
        var temp  = obj.temp;
        var isSaveChoose = true;
        var isLeaderPay = ClickClubModel.getClubIsOpenLeaderPay();
        var wanfaList = this.data.config.modeMsg.split(",") || [];
        var creditMsg = this.data.config.creditMsg.split(",") || [];
        var name = this.data.groupName;

        var curWanFaList = [];
        for (var i = 0; i < wanfaList.length ;i++) {
            var data = parseInt(wanfaList[i]);
            curWanFaList.push(data);
        }
        var mc = new CreateRoomTotalPop(this.bagKeyID,ClickClubModel.getCurClubId(),ClickClubModel.getCurClubRole() ,curWanFaList,isSaveChoose,isLeaderPay,temp,name,creditMsg);
        PopupManager.addPopup(mc);
    },

    /**
     * 进入某个包厢
     */
    onJoinBag: function(obj){
        var temp  = obj.temp;
        if (this.data){
            cc.log("进入包厢"+temp);
            var index = temp;
            ComReq.comReqGetClubRoomsData([ClickClubModel.getCurClubId(), 1, 100, 1, 1],["" + index ]);
        }
        PopupManager.remove(this.root);
    },

    /**
     * 删除某个包厢
     * userId	玩家id（必填）
     * keyId	记录id（必填）
     * groupId 包厢IDid（必填）
     */

    onDeleteBag:function(obj){
        var temp = obj.temp;
        var that = this;
        cc.log("this.bagKeyID=="+this.bagKeyID);
        var desc = "删除包厢，确认删除吗？";
        AlertPop.show(desc,function() {
            NetworkJT.loginReq("groupAction", "deleteTableConfig", {userId:PlayerModel.userId,keyId:that.bagKeyID,
                groupId:ClickClubModel.getCurClubId()}, function (data) {
                if (data) {
                    cc.log("deleteBag::"+JSON.stringify(data));
                    PopupManager.remove(that.root);
                    FloatLabelUtil.comText("删除成功");
                    SyEventManager.dispatchEvent(SyEvent.GET_CLUB_ALLBAGS);
                }
            }, function (data) {
                cc.log("deleteBag::"+JSON.stringify(data));
                FloatLabelUtil.comText(data.message);
            });
        })

    },



})

var ClubBagManagePop = BasePopup.extend({
    ctor:function(data){
        this.data = data;
        //cc.log("ClubBagManagePop",JSON.stringify(this.data));
        this._super("res/clubBagManagePop.json");
    },

    selfRender:function(){

        var closeBtn = this.getWidget("close_btn");  // 前往大厅
        if(closeBtn){
            UITools.addClickEvent(closeBtn,this,this.onClose);
        }

        var Button_add = this.getWidget("Button_add");  // 前往大厅
        if(Button_add){
            UITools.addClickEvent(Button_add,this,this.onAdd);
        }

        this.ListView_rule = this.getWidget("ListView_rule");

        this.addCustomEvent(SyEvent.UPDATE_CLUB_BAGS,this,this.onRefreshBagsData);
        this.addCustomEvent(SyEvent.CLOSE_CLUB_BAGS,this,this.onClose);
        this.onShowBagItem();
    },

    onRefreshBagsData: function(event){
        var tData = event.getUserData();
        this.data = tData;
        this.onShowBagItem();
    },

    /**
     * 添加玩法
     */
    onAdd: function(obj){
        var temp  = 0;
        var isSaveChoose = true;
        var isLeaderPay = ClickClubModel.getClubIsOpenLeaderPay();

        var mc = new CreateRoomTotalPop(0,ClickClubModel.getCurClubId(),ClickClubModel.getCurClubRole() ,[],isSaveChoose,isLeaderPay,0);
        PopupManager.addPopup(mc);
    },

    //显示所有的包厢
    onShowBagItem : function(){
        if (this.data){
            for (var i = 0; i < this.data.length ;i++) {
                var bagItem = new ClubBagCell(this.data[i], this);
                this.ListView_rule.pushBackCustomItem(bagItem);
            }
        }
    },

    onClose : function(){
        PopupManager.remove(this);
    }

})