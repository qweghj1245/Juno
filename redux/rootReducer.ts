import { combineReducers } from "@reduxjs/toolkit";
import appConfig from "./appConfigSlice";
import category from "./categorySlice";
import member from "./memberSlice";
import post from "./postSlice";
import tag from "./tagSlice";

const rootReducer = combineReducers({
  category,
  tag,
  post,
  member,
  appConfig,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
