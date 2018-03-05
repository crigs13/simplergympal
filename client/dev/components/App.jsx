import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { Tabs, Tab } from 'material-ui/Tabs';
import SwipeableViews from 'react-swipeable-views';
import Workouts from './Workouts.jsx';
import Categories from './Categories.jsx';
import Stats from './Stats.jsx';
import WorkoutDialog from './WorkoutDialog.jsx';
import CategoryDialog from './CategoryDialog.jsx';
import SetDialog from './SetDialog.jsx';

import axios from 'axios';

const styles = {
  customWidth: {
    width: 200,
  },
  headline: {
    fontSize: 24,
    paddingTop: 16,
    marginBottom: 12,
    fontWeight: 400,
  },
  slide: {
    padding: 10,
  },
};

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: 'chris',
      workoutSelector: 1,
      slideIndex: 0,
      latestExercises: [],
      exerciseSetData: [],
      workoutDialogOpen: false,
      exerciseDialogOpen: false,
      newWorkoutButtonState: true,
      newExerciseButtonState: true,
      addSetButtonState: true,
      newWorkoutName: '',
      newWorkoutCategory: '',
      exerciseRepCount: 0,
      exerciseWeight: 0,
      existingCategoryValue: null,
      newCategoryDialogState: true,
      categoryButtonText: 'Add New Category',
      setData: [],
      userWorkouts: [],
      userCategories: [],
      currentWorkout: '',
      currentCategory: '',
      currentExerciseId: '',
      setDialogOpen: false,
      allExercisesButtonState: true,
    };
    this.addNewExerciseToDB = this.addNewExerciseToDB.bind(this);
    this.addNewSetsToDB = this.addNewSetsToDB.bind(this);
    this.addNewWorkout = this.addNewWorkout.bind(this);
    this.addSet = this.addSet.bind(this);
    this.checkRequiredNewExerciseFields = this.checkRequiredNewExerciseFields.bind(this);
    this.checkRequiredNewWorkoutFields = this.checkRequiredNewWorkoutFields.bind(this);
    this.checkRequiredSetInformation = this.checkRequiredSetInformation.bind(this);
    this.getAllExercises = this.getAllExercises.bind(this);
    this.getLatestExercises = this.getLatestExercises.bind(this);
    this.getUsersCategories = this.getUsersCategories.bind(this);
    this.getUsersWorkouts = this.getUsersWorkouts.bind(this);
    this.handleCategoryDialogListClick = this.handleCategoryDialogListClick.bind(this);
    this.handleCategoryListClick = this.handleCategoryListClick.bind(this);
    this.handleExistingCategorySelect = this.handleExistingCategorySelect.bind(this);
    this.handleRepChange = this.handleRepChange.bind(this);
    this.handleNewCategorySelect = this.handleNewCategorySelect.bind(this);
    this.handleNewWorkoutCategoryChange = this.handleNewWorkoutCategoryChange.bind(this);
    this.handleNewWorkoutNameChange = this.handleNewWorkoutNameChange.bind(this);
    this.handleTabChange = this.handleTabChange.bind(this);
    this.handleWeightChange = this.handleWeightChange.bind(this);
    this.handleWorkoutListClick = this.handleWorkoutListClick.bind(this);
    this.handleLatestExerciseListClick = this.handleLatestExerciseListClick.bind(this);
    this.toggleSetDialog = this.toggleSetDialog.bind(this);
    this.toggleCategoryDialog = this.toggleCategoryDialog.bind(this);
    this.toggleWorkoutDialog = this.toggleWorkoutDialog.bind(this);
    this.toggleExerciseDialog = this.toggleExerciseDialog.bind(this);
  }

  componentDidMount() {
    this.getLatestExercises();
    this.getUsersCategories();
    this.getUsersWorkouts();
  }

  getLatestExercises() {
    axios.post('/exercises/latest', {
      username: this.state.username,
    })
      .then((data) => {
        this.setState({
          latestExercises: data.data,
        }, () => {
          if (!this.state.allExercisesButtonState) {
            this.setState({
              allExercisesButtonState: true,
            });
          }
        });
      })
      .catch((err) => {
        console.log('ERROR in getLatestExercises, error: ', err);
      });
  }

  getAllExercises() {
    axios.post('/exercises/all', {
      username: this.state.username,
    })
      .then((data) => {
        this.setState({
          latestExercises: data.data,
          allExercisesButtonState: false,
        });
      })
      .catch((err) => {
        console.log('ERROR in getLatestExercises, error: ', err);
      });
  }

  getUsersCategories() {
    axios.post('/categories', { username: this.state.username })
      .then((res) => {
        const temp = [];
        res.data.forEach((category) => {
          temp.push(category.category);
        });
        this.setState({
          userCategories: temp,
        });
      })
      .catch((err) => {
        console.log('ERROR in getUsersCategories, error: ', err);
      });
  }

  getUsersWorkouts() {
    axios.post('/workouts', { username: this.state.username })
      .then((res) => {
        const temp = [];
        res.data.forEach((workout) => {
          temp.push(workout.name);
        });
        this.setState({
          userWorkouts: temp,
        });
      })
      .catch((err) => {
        console.log('ERROR in componentDidMount within Workouts.jsx, error: ', err);
      });
  }

  handleTabChange(value) {
    this.setState({
      slideIndex: value,
    });
  }

  handleRepChange(e) {
    this.setState({
      exerciseRepCount: e.target.value,
    }, this.checkRequiredNewExerciseFields);
  }

  handleWeightChange(e) {
    this.setState({
      exerciseWeight: e.target.value,
    }, this.checkRequiredNewExerciseFields);
  }

  handleExerciseDialogOpen() {
    this.setState({
      exerciseDialogOpen: true,
      setData: [],
      exerciseRepCount: 0,
      exerciseWeight: 0,
      newExerciseButtonState: true,
      addSetButtonState: true,
    });
  }

  handleNewWorkoutNameChange(e) {
    this.setState({
      newWorkoutName: e.target.value,
    }, this.checkRequiredNewWorkoutFields);
  }

  handleNewWorkoutCategoryChange(e) {
    this.setState({
      newWorkoutCategory: e.target.value,
    }, this.checkRequiredNewWorkoutFields);
  }

  handleWorkoutListClick(workout) {
    this.setState({
      currentWorkout: workout,
    }, this.toggleExerciseDialog);
  }

  handleExistingCategorySelect(event, index, value) {
    this.setState({
      existingCategoryValue: value,
      newWorkoutCategory: value,
    }, this.checkRequiredNewWorkoutFields);
  }

  handleNewCategorySelect() {
    this.setState({
      newCategoryDialogState: !this.state.newCategoryDialogState,
    }, () => {
      if (this.state.newCategoryDialogState) {
        this.setState({
          categoryButtonText: 'Add New Category',
        });
      } else {
        this.setState({
          categoryButtonText: 'Show List',
        });
      }
    });
    this.setState({
      newWorkoutCategory: '',
    }, this.checkRequiredNewWorkoutFields);
  }

  checkRequiredNewExerciseFields() {
    if (!isNaN(this.state.exerciseRepCount)
      && !isNaN(this.state.exerciseWeight)
      && this.state.exerciseRepCount > 0
      && this.state.exerciseWeight > 0) {
      if (this.state.exerciseRepCount.length && this.state.exerciseWeight.length) {
        this.setState({
          addSetButtonState: false,
        });
      } else {
        this.setState({
          addSetButtonState: true,
        });
      }
    } else {
      this.setState({
        addSetButtonState: true,
      });
    }
  }

  checkRequiredSetInformation() {
    if (this.state.setData.length) {
      this.setState({
        newExerciseButtonState: false,
      });
    } else {
      this.setState({
        newExerciseButtonState: true,
      });
    }
  }

  checkRequiredNewWorkoutFields() {
    if (this.state.newWorkoutCategory !== null) {
      if (this.state.newWorkoutName.length && this.state.newWorkoutCategory.length) {
        this.setState({
          newWorkoutButtonState: false,
        });
      } else {
        this.setState({
          newWorkoutButtonState: true,
        });
      }
    } else {
      this.setState({
        newWorkoutButtonState: true,
      });
    }
  }

  addNewWorkout() {
    axios.post('/workouts/add', {
      username: this.state.username,
      name: this.state.newWorkoutName,
      category: this.state.newWorkoutCategory,
    })
      .then(() => {
        this.setState({ workoutDialogOpen: false });
        this.getUsersWorkouts();
        this.getUsersCategories();
      })
      .catch((err) => {
        console.log('ERROR in axios.post within addNewWorkout, error: ', err);
      });
  }

  addNewExerciseToDB() {
    const date = new Date().toISOString().slice(0, 19).replace('T', ' ');
    axios.post('/exercises/add', {
      workoutName: this.state.currentWorkout,
      date: date,
    })
      .then((data) => {
        this.addNewSetsToDB(data.data.insertId);
        this.toggleExerciseDialog();
      })
      .catch((err) => {
        console.log('ERROR in axios.post within addNewExerciseToDB, error: ', err);
      });
  }

  addNewSetsToDB(exerciseId) {
    axios.post('/sets/add', {
      setData: this.state.setData,
      exerciseId: exerciseId,
    })
      .then((data) => {
        this.setState({
          setData: [],
          currentWorkout: '',
          exerciseRepCount: 0,
          exerciseWeight: 0,
          addSetButtonState: true,
          newExerciseButtonState: true,
        }, this.getLatestExercises);
      })
      .catch((err) => {
        console.log('ERROR in axios.post within addNewSetsToDB, error: ', err);
      });
  }

  addSet() {
    const temp = this.state.setData.slice();
    temp.push({
      weight: this.state.exerciseWeight,
      reps: this.state.exerciseRepCount,
    });
    this.setState({
      setData: temp,
    }, this.checkRequiredSetInformation);
  }

  handleCategoryListClick(category) {
    axios.post('/categories/workouts', {
      username: this.state.username,
      category: category,
    })
      .then((res) => {
        const temp = [];
        res.data.forEach((workout) => {
          temp.push(workout.name);
        });
        this.setState({
          userWorkouts: temp,
          currentCategory: category,
        }, this.toggleCategoryDialog);
      })
      .catch((err) => {
        console.log('ERROR in handleCategoryListClick, error: ', err);
      });
  }

  handleCategoryDialogListClick(workout) {
    this.toggleCategoryDialog();
    this.handleWorkoutListClick(workout);
  }

  toggleCategoryDialog() {
    this.setState({
      categoryDialogOpen: !this.state.categoryDialogOpen,
    }, () => {
      if (!this.state.categoryDialogOpen) {
        this.getUsersWorkouts();
      }
    });
  }

  toggleWorkoutDialog() {
    this.setState({
      workoutDialogOpen: !this.state.workoutDialogOpen,
    });
    this.checkRequiredNewExerciseFields();
  }

  toggleSetDialog() {
    this.setState({
      setDialogOpen: !this.state.setDialogOpen,
    }, () => {
      if (!this.state.setDialogOpen) {
        this.setState({
          setData: [],
        });
      }
    });
  }

  toggleExerciseDialog() {
    this.setState({
      exerciseDialogOpen: !this.state.exerciseDialogOpen,
    });
  }

  handleLatestExerciseListClick(exerciseId) {
    this.setState({
      currentExerciseId: exerciseId,
    }, () => {
      axios.post('/exercises/sets/data', {
        exerciseId: exerciseId,
      })
        .then((data) => {
          this.setState({
            exerciseSetData: data.data,
          });
        })
        .catch((err) => {
          console.log('ERROR in handleLatestExerciseListClick, error: ', err);
        });
    });
    this.toggleSetDialog();
  }

  render() {
    return (
      <MuiThemeProvider>
        <SetDialog
          exerciseSetData={this.state.exerciseSetData}
          setDialogOpen={this.state.setDialogOpen}
          toggleSetDialog={this.toggleSetDialog}
        />
        <CategoryDialog
          currentCategory={this.state.currentCategory}
          categoryDialogOpen={this.state.categoryDialogOpen}
          handleCategoryDialogListClick={this.handleCategoryDialogListClick}
          handleCategoryListClick={this.handleCategoryListClick}
          userWorkouts={this.state.userWorkouts}
          toggleCategoryDialog={this.toggleCategoryDialog}
        />
        <WorkoutDialog
          addNewExerciseToDB={this.addNewExerciseToDB}
          addNewWorkout={this.addNewWorkout}
          addSet={this.addSet}
          addSetButtonState={this.state.addSetButtonState}
          categoryButtonText={this.state.categoryButtonText}
          exerciseDialogOpen={this.state.exerciseDialogOpen}
          existingCategoryValue={this.state.existingCategoryValue}
          handleExistingCategorySelect={this.handleExistingCategorySelect}
          handleNewCategorySelect={this.handleNewCategorySelect}
          handleNewWorkoutNameChange={this.handleNewWorkoutNameChange}
          handleNewWorkoutCategoryChange={this.handleNewWorkoutCategoryChange}
          handleRepChange={this.handleRepChange}
          handleWeightChange={this.handleWeightChange}
          newCategoryDialogState={this.state.newCategoryDialogState}
          newExerciseButtonState={this.state.newExerciseButtonState}
          newWorkoutButtonState={this.state.newWorkoutButtonState}
          userCategories={this.state.userCategories}
          workoutDialogOpen={this.state.workoutDialogOpen}
          toggleWorkoutDialog={this.toggleWorkoutDialog}
          toggleExerciseDialog={this.toggleExerciseDialog}
          currentWorkout={this.state.currentWorkout}
        />
        <Tabs
          onChange={this.handleTabChange}
          value={this.state.slideIndex}
        >
          <Tab label="Latest Exercises" value={0} />
          <Tab label="All Workouts" value={1} />
          <Tab label="All Categories" value={2} />
        </Tabs>
        <SwipeableViews
          index={this.state.slideIndex}
          onChangeIndex={this.handleTabChange}
        >
          <div style={styles.slide}>
            <h2 style={styles.headline}>Latest Exercises</h2>
            <Stats
              allExercisesButtonState={this.state.allExercisesButtonState}
              latestExercises={this.state.latestExercises}
              handleLatestExerciseListClick={this.handleLatestExerciseListClick}
              getAllExercises={this.getAllExercises}
              getLatestExercises={this.getLatestExercises}
            />
          </div>
          <div style={styles.slide}>
            <h2 style={styles.headline}>Workouts</h2>
            <Workouts
              handleWorkoutListClick={this.handleWorkoutListClick}
              userWorkouts={this.state.userWorkouts}
              toggleWorkoutDialog={this.toggleWorkoutDialog}
            />
          </div>
          <div style={styles.slide}>
            <h2 style={styles.headline}>Categories</h2>
            <Categories
              userCategories={this.state.userCategories}
              handleCategoryListClick={this.handleCategoryListClick}
            />
          </div>
        </SwipeableViews>
      </MuiThemeProvider>
    );
  }
}
