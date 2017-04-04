'use strict';
(function(module){
  const searchController = {};
  searchController.showSearch = function(){
    $('#about').hide();
    $('#map').hide();
    $('#search-icon').hide();
    $('#about-icon').show();
    $('#map-icon').show();
    $('#search').fadeIn('slow');
  }
  module.searchController = searchController;
})(window);
