import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import jwt_decode from "jwt-decode";

export const login = createAsyncThunk(
  "auth/login",
  async (id, { fulfillWithValue, rejectWithValue }) => {
    try {
      const response = await axios.post(
        "https://staging-sso.agrotrust.io/sso/api/user/byPassLogin",
        `+91${id}`
      );
      console.log(response);
      if (response.status === 200) {
        const user = jwt_decode(response.data.token);
        localStorage.setItem("user", JSON.stringify(user));
        return fulfillWithValue(user);
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: {},
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: {
    [login.pending]: (state) => {
      state.status = "pending";
    },
    [login.fulfilled]: (state, action) => {
      state.status = "success";
      state.user = action.payload;
    },
    [login.rejected]: (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    },
  },
});

export const { setData } = authSlice.actions;

export default authSlice.reducer;
