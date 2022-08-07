import { Socket } from "socket.io";
import { moistureData, planterDetails } from "../../db";
import { ClientEvents } from "../../types";
import { PlanterSummary } from "../types";

export const summary = async (planterID: string, socket: Socket) => {
  const details = await planterDetails.findOne({ planterID: planterID });
  const irrigation = await moistureData.findOne(
    { planterID: planterID },
    {},
    { sort: { dateReceived: -1 } }
  );
  const lastIrrigated = await moistureData.findOne(
    { planterID: planterID, irrigating: true },
    {},
    { sort: { dateReceived: -1 } }
  );
  if (details) {
    const summary: PlanterSummary = {
      planterID: details.planterID,
      planterTitle: details.title,
      online: details.online,
      lastOnline: details.lastOnline,
      irrigating: irrigation != null ? irrigation.irrigating : false,
      lastIrrigated: lastIrrigated != null ? lastIrrigated.dateReceived : null,
    };
    socket.emit(ClientEvents.SUMMARY, summary);
  }
};
