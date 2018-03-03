import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
import WorkoutEntry from './WorkoutEntry.jsx';
import Exercises from './Exercises.jsx';
import Workouts from './Workouts.jsx';
import Categories from './Categories.jsx';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: 'chris',
    };
  }

  render() {
    return (
      <MuiThemeProvider>
        <WorkoutEntry />
        <Exercises />
        <Workouts
          username={this.state.username}
        />
        <Categories />
      </MuiThemeProvider>
    );
  }
}
