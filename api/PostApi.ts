import CoreApi from "./CoreApi";

const apiClient = new CoreApi({ apiVersion: "v1" });

export interface PostAPI {
  fetchPosts: () => Promise<any>;
}

const PostApi: PostAPI = {
  fetchPosts: async () => {
    const response = await apiClient.get("/post");
    return response;
  },
};

export default PostApi;
