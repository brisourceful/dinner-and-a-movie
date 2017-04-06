'use strict';
(function(module){
  const homeController = {};
  homeController.showHome = function(){
    $('#about').hide();
    $('#map').hide();
    $('#home-icon').hide();
    $('#about-icon').show();
    $('#map-icon').show();
    $('#search').fadeIn('slow');
  }
  module.homeController = homeController;
})(window);

$('.hamburger-button').on('click', function(){
  $('#navigation').show();
});
