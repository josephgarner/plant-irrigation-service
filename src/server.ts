import Koa from "koa";
require("dotenv").config({ path: `.env.${process.env.NODE_ENV}` });
import { createServer } from "http";
import { Server } from "socket.io";
import { connectToDatabase } from "./db";
import { actioning, battery, getCommand, report, status } from "./planter";
import { MoistureData } from "./types";
import { irrigationHistory, summary } from "./dashboard";

const app = new Koa();
const httpServer = createServer(app.callback());
const io = new Server(httpServer, {});
const clientArray = require("./clients/connectedClients");
console.log("ENV:", process.env.NODE_ENV);
connectToDatabase();

io.on("connection", (socket) => {
  console.log("Someone Connected");
  socket.emit("hello", "world");
});

io.on("status", (...args) => {
  console.log("Hitting status");
  console.log(args[0], args[1]);
  status(args[0], args[1] as boolean);
});

io.of("dashboard").on("connection", (socket) => {
  clientArray.addClient(socket);
  socket.on("irrigation_history", (args) => irrigationHistory(args, socket));
  socket.on("summary", (args) => summary(args, socket));
  socket.on("update_planter", async () => {
    /* Updates the editible infomation for a planter */
  });
  socket.on("send_command", () => {
    /* Sends a command message for the planter to exicute on next wake */
  });
});

io.of("planter").on("connection", (socket) => {
  console.log("Planter Connected");
  socket.on("status", (...args) => {
    console.log(args);
    status(args[0], args[1] as boolean);
  });
  socket.on("report", (args) => report(args as MoistureData));
  socket.on("actioning", (...args) => actioning(args[0], args[1]));
  socket.on("battery", (args) => battery(args));
  socket.on("getCommand", (args) => getCommand(args, socket));
});

httpServer.listen(8000);
