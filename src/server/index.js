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

app.post('/api/gallery', (req, res, next) => {
  const options = req.body;
  const section = options.section || 'hot';
  const sort = options.sort || 'viral';
  const showViral = options.showViral || false;
  const window = section === 'top' ? (options.window || 'day') : undefined;

  let url;
  if (typeof window !== 'undefined') {
    url = `https://api.imgur.com/3/gallery/${section}/${sort}/${window}/0.json?showViral=${showViral}`;
  } else {
    url = `https://api.imgur.com/3/gallery/${section}/${sort}/0.json?showViral=${showViral}`;
  }

  console.log("URL: ", url);

  request.get({
    url,
    headers: {
      'Authorization': 'Client-ID 1114fd3ae4f706c',
      'Content-Type': 'application/json'
    }
  }, (err, response, body) => {
    if (err || response.statusCode !== 200) {
      console.log('Error receiving images from imgur');
      return res.send([]);
    }

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