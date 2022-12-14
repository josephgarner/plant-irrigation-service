import { Socket } from "socket.io";
import { commandQueue, planterDetails } from "../../db";
import { CommandType } from "../../types";

export const getCommand = async (planterID: string, socket: Socket) => {
  console.info(`Getting command for - ${planterID}`);
  const command = await commandQueue.findOneAndUpdate(
    {
      planterID: planterID,
      actioned: false,
    },
    { $set: { sent: true, dateUpdated: new Date() } }
  );
  if (command) {
    console.info(
      `found command for ${planterID} sending - ${command.issuedCommand}`
    );
    if (command.issuedCommand === CommandType.IRRIGATE_MAX) {
      const details = await planterDetails.findOne({ planterID: planterID });
      if (details.upperLimit) {
        socket.emit(command.issuedCommand, details.upperLimit);
      }
    } else {
      socket.emit(command.issuedCommand);
    }
  } else {
    socket.emit(CommandType.NOTHING_TO_DO);
  }
};
