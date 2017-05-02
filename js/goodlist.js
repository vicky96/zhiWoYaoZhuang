$(function(){
	// 图片变淡效果
	$(".main").on("mouseover","img",function(){
		$(this).css("opacity",0.8)
	})
	$(".main").on("mouseout","img",function(){
		$(this).css("opacity",1)
	})
	
	// 小知推荐加载
	var oRecommendContent = $(".recommend-content");
	$.ajax({
		url:"../data/goodlist/recom.json",
		success:function(data){
			oRecommendContent.find("li").each(function(){
				var oImg = $("<img src=''>");
				$(this).find("a").append(oImg);
				oImg.attr("src",data.src[$(this).index()])	
				$(this).find("p").html(data.name[$(this).index()])
				$(this).find("span").html(data.price[$(this).index()])
			})		
		}
	})

	// 商品列表分页
	var oContent = $(".goodlist-content"),
		aContentPage = $(".content-page",oContent),
		aContentList = $(".content-list",aContentPage),
		oPage = $(".goodlist-page"),
		aPage = $(".page",oPage),
		oPrev = $(".prev-page"),
		oNext = $(".next-page"),
		oListTitle = $(".list-title");
	var iTop = oListTitle.offset().top,
		iPage = 1;
		changePage(1);

	// 点击页码后每次都返回到列表上端
	$(window).scroll(function(e){
		oPage.find("a").click(function(event){
			event.preventDefault();
			$("html,body").scrollTop(iTop);
		})
	})
	
	// 点击页码
	aPage.click(function(){
		$(this).find("a").addClass("active").parent().siblings().find("a").removeClass("active");
		aContentPage.eq($(this).index()-1).css("display","block").siblings(aContentPage).css("display","none");
		changePage($(this).index())
		if($(this).index()==1){
			oPrev.css("display","none");
			oNext.css("display","block");
		}else{
			oNext.css("display","block");
			oPrev.css("display","block");
		}
		iPage = $(this).index()
	})

	// 下一页
	oNext.click(function(){
		if(iPage<=aPage.length-1){
			iPage++;
			oPrev.css("display","block")
			aContentPage.eq(iPage-1).css("display","block").siblings(aContentPage).css("display","none");
			changePage(iPage)
			aPage.eq(iPage-1).find("a").addClass("active").parent().siblings().find("a").removeClass("active");
		}
	})

	// 上一页
	oPrev.click(function(){
		if(iPage>2){
			iPage--;
			aContentPage.eq(iPage-1).css("display","block").siblings(aContentPage).css("display","none");
			changePage(iPage)
		}else if(iPage==2){
			aContentPage.eq(0).css("display","block").siblings(aContentPage).css("display","none")
			changePage(1)
			oPrev.css("display","none");
			iPage--
		}else{
			oPrev.css("display","none")
		}
		aPage.eq(iPage-1).find("a").addClass("active").parent().siblings().find("a").removeClass("active");	
	})
	// 列表数据获取
	function changePage(page){
		$.ajax({
			url:"../data/goodlist/listContent"+page+".json",
			success:function(data){
				aContentPage.eq(page-1).find(".content-list").each(function(){
					$(this).find("img").attr("src",data.src[$(this).index()]);
					$(this).find(".list-font").html(data.name[$(this).index()]);
					$(this).find(".list-price").find("span").html(data.price1[$(this).index()]);
					$(this).find(".list-price").find("del").html(data.price2[$(this).index()]);
				})
			}
		})
	}

	
	var aAddCar = $(".addCar"),
		oCarHideEmpty = $(".car-hideEmpty"),
		oCarSelectedGoods = $(".car-selectedGoods"),
		oToCar = $(".toCar");
	goodsNum();
	changeNum();
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
			changeNum();
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
		var goodSrc = $(this).parent().siblings().find("img").attr("src"),
			goodName = $(this).parent().siblings(".list-font").html(),
			goodPrice = $(this).parent().find("span").html();
		var goods = $.cookie("carts")?JSON.parse($.cookie("carts")):{};
		if(goodSrc in goods){
			goods[goodSrc].num++;
			var oLiNew = '<a class="selected-images" href="#"><img src="'+goods[goodSrc].src+'"></a>'+
						'<a class="selected-font" href="#">'+goods[goodSrc].name+'</a>'+
						'<div class="selected-info">'+
							'<span class="selected-price">￥<i>'+goods[goodSrc].price+'</i></span>'+
							'<div class="num">'+
								'<i><span class="jian"></span><span id="num">'+goods[goodSrc].num+'</span><span class="jia"></span></i>'+
							'</div>'+
							'<span class="selected-delete">删除</span>'+
						'</div>';
			$("li[data-id='"+goods[goodSrc].name+"']").html(oLiNew)
		}else{
			goods[goodSrc] = {
				src:goodSrc,
				name:goodName,
				price:goodPrice,
				num:1
			}
			var oLiNew ='<li data-id="'+goods[goodSrc].name+'">'+
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
		Del();
	})
	Del()
	
	// 阻止点击图片时a标签刷新
	aContentList.find("a").click(function(event){
		event.preventDefault()
	})
	// 点击商品跳转到商品详情页
	$.ajax({
		url:"../data/goodlist/listContent1.json",
		success:function(data){
				var goodId = data.id;
				for(var i=0;i<=aContentList.length-1;i++){
					aContentList.eq(i).find("img").click(function(){
						var goodId = data.id[$(this).parent().parent().index()]
						location.href="good.html?id="+goodId
					})
				}
		}
	})
})
