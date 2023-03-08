/**
 * Created by Administrator on 2016/6/27.
 */
var XiuFuPop = BasePopup.extend({

    ctor: function () {
        this._super("res/xiufuPop.json");
    },

    selfRender: function () {
        this.Button_36 = this.getWidget("Button_36");
        this.getWidget("Label_35").setString(this.data);
        UITools.addClickEvent(this.Button_36,this,this.onOk);
        this.main2 = this.getWidget("main2");
		this.inputBg_0 = this.getWidget("inputBg_0");

		this.TextField_13 = this.setEditBox("请输入连接","",425,324,this.main2);
    },

    getConfig:function(){
        var url_ = this.TextField_13.getString();
        this.TextField_13.setString("");
        if (url_.search(/configList.json/) < 0){
            FloatLabelUtil.comText("格式错误，请重新输入");
            return
        }

        var self = this;
        var url = url_;
        var xhr = cc.loader.getXMLHttpRequest();
        xhr.open("GET", url);
        xhr.timeout = 12000;
        xhr.setRequestHeader("Content-Type","application/x-www-form-urlencoded;charset=utf-8");
        var self = this;
        var onerror = function(){
            PopupManager.remove(self);
            xhr.abort();
        };
        xhr.onerror = onerror;
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4) {
                if(xhr.status == 200){
                    var configData = decodeURIComponent(xhr.responseText);
                    self.writeLocalConfig(configData)
                }else{
                    onerror.call(self)
                }
            }else {
                onerror.call(self)
            }
        }
        xhr.send();
    },

    writeLocalConfig:function(configData){
        if (jsb.fileUtils.isFileExist("res/config/configList.json")) {
           var isWritten = jsb.fileUtils.writeStringToFile(configData, "res/config/configList.json");
           if (isWritten){
//               cc.log("写入成功");
               this.exitGame()
           }else{
                this.onOk();
           }
        }else{
//            cc.log("读取失败");
            this.onOk();
        }
    },

    onOk:function(){
        this.getConfig();
    },

    setEditBox:function(holder,str,_x,_y,_parent){
        var textf=new cc.EditBox(cc.size(680, 60),new cc.Scale9Sprite("res/ui/dtzjulebu/clubRecallPop/img_4.png"));
        textf.x=_x;
        textf.y=_y;
        _parent.addChild(textf);
        textf.setPlaceHolder(holder);
        textf.setString(str);
        textf.setFontColor(cc.color(255, 255, 255));
        return textf;
    },


    exitGame:function(){
        if(SyConfig.isIos()){
            ios_sdk_exit();
        }else{
            SdkUtil.sdkExit();
            cc.director.end();
        }
    },
});




