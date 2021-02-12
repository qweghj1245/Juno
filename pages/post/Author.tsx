import { Row } from "@styles/flexStyle";
import fontStyle from "@styles/fontStyle";
import React from "react";
import styled from "styled-components";

const Wrapper = styled(Row)`
  padding: 12px 16px;
  border-bottom: solid 1px ${({ theme: { color } }) => color.grey100};
`;

const AuthorPhoto = styled.img`
  width: 48px;
  border-radius: 50%;
  margin-right: 8px;
`;

const AuthorName = styled.h3`
  margin-bottom: 4px;
  ${fontStyle("15px", "21px", "bold")};
`;

const CreateTime = styled.h4`
  color: ${({ theme: { color } }) => color.grey500};
  ${fontStyle("12px", "17px")};
`;

export default function Author() {
  return (
    <Wrapper>
      <AuthorPhoto />
      <div>
        <AuthorName>作者是寶寶</AuthorName>
        <CreateTime>2020/01/23 00:00</CreateTime>
      </div>
    </Wrapper>
  );
}
