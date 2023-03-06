/**
 * Created by zhoufan on 2016/6/30.
 */
var DdzRoomSound = {

    getPath:function(sex,audioName){
        var path = (sex==1) ? "man/" : "woman/";
        return "res/audio/ddz/"+path+audioName;
    },

    /**
     * @param cardIds {CardPattern}
     * @param cardIds {Array.<number>}
     */
    letOutSound:function(userId,lastCardPattern,state){
        var sex = null;
        var soundSex = null;
        if(state == -1){
            sex = PlayBackModel.getPlayerVo(userId).sex;
        }else{
            sex = DdzRoomModel.getPlayerVo(userId).sex;
        }
        if(sex == 1){
            soundSex = "Man_";
        }else{
            soundSex = "Woman_";
        }
        cc.log("lastCardPattern.type=="+lastCardPattern.type);
        if(!lastCardPattern)
            return;
        switch (lastCardPattern.type){
            case DdzAI.SINGLE:
                var value = lastCardPattern.sortedCards[0].n;
                if(value < 16){
                    AudioManager.play(this.getPath(sex,"pk_"+lastCardPattern.sortedCards[0].n+".wav"));
                }else if(value == 16){
                    AudioManager.play(this.getPath(sex,soundSex+"14.mp3"));
                }else if(value == 17){
                    AudioManager.play(this.getPath(sex,soundSex+"15.mp3"));
                }
                break;
            case DdzAI.PAIR:
                var value = lastCardPattern.sortedCards[0].n;
                if(value == 2){
                    AudioManager.play(this.getPath(sex,soundSex+"dui2.mp3"));
                }else{
                    AudioManager.play(this.getPath(sex,"dui"+lastCardPattern.sortedCards[0].n+".wav"));
                }
                break;
            case DdzAI.LIANPAIR:
                AudioManager.play(this.getPath(sex,"liandui.wav"));
                break;
            case DdzAI.SHUNZI:
                AudioManager.play(this.getPath(sex,"shunzi.wav"));
                break;
            case DdzAI.THREE:
                cc.log("THREETHREE");
                var value = lastCardPattern.sortedCards[0].n;
                 AudioManager.play(this.getPath(sex,soundSex+"tuple"+ value+".mp3"));
                break;
            case DdzAI.THREEDAIONE:
                AudioManager.play(this.getPath(sex,soundSex+"sandaiyi.mp3"));
                break;
            case DdzAI.THREEDAITWO:
                AudioManager.play(this.getPath(sex,soundSex+"sandaiyidui.mp3"));
                break;
            case DdzAI.PLANEBUDAI:
            case DdzAI.PLANEDAIDAN:
            case DdzAI.PLANEDAIDUI:
                AudioManager.play(this.getPath(sex,"feiji.wav"));
                break;
            case DdzAI.FORUDAITWODAN:
                AudioManager.play(this.getPath(sex,soundSex+"sidaier.mp3"));
                break;
            case DdzAI.FORUDAITWODUI:
                AudioManager.play(this.getPath(sex,soundSex+"sidailiangdui.mp3"));
                break;
            case DdzAI.BOMB:
                AudioManager.play(this.getPath(sex,"zhadan.wav"));
                break;
            case DdzAI.KING:
                AudioManager.play(this.getPath(sex,soundSex+"wangzha.mp3"));
                break;
        }
    },

    bujiao:function(userId){
        var sex = DdzRoomModel.getPlayerVo(userId).sex;
        var soundSex = null;
        if(sex == 1){
            soundSex = "man_";
        }else{
            soundSex = "female_";
        }
        AudioManager.play(this.getPath(sex,soundSex+"not_call.mp3"));
    },

    jiaofen:function(userId,temp){
        var sex = DdzRoomModel.getPlayerVo(userId).sex;
        var soundSex = null;
        if(sex == 1){
            soundSex = "man_";
        }else{
            soundSex = "female_";
        }
        AudioManager.play(this.getPath(sex,soundSex+temp+"_point.mp3"));
    },

    yaobuqi:function(userId){
        AudioManager.play(this.getPath(DdzRoomModel.getPlayerVo(userId).sex,"buyao.wav"));
    },

    baoting:function(userId){
        AudioManager.play(this.getPath(DdzRoomModel.getPlayerVo(userId).sex,"baojing.wav"));
    },

    baotingThree:function(userId){
        AudioManager.play(this.getPath(DdzRoomModel.getPlayerVo(userId).sex,"b3.mp3"));
    },

    fixMsg:function(userId,id){
        var format = ".m4a";
        var sex = DdzRoomModel.getPlayerVo(userId).sex;
        var path = (sex==1) ? "man/" : "woman/";
        var realPath = "res/audio/fixMsg/"+path+ChatData.ddt_fix_msg_name[id-1]+format;
        AudioManager.play(realPath);
    }

}
