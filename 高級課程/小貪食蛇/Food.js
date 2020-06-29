//自調用函數---食物的
(function () {
  var elements = [];
  //食物的建構函式
  function Food(x, y, width, height, color) {
    this.x = 0;
    this.y = 0;
    this.width = width || 20;
    this.height = height || 20;
    this.color = color || "red";
  }

  //為原型添加初始化方法，在地圖上面顯示食物
  //因為食物要在地圖上顯示，所以需要地圖這個參數
  //map就是葉面上的.class="map"，也就是個div 【<div class="map"></div>】
  Food.prototype.init = function (map) {
    //如果elements裡面有食物子元素的話，先刪除
    remove();
    //創建一個div
    var div = document.createElement("div");
    //把這個元素放到父元素上面
    map.appendChild(div);
    //設置div的樣式
    div.style.width = this.width + "px";
    div.style.height = this.height + "px";
    div.style.backgroundColor = this.color;
    //脫離文檔流
    div.style.position = "absolute";
    //隨機橫縱座標
    this.x =
      parseInt(Math.random() * (map.offsetWidth / this.width)) * this.width;
    this.y =
      parseInt(Math.random() * (map.offsetHeight / this.height)) * this.height;
    div.style.left = this.x + "px";
    div.style.top = this.y + "px";
    console.log(this.x);
    console.log(this.y);
    console.log(div.style.top);

    //把div加入到數組elements中，未來食物被小蛇吃掉後，要把它刪掉
    elements.push(div);
  };
  //私有函數--刪除食物用的，注意，不能用prototype
  function remove() {
    //elements中有這個食物
    for (var i = 0; i < elements.length; i++) {
      var ele = elements[i];
      //找到這個元素的父級元素，然後刪除這個子元素
      ele.parentNode.removeChild(ele);
      //再次把elements裡面的這個子元素也要刪掉
      elements.splice(i, 1);
    }
  }
  window.Food = Food;
})();
