
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

	function callback (argument) {
		super_sen = JSON.parse(argument);
		// console.log(super_sen);
		var con = document.getElementsByClassName('content-details')[0];
		for(i = 0;i<20;i++)
		{
			view_big_div[i] = document.createElement('div');//创建DIV
			view_big_img[i] = document.createElement('img');//创建img
			

			view_big_details[i] = document.createElement('ul');//创建DIV
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
			view_big_img[i].setAttribute('src', super_sen.list[i].bigPhotoUrl);
			//设定文字内容
			

			view_big_div[i].className = 'blocks';

			
			view_big_div[i].appendChild(view_big_img[i]);
			view_big_div[i].appendChild(view_big_details[i]);
			con.appendChild(view_big_div[i]);
		}

	}
	get('http://study.163.com/webDev/couresByCategory.htm',options,callback);
}
addLoadEvent(viewBig);	