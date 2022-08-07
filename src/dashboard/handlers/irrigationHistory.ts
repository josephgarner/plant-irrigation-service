import { Socket } from "socket.io";
import { moistureData } from "../../db";
import { ClientEvents } from "../../types";

export const irrigationHistory = (planterID: string, socket: Socket) => {
  const date = new Date();
  const irrigationHistory = moistureData.find({
    planterID: planterID,
    dateReceived: { $gte: date.setDate(date.getDate() - 3 * 7) },
  });
  socket.emit(ClientEvents.IRRIGATION_HISTORY, irrigationHistory);
};
