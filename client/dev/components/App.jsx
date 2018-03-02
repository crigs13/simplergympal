import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
import WorkoutEntry from './WorkoutEntry.jsx';
import Exercises from './Exercises.jsx';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      placeholder: 'placeholder',
    };
  }

  render() {
    return (
      <MuiThemeProvider>
        <div>
          Hello World
        </div>
        <WorkoutEntry />
        <Exercises />
        <RaisedButton label="Default" />
      </MuiThemeProvider>
    );
  }
}
