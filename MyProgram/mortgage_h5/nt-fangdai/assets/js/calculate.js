// 商业
var index = 0;
var detail1_setclick = false;
var detail2_setclick = false;

// 当前页面
var current_page = 'search_page';
window.bridge = window.bridge || {};

// 原生点击返回调用
window.bridge.backButtonClick = function () {
    // 跳转，app拦截判断
    if (current_page == 'search_page') {
        window.location.href = 'bridge://processBackButtonClicked?default_parameter=exit_app';
        window.location.href = 'index.html'
    } else if (current_page == 'detail1') {
        window.location.href = 'bridge://processBackButtonClicked?default_parameter=h5_has_bean_processed';
        $(".back1").click();
    } else if (current_page == 'detail2') {
        window.location.href = 'bridge://processBackButtonClicked?default_parameter=h5_has_bean_processed';
        $(".back2").click();
    }
}

$(function () {

    // detail1
    var device_width = window.screen.width;
    $('#detail1').css('left', device_width + 2);
    $('#detail2').css('left', device_width + 2);
    $("#top_part_2").hide();
    $('.mode div').click(function () {
        $(this).addClass('active focus_font_color').siblings().removeClass('active focus_font_color');
        $('.shangye').hide();
        $('.gongjijin').hide();
        $('.zuhe').hide();
        $('.tiqian').hide();
        switch ($(this)[0].innerText) {
            case '商业':
                $('.top_part_2').hide();
                $('.top_part_1').show();
                $('.shangye').show();
                // if(!!document.styleSheets[0].cssRules && !!document.styleSheets[0].cssRules[0]){
                //     document.styleSheets[0].deleteRule(0);
                //     document.styleSheets[0].insertRule('@keyframes mymove1{0%{left:'+ $('.cal_house_btn .mode .animation')[0].style.left +';} 100%{left:0%;}}',0);
                // }
                
                //    $('.animation').removeClass('first');
                // setTimeout(function () {
                    //    $('.animation').addClass('first');
                $('.cal_house_btn .mode .animation').css('left', '0%')
                // $('.cal_house_btn .mode .animation').attr('class', 'animation first');
                $('.cal_house_btn .mode .animation').attr('class', 'animation');
                // }, 1);

                index = 0;
                // $('.animation').removeClass('second');
                // $('.animation').removeClass('third');
                // $('.animation').removeClass('four');
                // $('.animation').addClass('first');
                // $('.animation').animate 从当前位置，to {left:0%;}
                break;
            case '公积金':
                $('.top_part_2').hide();
                $('.top_part_1').show();
                $('.gongjijin').show();
                // if(!!document.styleSheets[0].cssRules && !!document.styleSheets[0].cssRules[1]){
                //     document.styleSheets[0].deleteRule(1);
                //     document.styleSheets[0].insertRule('@keyframes mymove2{0%{left:'+ $('.cal_house_btn .mode .animation')[0].style.left +';} 100%{left:25%;}}',1);
                // }
                //     $('.animation').removeClass('first');
                // setTimeout(function () {
                    //         $('.animation').addClass('first');
                $('.cal_house_btn .mode .animation').css('left', '25%');
                // $('.cal_house_btn .mode .animation').attr('class', 'animation second');
                $('.cal_house_btn .mode .animation').attr('class', 'animation');
                // }, 1);

                index = 1;
                break;
            case '组合':
                $('.top_part_2').hide();
                $('.top_part_1').show();
                $('.zuhe').show();
                // if(!!document.styleSheets[0].cssRules && !!document.styleSheets[0].cssRules[2]){
                //     document.styleSheets[0].deleteRule(2);
                //     document.styleSheets[0].insertRule('@keyframes mymove3{0%{left:'+ $('.cal_house_btn .mode .animation')[0].style.left +';} 100%{left:50%;}}',2);
                // }
                //     $('.animation').removeClass('first');
                // setTimeout(function () {
                    //         $('.animation').addClass('first');
                    $('.cal_house_btn .mode .animation').css('left', '50%');
                    // $('.cal_house_btn .mode .animation').attr('class', 'animation third');
                    $('.cal_house_btn .mode .animation').attr('class', 'animation');
                // }, 1);

                index = 2;
                break;
            case '提前还贷':
                $('.top_part_1').hide();
                $('.top_part_2').show();
                $('.tiqian').show();

                // 滚动
                var scroll_height = window.innerHeight - $('.cal_house_btn').height() - 16 - $('#top_part_2').height() - 10;
                console.log(scroll_height, window.innerHeight, $('.cal_house_btn').height(), $('#top_part_2').height());
                $('.tiqian').height(scroll_height);
                
                // if(!!document.styleSheets[0].cssRules && !!document.styleSheets[0].cssRules[3]){
                //     document.styleSheets[0].deleteRule(3);
                //     document.styleSheets[0].insertRule('@keyframes mymove4{0%{left:'+ $('.cal_house_btn .mode .animation')[0].style.left +';} 100%{left:75%;}}',3);
                // }
                
                $('.cal_house_btn .mode .animation').css('left', '75%');
                // $('.cal_house_btn .mode .animation').attr('class', 'animation four');
                $('.cal_house_btn .mode .animation').attr('class', 'animation');

                index = 3;
                var now = new Date();
                var month = now.getMonth() + 1;
                if (month < 10) {
                    month = '0' + month;
                }
                $('.first_repay')[0].value = now.getFullYear() + '-' + month;
                $('.end_repay')[0].value = now.getFullYear() + 1 + '-' + month;
                $('#mount2_6')[0].innerText = now.getFullYear() + 1 + '年' + month + '月';
                break;
            default:
                break;
        }
        $('.loan_year')[index].innerText = Math.round($('.jindut')[index].value);

        calculate_normal();
    });

    var year_num_default = 20;
    $('.jindut').each(function () {
        $(this)[0].value = year_num_default;
        var a = $(this)[0].value / 30 * 100 + '%';
        $(this).css("background-size", a + " 100%");
    });
    // 商业利率初始化
    change_rate_sy(year_num_default);
    change_rate_gjj(year_num_default);
    // 上次贷款年限
    last_year_num = year_num_default;

    // 模式切换
    $('.mode_type_click div').click(function () {
        $(this).addClass('active focus_font_color').siblings().removeClass('active focus_font_color');
        if ($(this)[0].innerHTML == '等额本息') {
            $('.monthly_supply .type_text')[0].innerText = '每月还款(元)';
            $('.monthly_supply .type_text')[1].innerText = '原每月还款(元)';
        } else if ($(this)[0].innerHTML == '等额本金') {
            $('.monthly_supply .type_text')[0].innerText = '首月还款(元)'
            $('.monthly_supply .type_text')[1].innerText = '原首月还款(元)'
        }
        if ($(this)[0].innerHTML == '商业贷款') {
            $('.tiqian .loan_rate_business').show();
            $('.tiqian .loan_rate_accumulation_fund').hide();
        } else if ($(this)[0].innerHTML == '公积金贷款') {
            $('.tiqian .loan_rate_business').hide();
            $('.tiqian .loan_rate_accumulation_fund').show();
        }
        calculate_normal();
    });
    $('.loan_year')[0].innerText = Math.round($('.jindut')[0].value);

    // :选择商业利率
    $('.shangye .loan_rate .input_num')[0].innerText = $('.loan_rate_pop_business ul li.selected')[0].innerText;
    $('.shangye .loan_rate .input_num').attr('rate-value', $('.loan_rate_pop_business ul li.selected').attr('rate-value'));
    $('.loan_rate_pop_business ul li').click(function () {
        $(this).addClass('selected').siblings().removeClass('selected');
        if (index == 0 || index == 1) {
            $('.shangye .loan_rate .input_num')[0].innerText = $(this)[0].innerText;
            $('.shangye .loan_rate .input_num').attr('rate-value', $(this).attr('rate-value'));
        } else if (index == 2) {    
            $('.zuhe .loan_rate_business .input_num')[0].innerText = $(this)[0].innerText;
            $('.zuhe .loan_rate_business .input_num').attr('rate-value', $(this).attr('rate-value'));
        } else if (index == 3) {
            $('.tiqian .loan_rate_business .input_num')[0].innerText = $(this)[0].innerText;
            $('.tiqian .loan_rate_business .input_num').attr('rate-value', $(this).attr('rate-value'));
        }

        $('.loan_rate_pop_business').hide();
        $('#bg').hide();
        calculate_normal();
    });
    // :选择公积金利率
    $('.gongjijin .loan_rate .input_num')[0].innerText = $('.loan_rate_pop_accumulation_fund ul li.selected')[0].innerText;
    $('.gongjijin .loan_rate .input_num').attr('rate-value', $('.loan_rate_pop_accumulation_fund ul li.selected').attr('rate-value'));
    $('.loan_rate_pop_accumulation_fund ul li').click(function () {
        $(this).addClass('selected').siblings().removeClass('selected');
        if (index == 0 || index == 1) {
            $('.gongjijin .loan_rate .input_num')[0].innerText = $(this)[0].innerText;
            $('.gongjijin .loan_rate .input_num').attr('rate-value', $(this).attr('rate-value'));
        } else if (index == 2) {
            $('.zuhe .loan_rate_accumulation_fund .input_num')[0].innerText = $(this)[0].innerText;
            $('.zuhe .loan_rate_accumulation_fund .input_num').attr('rate-value', $(this).attr('rate-value'));
        } else if (index == 3) {
            $('.tiqian .loan_rate_accumulation_fund .input_num')[0].innerText = $(this)[0].innerText;
            $('.tiqian .loan_rate_accumulation_fund .input_num').attr('rate-value', $(this).attr('rate-value'));
        }
        $('.loan_rate_pop_accumulation_fund').hide();
        $('#bg').hide();
        calculate_normal();
    });

    // :选择组合利率
    $('.zuhe .loan_rate_business .input_num')[0].innerText = $('.loan_rate_pop_business ul li.selected')[0].innerText;
    $('.zuhe .loan_rate_business .input_num').attr('rate-value', $('.loan_rate_pop_business ul li.selected').attr('rate-value'));

    $('.zuhe .loan_rate_accumulation_fund .input_num')[0].innerText = $('.loan_rate_pop_accumulation_fund ul li.selected')[0].innerText;
    $('.zuhe .loan_rate_accumulation_fund .input_num').attr('rate-value', $('.loan_rate_pop_accumulation_fund ul li.selected').attr('rate-value'));

    // 提前
    $('.tiqian .loan_rate_business .input_num')[0].innerText = $('.loan_rate_pop_business ul li.selected')[0].innerText;
    $('.tiqian .loan_rate_business .input_num').attr('rate-value', $('.loan_rate_pop_business ul li.selected').attr('rate-value'));

    $('.tiqian .loan_rate_accumulation_fund .input_num')[0].innerText = $('.loan_rate_pop_accumulation_fund ul li.selected')[0].innerText;
    $('.tiqian .loan_rate_accumulation_fund .input_num').attr('rate-value', $('.loan_rate_pop_accumulation_fund ul li.selected').attr('rate-value'));

    var loan_type = $('.tiqian .loan_type .active')[0].innerText
    if (loan_type == '商业贷款') {
        $('.tiqian .loan_rate_business').show();
        $('.tiqian .loan_rate_accumulation_fund').hide();

    } else if (loan_type == '公积金贷款') {
        $('.tiqian .loan_rate_business').hide();
        $('.tiqian .loan_rate_accumulation_fund').show();
    }


    // 点击背景
    $('#bg').click(function () {
        $('.loan_rate_pop_business').hide();
        $('.loan_rate_pop_accumulation_fund').hide();

        $('#bg').hide();
    });

    calculate_normal();

    $('.radio_div1 input:radio').click(function () {
        if (this.value == 2) {
            $('.radio_input').show();
            $('.radio_div2').show();
            $(".tiqian").scrollTop($(".tiqian").height());
        } else {
            $('.radio_input').hide();
            $('.radio_div2').hide();
        }
    });
    $("input[type='number']").on('input', function () {
        calculate_normal();
    });
    $(".back1").click(function () {
        current_page = 'search_page';
        var timer1 = null;
        clearInterval(timer1);
        var odiv = document.getElementById("detail1");
        timer1 = setInterval(function () {
            console.log(timer1);
            var speed = 0;
            if (odiv.offsetLeft < device_width) {
                speed = 10;
            }
            if (odiv.offsetLeft >= device_width) {
                odiv.style.left = device_width + 'px';
                clearInterval(timer1);
            } else {
                odiv.style.left = odiv.offsetLeft + speed + 'px';
            }
        }, 3);
    });
    $(".back2").click(function () {
        current_page = 'search_page';
        var timer1 = null;
        clearInterval(timer1);
        var odiv = document.getElementById("detail2");
        timer1 = setInterval(function () {
            console.log(timer1);
            var speed = 0;
            if (odiv.offsetLeft < device_width) {
                speed = 10;
            }
            if (odiv.offsetLeft >= device_width) {
                odiv.style.left = device_width + 'px';
                clearInterval(timer1);
            } else {
                odiv.style.left = odiv.offsetLeft + speed + 'px';
            }
        }, 3);
    });
})
// 打开利率pop
function open_loan_rate_business() {
    $('.loan_rate_pop_business').show();
    $('#bg').show();
}
function open_loan_rate_accumulation_fund() {
    $('.loan_rate_pop_accumulation_fund').show();
    $('#bg').show();
}

