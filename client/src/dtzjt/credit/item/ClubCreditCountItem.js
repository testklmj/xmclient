/**
 * Created by leiwenwen on 2018/10/15.
 */
/**
 * 赠送统计的小组Item
 */
var ClubCreditCountItem = ccui.Widget.extend({
    ctor:function(data,root,index){
        this.data = data;
        this.parentNode = root;

        this._super();
        this.setContentSize(956, 114);

        var Panel_21=this.Panel_21= UICtor.cPanel(cc.size(956,104),cc.color(150,200,255),0);
        Panel_21.setAnchorPoint(cc.p(0,0));
        Panel_21.setPosition(0,0);
        var Image_bg=this.Image_bg= UICtor.cImg("res/ui/dtzjulebu/julebu/Credit/img_1.png");
        Image_bg.setPosition(478,52);
        Panel_21.addChild(Image_bg);
        var Image_head=this.Image_head= UICtor.cImg("res/ui/dtzjulebu/julebu/Rank/icon.png");
        Image_head.setPosition(cc.p(-281+Image_bg.getAnchorPointInPoints().x, 2+Image_bg.getAnchorPointInPoints().y));
        Image_bg.addChild(Image_head);
        var Label_name=this.Label_name= UICtor.cLabel("100",25,cc.size(130,30),cc.color(126,49,2),1,0);
        Label_name.setPosition(cc.p(-409+Image_bg.getAnchorPointInPoints().x, 0+Image_bg.getAnchorPointInPoints().y));
        Image_bg.addChild(Label_name);
        var Label_number=this.Label_number= UICtor.cLabel("100",25,cc.size(0,0),cc.color(126,49,2),0,0);
        Label_number.setPosition(cc.p(-72+Image_bg.getAnchorPointInPoints().x, 0+Image_bg.getAnchorPointInPoints().y));
        Image_bg.addChild(Label_number);
        var Label_jushu=this.Label_jushu= UICtor.cLabel("100",25,cc.size(0,0),cc.color(126,49,2),0,0);
        Label_jushu.setPosition(cc.p(95+Image_bg.getAnchorPointInPoints().x, 0+Image_bg.getAnchorPointInPoints().y));
        Image_bg.addChild(Label_jushu);
        var Label_ratio=this.Label_ratio= UICtor.cLabel("100",25,cc.size(0,0),cc.color(126,49,2),0,0);
        Label_ratio.setPosition(cc.p(260+Image_bg.getAnchorPointInPoints().x, 0+Image_bg.getAnchorPointInPoints().y));
        Image_bg.addChild(Label_ratio);
        var Label_teamName=this.Label_teamName= UICtor.cLabel("100",25,cc.size(130,30),cc.color(126,49,2),0,0);
        Label_teamName.setAnchorPoint(cc.p(0,0.5));
        Label_teamName.setPosition(cc.p(-237+Image_bg.getAnchorPointInPoints().x, 22+Image_bg.getAnchorPointInPoints().y));
        Image_bg.addChild(Label_teamName);
        var Label_teamId=this.Label_teamId= UICtor.cLabel("100",25,cc.size(130,30),cc.color(126,49,2),0,0);
        Label_teamId.setAnchorPoint(cc.p(0,0.5));
        Label_teamId.setPosition(cc.p(-237+Image_bg.getAnchorPointInPoints().x, -15+Image_bg.getAnchorPointInPoints().y));
        Image_bg.addChild(Label_teamId);
        var Label_score=this.Label_score= UICtor.cLabel("100",25,cc.size(0,0),cc.color(126,49,2),0,0);
        Label_score.setPosition(cc.p(408+Image_bg.getAnchorPointInPoints().x, 0+Image_bg.getAnchorPointInPoints().y));
        Image_bg.addChild(Label_score);
        var Label_num=this.Label_num= UICtor.cLabel("100",25,cc.size(0,0),cc.color(126,49,2),0,0);
        Label_num.setPosition(cc.p(233+Image_bg.getAnchorPointInPoints().x, 0+Image_bg.getAnchorPointInPoints().y));
        Image_bg.addChild(Label_num);


        this.addChild(Panel_21);

        this.setData(data);

        Panel_21.setTouchEnabled(true);
        UITools.addClickEvent(Panel_21,this,this.onTeamDetail);
    },
    //显示数据
    setData:function(data){
        this.opUserId = data.userId;
        this.userGroup = data.userGroup || 0;
        this.userGroup = Number(this.userGroup);
        var credit = data.commissionCredit || 0;//总赠送分
        var time = data.commissionCount || 0;//次数
        var num = data.memberCount || 0;//人数
        var teamRadit = this.teamRadit = data.creditCommissionRate || 0;
        var groupRadit = 100 - teamRadit;
        var jushu = data.zjs || 0;//总局数
        this.Label_name.setString(""+data.teamName);
        this.Label_teamName.setString(""+data.userName);
        this.Label_teamId.setString(""+data.userId);
        this.Label_number.setString(""+num);
        this.Label_score.setString(""+credit);
        //this.Label_ratio.setString(""+teamRadit + "-"+ groupRadit);
        this.Label_num.setString(""+time);
        this.Label_jushu.setString(""+jushu);
        this.Label_ratio.setString("");
        //this.Label_jushu.setString("");
        this.showIcon(data.headimgurl , 1);
    },

    onTeamDetail: function() {
        //cc.log(" this.userGroup", this.userGroup)
        var data = {};
        data.teamId = this.userGroup;
        ClickCreditTeamModel.init(data);
        this.parentNode.onShowCreditItem(5);
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