import PostApi, { GroupPost, PostTagsMap } from "@api/PostApi";
import { createAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import AuthApi from "api/AuthApi";
import MemberApi, {
  MemberAggregate,
  MemberProfile,
  PatchMemberPayload,
} from "api/MemberApi";
import { HYDRATE } from "next-redux-wrapper";
import { RootState } from "./rootReducer";

interface IState {
  memberProile: MemberProfile | null;
  memberAggregate: MemberAggregate | null;
  memberPost: GroupPost[];
  memberCollects: GroupPost[];
  postTags: PostTagsMap;
  isPatchDone: boolean;
}

const initialState: IState = {
  memberProile: null,
  memberAggregate: null,
  memberPost: [],
  memberCollects: [],
  postTags: {},
  isPatchDone: false,
};

export const fetchGoogleSignIn = createAsyncThunk(
  "member/fetchGoogleSignIn",
  async (idToken: string) => {
    const response = await AuthApi.fetchGoogleSignIn(idToken);
    return response;
  }
);

export const fetchMemberInfo = createAsyncThunk(
  "member/fetchMemberInfo",
  async (config: { isServer: boolean }, thunkApi) => {
    if (config.isServer) {
      const { appConfig } = thunkApi.getState() as RootState;
      const response = await MemberApi.fetchMemberInfo(appConfig.requestHeader);
      return response;
    }

    const response = await MemberApi.fetchMemberInfo();
    return response;
  }
);

export const fetchMemberAggregate = createAsyncThunk(
  "member/fetchMemberAggregate",
  async () => {
    const response = await MemberApi.fetchMemberAggregate();
    return response;
  }
);

export const fetchMemberPost = createAsyncThunk(
  "member/fetchMemberPost",
  async (_: any, thunkApi) => {
    const response = await MemberApi.fetchMemberPost();
    const postIds = response.map((item) => item.id);
    await thunkApi.dispatch(fetchPostTags(postIds));
    return response;
  }
);

export const fetchMemberCollects = createAsyncThunk(
  "member/fetchMemberCollects",
  async (_: any, thunkApi) => {
    const response = await MemberApi.fetchMemberCollects();
    const postIds = response.map((item) => item.id);
    await thunkApi.dispatch(fetchPostTags(postIds));
    return response;
  }
);

export const fetchPatchMember = createAsyncThunk(
  "member/fetchPatchMember",
  async (payload: PatchMemberPayload, thunkApi) => {
    await MemberApi.fetchPatchMember(payload);
    await thunkApi.dispatch(fetchMemberInfo({ isServer: false }));
    return "Success";
  }
);

export const fetchPostTags = createAsyncThunk(
  "member/fetchPostTags",
  async (postIds: number[]) => {
    const response = await PostApi.fetchPostTags(postIds);
    return response;
  }
);

const hydrate = createAction<RootState>(HYDRATE);

const memberSlice = createSlice({
  name: "member",
  initialState,
  reducers: {
    setResetIsPatch: (state) => {
      state.isPatchDone = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(hydrate, (state, action) => {
      return {
        ...state,
        ...action.payload["member"],
      };
    });
    builder.addCase(fetchGoogleSignIn.fulfilled, (state, action) => {
      state.memberProile = action.payload;
    });
    builder.addCase(fetchMemberInfo.fulfilled, (state, action) => {
      state.memberProile = action.payload;
    });
    builder.addCase(fetchMemberAggregate.fulfilled, (state, action) => {
      state.memberAggregate = action.payload;
    });
    builder.addCase(fetchMemberPost.fulfilled, (state, action) => {
      state.memberPost = action.payload;
    });
    builder.addCase(fetchMemberCollects.fulfilled, (state, action) => {
      state.memberCollects = action.payload;
    });
    builder.addCase(fetchPostTags.fulfilled, (state, action) => {
      state.postTags = { ...state.postTags, ...action.payload };
    });
    builder.addCase(fetchPatchMember.fulfilled, (state) => {
      state.isPatchDone = true;
    });
  },
});

export const memberState = (state: RootState) => state.member;
export const { setResetIsPatch } = memberSlice.actions;
export default memberSlice.reducer;
