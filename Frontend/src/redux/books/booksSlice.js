import { toast } from "react-toastify";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchAllBooksThunk, fetchAllBorrowBooksThunk, borrowNewBooksBooksThunk } from "./bookThunk";

const initialState = {
  libraryBooks: {},
  userLibrary: {},
  isLoading: false
};

export const fetchAllBooks = createAsyncThunk(
  "book/fetchAllBooks",
  async ({ search, sortBy, order, limit, page }, thunkAPI) => {
    return fetchAllBooksThunk("/book/list", { search, sortBy, order, limit, page }, thunkAPI);
  }
)

export const fetchAllBorrowBooks = createAsyncThunk(
  "book/fetchAllBorrowBooks",
  async (_, thunkAPI) => {
    return fetchAllBorrowBooksThunk("/book/user-borrow-list", thunkAPI);
  }
)

export const borrowNewBooks = createAsyncThunk(
  "book/borrowNewBooks",
  async (bookIds, thunkAPI) => {
    return borrowNewBooksBooksThunk("/book/borrow", bookIds, thunkAPI);
  }
)

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
  extraReducers: (builder) => {
    builder.addCase(fetchAllBooks.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchAllBooks.fulfilled, (state, { payload }) => {
      state.isLoading = false;
      state.libraryBooks = payload.data;
      toast.success("Items fetched successfully!");
    });
    builder.addCase(fetchAllBooks.rejected, (state, { payload }) => {
      state.isLoading = false;
      toast.error(payload?.payload?.response?.data?.message || "Search failed.");
    });

    builder.addCase(fetchAllBorrowBooks.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchAllBorrowBooks.fulfilled, (state, { payload }) => {
      state.isLoading = false;
      state.borrowedBooks = payload.data;
      toast.success("Borrowed books fetched successfully!");
    });
    builder.addCase(fetchAllBorrowBooks.rejected, (state, { payload }) => {
      state.isLoading = false;
      toast.error(payload?.response?.data?.message || "Failed to fetch borrowed books.");
    });

    builder.addCase(borrowNewBooks.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(borrowNewBooks.fulfilled, (state, { payload }) => {
      state.isLoading = false;
      state.borrowedBooks = [...state.borrowedBooks, ...payload.data];
      toast.success("Books borrowed successfully!");
    });

    builder.addCase(borrowNewBooks.rejected, (state, { payload }) => {
      state.isLoading = false;
      toast.error(payload?.response?.data?.message || "Failed to borrow books.");
    });
  }
});

export const { addToUserLibrary, removeFromUserLibrary } = booksSlice.actions;
export default booksSlice.reducer;
