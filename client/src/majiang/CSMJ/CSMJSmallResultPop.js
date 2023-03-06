/**
 * Created by zhoufan on 2016/7/27.
 */
var CSMJSmallResultCell = ccui.Widget.extend({

    ctor:function(huUser,paoUser,record){
        this._super();
        var bg = new cc.Sprite("res/ui/mj/mjSmallResult/mjSmallResult_2.png");
        bg.anchorX=bg.anchorY=0;
        this.addChild(bg);
        var name = UICtor.cLabel(huUser.name, 24, cc.size(200,32), cc.color(109,70,47), 1, 1);
        name.anchorX=name.anchorY=0;
        name.x = 0;
        name.y = (bg.height-name.height)/2;
        bg.addChild(name);

        var fanStr = "";
        var score = record[2];
        if(paoUser) {
            name = UICtor.cLabel(paoUser.name, 24, cc.size(200,32), cc.color(109,70,47), 0, 1);
            name.anchorX=name.anchorY=0;
            name.x = 275;
            name.y = (bg.height-name.height)/2;
            bg.addChild(name);
            fanStr += "点炮没听牌 包3家";

            var scoreLabel = new cc.LabelBMFont("-"+score,"res/font/font_mj1.fnt");
            scoreLabel.anchorX=scoreLabel.anchorY=0;
            scoreLabel.x = 385;
            scoreLabel.y = (bg.height-scoreLabel.height)/2;
            bg.addChild(scoreLabel);
        } else {
            fanStr += "自摸吃3家";
            score = score*3;
        }
        //门清
        if (record[4] > 0) {
            fanStr += " 门清";
        }
        //硬将
        if (record[5] > 0) {
            fanStr += " 硬将";
        }
        //杠
        if (record[6] > 0) {
            fanStr += " 杠";
        }

        var scoreLabel = new cc.LabelBMFont("+"+score,"res/font/font_mj2.fnt");
        scoreLabel.anchorX=scoreLabel.anchorY=0;
        scoreLabel.x = 170;
        scoreLabel.y = (bg.height-scoreLabel.height)/2;
        bg.addChild(scoreLabel);

        fanStr +="（"+record[3]+"番）";
        name = UICtor.cLabel(fanStr, 24, cc.size(350,0), cc.color(114,92,68), 0, 0);
        name.anchorX=name.anchorY=0;
        name.x = 460;
        name.y = (bg.height-name.height)/2;
        bg.addChild(name);

        this.setContentSize(bg.width,bg.height);
    }

})
var CSMJSmallResultPop = BasePopup.extend({

    ctor: function (data,isReplay) {
        this.data = data;
        this.isHu = false;
        this.isReplay = isReplay || false;
        this.huSeat = 0;
        this._super("res/mjSmallResult.json");
    },

    createMoldPais: function(widget,user) {
        var moldPais = user.moldPais;
        var count = 0;
        this.moldInitX = 115;
        var lastX = 0;
        var height = 50;
        for (var i=0;i<moldPais.length;i++) {
            var innerObject = moldPais[i];
            var innerAction = innerObject.action;
            var tempCards = innerObject.cards;
            var innerArray = [];
            for (var ia=0;ia<tempCards.length;ia++) {
                innerArray.push(MJAI.getMJDef(tempCards[ia]));
            }
            var gangVo = null;
            if((innerAction==MJAction.AN_GANG || innerAction==MJAction.GANG) && (innerArray.length>3 || innerObject.gangVo)){
                gangVo = innerArray.pop();
            }
            var actionDiffX = 5;
            for(var j=0;j<innerArray.length;j++){
                var innerVo = innerArray[j];
                if (innerAction==MJAction.AN_GANG) {
                    innerVo.a = 1;
                }
                var card = new CSMahjong(MJAI.getDisplayVo(1,2),innerVo);
                var size = card.getContentSize();
                var _scale = 0.6;
                card.scale = _scale;
                card.x = this.moldInitX + (size.width * _scale - 0.5) * count;
                card.y = height;
                lastX = card.x;
                widget.addChild(card);

                //杠的牌需要放一张牌到上面去
                if(gangVo && j==1){
                    if(!card.getChildByTag(333)){
                        var gang = new CSMahjong(MJAI.getDisplayVo(1,2),gangVo);
                        gang.y += 12;
                        gang.scale = 1;
                        card.addChild(gang,1,333);
                    }
                }
                count++;
            }
            this.moldInitX = this.moldInitX + actionDiffX;
        }
        this.moldInitX = lastX > 0 ? lastX+60 : this.moldInitX;
    },

    createHandPais: function(widget,user) {
        var handPais = user.handPais;
        var voArray = [];
        for (var i=0;i<handPais.length;i++) {
            voArray.push(MJAI.getMJDef(handPais[i]));
        }
        voArray.sort(MJAI.sortMJ);
        var height = 50;
        for (var i=0;i<voArray.length;i++) {
            voArray[i].isJs = 1;
            var card = new CSMahjong(MJAI.getDisplayVo(1,1),voArray[i]);
            var size = card.getContentSize();
            var _scale = 0.6;
            card.scale = _scale;
            card.x = this.moldInitX + (size.width * _scale - 0.5) * i;
            card.y = height;
            widget.addChild(card);

            var id1 = -1;
            var id2 = -1;
            if(user.isHu > 1000){//长沙麻将胡两张的胡牌
                id1 = parseInt(user.isHu/1000);
                id2 = user.isHu % 1000;
            }else{
                id1 = user.isHu;
            }

            var id3 = -1;var id4 = -1;
            if(user.totalFan > 1000){//长沙麻将开4杠可以胡4张牌，借用这个字段传另外两张胡牌
                id3 = parseInt(user.totalFan/1000);
                id4 = user.totalFan % 1000;
            }else{
                id3 = user.totalFan;
            }

            cc.log("=======ttttttttttttttt======111===",user.isHu,user.totalFan,id1,id2,id3,id4);

            if (voArray[i].c == id1 || voArray[i].c == id2 || voArray[i].c == id3 || voArray[i].c == id4){
                var huImg = new cc.Sprite("res/ui/mj/mjSmallResult/mjSmallResult_15.png");
                huImg.x = size.width*0.80;
                huImg.y = size.height*0.17;
                card.addChild(huImg,1,5);
            }
        }
    },

    createHuedPais: function(widget,user) {

        var hutxt = ccui.helper.seekWidgetByName(widget,"hutxt");
        hutxt.setString("");

        var huStrArr = [];

        var dahuConfig = {0:"碰碰胡",1:"将将胡",2:"清一色",3:"海底捞月",4:"海底炮",5:"七小对",
            6:"豪华七小对",7:"杠上开花",8:"抢杠胡",9:"杠上炮",10:"全求人",11:"双豪华七小对",12:"天胡",13:"地胡",14:"门清"};
        var dahus = user.dahus || [];
        for(var i = 0;i<dahus.length;++i){
            if(dahuConfig[dahus[i]]){
                huStrArr.push(dahuConfig[dahus[i]]);
            }
        }

        var xiaohuConfig = {6:"缺一色",7:"板板胡",8:"一枝花",9:"六六顺",10:"四喜",11:"金童玉女",
            12:"节节高",13:"三同",14:"中途四喜",15:"中途六六顺"};
        var xiaohuNum = {};
        var xiaohus = user.xiaohus || [];
        for(var i = 0;i<xiaohus.length;++i){
            if(xiaohuNum[xiaohus[i]]){
                xiaohuNum[xiaohus[i]]++;
            }else{
                xiaohuNum[xiaohus[i]] = 1;
            }
        }
        for(var key in xiaohuNum){
            if(xiaohuConfig[key]){
                if(xiaohuNum[key] > 1){
                    huStrArr.push(xiaohuConfig[key] + "x" + xiaohuNum[key]);
                }else{
                    huStrArr.push(xiaohuConfig[key]);
                }
            }
        }

        if(user.birdPoint > 0 && ArrayUtil.indexOf(this.showNiaoSeatArr,user.seat) >= 0){
            huStrArr.push("中" + user.birdPoint + "鸟");
        }

        if (user.ext[0] > 0){
            huStrArr.push("飘" + user.ext[0] + "分");
        }

        if(MJRoomModel.wanfa == MJWanfaType.CSMJ){
            if(user.ext[1] > 0){
                huStrArr.push("杠分+" + user.ext[1]);
            }else if(user.ext[1] < 0){
                huStrArr.push("杠分" + user.ext[1]);
            }
        }

        if((this.isReplay && MJReplayModel.wanfa == MJWanfaType.TDH)
            || (!this.isReplay && MJRoomModel.wanfa == MJWanfaType.TDH)){
            if(user.pointArr){
                if(user.pointArr[2] > 0) huStrArr.push("杠分+" + user.pointArr[2]);
                else if(user.pointArr[2] < 0)huStrArr.push("杠分" + user.pointArr[2]);
            }
        }

        if(huStrArr.length > 9){
            huStrArr.splice(9,0,"\n");
            hutxt.y -= 10;
        }
        hutxt.setString(huStrArr.join(" "));
    },

    refreshSingle: function(widget,user){
        widget.visible = true;

        ccui.helper.seekWidgetByName(widget,"name").setString(user.name);

        //ccui.helper.seekWidgetByName(widget,"id").setString("ID:"+user.userId);
        //分数
        var pointLabel = ccui.helper.seekWidgetByName(widget,"point");
        var color = "67d4fc";
        if (user.point>0){
            color = "ff6648";
        }
        var point = user.point>0 ? "+"+user.point : ""+user.point;
        pointLabel.setString(""+point);
        pointLabel.setColor(cc.color(color+""));

        //庄家
        ccui.helper.seekWidgetByName(widget,"zhuang").visible = (user.seat==this.data.ext[7]);

        //头像
        var spritePanel = ccui.helper.seekWidgetByName(widget,"Image_icon");
        this.showIcon(spritePanel,user.icon);


        var isHu = false;
        if (user.isHu){
            isHu = true;
        }
        //胡牌
        ccui.helper.seekWidgetByName(widget,"Image_hu").visible = isHu;

        var isFanPao = false;
        if (user.fanPao){
            isFanPao = true;
        }
        //点炮
        ccui.helper.seekWidgetByName(widget,"Image_dianpao").visible = isFanPao;

        this.createMoldPais(widget, user);
        this.createHandPais(widget, user);
        this.createHuedPais(widget, user);
    },

    showIcon: function(icon,url) {
        //url = "http://wx.qlogo.cn/mmopen/25FRchib0VdkrX8DkibFVoO7jAQhMc9pbroy4P2iaROShWibjMFERmpzAKQFeEKCTdYKOQkV8kvqEW09mwaicohwiaxOKUGp3sKjc8/0";
        if (!url){
            return;
        }

        var defaultimg = "res/ui/dtz/dtzCom/default_m.png";

        if(icon.getChildByTag(345))
            icon.removeChildByTag(345);

        var size = icon.getContentSize();
        var sprite = new cc.Sprite(defaultimg);
        var scale = 0.9;
        sprite.setScale(scale);
        sprite.x = size.width*0.5;
        sprite.y = size.height*0.5;
        icon.addChild(sprite,5,345);

        cc.loader.loadImg(url,{width: 75, height:75},function(error, texture){
            if(error==null){
                sprite.setTexture(texture);
            }
        });
    },

    getUserData: function(seat) {
        var user = null;
        for (var i=0;i<this.closingPlayers.length;i++) {
            if (this.closingPlayers[i].seat == seat) {
                user = this.closingPlayers[i];
                break;
            }
        }
        return user;
    },

    createHuCell: function(huRecord) {
        var ext = huRecord.ext;
        var huUser = this.getUserData(ext[0]);
        var paoUser = ext[1] > 0 ? this.getUserData(ext[1]) : null;
        return new CSMJSmallResultCell(huUser, paoUser, ext);
    },

    selfRender: function () {
        var btnok = this.getWidget("btnok");
        UITools.addClickEvent(btnok,this,this.onOk);
        var Button_11 = this.getWidget("Button_11");
        UITools.addClickEvent(Button_11,this,this.onCheckDesktop);
        this.closingPlayers = this.data.closingPlayers;
        this.label_rule = this.getWidget("label_rule");
        var wanfaStr = "";
        if(this.isReplay){

        }else{
            if(MJRoomModel.wanfa == MJWanfaType.TDH){
                wanfaStr = ClubRecallDetailModel.getTDHWanfa(MJRoomModel.intParams);
            }else{
                wanfaStr = ClubRecallDetailModel.getCSMJWanfa(MJRoomModel.intParams);
            }
        }
        this.label_rule.setString(wanfaStr);

        if(this.label_rule.getVirtualRendererSize().height < 80){
            this.label_rule.setTextVerticalAlignment(cc.VERTICAL_TEXT_ALIGNMENT_CENTER);
            this.label_rule.setPositionY(this.label_rule.y + 10);
        }

        var iszimo = true;
        var hasXiaohu = false;
        for(var i = 0;i<this.closingPlayers.length;++i){
            if(this.closingPlayers[i].fanPao)iszimo = false;
            if(this.closingPlayers[i].xiaohus && this.closingPlayers[i].xiaohus.length > 0)hasXiaohu = true;
        }
        if(hasXiaohu)iszimo = true;

        var showSeatArr = [];
        for(var i = 0;i<this.closingPlayers.length;++i){
            if(iszimo || this.closingPlayers[i].fanPao || this.closingPlayers[i].isHu){
                showSeatArr.push(this.closingPlayers[i].seat);
            }
        }
        this.showNiaoSeatArr = showSeatArr;

        this.huList = {};
        var huList = this.data.huList;
        if(huList) {
            for (var i = 0; i < huList.length; i++) {
                var huRecord = huList[i];
                var huUser = this.getUserData(huRecord.ext[0]);
                if (!this.huList[huUser.seat]) {
                    this.huList[huUser.seat] = [];
                }
                this.huList[huUser.seat].push(huRecord);
            }
        }

        for(var j=1;j<=4;j++) {
            this.getWidget("user"+j).visible = false;
            for(var i=0;i<this.closingPlayers.length;i++){
                var user = this.closingPlayers[i];
                if(user.seat == j) {
                    this.refreshSingle(this.getWidget("user"+j),user);
                    break;
                }
            }
        }
        var zuizi = MJRoomModel.getZuiZiName(this.data.ext[10]);
        var wa = MJRoomModel.getHuCountName(this.data.ext[15]);
        var cp = MJRoomModel.getChiPengName(this.data.ext[11]);
        var ting = MJRoomModel.getTingHuName(this.data.ext[13]);
        var jianglei = MJRoomModel.getJiangLeiName(this.data.ext[18]);
        var gangjiafan = MJRoomModel.getGJFName(this.data.ext[16]);
        //this.getWidget("info").setString(csvhelper.strFormat("{0} {1} {2} {3} {4} {5}",zuizi,wa,cp,ting,jianglei,gangjiafan));

        var jushuStr = "第" + MJRoomModel.nowBurCount + "/" + MJRoomModel.totalBurCount + "局";
        var roomIdStr = "房间号：" + MJRoomModel.tableId;
        this.getWidget("info").setString(jushuStr + "   " + roomIdStr);

        if (ClosingInfoModel.isReplay){
            var jushuStr = "";
            var roomIdStr = "房间号：" + ClosingInfoModel.ext[1];
            this.getWidget("info").setString(jushuStr + "   " + roomIdStr);
        }

        //版本号
        if(this.getWidget("Label_version")){
        	this.getWidget("Label_version").setString(SyVersion.v);
        }

        this.Panel_niao = this.getWidget("Panel_niao");

        //显示鸟牌
        this.showBirds();

    },

    showBirds: function() {
        var showSeatArr = this.showNiaoSeatArr || [];

        var birdList = this.data.bird;
        var birdSeat = this.data.birdSeat;
        if (birdList){
            for(var j=0;j<birdList.length;j++) {
                var id = birdList[j];
                var mj = MJAI.getMJDef(id);
                var card = new CSMahjong(MJAI.getDisplayVo(1, 2), mj);
                var size = card.getContentSize();
                var _scale = 0.7;
                card.scale = _scale;
                card.x = (size.width * _scale - 1.5) * j;
                card.y = -15;
                this.Panel_niao.addChild(card);

                if(ArrayUtil.indexOf(showSeatArr,birdSeat[j]) < 0){
                    card._bg.setColor(cc.color.GRAY);
                }
            }
        }

    },

    onCheckDesktop:function(){
        PopupManager.remove(this);
    },

    onOk:function(){
        if(ClosingInfoModel.isReplay || !LayerManager.isInMJ()){
            if (ClosingInfoModel.isReplay){
                LayerManager.showLayer(LayerFactory.HOME);
            }
            PopupManager.remove(this);
            return;
        }
        var data = this.data;
        cc.log("data.ext[24] =",data.ext[24]);
        if(MJRoomModel.nowBurCount == MJRoomModel.totalBurCount
            || (MJRoomModel.wanfa == MJWanfaType.CSMJ && data.ext[24] == 1)
            || (MJRoomModel.wanfa == MJWanfaType.TDH && data.ext[17] == 1)){//最后的结算
            PopupManager.remove(this);
            var mc = new CSMJBigResultPop(data);
            PopupManager.addPopup(mc);
        }else{
            this.issent = true;
            sySocket.sendComReqMsg(3);
        }
    }
});

