;(function ($) {
    $.fn.navMenu = function (options) {
        var def = {
            mask: 0.2, //遮罩透明度
        }
        var options = $.extend(def, options)
        var self = $(this)
        var menuItem = self.children()
        var parNav = self.parents('nav')
        var mask = $(document).find('#nav-mask')
        var height = self.height()
        var len = 0;
        mask.css({
            background: 'rgba(0,0,0,' + options.mask + ')'
        })
        menuItem.hover(function () {
            var dropdown = $(this).find('.nav-menu-dropdown')
            var index = $(this).index();
            len = dropdown.length
            var dropHeigth = dropdown.outerHeight()
            if (len) {
                mask.stop().fadeIn()
                parNav.css({
                    height: height + dropHeigth + 'px'
                }).addClass('active')
                self.find('.nav-menu-dropdown').hide()
                $(this).find('.nav-menu-dropdown').stop().fadeIn()
            }
        }, function () {
            mask.stop().fadeOut()
            self.find('.nav-menu-dropdown').hide()
            parNav.attr('style', '').removeClass('active')
        })
    } //导航栏下拉
    $.fn.navMenuMob = function (options) {
        var def = {
            btn: null, //手机端导航栏下拉按钮
            mob:true //是否手机端
        }
        var opt = $.extend(def, options)
        var btn = opt.btn;
        var self = $(this)
        var w = $(document).width()
        var li = self.find('.toggle-li')
        var allDropdown = self.find('.nav-menu-mob-dropdown')
        allDropdown.on('click',function(e){
            e.stopPropagation();
        })
        function fram() {
            w = $(document).width()
            requestAnimationFrame(fram)
            if (w > 800 && opt.mob) {
                allDropdown.attr('style', '')
            } else {
                li.each(function () {
                    if ($(this).hasClass('active')) {
                        $(this).find('.nav-menu-mob-dropdown').slideDown()
                    } else {
                        $(this).find('.nav-menu-mob-dropdown').slideUp()
                    }
                })
            }
        }
        function stopScroll(){
            $('html').addClass('noScroll')
            // self.on('touchmove',prevent)
        }
        function reScroll(){
            $('html').removeClass('noScroll')
            // self.off('touchmove',prevent)
        }
        function prevent(e){
            e.preventDefault()
        }
        fram()
        if (btn) {
            btn.on('click', function () {
                if(self.css('display') == 'none'){
                    self.slideDown()
                    $(this).addClass('active')
                    stopScroll()
                }else{
                    self.slideUp()
                    $(this).removeClass('active')
                    reScroll()
                }
                
            })
        }
        li.on('click', function () {
            var dropdown = $(this).find('.nav-menu-mob-dropdown')
            if (dropdown.css('display') == 'none') {
                li.removeClass('active')
                allDropdown.slideUp()
                $(this).addClass('active')
                dropdown.slideDown()
            } else {
                $(this).removeClass('active')
                dropdown.slideUp()
            }
        })
    } //手机端导航栏下拉
    $.fn.select = function (options) {
        var def = {
            type: 'hover', //事件类型'hover,click'
            animate: 'slide' //动画类型'slide,fade'
        }
        var options = $.extend(def, options)
        var self = $(this)
        var type = options.type || 'hover'
        var animate = options.animate || 'slide'
        var li = $('.select-dropdown')
        var len;
        if (type == 'hover') {
            self.hover(function () {
                len = $(this).find('.select-dropdown-menu ul li').length;
                if(len){
                    $(this).addClass('active');
                    if (animate == 'slide') {
                        $(this).find('.select-dropdown-menu').stop().slideDown()
                    } else if (animate == 'fade') {
                        $(this).find('.select-dropdown-menu').stop().fadeIn()
                    }
                }
            }, function () {
                if(len){
                    $(this).removeClass('active')
                    if (animate == 'slide') {
                        $(this).find('.select-dropdown-menu').stop().slideUp()
                    } else if (animate == 'fade') {
                        $(this).find('.select-dropdown-menu').stop().fadeOut()
                    }
                }
            })
        } else if (type == 'click') {
            var selectAll = $('.select-dropdown-menu')
            self.on('click', function (e) {
                e.stopPropagation()
                var select = $(this).find('.select-dropdown-menu')
                len = select.find('li').length;
                if(len){
                    if (animate == 'slide') {
                        if (select.css('display') == 'none') {
                            li.removeClass('active')
                            selectAll.stop().slideUp()
                            select.stop().slideDown()
                            $(this).addClass('active');
                        } else {
                            $(this).removeClass('active')
                            select.stop().slideUp()
                        }
                    } else if (animate == 'fade') {
                        if (select.css('display') == 'none') {
                            li.removeClass('active')
                            $(this).addClass('active');
                            selectAll.fadeOut()
                            select.stop().fadeIn()
                        } else {
                            $(this).removeClass('active')
                            select.stop().slideOut()
                        }
                    }
                }
            })
            $('body').on('click', function () {
                self.removeClass('active')
                if (animate == 'slide') {
                    selectAll.stop().slideUp()
                } else if (animate == 'fade') {
                    selectAll.stop().slideOut()
                }
            })
        }
    } //下拉菜单
    $.fn.gmap = function (options) {
        var def = {
            targetDom: null, //目标元素
            color: null,     //颜色
        }
        var options = $.extend(def, options);
        var self = $(this);
        var target = self.find(options.targetDom);
        var imgList = target.children();
        var len = imgList.length;
        var imgArr = [];
        var color = options.color;
        var item = Math.ceil(len / 4);
        imgList.each(function () {
            var src = $(this).find('img').attr('src');
            $(this).find('img').attr('src', src)
            imgArr.push(src);
        })
        imgList.eq(0).show()
        var obj = {
            init: function () {
                this.render();
                this.curHover();
                this.curBtn();
                this.viewFn();
                this.curMove();
            },
            nowIndex: 0,
            viewIndex: 0,
            render: function () {
                var html = '<div class="cur">\
                        <div class="c-left-btn">\
                            <i class="fa fa-angle-left"></i>\
                        </div>\
                        <div class="cur-box"><div class="wrap"><ul class="cur-list"></ul></div></div>\
                        <div class="c-right-btn">\
                            <i class="fa fa-angle-right"></i>\
                        </div>\
                    </div>\
                    <div class="veiw">\
                        <ul class="view-list"></ul>\
                        <div class="v-left-btn">\
                            <i class="fa fa-angle-left"></i>\
                        </div>\
                        <div class="v-right-btn">\
                            <i class="fa fa-angle-right"></i>\
                        </div>\
                    </div>';
                self.append(html);
                var str = '';
                imgArr.forEach(function (ele, index) {
                    if (index == 0) {
                        str += '<li class="active"><img src="' + ele + '" alt=""><span></span></li>'
                    } else {
                        str += '<li><img src="' + ele + '" alt=""><span></span></li>'
                    }
                })
                self.find('.cur-list').append(str);
                self.find('.view-list').append(str);
                self.find('.cur-list').width(len * 100 + '%');
                self.find('.cur-list li').width(100 / len / 4 - 0.3 + '%').css({
                    margin: 0.15 + '%'
                });
                self.find('.view-list').width((len + 1) * 100 + '%');
                self.find('.view-list li').width(100 / (len + 1) + '%');
                self.find('.cur-list .active span').css({
                    borderColor: color
                })
                var clone = self.find('.view-list li').eq(0).clone();
                self.find('.view-list').append(clone);
                if (len <= 4) {
                    self.find('.cur-box').css({
                        width: '100%'
                    })
                    self.find('.c-left-btn').hide();
                    self.find('.c-right-btn').hide();
                }
            },
            curHover: function () {
                var viewList = self.find('.view-list');
                var _this = this;
                self.find('.cur-list li').on('mouseover', function () {
                    var index = $(this).index();
                    var curBox = self.find('.cur-list');
                    curBox.find('li').removeClass('active');
                    curBox.find('span').attr('style', '');
                    $(this).addClass('active');
                    curBox.find('.active span').css({
                        borderColor: color
                    });
                    target.find('li').hide();
                    target.find('li').eq(index).show();
                    viewList.css({
                        left: -index * 100 + '%'
                    })
                    _this.viewIndex = index;
                })
            },
            curBtn: function () {
                var leftBtn = self.find('.c-left-btn');
                var rightBtn = self.find('.c-right-btn');
                var _this = this;
                leftBtn.on('click', function () {
                    move('left');
                })
                rightBtn.on('click', function () {
                    move('right');
                })

                function move(val) {
                    var curList = self.find('.cur-list');
                    if (val == 'right') {
                        _this.nowIndex++;
                        if (_this.nowIndex > item - 1) {
                            curList.animate({
                                left: 0 + '%'
                            }, function () {
                                _this.nowIndex = 0;
                            })
                        } else {
                            curList.animate({
                                left: _this.nowIndex * -100 + '%'
                            })
                        }
                    } else {
                        if (_this.nowIndex == 0) {
                            _this.nowIndex = item;
                        }
                        _this.nowIndex--;
                        curList.animate({
                            left: _this.nowIndex * -100 + '%'
                        })

                    }
                }
            },
            viewFn: function () {
                var _this = this;
                var view = self.find('.veiw');
                var viewList = view.find('.view-list');
                var li = view.find('.view-list li');
                var leftBtn = self.find('.v-left-btn');
                var rightBtn = self.find('.v-right-btn');
                var curList = self.find('.cur-list');
                var imgsLi = target.find('li');
                var _this = this;
                var lens = len + 1;

                function unScroll() {
                    var top = $(document).scrollTop();
                    $(document).on('scroll.unable', function (e) {
                        $(document).scrollTop(top);
                    })
                }

                function reScroll() {
                    $(document).off('scroll.unable');
                }
                target.find('li').on('click', function () {
                    view.fadeIn();
                    unScroll();
                })
                li.on('click', function () {
                    view.fadeOut();
                    reScroll();
                })
                leftBtn.on('click', function () {
                    anima('left');
                })
                rightBtn.on('click', function () {
                    anima('right');
                })

                function anima(val) {
                    if (val == 'left') {
                        if (_this.viewIndex == 0) {
                            viewList.css({
                                left: -(lens - 1) * 100 + '%'
                            })
                            _this.viewIndex = lens - 2;
                        } else {
                            _this.viewIndex--;
                        }
                    } else if (val == 'right') {
                        _this.viewIndex++;
                        if (_this.viewIndex == lens - 1) {
                            viewList.animate({
                                left: -(lens - 1) * 100 + '%'
                            }, function () {
                                $(this).css({
                                    left: '0%'
                                })
                            });
                            _this.viewIndex = 0;
                        }
                    }
                    viewList.animate({
                        left: -_this.viewIndex * 100 + '%'
                    })
                    curList.find('li').removeClass('active');
                    curList.find('span').attr('style', '');
                    curList.find('li').eq(_this.viewIndex).addClass('active');
                    curList.find('.active span').css({
                        borderColor: color
                    });
                    var v = Math.floor(_this.viewIndex / 4);
                    curList.animate({
                        left: -v * 100 + '%'
                    })
                    _this.nowIndex = v;
                    imgsLi.hide();
                    imgsLi.eq(_this.viewIndex).show();
                }
            },
            curMove() {
                var curList = self.find('.cur-list');
                var _this = this;
                var w = curList.width();
                curList.css({
                    left: '0%'
                });
                var l = curList.offset().left;
                var initL, lastX = 0;
                var num = 0;
                var disX;
                var speed = 0;
                curList.on('mousedown', function (event) {
                    var pad = self.find('.cur-box').width() / 10;
                    initL = curList.position().left;
                    var e = event || window.event;
                    disX = e.clientX - l;
                    $(document).on('mousemove', moveFn);
                    $(document).on('mouseup', upFn);
                })

                function moveFn(event) {
                    var e = event || window.event;
                    e.preventDefault();
                    curList.unbind('mouseover');
                    var newLeft = e.clientX - disX - l + initL;
                    curList.css({
                        left: newLeft + 'px'
                    });
                    speed = e.clientX - lastX;
                    lastX = e.clientX;
                }

                function upFn() {
                    moveAuto();
                    _this.curHover();
                    $(document).unbind('mousemove mouseup');
                }

                function moveAuto() {
                    var l = curList.position().left;
                    var maxL = w / len * (item - 1);
                    var moveL = 0;
                    if (l >= 0) {
                        moveL = 0;
                        _this.nowIndex = 0;
                    } else if (l <= -maxL) {
                        moveL = -maxL;
                        _this.nowIndex = item;
                    } else {
                        moveL = l + speed
                    }
                    curList.animate({
                        left: moveL + 'px'
                    })
                }
            }
        }
        obj.init();
    } //详情横屏组图
    $.fn.gmapVer = function (options) {
        var def = {
            targetDom: null, //目标元素
            color: null,     //颜色
            curWidth: 90,   //缩略图宽度
        }
        var options = $.extend(def, options);
        var self = $(this);
        var target = self.find(options.targetDom);
        var imgList = target.children();
        var len = imgList.length;
        var curW;
        var curH;
        var liW;
        var dW;
        var imgArr = [];
        var color = options.color;
        var item = Math.ceil(len / 4);
        imgList.each(function () {
            var src = $(this).find('img').attr('src');
            $(this).find('img').attr('src', src)
            imgArr.push(src);
        })
        imgList.eq(0).show()
        var obj = {
            init: function () {
                this.render();
                this.curHover();
                this.imgFn();
                this.viewFn();
                this.curMove();
            },
            nowIndex: 0,
            render: function () {
                var html = '<div class="cur">\
                        <div class="cur-box"><div class="wrap"><ul class="cur-list"></ul></div></div>\
                    </div>\
                    <div class="veiw">\
                        <ul class="view-list"></ul>\
                        <div class="v-left-btn">\
                            <i class="fa fa-angle-left"></i>\
                        </div>\
                        <div class="v-right-btn">\
                            <i class="fa fa-angle-right"></i>\
                        </div>\
                    </div>';
                var imgHtml = `<div class="left-btn">
                                    <i class="fa fa-angle-left"></i>
                                </div>
                                <div class="right-btn">
                                    <i class="fa fa-angle-right"></i>
                                </div>`;
                target.parent().append(imgHtml);
                self.prepend(html);
                var str = '';
                imgArr.forEach(function (ele, index) {
                    if (index == 0) {
                        str += '<li class="active"><img src="' + ele + '" alt=""><span></span></li>'
                    } else {
                        str += '<li><img src="' + ele + '" alt=""><span></span></li>'
                    }
                })

                function fram() {
                    curH = imgList.height();
                    imgList.parent().outerHeight(curH);
                    curW = self.find('.cur').width();
                    self.find('.cur-box').height(curH + 'px');
                    liW = self.find('.cur-list li').outerWidth();
                    dW = $(document).width()
                    if (dW <= 768) {
                        self.find('.cur').width(70)
                    } else {
                        self.find('.cur').width(options.curWidth)
                    }
                    requestAnimationFrame(fram)
                };
                fram();
                self.find('.cur-list').append(str);
                self.find('.view-list').append(str);
                self.find('.cur-list').height(curW * len + 'px');
                self.find('.view-list').width((len + 1) * 100 + '%');
                self.find('.view-list li').width(100 / (len + 1) + '%');
                self.find('.cur-list .active span').css({
                    borderColor: color
                })
                var clone = self.find('.view-list li').eq(0).clone();
                self.find('.view-list').append(clone);
                if (len <= 4) {
                    self.find('.cur-box').css({
                        width: '100%'
                    })
                    self.find('.c-left-btn').hide();
                    self.find('.c-right-btn').hide();
                }
            },
            imgFn: function () {
                var _this = this;
                var index;
                var viewList = self.find('.view-list');
                var leftBtn = target.siblings('.left-btn');
                var rightBtn = target.siblings('.right-btn');
                leftBtn.on('click', function () {
                    fadeFn('left');
                });
                rightBtn.on('click', function () {
                    fadeFn('right');
                });

                function fadeFn(val) {
                    if (val == 'left') {
                        if (_this.nowIndex == 0) {
                            _this.nowIndex = len;
                        }
                        _this.nowIndex--
                    } else {
                        _this.nowIndex++;
                        if (_this.nowIndex == len) {
                            _this.nowIndex = 0;
                        }
                    }
                    imgList.hide();
                    imgList.eq(_this.nowIndex).fadeIn();
                    _this.curActive(_this.nowIndex);
                    viewList.animate({
                        left: -_this.nowIndex * 100 + '%'
                    })
                }
            },
            curHover: function () {
                var viewList = self.find('.view-list');
                var _this = this;
                self.find('.cur-list li').on('mouseover', function () {
                    var index = $(this).index();
                    var curBox = self.find('.cur-list');
                    curBox.find('li').removeClass('active');
                    curBox.find('span').attr('style', '');
                    $(this).addClass('active');
                    curBox.find('.active span').css({
                        borderColor: color
                    });
                    target.find('li').hide();
                    target.find('li').eq(index).show();
                    viewList.css({
                        left: -index * 100 + '%'
                    })
                    _this.nowIndex = index;
                })
            },
            viewFn: function () {
                var _this = this;
                var view = self.find('.veiw');
                var viewList = view.find('.view-list');
                var li = view.find('.view-list li');
                var leftBtn = self.find('.v-left-btn');
                var rightBtn = self.find('.v-right-btn');
                var curList = self.find('.cur-list');
                var imgsLi = target.find('li');
                var lens = len + 1;

                function unScroll() {
                    var top = $(document).scrollTop();
                    $(document).on('scroll.unable', function (e) {
                        $(document).scrollTop(top);
                    })
                }

                function reScroll() {
                    $(document).off('scroll.unable');
                }
                target.find('li').on('click', function () {
                    view.fadeIn();
                    unScroll();
                })
                li.on('click', function () {
                    view.fadeOut();
                    reScroll();
                })
                leftBtn.on('click', function () {
                    anima('left');
                })
                rightBtn.on('click', function () {
                    anima('right');
                })

                function anima(val) {
                    var viewList = self.find('.view-list');
                    if (val == 'left') {
                        if (_this.nowIndex == 0) {
                            viewList.css({
                                left: -(lens - 1) * 100 + '%'
                            })
                            _this.nowIndex = lens - 2;
                        } else {
                            _this.nowIndex--;
                        }
                    } else if (val == 'right') {
                        _this.nowIndex++;
                        if (_this.nowIndex == lens - 1) {
                            viewList.animate({
                                left: -(lens - 1) * 100 + '%'
                            }, function () {
                                $(this).css({
                                    left: '0%'
                                })
                            });
                            _this.nowIndex = 0;
                        }
                    }
                    viewList.animate({
                        left: -_this.nowIndex * 100 + '%'
                    })
                    _this.curActive(_this.nowIndex);
                    imgsLi.hide();
                    imgsLi.eq(_this.nowIndex).show();
                }
            },
            curActive: function (index) {
                var _this = this;
                var curList = self.find('.cur-list');
                var imgsLi = target.find('li');
                curList.find('li').removeClass('active');
                curList.find('span').attr('style', '');
                curList.find('li').eq(_this.nowIndex).addClass('active');
                curList.find('.active span').css({
                    borderColor: color
                });
                if (index == 0 || index == 1) {
                    curList.animate({
                        top: 0
                    })
                } else if (index == len - 1) {
                    curList.animate({
                        top: -curW * (index - 4) + 'px'
                    })
                } else if (index == len - 2) {
                    curList.animate({
                        top: -curW * (index - 3) + 'px'
                    })
                } else {
                    curList.animate({
                        top: -curW * (index - 2) + 'px'
                    })
                }
            },
            curMove() {
                var curList = self.find('.cur-list');
                var _this = this;
                var moveH = curH / len;
                curList.css({
                    top: '0'
                });
                var t = curList.offset().top;
                var initL, lastY = 0;
                var num = 0;
                var disY;
                var speed = 0;
                curList.on('mousedown', function (event) {
                    initT = curList.position().top;
                    var e = event || window.event;
                    disY = e.clientY - t;
                    $(document).on('mousemove', moveFn);
                    $(document).on('mouseup', upFn);
                })
                curList.on('touchstart', function (e) {
                    initT = curList.position().top;
                    disY = e.originalEvent.changedTouches[0].clientY - t;
                }).on('touchmove', function (e) {
                    e.preventDefault();
                    var newtop = e.originalEvent.changedTouches[0].clientY - disY - t + initT;
                    curList.css({
                        top: newtop + 'px'
                    });
                    speed = e.originalEvent.changedTouches[0].clientY - lastY;
                    lastY = e.originalEvent.changedTouches[0].clientY;
                }).on('touchend', function () {
                    moveAuto();
                    _this.curHover();
                })

                function moveFn(event) {
                    var e = event || window.event;
                    e.preventDefault();
                    curList.unbind('mouseover');
                    var newtop = e.clientY - disY - t + initT;
                    curList.css({
                        top: newtop + 'px'
                    });
                    speed = e.clientY - lastY;
                    lastY = e.clientY;
                }

                function upFn() {
                    moveAuto();
                    _this.curHover();
                    $(document).unbind('mousemove mouseup');
                }

                function moveAuto() {
                    var t = curList.position().top;
                    var maxT = curW * len - Math.floor(curH / curW) * curW;

                    function retT() {
                        var moveT = 0;
                        var a = Math.ceil((t + speed) / liW) * liW;
                        var b = Math.floor((t + speed) / liW) * liW;
                        if (t >= 0) {
                            moveT = 0;
                        } else if (t <= -maxT) {
                            moveT = -maxT;
                        } else {
                            a >= 0 ? a = 0 : a;
                            b <= -maxT ? b = -maxT : b;
                            if (speed > 0) {
                                moveT = a;
                            } else if (speed < 0) {
                                moveT = b;
                            }
                        }
                        return moveT
                    }
                    curList.animate({
                        top: retT() + 'px'
                    })
                }
            }
        }
        obj.init();
    } //详情竖屏组图
    $.fn.gmapWeb = function (options) {
        var def = {
            mult: 2, //放大倍数
            bgColor: '#000' //遮罩颜色
        }
        var opt = $.extend(def, options)
        var self = $(this)
        var imgList = self.find('.img-list')
        var mult = opt.mult
        var li = imgList.children()
        var len = li.length
        var liW = li.outerWidth()
        var bigBox = self.find('.img-box')
        var bigImg = bigBox.find('img')
        var initW = bigImg.width()
        var initH = bigImg.height()
        var zoomBox = self.find('.zoom-box')
        var zoomImg = zoomBox.find('img')
        var leftBtn = self.find('.left-btn')
        var rightBtn = self.find('.right-btn')
        var maskW
        var maskH
        var index = 0;
        var moveKey = true;
        var showLen = Math.floor(self.find('.cur-box .wrap').width() / liW)
        var mask = self.find('.mask').css({
            background: opt.bgColor
        })
        var page = {}
        var lastX = 0;
        var moveX;
        if (li.hasClass('video-cur')) {
            li.eq(1).addClass('active')
        } else {
            li.eq(0).addClass('active')
        }
        imgList.width(li.outerWidth() * len)
        var innerW = imgList.width() - liW * showLen
        li.on('mouseover', function () {
            if (!$(this).hasClass('video-cur') && moveKey) {
                li.removeClass('active')
                $(this).addClass('active')
                var src = $(this).find('img').attr('src')
                bigImg.add(zoomImg).attr('src', src).attr('data-src',src)
            }
        })
        bigBox.on('mouseover',function(e){
            maskW = initW / mult
            maskH = initH / mult
            mask.width(maskW).height(maskH);
            mask.show()
        })
        bigBox.on('mousemove', function (e) {
                initW = bigImg.width()
                initH = bigImg.height()
                e.preventDefault();
                zoomImg.css({
                    width: initW * mult,
                    height: initW * mult
                })
                zoomBox.css({
                    height:initH +'px',
                    width:initW +'px',
                    left:initW + 20 +'px'
                })
                page = retPage(e, $(this))
                mask.css({
                    left: page.x + 'px',
                    top: page.y + 'px'
                })
                zoomBox.show()
                zoomImg.css({
                    left: -page.x * mult + 'px',
                    top: -page.y * mult + 'px'
                })
        })
        leftBtn.on('click', function () {
            move('left', $(this))
        })
        rightBtn.on('click', function () {
            move('right', $(this))
        })

        function move(val, dom) {
            if (val == 'right') {
                index++
                leftBtn.removeClass('off')
                if (index >= len - showLen) {
                    index = len - showLen
                    dom.addClass('off')
                }
            }
            if (val == 'left') {
                index--
                rightBtn.removeClass('off')
                if (index <= 0) {
                    index = 0
                    dom.addClass('off')
                }
            }
            imgList.css({
                left: -liW * index + 'px'
            })
        }
        bigBox.on('mouseout', function () {
            mask.hide()
            zoomBox.hide()
        })
        imgList.on('mousedown', function (e) {
            e.preventDefault()
            var startX = e.pageX
            lastX = parseInt($(this).css('left'))
            $(document).on('mousemove', function (e) {
                moveKey = false;
                moveX = e.pageX - startX + lastX
                leftBtn.add(rightBtn).removeClass('off')
                if (moveX >= 0) {
                    moveX = 0
                    index = 0
                    leftBtn.addClass('off')
                } else if (moveX <= -innerW) {
                    moveX = -innerW
                    index = len - showLen
                    rightBtn.addClass('off')
                }
                moveX = Math.ceil(moveX / liW) * liW
                $(imgList).css({
                    left: moveX + 'px'
                })
                index = Math.floor(-moveX / liW)
            })
            $(document).on('mouseup', function () {
                if (moveX >= 0) {
                    leftBtn.addClass('off')
                } else if (moveX <= -innerW) {
                    rightBtn.addClass('off')
                }
                lastX = moveX
                $(document).unbind('mousemove mouseup');
                moveKey = true;
            })
        })

        function retPage(e, dom) {
            var pageX = e.pageX,
                pageY = e.pageY
            var offestX = dom.offset().left
            var offsetY = dom.offset().top
            var x = pageX - offestX - maskW / 2
            var y = pageY - offsetY - maskH / 2
            if (x <= 0) {
                x = 0
            } else if (x >= initW - maskW) {
                x = initW - maskW
            }
            if (y <= 0) {
                y = 0
            } else if (y >= initH - maskH) {
                y = initH - maskH
            }
            return page = {
                x: x,
                y: y
            }
        }
    } //电脑端详情组图
    $.fn.myslider = function (options) {
        var def = {
            targetDom: null, //目标元素
            color: null,  //颜色
            runing:true  //是否自动切换
        }
        var self = $(this);
        var options = $.extend(def, options);
        var target = self.find(options.targetDom);
        var imgLi = target.children();
        var len = imgLi.length;
        var imgArr = [];
        var runing = options.runing;
        var color = options.color;
        var dW = $(document).width();
        var nowIndex = 0,
            timer = null,
            flag = true;
        var obj = {
            init: function () {
                this.render();
                this.bind();
                this.changeStyle();
                this.autoMove();
                this.swiper();
            },
            render: function () {
                var htmlStr = '<ol class="cur-list"></ol>\
                <div class="prev-btn">\
                    <i class="fa fa-angle-left" aria-hidden="true"></i>\
                </div>\
                <div class="next-btn">\
                    <i class="fa fa-angle-right" aria-hidden="true"></i>\
                </div>'
                self.append(htmlStr);
                var curBox = self.find('.cur-list');
                var str = '';
                for (var i = 0; i < len; i++) {
                    str += '<li></li>'
                }
                curBox.append(str);
                var curLi = curBox.find('li');
                var clone = target.html();
                target.append(clone);
                imgLi = target.children();
                curLi.eq(0).addClass('active');
                imgLi.width(1 / (len * 2) * 100 + '%');
                target.width((len * 2) * 100 + '%');
                imgLi.eq(0).find('.tit').show().css({
                    top: '50%'
                })
                target.css({
                    left: 0
                });
                curBox.find('li').css({
                    borderColor: color
                });
            },
            changeStyle: function () {
                var curBox = self.find('.cur-list');
                curBox.find('li').attr('style', '').css({
                    borderColor: color
                });
                if (color) {
                    curBox.find('.active').css({
                        background: color,
                        borderColor: color
                    })
                }
            },
            bind: function () {
                var curLi = self.find('.cur-list li');
                var prev = self.find('.prev-btn');
                var next = self.find('.next-btn');
                var _this = this;
                $(curLi).add($(prev)).add($(next)).on('click', function () {
                    if ($(this).attr('class') == 'prev-btn') {
                        _this.move('prev-btn');
                    } else if ($(this).attr('class') == 'next-btn') {
                        _this.move('next-btn');
                    } else {
                        _this.move($(this).index())
                    }
                })
                self.on('mouseover', function () {
                    clearTimeout(timer)
                }).on('mouseout', function () {
                    _this.autoMove();
                })
            },
            autoMove: function () {
                if(runing){
                    var _this = this;
                    var lens = target.find('li').length;
                    clearTimeout(timer);
                    timer = setTimeout(function () {
                        _this.move('next-btn');
                    }, 3000)
                }
            },
            move: function (value) {
                var curBox = self.find('.cur-list');
                var lens = target.find('li').length;
                var w = target.find('li').width();
                var l = target.offset().left;
                if (l == -w * (lens / 2)) {
                    target.css({
                        left: '0%'
                    })
                } else if (l == -w * (lens / 2 + 1)) {
                    target.css({
                        left: '-100%'
                    })
                }
                if (flag) {
                    flag = false;
                    if (value == 'prev-btn') {
                        if (nowIndex == 0) {
                            target.css({
                                left: -len * 100 + '%'
                            })
                            nowIndex = len - 1;
                        } else {
                            nowIndex--;
                        }
                    } else if (value == 'next-btn') {
                        nowIndex++;
                        if (nowIndex == len) {
                            target.animate({
                                left: -len * 100 + '%'
                            }, function () {
                                $(this).css({
                                    left: '0%'
                                })
                            });
                            nowIndex = 0;
                        }
                    } else {
                        nowIndex = value
                    }
                    this.changeIndex(nowIndex);
                    this.sliderMove();
                }
            },
            sliderMove: function () {
                var _this = this;
                target.animate({
                    left: -nowIndex * 100 + '%'
                }, function () {
                    flag = true;
                    _this.autoMove();
                })
            },
            changeIndex: function (index) {
                self.find('.cur-list .active').removeClass('active');
                self.find('.cur-list li').eq(index).addClass('active');
                this.changeStyle();
            },
            swiper: function () {
                var _this = this;
                var startX, startY, l;
                var w = target.find('li').width();
                var lens = target.find('li').length;
                var X, Y, mobTimer = null;

                function fram() {
                    w = target.find('li').width()
                    requestAnimationFrame(fram)
                };
                fram();
                self.on("touchstart", startFn);

                function startFn(e) {
                    clearTimeout(timer);
                    if (nowIndex == 0) {
                        target.css({
                            left: -w * (lens / 2) + 'px'
                        })
                    } else if (nowIndex == 1) {
                        target.css({
                            left: -w + 'px'
                        })
                    }
                    startX = e.originalEvent.changedTouches[0].pageX;
                    startY = e.originalEvent.changedTouches[0].pageY;
                    l = target.position().left;
                    self.on("touchmove", moveFn);
                    self.on("touchend", endFn);
                }

                function moveFn(e) {
                    var moveEndX = e.originalEvent.changedTouches[0].pageX,
                        moveEndY = e.originalEvent.changedTouches[0].pageY;
                    X = moveEndX - startX;
                    Y = moveEndY - startY;
                    e.preventDefault();
                    target.css({
                        left: l + X + 'px'
                    })
                }

                function initLeft() {
                    if (target.position().left == -w * (lens / 2)) {
                        target.css({
                            left: 0
                        })
                    }
                }

                function endFn() {
                    if (Math.abs(X) > w / 5) {
                        if (X < 0) {
                            $(target).animate({
                                left: l + (-w) + 'px'
                            }, function () {
                                initLeft()
                            })
                            nowIndex++;
                            if (nowIndex >= lens / 2) {
                                nowIndex = 0
                            }
                        } else if (X > 0) {
                            $(target).animate({
                                left: l + w + 'px'
                            }, function () {
                                initLeft()
                            })
                            nowIndex--;
                            if (nowIndex < 0) {
                                nowIndex = lens / 2 - 1
                            }
                        }
                    } else if (Math.abs(X) < w / 5) {
                        $(target).animate({
                            left: l + 'px'
                        }, function () {
                            initLeft()
                        })
                    }

                    X = 0;
                    self.unbind('touchmove touchend');
                    _this.changeIndex(nowIndex);
                    _this.autoMove();
                }
            }

        }
        obj.init();
    } //轮播图
    $.fn.backTop = function (options) {
        var def = {
            speed: 500,  //速度
            color: null,  //初始颜色
            hoverColor: null //鼠标移入颜色
        }
        var opt = $.extend(def, options);
        var top = opt.top;
        var speed = opt.speed;
        var color = opt.color;
        var hoverColor = opt.hoverColor;
        var self = $(this);
        var dw = $(document).width()
        self.css({
            background: color
        })
        if (dw > 768) {
            self.on('mouseover', function () {
                self.css({
                    background: hoverColor
                })
            }).on('mouseout', function () {
                self.css({
                    background: color
                })
            })
        }

        function move() {
            $(window).scroll(function () {
                var scrollTop = $(this).scrollTop();
                if (scrollTop > 300) {
                    self.fadeIn();
                } else {
                    self.fadeOut();
                }
            })
        }
        move();

        function clickFn() {
            self.on('click', function () {
                $('html,body').animate({
                    scrollTop: 0
                }, speed)
            })
        }
        clickFn();
    } //返回顶部
    $.fn.sliderItem = function (options) {
        var def = {
            showLen: 4,  //显示个数
            runing: true, //是否自动切换
            speed: 1500, //速度
            targetDom: null, //目标元素
        };
        var opt = $.extend(def, options);
        var showLen = opt.showLen,
            running = opt.running,
            target = $(this).find(opt.targetDom),
            speed = opt.speed,
            color = opt.color,
            running = opt.running;
        var _this = $(this);
        var imgLi, len, key = true;
        var item, winW, w, timer, moveW;
        var index = 0;

        function render() {
            var html = '<div class="prev">\
                    <i class="fa fa-angle-left" aria-hidden="true"></i>\
                </div>\
                <div class="next">\
                    <i class="fa fa-angle-right" aria-hidden="true"></i>\
                </div>';
            _this.append(html);
            var clone = target.html();
            target.append(clone);
            imgLi = target.children();
            len = target.children().length;
        }
        render();
        bindEvent();

        function bindEvent() {
            var prev = _this.find('.prev');
            var next = _this.find('.next');
            prev.on('click', function () {
                clickFn('prev');
            })
            next.on('click', function () {
                clickFn('next');
            })
            _this.on('mouseover', function () {
                clearInterval(timer);
            }).on('mouseout', function () {
                move()
            })
        }

        function clickFn(val) {
            clearInterval(timer);
            if (key) {
                key = false;
                if (val == 'prev') {
                    if (index == 0) {
                        target.css({
                            left: -(moveW * len / 2) + '%'
                        })
                        index = len / 2 - 1;
                    } else {
                        index--;
                    }

                } else {
                    index++;
                    if (index == len / 2) {
                        target.animate({
                            left: -(moveW * (len / 2)) + '%'
                        }, function () {
                            target.css({
                                left: 0
                            })
                        })
                        index = 0;
                    }
                }
                target.animate({
                    left: -moveW * index + '%'
                }, function () {
                    key = true;
                    move()
                })
            }
        }

        function frame() {
            item = Math.ceil(len / showLen);
            if (winW <= 768) {
                showLen = 1;
            } else {
                showLen = opt.showLen;
            }
            if (showLen > len / 2) {
                showLen = 4;
            }
            w = (100 / showLen / item);
            moveW = (100 / showLen);
            winW = $(document).width();
            target.width(item * 100 + '%');
            imgLi.css({
                width: w + '%'
            });
            requestAnimationFrame(frame);
        }
        frame()

        function move() {
            if (running) {
                var next = _this.find('.next');
                clearInterval(timer);
                timer = setInterval(function () {
                    clickFn('next');
                }, speed)
            }
        }
        move()
    } //list轮播
    $.fn.dragMove = function (options) {
        var def = {
            showLen: 5,  //显示数量
            targetDom: null, //目标元素
            runing: true, //是否自动切换
            isMin: false , //手机端显示一个
            speed:1500, //速度
        }
        var opt = $.extend(def, options);
        var showLen = opt.showLen,
            target = $(this).find(opt.targetDom);
        var self = $(this);
        var min = opt.isMin
        var li = target.children();
        var len = li.length;
        var item, winW, curW, liW;
        var winW = $(document).width()
        var htmlStr = '<button class="prev-btn off" disabled>\
                          <i class="fa fa-angle-left" aria-hidden="true"></i>\
                        </button>\
                        <button class="next-btn">\
                            <i class="fa fa-angle-right" aria-hidden="true"></i>\
                        </button>';
        self.append(htmlStr);
        target.width(len * 100 + '%');
        li.width(100 / len / showLen + '%');
        target.css({
            left: '0%'
        });
        var l = target.offset().left;
        var t = target.offset().top;
        var initL,initT, lastX = 0;
        var num = 0;
        var disX,disY,newTop;
        var speed = 0;
        var first = 0,
            last = 0,
            key = false;
        var myfirst = 0,
            mylast = 0;
        var hArr = [];
        var leftBtn = self.find('.prev-btn');
        var rightBtn = self.find('.next-btn');
        var nowIndex = 0;
        var timer;
        var listA = target.find('a');
        var flag = true;
        var key = true;
        if (len <= showLen) {
            self.find('button').hide()
        }
        leftBtn.on('click', function () {
            clickMove('left')
        });
        rightBtn.on('click', function () {
            clickMove('right')
        });
        showLens()
        auto()

        function clickMove(val) {
            clearInterval(timer)
            var moveLen = 100 / showLen;
            if (val == 'left') {
                nowIndex--;
                if (nowIndex < 0) {
                    nowIndex = 0;
                    flag = true;
                }
            } else if (val == 'right') {
                nowIndex++;
                if (nowIndex > len - showLen) {
                    nowIndex = len - showLen
                    flag = false;
                }
            }
            target.animate({
                left: -nowIndex * moveLen + '%'
            }, function () {
                changeBtn()
                if (opt.runing && len > showLen) {
                    auto()
                }
            })
        }

        function auto() {
            if (opt.runing && len > showLen) {
                move()
            }
        }

        function move() {
            clearInterval(timer)
            timer = setInterval(function () {
                if (flag) {
                    clickMove('right')
                } else {
                    clickMove('left')
                }
            }, opt.speed)
        }
        if (opt.runing && len > showLen) {
            target.on('mouseover', function () {
                clearInterval(timer);
            }).on('mouseout', function () {
                auto()
            })
            auto()
        } else {
            target.on('mousedown', function (event) {
                clearInterval(timer);
                if (len > showLen) {
                    listA.attr('href', 'javascript:void(0)')
                    first = new Date().getTime();
                    initL = target.position().left;
                    var e = event || window.event;
                    e.stopPropagation();
                    myfirst = e.clientX;
                    disX = e.clientX - l;
                    $(document).on('mousemove', moveFn);
                    $(document).on('mouseup', upFn);
                }
            })
        }

        function changeBtn() {
            leftBtn.add(rightBtn).removeClass('off').attr('disabled', false);
            if (nowIndex == 0) {
                leftBtn.addClass('off').attr('disabled', 'disabled');
            }
            if (nowIndex == len - showLen) {
                rightBtn.addClass('off').attr('disabled', 'disabled')
            }
        }
        listA.each(function () {
            var href = $(this).attr('href');
            hArr.push(href);
        })

        function moveFn(event) {
            var e = event || window.event;
            e.preventDefault();
            var newLeft = e.clientX - disX - l + initL;
            target.css({
                left: newLeft + 'px'
            });
            speed = e.clientX - lastX;
            lastX = e.clientX;
        }

        function upFn(e) {
            mylast = e.clientX;
            moveAuto();
            if (last - first < 200 && mylast - myfirst == 0) {
                hArr.forEach(function (ele, index) {
                    listA.eq(index).attr('href', ele)
                })
            }
            $(document).unbind('mousemove mouseup')
        }

        function moveAuto() {
            clearInterval(timer);
            last = new Date().getTime();
            var l = target.position().left;
            var maxL = liW * len - curW;

            function retL() {
                var moveL = 0;
                var a = Math.ceil((l + speed) / liW) * liW;
                var b = Math.floor((l + speed) / liW) * liW;
                if (l >= 0) {
                    moveL = 0;
                } else if (l <= -maxL) {
                    moveL = -maxL;
                } else {
                    a >= 0 ? a = 0 : a;
                    b <= -maxL ? b = -maxL : b;
                    if (speed > 0) {
                        moveL = a;
                    } else if (speed < 0) {
                        moveL = b;
                    }
                }
                return moveL
            }
            nowIndex = Math.abs(Math.floor(retL() / liW));
            changeBtn()
            target.animate({
                left: retL() + 'px'
            })
        }
        if (len > showLen) {
            target.on('touchstart', function (e) {
                key = false;
                clearInterval(timer);
                first = new Date().getTime();
                initL = target.position().left;
                initT = target.position().top;
                disY = e.originalEvent.changedTouches[0].clientY - t;
                disX = e.originalEvent.changedTouches[0].clientX - l;
            }).on('touchmove', function (e) {
                if(key){
                    e.stopPropagation();
                    e.preventDefault();
                }
                last = new Date().getTime();
                var newLeft = e.originalEvent.changedTouches[0].clientX - disX - l + initL;
                newTop = Math.abs( e.originalEvent.changedTouches[0].clientY - disY - t + initT);
                target.css({
                    left: newLeft + 'px'
                });
                speed = e.originalEvent.changedTouches[0].clientX - lastX;
                lastX = e.originalEvent.changedTouches[0].clientX;
                
            }).on('touchend', function () {
                moveAuto();
                if (opt.runing && len > showLen) {
                    auto();
                } 
                key = false;
            })
        }

        function showLens() {
            if (winW > 1200) {
                showLen = opt.showLen;
            } else if (winW <= 1200 && winW > 800) {
                showLen = 3;
            } else if (winW <= 800) {
                if (min) {
                    showLen = 1;
                } else {
                    showLen = 2;
                }
            }
        }

        function frame() {
            item = Math.ceil(len / showLen);
            showLens()
            w = (100 / showLen / item);
            curW = self.width();
            moveW = (100 / showLen);
            winW = $(document).width();
            target.width(item * 100 + '%');
            li.css({
                width: w + '%'
            });
            liW = li.outerWidth();
            requestAnimationFrame(frame);
        }
        frame()
    } //拖动List
    $.fn.can = function (options) {
        var def = {
            color: '#30a6de', //颜色
            font: '24px',  //字体大小
            height: 60,    //高度
            callback: null,  //回调
            type: ''   //数字'number',字母：'word'
        }
        opt = $.extend(def, options);
        var self = $(this);
        var color = opt.color;
        var font = opt.font;
        var height = opt.height;
        var callback = opt.callback;
        var type = opt.type;
        var arr = [];
        var canStr, str;

        function word() {
            var arr = []
            for (var i = 65; i < 122; i++) {
                if (i > 90 && i < 97) {
                    continue;
                }
                arr.push(String.fromCharCode(i));
            }
            return arr
        }
        if (type == 'word') {
            arr = word()
        } else if (type == 'number') {
            var numArr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0]
            arr = arr.concat(numArr)
        } else {
            arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0]
            arr = arr.concat(word())
        }

        function draws() {
            canStr = '';
            str = '';
            for (var i = 0; i < 4; i++) {
                var a = arr[Math.floor(Math.random() * arr.length)]
                canStr += a + ' ';
                str += a;
            }
            var can = self[0];
            if (can) {
                var cxt = can.getContext('2d');
                cxt.clearRect(0, 0, can.width, can.height);
                cxt.font = font + ' Microsoft Yahei';
                cxt.fillStyle = color;
                cxt.textAlign = "center";
                cxt.setTransform(1, -0.1, 0.1, 1, 0, 8);
                cxt.fillText(canStr, can.width / 2, height);
            }
            return str;
        }
        callback(draws())
        self.on('click', function (e) {
            callback(draws())
            e.preventDefault();
        })
    } //验证码
    $.fn.waitTime = function (options) {
        var def = {
            duration: 600,  //持续时间
            showDay: false, //是否显示天，小时
            endFn: null  //结束回调
        }
        var opt = $.extend(def, options)
        var duration = opt.duration * 1000;
        var showDay = opt.showDay
        var endFn = opt.endFn
        var timer;
        $(this).each(function () {
            var self = $(this)
            render(self)
        })

        function render(self) {
            var startTime = parseInt(self.attr('data-time'));
            var endTime = startTime + duration;
            var nowTime = new Date().getTime();
            overTime = endTime - nowTime
            timer = setTimeout(function () {
                render(self)
            }, 1000)
            if (overTime > 0) {
                renderTime(self, overTime)
            } else {
                clearTimeout(timer)
                typeof endFn == 'function' ? endFn() : ''
            }
        }

        function renderTime(el, time) {
            var days = checkTime(parseInt(time / 1000 / 60 / 60 / 24, 10));
            var hours = checkTime(parseInt(time / 1000 / 60 / 60 % 24, 10));
            var minutes = checkTime(parseInt(time / 1000 / 60 % 60, 10));
            var seconds = checkTime(parseInt(time / 1000 % 60, 10));
            var html
            if (showDay) {
                html = '<span>' + days + 'days </span><span>' + hours + '</span>:<span>' + minutes + '</span>:<span>' + seconds + '</span>';
            } else {
                html = '<span>' + minutes + '</span>:<span>' + seconds + '</span>';
            }
            el.html(html);
        }

        function checkTime(i) {
            if (i < 10) {
                i = "0" + i;
            }
            return i;
        }
    } //倒计时
    $.fn.countDown = function (options) {
        var def = {
            callback: null,  //结束回调
            barH: 10,        //进度条高度
            barC: '#f34764'  //进度条颜色
        }
        var options = $.extend(def, options);
        $(this).each(function () {
            var arr = [];
            var leftTime = 0;
            var startStr = $(this).find('.start').val();
            var endStr = $(this).find('.end').val();
            var endArr = endStr.split('/');
            var startArr = startStr.split('/');
            var w;
            var timers;
            var myDate = $(this).find('.date');
            var d_dom = myDate.find('.d-days')
            var t_dom = myDate.find('.d-times')
            startArr.forEach(function (ele, index) {
                if (index == 1) {
                    ele = parseInt(ele) - 1
                }
                arr.push(parseInt(ele));
            })
            $(this).find('.progress-out').css({
                borderRadius: options.barH / 2 + 'px'
            });
            var pr = $(this).find('.progress-in').css({
                background: options.barC,
                height: options.barH + 'px',
                borderRadius: options.barH / 2 + 'px'
            });
            var prt = $(this).find('.percent-show .prt');
            var startDate = new Date(...arr).getTime();
            timer(...endArr);

            function timer(year, month, day, hour, minute, second) {
                delDate = new Date(year, month - 1, day, hour, minute, second).getTime();
                nowDate = new Date().getTime();
                leftTime = (new Date(year, month - 1, day, hour, minute, second)) - (new Date());
                w = Math.ceil(leftTime / (delDate - startDate) * 100);
                var days = parseInt(leftTime / 1000 / 60 / 60 / 24, 10);
                var hours = parseInt(leftTime / 1000 / 60 / 60 % 24, 10);
                var minutes = parseInt(leftTime / 1000 / 60 % 60, 10);
                var seconds = parseInt(leftTime / 1000 % 60, 10);
                hours = checkTime(hours);
                minutes = checkTime(minutes);
                seconds = checkTime(seconds);
                timers = setTimeout(function () {
                    timer(...endArr)
                }, 1000);
                if (days <= 0) {
                    d_dom.hide()
                }
                if (leftTime > 0 && leftTime) {
                    render(days, hours, minutes, seconds);
                } else if (leftTime <= 0) {
                    w = 0;
                    typeof options.callback == 'function' ? options.callback() : ''
                    clearTimeout(timers)
                }
                if (w >= 100) {
                    w = 100
                }
                pr.width(w + '%');
                prt.html(w);
            }

            function checkTime(i) {
                if (i < 10) {
                    i = "0" + i;
                }
                return i;
            }

            function render(days, hours, minutes, seconds) {
                var str_d, str_t
                str_d = '<span>' + days + '<span>'
                str_t = '<span>' + hours + ":" + minutes + ":" + seconds + '<span>'
                d_dom.find('.d-days-num').html(str_d)
                t_dom.html(str_t);
            }
        })
    } //倒计时秒杀
    $.fn.alertModel = function (options) {
        var def = {
            mask:0.5,//遮罩透明度
            btn:null,//绑定弹窗点击按钮
        }
        function prevent(event){
            event.preventDefault()
            event.stopPropagation()
        }
        var opt = $.extend(def,options);
        var self = $(this);
        opt.btn.on('click',function(){
            var mask = $('<div class="alert-model-mask"></div>').css({
                background:'rgba(0,0,0,'+opt.mask+')'
            })
            $('body').append(mask)
            mask.fadeIn();
            self.addClass('alert-model');
            self.fadeIn()
            mask.on('click',function(){
                mask.fadeOut(300,function(){
                    $(this).remove()
                })
                self.fadeOut(300,function(){
                    $(this).removeClass('alert-model')
                })
            })
        })
    } //弹窗模块
    $.fn.myForm = function (options) {
        var def = {
            info:'Please enter your',   //初始提示信息
            verify: null,       //验证方法集合
            ajax: null,          //提交按钮执行函数
            stopScroll:true      //错误信息弹窗关闭是否关闭禁止滚动
        }
        var opt = $.extend(def, options)
        var verify = opt.verify
        var ajax = opt.ajax
        var self = $(this)
        var data = {}
        var inp = self.find('.inp')
        var url = self.attr('action')
        var info = opt.info;
        self.on('click', '.sub-btn', function () {
            var msgObj = retmsgObj(verify)
            var arr = []
            if (JSON.stringify(msgObj) !== "{}") {
                for(var key in msgObj){
                    arr.push(msgObj[key])
                }
                $.myAlert({
                    msg: arr,
                    stopScroll:opt.stopScroll
                })
                return false
            } else {
                typeof ajax == 'function' ? ajax.apply(self,[data, url]) : ''
            }
            return false
        })

        function retmsgObj(verify) {
            var msgObj = {};
            inp.each(function () {
                var val = $(this).val();
                var check = $(this).attr('data-verify');
                var name = $(this).attr('name');
                var tit = $(this).attr('data-tit')
                var text = info + ' ' + tit;
                var self = $(this)
                data[name] = val
                if (val == '') {
                    if (check !== '' && !check) {
                        msgObj[name] = text
                    }
                }
                if (verify) {
                    for (var key in verify) {
                        if (key == name) {
                            if (typeof verify[key] == 'object') {
                                var reg = verify[key][0]
                                var msg = verify[key][1]
                                if (reg && val !== '') {
                                    if (!reg.test(self.val())) {
                                        msgObj[key] = msg
                                    }
                                }
                            }
                            if (typeof verify[key] == 'function') {
                                var msg = verify[key](self.val())
                                if (msg && val !== '') {
                                    msgObj[key] = msg
                                }
                            }
                        }
                    }
                }
            })
            return msgObj
        }
    } //表单验证
    $.fn.checkBox = function (options) {
        var def = {
            yes: null,   //选中执行函数
            no: null      //反选执行函数
        }
        var opt = $.extend(def, options)
        var yes = opt.yes,
            no = opt.no
        var self = $(this)
        self.on('click', function () {
            if ($(this).hasClass('active')) {
                $(this).removeClass('active')
                $(this).find('input').val('false')
                typeof no == 'function' ? no.call(self) : ''
            } else {
                $(this).addClass('active')
                $(this).find('input').val('true')
                typeof yes == 'function' ? yes.call(self) : ''
            }
        })

    } //单选框
    $.fn.review = function (options) {
        var def = {
            showNum: false,  //是否显示评分
        }
        var opt = $.extend(def, options)

        $(this).each(function () {
            var self = $(this)
            var num = self.attr('data-num')
            var star = self.find('.icons-box i')
            if (opt.showNum) {
                self.find('.num-box').show()
            } else {
                self.find('.num-box').hide()
            }
            var int = num[0];
            var dec = num[2];
            var star = $(this).find('i');
            for (var i = 0; i < int; i++) {
                star.eq(i).attr('class', 'fa fa-star');
            }
            star.eq(int).attr('class', rename());
            function rename() {
                if (dec > 0) {
                    return 'fa fa-star-half-o'
                } else {
                    return 'fa fa-star-o'
                }
            }
        })
    } //评分
    $.fn.addCart = function (options) {
        var def = {
            addFn: null,  //添加按钮执行函数
            cutFn: null,  //减少按钮执行函数
            inpBlur: null, //输入框失焦执行函数
            btn: null,     //关联按钮
            ajax: null,   //按钮提交执行函数
        }
        var opt = $.extend(def, options)
        var btn = opt.btn;
        var totalArr=[];
        $(this).each(function (index) {
            var self = $(this)
            var max = parseInt(self.attr('data-max'))
            var add = self.find('.add-btn')
            var cut = self.find('.cut-btn')
            var inp = self.find('.num-inp')
            var allBtn = self.find('.btn');
            var price = Number(self.attr('data-price'));
            var par = self.parents('.addCart-item');
            var totalDom = par.find('.total-num')
            var id = parseInt(self.attr('data-id'));
            var url = self.attr('ajax-url');
            var n = parseInt(inp.val());
            totalArr.push(price*n);
            if (inp.val() > 1) {
                cut.removeClass('off')
            }
            if (inp.val() >= max) {
                inp.val(max)
                add.addClass('off')
            }
            function fn(n,hander){
                var total = (price*n).toFixed(2)
                totalDom.text(total)
                inp.val(n)
                typeof opt[hander] == 'function' ? opt[hander](n,total,id,url,index) : ''
            }
            add.on('click', function () {
                var num = parseInt(inp.val())
                var n = retNum(num, 'add');
                fn(n,'addFn')
            })
            cut.on('click', function () {
                var num = parseInt(inp.val())
                var n = retNum(num, 'cut')
                fn(n,'cutFn')
            })
            inp.on('input', function () {
                var num = parseInt($(this).val())
                if (isNaN(num)) {
                    num = 1
                }
                var dom = allBtn
                if (num <= 1) {
                    dom = cut
                }
                if (num >= max) {
                    dom = add
                }
                inp.val(retNum(num))
            })
            inp.on('blur', function () {
                var n = parseInt(inp.val())
                fn(n,'inpBlur')
            })

            function retNum(num, val) {
                allBtn.removeClass('off')
                if (val == 'cut') {
                    num--
                } else if (val == 'add') {
                    num++
                }
                if (num <= 1) {
                    num = 1
                    cut.addClass('off')
                }
                if (num >= max) {
                    num = max
                    add.addClass('off')
                }
                return num
            }
            if (btn) {
                btn.on('click', function () {
                    var n = parseInt(inp.val())
                    var total = (price*n).toFixed(2);
                    var url = $(this).attr('ajax-url')
                    typeof opt.ajax == 'function' ? opt.ajax(n,total,id,url,index) : ''
                })
            }
        })
    } //添加购物车
    $.fn.myTab = function () {
        var self = $(this)
        var btn = self.find('.tab-btn-box>li')
        var item = self.find('.tab-content-box>li')
        btn.eq(0).addClass('active')
        item.eq(0).show()
        btn.on('click', function () {
            var index = $(this).index()
            if (!$(this).hasClass('active')) {
                btn.removeClass('active')
                $(this).addClass('active')
                item.fadeOut()
                item.eq(index).fadeIn()
            }
        })
    } //选项卡
    $.fn.removeList = function (options) {
        var def = {
            leer: null, //清空list出现的提示元素
            list: null //要删除的list元素
        }
        var opt = $.extend(def, options);
        var leer = opt.leer;
        var list = opt.list;
        $(this).each(function () {
            var li = $(this).parents('.table-item')
            li.remove()
            hideFn()
        })

        function hideFn() {
            var len = list.find('.table-item').length;
            if (len == 0) {
                list.hide()
                leer.show()
            }
        }
    } //删除列表
    $.fn.bread = function(){
        var self = $(this);
        var icon = self.attr('data-split');
        var a = self.children();
        var len = a.length;
        var str = ''
        a.each(function(i){
            var html = $(this).prop("outerHTML");
            if(i == len - 1 ){
                str += html
            }else{
                str += html+'<span class="split">'+icon+'</span>'
            }
        })
        self.html(str);
    }
    $.fn.tips = function(options){
        var def = {
            direction:''  //鼠标移入时提示框方向
        }
        var opt = $.extend(def,options);
        $(this).each(function(){
            $(this).hover(function(){
                var tips = $(this).find('.tips');
                var h = tips.outerHeight() + 10;
                var scroll = $(window).scrollTop();
                var top = $(this).offset().top;
                var num = top - scroll;
                function tops(){
                    tips.css({
                        top:-h+'px',
                        bottom:'auto'
                    }).fadeIn(30).addClass('active');
                }
                function bottoms(){
                    tips.css({
                        bottom:-h+'px',
                        top:'auto'
                    }).fadeIn(30).addClass('active tips_bot'); 
                }
                if(opt.direction == 'top'){
                    tops(); 
                }else if(opt.direction == 'bottom'){
                    bottoms();
                }else{
                    if(num < 400){
                        bottoms();
                    }else{
                        tops();
                    }
                }
                tips.hover(function(e){
                    e.stopPropagation();
                    $(this).fadeOut().removeClass('active tips_bot'); 
                })
            },function(){
                var tips = $(this).find('.tips');
                tips.fadeOut().removeClass('active tips_bot');
            }) 
        }) 
    }
    $.extend({
        myAlert: function (options) {
            var def = {
                title: '',  //标题
                msg: [],    //提示信息
                mask: 0.6,  //遮罩透明度
                size:'',    //弹窗大小,mid、max、min
                btnText: [], //按钮文本，第一个默认确认，第二个默认取消
                video: '',  //播放器弹窗地址
                stopScroll:true //错误信息弹窗关闭是否关闭禁止滚动
                // btn0:function(){

                // }回调函数以命名btn0,btn1...以此类推
            }
            var opt = $.extend(def, options)
            var alert;
            var content;
            var btnBox;
            var mask;
            function stopScroll(){
                $('html').addClass('noScroll')
                alert.on('touchmove',prevent)
            }
            function reScroll(){
                $('html').removeClass('noScroll')
                alert.off('touchmove',prevent)
            }
            function prevent(e){
                e.preventDefault()
            }
            function render() {
                var html = '<div class="alert-wrap" id="alert-wrap">\
                        <div class="alert-box">\
                            <div class="title"></div>\
                            <div class="remove-btn"><i class="iconfont icon-baseline-close-px"></i></div>\
                            <div class="content">\
                            </div>\
                            <div class="btn-box"></div>\
                        </div>\
                        <div class="alert-mask"></div>\
                </div>'
                $('body').append(html);
                alert = $('#alert-wrap').fadeIn()
                mask = alert.find('.alert-mask')
                mask.css({
                    background: 'rgba(0,0,0,' + opt.mask + ')'
                })
                if(opt.size){
                    alert.find('.alert-box').addClass(opt.size)  
                }
                alert.find('.alert-box').addClass('active')
                stopScroll()
            }
            render()
            renderBtn()
            appdendTit()
            appendContent()
            bind()

            function appendContent() {
                content = alert.find('.content')
                if (opt.msg.length) {
                    var str = ''
                    opt.msg.forEach(function (ele, index) {
                        str += '<p>' + ele + '</p>'
                    })
                    content.append(str)
                }
                if (opt.video) {
                    var iframe = $('<iframe src="' + opt.video + '" allowfullscreen></iframe>')
                    content.append(iframe)
                    alert.addClass('video')
                }
            }

            function appdendTit() {
                var tit = alert.find('.title')
                if (opt.title) {
                    tit.html(opt.title)
                } else {
                    tit.hide()
                }
            }

            function bind() {
                var removeBtn = alert.find('.remove-btn')
                var btn = btnBox.find('button')
                removeBtn.add(mask).on('click', function () {
                    alertHide()
                })
                var data = {
                    title: opt.title,
                    msg: opt.msg,
                    video: opt.video,
                }
                $(btn[0]).on('click', function () {
                    var text = opt.btnText[0]
                    data.btnText = text
                    typeof opt['btn' + 0] == 'function' ? opt['btn' + 0](data) : ''
                    alertHide()
                })
                $(btn[1]).on('click', function () {
                    var text = opt.btnText[1]
                    data.btnText = text
                    typeof opt['btn' + 1] == 'function' ? opt['btn' + 1](data) : ''
                    alertHide()
                })
                var index = 0
                for (var key in opt) {
                    var len = key.length;
                    index = parseInt(key.substring(3, len))
                    if (typeof index == 'number') {
                        btn.each(function (i) {
                            if (i == index && index > 1) {
                                $(this).on('click', function () {
                                    var text = opt.btnText[index]
                                    data.btnText = text
                                    typeof opt['btn' + i] == 'function' ? opt['btn' + i](data) : ''
                                    alertHide()
                                })
                            }
                        })
                    }
                }
            }

            function alertHide() {
                alert.fadeOut(300, function () {
                    $(this).remove()
                })
                alert.find('.alert-box').removeClass('active')
                if(opt.stopScroll){
                    reScroll()
                }  
            }

            function renderBtn() {
                btnBox = alert.find('.btn-box')
                if (opt.btnText.length) {
                    var str = ''
                    opt.btnText.forEach(function (ele, index) {
                        str += '<button class="btn' + index + '">' + ele + '</button>'
                    })
                    btnBox.append(str)
                } else {
                    btnBox.hide()
                }
            }
        }, //弹出框
        myPrompt: function (options) {
            var def = {
                title: 'Prompt',  //标题
                msg: '',          //信息
                mask: 0.6,        //遮罩透明度
                duration:2000,    //持续时间 
                callback: null    //回调函数
            }
            var opt = $.extend(def, options)
            var alert
            var mask
            var callback = opt.callback;
            var duration = opt.duration;
            function render() {
                var html = '<div class="alert-wrap prompt" id="alert-wrap-prompt">\
                        <div class="alert-box">\
                            <div class="title"></div>\
                            <div class="remove-btn"><i class="iconfont icon-baseline-close-px"></i></div>\
                            <div class="content">\
                            </div>\
                        </div>\
                        <div class="alert-mask"></div>\
                </div>'
                $('body').append(html)
                alert = $('#alert-wrap-prompt').fadeIn()
                mask = alert.find('.alert-mask')
                mask.css({
                    background: 'rgba(0,0,0,' + opt.mask + ')'
                })
                alert.find('.alert-box').addClass('active')
                timer = setTimeout(function () {
                    alertHide()
                }, duration)
            }
            render()
            appdendTit()
            appendContent()

            function appendContent() {
                content = alert.find('.content')
                if (opt.msg) {
                    var str = '<p>' + opt.msg + '</p>'
                    content.append(str)
                }
            }

            function appdendTit() {
                var tit = alert.find('.title')
                if (opt.title) {
                    tit.html(opt.title)
                } else {
                    tit.hide()
                }
            }

            function alertHide() {
                alert.fadeOut(300, function () {
                    $(this).remove()
                    typeof callback == 'function' ? callback({
                        title: opt.title,
                        msg: opt.msg
                    }) : ''
                })
                alert.find('.alert-box').removeClass('active')
            }
        }, //提示框
        myLoading: function (options) {
            var def = {
                static: 'show',  //状态'show'或空为显示，'hide'为隐藏
                mask: 0.6,       //遮罩透明度
                callback: null   //回调函数
            }
            var opt = $.extend(def, options)
            var self = $('body')
            var html = '<div class="my-loading"><div class="load-mask"></div><div class="loading-wrap"><div class="loads"></div></div></div>'
            var position = self.css('position')
            var timer = null
            var loading = self.find('.my-loading');
            if(loading.length==0){
                self.append(html)
            }
            loading = self.find('.my-loading')
            var mask = loading.find('.load-mask')
            mask.css({
                background: 'rgba(0,0,0,' + opt.mask + ')'
            })
            if (position == 'static') {
                self.css({
                    position: 'relative',
                })
            }
            if (opt.static == 'show' || !opt.static) {
                loading.fadeIn()
                timer = setTimeout(function () {
                    hideFn()
                }, 3000)
            } else if (opt.static == 'hide') {
                hideFn()
            }

            function hideFn() {
                loading.fadeOut(500, function () {
                    typeof opt.callback == 'function' ? opt.callback() : ''
                    $(this).remove()
                })
            }
        }, //加载动画
    })
    $.fn.lazy = function(options) {
        var defaults = {
            // 在html标签中存放的属性名称；
            attr: "data-src",
            // 父元素默认为window
            container: window,
            callback: $.noop
        };
        // 不管有没有传入参数，先合并再说；
        var params = $.extend({}, defaults, options || {});
        // 把父元素转为jquery对象；
        var container = $(params.container);
        // 新建一个数组，然后调用each方法，用于存储每个dom对象相关的数据；
        params.cache = [];
        $(this).each(function() {
            // 取出jquery对象中每个dom对象的节点类型，取出每个dom对象上设置的图片路径
            var node = this.nodeName.toLowerCase(), url = $(this).attr(params["attr"]);
            //重组，把每个dom对象上的属性存为一个对象；
            var data = {
                obj: $(this),
                tag: node,
                url: url
            };
            // 把这个对象加到一个数组中；
            params.cache.push(data);
        });

        var callback = function(call) {
            if ($.isFunction(params.callback)) {
                params.callback.call(call);
            }
        };
        
        //每次触发滚动事件时，对每个dom元素与container元素进行位置判断，如果满足条件，就把路径赋予这个dom元素！
        var loading = function() {
            // 获取父元素的高度
            var contHeight = container.outerHeight();
            var contWidth = container.outerWidth();

            // 获取父元素相对于文档页顶部的距离，这边要注意了，分为以下两种情况；
            if (container.get(0) === window) {
                // 第一种情况父元素为window，获取浏览器滚动条已滚动的距离；$(window)没有offset()方法；
                var contop = $(window).scrollTop();
                var conleft = $(window).scrollLeft();
            } else {
                // 第二种情况父元素为非window元素，获取它的滚动条滚动的距离；
                var contop = container.offset().top;
                var conleft = container.offset().left;
            }

            $.each(params.cache, function(i, data) {
                var o = data.obj, tag = data.tag, url = data.url, post, posb, posl, posr;
                if (o) {
                    //对象顶部与文档顶部之间的距离，如果它小于父元素底部与文档顶部的距离，则说明垂直方向上已经进入可视区域了；
                    post = o.offset().top - (contop + contHeight);
                    //对象底部与文档顶部之间的距离，如果它大于父元素顶部与文档顶部的距离，则说明垂直方向上已经进入可视区域了；
                    posb = o.offset().top + o.height() - contop;

                    // 水平方向上同理；
                    posl = o.offset().left - (conleft + contWidth);
                    posr = o.offset().left + o.width() - conleft;

                    // 只有当这个对象是可视的，并且这四个条件都满足时，才能给这个对象赋予图片路径；
                    if ((/* o.is(':visible') && */ post <= 0 && posb >= 0) && (posr >= 0) ) {
                        if (url) {
                            //在浏览器窗口内
                            if (tag === "img") {
                                //设置图片src
                                callback(o.attr("src", url));
                            } else {
                                // 设置除img之外元素的背景url
                                callback(o.css("background-image", "url("+ url +")"));
                            }
                        } else {
                            // 无地址，直接触发回调
                            callback(o);
                        }
                        // 给对象设置完图片路径之后，把params.cache中的对象给清除掉；对象再进入可视区，就不再进行重复设置了；
                        data.obj = null;
                    }
                }
            });
        };
        //加载完毕即执行
        loading();
        //滚动执行
        container.bind("scroll", loading);
    };
})(jQuery)
