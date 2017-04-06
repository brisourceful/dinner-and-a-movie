'use strict';
(function(module){
  const homeController = {};
  homeController.showHome = function(){
    $('#about').hide();
    $('#home-icon').hide();
    $('#map').hide();
    $('#home').fadeIn();
    $('#about-icon').show();
    $('#map-icon').show();

  }
  module.homeController = homeController;
})(window);

$('.hamburger-button').on('click', function(){
  $('#navigation').show();
});
