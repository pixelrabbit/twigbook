const rabbitPlayer = {
  init: function (selector) {
    console.log("player.init");
    document.body.querySelectorAll(selector).forEach(function (player) {
      const video = player.querySelector(".player__video");
      const timeCurrent = player.querySelector(".player__controls__time__current");
      const timeDuration = player.querySelector(".player__controls__time__duration");
      const btnPlay = player.querySelector(".play");
      const btnStop = player.querySelector(".stop");
      const progress = player.querySelector(".player__progress");
      let playTriggered = false;

      // interval for tracking video progress
      let playingInterval;

      btnPlay.addEventListener("click", function () {
        if (video.paused) {
          video.play();
          playTriggered = true;
        } else {
          video.pause();
          playTriggered = false;
        }
      });
      btnStop.addEventListener("click", function () {
        video.pause();
        video.currentTime = 0;
        updateTime();
        playTriggered = false;
      });

      // set duration time when video can start playing
      video.addEventListener("canplay", function () {
        timeDuration.innerText = new Date(Math.round(video.duration) * 1000).toISOString().slice(14, 19);
      });

      // update current time
      video.addEventListener("play", () => {
        trackProgress();
      });
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
        if(playTriggered) {
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
      const updateTime = function(){
        progress.value = (video.currentTime / video.duration) * 100;
        timeCurrent.innerText = new Date( Math.round(video.currentTime) * 1000).toISOString().slice(14, 19);
      }
    });
  },
  play: function () {},
};

window.addEventListener(
  "DOMContentLoaded",
  function () {
    rabbitPlayer.init(".player");
  },
  { once: true }
);
