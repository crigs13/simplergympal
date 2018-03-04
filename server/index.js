const express = require('express');
const parser = require('body-parser');
const dbhelper = require('../database/dbhelpers.js');

const app = express();

app.use(parser.json());
app.use(express.static(__dirname + '/../client/dist'));

app.set('port', 9001);

app.post('/workouts/add', (req, res) => {
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

app.post('/exercises/add', (req, res) => {
  const { workoutName, date } = req.body;
  dbhelper.addNewExercise(workoutName, date, null, null, (data) => {
    res.status(201).send(data);
  });
});

app.post('/sets/add', (req, res) => {
  const { exerciseId, setData } = req.body;
  dbhelper.addAllSetData(exerciseId, setData, () => {
    res.status(201).send();
  });
});

app.post('/categories/workouts', (req, res) => {
  const { username, category } = req.body;
  dbhelper.getUserWorkoutsByCategory(username, category, (data) => {
    res.status(200).send(data);
  });
});

app.post('/exercises/latest', (req, res) => {
  const { username } = req.body;
  dbhelper.getLatestExercises(username, (data) => {
    res.status(200).send(data);
  });
});

app.post('/exercises/sets/data', (req, res) => {
  const { exerciseId } = req.body;
  dbhelper.getExerciseSetData(exerciseId, (data) => {
    res.status(200).send(data);
  });
});

const port = 9001;

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});

module.exports.app = app;
