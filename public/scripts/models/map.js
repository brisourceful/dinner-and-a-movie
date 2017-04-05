'use strict';

var movie;

function initAutocomplete() {
  let map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 47.6205, lng: -122.3493},
    zoom: 12,
    mapTypeId: 'roadmap'
  });

  // Create the search box and link it to the UI element.
  let input = document.getElementById('pac-input');
  let searchBox = new google.maps.places.SearchBox(input);
  map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);


              function codeAddress() {
                let address = document.getElementById('address').value;
                geocoder.geocode( { 'address': address}, function(results, status) {
                  if (status == 'OK') {
                    map.setCenter(results[0].geometry.location);
                    let marker = new google.maps.Marker({
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

  let markers = [];
  // Listen for the event fired when the user selects a prediction and retrieve
  // more details for that place.
  searchBox.addListener('places_changed', function() {
    let places = searchBox.getPlaces();
    let address = input.value;
    let geocoder = new google.maps.Geocoder();
    geocoder.geocode( {'address': address}, function(results, status) {
      if (status == 'OK') {
        let lat = results[0].geometry.location.lat();
        let long = results[0].geometry.location.lng();
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

    let imageFood = 'https://photos-2.dropbox.com/t/2/AAB48PDFVUeeDtoVZea6lLqoKVK3AC0oRxiTWug5gZp8tg/12/553914201/png/32x32/1/_/1/2/cutlery-copy.png/EM2a87cEGJtSIAIoAg/Sh3nriTH92P23s-_gKPTzqKoJShvIZHB3xAg8tSXceU?size=2048x1536&size_mode=3';
    function createMarkerFood(place){
      let placeLoc = place.geometry.location;
      let marker = new google.maps.Marker({
        position: place.geometry.location,
        map: map,
        icon: imageFood
        // animation: google.maps.Animation.DROP,
      });
      google.maps.event.addListener(marker, 'click', function() {
        console.log(place);
        $.ajax({
          type: "GET",
          url: "https://maps.googleapis.com/maps/api/place/details/json?placeid=" + place.place_id + "&key=AIzaSyA-iDM4BAeMDij24qqNdj-g4BL-G9Y7afk",
          dataType: "json",
          success: function(response) {
            console.log(response);

             let contentString = `<div class="tooltip"> <h4>${response.result.name}</h4>  <p>${response.result.formatted_address}</p></div>`;

             let infowindow = new google.maps.InfoWindow({
               content: contentString
            });
            infowindow.open(map, marker);
          }
        });
      });
    }

    let image = 'https://photos-1.dropbox.com/t/2/AACXwh9f4C1jpCp0DMUx-tJ4T-XTXZHNKWBKeZezhxdVRg/12/553914201/png/32x32/1/_/1/2/photograms-copy.png/EM2a87cEGJlSIAIoAg/I7wCvq1HmYLFSBVeDEY740ELmPS9eljh4HbGF8r2zCg?size=2048x1536&size_mode=3';
    function createMarkerMovie(place){
      let placeLoc = place.geometry.location;
      let marker = new google.maps.Marker({
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
        $.ajax({
          type: "GET",
          url: "https://maps.googleapis.com/maps/api/place/details/json?placeid=" + place.place_id + "&key=AIzaSyA-iDM4BAeMDij24qqNdj-g4BL-G9Y7afk",
          dataType: "json",
          success: function(response) {
            console.log(response);

             let contentString = `<div class="tooltip"> <h4>${response.result.name}</h4>  <p>${response.result.formatted_address}</p></div>`;

             let infowindow = new google.maps.InfoWindow({
               content: contentString
            });
            infowindow.open(map, marker);
          }
        });
        $.ajax({
         type: "GET",
         url: "https://maps.googleapis.com/maps/api/place/radarsearch/json?location=" + place.geometry.location.lat + "," + place.geometry.location.lng + "&radius=804&type=restaurant&key=AIzaSyA-iDM4BAeMDij24qqNdj-g4BL-G9Y7afk",
         dataType: "json",
         success: function(response) {
           for (var i=0; i < response.results.length; i++) {
             markers.push(response.results[i]);
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
    // markers = [];

    // For each place, get the icon, name and location.
    let bounds = new google.maps.LatLngBounds();
    places.forEach(function(place) {
      if (!place.geometry) {
        console.log("Returned place contains no geometry");
        return;
      }
      let icon = {
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
