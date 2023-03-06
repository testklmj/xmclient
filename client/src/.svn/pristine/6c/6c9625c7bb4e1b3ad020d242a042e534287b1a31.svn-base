/**
 * Created by Administrator on 2016/6/27.
 */
var ClubCreditInputPop = BasePopup.extend({

    ctor: function (index,fRoot) {
        this.fRoot = fRoot;
        this.inputStr = "";
        this.index = index || 0;
        this._super("res/clubCreditInputPop.json");
    },

    selfRender: function () {

        for(var i=0;i<=9;i++){
            var btn = this.getWidget("btn"+i);
            btn.temp = i;
            UITools.addClickEvent(btn,this,this.onClick);
        }


        this.btnd = this.getWidget("btnd");
        this.btnd.temp = ".";
        this.btnd.visible = false;
        UITools.addClickEvent(this.btnd,this,this.onClick);

        this.inputNum = this.getWidget("inputNum");
        this.inputNum.setString("");

        this.inputTip = this.getWidget("inputTip");

        var btnreset = this.getWidget("btnr");
        UITools.addClickEvent(btnreset,this,this.onReset);

        this.btnTrue = this.getWidget("btnTrue");
        UITools.addClickEvent(this.btnTrue,this,this.onTrue);

        this.showInputTip();

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

    onTrue:function(){
        if (this.index == 1 || this.index == 2 || this.index == 5 || this.index == 6 || this.index == 7){
            if (this.inputStr == "" || !this.isNumberOrCharacter(this.inputStr)){
                FloatLabelUtil.comText("输入的必须为整数");
                return
            }
        }

        if (this.index == 5 || this.index == 6){
            if (this.fRoot){
                this.fRoot.upDateCreditNum({temp:this.index,num:this.inputStr})
            }
        }else{
            SyEventManager.dispatchEvent(SyEvent.UPDATA_CREDIT_NUM,{temp:this.index,num:this.inputStr});
        }
        PopupManager.remove(this);
    },

    showInputTip:function(){
        var str = "";
        if (this.index == 1){
            str = "请输入最低比赛分";
        }else if (this.index == 2){
            str = "请输入最低踢出分";
        }else if (this.index == 3){
            str = "请输入赠送分";
        }else if (this.index == 4){
            str = "请输入底分";
        }else if (this.index == 5){
            str = "请输入增加的比赛分";
        }else if (this.index == 6){
            str = "请输入减少的比赛分";
        }else if (this.index == 7){
            str = "请输入赠送初始分";
        }
        this.inputTip.setString(""+str);
    },

    onReset:function(){
        this.inputNum.setString("");
        this.inputStr = "";
    },


    onClick:function(obj){
        var temp = obj.temp;
        this.inputStr = this.inputStr + temp;
        this.inputNum.setString("" + this.inputStr);
    }
});