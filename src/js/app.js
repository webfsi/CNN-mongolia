



import commonScripts from './common';
import gsap from 'gsap';
import LocomotiveScroll from 'locomotive-scroll';
import { BurgerMenuCloseAnimation } from './components/close-burger';
// import { VideoComponent } from './components/article-video-show';

import imagesLoaded from 'imagesloaded';

import { ScrollTrigger } from "gsap/ScrollTrigger";
import mapScript from './components/map';
gsap.registerPlugin(ScrollTrigger);

import { isTouchDevice } from './utils';
// import locomotiveInit from './components/locomotive-init';
// const videoComponent2 = new VideoComponent('[data-enter-page-first]');

// function handleFirstVisit() {
// 	const hasVisited = localStorage.getItem('visited');
// 	if (hasVisited) {
// 		document.body.classList.add('user-visited');
// 		const hiidenBlockFind = document.querySelector('[data-enter-page-first]');
// 		if (hiidenBlockFind) {
// 			const hiddenBlock = hiidenBlockFind.querySelector('.hub_two');
// 			hiddenBlock.style.display = 'none';
// 		}
// 	} else {
// 		localStorage.setItem('visited', 'true');
// 	}
// }
// handleFirstVisit();


window.scroller = !isTouchDevice ? '[data-scroll-container]' : window;

function stopAllVideosInMain() {
	const videos = document.querySelectorAll('video');
	videos.forEach(video => {
		video.pause();
	});
}

function isTouchDeviceInit() {
	if (isTouchDevice) {

		document.querySelectorAll('[data-scroll]').forEach((elem) => {
			const observer = new IntersectionObserver(entries => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						elem.classList.add('is-inview')
					}
				});
			})

			observer.observe(elem);
		})
	}

}

function locoFunct() {


	if (!isTouchDevice) {
		const lScroll = new LocomotiveScroll({
			el: document.querySelector('[data-scroll-container]'),
			smooth: true,
			gestureDirection: 'both',
			tablet: {
				smooth: false
			},
			mobile: {
				smooth: false
			}
		});

		window.lScroll = lScroll;

		lScroll.on('scroll', ({ limit, scroll }) => {
			const progress = scroll.y / limit.y;


			if (scroll.y > 0) {
				document.body.classList.add('fixed-locomotive');
			} else {
				document.body.classList.remove('fixed-locomotive');
			}

			ScrollTrigger.update();

		});

		// tell ScrollTrigger to use these proxy methods for the ".smooth-scroll" element since Locomotive Scroll is hijacking things
		ScrollTrigger.scrollerProxy("[data-scroll-container]", {
			scrollTop(value) {
				return arguments.length
					? lScroll.scrollTo(value, 0, 0)
					: lScroll.scroll.instance.scroll.y;
			}, // we do89n't have to define a scrollLeft because we're only scrolling vertically.
			getBoundingClientRect() {
				return {
					top: 0,
					left: 0,
					width: window.innerWidth,
					height: window.innerHeight,
				};
			},
			// LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
			pinType: document.querySelector("[data-scroll-container]").style.transform
				? "transform"
				: "fixed",
		});
	}

	window.lscrollObserver = new ResizeObserver(() => {
		if (window.lScroll) lScroll.update();
		ScrollTrigger.update();
		ScrollTrigger.refresh();
		// console.log('updateLscroll');
	}).observe(document.querySelector('[data-scroll-container]'));
}


function initializeScripts() {
	commonScripts();
	mapScript();
}

isTouchDeviceInit();



window.addEventListener('load', () => {
	// mainElement.innerHTML = newContent;
	locoFunct();
	initializeScripts();

	// const mainElement = document.body;
	// imagesLoaded(mainElement, function () {
	// initializeScripts();
	// 	lScroll.update();
	// });
	// locomotiveInit(isTouchDevice, ScrollTrigger, gsap);

});