/**
 * 根据贷款期限不同, 商业利率不同
*/
function change_rate_sy(year_num){
    // 基准利率
    var benchmark_rate = 4.90;
    if(year_num <= 1){
        benchmark_rate = 4.35;
    }else if(year_num > 1 && year_num <= 5){
        benchmark_rate = 4.75;
    }else if(year_num > 5){
        benchmark_rate = 4.90;
    }
    
    var rate_html = 
        '<li rate-value="' + (benchmark_rate * 0.90).toFixed(2) + '">9折(' + (benchmark_rate * 0.90).toFixed(2) + '%)</li>\
        <li rate-value="' + (benchmark_rate * 0.95).toFixed(2) + '">95折(' + (benchmark_rate * 0.95).toFixed(2) + '%)</li>\
        <li rate-value="' + (benchmark_rate * 1).toFixed(2) + '">基准利率(' + (benchmark_rate * 1).toFixed(2) + '%)</li>\
        <li rate-value="' + (benchmark_rate * 1.05).toFixed(2) + '">上浮5(' + (benchmark_rate * 1.05).toFixed(2) + '%)</li>\
        <li rate-value="' + (benchmark_rate * 1.10).toFixed(2) + '" class="selected">上浮10(' + (benchmark_rate * 1.10).toFixed(2) + '%)</li>\
        <li rate-value="' + (benchmark_rate * 1.15).toFixed(2) + '">上浮15(' + (benchmark_rate * 1.15).toFixed(2) + '%)</li>\
        <li rate-value="' + (benchmark_rate * 1.20).toFixed(2) + '">上浮20(' + (benchmark_rate * 1.20).toFixed(2) + '%)</li>\
        <li rate-value="' + (benchmark_rate * 1.25).toFixed(2) + '">上浮25(' + (benchmark_rate * 1.25).toFixed(2) + '%)</li>\
        <li rate-value="' + (benchmark_rate * 1.30).toFixed(2) + '">上浮30(' + (benchmark_rate * 1.30).toFixed(2) + '%)</li>'
    $('.loan_rate_pop_business ul').html(rate_html);

    $('.loan_rate_pop_business ul li').click(function () {
        $(this).addClass('selected').siblings().removeClass('selected');
        if (index == 0 || index == 1) {
            $('.shangye .loan_rate .input_num')[0].innerText = $(this)[0].innerText;
            $('.shangye .loan_rate .input_num').attr('rate-value', $(this).attr('rate-value'));
        } else if (index == 2) {
            $('.zuhe .loan_rate_business .input_num')[0].innerText = $(this)[0].innerText;
            $('.zuhe .loan_rate_business .input_num').attr('rate-value', $(this).attr('rate-value'));
        } else if (index == 3) {
            $('.tiqian .loan_rate_business .input_num')[0].innerText = $(this)[0].innerText;
            $('.tiqian .loan_rate_business .input_num').attr('rate-value', $(this).attr('rate-value'));
        }

        $('.loan_rate_pop_business').hide();
        $('#bg').hide();
        calculate_normal();
    })
}


/**
 * 根据贷款期限不同, 公积金利率不同
*/
function change_rate_gjj(year_num){
    // 基准利率
    var benchmark_rate = 0;
    if(year_num <= 5){
        benchmark_rate = 2.75;
    }else if(year_num > 5){
        benchmark_rate = 3.25;
    }
    
    var rate_html = 
        '<li rate-value="' + (benchmark_rate * 0.90).toFixed(2) + '">9折(' + (benchmark_rate * 0.90).toFixed(2) + '%)</li>\
        <li rate-value="' + (benchmark_rate * 0.95).toFixed(2) + '">95折(' + (benchmark_rate * 0.95).toFixed(2) + '%)</li>\
        <li rate-value="' + (benchmark_rate * 1).toFixed(2) + '">基准利率(' + (benchmark_rate * 1).toFixed(2) + '%)</li>\
        <li rate-value="' + (benchmark_rate * 1.05).toFixed(2) + '">上浮5(' + (benchmark_rate * 1.05).toFixed(2) + '%)</li>\
        <li rate-value="' + (benchmark_rate * 1.10).toFixed(2) + '" class="selected">上浮10(' + (benchmark_rate * 1.10).toFixed(2) + '%)</li>\
        <li rate-value="' + (benchmark_rate * 1.15).toFixed(2) + '">上浮15(' + (benchmark_rate * 1.15).toFixed(2) + '%)</li>\
        <li rate-value="' + (benchmark_rate * 1.20).toFixed(2) + '">上浮20(' + (benchmark_rate * 1.20).toFixed(2) + '%)</li>\
        <li rate-value="' + (benchmark_rate * 1.25).toFixed(2) + '">上浮25(' + (benchmark_rate * 1.25).toFixed(2) + '%)</li>\
        <li rate-value="' + (benchmark_rate * 1.30).toFixed(2) + '">上浮30(' + (benchmark_rate * 1.30).toFixed(2) + '%)</li>'
    $('.loan_rate_pop_accumulation_fund ul').html(rate_html);

    $('.loan_rate_pop_accumulation_fund ul li').click(function () {
        $(this).addClass('selected').siblings().removeClass('selected');
        if (index == 0 || index == 1) {
            $('.gongjijin .loan_rate .input_num')[0].innerText = $(this)[0].innerText;
            $('.gongjijin .loan_rate .input_num').attr('rate-value', $(this).attr('rate-value'));
        } else if (index == 2) {
            $('.zuhe .loan_rate_accumulation_fund .input_num')[0].innerText = $(this)[0].innerText;
            $('.zuhe .loan_rate_accumulation_fund .input_num').attr('rate-value', $(this).attr('rate-value'));
        } else if (index == 3) {
            $('.tiqian .loan_rate_accumulation_fund .input_num')[0].innerText = $(this)[0].innerText;
            $('.tiqian .loan_rate_accumulation_fund .input_num').attr('rate-value', $(this).attr('rate-value'));
        }
        $('.loan_rate_pop_accumulation_fund').hide();
        $('#bg').hide();
        calculate_normal();
    })
}
// function open_loan_rate_tiqian(){
//  var loan_type = $('.tiqian .loan_type .active')[0].innerText
//  if(loan_type == '商业贷款'){
//      open_loan_rate_business();
//  }else if(loan_type == '公积金贷款'){
//      open_loan_rate_accumulation_fund();
//  }
// }
// 商业：输入自定义利率确定
function loan_rate_pop_business_sure() {
    if (index == 0) {
        $('.shangye .loan_rate .input_num')[0].innerText = $('.loan_rate_pop_business .custom_loan_rate')[0].value + '%';
        $('.shangye .loan_rate .input_num').attr('rate-value', $('.loan_rate_pop_business .custom_loan_rate')[0].value);
    } else if (index == 2) {
        $('.zuhe .loan_rate_business .input_num')[0].innerText = $('.loan_rate_pop_business .custom_loan_rate')[0].value + '%';
        $('.zuhe .loan_rate_business .input_num').attr('rate-value', $('.loan_rate_pop_business .custom_loan_rate')[0].value);
    }
    $('.loan_rate_pop_business').hide();
    $('#bg').hide();
    calculate_normal();
}
// 公积金：输入自定义利率确定
function loan_rate_pop_accumulation_fund_sure() {
    if (index == 1) {
        $('.gongjijin .loan_rate .input_num')[0].innerText = $('.loan_rate_pop_accumulation_fund .custom_loan_rate')[0].value + '%';
        $('.gongjijin .loan_rate .input_num').attr('rate-value', $('.loan_rate_pop_accumulation_fund .custom_loan_rate')[0].value);
    } else if (index == 2) {
        $('.zuhe .loan_rate_accumulation_fund .input_num')[0].innerText = $('.loan_rate_pop_accumulation_fund .custom_loan_rate')[0].value + '%';
        $('.zuhe .loan_rate_accumulation_fund .input_num').attr('rate-value', $('.loan_rate_pop_accumulation_fund .custom_loan_rate')[0].value);
    }
    $('.loan_rate_pop_accumulation_fund').hide();
    $('#bg').hide();
    calculate_normal();
}

