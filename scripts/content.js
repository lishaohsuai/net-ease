
//排行榜
function ranking_m (argument) {
	
	var super_sen = {};//接受数据
	var view_div = {};//显示数据
	var view_img = {};
	var view_divC = {};
	var view_title = {};
	var view_p = {};
	var i;
	function callback (argument) {		
		ranking = document.getElementsByClassName('move-ranking')[0];
		super_sen = JSON.parse(argument);
		 // console.log(super_sen);
		for(i = 0;i<20;i++)
		{
			view_div[i] = document.createElement('div');//创建DIV
			view_img[i] = document.createElement('img');
			// console.log(super_sen[i]);
			view_img[i].setAttribute('src', super_sen[i].smallPhotoUrl);

			view_divC[i] = document.createElement('div');//创建DIV


			view_title[i] = document.createElement('h2');
			view_title[i].innerHTML = super_sen[i].name;
			view_p[i] = document.createElement('p');
			view_p[i].innerHTML =super_sen[i].learnerCount;

			view_divC[i].appendChild(view_title[i]);
			view_divC[i].appendChild(view_p[i]);
			view_div[i].appendChild(view_img[i]);
			view_div[i].appendChild(view_divC[i]);

			view_p[i].className = 'picture';
			view_div[i].className= 'viewHot';
			view_divC[i].className = 'viewHotRight';
			ranking.appendChild(view_div[i]);
		}
	}
	get('https://study.163.com/webDev/hotcouresByCategory.htm',null,callback);//获得数据
	// console.log(super_sen);

	
}
//移动榜单
function mov_ranking(){
		var time1 = setInterval(mov, 5000);
		var ranking = document.getElementsByClassName("move-ranking")[0];
		ranking.style.marginTop = 0;
		function mov (argument) {
			var time2 = setInterval(mov_small,100);
			var i = 0;
			function mov_small (argument) {
				i++;
				ranking.style.marginTop = parseInt(ranking.style.marginTop) - 9 +'px';
				if(i > 7){
					 clearInterval(time2);
					 i = 0;
				}
				if( parseInt(ranking.style.marginTop) < (-720)){
					ranking.style.marginTop = 0;
					clearInterval(time2);
					 i = 0;
				}
			}
		}
	}
addLoadEvent(ranking_m);
addLoadEvent(mov_ranking);


