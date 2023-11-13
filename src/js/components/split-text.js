export default (gsap, SplitText) => {
  document.querySelectorAll('[data-split], .section-title').forEach((el) => {

    let splitInner;

    splitInner = new SplitText(el, { type: "lines", linesClass: "splitted-line-inner" });

    let charsSplit;

    const type = el.dataset.type ? el.dataset.type : '';

    if (type != 'title') {
      setTimeout(() => {
        charsSplit = new SplitText(el, { type: "lines, words", linesClass: "splitted-line" });

        gsap.set(splitInner.lines, {
          yPercent: 130,
          opacity: 0
        })

      }, 0)
    } else {
      setTimeout(() => {
        charsSplit = new SplitText(el, { type: "chars", linesClass: "splitted-line" });

        gsap.set(charsSplit.chars, {
          yPercent: 100,
          opacity: 0,
        })
      }, 0)
    }

    var observer = new IntersectionObserver(function (entries) {
      if (entries[0].isIntersecting) {

        if (type == 'title') {
          gsap
            .to(charsSplit.chars, {
              yPercent: 0,
              opacity: 1,
              ease: "expo.out",
              stagger: .05,
              duration: 1,
              visibility: "visible",
              delay: 0.1
            })
        } else {
          gsap
            .to(splitInner.lines, {
              yPercent: 0,
              duration: 1,
              stagger: 0.2,
              ease: "expo.out",
              delay: 0.1,
              opacity: 1
            })
        }

        observer.unobserve(el);
      }
    }, {
      threshold: 0.05,
    });

    observer.observe(el)
  })
}