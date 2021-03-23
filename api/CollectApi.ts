import CoreApi from "./CoreApi";

const apiClient = new CoreApi({ apiVersion: "v1" });

export interface CollectAPI {
  fetchAddCollect: (postId: number) => Promise<void>;
  fetchDeleteCollect: (collectId: number) => Promise<void>;
}

const CollectApi: CollectAPI = {
  fetchAddCollect: async (postId) => {
    await apiClient.post("/collect/", {
      post_id: postId,
    });
  },
  fetchDeleteCollect: async (collectId) => {
    await apiClient.delete("/collect", collectId);
  },
};

export default CollectApi;
