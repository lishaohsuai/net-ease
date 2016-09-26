
		var s_main = document.querySelector(".s-main");//选定第一个 类名
		var s_counter = document.querySelector(".s-counter");//下标
		var i = document.querySelectorAll("i");//下标元素
		var max = 2;//最大值是4
		var n=0; //对  i  样式 更改的变量
		var setI; //定时器 返回值
		init();

		function step(){
			next();
			update();
		}

		function seton(){//开启定时器
			if(setI==undefined){
				setI = setInterval(step, 5000);//开启了定时器 就会进行图片的移动
			}
		}

		function setoff(){//关闭定时器
			clearInterval(setI);
			setI = undefined;
		}

		function update(){// 更改 类名 即 更改 样式
			var i = document.querySelectorAll("i");//下标元素
			for(var x=0; x<i.length; x++){
				i[x].className = "";
			}
			i[n].className = "selected";
		}
		
		function init(){
			seton();//开启定时
			var fn = function(num){
				return function(){
					setoff();//关闭定时器
					n = num;//参数
					nav(num);//移动图片
					update();
				}
			}
			for(var x=0; x<i.length; x++) {
				i[x].addEventListener("mouseenter", fn(x));//对每个i绑定动作
				i[x].addEventListener("mouseout", seton);
			}
			
		}

		function nav (nav) {
			if (nav<=max){
				n = nav;
				var s_main = document.querySelector(".s-main");//选定第一个 类名
				s_main.style.left = -1652*n + "px";//移动几张图片
			}
			update();	//更改样式 小图标
		}

		function next () {
			if(n == max){
				nav(0);
			}else{
				nav(n+1);
			}
		}

		function pre(){//上滑动
			if(n == 0){
				nav(max);//如果n
			}else{
				nav(n-1);
			}
		}

