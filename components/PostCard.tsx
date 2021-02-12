/* eslint-disable operator-linebreak */
import { Row } from "@styles/flexStyle";
import fontStyle from "@styles/fontStyle";
import sizeStyle from "@styles/sizeStyle";
import { Post, PostTagsMap } from "api/PostApi";
import Link from "next/link";
import React, { useMemo } from "react";
import styled from "styled-components";
import getKeys from "utils/getKeys";

const Wrapper = styled.div`
  display: block;
  padding: 16px 0;
  background: #ffffff;
  position: relative;
  border-bottom: solid 1px ${({ theme: { color } }) => color.grey100};
`;

const Tag = styled.p`
  padding: 4px 8px;
  margin-right: 4px;
  margin-bottom: 4px;
  border-radius: 14px;
  border: solid 1px ${({ theme: { color } }) => color.grey100};
  ${fontStyle("14px", "20px")};
`;

const PostTitle = styled.h2`
  margin-bottom: 4px;
  ${fontStyle("18px", "25px", "bold")};
`;

const Description = styled.p`
  margin-bottom: 4px;
  ${fontStyle("14px", "20px")};
  color: ${({ theme: { color } }) => color.grey500};
`;

const PostImage = styled.img`
  position: absolute;
  right: 0px;
  bottom: 16px;
  border-radius: 10px;
  ${sizeStyle("72px", "72px")};
`;

const Icon = styled.img`
  margin-right: 4px;
  ${sizeStyle("20px", "20px")};
`;

const IconCounter = styled.p`
  margin-right: 8px;
  ${fontStyle("14px", "20px")};
`;

const testImage =
  "https://www.humanesociety.org/sites/default/files/styles/1240x698/public/2020-07/cat-410261.jpg?h=191a1c11&itok=c4ksCwxz";

type Props = {
  post: Post;
  postTags: PostTagsMap;
};

export default function PostCard(props: Props) {
  const { post, postTags } = props;

  const getTags = useMemo(() => {
    const postId = getKeys(postTags).find((key) => post.id === key);
    if (postId) {
      return postTags[postId].map((tag) => (
        <Tag key={tag.tagId}>{tag.name}</Tag>
      ));
    }
    return [];
  }, [postTags]);

  return (
    <Link href="/post/2">
      <Wrapper>
        <Row>{getTags}</Row>
        <PostTitle>{post.title}</PostTitle>
        <Description>{post.content}</Description>
        <Row>
          <Row>
            <Icon src={testImage} />
            <IconCounter>12</IconCounter>
          </Row>
          <Row>
            <Icon src={testImage} />
            <IconCounter>2</IconCounter>
          </Row>
          <Row>
            <Icon src={testImage} />
            <IconCounter>2</IconCounter>
          </Row>
        </Row>
        <PostImage src={testImage} />
      </Wrapper>
    </Link>
  );
}
