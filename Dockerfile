FROM node:7.1.0
MAINTAINER Ta Dat <ttdat1@gmail.com>

RUN npm install -g yarn

COPY . /home/node
RUN chown -R node /home/node
WORKDIR /home/node/
USER node
RUN yarn install
RUN npm run build

CMD ["npm", "start"]