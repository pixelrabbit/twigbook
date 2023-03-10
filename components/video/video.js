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
		  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
		 		 <path class="icon--play" d="m11.596 8.697-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393z"/>
				  <path class="icon--pause" d="M5.5 3.5A1.5 1.5 0 0 1 7 5v6a1.5 1.5 0 0 1-3 0V5a1.5 1.5 0 0 1 1.5-1.5zm5 0A1.5 1.5 0 0 1 12 5v6a1.5 1.5 0 0 1-3 0V5a1.5 1.5 0 0 1 1.5-1.5z"/>
				  <path class="icon--buffering" d="M3 9.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z"/>
			</svg>     
        </button>
        <div class="player__controls__time">
          <span class="player__controls__time__current">00:00</span>&nbsp;/&nbsp;<span class="player__controls__time__duration">00:00</span>
        </div>
		<button class="player__mute">
		<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
			<g class="icon--volume">
			<path d="M11.536 14.01A8.473 8.473 0 0 0 14.026 8a8.473 8.473 0 0 0-2.49-6.01l-.708.707A7.476 7.476 0 0 1 13.025 8c0 2.071-.84 3.946-2.197 5.303l.708.707z"/>
			<path d="M10.121 12.596A6.48 6.48 0 0 0 12.025 8a6.48 6.48 0 0 0-1.904-4.596l-.707.707A5.483 5.483 0 0 1 11.025 8a5.483 5.483 0 0 1-1.61 3.89l.706.706z"/>
			<path d="M8.707 11.182A4.486 4.486 0 0 0 10.025 8a4.486 4.486 0 0 0-1.318-3.182L8 5.525A3.489 3.489 0 0 1 9.025 8 3.49 3.49 0 0 1 8 10.475l.707.707zM6.717 3.55A.5.5 0 0 1 7 4v8a.5.5 0 0 1-.812.39L3.825 10.5H1.5A.5.5 0 0 1 1 10V6a.5.5 0 0 1 .5-.5h2.325l2.363-1.89a.5.5 0 0 1 .529-.06z"/>
		  
			</g>
			<path class="icon--mute" d="M6.717 3.55A.5.5 0 0 1 7 4v8a.5.5 0 0 1-.812.39L3.825 10.5H1.5A.5.5 0 0 1 1 10V6a.5.5 0 0 1 .5-.5h2.325l2.363-1.89a.5.5 0 0 1 .529-.06zm7.137 2.096a.5.5 0 0 1 0 .708L12.207 8l1.647 1.646a.5.5 0 0 1-.708.708L11.5 8.707l-1.646 1.647a.5.5 0 0 1-.708-.708L10.793 8 9.146 6.354a.5.5 0 1 1 .708-.708L11.5 7.293l1.646-1.647a.5.5 0 0 1 .708 0z"/>
	  </svg>
			</button>
		<div class="player__volume">
			
			<input class="player__volume__range" type="range" min="0" max="1" step="0.1" value="1" /> 
		</div>
        <button class="player__transcript">Transcript</button>
        <button class="player__captions">
		<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
		<path d="M2 2a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H2zm3.027 4.002c-.83 0-1.319.642-1.319 1.753v.743c0 1.107.48 1.727 1.319 1.727.69 0 1.138-.435 1.186-1.05H7.36v.114c-.057 1.147-1.028 1.938-2.342 1.938-1.613 0-2.518-1.028-2.518-2.729v-.747C2.5 6.051 3.414 5 5.018 5c1.318 0 2.29.813 2.342 2v.11H6.213c-.048-.638-.505-1.108-1.186-1.108zm6.14 0c-.831 0-1.319.642-1.319 1.753v.743c0 1.107.48 1.727 1.318 1.727.69 0 1.139-.435 1.187-1.05H13.5v.114c-.057 1.147-1.028 1.938-2.342 1.938-1.613 0-2.518-1.028-2.518-2.729v-.747c0-1.7.914-2.751 2.518-2.751 1.318 0 2.29.813 2.342 2v.11h-1.147c-.048-.638-.505-1.108-1.187-1.108z"/>
	  </svg>
		</button>
        <button class="player__fullscreen">
		<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
			<path class="icon--expand" d="M1.5 1a.5.5 0 0 0-.5.5v4a.5.5 0 0 1-1 0v-4A1.5 1.5 0 0 1 1.5 0h4a.5.5 0 0 1 0 1h-4zM10 .5a.5.5 0 0 1 .5-.5h4A1.5 1.5 0 0 1 16 1.5v4a.5.5 0 0 1-1 0v-4a.5.5 0 0 0-.5-.5h-4a.5.5 0 0 1-.5-.5zM.5 10a.5.5 0 0 1 .5.5v4a.5.5 0 0 0 .5.5h4a.5.5 0 0 1 0 1h-4A1.5 1.5 0 0 1 0 14.5v-4a.5.5 0 0 1 .5-.5zm15 0a.5.5 0 0 1 .5.5v4a1.5 1.5 0 0 1-1.5 1.5h-4a.5.5 0 0 1 0-1h4a.5.5 0 0 0 .5-.5v-4a.5.5 0 0 1 .5-.5z"/>
			<path class="icon--collapse" d="M5.5 0a.5.5 0 0 1 .5.5v4A1.5 1.5 0 0 1 4.5 6h-4a.5.5 0 0 1 0-1h4a.5.5 0 0 0 .5-.5v-4a.5.5 0 0 1 .5-.5zm5 0a.5.5 0 0 1 .5.5v4a.5.5 0 0 0 .5.5h4a.5.5 0 0 1 0 1h-4A1.5 1.5 0 0 1 10 4.5v-4a.5.5 0 0 1 .5-.5zM0 10.5a.5.5 0 0 1 .5-.5h4A1.5 1.5 0 0 1 6 11.5v4a.5.5 0 0 1-1 0v-4a.5.5 0 0 0-.5-.5h-4a.5.5 0 0 1-.5-.5zm10 1a1.5 1.5 0 0 1 1.5-1.5h4a.5.5 0 0 1 0 1h-4a.5.5 0 0 0-.5.5v4a.5.5 0 0 1-1 0v-4z"/>

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
		this.mute = this.player.querySelector(".player__mute");

		this.video.addEventListener('click', () => {
			if (this.video.paused) {
				this.play();
			} else {
				this.pause();
			}
		})

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

		// toggle mute on button press
		this.mute.addEventListener("click",()=>{
			if(this.video.volume > 0){
				this.mute.classList.add("muted");
				this.volume.value = 0;
				this.video.volume = 0;
			} else {
				this.mute.classList.remove("muted");
				this.volume.value = 0.7;
				this.video.volume = 0.7;
			}
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