// 最高月供 ： 商业、公积金、组合
function calculate_normal() {
    var principal = 0, principal1 = 0, principal2 = 0, months = 0, rate = 0, loan_type = '';
    switch (index) {
        case 0: //商业
            principal = $('.shangye .loan_sum .input_num')[0].value * 10000;
            // if($('.jindut')[index].value > 0.5){
            months = Math.round($('.jindut')[index].value) * 12;
            // }else{
            //  months = $('.jindut')[index].value * 12;
            // }
            rate = ($('.shangye .loan_rate .input_num').attr('rate-value') / 100).toFixed(4) * 1;
            loan_type = $('.shangye .loan_type .active')[0].innerText;
            break;
        case 1: //公积金
            principal = $('.gongjijin .loan_sum .input_num')[0].value * 10000;
            // if($('.jindut')[index].value > 0.5){
            months = Math.round($('.jindut')[index].value) * 12;
            // }else{
            //  months = $('.jindut')[index].value * 12;
            // }
            rate = ($('.gongjijin .loan_rate .input_num').attr('rate-value') / 100).toFixed(4) * 1;
            loan_type = $('.gongjijin .loan_type .active')[0].innerText;
            break;
        case 2: //组合
            // 商业
            principal1 = $('.zuhe .loan_sum .sy_loan')[0].value * 10000;
            // 公积金
            principal2 = $('.zuhe .loan_sum .gjj_loan')[0].value * 10000;
            // if($('.jindut')[index].value > 0.5){
            months = Math.round($('.jindut')[index].value) * 12;
            // }else{
            //  months = $('.jindut')[index].value * 12;
            // }
            rate1 = ($('.zuhe .loan_rate_business .input_num').attr('rate-value') / 100);
            rate2 = ($('.zuhe .loan_rate_accumulation_fund .input_num').attr('rate-value') / 100);
            loan_type = $('.zuhe .loan_type .active')[0].innerText;
            break;
        case 3: //提前还贷
            // console.log('提前还贷');
            // 原贷款类型
            var original_loan_type = $('.tiqian .original_loan_type .active')[0].innerText
            // 原还款方式
            var original_repayment_method = $('.tiqian .original_repayment_method .active')[0].innerText
            // 贷款总额
            var principal =  $('.tiqian .input_num')[0].value * 10000;
            // 贷款期限
            var months = Math.round($('.jindut')[index].value) * 12;

            // 已还次数
            var first_repay_year = $('.tiqian .first_repay')[0].value.substring(0,4);
            var first_repay_month = $('.tiqian .first_repay')[0].value.substring(5,7);
            var end_repay_year = $('.tiqian .end_repay')[0].value.substring(0,4);
            var end_repay_month = $('.tiqian .end_repay')[0].value.substring(5,7);
            var payTimes = (end_repay_year - first_repay_year) * 12 + (end_repay_month - first_repay_month);

            // 贷款利率
            if(original_loan_type == '商业贷款'){
                rate = ($('.tiqian .loan_rate_business .input_num').attr('rate-value') / 100) * 1;
            }else{
                rate = ($('.tiqian .loan_rate_accumulation_fund .input_num').attr('rate-value') / 100) * 1;
            };
            // 提前还贷方式: '1':一次性还清, '2':部分提前还清
            var prepayment_method = $('.radio_div1 input[name=radio]:checked')[0].value;
            // 还款处理方式: '1':还款时间不变, '2':月供不变
            var processing_method = $('.radio_div2 input[name=radio1]:checked')[0].value;
            // 部分提前还清
            var aheadPrincipal = $('.tiqian .radio_input input')[0].value * 10000;

            var ret = {};
            window.sessionStorage.tq_original_loan_type = original_loan_type;
            window.sessionStorage.tq_original_repayment_method = original_repayment_method;
            window.sessionStorage.tq_principal = principal;
            window.sessionStorage.tq_months = months;
            window.sessionStorage.tq_payTimes = payTimes;
            window.sessionStorage.tq_rate = rate;
            window.sessionStorage.tq_prepayment_method = prepayment_method;
            window.sessionStorage.tq_processing_method = processing_method;
            window.sessionStorage.tq_aheadPrincipal = aheadPrincipal;

            if(principal > 0){
                if(original_repayment_method == '等额本息'){
                    if(prepayment_method == '1'){
                        // '1':一次性还清
                        // 一次性提前还款计算（等额本息）
                        ret = onetimePayment_oncalculateEqualPrincipalAndInterest(principal, months, payTimes, rate);
                    }else if(prepayment_method == '2'){
                        // '2':部分提前还清
                        if(processing_method == '1'){
                            // '1':还款时间不变
                            // 部分提前还款计算（等额本息、期限不变）
                            ret = calculateEqualPrincipalAndInterestApart2(principal, months, aheadPrincipal, payTimes, rate);
                        }else if (processing_method == '2'){
                            // '2':月供不变
                            // 部分提前还款计算（等额本息、月供不变）
                            ret = calculateEqualPrincipalAndInterestApart(principal, months, aheadPrincipal, payTimes, rate);
                        }
                    };
                }else if(original_repayment_method == '等额本金'){
                    if(prepayment_method == '1'){
                        // '1':一次性还清
                        // 一次性提前还款计算(等额本金)
                        ret = onetimePayment_calculateEqualPrincipal(principal, months, payTimes, rate);
                    }else if(prepayment_method == '2'){
                        // '2':部分提前还清
                        if(processing_method == '1'){
                            // '1':还款时间不变
                            // 部分提前还款计算(等额本金、期限不变)
                            ret = calculateEqualPrincipalApart2(principal, months, aheadPrincipal, payTimes, rate);
                        }else if (processing_method == '2'){
                            // '2':月供不变
                            // 部分提前还款计算(等额本金、月供不变)
                            ret = calculateEqualPrincipalApart(principal, months, aheadPrincipal, payTimes, rate);
                        };
                    };
                };
                
                if(original_repayment_method == '等额本息'){
                    // 原每月还款
                    $('.top_part_2 .mont_mount')[0].innerText = num_format(ret.preLoan);
                    // 节省利息
                    $('#mount2_1')[0].innerText = num_format(ret.saveInterest / 10000, 2) + "万";
                    // 支付利息
                    $('#mount2_2')[0].innerText = num_format(ret.new_interest / 10000, 2) + "万";
                    // 还款总额
                    $('#mount2_3')[0].innerText = num_format(ret.new_totalMoney / 10000, 2) + "万";
                    // 当月还款
                    $('#mount2_4')[0].innerText = num_format(ret.new_aheadTotalMoney / 10000, 2) + "万";
                    // 次月起还款
                    $('#mount2_5')[0].innerText = num_format(ret.new_newFirstMonth);
                    // 还款期限
                    var payDate;
                    var new_months = ret.new_months - 1;
                    var first_repay_year = $('.tiqian .first_repay')[0].value.substring(0,4);
                    var first_repay_month = $('.tiqian .first_repay')[0].value.substring(5,7);
                    var payMonth = first_repay_month * 1 + new_months % 12;
                    if(payMonth > 12){
                        payDate = (first_repay_year * 1 + Math.floor(new_months/12) + 1) + '年' + ((payMonth % 12)>=10 ? (payMonth % 12) : ('0'+(payMonth % 12))) + '月';
                    }else{
                        payDate = (first_repay_year * 1 + Math.floor(new_months/12)) + '年' + (payMonth>=10 ? payMonth : ('0'+payMonth)) + '月';                        
                    }
                    $('#mount2_6')[0].innerText = payDate;
                }else if(original_repayment_method == '等额本金'){
                    // 原首月还款
                    $('.top_part_2 .mont_mount')[0].innerText = num_format(ret.new_firstMonth);
                    // 节省利息
                    $('#mount2_1')[0].innerText = num_format(ret.new_saveInterest / 10000, 2) + "万";
                    // 支付利息
                    $('#mount2_2')[0].innerText = num_format(ret.new_interest / 10000, 2) + "万";
                    // 还款总额
                    $('#mount2_3')[0].innerText = num_format(ret.new_totalMoney / 10000, 2) + "万";
                    // 当月还款
                    $('#mount2_4')[0].innerText = num_format(ret.new_aheadTotalMoney / 10000, 2) + "万";
                    // 次月起还款
                    $('#mount2_5')[0].innerText = num_format(ret.new_newFirstMonth);
                    // 还款期限
                    var payDate;
                    var new_months = ret.new_months - 1;
                    var first_repay_year = $('.tiqian .first_repay')[0].value.substring(0,4);
                    var first_repay_month = $('.tiqian .first_repay')[0].value.substring(5,7);
                    var payMonth = first_repay_month * 1 + new_months % 12;
                    if(payMonth > 12){
                        payDate = (first_repay_year * 1 + Math.floor(new_months/12) + 1) + '年' + ((payMonth % 12)>=10 ? (payMonth % 12) : ('0'+(payMonth % 12))) + '月';
                    }else{
                        payDate = (first_repay_year * 1 + Math.floor(new_months/12)) + '年' + (payMonth>=10 ? payMonth : ('0'+payMonth)) + '月';                        
                    }
                    $('#mount2_6')[0].innerText = payDate;
                };
            };
            // console.log(original_loan_type, original_repayment_method, principal, months, payTimes, rate);
            break;
        default:
            break;
    }
    // 计算等额本息还款
    var ret = {}, ret1 = {}, ret2 = {};
    var preLoan = 0, decreaseMonth = 0, interest = 0, totalMoney = 0;
    if (loan_type == '等额本息') {

        var preLoan = 0, decreaseMonth = 0, interest = 0, totalMoney = 0;
        if (index == 0 || index == 1) {//商业或公积金
            ret = calculateEqualPrincipalAndInterest(principal, months, rate);
            preLoan = ret.preLoan;
            decreaseMonth = ret.decreaseMonth;
            interest = ret.interest;
            totalMoney = ret.totalMoney;
        } else if (index == 2) {//组合
            ret1 = calculateEqualPrincipalAndInterest(principal1, months, rate1);
            ret2 = calculateEqualPrincipalAndInterest(principal2, months, rate2);
            preLoan = ret1.preLoan + ret2.preLoan;
            decreaseMonth = ret1.decreaseMonth + ret2.decreaseMonth;
            interest = ret1.interest + ret2.interest;
            totalMoney = ret1.totalMoney + ret2.totalMoney;
        }

        // 每月还款金额
        $('.monthly_supply .mont_mount')[0].innerText = num_format(preLoan);
        // 每月递减，还款总利息，还款总额
        $('.monthly_supply #mount1')[0].innerText = num_format(decreaseMonth);
        $('.monthly_supply #mount2')[0].innerText = num_format(interest / 10000, 2) + "万";
        $('.monthly_supply #mount3')[0].innerText = num_format(totalMoney / 10000, 2) + "万";

    } else if (loan_type == '等额本金') {

        var firstMonth = 0, decreaseMonth = 0, totalInterest = 0, totalMoney = 0;
        if (index == 0 || index == 1) {//商业或公积金
            ret = calculateEqualPrincipal(principal, months, rate);
            firstMonth = ret.firstMonth;
            decreaseMonth = ret.decreaseMonth;
            totalInterest = ret.totalInterest;
            totalMoney = ret.totalMoney;
        } else if (index == 2) {//组合
            ret1 = calculateEqualPrincipal(principal1, months, rate1);
            ret2 = calculateEqualPrincipal(principal2, months, rate2);
            firstMonth = ret1.firstMonth + ret2.firstMonth;
            decreaseMonth = ret1.decreaseMonth + ret2.decreaseMonth;
            totalInterest = ret1.totalInterest + ret2.totalInterest;
            totalMoney = ret1.totalMoney + ret2.totalMoney;
        }

        // 第一个月还款金额
        $('.monthly_supply .mont_mount')[0].innerText = num_format(firstMonth);
        // 每月递减，还款总利息，还款总额
        $('.monthly_supply #mount1')[0].innerText = num_format(decreaseMonth);
        $('.monthly_supply #mount2')[0].innerText = num_format(totalInterest / 10000, 2) + "万";
        $('.monthly_supply #mount3')[0].innerText = num_format(totalMoney / 10000, 2) + "万";
    }
}

