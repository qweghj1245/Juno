import { convertToCamelCase } from "utils/convertToCamelCase";
import CoreApi from "./CoreApi";

export interface Category {
  id: number;
  name: string;
  isActive: boolean;
  description: string;
  image: string;
}

const apiClient = new CoreApi({ apiVersion: "v1" });

export interface CategoryAPI {
  fetchCategories: () => Promise<Category[]>;
}

const CategoryApi: CategoryAPI = {
  fetchCategories: async () => {
    const response = await apiClient.get("/category/");
    return convertToCamelCase(response.data.result);
  },
};

export default CategoryApi;
