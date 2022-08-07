export type PlanterDetails = {
  planterID: string;
  online: boolean;
  lastOnline: Date | null;
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

export enum ClientEvents {
  PLANTER_LIST = "planter_list",
  REPORT = "report",
  IRRIGATION_HISTORY = "irrigation_history",
  SUMMARY = "summary",
  COMMANDS = "commands",
  UPDATE = "update",
  PLANTS = "plants",
  SEND_COMMAND = "send_command",
  BATTERY = "battery",
}

export enum PlanterEvents {}
//TODO

export enum CommandType {
  IRRIGATE = "IRRIGATE",
  STOP_IRRIGATE = "STOP_IRRIGATE",
  IRRIGATE_MAX = "IRRIGATE_MAX",
  NOTHING_TO_DO = "NOTHING_TO_DO",
}
