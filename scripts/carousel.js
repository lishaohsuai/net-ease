function changePic (index) {
	var len = arguments.length;//传入参数的个数
	// console.log( len);
	// console.log( 'hello');
	if(len == 0){
	    timer_g = setInterval(CPic, 5000);//重新开一下定时器  全局变量
		console.log('chongkai');
		 i_g = 0;//全局变量
	}
	var pics = document.getElementsByClassName('pics');

	pics[0].addEventListener('click',function(){
		window.open('http://open.163.com/');
	});
	pics[1].addEventListener('click',function(){
		window.open('http://study.163.com/');
	});
	pics[2].addEventListener('click',function(){
		window.open('http://www.icourse163.org/');
	});

	
	if(len == 1){
		if(i_g == index){
			clearInterval(timer_g);
			 console.log( 'eq');
			 timer_g = setInterval(CPic, 5000);//重新开一下定时器	
		}else{
			clearInterval(timer_g);
			 console.log( 'neq');
			  // console.log( i);
			i_g = index -1;
			CPic();//立刻执行新的函数
			timer_g = setInterval(CPic, 5000);//重新开一下定时器	
		}
	}
	function CPic (indexx) {
		// console.log(i)
		i_g++;
		;
		if(i_g >= 3){
			i_g = 0;
		}
		switch (i_g) {
			case 0:
				setOpo(pics);
				 pics[0].style.zIndex = '3';
				 setOp(pics[0]);
				 CCounter(0);
				 pics[1].style.zIndex = '0';
				 pics[2].style.zIndex = '0';break;
			case 1:
				setOpo(pics);
				 pics[0].style.zIndex = '0';
				 pics[1].style.zIndex = '3';
				 setOp(pics[1]);
				 CCounter(1);
				 pics[2].style.zIndex = '0';break;
			case 2:
				setOpo(pics);	
				 pics[0].style.zIndex = '0';
				 pics[1].style.zIndex = '0';
				 pics[2].style.zIndex = '3';
				 CCounter(2);
				 setOp(pics[2]);            break;
			default:
				break;
		}
	}
}
function setOpo (pics) {//先把三个变为0
	var i ;
	for(i = 0;i<3;i++){
		 pics[i].style.opacity = '0';
	}
}
function setOp (pic) {
	var timer2 = setInterval(OPic, 100);
	var i = 0;
	function OPic () {
		pic.style.opacity = (parseFloat(pic.style.opacity) + 0.2) + '';
		i++;
		if(i >= 5){
			i = 0;
			clearInterval(timer2);
		}
	}
}
function CCounter (x) {
	var counter = document.getElementsByClassName('counter');
	var i = 0;
	for(i =0;i<3;i++){
		counter[i].className = 'counter';
	}
	counter[x].className = 'counter selected';
}
function PCounter (argument) {//手动绑定事件
	var i;
	var Pcou = document.getElementsByClassName('counter');
	for(i =0;i<3;i++){
		// console.log('bangidng ');
		Pcou[i].addEventListener('click', whoIsSel);
	}
}
function whoIsSel () {
	var Pcou = document.getElementsByClassName('counter');
	for(i =0;i<3;i++){
		Pcou[i].className = 'counter';
	}
	this.className = 'selected counter';
	for(i =0;i<3;i++){
		if(Pcou[i].className == 'selected counter'){
			changePic(i);
			return;
		}
	}
}
//绑定 图片跳转效果
function jumpPic (argument) {
	// body... 
}
addLoadEvent(changePic);
addLoadEvent(PCounter);