//  获取主要的内容 
function viewBig (argument) {
	var i; 
	var j;
	var options = {pageNo:1,psize:20,type:10};
	var super_sen = {};//整体数据的接纳串口
	var view_big_div = {};//小数据的整体div
	var view_big_img = {};//图片的容器
	var view_big_details = {};//下面的介绍
	var view_big_li = [];//
	var indiv = {}; 

	function callback (argument) {
		super_sen = JSON.parse(argument);
		// console.log(super_sen);
		var con = document.getElementsByClassName('content-details')[0];
		for(i = 0;i<20;i++)
		{
			
			view_big_div[i] = document.createElement('div');//创建DIV
			view_big_img[i] = document.createElement('img');//创建img
			indiv[i] = document.createElement('div');//创建DIV

			view_big_details[i] = document.createElement('ul');//创建DIV
			view_big_details[i].className = 'smallul';
			view_big_li[i]=new Array();
			for(j = 0; j < 4;j++)
			{
				view_big_li[i][j] = document.createElement('li');//创建li
				view_big_details[i].appendChild(view_big_li[i][j]);
			}


			{
				view_big_li[i][0].innerHTML = super_sen.list[i].name;
				view_big_li[i][0].className = 'bigfir';
				view_big_li[i][1].innerHTML = super_sen.list[i].provider;
				view_big_li[i][1].className = 'bigsec';
				view_big_li[i][2].innerHTML = super_sen.list[i].learnerCount;
				view_big_li[i][2].className = 'bigthi';
				view_big_li[i][3].innerHTML = '￥'+super_sen.list[i].price.toFixed(2);
				if(super_sen.list[i].price == 0){
					view_big_li[i][3].innerHTML = '免费';
				}
				view_big_li[i][3].className = 'bigfor';
			}
			

			//设置图片内容
			view_big_img[i].className = 'bigImg';
			view_big_img[i].setAttribute('src', super_sen.list[i].bigPhotoUrl);

			view_big_div[i].className = 'blocks';
			indiv[i].className = 'indiv';
			indiv[i].appendChild(view_big_div[i])
			view_big_div[i].appendChild(view_big_img[i]);
			view_big_div[i].appendChild(view_big_details[i]);
			con.appendChild(indiv[i]);

			
		}
		everymodule (super_sen);
		//对ul添加时事件 标题颜色  加阴影
			//mouseOver();
		// 生成翻页器
			var pagesNum = super_sen.totalPage;
			var pages = {};//页码
			var changePages = document.createElement('div');
			var pagesUp = document.createElement('span');
			pagesUp.innerHTML = '<';
			changePages.appendChild(pagesUp);
			for(i = 0;i<pagesNum;i++){
				pages[i] = document.createElement('span');
				pages[i].innerHTML = ''+(i+1);
				// pages[i].setAttribute('class', 'showPages');
				// pages[i].className = 'showPages';
				changePages.appendChild(pages[i]);
			}
			for(i = 0;i<8;i++){
				pages[i].className = 'showPages';
			}
			for(i= 8;i<pagesNum;i++){
				pages[i].className = 'hidePages';
			}
			var pagesDown = document.createElement('span');
			pagesDown.innerHTML = '>';
			pagesDown.className = 'pagesDown';
			pagesUp.className = 'pagesUp';
			changePages.className = 'changePages';
			changePages.appendChild(pagesDown);
			con.appendChild(changePages);

			total = super_sen.pagination.totlePageCount;//总共的页码

			
				var i;
				var changeSpan = document.getElementsByClassName('showPages');
				for(i = 0;i<8;i++){
					changeSpan[i].addEventListener('click', cPage);//每个按键绑定事件
				}

				var spanUp = document.getElementsByClassName('pagesUp')[0];
				var spanDown = document.getElementsByClassName('pagesDown')[0];
				spanUp.style.backgroundColor = 'lightgray';
				pages[0].style.backgroundColor = '#9dd8b1';
				spanUp.addEventListener('click', upDownEvent);//每个按键绑定事件
				spanDown.addEventListener('click', upDownEvent);//每个按键绑定事件
				//阴影 加上
				for(i = 0;i<20;i++){
					view_big_div[i].addEventListener('mouseover',mouseOver);
					view_big_div[i].addEventListener('mouseout',mouseOut);
					//变换样式
					view_big_img[i].addEventListener('mouseover',mouseOverImg);
					// view_big_img[i].addEventListener('mouseout',mouseOutImg);
				}

	}
	get('http://study.163.com/webDev/couresByCategory.htm',options,callback);
}
addLoadEvent(viewBig);	

//对翻页器绑定事件
var typ = 10;//是产品设计还是编程语言  默认产品设计
var pageN = 1;//页数  默认是 1
var total = 5;//总共的页码
//全局变量

//addLoadEvent(listen_span);	//绑定事件
function cPage () {
	var show = document.getElementsByClassName('showPages');
	var is = isNaN(parseInt(this.innerHTML));
	if(is == true){
		if(this.innerHTML = '>' ){
			pageN = parseInt(show[0].innerHTML);
			for(i =0 ;i<8;i++){
			show[i].style.backgroundColor = 'transparent';
			}
			show[0].style.backgroundColor = '#9dd8b1';//当前选中变色
		}
		else if(this.innerHTML ='<'){
			pageN = parseInt(show[0].innerHTML);
			for(i =0 ;i<8;i++){
			show[i].style.backgroundColor = 'transparent';
			}
			show[0].style.backgroundColor = '#9dd8b1';//当前选中变色
		}
		else{
			pageN = 1;
		}
		
	}else{
		pageN = parseInt(this.innerHTML);
		// //变色
		for(i =0 ;i<8;i++){
			show[i].style.backgroundColor = 'transparent';
		}
		this.style.backgroundColor = '#9dd8b1';//当前选中变色
	}



	var options = {pageNo:pageN,psize:20,type:typ};
	function callback (argument) {

		var supers = JSON.parse(argument);
		// console.log(super_sen);
		var con = document.getElementsByClassName('content-details')[0];

		var bigfir = document.getElementsByClassName('bigfir');//所有的模块的信息更新
		var bigsec = document.getElementsByClassName('bigsec');
		var bigthi = document.getElementsByClassName('bigthi');
		var bigfor = document.getElementsByClassName('bigfor');
		var imgtwn = document.getElementsByClassName('bigImg');
		var blocks = document.getElementsByClassName('blocks');
		//内容更新
		for(i = 0;i<20;i++)
		{
			imgtwn[i].setAttribute('src', supers.list[i].bigPhotoUrl);

			bigfir[i].innerHTML = supers.list[i].name;
			bigsec[i].innerHTML = supers.list[i].provider;
			bigthi[i].innerHTML = supers.list[i].learnerCount;
			bigfor[i].innerHTML = '￥'+supers.list[i].price.toFixed(2);
			if(supers.list[i].price == 0){
				bigfor[i].innerHTML = '免费';
			}	
		}
		everymodule (supers) ;

	}
	get('http://study.163.com/webDev/couresByCategory.htm',options,callback);
}

