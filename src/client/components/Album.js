import React, { Component } from 'react';

const Album = (props) =>
  <div className="post" onClick={props.onClick}>
    <img src={`https://i.imgur.com/${props.cover}b.jpg`} alt="" />
    <span className="title">{props.description}</span>
  </div>;

export default Album;