'use strict';
var map;
function initMap(){
  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: -34.397, lng: 150.644},
    zoom: 8
  });
}
// $.ajax('AIzaSyATqY1lXDl3ffLAeNnGsfZXv1LZh7XfbK0', function(data){
//   console.log(data);
// });
