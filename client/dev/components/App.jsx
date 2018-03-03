import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { Tabs, Tab } from 'material-ui/Tabs';
import SwipeableViews from 'react-swipeable-views';
import RaisedButton from 'material-ui/RaisedButton';
import WorkoutEntry from './WorkoutEntry.jsx';
import Exercises from './Exercises.jsx';
import Workouts from './Workouts.jsx';
import Categories from './Categories.jsx';

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
    };
    this.handleWorkoutSelectorChange = this.handleWorkoutSelectorChange.bind(this);
    this.handleTabChange = this.handleTabChange.bind(this);
  }

  handleWorkoutSelectorChange(event, index, value) {
    this.setState({ workoutSelector: value });
  }

  handleTabChange(value) {
    this.setState({
      slideIndex: value,
    });
  }

  render() {
    return (
      <MuiThemeProvider>
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
          </div>
          <div style={styles.slide}>
            <h2 style={styles.headline}>Workouts</h2>
            List out the user's workouts here<br />
            <Workouts
              username="chris"
            />
          </div>
          <div style={styles.slide}>
            <h2 style={styles.headline}>Categories</h2>
            List out the user's groups/categories here<br />
            <Categories
              username="chris"
            />
          </div>
        </SwipeableViews>
      </MuiThemeProvider>
    );
  }
}
