/**
 * Created by zhoufan on 2015/8/22.
 * @class
 * @extend {cc.Class}
 */
var BBTSmallCard = BBTCard.extend({
    /**
     * @construct
     * @param cardVo {CardVo}
     */
    ctor:function(cardVo , cardType){
        var cardType = cardType || 1;
        this._selected = false;
        this._touched = false;
        this._super("smallcard" , cardVo , cardType);
        this.i = cardVo.i;
        this.t = cardVo.t;
        this.n = cardVo.n;
        this.c = cardVo.c;
    },

    letYHandOutAnimate:function(room){
        var action = cc.sequence(cc.moveTo(0.3,125,0),cc.hide(), cc.callFunc(function () {
           room.runZKAnimate();
        }));
        this.runAction(action);
    },
    letOutAnimate:function(count,initx){
        this.runAction(cc.moveTo(0.3,initx+20*count,0));
    }
});