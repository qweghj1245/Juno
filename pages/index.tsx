import InfiniteScrollObserver from "@components/InfiniteScrollObserver";
import PostCard from "@components/PostCard";
import useDebounce from "@hooks/useDebounce";
import Tabs from "@pages/home/Tabs";
import {
  fetchInfinitePosts,
  fetchPosts,
  postState,
  setIsNotInfiniteOver,
} from "@redux/postSlice";
import { wrapper } from "@redux/store";
import { QueryStatus } from "api/PostApi";
import React, { useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";

const Wrapper = styled.main`
  padding: 0 16px 52px 16px;
  margin-top: 52px;
`;

const Home = () => {
  const dispatch = useDispatch();
  const { postsResult, postTags, isInfiniteOver } = useSelector(postState);

  const [page, setPage] = useState<number>(1);
  const [tab, setTab] = useState<QueryStatus>(QueryStatus.HOT);

  const onHotHandle = () => {
    if (tab === QueryStatus.HOT) return;

    setPage(1);
    setTab(QueryStatus.HOT);
    dispatch(setIsNotInfiniteOver());
    dispatch(fetchPosts({ query: QueryStatus.HOT, page: 1 }));
  };

  const onNewHandle = () => {
    if (tab === QueryStatus.NEW) return;

    setPage(1);
    setTab(QueryStatus.NEW);
    dispatch(setIsNotInfiniteOver());
    dispatch(fetchPosts({ query: QueryStatus.NEW, page: 1 }));
  };

  const onInfiniteScroll = useCallback(
    useDebounce(() => {
      if (isInfiniteOver || postsResult.count - page * 10 < 0) return;

      dispatch(fetchInfinitePosts({ query: tab, page: page + 1 }));
      setPage((prev) => prev + 1);
    }, 500),
    [dispatch, isInfiniteOver, page, postsResult]
  );

  return (
    <div>
      <Tabs onHotClick={onHotHandle} onNewClick={onNewHandle} />
      <Wrapper>
        {postsResult.posts.map((post) => (
          <PostCard key={post.id} post={post} postTags={postTags} />
        ))}
      </Wrapper>
      <InfiniteScrollObserver callback={onInfiniteScroll} />
    </div>
  );
};

export const getServerSideProps = wrapper.getServerSideProps(async (ctx) => {
  try {
    await ctx.store.dispatch(fetchPosts({ query: QueryStatus.HOT }));
  } catch (error) {}

  return { props: {} };
});

export default Home;
