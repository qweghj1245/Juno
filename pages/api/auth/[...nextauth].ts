import { NextApiRequest, NextApiResponse } from "next";
import NextAuth from "next-auth";
import Providers from "next-auth/providers";

const providers = [
  Providers.Google({
    clientId: process.env.GOOGLE_ID!,
    clientSecret: process.env.GOOGLE_SECRET!,
  }),
];

const callbacks: any = {};

callbacks.signIn = async function signIn(user: any, account: any) {
  if (account.provider === "google") {
    user.idToken = account.idToken;
    return true;
  }

  return false;
};

callbacks.jwt = async function jwt(token: any, user: any, account: any) {
  if (account?.accessToken) {
    token.accessToken = account.accessToken;
    token.idToken = account.idToken;
  }
  return token;
};

callbacks.session = async function session(session: any, token: any) {
  session.accessToken = token.accessToken;
  session.idToken = token.idToken;
  return session;
};

const options = {
  providers,
  callbacks,
};

export default (req: NextApiRequest, res: NextApiResponse) =>
  NextAuth(req, res, options);
