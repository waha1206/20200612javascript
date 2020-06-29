//自調用函數---遊戲對象 Game
(function () {
  var that = null;
  //遊戲的構造函數
  function Game(map) {
    this.food = new Food();
    this.snake = new Snake();
    this.map = map;
    that = this;
  }
  //初始話遊戲---可以設置小蛇和食物顯示出來
  Game.prototype.init = function () {
    //初始化遊戲
    //初始化食物
    this.food.init(this.map);
    //初始化小蛇
    this.snake.init(this.map);
    //調用自動移動小蛇的方法
    this.runSnake(this.food, this.map);
    //調用按鍵的控制
    this.bindkey();
  };
  //添加原型方法---設定小蛇可以自動的跑起來 (要跑起來裡面一定會有定時器)
  Game.prototype.runSnake = function (food, map) {
    var setTimer = setInterval(
      function () {
        //移動小蛇
        this.snake.move(food, map);
        //初始化小蛇
        this.snake.init(map);
        //橫坐標最大值 X
        var maxX = map.offsetWidth / this.snake.width;
        //縱座標最大值 Y
        var maxY = map.offsetHeight / this.snake.height;
        //小蛇的頭的座標
        var HeadX = this.snake.body[0].x;
        var HeadY = this.snake.body[0].y;
        if (HeadX < 0 || HeadX >= maxX) {
          //撞牆了，停止計時器
          clearInterval(setTimer);
          alert("遊戲結束");
        }
        //縱座標
        if (HeadY < 0 || HeadY >= maxY) {
          //撞牆了，停止計時器
          clearInterval(setTimer);
          alert("遊戲結束");
        }
      }.bind(that),
      150
    );
  };
  //添加原型方法---設置用戶按鍵，改變小蛇運動方向
  Game.prototype.bindkey = function () {
    //獲取用戶按鍵，改變小蛇方向
    document.addEventListener(
      "keydown",
      function (e) {
        //這裡的this應該是觸發keydown的事件的對象---document
        //所以這裡的this就是document
        //取得按鍵值
        console.log(e.keyCode);
        switch (e.keyCode) {
          case 37:
            this.snake.direction = "left";
            break;
          case 38:
            this.snake.direction = "top";
            break;
          case 39:
            this.snake.direction = "right";
            break;
          case 40:
            this.snake.direction = "bottom";
            break;
        }
      }.bind(that),
      false
    );
  };

  window.Game = Game;
})();
