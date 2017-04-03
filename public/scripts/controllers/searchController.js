'use strict';
(function(module){
  const searchController = {};
  searchController.showSearch = function(){
    $('.tab').hide();
    $('#search').fadeIn('slow');
  }
})(window);
