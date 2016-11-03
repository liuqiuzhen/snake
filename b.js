var common={
	width:30,//游戏区域水平方向划分多少格
	height:30,//游戏区域垂直方向划分多少格
	box:24,//每个小方格的宽高
	speed:300,//速度
	timer:null,//计时器
	snake:null,//蛇对象
	food:null,//食物对象
	$out:$("#out"),//游戏区域
}

//创建蛇对象
function Snake(){
	this.$head=null;
	this.tails=[]; //尾巴
	this.dir="right";
	this.pos={x:0,y:0};
}

Snake.prototype={
	//创建方法
	create:function(){
		this.$head = $('<div id="snakehead"></div>');
		this.$head.css({
			width:common.box,
			height:common.box,
			top:this.pos.y,
			left:this.pos.x
		})
		common.$out.append(this.$head);
		
	},
	eat:function(){
		// 当头部与食物坐标重合时
		common.food.updata();
		this.addtails();
	},
	//蛇头移动
	move:function(){
		var pos = {x:this.pos.x,y:this.pos.y}
		switch(this.dir){
			case 'up':
				this.pos.y-=common.box;
				this.$head.css({
					transform:"rotate(90deg)"
				})
				break;
			case 'down':
				this.pos.y+=common.box;
				this.$head.css({
					transform:"rotate(-90deg)"
				})
				break;
			case 'left':
				this.pos.x-=common.box;
				this.$head.css({
					transform:"rotate(0deg)"
				})
				break;
			case 'right':
				this.pos.x+=common.box;
				this.$head.css({
					transform:"rotate(180deg)"
				})
				break;
		}
		this.$head.css({
			top:this.pos.y,
			left:this.pos.x
		})
		this.coil();
		this.tailmove(pos);
	},
	//添加蛇尾
	addtails:function(){
		var $tail = $("<div class='snake'></div>")
		
		$tail.css({
			width:common.box,
			height:common.box,
			// top:this.pos.y,
			// left:this.pos.x
		})
		this.tails.push($tail);
		common.$out.append($tail);
	},
	//蛇尾移动
	tailmove:function(pos){
		if(this.tails.length){
			var las = this.tails.length - 1;
			this.tails[las].css({
				left:pos.x,
				top:pos.y,
				// background:"pink",
				// borderBottomRadius:"10px"
			})
			this.tails.unshift(this.tails.pop());
		}
	},
	//碰撞监听
	coil:function(){
		if(this.pos.x > (common.width - 1)*common.box+1 || this.pos.x < -1 || this.pos.y < -1 || this.pos.y > (common.height - 1)*common.box+1){
			this.over();
		}
		if (this.pos.x==common.food.pos.x&&this.pos.y==common.food.pos.y) {
			this.eat();
		}
		//与自身相撞时
		if(this.tails.length){
			for(var i =0;i<this.tails.length;i++){
				if(this.pos.x == parseInt(this.tails[i].css("left")) && this.pos.y == parseInt(this.tails[i].css("top"))){
					this.over();
				}
			}
		}
	},
	//游戏结束
	over:function(){
		setTimeout(function(){
			alert("Game over");
			clearInterval(common.timer);
		},0)		
		
	}
}

//创建食物对象
function Food(){
	this.$el = null;
	this.pos = {x:0,y:0}
}

Food.prototype = {
	//生成食物
	create:function(){
		this.$el = $("<div id ='food'></div>");
		this.createpos();
		this.$el.css({
			width:common.box,
			height:common.box,
			// left:this.pos.x,
			// top:this.pos.y
		})
		common.$out.append(this.$el)
	},
	//更新食物
	updata:function(){
		this.createpos();
	},
	// 随机坐标创建
	createpos:function(){
		var x = Math.floor(Math.random()*common.width)*common.box;
		var y = Math.floor(Math.random()*common.height)*common.box;
		var arr = [0,1,2,3,4,5,6,7,8,9,"a","b","c","d","e","f","g","A","B","C","D","E","F","G"];		
		var str = '';
		for(var i =0;i<6;i++){
			var n = Math.floor(Math.random()*23);
			str+=arr[n];
		}
		console.log(str)
		this.pos = {x:x,y:y};
		this.$el.css({
			background:"#"+str,
			boxShadow:"0px 0px 5px 2px #"+str,
			left:this.pos.x,
			top:this.pos.y
		})
	}
}
