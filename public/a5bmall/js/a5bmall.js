var baseUrl = "https://apimall.asiajy.com/";
var uuid = "02:00:00:00:00:00";


function back() {
    window.history.back(-1);
}


//自定义弹框
function Toast(msg, duration, callback) {
    duration = isNaN(duration) ? 3000 : duration;
    var m = document.createElement('div');
    m.innerHTML = msg;
    m.style.cssText = "width: 60%;min-width: 150px;opacity: 0.7;height: 30px;color: rgb(255, 255, 255);line-height: 30px;text-align: center;border-radius: 5px;position: fixed;top: 40%;left: 20%;z-index: 999999;background: rgb(0, 0, 0);font-size: 12px;";
    document.body.appendChild(m);
    setTimeout(function () {
        var d = 0.5;
        m.style.webkitTransition = '-webkit-transform ' + d + 's ease-in, opacity ' + d + 's ease-in';
        m.style.opacity = '0';
        setTimeout(function () {
            document.body.removeChild(m);
            callback();
        }, d * 1000);
    }, duration);
}

function getUserInfo(callback) {
    $.ajax({
        url: baseUrl + "buyer/members",
        type: "get",
        headers: {
            Accept: "application/json; charset=utf-8",
            Authorization: $.cookie('a5bmall_token')
        },
        error: function () {
            // callback(null);
        },
        success: function (data, status) {
            callback(data);
        }
    });


}


function getMemberOther(callback) {
    $.ajax({
        url: baseUrl + "buyer/members/statistics",
        type: "get",
        headers: {
            Accept: "application/json; charset=utf-8",
            Authorization: $.cookie('a5bmall_token')
        },
        error: function () {
            // callback(null);
        },
        success: function (data, status) {
            callback(data);
        }
    });
}
/*
 //订单总数
    val order_count = 0
    //商品收藏
    val goods_collect_count = 0
    //店铺收藏
    val shop_collect_count = 0
    //足迹
    val history_collect_count = 0
    //优惠券
    val coupon_collect_count = 0
    //代付款订单
    val pending_comment_count = 0
    //未读消息
    val unread_message_count = 0
    //补差价订单
    val pay_diff_count = 0
*
* */

/*
 * 时间格式化工具
 * 把Long类型的1527672756454日期还原yyyy-MM-dd格式日期
 * 把Long类型的1589265718000日期还原yyyy-MM-dd格式日期
 */
function dateFormat(longTypeDate) {
    var dateTypeDate = "";
    var date = new Date();
    date.setTime(longTypeDate);
    dateTypeDate += date.getFullYear(); //年
    dateTypeDate += "-" + getMonth(date); //月
    dateTypeDate += "-" + getDay(date); //日
    return dateTypeDate;
}

//返回 01-12 的月份值
function getMonth(date) {
    var month = "";
    month = date.getMonth() + 1; //getMonth()得到的月份是0-11
    if (month < 10) {
        month = "0" + month;
    }
    return month;
}

//返回01-30的日期
function getDay(date) {
    var day = "";
    day = date.getDate();
    if (day < 10) {
        day = "0" + day;
    }
    return day;
}

/*
{
    "member_id": 169,
    "uname": "m_15889636926",
    "email": "1107241393@qq.com",
    "create_time": 1575884082,
    "sex": 0,
    "birthday": 1577515802000,
    "province_id": 53112,
    "city_id": 55675,
    "county_id": 56108,
    "town_id": 0,
    "province": "马来西亚（Malaysia）",
    "city": "Pahang",
    "county": "Benta",
    "town": "",
    "address": "天河大道2号",
    "mobile": "15889636926",
    "tel": "020-87654321",
    "grade_point": 25,
    "consum_point": 25,
    "msn": null,
    "remark": null,
    "last_login": 1579190998,
    "login_count": 90,
    "is_cheked": null,
    "recommend_point_state": null,
    "info_full": 1,
    "find_code": null,
    "face": "http:\/\/47.88.173.86:82\/testShopImg\/20191231\/DDA9D29421534
    "midentity": null,
    "disabled": 0,
    "shop_id": null,
    "have_shop": 0,
    "nickname": "张运才2",
    "gr": "60",
    "mch_user_code": null
}
 */