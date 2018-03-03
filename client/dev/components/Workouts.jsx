import React from 'react';

import { List, ListItem } from 'material-ui/List';
import ActionInfo from 'material-ui/svg-icons/action/info';
import Dialog from 'material-ui/Dialog';
import Divider from 'material-ui/Divider';
import FlatButton from 'material-ui/FlatButton';
import MenuItem from 'material-ui/MenuItem';
import SelectField from 'material-ui/SelectField';
import TextField from 'material-ui/TextField';
import Moment from 'react-moment';

import axios from 'axios';

export default class Workouts extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
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
    this.getUsersCategories = this.getUsersCategories.bind(this);
    this.getUsersWorkouts = this.getUsersWorkouts.bind(this);
  }

  componentDidMount() {
    this.getUsersCategories();
    this.getUsersWorkouts();
  }

  getUsersCategories() {
    axios.post('/categories', { username: this.props.username })
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
    axios.post('/workouts', { username: this.props.username })
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
    axios.post('/addWorkout', {
      username: this.props.username,
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
    const date = new Date();
    axios.post('/addExercise', {
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
    axios.post('/addSets', {
      setData: this.state.setData,
      workoutName: this.state.currentWorkout,
    })
      .then((res) => {
        console.log('response from server: ', res);
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

  render() {
    const workoutActions = [
      <FlatButton
        label="Cancel"
        primary={true}
        onClick={this.handleWorkoutDialogClose}
      />,
      <FlatButton
        label="Submit"
        disabled={this.state.newWorkoutButtonState}
        primary={true}
        onClick={this.addNewWorkout}
      />,
    ];

    const exerciseActions = [
      <FlatButton
        label="Cancel"
        primary={true}
        onClick={this.handleExerciseDialogClose}
      />,
      <FlatButton
        label="Add Set"
        disabled={this.state.addSetButtonState}
        primary={true}
        onClick={this.addSet}
      />,
      <FlatButton
        label="Save"
        disabled={this.state.newExerciseButtonState}
        primary={true}
        onClick={this.addNewExerciseToDB}
      />,
    ];

    return (
      <div>
        <Dialog
          title="New Workout"
          actions={workoutActions}
          modal={false}
          open={this.state.workoutDialogOpen}
          onRequestClose={this.handleWorkoutDialogClose}
        >
          <TextField
            id="new-workout-name-input"
            floatingLabelText="Workout Name"
            onChange={this.handleNewWorkoutNameChange}
          />
          <br />
          {
            this.state.newCategoryDialogState ?
              <SelectField
                floatingLabelText="Workout Category"
                value={this.state.existingCategoryValue}
                onChange={this.handleExistingCategorySelect}
              >
                <MenuItem value={null} primaryText="" />
                {this.state.userCategories.map((category, i) => {
                  return (
                    <MenuItem
                      value={category}
                      primaryText={category}
                      key={i}
                    />
                  );
                })}
              </SelectField>
            :
              <TextField
                id="new-workout-category-input"
                floatingLabelText="Workout Category"
                onChange={this.handleNewWorkoutCategoryChange}
              />
          }
          <FlatButton
            label={this.state.categoryButtonText}
            primary={true}
            onClick={this.handleNewCategorySelect}
          />
        </Dialog>
        <Dialog
          title="New Exercise"
          actions={exerciseActions}
          modal={false}
          open={this.state.exerciseDialogOpen}
          onRequestClose={this.handleExerciseDialogClose}
        >
          <TextField
            id="new-exercise-rep-input"
            floatingLabelText="Reps"
            onChange={this.handleRepChange}
          />
          <br />
          <TextField
            id="new-exercise-weight-input"
            floatingLabelText="Weight"
            onChange={this.handleWeightChange}
          />
        </Dialog>
        <List>
          {this.state.userWorkouts.map((workout, i) => {
            return (
              <ListItem
                primaryText={workout}
                rightIcon={<ActionInfo />}
                onClick={this.handleWorkoutListClick.bind(this, workout)}
                key={i}
              />
          );
          })}
        </List>
        <Divider />
        <List>
          <ListItem
            primaryText="Add New Workout"
            rightIcon={<ActionInfo />}
            onClick={this.handleWorkoutDialogOpen}
          />
        </List>
      </div>
    );
  }
}
