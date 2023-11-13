
export default (gsap, ScrollTrigger, isMobile) => {
  const heroTL = gsap.timeline({
    paused: true, onComplete: () => {

      const heroOutTL = gsap.timeline({ paused: true });

      document.querySelector('.hero-wrap')?.classList.add('-completed');

      heroOutTL
        .to('.hero-bg-inner', {
          y: 200,
          duration: 1,
          ease: 'none'
        }, '0')
        .to('.hero-fg-inner', {
          y: 100,
          duration: 1,
          ease: 'none'
        }, '0')
        .to('.hero-text', {
          opacity: 0,
          scale: 1.2,
          duration: 0.5
        }, '0')
        .to('.hero-text h1 span', {
          // opacity: 0,
          scale: 1.5,
          duration: 0.5
        }, '0')


      ScrollTrigger.create({
        scroller: window.scroller,
        trigger: document.querySelector('.hero-wrap'),
        animation: heroOutTL,
        scrub: true,
        start: "top top",
        end: "bottom top",
      });
    }
  });

  const easeHub = 'Power2.easeInOut';

  // const isSmallHeightTablet = window.innerWidth >= 1024 && window.innerHeight < 700;
  const isSmallHeightTablet = window.innerWidth >= 320 && window.innerHeight < 700;

  const xClip = isMobile ? '15px' : '2%';
  const bottomClip = isMobile ? '4%' : isSmallHeightTablet ? '14%' : '12%';
  // const topClip = isSmallHeightTablet ? '19%' : '16%';
  const topClip = isSmallHeightTablet ? '21%' : '16%';

  const heroFg = document.querySelector('.hero-fg');


  if (heroTL) {
    heroTL
      .to(document.querySelectorAll('.hero-bg-inner'), {
        scale: 1,
        y: 0,
        ease: easeHub,
        duration: 2,
      }, '0')
      .to(document.querySelectorAll('.hero-text'), {
        opacity: 1,
        y: 0,
        ease: easeHub,
        delay: 0.2,
        duration: 1.8,
      }, '0')
      .to(document.querySelector('.hero-fg'), {
        clipPath: `inset(${topClip} ${xClip} ${bottomClip} ${xClip})`,
        webkitClipPath: `inset(${topClip} ${xClip} ${bottomClip} ${xClip})`,
        duration: 2,
        scale: 1,
        ease: easeHub,
        onUpdate: () => {
          heroFg?.offsetWidth;
        }
      }, '0')
      .to(document.querySelector('.hero-fg-noj'), {
        duration: 2,
        scale: 1,
        ease: easeHub,
        onUpdate: () => {
          heroFg?.offsetWidth;
        }
      }, '0')
      .to(document.querySelectorAll('.hero-bg'), {
        clipPath: `inset(${topClip} ${xClip} ${bottomClip} ${xClip} round 24px)`,
        webkitClipPath: `inset(${topClip} ${xClip} ${bottomClip} ${xClip} round 24px)`,
        duration: 2,
        scale: 1,
        ease: easeHub
      }, '0')
      .to(document.querySelectorAll('.hero-fg-inner'), {
        scale: 1,
        duration: 2,
        y: '5%',
        ease: easeHub
      }, '0')
      .to(document.querySelectorAll('.hero-logo'), {
        opacity: 1,
        duration: 1,
        delay: 1.3,
      }, '0')
      .to(document.querySelectorAll('.hero-button'), {
        scale: 1,
        opacity: 1,
        duration: 0.8,
        delay: 1.3,
        ease: easeHub
      }, '0')

    heroTL.play();
  }
}


