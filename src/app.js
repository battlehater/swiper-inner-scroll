import "swiper/swiper-bundle.min.css";
import Swiper, { Mousewheel, FreeMode } from "swiper";
import SmoothScrollbar from "smooth-scrollbar";

const swiper = new Swiper(".swiper", {
  modules: [Mousewheel, FreeMode],
  slidesPerView: 1,
  mousewheel: {
    sensitivity: 0.2,
    forceToAxis: true,
  },
  direction: "vertical",
  // freeMode: true,
});

swiper.on("slideChangeTransitionEnd", function () {
  var acs = document.querySelectorAll(".swiper-slide-active")[0];
  var hasVerticalScrollbar = acs.scrollHeight > acs.clientHeight;

  if (hasVerticalScrollbar) {
    var scrollHeight = acs.scrollHeight;
    var slideSize = acs.swiperSlideSize;
    var scrollDifferenceTop = scrollHeight - slideSize;

    acs.addEventListener("wheel", findScrollDirectionOtherBrowsers);

    function findScrollDirectionOtherBrowsers(event) {
      var scrollDifference = scrollHeight - slideSize - acs.scrollTop;

      // Scroll wheel browser compatibility
      var delta = event.wheelDelta || -1 * event.deltaY;

      // Enable scrolling if at edges
      var spos = delta < 0 ? 0 : scrollDifferenceTop;

      if (!(scrollDifference == spos)) swiper.mousewheel.disable();
      else swiper.mousewheel.enable();
    }
  }
});

document.querySelectorAll(".smooth-scrollbar").forEach((container) => {
  SmoothScrollbar.init(container, {
    continuousScrolling: true,
  });
});
