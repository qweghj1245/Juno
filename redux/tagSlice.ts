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
  tagInfo: Tag | null;
}

const initialState: IState = {
  searchTags: [],
  newTags: [],
  selectTags: [],
  tagInfo: null,
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

export const fetchTag = createAsyncThunk(
  "tag/fetchTag",
  async (tagId: number) => {
    const response = await TagApi.fetchTag(tagId);
    return response;
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
    builder.addCase(fetchTag.fulfilled, (state, action) => {
      state.tagInfo = action.payload;
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
