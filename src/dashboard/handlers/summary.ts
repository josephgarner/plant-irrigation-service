import { Socket } from "socket.io";
import { planterDetails } from "../../db";
import { MessageType } from "../../types";

export const summary = (planterID: string, socket: Socket) => {
  const summary = planterDetails.findOne({ planterID: planterID });
  socket.emit(MessageType.PLANTER_SUMMARY, summary);
};
