/*
	获取样式
	params: obj: 所求样式的对象
	        name: 求的样式的名称
 */ 
function getByClass(oParent,sClass){
	var aResult = [];
	var aEle = oParent.getElementsByTagName("*");
	var reg = new RegExp("\\b"+sClass+"\\b");
	var i=0;
	for(var i=0; i<aEle.length; i++){
		if(reg.test(aEle[i].className)){
			aResult.push(aEle[i]);
		}
	}
	return aResult;
}


function getByName(oParent,sName){
	var aResult = [];
	var aEle = oParent.getElementsByTagName("*");
	var reg = new RegExp("\\b"+sClass+"\\b");
	var i=0;
	for(var i=0; i<aEle.length; i++){
		if(reg.test(aEle[i].Name)){
			aResult.push(aEle[i]);
		}
	}
	return aResult;
}

/*
	获取样式
	params: obj: 所求样式的对象
	        name: 求的样式的名称
 */
function getStyle(obj,name){
	if(window.getComputedStyle){
		return getComputedStyle(obj,null)[name];
	}else{
		return obj.currentStyle[name];
	}
}
function removeWhiteNode(pNode){
	var aChild = pNode.childNodes;
	for(var i=0; i<aChild.length; i++){
		if(aChild[i].nodeType==3&&/^\s+$/.test(aChild[i].nodeValue)){
			pNode.removeChild(aChild[i]);
		}
	}
}
function $(id){
	return document.getElementById(id);
}
function insertAfter(newNode,node){
	var pNode = node.parentNode;
	if(node==pNode.lastChild){
		pNode.appendChild(newNode);
	}else{
		pNode.insertBefore(newNode,node.nextSibling);
	}
}
function getInner(obj){
    if(typeof obj.innerText =="undefined"){
        return obj.textContent;
    }else{
        return obj.innerText;//为了防止火狐老版本不支持innerText，所以做一下兼容
    }
}

function getButton(evt) { //跨浏览器左中右键单击相应
	var e = evt || window.event;
	if (evt) { //Chrome 浏览器支持 W3C 和 IE
		return e.button; //要注意判断顺序
	} else if (window.event) {//兼容ie
		switch(e.button) {
			case 1 :
				return 0;
			case 4 :
				return 1;
			case 2 :
				return 2;
		}
	}
}

function addEvent(target,type,fn){
	if(target.addEventListener){
		target.addEventListener(type,fn,false);
	}else if(target.attachEvent){
		target.attachEvent("on"+type,fn);
	}else{
		target["on"+type]=fn;
	}
}
function removeEvent(target,type,fn){
	if(target.removeEventListener){
		target.removeEventListener(type,fn);
	}else if(target.detachEvent){
		target.detachEvent("on"+type,fn);
	}else{
		target["on"+type]=null;
	}
}

function addEvent(target,type,fn){
	if(target.addEventListener){
		target.addEventListener(type,fn,false);
	}else if(target.attachEvent){
		target.attachEvent("on"+type,fn);
	}else{
		target["on"+type]=fn;
	}
}
function removeEvent(target,type,fn){
	if(target.removeEventListener){
		target.removeEventListener(type,fn);
	}else if(target.detachEvent){
		target.detachEvent("on"+type,fn);
	}else{
		target["on"+type]=null;
	}
}

//ajax
function urlParamsHandler(o) {
	var result = [];
	for (var key in o) {
		result.push(encodeURIComponent(key) + "=" + encodeURIComponent(o[key]));
	}
	return result.join("&");
}
function ajax(o){
	var xhr = null;
	if(window.XMLHttpRequest){
		xhr = new XMLHttpRequest();
	}else{
		xhr = new ActiveXObject("Microsoft.XMLHTTP");
	}
	if(!o.method){
		o.method = "get";
	}
	if(!(typeof o.isAsync == "boolean")){
		o.isAsync = true;
	}
	if(o.method.toLowerCase()=="get"){
		if(o.data){
			o.url = o.url+"?t="+new Date().getTime()+"&"+urlParamsHandler(o.data);
		}else{
			o.url = o.url+"?t="+new Date().getTime();
		}
		xhr.open("get",o.url,o.isAsync);
		if(o.headerData){
			for(var key in o.headerData){
				xhr.setRequestHeader(key,o.headerData[key]);
			}
		}
		xhr.send();
	}else{
		xhr.open("post",o.url,o.isAsync);
		xhr.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
		if(o.headerData){
			for(var key in o.headerData){
				xhr.setRequestHeader(key,o.headerData[key]);
			}
		}
		xhr.send(urlParamsHandler(o.data))
		
	}
	if(o.isAsync){
		xhr.onreadystatechange = function(){
			if(xhr.readyState==4){
				if(xhr.status==200){
					if(o.success){
						o.success(xhr.responseText);
					}
				}else{
					if(o.error){
						o.error(xhr.responseText);
					}
				}
			}
		}
	}else{
		if(xhr.status==200){
			if(o.success){
				o.success(xhr.responseText);
			}else{
				if(error){
					o.error(xhr.responseText);
				}
			}
		}
	}
}

function setCookie(name,value,day,path){
	var result = "";
	result += encodeURIComponent(name)+"="+encodeURIComponent(value);
	if(day){
		var date = new Date();
		date.setDate(date.getDate()+day);
		result += "; expires="+date;
	}
	if(path){
		result += "; path="+path;
	}else{
		result += "; path=/";
	}
	document.cookie = result;
}

function getCookie(name){
	var cookieTxt = decodeURIComponent(document.cookie);
	var arr = cookieTxt.split("; ");
	for(var i=0;i<arr.length;i++){
		var arr1 = arr[i].split("=");
		if(arr1[0]==name){
			return arr1[1];
		}
	}
	return "";
}

function removeCookie(name){
	setCookie(name,"",-1);
}

function startMove(obj, json, fn) {//{attr1: iTarget1, attr1: iTarget1}
	clearInterval(obj.timer);
	obj.timer = setInterval(function(){
		//假设都到达目标位置
		var bStop = true;
		for(var attr in json){
			var iCur = 0;
			if(attr=="opacity"){
				iCur = parseInt(parseFloat(getStyle(obj,attr))*100);
			}else{
				iCur = parseInt(getStyle(obj,attr));
			}
			var iSpeed = (json[attr]-iCur)/8;
			iSpeed = iSpeed>0?Math.ceil(iSpeed):Math.floor(iSpeed);
			//如果还没到
			if(iCur!=parseInt(json[attr])){
				bStop = false;
				if(attr=="opacity"){
					obj.style.filter = "alpha(opacity:"+(iCur+iSpeed)+")";
					obj.style.opacity = (iCur+iSpeed)/100;
				}else{
					obj.style[attr] = iCur+iSpeed+"px";
				}
			}
		}
		//都到了就停止运动
		if(bStop){
			clearInterval(obj.timer);
			if(fn){
				fn();
			}	
		}
	},30)
}

// 对象obj相对于文档根节点的left和top
function position(obj){
	var result = {left:0,top:0};
	while(obj){
		result.left += obj.offsetLeft+parseInt(getStyle(obj,"borderLeftWidth"));
		result.top += obj.offsetTop+parseInt(getStyle(obj,"borderTopWidth"));
		obj = obj.offsetParent;
	}
	return result;
}