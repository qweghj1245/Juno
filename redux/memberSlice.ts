import { createAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import MemberApi, { MemberProfile } from "api/MemberApi";
import { HYDRATE } from "next-redux-wrapper";
import { RootState } from "./rootReducer";

interface IState {
  memberProile: MemberProfile | null;
  accessToken: string;
}

const initialState: IState = {
  memberProile: null,
  accessToken: "",
};

export const fetchGoogleSignIn = createAsyncThunk(
  "post/fetchGoogleSignIn",
  async (idToken: string) => {
    const response = await MemberApi.fetchGoogleSignIn(idToken);
    return response;
  }
);

const hydrate = createAction<RootState>(HYDRATE);

const memberSlice = createSlice({
  name: "member",
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
      state.memberProile = action.payload.member;
      state.accessToken = action.payload.token;
    });
  },
});

export const memberState = (state: RootState) => state.member;
export default memberSlice.reducer;
