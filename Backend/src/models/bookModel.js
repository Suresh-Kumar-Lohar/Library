import Book from "../database/schemas/book.js";

class BookModel {
  async bookList(search, page = 1, limit = 10, sortBy = "createdAt", order = "desc", extraQuery = {}) {
    page = page || 1;
    limit = limit || 10;
    sortBy = sortBy || "createdAt";
    order = order || "desc";

    let searchQuery = search
      ? {
        $or: [
          { title: { $regex: search, $options: "i" } },
          { authorName: { $regex: search, $options: "i" } },
        ],
      }
      : {};

    searchQuery = { ...searchQuery, ...extraQuery, deletedAt: null };

    const sortOrder = order === "asc" ? 1 : -1;
    const sort = { [sortBy]: sortOrder };

    const bookList = await Book.find(searchQuery)
      .sort(sort)
      .skip((page - 1) * limit)
      .limit(limit)
      .select({ _id: 1, title: 1, authorName: 1, stockCount: 1 })
      .lean();

    const count = await Book.countDocuments(searchQuery);

    return {
      count,
      bookList,
    };
  }

  async createBooks(data) {
    await Book.create(data);
  }
}

const bookModel = new BookModel();
export default bookModel;
