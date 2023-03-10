/**
 * Created by Administrator on 2016/6/27.
 */

var ActivityId = {
	comsume_diam : 1,//开房送钻活动ID
	smash_egg : 2,//砸金蛋活动ID
	lucky_reward : 3,//幸运转盘活动ID
	old_dai_new : 4,//老带新活动

	share : 5,//分享领钻活动
	invite_friend : 6,//邀请领钻活动
	buy_lottery : 7,//购彩送钻活动ID
	recommend_agency : 8, //推荐代理活动ID
	invite_reward:9,//要求好友牌局领钻
	represent:12,//代言人形象
	declare:13,//郑重声明
	club_rank:15,//俱乐部争霸
	bw_reward:16,//百万大奖
	give_diamond:18,//送钻石
	extent_online:20,//宣传推广
	match_game:23,//大奖赛
	cqll_promote:28,//传奇来了
	update_notice:36,//更新公告

	invite_newFriend:32,//邀请新人
	everyday_game:31,//每日对局
	bind_oldFriend:30,//绑定老用户

};


var declareCell = ccui.Widget.extend({

	ctor:function(label){
		this._super();
		var text = UICtor.cLabel(label, 24, cc.size(1060,0), cc.color("#7d2e00"), 0, 0);
		text.anchorX=text.anchorY=0;
		this.addChild(text);
		this.setContentSize(text.width,text.height);
	}
})


var friendInfoItem = ccui.Widget.extend({

	ctor:function(data , parentNode){
		this.parentNode = parentNode;
		this._super();
		this.setContentSize(cc.size(120,110));

		var Panel_info=this.Panel_info= UICtor.cPanel(cc.size(120,110),cc.color(150,0,2),0);
		Panel_info.setAnchorPoint(cc.p(0,0));
		Panel_info.setPosition(0,0);
		this.addChild(Panel_info);

		var headBg = new cc.Sprite("res/ui/dtz/images/default_m.png");
		headBg.setAnchorPoint(cc.p(0.5,0));
		headBg.setPosition(cc.p(60, 20));
		Panel_info.addChild(headBg);


		var iconUrl = "";
		var nameStr = "";
		if (data){
			iconUrl = data.headimgurl;
			nameStr = data.name;
		}

		var palyerName = this.palyerName= UICtor.cLabel(nameStr,22,cc.size(200,36),cc.color(115,51,17),0,1);
		palyerName.setAnchorPoint(cc.p(0.5,0.5));
		palyerName.setPosition(cc.p(120, 0));
		Panel_info.addChild(palyerName);


		this.showIcon(headBg,iconUrl,1);

	},
	showIcon: function (iconBg,iconUrl, sex) {
		//iconUrl = "http://wx.qlogo.cn/mmopen/25FRchib0VdkrX8DkibFVoO7jAQhMc9pbroy4P2iaROShWibjMFERmpzAKQFeEKCTdYKOQkV8kvqEW09mwaicohwiaxOKUGp3sKjc8/0";
		var url = iconUrl;
		var sex = sex || 1;
		var defaultimg = (sex == 1) ? "res/ui/dtz/images/default_m.png" : "res/ui/dtz/images/default_w.png";

		if (iconBg.getChildByTag(345)) {
			iconBg.removeChildByTag(345);
		}
		var sprite = new cc.Sprite(defaultimg);
		sprite.x = iconBg.width * 0.5;
		sprite.y = iconBg.height * 0.5;
		//sprite.scale = 0.73;
		iconBg.addChild(sprite, 5, 345);
		if (url) {
			this.parentNode.inviteremoteImageLoadQueue.push(url, function (img) {
				sprite.setTexture(img);
			});
		}
	}

});


