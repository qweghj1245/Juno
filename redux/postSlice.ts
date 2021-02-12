import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import PostApi, { PostsResults, PostTagsMap } from "api/PostApi";

interface IState {
  postsResult: PostsResults;
  postTags: PostTagsMap;
}

const initialState: IState = {
  postsResult: {
    count: 0,
    posts: [],
  },
  postTags: {},
};

export const fetchPosts = createAsyncThunk("post/fetchPosts", async () => {
  const response = await PostApi.fetchPosts();
  return response;
});

export const fetchPostTags = createAsyncThunk(
  "post/fetchPostTags",
  async (postIds: number[]) => {
    const response = await PostApi.fetchPostTags(postIds);
    return response;
  }
);

const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchPosts.fulfilled, (state, action) => {
      state.postsResult = action.payload;
    });
    builder.addCase(fetchPostTags.fulfilled, (state, action) => {
      state.postTags = action.payload;
    });
  },
});

export default postSlice.reducer;
