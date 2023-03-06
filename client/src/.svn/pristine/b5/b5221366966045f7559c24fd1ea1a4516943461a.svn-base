/**
 * Created by lww on 2018/4/26.
 */
var PHZSetModel = {
    kscp:0,//快速吃牌
    kqtp:0,//开启听牌
    yyxz:1,//语音选择
    cpsd:1,//出牌速度
    zpdx:1,//字牌大小
    xxxz:0,//虚线选择
    zpxz:1,//字牌选择
    zmbj:1,//桌面背景
    cardTouchend:318,//出牌位置
    init:function(){
        this.kscp = parseInt(this.getLocalItem("sy_phz_kscp")) == 0 ? 0:1;  //1,0
        this.kqtp = parseInt(this.getLocalItem("sy_phz_kqtp")) == 0 ? 0:1;  //1,0
        this.yyxz = parseInt(this.getLocalItem("sy_phz_yyxz")) || 3;  //1,2,3
        this.cpsd = this.getLocalItem("sy_phz_cpsd") || 1;  //1,2,3
        this.zpdx = parseInt(this.getLocalItem("sy_phz_zpdx")) || 2;  //1,2,3
        this.xxxz = parseInt(this.getLocalItem("sy_phz_xxxz")) == 1 ? 1:0;  //1,0
        this.zpxz = this.getLocalItem("sy_phz_zpxz") || 1;  //1,2,3
        this.zmbj = this.getLocalItem("sy_phz_zmbj") || 1;  //1,2,3
        if (this.xxxz == 1){
            this.cardTouchend = 338;
        }
    },

    getLocalItem:function(key){
        var val = cc.sys.localStorage.getItem(key);
        if(val)
            val = parseInt(val);
        return val;
    }
}
