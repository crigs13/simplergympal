import React from 'react';

import { List, ListItem } from 'material-ui/List';

const moment = require('moment');

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
              const friendlyDate = moment(exercise.date).format('dddd, MMMM Do YYYY, h:mm a');
              return (
                <div>
                  <ListItem
                    primaryText={exercise.name}
                    secondaryText={friendlyDate}
                    key={i}
                    onClick={this.props.handleLatestExerciseListClick}
                  />
                </div>
              );
            })
          }
        </List>
      </div>
    );
  }
}
