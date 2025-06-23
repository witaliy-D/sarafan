let menuToggle = false;

let toggles = document.querySelectorAll(".nav-menu__toggle");
Object.keys(toggles).forEach((index) => {

  let $menuToggle = toggles[index];

  $menuToggle.addEventListener("click", function () {
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

  $(".nav-menu__item-title").on('click', function () {
    if (window.innerWidth < 768 ) {
      $(this).next().toggleClass('active');
    }
  });

  $(window).on("resize", function () {
    if (window.innerWidth >= 768) {
      $('.nav-menu__item-list').removeClass('active');
    }
  });
});
