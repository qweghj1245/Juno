import { createAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import TagApi, {
  FetchCreateTagsPayload,
  FetchTagsQuery,
  NewTag,
  Tag,
} from "api/TagApi";
import { HYDRATE } from "next-redux-wrapper";
import { RootState } from "./rootReducer";

interface IState {
  searchTags: Tag[];
  newTags: NewTag[];
  selectTags: NewTag[];
}

const initialState: IState = {
  searchTags: [],
  newTags: [],
  selectTags: [],
};

export const fetchTags = createAsyncThunk(
  "tag/fetchTags",
  async (query: FetchTagsQuery) => {
    const response = await TagApi.fetchTags(query);
    return response;
  }
);

export const fetchCreateTag = createAsyncThunk(
  "tag/fetchCreateTag",
  async (payload: FetchCreateTagsPayload, thunkApi) => {
    const response = await TagApi.fetchCreateTag(payload);
    const { tag } = thunkApi.getState() as RootState;
    return [...tag.newTags, response];
  }
);

const hydrate = createAction<RootState>(HYDRATE);

const tagSlice = createSlice({
  name: "tag",
  initialState,
  reducers: {
    setSelectTag: (state, action) => {
      state.selectTags = [...state.selectTags, action.payload];
    },
    setSelectTagDelete: (state, action) => {
      state.selectTags = action.payload;
    },
    setSearchTagsDelete: (state) => {
      state.searchTags = [];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(hydrate, (state, action) => {
      return {
        ...state,
        ...action.payload["tag"],
      };
    });
    builder.addCase(fetchTags.fulfilled, (state, action) => {
      state.searchTags = action.payload;
    });
    builder.addCase(fetchCreateTag.fulfilled, (state, action) => {
      state.newTags = action.payload;
    });
  },
});

export const tagState = (state: RootState) => state.tag;
export const {
  setSelectTag,
  setSelectTagDelete,
  setSearchTagsDelete,
} = tagSlice.actions;
export default tagSlice.reducer;
