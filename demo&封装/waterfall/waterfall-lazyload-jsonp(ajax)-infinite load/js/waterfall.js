var Waterfall = {
    arrColHeight: [],
    init: function ($container) {
        this.$ct = $container;
        this.$items = this.$ct.find('.item');
        this.itemWidth = this.$items.first().outerWidth(true);
        this.bind();
        this.render();
    },
    bind: function () {
        // 2. so we keep the obj as This
        let This = this;
        $(window).on('resize', function () {
            // 1. 'this' in here is actually 'window'
            This.render();
        });
    },
    render: function () {
        let This = this;
        this.colNum = this.calColNum();

        this.arrInit(this.colNum);

        $.each(this.$items, function () {
            This.placeItem($(this));
        });
    },
    calColNum: function () {
        return Math.floor(this.$ct.width() / this.itemWidth);
    },
    arrInit: function (colNum) {
        for (let i = 0; i < colNum; i++) {
            this.arrColHeight[i] = 0;
        }
    },
    placeItem: function ($elem) {
        let oPlace = this.getIndexOfMinHeight(),
            minHeight_index = oPlace.minHeight_index,
            minHeight = oPlace.minHeight;

        $elem.css({
            left: minHeight_index * this.itemWidth,
            top: minHeight
        });
        // update colHeight after place one at that column
        this.arrColHeight[minHeight_index] += $elem.outerHeight(true);
        //console.log(minHeight_index, this.arrColHeight[minHeight_index]);
    },
    getIndexOfMinHeight: function () {
        let minHeight_index,
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
    }
};