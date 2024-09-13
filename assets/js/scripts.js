

$(document).ready(function () {

    var menu = $('#menu-icon');
    var navbar = $('.navbar');

    menu.on('click', function () {
        menu.toggleClass('bx-x');
        navbar.toggleClass('open');
    });

    var $container = $('#container');
    var $slider = $('#slider');
    var $slides = $('.slide');
    var slides = $slides.length;
    var $buttons = $('.btn');
    var autoplay;
    var currentPosition = 0;
    var currentMargin = 0;
    var slidesPerPage = 0;
    var slidesCount = slides - slidesPerPage;

    function checkWidth() {
        var containerWidth = $container.width();
        setParams(containerWidth);
    }

    function setParams(w) {
        if (w < 551) {
            slidesPerPage = 1;
        } else if (w < 901) {
            slidesPerPage = 2;
        } else if (w < 1101) {
            slidesPerPage = 3;
        } else if (w < 1401) {
            slidesPerPage = 4;
        } else {
            slidesPerPage = 5; // Set 5 slides for larger screens
        }
        slidesCount = slides - slidesPerPage;
        if (currentPosition > slidesCount) {
            currentPosition = 0;
            currentMargin = 0;
        }
        currentMargin = -currentPosition * (100 / slidesPerPage);
        $slider.css('margin-left', currentMargin + '%');
        $buttons.first().toggleClass('inactive', currentPosition === 0);
        $buttons.last().toggleClass('inactive', currentPosition >= slidesCount);
    }

    function slideRight() {
        if (currentPosition > 0) {
            currentPosition--;
            currentMargin += (100 / slidesPerPage);
        } else {
            currentPosition = slidesCount;
            currentMargin = -currentPosition * (100 / slidesPerPage);
        }
        $slider.css('margin-left', currentMargin + '%');
    }

    function slideLeft() {
        if (currentPosition < slidesCount) {
            currentPosition++;
            currentMargin -= (100 / slidesPerPage);
        } else {
            currentPosition = 0;
            currentMargin = 0;
        }
        $slider.css('margin-left', currentMargin + '%');
    }

    function startAutoplay() {
        autoplay = setInterval(slideLeft, 3000); // Store interval ID for autoplay
    }

    $buttons.first().click(slideRight);
    $buttons.last().click(slideLeft);

    $('.slide').click(function () {
        clearInterval(autoplay); // Stop autoplay on popup open
        var info = $(this).data('info');
        $('#popup p').text(info);
        $('#popup').fadeIn();
        $('#overlay').fadeIn(); // Show overlay
    });

    $(document).on('click', '.close-btn', function () {
        $('#popup').fadeOut();
        $('#overlay').fadeOut(); // Hide overlay
        startAutoplay(); // Resume autoplay on popup close
    });

    $(window).resize(checkWidth);
    checkWidth();
    startAutoplay();
});
// $(document).ready(function() {
//     var $container = $('#container');
//     var $slider = $('#slider');
//     var $slides = $('.slide');
//     var slides = $slides.length;
//     var $buttons = $('.btn');

//     var currentPosition = 0;
//     var currentMargin = 0;
//     var slidesPerPage = 0;
//     var slidesCount = slides - slidesPerPage;

//     function checkWidth() {
//         var containerWidth = $container.width();
//         setParams(containerWidth);
//     }

//     function setParams(w) {
//         if (w < 551) {
//             slidesPerPage = 1;
//         } else if (w < 901) {
//             slidesPerPage = 2;
//         } else if (w < 1101) {
//             slidesPerPage = 3;
//         } else {
//             slidesPerPage = 4;
//         }
//         slidesCount = slides - slidesPerPage;
//         if (currentPosition > slidesCount) {
//             currentPosition -= slidesPerPage;
//         }
//         currentMargin = -currentPosition * (100 / slidesPerPage);
//         $slider.css('margin-left', currentMargin + '%');
//         $buttons.first().toggleClass('inactive', currentPosition === 0);
//         $buttons.last().toggleClass('inactive', currentPosition >= slidesCount);
//     }

//     function slideRight() {
//         if (currentPosition > 0) {
//             currentPosition--;
//             currentMargin += (100 / slidesPerPage);
//             $slider.css('margin-left', currentMargin + '%');
//             $buttons.last().removeClass('inactive');
//             if (currentPosition === 0) {
//                 $buttons.first().addClass('inactive');
//             }
//         }
//     }

//     function slideLeft() {
//         if (currentPosition < slidesCount) {
//             currentPosition++;
//             currentMargin -= (100 / slidesPerPage);
//             $slider.css('margin-left', currentMargin + '%');
//             $buttons.first().removeClass('inactive');
//             if (currentPosition >= slidesCount) {
//                 $buttons.last().addClass('inactive');
//             }
//         }
//     }

//     function startAutoplay() {
//         setInterval(slideLeft, 3000); // Adjust interval time as needed
//     }

//     $buttons.first().click(slideRight);
//     $buttons.last().click(slideLeft);
//     $('.slide').click(function() {
//         var info = $(this).data('info');
//         $('#popup p').text(info);
//         $('#popup').fadeIn();
//     });

//     $(document).on('click', '.close-btn', function() {
//         $('#popup').fadeOut();
//     });

//     $(window).resize(checkWidth);
//     checkWidth();
//     startAutoplay();
// });