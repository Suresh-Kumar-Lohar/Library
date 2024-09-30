import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  libraryBooks: [
    { id: 1, name: "Book One", author: "Author One", stock: 5 },
    { id: 2, name: "Book Two", author: "Author Two", stock: 3 },
    { id: 3, name: "Book Three", author: "Author Three", stock: 2 },
    { id: 4, name: "Book Four", author: "Author Four", stock: 7 },
    { id: 5, name: "Book Five", author: "Author Five", stock: 1 },
    { id: 6, name: "Book Six", author: "Author Six", stock: 4 },
    { id: 7, name: "Book Seven", author: "Author Seven", stock: 3 },
    { id: 8, name: "Book Eight", author: "Author Eight", stock: 10 },
    { id: 9, name: "Book Nine", author: "Author Nine", stock: 5 },
    { id: 10, name: "Book Ten", author: "Author Ten", stock: 3 },
    { id: 11, name: "Book Eleven", author: "Author Eleven", stock: 6 },
    { id: 12, name: "Book Twelve", author: "Author Twelve", stock: 4 },
    { id: 13, name: "Book Thirteen", author: "Author Thirteen", stock: 2 },
    { id: 14, name: "Book Fourteen", author: "Author Fourteen", stock: 8 },
    { id: 15, name: "Book Fifteen", author: "Author Fifteen", stock: 9 },
  ],
  userLibrary: [],
};

const booksSlice = createSlice({
  name: "books",
  initialState,
  reducers: {
    addToUserLibrary: (state, action) => {
      const bookId = action.payload;
      const book = state.libraryBooks.find((b) => b.id === bookId);

      if (book && book.stock > 0) {
        const alreadyExists = state.userLibrary.some((b) => b.id === bookId);
        if (!alreadyExists) {
          book.stock--;
          state.userLibrary.push({ ...book });
        }
      }
    },
    removeFromUserLibrary: (state, action) => {
      const bookId = action.payload;
      const index = state.userLibrary.findIndex((b) => b.id === bookId);

      if (index !== -1) {
        const book = state.userLibrary[index];
        state.userLibrary.splice(index, 1);
        const libraryBook = state.libraryBooks.find((b) => b.id === bookId);
        if (libraryBook) {
          libraryBook.stock++;
        }
      }
    },
  },
});

export const { addToUserLibrary, removeFromUserLibrary } = booksSlice.actions;
export default booksSlice.reducer;
