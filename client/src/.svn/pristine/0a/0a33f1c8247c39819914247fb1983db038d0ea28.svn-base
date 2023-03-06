/**
 * Created by zhoufan on 2016/11/29.
 */
var PHZSmallResultCell = ccui.Widget.extend({
    ctor:function(data){
        this._super();
        var action = data.action;
        var cards = data.cards;
        var huxi = data.huxi;
        this.anchorX=0;
        this.anchorY=0;
        this.setContentSize(32,260);
        if(action!=0){
            if(action==10)
                action=3;
            var header = new cc.Sprite("res/ui/phz/act"+action+".png");
            header.x = 21;
            header.y = 240;
            this.addChild(header);
        }
		var zorder = cards.length;
        for(var i=0;i<cards.length;i++){
			zorder--;
            var vo = PHZAI.getPHZDef(cards[i]);
            if(action==4 && i>0)
                vo.a = 1;
            if(action==3 && i>0)
                vo.a = 1;
			var ishu = false;
			if(cards[i]==ClosingInfoModel.huCard){
				ishu = true;
			}
			vo.ishu = ishu;
            var card = new PHZCard(PHZAI.getDisplayVo(this.direct,3),vo);
            card.x = 6;
            card.y = 40 + i * 39;
            this.addChild(card,zorder);

        }
        var label = UICtor.cLabel(huxi+"",24,cc.size(32,30),cc.color(128,51,6),1,1);//cc.color(129,49,0) ColorUtil.WHITE
        label.x = 21;
        label.y = 15;
        this.addChild(label);
    }
});

