import { commandQueue } from "../../db";
import { CommandType } from "../../types";

export const actioning = (planterID: string, command: CommandType) => {
  console.info(`Command has been actioned - ${planterID}`);
  commandQueue.updateOne(
    { planterID: planterID, issuedCommand: command, sent: true },
    { $set: { actioned: true, dateUpdated: new Date() } },
    (error: any, writeOpResult: any) => {
      return writeOpResult;
    }
  );
};
