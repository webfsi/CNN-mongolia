export default (gsap, ScrollTrigger, isMobile, isPortrait) => {
  document.querySelectorAll('.parallax-1').forEach((el) => {
    const TL = gsap.timeline({ paused: true });

    el.querySelectorAll('.fan-item').forEach((el, i) => {
      // TL.set(el, {
      // 	rotate: (i+1)*45,
      // }, '0')
      TL.to(el, {
        rotate: 45 + (i + 1) * 7.5,
        duration: 1,
        ease: 'none'
      }, '0')
    })

    TL.to('.parallax-1_pattern', {
      y: -100,
      duration: 1,
      ease: 'none'
    }, '0')

    // TL.to('.windturbine-2', {
    // 	y: 30,
    // 	duration: 1,
    // 	ease: 'none'
    // }, '0')

    ScrollTrigger.create({
      scroller: window.scroller,
      trigger: el,
      animation: TL,
      scrub: 1,
      onEnter: () => {
        console.log('entered');
      },
      start: "top bottom",
      end: "bottom top+=40%",
      pin: false,
      pinSpacing: false,
      markers: false,
    });

  });

  document.querySelectorAll('.parallax-2').forEach((el) => {
    const TL = gsap.timeline({ paused: true });

    TL.to(document.querySelectorAll('.parallax-2 .layer-left'), {
      x: isMobile ? -90 : -200,
      duration: 1,
      ease: isPortrait ? "power1.in" : 'none'
    }, '0')

    TL.to(document.querySelectorAll('.parallax-2 .layer-1'), {
      y: isMobile ? 30 : 70,
      duration: 1,
      ease: isPortrait ? "power1.in" : 'none'
    }, '0')

    TL.to(document.querySelectorAll('.parallax-2 .layer-4'), {
      y: isMobile ? 60 : 190,
      duration: 1,
      ease: isPortrait ? "power1.in" : 'none'
    }, '0')

    TL.to(document.querySelectorAll('.parallax-2 .layer-5'), {
      y: isMobile ? 75 : 240,
      duration: 1,
      ease: isPortrait ? "power1.in" : 'none'
    }, '0')

    TL.to(document.querySelectorAll('.parallax-2 .layer-2'), {
      y: isMobile ? 45 : 100,
      duration: 1,
      ease: isPortrait ? "power1.in" : 'none'
    }, '0')

    TL.to(document.querySelectorAll('.parallax-2 .layer-3'), {
      y: isMobile ? 50 : 140,
      duration: 1,
      ease: isPortrait ? "power1.in" : 'none'
    }, '0')

    ScrollTrigger.create({
      scroller: window.scroller,
      trigger: el,
      animation: TL,
      scrub: 0.5,
      onEnter: () => {
        console.log('entered2');
      },
      start: "top bottom",
      end: "bottom top+=30%",
      pin: false,
      pinSpacing: false,
      markers: false,
    });

  });
}