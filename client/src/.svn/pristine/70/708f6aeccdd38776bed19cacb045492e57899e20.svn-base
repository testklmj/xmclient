/**
 * Created by zhoufan on 2015/8/15.
 * @class
 * @extend {cc.Class}
 */
var BBTCardPlayer = cc.Class.extend({
	/** @lends CardPlayer.prototype */
	_cards:null,

	/**
	 * {RoomPlayerVo}
	 */
	_playerVo:null,

	_isBt:false,
	_iconUrl:"",
	/**
	 *
	 * @param name {RoomPlayerVo}
	 * @param root {Object}
	 */
	ctor:function(vo,root,seq){
		this._isBt = false;
		this._iconUrl = "";
		this._playerVo = vo;
		this.isTuoguan = false;
		this.seq = seq;
		this.isTuoguan = false;
		cc.log("seq..." , seq);
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
		this.point = ccui.helper.seekWidgetByName(root,"point"+seq);
		this.leave = ccui.helper.seekWidgetByName(root,"zl"+seq);
		this.leave.visible = false;
		this.yybg = ccui.helper.seekWidgetByName(root,"yy"+seq);
		this.yyts = ccui.helper.seekWidgetByName(root,"yyts"+seq);
		this.yybg.visible = false;
		this.cardBg = ccui.helper.seekWidgetByName(root,"cardBg"+seq);
		if(this.cardBg){
			this.cardN=ccui.helper.seekWidgetByName(root,"cardN"+seq);
			this.cardBg.visible=false;
		}
		this.heitao = ccui.helper.seekWidgetByName(root,"heitao"+seq);
		if(this.heitao){
			this.heitao.visible = false;
		}
		this.icon = ccui.helper.seekWidgetByName(root,"icon"+seq);
		this.icon.temp = vo.seat;
		this.fangzhu = ccui.helper.seekWidgetByName(root,"fangzhu"+seq);
		this.fangzhu.visible = false;
		this.wang = ccui.helper.seekWidgetByName(root,"Image_wang"+seq);
		this.wang.visible = false;
		this.h3 = ccui.helper.seekWidgetByName(root,"Image_h"+seq);
		this.h3.visible = false;
		this.panelZt = ccui.helper.seekWidgetByName(root,"Panel_zt"+seq);
		this.updatePoint(vo.point);
		if(this.bt){
			var animate = this.bt.getChildByTag(123);
			if(!animate){
				animate = new AnimateSprite("res/plist/baodan.plist","baodan",1/10);
				animate.anchorX=animate.anchorY=0;
				animate.x=animate.y=0;
				this.bt.addChild(animate,1,123);
			}else{
				animate.stop();
			}
		}
		this._cards = [];
		this.showIcon();
		if(this._playerVo.seat == BBTRoomModel.getBrankerSeat()){
			this.fangzhu.visible =true;
		}else{
			this.fangzhu.visible =false;
		}
		this.showWangSP();
		//var isFangzhu = BBTRoomModel.isPdkFangzhu(this._playerVo);
		//this.fangzhuSign = ccui.helper.seekWidgetByName(root,"fangzhu"+seq);
		//this.fangzhuSign.visible = isFangzhu;

		//ip相同提示
		this.ipSame = ccui.helper.seekWidgetByName(root,"ipSame"+seq);
		this.ipSame.visible = false;
		this.rank = ccui.helper.seekWidgetByName(root,"Image_rank"+seq);
		this.rank.visible = false;
		this.firstTu = ccui.helper.seekWidgetByName(root,"Image_firsttu"+seq);
		this.firstTu.visible = false;
		this.showWjZt();
		this.showRank(BBTRoomModel.getPlayerMC(this._playerVo));
		this.showFirstTu(BBTRoomModel.getFirstDou(this._playerVo) == 1)

		this.creditScore = ccui.helper.seekWidgetByName(root,"lableCreditScore"+seq);
		if (this.creditScore){
			this.creditScore.setString("");
		}
		var isCredit = BBTRoomModel.isCreditRoom();
		if (isCredit){
			var creditNum = BBTRoomModel.getCreditNum(this._playerVo);
			this.creditScore.setString("赛:"+creditNum);
		}

		this.tuoguanSp = ccui.helper.seekWidgetByName(this.iconbg , "tuoguanSp");
		if(this.tuoguanSp){
			this.tuoguanSp.visible = false;
		}
	},

	updateTuoguan:function(isTuoguan){
		if(this.tuoguanSp && isTuoguan != null){
			cc.log("刷新托管状态的显示" , isTuoguan);
			this.tuoguanSp.visible = isTuoguan;
			this.isTuoguan = isTuoguan;
		}
	},

	showWangSP:function(){
		this.wang.scale = 0.6;
		if(this._playerVo.seat == BBTRoomModel.getWangSeat()){
			this.wang.visible =true;
			if(BBTRoomModel.ext[11] == 1){
				this.wang.loadTexture("res/ui/bbt/xiaowang.png");
			}else{
				this.wang.loadTexture("res/ui/bbt/dawang.png");
			}
		}else{
			this.wang.visible =false;
		}

		if (BBTRoomModel.renshu == 2){
			this.wang.visible = false;
		}
	},

	runH3Aimation:function(){
		this.h3.visible = true;
		var that = this;
		var action = cc.sequence(cc.delayTime(2.0),cc.scaleTo(1.0,0,0),cc.callFunc(function(){
			that.h3.visible = false;
		}));
		this.h3.runAction(action);
	},

	cleanBj:function()
	{
		if(this.seq != 1){
			this.bt.visible = false;
		}
	},

	showRank:function(value){
		if(parseInt(value) > 0){
			this.rank.loadTexture("res/ui/dtz/dtzRoom/rank"+value+".png");
			this.rank.visible = true;
			this.rank.setLocalZOrder(99999);
			if(parseInt(value) == 1){
				setTimeout(function(){AudioManager.play(BBTRoomSound.getPath(1,"shangyoule.wav"));},1000);
			}
		}
	},

	showWjZt:function(){
		this.panelZt.removeAllChildren(true);
		var initX = 30;
		var jiange = 50;
		if(this.seq == 2){
			initX = 170;
			jiange = -50;
		}
		var curIndex = 0;
		if(BBTRoomModel.getPlayerChui(this._playerVo) == 1){
			var chui = UICtor.cImg("res/ui/bbt/chuizi.png");
			chui.scale = 0.8;
			chui.setPosition(initX+curIndex*jiange,35);
			this.panelZt.addChild(chui);
			curIndex++;
		}

		if(BBTRoomModel.getPlayerKaiqiang(this._playerVo) == 1){
			var chui = UICtor.cImg("res/ui/bbt/qiang1.png");
			chui.scale = 0.8;
			chui.setPosition(initX+curIndex*jiange,35);
			this.panelZt.addChild(chui);
			curIndex++;
		}


		if(BBTRoomModel.getPlayerDou(this._playerVo) == 1){
			if(this.fangzhu.isVisible()){
				var chui = UICtor.cImg("res/ui/bbt/fantu.png");
			}else{
				var chui = UICtor.cImg("res/ui/bbt/tu.png");
			}
			if (BBTRoomModel.renshu == 2){
				var chui = UICtor.cImg("res/ui/bbt/tu.png");
			}
			chui.scale = 0.8;
			chui.setPosition(initX+curIndex*jiange,35);
			this.panelZt.addChild(chui);
		}

	},


	isBanker:function(bool){
		this.fangzhu.visible =  bool;
	},

	isWang:function(bool){
		this.wang.visible =  bool;
	},

	//IP相同显示
	isIpSame:function(visible){
		this.ipSame.visible = visible;
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

	getAnimationPos:function(direct , animationName){
		cc.log("direct , animationName"  , direct , animationName);
		var renshu = BBTRoomModel.renshu;

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

	showIcon:function(){
		//this._playerVo.icon = "http://wx.qlogo.cn/mmopen/25FRchib0VdkrX8DkibFVoO7jAQhMc9pbroy4P2iaROShWibjMFERmpzAKQFeEKCTdYKOQkV8kvqEW09mwaicohwiaxOKUGp3sKjc8/0";
		var url = this._playerVo.icon;
		var defaultimg = "res/ui/dtz/dtzCom/default_m.png" ;
		if(!url)
			url = defaultimg;
		if(this._iconUrl == url)
			return;
		if(this.iconbg.getChildByTag(345))
			this.iconbg.removeChildByTag(345);
		this._iconUrl = url;
		var sprite = new cc.Sprite(defaultimg);
		sprite.setScale(0.95);
		var sten = new cc.Sprite("res/ui/dtz/images/img_14_c.png");
		var clipnode = new cc.ClippingNode();
		clipnode.attr({stencil: sten, anchorX: 0.5, anchorY: 0.5, x: this.icon.width/2, y: this.icon.height/2,alphaThreshold: 0.8});
		clipnode.addChild(sprite);
		this.icon.addChild(clipnode,5,345);
		cc.log("this._playerVo.icon"+this._playerVo.icon);
		if(this._playerVo.icon){
			cc.log("加载网络头像")
			sprite.x = sprite.y = 0;
			try{
				var self = this;
				cc.loader.loadImg(this._playerVo.icon, {width: 252, height: 252}, function (error, img) {
					if (!error && (LayerManager.getCurrentLayer()==LayerFactory.BBT_ROOM||LayerManager.getCurrentLayer()==LayerFactory.MATCH_ROOM)) {
						sprite.setTexture(img);
						sprite.x = 0;
						sprite.y = 0;
						SyEventManager.dispatchEvent(SyEvent.ROOM_ROLD_ICON,self._playerVo.seat);
					}else{
						self._iconUrl = "";
					}
				});
			}catch(e){}
		}else{
			SyEventManager.dispatchEvent(SyEvent.ROOM_ROLD_ICON,this._playerVo.seat);
			//sprite.x = this.icon.width/2;
			//sprite.y = this.icon.height/2;
			//this.icon.addChild(sprite,5,345);
		}
	},
	/**
	 * 显示剩余牌数
	 */
	showLastCard:function(){
		if(this.cardBg){
			if(this.cardN){
				this.cardN.setString(this._playerVo.ext[0]);
			}
			this.cardBg.visible = BBTRoomModel.isShowCardNumber();
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
		}else {
			if (id < 0) {//表情
				var armatureJson = "res/plist/faceAM" + data.content + ".ExportJson";
				var armatureName = "faceAM" + data.content;
				ccs.armatureDataManager.addArmatureFileInfo(armatureJson);
				var chatArmature = new ccs.Armature(armatureName);
				chatArmature.x = 70;
				chatArmature.y = 50;
				if(this.seq == 2){//最后边的玩家 头像稍微往左边移动些
					chatArmature.x = 30;
				}
				this.iconbg.addChild(chatArmature, 22);
				var musicName = "res/audio/fixMsg/emoticon_" + data.content + ".mp3";
				AudioManager.play(musicName);
				chatArmature.getAnimation().setFrameEventCallFunc(function (bone, evt) {
					if (evt == "finish") {
						chatArmature.getAnimation().stop();
						chatArmature.removeFromParent(true);
						//ccs.armatureDataManager.removeArmatureFileInfo(armatureJson);
					}
				});
				chatArmature.getAnimation().play(armatureName, -1, 0);
			} else {
				content = data.content;
			}
		}
		if(content){
			var coords = {1:{x:-50,y:-20},2:{x:50,y:-20},3:{x:-50,y:-20},4:{x:-50,y:-20}};
			var coord = coords[this.seq];
			label = UICtor.cLabel(content,32,null,cc.color("FF361e06"),0,1);
			sprite = new cc.Scale9Sprite("res/ui/dtz/images/img_chat_4.png",null,cc.rect(30,0,10,64));
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
		//cc.log("bbt 刷新玩家状态显示" , status);
		status = status || -2;
		if(status == -2){
			this.statusImg.visible = false;
			return;
		}
		this.statusImg.visible = true;
		var tMap ={"-1":"res/ui/dtz/images/img_35.png","1":"res/ui/dtz/images/img_34.png"};
		var texture = tMap[status];
		var old = this.statusTexture;
		if(status==-1)
			BBTRoomSound.yaobuqi(this._playerVo.userId);
		if(old && old == texture)
			return;
		this.statusTexture = texture;
		this.statusImg.loadTexture(texture);
	},

	showFirstTu:function(flag){
		this.firstTu.visible = flag;
	},

	showTu:function(){
		this.showWjZt();
	},

	showRobber:function(){
		this.showWjZt();
	},

	showKaiqiang:function(){
		this.showWjZt();
	},

	showChui:function(){
		this.showWjZt();
	},

	play:function(){
		var self = this;
		var action = cc.sequence(cc.blink(2,6),cc.callFunc(function(){
			self.name.visible = false;
		}));
		this.name.runAction(action);
	},

	leaveOrOnLine:function(status){
		if(status == 2){
			this.leave.visible = false;
		}else{
			this.leave.visible = true;
			var texture = (status==1) ? "res/ui/dtz/images/img_dx.png" : "res/ui/dtz/images/img_zl.png";
			this.leave.loadTexture(texture);
		}
	},

	hideLeaveSp:function(){
		if(this.leave && this.leave.visible && !this.isTuoguan){
			this.leave.visible = false
		}
	},


	setTrusteeship:function(status){
		if(status == 1){//比赛场托管
			this.leave.visible = true;
			var texture = "res/ui/images/match58.png";
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
			animate.stop();
			animate.play();
			this.bt.visible = true;
		}
		this._isBt = true;
		BBTRoomModel.baoting(this._playerVo.seat);
		var self = this;
		setTimeout(function(){AudioManager.play(BBTRoomSound.getPath(1,"last.wav"));},1000);
	},

	exitRoom:function(){
		this.iconbg.visible = false;
		this.statusImg.visible = false;
	},

	updatePoint:function(point){
		this.point.setString(point);
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

	isHasWSKPx:function(cards){
		this._cards = cards;
		this.sort();
		var result = BBTAI._autoLongWsk(this._cards);
		if(result.length > 0){
			return true;
		}
		return false;
	},

	sortWSKDeal:function(cards)
	{
		this._cards = cards;
		this.sort();
		this.sortWSKPaiX();
	},

	sortWSKPaiX:function(){
		//var cards = ArrayUtil.clone(this._cards);
		var length = this._cards.length;
		var temp = {};
		for(var i=0;i<length;i++){
			var card = this._cards[i];
			card.sx = 1;
			card.pxyx = 0;
		}
		var result = BBTAI._autoKing("",this._cards);
		if (result.length > 0) {
			for (var i = 0; i < result.length; i++) {
				this._cards[result[i]].sx = 11;
				this._cards[result[i]].pxyx = 7;
			}
		}
		var cloneCards = [];
		for(var i=0;i<this._cards.length;i++){
			if(this._cards[i].sx == 1){
				cloneCards.push(this._cards[i]);
			}
		}

		result = BBTAI._autoLongHeSWsk(cloneCards);
		if(result.length > 0){
			for (var i = 0; i < result.length; i++) {
				cc.log("_autoLongHeSWsk"+result[i]);
				cloneCards[result[i]].sx = 7;
				cloneCards[result[i]].pxyx = 6;
			}
		}

		cloneCards = [];
		for(var i=0;i<this._cards.length;i++){
			if(this._cards[i].sx == 1){
				cloneCards.push(this._cards[i]);
			}
		}

		result = BBTAI._autoLongHoSWsk(cloneCards);
		if(result.length > 0){
			for (var i = 0; i < result.length; i++) {
				cc.log("_autoLongHoSWsk"+result[i]);
				cloneCards[result[i]].sx = 6;
				cloneCards[result[i]].pxyx = 5;
			}
		}

		cloneCards = [];
		for(var i=0;i<this._cards.length;i++){
			if(this._cards[i].sx == 1){
				cloneCards.push(this._cards[i]);
			}
		}

		result = BBTAI._autoLongMhSWsk(cloneCards);
		if(result.length > 0){
			for (var i = 0; i < result.length; i++) {
				cc.log("_autoLongMhSWsk"+result[i]);
				cloneCards[result[i]].sx = 5;
				cloneCards[result[i]].pxyx = 4;
			}
		}

		cloneCards = [];
		for(var i=0;i<this._cards.length;i++){
			if(this._cards[i].sx == 1){
				cloneCards.push(this._cards[i]);
			}
		}

		result = BBTAI._autoLongFkSWsk(cloneCards);
		if(result.length > 0){
			for (var i = 0; i < result.length; i++) {
				cc.log("_autoLongFkSWsk"+result[i]);
				cloneCards[result[i]].sx = 4;
				cloneCards[result[i]].pxyx = 3;
			}
		}

		cloneCards = [];
		for(var i=0;i<this._cards.length;i++){
			if(this._cards[i].sx == 1){
				cloneCards.push(this._cards[i]);
			}
		}

		result = BBTAI._autoLongWsk(cloneCards);
		if(result.length > 0){
			for (var i = 0; i < result.length; i++) {
				//cc.log("_autoLongWsk"+result[i]);
				cloneCards[result[i]].sx = 3;
				cloneCards[result[i]].pxyx = 2;
			}
		}
		cloneCards = [];
		for(var i=0;i<this._cards.length;i++){
			if(this._cards[i].sx == 1){
				cloneCards.push(this._cards[i]);
			}
		}
		result = BBTAI._autoLongWsk(cloneCards);
		if(result.length > 0){
			for (var i = 0; i < result.length; i++) {
				//cc.log("_autoLongWsk"+result[i]);
				cloneCards[result[i]].sx = 2;
				cloneCards[result[i]].pxyx = 1;
			}
		}

		cloneCards = [];
		for(var i=0;i<this._cards.length;i++){
			if(this._cards[i].sx == 1){
				cloneCards.push(this._cards[i]);
			}
		}

		result = BBTAI._autoLongDizha(cloneCards);
		if (result.length > 0) {
			for (var i = 0; i < result.length; i++) {
				cloneCards[result[i]].sx = 10;
			}
		}

		cloneCards = [];
		for(var i=0;i<this._cards.length;i++){
			if(this._cards[i].sx == 1){
				cloneCards.push(this._cards[i]);
			}
		}

		result = BBTAI._autoLongTHX(cloneCards);
		if (result.length > 0) {
			for (var i = 0; i < result.length; i++) {
				cc.log("resultTHX"+result[i]);
				cloneCards[result[i]].sx = 9;
			}
		}

		cloneCards = [];
		for(var i=0;i<this._cards.length;i++){
			if(this._cards[i].sx == 1){
				cloneCards.push(this._cards[i]);
			}
		}

		result = BBTAI._autoLongBomb(cloneCards);
		if(result.length > 0){
			for (var i = 0; i < result.length; i++) {
				cc.log("resultBomb"+result[i]);
				cloneCards[result[i]].sx = 8;
			}
		}
		this.sortSx();
	},

	isHasBobmPx:function(cards){
		this._cards = cards;
		this.sort();
		var result = BBTAI._autoLongBomb(this._cards);
		if (result.length > 0) {
			return true;
		}
		return false;
	},

	sortBOMBDeal:function(cards)
	{
		this._cards = cards;
		this.sort();
		this.sortBOMBPaiX();
	},

	sortBOMBPaiX:function(){
		//var cards = ArrayUtil.clone(this._cards);
		var length = this._cards.length;
		var temp = {};
		for(var i=0;i<length;i++){
			var card = this._cards[i];
			card.sx = 1;
			card.pxyx = 0;
		}
		var result = BBTAI._autoKing("",this._cards);
		if (result.length > 0) {
			for (var i = 0; i < result.length; i++) {
				this._cards[result[i]].sx = 11;
				this._cards[result[i]].pxyx = 7;
			}
		}
		var cloneCards = [];
		for(var i=0;i<this._cards.length;i++){
			if(this._cards[i].sx == 1){
				cloneCards.push(this._cards[i]);
			}
		}

		result = BBTAI._autoLongBomb(cloneCards);
		if(result.length > 0){
			for (var i = 0; i < result.length; i++) {
				cc.log("resultBomb"+result[i]);
				cloneCards[result[i]].sx = 8;
				cloneCards[result[i]].pxyx = 6;
			}
		}

		cloneCards = [];
		for(var i=0;i<this._cards.length;i++){
			if(this._cards[i].sx == 1){
				cloneCards.push(this._cards[i]);
			}
		}


		result = BBTAI._autoLongDizha(cloneCards);
		if (result.length > 0) {
			for (var i = 0; i < result.length; i++) {
				cloneCards[result[i]].sx = 10;
			}
		}

		cloneCards = [];
		for(var i=0;i<this._cards.length;i++){
			if(this._cards[i].sx == 1){
				cloneCards.push(this._cards[i]);
			}
		}

		result = BBTAI._autoLongTHX(cloneCards);
		if (result.length > 0) {
			for (var i = 0; i < result.length; i++) {
				cc.log("resultTHX"+result[i]);
				cloneCards[result[i]].sx = 9;
			}
		}

		cloneCards = [];
		for(var i=0;i<this._cards.length;i++){
			if(this._cards[i].sx == 1){
				cloneCards.push(this._cards[i]);
			}
		}

		result = BBTAI._autoLongHeSWsk(cloneCards);
		if(result.length > 0){
			for (var i = 0; i < result.length; i++) {
				cc.log("_autoLongHeSWsk"+result[i]);
				cloneCards[result[i]].sx = 7;
			}
		}

		cloneCards = [];
		for(var i=0;i<this._cards.length;i++){
			if(this._cards[i].sx == 1){
				cloneCards.push(this._cards[i]);
			}
		}

		result = BBTAI._autoLongHoSWsk(cloneCards);
		if(result.length > 0){
			for (var i = 0; i < result.length; i++) {
				cc.log("_autoLongHoSWsk"+result[i]);
				cloneCards[result[i]].sx = 6;
			}
		}

		cloneCards = [];
		for(var i=0;i<this._cards.length;i++){
			if(this._cards[i].sx == 1){
				cloneCards.push(this._cards[i]);
			}
		}

		result = BBTAI._autoLongMhSWsk(cloneCards);
		if(result.length > 0){
			for (var i = 0; i < result.length; i++) {
				cc.log("_autoLongMhSWsk"+result[i]);
				cloneCards[result[i]].sx = 5;
			}
		}

		cloneCards = [];
		for(var i=0;i<this._cards.length;i++){
			if(this._cards[i].sx == 1){
				cloneCards.push(this._cards[i]);
			}
		}

		result = BBTAI._autoLongFkSWsk(cloneCards);
		if(result.length > 0){
			for (var i = 0; i < result.length; i++) {
				cc.log("_autoLongFkSWsk"+result[i]);
				cloneCards[result[i]].sx = 4;
			}
		}

		cloneCards = [];
		for(var i=0;i<this._cards.length;i++){
			if(this._cards[i].sx == 1){
				cloneCards.push(this._cards[i]);
			}
		}

		result = BBTAI._autoLongWsk(cloneCards);
		if(result.length > 0){
			for (var i = 0; i < result.length; i++) {
				//cc.log("_autoLongWsk"+result[i]);
				cloneCards[result[i]].sx = 3;
			}
		}
		cloneCards = [];
		for(var i=0;i<this._cards.length;i++){
			if(this._cards[i].sx == 1){
				cloneCards.push(this._cards[i]);
			}
		}
		result = BBTAI._autoLongWsk(cloneCards);
		if(result.length > 0){
			for (var i = 0; i < result.length; i++) {
				//cc.log("_autoLongWsk"+result[i]);
				cloneCards[result[i]].sx = 2;
			}
		}

		this.sortSx();
	},

	isHasTHXPx:function(cards){
		this._cards = cards;
		this.sort();
		var result = BBTAI._autoLongTHX(this._cards);
		if (result.length > 0) {
			return true;
		}
		return false;
	},

	sortTHXDeal:function(cards)
	{
		this._cards = cards;
		this.sort();
		this.sortTHXPaiX();
	},

	sortTHXPaiX:function(){
		//var cards = ArrayUtil.clone(this._cards);
		var length = this._cards.length;
		var temp = {};
		for(var i=0;i<length;i++){
			var card = this._cards[i];
			card.sx = 1;
			card.pxyx = 0;
		}
		var result = BBTAI._autoKing("",this._cards);
		if (result.length > 0) {
			for (var i = 0; i < result.length; i++) {
				this._cards[result[i]].sx = 11;
				this._cards[result[i]].pxyx = 7;
			}
		}
		var cloneCards = [];
		for(var i=0;i<this._cards.length;i++){
			if(this._cards[i].sx == 1){
				cloneCards.push(this._cards[i]);
			}
		}

		result = BBTAI._autoLongTHX(cloneCards);
		if (result.length > 0) {
			for (var i = 0; i < result.length; i++) {
				cc.log("resultTHX"+result[i]);
				cloneCards[result[i]].sx = 9;
				cloneCards[result[i]].pxyx = 6;
			}
		}

		cloneCards = [];
		for(var i=0;i<this._cards.length;i++){
			if(this._cards[i].sx == 1){
				cloneCards.push(this._cards[i]);
			}
		}

		result = BBTAI._autoLongDizha(cloneCards);
		if (result.length > 0) {
			for (var i = 0; i < result.length; i++) {
				cloneCards[result[i]].sx = 10;
			}
		}

		cloneCards = [];
		for(var i=0;i<this._cards.length;i++){
			if(this._cards[i].sx == 1){
				cloneCards.push(this._cards[i]);
			}
		}

		result = BBTAI._autoLongBomb(cloneCards);
		if(result.length > 0){
			for (var i = 0; i < result.length; i++) {
				cc.log("resultBomb"+result[i]);
				cloneCards[result[i]].sx = 8;
			}
		}

		cloneCards = [];
		for(var i=0;i<this._cards.length;i++){
			if(this._cards[i].sx == 1){
				cloneCards.push(this._cards[i]);
			}
		}

		result = BBTAI._autoLongHeSWsk(cloneCards);
		if(result.length > 0){
			for (var i = 0; i < result.length; i++) {
				cc.log("_autoLongHeSWsk"+result[i]);
				cloneCards[result[i]].sx = 7;
			}
		}

		cloneCards = [];
		for(var i=0;i<this._cards.length;i++){
			if(this._cards[i].sx == 1){
				cloneCards.push(this._cards[i]);
			}
		}

		result = BBTAI._autoLongHoSWsk(cloneCards);
		if(result.length > 0){
			for (var i = 0; i < result.length; i++) {
				cc.log("_autoLongHoSWsk"+result[i]);
				cloneCards[result[i]].sx = 6;
			}
		}

		cloneCards = [];
		for(var i=0;i<this._cards.length;i++){
			if(this._cards[i].sx == 1){
				cloneCards.push(this._cards[i]);
			}
		}

		result = BBTAI._autoLongMhSWsk(cloneCards);
		if(result.length > 0){
			for (var i = 0; i < result.length; i++) {
				cc.log("_autoLongMhSWsk"+result[i]);
				cloneCards[result[i]].sx = 5;
			}
		}

		cloneCards = [];
		for(var i=0;i<this._cards.length;i++){
			if(this._cards[i].sx == 1){
				cloneCards.push(this._cards[i]);
			}
		}

		result = BBTAI._autoLongFkSWsk(cloneCards);
		if(result.length > 0){
			for (var i = 0; i < result.length; i++) {
				cc.log("_autoLongFkSWsk"+result[i]);
				cloneCards[result[i]].sx = 4;
			}
		}

		cloneCards = [];
		for(var i=0;i<this._cards.length;i++){
			if(this._cards[i].sx == 1){
				cloneCards.push(this._cards[i]);
			}
		}

		result = BBTAI._autoLongWsk(cloneCards);
		if(result.length > 0){
			for (var i = 0; i < result.length; i++) {
				//cc.log("_autoLongWsk"+result[i]);
				cloneCards[result[i]].sx = 3;
			}
		}
		cloneCards = [];
		for(var i=0;i<this._cards.length;i++){
			if(this._cards[i].sx == 1){
				cloneCards.push(this._cards[i]);
			}
		}
		result = BBTAI._autoLongWsk(cloneCards);
		if(result.length > 0){
			for (var i = 0; i < result.length; i++) {
				//cc.log("_autoLongWsk"+result[i]);
				cloneCards[result[i]].sx = 2;
			}
		}

		this.sortSx();
	},

	isHasDIZHAPx:function(cards){
		this._cards = cards;
		this.sort();
		var result = BBTAI._autoLongDizha(this._cards);
		if (result.length > 0) {
			return true;
		}
		return false;
	},

	sortDeal:function(cards){
		this._cards = cards;
		this.sort();
		this.sortPaiX();
	},

	deal:function(cards){
		this._cards = cards;
		var length = this._cards.length;
		for(var i=0;i<length;i++){
			var card = this._cards[i];
			card.sx = 1;
		}
		this.sort();
	},

	sortPaiX:function(){
		//var cards = ArrayUtil.clone(this._cards);
		var length = this._cards.length;
		var temp = {};
		for(var i=0;i<length;i++){
			var card = this._cards[i];
			card.sx = 1;
			card.pxyx = 0;
		}
		var result = BBTAI._autoKing("",this._cards);
		if (result.length > 0) {
			for (var i = 0; i < result.length; i++) {
				this._cards[result[i]].sx = 11;
			}
		}
		var cloneCards = [];
		for(var i=0;i<this._cards.length;i++){
			if(this._cards[i].sx == 1){
				cloneCards.push(this._cards[i]);
			}
		}

		result = BBTAI._autoLongDizha(cloneCards);
		if (result.length > 0) {
			for (var i = 0; i < result.length; i++) {
				cloneCards[result[i]].sx = 10;
			}
		}


		cloneCards = [];
		for(var i=0;i<this._cards.length;i++){
			if(this._cards[i].sx == 1){
				cloneCards.push(this._cards[i]);
			}
		}

		result = BBTAI._autoLongTHX(cloneCards);
		if (result.length > 0) {
			for (var i = 0; i < result.length; i++) {
				cc.log("resultTHX"+result[i]);
				cloneCards[result[i]].sx = 9;
			}
		}

		cloneCards = [];
		for(var i=0;i<this._cards.length;i++){
			if(this._cards[i].sx == 1){
				cloneCards.push(this._cards[i]);
			}
		}

		result = BBTAI._autoLongBomb(cloneCards);
		if(result.length > 0){
			for (var i = 0; i < result.length; i++) {
				cc.log("resultBomb"+result[i]);
				cloneCards[result[i]].sx = 8;
			}
		}

		cloneCards = [];
		for(var i=0;i<this._cards.length;i++){
			if(this._cards[i].sx == 1){
				cloneCards.push(this._cards[i]);
			}
		}

		result = BBTAI._autoLongHeSWsk(cloneCards);
		if(result.length > 0){
			for (var i = 0; i < result.length; i++) {
				cc.log("_autoLongHeSWsk"+result[i]);
				cloneCards[result[i]].sx = 7;
			}
		}

		cloneCards = [];
		for(var i=0;i<this._cards.length;i++){
			if(this._cards[i].sx == 1){
				cloneCards.push(this._cards[i]);
			}
		}

		result = BBTAI._autoLongHoSWsk(cloneCards);
		if(result.length > 0){
			for (var i = 0; i < result.length; i++) {
				cc.log("_autoLongHoSWsk"+result[i]);
				cloneCards[result[i]].sx = 6;
			}
		}

		cloneCards = [];
		for(var i=0;i<this._cards.length;i++){
			if(this._cards[i].sx == 1){
				cloneCards.push(this._cards[i]);
			}
		}

		result = BBTAI._autoLongMhSWsk(cloneCards);
		if(result.length > 0){
			for (var i = 0; i < result.length; i++) {
				cc.log("_autoLongMhSWsk"+result[i]);
				cloneCards[result[i]].sx = 5;
			}
		}

		cloneCards = [];
		for(var i=0;i<this._cards.length;i++){
			if(this._cards[i].sx == 1){
				cloneCards.push(this._cards[i]);
			}
		}

		result = BBTAI._autoLongFkSWsk(cloneCards);
		if(result.length > 0){
			for (var i = 0; i < result.length; i++) {
				cc.log("_autoLongFkSWsk"+result[i]);
				cloneCards[result[i]].sx = 4;
			}
		}

		cloneCards = [];
		for(var i=0;i<this._cards.length;i++){
			if(this._cards[i].sx == 1){
				cloneCards.push(this._cards[i]);
			}
		}

		result = BBTAI._autoLongWsk(cloneCards);
		if(result.length > 0){
			for (var i = 0; i < result.length; i++) {
				//cc.log("_autoLongWsk"+result[i]);
				cloneCards[result[i]].sx = 3;
			}
		}
		cloneCards = [];
		for(var i=0;i<this._cards.length;i++){
			if(this._cards[i].sx == 1){
				cloneCards.push(this._cards[i]);
			}
		}
		result = BBTAI._autoLongWsk(cloneCards);
		if(result.length > 0){
			for (var i = 0; i < result.length; i++) {
				//cc.log("_autoLongWsk"+result[i]);
				cloneCards[result[i]].sx = 2;
			}
		}

		this.sortSx();
	},

	sortSx:function(){
		//var length = this._cards.length;

		var s1 = function(c1,c2){
			var pxyx1 = c1.pxyx;
			var pxyx2 = c2.pxyx;
			if(pxyx1 == pxyx2){
				var sx1 = c1.sx;
				var sx2 = c2.sx;
				if(sx1 == sx2){
					var n1 = c1.i;
					var n2 = c2.i;
					if(n1 == n2){
						var t1 = c1.t;
						var t2 = c2.t;
						return t2-t1;
					}else{
						return n2-n1;
					}
				}else{
					return sx2-sx1;
				}
			}else{
				return pxyx2-pxyx1;
			}
		}
		this._cards.sort(s1);
	},

	sort:function(){
		//var length = this._cards.length;
		var s1 = function(c1,c2){
			var n1 = c1.i;
			var n2 = c2.i;
			if(n1 == n2){
				var t1 = c1.t;
				var t2 = c2.t;
				return t2-t1;
			}else{
				return n2-n1;
			}
		}
		this._cards.sort(s1);
	},

	getContainer:function(){
		return this.iconbg;
	},



});