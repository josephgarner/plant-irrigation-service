export type PlanterDetails = {
  planterID: string;
  online: boolean;
  title?: string | null;
  datePlanted?: Date | null;
  upperLimit?: number | null;
  lowerLimit?: number | null;
  plants?: string | null;
};

export type MoistureData = {
  planterID: string;
  moisturePercentage: number;
  irrigating: boolean;
  dateReceived?: Date;
};

export type BatteryData = {
  planterID: string;
  charge: number;
  dateReceived?: Date;
};

export type CommandQueue = {
  planterID: string;
  issuedCommand: string;
  sent?: boolean;
  actioned?: boolean;
  dateCreated?: Date;
  dateUpdated?: Date;
};

export enum MessageType {
  IRRIGATION_REPORT = "IRRIGATION_REPORT",
  IRRIGATION_REPORT_ARRAY = "IRRIGATION_REPORT_ARRAY",
  PLANTER_SUMMARY = "PLANTER_SUMMARY",
}

export enum CommandType {
  IRRIGATE = "IRRIGATE",
  STOP_IRRIGATE = "STOP_IRRIGATE",
  IRRIGATE_MAX = "IRRIGATE_MAX",
  NOTHING_TO_DO = "NOTHING_TO_DO",
}
