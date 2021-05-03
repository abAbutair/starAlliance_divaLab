$(function() {
    $(document).on("click", function(e) {
        if ($(e.target).is(".sel") === false) {
            $(".sel").removeClass("active");
        }
    });
});


//header
$(window).scroll(function(){
    if ($(this).scrollTop() > 170) {
        $('header').addClass('scrolled');
    } else {
        $('header').removeClass('scrolled');
    }
});
// navigation
$('.navbar-toggler').on('click', function () {
    $('body').toggleClass(' show_nav ');
})
//flip api --------------------------------------------------------
$('.flightBtn').on('click', function () {
    $(this).parent().removeClass("hotels");
    $(this).parent().addClass("flights");
    $(this).siblings().removeClass("show");
    $(this).siblings().addClass("hide");
    $(this).siblings('#flights').removeClass("hide");
    $(this).siblings('#flights').addClass("show");
});
$('.hotelBtn').on('click', function () {
    $(this).parent().removeClass("flights");
    $(this).parent().addClass("hotels");
    $(this).siblings().removeClass("show");
    $(this).siblings().addClass("hide");
    $(this).siblings('#hotels').removeClass("hide");
    $(this).siblings('#hotels').addClass("show");
});



//switch flight types --------------------------------------------------------
function showForm() {
    var checked = $('input[name="flightType"]:checked');
    var target = checked.attr('id');
    $('form.formIn').removeClass('formIn');
    $('form[data-type="' + target + '"]').addClass('formIn');
    $('form[data-type="' + target + '"]').siblings('form').removeClass('formIn');
    $('form[data-type="' + target + '"]').parent().attr('class', 'forms');
    $('form[data-type="' + target + '"]').parent().addClass(target);
}
showForm();
$('input[name="flightType"]').on('change', function(){showForm();});



// check input value --------------------------------------------------------
$('input[type=text]').on('blur', function() {
    if (this.value != '') {
        $(this).addClass("not_empty");
    }
});



//datepicker -----------------------------------------------------------------
//$('.single_date').datePicker();  // one way flight.
function singleDate() {
    $('input.single_date').each(function () {
        $(this).datePicker();
    });
    $('input.bdate').datePicker( {
        changeMonthYear: true ,
        startYear:1940,
    });
    $('input.exp').datePicker( {
        changeMonthYear: true ,
        startYear :moment().year(),
        endYear : moment().year() + 10,
    });
}

singleDate() // one way flight.
function dateRange(){
    $("input.rangeFrom").each(function () {
        var currentTo = $(this).parent().next().children('input.rangeTo');
        $(this).datePicker({ minDate: 0, monthCount: 2, range: currentTo });
    });
}
dateRange(); //return flight.




//counters -----------------------------------------------------------------
function checkTravellers() {
    var adults =  parseFloat($(' form.formIn').find('.adults').find('input').val()),
        children = parseFloat($(' form.formIn').find('.children').find('input').val()),
        infants = parseFloat($(' form.formIn').find('.infants').find('input').val()),
        travellerCount = adults + children + infants ;

    $(" form.formIn input").each(function () {
        var age = parseFloat($(this).val());

        if(age == 0) {
            $(this).siblings('.minus').addClass('stop');
        }else {
            $(this).siblings('.minus').removeClass('stop');
        }
    });

    if(travellerCount == 9) {
        $('.plus').addClass('stop');
        $('#error_msg').text('Sorry,  cannot have more than 9 travellers!');
    }
    else{
        $('.plus').removeClass('stop');
        if(infants == adults){
            $('.infants .plus').addClass('stop');
            $('.adults .minus').addClass('stop');
            $('#error_msg').text('Sorry,  cannot have more infants than adults!');
        }else if(adults == 1){
            $('.adults .minus').addClass('stop');
            $('#error_msg').text('Sorry,  Adults must be 1  at least!');
        }
    }
};checkTravellers();


$('.plus').click(function() {
    $('#error_msg').removeClass('error');
    if ( (!$(this).hasClass('stop'))){
        var sp = parseFloat($(this).siblings('input').val());
        if(sp < 9){
            $(this).siblings('input').val(sp + 1);
        }
    }else {
        $('#error_msg').addClass('error');
    }
    checkTravellers();
});
$('.minus').click(function() {
    $('#error_msg').removeClass('error');
    if ( (!$(this).hasClass('stop'))) {
        var sp = parseFloat($(this).siblings('input').val());
        if (sp > 0) {
            $(this).siblings('input').val(sp - 1);
        }
    }else {
        $('#error_msg').addClass('error');
        //$('.wrap').addClass('show_error');
    }
    checkTravellers();
});







