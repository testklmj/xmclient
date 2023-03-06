/**
 * Created by zhoufan on 2016/7/23.
 */

var MJPlayer = BaseRoomPlayer.extend({
    /** @lends CardPlayer.prototype */

    /**
     * {RoomPlayerVo}
     */
    _playerVo:null,
    _iconUrl:"",
    /**
     *
     * @param name {RoomPlayerVo}
     * @param root {Object}
     */
    ctor:function(vo,root,seq){
        this.root = root;
        this._jettons = [];
        this._isStart = false;
        if(MJRoomModel.isMoneyRoom()){
            if(MJRoomModel.isLNMJ()){
                this.coinNum = vo.ext[5];
            }else if(MJRoomModel.isKETMJ()) {
                this.coinNum = vo.ext[6];
            }
        }else{
            this.coinNum = 0;
        }
        if(MJRoomModel.isGameSite){
            this.coinNum = vo.totalPoint;
        }
        this._super(vo,root,seq);
        var initCoords = {1:{x:640,y:113},2:{x:1193,y:460},3:{x:639,y:625},4:{x:88,y:460}};
        if(MJRoomModel.renshu == 3){
            initCoords = {1:{x:640,y:113},2:{x:1193,y:460},3:{x:88,y:460}};
        }else if(MJRoomModel.renshu == 2){
            initCoords = {1:{x:640,y:113},2:{x:639,y:625}};
        }
        this.initX = initCoords[seq].x;
        this.initY = initCoords[seq].y;
        this.iconbg.x = this.initX;
        this.iconbg.y = this.initY;
        this.cp = ccui.helper.seekWidgetByName(root,"cp"+seq);
        this.cp.visible = false;
        this.ting = ccui.helper.seekWidgetByName(root,"ting"+seq);
        this.ting.visible = false;
        this.name = ccui.helper.seekWidgetByName(root,"name"+seq);
        var nameStr = vo.name;
        nameStr = UITools.truncateLabel(nameStr,4);
        this.name.setString(nameStr);
        this.spoint = ccui.helper.seekWidgetByName(root,"spoint"+seq);
        this.point = ccui.helper.seekWidgetByName(root,"point"+seq);
        this.spoint.visible = false;

        var player = ccui.helper.seekWidgetByName(root,"player"+seq);
        this.label_piaofen = ccui.helper.seekWidgetByName(player,"label_piaofen");
        if (this.label_piaofen)
            this.label_piaofen.setString("");

        if(MJRoomModel.isZYMJ() || MJRoomModel.isQAMJ() || MJRoomModel.isJNMJ() || MJRoomModel.isWWMJ() || MJRoomModel.isJQSB()) {
            this.xuanpai = ccui.helper.seekWidgetByName(root,"xuanpai"+seq);
            this.xuanpai.visible = false;
            if(MJRoomModel.isZYMJ()) {
                this.spritePlayer = ccui.helper.seekWidgetByName(root, "spritePlayer" + seq);
                this.zj.visible = this.spritePlayer.visible = MJRoomModel.isBanker(this._playerVo);
            }
        }
        if(MJRoomModel.isLZEB()){
            this.buhua = ccui.helper.seekWidgetByName(root,"buhua"+seq);
            this.buhua.visible = false;
        }
        this.tuoguanSp = ccui.helper.seekWidgetByName(root,"tuoguanSp"+seq);
        if(this.tuoguanSp){
            this.tuoguanSp.visible = false;
        }
        if(MJRoomModel.isMoneyRoom()){
            this.updatePoint(this.coinNum);
        }
        if(MJRoomModel.isGameSite){
            this.updatePoint(vo.ext[14]);
        }

        this.ipSame = ccui.helper.seekWidgetByName(root,"ipSame"+seq);
        if (this.ipSame){
            this.ipSame.visible = false;
        }

        var isCredit = MJRoomModel.isCreditRoom();
        if (isCredit){
            this.spoint.visible = true;
            var creditNum = MJRoomModel.getCreditNum(this._playerVo);
            this.spoint.setString("赛:"+creditNum);
        }

        this.jiachuiImg = ccui.helper.seekWidgetByName(root,"Image_chui"+seq);

        this.showJaiChuiImg(false)
    },

    showJaiChuiImg:function(_bool){
        if (this.jiachuiImg){
            this.jiachuiImg.visible = _bool;
        }
    },

    updateTuoguan:function(isTuoguan){
        if(this.tuoguanSp && isTuoguan != null){
            //cc.log("刷新托管状态的显示" , isTuoguan);
            this.tuoguanSp.visible = isTuoguan;
            this.isTuoguan = isTuoguan;
        }
    },
    updatePoint:function(point){
        if(MJRoomModel.isMoneyRoom()){
            cc.log("显示玩家金币：" , point);
            if(point>= 0 && point < 1000000){
                this.point.setString(point);
            }else if(point < 0){
                this.point.setString("-" + Math.abs(point));
            }else{
                this.point.setString(PlayerModel.moneyToStr(point));
            }
        }else{
            this.point.setString(point);
        }
    },

    setPiaofen:function(point){
        var str = "";
        if(point == 0)str = "不飘";
        if(point > 0)str = "飘" + point + "分";
        this.label_piaofen.setString(str);
    },

    changeSPoint: function(point) {
        var currently = MJRoomModel.getHuPoint(this._playerVo);
        currently += point;
        MJRoomModel.setHuPoint(this._playerVo, currently);
        this.updateSPoint(currently);
        this.playHuPointAction(point);
    },

    updateSPoint: function(point) {
        this.spoint.setString(point+"");
    },

    getContainer:function(){
        return this.iconbg;
    },

    pushJettonData:function(jetton){
        this._jettons.push(jetton);
    },

    shiftJettonData:function(){
        var jetton = this._jettons.shift();
        this.removeJetton(jetton);
    },

    removeJetton:function(jetton){
        cc.pool.putInPool(jetton);
        this.root.removeChild(jetton);
    },

    getJettonCount:function(){
        return this._jettons.length;
    },

    playJettonArmature:function(){
        //if(this.isPlayArmature){
        //    return;
        //}
        //this.isPlayArmature = true;
        //if(!this.jettonArmature){
        //    ccs.armatureDataManager.addArmatureFileInfo(
        //        "res/plist/texiao01.ExportJson");
        //    this.jettonArmature = new ccs.Armature("texiao01");
        //    this.jettonArmature.x = -45;
        //    this.jettonArmature.y = 150;
        //    this.iconbg.addChild(this.jettonArmature,199);
        //    this.jettonArmature.getAnimation().setFrameEventCallFunc(function(bone, evt) {
        //        if(evt == "finish"){
        //            self.isPlayArmature = false;
        //            self.jettonArmature.getAnimation().stop();
        //            self.jettonArmature.visible = false;
        //        }
        //    });
        //}
        //this.jettonArmature.visible = true;
        //var self = this;
        //this.jettonArmature.getAnimation().play("play",-1,0);
        //AudioManager.play("res/audio/mj/jetton.mp3");
    },

    cleanJettonData:function(){
        for(var i=0;i<this._jettons.length;i++){
            this.removeJetton(this._jettons[i]);
        }
        this._jettons.length = 0;
    },

    tingPai:function(){
        this.ting.visible = false;
    },

    /**
     * 获取快捷聊天内容模版
     * @returns {Array}
     */
    getChatData:function(){
        return ChatData.mj_fix_msg;
    },

    getIconPoint: function() {
        return cc.p(47,47);
    },

    chuPai:function(mjVo,delayTime){
        delayTime = delayTime || 0.5;
        this.cp.visible = true;
        var mj = null;
        mj = new HZMahjong(MJAI.getDisplayVo(1, 1), mjVo);
        mj.setScale(1.15);
        mj.x = 1;
        mj.y = 0;
        this.cp.addChild(mj,1,123);
        var self = this;
        var action = cc.sequence(cc.delayTime(delayTime),cc.callFunc(function(){
            //mj.chuPai();
        //}),cc.fadeTo(0.5,0),cc.callFunc(function(){
            self.cp.visible = false;
            self.cp.removeChildByTag(123);
        }));
        this.cp.runAction(action);
    },

    startGame:function(){
        this.statusImg.visible = false;
        if(MJRoomModel.renshu == 4) {
            if (this.seq == 1) {
                this.iconbg.x = 68;
                this.iconbg.y = 160;
            }
            if (this.seq == 2) {
                this.iconbg.x = 1212;
                this.iconbg.y = 460;
            }
            if (this.seq == 3) {
                this.iconbg.x = 970;
                this.iconbg.y = 670;
            }
            if (this.seq == 4) {
                this.iconbg.x = 68;
                this.iconbg.y = 460;
            }
        }else if(MJRoomModel.renshu == 3){
            if (this.seq == 1) {
                this.iconbg.x = 68;
                this.iconbg.y = 160;
            }
            if (this.seq == 2) {
                this.iconbg.x = 1212;
                this.iconbg.y = 460;
            }
            if (this.seq == 3) {
                this.iconbg.x = 68;
                this.iconbg.y = 460;
            }
        }else if(MJRoomModel.renshu == 2){
            if (this.seq == 1) {
                this.iconbg.x = 68;
                this.iconbg.y = 160;
            }
            if (this.seq == 2) {
                this.iconbg.x = 970;
                this.iconbg.y = 670;
            }
        }
        this._isStart = true;
    },

    fastChat:function(data){
        var id = data.id;
        var sprite = null;
        var label = null;
        var content = "";
        if(id>0){//快捷聊天
            var array = ChatData.mj_fix_msg;
            content = array[parseInt(id)-1];
        }else {
            if (id < 0) {//表情
                var armatureJson = "res/plist/faceAM" + data.content + ".ExportJson";
                var armatureName = "faceAM" + data.content;
                ccs.armatureDataManager.addArmatureFileInfo(armatureJson);
                var chatArmature = new ccs.Armature(armatureName);
                chatArmature.x = 70;
                chatArmature.y = 50;
                if(this.seq == 2){//最后边的玩家 头像稍微往左边移动些
                    chatArmature.x = 30;
                }
                this.iconbg.addChild(chatArmature, 100);
                var musicName = "res/audio/fixMsg/emoticon_" + data.content + ".mp3";
                AudioManager.play(musicName);
                chatArmature.getAnimation().setFrameEventCallFunc(function (bone, evt) {
                    if (evt == "finish") {
                        chatArmature.getAnimation().stop();
                        chatArmature.removeFromParent(true);
                        //ccs.armatureDataManager.removeArmatureFileInfo(armatureJson);
                    }
                });
                chatArmature.getAnimation().play(armatureName, -1, 0);
            } else {
                content = data.content;
            }
        }
        if(content){
            var coords = {1:{x:-50,y:-20},2:{x:50,y:-20},3:{x:-50,y:-20},4:{x:-50,y:-20}};
            var coord = coords[this.seq];
            label = UICtor.cLabel(content,32,null,cc.color("FF361e06"),0,1);
            sprite = new cc.Scale9Sprite("res/ui/dtz/images/img_chat_4.png",null,cc.rect(30,0,10,64));
            if(this.seq==2){
                sprite.anchorX=1;sprite.anchorY=0;
            }else{
                sprite.anchorX=sprite.anchorY=0;
            }
            sprite.addChild(label);
            var height = (label.height+30)<64 ? 64 : (label.height+30);
            sprite.setContentSize(label.width+30,height);
            label.x = sprite.width/2;label.y = sprite.height/2;
            this.iconbg.addChild(sprite,20);
            sprite.opacity=0;sprite.x = this.yybg.x+coord.x;sprite.y=this.yybg.y+coord.y;
        }
        if(sprite){
            var self = this;
            if(label){
                label.runAction(cc.sequence(cc.fadeTo(0.3,255),cc.delayTime(2.5),cc.fadeTo(0.8,0)));
            }
            var action = cc.sequence(cc.fadeTo(0.3,255),cc.delayTime(2.5),cc.fadeTo(0.8,0),cc.callFunc(function(){
                self.iconbg.removeChild(sprite);
            }))
            sprite.runAction(action);
        }
    },

    getAnimationPos:function(direct , animationName){
        cc.log("direct , animationName"  , direct , animationName);
        var renshu = MJRoomModel.renshu;

        var posx = 55;
        var posy = 65;


        if(animationName == "socialAM7"){//monkey
            posx = 45;
            posy = 50;
        }
        if(animationName == "socialAM4"){//boom
            posx = 40;
            posy = 80;
        }
        if(animationName == "socialAM3"){//ji
            posx = 55;
            posy = 65;
        }
        if(animationName == "socialAM6"){//ice
            posx = 45;
            posy = 85;
        }
        if(animationName == "socialAM5"){//beer
            posx = 50;
            posy = 80;
        }
        if(animationName == "socialAM2"){//fanqie
            posx = 55;
            posy = 80;
        }
        if(animationName == "socialAM1"){//kiss
            posx = 50;
            posy = 70;
        }

        return {x :posx , y:posy};
    },

    playPropArmature:function(temp){
        var armatureName = "socialAM"+temp;
        var armatureJson = "res/plist/"+armatureName+".ExportJson";
        ccs.armatureDataManager.addArmatureFileInfo(armatureJson);
        var propArmature = new ccs.Armature(armatureName);

        cc.log("this.seq..." ,this.seq);
        var posMsg = this.getAnimationPos(this.seq , armatureName);
        propArmature.x = posMsg.x;
        propArmature.y = posMsg.y;
        propArmature.anchorX = propArmature.anchorY = 0.5;
        if(temp == 7){
            propArmature.setScale(0.7);
        }
        this.iconbg.addChild(propArmature,20);
        propArmature.getAnimation().setFrameEventCallFunc(function (bone, evt) {
            if (evt == "finish") {
                propArmature.getAnimation().stop();
                propArmature.removeFromParent(true);
            }
        });
        var musicName = "res/audio/fixMsg/prop"+temp+".mp3";
        AudioManager.play(musicName);
        propArmature.getAnimation().play(armatureName, -1, 0);
    },

    overGame:function(){
        this.iconbg.x = this.initX;
        this.iconbg.y = this.initY;
    },

    //玩家显示托管字样
    showTrusteeship:function(status){
        //if(status==1){
        //    this.tuoguan.visible = true;
        //}else{
        //    this.tuoguan.visible = false;
        //}
    },

    //IP相同显示
    isIpSame:function(bool){
        this.ipSame.visible = bool;
    },

    playHuPointAction: function(point) {
        var fnt = point>0 ? "res/font/font_mj4.fnt" : "res/font/font_mj5.fnt";
        point = point>0 ? "+"+point : ""+point;
        var scoreLabel = new cc.LabelBMFont(point,fnt);
        scoreLabel.x = this.iconbg.width/2;
        scoreLabel.y = this.iconbg.height/2-50;
        this.iconbg.addChild(scoreLabel,99,789);
        var action = cc.sequence(cc.moveTo(1,scoreLabel.x,scoreLabel.y+80),cc.delayTime(0.8),cc.fadeTo(0.5,0),cc.callFunc(function() {
            scoreLabel.removeFromParent(true);
        }));
        scoreLabel.runAction(action);
    },

    setPaofenByResult:function(paofen){
        if(this.iconbg.getChildByTag(699)){
            this.iconbg.removeChildByTag(699);
        }
        if(this.iconbg.getChildByTag(700)){
            this.iconbg.removeChildByTag(700);
        }
        var url = "res/ui/mj/zzmjRoom/pao"+paofen+".png";
        var Image = UICtor.cImg(url);
        Image.setPosition(this.iconbg.width+Image.width/2,Image.height/2+5);
        if(this.seq == 2 || this.seq == 4 || this.seq == 1)
            Image.setPosition(this.iconbg.width/2,this.iconbg.height + Image.height/2);
        this.iconbg.addChild(Image,1,699);
        this.isBanker(true);
    },

    play:function(){
        var self = this;
        var action = cc.sequence(cc.blink(2,6),cc.callFunc(function(){
            self.spritePlayer.visible = false;
        }));
        this.spritePlayer.runAction(action);
    },

    stop:function(){
        this.spritePlayer.stopAllActions();
    },

    refrePosition:function(){
        var image = this.iconbg.getChildByTag(700);
        if(image && !this.xuanpai.visible){
            if(MJRoomModel.renshu == 2) {
                if(this.seq == 1) {
                    image.setPosition(this.iconbg.width / 2, -image.height / 2);
                }
            }else if(MJRoomModel.renshu == 3){
                image.setPosition(this.iconbg.width / 2, -image.height / 2);
            }else if(MJRoomModel.renshu == 4 && this.seq != 3){
                image.setPosition(this.iconbg.width / 2, -image.height / 2);
            }
        }
    },

    xuanPai: function (bool) {
        this.xuanpai.loadTexture("res/ui/mj/zzmjRoom/mjRoom_40.png");
        this.xuanpai.visible = bool;
        this.refrePosition();
    },

    changeXuanPai:function(){
        this.xuanpai.visible = true;
        this.xuanpai.loadTexture("res/ui/mj/zzmjRoom/mjRoom_41.png");
    },

    cleanLastPaoFen:function(){
        if(this.iconbg.getChildByTag(700)){
            this.iconbg.removeChildByTag(700);
        }
        if(this.iconbg.getChildByTag(699)){
            this.iconbg.removeChildByTag(699);
        }
    },

    isBanker:function(bool){
        this.zj.visible = bool;
        if(this.spritePlayer)
            this.spritePlayer.visible = bool;
    },



    setPlayerOnLine:function(){
        if(this.leave.visible && this.tuoguanSp && !this.tuoguanSp.isVisible()){
            this.leave.visible = false;
        }
    },

});
