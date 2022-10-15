import { planterDetails } from "../../db";
import { StatusData } from "../../types";

export const status = async (data: StatusData) => {
  console.info(
    `Getting status for planter - ${data.planterID} - ${data.status}`
  );
  console.log(data);
  await planterDetails.updateOne(
    { planterID: data.planterID },
    { $set: { online: data.status, lastOnline: new Date() } },
    { upsert: true }
  );
};
