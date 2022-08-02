import { commandQueue, moistureData, planterDetails } from "../../db";
const clientArray = require("../../clients/connectedClients");
import { Socket } from "socket.io";
import { MessageType, MoistureData } from "../../types";

export const report = async (data: MoistureData) => {
  const messageType = MessageType.IRRIGATION_REPORT;
  clientArray.list().forEach((socket: Socket) => {
    socket.emit(messageType, data);
  });
  await moistureData.build({ ...data }).save();

  const lowerLimit = await planterDetails
    .findOne({ planterID: data.planterID }, "lowerLimit")
    .exec();
  if (data.moisturePercentage < lowerLimit) {
    await commandQueue
      .build({ planterID: data.planterID, issuedCommand: "IRRIGATE_MAX" })
      .save();
    await commandQueue
      .build({ planterID: data.planterID, issuedCommand: "IRRIGATE" })
      .save();
  }
};
