/**
 * Created by Administrator on 2016/8/30.
 */
var MJReplayer = cc.Class.extend({
    _playerVo:null,
    _iconUrl:"",
    /**
     *
     * @param name {RoomPlayerVo}
     * @param root {Object}
     */
    ctor:function(vo,root,seq){
        this._iconUrl = "";
        this._playerVo = vo;
        this.seq = seq;
        this.iconbg = ccui.helper.seekWidgetByName(root,"player"+seq);
        this.initX = this.iconbg.x;
        this.initY = this.iconbg.y;
        this.iconbg.temp = vo.seat;
        this.iconbg.visible = true;
        this.name = ccui.helper.seekWidgetByName(root,"name"+seq);
        this.name.setString(vo.name);
        this.point = ccui.helper.seekWidgetByName(root,"point"+seq);
        this.cp = ccui.helper.seekWidgetByName(root,"cp"+seq);
        this.cp.visible = false;
        this.zj = ccui.helper.seekWidgetByName(root,"zj"+seq);
        this.zj.visible = false;
        this.ting = ccui.helper.seekWidgetByName(root,"ting"+seq);
        this.ting.visible = false;
        this.updatePoint(vo.totalPoint-vo.point);
        this.showIcon();
        this.startGame();
        this.isBanker((vo.handCardIds.length>13));
        this.spoint = ccui.helper.seekWidgetByName(root,"spoint"+seq);
        if(MJReplayModel.isGSMJ()) {
            this.updateSPoint(MJReplayModel.getHuPoint(vo));
        } else {
            this.spoint.visible = false;
        }
        if(MJReplayModel.isLZEB()){
            this.buhua = ccui.helper.seekWidgetByName(root,"buhua"+seq);
            this.buhua.visible = false;
        }

        if(this.iconbg.getChildByTag(666))
            this.iconbg.removeChildByTag(666);

        this.tuoguanSpr = new cc.Sprite("res/ui/dtz/dtzRoom/tuoguan.png");
        this.tuoguanSpr.x = this.iconbg.width * 0.8;
        this.tuoguanSpr.y = this.iconbg.height * 0.9;
        this.iconbg.addChild(this.tuoguanSpr,10,666);
        this.tuoguanSpr.visible = false;
    },

    updateReTuoguan:function(state){
        this.tuoguanSpr.setVisible(state);
    },

    updateSPoint: function(point) {
        this.spoint.setString(point+"");
    },

    changeSPoint: function(point) {
        var currently = MJReplayModel.getHuPoint(this._playerVo);
        currently += point;
        MJReplayModel.setHuPoint(this._playerVo, currently);
        this.updateSPoint(currently);
        this.playHuPointAction(point);
    },

    playHuPointAction: function(point) {
        var fnt = point>0 ? "res/font/font_mj4.fnt" : "res/font/font_mj5.fnt";
        point = point>0 ? "+"+point : ""+point;
        var scoreLabel = new cc.LabelBMFont(point,fnt);
        scoreLabel.x = this.iconbg.width/2;
        scoreLabel.y = this.iconbg.height/2-50;
        this.iconbg.addChild(scoreLabel,99);
        var action = cc.sequence(cc.moveTo(1,scoreLabel.x,scoreLabel.y+80),cc.delayTime(0.8),cc.fadeTo(0.5,0),cc.callFunc(function() {
            scoreLabel.removeFromParent(true);
        }));
        scoreLabel.runAction(action);
    },

    tingPai:function(bool){
        this.ting.visible = bool;
    },

    showInfo:function(){
        var mc = new PlayerInfoPop(this._playerVo);
        PopupManager.addPopup(mc);
    },

    chuPai:function(mjVo){
        this.cp.visible = true;
        this.cp.setOpacity(255);
        var mj = new Mahjong(MJAI.getDisplayVo(1,2),mjVo);
        mj.x = 5;
        mj.y = 5;
        this.cp.addChild(mj,1,123);
        var self = this;
        var action = cc.sequence(cc.delayTime(1),cc.callFunc(function(){
            mj.chuPai();
        }),cc.fadeTo(1,0),cc.callFunc(function(){
            self.cp.visible = false;
            self.cp.removeChildByTag(123);
        }));
        this.cp.runAction(action);
    },


    startGame:function(){
        if(MJReplayModel.renshu == 4) {
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
        }else if(MJReplayModel.renshu == 3){
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
        }else if(MJReplayModel.renshu == 2){
            if (this.seq == 1) {
                this.iconbg.x = 68;
                this.iconbg.y = 160;
            }
            if (this.seq == 2) {
                this.iconbg.x = 970;
                this.iconbg.y = 670;
            }
        }
    },

    isBanker:function(bool){
        this.zj.visible = bool;
    },

    updatePoint:function(point){
        this.point.setString(point);
    },

    showIcon:function(){
        //this._playerVo.icon = "http://wx.qlogo.cn/mmopen/25FRchib0VdkrX8DkibFVoO7jAQhMc9pbroy4P2iaROShWibjMFERmpzAKQFeEKCTdYKOQkV8kvqEW09mwaicohwiaxOKUGp3sKjc8/0";
        var url = this._playerVo.icon;
        var defaultimg = "res/ui/mj/zzmjRoom/mjRoom_7.png";
        if(!url)
            url = defaultimg;
        if(this._iconUrl == url)
            return;
        if(this.iconbg.getChildByTag(345))
            this.iconbg.removeChildByTag(345);
        this._iconUrl = url;
        var sprite = new cc.Sprite(defaultimg);
        if(this._playerVo.icon){
            sprite.x = sprite.y = 0;
            try{
                var sten = new cc.Sprite("res/ui/mj/zzmjRoom/mjRoom_7.png");
                var clipnode = new cc.ClippingNode();
                clipnode.attr({stencil: sten, anchorX: 0.5, anchorY: 0.5, x: 47, y: 47, alphaThreshold: 0.8});
                clipnode.addChild(sprite);
                this.iconbg.addChild(clipnode,5,345);
                var self = this;
                cc.loader.loadImg(this._playerVo.icon, {width: 252, height: 252}, function (error, img) {
                    if (!error) {
                        sprite.setTexture(img);
                        sprite.x = 0;
                        sprite.y = 0;
                    }else{
                        self._iconUrl = "";
                    }
                });
            }catch(e){}
        }else{
            sprite.x = 47;
            sprite.y = 47;
            this.iconbg.addChild(sprite,5,345);
        }
    },


});