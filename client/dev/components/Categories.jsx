import React from 'react';

import { List, ListItem } from 'material-ui/List';
import ActionInfo from 'material-ui/svg-icons/action/info';
import ActionDelete from 'material-ui/svg-icons/action/delete';

export default class Categories extends React.Component {
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
            this.props.userCategories.map((category, i) => {
              return (
                <ListItem
                  primaryText={category}
                  onClick={this.props.handleCategoryListClick.bind(this, category)}
                  key={i}
                />
              );
            })
          }
        </List>
      </div>
    );
  }
}
