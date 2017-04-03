'use strict';
const express = require('express');
const pg = require('pg');
const PORT = process.env.PORT || 3000;
const app = express();
const conString = 'postgres://localhost/kilovolt;';
app.use(express.static('./public'));
app.get('/', (request, response) => response.sendFile('index.html', {root: '.'}));
app.listen(PORT, function(){
  console.log(`being hosted on ${PORT}`);
});