var ActivityListPopup = BasePopup.extend({

    ctor: function (data,activityId) {
		this.data = data;
		this.activityId = activityId || ActivityId.invite_newFriend;
    	this._super("res/activityPop.json");
    },

    selfRender: function () {

		this.Button_close = this.getWidget("Button_close");
		UITools.addClickEvent(this.Button_close , this, this.onCloseBtn);

		this.inviteremoteImageLoadQueue = new RemoteImageLoadQueue();

		//这里特殊处理一下 每个项目的活动数目不一样
		this.btnList = [];
		var Button_fxlz = this.getWidget("Button_shareTitle");
		Button_fxlz.temp = ActivityId.share;
		var Button_shb = this.getWidget("Button_redBagTitle");
		Button_shb.temp = ActivityId.invite_reward;
		var Button_represent = this.getWidget("Button_represent");
		Button_represent.temp = ActivityId.represent;
		var Button_declare = this.getWidget("Button_declare");
		Button_declare.temp = ActivityId.declare;
		var Button_clubRank = this.getWidget("Button_clubRank");
		Button_clubRank.temp = ActivityId.club_rank;
		var Button_bwdj = this.getWidget("Button_bwdj");
		Button_bwdj.temp = ActivityId.bw_reward;
		var Button_szs = this.getWidget("Button_szs");
		Button_szs.temp = ActivityId.give_diamond;
		var Button_sxl = this.getWidget("Button_sxl");
		Button_sxl.temp = ActivityId.extent_online;
		var Button_djs = this.getWidget("Button_djs");
		Button_djs.temp = ActivityId.match_game;
		var Button_cqll = this.getWidget("Button_cqll");
		Button_cqll.temp = ActivityId.cqll_promote;
		var Button_gxgg = this.getWidget("Button_gxgg");
		Button_gxgg.temp = ActivityId.update_notice;

		var Button_yxhd = this.getWidget("Button_yxhd");
		Button_yxhd.temp = ActivityId.invite_newFriend;

		if(!SdkUtil.isReview()){
			Button_djs.visible = true;
		}else{
			Button_djs.visible = false;
		}

		if(ShareDailyModel.isShareToday == 1){//今天已经分享过了
			ccui.helper.seekWidgetByName(Button_fxlz , "canGet").visible = false;
			ccui.helper.seekWidgetByName(Button_fxlz , "hadGet").visible = true;
		}else{
			ccui.helper.seekWidgetByName(Button_fxlz , "canGet").visible = true;
			ccui.helper.seekWidgetByName(Button_fxlz , "hadGet").visible = false;
		}
		this.Panel_fxlz = this.getWidget("Panel_shareDailyPop");
		this.Panel_shb = this.getWidget("Panel_RedBagPop");
		this.Panel_represent = this.getWidget("Panel_represent");
		this.Panel_declare = this.getWidget("Panel_declare");
		this.Panel_clubRank = this.getWidget("Panel_clubRank");
		this.Panel_bwReward = this.getWidget("Panel_bwReward");
		this.Panel_szs = this.getWidget("Panel_szs");
		this.Panel_sxl = this.getWidget("Panel_sxl");
		this.Panel_djs = this.getWidget("Panel_djs");
		this.Panel_cqll = this.getWidget("Panel_cqll");
		this.Panel_gxgg = this.getWidget("Panel_gxgg");
		this.Panel_zqhd = this.getWidget("Panel_zqhd");
		this.Panel_yxhd = this.getWidget("Panel_yxhd");


		var ListView_btn = this.ListView_btn = this.getWidget("ListView_btn");
		this.refreshActivityBtn();
		// this.onShowActivity(ActivityId.update_notice);
		// if(this.activityId > 0){
		this.onShowActivity(ActivityId.declare);
		// }else {
		// 	var first = ActivityModel.allActivityList[0].id;
		// 	if (this.isActiveIdExist(first)){
		// 		var firstBtn = null;
		// 		for (var j = 0; j < this.btnList.length; j++) {
		// 			var btn = this.btnList[j];
		// 			if (btn && first == btn.temp) {
		// 				firstBtn = btn;
		// 				break;
		// 			}
		// 		}
		// 		if (firstBtn){
		// 			this.onActivityClick(firstBtn);
		// 		}
		// 	}
		// }
		this.scheduleUpdate();
    },

	refreshActivityBtn:function(){
		var btnList = ActivityModel.allActivityList;
		//cc.log("btnList===",JSON.stringify(btnList))
		this.ListView_btn.removeAllItems();
		for(var i=0;i<btnList.length;i++) {
			var id = btnList[i].id;

			var url = "";
			var disabledUrl = "";
			switch (id) {
				case ActivityId.share:
					url = "res/ui/dtz/activityPop/btntitle1.png";
					disabledUrl = "res/ui/dtz/activityPop/btntitle1down.png";
					break;
				case ActivityId.invite_reward:
					url = "res/ui/dtz/activityPop/btntitle2.png";
					disabledUrl = "res/ui/dtz/activityPop/btntitle2down.png";
					break;
				case ActivityId.represent:
					url = "res/ui/dtz/activityPop/btntitle10.png";
					disabledUrl = "res/ui/dtz/activityPop/btntitle10down.png";
					break;
				case ActivityId.declare:
					url = "res/ui/dtz/activityPop/btntitle11.png";
					disabledUrl = "res/ui/dtz/activityPop/btntitle11down.png";
					break;
				case ActivityId.club_rank:
					url = "res/ui/dtz/activityPop/btntitle12.png";
					disabledUrl = "res/ui/dtz/activityPop/btntitle12down.png";
					break;
				case ActivityId.bw_reward:
					url = "res/ui/dtz/activityPop/btntitle13.png";
					disabledUrl = "res/ui/dtz/activityPop/btntitle13down.png";
					break;
				case ActivityId.give_diamond:
					url = "res/ui/dtz/activityPop/btntitle14.png";
					disabledUrl = "res/ui/dtz/activityPop/btntitle14down.png";
					break;
				case ActivityId.extent_online:
					url = "res/ui/dtz/activityPop/btntitle14.png";
					disabledUrl = "res/ui/dtz/activityPop/btntitle14down.png";
					break;
				case ActivityId.match_game:
					url = "res/ui/dtz/activityPop/btntitle16.png";
					disabledUrl = "res/ui/dtz/activityPop/btntitle16down.png";
					break;
				case ActivityId.cqll_promote:
//					url = "res/ui/dtz/activityPop/btntitle17.png";
//					disabledUrl = "res/ui/dtz/activityPop/btntitle17down.png";
					break;
			}

			if (id != ActivityId.share && id != ActivityId.give_diamond && id != ActivityId.represent && id != ActivityId.extent_online){
				if(url != "") {
					var btn = UICtor.cBtn(url);
					this.btnList.push(btn);
					btn.loadTextureDisabled(disabledUrl, 0);
					btn.temp = id;
					UITools.addClickEvent(btn, this, this.onActivityClick);
					this.ListView_btn.pushBackCustomItem(btn);
				}
				cc.log("id ==============",id)
			}
		}

		var noticeUrl = "res/ui/dtz/activityPop/btntitle30.png";
		var noticedisUrl = "res/ui/dtz/activityPop/btntitle30down.png";

		var btn1 = UICtor.cBtn(noticeUrl);
		this.btnList.push(btn1);
		btn1.loadTextureDisabled(noticedisUrl, 0);
		btn1.temp = ActivityId.update_notice;
		UITools.addClickEvent(btn1, this, this.onActivityClick);

//		var inviteUrl = "res/ui/dtz/activityPop/btntitle32.png";
//		var invitedisUrl = "res/ui/dtz/activityPop/btntitle32down.png";
//
//		var btn2 = UICtor.cBtn(inviteUrl);
//		this.btnList.push(btn2);
//		btn2.loadTextureDisabled(invitedisUrl, 0);
//		btn2.temp = ActivityId.invite_newFriend;
//		UITools.addClickEvent(btn2, this, this.onActivityClick);
//

		this.ListView_btn.pushBackCustomItem(btn1);
//		this.ListView_btn.pushBackCustomItem(btn2);
	},

	isActiveIdExist: function(id) {
		var isExist = false;
		for (var j = 0; j < this.btnList.length; j++) {
			var btn = this.btnList[j];
			if (btn && id == btn.temp) {
				isExist = true;
				break;
			}
		}
		return isExist;
	},

	update: function(dt) {
		this.inviteremoteImageLoadQueue.update(dt);
	},

	onCloseBtn:function(){
		this.inviteremoteImageLoadQueue.stopLoad();
		this.unscheduleUpdate();
		PopupManager.remove(this);
	},

	onShowActivity:function(activityId){
		this.setBtnState(activityId);
		var data = ActivityId.invite_newFriend == activityId ? this.data : JSON.parse(this.data);
		ActivityModel.activityId = activityId;
		if(activityId == ActivityId.share){
			ShareDailyModel.isShareToday = data.isShared;
			var titles = [
				"熊猫麻将祝您鼠年大吉，新年好运都“鼠”于你",
				"爆竹迎新春，鼠年撞大运，快来熊猫麻将迎接新年好运",
				"新的一年，熊猫麻将将一直陪伴你快乐前行，好运不断",
			];
			var rand = MathUtil.mt_rand(1,titles.length);
			var obj={};
			obj.tableId = 0;
			obj.userName=PlayerModel.username;
			var content = ShareDailyModel.getFeedContent();
			obj.title = titles[rand-1];
			obj.description = content;
			//obj.callURL="http://gm.52nmw.cn/pdkuposa/d3/"+encodeURIComponent(PlayerModel.userId);
			//obj.callURL=SdkUtil.SHARE_URL+'?userId='+encodeURIComponent(PlayerModel.userId);
			obj.callURL=SdkUtil.SHARE_URL;
			obj.shareType=1;
			if (content == "" && SyConfig.hasOwnProperty("HAS_PNG_SHARE")) {//
				obj.shareType=0;
				obj.png = "res/feed/feed.jpg";
			}
			this.fxlzSelfRender(obj);
		}else if(activityId == ActivityId.invite_reward){
			this.inviteRewardSelfRender(data);
		}else if(activityId == ActivityId.represent){
			this.representSelfRender(data);
		}else if(activityId == ActivityId.declare){
			this.declareSelfRender(data);
		}else if(activityId == ActivityId.club_rank){
			this.clubRankSelfRender(data);
		}else if(activityId == ActivityId.give_diamond){
			this.giveDiamondSelfRender(data);
		} else if(activityId == ActivityId.update_notice){
			this.updateNoticeSelfRender(data);
		}else if(activityId == ActivityId.update_notice){
			this.updateNoticeSelfRender(data);
		}else if(activityId == ActivityId.invite_newFriend){
			this.Panel_yxhd.visible = true;
		}
	},

	onActivityClick:function(obj){
		var now = new Date().getTime();
		this.lastTime = ActivityModel.getLastTime();
		var diff = now - this.lastTime;
		if(diff < 750) {
			FloatLabelUtil.comText("点击太快了！");
			return;
		}
		var temp = obj.temp;
		//cc.log("temp:::::"+temp);
		this.setBtnState(temp);
		var self = this;
		var strParams = temp + "";
		ActivityModel.activityId = temp;
		if(temp == ActivityId.share){
			ActivityModel.sendActivity([0],strParams);
		}else if(temp == ActivityId.invite_reward){
			ActivityModel.sendActivity([0],strParams);
		}else if(temp == ActivityId.represent){
			this.representSelfRender();
		}else if(temp == ActivityId.declare){
			this.declareSelfRender();
		}else if(temp == ActivityId.club_rank){
			this.clubRankSelfRender();
		}else if(temp == ActivityId.give_diamond){
			ActivityModel.sendActivity([0],strParams);
		}else if(temp == ActivityId.extent_online){
			this.extentOnLineSelfRender()
		}else if(temp == ActivityId.update_notice){
			this.updateNoticeSelfRender()
		}else if(temp == ActivityId.invite_newFriend){
			this.Panel_yxhd.visible = true;
		}
	},

	setBtnState:function(temp){
		var items = this.ListView_btn.getItems();
		for(var i=0;i<items.length;i++){
			var j = items[i].temp;
			if(temp == j){
				items[i].setBright(true);
			}else{
				items[i].setBright(false);
			}
		}

		this.Panel_fxlz.visible = (temp == ActivityId.share);
		this.Panel_shb.visible = (temp == ActivityId.invite_reward);
		this.Panel_represent.visible = (temp == ActivityId.represent);
		this.Panel_declare.visible = (temp == ActivityId.declare);
		this.Panel_clubRank.visible = (temp == ActivityId.club_rank);
		this.Panel_bwReward.visible = (temp == ActivityId.bw_reward);
		this.Panel_szs.visible = (temp == ActivityId.give_diamond);
		this.Panel_sxl.visible = (temp == ActivityId.extent_online);
		this.Panel_djs.visible  = (temp == ActivityId.match_game);
		this.Panel_cqll.visible  = (temp == ActivityId.cqll_promote);
		this.Panel_yxhd.visible  = (temp == ActivityId.invite_newFriend);

		var time = new Date();
		var year = time.getFullYear();
		var month = time.getMonth() + 1;
		var date = time.getDate();
		if(year == 2019 &&  month == 9 && date >= 12 && date <= 30){//中秋活动宣传
			this.Panel_gxgg.visible  = false;
			this.Panel_zqhd.visible  = (temp == ActivityId.update_notice);
		}else{
			this.Panel_gxgg.visible  = (temp == ActivityId.update_notice);
			this.Panel_zqhd.visible  = false;
		}
	},

	inviteRewardSelfRender: function(data) {
		//cc.log("inviteRewardSelfRender:::::"+data);
		if(data.requestType){
			FloatLabelUtil.comText("领取奖励成功");
		}
		var maxInviteNum = 20;//邀请总人数
		var playNum  = 1;//进行的牌局数才可以领奖励
		var inviteNum = 0;//已经邀请的人
		this.receiveBtnList = [];//领取奖励的按钮
		this.rewardBtnList = [];//领取奖励的按钮
		this.receiveBtnStatusList = [];//每个奖励的状态
		this.inviteActivityUser = [];//邀请的玩家的详细信息
		this.rewardDiam = [];//每个奖励的详细信息
		this.rewardList = [];//领取的奖励列表
		this.rewardNumList = [];//领取的奖励数目列表
		this.playerNumList = [];//领取每个奖励需要达到的人数
		this.inviteUrl = SdkUtil.SHARE_URL;//邀请好友的地址
		if (data.maxInviteNum){
			maxInviteNum = data.maxInviteNum;
		}
		if (data.playNum){
			playNum = data.playNum;
		}
		if (data.inviteActivityUser){
			inviteNum = data.inviteActivityUser.length;
			this.inviteActivityUser = data.inviteActivityUser;
		}
		if (data.recordState){
			this.receiveBtnStatusList = data.recordState
		}
		if (data.rewardDiam){
			this.rewardDiam = data.rewardDiam
		}
		//cc.log("maxInviteNum"+maxInviteNum);
		//cc.log("inviteNum"+inviteNum);
		this.friendLabel = this.getSeekWidgetByName(this.Panel_shb,"Label_friend");
		this.Label_tip1 = this.getSeekWidgetByName(this.Panel_shb,"Label_tip1");
		this.Label_tip1.setString("1、邀请还有下载《熊猫麻将》并进行"+ playNum +"场牌局，人数达标即可获得奖励。");
		this.invitenumProgressBar = this.getSeekWidgetByName(this.Panel_shb,"ProgressBar_invitenum");
		this.Label_tip3 = this.getSeekWidgetByName(this.Panel_shb,"Label_tip3");
		this.Label_tip3.setString("该活动已下线，奖励领取期限为6月14日，请玩家在此期间内及时领取奖励！");
		var numPercent = this.getNumParent(inviteNum);
		this.invitenumProgressBar.setPercent(numPercent);
		this.friendLabel.setString("   邀请好友 ("+ inviteNum + "/"+maxInviteNum+")");

		for(var i = 0;i < this.rewardDiam.length;i++) {
			var idx = i+1;
			this.rewardList[i] = this.getSeekWidgetByName(this.Panel_shb,"Button_reward"+idx);
			this.rewardNumList[i] = this.getSeekWidgetByName(this.Panel_shb,"Label_num"+idx);
			this.playerNumList[i] = this.getSeekWidgetByName(this.Panel_shb,"Label_playernum"+idx);
			this.receiveBtnList[i] = this.getSeekWidgetByName(this.Panel_shb,"Button_receive"+idx);
			this.receiveBtnList[i].temp = i;

			this.rewardBtnList[i] = this.getSeekWidgetByName(this.Panel_shb,"Button_reward"+idx);
			this.rewardBtnList[i].temp = i;

			UITools.addClickEvent(this.rewardBtnList[i], this , this.onGetReward);
			UITools.addClickEvent(this.receiveBtnList[i], this , this.onGetReward);
			this.showPlayerNumLabel(this.playerNumList[i],this.rewardDiam[i]);
			this.showRewardNumLabel(this.rewardNumList[i],this.rewardDiam[i]);
			this.showRewardImg(this.rewardList[i],this.rewardDiam[i]);
			this.showbtnStatus(this.receiveBtnList[i],this.receiveBtnStatusList[i]);
			if (this.receiveBtnStatusList[i] == 2){
				var actionImg = UICtor.cImg("res/ui/dtz/activityPop/actionImg.png");
				actionImg.setPosition(cc.p(this.receiveBtnList[i].getAnchorPointInPoints().x,this.receiveBtnList[i].getAnchorPointInPoints().y));
				this.receiveBtnList[i].addChild(actionImg);
				actionImg.runAction(cc.rotateTo(1,720,720).repeatForever());
			}
		}
		this.listViewHead = this.getSeekWidgetByName(this.Panel_shb,"ListView_head");
		for(var i = 0;i < maxInviteNum;i++) {
			//显示头像和名字
			var infoBg = new friendInfoItem(this.inviteActivityUser[i],this);
			if (this.listViewHead){
				this.listViewHead.pushBackCustomItem(infoBg);
			}
		}
		this.Button_invite = this.getSeekWidgetByName(this.Panel_shb,"Button_invite");
		this.Button_invite.visible = false;
		UITools.addClickEvent(this.Button_invite,this,this.onInvite);
	},

	onGetReward:function(obj){
		if (ActivityModel.activityId){
			var _idx = parseInt(obj.temp);
			var _status = this.receiveBtnStatusList[_idx];
			if (_status == 2){
				ActivityModel.sendActivity([1,_idx],""+ActivityModel.activityId);
			}
		}

	},

	showPlayerNumLabel:function(_obj,_data){
		_obj.setString("" + _data.friendNum);
	},
	//显示每个奖励的数模
	showRewardNumLabel:function(_obj,_data){
		if (_data.type == 1) {
			_obj.setString("x" + _data.rewardNum);
		}else if (_data.type == 2){
			_obj.setString(_data.rewardNum + "元");
		}
	},
	//显示奖励是哪一种的图片
	showRewardImg:function(_obj,_data){
		// type 1是钻石 2是红包
		if (_data.type == 1){
			_obj.loadTextureNormal("res/ui/dtz/activityPop/imgzuanbg.png");
		}else if (_data.type == 2){
			_obj.loadTextureNormal("res/ui/dtz/activityPop/imghbbg.png");
		}
	},
	//显示领取奖励按钮的状态
	showbtnStatus:function(_obj,_status){
		//状态0没达到要求，状态1达到要求已经领取,状态2达到要求未领取，
		if (_status == 0){
			_obj.loadTextureNormal("res/ui/dtz/activityPop/receive.png");
		}else if (_status == 1){
			_obj.loadTextureNormal("res/ui/dtz/activityPop/received.png");
		}else if (_status == 2){
			_obj.loadTextureNormal("res/ui/dtz/activityPop/receiving.png");
		}
	},

	getNumParent:function(_num){
		var parent = 0;
		if(_num > 0){
			for(var i= 0;i< this.rewardDiam.length;i++) {
				if (_num <= this.rewardDiam[i].friendNum ) {
					parent =  15 * (i+1) - 8 ;
					if (_num == this.rewardDiam[i].friendNum) {
						parent = 15 * (i+1);
						if (i == 0){
							parent = parent -2;
						}
					}
					break;
				}
			}
		}
		if (_num > this.rewardDiam[this.rewardDiam.length -1].friendNum ){
			parent = 100;
		}
		return parent;
	},

	onInvite:function(){
		var obj={};
		obj.tableId = 0;
		obj.userName = PlayerModel.username;
		obj.callURL = this.inviteUrl;
		obj.title = "熊猫麻将";
		var content = ShareDailyModel.getShareContent();
		obj.pyq=content;
		obj.description=content;
		obj.shareType = 1;

		obj.session = 0;
		obj.title = content;
		SdkUtil.sdkFeed(obj,true);

		//SharePop.show(obj,true);
	},


	onLinqu:function() {
		ActivityModel.sendActivity([1],"4");
	},

	fxlzSelfRender: function (obj) {
		this.shareObject = obj;
		this.Button_pyq = this.getWidget("Button_pyq");
		UITools.addClickEvent(this.Button_pyq,this,this.onWx1);
		//if(ShareDailyModel.isShareToday==1){
		//	this.Button_pyq.setBright(false);
		//}else{
		//	UITools.addClickEvent(this.Button_pyq,this,this.onWx1);
		//}

	},

	declareSelfRender: function () {
		this.getWidget("ListView_content").removeAllItems();
		var ListView_content = this.getWidget("ListView_content");
		ListView_content.pushBackCustomItem(new declareCell(" "));
		ListView_content.pushBackCustomItem(new declareCell("近期，国家文化部发文要求行业规范自身，规范游戏市场，净化网络环境。"));
		ListView_content.pushBackCustomItem(new declareCell("作为一家守法合规的企业，我们愿与广大玩家一同维护健康、绿色的娱乐"));
		ListView_content.pushBackCustomItem(new declareCell("环境。我们在此郑重声明："));
		ListView_content.pushBackCustomItem(new declareCell(" "));
		ListView_content.pushBackCustomItem(new declareCell("一、游戏中结算的积分，仅用于游戏对战分数的记录，每局游戏结束时清零，"));
		ListView_content.pushBackCustomItem(new declareCell("且仅限于本人在游戏中使用，不具备货币属性，不可流通，也不具有任何价值；"));
		ListView_content.pushBackCustomItem(new declareCell(" "));
		ListView_content.pushBackCustomItem(new declareCell("二、游戏中的钻石属于游戏道具，仅能够用于开设游戏房间，不具备其他用途；"));
		ListView_content.pushBackCustomItem(new declareCell(" "));
		ListView_content.pushBackCustomItem(new declareCell(" 三、我司严禁玩家之间进行赌博行为，并且对用户所拥有的积分、钻石等均"));
		ListView_content.pushBackCustomItem(new declareCell("不提供赠予、转让、流通等功能，并且没有任何形式的官方回收、直接或变相"));
		ListView_content.pushBackCustomItem(new declareCell("的兑换现金或实物"));
		ListView_content.pushBackCustomItem(new declareCell(" "));
		ListView_content.pushBackCustomItem(new declareCell("四、本游戏绝无任何外挂，请各位玩家放心使用。我司自信承诺，凡有能力，"));
		ListView_content.pushBackCustomItem(new declareCell("开发出有效外挂或提供有效外挂者，我司将给予100万人民币奖励！"));
		ListView_content.pushBackCustomItem(new declareCell(" "));
		ListView_content.pushBackCustomItem(new declareCell("请大家文明游戏，远离赌博。祝您在《熊猫麻将》玩的开心！"));
		ListView_content.pushBackCustomItem(new declareCell(" "));
		ListView_content.pushBackCustomItem(new declareCell("                                                                      熊猫麻将官方运营"));
	},

	representSelfRender: function () {

	},
	clubRankSelfRender: function () {

	},
	extentOnLineSelfRender: function (){

	},
	updateNoticeSelfRender: function (){
		this.updateContent = "";
		// this.updateContent = "  尊敬的玩家：《熊猫麻将》系统将于5月6日早上6:30开\n" +
		// 	"启禁止玩家进入牌桌功能，届时玩家将无法再进入牌桌进行游\n" +
		// 	"戏，请还在牌桌的玩家在停服前尽早完成已开局的牌桌，停服\n"+
		// 	"时间定于5月6日早上7:30开始停服升级服务器和数据库，预计\n" +
		// 	"停服时间6小时，请玩家耐心等待（提前完成提前开服），升级\n" +
		// 	"完毕后玩家需下载最新版本或登录游戏后按提示框下载最新版\n" +
		// 	"本，玩家下载好新包后即可正常登录游戏！服务器更新完毕后\n" +
		// 	"玩家遇到无法进入游戏等问题请加快乐客服QQ: 2209004325\n\n" +
		// 	"  以上事项给您造成的不便敬请谅解!";
		// this.updateContent = UpdateNoticeModel.getNoticeContent();
		this.Panel_gxgg.setString(""+this.updateContent);
	},

	getSeekWidgetByName: function (root,name) {
		return ccui.helper.seekWidgetByName(root,name)
	},

	giveDiamondSelfRender: function(data) {
		//cc.log("giveDiamondSelfRender:::::");
		if(data.requestType){
			FloatLabelUtil.comText("领取奖励成功");
		}
		var maxInviteNum = 20;//邀请总人数
		var playNum  = 1;//进行的牌局数才可以领奖励
		var inviteNum = 0;//已经邀请的人
		this.receiveBtnList = [];//领取奖励的按钮
		this.rewardBtnList = [];//领取奖励的按钮
		this.receiveBtnStatusList = [];//每个奖励的状态
		this.inviteActivityUser = [];//邀请的玩家的详细信息
		this.rewardDiam = [];//每个奖励的详细信息
		this.rewardList = [];//领取的奖励列表
		this.rewardNumList = [];//领取的奖励数目列表
		this.playerNumList = [];//领取每个奖励需要达到的人数
		this.inviteUrl = SdkUtil.SHARE_URL;//邀请好友的地址
		if (data.maxShowNum){
			maxInviteNum = data.maxShowNum;
		}
		if (data.playNum){
			playNum = data.playNum;
		}
		if (data.inviteActivityUser){
			inviteNum = data.inviteActivityUser.length;
			this.inviteActivityUser = data.inviteActivityUser;
		}
		if (data.recordState){
			this.receiveBtnStatusList = data.recordState
		}
		if (data.rewardDiam){
			this.rewardDiam = data.rewardDiam
		}
		//cc.log("maxInviteNum"+maxInviteNum);
		//cc.log("inviteNum"+inviteNum);
		var rewardNum = 0;
		if (data.rewardNum){
			rewardNum = data.rewardNum;
		}
		this.friendLabel = this.getSeekWidgetByName(this.Panel_szs,"Label_friend");
		this.Label_tip1 = this.getSeekWidgetByName(this.Panel_szs,"Label_tip1");
		this.Label_tip1.setString("1、邀请好友下载安装《熊猫麻将》，人数达标累积奖励"+rewardNum+"钻石！");
		this.Label_tip2 = this.getSeekWidgetByName(this.Panel_szs,"Label_tip2");
		this.Label_tip2.setString("2、所有奖励领取完成后自动重置，重置后可重新邀请。");



		this.invitenumProgressBar = this.getSeekWidgetByName(this.Panel_szs,"ProgressBar_invitenum");
		var numPercent = this.getNumParent(inviteNum);
		this.invitenumProgressBar.setPercent(numPercent);
		this.friendLabel.setString("   邀请好友 ("+ inviteNum + "/"+maxInviteNum+")");

		for(var i = 0;i < this.rewardDiam.length;i++) {
			var idx = i+1;
			this.rewardList[i] = this.getSeekWidgetByName(this.Panel_szs,"Button_reward"+idx);
			this.rewardNumList[i] = this.getSeekWidgetByName(this.Panel_szs,"Label_num"+idx);
			this.playerNumList[i] = this.getSeekWidgetByName(this.Panel_szs,"Label_playernum"+idx);
			this.receiveBtnList[i] = this.getSeekWidgetByName(this.Panel_szs,"Button_receive"+idx);
			this.receiveBtnList[i].temp = i;

			this.rewardBtnList[i] = this.getSeekWidgetByName(this.Panel_szs,"Button_reward"+idx);
			this.rewardBtnList[i].temp = i;

			UITools.addClickEvent(this.rewardBtnList[i], this , this.onGetReward);
			UITools.addClickEvent(this.receiveBtnList[i], this , this.onGetReward);
			this.showPlayerNumLabel(this.playerNumList[i],this.rewardDiam[i]);
			this.showRewardNumLabel(this.rewardNumList[i],this.rewardDiam[i]);
			this.showRewardImg(this.rewardList[i],this.rewardDiam[i]);
			this.showbtnStatus(this.receiveBtnList[i],this.receiveBtnStatusList[i]);
			if (this.receiveBtnStatusList[i] == 2){
				var actionImg = UICtor.cImg("res/ui/dtz/activityPop/actionImg.png");
				actionImg.setPosition(cc.p(this.receiveBtnList[i].getAnchorPointInPoints().x,this.receiveBtnList[i].getAnchorPointInPoints().y));
				this.receiveBtnList[i].addChild(actionImg);
				actionImg.runAction(cc.rotateTo(1,720,720).repeatForever());
			}
		}
		this.listViewHead = this.getSeekWidgetByName(this.Panel_szs,"ListView_head");
		for(var i = 0;i < maxInviteNum;i++) {
			//显示头像和名字
			var infoBg = new friendInfoItem(this.inviteActivityUser[i],this);
			if (this.listViewHead){
				this.listViewHead.pushBackCustomItem(infoBg);
			}
		}
		this.Button_invite = this.getSeekWidgetByName(this.Panel_szs,"Button_invite");
		UITools.addClickEvent(this.Button_invite,this,this.onInvite);
	},

	onWx1:function(){//朋友圈
		ShareDailyModel.isFromShareDaily = true;
		this.shareObject.session = 1;
		SdkUtil.sdkFeed(this.shareObject,true);
	},

	onWx2:function(){//微信好友
		ShareDailyModel.isFromShareDaily = false;
		this.shareObject.session = 0;
		SdkUtil.sdkFeed(this.shareObject);
	},
    
});

var AutumnPopup = BasePopup.extend({

	ctor: function () {
		this._super("res/autumnPop.json");
	},

	selfRender: function () {


	}
});