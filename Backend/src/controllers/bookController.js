import BookModel from "../models/bookModel.js";

class BookController {
  async listAllBooks(req, res) {
    const { search, page, limit, sortBy, order } = req.body;
    try {
      let extraQuery = { stockCount: { $gt: 0 } };
      const booksData = await BookModel.bookList(search, page, limit, sortBy, order, extraQuery);
      res.handler.success("Books has been fetched successfully.", booksData);
    } catch (error) {
      return res.handler.serverError(error);
    }
  }
}

const bookController = new BookController();
export default bookController;