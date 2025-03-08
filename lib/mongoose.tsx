import mongoose from "mongoose";

const MONGODB_URI: string = "mongodb://127.0.0.1:27017/crud";
const connectToDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || MONGODB_URI);
    console.log("Connected to MongoDB");
  } catch (err) {
    console.log(err);
  }
};
export default connectToDatabase;
