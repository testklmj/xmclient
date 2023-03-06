/**
 * Created by zhoufan on 2016/6/30.
 */
var DdzSmallResultPop = BasePopup.extend({

    ctor: function (data) {
        this.data = data;
        this._super("res/ddzSmallResult.json");
    },

    selfRender: function () {
        //this.qiepaiImg = this.getWidget("Image_21");
        //this.qiepaiImg.visible = ClosingInfoModel.cutCard.length>0;
        //this.data.sort(this.sortByPoint);
        for(var i=0;i<this.data.length;i++) {
            if (this.data[i].userId == PlayerModel.userId) {
                if(this.data[i].point < 0) {
                    this.getWidget("main2").loadTexture("res/ui/ddz/smallResult/shibai.png");
                    AudioManager.play("res/audio/common/audio_lose.mp3");
                }else {
                    AudioManager.play("res/audio/common/audio_win.mp3");
                }
                break;
            }
        }
        for(var i=0;i<this.data.length;i++){
            var seq = i+1;
            var user = this.data[i];
            this.getWidget("n"+seq).setString(user.name);

            // this.getWidget("ID"+seq).setString("ID:"+user.userId);
            var fnt = (user.point>=0) ? "res/font/chenghong.fnt" : "res/font/lanse.fnt";
            var l = this.getWidget("df"+seq);
            l.setString(user.userId+"");

            var j = this.getWidget("bs"+seq);
            j.setString(ClosingInfoModel.ext[11]+"");

            var bomb = this.getWidget("bomb"+seq);
            bomb.setString("x"+user.boom);

            var fs = this.getWidget("fs"+seq);
            fs.setString("");


            var dz = this.getWidget("d"+seq);
            dz.visible = false;
            if(user.seat == ClosingInfoModel.ext[4]){
                dz.visible = true;
            }
            if(user.point > 0){
                user.point = "+"+user.point;
            }
            var zflabel = new cc.LabelBMFont(user.point+"",fnt);
            zflabel.x = fs.width/2;
            zflabel.y = fs.height/2;
            fs.addChild(zflabel);

            if(seq == 2 && (ClosingInfoModel.ext[10] == 1 || ClosingInfoModel.ext[10] == 2)){
                this.getWidget("qg"+seq).visible = true;
            }else{
                this.getWidget("qg"+seq).visible = false;
            }

        }
        for(;i<3;i++){
            var seq = i+1;
            this.getWidget("bs"+seq).visible = false;
            this.getWidget("fs"+seq).visible = false;
            this.getWidget("n"+seq).visible = false;
            this.getWidget("bomb"+seq).visible = false;
            this.getWidget("qg"+seq).visible = false;
            this.getWidget("df"+seq).visible = false;
            this.getWidget("d"+seq).visible = false;
            //  this.getWidget("ID"+seq).visible = false;
        }
        for(var j=0;j<ClosingInfoModel.cutCard.length;j++){
            var card = new DdzBigCard(DdzAI.getCardDef(ClosingInfoModel.cutCard[j]));
            card.scale=0.4;

            card.x = 640+j*25;
            card.y = 250;

            this.root.addChild(card);
        }
        this.issent = false;
        this.addCustomEvent(SyEvent.SETTLEMENT_SUCCESS,this,this.onSettlement);
        var btnok = this.getWidget("btnok");
        UITools.addClickEvent(btnok,this,this.onOk);
        this.getWidget("Label_bbh").setString(SyVersion.v);
        //this.Label_43 = this.getWidget("Label_43");
        //this.Label_43.visible = false;
        this.dt = 0;
        this.start = 3;
        if(DdzRoomModel.isGameSite>0)
            this.scheduleUpdate();
    },

    onSettlement:function(){
        PopupManager.remove(this);
    },

    update:function(dt){
        this.dt += dt;
        if(this.dt >= 1){
            this.dt = 0;
            if(!this.issent){
                this.start--;
                if(this.start <= 0){
                    this.unscheduleUpdate();
                    this.onOk();
                    return;
                }
                this.Label_43.setString(this.start+"秒后自动关闭");
            }
        }
    },

    onOk:function(){
        var data = this.data;
        cc.log("111");
        if(DdzRoomModel.isGameSite>0){
            //LayerManager.showLayer(LayerFactory.HOME);
            //PopupManager.remove(this);
            //PopupManager.removeAll();
            //sySocket.sendComReqMsg(201,[],"");
        }else{
            if(DdzRoomModel.nowBurCount == DdzRoomModel.totalBurCount){//最后的结算
                cc.log("222");
                PopupManager.remove(this);
                //var mc = new BigResultPop(data);
                //PopupManager.addPopup(mc);
            }else{
                cc.log("333");
                this.issent = true;
                sySocket.sendComReqMsg(3);
            }
        }
    },

    onClose:function(){
        this.unscheduleUpdate();
    }
});
