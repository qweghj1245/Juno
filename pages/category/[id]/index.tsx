import PostCard from "@components/PostCard";
import Tabs from "@pages/home/Tabs";
import { fetchCategoryPosts, fetchPostTags } from "@redux/postSlice";
import { wrapper } from "@redux/store";
import { GroupPost, PostsResults, PostTagsMap } from "api/PostApi";
import React, { FC } from "react";
import styled from "styled-components";

const Wrapper = styled.main`
  padding: 0 16px 52px 16px;
`;

type Props = {
  categoryId: number;
  postTags: PostTagsMap;
  categoryPostMap: { [categoryId: number]: PostsResults };
};

const CategoryPosts: FC<Props> = (props) => {
  const { categoryId, categoryPostMap, postTags } = props;
  return (
    <>
      <Tabs />
      <Wrapper>
        {categoryPostMap[categoryId].posts.map((post) => (
          <PostCard key={post.id} post={post} postTags={postTags} />
        ))}
      </Wrapper>
    </>
  );
};

export const getServerSideProps = wrapper.getServerSideProps(async (ctx) => {
  const fetchPostTagsAction = async (posts: GroupPost[]) => {
    const postIds = posts.map((post) => post.id);
    await ctx.store.dispatch(fetchPostTags(postIds));
    return ctx.store.getState().post.postTags;
  };

  try {
    const categoryId: number = ctx.query.id as any;
    const { categoryPostMap } = ctx.store.getState().post;

    if (categoryPostMap[categoryId]) {
      // cache
      const postTags = await fetchPostTagsAction(
        categoryPostMap[categoryId].posts
      );
      return { props: { categoryId, categoryPostMap, postTags } };
    } else {
      // refetch
      await ctx.store.dispatch(fetchCategoryPosts({ categoryId }));
      const { categoryPostMap } = ctx.store.getState().post;

      const postTags = await fetchPostTagsAction(
        categoryPostMap[categoryId].posts
      );
      return { props: { categoryId, categoryPostMap, postTags } };
    }
  } catch (error) {
    return { props: { categoryId: -1, categoryPostMap: {}, postTags: {} } };
  }
});

export default CategoryPosts;
