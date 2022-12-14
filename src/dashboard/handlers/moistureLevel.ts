import { Socket } from "socket.io";
import { moistureData } from "../../db";
import { ClientEvents } from "../../types";

export const moistureLevel = async (planterID: string, socket: Socket) => {
  console.info(`Getting moisture level - ${planterID}`);
  const moisture = await moistureData.findOne(
    { planterID: planterID },
    {},
    { sort: { dateReceived: -1 } }
  );
  if (moisture) {
    socket.emit(ClientEvents.REPORT, moisture);
  }
};
