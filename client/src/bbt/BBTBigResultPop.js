var BBTBigResultPop = BasePopup.extend({
    user:null,
    ctor: function (data,isDaiKai) {
        this.data = data;
        this.isDaiKai = isDaiKai || false;
        this._super("res/bbtbigResult.json");
    },

    refreshSingle:function(widget,user){
        this.user=user;
        ccui.helper.seekWidgetByName(widget,"n").setString(user.name);
        ccui.helper.seekWidgetByName(widget,"Label_id").setString(""+user.userId);
        ccui.helper.seekWidgetByName(widget,"Label_zj").setString(user.ext[3]+"次");
        ccui.helper.seekWidgetByName(widget,"Label_sy").setString(user.ext[4]+"次");
        ccui.helper.seekWidgetByName(widget,"Label_sl").setString(user.winCount+"局");

        ccui.helper.seekWidgetByName(widget,"Image_credit").visible = false;
        ccui.helper.seekWidgetByName(widget,"Label_credit").setString("");
        var pointTotal = ccui.helper.seekWidgetByName(widget,"Panel_zcj");
        if (BBTRoomModel.isCreditRoom()){
            pointTotal.y = pointTotal.y + 10;
            ccui.helper.seekWidgetByName(widget,"Image_credit").visible = true;
            ccui.helper.seekWidgetByName(widget,"Label_credit").setString("" + user.ext[9]);
        }


        var fnt = "res/font/dn_bigResult_font_1.fnt";
        if(parseInt(user.totalPoint)<0)
            fnt = "res/font/dn_bigResult_font_2.fnt";
        var label = new cc.LabelBMFont(user.totalPoint+"",fnt);
        label.x = pointTotal.width/2;
        label.y = pointTotal.height/2+1;
        pointTotal.addChild(label);


        var icon = ccui.helper.seekWidgetByName(widget,"PlayerIcon");
        var defaultimg = "res/ui/dtz/dtzCom/default_m.png" ;
        if(icon.getChildByTag(345))
            icon.removeChildByTag(345);
        var sprite = new cc.Sprite(defaultimg);
        sprite.x = 42;
        sprite.y = 42;
        sprite.setScale(0.8);

        icon.addChild(sprite,5,345);
        //user.icon = "http://wx.qlogo.cn/mmopen/25FRchib0VdkrX8DkibFVoO7jAQhMc9pbroy4P2iaROShWibjMFERmpzAKQFeEKCTdYKOQkV8kvqEW09mwaicohwiaxOKUGp3sKjc8/0";
        if(user.icon){
            cc.loader.loadImg(user.icon, {width: 252, height: 252}, function (error, img) {
                if (!error) {
                    sprite.setTexture(img);
                    //sprite.scale=0.8;
                }
            });
        }
    },

    selfRender: function () {

        cc.log("BBT bigResult selfRender...2");

        var max = 0;
        var min = 65535;
        for(var i=0;i<this.data.length;i++){
            var d = this.data[i];
            if(d.totalPoint >= max)
                max = d.totalPoint;
            if(d.totalPoint <= min)
                min = d.totalPoint;
        }
        this.maxPoint = max;
        this.minPoint = min;
        for(var i=0;i<this.data.length;i++){
            var d = this.data[i];
            d.dyj = 0;
            if(d.totalPoint == max)
                d.dyj = 1;
            this.refreshSingle(this.getWidget("player"+(i+1)),this.data[i]);
        }
        for(;i<3;i++){
            this.getWidget("player"+(i+1)).visible = false;
        }
        var Button_20 = this.getWidget("Button_20");
        UITools.addClickEvent(Button_20,this,this.onShare);
        var Button_21 = this.getWidget("Button_21");
        UITools.addClickEvent(Button_21,this,this.onToHome);

        var isZwsk ="正510K不分花色";
        if(ClosingInfoModel.ext[9] == 1){
            isZwsk = "正510K分花色";
        }
        var iskc ="";
        if(ClosingInfoModel.ext[8] == 1){
            iskc = "可锤";
        }

        var iszd ="";
        if(ClosingInfoModel.ext[10] == 1){
            iszd = "助陡";
        }

        var isJLB = "";
        if(ClosingInfoModel.ext[18] == 1){
            //isJLB = "亲友圈";

            //显示亲友圈ID
            var  clubIdStr = "";
            var clubId = ClosingInfoModel.ext[19] || 0;
            if (clubId){
                clubIdStr = "亲友圈ID:"+clubId;
            }
            isJLB = clubIdStr;
        }

        var creditStr = "";
        if (BBTRoomModel.isCreditRoom()){
            //赠送分
            //固定赠送 大赢家 10
            //比例赠送 所有赢家 2%
            var giveStr = "";
            var giveType = BBTRoomModel.getCreditType();
            var giveWay = BBTRoomModel.getCreditWay();
            var giveNum = BBTRoomModel.getCreditGiveNum();
            if (giveType == 1){
                giveStr = giveStr + "固定赠送,";
            }else{
                giveStr = giveStr + "比例赠送,";
            }
            if (giveWay == 1){
                giveStr = giveStr + "大赢家,";
            }else{
                giveStr = giveStr + "所有赢家,";
            }
            if (giveType == 1){
                giveStr = giveStr + giveNum;
            }else{
                giveStr = giveStr + giveNum + "%";
            }
            creditStr = "底分:"+BBTRoomModel.getCreditScore() + "," + giveStr;
        }

        var roomName = "";
        if (BBTRoomModel.roomName){
            roomName = BBTRoomModel.roomName;
        }

        //显示局数
        this.getWidget("Label_RoomDetail").setString("房号:"+ClosingInfoModel.ext[0]+"    局数:"+ClosingInfoModel.ext[4]+"/"+ClosingInfoModel.ext[5]
            +"  " + creditStr +"\n"
            +isZwsk+"  "+iskc+"  "+iszd + " "+isJLB+ "\n"+SyVersion.v+"        "+ClosingInfoModel.ext[2] + "  " +roomName);
        var Button_fxCard = this.getWidget("Button_fxCard");
        Button_fxCard.visible = false;
        UITools.addClickEvent(Button_fxCard,this,this.onShareCard);
        var isClubRoom = ClosingInfoModel.ext[18] || 0;
        if( isClubRoom>0&&ClosingInfoModel.groupLogId){//亲友圈房间才可见;
            Button_fxCard.visible = true;
            Button_fxCard.scaleX= 0.9;
            Button_21.scaleX= 0.9;
            Button_20.scaleX= 0.9;
        }else{
            Button_21.x= 80+640;
            Button_20.x= 380+640;
        }


    },
    onShareCard:function() {
        this.shareCard(BBTRoomModel, this.data, ClosingInfoModel.groupLogId);
    },

    /**
     * 分享战报
     */
    onShare:function(){
        var winSize = cc.director.getWinSize();
        var texture = new cc.RenderTexture(winSize.width, winSize.height);
        if (!texture)
            return;
        texture.anchorX = 0;
        texture.anchorY = 0;
        texture.begin();
        this.visit();
        texture.end();
        texture.saveToFile("share_pdk.jpg", cc.IMAGE_FORMAT_JPEG, false);

        var obj={};
        obj.tableId=BBTRoomModel.tableId;
        obj.userName=PlayerModel.username;
        obj.callURL=SdkUtil.SHARE_URL+'?userName='+encodeURIComponent(PlayerModel.name);
        obj.title="半边天炸   房号:"+BBTRoomModel.tableId;
        obj.description="我已开好房间,纯技术实力的对决,一起跑得快！";
        obj.shareType=0;
        sy.scene.showLoading("正在截取屏幕");
        setTimeout(function(){
            sy.scene.hideLoading();
            //SharePop.show(obj);
            ShareDTPop.show(obj);
        },500);
    },

    onToHome:function(){
        var isClubRoom = ClosingInfoModel.ext[18] || 0;

        LayerManager.showLayer(LayerFactory.HOME);
        PopupManager.remove(this);
        PopupManager.removeAll();

        if(isClubRoom > 0){
            PopupManager.removeClassByPopup(ClubHomePop);
            var mc = new ClubHomePop();//先不弹出吧
            PopupManager.addPopup(mc);
        }
    }
});