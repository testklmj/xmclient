/**
 * Created by zhoufan on 2016/6/24.
 */
var LayerFactory = {
    HALL:"res/hall.json",
    ROOM:"res/DTZroom.json",
    PDK_ROOM:"res/pdkRoom.json",
    PDK_MONEY_ROOM:"res/pdkMoneyRoom.json",
    DTZ_ROOM:"res/DTZroom.json",
    DTZ_MONEY_ROOM:"res/DTZMoney3RenRoom.json",
    DTZ_3REN_ROOM:"res/DTZ3RenRoom.json",
    DTZ_HOME:"res/DTZHome.json",
    DTZ_MONEY_HOME:"res/DTZMoneyHome.json",
    PDK_HOME:"res/pdkHome.json",
    PHZ_ROOM_MORE:"res/phzRoomMore.json",
    PHZ_ROOM_LESS:"res/phzRoom2Ren.json",
    PHZ_MONEY_ROOM:"res/phzMoneyRoom.json",
    PHZ_REPLAY:"res/phzReplay.json",
    PHZ_REPLAY_MORE:"res/phzReplayMore.json",
    PHZ_REPLAY_LESS:"res/phzReplayLess.json",
    MJ_ROOM:"res/mjRoom.json",
    MJ_ROOM_THREE:"res/mjThreeRoom.json",
    MJ_ROOM_TWO:"res/mjTwoRoom.json",
    DN_ROOM:"res/dnRoom.json",
    DN_ROOM_MORE:"res/dnRoomMore.json",
    PHZ_ROOM:"res/phzRoom.json",
    HOME:"res/DTZHome.json",
    BBT_ROOM:"res/bbtRoom.json",
    LOGIN:"res/login.json",
    SEEPLAYBACK:"res/seePlayBack.json",
    BBTSEEPLAYBACK:"res/bbtseePlayBack.json",
    DTZSEEPLAYBACK_MORE:"res/DTZReplay.json",
    DTZSEEPLAYBACK:"res/DTZ3RenReplay.json",
    MATCH_PDK_ROOM:"res/matchPdkRoom.json",
    MATCH_HOME_LAYER:"res/matchHomePop.json",
    MATCH_DTZ_ROOM:"res/matchDtzRoom.json",
    DDZ_ROOM:"res/ddzRoom.json",
    DDZ_MONEY_ROOM:"res/ddzMoneyRoom.json",
    ZZMJ_ROOM:"res/zzmjRoom.json",
    ZZMJ_ROOM_TWO:"res/zzmjRoomTwo.json",
    ZZMJ_ROOM_THREE:"res/zzmjRoomThree.json",
    HZMJ_ROOM:"res/hzmjRoom.json",
    HZMJ_ROOM_TWO:"res/hzmjRoomTwo.json",
    HZMJ_ROOM_THREE:"res/hzmjRoomThree.json",
    HZMJ_REPLAY:"res/hzmjReplay.json",
    HZMJ_REPLAY_TWO:"res/hzmjReplayTwo.json",
    HZMJ_REPLAY_THREE:"res/hzmjReplayThree.json",

    SYMJ_ROOM:"res/symjRoom.json",
    SYMJ_ROOM_TWO:"res/symjRoomTwo.json",
    SYMJ_ROOM_THREE:"res/symjRoomThree.json",
    SYMJ_REPLAY:"res/symjReplay.json",
    SYMJ_REPLAY_TWO:"res/symjReplayTwo.json",
    SYMJ_REPLAY_THREE:"res/symjReplayThree.json",

    CSMJ_ROOM:"res/csmjRoom.json",
    CSMJ_ROOM_TWO:"res/csmjRoomTwo.json",
    CSMJ_ROOM_THREE:"res/csmjRoomThree.json",


    buildInst:function(name){
        var layer = null;
        switch (name){
            case this.ROOM:
                layer = new DTZRoom(name);
                break;
            case this.DTZ_ROOM:
                layer = new DTZRoom(name);
                break;
            case this.DTZ_3REN_ROOM:
                layer = new DTZRoom(name);
                break;
            case this.DTZ_MONEY_ROOM:
                layer = new DTZMoneyRoom(name);
                break;
            case this.PDK_ROOM:
                layer = new PDKRoom();
                break;
            case this.PDK_MONEY_ROOM:
                layer = new PDKMoenyRoom();
                break;
            case this.BBT_ROOM:
                layer = new BBTRoom();
                break;
            case this.HOME:
                layer = new DTZHomeLayer();
                break;
            case this.DTZ_HOME:
                layer = new DTZHomeLayer();
                break;
            case this.DTZ_MONEY_HOME:
                layer = new DTZMoneyHomeLayer();
                break;
            case this.LOGIN:
                layer = new LoginLayer();
                break;
            case this.SEEPLAYBACK:
            	layer = new SeePlayBackLayer();
            	break;
            case this.BBTSEEPLAYBACK:
                layer = new BBTSeePlayBackLayer();
                break;
            case this.DTZSEEPLAYBACK:
            case this.DTZSEEPLAYBACK_MORE:
                layer = new DTZSeePlayBackLayer(name);
                break;
            case this.PHZ_ROOM:
            case this.PHZ_ROOM_MORE:
            case this.PHZ_ROOM_LESS:
                layer = new PHZRoom(name);
                break;
            case this.PHZ_MONEY_ROOM:
                layer = new PHZMoneyRoom(name);
                break;
            case this.PHZ_REPLAY:
            case this.PHZ_REPLAY_MORE:
            case this.PHZ_REPLAY_LESS:
                layer = new PHZReplay(name);
                break;
            case this.MATCH_HOME_LAYER:
                layer = new MatchHomeLayer(name);
                break;
            case this.MATCH_PDK_ROOM:
                layer = new MatchPdkRoom(name);
                break;
            case this.MATCH_DTZ_ROOM:
                layer = new MatchDtzRoom(name);
                break;
            case this.DDZ_ROOM:
                layer = new DdzOnlineRoom(name);
                break;
            case this.DDZ_MONEY_ROOM:
                layer = new DdzMoneyRoom(name);
                break;
            case this.ZZMJ_ROOM:
            case this.ZZMJ_ROOM_TWO:
            case this.ZZMJ_ROOM_THREE:
                layer = new ZZMJRoom(name);
                break;
            case this.HZMJ_ROOM:
            case this.HZMJ_ROOM_TWO:
            case this.HZMJ_ROOM_THREE:
                layer = new HZMJRoom(name);
                break;
            case this.HZMJ_REPLAY:
            case this.HZMJ_REPLAY_TWO:
            case this.HZMJ_REPLAY_THREE:
                layer = new HZMJReplay(name);
                break;
            case this.SYMJ_ROOM:
            case this.SYMJ_ROOM_TWO:
            case this.SYMJ_ROOM_THREE:
                layer = new SYMJRoom(name);
                break;
            case this.SYMJ_REPLAY:
            case this.SYMJ_REPLAY_TWO:
            case this.SYMJ_REPLAY_THREE:
                layer = new SYMJReplay(name);
                break;
            case this.CSMJ_ROOM:
            case this.CSMJ_ROOM_TWO:
            case this.CSMJ_ROOM_THREE:
                layer = new CSMJRoom(name);
                break;

        }
        return layer;
    }
}

