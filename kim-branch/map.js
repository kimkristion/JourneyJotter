const APIKey = 'AIzaSyBkUkBVZorbjWzE4Wom0x1iQyFWkrzG74g';
const URL = `https://maps.googleapis.com/maps/api/js?key${APIKey}&callback=initMap&libraries=maps,marker&v=beta`;

let map, infoWindow;
var markers = [];
const tooltip = document.getElementById('tooltip');

const contentString ='omg is this DisneyLand'



function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        center: {
            lat:  33.8121,
            lng: -117.9190
        },
        zoom: 12,
    });
    infoWindow = new google.maps.InfoWindow();

  const locationButton = document.createElement("button");

  locationButton.textContent = "Use Current Location";
  locationButton.classList.add("custom-map-control-button");
  map.controls[google.maps.ControlPosition.TOP_CENTER].push(locationButton);
  locationButton.addEventListener("click", () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };

          infoWindow.setPosition(pos);
          map.setCenter(pos);
        },
        () => {
          handleLocationError(true, infoWindow, map.getCenter());
        },
      );
    } else {
      // Browser doesn't support Geolocation
      handleLocationError(false, infoWindow, map.getCenter());
    }
  });

  map.addListener('click', function(event) {
    markers.push(new google.maps.Marker({
      position: event.latLng,
      map: map,
      title: 'New Marker'
    }));

    markers.forEach(function(marker) {
      marker.addListener('click', () => {
        marker.setMap(null);
  
        const index = markers.indexOf(marker);
        if(index > -1) {
          markers.splice(index, 1)
        }
      });
    });
  });

};


function handleLocationError(browserHasGeolocation, infoWindow, pos) {
  infoWindow.setPosition(pos);
  infoWindow.setContent(
    browserHasGeolocation
      ? "Error: The Geolocation service failed."
      : "Error: Your browser doesn't support geolocation.",
  );
  infoWindow.open(map);
}

document.addEventListener('DOMContentLoaded', () => {
  tooltip.style.display = 'block';

  setTimeout(function() {
    tooltip.style.display = 'none'
  }, 3000)
})

google.maps.event.addDomListener(window, 'load', initMap);
