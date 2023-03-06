/**
 * Created by zhoufan on 2018/5/12.
 */
var CardTypeHuxi = cc.Class.extend({

    action: 0,
    cardIds: [],
    hux: 0,

    getAction: function() {
        return this.action;
    },

    setAction: function(action) {
        this.action = action;
    },

    getCardIds: function() {
        return this.cardIds;
    },

    setCardIds: function(cardIds) {
        this.cardIds = cardIds;
    },

    getHux: function() {
        return this.hux;
    },

    setHux: function(hux) {
        this.hux = hux;
    },

    isHasCard: function(card) {
        return this.cardIds != null && ArrayUtil.indexOf(this.cardIds, card.c) >= 0;
    },

    init: function(data) {
        if (data) {
            var values = data.split("_");
            this.action = values[0];
            var cards = values[1];
            if (cards) {
                this.cardIds = [];
            }
            this.hux = values[2];
        }
    }

})
