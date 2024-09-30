import mongoose, { Schema } from "mongoose";

const userTokenSchema = new mongoose.Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'user',
    default: null
  },
  token: { type: String, default: null },
  deletedAt: { type: Date, default: null },
}, {
  timestamps: true
})

const UserToken = mongoose.model("userToken", userTokenSchema);

export default UserToken;