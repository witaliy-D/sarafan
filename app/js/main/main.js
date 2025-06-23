(() => {
  // src/js/utility/util.js
  var isHTMLElement = (val) => val instanceof HTMLElement;

  // src/components/scroll-offset/scroll-offset.js
  var SOList = [];
  function scrollOffsetEscape(e) {
    if (e.key === "Escape") {
      const $root = SOList[SOList.length - 1];
      const event = new CustomEvent("scrollOffsetClose", { detail: { target: $root } });
      $root.dispatchEvent(event);
    }
  }
  window.addEventListener("scrollOffsetOpen", (e) => {
    const data = e.detail;
    if (data && data.target && isHTMLElement(data.target)) {
      SOList.push(data.target);
      if (SOList.length === 1) {
        document.body.classList.add("scroll-offset");
        window.addEventListener("keyup", scrollOffsetEscape);
      }
    }
  });
  window.addEventListener("scrollOffsetClose", (e) => {
    const data = e.detail;
    if (data && data.target && isHTMLElement(data.target)) {
      const index = SOList.indexOf(data.target);
      if (index > -1) SOList.splice(index, 1);
      if (SOList.length === 0) {
        document.body.classList.remove("scroll-offset");
        window.removeEventListener("keyup", scrollOffsetEscape);
      }
    }
  });
  window.addEventListener("scrollOffsetAllClose", () => {
    while (SOList.length > 0) {
      const $item = SOList.pop();
      const event = new CustomEvent("scrollOffsetClose", { detail: { target: $item } });
      $item.dispatchEvent(event);
    }
  });
  var addStyleOffset = document.createElement("style");
  var bodyWidth = window.innerWidth - document.documentElement.getBoundingClientRect().width;
  window.addEventListener("scrollOffsetOpen", () => {
    addStyleOffset.innerHTML = ":root { --scroll-offset-init: " + bodyWidth + "px; }";
    document.head.appendChild(addStyleOffset);
  }, { once: true });
  window.addEventListener("resize", () => {
    if (!document.body.classList.contains("scroll-offset")) {
      bodyWidth = window.innerWidth - document.documentElement.getBoundingClientRect().width;
      addStyleOffset.innerHTML = ":root { --scroll-offset-init: " + bodyWidth + "px; }";
    }
  });

  // src/js/plugins/lazy.js
  var lazyLoadInstance = new LazyLoad();

  // src/js/plugins/wow.js
  new WOW().init();

  // src/template/header/header.js
  var menuToggle = false;
  var toggles = document.querySelectorAll(".nav-menu__toggle");
  Object.keys(toggles).forEach((index) => {
    let $menuToggle = toggles[index];
    $menuToggle.addEventListener("click", function() {
      document.querySelector(".nav-menu").classList.toggle("nav-menu--open");
      $menuToggle.classList.toggle("burger--close");
      if (!menuToggle) {
        menuToggle = true;
        const event = new CustomEvent("scrollOffsetOpen", { detail: { target: $menuToggle } });
        window.dispatchEvent(event);
      } else {
        menuToggle = false;
        const event = new CustomEvent("scrollOffsetClose", { detail: { target: $menuToggle } });
        window.dispatchEvent(event);
      }
    });
    function menuClose() {
      document.querySelector(".nav-menu").classList.remove("nav-menu--open");
      $menuToggle.classList.remove("burger--close");
      const event = new CustomEvent("scrollOffsetClose", { detail: { target: $menuToggle } });
      window.dispatchEvent(event);
      menuToggle = false;
      return false;
    }
    $menuToggle.addEventListener("scrollOffsetClose", menuClose);
    $(".nav-menu__item-title").on("click", function() {
      if (window.innerWidth < 768) {
        $(this).next().toggleClass("active");
      }
    });
    $(window).on("resize", function() {
      if (window.innerWidth >= 768) {
        $(".nav-menu__item-list").removeClass("active");
      }
    });
  });

  // src/pages/main/rent/rent.js
  var newsSlider = new Swiper(".rent__slider", {
    watchOverflow: true,
    slidesPerView: 1,
    spaceBetween: 46,
    breakpoints: {
      640: {
        slidesPerView: 2
      },
      992: {
        slidesPerView: 3
      },
      1200: {
        slidesPerView: 2
      },
      1480: {
        slidesPerView: 3
      }
    },
    navigation: {
      nextEl: ".rent .swiper-button-next",
      prevEl: ".rent .swiper-button-prev"
    },
    pagination: {
      el: ".rent .swiper-pagination",
      clickable: true
    }
  });

  // src/pages/main/rent-info/rent-info.js
  $("[data-round]").each((e, t) => {
    ScrollTrigger.create({
      trigger: t,
      start: "center 95%",
      onEnter: () => {
        let e2 = Number(t.dataset.number), a = Number(t.dataset.round) || 0, i = Number(t.dataset.duration) || 4e3;
        anime({
          targets: t,
          innerHTML: [a, e2],
          easing: "linear",
          round: 1,
          duration: i
        });
      },
      once: true,
      markers: false
    });
  });
})();
