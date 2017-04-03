'use strict';
var map;
      function initMap() {
        map = new google.maps.Map(document.getElementById('map'), {
          center: {lat: -34.397, lng: 150.644},
          zoom: 8
        });
      }
$.ajax('AIzaSyBYxDvabQcB6Ea6VjrNA_E-_tWn2I3sGko', function(data){
  console.log(data);
});
