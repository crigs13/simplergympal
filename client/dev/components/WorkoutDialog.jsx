import React from 'react';

import { List, ListItem } from 'material-ui/List';
import ActionInfo from 'material-ui/svg-icons/action/info';
import Dialog from 'material-ui/Dialog';
import Divider from 'material-ui/Divider';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import MenuItem from 'material-ui/MenuItem';
import SelectField from 'material-ui/SelectField';
import TextField from 'material-ui/TextField';
import Moment from 'react-moment';

import axios from 'axios';

export default class WorkoutDialog extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      placeholder: '',
    };
  }

  render() {
    const workoutActions = [
      <RaisedButton
        label="Cancel"
        primary={true}
        onClick={this.props.handleWorkoutDialogClose}
      />,
      <RaisedButton
        label="Submit"
        disabled={this.props.newWorkoutButtonState}
        primary={true}
        onClick={this.props.addNewWorkout}
      />,
    ];

    const exerciseActions = [
      <RaisedButton
        label="Cancel"
        primary={true}
        onClick={this.props.handleExerciseDialogClose}
      />,
      <RaisedButton
        label="Add Set"
        disabled={this.props.addSetButtonState}
        primary={true}
        onClick={this.props.addSet}
      />,
      <RaisedButton
        label="Save"
        disabled={this.props.newExerciseButtonState}
        primary={true}
        onClick={this.props.addNewExerciseToDB}
      />,
    ];

    return (
      <div>
        <Dialog
          title="New Workout"
          actions={workoutActions}
          modal={false}
          open={this.props.workoutDialogOpen}
          onRequestClose={this.props.handleWorkoutDialogClose}
          autoScrollBodyContent={true}
        >
          <TextField
            id="new-workout-name-input"
            floatingLabelText="Workout Name"
            onChange={this.props.handleNewWorkoutNameChange}
          />
          <br />
          {
            this.props.newCategoryDialogState ?
              <SelectField
                floatingLabelText="Workout Category"
                value={this.props.existingCategoryValue}
                onChange={this.props.handleExistingCategorySelect}
              >
                <MenuItem value={null} primaryText="" />
                {this.props.userCategories.map((category, i) => {
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
                onChange={this.props.handleNewWorkoutCategoryChange}
              />
          }
          <RaisedButton
            label={this.props.categoryButtonText}
            primary={true}
            onClick={this.props.handleNewCategorySelect}
          />
        </Dialog>
        <Dialog
          title="New Exercise"
          actions={exerciseActions}
          modal={false}
          open={this.props.exerciseDialogOpen}
          onRequestClose={this.props.handleExerciseDialogClose}
          autoScrollBodyContent={true}
        >
          <TextField
            id="new-exercise-rep-input"
            floatingLabelText="Reps"
            onChange={this.props.handleRepChange}
          />
          <br />
          <TextField
            id="new-exercise-weight-input"
            floatingLabelText="Weight"
            onChange={this.props.handleWeightChange}
          />
        </Dialog>
      </div>
    );
  }
}
