//todo 这里请求商城的数据的API
//todo 这里请求商城的数据的API
//todo 这里请求商城的数据的API
//todo 这里请求商城的数据的API
//todo 这里请求商城的数据的API
//todo 这里请求商城的数据的API
//todo 这里请求商城的数据的API
//todo 这里请求商城的数据的API
//todo 这里请求商城的数据的API
var baseUrl = "https://apimall.asiajy.com/";
var uuid = "02:00:00:00:00:00";

/*
* todo 可以知道一个对象中有哪些属性,或者debug打断点也行
*   for(var i in this)
                    {
                        console.log("属性:"+i)
                    }
* */
var user = null;

/**
 * 获取缓存信息
 * @returns {*}
 */
function getUser() {
    // if (user != null) {
    //     return user;
    // }

    try {
        user = $.cookie('a5bmall_user');
        console.log("用户" + JSON.stringify(user));
        user = JSON.parse(user);
    } catch (e) {
        user = null;
    }
    return user;
}

/**
 * 进入个人信息页面
 */
function startProfile() {
    if (getUser() == null) {
        window.location.href = "login.html";
    } else {
        window.location.href = "profile.html";
    }
}

/**
 * 退出
 */
function logout() {
    $.cookie('a5bmall_user', null, {expires: 7, path: '/'});
    getUser()
}

function back() {
    window.history.back(-1);
}

function showLoading() {
    var loadingImg = document.createElement("img");
    loadingImg.src = "images/loading.gif";
    loadingImg.id = "loadingImg";
    document.body.appendChild(loadingImg)
}

function dismissLoading() {
    var loadingImg = document.querySelector("#loadingImg");
    document.body.removeChild(loadingImg)
}

function setHeadBarTitle(titleName) {
    //找到父容器
    var headBarTitle = document.querySelector("#headBarTitle");
    headBarTitle.innerText=titleName
}

