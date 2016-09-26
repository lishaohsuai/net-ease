
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