var LayerManager = {

    init:function(root){
        this._layerMap = {};
        this._currentLayer = null;
        this._root = root;
    },

    getLayer:function(name){
        return this._layerMap[name];
    },

    getCurrentLayer:function(){
        if(this._currentLayer)
            return this._currentLayer.getName();
        return "";
    },

    getCurrentLayerObj:function(){
        if(this._currentLayer)
            return this._currentLayer;
        return null;
    },

    isInReplay:function(){
        var layers = [LayerFactory.SEEPLAYBACK,LayerFactory.DTZSEEPLAYBACK,LayerFactory.DTZSEEPLAYBACK_MORE,LayerFactory.DTZ_ROOM];
        return (ArrayUtil.indexOf(layers,this.getCurrentLayer())>=0);
    },

    isInRoom:function(){
        var layers = [LayerFactory.ROOM,LayerFactory.DTZ_3REN_ROOM,LayerFactory.PDK_ROOM,LayerFactory.PDK_MONEY_ROOM,LayerFactory.DN_ROOM,LayerFactory.PHZ_ROOM,
            LayerFactory.PHZ_ROOM_MORE,LayerFactory.PHZ_MONEY_ROOM,LayerFactory.DN_ROOM_MORE,LayerFactory.DTZ_ROOM,LayerFactory.BBT_ROOM,LayerFactory.DTZ_MONEY_ROOM,
            LayerFactory.MATCH_PDK_ROOM,LayerFactory.MATCH_DTZ_ROOM,LayerFactory.PHZ_ROOM_LESS,LayerFactory.DDZ_ROOM,
            LayerFactory.DDZ_MONEY_ROOM,LayerFactory.ZZMJ_ROOM,LayerFactory.ZZMJ_ROOM_TWO,LayerFactory.ZZMJ_ROOM_THREE,
            LayerFactory.SYMJ_ROOM,LayerFactory.SYMJ_ROOM_TWO,LayerFactory.SYMJ_ROOM_THREE,
            LayerFactory.HZMJ_ROOM,LayerFactory.HZMJ_ROOM_TWO,LayerFactory.HZMJ_ROOM_THREE,
            LayerFactory.CSMJ_ROOM,LayerFactory.CSMJ_ROOM_TWO,LayerFactory.CSMJ_ROOM_THREE];
        return (ArrayUtil.indexOf(layers,this.getCurrentLayer())>=0);
    },

    isInMJ: function() {
        var layers = [LayerFactory.ZZMJ_ROOM,LayerFactory.ZZMJ_ROOM_TWO,LayerFactory.ZZMJ_ROOM_THREE,
                        LayerFactory.SYMJ_ROOM,LayerFactory.SYMJ_ROOM_TWO,LayerFactory.SYMJ_ROOM_THREE,
                        LayerFactory.HZMJ_ROOM,LayerFactory.HZMJ_ROOM_TWO,LayerFactory.HZMJ_ROOM_THREE,
                        LayerFactory.CSMJ_ROOM,LayerFactory.CSMJ_ROOM_TWO,LayerFactory.CSMJ_ROOM_THREE];
        return (ArrayUtil.indexOf(layers,this.getCurrentLayer())>=0);
    },

    isInDTZ: function() {
        var layers = [LayerFactory.DTZ_ROOM,LayerFactory.DTZ_3REN_ROOM,LayerFactory.DTZ_MONEY_ROOM,LayerFactory.MATCH_DTZ_ROOM];
        return (ArrayUtil.indexOf(layers,this.getCurrentLayer())>=0);
    },

    isInPDK:function(){
        var layers = [LayerFactory.PDK_ROOM , LayerFactory.PDK_MONEY_ROOM , LayerFactory.MATCH_PDK_ROOM];
        return (ArrayUtil.indexOf(layers , this.getCurrentLayer())>=0);
    },

    isInPHZ:function(){
        var layers = [LayerFactory.PHZ_ROOM , LayerFactory.PHZ_ROOM_MORE , LayerFactory.PHZ_MONEY_ROOM,LayerFactory.PHZ_ROOM_LESS];
        return (ArrayUtil.indexOf(layers , this.getCurrentLayer())>=0);
    },

    isInDDZ:function(){
        var layers = [LayerFactory.DDZ_ROOM,LayerFactory.DDZ_MONEY_ROOM];
        return (ArrayUtil.indexOf(layers , this.getCurrentLayer())>=0);
    },

    addLayer:function(name){
        var scene = this._layerMap[name];
        if(!scene){
            scene = LayerFactory.buildInst(name);
            this._layerMap[name] = scene;
            this._root.addChild(scene);
        }
        return this._layerMap[name];
    },

    showLayer:function(name) {
        if(this._currentLayer) {
            if(name == this._currentLayer.getName()){
                return this._currentLayer;
            }
            if(this._currentLayer.isForceRemove()){
                cc.log("this._currentLayer.getName()..." , this._currentLayer.getName());
                this.removeLayer(this._currentLayer.getName());
            }else{
                this._currentLayer.visible = false;
                this._currentLayer.onHide();
            }
        }
        var layer = this._layerMap[name];
        if(!layer) {
            layer = this.addLayer(name);
        } else {
            layer.visible = true;
            layer.onShow();
            if(name == LayerFactory.HOME || name == LayerFactory.MJ_HOME){
            	//layer.createTipPoint();
            }
        }
        this._currentLayer = layer;
        if(sy.scene.paomadeng){
            if(name == LayerFactory.HALL){
                sy.scene.paomadeng.updatePosition(10,550);
            }else if(name==LayerFactory.DTZ_HOME){
            	sy.scene.paomadeng.updatePosition(50,580);
            }else if(name==LayerFactory.ROOM){
                sy.scene.paomadeng.updatePosition(10,600);
            }else if(name==LayerFactory.PHZ_ROOM || name==LayerFactory.PHZ_ROOM_MORE  || name==LayerFactory.PHZ_MONEY_ROOM
                || name == LayerFactory.PHZ_ROOM_LESS){
                sy.scene.paomadeng.updatePosition(50,640);
            }else if(name == LayerFactory.DTZ_MONEY_ROOM){
                sy.scene.paomadeng.updatePosition(50,580);
            }else if (name == LayerFactory.DTZ_MONEY_HOME){
                sy.scene.paomadeng.updatePosition(50,580)
            }else if (name == LayerFactory.PDK_MONEY_ROOM) {
                sy.scene.paomadeng.updatePosition(50,640)
            }else if (name == LayerFactory.MATCH_HOME_LAYER) {
                sy.scene.paomadeng.updatePosition(50,580)
            }else{
                sy.scene.paomadeng.updatePosition(150,640);
            }
            var curMsg = PaoMaDengModel.getCurrentMsg();
            if((curMsg&&curMsg.type == 0 && this.isInRoom()) || this.isInReplay()){
                sy.scene.paomadeng.stop();
            }
        }
        return layer;
    },

    /**
     * 移除场景
     * @param name
     */
    removeLayer:function(name) {
        var layer = this._layerMap[name];
        if(layer){
            layer.removeAllEvents();
            layer.onRemove();
            this._root.removeChild(layer);
            layer = null;
            delete this._layerMap[name];
        }else{
            cc.log("LayerManager removeLayer::未找到layer..." , name);
        }
    },

    dispose:function(){
        var layers = [];
        for(var key in this._layerMap){
            layers.push(key);
        }
        for(var i=0;i<layers.length;i++){
            this.removeLayer(layers[i]);
        }
        this._currentLayer=null;
    	this._layerMap = {};
    }
}