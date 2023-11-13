
import { BurgerMenuCloseAnimation } from './close-burger';

export default (gsap) => {
  const burgerBtns = document.querySelectorAll('[data-click-burger-btn]');

  burgerBtns.forEach(el => {
    const burgerMenuAnimation = new BurgerMenuCloseAnimation();
    el.addEventListener('click', () => {
      if (!burgerMenuAnimation.animationInProgress) {
        if (document.body.classList.contains('vs-b-menu')) {
          // clg("object");
        }
        else if (document.body.classList.contains('menu-opened--last')) {
          burgerMenuAnimation.animateClose();
        }
        else if (document.body.classList.contains('menu-opened--last') && document.body.classList.contains('hidden-b-menu')) {
          document.body.classList.remove('hidden-b-menu')
        }
        else if (!document.body.classList.contains('menu-opened--last') && !document.body.classList.contains('menu-opened')) {
          burgerMenuAnimation.animateOpen();
        }
      }
      // const burgerMenuAnimation = new BurgerMenuCloseAnimation();
      // burgerMenuAnimation.animateOpen();
      // If menu-opened class is present, remove it
      // if (document.body.classList.contains('menu-opened')) {
      //   animateBurgerBack(0);
      //   setTimeout(() => {
      //     document.body.classList.add('hidden-b-menu');
      //     document.body.classList.remove('menu-opened');
      //   }, 1200);
      // } else {
      //   // Otherwise, remove the hidden-b-menu class (if present)
      //   if (document.body.classList.contains('hidden-b-menu')) {
      //     document.body.classList.remove('hidden-b-menu');
      //   }

      //   // After 100ms, add the menu-opened class
      //   setTimeout(() => {
      //     document.body.classList.add('menu-opened');
      //     animateBurger(600);
      //     if (!document.querySelector('.b-menu').classList.contains('is-active')) {
      //       document.querySelector('.b-menu').classList.add('is-active');
      //     }
      //     if (!document.querySelector('.b-menu').classList.contains('is-current')) {
      //       document.querySelector('.b-menu').classList.add('is-current');
      //     }
      //   }, 100);
      // }


      //   function animateBurger(dur) {
      //     const burgerSubmenu = document.querySelector('.b-menu__subtitle');
      //     const burgerMenu = document.querySelector('.b-menu__text');
      //     setTimeout(() => {
      //       animStart(burgerSubmenu, '50px', 1, 0);
      //       animStart(burgerMenu, '100px', 1.5, 0.5);
      //     }, dur);

      //     function animStart(el, y, dur, del) {
      //       gsap.fromTo(el, {
      //         y: y,
      //         opacity: 0,
      //         pointerEvents: "none"
      //       },
      //         {
      //           y: '0px',
      //           opacity: 1,
      //           duration: dur,
      //           delay: del,
      //           pointerEvents: "auto",
      //           ease: "power2.out"
      //         });
      //     }
      //   }

      //   function animateBurgerBack(dur) {
      //     const burgerSubmenu = document.querySelector('.b-menu__subtitle');
      //     const burgerMenu = document.querySelector('.b-menu__text');
      //     setTimeout(() => {
      //       animStart(burgerSubmenu, '50px', 1, 0.5);
      //       animStart(burgerMenu, '100px', 1.5, 0);
      //     }, dur);

      //     function animStart(el, y, dur, del) {
      //       gsap.fromTo(el, {
      //         y: '0px',
      //         opacity: 1,
      //         pointerEvents: "auto"
      //       },
      //         {
      //           y: y,
      //           opacity: 0,
      //           duration: dur,
      //           delay: del,
      //           pointerEvents: "none",
      //           ease: "power2.out"
      //         });
      //     }
      //   }
    });
  });
};
