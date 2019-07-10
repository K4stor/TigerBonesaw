console.log("arsch");

var requestURL = './gigs.json';
var request = new XMLHttpRequest();
request.open('GET', requestURL);
request.responseType = 'json';
request.send();

request.onload = function() {
  var gigs = request.response;
  console.log(gigs);
  createGigElements(gigs);
  // populateHeader(superHeroes);
  // showHeroes(superHeroes);
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

{/* <div class="gig-row">
<div class="gig-dates">12.01.2019</div>
<div class="gig-title">Püttstock</div>
<div class="gig-location">Beckum Roland</div>
<div class="gig-www">Visit</div>
</div> */}
