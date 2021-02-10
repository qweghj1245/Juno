import PostCard from "@components/PostCard";
import { Row } from "@styles/flexStyle";
import fontStyle from "@styles/fontStyle";
import React from "react";
import styled from "styled-components";

const Wrapper = styled(Row)`
  flex-direction: column;
  padding: 20px 0;
  justify-content: center;
`;

const TagTitle = styled.h1`
  margin-bottom: 8px;
  ${fontStyle("24px", "33px", "bold")};
`;

const TagPostCount = styled.h5`
  margin-bottom: 16px;
  color: ${({ theme: { color } }) => color.grey500};
  ${fontStyle("12px", "17px")};
`;

const Follow = styled.button`
  padding: 8px 24px;
  border-radius: 17px;
  box-shadow: 0px 3px 12px ${({ theme: { color } }) => color.grey100};
  ${fontStyle("12px", "17px", "bold")};
`;

const MentionTitle = styled.h2`
  padding: 12px 16px;
  background: ${({ theme: { color } }) => color.grey100};
  ${fontStyle("14px", "20px", "bold")};
`;

const CardWrapper = styled.div`
  padding: 0 16px;
`;

export default function Tag() {
  return (
    <>
      <Wrapper>
        <TagTitle>#麥當勞</TagTitle>
        <TagPostCount>共1029篇文章</TagPostCount>
        <Follow>追蹤</Follow>
      </Wrapper>
      <MentionTitle>提及的文章</MentionTitle>
      <CardWrapper>
        <PostCard />
        <PostCard />
        <PostCard />
      </CardWrapper>
    </>
  );
}
