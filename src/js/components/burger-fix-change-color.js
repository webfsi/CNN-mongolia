export default (gsap, ScrollTrigger) => {
  const burger = document.querySelector('.burger-btns');
  if (!burger) return;
  const lightBlocks = document.querySelectorAll('[data-light-bl]');

  lightBlocks.forEach(lightBlock => {
    let offsets = lightBlock.getAttribute('data-light-bl').split(',').map(value => parseInt(value.trim()));
    let startOffset = offsets[0] || 0;
    let endOffset = offsets[1] || 0;

    let start = startOffset >= 0 ? `top+=${startOffset}` : `top+=${startOffset}`;
    let end = endOffset >= 0 ? `bottom+=${endOffset}` : `bottom+=${endOffset}`;

    gsap.to(burger, {
      scrollTrigger: {
        scroller: window.scroller,
        trigger: lightBlock,
        start: start,
        end: end,
        onEnter: () => burger.classList.add('dark-color'),
        onLeaveBack: () => burger.classList.remove('dark-color'),
        onLeave: () => burger.classList.remove('dark-color'),
        onEnterBack: () => burger.classList.add('dark-color')
      }
    });
  });
}