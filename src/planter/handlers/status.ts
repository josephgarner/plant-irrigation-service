import { planterDetails } from "../../db";

export const status = async (planterID: string, status: boolean) => {
  console.log(status);
  await planterDetails.updateOne(
    { planterID: planterID },
    { $set: { online: status, lastOnline: new Date() } },
    { upsert: true }
  );
};
