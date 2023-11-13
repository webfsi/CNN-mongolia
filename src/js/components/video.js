export default class VideoPlayer {
  constructor(elementOrSelector) {
    if (typeof elementOrSelector === "string") {
      this.container = document.querySelector(elementOrSelector);
    } else if (elementOrSelector instanceof Element) {
      this.container = elementOrSelector;
    } else {
      throw new Error("Expected a DOM Element or a string selector.");
    }

    this.video1 = this.container.querySelector('[data-video-click-stop]');
    this.video2 = this.container.querySelector('[data-video-click-play]');
    this.playBtn = this.container.querySelector('[data-video-click-playbtn2]');
    this.isSeeking = false;
  }

  init() {
    this.bindEvents();
  }

  bindEvents() {
    this.playBtn.addEventListener('click', () => this.handlePlayBtnClick());
    // this.video2.addEventListener('play', () => this.handleVideo2Play());
    // this.video2.addEventListener('pause', () => this.handleVideo2Pause());
    // this.video2.addEventListener('mousedown', () => {
    //   console.log('video mousedown')
    // });

    this.video2.addEventListener('play', () => {
      this.isSeeking = false;
      console.log('video play')
    });

    this.video2.addEventListener("seeked", () => {
      this.isSeeking = false;
      console.log('video seeked')
    });
    this.video2.addEventListener("seeking", () => {
      this.isSeeking = false;
      console.log('video seeking')
    });

    // this.video2.addEventListener('timeupdate', function () {
    //   // console.log('video timeupdate')
    // });
    // this.video2.addEventListener('mouseup', () => {
    //   console.log('video mouseup')
    // });
    this.video2.addEventListener('pause', () => {
      console.log('video pause')
      this.isSeeking = true;
      setTimeout(() => {

        this.handleVideo2Pause();
      }, 100);
    });
  }

  handlePlayBtnClick() {
    this.pauseVideo1();
    this.playVideo2();
    this.container.classList.add('is-play');
  }


  // handleVideo2Click() {
  //   if (this.video2.paused) {
  //     this.playVideo2();
  //   } else {
  //     this.reverseVideos();
  //   }
  // }

  // handleVideo2Play() {
  //   this.pauseVideo1();
  //   this.container.classList.add('is-play');
  // }

  handleVideo2Pause() {
    // console.log('paused1', this.video2.paused)


    if (this.isSeeking) {
      this.reverseVideos();
      // setTimeout(() => {
      //   console.log('paused2', this.video2.paused)
      //   if (this.video2.paused) this.reverseVideos();
      // }, 200)
    }
    // this.reverseVideos();
  }

  pauseVideo1() {
    this.video1.pause();
    this.video1.classList.add('is-paused-video');
    this.video1.classList.remove('is-play-video');
  }

  playVideo2() {
    const sourceElement = this.video2.querySelector('source[data-src]');
    if (!sourceElement.getAttribute('src')) {
      sourceElement.setAttribute('src', sourceElement.getAttribute('data-src'));
      this.video2.load();
    }
    this.video2.play();
    this.video2.muted = false;
    this.video2.classList.add('is-play-video');
    this.video2.classList.remove('is-paused-video');
  }

  reverseVideos() {
    this.video2.pause();
    this.video2.muted = true;
    this.video2.classList.remove('is-play-video');
    this.video2.classList.add('is-paused-video');

    this.video1.play();
    this.video1.classList.remove('is-paused-video');
    this.video1.classList.add('is-play-video');

    this.container.classList.remove('is-play');
  }
}

// Initialization example:
// const player = new VideoPlayer('.hero-wrap');
// player.init();
