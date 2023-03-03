const rabbitPlayer = {
  init: function (selector) {
    document.body.querySelectorAll(selector).forEach(function (player) {
      const video = player.querySelector(".player__video");
      const timeCurrent = player.querySelector(".player__controls__time__current");
      const timeDuration = player.querySelector(".player__controls__time__duration");
      const btnPlay = player.querySelector(".play");
      const btnStop = player.querySelector(".stop");
      const progress = player.querySelector(".player__progress");
      const btnFullscreen = player.querySelector(".player__fullscreen");
      const btnPip = player.querySelector(".player__pip");
      let playTriggered = false;

      rabbitPlayer.cues(video);

      // interval for tracking video progress
      let playingInterval;

      // btnPlay.addEventListener("click", function () {
      //   if (video.paused) {
      //     video.play();
      //     playTriggered = true;
      //   } else {
      //     video.pause();
      //     playTriggered = false;
      //   }
      // });
      // btnStop.addEventListener("click", function () {
      //   video.pause();
      //   video.currentTime = 0;
      //   updateTime();
      //   playTriggered = false;
      // });

      // // set duration time when video can start playing
      // video.addEventListener("canplay", function () {
      //   timeDuration.innerText = new Date(Math.round(video.duration) * 1000).toISOString().slice(14, 19);
      // });

      // // update current time
      // video.addEventListener("play", () => {
      //   trackProgress();
      // });
      video.addEventListener("ended", function () {
        trackProgress(false);
        playTriggered = false;
      });
      video.addEventListener("pause", function () {
        trackProgress(false);
      });

      // PROGRESS BAR
      // click and drag events
      progress.addEventListener("input", function () {
        video.pause();
        video.currentTime = (progress.value / 100) * video.duration;
        updateTime();
      });
      // when change is "committed" to value
      progress.addEventListener("change", function () {
        updateTime();
        if (playTriggered) {
          video.play();
        }
      });

      const trackProgress = function (track = true) {
        if (track) {
          playingInterval = window.setInterval(function () {
            updateTime();
          }, 50);
          console.log(video.buffered)
        } else {
          window.clearInterval(playingInterval);
        }
      };
      const updateTime = function () {
        progress.value = (video.currentTime / video.duration) * 100;
        timeCurrent.innerText = new Date(Math.round(video.currentTime) * 1000).toISOString().slice(14, 19);
      }

      // full screen
      btnFullscreen.addEventListener('change', (event) => {
        if (event.currentTarget.checked) {
          player.requestFullscreen();
        } else {
          document.exitFullscreen();
        }
      })
      player.addEventListener("fullscreenchange", function (event) {
        if (document.fullscreenElement) {
          btnFullscreen.checked = true;
        } else {
          btnFullscreen.checked = false;
        }
      });

      // picture in picture
      btnPip.addEventListener('change', (event) => {
        if (event.currentTarget.checked) {
          player.classList.add("pip")
        } else {
          player.classList.remove("pip")
        }
      })

    });
  },
  play: function () { },
  cues: function (video) {
    const track = video.getElementsByTagName('track')[0].track;
    console.log(track)
    // track.activeCues[0].line = -4;
  }
};

window.addEventListener(
  "DOMContentLoaded",
  function () {
    // rabbitPlayer.init(".player");
    const testVideo = new RabbitVideo("video", {
      controlsPosition: "overlay"
    });
  },
  { once: true }
);


class RabbitVideo {
  constructor(video, options = {}) {
    this.video = document.querySelector(video);
    this.options = {
      captions: true,
      controlsPosition: "bottom",
      ...options
    }
    this.playTriggered = false;
    this.build()
  }
  // Getter
  build() {

    const _this = this;

    // wrap video
    const wrapper = document.createElement('div');
    wrapper.classList.add("player");
    this.video.parentNode.insertBefore(wrapper, this.video);
    wrapper.appendChild(this.video);
    this.wrapper = wrapper;

    // controls
    const controls = `
    <div class="player__controls">
      <input type="range" class="player__progress" min="0" max="100" step="any" value="0" />
      <div class="player__controls__group">
        <button class="play">Play/Pause</button>
        <button class="stop">Stop</button>
        <div class="player__controls__time">
          <span class="player__controls__time__current">00:00</span>
          /
          <span class="player__controls__time__duration">00:00</span>
        </div>
      </div>
      <div class="player__controls__group">
        <button class="player__transcript">Transcript</button>
        <button class="player__captions">Captions</button>
        <label><input type="checkbox" name="fullscreen" class="player__fullscreen">Full screen</label>
        <label><input type="checkbox" name="picture-in-picture" class="player__pip">Picture in picture</label>
      </div>
    </div>
    `;
    _this.wrapper.insertAdjacentHTML("beforeend", controls);

    this.timeCurrent = _this.wrapper.querySelector(".player__controls__time__current");
    const timeDuration = _this.wrapper.querySelector(".player__controls__time__duration");
    const btnPlay = _this.wrapper.querySelector(".play");
    const btnStop = _this.wrapper.querySelector(".stop");
    this.progress = _this.wrapper.querySelector(".player__progress");
    const btnFullscreen = _this.wrapper.querySelector(".player__fullscreen");
    const btnPip = _this.wrapper.querySelector(".player__pip");

    // play button listener
    btnPlay.addEventListener("click", function(){
      if (_this.video.paused) {
        _this.play();
      } else {
        _this.pause(); 
      }
    });

    // stop button listener
    btnStop.addEventListener("click", function () {
      _this.pause(); 
      _this.video.currentTime = 0;
      // updateTime();
      _this.playTriggered = false;
    });

    // set duration time when video can start playing
    this.video.addEventListener("canplay", () => {
      timeDuration.innerText = new Date(Math.round(_this.video.duration) * 1000).toISOString().slice(14, 19);
    });

    // update current time
    this.video.addEventListener("play", () => {
      _this.trackProgress();
    });
  }

  play(){
     this.video.play();
     this.playTriggered = true;
  }
  pause(){
    this.video.pause();
    this.playTriggered = false;
  }
  trackProgress(){
    // if (track) {
      _this = this;
      playingInterval = window.setInterval(function () {
        _this.progress.value = (_this.video.currentTime / _this.video.duration) * 100;
        _this.timeCurrent.innerText = new Date(Math.round(_this.video.currentTime) * 1000).toISOString().slice(14, 19);
      }, 50);
    // } else {
    //   window.clearInterval(playingInterval);
    // }
  }
}