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
		this.wrapper = document.createElement('div');
		this.wrapper.classList.add("player");
		this.video.parentNode.insertBefore(this.wrapper, this.video);
		this.wrapper.appendChild(this.video);

		// controls
		const controls = `
    <div class="player__controls">
      <input type="range" class="player__progress" min="0" max="100" step="any" value="0" />

        <button class="play" aria-label="Play/pause">
          <svg height="20" width="20">
            <polygon class="icon--play" points="2,0 18,10 2,20" fill="#ffffff" />
			<g class="icon--pause" fill="#ffffff">
				<rect x="2" y="2" width="6" height="16" />
				<rect x="12" y="2" width="6" height="16" />
			</g>
          </svg>
        </button>
        <div class="player__controls__time">
          <span class="player__controls__time__current">00:00</span>&nbsp;/&nbsp;<span class="player__controls__time__duration">00:00</span>
        </div>
        <button class="player__transcript">Transcript</button>
        <button class="player__captions">Captions</button>
        <label><input type="checkbox" name="fullscreen" class="player__fullscreen">Full screen</label>
        <label><input type="checkbox" name="picture-in-picture" class="player__pip">Picture in picture</label>
    </div>
    `;
		_this.wrapper.insertAdjacentHTML("beforeend", controls);

		this.timeCurrent = this.wrapper.querySelector(".player__controls__time__current");
		this.timeDuration = this.wrapper.querySelector(".player__controls__time__duration");
		this.btnPlay = this.wrapper.querySelector(".play");
		const btnStop = this.wrapper.querySelector(".stop");
		this.progress = this.wrapper.querySelector(".player__progress");
		this.btnFullscreen = this.wrapper.querySelector(".player__fullscreen");
		const btnPip = this.wrapper.querySelector(".player__pip");

		// play button listener
		this.btnPlay.addEventListener("click",  () => {
			if (this.video.paused) {
				this.play();
			} else {
				this.pause();
			}
		});

		// stop button listener
		// btnStop.addEventListener("click", () => {
		// 	this.pause();
		// 	this.video.currentTime = 0;
		// 	this.progress.value = 0;
		// 	this.playTriggered = false;
		// });

		// set duration time when video can start playing
		this.video.addEventListener("canplay", () => {
			this.timeDuration.innerText = new Date(Math.round(_this.video.duration) * 1000).toISOString().slice(14, 19);
		});

		// video play event
		this.video.addEventListener("play", () => {
			// custom interval so progress bar is updated more frequently
			this.playingInterval = window.setInterval(() => {
				// console.log("playingInterval")
				this.progress.value = (this.video.currentTime / this.video.duration) * 100;
			}, 50);
			this.wrapper.classList.add("playing");
		});

		// video pause event
		this.video.addEventListener("pause", () => {
			// remove custom interval
			window.clearInterval(this.playingInterval);
			this.wrapper.classList.remove("playing");
		});

		// update time using time update, more efficient than interval
		this.video.addEventListener("timeupdate", (e) => {
			// console.log(e)
			_this.timeCurrent.innerText = new Date(Math.round(_this.video.currentTime) * 1000).toISOString().slice(14, 19);
		});

		// interaction with progress bar
		this.progress.addEventListener("input", () => {
			this.video.pause();
			this.video.currentTime = (this.progress.value / 100) * this.video.duration;

		});
		// when progress change is "committed" to value
		this.progress.addEventListener("change", () => {
			if (this.playTriggered) {
				this.video.play();
			}
		});
		// if video ends, remove playTrigger set to false
		this.video.addEventListener("ended", () => {
			this.playTriggered = false;
		});

		// full screen controls
		this.btnFullscreen.addEventListener('change', (event) => {
			if (event.currentTarget.checked) {
				this.wrapper.requestFullscreen();
			} else {
				document.exitFullscreen();
			}
		})
		this.wrapper.addEventListener("fullscreenchange", (event) => {
			if (document.fullscreenElement) {
				this.btnFullscreen.checked = true;
			} else {
				this.btnFullscreen.checked = false;
			}
		});
	}

	play() {
		this.video.play();
		this.playTriggered = true;
	}

	pause() {
		this.video.pause();
		this.playTriggered = false;
	}
}


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