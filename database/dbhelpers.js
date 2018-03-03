const db = require('./index.js').connection;

exports.addNewUser = (username, password, cb) => {
  const queryString = 'INSERT INTO users (username, hashpw) VALUES (?, ?)';
  db.query(queryString, [username, password], (err, result) => {
    if (err) {
      console.log('ERROR in dbhelpers addNewUser, error: ', err);
      // cb(err);
    } else {
      cb(result);
    }
  });
};

exports.addNewWorkout = (name, category, username, cb) => {
  const queryString = 'INSERT INTO workouts (name, category, user_ID) VALUES (?, ?, (SELECT id FROM users WHERE username = ?))';
  db.query(queryString, [name, category, username], (err, result) => {
    if (err) {
      console.log('ERROR in dbhelpers addNewWorkout, error: ', err);
      // cb(err);
    } else {
      cb(result);
    }
  });
};

exports.addNewExercise = (workoutName, date, location, notes, cb) => {
  const queryString = 'INSERT INTO exercises (workout_ID, date, location, notes) VALUES ((SELECT id FROM workouts WHERE name = ?), ?, ?, ?)';
  db.query(queryString, [workoutName, date, location, notes], (err, result) => {
    if (err) {
      console.log('ERROR in dbhelpers addNewExercise, error: ', err);
      // cb(err);
    } else {
      cb(result);
    }
  });
};

exports.addSetData = (exerciseID, setNumber, weight, reps, cb) => {
  const queryString = 'INSERT INTO sets (exercise_ID, setNumber, weight, reps) VALUES (?, ?, ?, ?)';
  db.query(queryString, [exerciseID, setNumber, weight, reps], (err, result) => {
    if (err) {
      console.log('ERROR in dbhelpers addSetData, error: ', err);
      // cb(err);
    } else {
      cb(result);
    }
  });
};

exports.getUsersWorkouts = (username, cb) => {
  const queryString = 'SELECT name FROM workouts WHERE user_ID=(SELECT id FROM users WHERE username=?)';
  db.query(queryString, [username], (err, result) => {
    if (err) {
      console.log('ERROR in dbhelpers getUsersWorkouts, error: ', err);
      // cb(err);
    } else {
      cb(result);
    }
  });
};

exports.getUsersCategories = (username, cb) => {
  const queryString = 'SELECT DISTINCT category FROM workouts WHERE user_ID=(SELECT id FROM users WHERE username=?)';
  db.query(queryString, [username], (err, result) => {
    if (err) {
      console.log('ERROR in dbhelpers getUsersCategories, error: ', err);
    } else {
      cb(result);
    }
  });
};
