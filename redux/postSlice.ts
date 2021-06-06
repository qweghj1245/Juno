import CollectApi from "@api/CollectApi";
import { createAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import PostApi, {
  CommentsResults,
  FetchCreateComment,
  FetchCreatePost,
  FetchPositiveNegativeStatusPayload,
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
  isStatusDone: boolean;
  isCountDone: boolean;
  currentCategory: number | null;
  isInfiniteOver: boolean;
  isFetching: boolean;
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
  isStatusDone: false,
  isCountDone: false,
  currentCategory: null,
  isInfiniteOver: false,
  isFetching: false,
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

export const fetchInfinitePosts = createAsyncThunk(
  "post/fetchInfinitePosts",
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

export const fetchInfiniteCategoryPosts = createAsyncThunk(
  "post/fetchInfiniteCategoryPosts",
  async (payload?: FetchPostsQuery, thunkApi) => {
    const response = await PostApi.fetchPosts(payload);
    const postIds = response.posts.map((item) => item.id);
    await thunkApi.dispatch(fetchPostTags(postIds));

    return {
      response,
      categoryId: payload?.categoryId as number,
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

export const fetchCreateComment = createAsyncThunk(
  "post/fetchCreateComment",
  async (payload: FetchCreateComment, thunkApi) => {
    await PostApi.fetchCreateComment(payload);
    await thunkApi.dispatch(fetchComments(payload.postId));
    return "Success";
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

export const fetchPatchPositiveNegativeStatus = createAsyncThunk(
  "post/fetchPatchPositiveNegativeStatus",
  async (
    config: FetchPositiveNegativeStatusPayload & {
      postId: number;
    }
  ) => {
    const response = await PostApi.fetchPatchPositiveNegativeStatus(
      config.postId,
      {
        postPositive: config.postPositive,
        postNegative: config.postNegative,
      }
    );
    return response;
  }
);

export const fetchAddCollect = createAsyncThunk(
  "post/fetchAddCollect",
  async (postId: number, thunkApi) => {
    await CollectApi.fetchAddCollect(postId);
    const { post } = thunkApi.getState() as RootState;
    await thunkApi.dispatch(fetchPost(post.post!.id));
    return "Success";
  }
);

export const fetchDeleteCollect = createAsyncThunk(
  "post/fetchDeleteCollect",
  async (collectId: number, thunkApi) => {
    await CollectApi.fetchDeleteCollect(collectId);
    const { post } = thunkApi.getState() as RootState;
    await thunkApi.dispatch(fetchPost(post.post!.id));
    return "Success";
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
    setCurrentCategory: (state, action) => {
      state.currentCategory = action.payload;
    },
    setIsNotInfiniteOver: (state) => {
      state.isInfiniteOver = false;
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
    builder.addCase(fetchInfinitePosts.pending, (state) => {
      state.isFetching = true;
    });
    builder.addCase(fetchInfinitePosts.fulfilled, (state, action) => {
      if (action.payload.posts.length < 10) {
        state.isInfiniteOver = true;
      }
      state.isFetching = false;
      state.postsResult = {
        ...state.postsResult,
        posts: state.postsResult.posts.concat(action.payload.posts),
      };
    });
    builder.addCase(fetchInfinitePosts.rejected, (state) => {
      state.isFetching = false;
    });
    builder.addCase(fetchCategoryPosts.fulfilled, (state, action) => {
      state.categoryPostMap = action.payload;
    });
    builder.addCase(fetchInfiniteCategoryPosts.pending, (state) => {
      state.isFetching = true;
    });
    builder.addCase(fetchInfiniteCategoryPosts.fulfilled, (state, action) => {
      const { response, categoryId } = action.payload;
      const posts = state.categoryPostMap[categoryId].posts.concat(
        response.posts
      );

      if (response.posts.length < 10) {
        state.isInfiniteOver = true;
      }
      state.isFetching = false;
      state.categoryPostMap = {
        ...state.categoryPostMap,
        [categoryId]: {
          ...response,
          posts,
        },
      };
    });
    builder.addCase(fetchInfiniteCategoryPosts.rejected, (state) => {
      state.isFetching = false;
    });
    builder.addCase(fetchPostTags.fulfilled, (state, action) => {
      state.postTags = { ...state.postTags, ...action.payload };
    });
    builder.addCase(fetchPost.fulfilled, (state, action) => {
      state.post = action.payload;
      state.isStatusDone = false;
      state.isCountDone = false;
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
      state.isStatusDone = true;
      state.isCountDone = true;
    });
  },
});

export const postState = (state: RootState) => state.post;
export const {
  setIsNotCreate,
  setCurrentCategory,
  setIsNotInfiniteOver,
} = postSlice.actions;
export default postSlice.reducer;
