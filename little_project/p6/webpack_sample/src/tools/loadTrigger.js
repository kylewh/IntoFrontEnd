

var LoadTrigger = (function () {

    function _LoadTrigger($ct, $trigger, event, callback, settings) {
        this.$ct = $ct;
        this.event = event;
        this.$trigger = $trigger;
        this.callback = callback;
        this.settings = settings;
        this.bind();
    }

    _LoadTrigger.prototype.bind = function () {
        var _this = this;

        //Support Lazy Load
        if (this.event === 'scroll') {
            this.checkShow();
            this.clock = undefined;

            $(window).on('scroll', function () {
                if (_this.clock) {
                    clearTimeout(_this.clock);
                }
                _this.clock = setTimeout(_this.checkShow.bind(_this), 100);
            });
        } else if (this.event === 'click') {
            this.callback(_this.settings);
            this.$trigger.on('click', function () {
                _this.callback(_this.settings);
            });
        }
    };

    _LoadTrigger.prototype.checkShow = function () {
        var _this = this;
        $.each(this.$trigger, function () {
            if (_this.isVisible($(this))) {
                _this.callback($(this));
            }
        });
    };

    _LoadTrigger.prototype.isVisible = function ($ele) {
        var wHeight = $(window).height(),
            eHeight = $ele.height(),
            eScrollTop = $ele.offset().top,
            wscrollTop = $(window).scrollTop();
        // console.log(wHeight, eHeight, eScrollTop, wscrollTop);

        if (eScrollTop < wHeight + wscrollTop && wscrollTop < eHeight + eScrollTop) {
            return true;
        }
        return false;
    };

    return {
        init: function ($ct, $trigger, event, callback, settings) {
            new _LoadTrigger($ct, $trigger, event, callback, settings);
        }
    };
})();

module.exports = LoadTrigger;
