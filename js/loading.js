
function hideLoadingScreen() {
  let loadingScreen = document.querySelector('#loading-screen')
  loadingScreen.className += " hidden";
}

window.addEventListener("load", hideLoadingScreen);