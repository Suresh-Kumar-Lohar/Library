import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  firstName: { type: String, require: true },
  lastName: { type: String, require: true },
  mobile: { type: Number, require: true },
  email: { type: String, require: true, unique: true },
  password: { type: String, require: true },
  deletedAt: { type: Date, default: null },
}, {
  timestamps: true
})

const User = mongoose.model("user", userSchema);

export default User;