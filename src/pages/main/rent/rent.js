const newsSlider = new Swiper('.rent__slider', {
  watchOverflow: true,
  slidesPerView: 1,
  spaceBetween: 46,
  breakpoints: {
    640: {
      slidesPerView: 2,
    },
    992: {
      slidesPerView: 3,
    },
    1200: {
      slidesPerView: 2,
    },
    1480: {
      slidesPerView: 3,
    },
  },
  navigation: {
    nextEl: '.rent .swiper-button-next',
    prevEl: '.rent .swiper-button-prev',
  },
  pagination: {
    el: ".rent .swiper-pagination",
    clickable: true,
  },
});
