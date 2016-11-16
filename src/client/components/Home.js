import React, { Component } from 'react';
import { connect } from 'react-redux';
const Lightbox = typeof window !== 'undefined' ? require('react-image-lightbox') : undefined;

import { fetchGallery } from '../actions/gallery';
import Album from './album';
import Image from './image';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      images: [],
      lightbox: {
        isOpen: false,
        source: '',
        title: '',
        description: '',
        upVote: 0,
        downVote: 0,
        score: 0,
      }
    };
  }

  componentDidMount() {
    this.props.dispatch(fetchGallery({
      section: 'hot',
      sort: 'viral',
      showViral: false
    }));
  }

  onClick(image, evt) {
    evt.preventDefault();
    this.setState({
      lightbox: {
        isOpen: true,
        source: image.is_album
          ? `https://i.imgur.com/${image.cover}.jpg`
          : `https://i.imgur.com/${image.id}.jpg`,
        title: image.title,
        description: image.description,
        upVote: image.ups,
        downVote: image.downs,
        score: image.score,
      }
    })
  }

  render() {
    const description = this.state.lightbox.description || '';
    const caption = `
      ${description} Up: ${this.state.lightbox.upVote} Down: ${this.state.lightbox.downVote}
      Score: ${this.state.lightbox.score}
    `;

    return (
      <div>
        {this.props.images.map((image, idx) => image.is_album
          ? <Album key={idx} {...image} onClick={this.onClick.bind(this, image)} />
          : <Image key={idx} {...image} onClick={this.onClick.bind(this, image)} />
        )}
        {this.state.lightbox.isOpen &&
          <Lightbox
            mainSrc={this.state.lightbox.source}
            onCloseRequest={() => this.setState({ lightbox: { isOpen: false }}) }
            imageTitle={this.state.lightbox.title}
            imageCaption={caption}
          />
        }
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