function indexOf(element) {
    return [...element.parentNode.children].indexOf(element);
}


function configureAudioPlayer() {
    var currentSong = 0;
    let player = document.getElementById("audio");
    let firstSong = document.querySelector("#playlist li a").href;
    player.src = firstSong;
    let controlImg = document.querySelector(".player-controls img")  
  
    let songs = document.getElementById('playlist').children;
    for(let song of songs) {
        song.onclick = function(e) {
            e.preventDefault();
            let clickedIndex = indexOf(song);
            if (clickedIndex != currentSong) {
              player.src = song.children[0].children[0].href;
              player.play();
              controlImg.src = "images/pause.png"
              songs[currentSong].classList.remove("current-song");
              currentSong = clickedIndex;
              songs[currentSong].classList.add("current-song");
            } else {
              if (player.paused) {
                controlImg.src = "images/pause.png"
                player.play();
              } else {
                controlImg.src = "images/play.png"
                player.pause();
              }
            }
        }   
    }
}

document.addEventListener('DOMContentLoaded', configureAudioPlayer, false);
