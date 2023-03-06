/**
 * Created by Administrator on 2016/6/27.
 */
var NoticeCell = ccui.Widget.extend({

    ctor:function(data){
        this._super();
        var label = UICtor.cLabel(data.content,30,cc.size(920,0),cc.color("#7d2e00"),0,2);
        label.anchorX =0;
        var height = label.height<82 ? 82 : (label.height+40);
        label.setContentSize(920,height);
        label.x = 10;
        label.y = height/2;
        var bg = UICtor.cS9Img("res/ui/dtz/images/notice_2.png",cc.rect(10,10,10,10),cc.size(920,height));
        bg.addChild(label);
        bg.anchorX=bg.anchorY=0;
        this.addChild(bg);
        this.setContentSize(bg.width,bg.height);
    }
});
var NoticePop = BasePopup.extend({

    ctor: function (data) {
        this.data = data.messages;
        this._super("res/notice.json");
    },

    selfRender: function () {
        if (SdkUtil.isReview()) {
            this.data.length = 0;
        }
        this.list = this.getWidget("ListView_6");
        for(var i = 0; i < this.data.length; i ++){
            if(i < 10)
                this.list.pushBackCustomItem(new NoticeCell(this.data[i]));
        }
        this.getWidget("none").visible = (this.data.length==0);
    }
});