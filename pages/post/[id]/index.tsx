import {
  fetchComments,
  fetchPositiveNegative,
  fetchPositiveNegativeStatus,
  fetchPost,
  fetchPostTags,
  fetchRelationPosts,
  postState,
} from "@redux/postSlice";
import { wrapper } from "@redux/store";
import { Comment, PostTagsMap, RelationPost, SinglePost } from "api/PostApi";
import React, { FC, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import Author from "../Author";
import Content from "../Content";
import Evaluation from "../Evaluation";
import SectionContent, { SectionType } from "../SectionContent";

const Wrapper = styled.div`
  background: ${({ theme: { color } }) => color.white};
`;

type Props = {
  post: SinglePost;
  postTags: PostTagsMap;
  comments: Comment[];
  relationPosts: RelationPost[];
};

const Post: FC<Props> = (props) => {
  const { post, postTags, comments, relationPosts } = props;

  const dispatch = useDispatch();
  const {
    positiveNegative,
    positiveNegativeStatus,
    isStatusDone,
    isCountDone,
  } = useSelector(postState);

  useEffect(() => {
    dispatch(fetchPositiveNegative(post.id));
    dispatch(fetchPositiveNegativeStatus(post.id));
  }, [dispatch, post.id]);

  return (
    <Wrapper>
      <Author
        author={post.author}
        authorAvator={post.authorAvator}
        createdAt={post.createdAt}
      />
      <Content
        categoryName={post.categoryName}
        tags={postTags[post.id]}
        title={post.title}
        content={post.content}
      />
      <Evaluation
        postId={post.id}
        positiveNegative={positiveNegative}
        positiveNegativeStatus={positiveNegativeStatus}
        isStatusDone={isStatusDone}
        isCountDone={isCountDone}
        isCollect={post.isCollect}
        collectId={post.collectId}
      />
      <SectionContent sectionType={SectionType.COMMENT} comments={comments} />
      <SectionContent
        sectionType={SectionType.RELATION}
        relationPosts={relationPosts}
        postTags={postTags}
      />
    </Wrapper>
  );
};

export const getServerSideProps = wrapper.getServerSideProps(async (ctx) => {
  let post: SinglePost | null = null;
  let postTags: PostTagsMap = {};
  let comments: Comment[] = [];
  let relationPosts: RelationPost[] = [];
  let postIds: number[] = [];

  try {
    await ctx.store.dispatch(fetchPost(ctx.query.id));
    post = ctx.store.getState().post.post;
  } catch (error) {}

  try {
    await ctx.store.dispatch(fetchComments(ctx.query.id));
    comments = ctx.store.getState().post.commentsResult.comments;
  } catch (error) {}

  try {
    await ctx.store.dispatch(fetchRelationPosts(ctx.query.id));
    relationPosts = ctx.store.getState().post.relationPosts;
    postIds = relationPosts.map((post) => post.id);
  } catch (error) {}

  try {
    await ctx.store.dispatch(fetchPostTags([...postIds, ctx.query.id]));
    postTags = ctx.store.getState().post.postTags;
  } catch (error) {}

  return { props: { post, postTags, comments, relationPosts } };
});

export default Post;
