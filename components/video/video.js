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

		// wrap video
		this.player = document.createElement('div');
		this.player.classList.add("player");
		this.video.parentNode.insertBefore(this.player, this.video);
		this.player.appendChild(this.video);

		// controls
		const controls = `
    <div class="player__controls">
      <input type="range" class="player__progress" min="0" max="100" step="any" value="0" />

        <button class="player__play" aria-label="Play/pause">
          <svg height="20" width="20">
            <polygon class="icon--play" points="2,0 18,10 2,20" fill="#ffffff" />
			<g class="icon--pause" fill="#ffffff">
				<rect x="2" y="2" width="6" height="16" />
				<rect x="12" y="2" width="6" height="16" />
			</g>
			<g class="icon--buffering" fill="#ffffff">
				<circle cx="4"  cy="10" r="2" />
				<circle cx="10"  cy="10" r="2" />
				<circle cx="16"  cy="10" r="2" />
			</g>
          </svg>
        </button>
        <div class="player__controls__time">
          <span class="player__controls__time__current">00:00</span>&nbsp;/&nbsp;<span class="player__controls__time__duration">00:00</span>
        </div>
		<div class="player__volume">
			<input class="player__volume__range" type="range" min="0" max="1" step="0.1" value="1" /> 
		</div>
        <button class="player__transcript">Transcript</button>
        <button class="player__captions">
			<svg height="20" width="20">
				<rect x="1" y="3" width="18" height="14" fill="transparent" stroke-width="2" stroke="#ffffff"/>
			</svg>
		</button>
        <button class="player__fullscreen">
			<svg height="20" width="20">
				<g class="icon--expand" fill="#ffffff">
					<polygon points="1,1 7,1 5,3 8,6 6,8 3,5 1,7" />
					<polygon points="20,1 20,7 18,5 15,8 13,6 16,3 14,1" />
					<polygon points="20,20 14,20 16,18 13,15 15,13 18,16 20,14" />
					<polygon points="1,20 1,14 3,16 6,13 8,15 5,18 7,20" />
				</g>
				<g class="icon--collapse" fill="#ffffff">
					<polygon points="3,1 6,4 8,2 8,8 2,8 4,6 1,3" />
					<polygon points="13,8 13,2 15,4 18,1 20,3 17,6 19,8" />
					<polygon points="13,13 19,13 17,15 20,18 18,20 15,17 13,19" />
					<polygon points="8,13 8,19 6,17 3,20 1,18 4,15 2,13" />
				</g>
			</svg>
		</button>
    </div>
    `;
		this.player.insertAdjacentHTML("beforeend", controls);

		this.timeCurrent = this.player.querySelector(".player__controls__time__current");
		this.timeDuration = this.player.querySelector(".player__controls__time__duration");
		this.btnPlay = this.player.querySelector(".player__play");
		// const btnStop = this.player.querySelector(".stop");
		this.progress = this.player.querySelector(".player__progress");
		this.btnFullscreen = this.player.querySelector(".player__fullscreen");
		// const btnPip = this.player.querySelector(".player__pip");
		this.volume = this.player.querySelector(".player__volume__range");

		// play button listener
		this.btnPlay.addEventListener("click", () => {
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
			this.timeDuration.innerText = new Date(Math.round(this.video.duration) * 1000).toISOString().slice(14, 19);
		});

		// // waiting or buffering
		// this.video.addEventListener('waiting', () => {
		// 	console.log("buffering");
		// 	this.btnPlay.value = "buffering";
		// })

		// waiting or buffering
		this.video.addEventListener('stalled', () => {
			console.log("stalled");
			this.btnPlay.value = "buffering";
		})

		// video play event
		this.video.addEventListener("play", () => {
			console.log("play");
			// custom interval so progress bar is updated more frequently
			this.playingInterval = window.setInterval(() => {
				// console.log("playingInterval")
				this.progress.value = (this.video.currentTime / this.video.duration) * 100;
			}, 50);
			this.btnPlay.value = "true";
		});

		// video pause event
		this.video.addEventListener("pause", () => {
			// remove custom interval
			window.clearInterval(this.playingInterval);
			this.btnPlay.value = "false";
		});


		// update time using time update, more efficient than interval
		this.video.addEventListener("timeupdate", (e) => {
			// console.log(e)
			this.timeCurrent.innerText = new Date(Math.round(this.video.currentTime) * 1000).toISOString().slice(14, 19);
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

		// adjust volume on volume range change
		this.volume.addEventListener("change", (e) => {
			this.video.volume = e.target.value;
		})

		// full screen controls
		this.btnFullscreen.addEventListener('click', (event) => {
			if (event.currentTarget.value == "true") {
				document.exitFullscreen();
			} else {
				this.player.requestFullscreen();
			}
		})
		this.player.addEventListener("fullscreenchange", (event) => {
			if (document.fullscreenElement) {
				this.btnFullscreen.value = "true";
			} else {
				this.btnFullscreen.value = "false";
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