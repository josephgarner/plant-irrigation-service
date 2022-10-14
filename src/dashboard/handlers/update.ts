import { planterDetails } from "../../db";
import { UpdatePlanterDetails } from "../types";

export type UpdateProps = {
  planterID: string;
  details: UpdatePlanterDetails;
};

export const update = async ({ planterID, details }: UpdateProps) => {
  console.info(`Updating details for planter - ${planterID}`);
  console.log(details);
  planterDetails.updateOne(
    { planterID: planterID },
    {
      title: details.planterTitle,
      upperLimit: details.upperLimit,
      lowerLimit: details.lowerLimit,
    },
    (error: any) => {
      if (error) {
        console.error(error);
      } else {
        console.info(`Updated details for planter - ${planterID}`);
      }
    }
  );
};
