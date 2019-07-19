
window.onload = function () {
  createPlaylist();
}

function createPlaylist() {
  var tracks = ['mean.mp3', 'onMyWay.mp3'];
  var rootElement = document.getElementById('playlist');

  tracks.forEach(track => {
    var element = document.createElement('li');
    element.textContent = track;
    element.onclick = function() {
      var audio = document.getElementsByTagName("audio")[0];
      if (audio.paused) {
        audio.currentTime = 0;
        audio.play();     
      } else {
        audio.pause();
      }
    }
    rootElement.appendChild(element);
  });
}