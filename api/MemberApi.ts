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
  avatorAlt: string;
  source: MemberSourceNumber;
  rank: MemberRank;
  createdAt: number;
  updateAt: number;
  isActive: boolean;
  pointsId: number;
  quota: number;
}

export interface MemberAggregate {
  quota: string | null;
  publishPostCount: string;
  bePraised: string;
}

export interface MemberAPI {
  fetchMemberInfo: (requestHeader?: any) => Promise<MemberProfile>;
  fetchMemberAggregate: () => Promise<MemberAggregate>;
}

const apiClient = new CoreApi({ apiVersion: "" });

const MemberApi: MemberAPI = {
  fetchMemberInfo: async (requestHeader) => {
    const response = await apiClient.get("/member/", {}, requestHeader);
    return convertToCamelCase(response.data.result);
  },
  fetchMemberAggregate: async () => {
    const response = await apiClient.get("/member/aggregate/");
    return convertToCamelCase(response.data.result);
  },
};

export default MemberApi;
