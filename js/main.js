$(document).ready(function() {
    //открыть/закрыть козину
    $(".cart_form").on({
        mouseenter: function () {
            $("#cart_container").stop().slideDown("slow");
        },
        mouseleave: function () {
            $("#cart_container").stop().slideUp("slow");
        }
    });

    //выпадающее меню
    $(".li_menu").each(function() {
        $(this).hover(function () {
            $(this).find(".sub_menu").stop().slideDown("slow");
        },
        function () {
            $(this).find(".sub_menu").stop().slideUp("slow");
        }
        );
    });
    
    // добаляет товар в корзниу
    var newcount = 0;
    $(".card_btn").on("click", function() {
        var allprice = $("span#price").attr("price"),
            price = $(this).attr("price"),
            item_id = $(this).closest(".weight").find("input").val(),
            item_price = Number(price) * Number(item_id) / 50,
            newprice = Number(allprice) + Number(item_price);

        newcount ++;//увеличивает количесвто на 1
        $("span#price").html(newprice).attr("price", newprice);//изменяет цену заказа в корзине
        $("span.count").html(newcount);

        //копирование значений товара в переменные

        var itemVar = $(this).parent().prev("a").find("#item_name").clone(),
            minusVar = $(this).parent().find("span.minus").clone(),
            inputVar = $(this).parent().find("input").clone(),
            plusVar = $(this).parent().find(".plus").clone(),
            sumVar = $(this).parent().find(".item_price").clone();

        // добавляет название товара в корзину
               
        $(".cart_container_sum .total").before("<div class='weight'></div>");
        $(".cart_container_sum .weight:last").append(itemVar); 
        $(".cart_container_sum .weight:last").append(minusVar);

        $(".cart_container_sum .weight:last").append(inputVar);
        $(".cart_container_sum .weight:last").append(plusVar);
        $(".cart_container_sum .weight:last").append(sumVar);
        $(sumVar).after("<hr>");
        
    });
    
    //изменять количество товара
    
    $(document).find(".weight").each(function() {
        //Подтвердить ввод количетсва
        $(this).find("input").on("keydown", function(event) {
            if (event.keyCode == 13) {
                a.find("input").val((Math.ceil((a.find("input").val())/50))*50);
                a.find("span.item_price").html(parseInt(a.find("input").val()) * parseInt((a.find(".card_btn").attr("price"))) / 50);
            }
            else {
            }
        });
        //изменяет количество товара и цену
        var a = $(this);
        a.find("span.minus").on("click", function() {
            var data = a.find("input").val(),
                x = a.find("span.item_price").html();   
            if(data > 0) {
                a.find("input").val(parseInt(data) - 50);
                a.find("span.item_price").html(parseInt(x) - parseInt(a.find(".card_btn").attr("price")));
            }
            return false
        });
        a.find("span.plus").on("click", function() {
            var data = a.find("input").val(),
                x = a.find("span.item_price").html();
            a.find("input").val(parseInt(data) + 50);
            a.find("span.item_price").html(parseInt(x) + parseInt(a.find(".card_btn").attr("price")));
            return false
        });
    });


    //ограничения на ввод с клавиатуры
    $(document).on("keydown", ".weight input, input[name='phone']", function(event) {
        if ((event.keyCode < 48 || event.keyCode > 57 ) && (event.keyCode<35 || event.keyCode>39) && event.keyCode!=8 && event.keyCode!=46 && (event.keyCode<96 || event.keyCode>105)){
            event.preventDefault();
        }  
    });

    //пагинациия
    $(".pag_item").on("click", function(event) {
        event.preventDefault();
        
        var item = $(this),
            contentItem = $(".cards"),
            itemPosition = item.data("class");

        contentItem.filter(".cards_" + itemPosition).addClass("active").siblings().removeClass("active");
        item.addClass("active_btn").siblings().removeClass("active_btn");
    });


    //слайдер карточки товара
    $(".slider_controls_btn").on("click", function(event) {
        event.preventDefault();

        var th = $(this),
            container = th.closest(".card_image"),
            list = container.find(".slider_list"),
            items = container.find(".slider_item"),
            activeSlide = items.filter(".active"),
            nextSlide = activeSlide.next(),
            prevSlide = activeSlide.prev(),
            firstSlide = items.first(),
            lastSlide = items.last(),
            sliderOffset = container.offset().left,
            reqPos = 0;
        if (th.hasClass("slider_controls_btn_next")) {
            if (nextSlide.length) {
                findReqPos(nextSlide);
                removeActiveClass(nextSlide);
            } else {
                findReqPos(firstSlide);
                removeActiveClass(firstSlide);
            }
        } else {
            if (prevSlide.length) {
                findReqPos(prevSlide);
                removeActiveClass(prevSlide);
            } else {
                findReqPos(lastSlide);
                removeActiveClass(lastSlide);
            }
        }

        list.css("left", "-=" + reqPos + "px");

        function removeActiveClass (reqSLide) {
            reqSLide.addClass("active").siblings().removeClass("active");
        }

        function findReqPos (slide) {
            reqPos = slide.offset().left - sliderOffset;
        }
        console.log(reqPos);

    });

    //строга ИТОГО в корзине товара

    var sum = 0;
    $(".card_btn").on("click", function() {
        $(".cart_container_sum input").each(function() {
            sum+=parseInt($(this).val());

            $(".sum_weight").html(sum + " гр.");
        });
        sum=0;
    });


});