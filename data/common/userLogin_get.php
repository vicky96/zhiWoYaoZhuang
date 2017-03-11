<?php
	header('Content-Type:text/html;charset=utf-8');
	header("Access-Control-Allow-Origin:*"); //允许任何访问(包括ajax跨域) 
	$host='localhost';//主机  
	$user='root';//数据库mysql账号  
	$password='';//数据mysql库密码  
	$database='project';//数据库名  
	mysql_connect($host,$user,$password) or die("error");//连接数据库管理系统  
	mysql_select_db($database);//选择操作数据库  
	mysql_query("SET NAMES utf8");//设置设置UTF-8编码(JSON的唯一编码)，数据库整理为：utf8_general_ci，以此达到输出中文简体的目的

	$username=$_GET["username"];
	$pwd=$_GET["pwd"];
	// 功能：判断用户名注册了没有
	// 参数: username   pwd
	// 请求类型: get
	// 返回数据：有没有注册
	// status 0 已经注册  1 没有注册
	// result 2 给你结果  3 不给你结果
	// $sql = "SELECT * FROM user";//获取所有用户
	$sql = "SELECT * FROM user where username='".$username."'";//根据username获取用户
	$sql = "SELECT * FROM user where pwd='".$pwd."'";
	$returnData=mysql_query($sql); 
	  
	while($result=mysql_fetch_assoc($returnData)){  
	   $user_info[]=$result;//将取得的所有数据，一行两行或者三行，赋值给user_info数组  
	}
	if($user_info) {
		// echo 0;//0 已存在
		$ret = array(
	    'status' => 0,
	    'result' => 2
		);
		echo json_encode($ret);
		exit();// echo 不能结束脚本   需要exit 结束脚本
	} else {
		// echo 1;//1 不存在
		$ret = array(
	    'status' => 1,
	    'result' => 3
		);
		echo json_encode($ret);
		exit();
	}

?>