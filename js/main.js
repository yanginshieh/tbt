$(document).ready(function () {
    var count = ""

    function checkSize() {
        var mobileCheck = $(window).width();

        if (mobileCheck < 640) {
            count = "small"
            $('.photo-text-container img[src]').each(function () {
                var $t = $(this);
                $t
                    .attr({
                        'data-lazy': $t.attr('src')
                    })
                    .removeAttr('src');
                    });

            $(".variable").slick({
                slidesToShow: 1,
                centerMode: true,
                variableWidth: false,
                centerPadding: '10%',
                lazyLoad: 'ondemand',
                arrows: true
            });
        }
        else {
            count = "big"
            $(".variable").slick({
                slidesToShow: 1,
                centerMode: true,
                variableWidth: true,
                arrows: true,
                lazyLoad: 'progressive',
                responsive: [
                    {
                        breakpoint: 975,
                        settings: {
                        lazyLoad: 'progressive',
                        centerMode: true,
                        variableWidth: false,
                        centerPadding: '10%'
                        }
                    }
                ]
            });
        }
    }
    checkSize();
    $(window).bind('resize', function (e) {
        window.resizeEvt;
        $(window).resize(function () {
            clearTimeout(window.resizeEvt);
            window.resizeEvt = setTimeout(function () {
                if ($(window).width() > 640) {
                    if (count == "small") {
                        $(".variable").slick('unslick');
                        $('.photo-text-container img[data-lazy]').each(function () {
                            var $t = $(this);
                            $t
                                .attr({
                                    'src': $t.attr('data-lazy')
                                })
                                .removeAttr('data-lazy');
                        });
                        checkSize();
                    }
                    count = "big";
                }
                else {
                    if (count == "big") {
                        $(".variable").slick('unslick');
                        checkSize();
                    }
                    count = "small";
                }
            }, 250);
        });
    });

    $("body").keydown(function(e) {
      if(e.which == 37) { // left     
        $('.variable').slick('slickPrev');
      }
      else if(e.which == 39) { // right     
        $('.variable').slick('slickNext');
      }
    });

    $("#goBackOriginal").click(function(){
        $('.variable').slick('slickGoTo', 0);
    });
});