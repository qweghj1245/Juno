import {
  convertToCamelCase,
  convertToCamelCaseForArray,
} from "utils/convertToCamelCase";
import CoreApi from "./CoreApi";

export enum QueryStatus {
  HOT = "HOT",
  NEW = "NEW",
}

export interface FetchPostsQuery {
  page?: number;
  search?: string;
  query?: QueryStatus;
  categoryId?: number;
}

export interface GroupPost {
  id: number;
  title: string;
  content: string;
  isActive: boolean;
  createdAt: number;
  updateAt: number;
  userId: number;
  categoryId: number;
}

export interface PostTags {
  postId: number;
  tagId: number;
  name: string;
}

export interface PostsResults {
  count: number;
  posts: GroupPost[];
}

export interface PostTagsMap {
  [postId: number]: PostTags[];
}

export interface SinglePost {
  id: number;
  title: string;
  content: string;
  isActive: boolean;
  createdAt: number;
  updateAt: number;
  isCollect: boolean;
  collectId: number | null;
  author: string;
  authorAvator: string;
  categoryName: string;
}

export interface Comment {
  id: number;
  content: string;
  isActive: boolean;
  updateAt: number;
  createdAt: number;
  postId: number;
  userInfo: {
    email: string;
    name: string;
    description: string;
    avator: string;
    source: number;
    rank: number;
  };
}

export interface CommentsResults {
  count: number;
  comments: Comment[];
}

export interface RelationPost {
  id: number;
  title: string;
  isActive: boolean;
  createdAt: number;
  userId: number;
  categoryId: number;
}

export interface FetchCreatePost {
  title: string;
  content: string;
  categoryId: number;
  tags: number[];
}

export interface FetchPositiveNegative {
  positiveCount: number;
  negativeCount: number;
}

export interface FetchPositiveNegativeStatus {
  postPositive: boolean;
  postNegative: boolean;
}

const apiClient = new CoreApi({ apiVersion: "v1" });

export interface PostAPI {
  fetchPosts: (query?: FetchPostsQuery) => Promise<PostsResults>;
  fetchPostTags: (postIds: number[]) => Promise<PostTagsMap>;
  fetchPost: (postId: number) => Promise<SinglePost>;
  fetchComments: (postId: number) => Promise<CommentsResults>;
  fetchRelationPosts: (postId: number) => Promise<RelationPost[]>;
  fetchCreatePost: (payload: FetchCreatePost) => Promise<void>;
  fetchAddPostPositive: (postId: number) => Promise<void>;
  fetchRemovePostPositive: (postId: number) => Promise<void>;
  fetchAddPostNegative: (postId: number) => Promise<void>;
  fetchRemovePostNegative: (postId: number) => Promise<void>;
  fetchPositiveNegative: (postId: number) => Promise<FetchPositiveNegative>;
  fetchPositiveNegativeStatus: (
    postId: number
  ) => Promise<FetchPositiveNegativeStatus>;
}

const PostApi: PostAPI = {
  fetchPosts: async (query) => {
    const response = await apiClient.get("/post/", {
      page: query?.page,
      search: query?.search,
      query: query?.query,
      category_id: query?.categoryId,
    });
    return convertToCamelCase(response.data.result);
  },
  fetchPostTags: async (postIds) => {
    const response = await apiClient.get("/post/tags/", {
      post_ids: postIds.toString(),
    });

    const convertRes: PostTags[] = convertToCamelCaseForArray(
      response.data.result
    );

    let store: { [postId: number]: PostTags[] } = {};
    const result = convertRes.reduce((accumulate, postTag) => {
      if (!store[postTag.postId]) {
        store[postTag.postId] = [postTag];
      } else {
        store[postTag.postId] = [...store[postTag.postId], postTag];
      }
      return { ...accumulate, ...store };
    }, {});

    return result;
  },
  fetchPost: async (postId) => {
    const response = await apiClient.get(`/post/${postId}/`);
    return convertToCamelCase(response.data.result);
  },
  fetchComments: async (postId) => {
    const response = await apiClient.get("/comment/", {
      post_id: postId,
    });
    return convertToCamelCase(response.data.result);
  },
  fetchRelationPosts: async (postId) => {
    const response = await apiClient.get(`/post/relation/${postId}/`);
    return convertToCamelCase(response.data.result);
  },
  fetchCreatePost: async (payload) => {
    const actionPayload = {
      title: payload.title,
      content: payload.content,
      category_id: payload.categoryId,
      tags: payload.tags,
    };
    await apiClient.post("/post/", actionPayload);
  },
  fetchAddPostPositive: async (postId) => {
    await apiClient.post(`/post-positive/${postId}/`, {});
  },
  fetchRemovePostPositive: async (postId) => {
    await apiClient.delete(`/post-positive/`, postId);
  },
  fetchAddPostNegative: async (postId) => {
    await apiClient.post(`/post-negative/${postId}/`, {});
  },
  fetchRemovePostNegative: async (postId) => {
    await apiClient.delete(`/post-negative/`, postId);
  },
  fetchPositiveNegative: async (postId) => {
    const response = await apiClient.get(`/positive-negative/${postId}/`);
    return {
      positiveCount: parseInt(response.data.result.positive_count, 10),
      negativeCount: parseInt(response.data.result.negative_count, 10),
    };
  },
  fetchPositiveNegativeStatus: async (postId) => {
    const response = await apiClient.get(
      `/positive-negative-status/${postId}/`
    );
    return convertToCamelCase(response.data.result);
  },
};

export default PostApi;
