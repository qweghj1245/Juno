import { memberState } from "@redux/memberSlice";
import { postState } from "@redux/postSlice";
import { Row } from "@styles/flexStyle";
import fontStyle from "@styles/fontStyle";
import { PostTagsMap, RelationPost } from "api/PostApi";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import CommentCard from "./CommentCard";
import CommentEditorModal from "./CommentEditorModal";
import CommentsModal from "./CommentsModal";
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
  padding: 0 16px 16px;
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
  relationPosts?: RelationPost[];
  postTags?: PostTagsMap;
};

export default function SectionContent(props: Props) {
  const { sectionType, relationPosts, postTags } = props;

  const { commentsResult } = useSelector(postState);
  const { memberProile } = useSelector(memberState);

  const [moreComments, setMoreComments] = useState<boolean>(false);
  const [writeComments, setWriteComments] = useState<boolean>(false);

  const WriteCommentComponent = () => (
    <WriteCommentWrapper>
      <WriteComment
        justifyContent="center"
        onClick={() => setWriteComments(true)}
      >
        <MemberImage src={memberProile?.avator || ""} alt={memberProile?.name || ""} />
        <LinearGradient>
          <AskingText>對這篇文章有想法嗎？</AskingText>
          <ResponseText>留下回應</ResponseText>
        </LinearGradient>
      </WriteComment>
    </WriteCommentWrapper>
  );

  switch (sectionType) {
    case SectionType.COMMENT:
      return (
        <>
          <Title>文章回應</Title>
          {WriteCommentComponent()}
          {commentsResult.comments && commentsResult.comments.length > 0 ? (
            <>
              <Wrapper>
                {commentsResult.comments?.map((comment) => (
                  <CommentCard key={comment.id} comment={comment} />
                ))}
              </Wrapper>
              <SeeMoreComment onClick={() => setMoreComments(true)}>
                查看更多回應
              </SeeMoreComment>
            </>
          ) : (
            <NoPost>目前沒有回應</NoPost>
          )}
          {moreComments && (
            <CommentsModal close={() => setMoreComments(false)} />
          )}
          {writeComments && (
            <CommentEditorModal close={() => setWriteComments(false)} />
          )}
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
