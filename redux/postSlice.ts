import { createAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import PostApi, {
  CommentsResults,
  FetchPostsQuery,
  PostsResults,
  PostTagsMap,
  RelationPost,
  SinglePost,
} from "api/PostApi";
import { HYDRATE } from "next-redux-wrapper";
import { RootState } from "./rootReducer";

interface IState {
  postsResult: PostsResults;
  postTags: PostTagsMap;
  post: SinglePost | null;
  commentsResult: CommentsResults;
  relationPosts: RelationPost[];
}

const initialState: IState = {
  postsResult: {
    count: 0,
    posts: [],
  },
  postTags: {},
  post: null,
  commentsResult: {
    count: 0,
    comments: [],
  },
  relationPosts: [],
};

export const fetchPosts = createAsyncThunk(
  "post/fetchPosts",
  async (payload?: FetchPostsQuery) => {
    const response = await PostApi.fetchPosts(payload);
    return response;
  }
);

export const fetchPostTags = createAsyncThunk(
  "post/fetchPostTags",
  async (postIds: number[]) => {
    const response = await PostApi.fetchPostTags(postIds);
    return response;
  }
);

export const fetchPost = createAsyncThunk(
  "post/fetchPost",
  async (postId: number) => {
    const response = await PostApi.fetchPost(postId);
    return response;
  }
);

export const fetchComments = createAsyncThunk(
  "post/fetchComments",
  async (postId: number) => {
    const response = await PostApi.fetchComments(postId);
    return response;
  }
);

export const fetchRelationPosts = createAsyncThunk(
  "post/fetchRelationPosts",
  async (postId: number) => {
    const response = await PostApi.fetchRelationPosts(postId);
    return response;
  }
);

const hydrate = createAction<RootState>(HYDRATE);

const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(hydrate, (state, action) => {
      return {
        ...state,
        ...action.payload["post"],
      };
    });
    builder.addCase(fetchPosts.fulfilled, (state, action) => {
      state.postsResult = action.payload;
    });
    builder.addCase(fetchPostTags.fulfilled, (state, action) => {
      state.postTags = action.payload;
    });
    builder.addCase(fetchPost.fulfilled, (state, action) => {
      state.post = action.payload;
    });
    builder.addCase(fetchComments.fulfilled, (state, action) => {
      state.commentsResult = action.payload;
    });
    builder.addCase(fetchRelationPosts.fulfilled, (state, action) => {
      state.relationPosts = action.payload;
    });
  },
});

export const postState = (state: RootState) => state.post;
export default postSlice.reducer;
