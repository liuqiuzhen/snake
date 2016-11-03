// $(document).swipe({
// 	swipe:function(event,direction){
// 		// console.log(direction);
// 		var dir = arguments[1];
// 	}
// })

function bodyScale(){
	var devicewidth=document.documentElement.clientWidth;
	var scale=devicewidth/750;
	document.body.style.zoom=scale;
}
window.onload=window.onresize=function(){
	bodyScale();	
}


// 重设宽高

$(function(){
	common.$out.width(common.width*common.box);
	common.$out.height(common.height*common.box);


	// 实例化蛇对象 食物对象
	common.snake = new Snake();
	common.snake.create();
	common.food = new Food();
	common.food.create();

	common.timer = setInterval(function(){
		 common.snake.move();
	},common.speed)

	$(document).swipe({
		swipe:function(event,direction){
			var direction = arguments[1];
			if((common.snake.dir == "up" && direction == "down") || (common.snake.dir == "left" && direction == "right") || (common.snake.dir == "down" && direction == "up") || (common.snake.dir == "right" && direction == "left") ){
				return false;
			}else{
				common.snake.dir = arguments[1];
			}
			
		}
	})
})