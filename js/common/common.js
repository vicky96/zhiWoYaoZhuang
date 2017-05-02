// 加载模板
var render1 = template.compile(tpl.header);
var headerHtml = render1({})
$("#header").html(headerHtml);

var render2 = template.compile(tpl.logo);
var logoHtml = render2({})
$("#logo").html(logoHtml);

var render3 = template.compile(tpl.nav);
var navHtml = render3({})
$("#nav").html(navHtml);

var render4 = template.compile(tpl.footer);
var footerHtml = render4({})
$("#footer").html(footerHtml);

var render5 = template.compile(tpl.sideBar);
var sideBarHtml = render5({})
$("#sideBar").html(sideBarHtml);

var render6 = template.compile(tpl.footSearch);
var footSearchHtml = render6({})
$("#foot_search").html(footSearchHtml);


// 登录后头部显示用户名
	var loginChange = $("#login_change"),
		loginOut = loginChange.siblings().find("a"),
		username = $.cookie("tel")?JSON.parse( $.cookie("tel")):{};
	if(JSON.stringify(username)!="{}"){
		loginChange.html("欢迎您，知我用户："+ username);
		loginOut.html("退出");
		loginOut.click(function(){
			$.cookie("tel",null,{expires:-1, path: '/' });
			location.reload();
		})
	}else{
		loginOut.click(function(){
			location.href="register.html"
		})
	}

// 导航栏右边菜单
$(function(){
	var oLi1 = $("#li1"),
		oImg = $("img",oLi1),
		oLi2 = $("#li2"),
		oUl1 = $("#ul1"),
		oLi3 = $("#li3"),
		oUl2 = $("#ul2");
		showCont(oLi1,oImg,78)
		showCont(oLi2,oUl1,132)
		showCont(oLi3,oUl2,106)
		function showCont(obj,oHide,h){
			obj.mouseover(function(){
				oHide.stop().animate({height:h,opacity:1},500);	
			})
			obj.mouseout(function(){
				oHide.stop().animate({height:0,opacity:0},500);
			})
		}
	
})

// 搜索框
$(function(){
	var oInput1 = $("#search_input"),
		oInput2 = $("#footSearch_input"),
		logoList = $("#logo_list"),
		footList = $("#foot_list");
	search(oInput1,logoList);
	search(oInput2,footList);
	function search(name,list){
		name.keyup(function(){
			$.ajax({
				url:"https://sp0.baidu.com/5a1Fazu8AA54nxGko9WTAnF6hhy/su?wd="+name.val()+"&json=1&p=3&t",
				dataType:"jsonp",
				jsonp:"cb",
				success:function(data){
					var lists = data.g;
					list.html("");
					for(var i in lists){
						var oLi = $("<li></li>");
						oLi.html(lists[i].q);
						list.append(oLi);
						oLi.mouseover(function(){
							$(this).css({"backgroundColor":"#6c6c6c","color":"#fff"}).siblings().css({"backgroundColor":"#fff","color":"#6c6c6c"})
						})
						oLi.mouseout(function(){
							$(this).css({"backgroundColor":"#fff","color":"#6c6c6c"})
						})
						oLi.mousedown(function(){
							var oContent = $(this).html();
							name.val(oContent);
						})
						oLi.mouseup(function(){
							list.html("")
						})
					}
				}			
			})	
		})
		name.blur(function(){
			list.css("display","none")
		})
		name.focus(function(){
			list.css("display","block")
			name.keydown(function(e){
				if(e.keyCode==13){
					if(name.val()!=""){
						location.reload()
					}	
				}

			})			
		})
	}	
})

// 我的购物车
$(function(){
	var oCarBtn = $(".header-carBtn"),
		oCarAdd = $(".header-carAdd"),
		oEmpty = $(".header-empty"),
		oCarIco = $("#header_carIco");
	oCarBtn.hover(function(){
		oCarIco.addClass("active");
		oCarAdd.css("display","block")
	},function(){
		oCarIco.removeClass("active");
		oCarAdd.stop().slideUp(500)
	})
})

