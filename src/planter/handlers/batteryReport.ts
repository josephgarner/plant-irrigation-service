import { BatteryData } from "../../types";
import { batteryData } from "../../db";

export const batteryReport = async (data: BatteryData) => {
  console.info(`Saving battery info for - ${data.planterID}`);
  const report = batteryData.build({ ...data, dateReceived: new Date() });
  await report.save();
};
