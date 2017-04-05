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
              createMarkerMovie(response.results[i]);
            }
            console.log(response);
            movie=response;
          }
        });
      }
    })

    var imageFood = 'http://icons.iconarchive.com/icons/graphicloads/colorful-long-shadow/128/Restaurant-icon.png';
    function createMarkerFood(place){
      var placeLoc = place.geometry.location;
      var marker = new google.maps.Marker({
        position: place.geometry.location,
        map: map,
        icon: imageFood
        // animation: google.maps.Animation.DROP,
      });
    }

    var image = 'http://icons.iconarchive.com/icons/hadezign/hobbies/128/Movies-icon.png';
    function createMarkerMovie(place){
      var placeLoc = place.geometry.location;
      var marker = new google.maps.Marker({
        position: place.geometry.location,
        map: map,
        icon: image
        // animation: google.maps.Animation.DROP,
      });


      // marker.addListener('click', toggleBounce)
      //
      // function toggleBounce() {
      //   if (marker.getAnimation() !== null) {
      //     marker.setAnimation(null);
      //   } else {
      //     marker.setAnimation(google.maps.Animation.BOUNCE);
      //   }
      // }

      google.maps.event.addListener(marker, 'click', function() {
        console.log(place);
        var placeInfo = place.place_id;
        var theaterLat = place.geometry.location.lat;
        var theaterLng = place.geometry.location.lng;

        $.ajax({
          type: "GET",
          url: "https://maps.googleapis.com/maps/api/place/details/json?placeid=" + placeInfo + "&key=AIzaSyA-iDM4BAeMDij24qqNdj-g4BL-G9Y7afk",
          dataType: "json",
          success: function(response) {
            console.log(response);

             var contentString = `<div class="tooltip"> <h4>${response.result.name}</h4>  <p>${response.result.formatted_address}</p></div>`;

            var infowindow = new google.maps.InfoWindow({
              content: contentString
            });
            infowindow.open(map, marker);
          }
        });
        $.ajax({
         type: "GET",
         url: "https://maps.googleapis.com/maps/api/place/radarsearch/json?location=" + theaterLat + "," + theaterLng + "&radius=804&type=restaurant&key=AIzaSyA-iDM4BAeMDij24qqNdj-g4BL-G9Y7afk",
         dataType: "json",
         success: function(response) {
           for (var i=0; i < response.results.length; i++) {
             createMarkerFood(response.results[i]);
           }
           console.log(response);
         }
       });

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
