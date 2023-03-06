/**
 * 用于游戏场景类的全屏显示层的基类
 */
var BaseLayer = cc.Layer.extend({
    layerName:"",
    json:"",
    moreFiles:[],
    root:null,
    showCount:0,
    lStatus:-1,
    RESUME:1,
    STOP:2,
    resumeForever:false,
    renderFinish:false,
    _customEvents:null,
    isLoad:false,

    ctor:function(json,moreFiles){
        this.isLoad = false;
         if (this.Panel_shazhu){
            this.Panel_shazhu.removeFromParent(true);
            this.Panel_shazhu = null;
        }
        this._super();
        this.showCount = 0;
        this.json = json;
        this.layerName = json;
        this.moreFiles = moreFiles;
        this.resumeForever = false;
        this.renderFinish = false;
        this._customEvents = {};
        this.loadComplete();
    },

    getName:function(){
        return this.layerName;
    },

    isForceRemove:function(){
        return false;
    },

    loadComplete : function(){
        this.root = ccs.uiReader.widgetFromJsonFile(this.json);
        this.addChild(this.root);
        this.selfRender();
       if (this.Panel_shazhu){
            this.Panel_shazhu.removeFromParent(true);
            this.Panel_shazhu = null;
        }


        if (!this.isLoad && this.isInRoom()){
             this.isLoad = true;
             this.initShaZhu();
             this.addCustomEvent("shazhu_show",this,this.shaZhuShow);
             this.addCustomEvent("shazhu_data",this,this.shaZhuData);
             this.addCustomEvent("shazhu_get",this,this.shaZhuGet);
             this.addCustomEvent("shazhu_hide",this,this.hideShaZhu);
         }

        this.renderFinish = true;


    },

     isInRoom:function(){
        var layers = [LayerFactory.ROOM,LayerFactory.DTZ_3REN_ROOM,LayerFactory.PDK_ROOM,LayerFactory.PDK_MONEY_ROOM,LayerFactory.DN_ROOM,LayerFactory.PHZ_ROOM,
            LayerFactory.PHZ_ROOM_MORE,LayerFactory.PHZ_MONEY_ROOM,LayerFactory.DN_ROOM_MORE,LayerFactory.DTZ_ROOM,LayerFactory.BBT_ROOM,LayerFactory.DTZ_MONEY_ROOM,
            LayerFactory.MATCH_PDK_ROOM,LayerFactory.MATCH_DTZ_ROOM,LayerFactory.PHZ_ROOM_LESS,LayerFactory.DDZ_ROOM,
            LayerFactory.DDZ_MONEY_ROOM,LayerFactory.ZZMJ_ROOM,LayerFactory.ZZMJ_ROOM_TWO,LayerFactory.ZZMJ_ROOM_THREE,
            LayerFactory.SYMJ_ROOM,LayerFactory.SYMJ_ROOM_TWO,LayerFactory.SYMJ_ROOM_THREE,
            LayerFactory.HZMJ_ROOM,LayerFactory.HZMJ_ROOM_TWO,LayerFactory.HZMJ_ROOM_THREE,
            LayerFactory.CSMJ_ROOM,LayerFactory.CSMJ_ROOM_TWO,LayerFactory.CSMJ_ROOM_THREE];
//            cc.log("isInRoom====",this.getCurrentLayer())
        return (ArrayUtil.indexOf(layers,this.json)>=0);
    },

    /**
     * UI层的操作
     */
    selfRender:function(){
        throw new Error("subclass must override function selfRender");
    },

    addCustomEvent:function(eventType,target,cb){
        if(!this._customEvents[eventType]){
            var listener = SyEventManager.addEventListener(eventType, target, cb);
            this._customEvents[eventType] = listener;
        }
    },

    removeEvents:function(events){
        var types = TypeUtil.isArray(events) ? events : [events];
        for (var i = 0; i < types.length; i++) {
            var et = types[i];
            var listener = this._customEvents[et];
            if(listener){
                SyEventManager.removeListener(listener);
                this._customEvents[et] = null;
            }
        }
    },

    removeAllEvents:function(){
        var events = [];
        for(var key in this._customEvents){
            events.push(key);
        }
        this.removeEvents(events);
    },

    getWidget : function(name){
        return ccui.helper.seekWidgetByName(this.root,name);
    },

    onShow:function(){
    },

    onHide:function(){
       if (this.Panel_shazhu){
           this.Panel_shazhu.removeFromParent(true);
           this.Panel_shazhu = null;
       }
    },

    onRemove:function(){
        if (this.Panel_shazhu){
           this.Panel_shazhu.removeFromParent(true);
           this.Panel_shazhu = null;
       }
    },

    initShaZhu:function(){

        if (this.Panel_shazhu){
            this.Panel_shazhu.removeFromParent(true);
            this.Panel_shazhu = null;
        }

        var wanfa = (BaseRoomModel.curRoomData && BaseRoomModel.curRoomData.wanfa) ? BaseRoomModel.curRoomData.wanfa : 0;

        var szBg = "res/ui/dtz/dtzCom/img_ting2.png";
        this.Panel_shazhu = new cc.Scale9Sprite(szBg,null,cc.rect(40,30,40,30));
        this.Panel_shazhu.x = 640;
        this.Panel_shazhu.y = 360;
        this.Panel_shazhu.width = 1000;
        this.Panel_shazhu.height = 460;
        sy.scene.popuplayer.addChild(this.Panel_shazhu,999);

        if (ClubRecallDetailModel.isHZMJWanfa(wanfa) || ClubRecallDetailModel.isPHZWanfa(wanfa) || ClubRecallDetailModel.isPDKWanfa(wanfa) || ClubRecallDetailModel.isDTZWanfa(wanfa)){
            if (ClubRecallDetailModel.isPHZWanfa(wanfa)){
                this.openBtn = this.getWidget("fapai");
            }else if (ClubRecallDetailModel.isPDKWanfa(wanfa)){
                this.openBtn = this.getWidget("Image_databg");
            }else if (ClubRecallDetailModel.isDTZWanfa(wanfa)){
                this.openBtn = this.getWidget("dark8Node");
            }else{
                this.openBtn = this.getWidget("Image_info2");
            }
            if (this.openBtn){
                this.openBtn.temp = 1;
                UITools.addClickEvent(this.openBtn,this,this.closeShaZhu);
                this.openBtn.setTouchEnabled(false);
            }

        }
        this.Panel_shazhu.visible = false;
    },

    showAllMj:function(data){
       this.Panel_shazhu.removeAllChildren();
        var wanfa = (BaseRoomModel.curRoomData && BaseRoomModel.curRoomData.wanfa) ? BaseRoomModel.curRoomData.wanfa : 0;
        var closePath = "res/ui/dtz/dtzCom/pop_btn_close.png"
        var closeBtn1 = new ccui.Button(closePath,"","");
        closeBtn1.temp = 2;;
        closeBtn1.setPosition(this.Panel_shazhu.width - 20,this.Panel_shazhu.height - 20);
        UITools.addClickEvent(closeBtn1,this,this.closeShaZhu);
        this.Panel_shazhu.addChild(closeBtn1);



        var huList = [];
        var _data = data.split("|");
        this.Panel_shazhu.visible = _data.length > 0 ? true : false;
        if (ClubRecallDetailModel.isHZMJWanfa(wanfa) || ClubRecallDetailModel.isPHZWanfa(wanfa)){
            for (var i = 1; i <= 27; i++) {
                huList.push(i);
            }
            huList.push(201);
            if (ClubRecallDetailModel.isPHZWanfa(wanfa)){
                huList = [];
                for (var i = 1; i <= 10; i++) {
                    huList.push(i);
                }
                for (var i = 41; i <= 50; i++) {
                    huList.push(i);
                }
            }
            var  scale_num = 0.8;
            var  _diffX = 100;
            var  _zidiffX = 0;
            for (var i = 0; i < huList.length; i++) {
//                cc.log("i===================",huList[i],i)
                var height = Math.floor(i/9);
                var width = Math.floor(i%9);
                var vo = MJAI.getMJDef(huList[i]);
                var card = new CSMahjong(MJAI.getDisplayVo(1, 2), vo);
                if (ClubRecallDetailModel.isPHZWanfa(wanfa)){
                    vo = PHZAI.getPHZDef(huList[i]);
                    card = new PHZCard(PHZAI.getDisplayVo(1,2),vo);
                    height = Math.floor(i/10);
                    width = Math.floor(i%10);
                    scale_num = 0.9;
                    _diffX = 40;
                    _zidiffX = -10;
                }

                card.scale = scale_num;
                var size = card.getContentSize();
                card.x = width * ((60+40)*scale_num)+_diffX;
                card.y = this.Panel_shazhu.height*0.65 - height*(size.height + 70)*scale_num + 15;
                this.Panel_shazhu.addChild(card,i+1);
                card.setTouchEnabled(true);

                UITools.addClickEvent(card,this,this.sendShaZhu);
                if (ClubRecallDetailModel.isHZMJWanfa(wanfa) && huList[i] == 201){
                    card.x = 9 * ((60+40)*scale_num)+_diffX;
                    card.y = this.Panel_shazhu.height*0.65  + 15;
                }

                var paiNumLabel = new cc.LabelTTF("", "Arial", 28);
                paiNumLabel.setString(0 + "张");
                paiNumLabel.y = -20;
                paiNumLabel.x = size.width*0.5 * scale_num + _zidiffX;
                paiNumLabel.setColor(cc.color("f0ff6a"));
                card.addChild(paiNumLabel);

                for (var j = 0; j < _data.length; j++) {
                    var _sydata = _data[j].split(",");
                    cc.log("_sydata====",_sydata);
                    var _id = (card._cardVo && Number(card._cardVo.i)) ? Number(card._cardVo.i) : 0;
                    if (ClubRecallDetailModel.isPHZWanfa(wanfa)){
                        _id = (card._cardVo && Number(card._cardVo.v)) ? Number(card._cardVo.v) : 0;
                        if (Number(card._cardVo.v) == 0 && Number(card._cardVo.n) == 11){
                            _id = 201;
                        }
                    }
                    if (_id == Number(_sydata[0])){
                        paiNumLabel.setString(_sydata[1] + "张")
                        break;
                    }
                }
            }
        }
    },

    showAllCard:function(data){
           this.Panel_shazhu.removeAllChildren();
            var wanfa = (BaseRoomModel.curRoomData && BaseRoomModel.curRoomData.wanfa) ? BaseRoomModel.curRoomData.wanfa : 0;
            var closePath = "res/ui/dtz/dtzCom/pop_btn_close.png"
            var closeBtn1 = new ccui.Button(closePath,"","");
            closeBtn1.temp = 2;
            closeBtn1.setPosition(this.Panel_shazhu.width - 20,this.Panel_shazhu.height - 20);
            UITools.addClickEvent(closeBtn1,this,this.closeShaZhu);
            this.Panel_shazhu.addChild(closeBtn1);

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
//            cc.log("showAllCard=-==",data)

            var _data = data.split("*");
            this.Panel_shazhu.visible = _data.length > 0 ? true : false;
            this._curCards = [];
            this._curCardData = [];
           if (ClubRecallDetailModel.isPDKWanfa(wanfa)){
                for (var i = 0; i < _data.length - 1; i++) {
                        var _curData = _data[i].split("|");
                        var _curCard = _curData[1].split(",");
                        this._curCards[i] = [];
                        this._curCardData[i] = [];
                        //排序
                        for(var j = 0; j < _curCard.length ; j ++) {
                            var _cardData = AI.getCardDef(parseInt(_curCard[j]));
                            this._curCardData[i].push(_cardData);
                        }
                        this._curCardData[i].sort(s1);
                        //显示牌
                        for(var k = 0; k < this._curCardData[i].length ; k ++) {
                            var card = new PDKBigCard(this._curCardData[i][k],2);
                            card.setScale(0.4);
                            card.anchorX = card.anchorY = 0;
                            card.x = 150 + 40 *  k;
                            card.y = i * 130 + 50;
                            card.varNode.visible = true;
                            this.Panel_shazhu.addChild(card,100);
                            card.temp = _curData[0];
                            card.setTouchEnabled(true);
                            UITools.addClickEvent(card,this,this.sendShaZhu);
                            this._curCards[i].push(card);
                        }
                }
           }else if (ClubRecallDetailModel.isDTZWanfa(wanfa)){
                for (var i = 0; i < _data.length - 1; i++) {
                        var _curData = _data[i].split("|");
                        var _curCard = _curData[1].split(",");
                        this._curCards[i] = [];
                        this._curCardData[i] = [];
                        //排序
                        for(var j = 0; j < _curCard.length ; j ++) {
                            var _cardData = DTZAI.getCardDef(parseInt(_curCard[j]));
                            this._curCardData[i].push(_cardData);
                        }
                        this._curCardData[i].sort(s1);
                        //显示牌
                        for(var k = 0; k < this._curCardData[i].length ; k ++) {
                            var card = new DTZBigCard(this._curCardData[i][k]);
                            card.setScale(1);
                            card.anchorX = card.anchorY = 0;
                            card.x = 65 + 30 *  Math.floor(k%25);
                            card.y = i * 210 + 80 - Math.floor(k/25) * 65;
//                            card.varNode.visible = true;
                            this.Panel_shazhu.addChild(card,100);
                            card.temp = _curData[0];
                            card.setTouchEnabled(true);
                            UITools.addClickEvent(card,this,this.sendShaZhu);
                            this._curCards[i].push(card);
                        }
                        //检测筒子
                       DTZExfunc.signTongzi(this._curCards[i]);
                       if(DTZRoomModel.is3FuPai()){
                           //检测地炸
                           DTZExfunc.signSuperBoom(this._curCards[i]);
                       }else if(DTZRoomModel.is4FuPai()){
                           //检测囍
                           DTZExfunc.signXi(this._curCards[i]);
                       }
//                       //新增排序 保护筒子地炸囍不被拆散 并且保护第一行的结尾不会拆开连续的牌
//                       DTZExfunc.fixSort(this , false);
                }
           }


        },

    sendShaZhu:function(obj){
        var wanfa = (BaseRoomModel.curRoomData && BaseRoomModel.curRoomData.wanfa) ? BaseRoomModel.curRoomData.wanfa : 0;
        var _id = obj._cardVo ? Number(obj._cardVo.i) : 0;

        if (ClubRecallDetailModel.isPHZWanfa(wanfa)){
            _id = obj._cardVo ? Number(obj._cardVo.v) : 0;
            if (Number(obj._cardVo.v) == 0 && Number(obj._cardVo.n) == 11){
                _id = 201;
            }
        }else if (ClubRecallDetailModel.isPDKWanfa(wanfa) || ClubRecallDetailModel.isDTZWanfa(wanfa)){
               _id = obj.temp ? Number(obj.temp) : 1;
              for(var i = 0; i < this._curCards.length ; i ++) {
                  for(var j = 0; j < this._curCards[i].length ; j ++) {
                        var _card = this._curCards[i][j];
                        if (_id == i){
                            _card.disableAction();
                        }else{
                            _card.enableAction();
                        }
                  }
              }
        }
        cc.log("sendShaZhu=======",_id);
        if (_id){
            sySocket.sendComReqMsg(6008,[_id]);
        }
        if (this.Panel_shazhu){
            this.Panel_shazhu.visible = false;
        }
    },


    closeShaZhu:function(obj){
        cc.log("obj===",obj.temp);
        if (this.Panel_shazhu){
            var temp = obj.temp;
            this.Panel_shazhu.visible = false;
            if (temp == 1)
                sySocket.sendComReqMsg(1111,[7,1]);
            // } else{
            //     this.Panel_shazhu.visible = false;
            // }
        }
    },


    hideShaZhu:function(){
        if (this.Panel_shazhu){
            this.Panel_shazhu.visible = false;
        }
    },

    shaZhuShow:function(event){
        var msg = event.getUserData();
        var isShow = (msg && msg.params[0] == 1) ? true : false;
        var isData = (msg && msg.params[1] == 1) ? true : false;
        cc.log("shaZhuShow===",isShow)
        if (this.openBtn){
          this.openBtn.setTouchEnabled(isShow);
        }
        if (isShow && isData){
            cc.log("请求牌数据===",isShow,isData)
            sySocket.sendComReqMsg(6009);
        }
    },

    shaZhuData:function(event){
        var wanfa = (BaseRoomModel.curRoomData && BaseRoomModel.curRoomData.wanfa) ? BaseRoomModel.curRoomData.wanfa : 0;
        var msg = event.getUserData();
        var data = (msg &&  msg.strParams) ? msg.strParams[0] : null;
         cc.log("data===",JSON.stringify(data))
        if (data){
            if (ClubRecallDetailModel.isPDKWanfa(wanfa) || ClubRecallDetailModel.isDTZWanfa(wanfa)){
                this.showAllCard(data);
            }else{
                this.showAllMj(data);
            }

        }

    },

    shaZhuGet:function(event){
        var wanfa = (BaseRoomModel.curRoomData && BaseRoomModel.curRoomData.wanfa) ? BaseRoomModel.curRoomData.wanfa : 0;
        var players = (BaseRoomModel.curRoomData && BaseRoomModel.curRoomData.players) ? BaseRoomModel.curRoomData.players : null;
        var isContinue = false;
        for(var i=0;i<players.length;i++){
            var p = players[i];
            if(!isContinue){
                isContinue = (p.handCardIds.length>0 || p.outedIds.length>0 || p.moldCards.length>0);
            }
        }

        cc.log("请求了shaZhuGet")

        if (isContinue || ((ClubRecallDetailModel.isPDKWanfa(wanfa) || ClubRecallDetailModel.isDTZWanfa(wanfa)) && !isContinue)){
            sySocket.sendComReqMsg(1111,[7,0]);
        }
    }
});