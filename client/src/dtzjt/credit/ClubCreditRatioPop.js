/**
 * Created by Administrator on 2016/6/27.
 */
var ClubCreditRatioPop = BasePopup.extend({

    ctor: function (fRoot) {
        this.fRoot = fRoot;
        this.myRate = this.fRoot.myRate || 100;
        this.TeamRatio = this.fRoot.teamRadit || 0;
        this.GroupRatio = this.myRate - this.TeamRatio;
        this.teamKeyId = this.fRoot.opUserId || 0;
        this.teamStr = "";

        cc.log("ClubCreditRatioPop==",this.myRate);
        this._super("res/clubCreditRatioPop.json");
    },

    selfRender: function () {

        for(var i=0;i<=9;i++){
            var btn = this.getWidget("Button_num"+i);
            btn.temp = i;
            UITools.addClickEvent(btn,this,this.onClick);
        }

        this.Labal_ratio1 = this.getWidget("Labal_ratio1");
        this.Labal_ratio2 = this.getWidget("Labal_ratio2");


        this.btnTrue = this.getWidget("btnTrue");
        UITools.addClickEvent(this.btnTrue,this,this.onTrue);

        var clearBtn = this.getWidget("Button_clear");
        clearBtn.visible = false;
        UITools.addClickEvent(clearBtn,this,this.onClear);

        this.initRadio();

    },

    initRadio:function(){
        this.teamStr = ""+this.TeamRatio;
        this.Labal_ratio1.setString(""+this.TeamRatio);
        this.Labal_ratio2.setString(""+this.GroupRatio);
    },

    onClick:function(obj){
        var temp = obj.temp;
        var teamStr = this.teamStr + "" + temp ;
        var num = Number(teamStr);
        if (num > this.myRate){
            num = temp ;
        }
        this.teamStr = num;
        this.TeamRatio = num;
        this.GroupRatio = this.myRate - num;
        //cc.log("onClick======",this.TeamRatio,this.GroupRatio);
        this.initRadio();
    },

    /**
     * 获取小组信息
     * 1、userId：调用接口的用户id
     *2、sessCode：调用接口的用户sessCode
     *3、groupId：俱乐部Id
     */
    onChangeRatio:function(){
        var self = this;
        NetworkJT.loginReq("groupCreditAction", "updateCommissionRate", {
            userId:PlayerModel.userId ,
            targetUserId:self.teamKeyId,
            groupId:ClickClubModel.getCurClubId(),
            commissionRate:self.TeamRatio,
            sessCode:PlayerModel.sessCode,
        }, function (data) {
            if (data) {
                if(self){
                    SyEventManager.dispatchEvent(SyEvent.UPDATA_CREDIT_RATIO);
                    FloatLabelUtil.comText("修改成功");
                    PopupManager.remove(self);
                }
            }
        }, function (data) {
            FloatLabelUtil.comText(data.message);
            PopupManager.remove(self);
        });
    },


    onTrue:function(){

//        if(ClickClubModel.isClubCreaterOrLeader() && this.TeamRatio > this.myRate*0.9){
//            FloatLabelUtil.comText("下级分成不能超过90%");
//            return;
//        }

        this.onChangeRatio();
    },

    onClear:function(){

    },

});