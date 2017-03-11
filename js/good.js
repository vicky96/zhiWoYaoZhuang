$(function(){
	// 获取商品信息
	var oSearch = window.location.search,
		goodId = oSearch.split("=")[1];
		
	$.ajax({
		url:"../data/goodlist/listContent1.json",
		success:function(data){
			var good = data.id.indexOf(goodId),
				goodSrc = data.src[good],
				goodName = data.name[good],
				goodPrice1 = data.price1[good],
				goodPrice2 = data.price2[good];
			$(".glass .img-box img").attr("src",goodSrc);
			$(".glass .big-img-box img").attr("src",goodSrc);
			$(".content-right #goodName").html(goodName);
			$("#price").html(goodPrice1);
			$(".price del").html(goodPrice2);
			
		}
	})
	var aAddCar = $(".addCar"),
		oCarHideEmpty = $(".car-hideEmpty"),
		oCarSelectedGoods = $(".car-selectedGoods"),
		oToCar = $(".toCar");
		goodsNum()
		changeNum()
	var goods = $.cookie("carts")?JSON.parse($.cookie("carts")):{};
	if(JSON.stringify(goods)!="{}"){
		oCarHideEmpty.css("display","none");
		oCarSelectedGoods.css("display","block");
		oToCar.css("display","block");
		for(goodSrc in goods){
			var oLi = '<li>'+
						'<a class="selected-images" href="#"><img src="'+goods[goodSrc].src+'"></a>'+
						'<a class="selected-font" href="#">'+goods[goodSrc].name+'</a>'+
						'<div class="selected-info" style="width:180px;">'+
							'<span class="selected-price">￥<i>'+goods[goodSrc].price+'</i></span>'+
							'<div class="num" style="margin-top:0;width:110px;">'+
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



	// 商品数量加减
	changeNum();

	// 放大镜
	var oGlass = $(".glass"),
		oImgBox = $(".img-box",oGlass),
		oImages = $(".images",oImgBox),
		oImgZoom = $(".img-zoom",oImgBox),
		oBigImgBox = $(".big-img-box",oGlass),
		oBigImages = $(".big-images",oBigImgBox);
	oImgBox.mouseover(function(){
		oImgZoom.show();
		oBigImgBox.show();
	})
	oImgBox.mouseout(function(){
		oImgZoom.hide();
		oBigImgBox.hide();
	})
	oImgBox.mousemove(function(e){
		var iScrollLeft = $(window).scrollLeft(),
			iScrollTop = $(window).scrollTop(),
			iLeft = iScrollLeft + e.clientX - oImgZoom.outerWidth()/2 - oImgBox.offset().left,
			iTop = iScrollTop + e.clientY - oImgZoom.outerHeight()/2 - oImgBox.offset().top,
			iMaxLeft = oImgBox.outerWidth() - oImgZoom.outerWidth(),
			iMaxTop = oImgBox.outerHeight() - oImgZoom.outerHeight();

		if(iLeft<0){
			iLeft = 0;
		}else if(iLeft>iMaxLeft){
			iLeft = iMaxLeft;
		}
		if(iTop<0){
			iTop = 0;
		}else if(iTop>iMaxTop){
			iTop = iMaxTop;
		}
		var iBigLeft = -iLeft/iMaxLeft*(oBigImages.outerWidth()-oBigImgBox.outerWidth()),
			iBigTop = -iTop/iMaxTop*(oBigImages.outerHeight()-oBigImgBox.outerHeight());
		oImgZoom.css({"left":iLeft,"top":iTop});
		oBigImages.css({"left":iBigLeft,"top":iBigTop})
	})

	// 组合购买
	// 鼠标滑过效果

	var aBottonItem = $(".bottom-item");
	aBottonItem.mouseover(function(){
		$("img",this).css("borderColor","#ff643c");
		$("p",this).css("color","#ff643c")
	})
	aBottonItem.mouseout(function(){
		$("img",this).css("borderColor","#fff");
		$("p",this).css("color","#6c6c6c")
	})


	// 同品牌数据加载

	var oRankOne = $(".rankOne");
	$.ajax({
		url:"../data/good/ranking.json",
		success:function(data){
			oRankOne.find(".content-list").each(function(){
				$(this).find("img").attr("src",data.src[$(this).index()]);
				$(this).find(".list-font").html(data.name[$(this).index()]);
				$(this).find(".list-price").find("span").html(data.price1[$(this).index()]);
				$(this).find(".list-price").find("del").html(data.price2[$(this).index()]);
			})
		}
	})


	// 商品详情吸顶菜单
	var oDetailTitle = $(".detailTitle"),
		iTop = oDetailTitle.offset().top,
		aChangeItem = $(".change-item"),
		aLi = $("li",oDetailTitle);
	$(window).scroll(function(){
		var iScrollTop = $(window).scrollTop();
		if(iScrollTop>=iTop){
			oDetailTitle.css({
				position:"fixed",
				top:0
			});
		}else{
			oDetailTitle.css("position","relative")
		}

		// 吸顶菜单选项卡
		aLi.find("a").click(function(event){
			event.preventDefault();
		})
		aLi.click(function(){
			var itemTop = aChangeItem.eq($(this).index()).offset().top,
				iHeight = oDetailTitle.height();
			$("html,body").scrollTop(itemTop-iHeight);
		}) 
	})


})




	