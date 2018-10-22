$(document).ready(function(){
//review slider
var swiper = new Swiper('.review .swiper-container', {
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
});

//menu burger
$('.main-navigation-link').click(function(e) {
  e.preventDefault();
  $(this).toggleClass('open').blur().next('.menu-list').slideToggle('medium', function() {
    if ($(this).is(':visible'))
      $(this).css('display','flex');
  });
});

//click inside
$('.center-menu-item, .thematic-item, .last-projects-item, .m_blog-item').click(function() {
  $(this).find('a')[0].click();
});
$('.news-block-item .title, .news-block-item .img-wrap').click(function() {
  $(this).parent().find('a')[0].click();
});

//catalog-tabs
$('.catalog-tabs-caption').on('click', 'li:not(.active)', function() {
  $(this).addClass('active').siblings().removeClass('active').closest('.catalog').find('.catalog-content-item').removeClass('active').eq($(this).index()).addClass('active');
});

//popup button
$('.popup-btn').click(function(e) {
  e.preventDefault();
  $('.popup').show();
  $('.overlay').show();
});
$('.popup-close, .overlay').click(function() {
  $('.overlay, .popup').hide();
});

//review carousel
$('.review .owl-carousel').owlCarousel({
  loop:true,
  nav: true,
  dots:false,
  autoplay:true,
  autoplaySpeed: 3000,
  navSpeed: 3000,
  autoplayTimeout:5000,
  autoplayHoverPause:true,
  responsive : {
    0 :{
      items : 1
    },
    600 :{
      items : 2
    },
    992 :{
      items : 3
    },
    1200 :{
      items : 4
    }
  }
});

//review tabs
$('.review_clients').on('click', 'li:not(.active)', function() {
  $(this).addClass('active').siblings().removeClass('active').closest('.review').find('.review_item').removeClass('active').eq($(this).index()).addClass('active').next().addClass('active');
});
//project popup
$('.projects-item').click(function(e) {
  e.preventDefault();
  bg_img = $(this).data('img');
  console.log(bg_img);
  $('.project-popup img').attr('src', bg_img);
  $('.project-popup').show();
  $('.overlay').show();
});
$('.popup-close, .overlay').click(function() {
  $('.overlay, .project-popup').hide();
});
    // upload

    $(".upload input[type='file']").on('change', function (e) {
      var label = $(this).siblings('label').children('span');
      var fileName = e.target.files[0].name;
      label.text(fileName);
    });

    if ($('.js-form').length) {
      $('.js-form').each(function () {
        $(this).validate({

          rules: {
            name: {
              required: true,
              minlength: 2,
              maxlength: 16
            },
            phone: {
              required: true,
              minlength: 8,
              maxlength: 12
            },
            email: {
              required: true,
              email: true
            },
            message: {
              required: false
            }
          },
          messages:{
            name:{
                required: "Это поле обязательно для заполнения",
                minlength: "Имя должен быть минимум 2 символа",
            },
            phone:{
                required: "Это поле обязательно для заполнения",
                minlength: "Телефон должен быть минимум 6 символов",
            },
            email: {
                required: "Это поле обязательно для заполнения"
            }
          },
          errorPlacement: function (error, element) {
          },

          submitHandler: function (form) {
            $.ajax({
              type: "POST",
              url: "/wp-content/themes/marketing/mail/mail.php",
              data: $(form).serialize(),
              success: function () {
                alert("Спасибо за заявку! Скоро мы с вами свяжемся.");
                // $(".popup").css('opacity', '0').delay(200);
                $(".popup,.overlay").delay(200).css('display', 'none');
                $(".popup").dequeue();

                setTimeout(function () {
                  $(form).trigger("reset");
                }, 3000);
              }
            });
          }

        });
      });
    }

    $('.header-nav-search').on('click', function(ev) {
      ev.preventDefault();

      $(this).next().toggleClass('is-active');
    });

  });
