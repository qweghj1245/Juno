import { combineReducers } from "@reduxjs/toolkit";
import post from "./postSlice";
import user from "./userSlice";

const rootReducer = combineReducers({
  post,
  user,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
