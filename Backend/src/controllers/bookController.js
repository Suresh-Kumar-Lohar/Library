import BookModel from "../models/bookModel.js";

class BookController {
  async listAllBooks(req, res) {
    try {
      const { search, page, limit, sortBy, order } = req.body;
      let extraQuery = { stockCount: { $gt: 0 } };
      const booksData = await BookModel.bookList(search, page, limit, sortBy, order, extraQuery);
      return res.handler.success("Books has been fetched successfully.", booksData);
    } catch (error) {
      return res.handler.serverError(error);
    }
  }

  async borrowBooks(req, res) {
    try {
      const { bookIds } = req.body;
      const filter = { userId: req.userId, deletedAt: null };

      if (!Array.isArray(bookIds) || bookIds.length === 0) {
        return res.handler.badRequest("Invalid inputs!");
      }

      if (bookIds.length > 2) {
        return res.handler.badRequest("You can borrow only 2 books at a time.");
      }

      const userBooksDetails = await BookModel.findBookByUser(filter);
      const existingBookIds = userBooksDetails?.bookIds || [];

      const duplicateBooks = bookIds.filter(bookId => existingBookIds.includes(bookId));
      if (duplicateBooks.length > 0) {
        return res.handler.conflict("One or more books already borrowed.");
      }

      const booksToBorrow = await BookModel.findBooks({ _id: { $in: bookIds } });
      const unavailableBooks = booksToBorrow.filter(book => book.stockCount <= 0);

      if (unavailableBooks.length > 0) {
        return res.handler.badRequest("One or more books are out of stock.");
      }

      const bulkOperations = booksToBorrow.map(book => ({
        updateOne: {
          filter: { _id: book._id },
          update: { $inc: { stockCount: -1 } }
        }
      }));

      await BookModel.updateBooks(bulkOperations)

      const updatedBookIds = [...new Set([...existingBookIds, ...bookIds])];

      const update = {
        userId: req.userId,
        bookIds: updatedBookIds
      };

      await BookModel.createUserBook(filter, update);

      return res.handler.success("Books have been borrowed successfully.");
    } catch (error) {
      return res.handler.serverError(error);
    }
  }
}

const bookController = new BookController();
export default bookController;