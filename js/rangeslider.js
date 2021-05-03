$( function() {
    var values= [ 0, 1440 ];
    $("#departure-range, #arrival-range").slider({
        range: true,
        min: 0,
        max: 1440,
        step: 1,
        values: values,
        slide: function (e, ui) {
            var hours1 = Math.floor(ui.values[0] / 60);
            var minutes1 = ui.values[0] - (hours1 * 60);

            if (hours1.length == 1) hours1 = '0' + hours1;
            if (minutes1.length == 1) minutes1 = '0' + minutes1;
            if (minutes1 == 0) minutes1 = '00';
            if (hours1 >= 12) {
                if (hours1 == 12) {
                    hours1 = hours1;
                    minutes1 = minutes1 + " pm";
                } else {
                    hours1 = hours1 - 12;
                    minutes1 = minutes1 + " pm";
                }
            } else {
                hours1 = hours1;
                minutes1 = minutes1 + " am";
            }
            if (hours1 == 0) {
                hours1 = 12;
                minutes1 = minutes1;
            }


            $('.slider-time').val(hours1 + ':' + minutes1);

            var hours2 = Math.floor(ui.values[1] / 60);
            var minutes2 = ui.values[1] - (hours2 * 60);

            if (hours2.length == 1) hours2 = '0' + hours2;
            if (minutes2.length == 1) minutes2 = '0' + minutes2;
            if (minutes2 == 0) minutes2 = '00';
            if (hours2 >= 12) {
                if (hours2 == 12) {
                    hours2 = hours2;
                    minutes2 = minutes2 + " pm";
                } else if (hours2 == 24) {
                    hours2 = 11;
                    minutes2 = "59 pm";
                } else {
                    hours2 = hours2 - 12;
                    minutes2 = minutes2 + " pm";
                }
            } else {
                hours2 = hours2;
                minutes2 = minutes2 + " am";
            }

            $('.slider-time2').val(hours2 + ':' + minutes2);

            if ( (ui.values[0] != values[0]) ||  (ui.values[1] != values[1])  ) {
                $(this).closest('li').addClass("checked");
            }else{
                $(this).closest('li').removeClass("checked");
            }
        }
    });
    $("#dtime1, #atime1").val('12:00 am');// +
    $("#dtime2, #atime2").val('23:59 pm');// +
});