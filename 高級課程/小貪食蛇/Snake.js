//自調用函數---小蛇的身體
            (function() {
                var elements = []; //存放小蛇的每個身體部位
                function Snake(width, height, direction) {
                    //小蛇的每個部份寬
                    this.width = width || 20;
                    this.height = height || 20;
                    //小蛇的身體
                    this.body = [{
                        x: 3,
                        y: 2,
                        color: "red",
                    }, {
                        x: 2,
                        y: 2,
                        color: "yellow",
                    }, {
                        x: 1,
                        y: 2,
                        color: "yellow",
                    }, ];
                    this.direction = direction || "right";
                }
                //為原型添加方法---小蛇初始化的方法
                Snake.prototype.init = function(map) {
                    //先刪除之前的小蛇
                    remove();
                    //循環遍歷創建div
                    for (var i = 0; i < this.body.length; i++) {
                        //數組中的每個數組都是一個對象
                        var obj = this.body[i];
                        //把div加到地圖中
                        var div = document.createElement("div");
                        map.appendChild(div);
                        //設置div樣式，脫離文檔流
                        div.style.position = "absolute";
                        div.style.width = this.width + "px";
                        div.style.height = this.height + "px";
                        //橫縱座標
                        div.style.left = obj.x * this.width + "px";
                        div.style.top = obj.y * this.height + "px";
                        //背景顏色
                        div.style.backgroundColor = obj.color;
                        //方向暫時不定

                        //把div加入到elements的數組中----目的是為了刪除
                        elements.push(div);
                    }
                };
                //為原型添加方法---小蛇動起來
                Snake.prototype.move = function(food, map) {
                    var i = this.body.length - 1; //只取身體的部分
                    for (; i > 0; i--) {
                        this.body[i].x = this.body[i - 1].x;
                        this.body[i].y = this.body[i - 1].y;
                    }
                    //判斷方向---改變小蛇頭的座標位置
                    switch (this.direction) {
                        case "right":
                            this.body[0].x += 1;
                            break;
                        case "left":
                            this.body[0].x -= 1;
                            break;
                        case "top":
                            this.body[0].y -= 1;
                            break;
                        case "bottom":
                            this.body[0].y += 1;
                            break;
                    }
                    //當蛇吃到食物
                    //蛇頭的座標
                    var headX=this.body[0].x*this.width;
                    var headY=this.body[0].y*this.height;
                    console.log("食物"+food.x+"===="+food.y);
                    console.log("蛇頭"+headX+"===="+headY);
                    //判斷小蛇有沒有吃到食物
                    if(headX==food.x&&headY==food.y){
                        var last=this.body[this.body.length-1];
                        this.body.push({
                            x:last.x,
                            y:last.y,
                            color:last.color
                        });
                        food.init(map);
                    }

                };
                //刪除小蛇的私有函數
                function remove() {
                    var i = elements.length - 1;
                    for (; i > 0; i--) {
                        ele = elements[i];
                        ele.parentNode.removeChild(ele);
                        elements.splice(i, 1);
                    }
                    //無法理解，為什麼蛇的身體會多一塊出來
                    if (elements.length) {
                        ele = elements[0];
                        ele.parentNode.removeChild(ele);
                        elements.splice(0, 1);
                        //console.log("刪除多餘的蛇區塊");
                    }
                    //console.log("執行過remove()，目前elements長度為"+elements.length);
                }
                //把小蛇暴露給window，外部可以訪問
                window.Snake = Snake;
            })();
