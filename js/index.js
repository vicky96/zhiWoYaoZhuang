$(function(){
	// 图片
	$(".main").on("mouseover","img",function(){
		$(this).css("opacity",0.8)
	})
	$(".main").on("mouseout","img",function(){
		$(this).css("opacity",1)
	})

	// 顶部动画
	var oTopImg = $(".top-img"),
		oBigImg = $(".big-img"),
		oSmallImg = $(".small-img"),
		oSpan = $(".top-img span");
	oTopImg.stop().delay(2000).animate({height:100},1000,function(){
		oBigImg.fadeOut(1000);
		oSmallImg.stop().delay(1001).animate({opacity:1},1000);
		oSpan.addClass("fold");
	})
	oSpan.click(function(){
		if(parseInt(oTopImg.css("height"))==100){
			$(this).removeClass("fold").addClass("unfold");
			oSmallImg.fadeOut(100);
			oBigImg.fadeIn(1000);
			oTopImg.stop().animate({height:300},1000);
		}else if(parseInt(oTopImg.css("height"))==300){
			$(this).removeClass("unfold").addClass("fold");
			
			oBigImg.fadeOut(1000);
			oSmallImg.delay(500).fadeIn(1000);
			oTopImg.stop().animate({height:100},1000)
		}
	})

	// 楼梯
	var oSideNav = $(".side-nav"),
		aLou = $(".lou"),
		lunBo = $("#lun_bo");
	var iTop = lunBo.offset().top;
	$(window).scroll(function(e){
		var iScrollTop = $(this).scrollTop();
		if(iScrollTop>=iTop){
			oSideNav.stop().fadeIn(100);
		}else{
			oSideNav.stop().fadeOut(100);
		}

	})
	var isScroll = true;
	$(".side-nav ul li").click(function(){
		isScroll = false;
		var iScrollTop = aLou.eq($(this).index()).offset().top;
		$("html,body").stop().animate({scrollTop:iScrollTop},500,function(){
			isScroll = true;
		})
		$(this).css("backgroundColor","rgb(0, 200, 255)").siblings(".change").css("backgroundColor","#fff")
	})
	$(window).scroll(function(){
		if(isScroll){
			var iScrollTop = $(this).scrollTop();
			aLou.each(function(){
				if(iScrollTop>=$(this).offset().top-$(this).prev().outerHeight()/4){
					$(".side-nav ul li").eq($(this).index(".lou")).css("backgroundColor","rgb(0, 200, 255)").siblings(".change").css("backgroundColor","#fff")
				}
			})
		}
	})

	//品牌栏 图片加载
	var aBrandImgLeft = $(".brandImg-left img"),
		aBrandImgRight = $(".brandImg-right img");
	$.ajax({
		url:"../data/index/mainbrand.json",
		success:function(data){
			for(var i=0;i<data.left.length;i++){
				aBrandImgLeft.eq(i).attr("src",data.left[i])
			}
			for(var i=0;i<data.right.length;i++){
				aBrandImgRight.eq(i).attr("src",data.right[i])
			}
		}
	})

	// 品牌栏 选项卡
	var brandTitle = $(".brandTitle"),
		aLi = $("li",brandTitle),
		aBrandImg = $(".brandImg"),
		oBrandImgLi1 = $(".brandImg-li1"),
		oBrandImgLi2 = $(".brandImg-li2");
	aLi.mouseover(function(){
		aBrandImg.eq($(this).index()).addClass("active").siblings().removeClass("active");
		$(this).addClass("active").siblings().removeClass("active");
	})
	oBrandImgLi1.click(function(){
		var index = $(this).parent().parent().prev().index();
		if(index==0){
			index=4;
		}
		aLi.eq(index-1).addClass("active").siblings().removeClass("active");
		var iNow = aLi.eq(index-1);
		aBrandImg.eq(iNow.index()).addClass("active").siblings().removeClass("active");
		
		
	})
	oBrandImgLi2.click(function(e){
		event.preventDefault();
		var index = $(this).parent().parent().next().index();
		if(index==-1){
			index=1;
		}
		aLi.eq(index-1).addClass("active").siblings().removeClass("active");
		var iNow = aLi.eq(index-1);
		aBrandImg.eq(iNow.index()).addClass("active").siblings().removeClass("active");
		
		
	})

	//新品栏 鼠标滑过
	var oUse = $(".using")
		oHotList = $(".hot-list");
	oHotList.mouseover(function(){
		$(".using",this).css("opacity",1)
	})
	oHotList.mouseout(function(){
		$(".using",this).css("opacity",0)
	})

	// 新品栏 内容加载
	var oBox = $(".main-hot-flow"),
		aList = $(".hot-list",oBox),
		aImg = $("img",aList),
		footer = $(".footer"),
		page = 1;
	$(window).scroll(function(e){
		var iScrollTop = $(window).scrollTop(),
			iClientHeight = document.documentElement.clientHeight || document.body.clientHeight,
			iTop = footer.offset().top;	
		// 加载第一排数据
		aList.each(function(){
		if(iScrollTop>=$(this).offset().top - iClientHeight){
			var index = $(this).index();
				$.ajax({
					url:"../data/index/today.json",
					success:function(data){
						aList.eq(index).find(".hot-img").find("img").attr("src",data.src[index]);
						aList.eq(index).find(".hot-font").find("span").html(data.discount[index]+"折");
						aList.eq(index).find(".hot-font").find("i").html(data.name[index]);
						aList.eq(index).find(".hot-price").find("span").html(data.price1[index]+" ");
						aList.eq(index).find(".hot-price").find("del").html("￥"+data.price2[index]);
					}
				});
			}
		})
		// 当即将到底部时创建新内容
		if(iScrollTop>=iTop - iClientHeight){
			if(page<=6){
				$.ajax({
					url:"../data/index/todayNew"+page+".json",
					success:function(data){
						for(var i in data){	
							var oLi = $('<div class="hot-list">'+
											'<a class="hot-img" href="#"><img src="'+data[i].src+'"></a>'+
											'<div class="using">'+
												'<a class="one" href="#">保湿</a>'+
												'<a href="#">润肤</a>'+
												'<a href="#">补水</a>'+
											'</div>'+
											'<a class="hot-font" href="#"><span>'+data[i].discount+'折</span>'+data[i].name+'</a>'+
											'<p class="hot-price">￥<span>'+data[i].price1+' </span><del>￥'+data[i].price2+'</del><button type="button">加入购物车</button></p>'+
											'<div class="hot-time">'+
												'<p>距团购结束 2天06小时28分53秒</p>'+
											'</div>'+
										'</div>')
							oBox.append(oLi);
						}		
					}	
				});
			}
			page++;				
		}
	})

	// 加入购物车信息
	var goods = $.cookie("carts")?JSON.parse($.cookie("carts")):{};
	if(JSON.stringify(goods)!="{}"){
		var	arrGoods = JSON.stringify(goods).split("},");
		for(var i=0;i<=arrGoods.length-1;i++){
			var arrGoods1 = arrGoods[i].split(":{")[1];
			var arrGoods2 = arrGoods1.split(",")[3];
			var arrGoods3 = arrGoods2.split("}}")[0];
			var arrGoods4 = arrGoods3.split(":")[1];
			var iNum = Number(arrGoods4);
			iNum+=iNum;
		}
		$("#fly_num").html(iNum);
	}else{
		iNum = 0;
		$("#fly_num").html(iNum);
	}

	var aAddCar = $(".addCar"),
		oCarHideEmpty = $(".car-hideEmpty"),
		oCarSelectedGoods = $(".car-selectedGoods"),
		oToCar = $(".toCar");
		goodsNum()
		changeNum()
	// 将商品信息添加到侧边栏购物车中
	var goods = $.cookie("carts")?JSON.parse($.cookie("carts")):{};
		if(JSON.stringify(goods)!="{}"){
			oCarHideEmpty.css("display","none");
			oCarSelectedGoods.css("display","block");
			oToCar.css("display","block");
			for(goodSrc in goods){
				var oLi = '<li>'+
							'<a class="selected-images" href="#"><img src="'+goods[goodSrc].src+'"></a>'+
							'<a class="selected-font" href="#">'+goods[goodSrc].name+'</a>'+
							'<div class="selected-info">'+
								'<span class="selected-price">￥<i>'+goods[goodSrc].price+'</i></span>'+
								'<div class="num">'+
									'<i><span class="jian"></span><span id="num">'+goods[goodSrc].num+'</span><span class="jia"></span></i>'+
								'</div>'+
								'<span class="selected-delete">删除</span>'+
							'</div>'+
						'</li>';
				oCarSelectedGoods.append(oLi);
				// changeNum()
			}
		}else{
			oCarHideEmpty.css("display","block");
			oCarSelectedGoods.css("display","none");
			oToCar.css("display","none");
		}
		

	//点击加入购物车后记录商品信息
	aAddCar.click(function(event){
		oCarHideEmpty.css("display","none");
		oCarSelectedGoods.css("display","block");
		oToCar.css("display","block");
		var goodSrc = $(this).parent().parent().parent().siblings("a").find("img").attr("src"),
			goodName = $(this).parent().parent().siblings(".mainCon").html(),
			goodPrice = $(this).parent().siblings("p").find("i").html();
		var goods = $.cookie("carts")?JSON.parse($.cookie("carts")):{};
		if(goodSrc in goods){
			goods[goodSrc].num++;
			// 加入购物车的实际数量跟显示的不一样，需要将内容替换掉
			var oLiNew = '<a class="selected-images" href="#"><img src="'+goods[goodSrc].src+'"></a>'+
						'<a class="selected-font" href="#">'+goods[goodSrc].name+'</a>'+
						'<div class="selected-info">'+
							'<span class="selected-price">￥<i>'+goods[goodSrc].price+'</i></span>'+
							'<div class="num">'+
								'<i><span class="jian"></span><span id="num">'+goods[goodSrc].num+'</span><span class="jia"></span></i>'+
							'</div>'+
							'<span class="selected-delete">删除</span>'+
						'</div>';
			$("li[data-id='"+goods[goodSrc].name+"']").html(oLiNew)//根据属性找对象，通过data-id来找
		}else{
			goods[goodSrc] = {
				src:goodSrc,
				name:goodName,
				price:goodPrice,
				num:1
			}
			var oLiNew = '<li data-id="'+goods[goodSrc].name+'">'+
						'<a class="selected-images" href="#"><img src="'+goods[goodSrc].src+'"></a>'+
						'<a class="selected-font" href="#">'+goods[goodSrc].name+'</a>'+
						'<div class="selected-info">'+
							'<span class="selected-price">￥<i>'+goods[goodSrc].price+'</i></span>'+
							'<div class="num">'+
								'<i><span class="jian"></span><span id="num">'+goods[goodSrc].num+'</span><span class="jia"></span></i>'+
							'</div>'+
							'<span class="selected-delete">删除</span>'+
						'</div>'+
					'</li>';
			oCarSelectedGoods.append(oLiNew);
			changeNum()	
		}
		$.cookie("carts",JSON.stringify(goods),7);
		flyCar(goodSrc);
		goodsNum();
		Del()
		iNum++;
		
	})

	Del()
})












