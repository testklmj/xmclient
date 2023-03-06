var HomeSetPop = BasePopup.extend({
	ctor: function () {
		this._super("res/homeSetPop.json");
	},

	selfRender: function () {
		var Button_tc = this.getWidget("Button_tc");
		UITools.addClickEvent(Button_tc,this,this.onTuiChu);
		var Button_fk = this.getWidget("Button_fk");
		UITools.addClickEvent(Button_fk,this,this.onService);
		var Button_gz = this.getWidget("Button_gz");
		UITools.addClickEvent(Button_gz,this,this.onWanfa);
		var btn2 = this.getWidget("Button_sz");
		UITools.addClickEvent(btn2,this,this.onSetUp);
	},

	onTuiChu:function(){
		var mc = new AlertPop("确定要退出游戏吗？",function(){
			sy.scene.exitGame();
		},function(){
			sy.scene.toplayer.removeAllChildren(true);
		});
		sy.scene.toplayer.addChild(mc);
	},

	onService:function(){
		if(SdkUtil.isReview()){
			AlertPop.showOnlyOk("客服电话：4006567310");
		}else{
			ServicePop.showOnlyOk("res/servicePop.json","kuailewan666","熊猫麻将中心");
		}
	},

	onWanfa:function(){
		PopupManager.addPopup(new DTZWanfaPop());
	},

	onSetUp:function(){
		var mc = new SetUpPop(true);
		PopupManager.addPopup(mc);
	}
});