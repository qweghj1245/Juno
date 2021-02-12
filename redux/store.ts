import { configureStore } from "@reduxjs/toolkit";
import { createWrapper } from "next-redux-wrapper";
import rootReducer from "./rootReducer";

const store = () =>
  configureStore({
    reducer: rootReducer,
  });

export const wrapper = createWrapper(store);
