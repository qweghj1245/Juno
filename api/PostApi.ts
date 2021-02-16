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

const apiClient = new CoreApi({ apiVersion: "v1" });

export interface PostAPI {
  fetchPosts: (payload?: FetchPostsQuery) => Promise<PostsResults>;
  fetchPostTags: (postIds: number[]) => Promise<PostTagsMap>;
  fetchPost: (postId: number) => Promise<SinglePost>;
  fetchComments: (postId: number) => Promise<CommentsResults>;
  fetchRelationPosts: (postId: number) => Promise<RelationPost[]>;
}

const PostApi: PostAPI = {
  fetchPosts: async (payload) => {
    const response = await apiClient.get("/post/", {
      page: payload?.page,
      search: payload?.search,
      query: payload?.query,
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
};

export default PostApi;
