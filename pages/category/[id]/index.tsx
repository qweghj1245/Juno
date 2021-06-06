import InfiniteScrollObserver from "@components/InfiniteScrollObserver";
import PostCard from "@components/PostCard";
import useDebounce from "@hooks/useDebounce";
import Tabs from "@pages/home/Tabs";
import {
  fetchCategoryPosts,
  fetchInfiniteCategoryPosts,
  postState,
  setCurrentCategory,
  setIsNotInfiniteOver,
} from "@redux/postSlice";
import { wrapper } from "@redux/store";
import { QueryStatus } from "api/PostApi";
import { useRouter } from "next/router";
import React, { FC, useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";

const Wrapper = styled.main`
  padding: 0 16px 52px 16px;
  margin-top: 52px;
`;

type Props = {
  categoryId: string;
};

const CategoryPosts: FC<Props> = (props) => {
  const { categoryId } = props;
  const parseCategoryId = parseInt(categoryId, 10);

  const dispatch = useDispatch();
  const { categoryPostMap, postTags, isInfiniteOver, isFetching } = useSelector(
    postState
  );

  const router = useRouter();

  const [page, setPage] = useState<number>(1);
  const [tab, setTab] = useState<QueryStatus>(QueryStatus.HOT);

  const onHotClick = () => {
    if (tab === QueryStatus.HOT) return;

    setPage(1);
    setTab(QueryStatus.HOT);
    dispatch(setIsNotInfiniteOver());
    dispatch(
      fetchCategoryPosts({
        query: QueryStatus.HOT,
        categoryId: parseCategoryId,
        page: 1,
      })
    );
  };

  const onNewClick = () => {
    if (tab === QueryStatus.NEW) return;

    setPage(1);
    setTab(QueryStatus.NEW);
    dispatch(setIsNotInfiniteOver());
    dispatch(
      fetchCategoryPosts({
        query: QueryStatus.NEW,
        categoryId: parseCategoryId,
        page: 1,
      })
    );
  };

  const postEditAction = () => {
    dispatch(setCurrentCategory(parseCategoryId));
    router.push({
      pathname: "/post/new-post",
    });
  };

  const onInfiniteScroll = useCallback(
    useDebounce(() => {
      if (isInfiniteOver || isFetching) return;

      dispatch(
        fetchInfiniteCategoryPosts({
          query: tab,
          page: page + 1,
          categoryId: parseCategoryId,
        })
      );
      setPage((prev) => prev + 1);
    }, 500),
    [dispatch, isInfiniteOver, page]
  );

  return (
    <div>
      <Tabs
        postIcon
        direction="left"
        onHotClick={onHotClick}
        onNewClick={onNewClick}
        onPost={postEditAction}
      />
      <Wrapper>
        {categoryPostMap[parseCategoryId]?.posts.map((post) => (
          <PostCard key={post.id} post={post} postTags={postTags} />
        ))}
      </Wrapper>
      <InfiniteScrollObserver callback={onInfiniteScroll} />
    </div>
  );
};

export const getServerSideProps = wrapper.getServerSideProps(async (ctx) => {
  const categoryId: number = ctx.query.id as any;

  try {
    const { categoryPostMap } = ctx.store.getState().post;
    if (!categoryPostMap[categoryId]) {
      await ctx.store.dispatch(
        fetchCategoryPosts({ query: QueryStatus.HOT, categoryId, page: 1 })
      );
    }
  } catch (error) {}

  ctx.store.dispatch(setIsNotInfiniteOver());

  return { props: { categoryId } };
});

export default CategoryPosts;
