import { convertToCamelCase } from "utils/convertToCamelCase";
import CoreApi from "./CoreApi";

const apiClient = new CoreApi({ apiVersion: "v1" });

export enum MemberRank {
  ADMIN = 100,
  NORMAL = 200,
}

export enum MemberSourceNumber {
  GOOGLE = 1,
  FACEBOOK = 2,
}

export interface MemberProfile {
  id: number;
  email: string;
  name: string;
  description: string;
  avator: string;
  source: MemberSourceNumber;
  rank: MemberRank;
  created_at: number;
  update_at: number;
  is_active: boolean;
  points_id: number;
  quota: number;
}

export interface MemberAPI {
  fetchGoogleSignIn: (
    idToken: string
  ) => Promise<{ member: MemberProfile; token: string }>;
}

const MemberApi: MemberAPI = {
  fetchGoogleSignIn: async (idToken) => {
    const response = await apiClient.post("/auth/google_sign_in/", {
      token: idToken,
    });
    return convertToCamelCase(response.data.result);
  },
};

export default MemberApi;