function addCommonNav(navIndex) {
    //找到父容器
    var commonNav = document.querySelector("#commonNav");
    for (var i = 0; i < 4; i++) {
        var commonNavItem = document.createElement('div')
        commonNavItem.id = "commonNavItem";
        var img = document.createElement('img')
        var p = document.createElement('p')
        if (i == 0) {
            img.src = "images/ic_home_unselected.png";
            p.style.color = "#333";
            if (navIndex == i) {
                img.src = "images/ic_home_selected.png";
                p.style.color = "#4B9DD6";
            } else {
                commonNavItem.onclick = function () {
                    // alert("首页")
                    window.location.href = "main_home.html";
                }
            }
            p.innerText = "首页";
        } else if (i == 1) {
            img.src = "images/ic_classification_normal.png";
            p.style.color = "#333";
            if (navIndex == i) {
                img.src = "images/ic_classification_selected.png";
                p.style.color = "#4B9DD6";
            } else {
                commonNavItem.onclick = function () {
                    alert("分类")
                }
            }
            p.innerText = "分类";
        } else if (i == 2) {
            img.src = "images/ic_shopping_cart_normal.png";
            p.style.color = "#333";
            if (navIndex == i) {
                img.src = "images/ic_shopping_cart_selected.png";
                p.style.color = "#4B9DD6";
            } else {
                commonNavItem.onclick = function () {
                    alert("购物车")
                }
            }
            p.innerText = "购物车";
        } else {
            img.src = "images/ic_personal_center_normal.png";
            p.style.color = "#333";
            if (navIndex == i) {
                img.src = "images/ic_personal_center_selected.png";
                p.style.color = "#4B9DD6";
            } else {
                commonNavItem.onclick = function () {
                    // alert("我的")
                    window.location.href = "main_mine.html";
                }
            }
            p.innerText = "我的";
        }
        commonNavItem.appendChild(img);
        commonNavItem.appendChild(p);
        commonNav.appendChild(commonNavItem);
    }
    //给导航栏底部留宽度
    var commonFooter = document.querySelector("#commonFooter");
    commonFooter.style.height = commonNav.offsetHeight + ".px";
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
        dataType: 'json',
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


/**
 * 菜单
 */
function getMenu(callback) {
    showLoading();
    if (true) {
        var json = "[{\"navigation_id\":70,\"navigation_name\":\"商家入驻\",\"url\":\"https://a5bmall.com\",\"client_type\":\"MOBILE\",\"image\":\"http://47.88.173.86:82/testShopImg/20200317/EEAB97CBEE70424787F8A10BAE3D76C1.png\",\"sort\":27,\"country_id\":12},{\"navigation_id\":69,\"navigation_name\":\"账户充值\",\"url\":\"https://a5bmall.com\",\"client_type\":\"MOBILE\",\"image\":\"http://47.88.173.86:82/testShopImg/20200317/E09688D98249491D8E8E98EBD2991004.png\",\"sort\":26,\"country_id\":12},{\"navigation_id\":68,\"navigation_name\":\"领卷中心\",\"url\":\"https://a5bmall.com\",\"client_type\":\"MOBILE\",\"image\":\"http://47.88.173.86:82/testShopImg/20200317/4D5BC53BFF764EE7A9A88FC98804E0B7.png\",\"sort\":25,\"country_id\":12},{\"navigation_id\":67,\"navigation_name\":\"推荐好店\",\"url\":\"https://a5bmall.com\",\"client_type\":\"MOBILE\",\"image\":\"http://47.88.173.86:82/testShopImg/20200317/102C0148278F4847B1901056FEA21D2C.png\",\"sort\":24,\"country_id\":12},{\"navigation_id\":66,\"navigation_name\":\"网红爆款\",\"url\":\"https://a5bmall.com\",\"client_type\":\"MOBILE\",\"image\":\"http://47.88.173.86:82/testShopImg/20200317/F7E2CA65AE12482B911E141B89159EC0.png\",\"sort\":23,\"country_id\":12}]";
        callback(JSON.parse(json));
        dismissLoading()
        return
    }
    $.ajax({
        url: baseUrl + "buyer/pages/site-navigations",
        type: "get",
        data: {
            client_type: 'MOBILE'
        },
        dataType: 'json',
        headers: {
            Accept: "application/json; charset=utf-8",
            Authorization: $.cookie('a5bmall_token')
        },
        error: function () {
            // callback(null);
            dismissLoading()
        },
        success: function (data, status) {
            dismissLoading()
            callback(data);
        }
    });
}

/*
{
    "navigation_id": 69,
    "navigation_name": "账户充值",
    "url": "https:\/\/a5bmall.com",
    "client_type": "MOBILE",
    "image": "http:\/\/47.88.173.86:82
    "sort": 26,
    "country_id": 12
},
 */

/**
 * banner
 */
function getBanner(callback) {
    if (true) {
        var json = "[{\"id\":20,\"pic_url\":\"http://47.88.173.86:82/testShopImg/20200319/4F4CE7D528DE4D0393EE860C3D2D2DC0.jpeg\",\"operation_type\":\"NONE\",\"operation_param\":\"https://a5bmall.com/\",\"operation_url\":null,\"client_type\":\"WAP\",\"country_id\":12},{\"id\":22,\"pic_url\":\"http://47.88.173.86:82/testShopImg/20200319/A2187F8ECF1940FD82F4F6BC641C43DB.jpeg\",\"operation_type\":\"URL\",\"operation_param\":\"https://a5bmall.com/\",\"operation_url\":null,\"client_type\":\"WAP\",\"country_id\":12}]";
        callback(JSON.parse(json));
        return
    }
    $.ajax({
        url: baseUrl + "buyer/focus-pictures",
        type: "get",
        data: {
            client_type: 'WAP'
        },
        dataType: 'json',
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


/**
 * 猜你喜欢
 */
function getMineGuessLike(callback) {
    if (true) {
        var json = "{\"code\":200,\"msg\":\"成功\",\"data\":{\"data\":[{\"goods_id\":7680,\"name\":\"手机支架塑玻杯\",\"thumbnail\":\"http://47.88.223.5:83/51E241B393AE4419BB00EF11FAF037A9_300x300.jpeg\",\"small\":\"http://47.88.223.5:83/51E241B393AE4419BB00EF11FAF037A9_400x400.jpeg\",\"discount_price\":0.0,\"price\":5.28,\"buy_count\":0,\"comment_num\":0,\"grade\":100.0,\"seller_id\":64,\"seller_name\":\"全广州最靓的店\",\"self_operated\":1,\"price_list\":{\"price_rmb\":5.28,\"price_myr\":3.35,\"price_thb\":0.0,\"price_idr\":0.0,\"price_vnd\":0.0,\"price_php\":0.0},\"lang_list\":{\"vi\":{\"id\":2824,\"goods_id\":7680,\"lang_jx\":\"vi\",\"lang_name\":\"Điện thoại di động khung nhựa ly\"},\"th\":{\"id\":2822,\"goods_id\":7680,\"lang_jx\":\"th\",\"lang_name\":\"วงเล็บโทรศัพท์มือถือแก้วพลาสติก\"},\"ms\":{\"id\":2819,\"goods_id\":7680,\"lang_jx\":\"ms\",\"lang_name\":\"Sarung plastik telefon bimbit Piala Glass\"},\"fil\":{\"id\":2825,\"goods_id\":7680,\"lang_jx\":\"fil\",\"lang_name\":\"Mobile phone bracket plastic glass\"},\"en\":{\"id\":2821,\"goods_id\":7680,\"lang_jx\":\"en\",\"lang_name\":\"Mobile phone support plastic glass cup\"},\"cn\":{\"id\":2820,\"goods_id\":7680,\"lang_jx\":\"cn\",\"lang_name\":\"手机支架塑玻杯\"},\"id\":{\"id\":2823,\"goods_id\":7680,\"lang_jx\":\"id\",\"lang_name\":\"Ponsel braket kaca cangkir\"}}},{\"goods_id\":8192,\"name\":\"空心柄锅铲\",\"thumbnail\":\"http://47.88.173.86:82/testShopImg/CAD95AED523647ABAD3D5DDBF026F4E1_300x300.jpeg\",\"small\":\"http://47.88.173.86:82/testShopImg/CAD95AED523647ABAD3D5DDBF026F4E1_400x400.jpeg\",\"discount_price\":0.0,\"price\":11.55,\"buy_count\":0,\"comment_num\":0,\"grade\":100.0,\"seller_id\":64,\"seller_name\":\"全广州最靓的店\",\"self_operated\":1,\"price_list\":{\"price_rmb\":11.55,\"price_myr\":7.33,\"price_thb\":0.0,\"price_idr\":0.0,\"price_vnd\":0.0,\"price_php\":0.0},\"lang_list\":{\"vi\":{\"id\":6982,\"goods_id\":8192,\"lang_jx\":\"vi\",\"lang_name\":\"Mâm cặp tay cầm rỗng\"},\"th\":{\"id\":6980,\"goods_id\":8192,\"lang_jx\":\"th\",\"lang_name\":\"พลั่วจับกลวง\"},\"ms\":{\"id\":6977,\"goods_id\":8192,\"lang_jx\":\"ms\",\"lang_name\":\"Spade periuk berongga\"},\"fil\":{\"id\":6983,\"goods_id\":8192,\"lang_jx\":\"fil\",\"lang_name\":\"Hollow handle spatula\"},\"en\":{\"id\":6979,\"goods_id\":8192,\"lang_jx\":\"en\",\"lang_name\":\"Hollow handle spatula\"},\"cn\":{\"id\":6978,\"goods_id\":8192,\"lang_jx\":\"cn\",\"lang_name\":\"空心柄锅铲\"},\"id\":{\"id\":6981,\"goods_id\":8192,\"lang_jx\":\"id\",\"lang_name\":\"Tanggul tackle\"}}},{\"goods_id\":7681,\"name\":\"快充type-c数据线安卓tpc充电线 M9-V / M9-I\",\"thumbnail\":\"http://47.88.223.5:83/E94498FF10464BCDA541DF0F8E42B8B0_300x300.jpeg\",\"small\":\"http://47.88.223.5:83/E94498FF10464BCDA541DF0F8E42B8B0_400x400.jpeg\",\"discount_price\":0.0,\"price\":1.52,\"buy_count\":0,\"comment_num\":0,\"grade\":100.0,\"seller_id\":64,\"seller_name\":\"全广州最靓的店\",\"self_operated\":1,\"price_list\":{\"price_rmb\":1.52,\"price_myr\":0.97,\"price_thb\":0.0,\"price_idr\":0.0,\"price_vnd\":0.0,\"price_php\":0.0},\"lang_list\":{\"vi\":{\"id\":2831,\"goods_id\":7681,\"lang_jx\":\"vi\",\"lang_name\":\"Nhanh chóng sạc type-c dòng dữ liệu Android tpc dòng sạc M9-V/M9-I\"},\"th\":{\"id\":2829,\"goods_id\":7681,\"lang_jx\":\"th\",\"lang_name\":\"สายข้อมูล type-c ที่ชาร์จไฟได้อย่างรวดเร็ว Android tpc สายชาร์จ M9-V / M9-I\"},\"ms\":{\"id\":2826,\"goods_id\":7681,\"lang_jx\":\"ms\",\"lang_name\":\"Musnap tye-c Penyambung data Andrews Pc M9-V/M9-I\"},\"fil\":{\"id\":2832,\"goods_id\":7681,\"lang_jx\":\"fil\",\"lang_name\":\"Quick-charge typ-c data line Android tpc charging line M9-V/M9-I\"},\"en\":{\"id\":2828,\"goods_id\":7681,\"lang_jx\":\"en\",\"lang_name\":\"Fast charge type-c data line Android tpc charge line M9-V/M9-I\"},\"cn\":{\"id\":2827,\"goods_id\":7681,\"lang_jx\":\"cn\",\"lang_name\":\"快充type-c数据线安卓tpc充电线 M9-V / M9-I\"},\"id\":{\"id\":2830,\"goods_id\":7681,\"lang_jx\":\"id\",\"lang_name\":\"Lubang data charge cepat Antopc kabel pengisian M9-V/M9-I\"}}},{\"goods_id\":8193,\"name\":\"空心柄锅勺\",\"thumbnail\":\"http://47.88.173.86:82/testShopImg/ED2124B49F6D4200ABB691202AF9748F_300x300.jpeg\",\"small\":\"http://47.88.173.86:82/testShopImg/ED2124B49F6D4200ABB691202AF9748F_400x400.jpeg\",\"discount_price\":0.0,\"price\":11.55,\"buy_count\":0,\"comment_num\":0,\"grade\":100.0,\"seller_id\":64,\"seller_name\":\"全广州最靓的店\",\"self_operated\":1,\"price_list\":{\"price_rmb\":11.55,\"price_myr\":7.33,\"price_thb\":0.0,\"price_idr\":0.0,\"price_vnd\":0.0,\"price_php\":0.0},\"lang_list\":{\"vi\":{\"id\":6989,\"goods_id\":8193,\"lang_jx\":\"vi\",\"lang_name\":\"Mâm cặp rỗng\"},\"th\":{\"id\":6987,\"goods_id\":8193,\"lang_jx\":\"th\",\"lang_name\":\"ช้อนหม้อกลวง\"},\"ms\":{\"id\":6984,\"goods_id\":8193,\"lang_jx\":\"ms\",\"lang_name\":\"Kod berongga sudu\"},\"fil\":{\"id\":6990,\"goods_id\":8193,\"lang_jx\":\"fil\",\"lang_name\":\"Hollow shank\"},\"en\":{\"id\":6986,\"goods_id\":8193,\"lang_jx\":\"en\",\"lang_name\":\"Hollow handle spoon\"},\"cn\":{\"id\":6985,\"goods_id\":8193,\"lang_jx\":\"cn\",\"lang_name\":\"空心柄锅勺\"},\"id\":{\"id\":6988,\"goods_id\":8193,\"lang_jx\":\"id\",\"lang_name\":\"Plug-in sendok panci\"}}},{\"goods_id\":7682,\"name\":\"藏青色闪充安卓数据线 M2-V\",\"thumbnail\":\"http://47.88.223.5:83/140047DC5E0C4058BC7A535535C749C8_300x300.jpeg\",\"small\":\"http://47.88.223.5:83/140047DC5E0C4058BC7A535535C749C8_400x400.jpeg\",\"discount_price\":0.0,\"price\":5.83,\"buy_count\":0,\"comment_num\":0,\"grade\":100.0,\"seller_id\":64,\"seller_name\":\"全广州最靓的店\",\"self_operated\":1,\"price_list\":{\"price_rmb\":5.83,\"price_myr\":3.7,\"price_thb\":0.0,\"price_idr\":0.0,\"price_vnd\":0.0,\"price_php\":0.0},\"lang_list\":{\"vi\":{\"id\":2838,\"goods_id\":7682,\"lang_jx\":\"vi\",\"lang_name\":\"Đường dữ liệu Android flash màu lục lam Tây Tạng M2-V\"},\"th\":{\"id\":2836,\"goods_id\":7682,\"lang_jx\":\"th\",\"lang_name\":\"สายข้อมูล Android ของทิเบต M2-V\"},\"ms\":{\"id\":2833,\"goods_id\":7682,\"lang_jx\":\"ms\",\"lang_name\":\"Tibet warna kilat cahaya udara Android talian M2-V\"},\"fil\":{\"id\":2839,\"goods_id\":7682,\"lang_jx\":\"fil\",\"lang_name\":\"Tibetan cyan flash na puno ng Android data line M2-V\"},\"en\":{\"id\":2835,\"goods_id\":7682,\"lang_jx\":\"en\",\"lang_name\":\"Navy Cyan Flash Filled Android Data Line M2-V\"},\"cn\":{\"id\":2834,\"goods_id\":7682,\"lang_jx\":\"cn\",\"lang_name\":\"藏青色闪充安卓数据线 M2-V\"},\"id\":{\"id\":2837,\"goods_id\":7682,\"lang_jx\":\"id\",\"lang_name\":\"Kerang warna merah muda kabel data Android M2-V\"}}},{\"goods_id\":8194,\"name\":\"食用级硅胶冰格\",\"thumbnail\":\"http://47.88.173.86:82/testShopImg/C8ED96ABF2154ED791AD01036D4CDD1C_300x300.jpeg\",\"small\":\"http://47.88.173.86:82/testShopImg/C8ED96ABF2154ED791AD01036D4CDD1C_400x400.jpeg\",\"discount_price\":0.0,\"price\":14.3,\"buy_count\":0,\"comment_num\":0,\"grade\":100.0,\"seller_id\":64,\"seller_name\":\"全广州最靓的店\",\"self_operated\":1,\"price_list\":{\"price_rmb\":14.3,\"price_myr\":9.08,\"price_thb\":0.0,\"price_idr\":0.0,\"price_vnd\":0.0,\"price_php\":0.0},\"lang_list\":{\"vi\":{\"id\":6996,\"goods_id\":8194,\"lang_jx\":\"vi\",\"lang_name\":\"Băng silicone cấp thực phẩm\"},\"th\":{\"id\":6994,\"goods_id\":8194,\"lang_jx\":\"th\",\"lang_name\":\"น้ำแข็งซิลิกาเจลเกรดที่กินได้\"},\"ms\":{\"id\":6991,\"goods_id\":8194,\"lang_jx\":\"ms\",\"lang_name\":\"Gelap ais silikon yang boleh dimakan\"},\"fil\":{\"id\":6997,\"goods_id\":8194,\"lang_jx\":\"fil\",\"lang_name\":\"Nakakain grado silica gel yelo\"},\"en\":{\"id\":6993,\"goods_id\":8194,\"lang_jx\":\"en\",\"lang_name\":\"Edible grade silica gel ice lattice\"},\"cn\":{\"id\":6992,\"goods_id\":8194,\"lang_jx\":\"cn\",\"lang_name\":\"食用级硅胶冰格\"},\"id\":{\"id\":6995,\"goods_id\":8194,\"lang_jx\":\"id\",\"lang_name\":\"Es silikon kelas yang dapat dimakan\"}}},{\"goods_id\":7683,\"name\":\"水银色闪充安卓数据线M3-V\",\"thumbnail\":\"http://47.88.223.5:83/A102A18DE35041DDA57DFFE0CA312FB5_300x300.jpeg\",\"small\":\"http://47.88.223.5:83/A102A18DE35041DDA57DFFE0CA312FB5_400x400.jpeg\",\"discount_price\":0.0,\"price\":6.82,\"buy_count\":0,\"comment_num\":0,\"grade\":100.0,\"seller_id\":64,\"seller_name\":\"全广州最靓的店\",\"self_operated\":1,\"price_list\":{\"price_rmb\":6.82,\"price_myr\":4.33,\"price_thb\":0.0,\"price_idr\":0.0,\"price_vnd\":0.0,\"price_php\":0.0},\"lang_list\":{\"vi\":{\"id\":2845,\"goods_id\":7683,\"lang_jx\":\"vi\",\"lang_name\":\"Dòng dữ liệu Android flash bạc nước M3-V\"},\"th\":{\"id\":2843,\"goods_id\":7683,\"lang_jx\":\"th\",\"lang_name\":\"น้ำเงินแฟลชแฟลช Android สายข้อมูล M3-V\"},\"ms\":{\"id\":2840,\"goods_id\":7683,\"lang_jx\":\"ms\",\"lang_name\":\"Barisan data flash perak Mo3-V\"},\"fil\":{\"id\":2846,\"goods_id\":7683,\"lang_jx\":\"fil\",\"lang_name\":\"Water-silver flash Android data line M3-V\"},\"en\":{\"id\":2842,\"goods_id\":7683,\"lang_jx\":\"en\",\"lang_name\":\"Mercury Flash Filled Android Data Line M3-V\"},\"cn\":{\"id\":2841,\"goods_id\":7683,\"lang_jx\":\"cn\",\"lang_name\":\"水银色闪充安卓数据线M3-V\"},\"id\":{\"id\":2844,\"goods_id\":7683,\"lang_jx\":\"id\",\"lang_name\":\"Air perak flash drive Android line M3-V\"}}},{\"goods_id\":8195,\"name\":\"硅胶手柄平底锅锅铲煎铲\",\"thumbnail\":\"http://47.88.173.86:82/testShopImg/0A0547BCC57D41789FD0526C13636276_300x300.jpeg\",\"small\":\"http://47.88.173.86:82/testShopImg/0A0547BCC57D41789FD0526C13636276_400x400.jpeg\",\"discount_price\":0.0,\"price\":11.55,\"buy_count\":0,\"comment_num\":0,\"grade\":100.0,\"seller_id\":64,\"seller_name\":\"全广州最靓的店\",\"self_operated\":1,\"price_list\":{\"price_rmb\":11.55,\"price_myr\":7.33,\"price_thb\":0.0,\"price_idr\":0.0,\"price_vnd\":0.0,\"price_php\":0.0},\"lang_list\":{\"vi\":{\"id\":7003,\"goods_id\":8195,\"lang_jx\":\"vi\",\"lang_name\":\"Silica gel xử lý chảo chảo xẻng\"},\"th\":{\"id\":7001,\"goods_id\":8195,\"lang_jx\":\"th\",\"lang_name\":\"ที่จับซิลิกาเจลกระทะพลั่วพลั่ว\"},\"ms\":{\"id\":6998,\"goods_id\":8195,\"lang_jx\":\"ms\",\"lang_name\":\"Pemegang plastik silikon menyodok tangki periuk sampingan yang terbungkus\"},\"fil\":{\"id\":7004,\"goods_id\":8195,\"lang_jx\":\"fil\",\"lang_name\":\"Silicone handle pan pan shovel decoction\"},\"en\":{\"id\":7000,\"goods_id\":8195,\"lang_jx\":\"en\",\"lang_name\":\"Silicone handle pan spatula\"},\"cn\":{\"id\":6999,\"goods_id\":8195,\"lang_jx\":\"cn\",\"lang_name\":\"硅胶手柄平底锅锅铲煎铲\"},\"id\":{\"id\":7002,\"goods_id\":8195,\"lang_jx\":\"id\",\"lang_name\":\"Tanggul pegangan panci kacang tanah sekop goreng\"}}},{\"goods_id\":8196,\"name\":\"硅胶手柄锅勺汤勺\",\"thumbnail\":\"http://47.88.173.86:82/testShopImg/E6D6F4218CE548819ADF5605460649ED_300x300.jpeg\",\"small\":\"http://47.88.173.86:82/testShopImg/E6D6F4218CE548819ADF5605460649ED_400x400.jpeg\",\"discount_price\":0.0,\"price\":11.55,\"buy_count\":0,\"comment_num\":0,\"grade\":100.0,\"seller_id\":64,\"seller_name\":\"全广州最靓的店\",\"self_operated\":1,\"price_list\":{\"price_rmb\":11.55,\"price_myr\":7.33,\"price_thb\":0.0,\"price_idr\":0.0,\"price_vnd\":0.0,\"price_php\":0.0},\"lang_list\":{\"vi\":{\"id\":7010,\"goods_id\":8196,\"lang_jx\":\"vi\",\"lang_name\":\"Silica gel xử lý muỗng muỗng súp\"},\"th\":{\"id\":7008,\"goods_id\":8196,\"lang_jx\":\"th\",\"lang_name\":\"ช้อนหม้อซิลิกาเจล\"},\"ms\":{\"id\":7005,\"goods_id\":8196,\"lang_jx\":\"ms\",\"lang_name\":\"Sup pemegang silikon sudu sup\"},\"fil\":{\"id\":7011,\"goods_id\":8196,\"lang_jx\":\"fil\",\"lang_name\":\"Silica hawakan kutsara kutsara\"},\"en\":{\"id\":7007,\"goods_id\":8196,\"lang_jx\":\"en\",\"lang_name\":\"Silicone handle spoon\"},\"cn\":{\"id\":7006,\"goods_id\":8196,\"lang_jx\":\"cn\",\"lang_name\":\"硅胶手柄锅勺汤勺\"},\"id\":{\"id\":7009,\"goods_id\":8196,\"lang_jx\":\"id\",\"lang_name\":\"Kulit kepala sendok\"}}},{\"goods_id\":7685,\"name\":\"全能手机数据线一头三用 M6\",\"thumbnail\":\"http://47.88.223.5:83/50A096A71AC54C988EAD1EABFFCBDF9A_300x300.jpeg\",\"small\":\"http://47.88.223.5:83/50A096A71AC54C988EAD1EABFFCBDF9A_400x400.jpeg\",\"discount_price\":0.0,\"price\":8.14,\"buy_count\":0,\"comment_num\":0,\"grade\":100.0,\"seller_id\":64,\"seller_name\":\"全广州最靓的店\",\"self_operated\":1,\"price_list\":{\"price_rmb\":8.14,\"price_myr\":5.17,\"price_thb\":0.0,\"price_idr\":0.0,\"price_vnd\":0.0,\"price_php\":0.0},\"lang_list\":{\"vi\":{\"id\":2859,\"goods_id\":7685,\"lang_jx\":\"vi\",\"lang_name\":\"Dòng dữ liệu điện thoại di động toàn diện với ba M6\"},\"th\":{\"id\":2857,\"goods_id\":7685,\"lang_jx\":\"th\",\"lang_name\":\"สายข้อมูลโทรศัพท์มือถืออเนกประสงค์ M6 แบบสามทาง\"},\"ms\":{\"id\":2854,\"goods_id\":7685,\"lang_jx\":\"ms\",\"lang_name\":\"Barisan data telefon bimbit yang maha kuasa dengan M6\"},\"fil\":{\"id\":2860,\"goods_id\":7685,\"lang_jx\":\"fil\",\"lang_name\":\"Makapangyarihang linya ng data ng mobile phone na may tatlong M6 sa isang dulo\"},\"en\":{\"id\":2856,\"goods_id\":7685,\"lang_jx\":\"en\",\"lang_name\":\"All-purpose mobile phone data line, one end, three-purpose M6\"},\"cn\":{\"id\":2855,\"goods_id\":7685,\"lang_jx\":\"cn\",\"lang_name\":\"全能手机数据线一头三用 M6\"},\"id\":{\"id\":2858,\"goods_id\":7685,\"lang_jx\":\"id\",\"lang_name\":\"Garis data mobile yang maha dahsyat dengan M6\"}}}],\"page_no\":1,\"page_size\":10,\"data_total\":44}}";
        callback(JSON.parse(json));
        return
    }
    $.ajax({
        url: baseUrl + "buyer/goods/search/recommend",
        type: "get",
        data: {
            page_no: '1',
            page_size: '10',
        },
        dataType: 'json',
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

