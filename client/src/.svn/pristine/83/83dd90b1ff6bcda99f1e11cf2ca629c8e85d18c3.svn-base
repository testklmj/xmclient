/**
 * Created by zhoufan on 2015/8/22.
 * @class
 * @extend {cc.Class}
 */
var DdzBigCard = Card.extend({
	/** @lends BigCard.prototype */
	_selected:null,
	_touched:null,
	_direct:null,
	/**
	 * @construct
	 * @param cardVo {CardVo}
	 */
	ctor:function(cardVo){
		this._selected = false;
		this._touched = false;
		this._super("bigcard",cardVo);
		//cc.size(140,194)
		this.touchLayer = UICtor.cS9Img("res/ui/ddz/images/pokerbg.png",cc.rect(55,55,1,1),cc.size(126,173));
		this.touchLayer.anchorX=this.touchLayer.anchorY=0;
		this.touchLayer.y = 0;
		this.addChild(this.touchLayer);
		this.touchLayer.visible = false;
		this._direct = null;
	},

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
			this.y += 20;
			this._selected = true;
		}
	},

	/**
	 * 取消选中
	 */
	unselected:function(){
		if(this._selected){
			this.y -= 20;
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
		this.runAction(cc.moveTo(1,x,this.y));
	}
});