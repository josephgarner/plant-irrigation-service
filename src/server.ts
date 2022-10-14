import Koa from "koa";
require("dotenv").config({ path: `.env.${process.env.NODE_ENV}` });
import { createServer } from "http";
import { Server } from "socket.io";
import { connectToDatabase } from "./db";
import {
  actioning,
  batteryReport,
  getCommand,
  report,
  status,
} from "./planter";
import { BatteryData, ClientEvents, MoistureData, StatusData } from "./types";
import {
  battery,
  irrigationHistory,
  moistureLevel,
  planterList,
  summary,
  details,
  update,
  UpdateProps,
  sendCommand,
  SendCommandProps,
  commandHistory,
} from "./dashboard";

const app = new Koa();
const httpServer = createServer(app.callback());
const io = new Server(httpServer, {
  cors: {
    origin: ["*:*", "http://localhost:3000", "http://has.local:4000"],
  },
});

console.log("ENV:", process.env.NODE_ENV);
connectToDatabase();

io.of("dashboard").on("connection", (socket) => {
  socket.on(ClientEvents.PLANTER_LIST, () => planterList(socket));
  socket.on(ClientEvents.BATTERY, (args) => battery(args, socket));
  socket.on(ClientEvents.REPORT, (args) => moistureLevel(args, socket));
  socket.on(ClientEvents.IRRIGATION_HISTORY, (args) =>
    irrigationHistory(args, socket)
  );
  socket.on(ClientEvents.SUMMARY, (args) => summary(args, socket));
  socket.on(ClientEvents.DETAILS, (args) => details(args, socket));
  socket.on(ClientEvents.COMMANDS, (args) => commandHistory(args, socket));
  socket.on(ClientEvents.UPDATE, async (args) => update(args as UpdateProps));
  socket.on(ClientEvents.SEND_COMMAND, (args) =>
    sendCommand(args as SendCommandProps)
  );
});

io.of("planter").on("connection", (socket) => {
  console.log("Planter Connected");
  socket.on("status", (args) => {
    const data = args as StatusData;
    status(data);
  });
  socket.on("report", (args) => {
    io.of("/dashboard").emit(ClientEvents.REPORT, args as MoistureData);
    report(args);
  });
  socket.on("actioning", (...args) => actioning(args[0], args[1]));
  socket.on("battery", (args) => {
    io.of("/dashboard").emit(ClientEvents.BATTERY, args as BatteryData);
    batteryReport(args);
  });
  socket.on("getCommand", (args) => getCommand(args, socket));
});

httpServer.listen(4000);
