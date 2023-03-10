/**
 * Created by mayn on 2019/5/8.
 */

var CreditScoreUserItem = ccui.Widget.extend({
    ctor:function(){

        this._super();
        this.setContentSize(956, 114);

        var Panel_21=this.Panel_21= UICtor.cPanel(cc.size(956,104),cc.color(150,200,255),0);
        Panel_21.setAnchorPoint(cc.p(0,0));
        Panel_21.setPosition(0,0);

        var itemBg=this.itemBg= UICtor.cImg("res/ui/dtzjulebu/julebu/Credit/img_1.png");
        itemBg.setPosition(478,52);
        Panel_21.addChild(itemBg);

        //var itemBg = UICtor.cImg("res/ui/dtzjulebu/julebu/Credit/tiao1.png");
        //itemBg.setPosition(this.width/2,this.height/2);
        //this.addChild(itemBg);

        this.imgHead = UICtor.cImg("res/ui/dtz/images/default_m.png");
        this.imgHead.setPosition(60,itemBg.height/2);
        this.imgHead.setScale(0.7);
        itemBg.addChild(this.imgHead);

        this.nameLabel= UICtor.cLabel("玩家的名字长一点看看",26,cc.size(180,30),cc.color("238B76"),0,0);
        this.nameLabel.setAnchorPoint(0,0.5);
        this.nameLabel.setPosition(this.imgHead.x + 40,itemBg.height/2 + 15);
        itemBg.addChild(this.nameLabel);

        this.idLabel= UICtor.cLabel("12345678",26,cc.size(0,0),cc.color("238B76"),0,0);
        this.idLabel.setAnchorPoint(0,0.5);
        this.idLabel.setPosition(this.nameLabel.x,itemBg.height/2 - 15);
        itemBg.addChild(this.idLabel);

        this.scoreLabel= UICtor.cLabel("12345678",26,cc.size(0,0),cc.color("238B76"),0,0);
        this.scoreLabel.setPosition(itemBg.width/2 - 50,itemBg.height/2);
        itemBg.addChild(this.scoreLabel);

        this.upPlayerIdLabel = UICtor.cLabel("----",26,cc.size(0,0),cc.color("238B76"),0,0);
        this.upPlayerIdLabel.setPosition(itemBg.width/2 + 150,itemBg.height/2);
        itemBg.addChild(this.upPlayerIdLabel);

        this.detailBtn= UICtor.cBtn("res/ui/dtzjulebu/julebu/Credit/mingxi.png");
        this.detailBtn.setPosition(itemBg.width - 100,itemBg.height/2);
        itemBg.addChild(this.detailBtn);

        this.addChild(Panel_21);

        UITools.addClickEvent(this.detailBtn,this,this.onClickDetailBtn);

    },

    setData:function(data){
        this.itemData = data;

        this.nameLabel.setString(data.userName);
        this.idLabel.setString("ID:" + data.userId);
        this.scoreLabel.setString(data.credit);
        this.showIcon(this.imgHead,data.headimgurl);

        var upIds = "";
        if(data.teamLeaderId){
            upIds+=("组长:" + data.teamLeaderId);
        }
        if(data.preUserId){
            if(upIds){
                upIds += "\n";
            }
            upIds += ("上级:" + data.preUserId);
        }
        if(!upIds)upIds = "----";
        this.upPlayerIdLabel.setString(upIds);

        //cc.log("upIds===",upIds);
    },

    showIcon: function (imgNode,iconUrl, sex) {
        //iconUrl = "http://wx.qlogo.cn/mmopen/25FRchib0VdkrX8DkibFVoO7jAQhMc9pbroy4P2iaROShWibjMFERmpzAKQFeEKCTdYKOQkV8kvqEW09mwaicohwiaxOKUGp3sKjc8/0";
        var sex = sex || 1;
        var defaultimg = (sex == 1) ? "res/ui/dtz/images/default_m.png" : "res/ui/dtz/images/default_m.png";

        var spr = imgNode.getChildByName("icon_spr");
        if(!spr){
            spr = new cc.Sprite(defaultimg);
            spr.setName("icon_spr");
            spr.setPosition(imgNode.width/2,imgNode.height/2);
            spr.setScale(imgNode.width/spr.width);
            imgNode.addChild(spr);
        }

        if (iconUrl) {

            cc.loader.loadImg(iconUrl, {width: 252, height: 252}, function (error, img) {
                if (!error) {
                    spr.setTexture(img);
                    spr.setScale(imgNode.width/spr.width);
                }
            });
        }else{
            spr.initWithFile(defaultimg);
        }
    },

    onClickDetailBtn:function(){
        if(this.itemData){
            SyEventManager.dispatchEvent("Show_Credit_User_Detail",this.itemData);
        }
    }
});

