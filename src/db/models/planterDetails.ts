import mongoose from "mongoose";
import { PlanterDetails } from "../../types";

const planterDetailsSchema = new mongoose.Schema({
  planterID: {
    type: String,
    required: true,
  },
  online: {
    type: Boolean,
    default: false,
    required: true,
  },
  title: {
    type: String,
    default: null,
    required: false,
  },
  datePlanted: {
    type: Date,
    default: null,
    required: false,
  },
  upperLimit: {
    type: Number,
    default: null,
    required: false,
  },
  lowerLimit: {
    type: Number,
    default: null,
    required: false,
  },
  plants: {
    type: String,
    default: null,
    required: false,
  },
});

planterDetailsSchema.statics.build = (attr: PlanterDetails) => {
  return new planterDetails(attr);
};

interface planterDetailsModel extends mongoose.Model<any> {
  build(attr: PlanterDetails): any;
}

const planterDetails = mongoose.model<any, planterDetailsModel>(
  "PlanterDetails",
  planterDetailsSchema
);

export { planterDetails };
