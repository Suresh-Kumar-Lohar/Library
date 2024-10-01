import customFetch from "../../utils/axios";

export const fetchAllBooksThunk = async (url, { search, sortBy, order, limit, page }, thunkAPI) => {
  try {
    const resp = await customFetch.post(url, { search, sortBy, order, limit, page });
    return resp.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
}

export const fetchAllBorrowBooksThunk = async (url, thunkAPI) => {
  try {
    const resp = await customFetch.get(url);
    return resp.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
}

export const borrowNewBooksBooksThunk = async (url, bookIds, thunkAPI) => {
  try {
    const resp = await customFetch.post(url, { bookIds });
    return resp.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
}