(function(module){
  const aboutController = {};
  aboutController.showAbout = function(){
    $('.tab').hide();
    $('#about').fadeIn('slow');
  }
})(window);
