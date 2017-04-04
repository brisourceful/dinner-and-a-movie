(function(module){
  const aboutController = {};
  aboutController.showAbout = function(){
    $('#map').hide();
    $('#search').hide();
    $('#about-icon').hide();
    $('#map-icon').show();
    $('#search-icon').show();
    $('#about').fadeIn('slow');
  }
  module.aboutController = aboutController;
})(window);
