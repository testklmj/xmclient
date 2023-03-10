/**
 * Created by Administrator on 2016/6/27.
 */
var PayPop = BasePopup.extend({
	panelMa:null,
	panelChoose:null,
	data:{},
	ctor: function (data,agencyUserId,agencyName,defaultView,isShowIosPay) {
		this.data=data;
		this.agencyUserId = agencyUserId || 0;
		this.agencyName = agencyName || "";
		this.daichongIng = false;
		this.hasDTMConfig = false;
		this.hasMTDConfig = false;
		this.showIosPay = isShowIosPay || false;
		this.defaultView = defaultView || 1;
		this.kefuNum = 0;
		//this._super("res/pay.json");
		this._super("res/marketPop.json");
	},

	selfRender: function () {
		//充值选项
		this.item=[];
		this.btn=[];
		this.addCustomEvent(SyEvent.GET_MONEYTODIAMOND_ITEMS , this , this.respShowMoneyToDiamondItems);
		this.addCustomEvent(SyEvent.GET_DIAMONDTOMONEY_ITEMS , this , this.respShowDiamondToMoneyItems);
		this.addCustomEvent(SyEvent.BUY_MONEY_ITEMS , this , this.respPayDaimondForMoney);
		this.addCustomEvent(SyEvent.BUY_DIAMOND_ITEM , this , this.respPayMoneyForDaimond);
		this.addCustomEvent(SyEvent.BIND_INVITECODE_SUC , this , this.bindSuc);
		this.addCustomEvent("Zszs_Back", this, this.onMsgBack);
		this.addCustomEvent(SyEvent.RESET_TIME, this, this.changeSearchTime);

//		this.dtmMain = this.getWidget("mtdMain");//钻石
//		this.dtmMain = this.getWidget("dtmMain");//金币
//		for(var i=1;i<=6;i+=1){
//			var index = 6-i;
//			this.item[i] = this.dtmMain.getChildByName("mtditem"+i);
//            this.btn[i] = this.item[i].getChildByName("mtdbtn"+i);
//			var obj=this.getData(index);
//			this.item[i].getChildByName("mtdzs"+i).setString(obj.name + "钻石");
//			//this.getWidget("yuan"+i).setString("¥"+obj.amount);
//			var str2 = parseFloat(obj.roomCards / obj.amount);
//			str2 = Math.round(str2*10)/10;
//
////			this.item[i].getChildByName("exc"+i).setString("1元="+str2+"钻石");
//			this.btn[i].temp = index;
//			UITools.addClickEvent(this.btn[i],this,this.onChoose);
//			this.item[i].getChildByName("mtdprice_" + i).setString(obj.amount + "");
//		}

		var but_gotoAct = this.getWidget("btn_GoActivity");
		this.Image_11 = this.getWidget("Image_11");
		this.Image_12 = this.getWidget("Image_12");
		this.Image_13 = this.getWidget("Image_13");
		this.Button_8 = this.getWidget("Button_8");
		//this.Button_8.temp = 1;
		this.Button_9 = this.getWidget("Button_9");
		//this.Button_9.temp = 2;
		this.Button_81 = this.getWidget("Button_81");
		if(but_gotoAct){
			UITools.addClickEvent(but_gotoAct , this , this.gotoAct);
		}
		//UITools.addClickEvent(this.Button_81,this,this.onCheckID);
		//UITools.addClickEvent(this.Button_8,this,this.onChongzhi);
		//UITools.addClickEvent(this.Button_9,this,this.onChongzhi);

		//关闭按钮
		var Button_close = this.getWidget("Button_close");
		var closePop = this.getWidget("close_btn");
		if(Button_close && closePop){
			UITools.addClickEvent(Button_close , this , this.onCloseHandler);
			UITools.addClickEvent(closePop , this , this.onCancelDaichong);
		}

		//金币兑换额度和上线
		this.lbCurCoin = this.getWidget("exDesc");
		this.lbCurCoin.setString("今日兑换额度：0/10000000");

		//钻石兑换额度和上限
		this.lbCurDia = this.getWidget("exMtdDesc");
		this.lbCurDia.setString("今日兑换额度：0/50000" + "  (兑换后剩余积分不能低于5000)");

		//代充界面相关
		this.btnDcSure = this.getWidget("btnDcSure");
		this.btnSearch = this.getWidget("btnSearch");
		this.playerIcon = this.getWidget("icon");
		this.playerName = this.getWidget("lbName");

		UITools.addClickEvent(this.btnDcSure, this , this.onSureDaiChong);
		UITools.addClickEvent(this.btnSearch, this , this.onSearch);
		var inputIdImg = this.getWidget("inputBg");
		this.inputId = new cc.EditBox(cc.size(263, 71),new cc.Scale9Sprite("res/ui/dtzjulebu/julebu/inputIdBg.png"));
		this.inputId.setString("");
		this.inputId.x = inputIdImg.width/2;
		this.inputId.y = inputIdImg.height/2;
		this.inputId.setFontColor(cc.color("7D2E00"));
		this.inputId.setDelegate(this);
		this.inputId.setFont("Arial",26);
		this.inputId.setMaxLength(30);
		this.inputId.setPlaceHolder("输入玩家ID");
		this.inputId.setPlaceholderFont("Arial" , 26);
		inputIdImg.addChild(this.inputId,0);
		this.playerIcon.visible = false;

		//界面选择
		var popList = {"Button_payPop1":1,"Button_payPop2":2,"Button_payPop3":3,"Button_payPop4":4,"Button_payPop5":5};
		this.addDtzClickEvent(popList , this.onPopSelect);
		this.getWidget("Button_payPop1").visible = false;

		if (!PlayerModel.canZszs){
			this.Button_payPop4.visible = this.Button_payPop5.visible = false;
		}

		//充值界面
//		this.diamondView = this.getWidget("diamondMain");
		this.dtmView = this.getWidget("dtmMain");
		this.mtdView = this.getWidget("mtdMain");
		this.serachView = this.getWidget("serachPop");

		//转移
		this.Panel_zyzs = this.getWidget("Panel_zyzs");
		this.Panel_zyjl = this.getWidget("Panel_zyjl");

		this.btn_close_zs = this.getWidget("btn_close_zs");
		this.btn_close_jl = this.getWidget("btn_close_jl");
		UITools.addClickEvent(this.btn_close_zs , this, this.onClickCloseZs);
		UITools.addClickEvent(this.btn_close_jl , this, this.onClickCloseJl);


		//勾选代充
		this.btnDaichong = this.getWidget("btnDaiChong");
		if(this.btnDaichong){
			this.daichongIng = false;
			this.btnDaichong.setBright(this.daichongIng);
			UITools.addClickEvent(this.btnDaichong , this, this.onClickDaikai);
		}

		//当前金币和钻石
		this.lbDiamond = this.getWidget("lbdiamond");
		this.lbMoney = this.getWidget("lbmoney");
		this.lbDiamond.setString(PlayerModel.getDiamond());
		this.lbMoney.setString(DTZRoomModel.moneyToStr(PlayerModel.getCoin()));
		this.addCustomEvent(SyEvent.PLAYER_PRO_UPDATE,this,this.onPlayerUpdate);

		if(SdkUtil.isReview()){
			this.btnDaichong.visible = false;
			this.getWidget("lbDesc").visible = false;
		}else{
			if(this.agencyUserId>0){
				this.getWidget("Label_12").setString("代充ID："+this.agencyUserId);
				this.getWidget("Label_12_0").setString("代充昵称："+this.agencyName);
				//this.Button_8.setBright(false);
				this.Image_12.visible = this.Image_11.visible = false;
				this.Image_13.visible = true;
				var btn = [];
				for(var i=1;i<=6;i+=1){
					var index = 6-i;
					btn[i] =this.getWidget("dcBtn"+i);
					var item=this.getWidget("item"+i);
					var obj = this.getData(index);
					this.getWidget("dcZs"+i).setString(obj.name);
					this.getWidget("dcPrice_"+i).setString("" + obj.amount);
					var str2 = parseFloat(obj.roomCards / obj.amount);
					str2 = Math.round(str2*10)/10;
					this.getWidget("dcExc"+i).setString("1元="+str2+"钻石");
					btn[i].temp = index;
					UITools.addClickEvent(btn[i],this,this.onChoose);
				}
			}else{
				//this.Button_9.setBright(false);
				//this.getWidget("Label_12").visible =false;
				//this.getWidget("Label_12_0").visible =false;
			}
		}
		this.onPopSelect(this["Button_payPop" + this.defaultView]);

		this.Panel_kefu = this.getWidget("Panel_kefu");
		this.Panel_kefu.visible = false;
		this.Label_kefu = this.getWidget("Label_kefu");
		this.Button_copy = this.getWidget("Button_151");
		UITools.addClickEvent(this.Button_copy,this,this.onCopy);
		this.onAgency();

		this.initZYLayer();
	},

	gotoAct:function(){
		ActivityModel.sendOpenActivityMsg();
	},

	onPlayerUpdate:function(){
		this.lbDiamond.setString(PlayerModel.getDiamond());
		this.lbMoney.setString(DTZRoomModel.moneyToStr(PlayerModel.getCoin()));
	},

	bindSuc:function(){
		this.onPopSelect((this["Button_payPop1"]));
	},

	/**
	 * 1 充值界面 2 钻石换金币 3 金币换钻石
	 * @param defaultView
	 */
	loadDefaultView:function(defaultView){
		if(1 <= defaultView && defaultView <= 3){
			cc.log("PayPop 加载页面 defaultView:" , defaultView);
			this.onPopSelect(this["Button_payPop"+defaultView]);
		}

	},

	lightOneBtn:function(index){
		if(this.showIosPay == false && SyConfig.isIos() && index == 1 && !SdkUtil.isReview()){ //IOS屏蔽第一个按钮
			return;
		}

		for(var i=1;i<=5;i++){
			var Button_payPop =  this["Button_payPop" + i]
			var label_title_new = Button_payPop.getChildByName("Label_title")
			if (index == i){
			    Button_payPop.setBright(true);
			    if (label_title_new){
			        label_title_new.setColor(cc.color(60 , 148 , 116))
			    }
			}else{
                Button_payPop.setBright(false);
                if (label_title_new){
                    label_title_new.setColor(cc.color(255 , 255 , 255))
                }
			}
		}
	},

	onPopSelect:function(obj){
		var clickId = parseInt(obj.temp);
		cc.log("onPopSelect..." , clickId);

		this.Panel_zyzs.visible = false;
		this.Panel_zyjl.visible = false;
		this.dtmView.visible = false;
        this.mtdView.visible = false;
		if(clickId == 1){
			//if(PlayerModel.payBindId == ""){//未绑定邀请码 不显示实际内容 弹出提示绑定的弹出框
			//	return PopupManager.addPopup(new InvitationCodePop());
			//}
			this.lightOneBtn(1);
//			this.diamondView.visible = true;
			this.dtmView.visible = false;
			this.mtdView.visible = false;
		}else if(clickId == 2){
			//请求获取金币场商品
			if(this.hasDTMConfig){
				this.lightOneBtn(2);
//				this.diamondView.visible = false;
				this.dtmView.visible = true;
				this.mtdView.visible = false;
			}else{
				this.reqDiamondToMoneyItemList();
			}
		}else if(clickId == 3){
			if(this.hasMTDConfig){
				this.lightOneBtn(3);
//				this.diamondView.visible = false;
				this.dtmView.visible = false;
				this.mtdView.visible = true;
			}else{
				this.reqMoneyToDiamondItemList();
			}
		}else if(clickId == 4){
			this.lightOneBtn(4);
//			this.diamondView.visible = false;
//			this.dtmView.visible = false;
//			this.mtdView.visible = false;
			this.Panel_zyzs.visible = true;
		}else if(clickId == 5){
			this.curPage = 1;
			this.lightOneBtn(5);
//			this.diamondView.visible = false;
//			this.dtmView.visible = false;
//			this.mtdView.visible = false;
			this.Panel_zyjl.visible = true;
			this.getRecordData(1);
		}
	},


	/**
	 * 获取金币场 钻石换金币商品列表
	 */
	reqDiamondToMoneyItemList:function(){
		//后台返回 1907
		sySocket.sendComReqMsg(906 , [0,0]);
		//sy.scene.showLoading("商品数据获取中");
	},

	respShowDiamondToMoneyItems:function(event){
		//sy.scene.hideLoading();
		this.lightOneBtn(2);

		//for(var i=1;i<=3;i++){
		//	this["Button_payPop" + i].setBright(false);
		//}
		//this["Button_payPop2"].setBright(true);
		cc.log("get money items config ..." , event.getUserData());

		var allData = event.getUserData();
		var curValue = parseInt(allData[0]);
		var totalValue = parseInt(allData[1]);
		this.lbCurCoin.setString("今日兑换额度："+curValue+"/"+totalValue);
		var itemConfig = JSON.parse(allData[2]);
		cc.log("itemConfigs ..." , itemConfig);


//		this.diamondView.visible = false;
		this.mtdView.visible = false;
		this.dtmView.visible = true;

		for(var index = 5, itemIndex = 1 ; index >= 0 ; index -- , itemIndex ++){
			//cc.log("itemConfig[index]" , itemConfig[index]);
			var tCurConfig = (itemConfig[itemIndex-1]);
            var iteNnode = this.dtmView.getChildByName("mtditem"+(itemIndex)) ;
			var itemName = iteNnode.getChildByName("mtdzs"+(itemIndex)) ;
			var itemPrice = iteNnode.getChildByName("mtdprice_"+(itemIndex)) ;
//			var itemDesc = this.getWidget("moneyexc"+(itemIndex));
			var itemBtn = iteNnode.getChildByName("mtdbtn"+itemIndex);
			itemName.setString(tCurConfig["name"]);
			itemPrice.setString(tCurConfig["amount"]);
//			itemDesc.setString(tCurConfig["desc"])
			if(itemBtn){
				itemBtn.itemId = tCurConfig["id"];
				itemBtn.ItemBuydesc = "确定使用"+itemPrice.getString()+"钻石兑换"+itemName.getString()+"吗?";
				UITools.addClickEvent(itemBtn , this , this.onChoiceDtoMItem);
			}
		}
		this.hasDTMConfig = true;
	},


	/**
	 * 获取金币场 金币换钻石商品列表
	 */
	reqMoneyToDiamondItemList:function(){
		//后台返回 1907
		sySocket.sendComReqMsg(906 , [0,1]);
		//sy.scene.showLoading("商品数据获取中");
	},

	respShowMoneyToDiamondItems:function(event){
		//sy.scene.hideLoading();
		//cc.log("respShowMoneyToDiamondItems get money items config ..." , event.getUserData());
		this.lightOneBtn(3);
		//for(var i=1;i<=3;i++){
		//	this["Button_payPop" + i].setBright(false);
		//}
		//this["Button_payPop3"].setBright(true);
		var allData = event.getUserData();
		var curValue = parseInt(allData[0]);
		var totalValue = parseInt(allData[1]);
		this.lbCurDia.setString("今日兑换额度：" + Math.min(curValue , totalValue)+"/"+totalValue + "  (兑换后剩余积分不能低于5000)");
		var itemConfig = JSON.parse(allData[2]);
		cc.log("itemConfigs ..." , itemConfig);

		this.curViewId = 2;
//		this.diamondView.visible = false;
		this.dtmView.visible = false;
		this.mtdView.visible = true;

		for(var index = 0,itemIndex = 6 ; index < 6 ; index ++ , itemIndex --) {
			var tItemNode = this.getWidget("mtditem"+itemIndex);
			tItemNode.visible = false;
			if(index < itemConfig.length){
				tItemNode.visible = true;
				//var tCurConfig = itemConfig[index]; 配置反过来显示
				var tCurConfig = itemConfig[itemConfig.length - index - 1];
				var itemName = this.getWidget("mtdzs" + (itemIndex));
				var itemPrice = this.getWidget("mtdprice_" + (itemIndex));
				var itemBtn = this.getWidget("mtdbtn" + (itemIndex));
				itemName.setString(tCurConfig["name"]);
				itemPrice.setString(tCurConfig["amount"]);
				if(itemBtn){
					itemBtn.itemId = tCurConfig["id"];
					itemBtn.ItemBuydesc = "确定使用"+itemPrice.getString()+"积分兑换"+itemName.getString()+"吗?";
					UITools.addClickEvent(itemBtn , this , this.onChoiceMtoDItem);
				}
			}
		}
		this.hasMTDConfig = true;
	},


	onChoiceDtoMItem:function(obj){
		var moneyItemId = obj.itemId;
		var desc = obj.ItemBuydesc;
		var self = this;
		AlertPop.show(desc,function() {
			self.reqPayDaimondForMoney(moneyItemId)
		});

		//var moneyItemId = obj.itemId;
		//this.reqPayDaimondForMoney(moneyItemId)
	},

	onChoiceMtoDItem:function(obj){
		var moneyItemId = obj.itemId;
		var desc = obj.ItemBuydesc;
		var self = this;
		AlertPop.show(desc,function() {
			self.reqPayMoneyForDiamond(moneyItemId)
		});

		//var moneyItemId = obj.itemId;
		//this.reqPayMoneyForDiamond(moneyItemId)
	},

	reqPayDaimondForMoney:function(moneyItemId){
		sySocket.sendComReqMsg(906 , [1,0, moneyItemId]);
	},

	reqPayMoneyForDiamond:function(moneyItemId){
		sySocket.sendComReqMsg(906 , [1,1, moneyItemId]);
	},

	respPayDaimondForMoney:function(event){
		cc.log("respPayDaimondForMoney ..." , event.getUserData());
		FloatLabelUtil.comText("兑换成功");
		var allData = event.getUserData();
		var curValue = parseInt(allData[0]);
		var totalValue = parseInt(allData[1]);
		this.lbCurCoin.setString("今日兑换额度："+ Math.min(curValue , totalValue)+"/"+totalValue);
	},

	respPayMoneyForDaimond:function(event){
		cc.log("respPayMoneyForDaimond ..." , event.getUserData());
		FloatLabelUtil.comText("兑换成功");
		var allData = event.getUserData();
		var curValue = parseInt(allData[0]);
		var totalValue = parseInt(allData[1]);
		this.lbCurDia.setString("今日兑换额度："+ Math.min(curValue , totalValue)+"/"+totalValue + "  (兑换后剩余积分不能低于5000)");
	},

	onClickDaikai:function(){
		this.daichongIng = !this.daichongIng;
		this.btnDaichong.setBright(this.daichongIng);
	},

	onClickCloseZs:function(){
        this.Panel_zyzs.visible = false;
    },

    onClickCloseJl:function(){
        this.Panel_zyjl.visible = false;
    },

	openDaichongView:function(){
		if(this.serachView){
			this.serachView.visible = true;
		}

	},

	onCancelDaichong:function(){
		//还原之前的查询显示
		//然后影藏查询框
		if(this.playerIcon.getChildByTag(345)){
			this.playerIcon.removeChildByTag(345);
			this.playerIcon.visible = false;
		}

		if(this.playerName){
			this.playerName.setString("");
			this.playerName.visible = false;
		}

		if(this.inputId){
			this.inputId.setString("");
		}

		if(this.serachView){
			this.serachView.visible = false;
		}
	},

	checkIsUserId:function(str){
		return true;//算了 前端还是不做保护吧 str.length == 6
	},

	onSureDaiChong:function(){
		var curDaichongId = this.inputId.getString();
		if(this.checkIsUserId(curDaichongId)){
			var index = this.clickItemIndex;
			this.agencyUserId = curDaichongId;
			var obj=this.getData(index);
			SdkUtil.sdkPay(obj.amount * 100 , index + 1 , this.agencyUserId ,true);
		}else{
			FloatLabelUtil.comText("请输入正确的玩家ID");
		}

	},

	onCheckID:function(){
		var ID=parseInt(this.currentlyText.getString());
		var pattern = /^[\+\-]?\d*?\.?\d*?$/;
		var arr = this.currentlyText.getString().match(pattern);
		if(!arr || (this.currentlyText.getString()).length!=6 || !ID){
			return FloatLabelUtil.comText("ID错误,请重新输入!");
		}
		if(ID==PlayerModel.userId){
			return FloatLabelUtil.comText("不能给自己代充!");
		}
		var self = this;
		sy.scene.showLoading("正在检测");
		var url = csvhelper.strFormat(SyConfig.REQ_URL , "qipai" , "ovaliReplacedPay");

		Network.sypost(url,"ovaliReplacedPay",{fid:ID},
			function(data){
				if(data.code==0) {
					sy.scene.hideLoading();
					PopupManager.remove(self);
					PopupManager.addPopup(new PayPop(self.data,data.userId,data.userName));
				}
			},function(data){
				sy.scene.hideLoading();
				if(data.msg){
					FloatLabelUtil.comText(data.msg);
				}else{
					FloatLabelUtil.comText("检测失败");
				}
			}
		);
	},

	addDtzClickEvent:function(widgets , selector){
		for(var key in widgets){
			var widget = this[key] = this.getWidget(key);
			cc.log("key ..." , widgets , key)
			widget.temp = parseInt(widgets[key]);
			UITools.addClickEvent(widget,this,selector);
		}
	},

	onChongzhi:function(obj){
		var temp = obj.temp;
		if(temp==1) {
			this.Button_8.setBright(true);
			this.Button_9.setBright(false);
			this.Image_11.visible = true;
			this.Image_12.visible = false;
			this.Image_13.visible = false;
			this.agencyUserId = 0;
		}else{
			this.Button_9.setBright(true);
			this.Button_8.setBright(false);
			this.Image_11.visible = false;
			this.Image_12.visible = true;
			this.Image_13.visible = false;
			this.currentlyText = new cc.EditBox(cc.size(320, 71), new cc.Scale9Sprite("res/ui/dtz/dtzCom/scale9bg2.png"));
			this.currentlyText.setString("");
			this.currentlyText.x = 450;
			this.currentlyText.y = 100;
			this.currentlyText.setFontColor(cc.color("#7D2E00"));
			this.currentlyText.setDelegate(this);
			this.Image_12.addChild(this.currentlyText);
			this.currentlyText.setFont("Arial",30);
		}
	},

	onChoose:function(target){
		//判断是否勾选了帮人充
		this.clickItemIndex = target.temp;
		if(this.daichongIng){
			this.openDaichongView();
		}else{
			var index = this.clickItemIndex;
			var obj=this.getData(index);
			SdkUtil.sdkPay(obj.amount*100,obj.id,this.agencyUserId);
		}
	},

	/**
	 * 获取csv数据
	 * @param {Object} source
	 * @param {Integer} id
	 * @returns {Object}
	 */
	getData:function(id){
		id+=1;
		if(SdkUtil.isReview()){
			id+=10;
		}
		var array = this.data.payItem;
		if(!array){
			cc.log("csv not found:"+id);
			return null;
		}
		var result = {};
		for(var i=0,len=array.length;i<len;i+=1){
			if(array[i].id==id){
				result=array[i];
				break;
			}
		}
		return result;
	},

	buildId:function(id){
		return "id"+id;
	},

	showIcon: function (iconUrl) {
		var icon = this.playerIcon;
		var defaultimg ="res/ui/dtz/images/default_m.png";
		if(icon.getChildByTag(345))
			icon.removeChildByTag(345);

		var sprite = new cc.Sprite(defaultimg);

		if(iconUrl){
			try{
				var sten = new cc.Sprite("res/ui/dtzjulebu/julebu/iconBg.png");
				var clipnode = new cc.ClippingNode();
				clipnode.attr({stencil: sten, anchorX: 0.5, anchorY: 0.5, x: 36, y: 36, alphaThreshold: 0.8});
				clipnode.addChild(sprite);
				icon.addChild(clipnode,5,345);
				var self = this;
				cc.loader.loadImg(iconUrl, {width: 252, height: 252}, function (error, img) {
					if (!error) {
						sprite.setTexture(img);
					}
				});
			}catch(e){}
		}else{
			sprite.x = 36;
			sprite.y = 36;
			icon.addChild(sprite,5,345);
		}
	},

	onSearch:function(){
		var userId = this.inputId.getString();
		var self =  this;
		if( parseInt(userId) > 0 ){//&& userId.length == 6
			NetworkJT.loginReq("groupAction", "loadUserBase", {userIds:userId}, function (data) {
				cc.log("loadUserBase..." , JSON.stringify(data));
				if (data && data.message.length > 0) {
					self.onShowPlayer(data.message[0]);
				}else{
					FloatLabelUtil.comText("玩家不存在");
				}
			}, function (data) {
				FloatLabelUtil.comText(data.message);
			});
		}
	},


	onShowPlayer:function(playData){
		if(playData == null){
			return;
		}
		var tplayData = playData;
		if(this.playerIcon){
			this.playerIcon.visible = true;
			this.playerName.setString(tplayData.userName);
			this.showIcon(tplayData.headimgurl);

			this.btnSearch.visible = false;
			if (!SdkUtil.isReview()) {
				this.btnDcSure.visible = true;
			}
		}
	},

	onAgency:function(){
		var self = this;
		if (SdkUtil.isReview()) {

		}else {
			if (!PlayerModel.payBindId){
				Network.loginReq("qipai", "angencyShow", {}, function (data) {
					if (data && data.angency) {
						cc.log("获取代理客服数据..." , JSON.stringify(data));
						var angency = JSON.parse(data.angency);
						for(var index = 0 ; index < angency.length ; index++){
							if (index == 6 && angency[index]){
								self.Panel_kefu.visible = true;
								self.Label_kefu.setString("客服：" + angency[index])
								self.kefuNum = angency[index];
							}

						}

					}
				}.bind(this), function () {
					// FloatLabelUtil.comText("获取代理数据失败");
				});
			}

		}
	},

	onCopy:function() {
		if (this.kefuNum) {
			var str = this.kefuNum
			SdkUtil.sdkPaste(str);
			FloatLabelUtil.comText("复制成功");
		}
	},

	initZYLayer:function(){
		this.beginTime = this.endTime = new Date();
		this.curPage = 1;

		var inputbg_1 = this.getWidget("Image_input1");
		var inputbg_2 = this.getWidget("Image_input2");
		this.inputId = new cc.EditBox(cc.size(inputbg_1.width - 10, inputbg_1.height - 5),
			new cc.Scale9Sprite("res/ui/dtz/pay/newImg_4.png"));
		this.inputId.setPosition(inputbg_1.width/2,inputbg_1.height/2);
		this.inputId.setInputMode(cc.EDITBOX_INPUT_MODE_NUMERIC);
		this.inputId.setMaxLength(9);
		this.inputId.setFont("Arial",30);
		this.inputId.setDelegate(this);
		this.inputId.setPlaceHolder("玩家ID");
		this.inputId.setFontColor(cc.color(255,246,209));
		this.inputId.setPlaceholderFont("Arial" ,30);
		inputbg_1.addChild(this.inputId,1);

		this.inputNum = new cc.EditBox(cc.size(inputbg_2.width - 10, inputbg_2.height - 5),
			new cc.Scale9Sprite("res/ui/dtz/pay/newImg_4.png"));
		this.inputNum.setPosition(inputbg_2.width/2,inputbg_2.height/2);
		this.inputNum.setInputMode(cc.EDITBOX_INPUT_MODE_NUMERIC);
		this.inputNum.setMaxLength(9);
		this.inputNum.setFont("Arial",30);
		this.inputNum.setDelegate(this);
		this.inputNum.setPlaceHolder("钻石数量");
		this.inputNum.setFontColor(cc.color(255,246,209));
		this.inputNum.setPlaceholderFont("Arial" ,30);
		inputbg_2.addChild(this.inputNum,1);

		this.btn_queding = this.getWidget("Button_zy");
		this.btn_queding.addTouchEventListener(this.onClickBtn,this);

		this.btn_buchang = this.getWidget("Button_bc");
		this.btn_buchang.addTouchEventListener(this.onClickBtn,this);



		this.btn_change_date = this.getWidget("Image_date");
		this.btn_change_date.addTouchEventListener(this.onClickBtnNew,this);

		this.label_date = this.getWidget("Label_date");

		this.label_date.setString(UITools.formatTime(this.beginTime) + "-" + UITools.formatTime(this.endTime));

		var inputbg = this.getWidget("Image_input3");
		this.inputIdNew = new cc.EditBox(cc.size(inputbg.width, inputbg.height),
			new cc.Scale9Sprite("res/ui/dtz/pay/newImg_14.png"));
		this.inputIdNew.setPosition(inputbg.width/2,inputbg.height/2);
		this.inputIdNew.setInputMode(cc.EDITBOX_INPUT_MODE_NUMERIC);
		this.inputIdNew.setMaxLength(9);
		this.inputIdNew.setFont("Arial",30);
		this.inputIdNew.setDelegate(this);
		this.inputIdNew.setFontColor(cc.color(255,246,209));
		this.inputIdNew.setPlaceHolder("输入玩家ID");
		this.inputIdNew.setPlaceholderFont("Arial" ,30);
		inputbg.addChild(this.inputIdNew,1);

		this.btn_cbzsr = this.getWidget("Button_right_1");
		this.btn_cbzsr.addTouchEventListener(this.onClickBtnNew,this);

		this.label_page = this.getWidget("Label_page");

		this.btn_left = this.getWidget("Button_left");
		this.btn_left.addTouchEventListener(this.onClickBtnNew,this);

		this.btn_right = this.getWidget("Button_right");
		this.btn_right.addTouchEventListener(this.onClickBtnNew,this);

		this.ListView_list = this.getWidget("ListView_list");

		this.layerBg = this.getWidget("mainPopup");

		this.label_no_data = this.getWidget("Label_noData");
		this.label_no_data.setVisible(false);

		this.getWidget("Image_item").visible = false;
	},

	onClickBtn:function(sender,type){
		if(type == ccui.Widget.TOUCH_BEGAN){
			sender.setColor(cc.color.GRAY);
		}else if(type == ccui.Widget.TOUCH_ENDED){
			sender.setColor(cc.color.WHITE);
			if(sender == this.btn_queding || sender == this.btn_buchang){
				var id = this.inputId.getString();
				var num = this.inputNum.getString();
				id = Number(id);
				num = Number(num);
				if(!id){
					FloatLabelUtil.comText("请输入玩家ID");
					return;
				}
				if(!num){
					FloatLabelUtil.comText("请输入钻石数量");
					return;
				}
				var localType = sender == this.btn_buchang ? 1 : 2;
				var localStr = sender == this.btn_buchang ? "补偿" : "赠送";
				var str = "是否给玩家" + id + localStr + num + "钻石?";
				cc.log("localType==",localType)
				AlertPop.show(str, function () {
					sySocket.sendComReqMsg(1111,[6,id,num,localType]);
				});
			}
		}else if(type == ccui.Widget.TOUCH_CANCELED){
			sender.setColor(cc.color.WHITE);
		}
	},

	onMsgBack:function(event){
		var msg = event.getUserData();
		if(msg.params[0] == 2){
			FloatLabelUtil.comText((msg.params[1]==1?"补偿":"赠送")+"成功");
			this.inputNum.setString("");
		}else if(msg.params[0] == 3){
			var data = msg.strParams[0];
			if(data){
				data = JSON.parse(data);

				var page = msg.params[1];
				if(data.length > 0){
					this.curPage = page;
					this.label_page.setString(this.curPage);
					this.label_no_data.setVisible(false);

					this.updateScrollItem(data);
				}else{
					if(page == 1){
						this.label_no_data.setVisible(true);
						this.updateScrollItem([]);
					}else{
						FloatLabelUtil.comText("没有更多数据了");
					}
				}
			}
		}
	},


	updateScrollItem:function(data){
		this.ListView_list.removeAllItems();
		var num = Array.isArray(data) ? data.length : 0;
		var itemH = 125;
		var contentH = Math.max(this.ListView_list.height,itemH*num);
		this.ListView_list.setInnerContainerSize(cc.size(this.ListView_list.width,contentH));
		var itemNode = this.getWidget("Image_item");
		for(var i = 0;i<num;++i){
			var tempNode = itemNode.clone();
			tempNode.visible = true;
			this.setItemWithData(tempNode,data[i]);
			this.ListView_list.pushBackCustomItem(tempNode);
		}
	},

	setItemWithData:function(widget,data){
		var sendName = UITools.truncateLabel(data.sendName,6);
		var sendId = data.sendUserid;
		var acceptName = UITools.truncateLabel(data.acceptName,6);
		var acceptId = data.acceptUserid;
		var num = data.diamondNum;
		var time = data.sendTime;

		var Label_zsrName = ccui.helper.seekWidgetByName(widget,"Label_zsrName");
		var Label_zsrID = ccui.helper.seekWidgetByName(widget,"Label_zsrID");
		var Label_bzsrName = ccui.helper.seekWidgetByName(widget,"Label_bzsrName");
		var Label_bzsrID = ccui.helper.seekWidgetByName(widget,"Label_bzsrID");
		var Label_zssj = ccui.helper.seekWidgetByName(widget,"Label_zssj");
		var Label_lx = ccui.helper.seekWidgetByName(widget,"Label_lx");
		var Label_sj = ccui.helper.seekWidgetByName(widget,"Label_sj");

		Label_zsrName.setString(sendName);
		Label_zsrID.setString("ID:" + sendId);
		Label_bzsrName.setString(acceptName);
		Label_bzsrID.setString("ID:" + acceptId);
		Label_zssj.setString(""+num);
		Label_lx.setString(data.sendType == 1 ? "补偿" : "赠送");
		Label_sj.setString(this.getTimeStrMore(time));
	},

	getTimeStrMore:function(time){
		var date = new Date(time);
		var year = date.getFullYear();
		var month = date.getMonth() + 1;
		var day = date.getDate();
		var hour = date.getHours();
		var min = date.getMinutes();
		var sec = date.getSeconds();

		if(month < 10) month = "0" + month;
		if(day < 10) day = "0" + day;
		if(hour < 10) hour = "0" + hour;
		if(min < 10) min = "0" + min;
		if(sec < 10) sec = "0" + sec;

		return year + "/" + month + "/" + day + "\n" + hour + ":" + min + ":" + sec;
	},

	changeSearchTime:function(event){
		var data = event.getUserData();

		this.beginTime = new Date(data.beginTime);
		this.endTime = new Date(data.endTime);

		this.label_date.setString(UITools.formatTime(this.beginTime) + "-" + UITools.formatTime(this.endTime));

		this.getRecordData(this.curPage,this.inputIdNew.getString());
	},


	onClickBtnNew:function(sender,type){
		if(type == ccui.Widget.TOUCH_BEGAN){
			sender.setColor(cc.color.GRAY);
		}else if(type == ccui.Widget.TOUCH_ENDED){
			sender.setColor(cc.color.WHITE);
			if(sender == this.btn_change_date){
				var mc = new ClubChoiceTimePop(this,this.beginTime,this.endTime,15);
				PopupManager.addPopup(mc);
			}else if(sender == this.btn_cbzsr){
				var userId = this.inputIdNew.getString();
				if(userId.length == 0){
					FloatLabelUtil.comText("玩家ID不能为空！！！");
					return;
				}
				this.getRecordData(1,userId);
			}else if(sender == this.btn_left){
				var userId = this.inputIdNew.getString();
				if(this.curPage > 1){
					this.getRecordData(this.curPage - 1,userId);
				}
			}else if(sender == this.btn_right){
				var userId = this.inputIdNew.getString();
				this.getRecordData(this.curPage + 1,userId);
			}
		}else if(type == ccui.Widget.TOUCH_CANCELED){
			sender.setColor(cc.color.WHITE);
		}
	},

	editBoxTextChanged: function (sender, text) {
		if(!text)return;

		var last = text.substring(text.length - 1, text.length);
		var num = last.charCodeAt();
		if (num < 48 || num > 57) {
			last = text.substring(0, text.length - 1);
			sender.setString(last);
		}
	},

	getTimeStr:function(date){
		var year = date.getFullYear();
		var month = date.getMonth() + 1;
		var day = date.getDate();

		return year + "-" + month + "-" + day;
	},

	getRecordData:function(page,userId){

		cc.log("getRecordData===")
		userId = userId || -1;
		var b = this.getTimeStr(this.beginTime);
		var e = this.getTimeStr(this.endTime);
		sySocket.sendComReqMsg(1111,[5,page,Number(userId)],[b,e]);
	},

});

