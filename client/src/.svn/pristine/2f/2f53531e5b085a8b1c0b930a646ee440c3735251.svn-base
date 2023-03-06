/**
 * Created by zhoufan on 2016/6/30.
 */
var BBTRoomSound = {

    getPath:function(sex,audioName){
        var path = (sex==1) ? "man/" : "woman/";
        return "res/audio/bbtSound/"+audioName;
    },

    /**
     * @param cardIds {CardPattern}
     * @param cardIds {Array.<number>}
     */
    letOutSound:function(userId,lastCardPattern,state){
        var sex = null;
        if(state == -1){
            sex = BBTPlayBackModel.getPlayerVo(userId).sex;
        }else{
            sex = BBTRoomModel.getPlayerVo(userId).sex;
        }
        if(!lastCardPattern)
            return;
        switch (lastCardPattern.type){
            case BBTAI.SINGLE:

                AudioManager.play(this.getPath(sex,lastCardPattern.sortedCards[0].i+".wav"));
                break;
            case BBTAI.PAIR:
                    AudioManager.play(this.getPath(sex,"d"+lastCardPattern.sortedCards[0].i+".wav"));
                break;
            case BBTAI.LIANDUI:
                AudioManager.play(this.getPath(sex,"liandui.wav"));
                break;
            case BBTAI.FOURDAISAN:
                if(lastCardPattern.sortedCards.length == 5){
                    AudioManager.play(this.getPath(sex,"sidai1.wav"));
                }else if(lastCardPattern.sortedCards.length == 6){
                    AudioManager.play(this.getPath(sex,"sidai2.wav"));
                }else if(lastCardPattern.sortedCards.length == 7){
                    AudioManager.play(this.getPath(sex,"sidai3.wav"));
                }
                break;
            case BBTAI.SHUNZI:
                AudioManager.play(this.getPath(sex,"shunzi.wav"));
                break;
            case BBTAI.THREE:
                if(lastCardPattern.sortedCards.length == 3){
                    AudioManager.play(this.getPath(sex,"sandai0.wav"));
                }else if(lastCardPattern.sortedCards.length == 4){
                    AudioManager.play(this.getPath(sex,"sandai1.wav"));
                }else{
                    AudioManager.play(this.getPath(sex,"sandai2.wav"));
                }
                break;
            case BBTAI.PLANE:
                AudioManager.play(this.getPath(sex,"feiji.wav"));
                break;
            case BBTAI.BOMB:
                AudioManager.play(this.getPath(sex,"zhadan.wav"));
                break;
            case BBTAI.WUSHIK:
                if((lastCardPattern.sortedCards[0].t == lastCardPattern.sortedCards[1].t) && (lastCardPattern.sortedCards[0].t == lastCardPattern.sortedCards[2].t)
                && (lastCardPattern.sortedCards[1].t == lastCardPattern.sortedCards[2].t)){
                    AudioManager.play(this.getPath(sex,"z510k.wav"));
                }else{
                    AudioManager.play(this.getPath(sex,"510k.wav"));
                }
                break;
            case BBTAI.TONGHUASHUN:
                AudioManager.play(this.getPath(sex,"tonghuashun.wav"));
                break;
            case BBTAI.DIZHA:
                AudioManager.play(this.getPath(sex,"dizha.wav"));
                break;
            case BBTAI.KING:
                AudioManager.play(this.getPath(sex,"tianzha.wav"));
                break;
        }
    },

    yaobuqi:function(userId){
        AudioManager.play(this.getPath(BBTRoomModel.getPlayerVo(userId).sex,"buyao.wav"));
    },

    baoting:function(userId){
        AudioManager.play(this.getPath(BBTRoomModel.getPlayerVo(userId).sex,"baojing.wav"));
    },

    fixMsg:function(userId,id){
        var format = ".m4a";
        var sex = BBTRoomModel.getPlayerVo(userId).sex;
        var path = (sex==1) ? "man/" : "woman/";
        var realPath = "res/audio/fixMsg/"+path+ChatData.pdk_fix_msg_name[id-1]+format;
        AudioManager.play(realPath);

    }

}
