import { createAction, createSlice } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";
import { RootState } from "./rootReducer";

interface IState {
  requestHeader: any;
}

const initialState: IState = {
  requestHeader: null,
};

const hydrate = createAction<RootState>(HYDRATE);

const appConfigSlice = createSlice({
  name: "appConfig",
  initialState,
  reducers: {
    setRequestHeader: (state, action) => {
      state.requestHeader = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(hydrate, (state, action) => {
      return {
        ...state,
        ...action.payload["appConfig"],
      };
    });
  },
});

export const appConfigState = (state: RootState) => state.appConfig;
export const { setRequestHeader } = appConfigSlice.actions;
export default appConfigSlice.reducer;
