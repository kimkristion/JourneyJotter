// Google Maps API Key
const APIKey = 'YOUR_GOOGLE_MAPS_API_KEY';
// Google Maps API URL with key and necessary libraries
const URL = `https://maps.googleapis.com/maps/api/js?key=${APIKey}&callback=initMap&libraries=maps,marker&v=beta`;
// Variables for the map, markers, webpage body, and tooltip
let map, infoWindow, modalMap;
var markers = [];
var webpageBody = document.getElementsByTagName('main')[0];
const tooltip = document.getElementById('tooltip');
// Retrieve stored markers from local storage
const storedMarkers = localStorage.getItem('markers');
if (storedMarkers) {
  markers = JSON.parse(storedMarkers);
}
// Function to initialize the Google Map
function initMap() {
  // Create a new Google Map
  map = new google.maps.Map(document.getElementById('map'), {
    center: {
      lat: 33.8121,
      lng: -117.9190
    },
    zoom: 12,
  });
  // Add a click event listener to the map
  map.addListener('click', function (event) {
    // Open the modal and get the user title input
    initModalMap(event);
    const userTitle = document.getElementById('title').value;
    console.log('User Title:', userTitle);
    // Create a new marker with the user title or a default title
    const newMarker = new google.maps.Marker({
      position: event.latLng,
      map: map,
      title: userTitle || 'Marker'
    });
    // Add the new marker to the markers array
    markers.push(newMarker);
    // Function to handle the "Submit" button click in the modal
    function modalSubmit() {
      document.getElementById('modalSubmit').addEventListener('click', function (event) {
        event.preventDefault();
        closeModal();
      });
    }
    // Add click event listener to the "Submit" button in the modal
    document.getElementById('modalSubmit').addEventListener('click', modalSubmit);
    // Add click event listener to each marker for deletion confirmation
    markers.forEach(function (marker) {
      marker.addListener('click', () => {
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
  // Function to initialize the modal map
  function initModalMap(event) {
    modalMap = new google.maps.Map(document.getElementById('modalMap'), {
      center: event.latLng,
      zoom: 12,
      draggable: false,
      fullscreenControl: false,
    });
    // Create a marker on the modal map with the title from the input
    var modalMarker = new google.maps.Marker({
      position: event.latLng,
      map: modalMap,
      title: document.getElementById('title').value
    });
    // Open the modal
    openModal();
  }
  // Set up Google Maps InfoWindow and search box
  infoWindow = new google.maps.InfoWindow();
  const locationButton = document.createElement("button");
  locationButton.textContent = "Use Current Location";
  locationButton.classList.add("custom-map-control-button");
  map.controls[google.maps.ControlPosition.TOP_CENTER].push(locationButton);
  // Event listener for the "Use Current Location" button
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
      handleLocationError(false, infoWindow, map.getCenter());
    }
  });
  // Set up search box for places
  const input = document.getElementById('pac-input');
  const searchBox = new google.maps.places.SearchBox(input);
  map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);
  // Event listener for changes in search box places
  map.addListener('bounds_changed', function () {
    searchBox.setBounds(map.getBounds());
  });
  // Event listener for places selected in the search box
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
        bounds.union(place.geometry.viewport);
      } else {
        bounds.extend(place.geometry.location);
      }
    });
    map.fitBounds(bounds);
  });
}
// Function to handle geolocation errors
function handleLocationError(browserHasGeolocation, infoWindow, pos) {
  infoWindow.setPosition(pos);
  infoWindow.setContent(
    browserHasGeolocation
      ? "Error: The Geolocation service failed."
      : "Error: Your browser doesn't support geolocation.",
  );
  infoWindow.open(map);
}
// Function to open the modal
function openModal() {
  document.getElementById('themodal').style.display = 'block';
  // Do something with modalMap if necessary
}
// Function to close the modal and reset input values
function closeModal() {
  document.getElementById('themodal').style.display = 'none';
  document.getElementById('title').value = '';
  document.getElementById('experience').value = '';
  document.getElementById('emotions').value = '';
  document.getElementById('memories').value = '';
}
// Event listener for DOM content loaded to initialize the map
document.addEventListener('DOMContentLoaded', () => {
  // Display tooltip for 3 seconds
  tooltip.style.display = 'block';
  setTimeout(function () {
    tooltip.style.display = 'none';
  }, 3000);
  // Initialize the map
  initMap();
});
// Select all elements with class "stars" and add click event listeners
const stars = document.querySelectorAll(".stars i");
stars.forEach((star, index1) => {
  star.addEventListener("click", () => {
    stars.forEach((innerStar, index2) => {
      if (index1 >= index2) {
        innerStar.classList.add("active");
      }
    });
  });
});
// Function to handle the "Submit" button click in the modal
function modalSubmit() {
  document.getElementById('modalSubmit').addEventListener('click', function (event) {
    event.preventDefault();
    closeModal();
  });
}
// Event listener for the "Submit" button click in the modal
document.getElementById('modalSubmit', () => {
  console.log('he');
});