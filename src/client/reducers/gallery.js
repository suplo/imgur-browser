import {
  REQUEST_FAILED,
  REQUEST_IMAGES,
  RECEIVE_IMAGES,
  SELECT_SECTION,
  TOGGLE_SHOW_VIRAL,
  SELECT_SORT,
  SELECT_WINDOW
} from '../types';

const assign = require('object-assign');

export function gallery(state = {
  images: [],
  showViral: true,
  section: 'hot',
  sort: 'viral'
}, action) {
  switch (action.type) {
    case REQUEST_FAILED:
      return assign({}, state, {
        images: []
      });

    case REQUEST_IMAGES:
      return assign({}, state, {
        images: [],
        isFetching: true
      });

    case RECEIVE_IMAGES:
      return assign({}, state, {
        isFetching: false,
        images: action.images
      });

    case SELECT_SECTION:
      return assign({}, state, {
        section: action.section
      });

    case TOGGLE_SHOW_VIRAL:
      return assign({}, state, {
        showViral: action.showViral
      });

    case SELECT_SORT:
      return assign({}, state, {
        sort: action.sort
      });

    case SELECT_WINDOW:
      return assign({}, state, {
        window: action.window
      });

    default:
      return state;
  }
}