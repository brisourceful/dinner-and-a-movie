(function(module){
  const mapController = {};
  mapController.showMap = function(){
    $('#about').hide();
    $('#home').hide();
    $('#map-icon').hide();
    $('#about-icon').show();
    $('#home-icon').show();
    $('#map').fadeIn('slow');
  }
  module.mapController = mapController;
})(window);
