import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { Tabs, Tab } from 'material-ui/Tabs';
import Dialog from 'material-ui/Dialog';
import RaisedButton from 'material-ui/RaisedButton';
import SwipeableViews from 'react-swipeable-views';
import Workouts from './Workouts.jsx';
import Categories from './Categories.jsx';
import Stats from './Stats.jsx';
import WorkoutDialog from './WorkoutDialog.jsx';
import CategoryDialog from './CategoryDialog.jsx';

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
    };
    this.handleTabChange = this.handleTabChange.bind(this);
    this.getLatestExercises = this.getLatestExercises.bind(this);
    this.getUsersCategories = this.getUsersCategories.bind(this);
    this.getUsersWorkouts = this.getUsersWorkouts.bind(this);
    this.handleRepChange = this.handleRepChange.bind(this);
    this.handleWeightChange = this.handleWeightChange.bind(this);
    this.handleExerciseDialogOpen = this.handleExerciseDialogOpen.bind(this);
    this.handleExerciseDialogClose = this.handleExerciseDialogClose.bind(this);
    this.handleWorkoutDialogOpen = this.handleWorkoutDialogOpen.bind(this);
    this.handleWorkoutDialogClose = this.handleWorkoutDialogClose.bind(this);
    this.handleNewWorkoutNameChange = this.handleNewWorkoutNameChange.bind(this);
    this.handleNewWorkoutCategoryChange = this.handleNewWorkoutCategoryChange.bind(this);
    this.handleWorkoutListClick = this.handleWorkoutListClick.bind(this);
    this.handleExistingCategorySelect = this.handleExistingCategorySelect.bind(this);
    this.handleNewCategorySelect = this.handleNewCategorySelect.bind(this);
    this.checkRequiredNewExerciseFields = this.checkRequiredNewExerciseFields.bind(this);
    this.checkRequiredSetInformation = this.checkRequiredSetInformation.bind(this);
    this.checkRequiredNewWorkoutFields = this.checkRequiredNewWorkoutFields.bind(this);
    this.addNewWorkout = this.addNewWorkout.bind(this);
    this.addNewExerciseToDB = this.addNewExerciseToDB.bind(this);
    this.addNewSetsToDB = this.addNewSetsToDB.bind(this);
    this.addSet = this.addSet.bind(this);
    this.handleCategoryListClick = this.handleCategoryListClick.bind(this);
    this.handleCategoryDialogClose = this.handleCategoryDialogClose.bind(this);
    this.handleCategoryDialogOpen = this.handleCategoryDialogOpen.bind(this);
    this.handleCategoryDialogListClick = this.handleCategoryDialogListClick.bind(this);
  }

  componentDidMount() {
    this.getUsersCategories();
    this.getUsersWorkouts();
  }

  handleTabChange(value) {
    this.setState({
      slideIndex: value,
    });
  }

  getLatestExercises() {
    // axios.post('/exercises/latest', {
    //
    // })
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

  handleExerciseDialogClose() {
    this.setState({ exerciseDialogOpen: false });
  }

  handleWorkoutDialogOpen() {
    this.setState({ workoutDialogOpen: true });
  }

  handleWorkoutDialogClose() {
    this.setState({ workoutDialogOpen: false });
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
    });
    this.handleExerciseDialogOpen();
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
      })
      .catch((err) => {
        console.log('ERROR in axios.post within addNewWorkout, error: ', err);
      });
  }

  addNewExerciseToDB() {
    console.log('adding new exercise to DB');
    const date = new Date().toISOString().slice(0, 19).replace('T', ' ');
    axios.post('/exercises/add', {
      workoutName: this.state.currentWorkout,
      date: date,
    })
      .then(() => {
        this.addNewSetsToDB();
        this.setState({ exerciseDialogOpen: false });
      })
      .catch((err) => {
        console.log('ERROR in axios.post within addNewExerciseToDB, error: ', err);
      });
  }

  addNewSetsToDB() {
    axios.post('/sets/add', {
      setData: this.state.setData,
      workoutName: this.state.currentWorkout,
    })
      .then((res) => {
        // console.log('response from server: ', res);
        this.setState({
          setData: [],
          currentWorkout: '',
        });
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
    // display all workouts associated with that category
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
        }, this.handleCategoryDialogOpen);
      })
      .catch((err) => {
        console.log('ERROR in handleCategoryListClick, error: ', err);
      });
  }

  handleCategoryDialogClose() {
    this.setState({ categoryDialogOpen: false });
  }

  handleCategoryDialogOpen() {
    this.setState({ categoryDialogOpen: true });
  }

  handleCategoryDialogListClick(workout) {
    this.setState({
      categoryDialogOpen: false,
    });
    this.handleWorkoutListClick(workout);
  }

  render() {
    return (
      <MuiThemeProvider>
        <CategoryDialog
          categoryDialogOpen={this.state.categoryDialogOpen}
          handleCategoryDialogClose={this.handleCategoryDialogClose}
          handleCategoryDialogListClick={this.handleCategoryDialogListClick}
          handleCategoryListClick={this.handleCategoryListClick}
          userWorkouts={this.state.userWorkouts}
        />
        <WorkoutDialog
          addNewExerciseToDB={this.addNewExerciseToDB}
          addNewWorkout={this.addNewWorkout}
          addSet={this.addSet}
          addSetButtonState={this.state.addSetButtonState}
          categoryButtonText={this.state.categoryButtonText}
          exerciseDialogOpen={this.state.exerciseDialogOpen}
          existingCategoryValue={this.state.existingCategoryValue}
          handleExerciseDialogClose={this.handleExerciseDialogClose}
          handleExistingCategorySelect={this.handleExistingCategorySelect}
          handleNewCategorySelect={this.handleNewCategorySelect}
          handleNewWorkoutNameChange={this.handleNewWorkoutNameChange}
          handleNewWorkoutCategoryChange={this.handleNewWorkoutCategoryChange}
          handleRepChange={this.handleRepChange}
          handleWeightChange={this.handleWeightChange}
          handleWorkoutDialogClose={this.handleWorkoutDialogClose}
          newCategoryDialogState={this.state.newCategoryDialogState}
          newExerciseButtonState={this.state.newExerciseButtonState}
          newWorkoutButtonState={this.state.newWorkoutButtonState}
          userCategories={this.state.userCategories}
          workoutDialogOpen={this.state.workoutDialogOpen}
        />
        <Tabs
          onChange={this.handleTabChange}
          value={this.state.slideIndex}
        >
          <Tab label="Recent Stats" value={0} />
          <Tab label="Workouts" value={1} />
          <Tab label="Categories" value={2} />
        </Tabs>
        <SwipeableViews
          index={this.state.slideIndex}
          onChangeIndex={this.handleTabChange}
        >
          <div style={styles.slide}>
            <h2 style={styles.headline}>Stats</h2>
            show recent workouts here<br />
            <Stats />
          </div>
          <div style={styles.slide}>
            <h2 style={styles.headline}>Workouts</h2>
            List out the user's workouts here<br />
            <Workouts
              addNewExerciseToDB={this.addNewExerciseToDB}
              addSet={this.addSet}
              addSetButtonState={this.state.addSetButtonState}
              handleExerciseDialogClose={this.handleExerciseDialogClose}
              handleWorkoutDialogOpen={this.handleWorkoutDialogOpen}
              handleWorkoutListClick={this.handleWorkoutListClick}
              newExerciseButtonState={this.newExerciseButtonState}
              username="chris"
              userWorkouts={this.state.userWorkouts}
            />
          </div>
          <div style={styles.slide}>
            <h2 style={styles.headline}>Categories</h2>
            List out the user's groups/categories here<br />
            <Categories
              username="chris"
              userCategories={this.state.userCategories}
              handleCategoryListClick={this.handleCategoryListClick}
            />
          </div>
        </SwipeableViews>
      </MuiThemeProvider>
    );
  }
}
