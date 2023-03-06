var ClubCreditCreatePop = BasePopup.extend({

    ctor:function(creditParms,isCredit){
        this.creditParms = [];
        if (isCredit && parseInt(isCredit)){
            this.creditParms = creditParms || [];
        }
        this._super("res/clubCreditCreatePop.json");
    },


    selfRender:function(){


        this.initData();

        this.Button_36 = this.getWidget("Button_36");
        UITools.addClickEvent(this.Button_36,this,this.onTrue);

        //选择固定还是比例的赠送
        var widgetGive = {"Button_give1" : 1  , "Label_give1" : 1,"Button_give2":2,"Label_give2":2};
        this.addDtzClickEvent(widgetGive,this.onGiveType);
        this.displayGiveType();

        //选择大赢家还是所有赢家
        var widgetGiveWay = {"Button_giveWay1":1,"Label_giveWay1":1,"Button_giveWay2":2,"Label_giveWay2":2};
        this.addDtzClickEvent(widgetGiveWay,this.onGiveWay);
        this.displayGiveWay();


        //隐藏比例赠送，所有赢家
        this.Button_give2.visible = this.Label_give2.visible = this.Button_giveWay2.visible = this.Label_giveWay2.visible = false;



        this.inputJoin = this.getWidget("Label_join");
        this.inputExit = this.getWidget("Label_exit");
        this.inputScore = this.getWidget("Label_giveScore");
        this.inputDf = this.getWidget("Label_dfScore");
        this.inputGiveStart = this.getWidget("Label_startScore");
        this.inputQzbd = this.getWidget("Label_qzbd");


        this.inputJoin.setString("");
        this.inputExit.setString("");
        this.inputScore.setString("");
        this.inputDf.setString("");
        this.inputGiveStart.setString("");
        this.inputQzbd.setString("");

        //输入金额
        var widgetInput = {"Image_join" : 1  , "Image_exit" : 2,"Image_score":3,"Image_score_df":4,"Image_score_start":7,"Image_score_qzbd":8};
        this.addDtzClickEvent(widgetInput,this.onInputNumber);


        this.showInitData();

        this.addCustomEvent(SyEvent.UPDATA_CREDIT_NUM,this,this.upDateCreditNum);

        this.btn_help = this.getWidget("btn_help");
        this.btn_help.addTouchEventListener(this.onClickHelpBtn,this);
    },

    onClickHelpBtn:function(sender,type){
        if(type == ccui.Widget.TOUCH_BEGAN){
            this.showHelp(true);
        }else if(type == ccui.Widget.TOUCH_ENDED || type == ccui.Widget.TOUCH_CANCELED){
            this.showHelp(false);
        }
    },

    showHelp:function(isShow){
        if(isShow){
            if(!this.helpBg){
                var di = cc.Scale9Sprite("res/ui/bjdmj/di.png");
                di.setContentSize(300,200);
                di.setPosition(cc.winSize.width/2 + 20,cc.winSize.height/2 + 50);
                this.addChild(di,2);

                this.helpBg = di;

                var str  = "该保底赠送分在未产生赠送分且比赛输赢分不为0时触发，且仅提供给群主,不参与赠送分成";

                var label = new cc.LabelTTF(str,"Arial",24);
                label.setColor(cc.color.BLACK);
                label.setDimensions(cc.size(di.width - 40,0));
                label.setPosition(di.width/2,di.height/2);
                di.addChild(label);
            }
            this.helpBg.setVisible(true);
        }else{
            this.helpBg && this.helpBg.setVisible(false);
        }
    },

    upDateCreditNum: function(event) {
        var data = event.getUserData();
        var temp = data.temp;
        var num = data.num;
        var numStr = Number(num);
        if (temp == 1){
            if ( numStr <= 0){
                FloatLabelUtil.comText("不能小于等于0");
                return
            }else if ( numStr < this.exitScore){
                FloatLabelUtil.comText("不能小于踢出分");
                return
            }
            this.joinScore = numStr;
            this.inputJoin.setString(numStr);
        }else if (temp == 2){
            if ( numStr <= 0){
                FloatLabelUtil.comText("不能小于等于0");
                return
            }else if ( numStr > this.joinScore){
                FloatLabelUtil.comText("不能大于参与分");
                return
            }
            this.exitScore = numStr;
            this.inputExit.setString(numStr);
        }else if (temp == 3){
            var str = numStr;
            if (this.giveType == 2){
                if ( numStr < 0 || numStr > 100){
                    FloatLabelUtil.comText("比例不能超过100%");
                    return
                }
                str = str + "%";
            }
            this.giveScore = numStr;
            this.inputScore.setString(str);
        }else if (temp == 4){
            if ( numStr <= 0){
                FloatLabelUtil.comText("不能小于等于0");
                return
            }
            this.dfScore = numStr;
            this.inputDf.setString(numStr);
        }else if (temp == 7){
            if ( numStr <= 0){
                FloatLabelUtil.comText("不能小于等于0");
                return
            }

            if ( numStr <= this.giveScore){
                FloatLabelUtil.comText("初始赠送分必须大于赠送分");
                return
            }

            this.giveStart = numStr;
            this.inputGiveStart.setString(numStr);
        }else if(temp == 8){
            if ( numStr < 0){
                FloatLabelUtil.comText("不能小于0");
                return
            }
            if ( numStr > this.giveScore){
                FloatLabelUtil.comText("群主保底赠送分不能大于赠送分");
                return
            }

            this.qzbdFen = numStr;
            this.inputQzbd.setString(numStr);
        }

        //cc.log("upDateCreditNum",temp,num)
    },

    onInputNumber: function(obj) {
        var temp = obj.temp;
        var mc = new ClubCreditInputPop(temp);
        PopupManager.addPopup(mc);
    },

    showInitData: function() {
        this.inputJoin.setString(this.joinScore);
        this.inputExit.setString(this.exitScore);
        var str = this.giveScore;
        if (this.giveType == 2){
            str = str + "%";
        }
        this.inputScore.setString(str);
        this.inputDf.setString(this.dfScore);
        this.inputGiveStart.setString(this.giveStart);
        this.inputQzbd.setString(this.qzbdFen);
    },

    initData: function() {
        //最低参加分
        this.joinScore = this.creditParms[0] || 1;
        //最低踢出分
        this.exitScore = this.creditParms[1] || 1;
        //底分
        this.dfScore = this.creditParms[2] || 1;
        //赠送分
        this.giveScore = this.creditParms[3] || 0;
        //1固定2比例
        this.giveType = 1;
        //1大赢家2是AA制
        this.giveWay = 1;
        //赠送初始分
        this.giveStart = this.creditParms[6] || 0;
        //群主保底赠送分
        this.qzbdFen = this.creditParms[7] || 0;
    },

    isHasData: function(_string) {
        if (!_string || _string == "") {
            return false;
        }
        return true;
    },

    /**
     * ---------------------
     *作者：o向阳花o
     *来源：CSDN
     *原文：https://blog.csdn.net/w_han__/article/details/78048757
     *版权声明：本文为博主原创文章，转载请附上博文链接！
     **/
    isNumberOrCharacter: function(_string) {
        var charecterCount = 0;
        for(var i=0; i < _string.length; i++){
            var character = _string.substr(i,1);
            var temp = character.charCodeAt();
            if (48 <= temp && temp <= 57){

            }else if(temp == 88){
                charecterCount += 1;
            }else if(temp == 120){
                charecterCount += 1;
            }else{
                return false;
            }
        }
        if(charecterCount <= 1){
            return true
        }
    },

    onGiveType:function(obj){
        var values = [1,2];
        var temp = obj.temp;
        if (this.giveType != obj.temp){
            this.giveScore = 0;
            this.inputScore.setString(this.giveScore);
        }
        for (var i = 1; i <= values.length ;i++){
            var btn = this.getWidget("Button_give"+i);
            var text = this.getWidget("Label_give"+i);
            if (temp == values[i-1]){
                btn.setBright(true);
                text.setColor(cc.color(254 , 115 , 34))
            }else{
                btn.setBright(false);
                text.setColor(cc.color(93 , 33 , 7));
            }
        }
        this.giveType = temp;
    },

    displayGiveType:function(){
        var values = [1,2];
        for (var i = 1; i <= values.length ;i++){
            var btn = this.getWidget("Button_give"+i);
            var text = this.getWidget("Label_give"+i);
            if (this.giveType == values[i-1]){
                btn.setBright(true);
                text.setColor(cc.color(254 , 115 , 34))
            }else{
                btn.setBright(false);
                text.setColor(cc.color(93 , 33 , 7));
            }
        }

    },

    onGiveWay:function(obj){
        var values = [1,2];
        var temp = obj.temp;
        for (var i = 1; i <= values.length ;i++){
            var btn = this.getWidget("Button_giveWay"+i);
            var text = this.getWidget("Label_giveWay"+i);
            if (temp == i){
                btn.setBright(true);
                text.setColor(cc.color(254 , 115 , 34))
            }else{
                btn.setBright(false);
                text.setColor(cc.color(93 , 33 , 7));
            }
        }
        this.giveWay = values[temp -1];
    },

    displayGiveWay:function(){
        var values = [1,2];
        for (var i = 1; i <= values.length ;i++){
            var btn = this.getWidget("Button_giveWay"+i);
            if (this.giveWay == values[i-1]){
                this.onGiveWay(btn);
            }
        }
    },

    onTrue:function(){
        var creditParms = [this.joinScore,this.exitScore,this.dfScore,this.giveScore,this.giveType,this.giveWay,this.giveStart,this.qzbdFen];
        SyEventManager.dispatchEvent(SyEvent.UPDATA_CREDIT_PARMS,creditParms);
        //return creditParms;
        PopupManager.remove(this);
    },

    addClickEvent:function(widgets,selector){
        for(var key in widgets){
            var widget = this[key] = this.getWidget(key);
            widget.temp = parseInt(widgets[key]);
            UITools.addClickEvent(widget,this,selector);
        }
    },

    getWidget:function(name){
        return ccui.helper.seekWidgetByName(this.root,name);
    },

    getLocalItem:function(key){
        var val = cc.sys.localStorage.getItem(key);
        if(val)
            val = parseInt(val);
        return val;
    },

    addDtzClickEvent:function(widgets , selector){
        for(var key in widgets){
            var widget = this[key] = this.getWidget(key);
            //cc.log("key ..." , widgets , key)
            widget.temp = parseInt(widgets[key]);
            UITools.addClickEvent(widget,this,selector);
        }
    },

})