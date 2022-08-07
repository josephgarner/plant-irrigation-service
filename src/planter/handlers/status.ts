import { planterDetails } from "../../db";
import { StatusData } from "../../types";

export const status = async (data: StatusData) => {
  console.log(data);
  await planterDetails.updateOne(
    { planterID: data.planterID },
    { $set: { online: data.status, lastOnline: new Date() } },
    { upsert: true }
  );
};
