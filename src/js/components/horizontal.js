import gsap from 'gsap';
// const imagesLoaded = require('imagesloaded');

import { ScrollTrigger } from "gsap/ScrollTrigger";
import { GSDevTools } from "gsap-custom/GSDevTools"
import { isPortrait } from '../utils';
// let { isPortrait } = utils;

const isMobile = window.innerWidth < 1024;

gsap.registerPlugin(ScrollTrigger);
gsap.registerPlugin(GSDevTools);

class Component {
  constructor({ element, useScrollWidth }) {
    this.element = element;
    this.useScrollWidth = useScrollWidth;
  }

  init() {

    this.animate();
  }

  parallax = function () {
    var self = this;

    var x = self.scrollLimit * self.progress;
    var viewPortMiddle = x + window.innerWidth / 2;
    // var viewPortMiddle = x + window.innerWidth;

    this.$parallax.each(function (index, el) {
      var $wrap = $(this).wrap();
      const triggerOffset = el.dataset.offsetTrigger ? Number(el.dataset.offsetTrigger) : 0.5;
      const viewportOffset = el.dataset.offsetViewport ? Number(el.dataset.offsetViewport) : 0.5;
      const speed = el.dataset.speed ? Number(el.dataset.speed) : 0.5;

      if (el.dataset.offsetViewport) {
        viewPortMiddle = x + window.innerWidth * viewportOffset;
      }
      var elemMiddle = $wrap.offset().left + (el.offsetWidth * triggerOffset) + x;
      // var elemMiddle = $wrap.offset().left + x;

      var delta = (viewPortMiddle - elemMiddle) * speed;

      el.style.transform = 'translate3d(' + delta + 'px, 0, 0) scale(1)';
    });
  }

  animate() {
    const horizontal = this.element;
    const horizontalWrap = horizontal.querySelector('[data-horizontal-img-wrap]');
    const horizontalImg = horizontal.querySelector('[data-horizontal-img]');

    this.horizontalAnimation = gsap.timeline({ paused: true });

    const xValue = this.useScrollWidth ? (horizontalImg.scrollWidth - horizontalImg.offsetWidth) : -(horizontalImg.offsetWidth - horizontalWrap.offsetWidth);

    this.horizontalAnimation
      .to(horizontalImg, {
        x: -(xValue + (Number(horizontal.dataset.offset) || 0)),
        duration: 1,
        ease: 'none'
      })

    const trigger = ScrollTrigger.create({
      scroller: window.scroller,
      trigger: horizontal,
      animation: this.horizontalAnimation,
      scrub: 0.5,
      onEnter: () => {
        console.log('entered');
      },
      start: "top top",
      end: this.useScrollWidth ? "+=400%" : "+=200%",
      // onUpdate: (self) => console.log(self),
      pin: true,
      pinSpacing: true,
      markers: false,
    });

    const images = horizontal.querySelectorAll('img');

    images.length && images.forEach((function (e) {
      var observer = new IntersectionObserver(function (entries) {
        if (!entries[0].isIntersecting) {
          // console.log('Elvis has LEFT the building ');
        }
        else {
          gsap.fromTo(e, {
            scale: 1.35
          }, {
            scale: 1,
            duration: 2,
            ease: "power3",
            force3D: !0,
          })

          observer.unobserve(e);
        }
      });

      observer.observe(e)
    }))

    document.querySelector('.btn-right').addEventListener("click", (e) => {
      e.preventDefault();

      const koef = (trigger.end - trigger.start) / xValue;

      if (window.lScroll) window.lScroll.scrollTo(document.querySelector('.horizontal-section').offsetTop + (document.querySelector('.event-2').offsetLeft + 130) * koef, {
        offset: -50
      });
    });
  }
}

export default function () {

  const componentElement = document.querySelectorAll('[data-horizontal]');

  componentElement.forEach((el) => {
    // if(isMobile) {
    //     $(el).find('picture').removeClass('is-inline');
    // }

    if (!(isPortrait)) {

      let component = new Component({
        element: el,
        useScrollWidth: el.dataset.usw || false
      });

      component.init();
    }
  })
}
