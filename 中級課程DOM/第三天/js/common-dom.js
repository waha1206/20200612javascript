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
 * ie8不支持 textContent，火狐跟谷哥支持
 * set 需要傳進去兩個參數 元素對象 --- object 與 text --- 值
 */
function setinnerText(element, text) {
    if (typeof element.textContent) {
        element.innerText = text;
    } else {
        element.textContent = text;
    }
}
/**
 * get text 只需要傳進去 元素對象即可取得 innerText 或是 textContent
 *
 */
function getinnerText(element) {
    if (typeof element.textContent) {
        return element.textContent;
    } else {
        return element.textContent;
    }
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