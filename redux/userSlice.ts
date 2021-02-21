import { createAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import UserApi, { UserProfile } from "api/UserApi";
import { HYDRATE } from "next-redux-wrapper";
import { RootState } from "./rootReducer";

interface IState {
  userProile?: UserProfile;
  accessToken: string;
}

const initialState: IState = {
  userProile: undefined,
  accessToken: "",
};

export const fetchGoogleSignIn = createAsyncThunk(
  "post/fetchGoogleSignIn",
  async (idToken: string) => {
    const response = await UserApi.fetchGoogleSignIn(idToken);
    return response;
  }
);

const hydrate = createAction<RootState>(HYDRATE);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(hydrate, (state, action) => {
      return {
        ...state,
        ...action.payload["post"],
      };
    });
    builder.addCase(fetchGoogleSignIn.fulfilled, (state, action) => {
      state.userProile = action.payload.user;
      state.accessToken = action.payload.token;
    });
  },
});

export const userState = (state: RootState) => state.user;
export default userSlice.reducer;
