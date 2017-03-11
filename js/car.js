$(function(){
	var oCarContent = $(".car-content"),
		oEmpty = $(".empty"),
		oCarPay = $(".car-pay"),
		oCarEmpty = $(".car-empty");

	// 获取商品信息
	var goods = $.cookie("carts")?JSON.parse($.cookie("carts")):{};
	if(JSON.stringify(goods)!="{}"){
		oCarEmpty.css("display","none");
		oCarContent.css("display","block");
		oCarPay.css("display","block");
		for(goodSrc in goods){
			var oUl = '<ul class="car-list">'+
							'<i class="goods-select"></i>'+
							'<li class="goods">'+
								'<a class="pic" href="#"><img src="'+goods[goodSrc].src+'"></a>'+
								'<a class="word" href="#"><p>'+goods[goodSrc].name+'</p></a>'+		
							'</li>'+
							'<li class="pri">￥<span>'+goods[goodSrc].price+'</span></li>'+
							'<li class="num"><i><span class="jian"></span><input type="text" id="num" value="'+goods[goodSrc].num+'"/><span class="jia"></span></i></li>'+
							'<li class="sumpri"></li>'+
							'<li class="jifen"></li>'+
							'<li class="btn">'+
								'<span id="delete">删除</span>'+
								'<span class="collect">收藏</span>'+
							'</li>'+
						'</ul>';
			oCarContent.append(oUl);
		}
	}else{
		oCarEmpty.css("display","block");
		oCarContent.css("display","none");
		oCarPay.css("display","none");
	}
	changeNum()
	// 数量增加后价格相应增加
	var oCarList = $(".car-list");
	oCarList.each(function(){
		var oPri = $(this).find(".pri span").html(),
			oNum1 = $(this).find(".num i #num").val(),
			oNum2 = $(this).find(".num i #num"),
			oJia = $(this).find(".num i .jia"),
			oJian = $(this).find(".num i .jian"),
			ji = oPri*oNum1,
			oSumpri = $(this).find(".sumpri"),
			oJifen = $(this).find(".jifen"),
			goodSrc = $(this).find(".goods").find(".pic").find("img").attr("src");
		oSumpri.html(ji);
		oJifen.html(ji);
		oJia.click(function(){
			oNum1++;
			ji = oPri*oNum1;
			oSumpri.html(ji);
			oJifen.html(ji);
			allSum+=Number(oPri);
			oMoney.find("i").html(allSum);
			goods[goodSrc].num++;
			oNum2.val(goods[goodSrc].num)
			$.cookie("carts",JSON.stringify(goods),7);
		})
		oJian.click(function(){
			if(oNum1>1){
				oNum1--;
				ji = oPri*oNum1;
				oSumpri.html(ji);
				oJifen.html(ji);
				allSum-=Number(oPri);
				oMoney.find("i").html(allSum);
				goods[goodSrc].num--;
				oNum2.val(goods[goodSrc].num)
				$.cookie("carts",JSON.stringify(goods),7);	
			}
		})
		oNum2.keyup(function () {
			this.value = this.value.replace(/[^\d]/g, '');

        })
        oNum2.blur(function(){
        	if(!$(this).val()){
        		oNum2.focus()
        	}else{
        		goods[goodSrc].num = $(this).val();
        		ji = oPri*goods[goodSrc].num;
        		oSumpri.html(ji);
        		oJifen.html(ji);
        		allSum += ji;
				oMoney.find("i").html(allSum);
        		$.cookie("carts",JSON.stringify(goods),7);
        	}
        })
		
	})
	var oMoney = $(".money"),
		aSum = oCarList.find(".sumpri"),
		allSum = 0;
	for(var i=0;i<=aSum.length-1;i++){
		allSum+=Number(aSum.eq(i).html());
	}
	oMoney.find("i").html(allSum);

	// 商品件数
	var oNumber = $(".number"),
		len = oCarList.length;
	oNumber.find("i").html(len)

	// 全选
	var oAllSelect = $(".all-select"),
		aGoodsSelect = $(".goods-select",oCarList),
		oSelectedDelete = $(".selected-delete"),
		isAll = true;//都没选
	oAllSelect.parent().click(function(){
		if(isAll){
			oAllSelect.addClass("active");
			aGoodsSelect.addClass("active");
			isAll=false;
		}else{
			oAllSelect.removeClass("active");
			aGoodsSelect.removeClass("active");
			isAll=true;
		}
	})
	var isSelect = true;//没选
	aGoodsSelect.click(function(){
		if(isSelect){
			$(this).addClass("active");
			isSelect=false;
		}else{
			$(this).removeClass("active");
			oAllSelect.removeClass("active");
			isSelect=true;
		}
	})

	// 删除已选
	oSelectedDelete.click(function(){
		if(aGoodsSelect.hasClass("active")){
			if(confirm("您确定要删除这些商品吗？")){
				for(var i=0;i<=aGoodsSelect.length-1;i++){
					if(aGoodsSelect.eq(i).hasClass("active")){
						aGoodsSelect.eq(i).parent().remove();		
						var goodSrc = aGoodsSelect.eq(i).siblings('.goods').find(".pic").find("img").attr("src");
						delete goods[goodSrc];
						$.cookie("carts",JSON.stringify(goods),7);
						if(len<=1){
							oCarPay.css("display","none");
							oCarEmpty.css("display","block");	
						}
						len--;	
						oNumber.find("i").html(len);
						var iPri = aGoodsSelect.eq(i).siblings('.sumpri').html();
						oMoney.find("i").html(allSum-Number(iPri));
						allSum-=Number(iPri);				
					}
				}
			}	
		}else{
			alert("请选择商品")
		}	
	})

	// 删除商品
	var oDel = $("#delete",oCarList);
	oDel.click(function(){
		if(confirm("您确定要删除此商品吗？")){
			$(this).parent().parent().remove();
			var goodSrc = $(this).parent().siblings('.goods').find(".pic").find("img").attr("src");
			delete goods[goodSrc];
			$.cookie("carts",JSON.stringify(goods),7)
			if(len<=1){
				oCarPay.css("display","none");
				oCarEmpty.css("display","block");	
			}
			len--;	
			oNumber.find("i").html(len);
			var iPri = $(this).parent().siblings('.sumpri').html();
			oMoney.find("i").html(allSum-Number(iPri));
			allSum-=Number(iPri);
		}	
	})

	// 全部清空
	oEmpty.click(function(){
		if(confirm("您确定要清空购物车吗？")){
			oCarContent.remove();
			oCarPay.css("display","none");
			oCarEmpty.css("display","block");
			$.cookie("carts","")
		}	
	})

	// 结算时判断是否登录
	var oPay = $(".pay-account");
	oPay.click(function(){
		if($.cookie("tel")){
			location.href = "pay.html";
		}else{
			location.href = "login.html#1";
		}
	})
	
	// 加价购鼠标划过效果
	var oPrefecture = $(".prefecture"),
		oLi = $("li",oPrefecture);
	oLi.mouseover(function(){
		$(this).addClass('active').siblings().removeClass('active');
	})

})
