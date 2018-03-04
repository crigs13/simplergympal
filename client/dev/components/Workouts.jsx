import React from 'react';

import { List, ListItem } from 'material-ui/List';
import ActionInfo from 'material-ui/svg-icons/action/info';
import Divider from 'material-ui/Divider';

export default class Workouts extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      placeholder: '',
    };
  }

  render() {
    return (
      <div>
        <List>
          {
            this.props.userWorkouts.map((workout, i) => {
              return (
                <ListItem
                  primaryText={workout}
                  rightIcon={<ActionInfo />}
                  onClick={this.props.handleWorkoutListClick.bind(this, workout)}
                  key={i}
                />
              );
            })
          }
        </List>
        <Divider />
        <List>
          <ListItem
            primaryText="Add New Workout"
            rightIcon={<ActionInfo />}
            onClick={this.props.toggleWorkoutDialog}
          />
        </List>
      </div>
    );
  }
}
