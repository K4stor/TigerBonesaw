var requestURL = './gigs.json';
var request = new XMLHttpRequest();
request.open('GET', requestURL);
request.responseType = 'json';
request.send();

request.onload = function() {
  var gigs = request.response;
  createGigElements(gigs);
}

function createGigElements(gigs) {
  var gigRootElement = document.getElementById('gigRoot');

  gigs.forEach(gig => {
    createGigRow(gig, gigRootElement);
  });
}

function createGigRow(gig, gigRootElement) {
  var gigRowElement = document.createElement('div');
  gigRowElement.className = "gig-row";

  var dateElement = document.createElement('div');
  dateElement.className = "gig-dates";
  dateElement.textContent = gig.date;

  var titleElement = document.createElement('div');
  titleElement.className = "gig-title";
  titleElement.textContent = gig.title;

  var locationElement = document.createElement('div');
  locationElement.className = "gig-location";
  locationElement.textContent = gig.location;

  var linkElement = document.createElement('div');
  linkElement.className = "gig-www";
  linkElement.textContent = "Visit";

  gigRowElement.appendChild(dateElement);
  gigRowElement.appendChild(titleElement);
  gigRowElement.appendChild(locationElement);
  gigRowElement.appendChild(linkElement);

  gigRootElement.appendChild(gigRowElement);

  var hrElement = document.createElement('hr');
  gigRootElement.appendChild(hrElement);
}
