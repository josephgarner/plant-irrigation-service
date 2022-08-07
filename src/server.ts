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
import { BatteryData, ClientEvents, MoistureData } from "./types";
import {
  battery,
  irrigationHistory,
  moistureLevel,
  planterList,
  summary,
} from "./dashboard";

const app = new Koa();
const httpServer = createServer(app.callback());
const io = new Server(httpServer, {
  cors: {
    origin: ["http://localhost:3000", "http://has.local:3000"],
  },
});

console.log("ENV:", process.env.NODE_ENV);
connectToDatabase();

io.on("status", (...args) => {
  console.log("Hitting status");
  console.log(args[0], args[1]);
  status(args[0], args[1] as boolean);
});

io.of("dashboard").on("connection", (socket) => {
  socket.on(ClientEvents.PLANTER_LIST, () => planterList(socket));
  socket.on(ClientEvents.BATTERY, (args) => battery(args, socket));
  socket.on(ClientEvents.REPORT, (args) => moistureLevel(args, socket));
  socket.on(ClientEvents.IRRIGATION_HISTORY, (args) =>
    irrigationHistory(args, socket)
  );
  socket.on(ClientEvents.SUMMARY, (args) => summary(args, socket));
  socket.on(ClientEvents.COMMANDS, (args) => {
    /* Sends list of recent commands */
  });
  socket.on(ClientEvents.PLANTS, (args) => {
    /* Sends list of Plants */
  });
  socket.on(ClientEvents.UPDATE, async () => {
    /* Updates the editible infomation for a planter */
  });
  socket.on(ClientEvents.SEND_COMMAND, () => {
    /* Sends a command message for the planter to exicute on next wake */
  });
});

io.of("planter").on("connection", (socket) => {
  console.log("Planter Connected");
  socket.on("status", (...args) => status(args[0], args[1] as boolean));
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