//对两个tab 绑定事件
function tabEvent (argument) {
	var tabs = document.getElementsByClassName('tab');
	for(i=0;i<2;i++){
		tabs[i].addEventListener('click', cTabs);
	}
	function cTabs (argument) {

		if(this.innerHTML == '产品设计'){
			typ = 10;
			this.className = '';
			this.className = 'product content-choosed tab';
			tabs[1].className = 'programme content-unchoosed tab'
		}
		else{
			typ = 20;
			this.className = '';
			this.className = 'programme content-choosed tab';
			tabs[0].className = 'product content-unchoosed tab'
		}
		pageN = 1;
		 cPage();
	}
}
addLoadEvent(tabEvent);

//对两个上下翻页的按键绑定事件
function upDownEvent () {
	var i;
	var show = document.getElementsByClassName('showPages');
	var spanUp = document.getElementsByClassName('pagesUp')[0];
	var spanDown = document.getElementsByClassName('pagesDown')[0];
	if(this.className =='pagesUp')
	{
		
		if(show[0].innerHTML == '1'){
			this.style.backgroundColor = 'lightgray';
			return;
		}
		else{
			this.style.backgroundColor = '#9dd8b1';
			for(i = 0;i<8;i++){
				show[i].innerHTML = parseInt(show[i].innerHTML)-8+'';
			}
			cPage();
			spanDown.style.backgroundColor = '#9dd8b1';
		}
	}
	else{//向下翻页的情况
		 if(parseInt(show[7].innerHTML) > total ){
			this.style.backgroundColor = 'lightgray';
			return;
		}
		else{
			this.style.backgroundColor = '#9dd8b1';
			for(i = 0;i<8;i++){
				show[i].innerHTML = parseInt(show[i].innerHTML)+8+'';
			}
			cPage();
			spanUp.style.backgroundColor = '#9dd8b1';
		}
	}
}
//鼠标在文字之上
function mouseOver (argument) {
	this.parentNode.style.boxShadow = '2px 2px 2px rgb(150,150,150)';
	this.firstChild.nextSibling.firstChild.style.color = '#39a030';
	console.log('hello');
}
function mouseOut (argument) {
	this.parentNode.style.boxShadow = '2px 2px 2px rgb(230,230,230)';
	this.firstChild.nextSibling.firstChild.style.color = 'black';
}

function mouseOutImg (argument) {
	// body... 
	this.style.display = 'none';
	
	
}
function mouseOverImg (argument) {
	this.parentNode.parentNode.lastChild.style.display = 'inline-block';
	// this.nextSibling.style.zIndex = '-1';
}
function everymodule (obj) {
	var float = {};//新建对象
	var i;	
	var indiv = document.getElementsByClassName('indiv');	
	for(i = 0;i<20;i++){
		float[i] = document.createElement('div');
		float[i].innerHTML = "<img></img><ul><li></li><li></li><li></li><li></li></ul><div><p></p></div>";	
		float[i].className = 'bigblock';
		// float[i].style.display = 'inline-block';
		indiv[i].appendChild(float[i]);

		//增加元素
		float[i].firstChild.src = obj.list[i].bigPhotoUrl;//图片
		float[i].firstChild.nextSibling.className = 'bigul';
		float[i].firstChild.nextSibling.firstChild.innerHTML = obj.list[i].name;//标题
		float[i].firstChild.nextSibling.firstChild.className = 'fir';
		float[i].firstChild.nextSibling.firstChild.nextSibling.innerHTML = obj.list[i].learnerCount + '人在学';//obj.list[i].learnerCount
		console.log(obj.list[i].learnerCount ) ;
		float[i].firstChild.nextSibling.firstChild.nextSibling.className = 'sec';
		float[i].firstChild.nextSibling.firstChild.nextSibling.nextSibling.innerHTML = '发布者:'+ obj.list[i].provider;
		float[i].firstChild.nextSibling.firstChild.nextSibling.nextSibling.className = 'thi';
		float[i].firstChild.nextSibling.lastChild.innerHTML = '分类:'+ obj.list[i].categoryName;
		float[i].firstChild.nextSibling.lastChild.className = 'for';
		float[i].lastChild.lastChild.innerHTML = obj.list[i].description;//课程藐视
		float[i].lastChild.className = 'bigdiv';
		float[i].addEventListener('mouseout',mouseOutImg);
	}

}
