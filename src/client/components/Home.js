import React, { Component } from 'react';
import { connect } from 'react-redux';

import { fetchGallery } from '../actions/gallery';
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
    this.props.dispatch(fetchGallery({
      section: 'hot',
      sort: 'viral',
      showViral: false
    }));
  }

  render() {
    return (
      <div>
        {this.props.images.map((image, idx) => image.is_album
          ? <Album key={idx} {...image} />
          : <Image key={idx} {...image} />
        )}
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { gallery } = state;
  return {
    images: gallery.images
  }
};

export default connect(mapStateToProps)(Home);