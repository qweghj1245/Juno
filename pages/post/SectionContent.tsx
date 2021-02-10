import fontStyle from "@styles/fontStyle";
import React from "react";
import styled from "styled-components";
import CommentCard from "./CommentCard";
import RelationCard from "./RelationCard";

const Wrapper = styled.section`
  padding: 0 16px;
  background: ${({ theme: { color } }) => color.white};
`;

const Gap = styled.div`
  padding-bottom: 53px;
  background: ${({ theme: { color } }) => color.grey100};
`;

const Title = styled.h2`
  padding: 12px 16px;
  background: ${({ theme: { color } }) => color.grey100};
  ${fontStyle("14px", "20px", "bold")};
`;

const SeeMoreComment = styled.div`
  padding: 12px 0;
  text-align: center;
  color: ${({ theme: { color } }) => color.grey500};
  background: ${({ theme: { color } }) => color.grey100};
  border-bottom: solid 1px ${({ theme: { color } }) => color.white};
  ${fontStyle("12px", "17px", "bold")}
`;

export enum SectionType {
  COMMENT = "comment",
  RELATION = "relation",
}

type Props = {
  sectionType: SectionType;
};

export default function SectionContent(props: Props) {
  const { sectionType } = props;

  switch (sectionType) {
    case SectionType.COMMENT:
      return (
        <>
          <Title>文章回應</Title>
          <Wrapper>
            <CommentCard />
            <CommentCard />
            <CommentCard />
          </Wrapper>
          <SeeMoreComment>查看更多回應</SeeMoreComment>
        </>
      );
    case SectionType.RELATION:
      return (
        <Gap>
          <Title>相關文章</Title>
          <Wrapper>
            <RelationCard />
            <RelationCard />
            <RelationCard />
          </Wrapper>
        </Gap>
      );
    default:
      return null;
  }
}
