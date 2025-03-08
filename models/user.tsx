import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  id: { type: String, required: true },
  FirstName: { type: String, required: true },
  LastName: { type: String, required: true },
  Age: { type: Number, required: true },
  Gender: { type: String, required: true },
  Email: { type: String, required: true },
});

const User = mongoose.models.User || mongoose.model("User", userSchema);
export default User;
