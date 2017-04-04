'use strict';

var movie;

function initAutocomplete() {
  var map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 47.6205, lng: -122.3493},
    zoom: 12,
    mapTypeId: 'roadmap'
  });

  // Create the search box and link it to the UI element.
  var input = document.getElementById('pac-input');
  var searchBox = new google.maps.places.SearchBox(input);
  map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);


              function codeAddress() {
                var address = document.getElementById('address').value;
                geocoder.geocode( { 'address': address}, function(results, status) {
                  if (status == 'OK') {
                    map.setCenter(results[0].geometry.location);
                    var marker = new google.maps.Marker({
                        map: map,
                        position: results[0].geometry.location
                    });
                  } else {
                    alert('Geocode was not successful for the following reason: ' + status);
                  }
                });
              }

              // Bias the SearchBox results towards current map's viewport.
              map.addListener('bounds_changed', function() {
                searchBox.setBounds(map.getBounds());
              });

  var markers = [];
  // Listen for the event fired when the user selects a prediction and retrieve
  // more details for that place.
  searchBox.addListener('places_changed', function() {
    var places = searchBox.getPlaces();
    var address = input.value;
    var geocoder = new google.maps.Geocoder();
    geocoder.geocode( {'address': address}, function(results, status) {
      if (status == 'OK') {
        var lat = results[0].geometry.location.lat();
        var long = results[0].geometry.location.lng();
        console.log(lat, long);
        $.ajax({
          type: "GET",
          url: "https://maps.googleapis.com/maps/api/place/radarsearch/json?location=" + lat + "," + long + "&radius=5000&type=movie_theater&key=AIzaSyA-iDM4BAeMDij24qqNdj-g4BL-G9Y7afk",
          dataType: "json",
          success: function(response) {
            for (var i=0; i < response.results.length; i++) {
              createMarker(response.results[i]);
            }
            console.log(response);
            movie=response;
          }
        });
      }
    })

    function createMarker(place){
      var placeLoc = place.geometry.location;
      var marker = new google.maps.Marker({
        map: map,
        position: place.geometry.location
      });

      google.maps.event.addListener(marker, 'click', function() {
        infowindow.setContent(place.name);
        infowindow.open (map, this);
      });
    };

    if (places.length == 0) {
      return;
    }


    // Clear out the old markers.
    markers.forEach(function(marker) {
      marker.setMap(null);
    });
    markers = [];

    // For each place, get the icon, name and location.
    var bounds = new google.maps.LatLngBounds();
    places.forEach(function(place) {
      if (!place.geometry) {
        console.log("Returned place contains no geometry");
        return;
      }
      var icon = {
        url: place.icon,
        size: new google.maps.Size(71, 71),
        origin: new google.maps.Point(0, 0),
        anchor: new google.maps.Point(17, 34),
        scaledSize: new google.maps.Size(25, 25)
      };

      // Create a marker for each place.
      markers.push(new google.maps.Marker({
        map: map,
        icon: icon,
        title: place.name,
        position: place.geometry.location
      }));

      if (place.geometry.viewport) {
        // Only geocodes have viewport.
        bounds.union(place.geometry.viewport);
      } else {
        bounds.extend(place.geometry.location);
      }
    });
    map.fitBounds(bounds);
  });
}



// $.ajax('AIzaSyATqY1lXDl3ffLAeNnGsfZXv1LZh7XfbK0', function(data){
//   console.log(data);
// });
