export type PlanterSummary = {
  planterID: string;
  planterTitle?: string | null;
  online: boolean;
  lastOnline: Date | null;
  irrigating: boolean;
  lastIrrigated: Date | null;
};
