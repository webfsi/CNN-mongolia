import { ScrollTrigger } from "gsap/ScrollTrigger";
import { gsap } from "gsap";

gsap.registerPlugin(ScrollTrigger);

export default class VideoLoader {
  constructor() {
    this.videoLoadTrigger = document.querySelector('[data-video-load]');
    if (!this.videoLoadTrigger) return;

    this.videoPreloadElements = document.querySelectorAll('[data-video-preload]');
    this.init();
  }

  init() {
    const st = ScrollTrigger.create({
      trigger: this.videoLoadTrigger,
      start: "bottom+=300px bottom",
      scroller: window.scroller,
      onEnter: this.loadAndPlayVideos.bind(this),
      once: true
    });

    // if (st.isActive) {
    //   this.loadAndPlayVideos();
    // }
  }

  loadAndPlayVideos() {
    this.videoPreloadElements.forEach(videoBlock => {
      const source = videoBlock.querySelector('source');
      if (videoBlock && videoBlock.parentNode && !source.getAttribute('src')) {
        source.setAttribute('src', source.getAttribute('data-src'));
        // setTimeout(() => {
        videoBlock.load();
        videoBlock.play();
        // setTimeout(() => {
        //   ScrollTrigger.update();
        //   ScrollTrigger.refresh();
        // }, 2000);
        // }, 1000);
      }
      videoBlock.addEventListener('error', function (e) {
        console.error("Error loading video:", e.target.error);
      });
    });
  }
}
