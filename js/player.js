function indexOf(element) {
    return [...element.parentNode.children].indexOf(element);
}


function configureAudioPlayer() {
    var currentSong = 0;
    let player = document.getElementById("audio");
    let firstSong = document.getElementById('playlist').children[0].children[0].href;
    player.src = firstSong;
    
    let songs = document.getElementById('playlist').children;
    for(let song of songs) {
        song.onclick = function(e) {
            e.preventDefault();
            player.src = song.children[0].href;
        //    player.play();
            songs[currentSong].classList.remove("current-song");
            currentSong = indexOf(song);
            songs[currentSong].classList.add("current-song");
        }   
    }
}

document.addEventListener('DOMContentLoaded', configureAudioPlayer, false);




////var currentAudio;
//var tracksRequestURL = './json/songs.json';
//var tracksRequest = new XMLHttpRequest();
//tracksRequest.open('GET', tracksRequestURL);
//tracksRequest.responseType = 'json';
//tracksRequest.send();
//
//tracksRequest.onload = function() {
//  var tracks = tracksRequest.response;
//  createPlaylist(tracks);
//}
//
//
//
//function createPlaylist(tracks) {
//  var rootElement = document.getElementById('playlist');
//  
//  tracks.forEach(track => {
//    var element = createPlaylistItem(track);
//    element.onclick = function() {
//      var audio = document.getElementsByTagName("audio")[0];
//      if (audio.paused) {
//        audio.currentTime = 0;
//        audio.play();     
//      } else {
//        audio.pause();
//      }
//
//      audio.src = "./mp3/queen.mp3"
//    }
//    rootElement.appendChild(element);
//  });
//}
//
//function createPlaylistItem(track) {
//  var liElement = document.createElement('li');
//  var playlistItemElement = document.createElement('div');
//  playlistItemElement.className = "playlistItem"
//
//  var playlistNumberElement = document.createElement('span');
//  playlistNumberElement.className = "playlistNumber"
//  playlistNumberElement.textContent = track.number
//
//  var playlistTitleElement = document.createElement('span');
//  playlistTitleElement.className = "playlistTitle"
//  playlistTitleElement.textContent = track.name
//
//  var playlistLengthElement = document.createElement('span');
//  playlistLengthElement.className = "playlistLength"
//  playlistLengthElement.textContent = track.length
//
//  liElement.appendChild(playlistItemElement);
//  playlistItemElement.appendChild(playlistNumberElement);
//  playlistItemElement.appendChild(playlistTitleElement);
//  playlistItemElement.appendChild(playlistLengthElement);
//  return liElement;
//}