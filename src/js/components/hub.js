import { startGsapAnimation } from './functions-global.js';
export default (gsap, ScrollTrigger) => {
  //burger
  const menuHoverElem = document.querySelector('[data-menu-hover]');
  if (menuHoverElem) {
    const btns = menuHoverElem.querySelectorAll('[data-menu-hover-btn]');
    const imgs = menuHoverElem.querySelectorAll('[data-menu-hover-img]');

    btns.forEach((btn, index) => {
      btn.addEventListener('mouseenter', function () {
        imgs[index].classList.add('is-active');
      });

      btn.addEventListener('mouseleave', function () {
        imgs[index].classList.remove('is-active');
      });
    });
  }

  //hub
  // Перевірка чи є потрібні елементи на сторінці
  if (document.querySelector('.hub_one.is-active')) {

    const hubOne = document.querySelector('.hub_one');
    const videoElemOne = hubOne.querySelector('video');
    const timeElem = hubOne.querySelector('[data-video-time]');
    const hubTwo = document.querySelector('.hub_two');
    const videoElemTwo = hubTwo.querySelector('video');
    const soundBtn = hubTwo.querySelector('[data-video-sound]');
    let soundNextClicked = false;

    hubOne.classList.add('is-current');

    if (timeElem) {
      let time = parseInt(timeElem.getAttribute('data-video-time')) || 5;
      const countdown = setInterval(() => {
        if (time > 0) {
          time--;
          timeElem.textContent = time;
        } else {
          clearInterval(countdown);
          if (!soundNextClicked) {
            switchToHubTwo(false);
          }
        }
      }, 1000);
    }

    hubOne.querySelector('[data-video-sound-next]').addEventListener('click', () => {
      soundNextClicked = true;
      switchToHubTwo(true);
    });

    function switchToHubTwo(withSound) {
      hubOne.classList.add('is-current-anim');
      hubTwo.classList.add('is-active');
      hubTwo.classList.add('is-current');
      videoElemTwo.play();
      videoElemTwo.muted = !withSound;
      setTimeout(() => {
        hubOne.classList.remove('is-current-anim');
        hubOne.classList.remove('is-current');
        hubTwo.classList.add('is-current-anim');
      }, 600);
      setTimeout(() => {
        hubTwo.classList.remove('is-current-anim');
      }, 1200);
      if (withSound) {
        soundBtn.classList.add('is-active');
      } else {
        soundBtn.classList.remove('is-active');
      }
      setTimeout(() => {
        videoElemOne.pause();
      }, 1200);
    }

    videoElemTwo.addEventListener('ended', () => {
      switchToMenu();
    });

    hubTwo.querySelector('[data-video-skip]').addEventListener('click', () => {
      videoElemTwo.pause();
      switchToMenu();
    });

    soundBtn.addEventListener('click', () => {
      if (videoElemTwo.muted) {
        videoElemTwo.muted = false;
        soundBtn.classList.add('is-active');
      } else {
        videoElemTwo.muted = true;
        soundBtn.classList.remove('is-active');
      }
    });

    function switchToMenu() {
      hubTwo.classList.remove('is-current');
      const bMenu = document.querySelector('.b-menu');
      bMenu.classList.add('is-active');
      bMenu.classList.add('is-active-trs');
      setTimeout(() => {
        bMenu.classList.remove('is-active-trs');
      }, 1000);
      setTimeout(() => {
        bMenu.classList.add('is-current');
      }, 2000);
      animateBurger();
      animateText();

    }

    // Функція для анімації
    function animateText() {
      // Якщо батьківський елемент має клас js-menu-opened
      let mainText = document.querySelectorAll('.b-menu__text > span > div');
      mainText.forEach(el => {
        el.closest('.b-menu__text').classList.add('is-animate')
        if (el.closest('.b-menu').classList.contains('is-active')) {
          console.log("Object");
          const line = el.querySelectorAll('div')
          gsap.fromTo(el, {
            y: '100%',
          },
            {
              duration: 0.6,
              y: '0%',
              stagger: 0.1, // Поступова анімація кожного слова з інтервалом у 0.1 секунди
              ease: "power2.out"
            });
        }

      });
    }


    function animateBurger() {
      const burgerSubmenu = document.querySelector('.b-menu__subtitle');
      const burgerMenu = document.querySelector('.b-menu__text');
      setTimeout(() => {
        animStart(burgerSubmenu, '50px', 1, 0);
        animStart(burgerMenu, '100px', 1.5, 0.5);
        startGsapAnimation();
      }, 1200);


      function animStart(el, y, dur, del) {
        gsap.fromTo(el, {
          y: y,
          opacity: 0,
          pointerEvents: "none"
        },
          {
            y: '0px',
            opacity: 1,
            duration: dur,
            delay: del,
            pointerEvents: "auto",
            ease: "power2.out"
          });
      }
    }
  }







  // function animateBurger() {
  //   const burgerSubmenu = document.querySelector('.b-menu__subtitle');
  //   if (!burgerSubmenu) return;
  //   const burgerMenu = document.querySelector('.b-menu__text');
  //   setTimeout(() => {
  //     animStart(burgerSubmenu);
  //     animStart(burgerMenu);
  //   }, 1200);
  //   function animStart(el) {
  //     gsap.fromTo(el, {
  //       y: '50px',
  //       opacity: 1,
  //     },
  //       {
  //         y: '0px',
  //         opacity: 1,
  //         duration: 1,
  //         ease: "power2.out"
  //       });
  //   }
  // }

  // const hubOne = document.querySelector('.hub_one');
  // hubOne.classList.add('is-current');

  // setTimeout(() => {
  //   const videoElemOne = hubOne.querySelector('video');
  //   const hubTwo = document.querySelector('.hub_two');
  //   const videoElemTwo = hubTwo.querySelector('video');
  //   let timeElem = hubOne.querySelector('[data-video-time]');
  //   let time = parseInt(timeElem.getAttribute('data-video-time'));
  //   const countdown = setInterval(() => {
  //     if (time > 0) {
  //       time--;
  //       timeElem.textContent = time;
  //     } else {
  //       clearInterval(countdown);
  //       // Stop and unload the video in hub_one
  //       videoElemOne.pause();
  //       videoElemOne.querySelector('source').removeAttribute('src'); // remove the source
  //       videoElemOne.load(); // this will release the video file

  //       // Start hub_two actions
  //       hubTwo.classList.add('is-active');
  //       videoElemTwo.play();
  //     }
  //   }, 1000);

  //   // Add is-active to hub_one

  //   // Start countdown

  //   // Handle video end
  //   videoElemTwo.addEventListener('ended', () => {
  //     document.querySelector('.b-menu').classList.add('is-active');
  //     animateBurger();
  //     setTimeout(() => {
  //       hubTwo.classList.remove('is-active');
  //     }, 600);
  //     setTimeout(() => {
  //       document.querySelector('.b-menu').classList.add('is-current');
  //     }, 1200);
  //   });

  //   // Handle skip video
  //   hubTwo.querySelector('[data-video-skip]').addEventListener('click', () => {
  //     videoElemTwo.pause();
  //     document.querySelector('.b-menu').classList.add('is-active');
  //     animateBurger();
  //     setTimeout(() => {
  //       hubTwo.classList.remove('is-active');
  //     }, 600);
  //     setTimeout(() => {
  //       document.querySelector('.b-menu').classList.add('is-current');
  //     }, 1200);
  //   });

  //   // Handle toggle sound
  //   hubTwo.querySelector('[data-video-sound]').addEventListener('click', () => {
  //     if (videoElemTwo.muted) {
  //       videoElemTwo.muted = false;
  //       hubTwo.classList.add('is-active'); // Add class if sound is on
  //     } else {
  //       videoElemTwo.muted = true;
  //       hubTwo.classList.remove('is-active'); // Remove class if sound is off
  //     }
  //   });

  // }, 5000);

  // //hub
  // setTimeout(() => {
  //   const hubTwo = document.querySelector('.hub_two');
  //   const videoElem = hubTwo.querySelector('video');

  //   // Add is-active to hub_two after 5 seconds
  //   hubTwo.classList.add('is-active');

  //   // Start the video
  //   videoElem.play();


  //   function animateBurger() {
  //     const burgerSubmenu = document.querySelector('.b-menu__subtitle');
  //     if (!burgerSubmenu) return;
  //     const burgerMenu = document.querySelector('.b-menu__text');
  //     setTimeout(() => {
  //       animStart(burgerSubmenu);
  //       animStart(burgerMenu);
  //     }, 1200);
  //     function animStart(el) {
  //       gsap.fromTo(el, {
  //         y: '50px',
  //         opacity: 1,
  //       },
  //       {
  //         y: '0px',
  //         opacity: 1,
  //         duration: 1,
  //         ease: "power2.out"
  //       });
  //     }
  //   }

  //   // Handle video end
  //   videoElem.addEventListener('ended', () => {
  //     document.querySelector('.b-menu').classList.add('is-active');
  //     animateBurger();
  //     setTimeout(() => {
  //       hubTwo.classList.remove('is-active');
  //     }, 600);
  //     setTimeout(() => {
  //       document.querySelector('.b-menu').classList.add('js-menu-opened');
  //     }, 1200);
  //   });

  //   // Handle skip video
  //   hubTwo.querySelector('[data-video-skip]').addEventListener('click', () => {
  //     videoElem.pause(); // or videoElem.stop() depending on your need
  //     document.querySelector('.b-menu').classList.add('is-active');
  //     animateBurger();
  //     setTimeout(() => {
  //       hubTwo.classList.remove('is-active');
  //     }, 600);
  //     setTimeout(() => {
  //       document.querySelector('.b-menu').classList.add('js-menu-opened');
  //     }, 1200);
  //   });

  //   // Handle toggle sound
  //   hubTwo.querySelector('[data-video-sound]').addEventListener('click', () => {
  //     if (videoElem.muted) {
  //       videoElem.muted = false;
  //     } else {
  //       videoElem.muted = true;
  //     }
  //   });

  // }, 5000);
}