// 提前还款计算
function num_format(num, decimal) {
    decimal = decimal || 0;
    return (num.toFixed(decimal) * 1).toLocaleString();
    // return Math.round(num).toLocaleString();
    // return String((num * 1).toFixed(decimal)).toLocaleString();
}

// 跳转到详情
function go_detail() {
    $('#detail1').show();
    $('#detail2').show();
    // 计算详情 tbody 滚动高度
    $('#hor-zebra1 tbody').height(window.innerHeight - $('#detail1 .loan_type').height() - $('#hor-zebra1 thead').height());
    $('#hor-zebra2 tbody').height(window.innerHeight - $('#detail2 .loan_type').height() - $('#hor-zebra2 thead').height());
    var principal, principal1, principal2, months, rate, loan_type;
    if (index == 0) {
        current_page = 'detail1';
        principal = $('.shangye .loan_sum .input_num')[0].value * 10000;
        // if($('.jindut')[index].value > 0.5){
        months = Math.round($('.jindut')[index].value) * 12;
        // }else{
        //  months = $('.jindut')[index].value * 12;
        // }
        rate = ($('.shangye .loan_rate .input_num').attr('rate-value') / 100) * 1;
        loan_type = $('.shangye .loan_type .active')[0].innerText;
    } else if (index == 1) {
        current_page = 'detail1';
        principal = $('.gongjijin .loan_sum .input_num')[0].value * 10000;
        // if($('.jindut')[index].value > 0.5){
        months = Math.round($('.jindut')[index].value) * 12;
        // }else{
        //  months = $('.jindut')[index].value * 12;
        // }
        rate = ($('.gongjijin .loan_rate .input_num').attr('rate-value') / 100) * 1;
        loan_type = $('.gongjijin .loan_type .active')[0].innerText;
    } else if (index == 2) {
        current_page = 'detail2';
        // 商业
        principal1 = $('.zuhe .loan_sum .sy_loan')[0].value * 10000;
        rate1 = ($('.zuhe .loan_rate_business .input_num').attr('rate-value') / 100);
        // 公积金
        principal2 = $('.zuhe .loan_sum .gjj_loan')[0].value * 10000;
        rate2 = ($('.zuhe .loan_rate_accumulation_fund .input_num').attr('rate-value') / 100);

        // principal = principal1 + principal2;
        // if($('.jindut')[index].value > 0.5){
        months = Math.round($('.jindut')[index].value) * 12;
        // }else{
        //  months = $('.jindut')[index].value * 12;
        // }
        // rate = rate1*principal1/principal + rate2*principal2/principal;
        loan_type = $('.shangye .loan_type .active')[0].innerText;

        window.sessionStorage.principal1 = principal1;
        window.sessionStorage.principal2 = principal2;
        window.sessionStorage.months = months;
        window.sessionStorage.rate1 = rate1;
        window.sessionStorage.rate2 = rate2;
        window.sessionStorage.loan_type = loan_type;
    } else if (index == 3) {
        // // 提前还贷
        current_page = 'detail1';
    }

    window.sessionStorage.principal = principal;
    window.sessionStorage.months = months;
    window.sessionStorage.rate = rate;
    window.sessionStorage.loan_type = loan_type;
    var timer = null;
    if (index == 2) {
        var loan_type = window.sessionStorage.loan_type;
        if (loan_type == '等额本息') {
            $('#detail2 .tab1').addClass('active focus_font_color').siblings().removeClass('active focus_font_color');
        } else {
            $('#detail2 .tab2').addClass('active focus_font_color').siblings().removeClass('active focus_font_color');
        }
        calculate_normal_zuhe(loan_type);
        // 模式切换
        if (!detail2_setclick) {
            detail2_setclick = true;
            $('#detail2 .mode_type_detail div').click(function () {
                console.log('detail2 clicked');
                $(this).addClass('active focus_font_color').siblings().removeClass('active focus_font_color');
                calculate_normal_zuhe($('#detail2 .mode_type_detail .active')[0].innerText);
            })
        }
        clearInterval(timer);
        var odiv = document.getElementById("detail2");
        timer = setInterval(function () {
            var speed = 0;
            if (odiv.offsetLeft > 0) {
                speed = -10;
            }
            if (odiv.offsetLeft <= 0) {
                odiv.style.left = '0px';
                clearInterval(timer);
            } else {
                odiv.style.left = odiv.offsetLeft + speed + 'px';
            }
        }, 3);
        // window.location.href = 'zuhe_detail.html';
    } else if (index == 0 || index == 1){//商业，公积金
        var loan_type = window.sessionStorage.loan_type;
        if (loan_type == '等额本息') {
            $('#detail1 .tab1').addClass('active focus_font_color').siblings().removeClass('active focus_font_color');
        } else {
            $('#detail1 .tab2').addClass('active focus_font_color').siblings().removeClass('active focus_font_color');
        }
        calculate_normal_detail(loan_type);

        // 模式切换
        if (!detail1_setclick) {
            detail1_setclick = true;
            $('#detail1 .mode_type_detail div').click(function () {
                // $('.loading').show();
                $(this).addClass('active focus_font_color').siblings().removeClass('active focus_font_color');
                calculate_normal_detail($('#detail1 .mode_type_detail .active')[0].innerText);
                // $('.loading').show();
            })
        }

        clearInterval(timer);
        var odiv = document.getElementById("detail1");
        timer = setInterval(function () {
            console.log(timer);
            var speed = 0;
            if (odiv.offsetLeft > 0) {
                speed = -10;
            }
            if (odiv.offsetLeft <= 0) {
                odiv.style.left = '0px';
                clearInterval(timer);
            } else {
                odiv.style.left = odiv.offsetLeft + speed + 'px';
            }
        }, 3);
        // window.location.href = 'detail.html';
    }else if(index == 3){ // 提前还贷
        
        var loan_type = window.sessionStorage.tq_original_repayment_method;
        if (loan_type == '等额本息') {
            $('#detail1 .tab1').addClass('active focus_font_color').siblings().removeClass('active focus_font_color');
        } else {
            $('#detail1 .tab2').addClass('active focus_font_color').siblings().removeClass('active focus_font_color');
        }
        calculate_advance_detail(loan_type);

        // 模式切换
        if (!detail1_setclick) {
            detail1_setclick = true;
            $('#detail1 .mode_type_detail div').click(function () {
                $(this).addClass('active focus_font_color').siblings().removeClass('active focus_font_color');
                calculate_advance_detail($('#detail1 .mode_type_detail .active')[0].innerText);
            })
        }

        clearInterval(timer);
        var odiv = document.getElementById("detail1");
        timer = setInterval(function () {
            console.log(timer);
            var speed = 0;
            if (odiv.offsetLeft > 0) {
                speed = -10;
            }
            if (odiv.offsetLeft <= 0) {
                odiv.style.left = '0px';
                clearInterval(timer);
            } else {
                odiv.style.left = odiv.offsetLeft + speed + 'px';
            }
        }, 3);
    }
}
// 商业公积金详情显示
function calculate_normal_detail(loan_type) {
    var principal = window.sessionStorage.principal;
    var months = window.sessionStorage.months;
    var rate = window.sessionStorage.rate;
    var result;
    if (loan_type == '等额本息') {
        result = calculateEqualPrincipalAndInterestArray(principal, months, rate);
    } else {
        result = calculateEqualPrincipalArray(principal, months, rate);
    }

    var table_trs = '';
    var now = new Date();
    var now_year = now.getFullYear();
    var now_month = now.getMonth();
    var month = now_month + 1, year = now_year;

    for (var i = 0; i < result.length; i++) {
        var item = result[i];
        var odd = (i % 2 == 1) ? 'odd' : '';
        month = now_month + 1 + i;
        if (month > 12) {
            month = month % 12 == 0 ? 12 : month % 12;
        }
        if (month % 12 == 1) {
            year += 1;
        }
        if (month < 10) {
            month = '0' + month;
        }
        var year_month = year + '.' + month;
        table_trs +=
            '<tr class="' + odd + '">\
                <td>' + year_month + '</td>\
                <td>' + Math.round(item[1]).toLocaleString() + '</td>\
                <td>' + Math.round(item[2]).toLocaleString() + '</td>\
                <td>' + Math.round(item[3]).toLocaleString() + '</td>\
                <td>' + Math.round(item[4]).toLocaleString() + '</td>\
            </tr>'
    }
    table_trs += '<tr><td colspan="5">数据仅供参考</td></tr>';
    $('table tbody').html(table_trs);
}
// 提前还贷详情
function calculate_advance_detail(loan_type) {
    var original_loan_type = window.sessionStorage.tq_original_loan_type;
    var original_repayment_method = window.sessionStorage.tq_original_repayment_method;
    var principal = window.sessionStorage.tq_principal * 1;
    var months = window.sessionStorage.tq_months * 1;
    var payTimes = window.sessionStorage.tq_payTimes * 1;
    var rate = window.sessionStorage.tq_rate * 1;
    var prepayment_method = window.sessionStorage.tq_prepayment_method;
    var processing_method = window.sessionStorage.tq_processing_method;
    var aheadPrincipal = window.sessionStorage.tq_aheadPrincipal * 1;
    var ret;
    if(loan_type == '等额本息'){
        if(prepayment_method == '1'){
            // '1':一次性还清
            // 一次性提前还款计算（等额本息）
            ret = onetimePayment_createArray_calculateEqualPrincipalAndInterest(principal, months, payTimes, rate);
        }else if(prepayment_method == '2'){
            // '2':部分提前还清
            if(processing_method == '1'){
                // '1':还款时间不变
                // 部分提前还款计算（等额本息、期限不变）
                ret = createArray_calculateEqualPrincipalAndInterestApart2(principal, months, aheadPrincipal, payTimes, rate);
            }else if (processing_method == '2'){
                // '2':月供不变
                // 部分提前还款计算（等额本息、月供不变）
                ret = createArray_calculateEqualPrincipalAndInterestApart(principal, months, aheadPrincipal, payTimes, rate);
            }
        };
    }else if(loan_type == '等额本金'){
        if(prepayment_method == '1'){
            // '1':一次性还清
            // 一次性提前还款计算(等额本金)
            ret = onetimePayment_createArray_calculateEqualPrincipal(principal, months, payTimes, rate);
        }else if(prepayment_method == '2'){
            // '2':部分提前还清
            if(processing_method == '1'){
                // '1':还款时间不变
                // 部分提前还款计算(等额本金、期限不变)
                ret = createArray_calculateEqualPrincipalApart2(principal, months, aheadPrincipal, payTimes, rate);
            }else if (processing_method == '2'){
                // '2':月供不变
                // 部分提前还款计算(等额本金、月供不变)
                ret = createArray_calculateEqualPrincipalApart(principal, months, aheadPrincipal, payTimes, rate);
            };
        };
    };

    var table_trs = '';
    var now = new Date();
    var now_year = now.getFullYear();
    var now_month = now.getMonth();
    var month = now_month + 1, year = now_year;

    for (var i = 0; i < ret.length; i++) {
        var item = ret[i];
        var odd = (i % 2 == 1) ? 'odd' : '';
        month = now_month + 1 + i;
        if (month > 12) {
            month = month % 12 == 0 ? 12 : month % 12;
        }
        if (month % 12 == 1) {
            year += 1;
        }
        if (month < 10) {
            month = '0' + month;
        }
        console.log(i, item);
        var year_month = year + '.' + month;
        table_trs +=
            '<tr class="' + odd + '">\
                <td>' + year_month + '</td>\
                <td>' + Math.round(item[1]).toLocaleString() + '</td>\
                <td>' + Math.round(item[2]).toLocaleString() + '</td>\
                <td>' + Math.round(item[3]).toLocaleString() + '</td>\
                <td>' + Math.round(item[4]).toLocaleString() + '</td>\
            </tr>'
    }
    table_trs += '<tr><td colspan="5">数据仅供参考</td></tr>';
    $('table tbody').html(table_trs);
}
// 组合详情显示
function calculate_normal_zuhe(loan_type) {
    var principal1 = window.sessionStorage.principal1;
    var principal2 = window.sessionStorage.principal2;
    var months = window.sessionStorage.months;
    var rate1 = window.sessionStorage.rate1;
    var rate2 = window.sessionStorage.rate2;
    var result1, result2;
    if (loan_type == '等额本息') {
        result1 = calculateEqualPrincipalAndInterestArray(principal1, months, rate1);
        result2 = calculateEqualPrincipalAndInterestArray(principal2, months, rate2);
    } else {
        result1 = calculateEqualPrincipalArray(principal1, months, rate1);
        result2 = calculateEqualPrincipalArray(principal2, months, rate2);
    }

    var table_trs = '';
    var now = new Date();
    var now_year = now.getFullYear();
    var now_month = now.getMonth();
    var month = now_month + 1, year = now_year;

    for (var i = 0; i < result1.length; i++) {
        var odd = (i % 2 == 1) ? 'odd' : '';
        month = now_month + 1 + i;
        if (month > 12) {
            month = month % 12 == 0 ? 12 : month % 12;
        }
        if (month % 12 == 1) {
            year += 1;
        }
        if (month < 10) {
            month = '0' + month;
        }
        var year_month = year + '.' + month;
        table_trs +=
            '<tr class="' + odd + '">\
                          <td>' + year_month + '</td>\
                          <td>' + Math.round(result1[i][1] + result2[i][1]).toLocaleString() + '</td>\
                          <td>' + Math.round(result1[i][1]).toLocaleString() + '</td>\
                          <td>' + Math.round(result2[i][1]).toLocaleString() + '</td>\
                        </tr>'
    }
    table_trs += '<tr><td colspan="5">数据仅供参考</td></tr>';
    $('table tbody').html(table_trs);
}
// 贷款期限变更
var last_year_num;
function change(e) {
    // if(Math.round($(e)[0].value)<=1){
    //     $('.loan_rate_pop_accumulation_fund ul li:eq(2)').click();
    // }
    // 点击进度条时，输入框失焦
    $("input").blur();

    var this_year_num = Math.round($(e)[0].value);
    if(index == 0 || index == 2){ //商业
        if((last_year_num<=1 && this_year_num > 1) || 
            ((last_year_num>1 && last_year_num<=5) && (this_year_num<=1||this_year_num>5)) ||
            (last_year_num>5 && this_year_num <=5)){
            change_rate_sy(this_year_num);
            if(index == 0){
                $('.shangye .loan_rate .input_num')[0].innerText = $('.loan_rate_pop_business ul li.selected')[0].innerText;
                $('.shangye .loan_rate .input_num').attr('rate-value', $('.loan_rate_pop_business ul li.selected').attr('rate-value'));
            }else if(index == 2){
                $('.zuhe .loan_rate_business .input_num')[0].innerText = $('.loan_rate_pop_business ul li.selected')[0].innerText;
                $('.zuhe .loan_rate_business .input_num').attr('rate-value',$('.loan_rate_pop_business ul li.selected').attr('rate-value'));
            }
        }
    }
    if(index == 1 || index == 2){
        if((last_year_num<=5 && this_year_num > 5) ||
            (last_year_num>5 && this_year_num <=5)){
            change_rate_gjj(this_year_num);
            if(index == 1){
                $('.gongjijin .loan_rate .input_num')[0].innerText = $('.loan_rate_pop_accumulation_fund ul li.selected')[0].innerText;
                $('.gongjijin .loan_rate .input_num').attr('rate-value', $('.loan_rate_pop_accumulation_fund ul li.selected').attr('rate-value'));
            }else if(index == 2){
                $('.zuhe .loan_rate_accumulation_fund .input_num')[0].innerText = $('.loan_rate_pop_accumulation_fund ul li.selected')[0].innerText;
                $('.zuhe .loan_rate_accumulation_fund .input_num').attr('rate-value',$('.loan_rate_pop_accumulation_fund ul li.selected').attr('rate-value'));
            }
        }
    }
    
    // 进度条进度
    var a = $(e)[0].value / 30 * 100 + '%';
    $(e).css("background-size", a + " 100%");
    if(index == 0){
        $('.shangye .left_range').attr('style','width:'+a+';');
    }else if(index == 1){
        $('.gongjijin .left_range').attr('style','width:'+a+';');
    }else if(index == 2){
        $('.zuhe .left_range').attr('style','width:'+a+';');
    }else if(index == 3){
        $('.tiqian .left_range').attr('style','width:'+a+';');
    }
    $('.loan_year')[index].innerText = Math.round($(e)[0].value);
    last_year_num = Math.round($(e)[0].value);

    // 计算月供等头部数据
    calculate_normal();
}

