'use strict';
(function(module){
  const searchController = {};
  searchController.showSearch = function(){
    $('.tab').hide();
    $('#search-icon').hide();
    $('#about-icon').show();
    $('#map-icon').show();
    $('#search').fadeIn('slow');
  }
  module.searchController = searchController;
})(window);
