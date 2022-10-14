import { commandQueue, planterDetails } from "../../db";
import { CommandType } from "../../types";

export type SendCommandProps = {
  planterID: string;
  command: CommandType;
};

export const sendCommand = async ({ planterID, command }: SendCommandProps) => {
  console.info(`Queuing command ${command} for planter - ${planterID}`);
  if (command === CommandType.IRRIGATE) {
    const lowerLimit = await planterDetails
      .findOne({ planterID: planterID }, "lowerLimit")
      .exec();
    await commandQueue
      .build({ planterID: planterID, issuedCommand: "IRRIGATE_MAX" })
      .save();
  }
  await commandQueue
    .build({ planterID: planterID, issuedCommand: command })
    .save();
};
