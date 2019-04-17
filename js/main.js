$(function () {
    $('.breadcrumb').bread();
    var w = $(document).width()
    if (w <= 800) {
        selectType = 'click';
        $('#account-nav').find('.toggle-li').off('click');
    } else {
        selectType = 'hover'
    }
    $('#nav-menu').navMenu({
        mask: 0.3
    })
    $('.select-dropdown').select({
        type: selectType,
        animate: 'slide'
    })
    $(window).scroll(function () {
        var scrollTop = $(this).scrollTop()
        if (scrollTop >= 200) {
            $('nav').addClass('fixed')
            $('.head-top').addClass('active')
        } else {
            $('nav').removeClass('fixed')
            $('.head-top').removeClass('active')
        }
    })
    $('.email-box .check-box').checkBox()
    $('.top-box').backTop({
        speed: '',
        color: '#000',
        hoverColor: '#5fc9d9'
    })
    $('#nav-menu-mob').navMenuMob({
        btn: $('#menu-icon')
    })
    $('#bot-nav').navMenuMob()

    function fram() {
        w = $(document).width()
        requestAnimationFrame(fram)
        if (w > 800) {
            $('nav .nav-menu-mob').hide()
        } else {
            if ($('.menu-icon').hasClass('active')) {
                $('nav .nav-menu-mob').slideDown()
            }
        }
    }
    fram()
    $(window).scroll(function () {
        var scrollTop = $(this).scrollTop();
        var box = $('.detail-fixed-box')
        if (scrollTop > 700) {
            if (w > 768) {
                box.stop().fadeIn();
            } else {
                box.addClass('mob').stop().fadeIn();
            }
        } else {
            if (w > 768) {
                box.stop().fadeOut();
            } else {
                box.stop().fadeOut();
            }
        }
    })
    $('.nav-menu>li>a').add('.sport-list li a').add('.search-btn').on('click',function(){
        localStorage.removeItem('sport_index');
        localStorage.removeItem('price');
        localStorage.removeItem('sort_index');
    })
})
//事件注册

function lazy() {
    $('.lazy').lazy()
}
lazy();
//懒加载



$(function () {
    var code;
    retCode()

    function retCode() {
        $.ajax({
            type: 'get',
            url: '/index/captcha/obtain',
            beforeSend: function () {
                if (code) {
                    $.myLoading()
                }
            },
            success: function (data) {
                if (code) {
                    $.myLoading({
                        static: 'hide'
                    })
                }
                $('#can-code').attr('src', data)
            },
            error: function () {

            }
        })
    } //更新验证码
    $('#can-code').on('click', function () {
        code = true
        retCode()
    })
    $('#email-form').myForm({
        verify: {
            email: [/^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,4}$/, 'E-mail format is incorrect.'],
            agree: function (value) {
                if (value == 'false') {
                    return 'Please agree to the Terms of Use and Privacy Policy.'
                }
            }
        },
        ajax: function (data, url) {
            var _tmp = 'footer_subscribe';
            gtag('event', _tmp, {
              'event_label': '底部订阅',
              'event_category': '公共'
            });

            $.ajax({
                url: url,
                data: data,
                type: 'post',
                dataType: 'Json',
                beforeSend: function () {
                    $.myLoading();
                },
                success: function (data) {
                    $.myLoading({
                        static: 'hide',
                        callback: function () {
                            $.myPrompt({
                                msg: [data.msg],
                            });
                            retCode();
                        }
                    });

                },
                error: function () {

                }
            })
        }
    })
})
//底部邮箱订阅


