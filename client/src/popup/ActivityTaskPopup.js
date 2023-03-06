/**
 * Created by Administrator on 2016/6/27.
 */
var ActivityTaskPopup = BasePopup.extend({
	panel:null,
    ctor: function () {
    	this._super("res/activityTask.json");
    },

    selfRender: function () {
    	//邀请码
    	this.panel = this.getWidget("mainPopup");
    	this.maBtn=this.getWidget("Button_15");
    	this.maInput=this.setEditBox("", "", 565, 153,310,42, this.panel);
    	this.maInput.maxLength=11;
    	UITools.addClickEvent(this.maBtn,this,this.onCheckMa);
 	
    },
    setEditBox:function(holder,str,_x,_y,_w,_h,_parent){
    	var textf=new cc.EditBox(cc.size(_w,_h),new cc.Scale9Sprite("res/ui/dtz/images/btn_26.png"));
    	textf.x=_x;
    	textf.y=_y;
    	_parent.addChild(textf);
    	textf.setPlaceHolder(holder);
    	textf.setString(str);
    	textf.setFontColor(cc.color(255, 255, 255));
    	textf.setPlaceholderFontColor(cc.color(255, 255, 255));
    	return textf;
    },
    onCheckMa:function(){
    	var str=this.maInput.getString();
    	if(str.length!=11){
    		return FloatLabelUtil.comText("手机号码错误，请输入正确的手机号码！");
    	}
    	if(str.substr(0,1)!="1"){
    		return FloatLabelUtil.comText("手机号码错误，请输入正确的手机号码！");
    	}
    	if(!/^[0-9]*$/.test(str)){
    		return FloatLabelUtil.comText("手机号码错误，请输入正确的手机号码！");
    	}
    	this.checkMa(str);
    },
    checkMa:function(str){
    	sy.scene.showLoading("正在检测");
		var __this = this;
		var url = csvhelper.strFormat(SyConfig.LOGIN_URL,"qipai","exec");
		Network.sypost(url,"exec",{actionType:3,funcType:1,phoneCode:str},
    		function(data){
	    		sy.scene.hideLoading();
	    		AlertPop.showOnlyOk("领取成功!请在微信客户端确认奖励");
	    	},function(data){
	    		sy.scene.hideLoading();
    			if(data.msg){
    				FloatLabelUtil.comText(data.msg);
    			}else{
    				FloatLabelUtil.comText("检测失败");
    			}
	    	}
    	);
    }
});