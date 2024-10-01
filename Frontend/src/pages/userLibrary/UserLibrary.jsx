import React, { useState, useEffect } from "react";
import Search from "../../components/Search/Search";
import Pagination from "../../components/Pagination/Pagination";
import "./UserLibrary.css";
import { getUserBorrowList, returnBooks } from "../../Api/Service";

const UserLibrary = () => {
  const [userLibrary, setUserLibrary] = useState([]);
  console.log("🚀 ~ UserLibrary ~ userLibrary:", userLibrary);
  const [filteredBooks, setFilteredBooks] = useState([]);
  console.log("🚀 ~ UserLibrary ~ filteredBooks:", filteredBooks);
  const [currentPage, setCurrentPage] = useState(1);
  const booksPerPage = 5;

  useEffect(() => {

    const fetchUserLibrary = async () => {
      try {
        const userLibraryData = await getUserBorrowList();
        console.log("🚀 ~ fetchUserLibrary ~ userLibraryData:", userLibraryData);

        if (userLibraryData && userLibraryData.data.bookIds) {
          setUserLibrary(userLibraryData.data.bookIds);
          setFilteredBooks(userLibraryData.data.bookIds);
        } else {
          setUserLibrary([]);
          setFilteredBooks([]);
        }
      } catch (error) {
        console.error("Error fetching user library:", error);
      }
    };

    fetchUserLibrary();
  }, []);

  const handleRemove = async (id) => {
    try {
      const response = await returnBooks([id]);
      if (response && response.success) {
        const updatedLibrary = userLibrary.filter((book) => book.id !== id);
        setUserLibrary(updatedLibrary);
        setFilteredBooks(updatedLibrary);
      } else {
        console.error("Failed to return the book:", response.message);
      }
    } catch (error) {
      console.error("Error returning book:", error);
    }
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
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page);
    }
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
                  <td>{book.title}</td>
                  <td>{book.author}</td>
                  <td>
                    <button onClick={() => handleRemove(book.id)}>
                      Return
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {totalPages > 1 && (
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
