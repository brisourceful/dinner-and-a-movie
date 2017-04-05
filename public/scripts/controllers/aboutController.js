(function(module){
  const aboutController = {};
  aboutController.showAbout = function(){
    $('#map').hide();
    $('#home').hide();
    $('#about-icon').hide();
    $('#map-icon').show();
    $('#home-icon').show();
    $('#about').fadeIn('slow');
  }
  module.aboutController = aboutController;
})(window);