// // 贷款期限进度change
// $('.jindut').on('input change', function(){
//  $("input").blur();
//  if($(this)[0].value > 0.5){
//      $('.loan_year')[index].innerText = Math.round($(this)[0].value) + '年';
//  }else{
//      $('.loan_year')[index].innerText = $(this)[0].value + '年';
//  }
//  calculate_normal();
// })






/**
 * 计算等额本金还款
 * 
 * @param {*} principal 贷款总额
 * @param {*} months 贷款月数
 * @param {*} rate 贷款年利率
 */
function calculateEqualPrincipal(principal, months, rate) {
    // var months = years * 12;
    var monthRate = rate / 12;//月利率
    ret = {};

    //每月还款本金
    var everyMonthPrincipal = principal / months;
    ret.everyMonthPrincipal = everyMonthPrincipal;

    //第一个月还款金额
    ret.firstMonth = everyMonthPrincipal + principal * monthRate;
    //每月利息递减
    ret.decreaseMonth = everyMonthPrincipal * monthRate;
    //还款总利息
    ret.totalInterest = (months + 1) * principal * monthRate / 2;
    //还款总额
    ret.totalMoney = principal + ret.totalInterest;

    return ret;
};

/**
 * 计算等额本金还款分天数据
 * @param {*} principal 贷款总额
 * @param {*} months 贷款月数
 * @param {*} rate 贷款年利率
 * @returns 
 * 二维数组，每一行分别是期次、偿还本息、偿还本金、支付利息、剩余本金
 */
