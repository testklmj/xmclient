/**
 *  显示弹框基类
 * 	子类需实现selfRender方法
 * 
 */	
var BasePopup = cc.Layer.extend({

	_customEvents:null,

	ctor : function(json){
		cc.log("json====",json)
		this._super();
		this.json = json;
		this._customEvents = {};
		this.loadComplete();
	},
	
	/**
	 * 加载完成后初始化UI
	 * 
	 */	
	loadComplete : function(){
		this.root = ccs.uiReader.widgetFromJsonFile(this.json);
		this.addChild(this.root);
		var closeBtn = this.getWidget("close_btn");  // 关闭按钮
		if(closeBtn){
			UITools.addClickEvent(closeBtn,this,this.onCloseHandler);
		}
		var closeBtn1 = this.getWidget("close_btn1");// 关闭按钮1
		if(closeBtn1){
			UITools.addClickEvent(closeBtn1,this,this.onCloseHandler);
		}
		var mainmask = this.mainmask = this.getWidget("mainMask");
		this.mainpopup = this.getWidget("mainPopup");
		if(this.mainpopup){
			this.mainpopup.setTouchEnabled(true);
		}
		if(mainmask){
			UITools.addClickEvent(mainmask,this,this.onCloseHandler);
		}
		if(this["constructor"] != BasePopup){  // 如果构造类不是BasePopup
			this.selfRender();
		}
	},
	
	/**
	 * 基本UI初始化完成 子类继续
	 * 
	 */	
	selfRender : function(){
		throw new Error("Please implement selfRender method");
	},
	
	/**
	 * 获取内部元素
	 * @param name  部件名
	 */	
	getWidget : function(name){
		return ccui.helper.seekWidgetByName(this.root,name);
	},
	
	/**
	 * 关闭后调用 （子类重写）
	 * 
	 */	
	onClose : function(){
	},
	
	/**
	 * 打开后调用 （子类重写）
	 * 
	 */	
	onOpen : function(){
		
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

	onDealClose:function(){
		var events = [];
		for(var key in this._customEvents){
			events.push(key);
		}
		this.removeEvents(events);
	},
	
	onCloseHandler : function(){
		PopupManager.remove(this);
	},
	shareCard:function(RoomModel,PlayerModel,shareID){
		var obj={};
		obj.tableId=RoomModel.tableId;
		obj.userName=PlayerModel.username;
		//obj.callURL=SdkUtil.SHARE_URL+'?num='+RoomModel.tableId+'&userId='+encodeURIComponent(PlayerModel.userId);
		var jtf = RoomModel.tableType==1?"   亲友圈房间":"";
		var wanfaStr= "麻将";
		cc.log("11111111RoomModel.wanfa::",RoomModel.wanfa);
		switch (RoomModel.wanfa){
			case 113:
			case 114://打筒子
			case 115:
			case 116:
			case 117:
			case 118:
			case 210:
			case 211:
			case 212:
				wanfaStr= "打筒子";
				break;
			case 15:
			case 16:
				wanfaStr= "跑得快";
				break;
			case PHZGameTypeModel.SYZP://邵阳字牌
				wanfaStr= "邵阳字牌";
				break;
			case PHZGameTypeModel.SYBP://邵阳剥皮
				wanfaStr= "邵阳剥皮";
				break;
			case PHZGameTypeModel.LDFPF://娄底放炮罚
				wanfaStr= "娄底放炮罚";
				break;
			case 131:
				wanfaStr= "半边天炸";
				break;
			case MJWanfaType.HZMJ:
				wanfaStr= "红中麻将";
				break;
			case MJWanfaType.SYMJ:
				wanfaStr= "邵阳麻将";
				break;
		}
		obj.title=wanfaStr+'战绩   房号：'+RoomModel.tableId +jtf;
		obj.description="本局玩家 ";
		obj.callURL=SdkUtil.SHARE_CAED_URL+shareID;
		for(var i=0;i<this.data.length;i++){
			var d = this.data[i];
			obj.description=obj.description+ d.name+" ";
		}
		cc.log(obj.callURL);
		obj.shareType=1;
		obj.session = 0;
		cc.log(JSON.stringify(obj));
		SdkUtil.sdkFeed(obj,true);
	},
})