/**
 * Created by zhoufan on 2016/12/2.
 */
var PHZBigResultPop = BasePopup.extend({
    user:null,
    isDaiKai:null,
    ctor: function (data,isDaiKai) {
        this.data = data;
        this.isDaiKai = isDaiKai || false;
        var json = "res/phzBigResult.json";
        this.json = json;
        this._super(json);
    },

    bigResultIsBP:function(){
        return PHZRoomModel.wanfa == PHZGameTypeModel.SYBP
    },

    bigResultIsLDFPF:function() {
        return PHZRoomModel.wanfa == PHZGameTypeModel.LDFPF
    },

    refreshSingle:function(widget,user){
        this.user=user;
        ccui.helper.seekWidgetByName(widget,"name").setString(user.name);
        var idPanel = ccui.helper.seekWidgetByName(widget,"id");
        var userId = "ID："+user.userId;
        var id = new cc.LabelBMFont(userId+"","res/font/id_bigResult.fnt");
        id.x = idPanel.width/2-8;
        id.y = idPanel.height/2;
        idPanel.addChild(id);

        //玩家身上 ext 0胡次数 1自摸 2提 3跑
        ccui.helper.seekWidgetByName(widget,"l2").setString(""+user.strExt[0]);//胡牌次数
        ccui.helper.seekWidgetByName(widget,"l3").setString(""+user.strExt[1]);//自摸次数
        ccui.helper.seekWidgetByName(widget,"l4").setString(""+user.strExt[2]);//提牌次数
        ccui.helper.seekWidgetByName(widget,"l5").setString(""+user.strExt[3]);//跑牌次数
        ccui.helper.seekWidgetByName(widget,"Label_difen").setString("");//设置底分
        ccui.helper.seekWidgetByName(widget,"Image_48").visible = false;
        ccui.helper.seekWidgetByName(widget,"Image_credit").visible = false;
        if (PHZRoomModel.isCreditRoom()){
            ccui.helper.seekWidgetByName(widget,"Label_difen").setString(""+user.winLoseCredit);//比赛分
            //ccui.helper.seekWidgetByName(widget,"Label_difen").setString(""+user.strExt[8]);//比赛分
            ccui.helper.seekWidgetByName(widget,"Image_credit").visible = true;
        }
        var totalPoint = "";
        var totalHuxi = "";
        var totalPointStr = "";
        if (this.bigResultIsBP()){
            totalHuxi = totalHuxi + user.totalPoint;
            if (user.bopiPoint > 0){
                totalPointStr = "+" + user.bopiPoint;
            }else{
                totalPointStr = totalPointStr + user.bopiPoint;
            }
            totalPoint = user.bopiPoint;
            ccui.helper.seekWidgetByName(widget,"Image_48").visible = true;
        }else if(this.bigResultIsLDFPF()){
            ccui.helper.seekWidgetByName(widget,"Image_48").visible = true;
            totalHuxi = "" + user.allHuxi;
            if (user.totalPoint > 0){
                totalPointStr = "+" + user.totalPoint;
            }else{
                totalPointStr = totalPointStr + user.totalPoint;
            }
            totalPoint = user.totalPoint;
            //ccui.helper.seekWidgetByName(widget,"Image_48").visible = true;
        }else{
            totalHuxi = "";
            if (user.totalPoint > 0){
                totalPointStr = "+" + user.totalPoint;
            }else{
                totalPointStr = totalPointStr + user.totalPoint;
            }
            totalPoint = user.totalPoint;
        }
        ccui.helper.seekWidgetByName(widget,"l1").setString(""+totalHuxi);//总胡息

        var pointTotal = ccui.helper.seekWidgetByName(widget,"p5");
        var fnt = "res/font/phz_jsj_font.fnt";
        if(parseInt(totalPoint)<0){
        	fnt = "res/font/phz_js_font.fnt";
        }


        //cc.log("totalPointStr========="+totalPointStr);
        var label = new cc.LabelBMFont(totalPointStr,fnt);
        label.x = pointTotal.width*0.45;
        label.y = pointTotal.height*0.48;
        pointTotal.addChild(label);
        var icon = ccui.helper.seekWidgetByName(widget,"icon");
        var defaultimg = (user.sex == 1) ? "res/ui/dtz/images/default_m.png" : "res/ui/dtz/images/default_w.png";
        if(icon.getChildByTag(345))
            icon.removeChildByTag(345);
        var sprite = new cc.Sprite(defaultimg);
        sprite.scale = 0.95;
        sprite.x = 40;
        sprite.y = 40;
        icon.addChild(sprite,5,345);
        //user.icon = "http://wx.qlogo.cn/mmopen/25FRchib0VdkrX8DkibFVoO7jAQhMc9pbroy4P2iaROShWibjMFERmpzAKQFeEKCTdYKOQkV8kvqEW09mwaicohwiaxOKUGp3sKjc8/0";
        if(user.icon){
            cc.loader.loadImg(user.icon, {width: 75, height: 75}, function (error, img) {
                if (!error) {
                    sprite.setTexture(img);
                }
            });
        }
        var fzImg = ccui.helper.seekWidgetByName(widget,"Image_fz");//房主图片
        fzImg.visible = false;
        if(!this.isDaiKai){
	        if(user.userId==ClosingInfoModel.ext[1]){
                fzImg.visible = true;
	        }

        }
    },


    selfRender: function () {
        var max = 0;
        var omax = 0;
        var min = 65535;
        for(var i=0;i<this.data.length;i++){
            var d = this.data[i];
            if(d.winCount >= max)
                max = d.winCount;

            if(this.bigResultIsBP()){
                if(d.bopiPoint <= min){
                    min = d.bopiPoint;
                }
                if(d.bopiPoint >= omax){
                    omax = d.bopiPoint;
                }
            }else{
                if(d.totalPoint >= omax){
                    omax = d.totalPoint;
                }
                if(d.totalPoint <= min){
                    min = d.totalPoint;
                }
            }
            //cc.log("phz打结算分数..." , d.totalPoint , d.bopiPoint)
        }

        cc.log("phz计算出的结算最大分和最小分..." , min , omax);
        for(var i=0;i<this.data.length;i++){
            var d = this.data[i];
            d.dyj = 0;
            d.zdyj = 0;
            if(this.bigResultIsBP()){
                if(d.bopiPoint == omax && omax>0)
                    d.zdyj = 1;
                if(d.bopiPoint == min)
                    d.isMin = 1;
            }else{
                if(d.totalPoint == omax && omax>0)
                    d.zdyj = 1;
                if(d.totalPoint == min)
                    d.isMin = 1;
            }
            this.refreshSingle(this.getWidget("user"+(i+1)),this.data[i]);
        }
        if(this.data.length == 3){
            this.getWidget("user4").visible = false;
            this.getWidget("user1").x = 100;
            this.getWidget("user2").x = 500;
            this.getWidget("user3").x = 900;
        }else if(this.data.length == 2){
            this.getWidget("user3").visible = false;
            this.getWidget("user4").visible = false;
            this.getWidget("user1").x = 250;
            this.getWidget("user2").x = 750;
        }
        var Button_20 = this.getWidget("Button_20");
        UITools.addClickEvent(Button_20,this,this.onShare);
        var Button_21 = this.getWidget("Button_21");
        UITools.addClickEvent(Button_21,this,this.onToHome);

        var Button_49 = this.getWidget("Button_49"); //复制总成绩
        UITools.addClickEvent(Button_49,this,this.onCopy);


        var Button_dissolution = this.getWidget("Button_dissolution");
        Button_dissolution.visible = false;
        UITools.addClickEvent(Button_dissolution,this,this.onDissolution);

        //版本号
        if(this.getWidget("Label_version")){
            this.getWidget("Label_version").setString(SyVersion.v);
        }
        var resultMsg = ClosingInfoModel.ext[9];
        cc.log("ClosingInfoModel.ext[9]=="+JSON.stringify(ClosingInfoModel.ext[9]));
        if (resultMsg){
            this.resultMsg = JSON.parse(resultMsg);
            if (this.resultMsg.dissState){
                Button_dissolution.visible = true;
            }
            cc.log("this.resultMsg"+JSON.stringify(this.resultMsg));
        }

        var ext3 = ClosingInfoModel.ext[3];
        var str = "";
        var dtimes = 0;
        var dScore = 0;
        var extStr2 = PHZRoomModel.getName(ext3);
        if (PHZRoomModel.isDouble()){
            dtimes = PHZRoomModel.getDoubleNum();
            dScore = PHZRoomModel.getDScore();
            extStr2 = extStr2 + "   小于"+ dScore +"分" + " 翻" + dtimes + "倍"
        }
        this.getWidget("ext2").setString(extStr2);
        this.getWidget("ext4").setString("");
        if (ClosingInfoModel.round){
            this.getWidget("ext4").setString("局数:"+ClosingInfoModel.round);
        }

        this.getWidget("ext5").setString("");
        if (PHZRoomModel.isCreditRoom()){
            //赠送分
            //固定赠送 大赢家 10
            //比例赠送 所有赢家 2%
            var giveStr = "";
            var giveType = PHZRoomModel.getCreditType();
            var giveWay = PHZRoomModel.getCreditWay();
            var giveNum = PHZRoomModel.getCreditGiveNum();
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

            this.getWidget("ext5").setString("底分:"+PHZRoomModel.getCreditScore() +"," + giveStr);
        }
        if (!this.bigResultIsLDFPF()){
            var clubTableId = ClosingInfoModel.ext[10];
            if (clubTableId && parseInt(clubTableId) > 0){
                str = "亲友圈ID:"+clubTableId+"  ";
            }
        }
        str = str + "房间号:"+ClosingInfoModel.ext[0];
        this.getWidget("ext1").setString(str);
        var Button_fxCard = this.getWidget("Button_fxCard");
        Button_fxCard.visible = false;
        UITools.addClickEvent(Button_fxCard,this,this.onShareCard);
        if( PHZRoomModel.tableType == 1&&ClosingInfoModel.groupLogId){//亲友圈房间才可见;
            Button_fxCard.visible = true;
            Button_fxCard.scaleX= 0.9;
            Button_21.scaleX= 0.9;
            Button_20.scaleX= 0.9;
            Button_49.scaleX= 0.9;
        }else{
            Button_21.x= 368+640;
            Button_20.x= 4+640;
            Button_49.x= -368+640;
        }

        this.getWidget("ext3").setString(ClosingInfoModel.ext[2]);
        if (PHZRoomModel.roomName){
            this.getWidget("Label_roomname").setString(PHZRoomModel.roomName+"  亲友圈ID:" + ClosingInfoModel.ext[13]);
        }else{
            this.getWidget("Label_roomname").visible = false;
            //this.getWidget("groupid").visible = false;

        }

    },
    onShareCard:function() {
        this.shareCard(PHZRoomModel, this.data, ClosingInfoModel.groupLogId);
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
        var renshu = (this.isDaiKai) ? dkResultModel.data.resList.length : PHZRoomModel.renshu;
        var str = (renshu==3) ? "3人房" : "4人房";
        var obj={};
        var tableId = (this.isDaiKai) ? dkResultModel.data.tableId : PHZRoomModel.tableId;
        obj.tableId=tableId;
        obj.userName=PlayerModel.username;
        obj.callURL=SdkUtil.SHARE_URL+'?num='+tableId+'&userId='+encodeURIComponent(PlayerModel.userId);
        obj.title='跑胡子   '+str+' 房号:'+tableId;
        obj.description="我已开好房间，【跑胡子】二缺一，就等你了！";
        obj.shareType=0;
        sy.scene.showLoading("正在截取屏幕");
        setTimeout(function(){
            sy.scene.hideLoading();
            //SharePop.show(obj);
            ShareDTPop.show(obj);
        },500);
    },

    onToHome:function(){
    	if(this.isDaiKai){
            dkRecordModel.isShowRecord = false;
            PopupManager.remove(this);
    	}else{
    		LayerManager.showLayer(LayerFactory.DTZ_HOME);
    		PopupManager.remove(this);
    		PopupManager.removeAll();
            var isClubRoom =  (PHZRoomModel.tableType ==1);
            if(isClubRoom ){
                PopupManager.removeClassByPopup(ClubHomePop);
                var mc = new ClubHomePop();//先不弹出吧
                PopupManager.addPopup(mc);
            }
    	}
    },

    onDissolution:function(){
        var mc = new PHZDissolutionPop(this.resultMsg.dissPlayer,this.data);
        PopupManager.addPopup(mc);
    },


    onCopy:function(){
        var str = "";
        str = str + "房间号:"+PHZRoomModel.tableId + "\n";
        str = str + PHZRoomModel.getName(PHZRoomModel.wanfa) + " 局数:"+ClosingInfoModel.round + "\n";
        for(var i=0;i<this.data.length;i++){
            var totalPoint = 0;
            if (this.bigResultIsBP()){
                totalPoint = this.data[i].bopiPoint;
            }else{
                totalPoint = this.data[i].totalPoint;
            }
            var playerStr = this.data[i].name + " ID:" + this.data[i].userId + " " + totalPoint;
            str = str + playerStr + "\n"
        }
        SdkUtil.sdkPaste(str);
        cc.log("当前复制的字符串为:",str);
    }

});

