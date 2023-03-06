/**
 * Created by zhoufan on 2016/12/7.
 */
var PHZRoomSound = {

    getLetOutPath:function(sex,audioName){
        var sex = (sex==1) ? "man/" : "woman/";
    	var path = "shaoyang/" + sex;
        var soundPath = "res/audio/phz/"+path+audioName+".mp3";
        if (PHZSetModel.yyxz == 2){
            path = sex;
            soundPath = "res/audio/phz/"+path+audioName+".wav";
        }else if (PHZSetModel.yyxz == 3){
            path = "changde/";
            soundPath = "res/audio/phz/"+path+audioName+".wav";
        }
        return soundPath;
    },

    getActionPath:function(sex,audioName){
        var sex = (sex==1) ? "man/" : "woman/";
        var path = "shaoyang/" + sex;
        var soundPath = "res/audio/phz/"+path+audioName+".mp3";
        if (PHZSetModel.yyxz == 2 || audioName == "huang"){
            path = sex;
            soundPath = "res/audio/phz/"+path+audioName+".wav";
        }else if (PHZSetModel.yyxz == 3){
            path = "changde/";
            soundPath = "res/audio/phz/"+path+audioName+".wav";
        }
        return soundPath;
    },

    /**
     *
     * @param userId
     * @param mjVo {PHZVo}
     */
    letOutSound:function(userId,mjVo){
        var vo = PHZRoomModel.getPlayerVo(userId) || PHZRePlayModel.getPlayerVo(userId);
        var t = mjVo.t==1 ? "s" : "b";
        AudioManager.play(this.getLetOutPath(vo.sex,t+mjVo.n));
    },

    actionSound:function(userId,prefix){
        var vo = PHZRoomModel.getPlayerVo(userId) || PHZRePlayModel.getPlayerVo(userId);
        AudioManager.play(this.getActionPath(vo.sex,prefix));
    },

    fixMsg:function(userId,id){
        var format = ".m4a";
        var sex = PHZRoomModel.getPlayerVo(userId).sex;
        var path = (sex==1) ? "man/" : "woman/";
        var realPath = "res/audio/fixMsg/"+path+ChatData.phz_fix_msg_name[id-1]+format;
        AudioManager.play(realPath);
    }

}