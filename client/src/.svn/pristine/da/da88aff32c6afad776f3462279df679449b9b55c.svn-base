/**
 * Created by zhoufan on 2017/4/19.
 */
var GPSAlertCell = ccui.Widget.extend({

    ctor:function(label){
        this._super();
        var text = UICtor.cLabel(label, 30, cc.size(700,0), cc.color("#814731"), 0, 0);
        text.anchorX=text.anchorY=0;
        this.addChild(text);
        this.setContentSize(text.width,text.height);
    }

})

var GPSAlertPop = BasePopup.extend({

    ctor: function () {
        this._super("res/gpsAlertPop.json");
    },

    selfRender: function () {
        this.Button_36 = this.getWidget("Button_36");
        this.Button_37 = this.getWidget("Button_37");
        UITools.addClickEvent(this.Button_36,this,this.onOk);
        UITools.addClickEvent(this.Button_37,this,this.onCancel);
        var list = this.ListView_8 = this.getWidget("ListView_8");
        var array = GPSModel.alertContentArray;
        var curArray = [];
        list.pushBackCustomItem(new GPSAlertCell("发现距离较近玩家，是否解散房间？"));
        for(var i=0;i<array.length;i++){
            var userIdMap = array[i];
            var userId1 = userIdMap.userId1;
            var userId2 = userIdMap.userId2;
            var key = GPSModel.getKeyByUserId(userId1,userId2);
            if(ArrayUtil.indexOf(curArray,key)<0){
                var distance = GPSModel.getDistance(userId1,userId2);
                var name1 = this.getPlayerName(userId1);
                var name2 = this.getPlayerName(userId2);
                var str = name1+"(ID:"+userId1+")与"+name2+"(ID:"+userId2+")相距"+distance;
                list.pushBackCustomItem(new GPSAlertCell(str));
                curArray.push(key);
            }
        }
    },

    getPlayerName:function(userId){
        var name = "";
        var players = DTZRoomModel.players;

        var curLayer = LayerManager.getCurrentLayer();
        switch (curLayer){
            case LayerFactory.PHZ_ROOM:
            case LayerFactory.PHZ_ROOM_MORE:
            case LayerFactory.PHZ_ROOM_LESS:
                players = PHZRoomModel.players;
                break;
            case LayerFactory.DTZ_ROOM:
            case LayerFactory.DTZ_3REN_ROOM:
                players = DTZRoomModel.players;
                break;
            case LayerFactory.PDK_ROOM:
                players = PDKRoomModel.players;
                break;
            case LayerFactory.DDZ_ROOM:
                players = DdzRoomModel.players;
                break;
        }

        for(var i=0;i<players.length;i++){
            var p = players[i];
            if(p.userId == userId){
                name = p.name;
                break;
            }
        }
        return name;
    },

    onOk:function(){
        sySocket.sendComReqMsg(21);
        PopupManager.remove(this);
    },

    onCancel:function(){
        PopupManager.remove(this);
    }
});

var GPSReviewPop = BasePopup.extend({
    ctor: function () {
        this._super("res/gpsReviewPop.json");
    },

    selfRender: function () {

    }
});

