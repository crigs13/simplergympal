import React from 'react';

import { List, ListItem } from 'material-ui/List';
import ActionInfo from 'material-ui/svg-icons/action/info';
import Dialog from 'material-ui/Dialog';
import Divider from 'material-ui/Divider';
import RaisedButton from 'material-ui/RaisedButton';
import MenuItem from 'material-ui/MenuItem';
import SelectField from 'material-ui/SelectField';
import TextField from 'material-ui/TextField';
import Moment from 'react-moment';

import axios from 'axios';

export default class CategoryDialog extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      placeholder: '',
    };
  }

  render() {
    const categoryActions = [
      <RaisedButton
        label="Exit"
        primary={true}
        onClick={this.props.handleCategoryDialogClose}
      />,
    ];

    return (
      <div>
        <Dialog
          title="Workouts From Category 'x'"
          actions={categoryActions}
          modal={false}
          open={this.props.categoryDialogOpen}
          onRequestClose={this.props.handleCategoryDialogClose}
        >
          {
            this.props.userWorkouts.map((workout, i) => {
              return (
                <ListItem
                  primaryText={workout}
                  rightIcon={<ActionInfo />}
                  onClick={this.props.handleCategoryDialogListClick.bind(this, workout)}
                  key={i}
                />
              );
            })
          }
        </Dialog>
      </div>
    );
  }
}
