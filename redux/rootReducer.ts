import { combineReducers } from "@reduxjs/toolkit";
import post from "./postSlice";

const rootReducer = combineReducers({
  post,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
