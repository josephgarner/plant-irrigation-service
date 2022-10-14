import { CommandType } from "../types";

export type PlanterSummary = {
  planterID: string;
  planterTitle?: string | null;
  online: boolean;
  lastOnline: Date | null;
  irrigating: boolean;
  lastIrrigated: Date | null;
};

export type PlanterDetails = {
  planterID: string;
  planterTitle?: string | null;
  upperLimit: number | null;
  lowerLimit: number | null;
  dateCreated: Date | null;
};

export type UpdatePlanterDetails = {
  planterTitle?: string | null;
  upperLimit: number | null;
  lowerLimit: number | null;
};
