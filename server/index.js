const express = require('express');
const parser = require('body-parser');
const mysql = require('mysql');
const request = require('request');
const app = express();

app.use(parser.json());
app.use(express.static(__dirname + '/../client/dist'));

app.set('port', 9001);

const port = 9001;

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});

module.exports.app = app;
