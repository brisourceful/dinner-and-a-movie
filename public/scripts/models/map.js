'use strict';


let markers = [];
let foodMarkers = [];
let infoMovieArray = [];
let infoFoodArray = [];

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
    })

    let imageFood = 'https://lh3.googleusercontent.com/bI7zYcPlfE9HGLEbQflx6YxrpT84hNZPBjsGdKl2KdQOilwwyXDlRjUml89jwTjfqnq2co8Ao2Jz4YfcnI4OSp5XbEW3yAzwRfqEtZRfvR-SqyTKpYeFcNoeWYQ9u7fTtKqt2mj8Lue0PFUREfVr6V4p_1GY2j5Pt2kccnWGpU-X0V6HS5ZBwz5A5Q_k2MGOB1DV216k2Qtuh00z0lGAJtnBOpmS17wkjDbNfkpJoAVhZondAqxvbGmZpYG2NlKvZw0dO1bImpLoXafhHxne19qjqMOpjaEMT6atJpDwfkEvJ7Zd_WyObn7V8KAYmNzZfzfPS6UPXwFgts61WXErZc1PhzpCCZrNskEuzLbQ0BC5aNr3GV3o40OUU9wp26Cvu_ZKqaxM9fRMDNGfj_j90rXzc5tNyLXX3E5R0V3PeR-Js-O7jKlcm_41NTgFKqnbfutqfa56HkpN1yT68K3blb8juw87JZdwTNMAqw1HkfSnMOxwmrjdgCxNuQCog00waqqCxQlzkSMkjEajdKXO0ohcSZRMoUssITn-0gYzQAUmQVmJAsqlbILyxYIHn4tXIEpsqFqydXqNlEM_gS0umGmejGqJJH-Gzd4WzyYNCn9tHZWSkNTtLDF9QNgYmFCnGOEVK98kZ-CUZ_kdtugT1BX2ISvq0zBsJWfmFAp_fA=w33-h42-no';
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

    let image = 'https://lh3.googleusercontent.com/mZx_oJ0k4ZQ728nFwM8zTR1IU_Wo8vw5DEeFY80_JMbmkG5t8cZojN42TtH9J-K7pBFjNY9Onkjp9qNvg2P1l2EGzosnKpDK_f-rdM10C3ySYaTraj8NDw6fCtXp_b9TWVhEuo51sS5RG3KlIoG0XtwmJseVQm_quipXpt4lbsk1Z59zeZ7cfElFoTwwdz4xoWUttmHKdnoPRTJne3OR0g9V_-YLQV_qt5kXRtaY-kl26ZolNkaH0HAdQNm_RmLXaCeFqDhWSqL_8MtxfF-q48y_LhIPewIqcEJKJHWH6I3jmVFBjK1WR1-FrRubYUbBLHykodplEJ9vQ6Gh6aGUg4dIFi23NBnEHZ7Noetty-NkLJtaP4K76M8EZkzP9AaVlHuUqGqn_hE_61hRgHgNlVERU6O-jYFaSDDDD-t3CPt6gSbcXVjp6O9CHqsLQSiNWLyxziaJBifnLl9wpMaBTi75eGCl1eBPMQRU_mS4gCxCoV5EUHwa2q5sOuy0zYczINX6kkkXycx6cnDWDss5a4VNyfLt7hIBN3CJSIvFAhGNy-wg27U1id8dH7sh05gMP5tGTBbtig_iw6lPcWMdH1tp14_XkbuHJbUHGLOa1CcJGnQtqGNm=s36-no';
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
