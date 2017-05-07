'use strict';
(function(module){
  const homeController = {};
  homeController.showHome = function(){
    $('#about').hide();
    $('#home-icon').hide();
    $('#home').fadeIn();
    $('#about-icon').show();
    $('#map-icon').show();
    $('#map').hide();

  }
  module.homeController = homeController;
})(window);

$('.hamburger-button').on('click', function(){
  $('#navigation').show();
});
