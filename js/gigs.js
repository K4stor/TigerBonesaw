var requestURL = './json/gigs.json';
var request = new XMLHttpRequest();

//Creating a Prototype 
Date.prototype.ddmmyyyy = function() {
   //Grab each of your components
   var yyyy = this.getFullYear().toString();
   var MM = (this.getMonth()+1).toString();
   var dd  = this.getDate().toString();

   //Returns your formatted result
  return (dd[1]?dd:"0"+dd[0]) + '.' + (MM[1]?MM:"0"+MM[0]) + '.' + yyyy;
};

function fireRequest() {
    request.open('GET', requestURL);
    request.responseType = 'json';
    request.send();
}

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

  let today = new Date();
  let date = new Date(Date.parse(gig.date));
  let isInPast = date < today;

  var dateElement = document.createElement('div');
  dateElement.className = "gig-date";
  if (isInPast) {
    dateElement.className += " gig-past";
  }
  dateElement.textContent = date.ddmmyyyy();

  var titleElement = document.createElement('div');
  titleElement.className = "gig-title";
  if (isInPast) {
    titleElement.className += " gig-past";
  }
  titleElement.textContent = gig.title;

  var locationElement = document.createElement('div');
  locationElement.className = "gig-location";
  if (isInPast) {
    locationElement.className += " gig-past";
  }
  locationElement.textContent = gig.location;

  var linkElement = document.createElement('a');
  linkElement.textContent = "Visit";
  linkElement.href = gig.url;
  linkElement.target = "_blank";

  var linkButtonElement = document.createElement('div');
  linkButtonElement.className = "gig-link";
  if (isInPast) {
    linkButtonElement.className += " gig-past";
  }
  linkButtonElement.appendChild(linkElement);

  gigRowElement.appendChild(dateElement);
  gigRowElement.appendChild(titleElement);
  gigRowElement.appendChild(locationElement);
  gigRowElement.appendChild(linkButtonElement);

  gigRootElement.appendChild(gigRowElement);

  var hrElement = document.createElement('hr');
  gigRootElement.appendChild(hrElement);
}

document.addEventListener('DOMContentLoaded', fireRequest, false);

