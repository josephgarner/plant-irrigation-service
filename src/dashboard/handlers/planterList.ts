import { Socket } from "socket.io";
import { planterDetails } from "../../db";
import { ClientEvents } from "../../types";

export const planterList = async (socket: Socket) => {
  console.info(`Getting planter list`);
  const planters = await planterDetails.find();
  const list = [];
  if (planters) {
    list.push(
      planters.map((planter) => {
        return planter.planterID;
      })
    );
    socket.emit(ClientEvents.PLANTER_LIST, list);
  }
};
