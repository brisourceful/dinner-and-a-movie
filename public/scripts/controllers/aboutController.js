(function(module){
  const aboutController = {};
  aboutController.showAbout = function(){
    $('.tab').hide();
    $('#about-icon').hide();
    $('#map-icon').show();
    $('#search-icon').show();
    $('#about').fadeIn('slow');
  }
  module.aboutController = aboutController;
})(window);
