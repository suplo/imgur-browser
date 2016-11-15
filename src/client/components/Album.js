import React, { Component } from 'react';

const Album = (props) =>
  <div className="post">
    <img src={`https://i.imgur.com/${props.cover}.jpg`} alt="" />
    <span className="title">{props.title}</span>
  </div>;

export default Album;