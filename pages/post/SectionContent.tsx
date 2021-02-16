import fontStyle from "@styles/fontStyle";
import { Comment, PostTagsMap, RelationPost } from "api/PostApi";
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
  comments?: Comment[];
  relationPosts?: RelationPost[];
  postTags?: PostTagsMap;
};

export default function SectionContent(props: Props) {
  const { sectionType, comments, relationPosts, postTags } = props;

  console.log(postTags);

  switch (sectionType) {
    case SectionType.COMMENT:
      return (
        <>
          <Title>文章回應</Title>
          <Wrapper>
            {comments?.map((comment) => (
              <CommentCard key={comment.id} comment={comment} />
            ))}
          </Wrapper>
          <SeeMoreComment>查看更多回應</SeeMoreComment>
        </>
      );
    case SectionType.RELATION:
      if (relationPosts?.length === 0) return null;

      return (
        <Gap>
          <Title>相關文章</Title>
          <Wrapper>
            {relationPosts?.map((post) => (
              <RelationCard post={post} postTags={postTags!} />
            ))}
          </Wrapper>
        </Gap>
      );
    default:
      return null;
  }
}
