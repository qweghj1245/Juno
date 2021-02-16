import {
  fetchComments,
  fetchPost,
  fetchPostTags,
  fetchRelationPosts,
} from "@redux/postSlice";
import { wrapper } from "@redux/store";
import { Comment, PostTagsMap, RelationPost, SinglePost } from "api/PostApi";
import React, { FC } from "react";
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
      <Evaluation />
      <SectionContent sectionType={SectionType.COMMENT} comments={comments} />
      <SectionContent
        sectionType={SectionType.RELATION}
        relationPosts={relationPosts}
      />
    </Wrapper>
  );
};

export const getServerSideProps = wrapper.getServerSideProps(async (ctx) => {
  let post: SinglePost | null = null;
  let postTags: PostTagsMap = {};
  let comments: Comment[] = [];
  let relationPosts: RelationPost[] = [];

  try {
    await ctx.store.dispatch(fetchPost(ctx.query.id));
    post = ctx.store.getState().post.post;
  } catch (error) {}

  try {
    await ctx.store.dispatch(fetchPostTags([ctx.query.id]));
    postTags = ctx.store.getState().post.postTags;
  } catch (error) {}

  try {
    await ctx.store.dispatch(fetchComments(ctx.query.id));
    comments = ctx.store.getState().post.commentsResult.comments;
  } catch (error) {}

  try {
    await ctx.store.dispatch(fetchRelationPosts(ctx.query.id));
    relationPosts = ctx.store.getState().post.relationPosts;
  } catch (error) {}

  return { props: { post, postTags, comments, relationPosts } };
});

export default Post;
