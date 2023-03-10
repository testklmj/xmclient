/**
 * Created by leiwenwen on 2018/10/15.
 */
/**
 * 亲友圈所有小组的item
 */
var ClubCreditTeamCell = ccui.Widget.extend({
    ctor:function(data,root,index,configCount,viewTeamUser,myRate){
        this.data = data;
        this.parentNode = root;
        this.myRate = myRate || 100;

        this.configCount = configCount || 0;
        this.viewTeamUser = viewTeamUser || 0;

        this._super();
        this.setContentSize(956, 114);

        var Panel_21=this.Panel_21= UICtor.cPanel(cc.size(956,104),cc.color(150,200,255),0);
        Panel_21.setAnchorPoint(cc.p(0,0));
        Panel_21.setPosition(0,0);
        var Image_bg=this.Image_bg= UICtor.cImg("res/ui/dtzjulebu/julebu/Credit/img_1.png");
        Image_bg.setPosition(478,52);
        Panel_21.addChild(Image_bg);
        var Image_head=this.Image_head= UICtor.cImg("res/ui/dtzjulebu/julebu/Rank/icon.png");
        Image_head.setPosition(cc.p(-251+Image_bg.getAnchorPointInPoints().x, 2+Image_bg.getAnchorPointInPoints().y));
        Image_bg.addChild(Image_head);
        var Label_name=this.Label_name= UICtor.cLabel("100",25,cc.size(130,30),cc.color("238B76"),1,0);
        Label_name.setPosition(cc.p(-392+Image_bg.getAnchorPointInPoints().x, 0+Image_bg.getAnchorPointInPoints().y));
        Image_bg.addChild(Label_name);
        var Label_id=this.Label_id= UICtor.cLabel("100",25,cc.size(0,0),cc.color("238B76"),0,0);
        Label_id.setPosition(cc.p(-16+Image_bg.getAnchorPointInPoints().x, 0+Image_bg.getAnchorPointInPoints().y));
        Image_bg.addChild(Label_id);
        var Label_score=this.Label_score= UICtor.cLabel("100",25,cc.size(0,0),cc.color("238B76"),0,0);
        Label_score.setPosition(cc.p(124+Image_bg.getAnchorPointInPoints().x, 0+Image_bg.getAnchorPointInPoints().y));
        Image_bg.addChild(Label_score);
        var Button_ratio=this.Button_ratio= UICtor.cBtn("res/ui/dtzjulebu/julebu/Credit/img_42.png");
        Button_ratio.setPosition(cc.p(414+Image_bg.getAnchorPointInPoints().x, 0+Image_bg.getAnchorPointInPoints().y));
        Image_bg.addChild(Button_ratio);
        var Label_ratio=this.Label_ratio= UICtor.cLabel("100",25,cc.size(0,0),cc.color("238B76"),0,0);
        Label_ratio.setPosition(cc.p(281+Image_bg.getAnchorPointInPoints().x, 0+Image_bg.getAnchorPointInPoints().y));
        Image_bg.addChild(Label_ratio);
        var Label_teamName=this.Label_teamName= UICtor.cLabel("100",25,cc.size(130,30),cc.color("238B76"),0,0);
        Label_teamName.setAnchorPoint(cc.p(0,0.5));
        Label_teamName.setPosition(cc.p(-207+Image_bg.getAnchorPointInPoints().x, 22+Image_bg.getAnchorPointInPoints().y));
        Image_bg.addChild(Label_teamName);
        var Label_teamId=this.Label_teamId= UICtor.cLabel("100",25,cc.size(130,30),cc.color("238B76"),0,0);
        Label_teamId.setAnchorPoint(cc.p(0,0.5));
        Label_teamId.setPosition(cc.p(-207+Image_bg.getAnchorPointInPoints().x, -15+Image_bg.getAnchorPointInPoints().y));
        Image_bg.addChild(Label_teamId);


        this.addChild(Panel_21);

        //if (!this.parentNode.isClubCreaterOrLeader){
        //    Button_ratio.visible = false;
        //}


        Panel_21.setTouchEnabled(true);
        UITools.addClickEvent(Button_ratio,this,this.onOpenRatio);
        UITools.addClickEvent(Panel_21,this,this.onTeamDetail);

        this.setData(data)
    },

    onTeamDetail: function() {
        if (this.viewTeamUser){
            var data = {};
            data.teamId = this.opUserId;
            ClickCreditTeamModel.init(data);
            this.parentNode.onShowCreditItem(1,true);
        }
    },

    onOpenRatio: function(obj) {
        //cc.log("onOpenRatio==",this.myRate)
        var mc = new ClubCreditRatioPop(this);
        PopupManager.addPopup(mc);

        //var mc = new ClubAgentManagePop(this);
        //PopupManager.addPopup(mc);
    },

    //显示数据
    setData:function(data){
        //cc.log("setData====",JSON.stringify(data));
        this.opUserId = data.userId;
        this.userGroup = data.userGroup || 0;
        this.userGroup = Number(this.userGroup);
        var score = data.sumCredit || 0;
        var teamRadit = this.teamRadit = data.creditCommissionRate || 0;
        var groupRadit = this.myRate - teamRadit;
        this.Label_name.setString(""+data.teamName);
        this.Label_teamName.setString(""+data.name);
        this.Label_teamId.setString(""+data.userId);
        this.Label_id.setString(""+data.memberCount);
        this.Label_score.setString(""+score);
        this.Label_ratio.setString(""+teamRadit + "/"+ groupRadit);
        //this.Label_ratio.setString("");
        //cc.log("this.userGroup",this.userGroup)
        this.Button_ratio.visible = false;
        if (data.canSet){
            this.Button_ratio.visible = true;
        }
        //cc.log("this.configCount",this.configCount,data.ownConfigCount)
        //var stateStr = "未设置";
        //if (data.ownConfigCount && data.ownConfigCount >= this.configCount){
        //    stateStr = "已设置";
        //}
        //this.Label_ratio.setString("" +stateStr);

        this.showIcon(data.headimgurl , 1);
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
    }
})