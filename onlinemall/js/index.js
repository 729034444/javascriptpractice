    // $('.dropdown').hover(function(){
    //     var $dropdown = $(this);

    //     $dropdown.find('.dropdown-toggle').css({
    //         'background-color':'#fff',
    //         'border-color':'#cdd0d4'
    //     });

    //     $dropdown.find('.dropdown-arrow').css({
    //         'background-image':'url(img/arrowred.svg)',
    //         'transform':'rotate(180deg)'
    //     });

    //     $dropdown.find('.dropdown-layer').show()
    // },function(){
    //     var $dropdown = $(this);

    //     $dropdown.find('.dropdown-toggle').css({
    //         'background-color':'',
    //         'border-color':'#f3f5f7'
    //     });

    //     $dropdown.find('.dropdown-arrow').css({
    //         'background-image':'url(img/arrow.svg)',
    //         'transform':'none'
    //     });

    //     $dropdown.find('.dropdown-layer').hide()
    // })

$('.dropdown').hover(function(){
    $(this).addClass('dropdown-active');
},function(){
    $(this).removeClass('dropdown-active');
})