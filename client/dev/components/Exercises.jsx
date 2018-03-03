import React from 'react';
import SelectField from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import { Tabs, Tab } from 'material-ui/Tabs';
import SwipeableViews from 'react-swipeable-views';

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

export default class Exercises extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      workoutSelector: 1,
      slideIndex: 0,
    };
    this.handleWorkoutSelectorChange = this.handleWorkoutSelectorChange.bind(this);
    this.handleTabChange = this.handleTabChange.bind(this);
  }

  handleWorkoutSelectorChange(event, index, value) {
    // console.log('this is the event: ', event);
    // console.log('this is the index: ', index);
    // console.log('this is the value: ', value);
    this.setState({ workoutSelector: value });
  }

  handleTabChange(value) {
    this.setState({
      slideIndex: value,
    });
  }

  render() {
    return (
      <div>
        <SelectField
          value={this.state.workoutSelector}
          onChange={this.handleWorkoutSelectorChange}
          style={styles.customWidth}
          autoWidth={false}
        >
          <MenuItem value={1} primaryText="Free Weight Bench Press" />
          <MenuItem value={2} primaryText="Tricep Rope Pulldown" />
          <MenuItem value={3} primaryText="Skull Crushers" />
          <MenuItem value={4} primaryText="Arnolds" />
          <MenuItem value={5} primaryText="Add New" />
        </SelectField>
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
          </div>
          <div style={styles.slide}>
            <h2 style={styles.headline}>Categories</h2>
            List out the user's groups/categories here<br />
          </div>
        </SwipeableViews>
      </div>
    );
  }
}
