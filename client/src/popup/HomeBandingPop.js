var HomeBandingPop = BasePopup.extend({
	ctor: function () {
		this._super("res/homeBandingPop.json");
	},

	selfRender: function () {
		//实名认证
		var Button_rz = this.getWidget("Button_rz");
		UITools.addClickEvent(Button_rz,this,this.onCheckIdCard);

		//手机注册
		var Button_phone = this.getWidget("Button_phone");
		UITools.addClickEvent(Button_phone,this,this.onPhoneManage);
		Button_phone.visible = false;

		//签到
		var Button_signIn = this.getWidget("Button_signIn");
		UITools.addClickEvent(Button_signIn,this,this.onSignIn);
		//Button_signIn.visible = false;
	},

	//实名认证
	onCheckIdCard:function(){
		//测试
		//PopupManager.addPopup(new MJCreateRoom());
		PopupManager.addPopup(new CheckIdCardPop());
	},

	//手机注册
	onPhoneManage:function(){
		if (!PlayerModel.phoneNum){
			var _type  = 1;
			PopupManager.addPopup(new PhoneManagePop(_type));
		}else{
			AlertPop.showOnlyOk("该账号已绑定手机号");
		}

	},

	onSignIn:function(){
		GoldRoomActivityModel.isAutoSendSignIn = false;
		ComReq.comReqSignIn([1,0],["1"]);
	},

	/**
	 * 发送请求签到配置消息
	 * @param type
	 * @param allCards
	 */
	sendSignInMsg:function(type,allCards){
		var build = MsgHandler.getBuilder("proto/SignatureBookReq.txt");
		var msgType = build.msgType;
		var builder = build.builder;
		var PlayCardReq = builder.build("SignatureBook");
		var msg = new PlayCardReq();
		msg.day = 1;
		msg.res = 1;
		sySocket.send(msg,msgType);
	},
});