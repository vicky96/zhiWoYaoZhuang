$(function(){
	var oCarContent = $(".car-content");
	// 获取商品信息
	var goods = $.cookie("carts")?JSON.parse($.cookie("carts")):{};
	if(JSON.stringify(goods)!="{}"){
		for(goodSrc in goods){
			var oUl = '<ul class="car-list">'+
							'<li class="goods">'+
								'<a class="pic" href="#"><img src="'+goods[goodSrc].src+'"></a>'+
								'<a class="word" href="#"><p>'+goods[goodSrc].name+'</p></a>'+		
							'</li>'+
							'<li class="pri">￥<span>'+goods[goodSrc].price+'</span></li>'+
							'<li class="num">'+goods[goodSrc].num+'</li>'+
							'<li class="sumpri">'+goods[goodSrc].num*goods[goodSrc].price+'</li>'+
						'</ul>';
			oCarContent.append(oUl);
		}
	}
	// 支付方式鼠标点击效果
	var oPlat = $(".plat"),
		oLi = $("li",oPlat);
	oLi.click(function(){
		$(this).find("i").addClass("active").parent().siblings().find("i").removeClass("active");
		$(this).find("span").addClass("active").parent().siblings().find("span").removeClass("active");
		$(this).find("em").addClass("active").parent().siblings().find("em").removeClass("active");

	})


})