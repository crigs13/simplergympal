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
      placeholder: 'chris',
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
