import React, { useState, useEffect } from "react";
import { getBookList, borrowBook, getUserBorrowList } from "../../Api/Service";
import Search from "../../components/Search/Search";
import Pagination from "../../components/Pagination/Pagination";
import "./Books.css";

const Books = () => {
  const [libraryBooks, setLibraryBooks] = useState([]);
  const [userLibrary, setUserLibrary] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [borrowList, setBorrowList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const booksPerPage = 5;
  const maxBorrowLimit = 2;

  useEffect(() => {
    const fetchBooksAndUserLibrary = async () => {
      setIsLoading(true);
      try {
        const bookData = await getBookList({
          search: "",
          sortBy: "title",
          order: "asc",
          limit: 30,
          page: 1,
        });

        const userLibraryData = await getUserBorrowList();

        if (bookData && bookData.data.bookList) {
          setLibraryBooks(bookData.data.bookList);
          setFilteredBooks(bookData.data.bookList);
        } else {
          console.error("Invalid book data:", bookData);
        }

        if (userLibraryData && userLibraryData.data.bookIds) {

          setUserLibrary(userLibraryData.data.bookIds);
        } else {
          console.error("Invalid user library data:", userLibraryData);
        }

        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setIsLoading(false);
      }
    };

    fetchBooksAndUserLibrary();
  }, [borrowList]);

  const handleAddToBorrowList = (id) => {
    if (borrowList.length < maxBorrowLimit) {
      const bookExists = borrowList.some((book) => book._id === id);
      if (!bookExists) {
        const selectedBook = libraryBooks.find((book) => book._id === id);
        setBorrowList([...borrowList, selectedBook]);
      } else {
        alert("This book is already in your borrow list.");
      }
    } else {
      alert("You can only add up to 2 books in the borrow list.");
    }
  };

  const handleBorrowBooks = async () => {
    if (borrowList.length === 0) {
      alert("No books in the borrow list.");
      return;
    }

    const bookIds = borrowList.map((book) => book._id);

    try {
      await borrowBook({ bookIds });
      const updatedUserLibrary = await getUserBorrowList();
      setUserLibrary(updatedUserLibrary.borrowedBooks);
      setBorrowList([]);
    } catch (error) {
      console.error("Error borrowing books:", error);
    }
  };

  const handleSearch = (query) => {
    if (query) {
      setFilteredBooks(
        libraryBooks.filter((book) =>
          book.title.toLowerCase().includes(query.toLowerCase())
        )
      );
    } else {
      setFilteredBooks(libraryBooks);
    }
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
      {isLoading ? (
        <p>Loading books...</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Book Name</th>
              <th>Stock</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(currentBooks) && currentBooks.length > 0 ? (
              currentBooks.map((book) => (
                <tr key={book._id}>
                  <td>{book._id}</td>
                  <td>{book.title}</td>
                  <td>{book.stockCount}</td>
                  <td>
                    <button
                      disabled={
                        book.stockCount === 0 ||
                        borrowList.some((b) => b._id === book._id) ||
                        borrowList.length >= maxBorrowLimit
                      }
                      onClick={() => handleAddToBorrowList(book._id)}
                    >
                      Add to Borrow List
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4">No books available.</td>
              </tr>
            )}
          </tbody>
        </table>
      )}
      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      )}

      {/* Borrow List Section */}
      <div className="borrow-list">
        <h3>Borrow List ({borrowList.length})</h3>
        {borrowList.length > 0 ? (
          <ul>
            {borrowList.map((book) => (
              <li key={book._id}>{book.title}</li>
            ))}
          </ul>
        ) : (
          <p>No books in your borrow list.</p>
        )}
        <button onClick={handleBorrowBooks} disabled={borrowList.length === 0}>
          Borrow Books
        </button>
      </div>
    </div>
  );
};

export default Books;