function calculateEqualPrincipalArray(principal, months, rate) {
    var result = calculateEqualPrincipal(principal, months, rate);
    // var months = years * 12;
    var monthRate = rate / 12;//月利率
    var ret = new Array();
    var firstMonthInterest = result.firstMonth - result.everyMonthPrincipal;
    for (var i = 0; i < months; i++) {
        ret[i] = new Array();
        // 期次
        ret[i][0] = i + 1;
        // 偿还本金
        ret[i][2] = result.everyMonthPrincipal;
        // 支付利息
        var interest = firstMonthInterest - i * result.decreaseMonth;
        ret[i][3] = interest > 0 ? interest : 0;
        // 偿还本息
        ret[i][1] = ret[i][2] + ret[i][3];
        // 剩余本金
        ret[i][4] = principal - (i + 1) * result.everyMonthPrincipal;
    }
    ret[months - 1][4] = 0;
    return ret;
}

//  calculateEqualPrincipalArray(10000,10,0.049);

/**
* 计算等额本息还款
*
* @param {*} principal 贷款总额
* @param {*} months 贷款月数
* @param {*} rate 贷款年利率
*/
function calculateEqualPrincipalAndInterest(principal, months, rate) {
    // var months = years * 12;
    var monthRate = rate / 12;//月利率

    ret = {};
    //每月还款金额
    ret.preLoan = (principal * monthRate * Math.pow((1 + monthRate), months)) / (Math.pow((1 + monthRate), months) - 1);
    //还款总额
    ret.totalMoney = ret.preLoan * months;
    //还款总利息
    ret.interest = ret.totalMoney - principal;
    //每月利息递减
    ret.decreaseMonth = 0;

    return ret;
}

// calculateEqualPrincipalAndInterest(1000000, 20, 0.049);
// calculateEqualPrincipal(1000000, 20, 0.049);


/**
 * 计算等额本息还款分天数据
 * @param {*} principal 贷款总额
 * @param {*} months 贷款月数
 * @param {*} rate 贷款年利率
 * @returns 
 * 二维数组，每一行分别是期次、偿还本息、偿还本金、支付利息、剩余本金
 */
function calculateEqualPrincipalAndInterestArray(principal, months, rate) {
    var result = calculateEqualPrincipalAndInterest(principal, months, rate);
    // var months = years * 12;
    var monthRate = rate / 12;//月利率

    var ret = new Array();
    var remainingPrincipal = principal;
    var firstMonthInterest = result.firstMonth - result.everyMonthPrincipal;
    for (var i = 0; i < months; i++) {
        ret[i] = new Array();
        // 期次
        ret[i][0] = i + 1;
        // 偿还本息
        ret[i][1] = result.preLoan;

        // 支付利息
        var interest = remainingPrincipal * monthRate;
        ret[i][3] = interest;

        // 偿还本金
        ret[i][2] = ret[i][1] - ret[i][3];

        // 剩余本金
        remainingPrincipal = remainingPrincipal - ret[i][2];
        ret[i][4] = remainingPrincipal;
    }
    ret[months - 1][4] = 0;
    return ret;
}
// calculateEqualPrincipalAndInterestArray(10000,10,0.049);







/**
     * 一次性提前还款计算（等额本息）
     * 和同花顺校验，能直接核对的指标都通过了
     * @param principal 贷款总额
     * @param months    贷款期限
     * @param payTimes  已还次数
     * @param rate      贷款利率
     * @return
     */
function onetimePayment_oncalculateEqualPrincipalAndInterest(principal, months, payTimes, rate) {
    var ret = {};
    var monthRate = rate / 12;//月利率
    var preLoan = (principal * monthRate * Math.pow((1 + monthRate), months)) / (Math.pow((1 + monthRate), months) - 1);//每月还款金额
    var totalMoney = preLoan * months;//还款总额
    var interest = totalMoney - principal;//还款总利息
    var leftLoan = principal * Math.pow(1 + monthRate, payTimes) - preLoan * (Math.pow(1 + monthRate, payTimes) - 1) / monthRate;//n个月后欠银行的钱
    var payLoan = principal - leftLoan;//已还本金
    var payTotal = preLoan * payTimes;//已还总金额
    var payInterest = payTotal - payLoan;//已还利息
    var totalPayAhead = leftLoan * (1 + monthRate);//剩余一次还清
    var saveInterest = totalMoney - payTotal - totalPayAhead;
    ret.totalMoney = totalMoney;//原还款总额
    ret.principal = principal;//贷款总额
    ret.interest = interest;//原还款总利息
    ret.preLoan = preLoan;//原还每月还款金额
    ret.payTotal = payTotal;//已还总金额
    ret.payLoan = payLoan;//已还本金
    ret.payInterest = payInterest;//已还利息
    ret.totalPayAhead = totalPayAhead;//一次还清支付金额
    ret.saveInterest = saveInterest;//节省利息
    ret.remainingMonths = 0;//剩余还款期限

    ret.new_saveInterest = saveInterest;//节省利息
    ret.new_firstMonth = preLoan;//原还首月还款金额
    ret.new_aheadTotalMoney = totalPayAhead;//提前还款总额(就是“当月还款”）
    ret.new_newFirstMonth = 0;//剩余首月还款金额
    ret.new_totalMoney = totalMoney - saveInterest;//还款总额
    ret.new_interest = interest - saveInterest;//支付利息
    ret.new_months = 1 + payTimes;//新的还款期限
    return ret;
}
// calculateEqualPrincipalAndInterest( 1000000, 10*12, 12, 4.9);


/**
     * 一次性提前还款计算（等额本息），生成分天数据
     * 和同花顺校验，能直接核对的指标都通过了
     * @param principal 贷款总额
     * @param months    贷款期限
     * @param payTimes  已还次数
     * @param rate      贷款利率
     * @return
     * 二维数组，每一行分别是期次、偿还本息、偿还本金、支付利息、剩余本金
     */
function onetimePayment_createArray_calculateEqualPrincipalAndInterest(principal, months, payTimes, rate) {
    var array = calculateEqualPrincipalAndInterestArray(principal, months, rate);
    var ret = new Array();
    for (var i = 0; i < payTimes; i++) {
        ret[i] = array[i];
    }
    var json = onetimePayment_oncalculateEqualPrincipalAndInterest(principal, months, payTimes, rate);
    ret[payTimes] = new Array();
    ret[payTimes][0] = payTimes + 1;
    ret[payTimes][1] = json.new_aheadTotalMoney;
    ret[payTimes][2] = principal - json.payLoan;
    ret[payTimes][3] = ret[payTimes][1] - ret[payTimes][2];
    ret[payTimes][4] = 0;
    return ret;
}
// onetimePayment_createArray_calculateEqualPrincipalAndInterest(1000000, 10*12, 12, 0.049);


/**
 * 一次性提前还款计算(等额本金)
 * 和同花顺校验，能直接核对的指标都通过了
 * @param principal 贷款总额
 * @param months    贷款期限
 * @param payTimes  已还次数
 * @param rate      贷款利率
 * @return
 */
function onetimePayment_calculateEqualPrincipal(principal, months, payTimes, rate) {
    var ret = {};
    var monthRate = rate / 12;//月利率
    var prePrincipal = principal / months;//每月还款本金
    var firstMonth = prePrincipal + principal * monthRate;//第一个月还款金额
    var decreaseMonth = prePrincipal * monthRate;//每月利息递减
    var interest = (months + 1) * principal * monthRate / 2;//还款总利息
    var totalMoney = principal + interest;//还款总额
    var payLoan = prePrincipal * payTimes;//已还本金
    var payInterest = (principal * payTimes - prePrincipal * (payTimes - 1) * payTimes / 2) * monthRate;//已还利息
    var payTotal = payLoan + payInterest;//已还总额
    var totalPayAhead = (principal - payLoan) * (1 + monthRate);//提前还款金额（剩余本金加上剩余本金当月利息）
    var saveInterest = totalMoney - payTotal - totalPayAhead;
    ret.totalMoney = totalMoney;//原还款总额
    ret.principal = principal;//贷款总额
    ret.interest = interest;//原还款总利息
    ret.firstMonth = firstMonth;//原首月还款金额
    ret.decreaseMonth = decreaseMonth;//原每月递减利息
    ret.payTotal = payTotal;//已还总金额
    ret.payLoan = payLoan;//已还本金
    ret.payInterest = payInterest;//已还利息
    ret.totalPayAhead = totalPayAhead;//一次还清支付金额
    ret.saveInterest = saveInterest;//节省利息
    ret.remainingMonths = 0;//剩余还款期限

    ret.new_saveInterest = saveInterest;//节省利息
    ret.new_firstMonth = firstMonth;//原还首月还款金额
    ret.new_aheadTotalMoney = totalPayAhead;//提前还款总额(就是“当月还款”）
    ret.new_newFirstMonth = 0;//剩余首月还款金额
    ret.new_totalMoney = totalMoney - saveInterest;//还款总额
    ret.new_interest = interest - saveInterest;//支付利息
    ret.new_months = 1 + payTimes;//新的还款期限

    return ret;
}
// calculateEqualPrincipal( 1000000, 10*12, 12, 4.9);

/**
 * 一次性提前还款计算(等额本金),计算分天数据
 * 和同花顺校验，能直接核对的指标都通过了
 * @param principal 贷款总额
 * @param months    贷款期限
 * @param payTimes  已还次数
 * @param rate      贷款利率
 * @return
 * 二维数组，每一行分别是期次、偿还本息、偿还本金、支付利息、剩余本金
 */
function onetimePayment_createArray_calculateEqualPrincipal(principal, months, payTimes, rate) {
    var array = calculateEqualPrincipalArray(principal, months, rate);
    var ret = new Array();
    for (var i = 0; i < payTimes; i++) {
        ret[i] = array[i];
    }
    var json = onetimePayment_calculateEqualPrincipal(principal, months, payTimes, rate);
    ret[payTimes] = new Array();
    ret[payTimes][0] = payTimes + 1;
    ret[payTimes][1] = json.new_aheadTotalMoney;
    ret[payTimes][2] = principal - json.payLoan;
    ret[payTimes][3] = ret[payTimes][1] - ret[payTimes][2];
    ret[payTimes][4] = 0;
    return ret;
}
// onetimePayment_createArray_calculateEqualPrincipal(1000000, 10*12, 12, 0.049);

