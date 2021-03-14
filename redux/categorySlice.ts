import CategoryApi, { Category } from "@api/CategoryApi";
import { createAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";
import { RootState } from "./rootReducer";

interface IState {
  categories: Category[];
}

const initialState: IState = {
  categories: [],
};

export const fetchCategories = createAsyncThunk(
  "category/fetchCategories",
  async () => {
    const response = await CategoryApi.fetchCategories();
    return response;
  }
);

const hydrate = createAction<RootState>(HYDRATE);

const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(hydrate, (state, action) => {
      return {
        ...state,
        ...action.payload["category"],
      };
    });
    builder.addCase(fetchCategories.fulfilled, (state, action) => {
      state.categories = action.payload;
    });
  },
});

export const categoryState = (state: RootState) => state.category;
export default categorySlice.reducer;
