const APIKey = 'AIzaSyBkUkBVZorbjWzE4Wom0x1iQyFWkrzG74g';
const URL = `https://maps.googleapis.com/maps/api/js?key${APIKey}&callback=initMap&libraries=maps,marker&v=beta`;

function initMap() {
    console.log('Maps API loaded');
}

initMap();