//GPS 界面
var GpsPop = BasePopup.extend({
    sortedData:[],

    ctor: function (curRoomModel , totalRenshu) {
        this.sortedData = [];
        this.curRoomModel = curRoomModel;
        this.hasShowIcon = false;
        this.curWanfa = curRoomModel.wanfa;
        this.dtTime = 0;

        var players = curRoomModel.players;
        this.sortedData = ArrayUtil.clone(players);
        this.totalRenshu = totalRenshu || 3;
        this._super("res/gpsPop" + this.totalRenshu + ".json");
    },

    selfRender: function () {
        this.Button_21 = this.getWidget("Button_close");
        UITools.addClickEvent(this.Button_21,this,this.onclose);
        this.initUi();
        this.scheduleUpdate();
        this.addCustomEvent(SyEvent.DTZ_UPDATE_GPS,this,this.rfreshDistance);
        this.addCustomEvent(SyEvent.JOIN_ROOM, this, this.reFreshPlayer);
        this.addCustomEvent(SyEvent.EXIT_ROOM, this, this.reFreshPlayer);
        var userIds = this.checkGpsData();
        if(userIds.length > 0){//有玩家未获取到位置
            ComReq.comReqCallPlayerUpdateGps(userIds);
        }

    },

    getRoomModel:function(){
        var wanfa = this.curWanfa;
        cc.log("创建房间成功 wafa ... " , wanfa);
        switch (wanfa){
            case 113:
            case 114://打筒子
            case 115:
            case 116:
            case 117:
            case 118:
                return DTZRoomModel;
            case 15:
            case 16://跑得快
                return PDKRoomModel;
            case PHZGameTypeModel.SYZP://邵阳字牌
            case PHZGameTypeModel.SYBP://邵阳剥皮
            case PHZGameTypeModel.LDFPF:
                return PHZRoomModel;
            case 131:
                return BBTRoomModel;
        }
    },

    /**
     * 判断是否所有玩家都有GPS数据 未获取到数据的 通知后台 后台判断通知玩家刷新或者返回已有GPS数据
     */
    checkGpsData:function(){
        var noGpsPlayerUserId = [];
        for(var checkIndex = 0 ; checkIndex < this.sortedData.length ; checkIndex ++) {
            if (GPSModel.getGpsData(this.sortedData[checkIndex].userId) == null) {
                noGpsPlayerUserId.push(parseInt(this.sortedData[checkIndex].userId));
            }
        }
        return noGpsPlayerUserId;
    },

    update:function(dt){
        //cc.log("检测玩家头像是否显示完毕" , this.curRoomModel.isRoomIconRoad());
        this.dtTime += dt;
        if(this.curRoomModel.isRoomIconRoad() && this.hasShowIcon == false){
            this.rfreshIcon();
        }

        if(this.dtTime >= 10){
            this.dtTime = 0;//这里想后台请求 刷新所有玩家的GPS数据
            ComReq.comReqCallPlayerUpdateGps();
        }
    },

    initUi:function() {
        this.seatSeq = {1:[1,2,3],2:[2,3,1],3:[3,1,2]};
        if(this.totalRenshu == 4){
            this.seatSeq = this.seatSeq = {1: [1, 2, 3, 4], 2: [2, 3, 4, 1], 3: [3, 4, 1, 2] , 4: [4, 1, 2, 3] };
        }
        for(var i=1; i <= this.totalRenshu; i++){
            this["player" + i] = this.getWidget("player"+i);
            this["noGpsSign" + i] = this.getWidget("noGpsSign"+ i);
            this["nameLable" + i] = this.getWidget("nameLable"+i);
            if(this["noGpsSign" + i]){
                this["noGpsSign" + i].visible = false;
            }
            for(var j = 1 ; j <= this.totalRenshu ; j ++){
                this["xian"+i+"_"+j] = this.getWidget("xian"+i+"_"+j);
                this["jl"+i+"_"+j] = this.getWidget("jl"+i+"_"+j);
                if(this["jl"+i+"_"+j]){
                    this["jl"+i+"_"+j].removeAllChildren(true);
                }
                if(this["xian"+i+"_"+j]){
                    this["xian"+i+"_"+j].visible = false;
                }
            }
        }

        this.sortModelData();
        this.rfreshDistance();
        this.rfreshName();
    },

    sortModelData:function(){
        var players = this.curRoomModel.players;
        this.sortedData = ArrayUtil.clone(players);
        var length = this.sortedData.length;

        //单独写一套对玩家信息排序规则
        var newPlayerList = [];
        var myIndex = 0;

        var mainSeat = this.curRoomModel.mySeat;
        if(this.curRoomModel.mySeat == 0){//打筒子特殊 玩家进房没有座位 默认用房主的视野看GPS
            mainSeat = 1
        }

        for(var i = 0 ; i < this.sortedData.length ; i ++){
            if(this.sortedData[i].seat == mainSeat){
                myIndex = i;
                this.sortedData[i].gpsSeat = 1;
                newPlayerList.push(this.sortedData[i]);
                break;
            }
        }

        //以我为视角 后面玩家排序
        var curSeat = mainSeat;
        for(var index = 1 ; index <= this.totalRenshu ; index ++){
            var nextSeat = this.seatSeq[curSeat][1];
            cc.log("当前查找的玩家座位为：" , nextSeat);
            for(var i = 0 ; i < this.sortedData.length;i++){
                if(this.sortedData[i].seat == nextSeat && nextSeat != mainSeat){//有可能这个座位还没坐玩家
                    if(newPlayerList.length == this.sortedData.length ){//防止循环插入
                        break;
                    }
                    this.sortedData[i].gpsSeat = index + 1;//相对于我的视野在第几个位置
                    newPlayerList.push(this.sortedData[i]);
                }
            }
            curSeat = nextSeat;
        }

        if(newPlayerList.length == this.sortedData.length ){
            this.sortedData = newPlayerList;
        }else{
            this.sortedData = newPlayerList;
            //cc.log("GPS系统对玩家数据排序之后 玩家数量异常 打筒子存在这种情况");
        }
    },

    initGpsUi:function(){
        //还原界面修改
        for(var i = 1 ; i <= this.totalRenshu; i++){
            if(this["noGpsSign" + i]){
                this["noGpsSign" + i].visible = false;
            }
            for(var j = 1 ; j <= this.totalRenshu ; j ++) {
                if(i != j){
                    var xianNode = this.getXianNode(i , j);
                    var juliNode = this.getJuliNode(i , j);
                    if(xianNode){
                        xianNode.visible = false;
                    }
                    if(juliNode){
                        juliNode.removeAllChildren(true);
                        juliNode.loadTexture("res/ui/gps/weizhi.png");
                        juliNode.visible = true;
                    }
                }
            }
        }
    },

    reFreshPlayer:function(){
        this.curRoomModel = this.getRoomModel();
        if(this.curRoomModel){
            this.sortModelData();
            this.rfreshIcon();
            this.rfreshName();
            //this.rfreshDistance();
        }else{
            cc.log("reFreshPlayer::error ", this.curRoomModel , this.curWanfa)
        }
    },

    rfreshDistance:function(){
        cc.log("GPSPop:refreshDistance!!!!!!");
        //FloatLabelUtil.comText("收到后台数据,刷新距离显示");
        this.initGpsUi();

        if(this.sortedData.length >= 2){
            //处理没有GPS数据的玩家显示
            for(var checkIndex = 0 ; checkIndex < this.sortedData.length ; checkIndex ++){
                if(GPSModel.getGpsData(this.sortedData[checkIndex].userId) == null){
                    cc.log("有位置信息未获取到 不显示距离信息..." , this.sortedData[checkIndex].userId , this.sortedData[checkIndex].gpsSeat);
                    var noGpsIndex = this.sortedData[checkIndex].gpsSeat;
                    if(this["noGpsSign" + noGpsIndex]){
                        this["noGpsSign" + noGpsIndex].visible = true;
                    }

                    //隐藏没有GPS数据的人的相关线和距离
                    for(var index = 0 ; index < this.sortedData.length ; index ++){
                        if(index != noGpsIndex){
                            var xianNode = this.getXianNode(noGpsIndex , index);
                            var juliNode = this.getJuliNode(noGpsIndex , index);
                            if(xianNode){
                                xianNode.visible = false;
                            }
                            if(juliNode){
                                juliNode.removeAllChildren(true);
                                juliNode.loadTexture("res/ui/gps/weizhi.png");
                                juliNode.visible = true;
                            }
                        }
                    }
                }
            }

            for(var i = 0 ; i < this.sortedData.length ; i ++){
                for(var j = 0 ; j < this.sortedData.length ; j ++) {
                    if(i != j){
                        var gpsSeat1 = this.sortedData[i].gpsSeat;
                        var gpsSeat2 = this.sortedData[j].gpsSeat;
                        if(GPSModel.getGpsData(this.sortedData[i].userId) == null || GPSModel.getGpsData(this.sortedData[j].userId) == null){
                            continue;
                        }

                        var distance = GPSModel.getDistance(this.sortedData[i].userId , this.sortedData[j].userId);
                        cc.log("GPSPop:显示玩家" + (gpsSeat1) + "到玩家" + (gpsSeat2) + "的距离为:" + distance);
                        var xianNode = this.getXianNode(gpsSeat1 , gpsSeat2);
                        var juliNode = this.getJuliNode(gpsSeat1 , gpsSeat2);
                        if(xianNode){
                            xianNode.visible = true;
                        }
                        if(juliNode){
                            juliNode.removeAllChildren(true);
                            juliNode.loadTexture("res/ui/gps/length.png");
                            juliNode.visible = true;
                            var jlLable = new cc.LabelTTF(distance+"","Arial",25);
                            jlLable.x = juliNode.width/2;
                            jlLable.y = juliNode.height/2;
                            juliNode.addChild(jlLable);
                        }
                    }
                }
            }
        }
    },

    rfreshName:function() {
        for(var index = 0 ; index < this.totalRenshu ; index++){
            var nameLable = this["nameLable" + (index + 1)];
            if(nameLable){
                nameLable.setString("");
            }
        }

        for (var i = 0; i < this.sortedData.length; i++) {
            var realSeat = this.sortedData[i].gpsSeat;
            var icon = this["player" + (realSeat)];
            var nameLable = this["nameLable" + (realSeat)];
            var user = this.getPlayMsg(realSeat);
            if(nameLable == null){
                cc.log("why why why why?");
            }
            if(user && icon && nameLable){
                this.addName(user , icon , nameLable);
            }else{
                cc.log("获取名字信息失败..." , realSeat);
            }
        }
    },

    rfreshIcon:function() {
        cc.log("this.sortedData.length..." , this.sortedData.length);
        for(var index = 0 ; index < this.totalRenshu ; index++){
            var tIcon = this["player" + (index+1)];
            if(tIcon && tIcon.getChildByTag(345)){
                tIcon.removeChildByTag(345);
                tIcon.urlImg = null;
            }
        }

        for (var i = 0; i < this.sortedData.length; i++) {
            var realSeat = this.sortedData[i].gpsSeat;
            var icon = this["player" + (realSeat)];
            //var user = this.sortedData[i];
            var user = this.getPlayMsg(realSeat);
            if (user && user.icon) {
                this.showIcon(user,icon);
            }else{
                cc.log("刷新玩家头像异常..." , realSeat);
            }
        }

        this.hasShowIcon = true;
    },

    getXianNode:function(gpsSeat1 , gpsSeat2){
        var node1 = this["xian" + gpsSeat1 + "_" + gpsSeat2];
        var node2 = this["xian" + gpsSeat2 + "_" + gpsSeat1];
        return node1 == null ? node2 : node1;
    },

    getJuliNode:function(gpsSeat1 , gpsSeat2){
        var node1 = this["jl" + gpsSeat1 + "_" + gpsSeat2];
        var node2 = this["jl" + gpsSeat2 + "_" + gpsSeat1];
        return node1 == null ? node2 : node1;

    },

    getPlayMsg:function(gpsSeat){
        for(var index = 0 ; index < this.sortedData.length ; index ++){
            if(this.sortedData[index].gpsSeat == gpsSeat){
                return this.sortedData[index]
            }
        }
        return null;
    },

    addName:function(user,icon,nameLable){
        if(nameLable){
            nameLable.setString(user.name+"");
        }
    },

    showIcon:function(user,icon){
        var defaultimg = (user.sex == 1) ? "res/ui/gps/gpsDefaultIcon.png" : "res/ui/gps/gpsDefaultIcon.png";

        if(icon.urlImg == null || icon.urlImg != user.icon){
            var sprite = new cc.Sprite(defaultimg);
            var sten = new cc.Sprite("res/ui/gps/gpsDefaultIcon.png");
            var clipnode = new cc.ClippingNode();
            clipnode.attr({stencil: sten, anchorX: 0.5, anchorY: 0.5, x: 40, y: 40, alphaThreshold: 0.8});
            clipnode.addChild(sprite);
            icon.addChild(clipnode,5,345);
            cc.loader.loadImg(user.icon, {width: 252, height: 252}, function (error, img) {
                if (!error) {
                    sprite.setTexture(img);
                    icon.urlImg = user.icon;
                    sprite.scale = 0.9;
                }
            });
        }

    },

    onclose:function(){
        this.unscheduleUpdate();
        PopupManager.remove(this);
    }
});
