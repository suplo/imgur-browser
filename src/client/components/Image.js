import React, { Component } from 'react';

const Image = (props) =>
  <div className="post" onClick={props.onClick}>
    <img src={`https://i.imgur.com/${props.id}b.jpg`} alt="" />
    <span className="title">{props.description}</span>
  </div>;

export default Image;