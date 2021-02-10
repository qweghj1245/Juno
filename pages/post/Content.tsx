import { Row } from "@styles/flexStyle";
import fontStyle from "@styles/fontStyle";
import React from "react";
import styled from "styled-components";

const Wrapper = styled.main`
  padding: 12px 16px;
  border-bottom: solid 1px ${({ theme: { color } }) => color.grey100};
`;

const Category = styled.h2`
  margin-right: 26px;
  color: ${({ theme: { color } }) => color.primary};
  ${fontStyle("18px", "25px", "500")};
`;

const Tag = styled.h3`
  padding: 4px 8px;
  margin-right: 4px;
  border-radius: 14px;
  border: solid 1px #008c9f4d;
  ${fontStyle("14px", "20px")};
`;

const PostTitle = styled.h1`
  margin: 12px 0;
  ${fontStyle("24px", "33px", "bold")};
`;

const Paragraph = styled.p`
  ${fontStyle("16px", "22px")};
`;

export default function Content() {
  return (
    <Wrapper>
      <Row>
        <Category>分類</Category>
        <Tag>省錢</Tag>
        <Tag>麥當勞</Tag>
        <Tag>分享</Tag>
      </Row>
      <PostTitle>實用麥當勞省錢技巧</PostTitle>
      <Paragraph>內文補充字數補充字數</Paragraph>
    </Wrapper>
  );
}