// nav导航
$(function(){
	var navList = $("#nav_list"),
		navRight = $("#nav_right");
	// 二级导航
	var navLeftLi = navList.parent();
	var iHeight = navList.offsetHeight;
	navLeftLi.mouseover(function(){
		navList.stop().animate({height:280},500)
	})
	navLeftLi.mouseout(function(){
		navList.stop().animate({height:0},500)
	})	
})

//banner 淡入淡出轮播
$(function(){
	var oLunBo = $("#lun_bo");
	lunBoPlay(oLunBo,3000);
	function lunBoPlay(oContainer,time){
		var	oDiv = $("div",oContainer).eq(0);
			aDiv = $("div",oDiv),
			oUl = $("ul",oContainer),
			aLi = $("li",oUl),
			aImg = $("img",oDiv);
		var iNow = 0;
		autoplay();
		oContainer.mouseover(function(){
			clearInterval(oContainer.timer);
		})
		oContainer.mouseout(function(){
			autoplay();
		})
		aLi.mouseover(function(){
			iNow = $(this).index();
			tab();
		})
		function autoplay(){
			clearInterval(oContainer.timer);
			oContainer.timer = setInterval(function(){
				iNow++;
				if(iNow == aLi.length){
					iNow=0;
				}
				tab();
			},time)
		}
		
		function tab(){
			aLi.eq(iNow).addClass("active").siblings().removeClass("active");
			aDiv.eq(iNow).stop().fadeIn(1000).siblings().fadeOut(1000);
		}
	}
})

// 无缝滚动轮播
$(function(){
	var oBox = $(".main-recommendBox"),
		oContainer = $(".container",oBox),
		aPage = $(".container_page"),
		oPrev = $(".prev"),
		oNext = $(".next");

	var iPage = 1,
		oFirst = aPage.eq(0).clone(),
		oLast = aPage.eq(aPage.length-1).clone(),
		len = aPage.length;
	oContainer.append(oFirst);
	aPage.eq(0).before(oLast);
	len += 2;
	oContainer.width(aPage.eq(0).outerWidth()*len);
	oContainer.css("left",-aPage.eq(0).outerWidth());
	autoplay();
	function autoplay(){
		clearInterval(oContainer.timer);
		oContainer.timer = setInterval(function(){
			iPage++;
			if(iPage==len){
				oContainer.css("left",-aPage.eq(0).outerWidth());
				iPage=2;
			}
			tab();
		},4000)
	}
	function tab(){
		var iLeft = -iPage*aPage.eq(0).outerWidth();
		oContainer.stop().animate({left:iLeft},2000)
	}
	oBox.mouseover(function(){
		clearInterval(oContainer.timer);
	})
	oBox.mouseout(function(){
		autoplay()
	})
	oPrev.click(function(){
		clearInterval(oContainer.timer)
		iPage--;
		if(iPage==-1){
			oContainer.css("left",-aPage.eq(0).outerWidth()*(len-2));
			iPage=len-3;
		}
		tab();
	})
	oNext.click(function(){
		clearInterval(oContainer.timer);
		iPage++;
		if(iPage==len){
			oContainer.css("left",-aPage.eq(0).outerWidth());
			iPage=2;
		}
		tab();
	})
})

// 飞入购物车
function flyCar(img){
	var offset = $("#fly_end").offset(); 
	// var count = 1;
   	var flyer = $('<img class="u-flyer" src="'+img+'">');
    $(".sidebar").append('<img class="u-flyer" src="'+img+'">');
    $(".u-flyer").fly({ 
        start: { 
            left: event.clientX, //开始位置（必填）#fly元素会被设置成position: fixed 
            top: event.clientY 
        }, 
        end: { 
            left: offset.left+10, //结束位置（必填） 
            top:offset.top+10, //结束位置（必填） 
            width: 0, //结束时宽度 
            height: 0 //结束时高度 
        }, 
        onEnd: function(){ //结束回调 
            $("#msg").show().animate({width: '250px'}, 200).fadeOut(1000); //提示信息
            // $("#fly_num").html(count)
            // count++;
            // this.destory(); //移除dom 
        } 
    }); 
}

