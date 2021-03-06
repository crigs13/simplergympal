import React from 'react';

import { List, ListItem } from 'material-ui/List';
import RaisedButton from 'material-ui/RaisedButton';

const moment = require('moment-timezone');

export default class Stats extends React.Component {
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
            this.props.latestExercises.map((exercise, i) => {
              const friendlyDate = moment().tz(exercise.date, 'America/New_York|US/Eastern').format('dddd, MMMM Do YYYY, h:mm a');
              return (
                <div>
                  <ListItem
                    primaryText={exercise.name}
                    secondaryText={friendlyDate}
                    key={i}
                    onClick={this.props.handleLatestExerciseListClick.bind(this, exercise.id)}
                  />
                </div>
              );
            })
          }
        </List>
        <RaisedButton
          label="Get All Exercises"
          primary={true}
          onClick={this.props.getAllExercises}
        />
      </div>
    );
  }
}
