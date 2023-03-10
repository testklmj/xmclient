/**
 * Created by zhoufan on 2016/1/9.
 */
var ComResponder = BaseResponder.extend({
    respond:function(message) {
		var code = message.code;
		cc.log("ComResponder::"+JSON.stringify(message));
		switch (code) {
			case 0://通用提示
				if(message.strParams.length>0){
					FloatLabelUtil.comText(message.strParams[0]);
				}
				break;
			case 1:
				sySocket.isCrossServer = false;
				IMSdkUtil.gotyeRestoreFinish = true;
				//是否开放奖赏钻石
				PlayerModel.canZszs = message.params[9] == 1;
				PingClientModel.connectSuc();
				var urlScheme = "";
				var roomId = 0;
				var matchRoomId = 0;
				var matchTime = 0;
				GameData.channelId = message.strParams[5] || 0;
				SyEventManager.dispatchEvent(SyEvent.DISAGREE_APPLYEXITROOM);
				if(PopupManager.hasClassByPopup(ApplyExitRoomPop)){
					PopupManager.removeClassByPopup(ApplyExitRoomPop);
				}
				if(message.strParams.length>0){
					roomId = parseInt(message.strParams[0]);
					matchRoomId = parseInt(message.strParams[3]);
					if (matchRoomId || parseInt(matchRoomId) > 0){
						if(PopupManager.hasClassByPopup(MacthTipPop)){
							SyEventManager.dispatchEvent(SyEvent.REMOVE_MATCH_LOADING,{});
							//PopupManager.removeClassByPopup(MacthTipPop);
						}
						if(PopupManager.hasClassByPopup(ClubHomePop)){
							PopupManager.removeClassByPopup(ClubHomePop);
						}
						if (message.params[8]){
							matchTime = message.params[8];
						}
						var matchData = {};
						matchData.matchClubId = matchRoomId;
						matchData.matchTime = matchTime;
						var mc = new ClubHomePop(null,matchData);
						PopupManager.addPopup(mc);
					}else if(roomId > 0){
						sySocket.sendComReqMsg(1,[]);
					}else if(roomId==0){
						if(LayerManager.isInRoom()){//可能还在房间里面或者登陆界面
							if(PopupManager.hasClassByPopup(AlertPop)){
								PopupManager.removeClassByPopup(AlertPop);
							}
							if(PopupManager.hasClassByPopup(DTZRoomSetPop)){
								PopupManager.removeClassByPopup(DTZRoomSetPop);
							}
							if(PopupManager.hasClassByPopup(AlertPopRichText)){
								PopupManager.removeClassByPopup(AlertPopRichText);
							}



							if(PopupManager.hasClassByPopup(MatchPdkSmallResultPop)){
								PopupManager.removeClassByPopup(MatchPdkSmallResultPop);
							}

							if((LayerManager.isInDTZ() && !DTZRoomModel.isMoneyRoom()  && !DTZRoomModel.isMatchRoom()) ||
								(LayerManager.isInPDK() && !PDKRoomModel.isMoneyRoom() && !PDKRoomModel.isMatchRoom()) ||
								(LayerManager.isInPHZ() && !PHZRoomModel.isMoneyRoom())){//非金币场模式才提示
								FloatLabelUtil.comText("您的房间已解散");
							}

							LayerManager.showLayer(LayerFactory.DTZ_HOME);
						}else if(LayerManager.getCurrentLayer()==LayerFactory.LOGIN){//防止在登录界面卡死的情况
							//LayerManager.showLayer(LayerFactory.HALL);
							LayerManager.showLayer(LayerFactory.DTZ_HOME);
						}
					}
					var setup = message.strParams[1];
					if(setup){
						setup = setup.split(",");
						var setup0 = parseInt(setup[0])==0 ? 0 : 50;
						var setup1 = parseInt(setup[1])==0 ? 0 : 50;
						PlayerModel.isMusic = setup[2] ? parseInt(setup[2]) : setup0;
						PlayerModel.isEffect = setup[3] ? parseInt(setup[3]) : setup1;
						var bgMusic = PlayerModel.musicType = setup[4] ? parseInt(setup[4]) : 2;
						if(LayerManager.isInRoom()){
							bgMusic = 2;
							if (LayerManager.isInPHZ()){
								bgMusic = 3;
							}


						}else{
							bgMusic = 1;

						}
						AudioManager.reloadFromData(PlayerModel.isMusic,PlayerModel.isEffect,bgMusic);
					}
					urlScheme = message.strParams[2];
				}
				SyEventManager.dispatchEvent(SyEvent.SOCKET_OPENED,{urlscheme:urlScheme,roomId:roomId});
				if(message.params.length>0){
					var param0 = message.params[0];
					var param1 = message.params[3];
					cc.log("当前的钻石 ， 金币" , param0 , param1);
					PlayerModel.correctCards(param0);
					PlayerModel.correctCoin(param1);
				}
				break;
			case 2://牌桌上的成员状态改变
				SyEventManager.dispatchEvent(SyEvent.PLAYER_STATUS_CHANGE,message);
				break;
			case 3://错误提示
				sy.scene.hideLoading();
				if(message.params.length>0){
					var param0 = message.params[0];
					var param1 = message.strParams[0];
					if(param0==1){//账号冲突
						GameData.conflict = true;
//						if (!param1 || param1 == GameData.channelId){
//							AlertPop.showOnlyOk("帐号冲突，请重新登录！",function(){
//							    sySocket.disconnect();
//								sy.scene.exitGame();
//							})
//						}else{
//						    AlertPop.showOnlyOk("网络波动，请重新登录！",function(){
//						        sySocket.disconnect();
//                                sy.scene.exitGame();
//                            })
//						}
						return;
					}else if(param0==2){//登录自动进入房间失败
						LayerManager.showLayer(LayerFactory.DTZ_HOME);
					}else if(param0==3){//checkcode错误
						NetErrorPop.show(true);
					}else if(param0==97){//取消快速匹配界面
						var stateParams = [0];
						SyEventManager.dispatchEvent(SyEvent.CLUB_SHOW_MATCH_TIP,stateParams);
					}else if(param0==100){
						PopupManager.removeClassByPopup(MatchAlertPop);
						AlertPop.showOnlyOk(message.strParams[0]);
					}else if(param0 > 99){
						//掉线情况 打牌人的手牌
						SyEventManager.dispatchEvent(SyEvent.REFRESH_HANDLES,message.params);
					}
				}else{ //李周说要这么弄
					SyEventManager.dispatchEvent(SyEvent.UPDATE_JLB);
				}

				if(message.strParams.length>0){
					FloatLabelUtil.comText(message.strParams[0]);
				}
				break;
			case 4://解散房间的提醒

				if(!LayerManager.isInRoom()){
					cc.log("玩家已经不再房间了 不在清理弹出框 也不在构建弹出框！！！！！！！！！！！！！！");
					return;
				}
				if(PopupManager.hasClassByPopup(AlertPopRichText))
					PopupManager.removeClassByPopup(AlertPopRichText);

				if(PopupManager.hasClassByPopup(ApplyExitRoomPop))
					PopupManager.removeClassByPopup(ApplyExitRoomPop);

				var isPHZ = (LayerManager.getCurrentLayer()==LayerFactory.PHZ_ROOM || LayerManager.getCurrentLayer()==LayerFactory.PHZ_ROOM_MORE || LayerManager.getCurrentLayer()==LayerFactory.PHZ_ROOM_LESS);
				var isPDK = (LayerManager.getCurrentLayer()==LayerFactory.PDK_ROOM);
				var isDTZ = (LayerManager.getCurrentLayer()==LayerFactory.DTZ_ROOM);
				var isBBT = (LayerManager.getCurrentLayer()==LayerFactory.BBT_ROOM);
				var isDDZ = (LayerManager.getCurrentLayer()==LayerFactory.DDZ_ROOM);
				var isMJ = (LayerManager.isInMJ());
				var gameType = 1;//1 打筒子 2 跑胡子 3跑得快
				if(isPHZ){
					gameType = 2;
				}else if(isPDK){
					gameType = 3;
				}else if(isDTZ){
					gameType = 1;
				}else if(isBBT){
					gameType = 10;
				}else if(isDDZ){
					gameType = 7;
				}else if(isMJ){
					gameType = 220;
				}
				SyEventManager.dispatchEvent(SyEvent.DISAGREE_APPLYEXITROOM);
				ApplyExitRoomModel.init(message);
				var mc = new ApplyExitRoomPop(gameType);
				//PopupManager.addPopup(mc);
				sy.scene.floatlayer.addChild(mc);

				break;
			case 5://确认解散房间
				//var wanfa = message.params[0];
				SyEventManager.dispatchEvent("shazhu_hide");
				var isClubRoom = message.params[1];
				var curCount = 1;
				if(message.params.length >= 3){
					curCount = message.params[2];
				}
				cc.log("curCount..." , curCount);
				SyEventManager.dispatchEvent(SyEvent.DISAGREE_APPLYEXITROOM);
				if(PopupManager.hasClassByPopup(ApplyExitRoomPop)){
					PopupManager.removeClassByPopup(ApplyExitRoomPop);
				}

				if(PopupManager.hasClassByPopup(AlertPop)){
					PopupManager.removeClassByPopup(AlertPop);
				}

				if(PopupManager.hasClassByPopup(pdkRoomSetPop)){
					PopupManager.removeClassByPopup(pdkRoomSetPop);
				}

				if(PopupManager.hasClassByPopup(DTZRoomSetPop)){
					PopupManager.removeClassByPopup(DTZRoomSetPop);
				}

				if(PopupManager.hasClassByPopup(PHZSetUpPop)){
					PopupManager.removeClassByPopup(PHZSetUpPop);
				}


				var isReleaseFromRoom = (LayerManager.getCurrentLayer() != LayerFactory.DTZ_HOME);//是否是从房间内请求解散
				LayerManager.showLayer(LayerFactory.DTZ_HOME);

				if(isClubRoom > 0 && isReleaseFromRoom == false  ){//wan
					SyEventManager.dispatchEvent(SyEvent.CLUB_DELETE_ONE, {});
					//cc.log("从俱乐部直接解散 刷新即可...");
				}else if(isClubRoom > 0 && curCount == 0 && isReleaseFromRoom ){//是从俱乐部大厅解散的 直接刷新即可
					PopupManager.removeClassByPopup(ClubHomePop);
					var mc = new ClubHomePop();
					PopupManager.addPopup(mc);
					//cc.log("从俱乐部房间内解散 直接打开俱乐部界面...");
				}

				IMSdkUtil.sdkLoginOutRoom();
				GPSModel.hasClickGpsBtn = false;
				break;

			case 6://有人不同意解散
				SyEventManager.dispatchEvent(SyEvent.DISAGREE_APPLYEXITROOM);
				if(PopupManager.hasClassByPopup(ApplyExitRoomPop))
					PopupManager.removeClassByPopup(ApplyExitRoomPop);
				var userId = message.strParams[0];
				var name = message.strParams[1];
				if(PlayerModel.userId != userId){
					AlertPop.showOnlyOk(name+" 不同意解散房间！")
				}
				SyEventManager.dispatchEvent(SyEvent.SHOW_ZHANKAI);
				break;
			case 7://快捷聊天
				if(message.params[2]>0){
					var seat = message.params[2];
					var userId= message.strParams[0];
					var content = message.strParams[1];
					SyEventManager.dispatchEvent(SyEvent.DOUNIU_INTERACTIVE_PROP, {seat: seat, userId: userId, content: content});
				}else {
					var id = message.params[0];
					var userId = message.strParams[0];
					var content = "";
					if (id > 0) {
						if (LayerManager.isInDTZ()) {
							DTZRoomSound.fixMsg(userId, id);
						}else if(LayerManager.isInPDK()){
							RoomSound.fixMsg(userId , id);
						}else if(LayerManager.getCurrentLayer()==LayerFactory.PHZ_ROOM || LayerManager.getCurrentLayer() == LayerFactory.PHZ_ROOM_MORE
							|| LayerManager.getCurrentLayer() == LayerFactory.PHZ_MONEY_ROOM || LayerManager.getCurrentLayer() == LayerFactory.PHZ_ROOM_LESS){
							PHZRoomSound.fixMsg(userId,id);
						}else if(LayerManager.getCurrentLayer()==LayerFactory.BBT_ROOM){
							BBTRoomSound.fixMsg(userId,id);
						}else if(LayerManager.isInDDZ()){
							DdzRoomSound.fixMsg(userId,id);
						}else if(LayerManager.isInMJ()){
							MJRoomSound.fixMsg(userId,id);
						}
					} else {
						content = message.strParams[1];
					}
					SyEventManager.dispatchEvent(SyEvent.ROOM_FAST_CHAT, {id: id, userId: userId, content: content});
				}
				break;
			case 8://离线状态通知
				SyEventManager.dispatchEvent(SyEvent.ONLINE_OFFLINE_NOTIFY , message.params);
				break;
			case 9://结算确认消息
				SyEventManager.dispatchEvent(SyEvent.SETTLEMENT_SUCCESS);
				break;
			case 10://房卡更新
				var value = message.params[0];
				PlayerModel.updateCards(value);
				break;
			case 11://幸运抽奖
				var data = {};
				if(message.params && message.strParams){
					data.turnNum = message.params[0];
					data.loginDays = message.params[1];
					data.costCards = message.strParams[0];
					data.awardList = JSON.parse(message.strParams[1]);
					LuckDrawModel.init(data);
				}
				var mc = new LuckDrawPop();
				PopupManager.addPopup(mc);
				break;
			case 12://抽奖转盘数值
				if(message.params){
					LuckDrawModel.updataLuckDrawNum(message.params[0]);
					LuckDrawModel.updataTurnNum(message.params[1]);
				}
				SyEventManager.dispatchEvent(SyEvent.LUCKDRAW_TURNNMU);
				break;
			case 13://领取登录奖励
				if(message.params){
					if(message.params[0] == 1){
						if(message.strParams){
							LuckDrawModel.updataAwardList(JSON.parse(message.strParams));
						}
					}
				}
				SyEventManager.dispatchEvent(SyEvent.LUCKDRAW_AWARD);
				break;
			case 14://退出房间
				//var wanfa = message.params[0];
				cc.log("玩家退出房间" , message.strParams[0]);
				if(PopupManager.hasClassByPopup(pdkRoomSetPop)){
					PopupManager.removeClassByPopup(pdkRoomSetPop);
				}
				var userId = message.strParams[0];
				var isClubRoom = message.params[3] || 0;
				var isPHZ = (LayerManager.getCurrentLayer()==LayerFactory.PHZ_ROOM ||
				LayerManager.getCurrentLayer()==LayerFactory.PHZ_ROOM_MORE ||
				LayerManager.getCurrentLayer() == LayerFactory.PHZ_ROOM_LESS ||
				LayerManager.getCurrentLayer() == LayerFactory.PHZ_MONEY_ROOM);
				var isPDK = (LayerManager.getCurrentLayer()==LayerFactory.PDK_ROOM || LayerManager.getCurrentLayer() == LayerFactory.PDK_MONEY_ROOM);
				var isBBT = (LayerManager.getCurrentLayer()==LayerFactory.BBT_ROOM);
				var isDDZ = (LayerManager.getCurrentLayer()==LayerFactory.DDZ_ROOM || LayerManager.getCurrentLayer()==LayerFactory.DDZ_MONEY_ROOM);
				var isMJ = (LayerManager.isInMJ());
				if(userId == PlayerModel.userId){
				    SyEventManager.dispatchEvent("shazhu_hide");
					GPSModel.hasClickGpsBtn = false;
					LayerManager.showLayer(LayerFactory.DTZ_HOME);
					cc.log("isClubRoom.." , isClubRoom);
					if(isClubRoom && isClubRoom > 0){//是俱乐部房间
						PopupManager.removeClassByPopup(ClubHomePop);
						var mc = new ClubHomePop();
						PopupManager.addPopup(mc);
					}
					IMSdkUtil.sdkLoginOutRoom();
				}else{
					if(isPHZ){
						PHZRoomModel.exitRoom(userId);
					}else if(isPDK){
						PDKRoomModel.exitRoom(userId);
					}else if(isBBT){
						BBTRoomModel.exitRoom(userId);
					}else if(isDDZ){
						DdzRoomModel.exitRoom(userId);
					}else if(isMJ){
						MJRoomModel.exitRoom(userId);
					}else{
						DTZRoomModel.exitRoom(userId);
					}
				}

				break;
			case 15://服务器重启
				//AlertPop.showOnlyOk(message.strParams[0]);
				break;
			case 16://战绩
				cc.log("查询战绩服务器下发数据..." , JSON.parse(message.strParams[0]));
				if(message.params[0] > 0){
					PopupManager.removeClassByPopup(DTZTotalRecordPop);
					var mc = new DTZTotalRecordPop(JSON.parse(message.strParams[0]));
					TotalRecordModel.init(JSON.parse(message.strParams[0]));
					PopupManager.addPopup(mc);
				}else if(message.params[0] == 0){
					var data = JSON.parse(message.strParams[0]);
					var playLog = data.playLog;
					var playType = 8;
					if(playLog.length > 0){
						cc.log("playLog[0].playType..." , playLog[0].playType);
						playType = playLog[0].playType;
					}

					var mc = null;
					var dtzWanfas = [113,114,115,116,117,118];
					if(DTZRoomModel.isDTZ(playType)){
						if(!DTZRoomModel.is4Ren(playType)){
							mc = new DTZ3RecordPop(JSON.parse(message.strParams[0]));
						}else{
							mc = new DTZRecordPop(JSON.parse(message.strParams[0]));
						}
					}else if(playType == 16 || playType == 15 ){
						mc = new PDKRecordPop(JSON.parse(message.strParams[0])); // PHZRecordPop PDKRecordPop
					}else if(playType == PHZGameTypeModel.SYZP || playType == PHZGameTypeModel.SYBP || playType == PHZGameTypeModel.LDFPF){
						mc = new PHZRecordPop(JSON.parse(message.strParams[0]));
					}else if(playType == 131){
						mc = new BBTRecordPop(JSON.parse(message.strParams[0]));
					}
					RecordModel.init(JSON.parse(message.strParams[0]));
					PopupManager.open(mc,true);
				}
				break;
			case 17://弹出 海底选择框
				SyEventManager.dispatchEvent(SyEvent.CS_HAIDI,message);
				break;
			case 18://抽奖增加红点提醒\消息增加红点提醒
				if(ArrayUtil.indexOf(message.params, 1) >= 0){//1代表新消息
					var value = {fal:true,index:1};
					ShowTipsModel.updataData(value)
					SyEventManager.dispatchEvent(SyEvent.NEW_TIPS,value);
				}
				if(ArrayUtil.indexOf(message.params, 2) >= 0){//2代表可抽奖
					var value = {fal:true,index:2};
					ShowTipsModel.updataData(value)
					SyEventManager.dispatchEvent(SyEvent.NEW_TIPS,value);
				}
				break;
			case 19://即时通讯
				if(message.strParams[0]){
					PaoMaDengModel.init(JSON.parse(message.strParams[0]));
				}
				break;
			case 20://比赛场等待界面
				MatchWaitModel.init(JSON.parse(message.strParams));
				var mc = new MatchWaitingPop();
				PopupManager.open(mc);
//				SyEventManager.dispatchEvent(SyEvent.UPDATE_WAITING);
				break;
			case 21://比赛场链接
				var matchId = parseInt(message.strParams[0]);
				var matchUrl = message.strParams[1];
				if(matchId>0){
//					var mc = new MatchTipsPop();
//					PopupManager.open(mc);
					if(matchId>0 && matchUrl){
						if(sySocket.url != matchUrl){
							sySocket.url = matchUrl;
							sySocket.isCrossServer = true;
							sySocket.disconnect(function(){
								sySocket.connect();
							});
						}else{
							sySocket.sendComReqMsg(1,[]);
						}
					}
				}
				break;
			case 22://有人下注了
				//[5,3]
				SyEventManager.dispatchEvent(SyEvent.DOUNIU_XIA_ZHU,message.params);
				break;
			case 23://斗牛当前状态更新
				DNRoomModel.updateStatus(message.params[0]);
				break;
			case 24://有人抢庄了
				//[5,1]
				SyEventManager.dispatchEvent(SyEvent.DOUNIU_ZHUANG_RECEIVE,message.params);
				break;
			case 25://放弃庄家
				//SyEventManager.dispatchEvent(SyEvent.DOUNIU_QI_ZHUANG,message.params);
				break;
			case 26://庄家定了
				DNRoomModel.decideZhuang(message.params[0],JSON.parse(message.strParams[0]));
				break;
			case 27://亮牌
				SyEventManager.dispatchEvent(SyEvent.DOUNIU_LIANG_PAI,message.params[0]);
				break;
			case 28://推送放招数据
				var data = {};
				data.userId = message.strParams[0];
				data.fangzhao = parseInt(message.strParams[1]);
				PHZRoomModel.setFangZhao(data);
				break;
			case 29://推送放招弹框
				PHZRoomModel.isShowFangZhao(message.params[0]);
				break;
			case 31://代开房间
				if(message.params[0]==1) {
					Network.loginReq("qipai","exec",{actionType:6,funcType:1}, function(data){
						sy.scene.hideLoading();
						if(data){
							dkRecordModel.init(data);
							var mc = new DaiKaiRoomPop();
							PopupManager.open(mc,false);
						}
					},function(){
						sy.scene.hideLoading();
						//提示
					});

				}
				break;
			case 35://创建房间和加入房间的链接
				ServerUtil.smartChooseSocketUrl(JSON.parse(message.strParams[0]));
				break;
			case 36://更新定位信息
				var userId = message.strParams[0];
				var gps = message.strParams[1];
				var fzId = message.strParams[2];//房主ID
				var nowBurCount = 0;
				if(userId == PlayerModel.userId){
					PlayerModel.gps = gps;
				}else{
					var curLayer = LayerManager.getCurrentLayer();
					switch (curLayer){
						case LayerFactory.DTZ_ROOM:
							DTZRoomModel.updateGPS(userId,gps);
							break;
						case LayerFactory.PHZ_ROOM:
						case LayerFactory.PHZ_ROOM_MORE:
						case LayerFactory.PHZ_ROOM_LESS:
							nowBurCount = PHZRoomModel.nowBurCount;
							PHZRoomModel.updateGPS(userId,gps);
							break;
						case LayerFactory.PDK_ROOM:
							PDKRoomModel.updateGPS(userId , gps);
							break;
						case LayerFactory.BBT_ROOM:
							BBTRoomModel.updateGPS(userId , gps);
							break;
						case LayerFactory.DDZ_ROOM:
							DdzRoomModel.updateGPS(userId , gps);
							break;
					}
				}
				GPSModel.updateGpsData(userId,gps,true);
				cc.log("gps::"+JSON.stringify(message.strParams));
				break;
			case 37://语音消息 某个玩家录制了语音 后台推送给我 播放该语音
				//var seat = message.params[0];
				//var userId = message.strParams[0];
				//var fileId = message.strParams[1];
				GvoiceMessageSeq.receive(message);
				break;
			case 81:
				SyEventManager.dispatchEvent(SyEvent.DI_DIZHU_PAI,message.params[0]);
				break;
			case 82:
				DdzRoomModel.ResetPlayerStatus(message.params[0],message.params[1],message.params[2]);
				DdzRoomModel.updateStatus(2);
				break;
			case 83:
				DdzRoomModel.updateStatus(message.params[0]);
				break;
			case 85: //接收到地主底牌与地主座位号
				var handers = JSON.parse(message.strParams);
				DdzRoomModel.decideZhuang(message,handers);
				SyEventManager.dispatchEvent(SyEvent.FRESH_HANDLES,message);
				break;
			case 84:
				SyEventManager.dispatchEvent(SyEvent.UPDATE_BEI_SHU,message.params[0]);
				break;
			case 87:
				SyEventManager.dispatchEvent(SyEvent.CHUN_TIAN,message.params[0]);
				break;
			case 95:
				//字符串数组下标1为数据类型（小于0包厢列表，等于0（默认）当前俱乐部的房间及玩法信息，大于0该包厢的房间及玩法信息）
				var strParams = message.strParams;
				var jsonData = JSON.parse(strParams);
				if (jsonData.room != 0 ){
					SyEventManager.dispatchEvent(SyEvent.GET_CLUB_BAGS,message);
				}else{
					SyEventManager.dispatchEvent(SyEvent.GET_CLUB_ROOMS,message.strParams);
				}
				break;
			case 96:
				SyEventManager.dispatchEvent(SyEvent.CLUB_ROOM_DETAILPOP,message);
				//PopupManager.addPopup(new ClubRoomDetailPop());
				break;
			case 97:
				var matchClubId = parseInt(message.strParams[0]);
				if (matchClubId > 0){
					SyEventManager.dispatchEvent(SyEvent.CLUB_SHOW_MATCH_TIP,message.params);
				}
				break;
			case 100:
				var params = message.params;//0：操作类型  1:最大人数 2：当前人数  3：剩余人数 5分享报名
				var strParams = message.strParams;
				var data = [];
				//0:0获取列表信息1报名2退出3获取比赛场详细信息
				if (params[0] == 0) {
					MatchModel.init(message.strParams);
					//李周说取第0位，
					var wanfaStr = strParams[2];
					var wanfaIdex = 1;
					if (wanfaStr == "jjs_dtz"){
						MatchCfgModel.initDtz(strParams[0]);
						wanfaIdex = 1;
					}else if(wanfaStr == "jjs_share_pdk"){
						MatchCfgModel.initPdk(strParams[0]);
						wanfaIdex = 2;
					}
					cc.log("wanfaStr=="+wanfaStr);
					UITools.setLocalItem("sy_dtz_matchPage" , wanfaIdex);
					if(LayerManager.getCurrentLayer() == LayerFactory.MATCH_HOME_LAYER){
						SyEventManager.dispatchEvent(SyEvent.MATCH_RECORD_DATA, {});
					}else{
						PopupManager.removeAll();
						LayerManager.showLayer(LayerFactory.MATCH_HOME_LAYER);
						var layer = LayerManager.getLayer(LayerFactory.MATCH_HOME_LAYER);
						layer.initData();
					}
				}else if(params[0] == 1){
					cc.log("LayerManager.getCurrentLayer() =="+LayerManager.getCurrentLayer())
					if(PopupManager.hasClassByPopup(MatchApplyPop)){
						data.push({status:params[0],maxRenshu: params[1], curRenshu: params[2],
							matchType: strParams[0], keyId: strParams[1]});
						SyEventManager.dispatchEvent(SyEvent.MATCH_REFRESH_RENSHU,data);
					}else {
						var matchData = JSON.parse(strParams[3]);
						data.push({status:1,maxRenshu: params[1], curRenshu: params[2], matchType: strParams[0], keyId: strParams[1],
							award:JSON.parse(strParams[2]),shared:1,
							matchPay:matchData.matchPay});
						PopupManager.removeAll();
						MatchApplyModel.init(data);
						var mc = new MatchApplyPop(true);
						PopupManager.addPopup(mc);
					}
				}else if(params[0] == 2){//退赛成功
					if(PopupManager.hasClassByPopup(MatchApplyPop)){
						data.push({status: params[0], maxRenshu: params[1], curRenshu: params[2],
							matchType: strParams[0], keyId: strParams[1]});
						SyEventManager.dispatchEvent(SyEvent.MATCH_REFRESH_RENSHU, data);
					}else {
						LayerManager.showLayer(LayerFactory.DTZ_HOME);
					}
				}else if(params[0] == 5){//分享报名
					SyEventManager.dispatchEvent(SyEvent.MATCH_REFRESH_APPLY, strParams);
				}
				break;
			case 107://比赛场人数变动
				var params = message.params;
				var strParams  = message.strParams;
				var childCode = params[0];
				if(childCode == 0){//淘汰消息
					//PopupManager.removeAll();
					if(strParams.length > 0 &&strParams[0]!= ""){
						MatchAwardModel.init(message);
						setTimeout(function(){
							//cc.log("弹出MatchAwardPop");
							if (MatchAwardModel.getData() && !PopupManager.hasClassByPopup(MatchAwardPop)){
								PopupManager.addPopup(new MatchAwardPop(message));
							}
						},6000);
					}else {
						MatchResultModel.init(message);
						//被淘汰了，且不符合复活资格
						setTimeout(function(){
							if (MatchResultModel.getData() && !PopupManager.hasClassByPopup(MatchAlertPop)){
								MatchAlertPop.showOnlyOk(params[2]);
							}
						},6000);
					}
				}else if(childCode == 1){//晋级消息
					var round = params[1];//第几阶段 0是预赛 1是复赛 2 是决赛
					if (round == 0)
						SyEventManager.dispatchEvent(SyEvent.MATCH_UP_TIP);
				}else if(childCode == 2){//最终排名 1：当前轮数 2：自己的排名  3：总人数
					PopupManager.removeAll();
					if(strParams.length > 0){//奖励
						MatchAwardModel.init(message);
						setTimeout(function(){
							//cc.log("弹出这个MatchAwardPop");
							if (MatchAwardModel.getData() && !PopupManager.hasClassByPopup(MatchAwardPop)){
								PopupManager.addPopup(new MatchAwardPop(message));
							}
						},6000);
					}
					//MatchAlertPop.show(params[2]);
				}else if(childCode == 3) {//int数组,1：轮数,2：剩余牌桌数 3玩法
					//if (params[1] == 0){
						var wanfa = params[3] || 16;
						PopupManager.addPopup(new MatchRoomWaitPop(wanfa,params[2]));
						if (PopupManager.hasClassByPopup(MatchRoomWaitPop)){
							SyEventManager.dispatchEvent(SyEvent.MATCH_REFRESH_WAIT, params[2]);
						}else{
							PopupManager.addPopup(new MatchRoomWaitPop(wanfa,params[2]));
						}
					//}
				}else if(childCode == 4) {//1：最大人数 2：当前人数 3：剩余人数  strParams：0：matchType 1：比赛场ID
					var data = [];
					data.push({maxRenshu: params[1], curRenshu: params[2], matchType: strParams[0], keyId: strParams[1]});
					SyEventManager.dispatchEvent(SyEvent.MATCH_REFRESH_RENSHU, data);
				}else if(childCode == 5) {//排名变动消息s
					MatchModel.saveResultRank(params);
					SyEventManager.dispatchEvent(SyEvent.MATCH_REFRESH_RANK, params);
				}else if(childCode == 6) {//复活成功
					PopupManager.removeClassByPopup(MatchAlertPop);
					AlertPop.showOnlyOk(strParams[0]);
				}else if(childCode == 7) {//被淘汰了，且可以复活的状态
					//被淘汰了
					MatchResultModel.init(message);
					setTimeout(function(){
						if (MatchResultModel.getData() && !PopupManager.hasClassByPopup(MatchAlertPop)){
							MatchAlertPop.show(params[1]);
						}
					},6000);
				}
				break;
			case 114:
				// var fal = parseInt(message.strParams[5]);//1表示未签到
				// var temp = parseInt(message.strParams[6]);//1表示在房间里
				// SignInModel.init(message.params,message.strParams);
				// if(temp != 1 && !SdkUtil.isReview()) {
				// 	//if (fal == 1  ) {
				// 	//	var mc = new SignInPop();
				// 	//	PopupManager.open(mc);
				// 	//}else if (fal == 0) {
				// 	//	if (PlayerModel.payBindId == "") {
				// 	//		//var mc = new InvitationCodePop();
				// 	//		//PopupManager.open(mc);
				// 	//	}
				// 	//	ActivityModel.sendOpenActivityMsg();
				// 	//	//ShareDailyPop.show();
				// 	//}
				// 	if(ShareDailyModel.hasOpenByPushMsg == false){
				// 		ShareDailyModel.hasOpenByPushMsg = true;
				// 		ActivityModel.sendOpenActivityMsg();
				// 		//var mc = new RepresentPop();
				// 		//PopupManager.addPopup(mc);
				// 	}
				// }

				ActivityModel.sendOpenActivityMsg();
				break;
			case 115:
				SyEventManager.dispatchEvent(SyEvent.QIANDAO,message.params);
				break;
			case 119: //代开房主主动解散房间成功
				//不出牌
				/*
				var isRoomLayer = (LayerManager.getCurrentLayer() === LayerFactory.ROOM);
				if(isRoomLayer){
					var roomLayer = LayerManager.getCurrentLayerObj();
					roomLayer.visibleOpButton(false);
				}*/
				SyEventManager.dispatchEvent(SyEvent.DAIKAI_REFRESH);
				break;
			case 120: //开始分组
				var isRoomLayer = (LayerManager.isInDTZ());
				if(isRoomLayer){
					var roomLayer = LayerManager.getCurrentLayerObj();
					roomLayer.onChoiceTeam(message.params);
					cc.log("choiceTeam::"+JSON.stringify(message));
				}
				break;
			case 121: //有玩家选择了分组
				var isRoomLayer = (LayerManager.isInDTZ());
				if(isRoomLayer){
					var roomLayer = LayerManager.getCurrentLayerObj();
					roomLayer.onPlayerChoiceTeamCard(message.params);
					cc.log("playerChoiceTeamCard::"+JSON.stringify(message));
				}
				break;
			case 122: //后台推送分组完成
				var isRoomLayer = (LayerManager.isInDTZ());
				if(isRoomLayer){
					var roomLayer = LayerManager.getCurrentLayerObj();
					roomLayer.onUpdatePlayerMsg(message.params);
					cc.log("onUpdatePlayerMsg::"+JSON.stringify(message));
				}
				break;
			case 123: //一圈结束 三家要不起 一家(一组)获得分 清空当前牌局积分
				var isRoomLayer = (LayerManager.isInDTZ());
				if(isRoomLayer){
					SyEventManager.dispatchEvent(SyEvent.DTZ_DEAL_SCORE,message.params);
					//var roomLayer = LayerManager.getCurrentLayerObj();
					//roomLayer.onDealScore(message.params);
					cc.log("onDealScore::"+JSON.stringify(message));
				}
				break;
			case 124: //不出牌
				if(LayerManager.isInDTZ()){
					var roomLayer = LayerManager.getCurrentLayerObj();
					roomLayer.resGiveUp();
				}
				break;
			case 125: //设置玩家头像名次
				var isRoomLayer = (LayerManager.isInDTZ());
				if(isRoomLayer){
					var roomLayer = LayerManager.getCurrentLayerObj();
					roomLayer.showWinNumber(message.params);
				}
				break;
			case 128://显示玩家状态
				cc.log("后台推送显示玩家状态...");
				var isRoomLayer = (LayerManager.isInDTZ());
				if(isRoomLayer && DTZRoomModel.is4Ren()){
					cc.log("后台发送显示玩家的数据为:" , JSON.stringify(message.strParams))
					var roomLayer = LayerManager.getCurrentLayerObj();
					roomLayer.showPlayersStates(message.strParams);
				}
				break;
			case 130:
				var noteData = JSON.parse(message.strParams);
				PopupManager.addPopup(new DTZCardNote(noteData));
				break;
			case 132://玩家托管状态发生改变
				//cc.log("UPDATE_TUOGUAN",JSON.stringify(message));
				SyEventManager.dispatchEvent(SyEvent.UPDATE_TUOGUAN,message.params);
				//var noteData = JSON.parse(message.strParams);
				//PopupManager.addPopup(new DTZCardNote(noteData));
				break;
			case 133://二次托管
				//cc.log("UPDATE_TUOGUAN_TIME",JSON.stringify(message));
				//SyEventManager.dispatchEvent(SyEvent.UPDATE_TUOGUAN_TIME,message.params);
				break;
			case 134:
				//cc.log("*************1")
				//字符串数组下标1为数据类型（小于0包厢列表，等于0（默认）当前俱乐部的房间及玩法信息，大于0该包厢的房间及玩法信息）
				var strParams = message.strParams;
				var jsonData = JSON.parse(strParams);
				if (jsonData.room != 0 ){
					SyEventManager.dispatchEvent(SyEvent.GET_CLUB_BAGS,message);
				}
				break;
			case 135:
				//cc.log("*************2")
				//字符串数组下标1为数据类型（小于0包厢列表，等于0（默认）当前俱乐部的房间及玩法信息，大于0该包厢的房间及玩法信息）
				var strParams = message.strParams;
				var jsonData = JSON.parse(strParams);
				if (jsonData.room != 0 ){
					SyEventManager.dispatchEvent(SyEvent.GET_CLUB_ROOMS,message);
				}
				break;
			case 160:
				BBTRoomModel.updateStatus(message.params);
				break;
			case 161://锤
				BBTRoomModel.rreshChuiStatus(message.params);
				break;
			case 162://开枪投降
				BBTRoomModel.rreshKaiqStatus(message.params);
				break;
			case 163://抢和不强庄
				BBTRoomModel.rreshRobberStatus(message.params);
				break;
			case 164://庄的位置
				if(message.strParams.length > 0){
					BBTRoomModel.decideZhuang(message.params[0],JSON.parse(message.strParams[0]));
				}else{
					BBTRoomModel.decideZhuang(message.params[0]);
				}

				break;
			case 165://陂和不陂
				BBTRoomModel.rreshTuStatus(message.params);
				break;
			case 166:///** 推送本轮结束 */
				if(message.params.length > 0){
					BBTRoomModel.FixScore(message.params);
				}
				SyEventManager.dispatchEvent(SyEvent.CLEAN_CURLUN);
				break;
			case 200:///** 比赛场历史战绩 */
				var params = message.params;
				var strParams  = message.strParams;
				var dataType = params[0];
				if (dataType == 0){
					var mc = new MatchRecordPop(strParams);
					PopupManager.addPopup(mc);
				}else if(dataType == 1){
					var mc = new MatchRankPop(strParams);
					PopupManager.addPopup(mc);
				}

				break;
			case 205://推送可飘分的状态
				SyEventManager.dispatchEvent(SyEvent.PIAO_FEN,message);
				break;
			case 206://推送玩家选择飘分
				SyEventManager.dispatchEvent(SyEvent.SELECT_PIAO_FEN,message);
				break;
			case 210:///** 托管推送 */
				//0是座位1是否托管（1是0否）2倒计时时间3.是否是自己托管（1是0否）
				var params = message.params;
				SyEventManager.dispatchEvent(SyEvent.UPDATE_TUOGUAN,message.params);
				break;
			case 211:///** 加锤推送 */
				SyEventManager.dispatchEvent(SyEvent.SYMJ_JIACHUI_STATE,message);
				break;
			case 214:///** 加锤选择回应 */
				SyEventManager.dispatchEvent(SyEvent.SYMJ_JIACHUI,message);
				break;
			case 251:/**后台通知所有桌上玩家 请求GPS数据**/
				cc.log("收到广发通知 发起GPSSDK定位请求!!!!!!!!!!!!");
				GPSSdkUtil.startLocation();
				break;
			case 300:///** 礼品兑换列表 */
				var params = message.params;
				var strParams  = message.strParams;
				var dataCode = params[0];
				if (dataCode == 2){
					if (PopupManager.hasClassByPopup(DTZGiftExchangePop)){
						SyEventManager.dispatchEvent(SyEvent.REFRESH_TASKGIFT_LIST, message);
					}else{
						var mc = new DTZGiftExchangePop(message);
						PopupManager.addPopup(mc);
					}
				}else if (dataCode == 4){//领取任务礼券
					FloatLabelUtil.comText("领取成功");
					SyEventManager.dispatchEvent(SyEvent.REFRESH_ALLGIFT_NUM, message);
				}else if (dataCode == 5){//兑换礼品
					SyEventManager.dispatchEvent(SyEvent.REFRESH_ALLGIFT_NUM, message);
				}else if (dataCode == 8){//兑换记录
					var mc = new DTZGiftRecordPop(strParams);
					PopupManager.addPopup(mc);
				}
				break;
			case 301://前端出牌 但是后台检测异常 补回那张牌
				//var fixCardId = JSON.parse(message.strParams);
				var fixCardId = JSON.parse(message.params);
				SyEventManager.dispatchEvent(SyEvent.FIX_OUT_CARD,message);
				cc.log("后台下发 修正出牌错误的ID:" , fixCardId);
				break;
			case 400://服务器推送，前端隐藏操作
				SyEventManager.dispatchEvent(SyEvent.PHZ_HIDE_ACTION,message);
				break;
			case 306://长沙麻将别人操作小胡后，通知庄家可出牌
				SyEventManager.dispatchEvent(SyEvent.PLAY_CARD_AFTER_XIAOHU,message);
				break;
			case 903:
				var value = message.strParams[1];
				cc.log("刷新金币..." , message.strParams[0] , message.strParams[1]);
				PlayerModel.correctCoin(value);
				break;
			//后台应允打开金币场大厅界面
			case 905:
				cc.log("comresp 905");
				SyEventManager.dispatchEvent(SyEvent.GOTO_MONEY_HOME,{});
				break;
			case 906:
				break;
			case 1100://金币场 匹配失败
				sy.scene.hideLoading();
				FloatLabelUtil.comText("积分场匹配失败");
				SyEventManager.dispatchEvent(SyEvent.REMOVE_MONEY_LOADING , {});
				break;
			case 1101://金币场 正在匹配
				//sy.scene.showLoading("正在匹配玩家...");
				break;
			case 1103://金币场相关提示
				var eventTag = message.params[0];
				var desc = message.strParams[0];
				if(eventTag == 2 && LayerManager.isInRoom()){//没有钱了 触发补救 打筒子暂时
					LayerManager.showLayer(LayerFactory.DTZ_HOME);
					SyEventManager.dispatchEvent(SyEvent.REMOVE_MONEY_LOADING , {});
					AlertPop.show(desc, function(){
						PayPop.show(2)
					});
				}

				if(eventTag == 1 && !LayerManager.isInRoom()){//没有钱了并且 补救次数用光 //!LayerManager.isInRoom()、
					LayerManager.showLayer(LayerFactory.DTZ_HOME);
					SyEventManager.dispatchEvent(SyEvent.REMOVE_MONEY_LOADING , {});
					AlertPop.show(desc, function(){
						PayPop.show(2)
					});
				}

				if(eventTag == 3){
					FloatLabelUtil.comText(desc);
				}

				//FloatLabelUtil.comText(message.strParams[0]);
				break;
			case 1104:
				//cc.log("创建多个房间成功 刷新当前的俱乐部信息 和俱乐部房间列表");
				SyEventManager.dispatchEvent(SyEvent.UPDATE_CLUB_LIST,message.params);
				//PopupManager.removeClassByPopup(ClubCreateRoom);
				break;
			case 1907:
				//获取金币场商品配置
				cc.log("获取金币场配置1907..." , JSON.stringify(message.params));
				var msgType = message.params[0];
				var configType = message.params[1];
				if(msgType == 0 &&configType == 0 ){//获取金币场 金币兑换钻石配置表
					SyEventManager.dispatchEvent(SyEvent.GET_DIAMONDTOMONEY_ITEMS,message.strParams);
				}else if(msgType == 0 && configType == 1){// 获取金币场 钻石兑换金币配置表
					SyEventManager.dispatchEvent(SyEvent.GET_MONEYTODIAMOND_ITEMS,message.strParams);
				}else if(msgType == 1 && configType == 0){
					SyEventManager.dispatchEvent(SyEvent.BUY_MONEY_ITEMS,message.strParams);
				}else if(msgType == 1 && configType == 1){
					SyEventManager.dispatchEvent(SyEvent.BUY_DIAMOND_ITEM,message.strParams);
				}
				break;
			case 1908:
				//cc.log("获取金币场配置1908..." , JSON.stringify(message.strParams));
				var wanfaDesc = message.strParams[1];
				//根据玩法进行配置初始化

				var configs = [];
				var wanfaTags = [];
				for(var index = 0 ; index < message.strParams.length ; index++){
					//两个为一组
					if(index % 2 == 0){
						configs.push(message.strParams[index]);
					}else{
						wanfaTags.push(message.strParams[index]);
					}
				}
				//cc.log("config!!!!" , configs , wanfaTags);

				if(configs.length == wanfaTags.length){
					if(PopupManager.hasClassByPopup(DTZGiftExchangePop)){
						PopupManager.removeClassByPopup(DTZGiftExchangePop);
					}
					var tAllConfig = [];
					for(var index = 0 ; index < configs.length ; index ++){
						var tWanfaTag = wanfaTags[index];
						var tConfig = configs[index];
						if(tWanfaTag == "dtz"){
							DTZMoneyCfgModel.initDtz(tConfig);
							tAllConfig = DTZMoneyCfgModel.getDtzConfig();
						}else if(tWanfaTag == "pdk"){
							DTZMoneyCfgModel.initPdk(tConfig);
							tAllConfig = DTZMoneyCfgModel.getPdkConfig();
						}else if(tWanfaTag == "phz"){
							DTZMoneyCfgModel.initPhz(tConfig);
							tAllConfig = DTZMoneyCfgModel.getPhzConfig();
						}else if(tWanfaTag == "ddz"){
							DTZMoneyCfgModel.initDdz(tConfig);
							tAllConfig = DTZMoneyCfgModel.getDdzConfig();
						}
					}
					SyEventManager.dispatchEvent(SyEvent.GET_MONEY_CONFIG , {});
				}else{
					FloatLabelUtil.comText("获取积分场配置异常");
				}
				break;
			case 1141://钻石奖赏功能推送
				SyEventManager.dispatchEvent("Zszs_Back",message);
				break;
			case 6007:/**可否调牌权限请求*/
                SyEventManager.dispatchEvent("shazhu_show",message);
                break;
            case 6009:/**获取剩余牌数*/
                SyEventManager.dispatchEvent("shazhu_data",message);
                break;
		}
	}
})