var PHZSmallResultPop=BasePopup.extend({
	pointInfo:null,
	isRePlay:null,
    ctor: function (data,isRePlay) {
        this.data = data;
        this.isRePlay = isRePlay;
        this._super("res/phzSmallResult.json");
    },

    selfRender: function () {
        var isHuang = false;
		this.winUserId = 0;
		this.data.sort(function (user1 , user2){
			var point1 = parseInt(user1.point);
			var point2 = parseInt(user2.point);
			return  point1 < point2;
		});
		var myPoint = 0;
		for(var i=0;i<this.data.length;i++){
			if(this.data[i].seat == PHZRoomModel.mySeat){
				myPoint = this.data[i].point;
			}
		}
		var Image_84 = this.getWidget("Image_84");
		var imgUrl = myPoint > 0 ? "res/ui/phz/phzSmallResult/image_win.png" : "res/ui/phz/phzSmallResult/image_lose.png";
		Image_84.loadTexture(imgUrl);

        if(ClosingInfoModel.ext[3] == PHZGameTypeModel.SYBP){
        	if(ClosingInfoModel.huSeat){
        	}else{
        		isHuang = true;
        	}
        }else{
	        for(var i=0;i<this.data.length;i++){
	            if(this.data[i].point>0){
	                break;
	            }else if(this.data[i].point==0){
	                isHuang = true;
	                break;
	            }
	        }
        }
		this.getWidget("Image_HZ").visible = isHuang;

        if(this.data.length==3){
        	this.getWidget("user4").visible = false;
        }else if(this.data.length==2){
			this.getWidget("user4").visible = false;
			this.getWidget("user3").visible = false;
		}
        for(var i=0;i<this.data.length;i++){
        	if(this.isSpecialPHZ()){
        		this.refreshSingle(this.getWidget("user"+(i+1)),this.data[i],this.pointInfo[i] , i);
        	}else {
        		this.refreshSingle(this.getWidget("user"+(i+1)),this.data[i] , "" , i);
        	}
        }
        this.list = this.getWidget("ListView_6");
        var cards = ClosingInfoModel.cards;
        for(var i=0;i<cards.length;i++){
            var cell = new PHZSmallResultCell(cards[i]);
            this.list.pushBackCustomItem(cell);
        }
		var offX = 39;
		var Image_1 = this.getWidget("resultView");
		var leftCards = ClosingInfoModel.leftCards;
		var allLeftCards = ClosingInfoModel.startLeftCards;
		var dipaiHeight = 570;

		cc.log("allLeftCards===leftCards==",JSON.stringify(allLeftCards),JSON.stringify(leftCards))

		var dipaiPanel = this.getWidget("Panel_dipai");

		var cpNum = 0;
		if (ClosingInfoModel.ext[14]){
			cpNum = parseInt(ClosingInfoModel.ext[14]);
		}

		var indexY = 20;
        for(var i=0;i<allLeftCards.length;i++){ //leftCards
			if (i >= cpNum){
				var index = i - cpNum;
				var card = new PHZCard(PHZAI.getDisplayVo(this.direct,3),PHZAI.getPHZDef(allLeftCards[i]));
				if(ArrayUtil.indexOf(leftCards , allLeftCards[i]) >= 0){
				}else{
					card.graySmallCard();
				}
				var diffY = card.getContentSize().height *0.5;
				var numY = Math.floor(index/indexY);
				var numX = index%indexY;
				card.x = 68 + numX * offX;
				card.y = card.y - diffY * numY;
				dipaiPanel.addChild(card);
			}
        }
        if(ClosingInfoModel.huxi>0){
            var huxi = this.getWidget("huxi");
			huxi.setString("胡息:"+ClosingInfoModel.huxi);
        }else{
            this.getWidget("huxi").visible = false;
        }

		/*天胡 +10,地胡 +10,自摸 +10,
		胡牌时只有一张红字，一点朱  翻倍,
		胡牌时有10-12张红字，小红胡  翻倍,
		胡牌时有13张红字或以上,大红胡 +60,
		胡牌时全是黑字，乌胡 +60*/
		//ClosingInfoModel.fanTypes = [1,2,3,4,5,6,7];
		var mingtangList = ["  天胡     +10","  地胡     +10","  自摸     +10",
			"一点朱     x2","小红胡     x2","大红胡     +60","  乌胡     +60"];
		var str = "";
		var tunStr = ""
		if (PHZRoomModel.wanfa == PHZGameTypeModel.SYZP){
			mingtangList = ["  天胡     +10","  地胡     +10","  自摸     +10",
				"一点朱     x2","小红胡     x2","  红胡     x2","  黑胡     x2"];
			if (ClosingInfoModel.tun){
				tunStr = "\n"+"囤数:" + ClosingInfoModel.tun
			}
		}

		if (PHZRoomModel.wanfa == PHZGameTypeModel.LDFPF){
			mingtangList = ["  天胡     +100","  地胡     +100","  自摸     x2",
				"一点朱     x2"," 十红     x2","  十三红     +100","  乌胡     +100",
				"一块扁     x2","海底捞     x2","  20卡     x2","  30卡     +100","  飘胡     +30"
			];
		}
		if (ClosingInfoModel.fanTypes){
			for(var i=0;i<ClosingInfoModel.fanTypes.length;i++) {
				for(var j=0;j<mingtangList.length;j++) {
					if (ClosingInfoModel.fanTypes[i] == j + 1){
						str = str + mingtangList[j] + "\n"
					}
				}
			}
		}

		str = str + tunStr;

		var zimo = this.getWidget("zimo"); //自摸文本
		zimo.setString("" + str);

		this.resultView = this.getWidget("resultView");
		this.roomView = this.getWidget("roomView");

        var renshu = ClosingInfoModel.ext[7];
        this.Button_2 = this.getWidget("Button_2");
        this.Button_Ready = this.getWidget("btnReady");
        UITools.addClickEvent(this.Button_2,this,this.onOk);
        UITools.addClickEvent(this.Button_Ready,this,this.onOk);
        this.Button_zm = this.getWidget("Button_15");
        this.Button_toResultView = this.getWidget("btnToResultView");
        UITools.addClickEvent(this.Button_zm,this,this.onZhuoMian);
        UITools.addClickEvent(this.Button_toResultView , this, this.onJieSuan);
        this.onJieSuan();
		var btn_jiesan = this.getWidget("btn_jiesan");
		var btn_share = this.getWidget("btn_share");
		btn_share.visible = false;
		UITools.addClickEvent(btn_share,this,this.onShare);
		UITools.addClickEvent(btn_jiesan,this,this.onBreak);

		var btn_handXq = this.getWidget("btn_handXq");
		UITools.addClickEvent(btn_handXq,this,this.onHandCard);

		var Image_40 = this.getWidget("Image_40"); //自摸图片
		Image_40.visible = false;

	},
    
    isSpecialPHZ:function(){
    	return (ClosingInfoModel.ext[3] == 38 && ClosingInfoModel.ext[7] == 4)
    },

    refreshSingle:function(widget,user,pointInfo , index){
		cc.log("index..." , index);
		//user.icon = "http://wx.qlogo.cn/mmopen/25FRchib0VdkrX8DkibFVoO7jAQhMc9pbroy4P2iaROShWibjMFERmpzAKQFeEKCTdYKOQkV8kvqEW09mwaicohwiaxOKUGp3sKjc8/0";

    	if(user.isShuXing){
    		if(user.seat == user.isShuXing){
    			ccui.helper.seekWidgetByName(widget,"sx").visible = true;
    		}else{
    			ccui.helper.seekWidgetByName(widget,"sx").visible = false;
    		}
    	}else{
    		ccui.helper.seekWidgetByName(widget,"sx").visible = false;
    	}

        ccui.helper.seekWidgetByName(widget,"name").setString(user.name);
		ccui.helper.seekWidgetByName(widget, "uid").setString("UID:" + user.userId);
        var defaultimg = (user.sex == 1) ? "res/ui/dtz/images/default_m.png" : "res/ui/dtz/images/default_w.png";
        var sprite = new cc.Sprite(defaultimg);
        sprite.scale=0.95;
        sprite.x = 40;
        sprite.y = 40;
        widget.addChild(sprite,5,345);
        if(user.icon){
            cc.loader.loadImg(user.icon, {width: 75, height: 75}, function (error, img) {
                if (!error) {
                    sprite.setTexture(img);
                }
            });
        }

        var point = ccui.helper.seekWidgetByName(widget,"point");

		var pointStr = "";
		var totalPointStr = "";
		if (parseInt(user.point) > 0 ){
			pointStr = "+" + user.point;
		}else{
			pointStr = "" + user.point;
		}
		var label = new cc.LabelTTF(pointStr, "Arial", 24);
		label.setColor(cc.color(128,21,6));
		label.anchorX = 0;
		label.x = 0;
		label.y = 15;
		point.addChild(label,6);
		if (user.totalPoint != null ){
			if (PHZRoomModel.wanfa == PHZGameTypeModel.LDFPF){
				totalPointStr = "" + user.allHuxi;
			}else{
				totalPointStr = "" + user.totalPoint;
			}
			var totalPoint = ccui.helper.seekWidgetByName(widget,"totalPoint");
			var label1 = new cc.LabelTTF("累计:" + totalPointStr, "Arial", 24);
			label1.setColor(cc.color(128,21,6));
			label1.anchorX = 0;
			label1.x = 0;
			label1.y = 15;
			totalPoint.addChild(label1,6);
		}

        //增加房主的显示
		if(user.userId == ClosingInfoModel.ext[1]){
			var fangzhu = new cc.Sprite("res/ui/phz/fangzhu.png");
			fangzhu.anchorX = fangzhu.anchorY = 0;
			fangzhu.x = 32;
			fangzhu.y = 30;
			widget.addChild(fangzhu,10);
		}
		if (index == 0){
			var nowPoint = this.getWidget("nowPoint")
			nowPoint.setString("共计:"+user.point);
		}

    },

    onOk:function(){
        if(ClosingInfoModel.isReplay || !LayerManager.isInRoom()){
            PopupManager.remove(this);
            return;
        }
        var data = this.data;
        if(ClosingInfoModel.ext[3] == PHZGameTypeModel.SYZP || ClosingInfoModel.ext[3] == 36 || ClosingInfoModel.ext[3] == 38){
        	if(PHZRoomModel.nowBurCount == PHZRoomModel.totalBurCount){//最后的结算
        		PopupManager.remove(this);
        		var mc = new PHZBigResultPop(data);
        		PopupManager.addPopup(mc);
        		var obj = HongBaoModel.getOneMsg();
        		if(obj){
        			var mc = new HongBaoPop(obj.type,obj.data);
        			PopupManager.addPopup(mc);
        		}
        	}else{
				if (PHZRoomModel.isStart){
					PHZRoomModel.cleanSPanel();
					PopupManager.remove(this);
					sySocket.sendComReqMsg(3);
				}else{
					sySocket.sendComReqMsg(3);
				}
        	}
        }else{
        	if(ClosingInfoModel.ext[6] == 1){//最后的结算
        		PopupManager.remove(this);
        		var mc = new PHZBigResultPop(data);
        		PopupManager.addPopup(mc);
        		var obj = HongBaoModel.getOneMsg();
        		if(obj){
        			var mc = new HongBaoPop(obj.type,obj.data);
        			PopupManager.addPopup(mc);
        		}
        	}else{
				if (PHZRoomModel.isStart){
					PHZRoomModel.cleanSPanel();
					PopupManager.remove(this);
					sySocket.sendComReqMsg(3);
				}else{
					sySocket.sendComReqMsg(3);
				}
        	}
        }
    },

	onBreak:function(){
		AlertPop.show("解散房间需所有玩家同意，确定要申请解散吗？",function(){
			sySocket.sendComReqMsg(7);
		},null,2)
	},

	onShare:function(){

	},
    
    onHandCard:function(){
		cc.log("onHandCard ClosingInfoModel.huSeat..." , ClosingInfoModel.huSeat);
    	var mc = new PHZHandCardPop(this.data,ClosingInfoModel.ext[1] , this.winUserId);
    	PopupManager.open(mc,true);
    },
    
    onJieSuan:function(){
		this.resultView.visible = true;
		this.roomView.visible = false;
    },
    
    onZhuoMian:function(){
		this.resultView.visible = false;
		this.roomView.visible = true;

    }
});