PayPop.checkMa=function(num){
	sy.scene.showLoading("正在检测");
	var url = csvhelper.strFormat(SyConfig.REQ_URL,"qipai","bindPayAgencyId");
	Network.sypost(url,"bindPayAgencyId",{userId:PlayerModel.username,flatId:PlayerModel.username,payBindId:num,pf:PlayerModel.pf},
		function(){
			sy.scene.hideLoading();
			PlayerModel.payBindId=num+"";
			PayPop.show();
		},function(){
			PayPop.checkMa(num);
		}
	);
},

PayPop.show=function(defaultView){
	defaultView = defaultView || 1;

	if(PlayerModel.payBindId == ""){
		if(SdkUtil.isReview()){
			return this.checkMa("220000");
		}else{
			defaultView = 2;
		}
	}

	sy.scene.showLoading("商品数据获取中");
	var url = csvhelper.strFormat(SyConfig.REQ_URL,"qipai","getPayItems");
	cc.log("pay http : " , url);
	Network.sypost(url,"getPayItems",{gameCode:"dtz",userId:PlayerModel.username,flatId:PlayerModel.username,os:SyConfig.isIos()?1:0,pay:SdkUtil.isReview()?1:0},
		function(data){
			cc.log("getPayItems : " , JSON.stringify(data));
			SdkUtil.payType = data.payType || "webchanyoudtz";
			sy.scene.hideLoading();
			var isShowIosPay = (parseInt(data.iosState) == 1);//等于1是开启 否则IOS充值钻石影藏
			//
			if(isShowIosPay == false && SyConfig.isIos() && defaultView == 1 && !SdkUtil.isReview()){// && (SyConfig.VERSION_CODE!="1.0.5")移除版本审核的条件
				AlertPop.showOnlyOk("购买钻石请联系群主或者代理");
				return;
			}

			var mc = new PayPop(data, 0 , "" ,defaultView , isShowIosPay);
			PopupManager.addPopup(mc);

		},function(data){
			sy.scene.hideLoading();
			if(data.msg){
				FloatLabelUtil.comText(data.msg);
			}else{
				FloatLabelUtil.comText("商品数据获取失败");
			}
		}
	);
};