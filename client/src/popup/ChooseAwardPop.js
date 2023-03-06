/**
 * Created by Administrator on 2016/6/27.
 * 显示累积、连胜抽奖的界面
 */
var ChooseAwardPop = BasePopup.extend({

    ctor: function () {
        this._super("res/chooseAwardPop.json");
    },

    selfRender: function () {
		this.Button_93 = this.getWidget("Button_93");
		this.Button_93.visible = false;
		UITools.addClickEvent(this.Button_93,this,this.onOk);


		this.nowAward = this.nowTemp = 0;
		for(var index = 1 ; index <= 5 ; index++){
			var btn = this.getWidget("Button_bag"+index);
			btn.temp = index;
			UITools.addClickEvent(btn,this,this.onAward);
		}

		this.bagBtnAni();

		this.addCustomEvent(SyEvent.UPDATE_AWARD_STATE,this,this.updateAwardState);

    },

	bagBtnAni:function(){
		this.nowAward = 100;
		var self = this;
		for(var index = 1 ; index <= 5 ; index++){
			var btn = this.getWidget("Button_bag"+index);
			btn.tagX = btn.x;
			btn.tagY = btn.y;
			btn.x = 578;
			btn.y = btn.y + 30;
			btn.runAction(cc.sequence(cc.moveBy(0.3 , cc.p(0,btn.y-btn.tagY)),cc.delayTime(0.3),cc.moveBy(0.4 , cc.p(btn.tagX - btn.x,0)),
				cc.callFunc(function(){
					self.nowAward = 0;
				})
			))
		}
	},

    onOk:function(){
        PopupManager.remove(this);
    },


	onAward:function(obj){
		if (!this.nowTemp){
			this.nowTemp = obj.temp;
			AudioManager.play("res/audio/dtzSound/coin.mp3");
			ComReq.comReqSignIn([4],["103"]);
		}

	},

	updateAwardState:function(event){
		var data = event.getUserData();
		var msg = data.data;
		var reqCode = data.reqCode;
		if(reqCode == 103){
			this.nowAward = this.nowTemp;
			var awardList = msg.awardList[0];
			for(var index = 1 ; index <= 5 ; index++){
				var btn = this.getWidget("Button_bag"+index);
				if (this.nowAward == index){
					var Image_13 = btn.getChildByName("Image_13");
					var Label_18 = btn.getChildByName("Label_18");
					var Label_14_0 = btn.getChildByName("Label_14_0");
					var Label_14 = btn.getChildByName("Label_14");
					Label_14_0.visible = Label_14.visible = false;
					this.Button_93.visible = Image_13.visible = Label_18.visible = true;
					btn.setBright(false);
					Label_18.setString(""+ (awardList.value || 0));

					if (awardList.type == 2){
						Image_13.loadTexture("res/ui/dtz/pay/pay_2.png")
					}else{
						Image_13.loadTexture("res/ui/dtz/chooseAwardPop/a1.png")
					}
					var armatureJson = "res/plist/bjd_hongbao.ExportJson";
					ccs.armatureDataManager.addArmatureFileInfo(armatureJson);
					var armature = new ccs.Armature("bjd_hongbao");
					armature.x = btn.width/2;
					armature.y = btn.height/2;
					btn.addChild(armature);
					armature.getAnimation().play("hongbao", -1, 1);

					btn.scale = armature.scale = 1.05;
					btn.y = btn.y + 10;
				}
			}
			if (msg.totalWinAward >= 7 && msg.totalWinCount == 8){
				ComReq.comReqSignIn([1],["100"]);
			}
		}

	}
});




