import React, { useState, useEffect } from "react";
import Search from "../../components/Search/Search"; // Import Search component
import Pagination from "../../components/Pagination/Pagination"; // Import Pagination component
import "./UserLibrary.css"; // Import styles
import { getUserBorrowList, returnBooks } from "../../Api/Service"; // Import the returnBooks API call

const UserLibrary = () => {
  const [userLibrary, setUserLibrary] = useState([]); // Local state for user library
  console.log("🚀 ~ UserLibrary ~ userLibrary:", userLibrary);
  const [filteredBooks, setFilteredBooks] = useState([]); // Local state for filtered books
  console.log("🚀 ~ UserLibrary ~ filteredBooks:", filteredBooks);
  const [currentPage, setCurrentPage] = useState(1);
  const booksPerPage = 5;

  useEffect(() => {
    // Fetch user library on mount (from API)
    const fetchUserLibrary = async () => {
      try {
        const userLibraryData = await getUserBorrowList(); // Replace with your API endpoint
        console.log("🚀 ~ fetchUserLibrary ~ userLibraryData:", userLibraryData);

        // Check if the response contains bookIds
        if (userLibraryData && userLibraryData.data.bookIds) {
          setUserLibrary(userLibraryData.data.bookIds);
          setFilteredBooks(userLibraryData.data.bookIds);
        } else {
          // Handle the case where userLibraryData is undefined or doesn't have bookIds
          setUserLibrary([]); // Set to an empty array if no data
          setFilteredBooks([]); // Also set filteredBooks to empty
        }
      } catch (error) {
        console.error("Error fetching user library:", error);
        // Handle error (e.g., show a notification or set an error state)
      }
    };

    fetchUserLibrary();
  }, []);

  // Handle removing (returning) a book from the user library
  const handleRemove = async (id) => {
    try {
      // Call the returnBooks API to update the backend
      const response = await returnBooks([id]);
      if (response && response.success) {
        // If the API call was successful, update the UI locally
        const updatedLibrary = userLibrary.filter((book) => book.id !== id);
        setUserLibrary(updatedLibrary);
        setFilteredBooks(updatedLibrary);
      } else {
        // Handle failure case (e.g., show an error message)
        console.error("Failed to return the book:", response.message);
      }
    } catch (error) {
      console.error("Error returning book:", error);
      // Handle error (e.g., show a notification)
    }
  };

  // Handle search functionality
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
    setCurrentPage(1); // Reset to the first page after a new search
  };

  // Pagination logic
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
