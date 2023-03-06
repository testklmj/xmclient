/**
 * Created by Administrator on 2016/7/9.
 */
var DdzRoomEffects = {

    getPlayerSeq:function(seat){
        var seqArray = DdzRoomModel.seatSeq[DdzRoomModel.mySeat];
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
        var others = DdzRoomModel.seatSeq[seat];
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

    King:function(players,root,seat)
    {
        var armatureJson = "res/plist/Rocket"+".ExportJson";
        var armatureName = "Rocket";
        ccs.armatureDataManager.addArmatureFileInfo(armatureJson);
        var chatArmature = new ccs.Armature(armatureName);
        chatArmature.x = root.width/2;
        chatArmature.y = root.height/2;

        chatArmature.setLocalZOrder(9999);
        root.addChild(chatArmature);

        chatArmature.getAnimation().setFrameEventCallFunc(function (bone, evt) {
        });
        chatArmature.getAnimation().play(armatureName, -1, 0);
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

        cc.log("type=="+type);

        if(type == DdzAI.PLANEBUDAI || type == DdzAI.PLANEDAIDAN || type == DdzAI.PLANEDAIDUI){
            var x = root.width/2;
            var y = root.height/2;
        }


        if(type == DdzAI.LIANPAIR ){
            plist = "res/plist/liandui.plist";
            prefix = "liandui";
            unit = 1/12;
            y-=30;
        }else if(type == DdzAI.BOMB ){
            plist = "res/plist/zhadan.plist";
            prefix = "zhadan";
            unit = 1/16;
            y+=80;
        }else if(type == DdzAI.PLANEBUDAI ||type == DdzAI.PLANEDAIDAN ||type == DdzAI.PLANEDAIDUI ){
            plist = "res/plist/feiji.plist";
            prefix = "feiji";
            unit = 1/16;
            x=root.width;
        }else if(type == DdzAI.SHUNZI){
            plist = "res/plist/shunzi.plist";
            prefix = "shunzi";
            unit = 1/16;
            y-=30;
        }
        if(plist!="" && prefix!="" && unit>0){
            var self = this;
            var action = null;
            var animate = new AnimateSprite(plist,prefix,unit);
            if(type == type == DdzAI.PLANEBUDAI ||type == DdzAI.PLANEDAIDAN ||type == DdzAI.PLANEDAIDUI){
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
            root.addChild(animate,1000);
            if(action){
                animate.runAction(action);
            }
        }
    }

}