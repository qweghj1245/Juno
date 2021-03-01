import { fetchGoogleSignIn, fetchMemberInfo } from "@redux/memberSlice";
import { RootState } from "@redux/rootReducer";
import { Row } from "@styles/flexStyle";
import fontStyle from "@styles/fontStyle";
import sizeStyle from "@styles/sizeStyle";
import getConfig from "next/config";
import React, { useEffect, useState } from "react";
import { GoogleLogin } from "react-google-login";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
const { publicRuntimeConfig } = getConfig();

enum LoginType {
  FACEBOOK = "Facebook",
  GOOGLE = "Google",
}

const Wrapper = styled.div`
  padding: 28px 16px;
`;

const LoginButton = styled(Row)<{ type: LoginType }>`
  justify-content: center;
  border-radius: 28px;
  margin-bottom: 16px;
  padding: 18px 0;
  background: ${({ type }) => {
    switch (type) {
      case LoginType.FACEBOOK:
        return "#3A5CA9";
      case LoginType.GOOGLE:
        return "#397AF2";
      default:
        return "";
    }
  }};
  box-shadow: ${({ type }) => {
    switch (type) {
      case LoginType.FACEBOOK:
        return "0px 3px 6px #3A5CA94D";
      case LoginType.GOOGLE:
        return "0px 3px 6px #397AF24D";
      default:
        return "";
    }
  }};
`;

const CustomImage = styled.img`
  width: 20px;
  height: 20px;
  ${sizeStyle("20px", "20px")};
  object-fit: contain;
`;

const Text = styled.span`
  margin-left: 16px;
  color: ${({ theme: { color } }) => color.white};
  ${fontStyle("16px", "22px", "bold")};
`;

export default function Login() {
  const dispatch = useDispatch();
  const member = useSelector((state: RootState) => state.member);

  const [init, setInit] = useState(false);

  const responseSuccess = (googleUser: any) => {
    const id_token = googleUser.getAuthResponse().id_token;
    dispatch(fetchGoogleSignIn(id_token));
  };

  const failure = () => {
    console.log("fail");
  };

  useEffect(() => {
    console.log(member);
    if (member.memberProile && !init) {
      dispatch(fetchMemberInfo());
      setInit(true);
    }
  }, [member, dispatch]);

  return (
    <Wrapper>
      <GoogleLogin
        clientId={publicRuntimeConfig.NEXT_GOOGLE_SIGN_IN}
        buttonText="Sign in with Google"
        onSuccess={responseSuccess}
        onFailure={failure}
        cookiePolicy={"single_host_origin"}
        render={(renderProps) => (
          <LoginButton type={LoginType.GOOGLE} onClick={renderProps.onClick}>
            <CustomImage
              src="/static/logo_google_white@3x.png"
              alt="google sign in"
            />
            <Text>Google 登入</Text>
          </LoginButton>
        )}
      />
      <LoginButton type={LoginType.FACEBOOK}>
        <CustomImage
          src="/static/logo_facebook_white@3x.png"
          alt="facebook sign in"
        />
        <Text>Facebook 登入</Text>
      </LoginButton>
    </Wrapper>
  );
}
