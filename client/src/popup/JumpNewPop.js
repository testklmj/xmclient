/**
 * Created by Administrator on 2016/6/27.
 */
var JumpNewPop = BasePopup.extend({
    ctor: function () {
        this._super("res/jumpNewPop.json");
    },

    selfRender: function () {

		this.Button_true = this.getWidget("Button_true");
		UITools.addClickEvent(this.Button_true,this,this.onJump);

    },


	onJump:function(){
        SdkUtil.sdkOpenUrl(SdkUtil.SHARE_URL);
	}
});