/**
* 部分提前还款计算（等额本息、月供不变）
* 和同花顺app校验，节省利息多了1%，new_newFirstMonth多了约1%+
* @param principal      贷款总额
* @param months         贷款期限
* @param aheadPrincipal 提前还款金额
* @param payTimes       已还次数
* @param rate           贷款利率
* @return
*/
function calculateEqualPrincipalAndInterestApart(principal, months, aheadPrincipal, payTimes, rate) {
    var ret = {};
    var monthRate = rate / 12;//月利率
    var preLoan = (principal * monthRate * Math.pow((1 + monthRate), months)) / (Math.pow((1 + monthRate), months) - 1);//每月还款金额
    var totalMoney = preLoan * months;//还款总额
    var interest = totalMoney - principal;//还款总利息
    var leftLoanBefore = principal * Math.pow(1 + monthRate, payTimes) - preLoan * (Math.pow(1 + monthRate, payTimes) - 1) / monthRate;//提前还款前欠银行的钱
    var leftLoan = principal * Math.pow(1 + monthRate, payTimes + 1) - preLoan * (Math.pow(1 + monthRate, payTimes + 1) - 1) / monthRate - aheadPrincipal;//提前还款后欠银行的钱
    var payLoan = principal - leftLoanBefore;//已还本金
    var payTotal = preLoan * payTimes;//已还总金额
    var payInterest = payTotal - payLoan;//已还利息
    var aheadTotalMoney = aheadPrincipal + preLoan;//提前还款总额(就是“当月还款”）
    //计算剩余还款期限
    var leftMonth = Math.floor(Math.log(preLoan / (preLoan - leftLoan * monthRate)) / Math.log(1 + monthRate));
    var newPreLoan = (leftLoan * monthRate * Math.pow((1 + monthRate), leftMonth)) / (Math.pow((1 + monthRate), leftMonth) - 1);//剩余贷款每月还款金额
    var leftTotalMoney = newPreLoan * leftMonth;//剩余还款总额
    var leftInterest = leftTotalMoney - (leftLoan - aheadPrincipal);
    var saveInterest = totalMoney - aheadTotalMoney - leftTotalMoney - payTotal;
    ret.totalMoney = totalMoney;//原还款总额
    ret.principal = principal;//贷款总额
    ret.interest = interest;//原还款总利息
    ret.preLoan = preLoan;//原还每月还款金额
    ret.payTotal = payTotal;//已还总金额
    ret.payLoan = payLoan;//已还本金
    ret.payInterest = payInterest;//已还利息
    ret.aheadTotalMoney = aheadTotalMoney;//提前还款总额(就是“当月还款”）
    ret.leftTotalMoney = leftTotalMoney;//剩余还款总额
    ret.leftInterest = leftInterest;//剩余还款总利息
    ret.newPreLoan = newPreLoan;//剩余每月还款金额
    ret.saveInterest = saveInterest;//节省利息
    ret.remainingMonths = leftMonth;//剩余还款期限

    ret.new_saveInterest = saveInterest;//节省利息
    ret.new_firstMonth = preLoan;//原还首月还款金额
    ret.new_aheadTotalMoney = aheadTotalMoney;//提前还款总额(就是“当月还款”）
    ret.new_newFirstMonth = newPreLoan;//剩余首月还款金额
    ret.new_totalMoney = totalMoney - saveInterest;//还款总额
    ret.new_interest = interest - saveInterest;//支付利息
    ret.new_months = leftMonth + payTimes + 1; //新的还款期限; +1是累加上当月还款
    return ret;
}
// calculateEqualPrincipalAndInterestApart( 1000000, 10*12, 400000, 12, 4.9);

/**
 * 计算分天数据
 *
 * 部分提前还款计算（等额本息、月供不变）
 * 和同花顺app校验，节省利息多了1%，new_newFirstMonth多了约1%+
 * @param principal      贷款总额
 * @param months         贷款期限
 * @param aheadPrincipal 提前还款金额
 * @param payTimes       已还次数
 * @param rate           贷款利率
 * @return
 * 二维数组，每一行分别是期次、偿还本息、偿还本金、支付利息、剩余本金
 */
function createArray_calculateEqualPrincipalAndInterestApart(principal, months, aheadPrincipal, payTimes, rate) {
    var array = calculateEqualPrincipalAndInterestArray(principal, months, rate);
    var ret = new Array();
    for (var i = 0; i < payTimes; i++) {
        ret[i] = array[i];
    }
    var json = calculateEqualPrincipalAndInterestApart(principal, months, aheadPrincipal, payTimes, rate);
    ret[payTimes] = new Array();
    ret[payTimes][0] = payTimes + 1;
    //偿还本息
    ret[payTimes][1] = json.new_aheadTotalMoney;
    //偿还利息
    ret[payTimes][3] = array[payTimes][3];
    //偿还本金
    ret[payTimes][2] = ret[payTimes][1] - ret[payTimes][3];
    //剩余本金
    ret[payTimes][4] = principal - json.payLoan - ret[payTimes][2];

    var array_2 = calculateEqualPrincipalAndInterestArray(ret[payTimes][4], json.remainingMonths, rate);
    for (var i = 0, j = payTimes + 1; i < array_2.length; i++ , j++) {
        ret[j] = array_2[i];
        ret[j][0] = j + 1;
    }
    return ret;
}
// createArray_calculateEqualPrincipalAndInterestApart(1000000, 10*12, 400000, 12, 0.049);



/**
     *  部分提前还款计算(等额本金、月供不变)
     *  和同花顺校验，能直接核对的指标都通过了
     * @param principal      贷款总额
     * @param months         贷款期限
     * @param aheadPrincipal 提前还款金额
     * @param payTimes       已还次数
     * @param rate           贷款利率
     * @return
     */
function calculateEqualPrincipalApart(principal, months, aheadPrincipal, payTimes, rate) {
    var ret = {};
    var monthRate = rate / 12;//月利率
    var prePrincipal = principal / months;//每月还款本金
    var firstMonth = prePrincipal + principal * monthRate;//第一个月还款金额
    var decreaseMonth = prePrincipal * monthRate;//每月利息递减
    var interest = (months + 1) * principal * monthRate / 2;//还款总利息
    var totalMoney = principal + interest;//还款总额
    var payLoan = prePrincipal * payTimes;//已还本金
    var payInterest = (principal * payTimes - prePrincipal * (payTimes - 1) * payTimes / 2) * monthRate;//已还利息
    var payTotal = payLoan + payInterest;//已还总额
    var aheadTotalMoney = (principal - payLoan) * monthRate + aheadPrincipal + prePrincipal;//提前还款金额
    var leftLoan = principal - aheadPrincipal - payLoan - prePrincipal;//剩余金额
    var leftMonth = Math.floor(leftLoan / prePrincipal);
    var newPrePrincipal = leftLoan / leftMonth;//新的每月还款本金
    var newFirstMonth = newPrePrincipal + leftLoan * monthRate;//新的第一个月还款金额
    var newDecreaseMonth = newPrePrincipal * monthRate;//新的每月利息递减
    var leftInterest = (leftMonth + 1) * leftLoan * monthRate / 2;//还款总利息
    var leftTotalMoney = leftLoan + leftInterest;//还款总额
    var saveInterest = totalMoney - payTotal - aheadTotalMoney - leftTotalMoney;
    ret.totalMoney = totalMoney;//原还款总额
    ret.principal = principal;//贷款总额
    ret.interest = interest;//原还款总利息
    ret.firstMonth = firstMonth;//原还首月还款金额
    ret.decreaseMonth = decreaseMonth;//原每月递减利息
    ret.payTotal = payTotal;//已还总金额
    ret.payLoan = payLoan;//已还本金
    ret.payInterest = payInterest;//已还利息
    ret.aheadTotalMoney = aheadTotalMoney;//提前还款总额(就是“当月还款”）
    ret.leftTotalMoney = leftTotalMoney;//剩余还款总额
    ret.leftInterest = leftInterest;//剩余还款总利息
    ret.newFirstMonth = newFirstMonth;//剩余首月还款金额
    ret.newDecreaseMonth = newDecreaseMonth;//剩余月递减利息
    ret.saveInterest = saveInterest;//节省利息
    ret.remainingMonths = leftMonth;//剩余还款期限

    ret.new_saveInterest = saveInterest;//节省利息
    ret.new_firstMonth = firstMonth;//原还首月还款金额
    ret.new_aheadTotalMoney = aheadTotalMoney;//提前还款总额(就是“当月还款”）
    ret.new_newFirstMonth = newFirstMonth;//剩余首月还款金额
    ret.new_totalMoney = totalMoney - saveInterest;//还款总额
    ret.new_interest = interest - saveInterest;//支付利息
    ret.new_months = leftMonth + payTimes + 1;//新的还款期限; +1是累加上当月还款
    return ret;
}
// calculateEqualPrincipalApart( 1000000, 10*12, 400000, 12, 4.9);




/**
 * 计算分天数据，和同花顺app校验，完全一致 
 * 部分提前还款计算(等额本金、月供不变)
 *  和同花顺校验，能直接核对的指标都通过了
 * @param principal      贷款总额
 * @param months         贷款期限
 * @param aheadPrincipal 提前还款金额
 * @param payTimes       已还次数
 * @param rate           贷款利率
 * @return
 * 二维数组，每一行分别是期次、偿还本息、偿还本金、支付利息、剩余本金
 */
