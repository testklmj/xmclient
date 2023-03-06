/**
 * Created by zhoufan on 2016/11/21.
 */

var CutCardPop = BasePopup.extend({

    cards:[],
    cardNumber:0,

    ctor:function(isView){
        this.cards = [];
        this.cardNumber = 0;
        this.isView = isView || false;
        this.isTouchMoved = false;
        this._super("res/cutCardPop.json");
    },

    selfRender:function(){
        this.jiantou = this.getWidget("jiantou");
        this.Panel_8 = this.getWidget("Panel_8");
        this.Image_11 = this.getWidget("Image_11");
        this.btnqp = this.getWidget("btnqp");
        if(this.isView){
            this.btnqp.visible = false;
            this.Image_11.loadTexture("res/ui/images/img_qiepai_2.png");
            this.jiantou.visible = false;
        }else{
            this.jiantou.addTouchEventListener(this.onJianTouMove,this);
            UITools.addClickEvent(this.btnqp,this,this.onQiePai);
        }
        var max = PDKRoomModel.wanfa==15 ? 45 : 48;
        var gap = PDKRoomModel.wanfa==15 ? 21 : 20;
        for(var i=0;i<max;i++){
            var texture = (i<27) ? "res/ui/images/cut_card_4.png" : "res/ui/images/cut_card_3.png";
            var card = new cc.Sprite(texture);
            card.anchorX=card.anchorY=0;
            card.x = i*gap;
            this.Panel_8.addChild(card);
            this.cards.push(card);
        }
        if(this.isView)
            this.addCustomEvent(SyEvent.PDK_QIE_PAI,this,this.onProg);
        this.calcTime = 10;
        this.isSend = false;
        this.schedule(this.onSecond,1);
    },

    onSecond:function(){
        this.calcTime-=1;
        if(this.calcTime>=0)
            this.btnqp.setTitleText("切牌["+this.calcTime+"]");
        if(this.calcTime<=0 && !this.isSend){
            this.onQiePai();
        }
    },

    onProg:function(event){
        var data = event.getUserData();
        var maxX = 0;
        for(var i=0;i<this.cards.length;i++){
            var card = this.cards[i];
            if(i<data){
                card.setTexture("res/ui/images/cut_card_4.png");
                if(card.x>maxX)
                    maxX=card.x;
            }else{
                card.setTexture("res/ui/images/cut_card_3.png")
            }
        }
        var max =  102+maxX+20;
        max = max<110 ? 110 : max;
        max = max>1172 ? 1172 : max;
        this.jiantou.x = max;
    },

    onQiePai:function(){
        sySocket.sendComReqMsg(4);//发送切牌完毕
        this.isSend = true;
        this.unschedule(this.onSecond);
        PopupManager.remove(this);
    },

    onJianTouMove:function(obj,type){
        if(type == ccui.Widget.TOUCH_BEGAN){
            this.isTouchMoved = false;
        }else if(type == ccui.Widget.TOUCH_MOVED){
            var touchPoint = this.jiantou.getTouchMovePosition();
            var targetX = touchPoint.x;
            targetX = targetX<110 ? 110 : targetX;
            targetX = targetX>1172 ? 1172 : targetX;
            this.jiantou.x = targetX;
            this.cardNumber=0;
            for(var i=0;i<this.cards.length;i++){
                var card = this.cards[i];
                if((card.x+102)<targetX && targetX!=110){
                    this.cardNumber+=1;
                    card.setTexture("res/ui/images/cut_card_4.png")
                }else{
                    card.setTexture("res/ui/images/cut_card_3.png")
                }
            }
            this.isTouchMoved = true;
        }else if(type == ccui.Widget.TOUCH_ENDED || type == ccui.Widget.TOUCH_CANCELED){
            if(this.isTouchMoved){
                sySocket.sendComReqMsg(23,[this.cardNumber]);
                this.cardNumber = 0;
            }
        }
    }

})
