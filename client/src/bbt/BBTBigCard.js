/**
 * Created by zhoufan on 2015/8/22.
 * @class
 * @extend {cc.Class}
 */
var BBTBigCard = BBTCard.extend({
	/** @lends BigCard.prototype */
	_selected:null,
	_touched:null,
	_direct:null,
	/**
	 * @construct
	 * @param cardVo {CardVo}
	 */
	ctor:function(cardVo,isnoShowKuang){
		this._selected = false;
		this._touched = false;
		this._super("bigcard",cardVo , 1);
		this.touchLayer = UICtor.cS9Img("res/ui/dtz/images/pokerbg.png",cc.rect(0,30,110,3),cc.size(155,216));
		this.touchLayer.anchorX=this.touchLayer.anchorY=0;
		this.addChild(this.touchLayer);
		//cc.log("111cardVo.sx "+cardVo.sx );
		var temp = 1;
		if(!isnoShowKuang){
			if(cardVo.sx == 10){
				this.dzSp = new cc.Sprite("res/ui/bbt/dizhakuang.png");
				this.dzSp.setScale(this._bg.width * this._bg.scale / this.dzSp.width);
				this.dzSp.x =  this._bg.width * 0.5;
				this.dzSp.y = this._bg.height * 0.5 +temp;
				this.addChild(this.dzSp);
			}else if(cardVo.sx == 9){
				this.thxSp = new cc.Sprite("res/ui/bbt/thxkuang.png");
				this.thxSp.setScale(this._bg.width * this._bg.scale / this.thxSp.width);
				this.thxSp.x =  this._bg.width * 0.5;
				this.thxSp.y = this._bg.height * 0.5 +temp;
				this.addChild(this.thxSp);
			}else if(cardVo.sx == 7 || cardVo.sx == 6 || cardVo.sx == 5 || cardVo.sx == 4){
				this.wskSp = new cc.Sprite("res/ui/bbt/zwskkuang.png");
				this.wskSp.setScale(this._bg.width * this._bg.scale / this.wskSp.width);
				this.wskSp.x = this._bg.width * 0.5;
				this.wskSp.y = this._bg.height * 0.5 +temp;
				this.addChild(this.wskSp);
			}else if(cardVo.sx == 8){
				this.bombSp = new cc.Sprite("res/ui/bbt/bombkuang.png");
				this.bombSp.setScale(this._bg.width * this._bg.scale / this.bombSp.width);
				this.bombSp.x = this._bg.width * 0.5;
				this.bombSp.y = this._bg.height * 0.5 +temp;
				this.addChild(this.bombSp);
			}
		}

		this.touchLayer.visible = false;
		this._direct = null;
	},

	//addTXPXFlag:function(){
	//	if(card)
	//},

	disableAction:function(){
		this.touchLayer.visible = true;
	},

	enableAction:function(){
		this.touchLayer.visible = false;
	},

	isEnable:function(){
		return this.touchLayer.visible;
	},

	onTouchMove:function(boolean){
		if(this._direct == null || this._direct!=boolean){
			this._direct = boolean;
			this.touchLayer.visible = !this.touchLayer.visible;
		}
	},
	touched:function(){
		this._touched = true;
	},

	untouched:function(){
		this._touched = false;
		this.touchLayer.visible = false;
	},

	isTouched:function(){
		return this._touched;
	},

	/**
	 * 选中
	 */
	selected:function(){
		if(!this._selected){
			this.y += 30;
			this._selected = true;
		}
	},

	/**
	 * 取消选中
	 */
	unselected:function(){
		if(this._selected){
			this.y -= 30;
			this._selected = false;
		}
	},

	/**
	 * 选择动作
	 */
	selectAction:function(){
		if(this._selected){
			this.unselected();
		}else{
			this.selected();
		}
	},

	clearDirect:function(){
		this._direct = null;
	},

	isSelected:function(){
		return this._selected;
	},

	letOutAnimate:function(x){
		this.runAction(cc.moveTo(0.3,x,this.y));
	}
});