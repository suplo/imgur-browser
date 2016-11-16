import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  changeSection,
  toggleShowViral,
  changeSort,
  changeWindow
} from '../actions/gallery';

class Navbar extends Component {
  constructor(props) {
    super(props);
    this.selectSection = this.selectSection.bind(this);
    this.showViral = this.showViral.bind(this);
    this.selectSort = this.selectSort.bind(this);
    this.selectWindow = this.selectWindow.bind(this);
  }

  selectSection(evt) {
    evt.preventDefault();
    this.props.dispatch(changeSection(evt.target.name));
  }

  selectSort(evt) {
    evt.preventDefault();
    this.props.dispatch(changeSort(evt.target.name));
  }

  selectWindow(evt) {
    evt.preventDefault();
    if (this.props.section !== 'top') return;
    this.props.dispatch(changeWindow(evt.target.name));
  }

  showViral(evt) {
    if (this.props.section !== 'user') return;
    this.props.dispatch(toggleShowViral(!this.props.showViral));
  }

  render() {
    const section = (
      <ul className="nav navbar-nav">
        <li className="dropdown">
          <a href="#" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">Section<span className="caret"></span></a>
          <ul className="dropdown-menu">
            <li className={this.props.section === 'hot' ? 'active' : ''}>
              <a href="#" name="hot" onClick={this.selectSection}>Hot</a>
            </li>
            <li className={this.props.section === 'top' ? 'active' : ''}>
              <a href="#" name="top" onClick={this.selectSection}>Top</a>
            </li>
            <li className={this.props.section === 'user' ? 'active' : ''}>
              <a href="#" name="user" onClick={this.selectSection}>User</a>
            </li>
          </ul>
        </li>
      </ul>
    );

    const sort = (
      <ul className="nav navbar-nav">
        <li className="dropdown">
          <a href="#" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">Sort<span className="caret"></span></a>
          <ul className="dropdown-menu">
            <li className={this.props.sort === 'viral' ? 'active' : ''}>
              <a href="#" name="viral" onClick={this.selectSort}>Viral</a>
            </li>
            <li className={this.props.sort === 'top' ? 'active' : ''}>
              <a href="#" name="top" onClick={this.selectSort}>Top</a>
            </li>
            <li className={this.props.sort === 'time' ? 'active' : ''}>
              <a href="#" name="time" onClick={this.selectSort}>Time</a>
            </li>
            {this.props.section === 'user' &&
              <li className={this.props.sort === 'rising' ? 'active' : ''}>
                <a href="#" name="rising" onClick={this.selectSort}>Rising</a>
              </li>
            }
          </ul>
        </li>
      </ul>
    );

    const window = (
      <ul className="nav navbar-nav">
        <li className="dropdown">
          <a href="#" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">Window<span className="caret"></span></a>
          <ul className="dropdown-menu">
            <li className={this.props.window === 'day' ? 'active' : ''}>
              <a href="#" name="day" onClick={this.selectWindow}>Day</a>
            </li>
            <li className={this.props.window === 'week' ? 'active' : ''}>
              <a href="#" name="week" onClick={this.selectWindow}>Week</a>
            </li>
            <li className={this.props.window === 'month' ? 'active' : ''}>
              <a href="#" name="month" onClick={this.selectWindow}>Month</a>
            </li>
            <li className={this.props.window === 'year' ? 'active' : ''}>
              <a href="#" name="year" onClick={this.selectWindow}>Year</a>
            </li>
          </ul>
        </li>
      </ul>
    );

    const showViral = (
      <ul className="nav navbar-nav navbar-right">
        <li>
          <label className="navbar-link">
            <input
              type="checkbox"
              onChange={this.showViral}
              defaultChecked={this.props.showViral}
            />
            showViral
          </label>
        </li>
      </ul>
    );

    return (
      <nav className="navbar navbar-default navbar-fixed-top">
        <div className="container">
          <div className="navbar-header">
            <a className="navbar-brand" href="#">imgur browser</a>
          </div>
          <div id="navbar" className="">
            {section}
            {sort}
            {this.props.section === 'top' && window}
            {this.props.section === 'user' && showViral}
          </div>
        </div>
      </nav>
    );
  }
}

function mapStateToProps(state) {
  const { showViral, section, sort, window } = state.gallery;
  return {
    section,
    showViral,
    sort,
    window
  }
}

export default connect(mapStateToProps)(Navbar);