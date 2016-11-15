const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const morgan = require('morgan');
const request = require('request');
const rendering = require('./server');

const app = express();

app.set('port', process.env.PORT || 4000);
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, '../../public')));

app.get('/api/gallery', (req, res, next) => {
  const options = {
    url: 'https://api.imgur.com/3/gallery/hot/viral/0.json',
    headers: {
      'Authentication': 'Client-ID 1114fd3ae4f706c',
      'Content-Type': 'application/json'
    }
  };

  request.get(options, (err, response, body) => {
    if (err) return next(err);
    if (response.statusCode !== 200) return next(new Error('Error requesting imgur'));
    try {
      const gallery = JSON.parse(body);
      res.send(gallery.data);
    } catch (exp) {
      next(exp);
    }
  });
});

app.use(rendering);

app.listen(app.get('port'), () => {
  console.log(`Server is running on port ${app.get('port')}`);
});