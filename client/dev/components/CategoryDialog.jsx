import React from 'react';

import { List, ListItem } from 'material-ui/List';
import ActionInfo from 'material-ui/svg-icons/action/info';
import Dialog from 'material-ui/Dialog';
import RaisedButton from 'material-ui/RaisedButton';

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
        onClick={this.props.toggleCategoryDialog}
      />,
    ];

    return (
      <div>
        <Dialog
          title={`${this.props.currentCategory} Workouts`}
          actions={categoryActions}
          modal={false}
          open={this.props.categoryDialogOpen}
          onRequestClose={this.props.toggleCategoryDialog}
          autoScrollBodyContent={true}
        >
          {
            this.props.userWorkouts.map((workout, i) => {
              return (
                <ListItem
                  primaryText={workout}
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
