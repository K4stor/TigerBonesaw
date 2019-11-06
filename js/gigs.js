var requestURL = './json/gigs.json';
var request = new XMLHttpRequest();

//Creating a Prototype 
Date.prototype.ddmmyyyy = function () {
  //Grab each of your components
  var yyyy = this.getFullYear().toString();
  var MM = (this.getMonth() + 1).toString();
  var dd = this.getDate().toString();

  //Returns your formatted result
  return (dd[1] ? dd : "0" + dd[0]) + '.' + (MM[1] ? MM : "0" + MM[0]) + '.' + yyyy;
};

function fireRequest() {
  request.open('GET', requestURL);
  request.responseType = 'json';
  request.send();
}

request.onload = function () {
  var gigs = request.response;
  createGigElements(gigs);
}

function createGigElements(gigs) {
  let upcomingElment = document.getElementById('upcoming-gigs');
  let pastElment = document.getElementById('past-gigs');
  let today = new Date(); 

  // upcoming gigs
  gigs.forEach(gig => {
    let date = new Date(Date.parse(gig.date));
    let isInPast = date < today;
    if (!isInPast) {
      createGigRow(gig, upcomingElment, "");
    }
  });

  // past shows
  gigs.forEach(gig => {
    let date = new Date(Date.parse(gig.date));
    let isInPast = date < today;
    if (isInPast) {
      createGigRow(gig, pastElment, " gig-past");
    }
  });
}

function parseDate(input, format) {
  format = format || 'yyyy-mm-dd'; // default format
  var parts = input.match(/(\d+)/g), 
      i = 0, fmt = {};
  // extract date-part indexes from the format
  format.replace(/(yyyy|dd|mm)/g, function(part) { fmt[part] = i++; });

  return new Date(parts[fmt['yyyy']], parts[fmt['mm']]-1, parts[fmt['dd']]);
}

function createGigRow(gig, gigRootElement, classModifier) {
  let gigRowElement = document.createElement('div');
  
  gigRowElement.className = "gig-row";

  let date = new parseDate(gig.date, 'mm.dd.yyyy');
  var dateElement = document.createElement('div');
  dateElement.className = "gig-date" + classModifier;
  dateElement.textContent = date.ddmmyyyy();

  var titleElement = document.createElement('div');
  titleElement.className = "gig-title" + classModifier;
  titleElement.textContent = gig.title;

  var locationElement = document.createElement('div');
  locationElement.className = "gig-location" + classModifier;
  locationElement.textContent = gig.location;

  var linkElement = document.createElement('a');
  linkElement.textContent = "Visit";
  linkElement.href = gig.url;
  linkElement.target = "_blank";

  var linkButtonElement = document.createElement('div');
  linkButtonElement.className = "gig-link" + classModifier;
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