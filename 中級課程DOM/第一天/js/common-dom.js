//用參數id傳回元素的對象

/**
 *根據id屬性的值，返回對應的標籤元素 *
 * @param {*} id屬性的值,string類型的
 * @returns {element} 元素對象
 */
function my$(id) {
    return document.getElementById(id);
}


function getTowNumber(num) {
    num = num < 10 ? "0" + num : num;
    return num;
}

/**
 *
 *
 * @param {*} dt 傳入一個函數 new Date()
 * @returns {string} 返回字串，現在的年月日小時分鐘秒
 */
function getDate(dt) {
    var year = dt.getFullYear();
    var month = dt.getMonth();
    var day = dt.getDate();
    var hour = dt.getHours();
    var minute = dt.getMinutes();
    var second = dt.getSeconds();
    month = getTowNumber(month);
    day = getTowNumber(day);
    hour = getTowNumber(hour);
    minute = getTowNumber(minute);
    second = getTowNumber(second);
    return year + "年" + month + "月" + day + "日" + " " + hour + ":" + minute + ":" + second;
}