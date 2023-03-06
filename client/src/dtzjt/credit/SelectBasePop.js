/**
 * Created by mayn on 2019/5/8.
 */
var SelectLayout = ccui.Widget.extend({
    layoutType:1,//1--单选布局，2--多选布局
    titleStr:"",//标题文字
    listNum:4,//每行布局多少选择项

    ctor:function(titleStr,type,listNum){
        this._super();

        this.titleStr = titleStr || "";
        this.layoutType = type || 1;
        this.listNum = listNum || 4;

        this.initWidget();

    },

    initWidget:function(){
        this.titleLabel = UICtor.cLabel(this.titleStr,30,null,cc.color(116,102,65));
        this.addChild(this.titleLabel);

        this.itemContent = new ccui.Widget();
        this.addChild(this.itemContent,1);
    },

    showItemList:function(listArr){
        this.itemContent.removeAllChildren();
        this.itemArr = [];

        var lineNum = Math.ceil(listArr.length/this.listNum);

        var itemSpaceH = 70;
        var startY = itemSpaceH*(lineNum-1)/2;

        for(var i = 0;i<listArr.length;++i){
            var item = new SelectBox(this.layoutType,listArr[i]);
            item.x = 110 + (788/this.listNum)*(i%this.listNum);
            item.y = startY - itemSpaceH*parseInt(i/this.listNum);
            item.setName(listArr[i]);
            item.setTag(this.getTag() + i);
            this.itemContent.addChild(item);
            item.addChangeCb(this,this.onStateChange);

            this.itemArr.push(item);
        }
        return lineNum*itemSpaceH;
    },

    setDefault:function(idxArr){
        if(idxArr && idxArr.length > 0){
            for(var i = 0;i<idxArr.length;++i){
                this.itemArr[idxArr[i]] && this.itemArr[idxArr[i]].setSelected(true);
            }
        }
    },

    setChangeHandel:function(cb){
        this.changeHandle = cb;
    },

    onStateChange:function(item){
        if(this.layoutType == 1){
            for(var i = 0;i<this.itemArr.length;++i){
                if(this.itemArr[i] != item){
                    this.itemArr[i].setSelected(false);
                }
            }
        }

        if(this.changeHandle){
            this.changeHandle(item);
        }
    }

});

var SelectBox = ccui.Widget.extend({
    selectType:1,//1--单选框，2--复选框
    labelStr:"",//选项框文字
    changeTarget:null,
    changeCb:null,
    ctor:function(type,labelStr){
        this._super();

        this.selectType = type;
        this.labelStr = labelStr;

        this.initWidget();
    },

    addChangeCb:function(target,cb){
        this.changeTarget = target;
        this.changeCb = cb;
    },

    setItemState:function(flag){
        if(!flag && this.isSelected()){
            this.isShow = "1";
            this.setSelected(false);
        }

        if(flag && !this.isSelected() && this.isShow == "1"){
            this.setSelected(true);
            this.isShow = null;
        }

        this.checkBox.setTouchEnabled(flag);
        this.itemBtn.setTouchEnabled(flag);

        this.itemLabel.setOpacity(flag?255:50);
        this.checkBox.setOpacity(flag?255:50);

    },

    initWidget:function(){
        var resFile1 = "res/ui/dtz/selectScoreType/gou2.png";
        var resFile2 = "res/ui/dtz/selectScoreType/dian2.png";
        if(this.selectType == 1){
            this.checkBox = new ccui.CheckBox(resFile2,resFile2,resFile2.replace(/2/,"1"),null,null,ccui.Widget.LOCAL_TEXTURE);
        }else{
            this.checkBox = new ccui.CheckBox(resFile1,resFile1,resFile1.replace(/2/,"1"),null,null,ccui.Widget.LOCAL_TEXTURE);
            this.checkBox.y = 2;
            this.checkBox.x = 4;
        }
        this.checkBox.addEventListener(this.onClickBox,this);
        this.addChild(this.checkBox);

        this.itemLabel = UICtor.cLabel(this.labelStr,26,null,cc.color(116,102,65));
        this.itemLabel.setAnchorPoint(0,0.5);
        this.itemLabel.setPosition(30,0);
        this.addChild(this.itemLabel);

        var img = "res/ui/dtz/selectScoreType/light_touming.png";
        var itemBtn = ccui.Button(img,img,"");
        itemBtn.ignoreAnchorPointForPosition(false);
        itemBtn.ignoreContentAdaptWithSize(false);
        itemBtn.setScale9Enabled(true);
        itemBtn.setAnchorPoint(0,0.5);
        itemBtn.setContentSize(cc.size(160,40));
        itemBtn.setPosition(30,0);
        itemBtn.addClickEventListener(this.onClickBtn.bind(this));
        this.addChild(itemBtn);

        this.itemBtn = itemBtn;

    },

    onClickBox:function(target,type){
        if(type == ccui.CheckBox.EVENT_SELECTED){

        }else if(type == ccui.CheckBox.EVENT_UNSELECTED){
            if(this.selectType == 1){
                this.checkBox.setSelected(true);
            }
        }
        if((this.selectType == 1 && type == ccui.CheckBox.EVENT_SELECTED) || this.selectType == 2){
            this.changeCb && this.changeCb.call(this.changeTarget,this);
        }
        this.setLabelColor();
    },

    onClickBtn:function(){
        if(this.selectType == 1 ){
            if(!this.checkBox.isSelected()){
                this.checkBox.setSelected(true);
                this.changeCb && this.changeCb.call(this.changeTarget,this);
            }
        }else{
            this.checkBox.setSelected(!this.checkBox.isSelected());
            this.changeCb && this.changeCb.call(this.changeTarget,this);
        }
        this.setLabelColor();
    },

    setSelected:function(flag){
        this.checkBox.setSelected(flag);
        this.setLabelColor();
    },

    isSelected:function(){
        return this.checkBox.isSelected();
    },

    setLabelColor:function(){
        var color = cc.color(116,102,65);
        if(this.checkBox.isSelected()){
            color = cc.color(212,59,43);
        }
        this.itemLabel.setColor(color);
    },



});