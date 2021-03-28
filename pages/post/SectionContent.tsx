import { Row } from "@styles/flexStyle";
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

const NoPost = styled.p`
  text-align: center;
  padding: 16px 0;
  color: ${({ theme: { color } }) => color.grey500};
  background: ${({ theme: { color } }) => color.grey100};
  ${fontStyle("12px", "17px", "bold")};
`;

const WriteCommentWrapper = styled.div`
  padding: 0 16px;
  background: ${({ theme: { color } }) => color.grey100};
`;

const WriteComment = styled(Row)`
  padding: 14px 0;
  border-radius: 20px;
  box-shadow: 0px 3px 12px #e0e0e0;
  background: ${({ theme: { color } }) => color.white};
`;

const MemberImage = styled.img`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  margin-right: 8px;
`;

const LinearGradient = styled.div`
  text-align: center;
  padding-bottom: 4px;
  background: linear-gradient(to left, #52b6f9, #4c3cef) left bottom #ffffff
    no-repeat;
  background-size: 100% 2px;
`;

const AskingText = styled.span`
  ${fontStyle("14px", "20px", "bold")};
`;

const ResponseText = styled.span`
  color: ${({ theme: { color } }) => color.primary};
  ${fontStyle("14px", "20px", "bold")};
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

  const WriteCommentComponent = () => (
    <WriteCommentWrapper>
      <WriteComment justifyContent="center">
        <MemberImage src="" alt="" />
        <LinearGradient>
          <AskingText>對這篇文章有想法嗎？</AskingText>
          <ResponseText>留下回應</ResponseText>
        </LinearGradient>
      </WriteComment>
    </WriteCommentWrapper>
  );

  switch (sectionType) {
    case SectionType.COMMENT:
      if (comments?.length === 0)
        return (
          <>
            <Title>文章回應</Title>
            {WriteCommentComponent()}
            <NoPost>目前沒有回應</NoPost>
          </>
        );

      return (
        <>
          <Title>文章回應</Title>
          {WriteCommentComponent()}
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
              <RelationCard key={post.id} post={post} postTags={postTags!} />
            ))}
          </Wrapper>
        </Gap>
      );
    default:
      return null;
  }
}
