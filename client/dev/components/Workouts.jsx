import React from 'react';
import { List, ListItem } from 'material-ui/List';
import Divider from 'material-ui/Divider';
import ActionInfo from 'material-ui/svg-icons/action/info';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import axios from 'axios';

export default class Workouts extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dialogOpen: false,
      newWorkoutButtonState: true,
      newWorkoutName: '',
      newWorkoutCategory: '',
    };
    this.handleNewWorkoutNameChange = this.handleNewWorkoutNameChange.bind(this);
    this.handleNewWorkoutCategoryChange = this.handleNewWorkoutCategoryChange.bind(this);
    this.checkRequiredNewWorkoutFields = this.checkRequiredNewWorkoutFields.bind(this);
    this.handleDialogOpen = this.handleDialogOpen.bind(this);
    this.handleDialogClose = this.handleDialogClose.bind(this);
    this.handleWorkoutListClick = this.handleWorkoutListClick.bind(this);
    this.addNewWorkout = this.addNewWorkout.bind(this);
  }

  handleNewWorkoutNameChange(e) {
    this.setState({
      newWorkoutName: e.target.value
    }, this.checkRequiredNewWorkoutFields);
  }

  handleNewWorkoutCategoryChange(e) {
    this.setState({
      newWorkoutCategory: e.target.value
    }, this.checkRequiredNewWorkoutFields);
  }

  checkRequiredNewWorkoutFields() {
    if (this.state.newWorkoutName.length && this.state.newWorkoutCategory.length) {
      this.setState({
        newWorkoutButtonState: false,
      });
    } else {
      this.setState({
        newWorkoutButtonState: true,
      });
    }
  }

  handleDialogOpen() {
    this.setState({ dialogOpen: true });
  }

  handleDialogClose() {
    this.setState({ dialogOpen: false });
  }

  handleWorkoutListClick(event) {
    // this is clicking an existing workout
  }

  addNewWorkout(e) {
    axios.post('/addWorkout', {
      username: this.props.username,
      name: this.state.newWorkoutName,
      category: this.state.newWorkoutCategory,
    });
    // add new workout to DB
  }

  render() {
    const actions = [
      <FlatButton
        label="Cancel"
        primary={true}
        onClick={this.handleDialogClose}
      />,
      <FlatButton
        label="Submit"
        disabled={this.state.newWorkoutButtonState}
        primary={true}
        keyboardFocused={true}
        onClick={this.addNewWorkout}
      />,
    ];

    return (
      <div>
        <Dialog
          title="New Workout"
          actions={actions}
          modal={false}
          open={this.state.dialogOpen}
          onRequestClose={this.handleDialogClose}
        >
          <TextField
            id="new-workout-name-input"
            hintText="Workout Name"
            onChange={this.handleNewWorkoutNameChange}
          />
          <br />
          <TextField
            id="new-workout-category-input"
            hintText="Workout Category"
            onChange={this.handleNewWorkoutCategoryChange}
          />
        </Dialog>
        <List>
          <ListItem
            primaryText="Workout Name #1"
            rightIcon={<ActionInfo />}
            onClick={this.handleWorkoutListClick}
          />
          <ListItem
            primaryText="Workout Name #2"
            rightIcon={<ActionInfo />}
            onClick={this.handleWorkoutListClick}
          />
          <ListItem
            primaryText="Workout Name #3"
            rightIcon={<ActionInfo />}
            onClick={this.handleWorkoutListClick}
          />
        </List>
        <Divider />
        <List>
          <ListItem
            primaryText="Add New Workout"
            rightIcon={<ActionInfo />}
            onClick={this.handleDialogOpen}
          />
        </List>
      </div>
    );
  }
}
