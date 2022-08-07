import { Socket } from "socket.io";
import { batteryData } from "../../db";
import { ClientEvents } from "../../types";

export const battery = async (planterID: string, socket: Socket) => {
  const battery = await batteryData.findOne(
    { planterID: planterID },
    {},
    { sort: { dateReceived: -1 } }
  );
  if (battery) {
    socket.emit(ClientEvents.BATTERY, battery);
  }
};