function createArray_calculateEqualPrincipalApart(principal, months, aheadPrincipal, payTimes, rate) {
    var array = calculateEqualPrincipalArray(principal, months, rate);
    var ret = new Array();
    for (var i = 0; i < payTimes; i++) {
        ret[i] = array[i];
    }
    var json = calculateEqualPrincipalApart(principal, months, aheadPrincipal, payTimes, rate);
    ret[payTimes] = new Array();
    ret[payTimes][0] = payTimes + 1;
    //偿还本息
    ret[payTimes][1] = json.new_aheadTotalMoney;
    //偿还利息
    ret[payTimes][3] = array[payTimes][3];
    //偿还本金
    ret[payTimes][2] = ret[payTimes][1] - ret[payTimes][3];
    //剩余本金
    ret[payTimes][4] = principal - json.payLoan - ret[payTimes][2];

    var array_2 = calculateEqualPrincipalArray(ret[payTimes][4], json.remainingMonths, rate);
    for (var i = 0, j = payTimes + 1; i < array_2.length; i++ , j++) {
        ret[j] = array_2[i];
        ret[j][0] = j + 1;
    }
    return ret;
}
// createArray_calculateEqualPrincipalApart(1000000, 10*12, 400000, 12, 0.049);


/**
 * 部分提前还款计算（等额本息、期限不变）
 * @param principal      贷款总额
 * @param months         贷款期限
 * @param aheadPrincipal 提前还款金额
 * @param payTimes       已还次数
 * @param rate           贷款利率
 * @return
 */
function calculateEqualPrincipalAndInterestApart2(principal, months, aheadPrincipal, payTimes, rate) {
    var ret = {};
    var monthRate = rate / 12;//月利率
    var preLoan = (principal * monthRate * Math.pow((1 + monthRate), months)) / (Math.pow((1 + monthRate), months) - 1);//每月还款金额
    var totalMoney = preLoan * months;//还款总额
    var interest = totalMoney - principal;//还款总利息
    var leftLoanBefore = principal * Math.pow(1 + monthRate, payTimes) - preLoan * (Math.pow(1 + monthRate, payTimes) - 1) / monthRate;//提前还款前欠银行的钱
    var leftLoan = principal * Math.pow(1 + monthRate, payTimes + 1) - preLoan * (Math.pow(1 + monthRate, payTimes + 1) - 1) / monthRate;//提前还款后银行的钱
    var payLoan = principal - leftLoanBefore;//已还本金
    var payTotal = preLoan * payTimes;//已还总金额
    var payInterest = payTotal - payLoan;//已还利息
    var aheadTotalMoney = preLoan + aheadPrincipal;//下个月还款金额
    var newPreLoan = ((leftLoan - aheadPrincipal) * monthRate * Math.pow((1 + monthRate), months - payTimes - 1)) / (Math.pow((1 + monthRate), months - payTimes - 1) - 1);//下个月起每月还款金额
    var leftTotalMoney = newPreLoan * (months - payTimes - 1);
    var leftInterest = leftTotalMoney - (leftLoan - aheadPrincipal);
    var saveInterest = totalMoney - payTotal - aheadTotalMoney - leftTotalMoney;
    ret.totalMoney = totalMoney;//原还款总额
    ret.principal = principal;//贷款总额
    ret.interest = interest;//原还款总利息
    ret.preLoan = preLoan;//原还每月还款金额
    ret.payTotal = payTotal;//已还总金额
    ret.payLoan = payLoan;//已还本金
    ret.payInterest = payInterest;//已还利息
    ret.aheadTotalMoney = aheadTotalMoney;//提前还款总额(就是“当月还款”）
    ret.leftTotalMoney = leftTotalMoney;//剩余还款总额
    ret.leftInterest = leftInterest;//剩余还款总利息
    ret.newPreLoan = newPreLoan;//剩余每月还款金额
    ret.saveInterest = saveInterest;//节省利息

    ret.new_saveInterest = saveInterest;//节省利息
    ret.new_firstMonth = preLoan;//原还首月还款金额
    ret.new_aheadTotalMoney = aheadTotalMoney;//提前还款总额(就是“当月还款”）
    ret.new_newFirstMonth = newPreLoan;//剩余首月还款金额
    ret.new_totalMoney = totalMoney - saveInterest;//还款总额
    ret.new_interest = interest - saveInterest;//支付利息
    ret.new_months = months; //新的还款期限
    return ret;
}
// calculateEqualPrincipalAndInterestApart2( 1000000, 10*12, 400000, 12, 4.9);

/**
 * 计算分天数据，和同花顺app校验，完全一致 
 * 部分提前还款计算（等额本息、期限不变）
 * @param principal      贷款总额
 * @param months         贷款期限
 * @param aheadPrincipal 提前还款金额
 * @param payTimes       已还次数
 * @param rate           贷款利率
 * @return
 * 二维数组，每一行分别是期次、偿还本息、偿还本金、支付利息、剩余本金
 */
function createArray_calculateEqualPrincipalAndInterestApart2(principal, months, aheadPrincipal, payTimes, rate) {
    var array = calculateEqualPrincipalAndInterestArray(principal, months, rate);
    var ret = new Array();
    for (var i = 0; i < payTimes; i++) {
        ret[i] = array[i];
    }
    var json = calculateEqualPrincipalAndInterestApart2(principal, months, aheadPrincipal, payTimes, rate);
    ret[payTimes] = new Array();
    ret[payTimes][0] = payTimes + 1;
    //偿还本息
    ret[payTimes][1] = json.new_aheadTotalMoney;
    //偿还利息
    ret[payTimes][3] = array[payTimes][3];
    //偿还本金
    ret[payTimes][2] = ret[payTimes][1] - ret[payTimes][3];
    //剩余本金
    ret[payTimes][4] = principal - json.payLoan - ret[payTimes][2];

    var array_2 = calculateEqualPrincipalAndInterestArray(ret[payTimes][4], months - payTimes - 1, rate);
    for (var i = 0, j = payTimes + 1; i < array_2.length; i++ , j++) {
        ret[j] = array_2[i];
        ret[j][0] = j + 1;
    }
    return ret;
}
// createArray_calculateEqualPrincipalAndInterestApart2(1000000, 10*12, 400000, 12, 0.049);

/**
     * 部分提前还款计算(等额本金、期限不变)
     * @param principal      贷款总额
     * @param months         贷款期限
     * @param aheadPrincipal 提前还款金额
     * @param payTimes       已还次数
     * @param rate           贷款利率
     * @return
     */
function calculateEqualPrincipalApart2(principal, months, aheadPrincipal, payTimes, rate) {
    var ret = {};
    var monthRate = rate / 12;//月利率
    var prePrincipal = principal / months;//每月还款本金
    var firstMonth = prePrincipal + principal * monthRate;//第一个月还款金额
    var decreaseMonth = prePrincipal * monthRate;//每月利息递减
    var interest = (months + 1) * principal * monthRate / 2;//还款总利息
    var totalMoney = principal + interest;//还款总额
    var payLoan = prePrincipal * payTimes;//已还本金
    var payInterest = (principal * payTimes - prePrincipal * (payTimes - 1) * payTimes / 2) * monthRate;//已还利息
    var payTotal = payLoan + payInterest;//已还总额
    var aheadTotalMoney = (principal - payLoan) * monthRate + aheadPrincipal + prePrincipal;//提前还款金额
    var leftMonth = months - payTimes - 1;
    var leftLoan = principal - aheadPrincipal - payLoan - prePrincipal;
    var newPrePrincipal = leftLoan / leftMonth;//新的每月还款本金
    var newFirstMonth = newPrePrincipal + leftLoan * monthRate;//新的第一个月还款金额
    var newDecreaseMonth = newPrePrincipal * monthRate;//新的每月利息递减
    var leftInterest = (leftMonth + 1) * leftLoan * monthRate / 2;//还款总利息
    var leftTotalMoney = leftLoan + leftInterest;//还款总额
    var saveInterest = totalMoney - payTotal - aheadTotalMoney - leftTotalMoney;
    ret.totalMoney = totalMoney;//原还款总额
    ret.principal = principal;//贷款总额
    ret.interest = interest;//原还款总利息
    ret.decreaseMonth = decreaseMonth;//原每月递减利息
    ret.payTotal = payTotal;//已还总金额
    ret.payLoan = payLoan;//已还本金
    ret.payInterest = payInterest;//已还利息
    ret.leftTotalMoney = leftTotalMoney;//剩余还款总额
    ret.leftInterest = leftInterest;//剩余还款总利息
    ret.newDecreaseMonth = newDecreaseMonth;//剩余月递减利息

    ret.new_saveInterest = saveInterest;//节省利息
    ret.new_firstMonth = firstMonth;//原还首月还款金额
    ret.new_aheadTotalMoney = aheadTotalMoney;//提前还款总额(就是“当月还款”）
    ret.new_newFirstMonth = newFirstMonth;//剩余首月还款金额
    ret.new_totalMoney = totalMoney - saveInterest;//还款总额
    ret.new_interest = interest - saveInterest;//支付利息
    ret.new_months = months; //新的还款期限
    return ret;
}

// calculateEqualPrincipalApart2( 1000000, 10*12, 400000, 12, 4.9);

/**
 * 计算分天数据，和同花顺app校验，完全一致 
 * 部分提前还款计算(等额本金、期限不变)
 * @param principal      贷款总额
 * @param months         贷款期限
 * @param aheadPrincipal 提前还款金额
 * @param payTimes       已还次数
 * @param rate           贷款利率
 * @return 
 * 二维数组，每一行分别是期次、偿还本息、偿还本金、支付利息、剩余本金
 */
function createArray_calculateEqualPrincipalApart2(principal, months, aheadPrincipal, payTimes, rate) {
    var array = calculateEqualPrincipalArray(principal, months, rate);
    var ret = new Array();
    for (var i = 0; i < payTimes; i++) {
        ret[i] = array[i];
    }
    var json = calculateEqualPrincipalApart2(principal, months, aheadPrincipal, payTimes, rate);
    ret[payTimes] = new Array();
    ret[payTimes][0] = payTimes + 1;
    //偿还本息
    ret[payTimes][1] = json.new_aheadTotalMoney;
    //偿还利息
    ret[payTimes][3] = array[payTimes][3];
    //偿还本金
    ret[payTimes][2] = ret[payTimes][1] - ret[payTimes][3];
    //剩余本金
    ret[payTimes][4] = principal - json.payLoan - ret[payTimes][2];

    var array_2 = calculateEqualPrincipalArray(ret[payTimes][4], months - payTimes - 1, rate);
    for (var i = 0, j = payTimes + 1; i < array_2.length; i++ , j++) {
        ret[j] = array_2[i];
        ret[j][0] = j + 1;
    }
    return ret;
}

// createArray_calculateEqualPrincipalApart2(1000000, 10*12, 400000, 12, 0.049);