var CreditScoreDetailItem = ccui.Widget.extend({
    ctor:function(){
        this._super();
        this.setContentSize(956, 114);


        var Panel_21=this.Panel_21= UICtor.cPanel(cc.size(956,104),cc.color(150,200,255),0);
        Panel_21.setAnchorPoint(cc.p(0,0));
        Panel_21.setPosition(0,0);

        var itemBg=this.itemBg= UICtor.cImg("res/ui/dtzjulebu/julebu/Credit/img_1.png");
        itemBg.setPosition(478,52);
        Panel_21.addChild(itemBg);

        this.scoreLabel= UICtor.cLabel("0",26,cc.size(0,0),cc.color("238B76"),0,0);
        this.scoreLabel.setPosition(70,itemBg.height/2);
        itemBg.addChild(this.scoreLabel);

        this.remainScore= UICtor.cLabel("0",26,cc.size(0,0),cc.color("238B76"),0,0);
        this.remainScore.setPosition(220,itemBg.height/2);
        itemBg.addChild(this.remainScore);

        this.labelType= UICtor.cLabel("增减分",22,cc.size(0,0),cc.color("238B76"),1,0);
        this.labelType.setPosition(410,itemBg.height/2 + 22);
        itemBg.addChild(this.labelType);

        this.labelOptName= UICtor.cLabel("玩家比较长的名字看看",22,cc.size(180,26),cc.color("238B76"),1,0);
        this.labelOptName.setPosition(410,itemBg.height/2);
        itemBg.addChild(this.labelOptName);

        this.labelOptId= UICtor.cLabel("(ID:12345678)",22,cc.size(0,0),cc.color("238B76"),1,0);
        this.labelOptId.setPosition(410,itemBg.height/2 - 22);
        itemBg.addChild(this.labelOptId);

        this.wanfaName= UICtor.cLabel("娄底放炮罚的玩法",26,cc.size(0,0),cc.color("238B76"),0,0);
        this.wanfaName.setPosition(itemBg.width/2 + 170,itemBg.height/2);
        itemBg.addChild(this.wanfaName);

        this.timeLabel= UICtor.cLabel("2019-05-06\n18:04",26,cc.size(0,0),cc.color("238B76"),1,0);
        this.timeLabel.setPosition(itemBg.width - 90,itemBg.height/2);
        itemBg.addChild(this.timeLabel);

        this.addChild(Panel_21);
    },

    setData:function(data){
        var score = data.credit;
        if(score > 0)score = "+" + score;
        this.scoreLabel.setString(score);
        this.remainScore.setString(data.curCredit);
        this.labelType.setString(data.type == 1?"转移比赛分":data.type == 2?"赠送分":"输赢分");
        this.timeLabel.setString(this.formatTime(data.createdTime));
        var roomName = UITools.dealNameLength(data.roomName,7);
        this.wanfaName.setString(roomName || "----");

        if(data.optUserId){
            this.labelOptId.setString("(ID:" + data.optUserId + ")");
            this.labelOptName.setString(data.userName);
        }else{
            this.labelOptName.setVisible(false);
            this.labelOptId.setVisible(false);
            this.labelType.setPositionY(this.itemBg.height/2);
        }
    },

    formatTime:function(timeStr){
        var data = new Date(timeStr);
        var year = data.getFullYear();
        var month = data.getMonth() + 1;
        var day = data.getDate();

        var hour = data.getHours();
        var min = data.getMinutes();
        var sec = data.getSeconds();

        if(month < 10)month = "0" + month;
        if(day < 10)day = "0" + day;
        if(hour < 10)hour = "0" + hour;
        if(min < 10)min = "0" + min;
        if(sec < 10)sec = "0" + sec;

        var str = year + "-" + month + "-" + day + "\n" + hour + ":" + min;
        return str;
    },
});