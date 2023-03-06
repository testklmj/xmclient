/**
 * Created by Administrator on 2017/7/21.
 */

/**
 * 俱乐部邀请弹框
 */
var ClubReleaceRoomPop = BasePopup.extend({

    ctor:function(parentNode){
        this.parentNode = parentNode;
        this._super("res/clubRemoveRoomPop.json");
    },

    selfRender:function(){
        this.btnReleaseAllRoom = this.getWidget("btnReleaseAllRoom");
        this.btnReleaseMyRoom = this.getWidget("btnReleaseMyRoom");
        this.btnReleaseOneRoom = this.getWidget("btnReleaseOneRoom");
        //转让群主
        UITools.addClickEvent(this.btnReleaseAllRoom, this , this.onReleaseAllRoom);
        //踢出成员
        UITools.addClickEvent(this.btnReleaseMyRoom, this , this.onReleaseMyRoom);
        //转让群主
        UITools.addClickEvent(this.btnReleaseOneRoom, this , this.onReleaseOneByOne);

    },

    onReleaseAllRoom:function(){
        var self = this;
        AlertPop.show("确定一键解散亲友圈中所有未开局的房间吗？",function(){
            NetworkJT.loginReq("groupAction", "dissTable", {groupId:ClickClubModel.getCurClubId() ,oUserId:PlayerModel.userId,all:"all"}, function (data) {
                if (data) {
                    cc.log("dissTable::"+JSON.stringify(data));
                    SyEventManager.dispatchEvent(SyEvent.UPDATE_CLUB_ROOM_LIST);
                    FloatLabelUtil.comText(data.message);
                }
            }, function (data) {
                cc.log("dissTable::"+JSON.stringify(data));
                FloatLabelUtil.comText(data.message);
            });
        })
        PopupManager.remove(this);
    },

    onReleaseMyRoom:function(){
        var self = this;
        AlertPop.show("将一键解散所有您创建的未开局房间，确定操作吗？",function(){
            NetworkJT.loginReq("groupAction", "dissTable", {groupId:ClickClubModel.getCurClubId() ,oUserId:PlayerModel.userId}, function (data) {
                if (data) {
                    cc.log("dissTable::"+JSON.stringify(data));
                    SyEventManager.dispatchEvent(SyEvent.UPDATE_CLUB_ROOM_LIST);
                    FloatLabelUtil.comText(data.message);
                }
            }, function (data) {
                cc.log("dissTable::"+JSON.stringify(data));
                FloatLabelUtil.comText(data.message);
            });
        })
        PopupManager.remove(this);
    },

    onReleaseOneByOne:function(){
        if(!ClickClubModel.isClubCreater()){
            FloatLabelUtil.comText("非群主不可使用该功能");
            return;
        }

        if(this.parentNode){
            this.parentNode.onShowOrHideJieBtn();
        }else{
            FloatLabelUtil.comText("解散异常，请重试");
        }
        PopupManager.remove(this);
    },

});
