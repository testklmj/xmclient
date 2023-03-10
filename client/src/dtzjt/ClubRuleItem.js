/**
 * Created by Administrator on 2017/7/21.
 */


var ClubRuleItem = ccui.Widget.extend({

    ctor:function(data , parentNode){
        this.data = data;
        //cc.log("ClubRuleItem",JSON.stringify(this.data));
        this.groupId = data.groupId;

        this.wanfa = "";
        this.renshu = "";
        this.startedNum = this.data.startedNum || 0;
        this.parentNode = parentNode;
        this._super();
        this.setContentSize(850, 128);

        var Panel_16=this.Panel_16= UICtor.cPanel(cc.size(850,122),cc.color(150,200,255),0);
        Panel_16.setAnchorPoint(cc.p(0,0));
        Panel_16.setPosition(0,0);
        var Button_roombg=this.Button_roombg= UICtor.cS9Img("res/ui/dtzjulebu/julebu/BagManage/newClub_33.png",cc.rect(10,10,10,10),cc.size(850,120));
        Button_roombg.setPosition(434,61);
        Panel_16.addChild(Button_roombg);
        var Label_detail=this.Label_detail= UICtor.cLabel("啊啊啊",22,cc.size(468,95),cc.color("489a91"),0,0);
        Label_detail.setAnchorPoint(cc.p(0,0.5));
        Label_detail.setPosition(cc.p(-344+Button_roombg.getAnchorPointInPoints().x, -17+Button_roombg.getAnchorPointInPoints().y));
        Button_roombg.addChild(Label_detail);
        var btn_kexuan=this.btn_kexuan= UICtor.cBtn("res/ui/dtzjulebu/julebu/BagManage/newClub_16.png");
        btn_kexuan.setPosition(cc.p(230+Button_roombg.getAnchorPointInPoints().x, 20+Button_roombg.getAnchorPointInPoints().y));
        Button_roombg.addChild(btn_kexuan);
        var btn_kexuan_1=this.btn_kexuan_1= UICtor.cBtn("res/ui/dtzjulebu/julebu/BagManage/newClub_15.png");
        btn_kexuan_1.setPosition(cc.p(230+Button_roombg.getAnchorPointInPoints().x, 20+Button_roombg.getAnchorPointInPoints().y));
        Button_roombg.addChild(btn_kexuan_1);
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
        var Label_bagNum=this.Label_bagNum= UICtor.cLabel("玩法类型：",22,cc.size(0,0),cc.color("487e9a"),0,1);
        Label_bagNum.setPosition(cc.p(230+Button_roombg.getAnchorPointInPoints().x, -37+Button_roombg.getAnchorPointInPoints().y));
        Button_roombg.addChild(Label_bagNum);


        this.btn_kexuan.visible = false;
        this.addChild(Panel_16);
        ////添加点击事件
        UITools.addClickEvent(btn_kexuan, this, this.onClickTrue);//onClick
        ////添加点击事件
        UITools.addClickEvent(btn_kexuan_1, this, this.onClickCancel);//onClick

        //Panel_16.setTouchEnabled(true);
        ////添加点击事件
        UITools.addClickEvent(Button_roombg, this, this.onClickCancel);//onClick

        //刷新俱乐部显示
        this.setData(this.data);
    },

    onClickTrue:function(obj){
        this.btn_kexuan.visible = true;
        this.btn_kexuan_1.visible = false;
    },

    onClickCancel:function(){
        this.btn_kexuan.visible = true;
        this.btn_kexuan_1.visible = false;
        if (this.parentNode){
            this.parentNode.refreshClubRuleChoose(this.modeId);
        }
    },

    showBtnState:function(modeId){
        if (modeId == this.modeId){
            this.btn_kexuan.visible = true;
            this.btn_kexuan_1.visible = false;
        }else{
            this.btn_kexuan.visible = false;
            this.btn_kexuan_1.visible = true;
        }
    },

    updateWanfaTip:function(modeId){
        if (modeId == this.modeId) {
            SyEventManager.dispatchEvent(SyEvent.UPDATE_SHOW_BAGWANFA, {modeId: this.modeId});
        }
    },

    setData:function(itemData){
        if (this.groupId){
            this.BitmapLabel_order.setString("" + this.groupId);
        }
        var creditStr = "";
        //显示游戏和房间
        var createPara = itemData.config.modeMsg.split(",");
        var gameStr = ClubRecallDetailModel.getGameName(createPara) || "";
        var wanfaStr = ClubRecallDetailModel.getWanfaStr(itemData.config.modeMsg,true) || "";
        var str = "                      ";

        if (itemData.config.creditMsg && itemData.config.creditMsg[0]){
            creditStr = "比赛房";
        }

        this.Label_wanfaType.setString("" +gameStr);

        var nameStr = itemData.groupName;
        nameStr = UITools.truncateLabel(nameStr,7);
        this.Label_bagName.setString(""+nameStr);
        this.Label_detail.setString(str + "" +wanfaStr + creditStr);

        if (parseInt(this.startedNum) >= 50){
            this.startedNum = 50;
        }

        this.Label_bagNum.setString("" + this.startedNum + "桌正在牌局");

        this.modeId = itemData.config.keyId;

        if (this.parentNode.modeId){
            if (this.parentNode.modeId == this.modeId){
                this.showBtnState(this.modeId);
            }
        //}else{
        //    if (this.groupId == 1){
        //        this.onClickCancel();
        //    }
        }
    },

    getBagId:function(){
        return this.groupId;
    },
});

