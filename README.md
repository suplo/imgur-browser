Imgur gallery browser simple demo

## Build

First, clone the code. Then

~~~
npm run build
~~~

## Start service

~~~
npm start
~~~

Point your browser at `http://localhost:4000` and enjoy.

## Using Docker

You can also run this demo as a Docker container. First, run

~~~
docker build -t imgur-browser .
~~~

to build the image, Then

~~~
docker run -p 4000:4000 --rm --name=imgur-browser imgur-browser
~~~

and point your browser at `http://your-docker-host-ip:4000` and have some fun.

