/**
 * Created by mayn on 2019/5/8.
 */
var ClubCreditScoreTypePop = BasePopup.extend({
    ctor:function(parent,type){

        this.selectType = type || 0;
        this.parentLayer = parent;

        this._super("res/selectScoreType.json");
    },

    selfRender:function(){

        var configArr = ["全部","转移比赛分","赠送分","输赢分"];

        this.itemArr = [];
        var parent = this.getWidget("mainPopup");
        for(var i = 0;i<configArr.length;++i){
            var item = new SelectBox(1,configArr[i]);
            item.x = parent.width/2 - 100;
            item.y = parent.height/2 + 110 - 70*i;
            item.temp = i;
            parent.addChild(item);
            item.addChangeCb(this,this.onStateChange);

            this.itemArr.push(item);
        }

        this.setSelectItem();

        UITools.addClickEvent(this.getWidget("btnTrue"),this,this.onClickTrueBtn);
    },

    onStateChange:function(item){
        this.selectType = item.temp;
        this.setSelectItem();
    },

    setSelectItem:function(){
        for(var i = 0;i<this.itemArr.length;++i){
            this.itemArr[i].setSelected(this.itemArr[i].temp == this.selectType);
        }
    },

    onClickTrueBtn:function(){
        if(this.parentLayer && this.parentLayer.updateSelectType){
            this.parentLayer.updateSelectType(this.selectType);
        }
        this.onCloseHandler();
    },
});