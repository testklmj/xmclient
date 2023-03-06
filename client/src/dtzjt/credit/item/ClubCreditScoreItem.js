/**
 * Created by leiwenwen on 2018/10/15.
 */
var ClubCreditScoreCell = ccui.Widget.extend({
    ctor:function(data,root){
        this.data = data;
        this.root = root;

        this._super();
        this.setContentSize(956, 114);

        var Panel_21=this.Panel_21= UICtor.cPanel(cc.size(956,104),cc.color(150,200,255),0);
        Panel_21.setAnchorPoint(cc.p(0,0));
        Panel_21.setPosition(0,0);
        var Image_bg=this.Image_bg= UICtor.cImg("res/ui/dtzjulebu/julebu/Credit/img_1.png");
        Image_bg.setPosition(478,52);
        Panel_21.addChild(Image_bg);
        var Label_id=this.Label_id= UICtor.cLabel("100",25,cc.size(0,0),cc.color(126,49,2),0,0);
        Label_id.setPosition(cc.p(-396+Image_bg.getAnchorPointInPoints().x, -20+Image_bg.getAnchorPointInPoints().y));
        Image_bg.addChild(Label_id);
        var Label_time=this.Label_time= UICtor.cLabel("100",25,cc.size(0,0),cc.color(126,49,2),0,0);
        Label_time.setPosition(cc.p(363+Image_bg.getAnchorPointInPoints().x, 0+Image_bg.getAnchorPointInPoints().y));
        Image_bg.addChild(Label_time);
        var Label_score=this.Label_score= UICtor.cLabel("100",25,cc.size(0,0),cc.color(126,49,2),0,0);
        Label_score.setPosition(cc.p(-133+Image_bg.getAnchorPointInPoints().x, 0+Image_bg.getAnchorPointInPoints().y));
        Image_bg.addChild(Label_score);
        var Label_ids=this.Label_ids= UICtor.cLabel("100",25,cc.size(0,0),cc.color(126,49,2),0,0);
        Label_ids.setPosition(cc.p(120+Image_bg.getAnchorPointInPoints().x, -20+Image_bg.getAnchorPointInPoints().y));
        Image_bg.addChild(Label_ids);
        var Label_name=this.Label_name= UICtor.cLabel("100",25,cc.size(130,30),cc.color(126,49,2),1,0);
        Label_name.setPosition(cc.p(-397+Image_bg.getAnchorPointInPoints().x, 20+Image_bg.getAnchorPointInPoints().y));
        Image_bg.addChild(Label_name);
        var Label_names=this.Label_names= UICtor.cLabel("100",25,cc.size(130,30),cc.color(126,49,2),1,0);
        Label_names.setPosition(cc.p(119+Image_bg.getAnchorPointInPoints().x, 20+Image_bg.getAnchorPointInPoints().y));
        Image_bg.addChild(Label_names);

        this.addChild(Panel_21);

        this.setData(data)
    },

    //显示数据
    setData:function(data){
        this.Label_name.setString(""+data.optUserName);
        this.Label_id.setString(""+data.optUserId);
        this.Label_score.setString(""+data.credit);
        this.Label_ids.setString(""+data.userId);
        var name = data.userName || "";
        if (data.createdTime){
            var time = ClubRecallDetailModel.getLocalTime(data.createdTime)
            this.Label_time.setString(""+time);
        }
        this.Label_names.setString(""+name);
    },



})