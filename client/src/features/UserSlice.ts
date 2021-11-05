import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import SignInData from "../models/SignInData";
import SignUpData from "../models/SignUpData";
import UserState from "../models/UserState";

const initialState: UserState = {
  firstName: "",
  lastName: "",
  email: "",
  token: "",
  isRegistrationSuccesfull: false,
  isFetching: false,
  isSuccess: false,
  isError: false,
  errorMessage: "",
};

export const signupUser = createAsyncThunk(
  "users/signupUser",
  async (
    { firstName, lastName, email, password, confirmPassword }: SignUpData,
    thunkAPI
  ) => {
    try {
      const response = await fetch("http://localhost:5000/register", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstName,
          lastName,
          email,
          password,
          confirmPassword,
        }),
      });
      let data = await response.json();
      console.log("data", data);

      if (response.status === 200) {
        return { ...data };
      } else {
        return thunkAPI.rejectWithValue(data);
      }
    } catch (e: any) {
      console.log("Error", e.message);
      return { ...e.message };
    }
  }
);

export const signIn = createAsyncThunk(
  "users/login",
  async ({ email, password }: SignInData, thunkAPI) => {
    try {
      const response = await fetch("http://localhost:5000/login", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      let data = await response.json();
      console.log("response", data);

      if (response.status === 200) {
        localStorage.setItem("token", data.token);
        return data;
      } else {
        return thunkAPI.rejectWithValue(data);
      }
    } catch (e) {
      console.log(e);
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState: initialState,
  reducers: {
    clearState: (state) => {
      state.firstName = "";
      state.lastName = "";
      state.email = "";
      state.token = "";
      state.isError = false;
      state.isSuccess = false;
      state.isFetching = false;
    },
    setRegisterSuccesfully: (state) => {
      state.isRegistrationSuccesfull = true;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(signupUser.pending, (state, action) => {
      state.isFetching = true;
    });
    builder.addCase(signupUser.fulfilled, (state, { payload }) => {
      state.isRegistrationSuccesfull = true;
      return state;
    });
    builder.addCase(signupUser.rejected, (state, { payload }: any) => {
      state.isFetching = false;
      state.errorMessage = payload;
    });
    builder.addCase(signIn.pending, (state, action) => {
      state.isFetching = true;
    });
    builder.addCase(signIn.fulfilled, (state, { payload }) => {
      state.email = payload.email;
      state.firstName = payload.firstName;
      state.lastName = payload.lastName;
      state.token = payload.token;
      state.isSuccess = true;
      state.isFetching = false;
      return state;
    });
    builder.addCase(signIn.rejected, (state, { payload }: any) => {
      state.isFetching = false;
      state.errorMessage = payload;
    });
  },
});

export const { clearState } = userSlice.actions;
export const userSelector = (state: any) => state.user;
export default userSlice;