// 侧边栏鼠标划过效果
$(function(){
	var oPeople = $(".people"),
		oPeopleHide = $(".people-hide"),
		oLove = $(".love"),
		oLoveHide = $(".love-hide"),
		oFoot = $(".foot"),
		oFootHide = $(".foot-hide"),
		oEar = $(".ear"),
		oEarHide = $(".ear-hide");
	play(oPeople,oPeopleHide);
	play(oLove,oLoveHide);
	play(oFoot,oFootHide);
	play(oEar,oEarHide);

	// 小标签出现隐藏
	function play(has,change){
		has.mouseover(function(){
			has.addClass("active");
			change.css("display","block").animate({left:-103,opacity:1},300)
			change.mouseenter(function(){
				change.css("opacity",1).stop();
			})
		})
		has.mouseout(function(){
			has.removeClass("active");
			change.animate({left:-120,opacity:0},300,function(){
				change.css("display","none")
			})
		})
		change.mouseleave(function(){
			change.animate({left:-120,opacity:0},300,function(){
				change.css("display","none")
			})
		})
	}

	// 购物车
	var oSidebarCar = $(".sidebar-car"),
		oCarHide = $(".car-hide"),
		oBtn = $(".my-car a");
	oSidebarCar.click(function(){
		oCarHide.stop().animate({left:-335},500)
	})
	oBtn.click(function(e){
		event.preventDefault();
		oCarHide.stop().animate({left:35},500)
	})

	// 二维码
	var oHideChat = $(".hide-chat"),
		oChat = $(".chat");
	oChat.mouseover(function(){
		oHideChat.stop().show();
		oHideChat.mouseenter(function(){
			oHideChat.css("display","block")
		})
		oHideChat.mouseleave(function(){
			oHideChat.css("display","none")
		})
	})
	oChat.mouseout(function(){
		oHideChat.stop().hide();
	})

	// 返回顶部
	var oTop = $("#top");
	oTop.click(function(){
		$("html,body").stop().animate({scrollTop:0},1000);
	})
})

// 商品数量加减
function changeNum(){
	var num = $("#num"),
		jian = $(".jian"),
		jia = $(".jia");
	jia.click(function(){
		var count = $(this).siblings("#num").html();
			count++;
			$(this).siblings("#num").html(count);
	})
	jian.click(function(){
		var count1 = $(this).siblings("#num").html();
		if(count1>1){
			count1--;
			$(this).siblings("#num").html(count1)
			
		}else{
			$(this).siblings("#num").html(1)
		}	
	})
}
var aAddCar = $(".addCar"),
	oCarHideEmpty = $(".car-hideEmpty"),
	oCarSelectedGoods = $(".car-selectedGoods"),
	oToCar = $(".toCar");
// 侧边栏中删除商品
function Del(){
	var oSelectedDelete = $(".selected-delete");
	var goods = $.cookie("carts")?JSON.parse($.cookie("carts")):{};
	var aLi = $("li",oCarSelectedGoods);
	oSelectedDelete.click(function(){
		$(this).parent().parent().remove();
		var goodSrc = $(this).parent().siblings('.selected-images').find("img").attr("src");
		delete goods[goodSrc];
		$.cookie("carts",JSON.stringify(goods),7)
		aLi.length--;
		if(aLi.length<1){
			oCarHideEmpty.css("display","block");
			oCarSelectedGoods.css("display","none");
			oToCar.css("display","none");	
		}
		goodsNum();		
	})
}

// 侧边栏显示的商品数量
function goodsNum(){
	var goods = $.cookie("carts")?JSON.parse($.cookie("carts")):{};
	if($.isEmptyObject(goods)){
		$("#fly_num").html("0")
	}else{
		var shopCarNum = 0;
		for(var goodSrc in goods){
			shopCarNum += Number(goods[goodSrc].num);//传过来的本来是一个字符串，应该将它转换成数字再加
		}
		$("#fly_num").html(shopCarNum)
	}
}	
	


