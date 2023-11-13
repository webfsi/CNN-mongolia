
export default (gsap, ScrollTrigger, isMobile) => {
  if (isMobile) document.querySelector('.btn-round').classList.add('hover');



  // GSDevTools.create({animation: heroTL})

  ScrollTrigger.create({
    scroller: window.scroller,
    trigger: document.querySelector('#map-wrapper'),
    scrub: true,
    onEnter: () => {
      // console.log('entered');
    },
    start: "top top",
    end: isMobile ? "+=20%" : "+=200%",
    pin: true,
    pinSpacing: true,
    markers: false,
  });

  const mapTL = gsap.timeline({
    paused: true, onComplete: () => {
      if (window.lScroll) window.lScroll.start();
    }
  });

  mapTL.to('.map-transition .section-title', {
    opacity: 0,
    duration: 1,
    scale: 1.3,
    transformOrigin: 'center bottom'
  }, '0')

  mapTL.to('.map-transition_bg', {
    y: '-52%',
    duration: 1,
  }, '0')

  mapTL.to('.map-transition_fg', {
    opacity: 1,
    duration: 1,
    y: 0,
  }, '0')

  mapTL.to('.map-transition', {
    x: '-9%',
    y: '3%',
    scale: 1.78,
    opacity: 0,
    duration: 1,
  }, '1')

  mapTL.to('#map-mongolia', {
    x: '0%',
    scale: 1,
    opacity: 1,
    duration: 1,
  }, '1')

  mapTL.to('.map-locations-holder', {
    x: '0',
    duration: 0.5,
  }, '1.9')

  ScrollTrigger.create({
    scroller: window.scroller,
    trigger: document.querySelector('.map-outer'),
    scrub: true,
    onEnter: () => {
      console.log('entered map');

      if (window.lScroll) window.lScroll.stop();

      mapTL.play();
    },
    start: isMobile ? "top-=60px top" : "top+=300px top",
    end: "bottom top",
    pin: false,
    pinSpacing: false,
    markers: false,
    once: true,
  });
}