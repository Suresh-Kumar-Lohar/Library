import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeFromUserLibrary } from "../../redux/books/booksSlice";
import Search from "../../components/Search/Search";
import Pagination from "../../components/Pagination/Pagination";
import "./UserLibrary.css";

const UserLibrary = () => {
  const dispatch = useDispatch();
  const { userLibrary } = useSelector((state) => state.books);
  const [filteredBooks, setFilteredBooks] = useState(userLibrary);
  const [currentPage, setCurrentPage] = useState(1);
  const booksPerPage = 5;

  useEffect(() => {
    setFilteredBooks(userLibrary);
  }, [userLibrary]);

  const handleRemove = (id) => {
    dispatch(removeFromUserLibrary(id));
  };

  const handleSearch = (query) => {
    if (query) {
      setFilteredBooks(
        userLibrary.filter(
          (book) =>
            book.name.toLowerCase().includes(query.toLowerCase()) ||
            book.author.toLowerCase().includes(query.toLowerCase())
        )
      );
    } else {
      setFilteredBooks(userLibrary);
    }
    setCurrentPage(1);
  };

  const totalPages = Math.ceil(filteredBooks.length / booksPerPage);
  const indexOfLastBook = currentPage * booksPerPage;
  const indexOfFirstBook = indexOfLastBook - booksPerPage;
  const currentBooks = filteredBooks.slice(indexOfFirstBook, indexOfLastBook);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="my-library">
      <div className="user-library-controls">
        <h2>My Library</h2>
        <div className="search">
          <Search onSearch={handleSearch} />
        </div>
      </div>

      {filteredBooks.length === 0 ? (
        <p>No books found. Add some books from the library.</p>
      ) : (
        <>
          <table>
            <thead>
              <tr>
                <th>Book Name</th>
                <th>Author</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {currentBooks.map((book) => (
                <tr key={book.id}>
                  <td>{book.name}</td>
                  <td>{book.author}</td>
                  <td>
                    <button onClick={() => handleRemove(book.id)}>
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {totalPages >= 1 && (
            <div className="pagination">
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default UserLibrary;
