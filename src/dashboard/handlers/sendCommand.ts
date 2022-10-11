import { commandQueue } from "../../db";
import { CommandType } from "../../types";

export type SendCommandProps = {
  planterID: string;
  command: CommandType;
};

export const sendCommand = async ({ planterID, command }: SendCommandProps) => {
  console.info(`Queuing command ${command} for planter - ${planterID}`);
  commandQueue.create({ planterID, issuedCommand: command });
};
