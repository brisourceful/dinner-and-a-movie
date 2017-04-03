'use strict';

function Bio (opts) {
  this.image = opts.image;
  this.name = opts.name;
  this.github = opts.github;
  this.bio = opts.bio;
}

Bio.all = [];

const bioView = {};

Bio.prototype.toHtml = function() {
  let template = Handlebars.compile($('#bio-template').text());

  return template(this);
};

Bio.loadAll = function(rawData) {

  rawData.forEach(function(ele) {
    Bio.all.push(new Bio(ele));
  })
}


Bio.fetchAll = function() {
  if (localStorage.rawData) {
      Bio.loadAll(JSON.parse(localStorage.rawData));
    bioView.initIndexPage();
  } else {
    $.getJSON('/data/about-bio.json')
    .then(function(data) {
      console.log(data);
      localStorage.rawData = JSON.stringify(data);
      Bio.loadAll(data);
      bioView.initIndexPage();
    }, function(err){
      console.error(err);
    }
  );
  }
}

bioView.initIndexPage = function() {
  Bio.all.forEach(function(a) {
    $('#about').append(a.toHtml())
  })
};
