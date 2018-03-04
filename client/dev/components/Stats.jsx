import React from 'react';

import { List, ListItem } from 'material-ui/List';
import ActionDelete from 'material-ui/svg-icons/action/delete';
import Dialog from 'material-ui/Dialog';
import Divider from 'material-ui/Divider';
import FlatButton from 'material-ui/FlatButton';
import MenuItem from 'material-ui/MenuItem';
import SelectField from 'material-ui/SelectField';
import TextField from 'material-ui/TextField';

import axios from 'axios';

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
        hello
      </div>
    );
  }
}

// render() {
//   return (
//     <div>
//       {
//         this.props.exercises.map((exercise, i) => {
//
//         })
//       }
//     </div>
//   );
// }

// return (
//   <div>
//     <List>
//       {this.props.userWorkouts.map((workout, i) => {
//         return (
//           <ListItem
//             primaryText={workout}
//             rightIcon={<ActionInfo />}
//             onClick={this.props.handleWorkoutListClick.bind(this, workout)}
//             key={i}
//           />
//       );
//       })}
//     </List>
//     <Divider />
//     <List>
//       <ListItem
//         primaryText="Add New Workout"
//         rightIcon={<ActionInfo />}
//         onClick={this.props.handleWorkoutDialogOpen}
//       />
//     </List>
//   </div>
// );
