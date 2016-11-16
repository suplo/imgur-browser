import React, { Component } from 'react';
import { connect } from 'react-redux';

import Navbar from './Navbar';

class App extends Component {
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

export default connect()(App);