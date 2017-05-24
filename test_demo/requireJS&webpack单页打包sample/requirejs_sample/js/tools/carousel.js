define("tools/carousel", ['jquery'], function ($) {
    var Carousel = (function () {
        function _Carousel($ct) {
            this.$ct = $ct;
            this.$carousel = this.$ct.children('.carousel');
            this.oldLength = this.$carousel.children().length;
            this.$firstImgCt = this.$carousel.children().first();
            this.$lastImgCt = this.$carousel.children().last();
            this.imgCtSize = this.$carousel.parent().outerWidth();
            this.$thumbnails = this.$ct.find('.thumbnail>li');
            this.$btns = this.$ct.find('.btn');
            this.$preBtn = this.$btns.eq(0);
            this.$nextBtn = this.$btns.eq(1);
            this.isClick = false;
            this.pageIdx = 0;
            this.clock = null;
            this.spliceImg();
            this.setSize();
            this.bind();
            this.autoPlay();
            //console.log(this.imgCtSize);
        }

        _Carousel.prototype.spliceImg = function () {
            var copy$first = this.$firstImgCt.clone(),
                copy$last = this.$lastImgCt.clone();
            this.$carousel.prepend(copy$last);
            this.$carousel.append(copy$first);

        };

        _Carousel.prototype.setSize = function () {
            this.$carousel.children('li').css('width', this.imgCtSize);
            this.$carousel.css('width', this.imgCtSize * (this.oldLength + 2));
            this.$imgs = this.$carousel.find('img');
            this.$imgs.css('width', this.imgCtSize);
            this.$carousel.css('left', -this.imgCtSize);
        };

        _Carousel.prototype.bind = function () {
            var _this = this;

            this.$btns.on('click', function (e) {
                _this.stopAuto();
                e.preventDefault();
                if (!_this.isClick) {
                    _this.isClick = true;
                    if ($(this).hasClass('pre')) {
                        _this.play('pre');
                    } else if ($(this).hasClass('next')) {
                        _this.play('next');
                    }
                }
                setTimeout(_this.autoPlay.bind(_this), 0);

            });

            this.$thumbnails.on('click', function (e) {
                _this.stopAuto();
                var targetIdx = $(this).index();
                if (!_this.isClick) {
                    _this.isClick = true;
                    _this.play('jump', _this.pageIdx, targetIdx);
                }
                setTimeout(_this.autoPlay.bind(_this), 0);
            });
        };


        _Carousel.prototype.play = function (dir, curIdx, targetIdx) {
            var _this = this,
                sign;
            dir = dir || 'next';
            switch (dir) {
                case 'pre':
                    sign = '+';
                    break;
                case 'next':
                    sign = '-';
                    break;
            }

            if (typeof curIdx !== 'undefined' && typeof targetIdx !== 'undefined' && dir === 'jump') {
                var indexDif = targetIdx - curIdx;
                console.log(1111111111);
                _this.$carousel.animate({
                    left: '-='+_this.imgCtSize*indexDif
                }, function () {
                    _this.pageIdx += indexDif;
                    //console.log(`这是轮播的第${_this.pageIdx+1}张图`);
                    thumbnail(_this.pageIdx);
                    _this.isClick = false;
                });
            } else {
                _this.$carousel.animate({
                    left: sign+'='+_this.imgCtSize
                }, function () {
                    if (sign === '+') {
                        _this.pageIdx--;
                    } else if (sign === '-') {
                        _this.pageIdx++;
                    }
                    //console.log(`这是轮播的第${_this.pageIdx+1}张图`);
                    if (_this.pageIdx === _this.oldLength) {
                        _this.$carousel.css({
                            left: -_this.imgCtSize
                        });
                        _this.pageIdx = 0;
                    }

                    if (_this.pageIdx === -1) {
                        _this.$carousel.css({
                            left: -_this.oldLength * _this.imgCtSize
                        });
                    }
                    thumbnail(_this.pageIdx);
                    _this.isClick = false;
                });
            }

            function thumbnail(idx) {
                _this.$thumbnails.removeClass('active');
                _this.$thumbnails.eq(idx).addClass('active');
            }
        };


        _Carousel.prototype.autoPlay = function () {
            var _this = this;
            this.clock = setInterval(_this.play.bind(_this), 2000);
        };

        _Carousel.prototype.stopAuto = function () {
            var _this = this;
            clearInterval(_this.clock);
        };


        return {
            init: function($ct){
                new _Carousel($ct);
            }
        };
    })();

    return Carousel;
});