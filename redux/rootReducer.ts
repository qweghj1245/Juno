import { combineReducers } from "@reduxjs/toolkit";
import appConfig from "./appConfigSlice";
import member from "./memberSlice";
import post from "./postSlice";

const rootReducer = combineReducers({
  post,
  member,
  appConfig,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
