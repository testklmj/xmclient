/**
 * @author hjc
 * @date 2016-9-18
 * @version v1.0
 */
var PaoMaDeng = cc.Sprite.extend({
	content:null,
	urgentContent:null,
	bg:null,
	showTarget:0,
	time:0,
	isShow:false,
	
	ctor:function(){
		this._super();
		var winSize = cc.director.getWinSize();
		this.setContentSize(700, 53);
		this.x = winSize.width/2;
		this.init();
	},

	updatePosition:function(x,y){
		this.Image_44_0.setPosition(x,y);
	},

	init:function(){
		this.playing = false;
		this.content = "";
		this.urgentContent = "";
		this.showTarget = 0;
		this.time = 0;
		this.isShow = false;
		this.Image_44_0= UICtor.cS9Img("res/ui/dtz/dtzHome/blackBg.png", cc.rect(175,0,45,1),cc.size(900,45),ccui.Widget.LOCAL_TEXTURE);
		this.Image_44_0.setPosition(100,880);
		this.addChild(this.Image_44_0);
		this.Image_44_1= UICtor.cImg("res/ui/dtz/dtzHome/welcom.png");
		this.Image_44_1.setPosition(100,22);
		this.Image_44_0.addChild(this.Image_44_1);
		this.bg = new ccui.ScrollView();
		this.bg.setDirection(ccui.ScrollView.DIR_VERTICAL);
		this.bg.setTouchEnabled(false);
		this.bg.setContentSize(cc.size(700, 45));
		this.bg.setInnerContainerSize(cc.size(700, 45));
		this.bg.anchorX = this.bg.anchorY = 0;
		this.bg.setPosition(120, 7);
		this.Image_44_0.addChild(this.bg);
		this.label = UICtor.cLabel("",27);
		this.label.anchorX=0;
		this.label.anchorY=0;
		this.bg.addChild(this.label);
	},

	play:function(msg){
		this.visible = true;
		if(msg.type == 1 || msg.type == 2)
			msg.played+=1;
		this.playing = true;
		var speed = 100;
		this.label.stopAllActions();
		this.label.setPosition(700,0);
		this.label.setString(msg.content);
		var duration = (this.label.width+700)/speed;
		var self = this;
		this.label.runAction(cc.sequence(cc.moveTo(duration,-this.label.width,0),cc.delayTime(1),cc.callFunc(function(){
			if(msg.type==0)
				PaoMaDengModel.normalIndex=msg.index+1;
			self.playing = false;
			PaoMaDengModel.intervalTime=0;//播完了
		})));
	},

	stop:function(){
		if(this.visible){
			PaoMaDengModel.intervalTime=0;
			this.label.stopAllActions();
			this.playing = false;
			this.visible = false;
		}
	}
});