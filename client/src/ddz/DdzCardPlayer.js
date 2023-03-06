/**
 * Created by zhoufan on 2015/8/15.
 * @class
 * @extend {cc.Class}
 */
var DdzCardPlayer = cc.Class.extend({
	/** @lends DdzCardPlayer.prototype */
	_cards:null,

	/**
	 * {RoomPlayerVo}
	 */
	_playerVo:null,

	_isBt:false,
	_isBtThree:false,
	_iconUrl:"",
	_isRloadIcon:false,
	/**
	 *
	 * @param name {RoomPlayerVo}
	 * @param root {Object}
	 */
	ctor:function(vo,root,seq){
		this._isRloadIcon = false;
		this._isBt = false;
		this._isBtThree = false;
		this._iconUrl = "";
		this._playerVo = vo;
		this.seq = seq;
		this.iconbg = ccui.helper.seekWidgetByName(root,"player"+seq);
		this.iconbg.temp = vo.seat;
		this.iconbg.visible = true;
		this.name = ccui.helper.seekWidgetByName(root,"name"+seq);
		var nameStr = vo.name;
		nameStr = UITools.truncateLabel(nameStr,4);
		this.name.setString(nameStr);
		this.statusImg = ccui.helper.seekWidgetByName(root,"ybq"+seq);
		this.statusTexture = "";
		this.bt = ccui.helper.seekWidgetByName(root,"bt"+seq);
		this.btThree = ccui.helper.seekWidgetByName(root,"btThree"+seq);

		this.point = ccui.helper.seekWidgetByName(root,"point"+seq);
		this.point.scale = 0.8;
		if(seq == 2 || seq == 3){
			if(parseInt(this.point) >= 100 || parseInt(this.point) <= -100){
				this.point.x = this.point.x +23;
			}else if(parseInt(this.point) >= 10 || parseInt(this.point) <= -10){
				this.point.x = this.point.x +13;
			}
		}
		this.leave = ccui.helper.seekWidgetByName(root,"zl"+seq);
		this.leave.setLocalZOrder(10);
		this.leave.visible = false;
		this.yybg = ccui.helper.seekWidgetByName(root,"yy"+seq);
		this.yyts = ccui.helper.seekWidgetByName(root,"yyts"+seq);
		this.yybg.visible = false;
		this.zj = ccui.helper.seekWidgetByName(root,"zj"+seq);
		this.zj.setLocalZOrder(10);
		this.zj.visible = DdzRoomModel.isDizhu(this._playerVo);
		this.xz = ccui.helper.seekWidgetByName(root,"xz"+seq);
		this.xz.visible = false;
		this.zb = ccui.helper.seekWidgetByName(root,"zb"+seq);
		this.zb.setLocalZOrder(10);
		this.zb.visible = false;
		this.ip = ccui.helper.seekWidgetByName(root,"ip"+seq);
		this.ip.setLocalZOrder(11);
		this.ip.visible = false;
		this.cardBg = ccui.helper.seekWidgetByName(root,"cardBg"+seq);
		if(this.cardBg){
			this.cardN=ccui.helper.seekWidgetByName(root,"cardN"+seq);
			this.cardBg.visible=false;
		}
		if(DdzRoomModel.isMoneyRoom()){
			this.coinNum = vo.ext[4];
		}else{
			this.coinNum = vo.point;
		}
		this.updatePoint(this.coinNum);
		if(this.bt){
			var animate = this.bt.getChildByTag(123);
			if(!animate){
				animate = new AnimateSprite("res/plist/b3.plist","b3",1/10);
				animate.anchorX=animate.anchorY=0;
				animate.x=animate.y=0;
				this.bt.addChild(animate,1,123);
				this.bt.visible = false;
			}else{
				this.bt.visible = false;
				animate.stop();
			}
		}

		if(this.btThree){
			var animate1 = this.btThree.getChildByTag(123);
			if(!animate1){
				animate1 = new AnimateSprite("res/plist/b3.plist","b3",1/10);
				animate1.anchorX=animate.anchorY=0;
				animate1.x=animate1.y=0;
				this.btThree.addChild(animate1,1,123);
				this.btThree.visible = false;
			}else{
				this.btThree.visible = false;
				animate1.stop();
			}
		}
		this._cards = [];
		this.showIcon();
		this.updateIpSample();


		if(DdzRoomModel.isMoneyRoom()) {
			this.tuoguanSp = ccui.helper.seekWidgetByName(this.iconbg, "tuoguanSp");
			if (this.tuoguanSp) {
				this.tuoguanSp.visible = false;
			}
		}
	},

	updateTuoguan:function(isTuoguan){
		if(this.tuoguanSp && isTuoguan != null){
			cc.log("刷新托管状态的显示" , isTuoguan);
			this.tuoguanSp.visible = isTuoguan;
			this.isTuoguan = isTuoguan;
		}
	},

	getPlayerIsTuoguan:function(playerVo){
		return playerVo.ext[6];
	},

	updateIpSample:function(){
		if(DdzRoomModel.isIpSame()){
			this.ip.visible = false;
		}
	},

	xiaZhu:function(betValue){
		this.xz.visible = true;
		switch (parseInt(betValue)){
			case 0:
				this.xz.loadTexture("res/ui/ddz/room/bujiao.png");
				break;
			case 1:
				this.xz.loadTexture("res/ui/ddz/room/1fen.png");
				break;
			case 2:
				this.xz.loadTexture("res/ui/ddz/room/2fen.png");
				break;
			case 3:
				this.xz.loadTexture("res/ui/ddz/room/3fen.png");
				break;
		}
		//var label = this.xz.getChildByTag(123);
		//if(!label){
		//	label = new cc.LabelTTF(betValue+"分","Arial",30);
		//	label.anchorX = 0;
		//	label.y = this.xz.height/2;
		//	this.xz.addChild(label,1,123);
		//}else{
		//	label.setString(betValue+"分");
		//}
		//if(parseInt(betValue) == 0){
		//	label.setString("不抢");
		//}
	},

	hideXiazhu:function()
	{
		this.xz.visible = false;
	},


	showInfo:function(){
		var mc = new PlayerInfoPop(this._playerVo);
		PopupManager.addPopup(mc);
	},

	/**
	 * @returns {RoomPlayerVo}
	 */
	getPlayerVo:function(){
		return this._playerVo;
	},

	showIcon:function(){
		//this._playerVo.icon = "http://wx.qlogo.cn/mmopen/25FRchib0VdkrX8DkibFVoO7jAQhMc9pbroy4P2iaROShWibjMFERmpzAKQFeEKCTdYKOQkV8kvqEW09mwaicohwiaxOKUGp3sKjc8/0";
		var url = this._playerVo.icon;
		var defaultimg = (this._playerVo.sex==1) ? "res/ui/ddz/room/room_img_0014.png" : "res/ui/ddz/room/room_img_0014.png";
		if(!url)
			url = defaultimg;
		if(this._iconUrl == url)
			return;
		if(this.iconbg.getChildByTag(345))
			this.iconbg.removeChildByTag(345);
		this._iconUrl = url;
		var sprite = new cc.Sprite(defaultimg);
		if(this._playerVo.icon){
			sprite.x = sprite.y = 0;
			try{
				var sten = new cc.Sprite("res/ui/ddz/room/room_img_0014.png");
				var clipnode = new cc.ClippingNode();
				if(this.seq == 1){
					clipnode.attr({stencil: sten, anchorX: 0.5, anchorY: 0.5, x: 50, y: 50, alphaThreshold: 0.8});
				}else{
					clipnode.attr({stencil: sten, anchorX: 0.5, anchorY: 0.5, x: 53+18, y: 123, alphaThreshold: 0.8});
				}

				clipnode.addChild(sprite);
				this.iconbg.addChild(clipnode,5,345);
				var self = this;
				cc.loader.loadImg(this._playerVo.icon, {width: 252, height: 252}, function (error, img) {
					if (!error && (LayerManager.getCurrentLayer()==LayerFactory.DDZ_ROOM || LayerManager.getCurrentLayer()==LayerFactory.DDZ_MONEY_ROOM)) {
						sprite.setTexture(img);
						sprite.x = 0;
						sprite.y = 0;
						self._isRloadIcon = true;
						SyEventManager.dispatchEvent(SyEvent.ROOM_ROLD_ICON,self._playerVo.seat);
					}else{
						self._iconUrl = "";
					}
				});

			}catch(e){}
		}else{
			if(this.seq == 1){
				sprite.x =  50;
				sprite.y =  50;
			}else{
				sprite.x = 53+18;
				sprite.y = 123;
			}
			SyEventManager.dispatchEvent(SyEvent.ROOM_ROLD_ICON,this._playerVo.seat);
			this.iconbg.addChild(sprite,5,345);
		}
	},
	/**
	 * 显示剩余牌数
	 */
	showLastCard:function(){
		if(this.cardBg){
			//if(bo==false){
			//this.cardBg.visible=false;
			//return;
			//}
			if(this.cardN){
				this.cardN.setString(this._playerVo.ext[1]);
			}
			this.cardBg.visible=true/*DdzRoomModel.isShowCardNumber()*/;
		}
	},
	isBanker:function(bool){
		this.zj.visible =  bool;
	},

	hideDIzhu:function()
	{
		this.zj.visible = false;
	},

	cleanBj:function()
	{
		if(this.seq != 1){
			this.bt.visible = false;
			this.btThree.visible = false;
		}
	},

	fastChat:function(data){
		var id = data.id;
		var sprite = null;
		var label = null;
		var content = "";
		if(id>0){//快捷聊天
			var array = ChatData.pdk_fix_msg;
			content = array[parseInt(id)-1];
		}else{
			if(id<0){//表情
				//if(parseInt(data.content) >6 ){
				//	data.content = 1;
				//}
				var armatureJson = "res/plist/faceAM"+data.content+".ExportJson";
				var armatureName = "faceAM"+data.content;

				ccs.armatureDataManager.addArmatureFileInfo(armatureJson);
				var chatArmature = new ccs.Armature(armatureName);
				switch (this.seq){
					case 1:
						chatArmature.x = 100;
						chatArmature.y = 200;
						break;
					case 2:
						chatArmature.x = -80;
						chatArmature.y = 50;
						break;
					case 3:
						chatArmature.x = 190;
						chatArmature.y = 50;
						break;
				}
				//chatArmature.x = 70;
				//chatArmature.y = 50;
				chatArmature.setLocalZOrder(9999);
				this.iconbg.addChild(chatArmature);
				this.iconbg.setLocalZOrder(9998);
				var musicName = "res/audio/fixMsg/emoticon_"+data.content+".mp3";
				AudioManager.play(musicName);
				chatArmature.getAnimation().setFrameEventCallFunc(function (bone, evt) {
					if (evt == "finish") {
						chatArmature.getAnimation().stop();
						chatArmature.removeFromParent(true);
						//ccs.armatureDataManager.removeArmatureFileInfo(armatureJson);
					}
				});
				chatArmature.getAnimation().play(armatureName, -1, 0);
			}else{
				content = data.content;
			}
		}
		if(content){
			var coords = {1:{x:-50,y:-20},2:{x:50,y:-20},3:{x:-50,y:-20},4:{x:-50,y:-20}};
			var coord = coords[this.seq];
			label = UICtor.cLabel(content,32,null,cc.color("FF361e06"),0,1);
			sprite = new cc.Scale9Sprite("res/ui/ddz/mj/img_chat_4.png",null,cc.rect(30,0,10,64));
			if(this.seq==2){
				sprite.anchorX=1;sprite.anchorY=0;
			}else{
				sprite.anchorX=sprite.anchorY=0;
			}
			sprite.addChild(label);
			var height = (label.height+30)<64 ? 64 : (label.height+30);
			sprite.setContentSize(label.width+30,height);
			label.x = sprite.width/2;label.y = sprite.height/2;
			this.iconbg.addChild(sprite,20);
			sprite.opacity=0;sprite.x = this.yybg.x+coord.x;sprite.y=this.yybg.y+coord.y;
		}
		if(sprite){
			var self = this;
			if(label){
				label.runAction(cc.sequence(cc.fadeTo(0.3,255),cc.delayTime(2.5),cc.fadeTo(0.8,0)));
			}
			var action = cc.sequence(cc.fadeTo(0.3,255),cc.delayTime(2.5),cc.fadeTo(0.8,0),cc.callFunc(function(){
				self.iconbg.removeChild(sprite);
			}))
			sprite.runAction(action);
		}
	},

	getAnimationPos:function(direct , animationName){
		cc.log("direct , animationName"  , direct , animationName);
		var renshu = PDKRoomModel.renshu;

		var posx = 55;
		var posy = 65;


		if(animationName == "socialAM7"){//monkey
			posx = 45;
			posy = 50;
		}
		if(animationName == "socialAM4"){//boom
			posx = 40;
			posy = 80;
		}
		if(animationName == "socialAM3"){//ji
			posx = 55;
			posy = 65;
		}
		if(animationName == "socialAM6"){//ice
			posx = 45;
			posy = 85;
		}
		if(animationName == "socialAM5"){//beer
			posx = 50;
			posy = 80;
		}
		if(animationName == "socialAM2"){//fanqie
			posx = 55;
			posy = 80;
		}
		if(animationName == "socialAM1"){//kiss
			posx = 50;
			posy = 70;
		}

		return {x :posx , y:posy};
	},

	getContainer:function(){
		return this.iconbg;
	},


	playPropArmature:function(temp){
		var armatureName = "socialAM"+temp;
		var armatureJson = "res/plist/"+armatureName+".ExportJson";
		ccs.armatureDataManager.addArmatureFileInfo(armatureJson);
		var propArmature = new ccs.Armature(armatureName);

		cc.log("this.seq..." ,this.seq);
		var posMsg = this.getAnimationPos(this.seq , armatureName);
		propArmature.x = posMsg.x;
		propArmature.y = posMsg.y;
		/*		if(this.seq == 2) {
		 propArmature.x = 140;
		 }else if(this.seq == 3){
		 propArmature.x = 20;
		 }*/

		propArmature.anchorX = propArmature.anchorY = 0.5;
		if(temp == 7){
			propArmature.setScale(0.7);
		}
		this.iconbg.addChild(propArmature,20);
		propArmature.getAnimation().setFrameEventCallFunc(function (bone, evt) {
			if (evt == "finish") {
				propArmature.getAnimation().stop();
				propArmature.removeFromParent(true);
			}
		});
		var musicName = "res/audio/fixMsg/prop"+temp+".mp3";
		AudioManager.play(musicName);
		propArmature.getAnimation().play(armatureName, -1, 0);
	},

	startSpeak:function(){
		if(this.yybg.visible)
			return;
		this.yybg.visible = true;
		this.yybg.setOpacity(0);
		this.yyts.runAction(cc.fadeTo(0.8,255));
		this.yybg.runAction(cc.fadeTo(0.8,255));
	},

	stopSpeak:function(){
		var self = this;
		var action = cc.sequence(cc.fadeTo(0.8,0),cc.callFunc(function(){
			self.yybg.visible = false;
		}))
		this.yyts.runAction(cc.fadeTo(0.8,0));
		this.yybg.runAction(action);
	},

	/**
	 * 显示player的状态 准备、要不起
	 */
	showStatus:function(status){
		this.statusImg.visible = true;
		var tMap ={"-1":"res/ui/ddz/room/buyaozi.png","1":"res/ui/ddz/room/buyaozi.png"};
		var texture = tMap[status];
		var old = this.statusTexture;
		if(status==-1)
			DdzRoomSound.yaobuqi(this._playerVo.userId);
		if(status == 1){
			this.statusImg.visible = false;
			this.zb.visible = true;
		}else{
			this.zb.visible = false;
		}
		if(old && old == texture)
			return;
		this.statusTexture = texture;
		this.statusImg.loadTexture(texture);
	},

	refreshStatus:function(status){
		status = status || -1;
		this.zb.visible = false;
		if(status==1){
		}else if(status==2){
		}else if(status==3){
		}else{
			this.zb.visible = false;
		}

	},

	leaveOrOnLine:function(status){
		if(status == 2){
			this.leave.visible = false;
		}else{
			this.leave.visible = true;
			var texture = (status==1) ? "res/ui/ddz/images/img_dx.png" : "res/ui/ddz/images/img_zl.png";
			this.leave.loadTexture(texture);
		}
	},

	setTrusteeship:function(status){
		if(status == 1){//比赛场托管
			this.leave.visible = true;
			var texture = "res/ui/ddz/images/match58.png";
			this.leave.loadTexture(texture);
		}else{
			this.leave.visible = false;
		}
	},

	/**
	 * 报停
	 */
	baoting:function(){
		if(this._isBt)
			return;
		if(this.seq != 1){
			var animate = this.bt.getChildByTag(123);
			//animate.stop();
			animate.play();
			this.bt.visible = true;
		}
		this._isBt = true;
		DdzRoomModel.baoting(this._playerVo.seat);
		var self = this;
		setTimeout(function(){DdzRoomSound.baoting(self._playerVo.userId)},1000);
	},

	hidebaotingThree:function()
	{
		if(this.btThree){
			var animate = this.btThree.getChildByTag(123);
			if(animate){
				animate.stop();
				animate.visible = false;
				this.btThree.visible = false;
			}
		}
	},

	baotingThree:function(){
		if(this._isBtThree)
			return;
		if(this.seq != 1){
			var animate = this.btThree.getChildByTag(123);
			//animate.stop();
			animate.play();
			animate.visible = true;
			this.btThree.visible = true;
		}
		this._isBtThree = true;
		DdzRoomModel.baotingThree(this._playerVo.seat);
		var self = this;
		setTimeout(function(){DdzRoomSound.baotingThree(self._playerVo.userId)},1000);
	},

	exitRoom:function(){
		this.iconbg.visible = false;
		this.statusImg.visible = false;
	},

	updatePoint:function(point){
		if(DdzRoomModel.isMoneyRoom()){
			cc.log("显示玩家金币：" , point);
			if(point>= 0 && point < 1000000){
				this.point.setString(point);
			}else if(point < 0){
				this.point.setString("-" + Math.abs(point));
			}else{
				this.point.setString(DTZRoomModel.moneyToStr(point));
			}
		}else{
			this.point.setString(point);
		}
	},

	updatePointByBomb:function(value){
		this._playerVo.point += value;
		this.point.setString(this._playerVo.point);
	},



	/**
	 * 拥有的牌
	 * @returns {null}
	 */
	getCards:function(){
		return this._cards;
	},

	deal:function(cards){
		cc.log("dealdeal"+DdzRoomModel.laziPai);
		this._cards = cards;
		for(var i=0; i<this._cards.length; i++)
		{
			this._cards[i].lazi = 0;
			if(this._cards[i].i == DdzRoomModel.laziPai)
			{
				this._cards[i].lazi = 1;
			}else{
				this._cards[i].lazi = 0;
			}
		}
		this.sort();
	},

	sort:function(){
		//var length = this._cards.length;
		var s1 = function(c1,c2){
			var n1 = c1.i;
			var n2 = c2.i;
			var l1 = c1.lazi;
			var l2 = c2.lazi;
			if(l1 == l2){
				if(n1 == n2){
					var t1 = c1.t;
					var t2 = c2.t;
					return t2-t1;
				}else{
					return n2-n1;
				}
			}else{
				return l2-l1;
			}

		}
		this._cards.sort(s1);
	}

});