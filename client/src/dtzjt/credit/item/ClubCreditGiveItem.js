/**
 * Created by leiwenwen on 2018/10/15.
 */
var ClubCreditGiveCell = ccui.Widget.extend({
    ctor:function(data,index,root){
        this.data = data;
        this.index = index;
        this.root = root;

        this._super();
        this.setContentSize(956, 114);

        var Panel_21=this.Panel_21= UICtor.cPanel(cc.size(956,104),cc.color(150,200,255),0);
        Panel_21.setAnchorPoint(cc.p(0,0));
        Panel_21.setPosition(0,0);
        var Image_bg=this.Image_bg= UICtor.cImg("res/ui/dtzjulebu/julebu/Credit/img_1.png");
        Image_bg.setPosition(478,52);
        Panel_21.addChild(Image_bg);
        var Image_rank=this.Image_rank= UICtor.cImg("res/ui/dtzjulebu/julebu/Rank/rank1.png");
        Image_rank.setPosition(cc.p(-415+Image_bg.getAnchorPointInPoints().x, 0+Image_bg.getAnchorPointInPoints().y));
        Image_bg.addChild(Image_rank);
        var Image_icon=this.Image_icon= UICtor.cImg("res/ui/dtzjulebu/julebu/Rank/icon.png");
        Image_icon.setPosition(cc.p(-307+Image_bg.getAnchorPointInPoints().x, 0+Image_bg.getAnchorPointInPoints().y));
        Image_bg.addChild(Image_icon);
        var Label_name=this.Label_name= UICtor.cLabel("爱吃鱼的猫",25,cc.size(130,30),cc.color(126,49,2),1,0);
        Label_name.setPosition(cc.p(-153+Image_bg.getAnchorPointInPoints().x, 0+Image_bg.getAnchorPointInPoints().y));
        Image_bg.addChild(Label_name);
        var Label_id=this.Label_id= UICtor.cLabel("123456",25,cc.size(0,0),cc.color(126,49,2),0,0);
        Label_id.setPosition(cc.p(20+Image_bg.getAnchorPointInPoints().x, 0+Image_bg.getAnchorPointInPoints().y));
        Image_bg.addChild(Label_id);
        var Label_give=this.Label_give= UICtor.cLabel("100",25,cc.size(0,0),cc.color(126,49,2),0,0);
        Label_give.setPosition(cc.p(366+Image_bg.getAnchorPointInPoints().x, 0+Image_bg.getAnchorPointInPoints().y));
        Image_bg.addChild(Label_give);

        this.addChild(Panel_21);

        this.Image_rank.visible = false;

        this.setData(data);

    },

    //显示数据
    setData:function(data){
        if(this.index <= 3){
            this.Image_rank.visible = true;
            this.Image_rank.loadTexture("res/ui/dtzjulebu/julebu/Rank/rank"+this.index + ".png");
        }
        this.Label_name.setString(""+data.userName);
        this.Label_id.setString(""+data.userId);
        this.Label_give.setString(""+data.dataValue);
        this.showIcon(data.headimgurl);
    },

    showIcon: function (iconUrl, sex) {
        //iconUrl = "http://wx.qlogo.cn/mmopen/25FRchib0VdkrX8DkibFVoO7jAQhMc9pbroy4P2iaROShWibjMFERmpzAKQFeEKCTdYKOQkV8kvqEW09mwaicohwiaxOKUGp3sKjc8/0";
        var icon = this.Image_icon;
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
})
