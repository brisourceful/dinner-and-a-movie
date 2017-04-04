'use strict';

function Bio (opts) {
  this.image = opts.image;
  this.name = opts.name;
  this.github = opts.github;
  this.bio = opts.bio;
}

Bio.all = [];

const bioView = {};

Bio.toHtml = function() {
  let template = Handlebars.compile($('#bio-template').html());
  Bio.all.forEach(function(ele){
    $('#about').append(template(ele));
  })
};

Bio.loadAll = function(rawData) {
  rawData.forEach(function(ele) {
    Bio.all.push(new Bio(ele));
  })
}


Bio.fetchAll = function() {
  if (localStorage.rawData) {
      Bio.loadAll(JSON.parse(localStorage.rawData));
    Bio.toHtml();
  } else {
    $.getJSON('/data/about-bio.json')
    .then(function(data) {
      localStorage.rawData = JSON.stringify(data);
      Bio.loadAll(data);
      Bio.toHtml();
    }, function(err){
      console.error(err);
    }
  );
  }
}

Bio.fetchAll();
