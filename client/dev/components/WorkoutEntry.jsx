import React from 'react';

export default class WorkoutEntry extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      workoutSelector: '',
      weightAmount: 0,
      repCount: 0,
    };
  }

  render() {
    return (
      <div>
        Workouts
      </div>
    );
  }
}
