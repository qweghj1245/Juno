import { createAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import PostApi, {
  CommentsResults,
  FetchCreatePost,
  FetchPostsQuery,
  PostsResults,
  PostTagsMap,
  RelationPost,
  SinglePost,
} from "api/PostApi";
import { HYDRATE } from "next-redux-wrapper";
import { RootState } from "./rootReducer";

interface IState {
  isCreated: boolean;
  postsResult: PostsResults;
  postTags: PostTagsMap;
  post: SinglePost | null;
  commentsResult: CommentsResults;
  relationPosts: RelationPost[];
  categoryPostMap: { [categoryId: number]: PostsResults };
  positiveNegative: {
    positiveCount: number;
    negativeCount: number;
  };
  positiveNegativeStatus: {
    postPositive: boolean;
    postNegative: boolean;
  };
}

const initialState: IState = {
  isCreated: false,
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
  categoryPostMap: {},
  positiveNegative: {
    positiveCount: 0,
    negativeCount: 0,
  },
  positiveNegativeStatus: {
    postPositive: false,
    postNegative: false,
  },
};

export const fetchPosts = createAsyncThunk(
  "post/fetchPosts",
  async (payload?: FetchPostsQuery, thunkApi) => {
    const response = await PostApi.fetchPosts(payload);
    const postIds = response.posts.map((item) => item.id);
    await thunkApi.dispatch(fetchPostTags(postIds));
    return response;
  }
);

export const fetchCategoryPosts = createAsyncThunk(
  "post/fetchCategoryPosts",
  async (payload: FetchPostsQuery, thunkApi) => {
    const response = await PostApi.fetchPosts(payload);
    const postIds = response.posts.map((item) => item.id);
    await thunkApi.dispatch(fetchPostTags(postIds));

    const { post } = thunkApi.getState() as RootState;
    return {
      ...post.categoryPostMap,
      [payload!.categoryId as number]: response,
    };
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

export const fetchCreatePost = createAsyncThunk(
  "post/fetchCreatePost",
  async (payload: FetchCreatePost) => {
    await PostApi.fetchCreatePost(payload);
    return "Success";
  }
);

export const fetchAddPostPositive = createAsyncThunk(
  "post/fetchAddPostPositive",
  async (postId: number) => {
    await PostApi.fetchAddPostPositive(postId);
    return "Success";
  }
);

export const fetchRemovePostPositive = createAsyncThunk(
  "post/fetchRemovePostPositive",
  async (postId: number) => {
    await PostApi.fetchRemovePostPositive(postId);
    return "Success";
  }
);

export const fetchAddPostNegative = createAsyncThunk(
  "post/fetchAddPostNegative",
  async (postId: number) => {
    await PostApi.fetchAddPostNegative(postId);
    return "Success";
  }
);

export const fetchRemovePostNegative = createAsyncThunk(
  "post/fetchRemovePostNegative",
  async (postId: number) => {
    await PostApi.fetchRemovePostNegative(postId);
    return "Success";
  }
);

export const fetchPositiveNegative = createAsyncThunk(
  "post/fetchPositiveNegative",
  async (postId: number) => {
    const response = await PostApi.fetchPositiveNegative(postId);
    return response;
  }
);

export const fetchPositiveNegativeStatus = createAsyncThunk(
  "post/fetchPositiveNegativeStatus",
  async (postId: number) => {
    const response = await PostApi.fetchPositiveNegativeStatus(postId);
    return response;
  }
);

const hydrate = createAction<RootState>(HYDRATE);

const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    setIsNotCreate: (state) => {
      state.isCreated = false;
    },
  },
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
    builder.addCase(fetchCategoryPosts.fulfilled, (state, action) => {
      state.categoryPostMap = action.payload;
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
    builder.addCase(fetchCreatePost.fulfilled, (state) => {
      state.isCreated = true;
    });
    builder.addCase(fetchPositiveNegative.fulfilled, (state, action) => {
      state.positiveNegative = action.payload;
    });
    builder.addCase(fetchPositiveNegativeStatus.fulfilled, (state, action) => {
      state.positiveNegativeStatus = action.payload;
    });
  },
});

export const postState = (state: RootState) => state.post;
export const { setIsNotCreate } = postSlice.actions;
export default postSlice.reducer;
