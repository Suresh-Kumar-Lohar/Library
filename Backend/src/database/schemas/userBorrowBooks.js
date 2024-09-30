import mongoose, { Schema } from "mongoose";

const userBorrowBooksSchema = new mongoose.Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'user',
    require: true
  },
  bookIds: [
    {
      type: Schema.Types.ObjectId,
      ref: 'book'
    }
  ],
  deletedAt: { type: Date, default: null },
}, {
  timestamps: true
})

const UserBorrowBooks = mongoose.model("userBorrowBooks", userBorrowBooksSchema);

export default UserBorrowBooks;