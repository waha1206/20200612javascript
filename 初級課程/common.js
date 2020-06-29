function getTowNumber(num) {
    num = num < 10 ? "0" + num : num;
    return num;
}

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