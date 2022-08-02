import mongoose from "mongoose";

export const connectToDatabase = async () => {
  const uri = process.env.DATABASE_URI || "mock";
  const database = process.env.DATABASE || "database";
  try {
    mongoose.connect(`mongodb://${uri}/${database}`, () => {
      console.log("Connected to Database");
    });
    mongoose.connection.on("error", (err) => {
      console.log(err);
    });
  } catch (error) {
    console.log(error);
  }

  // console.log(mongoose.connection);
  // if (!mongoose.connection) {
  // }
};
