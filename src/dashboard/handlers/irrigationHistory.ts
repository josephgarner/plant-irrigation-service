import { Socket } from "socket.io";
import { moistureData } from "../../db";
import { ClientEvents } from "../../types";
import addWeeks from "date-fns/addWeeks";

export const irrigationHistory = async (planterID: string, socket: Socket) => {
  console.info(`Getting irrigation history - ${planterID}`);
  const date = new Date();
  const searchDate = addWeeks(date, -3);
  const irrigationHistory = await moistureData.find({
    planterID: planterID,
    dateReceived: { $gte: searchDate },
  });
  socket.emit(ClientEvents.IRRIGATION_HISTORY, irrigationHistory);
};
