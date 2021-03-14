import PostCard from "@components/PostCard";
import Tabs from "@pages/home/Tabs";
import { fetchPosts, fetchPostTags } from "@redux/postSlice";
import { wrapper } from "@redux/store";
import { PostsResults, PostTagsMap } from "api/PostApi";
import React, { FC } from "react";
import styled from "styled-components";

const Wrapper = styled.main`
  padding: 0 16px 52px 16px;
`;

type Props = PostsResults & {
  postTags: PostTagsMap;
};

const Home: FC<Props> = (props) => {
  const { posts, postTags } = props;
  return (
    <>
      <Tabs />
      <Wrapper>
        {posts.map((post) => (
          <PostCard key={post.id} post={post} postTags={postTags} />
        ))}
      </Wrapper>
    </>
  );
};

export const getServerSideProps = wrapper.getServerSideProps(async (ctx) => {
  try {
    await ctx.store.dispatch(fetchPosts());
    const postsResults = ctx.store.getState().post.postsResult;
    const postIds = postsResults.posts.map((post) => post.id);

    await ctx.store.dispatch(fetchPostTags(postIds));
    const postTags = ctx.store.getState().post.postTags;

    return { props: { ...postsResults, postTags } };
  } catch (error) {
    return { props: { posts: [], postTags: {} } };
  }
});

export default Home;
