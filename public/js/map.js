// Key for Google Maps API
const APIKey = 'AIzaSyBkUkBVZorbjWzE4Wom0x1iQyFWkrzG74g';

// Construct the Google Maps API URL with the key and necessary libraries
const URL = `https://maps.googleapis.com/maps/api/js?key=${APIKey}&callback=initMap&libraries=maps,marker&v=beta`;

let map, infoWindow;
var markers = [];
var webpageBody = document.getElementsByTagName('main')[0];
const tooltip = document.getElementById('tooltip');


function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        center: {
            lat:  33.8121,
            lng: -117.9190
        },
        zoom: 12,
    });

    function initModalMap(event) {
      var modalMap = new google.maps.Map(document.getElementById('modalMap'), {
        center: event.latLng,
        zoom: 12,
        draggable: false,
        fullscreenControl: false,
      });

      var modalMarker = new google.maps.Marker({
        position: event.latLng,
        map: modalMap,
        title: document.getElementById('title').value
    });

      modalMap
      openModal();
};

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

  const input = document.getElementById('pac-input');
  const searchBox = new google.maps.places.SearchBox(input);
  map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);
  
  // Bias the SearchBox results towards the map's viewport
  map.addListener('bounds_changed', function () {
    searchBox.setBounds(map.getBounds());
  });
  
  // Listen for the event triggered when the user selects a prediction
  searchBox.addListener('places_changed', function () {
    const places = searchBox.getPlaces();
  
    if (places.length === 0) {
      return;
    }
  
    const bounds = new google.maps.LatLngBounds();
    places.forEach(function (place) {
      if (!place.geometry) {
        console.log('Returned place contains no geometry');
        return;
      }
  
      if (place.geometry.viewport) {
        // Only geocodes have a viewport
        bounds.union(place.geometry.viewport);
      } else {
        bounds.extend(place.geometry.location);
      }
    });
    map.fitBounds(bounds);
  });

  function openModal() {
    document.getElementById('themodal').style.display = 'block';
    webpageBody.classList.add('blur-background');
    modalMap;
  };

  map.addListener('click', function(event) {
    initModalMap(event);
    markers.push(new google.maps.Marker({
      position: event.latLng,
      map: map,
      title: 'New Marker'
    }));

    markers.forEach(function(marker) {
      marker.addListener('click', () => {
        // Ask for confirmation before deleting
        if (window.confirm("Are you sure you want to delete this marker?")) {
            marker.setMap(null);
      
            const index = markers.indexOf(marker);
            if (index > -1) {
              markers.splice(index, 1);
            }
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
};

function closeModal() {
  document.getElementById('themodal').style.display = 'none';
  webpageBody.classList.remove('blur-background');

  document.getElementById('title').value = '';
  document.getElementById('experience').value = '';
  document.getElementById('emotions').value = '';
  document.getElementById('memories').value = '';
};

document.addEventListener('DOMContentLoaded', () => {
  tooltip.style.display = 'block';

  setTimeout(function() {
    tooltip.style.display = 'none'
  }, 3000)
});

const stars = document.querySelectorAll(".stars i");
stars.forEach((star, index1) => {
  star.addEventListener("click", () => {
    stars.forEach((star, index2) => {
      index1 >= index2 ? star.classList.add("active") : star.classList.remove("active");
    });
  });
});


document.getElementById('modalSubmit').addEventListener('click', () => {
  document.addEventListener('DOMContentLoaded', () => {
    stars.forEach(star => {
      star.addEventListener('click', () => {
        const selectedRating = star.getAttribute('data-rating');
        console.log('Selected rating: ', selectedRating)
      });
    });
  });

  const title = document.getElementById('title').value;
  const experience = document.getElementById('experience').value;
  const emotions = document.getElementById('emotions').value;
  const memories = document.getElementById('memories').value;
  const starRating = selectedRating;

  const data = {
    title,
    experience,
    emotions,
    memories,
    starRating
  };

  fetch('submitFormData', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
  .then(response => {
})
  .catch(error => {
    console.error('Error: ', error)
  });
});


document.addEventListener('DOMContentLoaded', initMap());

