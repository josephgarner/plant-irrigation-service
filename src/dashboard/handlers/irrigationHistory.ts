import { Socket } from "socket.io";
import { moistureData } from "../../db";
import { MessageType } from "../../types";

export const irrigationHistory = (planterID: string, socket: Socket) => {
  const date = new Date();
  const irrigationHistory = moistureData.find({
    planterID: planterID,
    dateReceived: { $gte: date.setDate(date.getDate() - 3 * 7) },
  });
  socket.emit(MessageType.IRRIGATION_REPORT_ARRAY, irrigationHistory);
};
