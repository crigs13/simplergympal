import React from 'react';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      placeholder: 'placeholder',
    };
  }

  componentDidMount() {
    console.log('mounted');
  }

  render() {
    return (
      <div>
        Hello World
      </div>
    );
  }
}
