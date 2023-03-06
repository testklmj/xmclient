var LoadingCircle = BasePopup.extend({

	ctor:function(loadingStr){
		this._str = loadingStr;
		this._super("res/loadingCircle.json");
	},

	selfRender:function(){
		this.label = this.getWidget("Label_35");
		this.label.setString(this._str);
		this.lmc = this.getWidget("Image_7");
		this.show();
	},

	show:function(){
		if(!this._runAnimat){
			this.lmc.runAction(cc.rotateTo(3,720,720).repeatForever());
			this._runAnimat = true;
		}
		this.visible = true;
	},

	hide:function(){
		if(this._runAnimat){
			this.lmc.stopAllActions();
			this._runAnimat = false;
		}
		this.visible = false;
	},

	onExit:function(){
		this.lmc.stopAllActions();
		this._super();
	}
});