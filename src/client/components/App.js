import React, { Component } from 'react';

import Navbar from './Navbar';

export default class App extends Component {
  render() {
    return (
      <div id="main">
        <Navbar />
        <div className="container">
          {this.props.children}
        </div>
      </div>
    );
  }
}