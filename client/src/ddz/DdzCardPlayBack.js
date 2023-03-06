/**
 * Created by zhoufan on 2015/8/15.
 * @class
 * @extend {cc.Class}
 */
var DdzCardPlayBack = cc.Class.extend({
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
		this.seq = seq;
		this.iconbg = ccui.helper.seekWidgetByName(root,"player"+seq);
		this.iconbg.temp = vo.seat;
		this.iconbg.visible = true;
		this.name = ccui.helper.seekWidgetByName(root,"name"+seq);
		this.name.setString(vo.name);
		this.statusImg = ccui.helper.seekWidgetByName(root,"ybq"+seq);
		this.statusTexture = "";
		this.bt = ccui.helper.seekWidgetByName(root,"bt"+seq);
		this.zj = ccui.helper.seekWidgetByName(root,"zj"+seq);
		this.zj.setLocalZOrder(10);
		this.zj.visible = false;
		this.xz = ccui.helper.seekWidgetByName(root,"xz"+seq);
		this.xz.visible = false;
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
	},
	showDIzhu:function()
	{
		this.zj.visible = true;
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
			var sten = new cc.Sprite("res/ui/ddz/room/room_img_0014.png");
			var clipnode = new cc.ClippingNode();
			if(this.seq == 1){
				clipnode.attr({stencil: sten, anchorX: 0.5, anchorY: 0.5, x: 50, y: 50, alphaThreshold: 0.8});
			}else{
				clipnode.attr({stencil: sten, anchorX: 0.5, anchorY: 0.5, x: 53+18, y: 123, alphaThreshold: 0.8});
			}
			//var clipnode = new cc.ClippingNode();
			//clipnode.attr({stencil: sten, anchorX: 0.5, anchorY: 0.5, x: 53, y: 53, alphaThreshold: 0.8});
			clipnode.addChild(sprite);
			this.iconbg.addChild(clipnode,5,345);
			var self = this;
			cc.loader.loadImg(this._playerVo.icon, {width: 252, height: 252}, function (error, img) {
				if (!error) {
					sprite.setTexture(img);
					sprite.x = 0;
					sprite.y = 0;
				}else{
					self._iconUrl = "";
				}
			});
		}else{
			if(this.seq == 1){
				sprite.x = sprite.y = 50;
			}else{
				sprite.x = 53+18;
				sprite.y = 123;
			}

			this.iconbg.addChild(sprite,5,345);
		}
	},

	getPath:function(sex,audioName){
		var path = (sex==1) ? "man/" : "woman/";
		return "res/audio/ddz/"+path+audioName;
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
			cc.log(this._playerVo.sex);
		AudioManager.play(this.getPath(this._playerVo.sex,"buyao.wav"));
		if(old && old == texture)
			return;
		this.statusTexture = texture;
		this.statusImg.loadTexture(texture);
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
		PlayBackModel.baoting(this._playerVo.seat);
		var self = this;
		setTimeout(function(){AudioManager.play(self.getPath(self._playerVo.sex,"baojing.wav"));},1000);
	},

	/**
	 * 拥有的牌
	 * @returns {null}
	 */
	getCards:function(){
		return this._cards;
	},

	deal:function(cards){
		this._cards = cards;
		this.sort();
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
	}

});