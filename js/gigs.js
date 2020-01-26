var upcomingGigRequestURL = 'https://api.songkick.com/api/3.0/artists/10100128/calendar.json?apikey=j5SN1UpQtOo8yH7m';
var upcomingGigRequest = new XMLHttpRequest();
var pastGigRequestURL = 'https://api.songkick.com/api/3.0/artists/10100128/gigography.json?apikey=j5SN1UpQtOo8yH7m';
var pastGigRequest = new XMLHttpRequest();

//Creating a Prototype 
Date.prototype.ddmmyyyy = function () {
  //Grab each of your components
  var yyyy = this.getFullYear().toString();
  var MM = (this.getMonth() + 1).toString();
  var dd = this.getDate().toString();

  //Returns your formatted result
  return (dd[1] ? dd : "0" + dd[0]) + '.' + (MM[1] ? MM : "0" + MM[0]) + '.' + yyyy;
};

function fireUpcomingGigsRequest() {
  upcomingGigRequest.open('GET', upcomingGigRequestURL);
  upcomingGigRequest.responseType = 'json';
  upcomingGigRequest.send();
}

upcomingGigRequest.onload = function () {
  var results = upcomingGigRequest.response.resultsPage.results.event;
  let element = document.getElementById('upcoming-gigs');
  createGigElements(results, element, "");
}

function firePastGigsRequest() {
  pastGigRequest.open('GET', pastGigRequestURL);
  pastGigRequest.responseType = 'json';
  pastGigRequest.send();
}

pastGigRequest.onload = function () {
  var results = pastGigRequest.response.resultsPage.results.event;
  let element = document.getElementById('past-gigs');
  createGigElements(results, element, " gig-past");
}

function createGigElements(results, element, modifier) {
  results.forEach(gig => {
    createGigRow(gig, element, modifier);
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

  let date =new Date(Date.parse(gig.start.date));
  var dateElement = document.createElement('div');
  dateElement.className = "gig-date" + classModifier;
  dateElement.textContent = date.ddmmyyyy();

  var title = gig.venue.displayName
  var firstArtist = true
  gig.performance.forEach(performance => {
    let artist = performance.artist.displayName
    if (artist != "Tiger Bonesaw") {
      if (firstArtist) {
        title = title + " with " + artist;
        firstArtist = false
      } else {
        title = title + " + " + artist;
      }
    }
  });

  var titleElement = document.createElement('div');
  titleElement.className = "gig-title" + classModifier;
  titleElement.textContent = title;


  var locationElement = document.createElement('div');
  locationElement.className = "gig-location" + classModifier;
  locationElement.textContent = gig.venue.metroArea.displayName;

  var linkElement = document.createElement('a');
  linkElement.textContent = "Visit";
  linkElement.href = gig.uri;
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

document.addEventListener('DOMContentLoaded', fireUpcomingGigsRequest, false);
document.addEventListener('DOMContentLoaded', firePastGigsRequest, false);