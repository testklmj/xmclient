
/**
 * Created by zhoufan on 2016/6/30.
 */
var BBTSmallResultPop = BasePopup.extend({

    ctor: function (data) {
        this.data = data;
        this._super("res/bbtSmallReu.json");
    },

    selfRender: function () {
        if(this.data[0].userId != PlayerModel.userId){
            AudioManager.play("res/audio/common/audio_lose.mp3");
        }else{
            AudioManager.play("res/audio/common/audio_win.mp3");
        }

        //根据我的位置控制显示顺序
        var mySeat = 0;
        for(var indexOfPlayer = 0 ; indexOfPlayer < this.data.length ; indexOfPlayer ++){
            if(this.data[indexOfPlayer].userId == ClosingInfoModel.ext[1]){
                mySeat = this.data[indexOfPlayer].seat;
            }
        }
        var upSeat = this.getUpSeat(mySeat);
        var nextSeat = this.getNextSeat(mySeat);

        var showSeq = [];
        if(BBTRoomModel.renshu == 3){
            showSeq.push(mySeat);
            showSeq.push(upSeat);
            showSeq.push(nextSeat);
        }else{
            showSeq.push(mySeat);
            if(mySeat == 1){
                showSeq.push(2);
            }else if(mySeat == 2){
                showSeq.push(1);
            }
        }

        for(var indexShow = 1 ; indexShow <= 3 ; indexShow ++){
            this.getWidget("n"+indexShow).setString("");
        }

        cc.log("BBTRoomModel.renshu...this.data" , BBTRoomModel.renshu , this.data.length);
        for(var indexShow = 0 ; indexShow < BBTRoomModel.renshu ; indexShow ++){
            var showSeat = showSeq[indexShow];

            for(var indexOfData = 0 ; indexOfData < BBTRoomModel.renshu ; indexOfData ++){
                cc.log("this.data[indexOfData].seat" , this.data[indexOfData].seat , showSeat);
                if(this.data[indexOfData].seat == showSeat){
                    this.showPlayerMsg(this.data[indexOfData] , indexShow + 1);
                }
            }
        }


        this.issent = false;
        this.addCustomEvent(SyEvent.SETTLEMENT_SUCCESS,this,this.onSettlement);
        var btnok = this.getWidget("btnok");
        var btClose = this.getWidget("close_btn");

        UITools.addClickEvent(btnok,this,this.onOk);
        UITools.addClickEvent(btClose , this , this.onOk);

        var btnshare = this.getWidget("btnshare");
        if (btnshare) {
            UITools.addClickEvent(btnshare, this, this.onShare);
        }

        var jsBtn = this.getWidget("Button_js");  // 解散按钮
        if(jsBtn){
            UITools.addClickEvent(jsBtn,this,this.onJieSan);
        }

        this.dt = 0;
        this.start = 3;
        if(BBTRoomModel.isGameSite>0)
            this.scheduleUpdate();

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
            isJLB = "亲友圈";
        }
        //显示局数
        this.getWidget("Label_RoomDetail").setString("房号:"+ClosingInfoModel.ext[0]+"    局数:"+ClosingInfoModel.ext[4]+"/"+ClosingInfoModel.ext[5]+"\n"
        +isZwsk+"  "+iskc+"  "+iszd + " "+isJLB+ "\n"+SyVersion.v+"        "+ClosingInfoModel.ext[2]);
        this.getWidget("Label_zzf").setString("总分：     "+ClosingInfoModel.ext[16]);
        this.getWidget("Label_xzf").setString("总分：     "+ClosingInfoModel.ext[17]);
        this.getWidget("Label_zcf").setString("朝分：     "+ClosingInfoModel.ext[14]);
        this.getWidget("Label_xcf").setString("朝分：     "+ClosingInfoModel.ext[15]);
        this.getWidget("Label_zjf").setString("捡分：     "+ClosingInfoModel.ext[12]);
        this.getWidget("Label_xjf").setString("捡分：     "+ClosingInfoModel.ext[13]);


        if (BBTRoomModel.renshu == 2){
            cc.log("ClosingInfoModel.cutCard",JSON.stringify(ClosingInfoModel.cutCard))
            if (ClosingInfoModel.cutCard.length > 0){
                var pupaiSprite = new cc.Sprite("res/ui/pdk/pdkSmallResult/pupai.png");
                pupaiSprite.x = 150;
                pupaiSprite.y = 260;
                this.root.addChild(pupaiSprite);
                for(var j=0;j<ClosingInfoModel.cutCard.length;j++){
                    var cardList =  BBTAI.getCardDef(ClosingInfoModel.cutCard[j]);
                    var card = new BBTBigCard(cardList,true);
                    card.scale = 0.25;
                    card.x = 240+j*25;
                    card.y = 235;
                    this.root.addChild(card);
                }
            }
        }
    },

    onJieSan:function(){
        AlertPop.show("解散房间需所有玩家同意，确定要申请解散吗？",function(){
            sySocket.sendComReqMsg(7);
        })
    },


    showPlayerMsg:function(userData , showSeqp){
        var seq = showSeqp;
        var user = userData;
        cc.log("显示玩家信息..." , user.name);
        this.getWidget("n"+seq).setString(user.name);
        var fnt = (user.point>0) ? "res/font/dn_bigResult_font_1.fnt" : "res/font/dn_bigResult_font_2.fnt";
        var l = this.getWidget("Panel_df" + seq);
        var label = new cc.LabelBMFont(user.point+"",fnt);
        label.x = l.width/2;
        label.y = l.height/2;
        l.addChild(label);

        var icon = this.getWidget("PlayerIcon"+seq);
        var defaultimg = "res/ui/dtz/dtzCom/default_m.png";

        if(icon.getChildByTag(345))
            icon.removeChildByTag(345);

        var sprite = new cc.Sprite(defaultimg);
        sprite.setScale(0.7);
        sprite.x = 40;
        sprite.y = 22;
        icon.addChild(sprite,5,345);
        //user.icon = "http://wx.qlogo.cn/mmopen/25FRchib0VdkrX8DkibFVoO7jAQhMc9pbroy4P2iaROShWibjMFERmpzAKQFeEKCTdYKOQkV8kvqEW09mwaicohwiaxOKUGp3sKjc8/0";
        if(user.icon){
            cc.loader.loadImg(user.icon, {width: 252, height: 252}, function (error, img) {
                if (!error) {
                    sprite.setTexture(img);
                    sprite.x = 44;
                    sprite.y = 22;
                }
            });
        }

        //ext[5]-8 锤 开枪 抢庄 陡


        this.showWjZt(this.getWidget("Panel_zt"+seq),user,seq);
       this.showNDaPai(user,seq);
        this.showdFPai(user,seq);
        this.showMylDPai(user,seq);
    },

    showWjZt:function(panel,user,seq){
        panel.removeAllChildren(true);
        var curIndex = 0;
        if(user.ext[5] == 1){
            var chui = UICtor.cImg("res/ui/bbt/chuizi.png");
            chui.scale = 0.5;
            chui.setPosition(30+curIndex*30,35);
            panel.addChild(chui);
            curIndex++;
        }
        if(user.ext[6] == 1){
            var chui = UICtor.cImg("res/ui/bbt/qiang1.png");
            chui.scale = 0.5;
            chui.setPosition(30+curIndex*30,35);
            panel.addChild(chui);
            curIndex++;
        }


        if(user.ext[8] == 1){
            if(seq == 1){
                var chui = UICtor.cImg("res/ui/bbt/fantu.png");
            }else{
                var chui = UICtor.cImg("res/ui/bbt/tu.png");
            }
            if (BBTRoomModel.renshu == 2){
                var chui = UICtor.cImg("res/ui/bbt/tu.png");
            }
            chui.scale = 0.5;
            chui.setPosition(30+curIndex*30,35);
            panel.addChild(chui);
        }

    },

    showMylDPai:function(user,seq){
        var tstrAllCards = user.ext[1].substring(1 , user.ext[1].length - 1);
        if(tstrAllCards == ""){
            return ;
        }
        var allCards = tstrAllCards.split(',');
        var curindex = 0;
        var paixingIndex = 0;
        var cardTransData = [];
        var isAddJj = false;
        for(var index = 0 ; index < allCards.length ; index ++){
            var cards = allCards[index];
            //cc.log("cardscards"+cards);
            cards = cards.replace("[","");
            if(ArrayUtil.indexOf(cards,"]") > 0 ){
                if(isAddJj){
                    curindex++;
                }
                isAddJj = true;
                cards = cards.replace("]","");
                cardTransData.push(BBTAI.getCardDef(cards));
                var cardPattern = BBTAI.filterCards(cardTransData);
                if(cardPattern.type >= BBTAI.WUSHIK){
                    var txt = "res/ui/bbt/510k.png";
                    if(cardPattern.type == BBTAI.WUSHIK){
                        if((cardPattern.sortedCards[0].t == cardPattern.sortedCards[1].t) &&
                            (cardPattern.sortedCards[0].t == cardPattern.sortedCards[2].t) && (cardPattern.sortedCards[1].t == cardPattern.sortedCards[2].t)){
                            txt = "res/ui/bbt/z510k.png";
                        }else{
                            txt = "res/ui/bbt/510k.png";
                        }
                    }else if(cardPattern.type == BBTAI.BOMB){
                        txt = "res/ui/bbt/zhadan.png";
                    }else if(cardPattern.type == BBTAI.TONGHUASHUN){
                        txt = "res/ui/bbt/tonghuaxun.png";
                    }else if(cardPattern.type == BBTAI.DIZHA){
                        txt = "res/ui/bbt/dizha.png";
                    }else if(cardPattern.type == BBTAI.KING){
                        txt = "res/ui/bbt/tianzha.png";
                    }
                    var paixing = UICtor.cImg(txt);
                    paixing.setPosition(20+(curindex -parseInt((paixingIndex)/2))*20 ,20);
                    paixing.setLocalZOrder(9999);
                    this.getWidget("Panel_dCard" + seq).addChild(paixing);
                }
                cardTransData = [];
                paixingIndex = 0;

            }else{
                if(isAddJj){
                    curindex++;
                    isAddJj = false;
                }
                cardTransData.push(BBTAI.getCardDef(cards));
            }
            var txcard = BBTAI.getCardDef( parseInt(cards));
            var card = new BBTBigCard(txcard,true);
            card.setScale(0.25);
            card.anchorX = card.anchorY = 0;
            card.x = 0 + 20 * curindex;
            this.getWidget("Panel_dCard" + seq).addChild(card);
            curindex ++;
            paixingIndex++;
        }
    },

    showdFPai:function(user,seq){
        var tstrAllCards = user.ext[2].substring(1 , user.ext[2].length - 1);
        if(tstrAllCards == ""){
            return ;
        }
        var allCards = tstrAllCards.split(',');

        var allcardIds = [];//所有没打出手牌
        for(var index = 0 ; index < allCards.length ; index ++){
            allcardIds.push(BBTAI.getCardDef( parseInt(allCards[index])));
        }
        for(var j = 0; j < allcardIds.length ; j ++) {
            var card = new BBTBigCard(allcardIds[j],true);
            card.setScale(0.25);
            card.anchorX = card.anchorY = 0;
            card.x = 190 - 20 * j;
            card.y = 2;
            card.setLocalZOrder(100-j);
            this.getWidget("Panel_fCard" + seq).addChild(card);
        }
    },

    showNDaPai:function(user,seq){
        var tstrAllCards = user.ext[0].substring(1 , user.ext[0].length - 1);
        if(tstrAllCards == ""){
            return ;
        }
        var allCards = tstrAllCards.split(',');

        var allcardIds = [];//所有没打出手牌
        for(var index = 0 ; index < allCards.length ; index ++){
            allcardIds.push(BBTAI.getCardDef( parseInt(allCards[index])));
        }
        for(var j = 0; j < allcardIds.length ; j ++) {
            var card = new BBTBigCard(allcardIds[j],true);
            card.setScale(0.25);
            card.anchorX = card.anchorY = 0;
            card.x = 0 + 20 * j;
            this.getWidget("Panel_ndCard" + seq).addChild(card);
        }
    },


    showIcon:function(){
        //this._playerVo.icon = "http://wx.qlogo.cn/mmopen/25FRchib0VdkrX8DkibFVoO7jAQhMc9pbroy4P2iaROShWibjMFERmpzAKQFeEKCTdYKOQkV8kvqEW09mwaicohwiaxOKUGp3sKjc8/0";
        var url = PlayerModel.icon;
        var defaultimg = "res/ui/pdk/common/default_m.png" ;
        if(!url)
            url = defaultimg;
        if(this._iconUrl == url)
            return;
        this._iconUrl = url;
        var sprite = new cc.Sprite(defaultimg);
        sprite.setScale(1.2)
        var sten = new cc.Sprite("res/ui/dtz/images/img_14_c.png");
        var clipnode = new cc.ClippingNode();
        clipnode.attr({stencil: sten, anchorX: 0.5, anchorY: 0.5, x: this.icon.width/2, y: this.icon.height/2,alphaThreshold: 0.8});
        clipnode.addChild(sprite);
        this.icon.addChild(clipnode,5,345);
        if(this._playerVo.icon){
            sprite.x = sprite.y = 0;
            try{
                var self = this;
                cc.loader.loadImg(this._playerVo.icon, {width: 252, height: 252}, function (error, img) {
                    if (!error && (LayerManager.getCurrentLayer()==LayerFactory.ROOM||LayerManager.getCurrentLayer()==LayerFactory.MATCH_ROOM)) {
                        sprite.setTexture(img);
                        sprite.x = 0;
                        sprite.y = 0;
                    }else{
                        self._iconUrl = "";
                    }
                });
            }catch(e){}
        }else{
            //sprite.x = this.icon.width/2;
            //sprite.y = this.icon.height/2;
            //this.icon.addChild(sprite,5,345);
        }
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
                    //this.onOk();
                    return;
                }
                this.Label_43.setString(this.start+"秒后自动关闭");
            }
        }
    },

    onOk:function(){

        var data = this.data;
        if(BBTRoomModel.isGameSite>0){
            LayerManager.showLayer(LayerFactory.HOME);
            PopupManager.remove(this);
            PopupManager.removeAll();
            sySocket.sendComReqMsg(201,[],"");
        }else{
            if(BBTRoomModel.nowBurCount == BBTRoomModel.totalBurCount){//最后的结算 BBTRoomModel.totalBurCount
                PopupManager.remove(this);
                var mc = new BBTBigResultPop(data);
                PopupManager.addPopup(mc);
            }else{
                this.issent = true;
                sySocket.sendComReqMsg(3);
            }
        }
    },

    onClose:function(){
        this.issent = true;
       // sySocket.sendComReqMsg(3);
        this.unscheduleUpdate();
    },

    sortCards:function(cardids){
        var length = cardids.length;
        cc.log("length ..." , length);
        var s1 = function(c1,c2){
            var n1 = c1.i;
            var n2 = c2.i;
            if(n1 == n2){
                var t1 = c1.t;
                var t2 = c2.t;
                return t2-t1;
            }else{
                return n2-n1;
            }
        }
        cardids.sort(s1);
    },

    getUpSeat:function(seat){

        if(seat == 1){
            return 3;
        }else{
            return seat - 1;
        }

    },

    getNextSeat:function(seat){
        if(seat == 3){
            return 1;
        }else{
            return seat + 1;
        }

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
        obj.title="跑得快   房号:"+BBTRoomModel.tableId;
        obj.description="我已在安化棋牌的跑得快开好房间,纯技术实力的对决,一起跑得快！";
        obj.shareType=0;
        sy.scene.showLoading("正在截取屏幕");
        setTimeout(function(){
            sy.scene.hideLoading();
            //SharePop.show(obj);
            ShareDTPop.show(obj);
        },500);
    },

});
