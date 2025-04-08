import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const MONGODB_URI: string = process.env.MONGODB_URI || "";
const connectToDatabase = async () => {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log("Connected to MongoDB");
  } catch (err) {
    console.log(err);
  }
};
export default connectToDatabase;
