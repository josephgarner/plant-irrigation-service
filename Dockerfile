#Pull down node image version 16
FROM node:16

WORKDIR /usr/src/app
COPY package.json yarn.lock ./
RUN yarn
COPY . ./
RUN yarn build

EXPOSE 8000

CMD [ "yarn", "start" ]