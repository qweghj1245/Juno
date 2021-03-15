import PostCard from "@components/PostCard";
import Tabs from "@pages/home/Tabs";
import { fetchCategoryPosts, postState } from "@redux/postSlice";
import { wrapper } from "@redux/store";
import { QueryStatus } from "api/PostApi";
import React, { FC } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";

const Wrapper = styled.main`
  padding: 0 16px 52px 16px;
`;

type Props = {
  categoryId: number;
};

const CategoryPosts: FC<Props> = (props) => {
  const { categoryId } = props;

  const dispatch = useDispatch();
  const { categoryPostMap, postTags } = useSelector(postState);

  console.log(categoryPostMap);

  const onHotClick = () => {
    dispatch(
      fetchCategoryPosts({
        query: QueryStatus.HOT,
        categoryId,
      })
    );
  };

  const onNewClick = () => {
    dispatch(
      fetchCategoryPosts({
        query: QueryStatus.NEW,
        categoryId,
      })
    );
  };

  return (
    <>
      <Tabs onHotClick={onHotClick} onNewClick={onNewClick} />
      <Wrapper>
        {categoryPostMap[categoryId]?.posts.map((post) => (
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
