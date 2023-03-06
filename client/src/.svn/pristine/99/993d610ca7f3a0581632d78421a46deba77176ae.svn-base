/**
 * Created by Administrator on 2016/7/9.
 */
var BBTRoomEffects = {

    getPlayerSeq:function(seat){
        var seqArray = BBTRoomModel.seatSeq[BBTRoomModel.mySeat];
        var seq = ArrayUtil.indexOf(seqArray,seat)+1;
        return seq;
    },

    arriveTarget:function(root,target,tplayer){
        tplayer.updatePointByBomb(20);
        var label = new cc.LabelBMFont("+20","res/font/font_res_huang.fnt");
        label.x = target.x;
        label.y = target.y-30;
        root.addChild(label,3000);
        label.runAction(cc.sequence(cc.moveTo(1,label.x,target.y+50),cc.callFunc(function(){
            label.removeFromParent(true);
        })));
    },

    addFloatLabel:function(root,startPlace,target,tplayer){
        var label = new cc.LabelBMFont("-10","res/font/font_res_hui.fnt");
        label.x = startPlace.x;
        label.y = startPlace.y;
        root.addChild(label,3000);
        var self = this;
        label.runAction(cc.sequence(cc.moveTo(1,target.x,target.y),cc.callFunc(function(){
            label.removeFromParent(true);
            if(tplayer)
                self.arriveTarget(root,target,tplayer);
        })));
    },

    /**
     * 炸弹实时展示扣分效果
     * @param players {Array.<CardPlayer>}
     * @param root {UIWidget}
     * @param seat {number}
     */
    bomb:function(players,root,seat){
        var target = ccui.helper.seekWidgetByName(root,"player"+this.getPlayerSeq(seat));
        var others = BBTRoomModel.seatSeq[seat];
        for(var i=0;i<others.length;i++){
            if(i>0){
                var otherSeat = others[i];
                var seq = this.getPlayerSeq(otherSeat);
                var startPlace = ccui.helper.seekWidgetByName(root,"player"+seq);
                players[otherSeat].updatePointByBomb(-10);
                var tplayer = (i==(others.length-1)) ? players[seat] : null;
                this.addFloatLabel(root,startPlace,target,tplayer);
            }
        }
    },

    finish:function(animate){
        animate.stop();
        animate.removeFromParent(true);
    },

    /**
     *
     * @param root
     * @param cardPattern {CardPattern}
     */
    play:function(players,root,cardPattern,seat){
        if(!cardPattern)
            return;
        var seq = this.getPlayerSeq(seat);
        var type = cardPattern.type;
        var plist = "";
        var prefix = "";
        var unit = 0;

        switch(seq){
            case 1:
                var x = root.width/2;
                var y = root.height/2;
                break;
            case 2:
                var x = 950;
                var y = 514;
                break;
            case 3:
                var x = 300;
                var y = 514;
                break;
        }
        if(type == BBTAI.PLANE ){
            var x = root.width/2;
            var y = root.height/2;
        }
        var tScale = 1;
        if(type == BBTAI.LIANDUI){
            plist = "res/plist/liandui.plist";
            prefix = "liandui";
            unit = 1/12;
            y-=30;
        }else if(type == BBTAI.BOMB){
            plist = "res/plist/zhadan.plist";
            prefix = "zhadan";
            unit = 1/16;
            y+=80;
        }else if(type == BBTAI.PLANE){
            plist = "res/plist/feiji.plist";
            prefix = "feiji";
            unit = 1/16;
            x=root.width;
        }else if(type == BBTAI.SHUNZI){
            plist = "res/plist/shunzi.plist";
            prefix = "shunzi";
            unit = 1/16;
            y-=30;
        }else if(type == BBTAI.WUSHIK ){
            if((cardPattern.sortedCards[0].t == cardPattern.sortedCards[1].t) &&
            (cardPattern.sortedCards[0].t == cardPattern.sortedCards[2].t) && (cardPattern.sortedCards[1].t == cardPattern.sortedCards[2].t)){
                plist = "res/plist/z510K.plist";
                prefix = "z510K";
            }else{
                plist = "res/plist/510K.plist";
                prefix = "510K";
            }
            unit = 1/10;
            tScale = 0.8;
        }else if(type == BBTAI.TONGHUASHUN){
            plist = "res/plist/Thx.plist";
            prefix = "Thx";
            unit = 1/15;
            tScale = 0.8;
        }else if(type == BBTAI.DIZHA){
            plist = "res/plist/dtz_dizha.plist";
            prefix = "dtz_dizha";
            unit = 1/10;
            tScale = 2;
        }else if(type == BBTAI.KING){
            plist = "res/plist/wz.plist";
            prefix = "wz";
            unit = 1/10;
            tScale = 2;
        }
        if(plist!="" && prefix!="" && unit>0){
            var self = this;
            var action = null;
            var animate = new AnimateSprite(plist,prefix,unit);
            if(type == BBTAI.PLANE){
                action = cc.sequence(cc.moveTo(1.5,0,root.height/2),cc.callFunc(function(){
                    self.finish(animate);
                }))
            }else{
                animate.setRepeatTimes(1);
                animate.setCallBack(this.finish,this);
            }
            animate.play();
            animate.x = x;
            animate.y = y;
            animate.scale = tScale;
            root.addChild(animate,1000);
            if(action){
                animate.runAction(action);
            }
        }
    }

}