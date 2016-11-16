import React, { Component } from 'react';

export default class Navbar extends Component {
  render() {
    return (
      <nav className="navbar navbar-default navbar-fixed-top">
        <div className="container">
          <div className="navbar-header">
            <a className="navbar-brand" href="#">imgur browser</a>
          </div>
          <div id="navbar" className="navbar-collapse collapse">
            <ul className="nav navbar-nav">
              <li className="dropdown">
                <a href="#" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">Section <span className="caret"></span></a>
                <ul className="dropdown-menu">
                  <li><a href="#">Hot</a></li>
                  <li><a href="#">Top</a></li>
                  <li><a href="#">User</a></li>
                </ul>
              </li>
            </ul>
            <ul className="nav navbar-nav navbar-right">
              <li><a href="#">Window</a></li>
              <li><a href="#">Sort</a></li>
            </ul>
          </div>
        </div>
      </nav>
    );
  }
}