import React, { Component } from 'react';

const Image = (props) =>
  <div className="post">
    <img src={props.link} alt="" />
    <span className="title">{props.title}</span>
  </div>;

export default Image;