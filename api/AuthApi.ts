import { convertToCamelCase } from "utils/convertToCamelCase";
import CoreApi from "./CoreApi";
import { MemberProfile } from "./MemberApi";

export interface AuthAPI {
  fetchGoogleSignIn: (idToken: string) => Promise<MemberProfile>;
}

const apiClient = new CoreApi({ apiVersion: "v1" });

const AuthApi: AuthAPI = {
  fetchGoogleSignIn: async (idToken) => {
    const response = await apiClient.post("/auth/google_sign_in/", {
      token: idToken,
    });
    return convertToCamelCase(response.data.result);
  },
};

export default AuthApi;
