/*

最後修改版本 2020.8.7
修改人 Leo
修改bug --
addEventListener
最後一行 =fn 改成 =fnName
新增函數

*/

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

//獲取任一父級元素的第一個子級元素
//注意IE8不支援 element.firstElementChild
//IE8支援element.firstChild，但是遇到節點要排除，直到判斷找到元素
function getFirstElementChild(element) {
    if (element.firstElementChild) {
        return element.firstElementChild;
    } else {
        var node = element.firstChild;
        //nodeType 1=元素  2=屬性  3=文本內容
        while (node && nodeType != 1) {
            //如果node不存在或是node不是 1 (元素標籤) 就在找下一個
            node = node.nextSibling;
        }
        return node;
    }
}
//獲取任一父級元素的最後一個子級元素
function getLastElementChild(element) {
    if (element.lastElementChild) {
        return element.lastElementChild;
    } else {
        var node = element.LastChild;
        while (node && nodeType != 1) {
            node = node.previousSibling;
        }
        return node;
    }
}

//為元素綁定的兼容代碼
/**
 *
 *
 * @param {element, fn, type} 元素, 事件不帶on, 事件處理函數
 * @returns {} 無返回值
 */
function addEventListener(element, fnName, type) {
    if (element.addEventListener) {
        element.addEventListener(type, fnName, false);
    } else if (element.attachEvent) {
        element.attachEvent("on" + type, fnName);
    } else {
        element["on" + type] = fnName;
    }
}

//為元素解綁事件的兼容代碼
/**
 *
 *
 * @param {element, fnName, type} 元素, 事件不帶on, 事件處理函數
 * @returns {} 無返回值
 */

function removeEventListener(element, fnName, type) {
    if (element.removeEventListener) {
        element.removeEventListener(type, fnName, false);
    } else if (element.detachEvent) {
        element.detachEvent("on" + type, fnName);
    } else {
        element["on" + type] = null;
    }
}

//讓物件左右移動
/**
 *
 *
 * @param {element, target, speed} 元素, 要去的 X 座標 , 移動速度 毫秒
 * @returns {} 無返回值
 */

function animate(element, target, speed) {
    clearInterval(element.timeId);
    element.timeId = setInterval(function() {
        //先取得 物件的 offset
        var offset = element.offsetLeft;
        //先設定移動的距離
        var step = 10;
        //到底要前進還是後退呢？小於前進，大於後退
        step = offset < target ? step : -step;
        offset += step;
        //然後前進吧，但是要判斷有沒有走到
        if (Math.abs(target - offset) > Math.abs(step)) {
            element.style.left = offset + "px";
        } else {
            element.style.left = target + "px";
        }
    }, speed);
}

function animate_leo(element, json, fn) {
    clearInterval(element.timeId);
    element.timeId = setInterval(function() {
        var flag = true;
        for (attr in json) {
            if (attr == "zIndex") {
                element.style[attr] = json[attr];
            } else if (attr == "opacity") {
                //透明度的話要放大100倍
                var current = getStyle(element, attr) * 100;
                var target = json[attr] * 100;
                var step = (target - current) / 10;
                step = step > 0 ? Math.ceil(step) : Math.floor(step);
                current += step;
                element.style[attr] = current / 100;
            } else {
                //透明度與zIndex以外的屬性跑這邊
                var target = json[attr];
                var current = parseInt(getStyle(element, attr));
                //往正數前進，還是負數
                var step = (target - current) / 10;
                step = step > 0 ? Math.ceil(step) : Math.floor(step);
                current += step;
                element.style[attr] = current + "px";
            }
            if (target != current) {
                flag = false;
            }
        }
        if (flag) {
            clearInterval(element.timeId);
            if (fn) {
                fn();
            }
        }
    }, 20);
}

function getStyle(element, attr) {
    return window.getComputedStyle ? window.getComputedStyle(element, null)[attr] : element.currentStyle[att] || 0;
}