var PHZDissolutionPop = BasePopup.extend({

    ctor: function (dissPlayer,data) {
        this.dissPlayer = dissPlayer || [];
        this.data = data || [];
        this._super("res/phzDissolutionPop.json");
    },

    selfRender: function () {
        var dissPlayer = this.dissPlayer.split(",");
        var true_btn = this.getWidget("true_btn");
        UITools.addClickEvent(true_btn, this, this.onTrue);

        for(var i=1;i<=4;i++){
            var Image_player = this.getWidget("Image_player"+i);
            Image_player.visible = false;
        }

        if (dissPlayer){
            for(var i = 0;i < dissPlayer.length;i++){
                for(var j = 0;j < this.data.length;j++){
                    if (dissPlayer[i] == this.data[j].userId){
                        this.showPlayerinfo(this.getWidget("Image_player"+(i+1)),this.data[j]);
                    }
                }
            }
        }

    },
    showPlayerinfo:function(widget,user){
        widget.visible = true;
        ccui.helper.seekWidgetByName(widget,"name").setString(user.name);
        ccui.helper.seekWidgetByName(widget,"uid").setString("ID:"+user.userId);
        var icon = ccui.helper.seekWidgetByName(widget,"icon");
        var defaultimg = (user.sex == 1) ? "res/ui/dtz/images/default_m.png" : "res/ui/dtz/images/default_w.png";
        if(icon.getChildByTag(345))
            icon.removeChildByTag(345);
        var sprite = new cc.Sprite(defaultimg);
        sprite.scale = 0.95;
        sprite.x = 40;
        sprite.y = 40;
        icon.addChild(sprite,5,345);
        //user.icon = "http://wx.qlogo.cn/mmopen/25FRchib0VdkrX8DkibFVoO7jAQhMc9pbroy4P2iaROShWibjMFERmpzAKQFeEKCTdYKOQkV8kvqEW09mwaicohwiaxOKUGp3sKjc8/0";
        if(user.icon){
            cc.loader.loadImg(user.icon, {width: 75, height: 75}, function (error, img) {
                if (!error) {
                    sprite.setTexture(img);
                }
            });
        }
    },

    onTrue:function(){
        PopupManager.remove(this);
    }
});
