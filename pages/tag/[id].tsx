import PostCard from "@components/PostCard";
import { fetchPosts, postState } from "@redux/postSlice";
import { wrapper } from "@redux/store";
import { fetchTag, tagState } from "@redux/tagSlice";
import { Row } from "@styles/flexStyle";
import fontStyle from "@styles/fontStyle";
import { QueryStatus } from "api/PostApi";
import React from "react";
import { useSelector } from "react-redux";
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
  padding: 0 16px 52px 16px;
`;

const Tag = () => {
  const { postsResult, postTags } = useSelector(postState);
  const { tagInfo } = useSelector(tagState);

  return (
    <>
      <Wrapper>
        <TagTitle>{`#${tagInfo?.name}`}</TagTitle>
        <TagPostCount>{`共${tagInfo?.count}篇文章`}</TagPostCount>
        {/* <Follow>追蹤</Follow> */}
      </Wrapper>
      <MentionTitle>提及的文章</MentionTitle>
      <CardWrapper>
        {postsResult.posts.map((post) => (
          <PostCard key={post.id} post={post} postTags={postTags} />
        ))}
      </CardWrapper>
    </>
  );
};

export const getServerSideProps = wrapper.getServerSideProps(async (ctx) => {
  try {
    await ctx.store.dispatch(
      fetchPosts({ tagId: ctx.query.id, query: QueryStatus.HOT })
    );
  } catch (error) {}

  try {
    await ctx.store.dispatch(fetchTag(ctx.query.id));
  } catch (error) {}

  return { props: {} };
});

export default Tag;
