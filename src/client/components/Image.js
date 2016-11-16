import React, { Component } from 'react';

const Image = (props) =>
  <div className="post">
    <img src={`https://i.imgur.com/${props.id}b.jpg`} alt="" />
    <span className="title">{props.title}</span>
  </div>;

export default Image;