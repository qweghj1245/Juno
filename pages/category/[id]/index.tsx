import PostCard from "@components/PostCard";
import Tabs from "@pages/home/Tabs";
import {
  fetchCategoryPosts,
  postState,
  setCurrentCategory,
} from "@redux/postSlice";
import { wrapper } from "@redux/store";
import { QueryStatus } from "api/PostApi";
import { useRouter } from "next/router";
import React, { FC } from "react";
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
  const { categoryPostMap, postTags } = useSelector(postState);

  const router = useRouter();

  const onHotClick = () => {
    dispatch(
      fetchCategoryPosts({
        query: QueryStatus.HOT,
        categoryId: parseCategoryId,
      })
    );
  };

  const onNewClick = () => {
    dispatch(
      fetchCategoryPosts({
        query: QueryStatus.NEW,
        categoryId: parseCategoryId,
      })
    );
  };

  const postEditAction = () => {
    dispatch(setCurrentCategory(parseCategoryId));
    router.push({
      pathname: "/post/new-post",
    });
  };

  return (
    <>
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
    </>
  );
};

export const getServerSideProps = wrapper.getServerSideProps(async (ctx) => {
  const categoryId: number = ctx.query.id as any;

  try {
    const { categoryPostMap } = ctx.store.getState().post;
    if (!categoryPostMap[categoryId]) {
      await ctx.store.dispatch(
        fetchCategoryPosts({ query: QueryStatus.HOT, categoryId })
      );
    }
  } catch (error) {}

  return { props: { categoryId } };
});

export default CategoryPosts;
