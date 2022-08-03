import { BatteryData } from "../../types";
import { batteryData } from "../../db";

export const battery = async (data: BatteryData) => {
  const report = batteryData.build({ ...data, dateReceived: new Date() });
  await report.save();
};
