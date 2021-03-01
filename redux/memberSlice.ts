import { createAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import AuthApi from "api/AuthApi";
import MemberApi, { MemberProfile } from "api/MemberApi";
import { HYDRATE } from "next-redux-wrapper";
import { RootState } from "./rootReducer";

interface IState {
  memberProile: MemberProfile | null;
}

const initialState: IState = {
  memberProile: null,
};

export const fetchGoogleSignIn = createAsyncThunk(
  "member/fetchGoogleSignIn",
  async (idToken: string) => {
    const response = await AuthApi.fetchGoogleSignIn(idToken);
    return response;
  }
);

export const fetchMemberInfo = createAsyncThunk(
  "member/fetchMemberInfo",
  async () => {
    const response = await MemberApi.fetchMemberInfo();
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
        ...action.payload["member"],
      };
    });
    builder.addCase(fetchGoogleSignIn.fulfilled, (state, action) => {
      state.memberProile = action.payload;
    });
    builder.addCase(fetchMemberInfo.fulfilled, (state, action) => {
      state.memberProile = action.payload;
    });
  },
});

export const memberState = (state: RootState) => state.member;
export default memberSlice.reducer;
