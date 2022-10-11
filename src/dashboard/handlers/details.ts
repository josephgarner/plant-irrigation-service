import { Socket } from "socket.io";
import { moistureData, planterDetails } from "../../db";
import { ClientEvents } from "../../types";
import { PlanterDetails } from "../types";

export const details = async (planterID: string, socket: Socket) => {
  console.info(`Getting planter details - ${planterID}`);
  const details = await planterDetails.findOne({ planterID: planterID });
  if (details) {
    const planterDetails: PlanterDetails = {
      planterID: details.planterID,
      planterTitle: details.title,
      lowerLimit: details.lowerLimit,
      upperLimit: details.upperLimit,
      dateCreated: details.dateCreated,
    };
    socket.emit(ClientEvents.DETAILS, planterDetails);
  }
};
