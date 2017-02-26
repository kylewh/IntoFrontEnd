define('tools/waterFall', ['jquery'], function ($) {
    var WaterFall = (function () {
        function _WaterFall($container) {
            this.arrColHeight = [];
            this.$ct = $container;
            this.$items = this.$ct.find('.item');
            this.itemWidth = this.$items.first().outerWidth(true);
            this.bind();
            this.render();
        }

        _WaterFall.prototype.bind = function () {
            // 2. so we keep the obj as This
            var This = this;
            $(window).on('resize', function () {
                // 1. 'this' in here is actually 'window'
                This.render();
            });
        };

        _WaterFall.prototype.render = function () {
            var This = this;
            this.colNum = Math.floor(this.$ct.width() / this.itemWidth);
            for (var i = 0; i < this.colNum; i++) {
                this.arrColHeight[i] = 0;
            }
            $.each(this.$items, function () {
                This.placeItem($(this));
            });
        };

        _WaterFall.prototype.placeItem = function ($elem) {
            var oPlace = this.getIndexOfMinHeight(),
                minHeight_index = oPlace.minHeight_index,
                minHeight = oPlace.minHeight;

            $elem.css({
                left: minHeight_index * this.itemWidth,
                top: minHeight,
                opacity: 1
            });
            // update colHeight after place one at that column
            this.arrColHeight[minHeight_index] += $elem.outerHeight(true);
            this.$ct.height(Math.max.apply(null, this.arrColHeight));
        };

        _WaterFall.prototype.getIndexOfMinHeight = function () {
            var minHeight_index,
                minHeight = this.arrColHeight[0]; //0

            this.arrColHeight.forEach(function (ele, index, arr) {
                if (ele < minHeight) {
                    minHeight = ele;
                    minHeight_index = index;
                }
            });

            if (typeof minHeight_index === 'undefined') {
                minHeight_index = 0;
            }

            return {
                minHeight_index: minHeight_index,
                minHeight: minHeight
            };
        };

        return {
            init: function($container){
                new _WaterFall($container);
            }
        };
    })();
    return WaterFall;
});