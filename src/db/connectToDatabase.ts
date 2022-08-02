import mongoose from "mongoose";

export const connectToDatabase = async () => {
  const uri = process.env.DATABASE_URI || "mock";
  const database = process.env.DATABASE || "database";
  mongoose.connect(`mongodb://${uri}/${database}`, () => {
    console.log("Connected to Database");
  });
  // console.log(mongoose.connection);
  // if (!mongoose.connection) {
  // }
};
