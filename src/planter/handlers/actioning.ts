import { commandQueue } from "../../db";
import { CommandType } from "../../types";

export const actioning = (planterID: string, command: CommandType) => {
  commandQueue.updateOne(
    { planterID: planterID, issuedCommand: command, sent: true },
    { $set: { actioned: true } },
    (error: any, writeOpResult: any) => {
      return writeOpResult;
    }
  );
};
