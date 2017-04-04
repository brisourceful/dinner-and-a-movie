(function(module){
  const mapController = {};
  mapController.showMap = function(){
    $('#about').hide();
    $('#search').hide();
    $('#map-icon').hide();
    $('#about-icon').show();
    $('#search-icon').show();
    $('#map').fadeIn('slow');
  }
  module.mapController = mapController;
})(window);
