
window.onload = function () {
  createPlaylist();
}

function createPlaylist() {
  var tracks = ['mean.mp3', 'onMyWay.mp3'];
  var rootElement = document.getElementById('playlist');

  tracks.forEach(track => {
    var element = document.createElement('li');
    element.textContent = track;
    rootElement.appendChild(element);
  });
}