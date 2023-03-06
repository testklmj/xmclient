/**
 * Created by leiwenwen on 2018/10/15.
 */
var ClubRuleManagePop = BasePopup.extend({
    ctor:function(allBagsData,modeId){
        this.allBagsData = allBagsData || [];
        this.modeId = modeId || 0;
        this.filtrate = 1;//当前选择的页签
        this.zhipaiBagsData = [];
        this.zipaiBagsData = [];
        this.majiangBagsData = [];
        this._super("res/clubRuleManagePop.json");
    },

    selfRender:function(){
        var closeBtn = this.getWidget("close_btn");  // 前往大厅
        if(closeBtn){
            UITools.addClickEvent(closeBtn,this,this.onClose);
        }

        var Button_start = this.getWidget("Button_start");  // 现在开局
        if(Button_start){
            UITools.addClickEvent(Button_start,this,this.onStart);
        }

        var Button_join = this.getWidget("Button_join");  // 快速加入
        if(Button_join){
            UITools.addClickEvent(Button_join,this,this.onBagJoin);
        }

        this.ruleListView = this.getWidget("ListView_rule");//所有玩法的list

        this.addCustomEvent(SyEvent.UPDATE_CLUB_BAGS,this,this.onRefreshBagsData);
        this.addCustomEvent(SyEvent.CLOSE_CLUB_BAGS,this,this.onClose);
        this.onShowBagItem();

        var widgets = {"Button_1":1,"Button_2":2,"Button_3":3,"Button_4":4};
        this.addClickEvent(widgets,this.onFiltrateClick);
        this.displayFiltrate();
    },

    addClickEvent:function(widgets,selector){
        for(var key in widgets){
            var widget = this[key] = this.getWidget(key);
            if(!widget){
                //cc.log("1111");
            }else{
                widget.temp = parseInt(widgets[key]);
                UITools.addClickEvent(widget,this,selector);
            }
        }
    },

    displayFiltrate:function(){
        var values = [1,2,3,4];
        for(var i=1;i<=values.length;i++){
            var btn = this["Button_"+i];
            btn.setBright(true);

            if(this.filtrate == values[i-1])
                this.onFiltrateClick(btn);
        }
    },

    onFiltrateClick:function(obj){
        var temp = parseInt(obj.temp);
        var values = [1,2,3,4];
        for(var i=1;i<=values.length;i++){
            var txt_name = this["Button_"+i].getChildByName("txt_name")
            if(i!=temp) {
                this["Button_" + i].setBright(true);
                if (txt_name){
                    txt_name.setColor(cc.color(255 , 255 , 255))
                }
            }else{
                if (txt_name){
                    txt_name.setColor(cc.color(24 , 97 , 118))
                }
            }
        }
        var btn = this["Button_"+temp];
        btn.setBright(false);
        this.filtrate = values[temp-1];
        var data = null;
        if (this.filtrate == 1){
            data = this.allBagsData;
        }else if (this.filtrate == 2){
            data = this.zhipaiBagsData;
        }else if (this.filtrate == 3){
            data = this.zipaiBagsData;
        }else if (this.filtrate == 4){
            data = this.majiangBagsData;
        }
        if (data){
            this.showRuleListData(data);
        }
    },

    onRefreshBagsData: function(event){
        var tData = event.getUserData();
        this.allBagsData = tData;
        this.onShowBagItem();
    },

    //显示所有的包厢
    onShowBagItem : function(){
        this.zhipaiBagsData = [];
        this.zipaiBagsData = [];
        this.majiangBagsData = [];
        this.ruleListView.removeAllItems();
        for(var index = 0 ; index < this.allBagsData.length ; index++){
            var data = this.allBagsData[index];
            var groupState = data.groupState;
            if (groupState && parseInt(groupState)){
                var ruleItem = new ClubRuleItem(data , this);
                this.ruleListView.pushBackCustomItem(ruleItem);

                var createPara = data.config.modeMsg.split(",");
                if (ClubRecallDetailModel.isDTZWanfa(createPara[1]) || ClubRecallDetailModel.isPDKWanfa(createPara[1]) || ClubRecallDetailModel.isBBTWanfa(createPara[1])){
                    this.zhipaiBagsData.push(data)
                } else if (ClubRecallDetailModel.isPHZWanfa(createPara[1])){
                    this.zipaiBagsData.push(data)
                } else if (ClubRecallDetailModel.isHZMJWanfa(createPara[1]) || ClubRecallDetailModel.isSYMJWanfa(createPara[1])
                    || ClubRecallDetailModel.isCSMJWanfa(createPara[1])){
                    this.majiangBagsData.push(data)
                }
            }
        }
    },

    showRuleListData: function(bagsData){
        this.ruleListView.removeAllItems();
        for(var index = 0 ; index < bagsData.length ; index++){
            var data = bagsData[index];
            var groupState = data.groupState;
            if (groupState && parseInt(groupState)){
                var ruleItem = new ClubRuleItem(data , this);
                this.ruleListView.pushBackCustomItem(ruleItem);
            }
        }

    },

    /**
    * 刷新所有玩法按钮的状态
    * */
    refreshClubRuleChoose: function(modeId){
        var items = this.ruleListView.getItems();
        this.modeId = modeId;
        for(var index = 0 ; index < items.length ; index++){
            var item = items[index];
            item.showBtnState(modeId);
            item.updateWanfaTip(this.modeId)
        }
    },

    onBagJoin : function(){
        SyEventManager.dispatchEvent(SyEvent.CLUB_BAG_FASTJOIN);
    },

    onStart : function(){
        SyEventManager.dispatchEvent(SyEvent.CLUB_BAG_CREATE);
    },

    onClose : function(){
        PopupManager.remove(this);
    }

})