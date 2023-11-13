
import LocomotiveScroll from 'locomotive-scroll';

export default (isTouchDevice, ScrollTrigger, gsap) => {
  if (!isTouchDevice) {
    const lScroll = new LocomotiveScroll({
      el: document.querySelector('[data-scroll-container]'),
      smooth: true,
      gestureDirection: 'both',
      tablet: {
        smooth: false
      },
      mobile: {
        smooth: false
      }
    });

    window.lScroll = lScroll;

    lScroll.on('scroll', ({ limit, scroll }) => {
      const progress = scroll.y / limit.y;

      ScrollTrigger.update();

    });

    // tell ScrollTrigger to use these proxy methods for the ".smooth-scroll" element since Locomotive Scroll is hijacking things
    ScrollTrigger.scrollerProxy("[data-scroll-container]", {
      scrollTop(value) {
        return arguments.length
          ? lScroll.scrollTo(value, 0, 0)
          : lScroll.scroll.instance.scroll.y;
      }, // we do89n't have to define a scrollLeft because we're only scrolling vertically.
      getBoundingClientRect() {
        return {
          top: 0,
          left: 0,
          width: window.innerWidth,
          height: window.innerHeight,
        };
      },
      // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
      pinType: document.querySelector("[data-scroll-container]").style.transform
        ? "transform"
        : "fixed",
    });
  }

  window.lscrollObserver = new ResizeObserver(() => {
    if (window.lScroll) lScroll.update();
    ScrollTrigger.update();
    ScrollTrigger.refresh();
    // console.log('updateLscroll');
  }).observe(document.querySelector('[data-scroll-container]'));
}