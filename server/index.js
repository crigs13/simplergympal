const express = require('express');
const parser = require('body-parser');
const mysql = require('mysql');
const request = require('request');
const dbhelper = require('../database/dbhelpers.js');
const app = express();

app.use(parser.json());
app.use(express.static(__dirname + '/../client/dist'));

app.set('port', 9001);

app.post('/addWorkout', (req, res) => {
  const { name, category, username } = req.body;
  console.log('this is the data sent; name, category, username: ', name, category, username);
  dbhelper.addNewWorkout(name, category, username, (data) => {
    console.log('successful add ');
    res.status(201).send(data);
  });
});

const port = 9001;

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});

module.exports.app = app;
