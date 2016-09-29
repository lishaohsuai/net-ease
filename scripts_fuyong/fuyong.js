
var eventUtil={
	//离线检测
	online_exam:function function_name () {
		if(navigator.onLine)
		{
			//正常工作
		}
		else
		{
			//执行离线状态时的代码
		}
	}
	

}
//add 函数
function addLoadEvent(func) {
  var oldonload = window.onload;
  if (typeof window.onload != 'function') {
    window.onload = func;//没有函数直接追加
  } else {
    window.onload = function() {
      oldonload();//有函数了加到结尾
      func();
    }
  }
}

//cookie的相关设置
var CookieUtil = {
	//获取cookie
//获得cookies, 课件代码
	unset:function(name,path,domain,secure)//删除
	{
		this.set(name,' ',new Date(0),path,domain,secure);//data(0)  
	}
}
	function getCookie(name){
		var cookieName = encodeURIComponent(name)+'=',
			cookieStart = document.cookie.indexOf(cookieName),
			cookieValue = null;
			
		if(cookieStart > -1)
		{
			var cookieEnd = document.cookie.indexOf(';',cookieStart);
			if(cookieEnd == -1)
			{
				cookieEnd = document.cookie.length;
			}
			cookieValue = decodeURIComponent(document.cookie.substring(cookieStart+cookieName.length,cookieEnd));
			
		}
		
		return cookieValue;
	}
	//设置/修改cookie, expire s= newDate(); 课件代码
 function setCookie(name, value, expires, path, domain, secure) {
	var cookie = encodeURIComponent(name) + '=' + encodeURIComponent(value)+';';
	if (expires)
		cookie += '; expires=' + expires.toGMTString();
	if (path)
		cookie += '; path=' + path;
	if (domain)
		cookie += '; domain=' + domain;
	if (secure)
		cookie += '; secure=' + secure;
	
	document.cookie = cookie;
}

function getHTTPObject() {
  if (typeof XMLHttpRequest == "undefined")
    XMLHttpRequest = function () {
      try { return new ActiveXObject("Msxml2.XMLHTTP.6.0"); }
        catch (e) {}
      try { return new ActiveXObject("Msxml2.XMLHTTP.3.0"); }
        catch (e) {}
      try { return new ActiveXObject("Msxml2.XMLHTTP"); }
        catch (e) {}
      return false;
  }
  return new XMLHttpRequest();
}


function displayAjaxLoading(element) {
    // Remove the existing content.
  while (element.hasChildNodes()) {
      element.removeChild(element.lastChild);
  }
  //  Create a loading image.
  var content = document.createElement("img");
  content.setAttribute("src","images/loading.gif");
  content.setAttribute("alt","Loading...");
  // Append the loading element.
  element.appendChild(content);
}

function submitFormWithAjax( whichform, thetarget ) {
  
  var request = getHTTPObject();
  if (!request) { return false; }

  // Display a loading message.
  displayAjaxLoading(thetarget);

  // Collect the data.
  var dataParts = [];
  var element;
  for (var i=0; i<whichform.elements.length; i++) {
    element = whichform.elements[i];
    dataParts[i] = element.name + '=' + encodeURIComponent(element.value);
  }
  var data = dataParts.join('&');

  request.open('POST', whichform.getAttribute("action"), true);
  request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

  request.onreadystatechange = function () {
    if (request.readyState == 4) {
        if (request.status == 200 || request.status == 0) {
          var matches = request.responseText.match(/<article>([\s\S]+)<\/article>/);
          if (matches.length > 0) {
            thetarget.innerHTML = matches[1];
          } else {
            thetarget.innerHTML = '<p>Oops, there was an error. Sorry.</p>';
          }
        } else {
          thetarget.innerHTML = '<p>' + request.statusText + '</p>';
        }
    }
  };
}

/**
 * [get description]
 * @param  {String}   url      请求url地址 如var url = "http://study.163.com/webDev/couresByCategory.htm" ;
 * @param  {Object}   options  请求参数为js字面量对象形式 如var options = {pageNo:1,psize:20,type:10};
 * @param  {Function} callback 请求成功回调的函数必须传入一个参数表示接受xhr.responseText
 * 
 */
function get(url,options,callback) {
    //1.创建xhr对象
    var xhr = new XMLHttpRequest();
    //2. 在open方法之前监听redaystatechange
    xhr.onreadystatechange = function () {
        //2.1 判断readyState==4
        if(xhr.readyState==4){
            //2.2 判断状态码
            if( (xhr.status>=200 && xhr.status<300) || xhr.status==304 ){
                callback(xhr.responseText);
            }
            else{
                console.log("ajax请求不成功,错误状态码为："+xhr.status);
            }
        }   
    }
    //如果传入的参数不为空
    if(!!options){
        url = url+"?"+serialize(options);
        console.log("请求参数经过序列化后的url地址："+url);
    }
    //请求参数序列化的方法
    function serialize(data) {
        if(!data){//再次对参数判断确保返回为字符串
            return "";
        }
        var arry = [];
        for(var name in data){
            //如果name属性不是data原型对象上的属性或则name.value属性值为function则跳出循环。
            if( (!data.hasOwnProperty(name)) || typeof data[name]==="function" ){
                continue ;
            }
            //求出value值
            var value = data[name].toString();
            //对name 和进行编码
            name = encodeURIComponent(name);
            value = encodeURIComponent(value);
            var item = name + "=" + value;
            arry.push(item);
        }
        return arry.join("&");
    }
    //3.open方法  url地址要加上option序列化
    xhr.open("get",url,true);
    //xhr.setReuestHeader("Content-Type","application/x-www-form-urlencoded");头部信息表单编码 可以省略
    //xhr.setReuestHeader("MyHeader","MyValue");自定义头部信息 可以省略
    //4.send方法
    xhr.send(null);//get方法必须传入null
    //如果是post请求则为send(serialize(formdata));
}