const routes = {
	404: "./404.html",
	"/": "./index.html",

	"/vscodekey/": "/vscodekey/index.html",
	"/vscodekey/index.html": "/vscodekey/index.html",

	"/mongolia/": "/mongolia/index.html",
	"/mongolia/index.html": "/mongolia/index.html",

	"/untapped-potential": "/untapped-potential/index.html",
	"/the-mongol-identity": "/the-mongol-identity/index.html",
	"/untapped-potential/": "/untapped-potential/index.html",
	"/the-mongol-identity/": "/the-mongol-identity/index.html",

	"/vscodekey/untapped-potential": "/vscodekey/untapped-potential/about.html",
	"/vscodekey/untapped-potential/": "/vscodekey/untapped-potential/index.html",
	"/vscodekey/the-mongol-identity": "/vscodekey/the-mongol-identity/about.html",
	"/vscodekey/the-mongol-identity/": "/vscodekey/the-mongol-identity/index.html",

	"/mongolia/untapped-potential": "/mongolia/untapped-potential/about.html",
	"/mongolia/untapped-potential/": "/mongolia/untapped-potential/index.html",
	"/mongolia/the-mongol-identity": "/mongolia/the-mongol-identity/about.html",
	"/mongolia/the-mongol-identity/": "/mongolia/the-mongol-identity/index.html"
};

// hub untapped-potential = /vscodekey/untapped-potential
// art1 ../untapped-potential/ = /vscodekey/untapped-potential/

const path1 = window.location.pathname;
console.log(path1);
const route1 = routes[path1] || routes[404];
console.log(route1);

function handleLocation() {
	const path = window.location.pathname;
	console.log(path);
	if (path === "./index.html" || path === "/index.html" || path === "/vscodekey/index.html" || path === "/mongolia/index.html" || path === "/vscodekey/" || path === "/mongolia/") {
		window.location.reload();
		return;
	}
	const route = routes[path] || routes[404];
	loadContent(route);
	stopAllVideosInMain();
}

// var wheelOpt = supportsPassive ? { passive: false } : false;
// var wheelEvent = typeof window !== 'undefined' ? 'onwheel' in document.createElement('div') ? 'wheel' : 'mousewheel' : 'wheel';

// function preventDefault(e) {
// 	e.preventDefault();
// }

// var supportsPassive = false;
// try {
// 	window.addEventListener("test", null, Object.defineProperty({}, 'passive', {
// 		get: function () { supportsPassive = true; return '' }
// 	}));
// } catch (e) { }


// function disableScroll() {
// 	window.addEventListener('DOMMouseScroll', preventDefault, false); // older FF
// 	window.addEventListener(wheelEvent, preventDefault, wheelOpt); // modern desktop
// 	window.addEventListener('touchmove', preventDefault, wheelOpt); // mobile
// }

// disableScroll();

function loadContent(url) {
	fetch(url)
		.then(response => response.text())
		.then(data => {
			const parser = new DOMParser();
			const doc = parser.parseFromString(data, 'text/html');
			const newContent = doc.querySelector('[data-url]').innerHTML;
			// document.querySelector('mainUrl').innerHTML = newContent;
			// isTouchDeviceInit();
			const mainElement = document.querySelector('[data-url]');
			mainElement.innerHTML = newContent;

			if (window.lScroll) window.lScroll.scrollTo(0, { duration: 0, disableLerp: true, offset: 0 });

			imagesLoaded(mainElement, function () {
				isTouchDeviceInit();
				initializeScripts();
			});
		})
		.catch(error => {
			console.error('Error:', error);
		});
}

document.body.addEventListener('click', function (e) {
	const link = e.target.closest('[data-link-src]');
	if (link) {
		e.preventDefault();
		window.history.pushState({}, "", link.href);
		const visited = document.body.classList.contains('user-visited');
		if (!visited) {
			document.body.classList.add('user-visited');
		}
		if (link.hasAttribute('data-link-trs-to-page')) {
			document.body.classList.add('js-body-trs-to-page');
			window.scrollTo(0, 0);
		}
		const burgerMenuAnimation = new BurgerMenuCloseAnimation();
		burgerMenuAnimation.animateClose();
		handleLocation();
	}
});
// document.querySelectorAll('[data-link-src]').forEach(link => {
// 	link.addEventListener('click', function (e) {
// 		e.preventDefault();
// 		window.history.pushState({}, "", this.href);
// 		console.log(window.history.pushState({}, "", this.href));
// 		const visited = document.body.classList.contains('user-visited');
// 		if (!visited) {
// 			document.body.classList.add('user-visited');
// 		}
// 		// document.body.classList.add('click-inner-bl');
// 		// Now you can use the class in this file
// 		// if (link.closest('.b-menu')) {
// 		const burgerMenuAnimation = new BurgerMenuCloseAnimation();
// 		burgerMenuAnimation.animateClose();
// 		// }
// 		handleLocation();
// 	});
// });

window.onpopstate = handleLocation;


// handleLocation();