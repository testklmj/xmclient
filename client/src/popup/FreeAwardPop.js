/**
 * Created by Administrator on 2016/6/27.
 * 显示当前累计的
 */

var FreeAwardPop = BasePopup.extend({

	ctor: function () {
		this._super("res/freeAwardPop.json");
	},

	selfRender: function () {
		var data = GoldRoomActivityModel.getAwardData();
		if (!data){
			return
		}
		var hasGet = data.totalWinAward;
		var totalWinCount = data.totalWinCount;



		this.nowAward = 0;
		for(var index = 1 ; index <= 7 ; index++){
			var btn = this.getWidget("Image_award"+index);
			var Image_60 = btn.getChildByName("Image_60");
			if (hasGet < index){
				Image_60.visible = false;
			}
		}
		var progressBar = this.getWidget("ProgressBar_23");
		var curBar = 0;
		if (totalWinCount > 0){
			if (totalWinCount == 1 ){
				curBar = totalWinCount / 2 / 7 * 100;
			}else{
				curBar = (totalWinCount - 1) / 7 * 100;
			}
		}
		if (curBar > 100){
			curBar = 100;
		}
		progressBar.setPercent(curBar);
		var Image_39 = this.getWidget("Image_39");
		Image_39.x = 100 + curBar/100 * 1017;
		var Label_tip_4 = this.getWidget("Label_tip_4");
		var Label_42 = this.getWidget("Label_42");
		Label_tip_4.setString(""+totalWinCount);

		var nowGoalWinCount = 8;
		for(var i=2; i <= 8;i++){
			if (data.totalWinCount < i && data.totalWinAwardCount <= 0  || data.totalWinCount == i && data.totalWinAwardCount > 0){
				nowGoalWinCount = i;
				break;
			}
		}
		var disWinCount = parseInt(nowGoalWinCount) - parseInt(data.totalWinCount);
		if (disWinCount < 0){
			disWinCount = 0;
		}
		Label_42.setString("再赢"+disWinCount+"局可领取");


	},


});




