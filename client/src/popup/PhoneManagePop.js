/**
 * Created by Administrator on 2016/6/27.
 */
var PhoneManagePop = BasePopup.extend({
    ctor: function (_type) {
        //1、当前显示手机注册
        //2、当前显示手机登录
        //3、当前显示忘记密码
        //4、当前显示修改绑定填写原密码
        //5、当前手机注册填写密码
        //6、当前显示取消绑定
        //7、当前显示修改绑定输入手机号
        //8、当前忘记密码填写新密码
        //9、当前取消绑定填写原密码
        this.phoneManageType = _type || 1;
        this.phone = "";//当前的手机号
        this.phoneCode = "";//验证码
        this.codeDt = 1;//验证码间隔
        this.codeTime = 0;//获取验证码的时间
        this._super("res/phoneManagePop.json");
    },

    selfRender: function () {

        this.phoneTitle = this.getWidget("Image_8");

        this.btnTrue = this.getWidget("Button_true");
        UITools.addClickEvent(this.btnTrue, this , this.onTrue);

        this.Button_get = this.getWidget("Button_get");
        UITools.addClickEvent(this.Button_get, this , this.onGetCode);

        var closeBtn = this.getWidget("close_btn");  // 关闭按钮
        if(closeBtn){
            UITools.addClickEvent(closeBtn,this,this.onCloseBtn);
        }

        this.Label_phone = this.getWidget("Label_phone");

        this.Label_code = this.getWidget("Label_code");
        this.Label_code.setString("");

        var inputNameImg = this.inputNameImg = this.getWidget("inputName");
        this.inputName = new cc.EditBox(cc.size(420, 70),new cc.Scale9Sprite("res/ui/dtzjulebu/julebu/inputIdBg.png"));
        this.inputName.setString("");
        this.inputName.x = inputNameImg.width/2;
        this.inputName.y = inputNameImg.height/2;
        this.inputName.setFontColor(cc.color("7D2E00"));
        this.inputName.setDelegate(this);
        this.inputName.setFont("Arial",26);
        this.inputName.setMaxLength(30);
        this.inputName.setPlaceHolder("请输入手机号");
        this.inputName.setPlaceholderFont("Arial" , 26);
        inputNameImg.addChild(this.inputName,0);


        var inputIdCardImg = this.inputIdCardImg = this.getWidget("inputIdCard");
        this.inputIdCard = new cc.EditBox(cc.size(420, 70),new cc.Scale9Sprite("res/ui/dtzjulebu/julebu/inputIdBg.png"));
        this.inputIdCard.setString("");
        this.inputIdCard.x = inputIdCardImg.width/2;
        this.inputIdCard.y = inputIdCardImg.height/2;
        this.inputIdCard.setFontColor(cc.color("7D2E00"));
        this.inputIdCard.setDelegate(this);
        this.inputIdCard.setFont("Arial",26);
        this.inputIdCard.setMaxLength(30);
        this.inputIdCard.setPlaceHolder("请输入密码");
        this.inputIdCard.setPlaceholderFont("Arial" , 26);
        inputIdCardImg.addChild(this.inputIdCard,0);

        //this.onSearch();

        this.showPhoneLayer();

        this.scheduleUpdate();

    },

    onCloseBtn:function(){
        this.unscheduleUpdate();
        PopupManager.remove(this);
    },

    update: function(dt) {
        this.codeDt = this.codeDt + dt;
        if (this.codeTime > 0){
            if (this.codeDt >= 1) {
                //cc.log("this.codeTime==" + this.codeTime);
                this.codeTime = this.codeTime - 1;
                this.codeDt = 0;
                if (this.codeTime) {
                    this.Button_get.loadTextureNormal("res/ui/dtz/phoneManagePop/phoneManagePop_19.png");
                    this.Label_code.setString(this.codeTime + "s后可以再次获取");
                } else {
                    this.Button_get.loadTextureNormal("res/ui/dtz/phoneManagePop/phoneManagePop_3.png");
                    this.Label_code.setString("");
                }
            }
        }

    },

    showPhoneLayer:function(){
        this.Button_get.visible = false;
        this.inputNameImg.visible = false;
        this.inputIdCardImg.visible = false;
//        this.inputIdCardImg.x = 386;
        this.Label_phone.setString("");
        this.inputName.setString("");
        this.inputIdCard.setString("");
        this.Label_code.setString("");

        this.codeTime = 0;

        if (this.phoneManageType == 1){
            this.Button_get.visible = true;
            this.inputNameImg.visible = true;
            this.inputIdCardImg.visible = true;
            this.inputName.setPlaceHolder("请输入手机号");
            this.inputIdCard.setPlaceHolder("请输入验证码");
            this.Button_get.loadTextureNormal("res/ui/dtz/phoneManagePop/phoneManagePop_3.png");
            this.btnTrue.loadTextureNormal("res/ui/dtz/phoneManagePop/phoneManagePop_6.png");
            this.phoneTitle.loadTexture("res/ui/dtz/phoneManagePop/phoneManagePop_8.png");
        }else if (this.phoneManageType == 2){
            var passwordStr = PhoneLoginModel.getPhonePassword();
            this.inputIdCard.setInputFlag(cc.EDITBOX_INPUT_FLAG_PASSWORD);
            var phoneStr = PhoneLoginModel.getPhone();
            this.phone = phoneStr;
            this.inputName.setString(""+phoneStr);
            this.inputIdCard.setString(""+passwordStr);
            this.Button_get.visible = true;
            this.inputNameImg.visible = true;
            this.inputIdCardImg.visible = true;
            this.Button_get.loadTextureNormal("res/ui/dtz/phoneManagePop/phoneManagePop_5.png");
            this.btnTrue.loadTextureNormal("res/ui/dtz/phoneManagePop/phoneManagePop_2.png");
            this.phoneTitle.loadTexture("res/ui/dtz/phoneManagePop/phoneManagePop_1.png");
        }else if (this.phoneManageType == 3){// 3、当前显示忘记密码
            this.Button_get.visible = true;
            this.inputNameImg.visible = true;
            this.inputIdCardImg.visible = true;
            this.inputName.setPlaceHolder("请输入手机号");
            this.inputIdCard.setPlaceHolder("请输入验证码");
            this.Button_get.loadTextureNormal("res/ui/dtz/phoneManagePop/phoneManagePop_3.png");
            this.btnTrue.loadTextureNormal("res/ui/dtz/phoneManagePop/phoneManagePop_6.png");
            this.phoneTitle.loadTexture("res/ui/dtz/phoneManagePop/phoneManagePop_4.png");
        }else if (this.phoneManageType == 4){// 4、当前显示修改密码
            this.Button_get.visible = false;
            this.inputNameImg.visible = false;
            this.inputIdCardImg.visible = true;
            var phoneStr = PhoneLoginModel.getPhone();
            this.phone = phoneStr;
            this.Label_phone.setString("原手机号："+phoneStr);
            this.inputIdCard.setPlaceHolder("请输入原密码");
            this.inputIdCardImg.x = 486;
            this.Button_get.loadTextureNormal("res/ui/dtz/phoneManagePop/phoneManagePop_3.png");
            this.btnTrue.loadTextureNormal("res/ui/dtz/phoneManagePop/phoneManagePop_6.png");
            this.phoneTitle.loadTexture("res/ui/dtz/phoneManagePop/phoneManagePop_7.png");
        }else if (this.phoneManageType == 5){
            this.inputNameImg.visible = true;
            this.inputIdCardImg.visible = true;
//            this.inputNameImg.x = 386;
//            this.inputIdCardImg.x = 486;
            this.inputName.setPlaceHolder("请输入6-20位数字+字母的组合密码");
            this.inputIdCard.setPlaceHolder("请再次输入新密码");
            this.Button_get.loadTextureNormal("res/ui/dtz/phoneManagePop/phoneManagePop_3.png");
            this.btnTrue.loadTextureNormal("res/ui/dtz/phoneManagePop/phoneManagePop_18.png");
            this.phoneTitle.loadTexture("res/ui/dtz/phoneManagePop/phoneManagePop_17.png");
        }else if (this.phoneManageType == 6){// 6、取消绑定
            this.Button_get.visible = true;
            this.inputNameImg.visible = false;
            this.inputIdCardImg.visible = true;
            var phoneStr = PhoneLoginModel.getPhone();
            this.phone = phoneStr;
            this.Label_phone.setString("原手机号："+phoneStr);
            this.inputIdCard.setPlaceHolder("请输入验证码");
//            this.inputIdCardImg.x = 386;
            this.Button_get.loadTextureNormal("res/ui/dtz/phoneManagePop/phoneManagePop_3.png");
            this.btnTrue.loadTextureNormal("res/ui/dtz/phoneManagePop/phoneManagePop_18.png");
            this.phoneTitle.loadTexture("res/ui/dtz/phoneManagePop/phoneManagePop_7.png");
        }else if (this.phoneManageType == 7){// 4、当前显示修改手机号输入手机号
            this.Button_get.visible = true;
            this.inputNameImg.visible = true;
            this.inputIdCardImg.visible = true;
            this.inputName.setPlaceHolder("请输入手机号");
            this.inputIdCard.setPlaceHolder("请输入验证码");
            this.Button_get.loadTextureNormal("res/ui/dtz/phoneManagePop/phoneManagePop_3.png");
            this.btnTrue.loadTextureNormal("res/ui/dtz/phoneManagePop/phoneManagePop_18.png");
            this.phoneTitle.loadTexture("res/ui/dtz/phoneManagePop/phoneManagePop_7.png");
        }else if (this.phoneManageType == 8){
            this.inputNameImg.visible = true;
            this.inputIdCardImg.visible = true;
//            this.inputNameImg.x = 386;
//            this.inputIdCardImg.x = 486;
            this.inputName.setPlaceHolder("请输入6-8位数字+字母的组合密码");
            this.inputIdCard.setPlaceHolder("请再次输入新密码");
            this.Button_get.loadTextureNormal("res/ui/dtz/phoneManagePop/phoneManagePop_3.png");
            this.btnTrue.loadTextureNormal("res/ui/dtz/phoneManagePop/phoneManagePop_18.png");
            this.phoneTitle.loadTexture("res/ui/dtz/phoneManagePop/phoneManagePop_4.png");
        }else if (this.phoneManageType == 9){// 9、取消绑定
            this.Button_get.visible = false;
            this.inputNameImg.visible = false;
            this.inputIdCardImg.visible = true;
            var phoneStr = PhoneLoginModel.getPhone();
            this.phone = phoneStr;
            this.Label_phone.setString("原手机号："+phoneStr);
            this.inputIdCard.setPlaceHolder("请输入原密码");
            this.inputIdCardImg.x = 486;
            this.Button_get.loadTextureNormal("res/ui/dtz/phoneManagePop/phoneManagePop_3.png");
            this.btnTrue.loadTextureNormal("res/ui/dtz/phoneManagePop/phoneManagePop_6.png");
            this.phoneTitle.loadTexture("res/ui/dtz/phoneManagePop/phoneManagePop_7.png");
        }

    },

    onGetCode:function(){
        if (this.codeTime > 0){
            return;
        }
        cc.log("this.phoneManageType===",JSON.stringify(this.phoneManageType));
        var params = {};
        params.userId = PlayerModel.userId;
        var phoneStr = this.inputName.getString();
        var functionName = "getVerifyCode";
        if (this.phoneManageType == 1){
            params.functionType = 1;//绑定
        }else if (this.phoneManageType == 2){
            this.phoneManageType = 3;
            this.showPhoneLayer();
            return;
        }else if (this.phoneManageType == 3){
            functionName = "getVerifyCode2";
        }else if (this.phoneManageType == 6){
            phoneStr = this.phone;//手机号
            functionName = "getVerifyCode1";
        }else if (this.phoneManageType == 7){
            functionName = "getVerifyCode";
            params.functionType = 2;//更换手机
        }
        params.phoneNum = phoneStr;//手机号

        cc.log("phoneStr===",phoneStr)
        var self = this;
        Network.loginReq(
            "user",functionName,params,
            function(data){
                //cc.log(functionName+"=========",JSON.stringify(data));
                //this.phoneCode = "";
                self.codeTime = 60;
                self.phone = phoneStr;
            },
            function(data){
                if (data.message){
                    FloatLabelUtil.comText(""+data.message);
                }
            }
        );

    },

    onTrue:function(){
        if (this.phoneManageType == 1){
            this.onPhoneRegistry(1);
        }else if (this.phoneManageType == 2){
            this.onPhoneLogin();
        }else if (this.phoneManageType == 3){
            this.onPhoneRegistry(4);
        }else if (this.phoneManageType == 4){
            //this.phoneManageType = 7;
            //this.showPhoneLayer();
            //return;
            ////this.onVerifyPhone();
            this.onVerifyPhonePw();
        }else if (this.phoneManageType == 5){//填写密码
            this.onConfirmRegistry();
        }else if (this.phoneManageType == 6){//取消绑定手机号
            this.onPhoneRegistry(2);
        }else if (this.phoneManageType == 7){//更换手机号
            this.onPhoneRegistry(3);
        }else if (this.phoneManageType == 8){//更换密码
            this.onConfirmRegistry();
        }else if (this.phoneManageType == 9){//更换密码
            this.onVerifyPhonePw();
        }
    },

    onPhoneRegistry:function(_type){
        var codeType = _type || 1;//1：绑定2：解绑，3：更改绑定，4：忘记密码（不需要传userId和sessCode字段或传空字符串）
        var codeStr = this.inputIdCard.getString();
        var params = {};
        params.userId = PlayerModel.userId;
        params.verifyCode = codeStr;//验证码
        params.codeType = codeType;//验证码
        var self = this;
        if (codeStr && codeStr != ""){
            Network.loginReq(
                "user","verifyCode",params,
                function(data){
                    //cc.log("verifyCode===",JSON.stringify(data));
                    if (data.message){
                        FloatLabelUtil.comText(""+data.message);
                    }
                    if (self.phoneManageType == 6){
                        PlayerModel.phoneNum = 0;
                        self.onCloseBtn();
                    }else{
                        if (codeType == 4){
                            self.phoneManageType = 8;
                        }else{
                            self.phoneManageType = 5;
                        }
                        self.showPhoneLayer();
                    }
                },
                function(data){
                    if (data.message){
                        FloatLabelUtil.comText(""+data.message);
                    }
                }
            );
        }

    },

    onPhoneLogin:function(){
        var phonestr = this.inputName.getString();
        var passwordStr = this.inputIdCard.getString();
        sy.login.realLogin({u:phonestr,c:"",ps:passwordStr,phoneLogin:true});
    },

    onVerifyPhonePw:function(){
        var passwordStr = this.inputIdCard.getString();
        var params = {};
        params.userId = PlayerModel.userId;
        params.password = passwordStr;//密码
        var self = this;
        if (passwordStr && passwordStr != ""){
            Network.loginReq(
                "user","verifyPhonePw",params,
                function(data){
                    //cc.log("verifyPhonePw===",JSON.stringify(data));
                    if (data.message){
                        FloatLabelUtil.comText(""+data.message);
                    }
                    if (self.phoneManageType == 9){
                        self.phoneManageType = 6;
                    }else if (self.phoneManageType == 4){
                        self.phoneManageType = 7;
                    }
                    self.showPhoneLayer();
                },
                function(data){
                    if (data.message){
                        FloatLabelUtil.comText(""+data.message);
                    }
                }
            );
        }else{
            FloatLabelUtil.comText("密码不能为空");
        }
    },

    onChangePassword:function(){

    },

    onVerifyPhone:function(){

    },

    onChangePhone:function(){

    },

    onConfirmRegistry:function(){
        var passwordStr = this.inputName.getString();
        var passwordRepStr = this.inputIdCard.getString();
        var self = this;
        if (passwordStr && passwordStr != ""){
            if (this.isNumberOr_Letter(passwordStr)) {
                if (passwordRepStr == passwordStr) {
                    var params = {};
                    params.userId = PlayerModel.userId;
                    params.password = passwordStr;//密码
                    params.phoneNum = self.phone;//手机号
                    Network.loginReq(
                        "user", "uploadPassword", params,
                        function (data) {
                            cc.log("uploadPassword===", JSON.stringify(data));
                            PhoneLoginModel.setPhone(self.phone);
                            PhoneLoginModel.setPhonePassword(passwordStr);
                            var str = "绑定成功";
                            if (self.phoneManageType == 8){
                                str = "修改成功";
                            }else {
                                PlayerModel.phoneNum = self.phone;
                            }
                            if (data.message) {
                                FloatLabelUtil.comText("" + str);
                            }
                            self.onCloseBtn();
                        },
                        function (data) {
                            if (data.message) {
                                FloatLabelUtil.comText("" + data.message);
                            }
                        }
                    );
                } else {
                    FloatLabelUtil.comText("两次的密码不一致");
                }
            }else {
                FloatLabelUtil.comText("密码格式错误");
            }
        }else{
            FloatLabelUtil.comText("密码不能为空");
        }


    },

    isNumberOr_Letter:function(s){
        var regu = "^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,20}$"
        var re = new RegExp(regu)
        if (re.test(s)) {
            return true;
        }else{
            return false;
        }


    },


});
