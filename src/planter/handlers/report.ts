import { commandQueue, moistureData, planterDetails } from "../../db";
import { MoistureData } from "../../types";

export const report = async (data: MoistureData) => {
  await moistureData.build({ ...data, dateReceived: new Date() }).save();

  const lowerLimit = await planterDetails
    .findOne({ planterID: data.planterID }, "lowerLimit")
    .exec();
  if (data.moisturePercentage < lowerLimit) {
    await commandQueue
      .build({ planterID: data.planterID, issuedCommand: "IRRIGATE_MAX" })
      .save();
    await commandQueue
      .build({ planterID: data.planterID, issuedCommand: "IRRIGATE" })
      .save();
  }
};
