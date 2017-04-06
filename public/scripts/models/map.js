'use strict';

var movie;
let markers = [];
let foodMarkers = [];

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

  // Bias the SearchBox results towards current map's viewport.
  map.addListener('bounds_changed', function() {
    searchBox.setBounds(map.getBounds());
  });
  // Listen for the event fired when the user selects a prediction and retrieve
  // more details for that place.
  searchBox.addListener('places_changed', function() {
    // deleteMarkers();
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
            if(markers.length > 0){
              deleteMarkers();
            }
            if(foodMarkers.length > 0){
              deletefoodMarkers();
            }
            for (var i=0; i < response.results.length; i++) {
              createMarkerMovie(response.results[i]);
            }
            console.log(response);
            movie=response;
          }
        });
      }
    })

    let imageFood = 'https://lh3.googleusercontent.com/bI7zYcPlfE9HGLEbQflx6YxrpT84hNZPBjsGdKl2KdQOilwwyXDlRjUml89jwTjfqnq2co8Ao2Jz4YfcnI4OSp5XbEW3yAzwRfqEtZRfvR-SqyTKpYeFcNoeWYQ9u7fTtKqt2mj8Lue0PFUREfVr6V4p_1GY2j5Pt2kccnWGpU-X0V6HS5ZBwz5A5Q_k2MGOB1DV216k2Qtuh00z0lGAJtnBOpmS17wkjDbNfkpJoAVhZondAqxvbGmZpYG2NlKvZw0dO1bImpLoXafhHxne19qjqMOpjaEMT6atJpDwfkEvJ7Zd_WyObn7V8KAYmNzZfzfPS6UPXwFgts61WXErZc1PhzpCCZrNskEuzLbQ0BC5aNr3GV3o40OUU9wp26Cvu_ZKqaxM9fRMDNGfj_j90rXzc5tNyLXX3E5R0V3PeR-Js-O7jKlcm_41NTgFKqnbfutqfa56HkpN1yT68K3blb8juw87JZdwTNMAqw1HkfSnMOxwmrjdgCxNuQCog00waqqCxQlzkSMkjEajdKXO0ohcSZRMoUssITn-0gYzQAUmQVmJAsqlbILyxYIHn4tXIEpsqFqydXqNlEM_gS0umGmejGqJJH-Gzd4WzyYNCn9tHZWSkNTtLDF9QNgYmFCnGOEVK98kZ-CUZ_kdtugT1BX2ISvq0zBsJWfmFAp_fA=w33-h42-no';
    function createMarkerFood(place){
      let placeLoc = place.geometry.location;
      let marker = new google.maps.Marker({
        position: place.geometry.location,
        map: map,
        icon: imageFood
        // animation: google.maps.Animation.DROP,
      });
      foodMarkers.push(marker);
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

    let image = 'https://lh3.googleusercontent.com/1LqU0HqJs_wNBvGeMg3ySTOJRKL77LGPH6wyi_M3pW_3pHCuSDMpvolOhr7YMw7-J8UkvzIk-VBW2g4RToK5wS7sd9_vPoRE8ZoAN8Y4OsAo-TvS5wwZjqLu_lWHX6o4OIxKJcPzw0PUdamARHccYvNuhtA5IzDKAi_URAQf2yZh1HWVYM6GckbsKi5b5XYJvN_naadzo9Fsq9AQCtRa99EWluX0HFgL9cZZLgBlDU06-lXkJWmX2sCdol6zkDN1CwoDpS2kEPMe5zmJ7Kl0_5XXU7PUFvgjasZVH6d43QvAlOhXeIV0m2Nf9Und3qHxKMEgC6-20KUCbZH2Z6-atG0z2yyaCOM9GKDXJhmvYhVcKD6i7SFGHNNJwkgQUl9hyqVhWl-R0H0mUN7XBE5lrzRVmfmyROhbhZ8rCA-laJQsA2D667HjEFc8D2E8ltnxNEoxIRDd8DBP1PmukxbB5uMqmUUs3FaMQqb77m6FnSrXOgzUFTITxeytaZLa6ObuRycyj5JecEkeAmfNZy8JDx6caDadgzD_oVWMFAmmVG7xLH-kU7Sg8rRiryLCst2PiEKSWuX8zAneNflpKI2-g89TNsldsrk5Lwpbk0FU2H_OTU5cjNIQ=s36-no';
    function createMarkerMovie(place){
      let placeLoc = place.geometry.location;
      let marker = new google.maps.Marker({
        position: place.geometry.location,
        icon: image,
        map: map
        // animation: google.maps.Animation.DROP,
      });
      markers.push(marker);
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
           if(foodMarkers.length > 0){
             deletefoodMarkers();
           }
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
function clearMarkers() {
  setMapOnAll(null);
}
