import { convertToCamelCase } from "utils/convertToCamelCase";
import CoreApi from "./CoreApi";

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
  fetchMemberInfo: (requestHeader?: any) => Promise<MemberProfile>;
}

const apiClient = new CoreApi({ apiVersion: "" });

const MemberApi: MemberAPI = {
  fetchMemberInfo: async (requestHeader) => {
    const response = await apiClient.get("/member/", {}, requestHeader);
    return convertToCamelCase(response.data.result);
  },
};

export default MemberApi;
