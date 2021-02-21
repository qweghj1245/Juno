import { convertToCamelCase } from "utils/convertToCamelCase";
import CoreApi from "./CoreApi";

const apiClient = new CoreApi({ apiVersion: "v1" });

export enum UserRank {
  ADMIN = 100,
  NORMAL = 200,
}

export enum UserSourceNumber {
  GOOGLE = 1,
  FACEBOOK = 2,
}

export interface UserProfile {
  id: number;
  email: string;
  name: string;
  description: string;
  avator: string;
  source: UserSourceNumber;
  rank: UserRank;
  created_at: number;
  update_at: number;
  is_active: boolean;
  points_id: number;
  quota: number;
}

export interface UserAPI {
  fetchGoogleSignIn: (
    idToken: string
  ) => Promise<{ user: UserProfile; token: string }>;
}

const UserApi: UserAPI = {
  fetchGoogleSignIn: async (idToken) => {
    const response = await apiClient.post("/auth/google_sign_in/", {
      token: idToken,
    });
    return convertToCamelCase(response.data.result);
  },
};

export default UserApi;
