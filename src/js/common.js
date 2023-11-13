import setFullHeight from './helpers/setFullHeight';
import gsap from 'gsap';
import { GSDevTools } from "gsap-custom/GSDevTools";
import { SplitText } from "gsap-custom/SplitText";
import horizontal from "./components/horizontal";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import VideoPlayer from './components/video';
import VideoLoader from './components/video-loader';
import CursorMover from './components/cursor';
import MagneticButton from './components/magnetic-button';
import hub from './components/hub';
// import translate from './components/translate';
import header from './components/header';
import animation from './components/animation';
import animationHero from './components/animation-hero';
import splitTextSrc from './components/split-text';
import paralaxInit from './components/parallax';
import burgerFixChangeColor from './components/burger-fix-change-color';
import { VideoComponent } from './components/article-video-show';
import { splitTextBurger } from './components/functions-global';



import initCnnBar from './components/cnnBar';

import { isPortrait } from './utils';

gsap.registerPlugin(GSDevTools);
gsap.registerPlugin(ScrollTrigger);

const isMobile = window.innerWidth < 700;

export default () => {
	setFullHeight(); //Set VH variable for mobile safari 100VH, use scss mixin fullheight()

	splitTextBurger();

	// Перевірка, чи є елемент на сторінці
	// if (document.querySelector('.b-menu__text')) {
	// 	let mainText = document.querySelectorAll('.b-menu__text span');
	// 	let delay = 0; // Загальна затримка для кожного спана

	// 	mainText.forEach(el => {
	// 		let split = new SplitText(el, { type: "words, chars" });

	// 		gsap.from(split.chars, {
	// 			duration: 0.3,
	// 			opacity: 0,
	// 			// y: 100,
	// 			stagger: 0.05,
	// 			delay: delay, // Використання загальної затримки
	// 			ease: "power2.out"
	// 		});

	// 		delay += split.chars.length * 0.05; // Збільшення загальної затримки після кожного спана
	// 	});
	// }

	// This function will start the animation
	// Create the VideoComponent and pass the startAnimation as the callback
	const videoComponent1 = document.querySelector('[data-enter-page-first]');
	const videoComponent3 = document.body.classList.contains('user-visited');
	if (videoComponent1) {
		const startAnimation = () => {
			animationHero(gsap, ScrollTrigger, isMobile);
			ScrollTrigger.refresh();
		};

		const videoComponent2 = new VideoComponent('[data-enter-page-first]', startAnimation);
	} else if (videoComponent3) {
		animationHero(gsap, ScrollTrigger, isMobile);
	} else {
		animationHero(gsap, ScrollTrigger, isMobile);
	}

	// animation(gsap, ScrollTrigger);


	/////////////////////
	const burgerBtn = document.querySelector('.btn-burger');

	if (burgerBtn) {
		burgerBtn.addEventListener('mouseover', function () {
			const containerHub = closestAncestor(burgerBtn, '.container-hub');
			if (containerHub) {
				containerHub.classList.add('is-normal');
			}
		});

		burgerBtn.addEventListener('mouseout', function () {
			const containerHub = closestAncestor(burgerBtn, '.container-hub');
			if (containerHub) {
				containerHub.classList.remove('is-normal');
			}
		});
	}

	// Функція для знаходження найближчого батьківського елемента за даним селектором
	function closestAncestor(element, selector) {
		let currentElem = element;
		while (currentElem && !currentElem.matches(selector)) {
			currentElem = currentElem.parentElement;
		}
		return currentElem;
	}



	hub(gsap, ScrollTrigger, isMobile);
	// translate();
	header(gsap);

	animation(gsap, ScrollTrigger, isMobile); // animation(gsap, ScrollTrigger);

	// GSDevTools.create({animation: mapTL})

	horizontal();

	splitTextSrc(gsap, SplitText);

	document.querySelector('.hero-button')?.addEventListener("click", (e) => {
		e.preventDefault();

		if (window.lScroll) window.lScroll.scrollTo(`#part-1`, {
			offset: -100
		});
	});

	initCnnBar();

	paralaxInit(gsap, ScrollTrigger, isMobile, isPortrait);

	const cursorInstance = new CursorMover('[data-cursor-moving]');

	// const buttonEffect = new MagneticButton();
	new MagneticButton('[data-magnetic]');
	// setTimeout(() => {
	// }, 2000);
	// new VideoPlayer('[data-video-click]');

	const videoPlayerFind = document.querySelectorAll('[data-video-click]');
	videoPlayerFind.forEach(element => {
		const player = new VideoPlayer(element);
		player.init();
	});

	new VideoLoader();

	burgerFixChangeColor(gsap, ScrollTrigger);




};
