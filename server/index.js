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
  dbhelper.addNewWorkout(name, category, username, (data) => {
    res.status(201).send(data);
  });
});

app.post('/categories', (req, res) => {
  const { username } = req.body;
  dbhelper.getUsersCategories(username, (data) => {
    res.status(200).send(data);
  });
});

app.post('/workouts', (req, res) => {
  const { username } = req.body;
  dbhelper.getUsersWorkouts(username, (data) => {
    res.status(200).send(data);
  });
});

const port = 9001;

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});

module.exports.app = app;
