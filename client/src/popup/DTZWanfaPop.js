var DNWanfaCell = ccui.Widget.extend({

	ctor:function(label){
		this._super();
		var text = UICtor.cLabel(label, 26, cc.size(740,0), cc.color("#3c7e5a"), 0, 0);
		text.anchorX=text.anchorY=0;
		this.addChild(text);
		this.setContentSize(text.width,text.height);
	}
})

var DTZWanfaPop = BasePopup.extend({

	ctor:function(wanfa){
		this.wanfa = wanfa || 113;
		this._super("res/wanfaTotalPop.json");
	},


	selfRender:function(){

		this.Panel_game1 = this.getWidget("Panel_game1");
		this.Panel_game2 = this.getWidget("Panel_game2");
		this.Panel_game3 = this.getWidget("Panel_game3");
        this.ListView_wf = this.getWidget("ListView_wf");

//		for(var i= 1; i <= 7; i++){
//			this["ListView_wf"+i] = this.getWidget("ListView_wf"+i);
//			this["ListView_wf"+i].isHasText = false;
//		}


		var wanfaWidgets = {"wanfaBtn1":1,"wanfaBtn2":2,"wanfaBtn3":3,"wanfaBtn4":4,"wanfaBtn5":5,"wanfaBtn6":6,"wanfaBtn7":7,"wanfaBtn8":8};
		//将控件初始化
		for(var key in wanfaWidgets){
			var widget = this[key] = this.getWidget(key);
			widget.temp = parseInt(wanfaWidgets[key]);
			UITools.addClickEvent(widget,this,this.onWanFaClick);
		}

		var mapping =  this.mapping = {"gameBtn1":1,"gameBtn2":2,"gameBtn3":3};
		//将控件初始化
		for(var key in mapping){
			var widget = this[key] = this.getWidget(key);
			widget.temp = parseInt(mapping[key]);
			UITools.addClickEvent(widget,this,this.onUIClick);
		}

		var idex = this.getWanfaIdex();
		this.gameIdex = this.getGameIdex();
		this.showBtn(this.gameIdex,idex);

	},

	isPDK:function(){
		return ArrayUtil.indexOf([15,16] , this.wanfa) >= 0;
	},

	isBBT:function(){
		return (this.wanfa == 131);
	},

	isHZMJ:function(){
		return (this.wanfa == MJWanfaType.HZMJ);
	},

	isPHZ:function(){
		return ArrayUtil.indexOf([PHZGameTypeModel.SYZP , PHZGameTypeModel.SYBP , PHZGameTypeModel.LDFPF] , this.wanfa) >= 0;
	},

	//换皮后启用
	isDTZ:function(){
		return ArrayUtil.indexOf([113 , 114 , 115 , 116 , 117 , 118, 210 , 211,212] , this.wanfa) >= 0;
	},

	getWanfaIdex:function(){
		var idex = 1;
		if (this.isDTZ()){
			idex = 1;
		} else if (this.isPHZ()){
			idex = 4;
			if (this.wanfa == PHZGameTypeModel.SYZP){
				idex = 5;
			}
		} else if (this.isPDK()){
			idex = 2;
		}else if (this.isBBT()) {
			idex = 3;
		}else if (this.isHZMJ()) {
			idex = 6;
		}
		return idex;
	},

	getGameIdex:function(){
		var idex = 1;
		if (this.isDTZ()){
			idex = 1;
		} else if (this.isPHZ()){
			idex = 2;
			if (this.wanfa == PHZGameTypeModel.SYZP){
				idex = 2;
			}
		} else if (this.isPDK()){
			idex = 1;
		}else if (this.isBBT()) {
			idex = 1;
		}else if (this.isHZMJ()) {
			idex = 3;
		}
		return idex;
	},

	showBtn:function(temp,wanfaTemp){
		for(var i = 1; i <= 3; i++){
			var btn = this.getWidget("gameBtn"+i);
			if( i == temp){
				btn.setBright(false);
				btn.setLocalZOrder(20);
				this["Panel_game"+i].visible = true;
			}else{
				btn.setBright(true);
				btn.setLocalZOrder(10);
				this["Panel_game"+i].visible = false;
			}
		}
		this.showWanFaPanel(wanfaTemp);
	},

	onUIClick:function(obj){
		var temp = parseInt(obj.temp) || 1;
		var temps = [1,4,6];
		this.showBtn(temp,temps[temp-1]);
	},

	onWanFaClick:function(obj){
		var temp = parseInt(obj.temp) || 1;
		this.showWanFaPanel(temp);
	},

	initWanFaText:function(temp){
	    this.ListView_wf.removeAllItems();
		if  (temp == 1){
			this.initDtzText();
		}else if  (temp == 2){
			this.initPdkText();
		}else if  (temp == 3){
			this.initBbtText();
		}else if  (temp == 4){
			this.initPhzText();
		}else if  (temp == 5){
			this.initMjText();
		}else if  (temp == 6){
			this.initMjSYText();
		}else if  (temp == 7){
			this.initPhzLDText();
		}
	},

	initDtzText:function(){

		var ListView_8 = this.getWidget("ListView_wf");
		ListView_8.pushBackCustomItem(new DNWanfaCell(" "));
		ListView_8.pushBackCustomItem(new DNWanfaCell("四人模式"));
		ListView_8.pushBackCustomItem(new DNWanfaCell(" "));
		ListView_8.pushBackCustomItem(new DNWanfaCell("三副牌"));
		ListView_8.pushBackCustomItem(new DNWanfaCell("1、3和4还有大小王不要，共计132张牌"));
		ListView_8.pushBackCustomItem(new DNWanfaCell("2、4个人玩，两两一方，先打满1000分的为胜家，若分数超过1000分，分数叠加上去。"));
		ListView_8.pushBackCustomItem(new DNWanfaCell("3、玩家座位，按照先后进入游戏的顺序，顺时针排座。对家即为同一方。"));
		ListView_8.pushBackCustomItem(new DNWanfaCell("4、出牌顺序，第一盘有系统自动匹配出牌顺序，第二句局由上一局的第一名开始先出牌。"));
		ListView_8.pushBackCustomItem(new DNWanfaCell("5、牌型"));
		ListView_8.pushBackCustomItem(new DNWanfaCell("单牌：单牌以2为最大，单牌不能做顺子"));
		ListView_8.pushBackCustomItem(new DNWanfaCell("炸弹：4个或者4个以上同数字的牌为炸弹，讲究多打少的原则，5个打4个，6个打5个，以此类推。"));
		ListView_8.pushBackCustomItem(new DNWanfaCell("筒子：3个同花色的数字为筒子，筒子压炸弹，筒子也分黑桃，红桃，梅花，方块，"));
		ListView_8.pushBackCustomItem(new DNWanfaCell("同数字的筒子黑桃最大，方块最小。"));
		ListView_8.pushBackCustomItem(new DNWanfaCell("地炸：牌面最大的为地炸：同样花色的牌各两张为地炸，地炸里面以2地炸为最大。"));
		ListView_8.pushBackCustomItem(new DNWanfaCell("其他：两连对以上可以出（包括两连对）。三张牌可以带两张出（只能少带，不能多"));
		ListView_8.pushBackCustomItem(new DNWanfaCell("带）可以飞机。PS：2不能做连对或者飞机。"));
		ListView_8.pushBackCustomItem(new DNWanfaCell("6、计分。数字5为5分，10和K均为10分，其他牌不算分。"));
		ListView_8.pushBackCustomItem(new DNWanfaCell("7、奖励原则：K筒子为100分，A筒子为200分，2筒子为300分，地炸奖励400分。若A方被B方击败，B方获得奖励分。"));
		ListView_8.pushBackCustomItem(new DNWanfaCell("8、罚分原则：某一方被关一家扣60分，若两关两家扣120.赢的一方加上相应的分数。如果当局分数不够扣，就在游戏总分上面扣，若是没分扣的话，就挂负分。"));
		ListView_8.pushBackCustomItem(new DNWanfaCell("比如："));
		ListView_8.pushBackCustomItem(new DNWanfaCell("1、A方两个玩家是第1、4名出完牌的，双方持平，B方不用扣分"));
		ListView_8.pushBackCustomItem(new DNWanfaCell("2、A方两个玩家是第1、3名出完的，关B方一家，B方扣60分"));
		ListView_8.pushBackCustomItem(new DNWanfaCell("3、A方两个玩家是第1、2名出完的，B方两家都被关，B方扣120分"));
		ListView_8.pushBackCustomItem(new DNWanfaCell("9、计分规则："));
		ListView_8.pushBackCustomItem(new DNWanfaCell("K筒子100分、A筒子200分、2筒子300分、地炸400分（四对不同颜色的牌，例"));
		ListView_8.pushBackCustomItem(new DNWanfaCell("如黑红梅方8各一对）、当局筒子压死筒子不累积分数。"));
		ListView_8.pushBackCustomItem(new DNWanfaCell(" "));
		ListView_8.pushBackCustomItem(new DNWanfaCell("四副牌"));
		ListView_8.pushBackCustomItem(new DNWanfaCell("1、3和4不要，共计184张牌"));
		ListView_8.pushBackCustomItem(new DNWanfaCell("2、4个人玩，两两一方，先打满1000分的为胜家，若分数超过1000分，分数叠加上去。"));
		ListView_8.pushBackCustomItem(new DNWanfaCell("3、玩家座位，按照先后进入游戏的顺序，顺时针排座。对家即为同一方。"));
		ListView_8.pushBackCustomItem(new DNWanfaCell("4、出牌顺序，第一盘有系统自动匹配出牌顺序，第二句局由上一局的第一名开始先出牌。"));
		ListView_8.pushBackCustomItem(new DNWanfaCell("5、牌型"));
		ListView_8.pushBackCustomItem(new DNWanfaCell("单牌：单牌以大王为最大，单牌不能做顺子"));
		ListView_8.pushBackCustomItem(new DNWanfaCell("炸弹：4个或者4个以上同数字的牌为炸弹，讲究大打小，多打少的原则，5个打4个，"));
		ListView_8.pushBackCustomItem(new DNWanfaCell("6个打5个，以此类推。"));
		ListView_8.pushBackCustomItem(new DNWanfaCell("筒子：3个同花色的数字为筒子，筒子压炸弹。"));
		ListView_8.pushBackCustomItem(new DNWanfaCell("喜：4个同花色同样的数字为喜，喜压炸弹，压筒子。"));
		ListView_8.pushBackCustomItem(new DNWanfaCell("其他：单牌顺子不能出，两连对以上可以出（包括两连对）。三张牌不可以带其他牌"));
		ListView_8.pushBackCustomItem(new DNWanfaCell("出，可以飞机。"));
		ListView_8.pushBackCustomItem(new DNWanfaCell("6、计分。数字5为5分，10和K均为10分，其他牌不算分。"));
		ListView_8.pushBackCustomItem(new DNWanfaCell("7、奖励原则：大小王的喜都是200分，其他牌面的喜为100分。PS：所有的奖励分"));
		ListView_8.pushBackCustomItem(new DNWanfaCell("数必须等到牌局打满1000分之后加上去。"));
		ListView_8.pushBackCustomItem(new DNWanfaCell("8、罚分原则：某一方被关一家扣80分，若两关两家扣160。赢的一方加上相应的分数。如果当局分数不够扣，就在游戏总分上面扣，若是没分扣的话，就挂负分。"));
		ListView_8.pushBackCustomItem(new DNWanfaCell("比如："));
		ListView_8.pushBackCustomItem(new DNWanfaCell("1、A方两个玩家是第1、4名出完牌的，双方持平，B方不用扣分"));
		ListView_8.pushBackCustomItem(new DNWanfaCell("2、A方两个玩家是第1、3名出完的，关B方一家，B方扣80分"));
		ListView_8.pushBackCustomItem(new DNWanfaCell("3、A方两个玩家是第1、2名出完的，B方两家都被关，B方扣160分"));
		ListView_8.pushBackCustomItem(new DNWanfaCell(" "));
		ListView_8.pushBackCustomItem(new DNWanfaCell("9、计分规则："));
		ListView_8.pushBackCustomItem(new DNWanfaCell("5-2喜100分、小王大王喜200分、当局喜压死对手累积分数。"));
		//ListView_8.pushBackCustomItem(new DNWanfaCell("牌面分相同情况下，最终奖励分奖励给喜，地炸或者筒子分高的玩家。如喜分地炸分或者筒子分相同的情况下，都不奖励。"));
		ListView_8.pushBackCustomItem(new DNWanfaCell(" "));
		ListView_8.pushBackCustomItem(new DNWanfaCell("快乐四喜"));
		ListView_8.pushBackCustomItem(new DNWanfaCell("1、3和4还有大小王不要，共计176张牌"));
		ListView_8.pushBackCustomItem(new DNWanfaCell("2、4个人玩，两两一方，先打满1000分的为胜家，若分数超过1000分，分数叠加上去；"));
		ListView_8.pushBackCustomItem(new DNWanfaCell("3、玩家座位，进去后玩家可自行选择AB两方的任意座位，对家即为同一方；"));
		ListView_8.pushBackCustomItem(new DNWanfaCell("4、出牌顺序，第一盘由系统自动匹配出牌顺序，第二局由上一局的第一名开始先出牌；"));
		ListView_8.pushBackCustomItem(new DNWanfaCell("5、牌型"));
		ListView_8.pushBackCustomItem(new DNWanfaCell("单牌：单牌以2为最大，单牌不能做顺子；"));
		ListView_8.pushBackCustomItem(new DNWanfaCell("炸弹：4个或4个以上同数字的牌为炸弹，讲究多打少的原则，5个打4个，6个打5个以此类推"));
		ListView_8.pushBackCustomItem(new DNWanfaCell("筒子：3个同花色的数字为筒子，筒子压炸弹，筒子也分黑桃，红桃，梅花，方块，同数字的筒子黑桃最大，方块最小；"));
		ListView_8.pushBackCustomItem(new DNWanfaCell("喜：4个同花色的数字为喜，喜压炸弹，压筒子，喜也分黑桃，红桃，梅花，方块，同数字的喜黑桃最大，方块最小"));
		ListView_8.pushBackCustomItem(new DNWanfaCell("6、积分：数字5为5分，10和K均为10分，其他牌不算分；"));
		ListView_8.pushBackCustomItem(new DNWanfaCell("7、奖励原则：K筒子100分，A筒子200分，2筒子300分，5-Q喜400分，K喜500，A喜600分,2喜700分；若A方被B方击败，B方获得最后一个出的奖励分；"));
		ListView_8.pushBackCustomItem(new DNWanfaCell("8、罚分原则：某一方被关一家扣60分，若双关两家扣120分，赢的一方加上相应的分数。如果当局分数不够扣，就挂负分；"));
		ListView_8.pushBackCustomItem(new DNWanfaCell("比如"));
		ListView_8.pushBackCustomItem(new DNWanfaCell("1、A方两个玩家是第1、4名出完牌的，双方持平，B方不用扣分"));
		ListView_8.pushBackCustomItem(new DNWanfaCell("2、A方两个玩家是第1、3名出完的，关B方一家，B房扣60分"));
		ListView_8.pushBackCustomItem(new DNWanfaCell("3、A方两个玩家是第1、2名出完的，B方两家都被关，B房扣120分"));
		ListView_8.pushBackCustomItem(new DNWanfaCell("9计分规则"));
		ListView_8.pushBackCustomItem(new DNWanfaCell("K筒子100分，A筒子200分，2筒子300分，5-Q喜400分，K喜500，A喜600分,2喜700分，当局筒子压死筒子，喜压筒子，喜压喜不累积分数；"));
		ListView_8.pushBackCustomItem(new DNWanfaCell(" "));

		ListView_8.pushBackCustomItem(new DNWanfaCell("三人模式"));
		ListView_8.pushBackCustomItem(new DNWanfaCell(" "));
		ListView_8.pushBackCustomItem(new DNWanfaCell("三副牌"));
		ListView_8.pushBackCustomItem(new DNWanfaCell("1、3和4还有大小王不要，共计132张牌。铺掉9张牌，三方每人41张牌。"));
		ListView_8.pushBackCustomItem(new DNWanfaCell("2、各自为队，先打满1000分的为胜家，若分数超过1000分，分数叠加上去。"));
		ListView_8.pushBackCustomItem(new DNWanfaCell("3、牌型逻辑同4人模式，但打的起则必须打。"));
		ListView_8.pushBackCustomItem(new DNWanfaCell("4、出牌顺序，第一小局由庄家先出，后续则由上游先出。"));
		ListView_8.pushBackCustomItem(new DNWanfaCell("5、罚奖规则：一游奖励：100分，二游扣除40分，三游扣除60分"));
		ListView_8.pushBackCustomItem(new DNWanfaCell("若当局分数不够扣，就在游戏总分上扣，若是没分扣的话，就挂负分。"));
		ListView_8.pushBackCustomItem(new DNWanfaCell("其余计分和规则同四人模式"));
		ListView_8.pushBackCustomItem(new DNWanfaCell(" "));
		ListView_8.pushBackCustomItem(new DNWanfaCell("四副牌"));
		ListView_8.pushBackCustomItem(new DNWanfaCell("1、3和4不要，共计184张牌。铺掉52张牌，三方每人44张牌。"));
		ListView_8.pushBackCustomItem(new DNWanfaCell("2、各自为队，先打满1000分的为胜家，若分数超过1000分，分数叠加上去。"));
		ListView_8.pushBackCustomItem(new DNWanfaCell("3、牌型逻辑同4人模式，但打的起则必须打。"));
		ListView_8.pushBackCustomItem(new DNWanfaCell("4、出牌顺序，第一小局由庄家先出，后续则由上游先出。"));
		ListView_8.pushBackCustomItem(new DNWanfaCell("5、罚奖规则：一游奖励：100分，二游扣除40分，三游扣除60分"));
		ListView_8.pushBackCustomItem(new DNWanfaCell("若当局分数不够扣，就在游戏总分上扣，若是没分扣的话，就挂负分。"));
		//ListView_8.pushBackCustomItem(new DNWanfaCell("牌面分相同情况下，最终奖励分奖励给喜，地炸或者筒子分高的玩家。如喜分地炸分或者筒子分相同的情况下，每位玩家奖励一半。"));
		ListView_8.pushBackCustomItem(new DNWanfaCell("其余计分和规则同四人模式"));

		ListView_8.pushBackCustomItem(new DNWanfaCell(" "));
		ListView_8.pushBackCustomItem(new DNWanfaCell("快乐四喜"));
		ListView_8.pushBackCustomItem(new DNWanfaCell("1、3和4还有大小王不要，共计176张牌。铺掉44张牌，三方每人44张牌"));
		ListView_8.pushBackCustomItem(new DNWanfaCell("2、各自为队，先打满1000分的为胜家，若分数超过1000分，分数叠加上去；"));
		ListView_8.pushBackCustomItem(new DNWanfaCell("3、牌型逻辑同4人模式，但打得起则必须打；"));
		ListView_8.pushBackCustomItem(new DNWanfaCell("4、出牌顺序，第一小局可由系统自动匹配出牌顺序，第二局由上一局的第一名开始先出牌，也可以第一局由庄家先出；根据选择随机出头选项来区别；"));
		ListView_8.pushBackCustomItem(new DNWanfaCell("5、罚奖规则：1游奖励：100分，二游扣除40分，三游扣除60分；其余计分和规则同四人模式"));

		ListView_8.pushBackCustomItem(new DNWanfaCell(" "));
		ListView_8.pushBackCustomItem(new DNWanfaCell("二人模式"));
		ListView_8.pushBackCustomItem(new DNWanfaCell(" "));
		ListView_8.pushBackCustomItem(new DNWanfaCell("三副牌"));
		ListView_8.pushBackCustomItem(new DNWanfaCell("1、3和4还有大小王不要，共计132张牌，铺掉66张牌，每人33张牌。"));
		ListView_8.pushBackCustomItem(new DNWanfaCell("2、先打满1000分的为胜家，若分数超过1000分，分数叠加上去。"));
		ListView_8.pushBackCustomItem(new DNWanfaCell("3、牌型逻辑同4人模式。"));
		ListView_8.pushBackCustomItem(new DNWanfaCell("4、出牌顺序，第一小局由庄家先出，后续则由上游先出。"));
		ListView_8.pushBackCustomItem(new DNWanfaCell("5、罚奖规则：下游罚60分"));
		ListView_8.pushBackCustomItem(new DNWanfaCell("若当局分数不够扣，就在游戏总分上扣，若是没分扣的话，就挂负分。"));
		ListView_8.pushBackCustomItem(new DNWanfaCell("其余计分和规则同四人模式"));
		ListView_8.pushBackCustomItem(new DNWanfaCell(" "));
		ListView_8.pushBackCustomItem(new DNWanfaCell("四副牌"));
		ListView_8.pushBackCustomItem(new DNWanfaCell("1、3和4不要，共计184张牌，铺掉96张牌，每人44张牌。"));
		ListView_8.pushBackCustomItem(new DNWanfaCell("2、先打满1000分的为胜家，若分数超过1000分，分数叠加上去。"));
		ListView_8.pushBackCustomItem(new DNWanfaCell("3、牌型逻辑同4人模式。"));
		ListView_8.pushBackCustomItem(new DNWanfaCell("4、出牌顺序，第一小局由庄家先出，后续则由上游先出。"));
		ListView_8.pushBackCustomItem(new DNWanfaCell("5、罚奖规则：下游罚60分"));
		ListView_8.pushBackCustomItem(new DNWanfaCell("若当局分数不够扣，就在游戏总分上扣，若是没分扣的话，就挂负分"));
		//ListView_8.pushBackCustomItem(new DNWanfaCell("牌面分相同情况下，最终奖励分奖励给喜，地炸或者筒子分高的玩家。如喜分地炸分或者筒子分相同的情况下，都不奖励。"));
		ListView_8.pushBackCustomItem(new DNWanfaCell("其余计分和规则同四人模式"));
		ListView_8.pushBackCustomItem(new DNWanfaCell(" "));
		ListView_8.pushBackCustomItem(new DNWanfaCell("快乐四喜"));
		ListView_8.pushBackCustomItem(new DNWanfaCell("1、3和4还有大小王不要，共计176张牌。铺掉88张牌，三方每人44张牌"));
		ListView_8.pushBackCustomItem(new DNWanfaCell("2、先打满1000分的为胜家，若分数超过1000分，分数叠加上去；"));
		ListView_8.pushBackCustomItem(new DNWanfaCell("3、牌型逻辑同4人模式，但打得起则必须打；"));
		ListView_8.pushBackCustomItem(new DNWanfaCell("4、出牌顺序，第一小局可由系统自动匹配出牌顺序，第二局由上一局的第一名开始先出牌，也可以第一局由庄家先出；根据选择随机出头选项来区别；"));
		ListView_8.pushBackCustomItem(new DNWanfaCell("5、罚奖规则：上游奖励：60分，下游扣除60分；其余计分和规则同四人模式"));
		ListView_8.pushBackCustomItem(new DNWanfaCell(" "));
		ListView_8.pushBackCustomItem(new DNWanfaCell("特别注意："));
		ListView_8.pushBackCustomItem(new DNWanfaCell("1、打筒子开局后小局牌未结算前，中途解散房间，该局的小结算计分为当前各自获得分以及各自开局时所拥有的筒子分之和；"));
		ListView_8.pushBackCustomItem(new DNWanfaCell("2、打筒子开局后小局牌已结算但未进入下一局（下局未发牌），中途解散房间，该局的小结算计分为当前各自获得分以及获得筒子分之和； "));
		ListView_8.pushBackCustomItem(new DNWanfaCell("3、无论处于哪种情况只要是中途解散都不加最终奖励分；"));
		ListView_8.pushBackCustomItem(new DNWanfaCell("4、最终奖励分获得条件：当前玩家牌面分最大的获得最终奖励分，若牌面分相同则按筒子分（喜分）最大的获得；3人打筒子中2人牌面分和筒子分相同则由两人平分最终奖励分，当分数都相同时则不加最终奖励分；"));
		ListView_8.pushBackCustomItem(new DNWanfaCell("5、当局在已产生一游且未出小结算（未产生二三游）时，中途解散房间不计算上游奖励分，该局记分按中途解散情况处理，即为第一条规则处理；例如：A玩家一游，B和C未打完牌且没触发结算时解散了房间，该局得分不计算一游奖励分，按中途解散规则处理；"));

	},

	initBbtText:function(){
		var ListView_bbtz = this.getWidget("ListView_wf");
		ListView_bbtz.pushBackCustomItem(new DNWanfaCell(" "));
		ListView_bbtz.pushBackCustomItem(new DNWanfaCell("半边天炸游戏时湖南邵阳地区的特色扑克牌游戏。使用一整副牌，去除一个小王两个2，剩余51张牌。3人游戏、每人发牌17张，分庄闲两方对战，庄闲分别捡牌分，游戏结束后根据庄闲两方的捡牌分、朝分计算庄闲两方最后分值，分值多的一方胜利。分值相同时则上游所在方胜利。"));
		ListView_bbtz.pushBackCustomItem(new DNWanfaCell(" "));
		ListView_bbtz.pushBackCustomItem(new DNWanfaCell("创建房间时，勾选“可锤”，则房间第一局前3人可自由选择“锤”与“不锤”，未勾选“可锤”则房间内3人每一局均“不锤”；勾选“正510K分花色”则正510K花色分大小：黑>红>梅>方，未勾选“正510K分花色”则正510K花色不分大小；勾选“助陡”则单个闲家有2炸方可陡且代表两位闲家同时与庄家陡，未勾选“助陡”则单个闲家可任意陡且仅代表该位闲家与庄家陡；勾选“四带三”则可以炸弹带任意三张牌不算做炸弹，未勾选“四带三”则炸弹不可带牌"));
		ListView_bbtz.pushBackCustomItem(new DNWanfaCell(" "));
		ListView_bbtz.pushBackCustomItem(new DNWanfaCell("主要游戏过程：锤；开枪、投降，反抢、不反抢；陡、不陡；反陡、不反陡；出牌；判上下游；朝分；判胜负；结算"));
		ListView_bbtz.pushBackCustomItem(new DNWanfaCell(" "));
		ListView_bbtz.pushBackCustomItem(new DNWanfaCell("结算牌型：天炸>地炸>同花顺>炸弹>正510K>副510K；四带三，飞机，三带二，连对；"));
		ListView_bbtz.pushBackCustomItem(new DNWanfaCell("1、天炸：大王"));
		ListView_bbtz.pushBackCustomItem(new DNWanfaCell("2、地炸：四对及四对以上的连对，长打短，同长度时点数大打点小；"));
		ListView_bbtz.pushBackCustomItem(new DNWanfaCell("3、同花顺：同花色的顺子（五张及五张以上的连单），长打短，同长时点大打点小，同长且同点时花大打花小；花色大小： 黑>红>梅>方"));
		ListView_bbtz.pushBackCustomItem(new DNWanfaCell("4、炸弹：四张相同点数牌，点大打点小"));
		ListView_bbtz.pushBackCustomItem(new DNWanfaCell("5、正510K：同花色的510K，正510K分花色则花色大小：黑>红>梅>方"));
		ListView_bbtz.pushBackCustomItem(new DNWanfaCell("6、副510K：不同花色的510K，副510K之间无花色大小；"));
		ListView_bbtz.pushBackCustomItem(new DNWanfaCell(" "));
		ListView_bbtz.pushBackCustomItem(new DNWanfaCell("分牌：5、10、K为分牌，其分别为5分、10分、10分"));
		ListView_bbtz.pushBackCustomItem(new DNWanfaCell(" "));
		ListView_bbtz.pushBackCustomItem(new DNWanfaCell("上下游：先出完牌的1人为上游，最后出完牌的（或没出完牌）的1人（或2人）为下游"));
		ListView_bbtz.pushBackCustomItem(new DNWanfaCell(" "));
		ListView_bbtz.pushBackCustomItem(new DNWanfaCell("朝分：下游向上游朝分，朝20分；若庄家为上游，则朝分为20分给庄家，闲家扣20分；若闲家一家上游，庄家中游（第二个打完牌）则朝分为0；若闲家两家为上中游，庄家下游则朝分为20给闲家，庄家扣20分"));
		ListView_bbtz.pushBackCustomItem(new DNWanfaCell(" "));
		ListView_bbtz.pushBackCustomItem(new DNWanfaCell("胜负：牌局结束后根据庄闲两方的捡牌分、朝分计算庄闲两方最后分值、分值多的一方胜利；若分值一样则上游一方胜利"));
		ListView_bbtz.pushBackCustomItem(new DNWanfaCell(" "));
		ListView_bbtz.pushBackCustomItem(new DNWanfaCell("结算：庄闲两方按胜负进行结算，其中锤、开枪、陡、反陡逐一结算翻倍，投降不翻倍，反抢胜利结算翻倍，反抢失败结算不翻倍，庄闲任意一方结算分值为零分或负分结算也翻倍，胜方积分和负方积分之后为零"));
		ListView_bbtz.pushBackCustomItem(new DNWanfaCell(" "));
		ListView_bbtz.pushBackCustomItem(new DNWanfaCell("半边天炸游戏集510K、斗地主等多种游戏精华打法于一体，蕴含丰富的自强、协作精神，是邵阳人民的宝贵文化遗产。"));

	},

	initPdkText:function(){
		var ListView_pdk = this.getWidget("ListView_wf");
		ListView_pdk.pushBackCustomItem(new DNWanfaCell(" "));
		ListView_pdk.pushBackCustomItem(new DNWanfaCell("一、牌库"));
		ListView_pdk.pushBackCustomItem(new DNWanfaCell("16张玩法：一副牌去掉大小王、三个2和一个A，共48张牌，每人16张。（牌库中只有一个2"));
		ListView_pdk.pushBackCustomItem(new DNWanfaCell("，三个A，无大小王）"));
		ListView_pdk.pushBackCustomItem(new DNWanfaCell("15张玩法：一副牌去掉大小王、三个2、三个A和一个K，共45张牌，每人15张。（牌库中只"));
		ListView_pdk.pushBackCustomItem(new DNWanfaCell("有一个2，一个A，3个K，无大小王）"));
		ListView_pdk.pushBackCustomItem(new DNWanfaCell("二、参与人数"));
		ListView_pdk.pushBackCustomItem(new DNWanfaCell("3人或2人（2人跑得快会扣掉对应一家的牌，无黑桃三必出玩法）"));
		ListView_pdk.pushBackCustomItem(new DNWanfaCell("三、出牌规则"));
		ListView_pdk.pushBackCustomItem(new DNWanfaCell("首局游戏由第一个拿到黑桃3的玩家先出牌，可以任意的出任意牌型，然后按逆时针顺序"));
		ListView_pdk.pushBackCustomItem(new DNWanfaCell("玩家依次出牌（要的起的情况下，必须出牌）"));
		ListView_pdk.pushBackCustomItem(new DNWanfaCell("先出完手牌的玩家为赢家，第二局开始由赢家先出。"));
		ListView_pdk.pushBackCustomItem(new DNWanfaCell("四、红10玩法"));
		ListView_pdk.pushBackCustomItem(new DNWanfaCell("手牌中有红桃10的玩家将额外得分或输分，可选5分、10分、翻倍。"));
		ListView_pdk.pushBackCustomItem(new DNWanfaCell("例如： 2人玩法，A拿了红10（勾选5分），小局结算时如果A赢了，则额外加5分，如果输了，额外多扣5分。"));
		ListView_pdk.pushBackCustomItem(new DNWanfaCell("五、牌型"));
		ListView_pdk.pushBackCustomItem(new DNWanfaCell("1、单张：1张任意牌，2最大，3最小；"));
		ListView_pdk.pushBackCustomItem(new DNWanfaCell("2、对子：2张点数相同的牌，AA最大，33最小；（15张玩法中KK最大）"));
		ListView_pdk.pushBackCustomItem(new DNWanfaCell("3、三带二：点数相同的三张牌+一对牌或点数相同的三张牌+两张不同的单牌；如：55577 或 55568"));
		ListView_pdk.pushBackCustomItem(new DNWanfaCell("4、三带一：打到最后剩4张牌的时候，可以3带1；"));
		ListView_pdk.pushBackCustomItem(new DNWanfaCell("5、三张不带只能在最后剩3张牌时才可出牌；"));
		ListView_pdk.pushBackCustomItem(new DNWanfaCell("6、顺子：点数相连的5张及以上的牌，可以从3连到A，2时最大单牌不能当顺子出。如：910JQKA；"));
		ListView_pdk.pushBackCustomItem(new DNWanfaCell("7、连对：点数相连的2张及以上的对子，可以从3连到A。如：7788，334455；"));
		ListView_pdk.pushBackCustomItem(new DNWanfaCell("8、飞机：点数相连的2个及以上的3同张，可以带四张任意牌，如：555666+99JJ或555666+4879"));
		ListView_pdk.pushBackCustomItem(new DNWanfaCell("9、飞机必须带4张牌，只有在牌不够时才可不带或者少带；"));
		ListView_pdk.pushBackCustomItem(new DNWanfaCell("10、炸弹：4张相同点数的牌。如：6666；炸弹的大小和牌点大小规则相同；"));
		ListView_pdk.pushBackCustomItem(new DNWanfaCell("11、关门：有一家已经出牌，另一家或两家1张牌都没出时为关门；"));
		ListView_pdk.pushBackCustomItem(new DNWanfaCell("12、当下家报单，如果选择出单张，自己必须出手牌中的最大牌；"));
		ListView_pdk.pushBackCustomItem(new DNWanfaCell("13、牌型的比较点数大小，从大到小依次为：2、A、K、Q、J、1、0、9、8、7、6、5、4、3；"));
		ListView_pdk.pushBackCustomItem(new DNWanfaCell("五、积分规则："));
		ListView_pdk.pushBackCustomItem(new DNWanfaCell("1、一张牌1分"));
		ListView_pdk.pushBackCustomItem(new DNWanfaCell("2、一个炸弹10分（炸弹被吃只算最大的炸弹）"));
		ListView_pdk.pushBackCustomItem(new DNWanfaCell("3、报单不出不进"));
		ListView_pdk.pushBackCustomItem(new DNWanfaCell("4、被关门者剩余牌张数*2"));
	},

	initPhzText:function(){
		var ListView_phz = this.getWidget("ListView_wf");
		ListView_phz.pushBackCustomItem(new DNWanfaCell(" "));
		ListView_phz.pushBackCustomItem(new DNWanfaCell("一、跑胡子组成"));
		ListView_phz.pushBackCustomItem(new DNWanfaCell("1.	跑胡子一共80张牌，小写“一”到“十”各4张共40张，大写“壹”到“拾”各4张共40张。其中大小写得到2、7、10为红色，其他的全部为黑色。"));
		ListView_phz.pushBackCustomItem(new DNWanfaCell("2.	砌牌：跑胡子为3人同玩，庄家砌21张，其他方位砌20张，留19张在墩上。庄家起的最后一张牌必须示众。"));
		ListView_phz.pushBackCustomItem(new DNWanfaCell("3.	一对牌：砌牌后，手中2个相同的牌为一对。"));
		ListView_phz.pushBackCustomItem(new DNWanfaCell("4.	一坎牌：砌牌后，手中3个相同的牌为一坎。一坎牌不能拆散与其他牌组合。（即手上有就默认组合成一幅）"));
		ListView_phz.pushBackCustomItem(new DNWanfaCell("5.	一提牌：砌牌后，手中4个相同的牌为1提。一提牌不能拆散与其他牌组合。（在进第一张牌之前，必须放到桌面示众）"));
		ListView_phz.pushBackCustomItem(new DNWanfaCell("6.	一句话：砌牌后，手中的牌依据规则组合成相连的三张，比如小4、5、6称为一句话。另外2、7、10组合也称为一句话。"));
		ListView_phz.pushBackCustomItem(new DNWanfaCell("7.	绞牌：当1对大牌与1张相同的小牌，或者1对小牌与1张相同的大牌组合时，成为绞牌。如1对小九与1张大玖。"));
		ListView_phz.pushBackCustomItem(new DNWanfaCell("二、玩法规则"));
		ListView_phz.pushBackCustomItem(new DNWanfaCell("1.	偎牌：摸牌时，如果所摸的牌正好是手中的一对牌，则必须将牌由手上放到桌上。"));
		ListView_phz.pushBackCustomItem(new DNWanfaCell("2.	臭偎：忍碰之后，又偎牌，称为臭牌。臭偎必须明示。（两张暗一张明）"));
		ListView_phz.pushBackCustomItem(new DNWanfaCell("3.	提牌：提牌时，如果所摸的牌正好是手中的一坎牌，则必须将牌由手上放到桌面示众。"));
		ListView_phz.pushBackCustomItem(new DNWanfaCell("4.	碰牌：当别人打或摸的牌自己手中有一对。则可以碰牌，碰牌后将牌放到桌面"));
		ListView_phz.pushBackCustomItem(new DNWanfaCell("5.	跑牌：当别人打或摸的牌自己手中有一坎，或者是已经偎牌的牌，则可以跑牌。跑牌后将牌放到桌面，或者当别人从墩上摸的牌，是自己已经碰牌的牌，则同样可以跑牌。如果没有跑牌，称为走跑。"));
		ListView_phz.pushBackCustomItem(new DNWanfaCell("6.	摸牌时，除偎牌与提牌外，必须首先明示，在别人不碰或不跑的情况下才可以吃牌。"));
		ListView_phz.pushBackCustomItem(new DNWanfaCell("7.	忍碰：当有机会碰牌时，而自己不碰，则称为忍碰。"));
		ListView_phz.pushBackCustomItem(new DNWanfaCell("8.	重跑：当跑的牌超过1次时，称为8块。如跑了小二，再跑小三时，称为重跑，此时不用从手中大牌出去，而要让下家摸牌。"));
		ListView_phz.pushBackCustomItem(new DNWanfaCell("9.	吃牌：上家出的或者自己摸的牌，示众后没有人碰牌或者跑牌，则可以与自己手中的牌组合成一句话，或者绞牌（如1张小九与一张大玖绞一张小九或大玖）放到桌面，称为吃牌。"));
		ListView_phz.pushBackCustomItem(new DNWanfaCell("10.过张：当有机会吃，碰时，自己却没有吃，碰的牌，称为过张。过张后，自己不能再吃，碰同一张，直到这局游戏结束。"));
		ListView_phz.pushBackCustomItem(new DNWanfaCell("11.摆火：当吃的牌手中还有时，必须要将手中的这张牌根据某种组合，也要放到桌面，称为摆火。如：手中有小1、2、3、4、5、6，此时以4、5组合吃小3，那么手中的小3，必须以1、2、3和组合放到桌面示众。"));
		ListView_phz.pushBackCustomItem(new DNWanfaCell("12.每进一张牌，必须打出一张，重跑除外。"));
		ListView_phz.pushBackCustomItem(new DNWanfaCell("三、胡牌"));
		ListView_phz.pushBackCustomItem(new DNWanfaCell("1.息:"));
		ListView_phz.pushBackCustomItem(new DNWanfaCell("胡息分数计算"));
		ListView_phz.pushBackCustomItem(new DNWanfaCell("牌型        大字      小字"));
		ListView_phz.pushBackCustomItem(new DNWanfaCell("提              12       9"));
		ListView_phz.pushBackCustomItem(new DNWanfaCell("偎              6         3"));
		ListView_phz.pushBackCustomItem(new DNWanfaCell("跑              9         6"));
		ListView_phz.pushBackCustomItem(new DNWanfaCell("碰              3         1"));
		ListView_phz.pushBackCustomItem(new DNWanfaCell("坎              6         3"));
		ListView_phz.pushBackCustomItem(new DNWanfaCell("二七十       6         3"));
		ListView_phz.pushBackCustomItem(new DNWanfaCell("一二三       6         3"));
		ListView_phz.pushBackCustomItem(new DNWanfaCell("其他没有息，绞牌没有息。"));
		ListView_phz.pushBackCustomItem(new DNWanfaCell("2.等：从10胡息开始计算，10胡息为3等，每增加3胡息增加1等。不满3胡不算等。如13胡息为2等，15胡息也为2等，16胡息为3等，一等等于1分。"));
		ListView_phz.pushBackCustomItem(new DNWanfaCell("3.一方门子：比如一句话，一绞牌，一碰，一提，一偎，一跑都称为1方门子。当有跑牌或者提牌时，一对牌可以称为1方门子，叫做将，跑牌或提牌时，必须有一对将，否则就要掉将。"));
		ListView_phz.pushBackCustomItem(new DNWanfaCell("4.胡牌：满足一下条件可以胡"));
		ListView_phz.pushBackCustomItem(new DNWanfaCell("A、至少有10胡息"));
		ListView_phz.pushBackCustomItem(new DNWanfaCell("B、手里的与桌面上的牌组合有7方门子"));
		ListView_phz.pushBackCustomItem(new DNWanfaCell("C、胡牌必须胡墩上的，示众后的牌，可以胡过张，胡自己或其他人要碰，跑的牌。"));
		ListView_phz.pushBackCustomItem(new DNWanfaCell("四．名堂"));
		ListView_phz.pushBackCustomItem(new DNWanfaCell("1.红胡：胡牌满足13张或13张以上红牌，胡息等于平胡的2倍"));
		ListView_phz.pushBackCustomItem(new DNWanfaCell("2.黑胡：胡牌满足所有的牌都为黑牌，胡息等于平胡的2倍"));
		ListView_phz.pushBackCustomItem(new DNWanfaCell(" "));
		ListView_phz.pushBackCustomItem(new DNWanfaCell("邵阳剥皮"));
		ListView_phz.pushBackCustomItem(new DNWanfaCell("一．跑胡子组成"));
		ListView_phz.pushBackCustomItem(new DNWanfaCell("与邵阳字牌组成相同"));
		ListView_phz.pushBackCustomItem(new DNWanfaCell("二．玩法规则"));
		ListView_phz.pushBackCustomItem(new DNWanfaCell("1.打满100胡结束"));
		ListView_phz.pushBackCustomItem(new DNWanfaCell("2.胡牌坐庄"));
		ListView_phz.pushBackCustomItem(new DNWanfaCell("3.荒庄：庄家扣10点，继续坐庄"));
		ListView_phz.pushBackCustomItem(new DNWanfaCell("4.只有庄家胡牌超出100胡会继续打牌，直到下庄为止"));
		ListView_phz.pushBackCustomItem(new DNWanfaCell("5.其他同邵阳字牌相同"));
		ListView_phz.pushBackCustomItem(new DNWanfaCell("三．胡牌"));
		ListView_phz.pushBackCustomItem(new DNWanfaCell("1.按胡计分，总分计算四舍五入"));
		ListView_phz.pushBackCustomItem(new DNWanfaCell("2.其他同邵阳字牌"));
		ListView_phz.pushBackCustomItem(new DNWanfaCell("四．名堂"));
		ListView_phz.pushBackCustomItem(new DNWanfaCell("有天胡，地胡，自摸三种名堂，每种名堂分别+10分"));
		ListView_phz.pushBackCustomItem(new DNWanfaCell("天胡：庄家起手胡"));
		ListView_phz.pushBackCustomItem(new DNWanfaCell("地胡：闲家胡庄家打出的第一张牌"));
		ListView_phz.pushBackCustomItem(new DNWanfaCell("一点朱：胡牌时手牌加吃碰的牌只有1张红字为一点朱，胡息按原胡息翻倍"));
		ListView_phz.pushBackCustomItem(new DNWanfaCell("小红胡：胡牌时手上加吃碰的牌只有10-12张红牌，胡息按原胡息翻倍"));
		ListView_phz.pushBackCustomItem(new DNWanfaCell("大红胡：胡牌时手上加吃碰的牌只有13张或13张以上红牌，计60胡息"));
		ListView_phz.pushBackCustomItem(new DNWanfaCell("乌（黑）胡：胡牌时手上加吃碰的牌全为黑牌，计60胡息"));

	},

	initMjText:function(){
		var ListView_8 = this.getWidget("ListView_wf");
		ListView_8.pushBackCustomItem(new DNWanfaCell("红中麻将规则： "));
		ListView_8.pushBackCustomItem(new DNWanfaCell("一、牌数共112张牌"));
		ListView_8.pushBackCustomItem(new DNWanfaCell("	  包括筒、索、万，1-9各4张，外加4张红中。"));
		ListView_8.pushBackCustomItem(new DNWanfaCell("二、起手摸牌数量"));
		ListView_8.pushBackCustomItem(new DNWanfaCell("	  起手，只有庄家14张，其余13张。"));
		ListView_8.pushBackCustomItem(new DNWanfaCell("三、庄家"));
		ListView_8.pushBackCustomItem(new DNWanfaCell("	  A、第一局由房主做庄家。"));
		ListView_8.pushBackCustomItem(new DNWanfaCell("	  B、以后谁胡牌，下局谁做庄家。"));
		ListView_8.pushBackCustomItem(new DNWanfaCell("	  C、如臭庄、则最后摸牌的人做庄。"));

		ListView_8.pushBackCustomItem(new DNWanfaCell("四、规则"));
		ListView_8.pushBackCustomItem(new DNWanfaCell("	  碰牌:其他玩家打出的牌，自己手里有两个，则可以碰，碰完要出牌。"));
		ListView_8.pushBackCustomItem(new DNWanfaCell("	  明杠:先碰了的牌，后面有自己摸到的一个该牌，则可以选择“杠”，(公杠必须第一时间杠，如果没有第一时间杠，则不能再杠)。"));
		ListView_8.pushBackCustomItem(new DNWanfaCell("	  暗杠:手里有4张相同的牌，可以选择“杠”(暗杠，不需要第一时间杠，只要有这个牌型，每一次轮到该用户打牌，都可以选择”杠”)。"));
		ListView_8.pushBackCustomItem(new DNWanfaCell("	  放杠: 自己打出一张牌，同桌有玩家手里有一坎相同的该牌，则该用户可以“接杠”，打出该牌的玩家就是“放杠”。"));
		ListView_8.pushBackCustomItem(new DNWanfaCell("	  接杠:与“放杠”对应，有人“放”就对应有人“接”。"));
		ListView_8.pushBackCustomItem(new DNWanfaCell("	  一句话: 同系列的三个连续的牌。"));
		ListView_8.pushBackCustomItem(new DNWanfaCell("	  一坎牌: 三个一样的牌。"));
		ListView_8.pushBackCustomItem(new DNWanfaCell("出牌:"));
		ListView_8.pushBackCustomItem(new DNWanfaCell("	  庄家先出牌。"));
		ListView_8.pushBackCustomItem(new DNWanfaCell("	  打出的牌，其余的人都能碰和杠，不能吃牌。"));
		ListView_8.pushBackCustomItem(new DNWanfaCell("	  红中即为王牌，可以代替任意一张牌。"));
		ListView_8.pushBackCustomItem(new DNWanfaCell("	  红中不能碰和杠红中，也不能辅助其它牌来碰和杠。"));
		ListView_8.pushBackCustomItem(new DNWanfaCell("	  庄家打牌后，如果没有人“碰、杠”，则下家摸牌，然后自主选择一张手上的牌打，依次类推，直至有人胡牌。"));
		ListView_8.pushBackCustomItem(new DNWanfaCell("胡牌"));
		ListView_8.pushBackCustomItem(new DNWanfaCell("	  胡牌:胡牌必须手里有1个对子，剩余的牌必须是“一句话”或者“一坎牌”。"));
		ListView_8.pushBackCustomItem(new DNWanfaCell("	  起手胡: 起手4个红中，直接胡牌。"));
		ListView_8.pushBackCustomItem(new DNWanfaCell("	  枪杠胡: A玩家选择“公杠”，而刚好此时B玩家可以胡这牌，则B玩家可以选择“抢杠”，"));
		ListView_8.pushBackCustomItem(new DNWanfaCell("	  抢杠就是B玩家胡牌，但是只有A玩家一个输全部的分。多人抢杠，多人胡。"));
		ListView_8.pushBackCustomItem(new DNWanfaCell("	  能胡牌的情况下，直接胡。"));
		ListView_8.pushBackCustomItem(new DNWanfaCell("抓鸟:"));
		ListView_8.pushBackCustomItem(new DNWanfaCell("	  根据抓鸟的数量，最后要留对应数量的牌不能摸，比如:选择4个鸟的玩法，那么到倒数第五张牌被摸后，依然无人胡牌，则臭庄。"));
		ListView_8.pushBackCustomItem(new DNWanfaCell("五、计分功能"));
		ListView_8.pushBackCustomItem(new DNWanfaCell("	  放杠出3分。接杠得3分。"));
		ListView_8.pushBackCustomItem(new DNWanfaCell("	  A玩家公杠，则其他三人1人出1分，A玩家得3分。"));
		ListView_8.pushBackCustomItem(new DNWanfaCell("	  A玩家暗杠，则其他三人1人出2分，A玩家得6分。"));
		ListView_8.pushBackCustomItem(new DNWanfaCell("	  自摸每人出2分;再算抓鸟。"));
		ListView_8.pushBackCustomItem(new DNWanfaCell("	  点炮为点炮者出打牌人数-1分，即2人1分，3人2分，4人3分；再算抓鸟"));
		ListView_8.pushBackCustomItem(new DNWanfaCell("	  抓鸟:有人胡牌后，从敦上摸牌，1、5、9、红中算中鸟。"));
		ListView_8.pushBackCustomItem(new DNWanfaCell("	  中1个鸟，则每人多出2分，中6个，则每人多出12分。"));
		ListView_8.pushBackCustomItem(new DNWanfaCell("	  抓鸟数量由开房时确定，(2-6个)，如果胡牌人手里没有红中，则加一码。(如果剩余牌数不够，则有多少牌扎多少牌）。"));
		ListView_8.pushBackCustomItem(new DNWanfaCell("六、特殊规则"));
		ListView_8.pushBackCustomItem(new DNWanfaCell("	  庄闲模式：勾选庄闲模式后，庄家自摸闲家每人多出1分，庄家点炮胡点炮者多出1分；"));
		ListView_8.pushBackCustomItem(new DNWanfaCell("	  闲家自摸庄家多出1分，闲家点炮胡，若是庄家点炮则多出1分；"));
		ListView_8.pushBackCustomItem(new DNWanfaCell("	  无红中胡牌：勾选无红中胡牌鸟+1，则当胡牌时没有红中多抓1张鸟牌，若选择鸟+2则多抓2张鸟牌"));
	},

	initMjSYText:function(){
		var ListView_8 = this.getWidget("ListView_wf");
		ListView_8.pushBackCustomItem(new DNWanfaCell("邵阳麻将规则： "));
		ListView_8.pushBackCustomItem(new DNWanfaCell("一、术语解释","二、坐庄规则","三、胡牌规则","四、胡牌方式","五、胡牌牌型","六、胡牌分数计算","备注："));
		ListView_8.pushBackCustomItem(new DNWanfaCell("    自摸: 所胡牌为自己正常摸得，即称之为自摸胡，简称”自摸”。"));
		ListView_8.pushBackCustomItem(new DNWanfaCell("    明杠: 明杠分为两类，一类为自己手中已有三张相同牌，此时另外的玩家放出一张该牌，玩家即可选择杠牌，此明杠为对方放杠。" +
			"另一类杠为玩家又摸到一张自己已碰过的牌，选择杠后为摸明杠。"));
		ListView_8.pushBackCustomItem(new DNWanfaCell("    暗杠: 自己摸得四张(四张全部为玩家摸得)一样的牌后，选择杠后称之为暗杠。"));
		ListView_8.pushBackCustomItem(new DNWanfaCell("    抢杠: 玩家明杠时，有人正胡其所杠这张牌，即称之为“抢杠胡”，简称“抢杠”。"));
		ListView_8.pushBackCustomItem(new DNWanfaCell("    荒庄: 摸完所有牌后都无人胡牌即称为荒庄。"));
		ListView_8.pushBackCustomItem(new DNWanfaCell("    游戏中采用连庄方式，仅第一局为创建房间的玩家为庄，之后将由本局胡牌的玩家下局坐庄，如庄家胡牌，则继续连庄。"+
			"若荒庄则摸最后一张牌的玩家下局坐庄。"));
		ListView_8.pushBackCustomItem(new DNWanfaCell("    胡牌必须自摸，不能点炮，除非是接杠上炮和开明杠的牌。杠开时，其他玩家可以胡玩家杠的这张牌，叫抢杠，按自摸计算；" +
			"若开杠完成之后，再打出一张牌，其他玩可抢这张牌胡，叫杠上炮，按点炮计算。"));
		ListView_8.pushBackCustomItem(new DNWanfaCell("    允许一炮多响: 如果同时有2家以上叫相同的牌，若有人杠这张牌或杠后打出该牌，该2家可以同时胡，称“一炮双响”或“一炮三响”。"));
		ListView_8.pushBackCustomItem(new DNWanfaCell("    点炮: 仅在杠后打出的一张牌，可以点炮胡。"));
		ListView_8.pushBackCustomItem(new DNWanfaCell("    自摸: 所胡牌为自己正常摸得。"));
		ListView_8.pushBackCustomItem(new DNWanfaCell("    抢杠: 杠的那张牌刚好是别人要胡的牌，此时被胡掉就叫做抢杠。按胡牌家自摸计算，被抢玩家包三家牌出的分。暗杠不能抢(抢杠玩家胡十三幺除外)。暗杠亮一张牌，其余三张盖住。"));
		ListView_8.pushBackCustomItem(new DNWanfaCell("    杠开: 杠后补摸的牌就是要胡的牌，这种情况下胡牌叫做杠开。杠照常计算，杠开不另外翻倍，杠开胡按自摸计算，如果是点杠后杠开的由点杠者包自摸。"));
		ListView_8.pushBackCustomItem(new DNWanfaCell("    平胡: 四坎加一对将。"));
		ListView_8.pushBackCustomItem(new DNWanfaCell("    门清: 所有牌全部是手上自己摸的牌，没有碰、明杠、吃。"));
		ListView_8.pushBackCustomItem(new DNWanfaCell("    七小对: 所有手牌全部都是两张一对的，没有碰和杠。"));
		ListView_8.pushBackCustomItem(new DNWanfaCell("    龙七对: 七小对的牌型里，需有一个四张相同的，并且该牌没有杠。"));
		ListView_8.pushBackCustomItem(new DNWanfaCell("    大对碰: 四副刻子加一对将。"));
		ListView_8.pushBackCustomItem(new DNWanfaCell("    风一色: 所有牌全部为东、南、西、北、中、发、白，并且牌型为大对碰。"));
		ListView_8.pushBackCustomItem(new DNWanfaCell("    门清清一色: 必须手上都是一个色，不能吃不能碰，不能明杠，可以暗杠。"));
		ListView_8.pushBackCustomItem(new DNWanfaCell("    清一色大对碰: 必须手上都是一个色，不能吃只能碰，可以开杠(明杠，暗杠)。"));
		ListView_8.pushBackCustomItem(new DNWanfaCell("    清一色七小对: 必须一个色，成7对胡牌，不能吃碰杠。"));
		ListView_8.pushBackCustomItem(new DNWanfaCell("    清一色龙七对: 清一色七小对的牌型里，有四张相同的，并且没有杠。"));
		ListView_8.pushBackCustomItem(new DNWanfaCell("    底分为1；"));
		ListView_8.pushBackCustomItem(new DNWanfaCell("    明杠: 1；"));
		ListView_8.pushBackCustomItem(new DNWanfaCell("    暗杠: 2；"));
		ListView_8.pushBackCustomItem(new DNWanfaCell("    平胡: 2；"));
		ListView_8.pushBackCustomItem(new DNWanfaCell("    门清: 4；"));
		ListView_8.pushBackCustomItem(new DNWanfaCell("    清一色、七小对、大对碰: 均为8；"));
		ListView_8.pushBackCustomItem(new DNWanfaCell("    龙七对: 16；"));
		ListView_8.pushBackCustomItem(new DNWanfaCell("    门清清一色: 16；"));
		ListView_8.pushBackCustomItem(new DNWanfaCell("    清一色七小对: 16"));
		ListView_8.pushBackCustomItem(new DNWanfaCell("    清一色龙七对: 32"));
		ListView_8.pushBackCustomItem(new DNWanfaCell("    风一色、十三幺: 均为24"));
		ListView_8.pushBackCustomItem(new DNWanfaCell("    1.当同时胡多个类型的时候按最大的倍数胡算，不能叠加。"));
		ListView_8.pushBackCustomItem(new DNWanfaCell("    2.邵阳麻将荒庄，杠分需要计分。(第一局解散的话也需计入)"));
		ListView_8.pushBackCustomItem(new DNWanfaCell("    3.加锤说明：如果你是庄家且加锤了赢了，下把默认加锤，臭庄则重新选择。加锤分数计算:(胡牌分+鸟分)X2，如果都加锤则再X2。"));

	},

	initPhzLDText:function(){
		var ListView_8 = this.getWidget("ListView_wf");
		ListView_8.pushBackCustomItem(new DNWanfaCell("娄底放炮罚规则： "));
		ListView_8.pushBackCustomItem(new DNWanfaCell("一、牌子组成：","二、术语：","三、玩法规则：","四、胡牌及胡息计算：","五、结算方法："));
		ListView_8.pushBackCustomItem(new DNWanfaCell("    小写一、二、三、四、五、六、七、八、九、十各4张，共40张。"));
		ListView_8.pushBackCustomItem(new DNWanfaCell("    大写壹、贰、叁、肆、伍、陆、柒、捌、玖、拾各4张，共40张。"));
		ListView_8.pushBackCustomItem(new DNWanfaCell("    一共80张牌。"));
		ListView_8.pushBackCustomItem(new DNWanfaCell(""));
		ListView_8.pushBackCustomItem(new DNWanfaCell("    砌牌：放炮罚为3人同玩，庄家砌21张，其他方位20张，留19张在墩上，作为底牌。"));
		ListView_8.pushBackCustomItem(new DNWanfaCell("    一对牌：砌牌后，手中2个相同的为1对。"));
		ListView_8.pushBackCustomItem(new DNWanfaCell("    一坎牌：砌牌后，手中3个相同的为坎，一坎牌不能拆散与其他牌组合。"));
		ListView_8.pushBackCustomItem(new DNWanfaCell("    一提牌：砌牌后，手中4个相同的牌为一提，一提牌不能拆散与其他牌组合。"));
		ListView_8.pushBackCustomItem(new DNWanfaCell("    一句话：当1对大牌与1张相同点数的小牌，或者1对小牌与一张点数相同的打牌组合为绞牌。"));
		ListView_8.pushBackCustomItem(new DNWanfaCell(""));
		ListView_8.pushBackCustomItem(new DNWanfaCell("    庄家砌最后一张牌必须示众。"));
		ListView_8.pushBackCustomItem(new DNWanfaCell("    偎牌：摸牌后，如果所摸的牌刚好是手中的一对牌，则必须将牌由手上放到桌上。"));
		ListView_8.pushBackCustomItem(new DNWanfaCell("    臭偎：忍牌之后，又偎牌，称为臭偎，臭偎必须明示。"));
		ListView_8.pushBackCustomItem(new DNWanfaCell("    提牌：如果抓底牌时，抓到的底牌正好是手中一坎牌一样，称为提牌，则必须将牌由时候上放下。"));
		ListView_8.pushBackCustomItem(new DNWanfaCell("    碰牌：当别人打牌跟自己手上的一对一样，则可以碰牌，碰牌后将牌放桌上。"));
		ListView_8.pushBackCustomItem(new DNWanfaCell("    跑牌：当比人打的牌或者摸的牌，自己手上正好有一坎，或者是已经偎的牌，则可以跑牌，或者别人从墩牌上摸的牌正好是自己碰过的牌，则同样可以跑牌。如果没有跑牌，称为走跑。"));
		ListView_8.pushBackCustomItem(new DNWanfaCell("    忍碰：当有机会碰时自己选择不碰则称为忍碰。"));
		ListView_8.pushBackCustomItem(new DNWanfaCell("    重跑：当跑牌超过一次是，称为重跑或者8块。重跑无需再打牌出去，改为下家直接摸牌。"));
		ListView_8.pushBackCustomItem(new DNWanfaCell("    吃牌：上家出的或者自己摸的怕，示众后没有人碰或者跑，且正好可以与自己手中的牌组合成一句话，或者绞牌，则可以吃，吃牌后需放到桌上，全部明牌。"));
		ListView_8.pushBackCustomItem(new DNWanfaCell("    过张：当有机会吃或者碰时，自己没有吃或者碰，称为过张。过张后的牌不可再吃或者碰，但可以胡。"));
		ListView_8.pushBackCustomItem(new DNWanfaCell("    比牌：当听吃的牌，手中还有时，必须将手中的这张牌根据某种组合，也要如到桌上，称为比牌。"));
		ListView_8.pushBackCustomItem(new DNWanfaCell("    每进一张牌，必须打出一张牌，重跑除外。游戏中不能忍偎、忍跑；偎牌、臭偎必须示众（两暗一明），提牌必须示众（三暗一明）。"));
		ListView_8.pushBackCustomItem(new DNWanfaCell("    其他玩家打出的牌，自己能胡牌必须胡。"));
		ListView_8.pushBackCustomItem(new DNWanfaCell("    自摸：所胡那张牌是自己从墩牌上摸上来的，2番；"));
		ListView_8.pushBackCustomItem(new DNWanfaCell("    一点红：只有一个红字，2番；"));
		ListView_8.pushBackCustomItem(new DNWanfaCell("    一条扁：红字一句话，红字一坎，红字一提，2番；"));
		ListView_8.pushBackCustomItem(new DNWanfaCell("    乌胡：全手黑，等于100胡息；"));
		ListView_8.pushBackCustomItem(new DNWanfaCell("    海底胡：玩家所有胡的牌是牌墩上最后一张牌，2番；"));
		ListView_8.pushBackCustomItem(new DNWanfaCell("    红胡：10-12  2番"));
		ListView_8.pushBackCustomItem(new DNWanfaCell("    十三红：13张及以上的红牌，100胡；"));
		ListView_8.pushBackCustomItem(new DNWanfaCell("    卡胡：30胡，算100胡；20胡，2番；"));
		ListView_8.pushBackCustomItem(new DNWanfaCell("    天胡：庄家所胡牌为亮张牌为100胡；"));
		ListView_8.pushBackCustomItem(new DNWanfaCell("    地胡：手牌未变动，胡庄家打出的第一张牌，胡牌算100胡；"));
		ListView_8.pushBackCustomItem(new DNWanfaCell("    放炮：扣相等分，放炮者单局最多扣100胡息；"));
		ListView_8.pushBackCustomItem(new DNWanfaCell("    当胡牌出现以上多种名堂时，赢家按最有益的方式进行结算胡息，名堂番数相乘，如20胡的乌胡，胡息结算为乌胡100*2=200胡息。"));
		ListView_8.pushBackCustomItem(new DNWanfaCell("    15胡起胡，黄庄庄家扣10胡息，庄家继续坐庄。"));
		ListView_8.pushBackCustomItem(new DNWanfaCell("    3人对局，多轮下来有一人满100胡结算。"));
		ListView_8.pushBackCustomItem(new DNWanfaCell("    结算时以胡息最少的人胡息归0，其余玩家对应增减。"));
	},

	showWanFaPanel:function(temp){
		if (!this.wanfaIdex || this.wanfaIdex != temp ){
			for(var i = 1; i <= 8; i++){
				var tempPanel = i;
				if ( i >= 5){
					tempPanel = i -1;
				}
//				this["ListView_wf"+tempPanel].visible = false;

				var txt_game_name = this["wanfaBtn"+i].getChildByName("txt_game_name")
                if( i == temp){
                    this["wanfaBtn"+i].setBright(false);
                    if (txt_game_name){
                        txt_game_name.setColor(cc.color(24 , 97 , 118))
                    }
                }else{
                    this["wanfaBtn"+i].setBright(true);
                    if (txt_game_name){
                        txt_game_name.setColor(cc.color(255 , 255 , 255))
                    }
                }
			}
			var tempPanel = temp;
			if ( temp >= 5){
				tempPanel = temp -1;
			}
//			this["ListView_wf"+tempPanel].visible = true;
//			if (!this["ListView_wf"+tempPanel].isHasText){
//				this["ListView_wf"+tempPanel].isHasText = true;
//
//			}
			this.initWanFaText(tempPanel);
			this.wanfaIdex = temp;
		}
	},

	addClickEvent:function(widgets,selector){
		for(var key in widgets){
			var widget = this[key] = this.getWidget(key);
			widget.temp = parseInt(widgets[key]);
			UITools.addClickEvent(widget,this,selector);
		}
	},

	getWidget:function(name){
		return ccui.helper.seekWidgetByName(this.root,name);
	},

	getLocalItem:function(key){
		var val = cc.sys.localStorage.getItem(key);
		if(val)
			val = parseInt(val);
		return val;
	}

})