import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToUserLibrary } from "../../redux/books/booksSlice";
import Search from "../../components/Search/Search";
import Pagination from "../../components/Pagination/Pagination";
import "./Books.css";

const Books = () => {
  const dispatch = useDispatch();
  const { libraryBooks, userLibrary } = useSelector((state) => state.books);
  const [filteredBooks, setFilteredBooks] = useState(libraryBooks);
  const [currentPage, setCurrentPage] = useState(1);
  const booksPerPage = 5;

  useEffect(() => {
    setFilteredBooks(libraryBooks);
    setCurrentPage(1);
  }, [libraryBooks]);

  const handleAdd = (id) => {
    const bookExists = userLibrary.some((book) => book.id === id);
    if (!bookExists) {
      dispatch(addToUserLibrary(id));
    } else {
      alert("This book is already in your library.");
    }
  };

  const handleSearch = (query) => {
    if (query) {
      setFilteredBooks(
        libraryBooks.filter(
          (book) =>
            book.name.toLowerCase().includes(query.toLowerCase()) ||
            book.author.toLowerCase().includes(query.toLowerCase())
        )
      );
    } else {
      setFilteredBooks(libraryBooks);
    }
    setCurrentPage(1);
  };

  const totalPages = Math.ceil(filteredBooks.length / booksPerPage);
  const indexOfLastBook = currentPage * booksPerPage;
  const indexOfFirstBook = indexOfLastBook - booksPerPage;
  const currentBooks = filteredBooks.slice(indexOfFirstBook, indexOfLastBook);

  const handlePageChange = (page) => {
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div className="library">
      <div className="library-controls">
        <h2>Library Books</h2>
        <div className="search">
          <Search onSearch={handleSearch} />
        </div>
      </div>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Book Name</th>
            <th>Author</th>
            <th>Stock</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {currentBooks.length > 0 ? (
            currentBooks.map((book) => (
              <tr key={book.id}>
                <td>{book.id}</td>
                <td>{book.name}</td>
                <td>{book.author}</td>
                <td>{book.stock}</td>
                <td>
                  <button
                    disabled={
                      book.stock === 0 ||
                      userLibrary.some((b) => b.id === book.id)
                    }
                    onClick={() => handleAdd(book.id)}
                  >
                    Add to My Books
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5">No books available.</td>
            </tr>
          )}
        </tbody>
      </table>
      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      )}
    </div>
  );
};

export default Books;
