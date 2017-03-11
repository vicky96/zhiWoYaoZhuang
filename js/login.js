var userName = $("userName");
var pwd = $("pwd");
var ck = $("check");
var login = $("login");
var i1 = $("i1");

//验证码
ck.onkeyup = ck.onfocus = ck.onblur = function(evt){
	var e = evt || window.event;
	checkNum(e);
}
var change = ck.nextElementSibling.nextElementSibling;
var changeBox = ck.nextElementSibling;
function checkNum(_e){
	var type;
	if(_e){
		type = _e.type;
	}
	var value = ck.value;
	var box = ck.parentNode;
	var box2 = box.nextElementSibling;
	var i = box2.lastElementChild;

	if(type=="focus"){
		ck.style.borderColor = "#00c8ff";
		ck.style.boxShadow = "0 0 5px #00c8ff";
		i.innerHTML = "";
		return false;
	}
	if(type=="blur"){
		if(value==""){
			ck.style.borderColor = "#c4c4c4";
			ck.style.boxShadow = "none";
			i.innerHTML = "验证码不能为空";
			return false;
		}else{
			ck.style.borderColor = "#c4c4c4";
			ck.style.boxShadow = "none";
			i.innerHTML = "";
		}
		
	}
	if(value.toUpperCase() == code.toUpperCase()){
		i.innerHTML = "";
		return true;
	}else{
		i.innerHTML = "验证码有误,请重新输入";
		return false;
	}
	
}
createCode();
change.onclick = function(){
		createCode()
}

//生成验证码
var code;
function createCode() {
	code = "";
	var codeLength = 4; 
	var r = parseInt(Math.random()*256);
	var g = parseInt(Math.random()*256);
	var b = parseInt(Math.random()*256);
	var codeChars = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 
	  'a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z',
	  'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'); //所有候选组成验证码的字符，当然也可以用中文的
	for(var i = 0; i < codeLength; i++) {
		var charNum = Math.floor(Math.random() * 52);
		code += codeChars[charNum];	
	}
	if(changeBox) {
		changeBox.style.textAlign = "center";
		changeBox.style.fontSize = 12+"px";
		changeBox.style.backgroundColor = "#ebeced"
		changeBox.style.color =  "rgba("+r+","+g+","+b+",1)";
		changeBox.innerHTML = code;
	}
}
login.onclick = function(){
	keyCheck();
}
window.onkeyup = function(evt){
	var e = evt || window.event;
	if(e.keyCode==13){
		keyCheck();
	}
}
function keyCheck(){
	var value1 = userName.value,
		auto = $("#auto");
	if(auto.is(":checked")){
		setCookie("tel",value1,{expires:7});
	}else{
		setCookie("tel",value1);
	}
	if(checkNum()){
		ajax({
			url:"../data/common/userLogin_get.php",
			data:{username:userName.value,pwd:pwd.value},
			success:function(data){
				var result = JSON.parse(data);
				if(result.status==0){
					if(location.hash=="#1"){
						location.href="car.html"
					}else{
						location.href="index.html"
					}
					
				}else {
					i1.innerHTML = "账户或密码错误！";
					return false;
				}
			}
		})
	}else{
		return false;
	}	
}
