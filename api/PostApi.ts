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

export interface Post {
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
  posts: Post[];
}

export interface PostTagsMap {
  [postId: number]: PostTags[];
}

const apiClient = new CoreApi({ apiVersion: "v1" });

export interface PostAPI {
  fetchPosts: (payload?: FetchPostsQuery) => Promise<PostsResults>;
  fetchPostTags: (postIds: number[]) => Promise<PostTagsMap>;
}

const PostApi: PostAPI = {
  fetchPosts: async (payload) => {
    const response = await apiClient.get("/post", {
      page: payload?.page,
      search: payload?.search,
      query: payload?.query,
    });
    return convertToCamelCase(response.data.result);
  },
  fetchPostTags: async (postIds) => {
    const response = await apiClient.get("/post/tags", {
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
};

export default PostApi;
