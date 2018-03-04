import React from 'react';

import ActionInfo from 'material-ui/svg-icons/action/info';
import Dialog from 'material-ui/Dialog';
import RaisedButton from 'material-ui/RaisedButton';
import MenuItem from 'material-ui/MenuItem';
import SelectField from 'material-ui/SelectField';
import TextField from 'material-ui/TextField';

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
        onClick={this.props.toggleWorkoutDialog}
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
        onClick={this.props.toggleExerciseDialog}
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
          onRequestClose={this.props.toggleWorkoutDialog}
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
          title={this.props.currentWorkout}
          actions={exerciseActions}
          modal={false}
          open={this.props.exerciseDialogOpen}
          onRequestClose={this.props.toggleExerciseDialog}
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
