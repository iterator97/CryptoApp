import { GetMessages } from "../models/GetMessages";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import SignInData from "../models/SignInData";
import SignUpData from "../models/SignUpData";
import UserState from "../models/UserState";

const initialState: UserState = {
  firstName: "",
  lastName: "",
  email: "",
  id: "",
  token: "",
  channels: [],
  activeChannelMessages: [],
  isRegistrationSuccesfull: false,
  isFetching: false,
  isSuccess: false,
  isError: false,
  errorMessage: "",
};

export const signupUser = createAsyncThunk(
  "user/signupUser",
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

      if (response.status === 200) {
        return { ...data };
      } else {
        return thunkAPI.rejectWithValue(data);
      }
    } catch (e: any) {
      return { ...e.message };
    }
  }
);

export const signIn = createAsyncThunk(
  "user/signIn",
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

export const signOut = createAsyncThunk(
  "users/signOut",
  async ({ token }: { token: string }, thunkAPI) => {
    try {
      const response = await fetch("http://localhost:5000/logout", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          token,
        }),
      });
      if (response.status === 200) {
        console.log("Sign out succesfully");
        clearState();
      } else {
        console.log("Sign out error =");
      }
    } catch (e) {
      console.log(e);
    }
  }
);

export const getMessagesByChannel = createAsyncThunk(
  "users/getmessages",
  async ({ name, token }: GetMessages, thunkAPI) => {
    try {
      const response = await fetch(
        "http://localhost:5000/channel/getmessages",
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name,
            token,
          }),
        }
      );
      let data = await response.json();
      if (response.status === 200) {
        return data;
      } else {
        return thunkAPI.rejectWithValue(data);
      }
    } catch (e) {
      console.log(e);
    }
  }
);

// input: token, channel, message
export const sendMessage = createAsyncThunk(
  "users/sendMessage",
  async ({ token, channel, message }: any, thunkAPI) => {
    try {
      console.log(token, channel, message);
      const response = await fetch("http://localhost:5000/channel/addmessage", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          token,
          channel,
          message,
        }),
      });
      let data = await response.json();
      if (response.status === 200) {
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
      state.id = "";
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
      state.isFetching = false;
      state.isRegistrationSuccesfull = true;
      return state;
    });
    builder.addCase(signupUser.rejected, (state, { payload }: any) => {
      state.isFetching = false;
      state.isError = true;
      state.errorMessage = payload.message;
    });
    builder.addCase(signIn.pending, (state, action) => {
      state.isFetching = true;
    });
    builder.addCase(signIn.fulfilled, (state, { payload }) => {
      state.email = payload.email;
      state.firstName = payload.firstName;
      state.lastName = payload.lastName;
      state.token = payload.token;
      state.channels = payload.channels;
      state.id = payload.id;

      state.isSuccess = true;
      state.isFetching = false;
      return state;
    });
    builder.addCase(signIn.rejected, (state, { payload }: any) => {
      state.errorMessage = payload.message;

      state.isError = true;
      state.isFetching = false;
      state.isSuccess = false;
    });
    builder.addCase(getMessagesByChannel.pending, (state, action) => {
      state.isFetching = true;
    });
    builder.addCase(getMessagesByChannel.fulfilled, (state, { payload }) => {
      state.isFetching = false;
      state.isError = false;
      state.activeChannelMessages = payload.messages;
    });
    builder.addCase(
      getMessagesByChannel.rejected,
      (state, { payload }: any) => {
        state.isFetching = false;
        state.isError = true;
        state.errorMessage = payload.message;
      }
    );
    builder.addCase(sendMessage.pending, (state, action) => {});
    builder.addCase(sendMessage.fulfilled, (state, { payload }) => {
      console.log(payload.messages);

      state.activeChannelMessages = payload.messages;
    });
    builder.addCase(sendMessage.rejected, (state, { payload }: any) => {});
  },
});

export const { clearState } = userSlice.actions;
export const userSelector = (state: any) => state.user;
export default userSlice;
