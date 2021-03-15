import PostCard from "@components/PostCard";
import Tabs from "@pages/home/Tabs";
import { fetchPosts, postState } from "@redux/postSlice";
import { wrapper } from "@redux/store";
import { QueryStatus } from "api/PostApi";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";

const Wrapper = styled.main`
  padding: 0 16px 52px 16px;
`;

const Home = () => {
  const dispatch = useDispatch();
  const { postsResult, postTags } = useSelector(postState);

  return (
    <>
      <Tabs
        onHotClick={() => dispatch(fetchPosts({ query: QueryStatus.HOT }))}
        onNewClick={() => dispatch(fetchPosts({ query: QueryStatus.NEW }))}
      />
      <Wrapper>
        {postsResult.posts.map((post) => (
          <PostCard key={post.id} post={post} postTags={postTags} />
        ))}
      </Wrapper>
    </>
  );
};

export const getServerSideProps = wrapper.getServerSideProps(async (ctx) => {
  try {
    await ctx.store.dispatch(fetchPosts({ query: QueryStatus.HOT }));
  } catch (error) {}

  return { props: {} };
});

export default Home;
