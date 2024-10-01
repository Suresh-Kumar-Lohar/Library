import customFetch from "../utils/axios"; // Importing the custom axios instance

// Function to get the list of books
export const getBookList = async (payload) => {
  try {
    const response = await customFetch.post("/book/list", payload);
    return response.data;
  } catch (error) {
    console.error("Error fetching book list", error);
    throw error;
  }
};

// Function to borrow a book
export const borrowBook = async (payload) => {
  console.log("Payload", payload)
  try {
    const response = await customFetch.post("/book/borrow", payload);
    return response.data;
  } catch (error) {
    console.error("Error borrowing book", error);
    throw error;
  }
};

// Function to get user's borrowed book list
export const getUserBorrowList = async () => {
  try {
    const response = await customFetch.get("/book/user-borrow-list");
    console.log("🚀 ~ getUserBorrowList ~ response:", response)
    return response.data;
  } catch (error) {
    console.error("Error fetching user borrow list", error);
    throw error;
  }
};

// Function to seed books (for development purposes)
export const addBooks = async () => {
  try {
    const response = await customFetch.get("/seeder/add-books");
    return response.data;
  } catch (error) {
    console.error("Error adding books", error);
    throw error;
  }
};


export const returnBooks = async (bookIds) => {
  try {
    const response = await fetch("/api/return", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ bookIds }),
    });
    return await response.json(); // Assuming the API responds with JSON
  } catch (error) {
    console.error("Error in returnBooks API:", error);
    throw error;
  }
};
