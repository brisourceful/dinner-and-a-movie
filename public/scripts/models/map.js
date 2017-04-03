'use strict';
var map;
function initMap(){
  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 47.6205, lng: -122.3493},
    zoom: 16
  });
let service = new google.maps.places.PlacesService(map);
 service.textSearch({
   query:"resturant",
   location: {lat: 47.6205, lng: -122.3493},
   radius: 100,
 }, function(results){
   console.log(results);
 });
}


// $.ajax('AIzaSyATqY1lXDl3ffLAeNnGsfZXv1LZh7XfbK0', function(data){
//   console.log(data);
// });
