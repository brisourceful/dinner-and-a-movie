'use strict';


let markers = [];
let foodMarkers = [];
let infoMovieArray = [];
let infoFoodArray = [];

function initAutocomplete() {
  let map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 47.6205, lng: -122.3493},
    zoom: 13,
    mapTypeId: 'roadmap'
  });

  // Create the search box and link it to the UI element.
  let input = document.getElementById('pac-input');
  let searchBox = new google.maps.places.SearchBox(input);
  map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

  // Bias the SearchBox results towards current map's viewport.
  map.addListener('bounds_changed', function() {
    searchBox.setBounds(map.getBounds());
  });
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
        $.ajax({
          type: "GET",
          url: '/getlocation',
          dataType: "json",
          headers: {
            lat: lat,
            long: long
          },
          success: function(response) {
            if(markers.length > 0){
              deleteMarkers();
            }
            if(foodMarkers.length > 0){
              deletefoodMarkers();
            }
            for (var i=0; i < response.results.length; i++) {
              createMarkerMovie(response.results[i]);
            }
          }
        });
      }
    });

    let imageFood = 'https://lh3.google.com/u/0/d/0B-b8VroLfDYrWDZrcWdoOVF5ZWc=w2560-h1086-iv1';
    function createMarkerFood(place){
      let marker = new google.maps.Marker({
        position: place.geometry.location,
        map: map,
        icon: imageFood
      });
      foodMarkers.push(marker);
      google.maps.event.addListener(marker, 'click', function() {
        $.ajax({
          type: "GET",
          url: '/getFoodInfo',
          dataType: "json",
          headers: {
            place: place.place_id
          },
          success: function(response) {

             let contentString = `<div class="tooltip"> <h4><a href = "${response.result.website}">${response.result.name}</a></h4>  <p>${response.result.formatted_address}</p><p><p>Rating: ${response.result.rating} / 5</p></p></div><div><h4>Top Review:</h4><h5>${response.result.reviews[0].author_name}</h5><p>"${response.result.reviews[0].text}"</p></div>`

             let infowindow = new google.maps.InfoWindow({
               content: contentString
            });
            if(infoFoodArray.length > 0){
              deleteInfoWindowFood();
            }
            infoFoodArray.push(infowindow);
            infowindow.open(map, marker);
          }
        });
      });
    }

    let image = 'https://lh3.google.com/u/0/d/0B-b8VroLfDYrZWVBZlhLX2JBelE=w2560-h1086-iv1';
    function createMarkerMovie(place){
      let marker = new google.maps.Marker({
        position: place.geometry.location,
        icon: image,
        map: map
      });
      markers.push(marker);
      google.maps.event.addListener(marker, 'click', function() {
        $.ajax({
          type: "GET",
          url: '/getMovieInfo',
          dataType: "json",
          headers: {
            place: place.place_id
          },
          success: function(response) {

             let contentString = `<div class="tooltip"> <h4><a href = "${response.result.website}">${response.result.name}</a></h4>  <p>${response.result.formatted_address}</p><p><p>Rating: ${response.result.rating} / 5</p></p></div><div><h4>Top Review:</h4><h5>${response.result.reviews[0].author_name}</h5><p>"${response.result.reviews[0].text}"</p></div>`

             let infowindow = new google.maps.InfoWindow({
               content: contentString
            });
            if(infoMovieArray.length > 0){
              deleteInfoWindowMovie();
            }
            infoMovieArray.push(infowindow);
            infowindow.open(map, marker);
          }
        });
        $.ajax({
         type: "GET",
         url: '/getFood',
         dataType: "json",
         headers: {
           lat: place.geometry.location.lat,
           long: place.geometry.location.lng
         },
         success: function(response) {
           if(foodMarkers.length > 0){
             deletefoodMarkers();
           }
           for (var i=0; i < 20; i++) {
             createMarkerFood(response.results[i]);
           }
         }
       });

      });
    };



    if (places.length == 0) {
      return;
    }

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
function deleteMarkers() {
  markers.forEach(function(marker){
    marker.setMap(null);
  });
  markers = [];
}
function deletefoodMarkers(){
  foodMarkers.forEach(function(marker){
    marker.setMap(null);
  });
  foodMarkers = [];
}
function deleteInfoWindowMovie(){
  infoMovieArray.forEach(function(marker){
    marker.close();
  });
  infoMovieArray = [];
}
function deleteInfoWindowFood(){
  infoFoodArray.forEach(function(marker){
    marker.close();
  });
  infoFoodArray = [];
}
function clearMarkers() {
  setMapOnAll(null);
}