//add flight -----------------------------------------------------------------
function flightNum() {
    var newFlight = $(".multi-flight .dates").slice(2);

    for (i = 0; i < newFlight.length; i++) {
        newFlight.each(function () {
            var flightNum = $(this).index() + 1;
            $(this).find('input').attr('name', 'multi_city_origin_location' + flightNum);
        });
    }
}
function addFlight() {
    var count = $(".multi-flight .dates").length;
    //console.log(count);
    if(count < 6){
        $('.multi-flight .dates:last-child').clone().appendTo('.multi-flight .flight_rsnge').find("input[type='text']").val("");
        dateRange();
    }
    if(count > 1){flightNum()}
    singleDate();
}

//remove flight -----------------------------------------------------------------
$(function() {
    $(document).on('click','.multi-flight .dates .removeBtn',function(event) {
        event.preventDefault();
        $(this).parent().remove()
    })
})



//closing modal -----------------------------------------------------------------
$('.close_modal').on('click', function() {
    $(' .modal-dialog, .modal-content').addClass('closing');
    setTimeout(function() {
        $('#api_modal, #multi-flights, #edit_profile_info').modal('hide');
        $('.modal .modal-dialog, .modal .modal-content').removeClass('closing');
    }, 1000);
    $('.multi-flight .dates:not(:first-child)').remove();
    $('.flight_tybe .radio:first-child label').click();
});





// profile collapse ***********************************************************
$(function () {
// saved card -----------------------------------------------------------------
    function cardId() {
        var card = $('.payments_details .cards .card');
        for (i = 0; i < card.length; i++) {
            card.each(function (){
                var index= $(this).index();
                //$(this).attr('id', 'card' + index);
                $(this).find('.btn-link').attr('data-target', '#card' + index);
                $(this).find('.collapse').attr('id', 'card' + index);

                $(".collapse").on('show.bs.collapse', function(e) {
                    if ($(this).is(e.target)) {
                        $(this).closest('.card').addClass('active-card');
                        $(this).closest('.card').siblings('.card').removeClass('active-card')
                    }
                })
            })
        }
    }
    var cloneCard =  $('.payments_details .colne').html();
    $('.add_card').click(function () {
        $(this).closest('.add-traveler').hide();
        $('.plus-card').removeClass('d-none');
        $('.payments_details .cards').append(cloneCard);
    });
    $('.plus-card').click(function () {
        $('.payments_details .cards').append(cloneCard);

        $('.payments_details .cards .card:not(:last-child)').removeClass('active-card');
        $('.payments_details .cards .card:not(:last-child) .collapse').removeClass('show');
        cardId()
    });


    // travelers collapse -----------------------------------------------------------------
    function travelerId() {
        var travelers = $('.traveler_info .cards .card');
        for (i = 0; i < travelers.length; i++) {
            travelers.each(function (){
                var index= $(this).index();
                $(this).find('.btn-link').attr('data-target', '#traveler' + index);
                $(this).find('.collapse').attr('id', 'traveler' + index);

                $(".collapse").on('show.bs.collapse', function(e) {
                    if ($(this).is(e.target)) {
                        $(this).closest('.card').addClass('active-card');
                        $(this).closest('.card').siblings('.card').removeClass('active-card')
                    }
                });
            })
        }
    }
    var cloneTraveler =  $('.traveler_info .colne').html();
    $('.new_traveler').click(function () {
        $(this).closest('.add-traveler').hide();
        $('.plus-traveler').removeClass('d-none');
        $('.traveler_info .cards').append(cloneTraveler);
    });
    $('.plus-traveler').click(function () {
        $('.traveler_info .cards').append(cloneTraveler);
        $('.traveler_info .cards .card:not(:last-child)').removeClass('active-card');
        $('.traveler_info .cards .card:not(:last-child) .collapse').removeClass('show');
        travelerId()
    });

    //collapse ----------------------------------------------------------
    $('.card').each(function () {
        $('.collapse').parent().removeClass('active-card');
        $('.collapse.show').parent().addClass('active-card');

        $(".collapse").on('show.bs.collapse', function(e) {
            if ($(this).is(e.target)) {
                $(this).closest('.card').addClass('active-card');
                $(this).closest('.card').siblings('.card').removeClass('active-card')
            }
        })
    });


    $(document).on('click', "button.remove_card", function() {
        var collapseCount = $(this).closest('.cards').children().length;
        var cards = $(this).closest('.cards');

        if(collapseCount == 1) {
            $(this).closest('.cards').siblings('.add-traveler').show();
            $(this).closest('.cards').siblings('[class^="plus-"]').addClass('d-none');
        }

        $(this).closest(".card").remove();

        var lastChild = cards.children().last();
        lastChild.find('.collapse').collapse();
    });
})



