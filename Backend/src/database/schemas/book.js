import mongoose from "mongoose";

const bookSchema = new mongoose.Schema({
  title: { type: String, require: true },
  authorName: { type: String },
  stockCount: { type: Number, require: true, default: 0 },
  deletedAt: { type: Date, default: null },
}, {
  timestamps: true
})

const Book = mongoose.model("book", bookSchema);

export default Book;