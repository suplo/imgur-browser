import React, { Component } from 'react';
import { connect } from 'react-redux';

import Album from './album';
import Image from './image';

class Home extends Component {
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

export default connect()(Home);