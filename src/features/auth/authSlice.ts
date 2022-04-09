import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import $axios from "../../axios";

export interface AuthState {
  userInfo: object;
  accessToken: string;
}

const initialState: AuthState = {
  userInfo: {},
  accessToken: "",
};

const login = createAsyncThunk<
  AuthState | undefined,
  { username: string; password: string },
  {}
>("auth/login", async ({ username, password }) => {
  try {
    const res = await $axios.post("auth/login");
    console.log(res);
    return { userInfo: res.data.userInfo, accessToken: res.data.accessToken };
  } catch (error) {}
});

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, { payload }: PayloadAction<AuthState>) => {
      state = payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(login.pending, (state, action) => {
      console.log("Logging in");
    }),
      builder.addCase(login.fulfilled, (state, action) => {
        action.payload?.userInfo
          ? (state.userInfo = action.payload?.userInfo)
          : null;
        action.payload?.accessToken
          ? (state.accessToken = action.payload?.accessToken)
          : null;
      });
  },
});

export const { setUser } = authSlice.actions;
export const authSelector = (state: RootState) => state.auth;
export default authSlice.reducer;
