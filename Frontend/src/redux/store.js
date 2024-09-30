import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./user/userSlice";
import booksReducer from "./books/booksSlice";

export const store = configureStore({
  reducer: {
    user: userSlice,
    books: booksReducer
  }
})