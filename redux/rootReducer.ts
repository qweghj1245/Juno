import { combineReducers } from "@reduxjs/toolkit";
import member from "./memberSlice";
import post from "./postSlice";

const rootReducer = combineReducers({
  post,
  member,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
