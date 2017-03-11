var tel = $("tel");
var pwd = $("pwd"); 
var pwd2 = $("pwd2");
var ck = $("check");
var agree = $("agree");
var i1 = $("i1")

var regs = {
	telReg:/^1[3|4|5|7|8]\d{9}$/,
	pwdReg:/^.{6,16}$/,
}

//电话
tel.onkeyup = tel.onfocus = tel.onblur = function(evt){
	var e = evt || window.event;
	checkTel(e);
}
function checkTel(_e){
	var type;
	if(_e){
		type = _e.type;
	}
	var value = tel.value;
	var box = tel.parentNode;
	var tip = box.nextElementSibling;
	var i = tip.lastElementChild;
	if(type == "focus"){
		if(value==""){
			tel.style.borderColor = "#00c8ff";
			tel.style.boxShadow = "0 0 5px #00c8ff";
			i.innerHTML = "";
			return false;
		}else{
			tel.style.borderColor = "#00c8ff";
			tel.style.boxShadow = "0 0 5px #00c8ff";
			i.innerHTML = "";
			return false;
		}
				
	}
	if(type == "blur"&&value==""){
		tel.style.borderColor = "#c4c4c4";
		tel.style.boxShadow = "none";
		i.innerHTML = "手机号不能为空";
		return false;	
	}


	if(regs.telReg.test(tel.value)){
		tel.style.borderColor = "#c4c4c4";
		tel.style.boxShadow = "none";
		i.innerHTML = "可以使用";
		return true;
	} else {
		i.innerHTML = "手机格式有误，请重新输入"
		return false;
	}
}

//密码
pwd.onkeyup = pwd.onfocus = pwd.onblur = function(evt) {
	var e = evt || window.event;
	checkPwd(e);
}
function checkPwd(_e){
	var type;
	if(_e){
		type = _e.type;
	}
	var value = pwd.value;
	var box = pwd.parentNode;
	var tip = box.nextElementSibling;
	var i = tip.lastElementChild; 

	if(type=="focus"){
		if(value==""){
			pwd.style.borderColor = "#00c8ff";
			pwd.style.boxShadow = "0 0 5px #00c8ff";
			i.innerHTML = "";
			return false;
		}else{
			pwd.style.borderColor = "#00c8ff";
			pwd.style.boxShadow = "0 0 5px #00c8ff";
			i.innerHTML = "";
			return false;
		}
		
	}
	if(type=="blur"){
		if(value==""){
			pwd.style.borderColor = "#c4c4c4";
			pwd.style.boxShadow = "none";
			i.innerHTML = "密码不能为空";
			return false;
		}else{
			pwd.style.borderColor = "#c4c4c4";
			pwd.style.boxShadow = "none";
			i.innerHTML = "";
		}
		
	}
	if(regs.pwdReg.test(pwd.value)){
		i.innerHTML = "";
		return true;
	} else {
		i.innerHTML = "密码长度需6-16位字符";
		return false;
	}
}

//密码验证
pwd2.onkeyup = pwd2.onfocus = pwd2.onblur = function(evt) {
	var e = evt || window.event;
	checkPwd2(e);
}
function checkPwd2(_e){
	var type;
	if(_e){
		type = _e.type;
	}
	var value1 = pwd.value;
	var value = pwd2.value;
	var box = pwd2.parentNode;
	var tip = box.nextElementSibling;
	var i = tip.lastElementChild;
	if(type=="focus"){
		if(value==""){
			pwd2.style.borderColor = "#00c8ff";
			pwd2.style.boxShadow = "0 0 5px #00c8ff";
			i.innerHTML = "";
			return false;
		}else{
			pwd2.style.borderColor = "#00c8ff";
			pwd2.style.boxShadow = "0 0 5px #00c8ff";
			i.innerHTML = "";
		}
		
	}
	if(type=="blur"){
		if(value==""){
			pwd2.style.borderColor = "#c4c4c4";
			pwd2.style.boxShadow = "none";
			i.innerHTML = "请重新输入密码";
			return false;
		}else{
			pwd2.style.borderColor = "#c4c4c4";
			pwd2.style.boxShadow = "none";
			i.innerHTML = "";
		}
		
	}
	if(value==value1){
		i.innerHTML = "";
		return true;
	}else{
		i.innerHTML = "两次输入的密码不匹配";
		return false;
	}
}

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

//提交
// 鼠标点击提交
agree.onclick = function(){
	keyCheck()
}
// 回车提交
window.onkeyup = function(evt){
	var e = evt || window.event;
	if(e.keyCode==13){
		keyCheck()
	}
}
function keyCheck(){
	if(checkTel()&&checkPwd()&&checkPwd2()&&checkNum()){
		var value1 = tel.value;
		setCookie("tel",value1);
		ajax({
			url:"../data/common/user_get.php",
			data:{username:tel.value},
			success:function(data){
				var result = JSON.parse(data);
				if(result.status==0){
					i1.innerHTML = "手机号已被占用";
				}else{
					ajax({
						url:"../data/common/user_post.php",
						method:"post",
						data:{username:tel.value,pwd:pwd.value},
						success:function(data){
							var result = JSON.parse(data);
							if(result.status==0){
								location.href="index.html";
							}else{
								return false;
							}
						}
					})
				}
			}
		})
		
	}else{
		return false;
	}	
}