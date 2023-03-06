/**
 * Created by fc on 2017/6/30.
 * */
var ApplyExitRoomPop = BasePopup.extend({
    players:[],
    ctor: function (gameType) {
        this.gameType = gameType || 1;
        this.dt = 0;
        this.json = "res/applyExitRoom.json";
        this._super(this.json);
    },

    selfRender: function () {
        this.players = DTZRoomModel.players;
        var num = DTZRoomModel.renshu;
        if(this.gameType == 2){
            this.players = PHZRoomModel.players;
            num = PHZRoomModel.players;
        }else if(this.gameType == 1){
            this.players = DTZRoomModel.players;
            num = DTZRoomModel.renshu;
        }else if(this.gameType == 3){
            this.players = PDKRoomModel.players;
            num = PDKRoomModel.renshu;
        }else if(this.gameType == 10){
            this.players = BBTRoomModel.players;
            num = BBTRoomModel.renshu;
        }else if(this.gameType == 7){
            this.players = DdzRoomModel.players;
            num = DdzRoomModel.renshu;
        }else if(this.gameType == 220){
            this.players = MJRoomModel.players;
            num = MJRoomModel.renshu;
        }
        this.listener = SyEventManager.addEventListener(SyEvent.DISAGREE_APPLYEXITROOM,this,this.removeCurrentPop);
        this.Button_36 = this.getWidget("Button_36");
        this.Button_37 = this.getWidget("Button_37");
        this.label_time = this.getWidget("label_time");
        this.time = ApplyExitRoomModel.timeStr;
        this.label_time.setString(this.time);


        for(var i=1;i <= 4;i++){
            this["name"+i] = this.getWidget("name"+i);
            this["icon"+i] = this.getWidget("icon"+i);
            this["ty"+i] = this.getWidget("ty"+i);
            this["name"+i].visible = this["icon"+i].visible = this["ty"+i].visible = false;
        }

        var offX = 100;
        if(num == 3){
            for(var i = 1 ; i <= 3 ; i++){
                this["name"+ i].x = this["name"+ i].x + offX;
                this["icon"+ i].x = this["icon"+ i].x + offX;
                this["ty"+ i].x = this["ty"+ i].x + offX;
            }
        }


        
        if(!ApplyExitRoomModel.fal){
            this.Button_36.visible = this.Button_37.visible = false;
            this.label_time.y = 80;
        }else{
            this.Button_36.visible = this.Button_37.visible = true;
            UITools.addClickEvent(this.Button_36,this,this.onOk);
            UITools.addClickEvent(this.Button_37,this,this.onCancel);
        }
        cc.log("DTZRoomModel.players.length.." , this.players.length);
        for(var i = 1 ; i <= this.players.length ; i++) {
            this["name" + i].visible = this["icon" + i].visible = this["ty" + i].visible = true;
            var nameStr = this.players[i - 1].name;
            nameStr = UITools.truncateLabel(nameStr,5);
            this["name" + i].setString(nameStr);
            cc.log("ApplyExitRoomModel.array..." , JSON.stringify(ApplyExitRoomModel.array));
            for (var j = 0; j < ApplyExitRoomModel.array.length; j++) {
                if (this.players[i - 1].userId ==  parseInt(ApplyExitRoomModel.array[j][0])){
                    var state = parseInt(ApplyExitRoomModel.array[j][1]);//2表示申请，1表示同意，0表示等待
                    cc.log("解散房间各个玩家的状态值... state..." , state)
                    if(state == 2){
                        this.name = this.players[i-1].name;
                    }else if(state == 1){
                        this["ty"+i].visible = true;
                        this["ty"+i].setString("同意");
                        this.tyNum += 1;
                        //this.updateBar();
                    }else if(state == 0){
                        this["ty"+i].visible = true;
                        this["ty"+i].setString("等待中");
                        this["ty"+i].setColor(cc.color("d87308"));
                    }
                    break;
                }
            }
            var defaultimg = (this.players[i-1].sex==1) ? "res/ui/dtz/images/default_m.png" : "res/ui/dtz/images/default_w.png";
            if(this["icon"+i].getChildByTag(345))
                this["icon"+i].removeChildByTag(345);
            var sprite = new cc.Sprite(defaultimg);
            sprite.x = 44;
            sprite.y = 43;
            this["icon"+i].addChild(sprite,5,345);
            if(this.players[i-1].icon){
                cc.loader.loadImg(this.players[i-1].icon, {width: 252, height: 252}, function (error, img) {
                    if (!error) {
                        sprite.setTexture(img);
                        sprite.x = 44;
                        sprite.y = 43;
                    }
                });
            }
        }
        this.Panel_13 = this.getWidget("Panel_13");
        var elements = [];
        elements.push(RichLabelVo.createTextVo("玩家",cc.color("7E3102"),28));
        var nameStr = this.name;
        nameStr = UITools.truncateLabel(nameStr,5);
        elements.push(RichLabelVo.createTextVo(nameStr,cc.color("4974c9"),28));
        elements.push(RichLabelVo.createTextVo("申请解散房间，全部玩家同意后房间会被解散",cc.color("7E3102"),28));
        var richLabel = new RichLabel(cc.size(943,0),3);
        richLabel.setLabelString(elements);
        richLabel.x = richLabel.y =10;
        this.Panel_13.addChild(richLabel);
        this.scheduleUpdate();
    },

    onOk:function(){
        sySocket.sendComReqMsg(8,[1]);
        //PopupManager.remove(this);
        this.removeCurrentPop();
    },

    onCancel:function(){
        sySocket.sendComReqMsg(8,[2]);
        //PopupManager.remove(this);
        this.removeCurrentPop();
    },

    update:function(dt){
        this.dt += dt;
        if(this.dt>=1){
            this.dt = 0;
            if(ApplyExitRoomModel.time>0){
                ApplyExitRoomModel.reduceTimeBySecond();
                this.time = ApplyExitRoomModel.getTimeStr();
                this.label_time.setString(this.time);
            }else{
                this.unscheduleUpdate();
                //PopupManager.remove(this);
                this.removeCurrentPop();
            }
        }
    },

    removeCurrentPop:function(){
        ApplyExitRoomModel.isShow = false;
        this.unscheduleUpdate();
        SyEventManager.removeListener(this.listener);
        this.removeFromParent(true);
    },
});