// traveler info wizard ***********************************************************
function travelerFormId() {
    var travelerForm = $('.single_traveler');
	/*
    for (i = 0; i < travelerForm.length; i++) {
        travelerForm.each(function (){
            var index= $(this).index();
            $(this).attr('id', 'traveler' + index);
        });
    }*/

    function controlBtns () {
        if ( (!$('.single_traveler:last-child').hasClass('active'))) {
            $('#nextTraveler').addClass('enable');
        }else {
            $('#nextTraveler').removeClass('enable');
        }
        if ( (!$('.single_traveler:first-child').hasClass('active'))) {
            $('#prevTraveler').addClass('enable');
        }else {
            $('#prevTraveler').removeClass('enable');
        }
    }controlBtns ()


    $('#nextTraveler').on('click',function () {
        var empty = $('.single_traveler.active').find("input").filter(function() {
            return this.value === "";
        });
        if(empty.length > 0) {
            //At least one input is empty
            alert("please fill info");
        }else{
            var activeIndex =$('.single_traveler.active').index() + 1;
            var activeForm =$('#traveler' + activeIndex);
            if ( (!$('.single_traveler:last-child').hasClass('active'))){
                activeForm.next().addClass('active');
                activeForm.removeClass('active');
            }
            controlBtns ()
        }
    });
    $('#prevTraveler').on('click',function () {
        var activeIndex =$('.single_traveler.active').index() + 1;
        var activeForm =$('#traveler' + activeIndex);

        if ( (!$('.single_traveler:first-child').hasClass('active'))) {
            activeForm.removeClass('active');
            activeForm.prev().addClass('active');
        }
        controlBtns ()
    })

}travelerFormId()




// scale ticket ***********************************************************
var pageWidth, pageHeight;
var basePage = {
    width: 800,
    height: 600,
    scale: 1,
    scaleX: 1,
    scaleY: 1
};
$(function(){
    if ($(window).width() < 768) {
        var $page = $('#ticket-view ');

        getPageSize();
        scalePages($page, pageWidth, pageHeight);

        //using underscore to delay resize method till finished resizing window
        $(window).resize(_.debounce(function () {
            getPageSize();
            scalePages($page, pageWidth, pageHeight);
        }, 150));


        function scalePages(page, maxWidth, maxHeight) {
            var scaleX = 1, scaleY = 1;
            scaleX = maxWidth / basePage.width;
            scaleY = maxHeight / basePage.height;
            basePage.scaleX = scaleX;
            basePage.scaleY = scaleY;
            basePage.scale = (scaleX > scaleY) ? scaleY : scaleX;

            var newLeftPos = Math.abs(Math.floor(((basePage.width * basePage.scale) - maxWidth) / 2));
            var newTopPos = Math.abs(Math.floor(((basePage.height * basePage.scale) - maxHeight) / 2));

            page.attr('style', '-webkit-transform:scale(' + basePage.scale + ');left:' + newLeftPos + 'px;top:' + newTopPos + 'px; transform-origin: top left; }');
        }

        function getPageSize() {
            pageHeight = $('#ticket-align').height();
            pageWidth = $('#ticket-align').width();
        }

        var normalHeight = $('#ticket-align').height(),
            newHeight = normalHeight * basePage.scale;

        $('#ticket-align') .css('height', newHeight );

        console.log(newHeight ,normalHeight, basePage.scaleY);

    };

});




function printTicket() {
    var panel = document.getElementById("ticket-align");
    var printWindow = window.open('', '', '');
    printWindow.document.write('<html><head><title>Print Invoice</title>');

    // Make sure the relative URL to the stylesheet works:
    printWindow.document.write('<base href="' + location.origin + location.pathname + '">');

    // Add the stylesheet link and inline styles to the new document:
    printWindow.document.write('<style type="text/css">body{width: 100%;}</style>');

    printWindow.document.write('</head><body >');
    printWindow.document.write(panel.innerHTML);
    printWindow.document.write('</body></html>');
    printWindow.print();
    printWindow.document.close();

    return false;
}


$('#click_here').on('click',function(){
    printTicket();
})








