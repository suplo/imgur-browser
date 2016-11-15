import React from 'react';
import { renderToString } from 'react-dom/server';
import { createMemoryHistory, match, RouterContext } from 'react-router';
import * as swig from 'swig';
import routes from '../client/routes';

export default (req, res) => {
  match({ routes, location: req.url }, (err, redirectLocation, renderProps) => {
    if (err) {
      res.status(500).send(err.message);
    } else if (redirectLocation) {
      res.redirect(302, redirectLocation.pathname + redirectLocation.search);
    } else if (renderProps) {
      const html = renderToString(<RouterContext {...renderProps } />);
      const page = swig.renderFile('views/index.html', { html });
      res.send(200, page);
    } else {
      res.status(400).send('Page not found');
    }
  });
};