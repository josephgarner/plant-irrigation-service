import { Socket } from "socket.io";

const activeClients = new Array();

module.exports.addClient = function (socket: Socket) {
  activeClients.push(socket);
};

module.exports.delClient = function (socket: Socket) {
  const index = activeClients.indexOf(socket);
  activeClients.splice(index, 1);
};

module.exports.list = function () {
  return activeClients;
};
