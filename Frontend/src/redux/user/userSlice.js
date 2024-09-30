import { toast } from "react-toastify";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { addUserToLocalStorage, getUserFromLocalStorage, removeUserFromLocalStorage } from "../../utils/localStorage";
import { loginUserThunk, registerUserThunk } from "./userThunk";

const initialState = {
  isLoading: false,
  user: getUserFromLocalStorage()
}

export const registerUser = createAsyncThunk(
  "user/registerUser",
  async (user, thunkAPI) => {
    return registerUserThunk("/user/sign-up", user, thunkAPI);
  }
)

export const loginUser = createAsyncThunk(
  "user/loginUser",
  async (user, thunkAPI) => {
    return loginUserThunk("/user/login", user, thunkAPI);
  }
)

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logoutUser: (state) => {
      state.user = null;
      removeUserFromLocalStorage();
      toast.success("User logged out successfully!")
    }
  },
  extraReducers: builder => {
    builder.addCase(registerUser.pending, (state) => {
      state.isLoading = true;
    })
    builder.addCase(registerUser.fulfilled, (state, { payload }) => {
      const { data } = payload;
      state.isLoading = false;
      state.user = data;
      addUserToLocalStorage(data);
      toast.success("User signed in successfully!")
    })
    builder.addCase(registerUser.rejected, (state, payload) => {
      state.isLoading = false;
      toast.error(payload?.payload?.response?.data?.message)
    })

    builder.addCase(loginUser.pending, (state) => {
      state.isLoading = true;
    })
    builder.addCase(loginUser.fulfilled, (state, { payload }) => {
      const { data } = payload;
      state.isLoading = false;
      state.user = data;
      addUserToLocalStorage(data);
      toast.success("User logged in successfully!")
    })
    builder.addCase(loginUser.rejected, (state, payload) => {
      state.isLoading = false;
      toast.error(payload?.payload?.response?.data?.message)
    })
  }
})

export const { logoutUser } = userSlice.actions;
export default userSlice.reducer;