import CustomImage from "@components/CustomImage";
import { Row } from "@styles/flexStyle";
import fontStyle from "@styles/fontStyle";
import sizeStyle from "@styles/sizeStyle";
import React from "react";
import styled from "styled-components";

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

const Icon = styled.img`
  ${sizeStyle("20px", "20px")};
`;

const Text = styled.span`
  margin-left: 16px;
  color: ${({ theme: { color } }) => color.white};
  ${fontStyle("16px", "22px", "bold")};
`;

export default function Login() {
  return (
    <Wrapper>
      <LoginButton type={LoginType.GOOGLE}>
        <CustomImage
          url="/static/assets/icons/logo_google_white@3x.png"
          width={20}
          height={20}
          alt=""
        />
        <Text>Google 登入</Text>
      </LoginButton>
      <LoginButton type={LoginType.FACEBOOK}>
        <CustomImage
          url="/static/assets/icons/logo_facebook_white@3x.png"
          width={20}
          height={20}
          alt=""
        />
        <Text>Facebook 登入</Text>
      </LoginButton>
    </Wrapper>
  );
}
