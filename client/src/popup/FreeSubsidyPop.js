/**
 * Created by Administrator on 2016/6/27.
 * 显示破产补助的界面
 */

var FreeSubsidyPop = BasePopup.extend({

	ctor: function () {
		this._super("res/freeSubsidyPop.json");
	},

	selfRender: function () {
		var data = GoldRoomActivityModel.getAwardData();
		if (!data){
			return
		}

		var double_btn = this.getWidget("double_btn");
		var single_btn = this.getWidget("single_btn");

		this.hasCountLabel = this.getWidget("Label_7_1_1");
		this.subsidyCountLabel = this.getWidget("Label_7_1_1_2");
		this.getWidget("Label_7_1_0").visible = this.getWidget("Label_7_1_0_1").visible = false;
		this.getWidget("Label_7_1").visible  =this.hasCountLabel.visible = this.subsidyCountLabel.visible = false;



		UITools.addClickEvent(double_btn,this,this.onDouble);
		UITools.addClickEvent(single_btn,this,this.onSingle);

		this.addCustomEvent(SyEvent.UPDATE_AWARD_STATE,this,this.updateAwardState);

		this.showSubsidyLabel();
	},

	onDouble:function(){
		GoldRoomActivityModel.isShareActive = true;
		var obj={};
		obj.tableId = 0;
		obj.userName = PlayerModel.username;
		obj.callURL = SdkUtil.SHARE_URL+'?userId='+encodeURIComponent(PlayerModel.userId);
		obj.title = "红包福利超级多，福利满满大丰收，村长李锐邀您熊猫麻将！";
		obj.description= "签到、破产补助、累积连胜抽奖、拉新奖励疯狂送，总有一个让你满意！";
		obj.shareType=1;
		SdkUtil.sdkFeed(obj);
	},

	onSingle:function(){
		cc.log("===============onSingle==================")
		ComReq.comReqSignIn([2,0],["105"]);
	},

	showSubsidyLabel:function(){
		var data = GoldRoomActivityModel.getAwardData();
		//var hasNum = data.subsidyCount || 0;
		//this.hasCountLabel.setString("" + hasNum);
		//this.subsidyCountLabel.setString("" + 1);
	},

	updateAwardState:function(event){
		var data = event.getUserData();
		var msg = data.data;
		var reqCode = data.reqCode;
		if(reqCode == 105){
			PopupManager.remove(this);
			PopupManager.addPopup(new AwardGetPop());
		}

	}


});




