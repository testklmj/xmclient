/**
 * Created by zhoufan on 2016/7/28.
 */
var MJRoomSound = {

    getPath:function(sex,audioName){
        var path = (sex==1) ? "man/" : "woman/";
        return "res/audio/mj/"+path+audioName;
    },

    pushOutSound:function(){
        AudioManager.play("res/audio/mj/out.mp3");
    },

    /**
     *
     * @param userId
     * @param mjVo {MJVo}
     */
    letOutSound:function(userId,mjVo){
        var vo = MJRoomModel.getPlayerVo(userId) || MJReplayModel.getPlayerVo(userId);
        var format = ".wav";
        if(MJRoomModel.isZYMJ()){
            format = ".mp3";
        }
        AudioManager.play(this.getPath(vo.sex,mjVo.t+""+mjVo.n+format));
    },

    actionSound:function(userId,prefix){
        var vo = MJRoomModel.getPlayerVo(userId) || MJReplayModel.getPlayerVo(userId);
        var format = ".wav";
        if(prefix == "bai"){
            format = ".mp3";
            var randNum = cc.random0To1();
            prefix = randNum > 0.5 ? "bai":"wobaile";
        }
        if(MJRoomModel.isZYMJ() || prefix == "ting" || prefix == "buhua"){
            format = ".mp3";
        }
        AudioManager.play(this.getPath(vo.sex,prefix+format));
    },

    alertSound:function(){
        AudioManager.play("res/audio/common/special_alert.mp3");
    },

    fixMsg:function(userId,id){
        var format = ".m4a";
        var sex = MJRoomModel.getPlayerVo(userId).sex;
        var path = (sex==1) ? "man/" : "woman/";
        var realPath = "res/audio/fixMsg/"+path+ChatData.mj_fix_msg_name[id-1]+format;
        //if(MJRoomModel.isZYMJ()){
        //    format = ".mp3";
        //    realPath = "res/audio/zymj/fixMsg/"+path+ChatData.zymj_fix_msg_name[id-1]+format;
        //}
        AudioManager.play(realPath);
    }

}
