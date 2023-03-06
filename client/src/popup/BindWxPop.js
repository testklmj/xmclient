/**
 * Created by Administrator on 2016/6/27.
 */
var BindWxPop = BasePopup.extend({
    ctor: function () {
    	this._dt = 1;
    	this._downTime = PlayerModel.isBindWx ? 0 : 10;
		this._newUrl = "";
        this._super("res/bindWxPop.json");
    },

    selfRender: function () {

		this.Label_time = this.getWidget("Label_time");
		this.Label_state = this.getWidget("Label_state");


		this.Button_close = this.getWidget("close_btn");
		UITools.addClickEvent(this.Button_close,this,this.onClose);
		// this.Button_close.visible = false;

        this.Button_copy = this.getWidget("Button_copy");
        UITools.addClickEvent(this.Button_copy,this,this.onCopy);

        this.Image_diamond = this.getWidget("Image_190");
		this.Button_get = this.getWidget("Button_get");
		UITools.addClickEvent(this.Button_get,this,this.onGet);

		// PlayerModel.isBindWx = true;
		// PlayerModel.isHasBindWx = true;

		this.Label_time.setString("")
		this.Button_close.visible = PlayerModel.isBindWx;
		this.Button_get.setBright(!PlayerModel.isHasBindWx)

		this.initBindUrl();
		this.scheduleUpdate();
    },


	onClose:function(){
		PopupManager.remove(this);
	},

	onCopy:function(){
    	SdkUtil.sdkPaste(this._newUrl + "");
		FloatLabelUtil.comText("复制成功");
	},

	onGet:function(){

    	if (!PlayerModel.isBindWx){
			FloatLabelUtil.comText("请先绑定数据后再领取奖励");
			return
		}
		if (PlayerModel.isHasBindWx){
			return
		}

		var self =  this;
		NetworkJT.loginReq("user", "queryUserBindMsg", {userId:PlayerModel.userId}, function (data) {
			if (data) {
				// cc.log("queryUserBindMsg::"+JSON.stringify(data));
			}
		}, function (data) {
			// cc.log("queryUserBindMsg::"+JSON.stringify(data));
			if (data.code == 1){
				PlayerModel.isHasBindWx = true;
				self.Button_get.setBright(!PlayerModel.isHasBindWx)
			}
			FloatLabelUtil.comText(data.message);
		});
	},

	initBindUrl:function(){
		var url = "http://uplogin.bizfans.cn/pdkuposa/noauth/bingTo";
		var time = new Date().getTime();
		this._newUrl = url + PlayerModel.bindWx + "&d3=" + time;
		// cc.log("this._newUrl",this._newUrl)
		this.Label_state.setString(PlayerModel.isBindWx ? "(已绑定)" : "(未绑定)")
	},

	update:function(dt){
		// this._dt = this._dt + dt;
    	// if (this._dt >= 1 && this._downTime >= 0){
		// 	this._dt = 0;
		// 	this.Label_time.setString("" + this._downTime + "s")
		// 	if (this._downTime <= 0 && !this.Button_close.isVisible()){
		// 		this.Button_close.visible = true;
		// 		this.Label_time.setString("")
		// 	}
		// 	this._downTime--;
		// }

	}

});
