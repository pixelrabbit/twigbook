const rabbitPlayer = {
    init: function(selector){
        console.log('player.init');
        document.body.querySelectorAll(selector).forEach(function(player){
            const video = player.querySelector("video");
            const btnPlay = player.querySelector('.play');
            const btnStop = player.querySelector('.stop');

            btnPlay.addEventListener('click',function(){
                // console.log("btnPlay", video.paused)
                if (video.paused) {
                    video.play();
                  } else {
                    video.pause();
                  }
            });
            btnStop.addEventListener('click',function(){
                video.pause();
                video.currentTime = 0;
            });

            video.addEventListener('timeupdate', function(){
                console.log(video.currentTime)
            });

        });


    },
    play: function(){

    }
}

window.addEventListener('DOMContentLoaded',function(){
    rabbitPlayer.init(".player")
},{once:true});