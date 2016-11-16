import React from 'react';
import { renderToString } from 'react-dom/server';
import { createMemoryHistory, match, RouterContext } from 'react-router';
import { Provider } from 'react-redux';
import * as swig from 'swig';
import routes from '../client/routes';
import configureStore from '../configureStore';
import preRenderMiddleware from '../preRenderMiddleware';

import Home from '../client/components/Home';

export default (req, res) => {
  const store = configureStore();

  match({ routes, location: req.url }, (err, redirectLocation, renderProps) => {
    if (err) {
      res.status(500).send(err.message);
    } else if (redirectLocation) {
      res.redirect(302, redirectLocation.pathname + redirectLocation.search);
    } else if (renderProps) {
      preRenderMiddleware(
        store.dispatch,
        renderProps.components,
        renderProps.params
      ).then(() => {
        console.log("store: ", store);
        const html = renderToString(
          <Provider key="provider" store={store}>
            <RouterContext {...renderProps} />
          </Provider>
        );
        const page = swig.renderFile('views/index.html', { html });
        res.send(200, page);
      });
    } else {
      res.status(400).send('Page not found');
    }
  });
};