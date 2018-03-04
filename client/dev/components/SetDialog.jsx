import React from 'react';

import { List, ListItem } from 'material-ui/List';
import ActionInfo from 'material-ui/svg-icons/action/info';
import Dialog from 'material-ui/Dialog';
import RaisedButton from 'material-ui/RaisedButton';

export default class SetDialog extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      placeholder: '',
    };
  }

  render() {
    const setActions = [
      <RaisedButton
        label="Exit"
        primary={true}
        onClick={this.props.toggleSetDialog}
      />,
    ];
    return (
      <div>
        <Dialog
          title="Set Data"
          actions={setActions}
          modal={false}
          open={this.props.setDialogOpen}
          onRequestClose={this.props.toggleSetDialog}
        >
          {
            this.props.exerciseSetData.map((set, i) => {
              return (
                <ListItem
                  primaryText={`Set #${set.setNumber} - Weight: ${set.weight} lbs - Reps: ${set.reps}`}
                  secondaryText="Great Job!"
                  rightIcon={<ActionInfo />}
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