function AlertLogin(options) {
    var def = {
        mask: 0.5,
        url: '',
        type: 'post',
        success: null,
        error: null,
        val: {}
    }
    var opt = $.extend(def, options);
    var data = opt.val;
    this.options = opt;

    this.render = function () {
        var html = '<div class="login-alert">\
                        <div class="wrap login-box">\
                            <div class="remove-btn"><i class="iconfont icon-baseline-close-px"></i></div>\
                            <h1 class="login-tit">Login</h1>\
                            <form action="' + opt.url + '" id="alert-login-form">\
                                <div class="form-box clear-both">\
                                    <div class="item col-12 col">\
                                        <div class="inp-item">\
                                            <input type="text" class="inp rect-inp" name="email" data-tit="E-maii"\
                                                placeholder="Email">\
                                        </div>\
                                    </div>\
                                    <div class="item col-12 col">\
                                        <div class="inp-item">\
                                            <input type="password" class="inp rect-inp" name="password" data-tit="Password"\
                                                placeholder="Password">\
                                        </div>\
                                    </div>\
                                    <div class="item col-12 col">\
                                        <button class="rect-btn sub-btn max-btn oranger-btn">Sign in</button>\
                                        <button type="button" class="rect-btn max-btn oranger-btn" onclick="window.location.href=\'/index/social/facebook\'" style="margin:10px 0;background: #3b5998;">Login With Facebook</button>\
                                        <button type="button" class="rect-btn max-btn oranger-btn" onclick="window.location.href=\'/index/social/google\'" style="margin-bottom:10px;background: #dd4b39;">Login With Google</button>\
                                        <button type="button" class="rect-btn max-btn oranger-btn" onclick="window.location.href=\'/index/social/paypal\'" style="background: #55acee;">Login With Paypal</button>\
                                    </div>\
                                </div>\
                            </form>\
                        </div>\
                        <div class="alert-model-mask"></div>\
                    </div>'
        var len = $('.login-alert').length;
        if (!len) {
            $('body').append(html);
            var inp = $('.login-alert').find('.inp')
            if (data) {
                inp.each(function () {
                    var name = $(this).attr('name');
                    if (data[name]) {
                        $(this).val(data[name])
                    }
                })
            }
        }
    }
    this.bindEnvent = function () {
        function stopScroll() {
            $('html').addClass('noScroll')
            alert.on('touchmove', prevent)
        }

        function reScroll() {
            $('html').removeClass('noScroll')
            alert.off('touchmove', prevent)
        }

        function prevent(e) {
            e.preventDefault()
        }
        var dw = $(document).width();
        var alert = $('.login-alert')
        var mask = alert.find('.alert-model-mask').css({
            background: 'rgba(0,0,0,' + opt.mask + ')'
        });
        var removeBtn = alert.find('.remove-btn')
        var form = alert.find('#alert-login-form');
        stopScroll();
        alert.fadeIn()
        alert.find('.login-box').addClass('active')
        removeBtn.on('click', function () {
            hideFn()
        })
        if (dw <= 800) {
            mask.on('click', function () {
                hideFn()
            })
        }

        function hideFn() {
            alert.find('.login-box').removeClass('active');
            alert.fadeOut(300, function () {
                $(this).remove();
                reScroll();
            });
        }
        form.myForm({
            stopScroll: false,
            verify: {
                email: [/^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,4}$/,
                    'E-mail format is incorrect.'
                ],
                password: function (value) {
                    if (value.length < 6) {
                        return 'Password cannot be less than 6 digits'
                    }
                }
            },
            ajax: function (data, url) {
                $.ajax({
                    type: opt.type,
                    data: data,
                    url: url,
                    beforeSend: function () {
                        $.myLoading();
                    },
                    success: function (data) {
                        typeof opt.success == 'function' ? opt.success(data) : ''
                    },
                    error: function (data) {
                        typeof opt.error == 'function' ? opt.error(data) : ''
                    }
                })
            }
        })
    }
    this.render();
    this.bindEnvent();
}
// 弹窗登录

function Wish(options) {
    var def = {
        url: '',
        type: 'post',
        success: null,
        error: null,
        target:null
    }
    this.options = options;
    var opt = $.extend(def,options);
    var target = opt.target;
    var url = target.attr('ajax-url');
    var arrId = [];
    function getStatic(){
        var ids = arrId.join(',');
        $.ajax({
            type: 'post',
            url: url,
            data:{ids:ids},
            beforeSend: function () {
                
            },
            success: function (data) {
                if(data){
                   if(data.code == 0){
                        var ids = data.data;
                        target.each(function(){
                            var id = $(this).attr('data-id'); 
                            if(ids[id] == 1){
                                $(this).addClass('active');
                                $(this).find('i').attr('class','iconfont icon-ego-heartfull'); 
                            };
                        }) 
                   }
                }
            },
            error: function (data) {
    
            }
        });

    }
    target.each(function(){
        var self = $(this);
        var id = self.attr('data-id');
        arrId.push(id);
        $(this).on('click', function () {
            $.ajax({
                type: opt.type,
                dataType:"json",
                data: {pro_id:id},
                url: opt.url,
                beforeSend: function () {
                    
                },
                success: function (data) {
                    if(data.code == 0){
                        self.find('.wish-num-text').text(data.wish_num);
                        self.addClass('active');
                        self.find('i').attr('class','iconfont icon-ego-heartfull');
                    }else if(data.code == 400){
                        $.myPrompt({
                            msg:data.msg,
                            callback:function(){
                                typeof opt.success == 'function' ? opt.success(data) : ''
                            }
                        }); 
                    } 
                    
                },
                error: function (data) {
                    typeof opt.error == 'function' ? opt.error(data) : ''
                }
            })
        })
    });
    getStatic();  
} //wish收藏