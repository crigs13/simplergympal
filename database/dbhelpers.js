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
  console.log('within addNewExercise, fields sent: ', workoutName, date, location, notes);
  const queryString = 'INSERT INTO exercises (workout_ID, date, location, notes) VALUES ((SELECT id FROM workouts WHERE name=?), ?, ?, ?)';
  console.log('this is the queryString: ', queryString);
  db.query(queryString, [workoutName, date, location, notes], (err, result) => {
    if (err) {
      console.log('ERROR in dbhelpers addNewExercise, error: ', err);
      // cb(err);
    } else {
      console.log('Successful addition of exercise to DB');
      cb();
    }
  });
};

exports.addAllSetData = (workoutName, setData, cb) => {
  const queryString = 'INSERT INTO sets (setNumber, weight, reps, exercise_ID) VALUES (?, ?, ?, (SELECT id FROM workouts WHERE name=?))';
  let itemsProcessed = 0;
  setData.forEach((set, i, array) => {
    db.query(queryString, [i + 1, set.weight, set.reps, workoutName], (err, result) => {
      if (err) {
        console.log('ERROR in dbhelpers addAllSetData, error: ', err);
      } else {
        console.log('Successful addition of sets to DB');
        itemsProcessed += 1;
        if (itemsProcessed === array.length) {
          console.log('all items processed!');
          cb(result);
        }
      }
    });
  });
};

exports.getUsersWorkouts = (username, cb) => {
  const queryString = 'SELECT name FROM workouts WHERE user_ID=(SELECT id FROM users WHERE username=?)';
  db.query(queryString, [username], (err, result) => {
    if (err) {
      console.log('ERROR in dbhelpers getUsersWorkouts, error: ', err);
      // cb(err);
    } else {
      console.log('Successful retrieval of User\'s Workouts');
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
      console.log('Successful retrieval of User\'s Cateogries');
      cb(result);
    }
  });
};

exports.getUserWorkoutsByCategory = (username, category, cb) => {
  const queryString = 'SELECT name FROM workouts WHERE user_ID=(SELECT id FROM users WHERE username=?) AND category=?';
  db.query(queryString, [username, category], (err, result) => {
    if (err) {
      console.log('ERROR in dbhelpers getUserWorkoutsByCategory, error: ', err);
    } else {
      cb(result);
    }
  });
};
