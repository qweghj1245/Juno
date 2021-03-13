import { convertToCamelCase } from "utils/convertToCamelCase";
import CoreApi from "./CoreApi";

export interface FetchTagsQuery {
  tagName: string;
}

export interface FetchCreateTagsPayload {
  name: string;
}

export interface Tag {
  id: number;
  name: string;
  count: number;
}

export interface NewTag {
  id: number;
  name: string;
}

const apiClient = new CoreApi({ apiVersion: "v1" });

export interface TagAPI {
  fetchTags: (query: FetchTagsQuery) => Promise<Tag[]>;
  fetchCreateTag: (payload: FetchCreateTagsPayload) => Promise<NewTag>;
}

const TagApi: TagAPI = {
  fetchTags: async (query) => {
    const response = await apiClient.get("/tag/", {
      tag_name: query.tagName,
    });
    return convertToCamelCase(response.data.result);
  },
  fetchCreateTag: async (payload) => {
    const response = await apiClient.post("/tag/", {
      name: payload.name,
    });
    return convertToCamelCase(response.data.result);
  },
};

export default TagApi;
