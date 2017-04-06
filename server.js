'use strict';
const express = require('express');
const request = require('superagent');
const pg = require('pg');
const PORT = process.env.PORT || 3000;
const app = express();
app.use(express.static('./public'));

app.get('/getlocation', function(req, res){
 request.get(`https://maps.googleapis.com/maps/api/place/radarsearch/json?location=${req.headers.lat},${req.headers.long}&radius=5000&type=movie_theater&key=AIzaSyA-iDM4BAeMDij24qqNdj-g4BL-G9Y7afk`)

 .end(function(err, response){
   res.send(response.body);
 });
});

app.get('/getMovieInfo', function(req, res){
 request.get(`https://maps.googleapis.com/maps/api/place/details/json?placeid=${req.headers.place}&key=AIzaSyA-iDM4BAeMDij24qqNdj-g4BL-G9Y7afk`)
 .end(function(err, response){
   res.send(response.body);
 });
});

app.get('/getFood', function(req, res){
  request.get(`https://maps.googleapis.com/maps/api/place/radarsearch/json?location=${req.headers.lat},${req.headers.long}&radius=804&type=restaurant&key=AIzaSyA-iDM4BAeMDij24qqNdj-g4BL-G9Y7afk`)
  .end(function(err, response){
    res.send(response.body);
  });
});

app.get('/getFoodInfo', function(req, res){
  request.get(`https://maps.googleapis.com/maps/api/place/details/json?placeid=${req.headers.place}&key=AIzaSyA-iDM4BAeMDij24qqNdj-g4BL-G9Y7afk`)
  .end(function(err, response){
    res.send(response.body);
  });
});

app.get('/*', (request, response) => response.sendFile('/public/index.html', {root: '.'}));


app.listen(PORT, function(){
  console.log(`being hosted on ${PORT}`);
});
