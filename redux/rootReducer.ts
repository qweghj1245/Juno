import { combineReducers } from "@reduxjs/toolkit";
import appConfig from "./appConfigSlice";
import member from "./memberSlice";
import post from "./postSlice";
import tag from "./tagSlice";

const rootReducer = combineReducers({
  tag,
  post,
  member,
  appConfig,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
