import fetch from 'isomorphic-fetch';

const API_GALLERY = '/api/gallery';

import {
  REQUEST_FAILED,
  REQUEST_IMAGES,
  RECEIVE_IMAGES,
  SELECT_SECTION,
  TOGGLE_SHOW_VIRAL,
  SELECT_SORT,
  SELECT_WINDOW
} from '../types';

function requestImages() {
  return {
    type: REQUEST_IMAGES
  }
}

function receiveImages(images) {
  return {
    type: RECEIVE_IMAGES,
    images
  }
}

export function fetchGallery(options) {
  return dispatch => {
    dispatch(requestImages());
    return fetch('/api/gallery', {
      method: "POST",
      body: JSON.stringify(options),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(response => response.json())
      .then(data => dispatch(receiveImages(data)));
  }
}

function _fetchGallery(dispatch, getState) {
  const { section, sort, showViral, window } = getState().gallery;
  return dispatch(fetchGallery({
    section,
    sort,
    showViral,
    window
  }));
}

function selectSection(section) {
  return {
    type: SELECT_SECTION,
    section
  }
}

export function changeSection(section) {
  const _section = section;
  return (dispatch, getState) => {
    dispatch(selectSection(_section));
    return _fetchGallery(dispatch, getState);
  }
}

function toggleViral(showViral) {
  return {
    type: TOGGLE_SHOW_VIRAL,
    showViral
  }
}

export function toggleShowViral(value) {
  const _value = value;
  return (dispatch, getState) => {
    dispatch(toggleViral(_value));
    return _fetchGallery(dispatch, getState);
  }
}

function selectSort(sort) {
  return {
    type: SELECT_SORT,
    sort
  }
}

export function changeSort(sort) {
  const _sort = sort;
  return (dispatch, getState) => {
    dispatch(selectSort(_sort));
    return _fetchGallery(dispatch, getState);
  }
}

function selectWindow(window) {
  return {
    type: SELECT_WINDOW,
    window
  }
}

export function changeWindow(window) {
  const _window = window;
  return (dispatch, getState) => {
    dispatch(selectWindow(_window));
    return _fetchGallery(dispatch, getState);
  }
}