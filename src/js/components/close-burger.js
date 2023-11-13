import { gsap } from "gsap";
import { startGsapAnimation } from './functions-global.js';
export class BurgerMenuCloseAnimation {
  constructor() {
    this.animationInProgress = false;
    this.body = document.body;
    this.bMenu = document.querySelector('.b-menu');
    this.bgTranslateToInner = document.querySelector('.bg-tranlate-to-inner');
    this.bgTranslateToInnerOne = document.querySelector('.bg-tranlate-to-inner__one');
    this.bMenuSubtitle = document.querySelector('.b-menu__subtitle');
    this.bMenuText = document.querySelector('.b-menu__text');
    this.hubOne = document.querySelector('.hub_one');
    this.hubTwo = document.querySelector('.hub_two');
    this.openedMenu = document.querySelector('.menu-opened');
    this.openedMenuLast = document.querySelector('.menu-opened--last');
  }

  animateClose() {
    // Adjust classes on hub_one and hub_two
    // this.animationInProgress = false;
    this.body.classList.add('vs-b-menu');

    if (this.body.classList.contains('hidden-b-menu')) {
      this.body.classList.remove('hidden-b-menu');
    }

    if (this.hubOne && this.hubOne.classList.contains('is-active')) {
      this.hubOne.classList.remove('is-active');
      this.hubOne.classList.add('is-hidden');
    }

    if (this.hubTwo && this.hubTwo.classList.contains('is-active')) {
      this.hubTwo.classList.remove('is-active');
      this.hubTwo.classList.add('is-hidden');
    }

    this.body.classList.add('anim-close-b-menu-body');

    if (document.body.classList.contains('menu-opened')) {
      document.body.classList.remove('menu-opened');
    }
    if (document.body.classList.contains('menu-opened--last')) {
      document.body.classList.remove('menu-opened--last');
    }

    // Animation for .bg-tranlate-to-inner
    gsap.fromTo(this.bgTranslateToInner, {
      y: '0vh'
    }, {
      duration: 1,
      y: '130vh',
      onComplete: () => {
        // Add hidden-close-b-menu-body to body at the end of the animation
        this.body.classList.add('hidden-close-b-menu-body');


        setTimeout(() => {
          // this.resetAnimations();
          this.body.classList.remove('hidden-close-b-menu-body');
          this.body.classList.remove('anim-close-b-menu-body');
          // this.bMenu.classList.remove('anim-close-b-menu');
          this.body.classList.add('hidden-b-menu');
          this.body.classList.remove('vs-b-menu');
          if (this.body.classList.contains('js-body-trs-to-page')) {
            this.body.classList.remove('js-body-trs-to-page');
          }
          // this.animationInProgress = true;
        }, 500);
      }
    });

    // Other animations as previously defined...
    gsap.fromTo(this.bgTranslateToInnerOne, {
      opacity: 1
    }, {
      duration: 1,
      opacity: 0
    }, "<");  // at the same time as the previous animation

    gsap.fromTo(this.bMenuSubtitle, {
      y: '0',
      opacity: 1
    }, {
      delay: 0,
      duration: 0.4,
      y: '50px',
      opacity: 0
    });

    gsap.fromTo(this.bMenuText, {
      y: '0px',
      opacity: 1
    }, {
      delay: 0.1,
      duration: 0.4,
      y: '250px',
      opacity: 0
    });
  }

  animateOpen() {

    this.body.classList.add('vs-b-menu');
    setTimeout(() => {
      this.body.classList.add('js-logo-menu-anim');
    }, 200);
    setTimeout(() => {
      startGsapAnimation();
    }, 400);


    if (this.body.classList.contains('hidden-b-menu')) {
      this.body.classList.remove('hidden-b-menu');
    }

    // Add classes to body
    document.body.classList.add('menu-opened');

    // Animation for .bg-tranlate-to-inner
    gsap.fromTo(this.bgTranslateToInner, {
      y: '170vh',
    }, {
      duration: 1,
      y: '0vh',
      onComplete: () => {
        setTimeout(() => {
          this.body.classList.add('menu-opened--last');
          this.body.classList.remove('vs-b-menu');
          this.body.classList.remove('js-logo-menu-anim');
          // this.animationInProgress = false;
        }, 500);
      }
    });

    // Other animations...

    gsap.fromTo(this.bgTranslateToInnerOne, {
      opacity: 0
    }, {
      duration: 1,
      opacity: 1
    }, "<");

    gsap.fromTo(this.bMenuSubtitle, {
      y: '200px',
      opacity: 0
    }, {
      delay: 0.4,
      duration: 0.6,
      y: '0px',
      opacity: 1
    });

    gsap.fromTo(this.bMenuText, {
      y: '150px',
      opacity: 0
    }, {
      delay: 0.5,
      duration: 0.6,
      y: '0px',
      opacity: 1,
      onComplete: () => {
      }
    });

  }
}
