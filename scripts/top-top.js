//cookie
//确定显示与不现实
		
function get_cookies() {
	var btn = document.getElementsByClassName('closex');
	
	var div_cookie = document.getElementsByClassName('cookie');
	var receive = getCookie("name");
	// console.log(receive);
	if(receive =='1'){//如果存在cookie 不显示 今天 也不显示

		div_cookie[0].style.display = "none" ;
		
	}
	else{//不存在cookie
		div_cookie[0].style.display =  'block';
		
	}
}
addLoadEvent(get_cookies);
//确定登陆已经还是没有
function iflog () {
	var receive = getCookie("loginSuc");
	if(receive =='1'){//如果存在cookie 不显示 今天 也不显示

		// div_cookie[0].style.display = "none" ;
		this.style.display = 'none';
 		var attentioned = document.getElementsByClassName('attentioned-all');
 		attentioned[0].style.display = 'inline-block';
	}
	else{//不存在cookie
		// div_cookie[0].style.display =  'block';
		
	}
 	
}
//为按钮绑定事件  登陆时间
function btnSend (argument) {
	var btn = document.getElementById('login-form');
	btn.addEventListener('submit', submitForm);
	// console.log('ds');

}
addLoadEvent(btnSend);
function submitForm (argument) {
	var account = document.getElementById('account');
	var pwd = document.getElementById('pwd');
	console.log('daf');
	var op = {
		userName: hex_md5(account.value),
		password: hex_md5(pwd.value)
	};
	function callback(index){
		if(index == '1'){
			var log = document.getElementsByClassName('login')[0];
			log.style.display = 'none';
		}
	}
	get('http://study.163.com/webDev/login.htm',op,callback);
}


function set_cookies()
{
	var btn = document.getElementsByClassName('closex');
	
	var div_cookie = document.getElementsByClassName('cookie');
	btn[0].addEventListener('click', 
		function(){//设置cookie  ,'',time,'file:///G:/Work_achievement/html/net_ease/bigWork.html'
			var time = new Date();
			time.setDate(time.getDate() + 1);
			setCookie("name","1",time,null,null,null);
			div_cookie[0].style.display = "none" ;
			var receive = getCookie("name");
			console.log(receive);
		}
	); 
}
addLoadEvent(set_cookies);

//更改关注的js
function change_attention () {
	var attention = document.getElementsByClassName('header-attention');
 	attention[0].addEventListener('click',iflog);
 	var attentioned = document.getElementsByClassName('cancel');
 	attentioned[0].addEventListener('click',
 	function  () {
 	var attentionedd = document.getElementsByClassName('attentioned-all');
 	attentionedd[0].style.display = 'none';
 	var attention = document.getElementsByClassName('header-attention');
 	attention[0].style.display = 'inline-block';
 });	
}

 addLoadEvent(change_attention) ;

