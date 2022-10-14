import { Socket } from "socket.io";
import { commandQueue } from "../../db";
import { ClientEvents } from "../../types";
import addWeeks from "date-fns/addWeeks";

export const commandHistory = async (planterID: string, socket: Socket) => {
  console.info(`Getting command history - ${planterID}`);
  const date = new Date();
  const searchDate = addWeeks(date, -3);
  const commandHistory = await commandQueue.find(
    {
      planterID: planterID,
      dateReceived: { $gte: searchDate },
    },
    {},
    { limit: 5 }
  );
  socket.emit(ClientEvents.COMMANDS, commandHistory);
};
