# Plant Irrigation Service

Node based irrigation control and monitor application.

The Plant Irrigation Service is a backend service and node controller for the Plantr Project. This service has a one to many relationship between the planter nodes deployed in the field. This service can be used in tandom with the planter-dashboard.

#### Current MVP features

1. Recieve and store moisture report from plantr node
2. Recieve and store battery report from plantr node
3. Send Irrigation trigger to planter node to start irrigating a planter box
4. Send and store commands to send to a plantr node when a node wakes up
5. Send data to the dashbaord
6. Recieve commands from dashboard

#### Technology

- Node
- Socket.io
- Typscript
- Mongoose
- MongoDB
- Docker

## Installation and Running

#### Install Yarn

```
npm install --global yarn
```

After cloaning this repo navigate to the folder and proceed with the following

#### Enviroment File Schema

```
DATABASE_URI=
DATABASE=
```

#### Install dependacies

```
yarn
or
yarn install
```

#### Local Development

```
yarn serve
```

#### Deploy to docker compose

```
docker-compose build

docker-compose up -d
```

## Why?

- I wanted to grow fruit and veg at home, however water management has always been a problem.

- All Data is stored on a local server and data owership is held by the user.

- Practice and learning
