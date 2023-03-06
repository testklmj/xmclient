/**
 * Created by zhoufan on 2015/8/15.
 * @class
 * @extend {ccui.Widget}
 */
var BBTCard = ccui.Widget.extend({
	/** @lends Card.prototype */
	_cardVo:null,
	_prefix:null,
	cardId:null,
	_bg:null,
	/**
	 * @construct
	 * @param cardVo {CardVo}
	 */
	ctor:function(prefix,cardVo){
		this._prefix = prefix;
		this._super();
		//背景
		this._cardVo = cardVo;
		var color = cardVo.t;
		var number = cardVo.n;
		var bg = this._bg = new cc.Sprite("#bbt_bcard_"+color+"_"+number+".png");
		this.setContentSize(bg.width,bg.height);
		bg.x = bg.width/2;
		bg.y = bg.height/2;
		this.addChild(bg);
	},

	/**
	 * 获取数据模型
	 * @returns {CardVo}
	 */
	getData:function(){
		return this._cardVo;
	}
});