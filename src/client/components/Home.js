import React, { Component } from 'react';
import Album from './album';
import Image from './image';

export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      images: []
    };
  }

  componentDidMount() {
    $.ajax({
      url: '/api/gallery'
    })
    .done((data) => {
      this.setState({ images: data });
    })
    .fail((jqXhr) => {
    });
  }

  render() {
    return (
      <div>
        {this.state.images.map((image, idx) => image.is_album
          ? <Album key={idx} {...image} />
          : <Image key={idx} {...image} />
        )}
      </div>
    );
  }
}