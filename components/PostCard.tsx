/* eslint-disable operator-linebreak */
import { Row } from "@styles/flexStyle";
import fontStyle from "@styles/fontStyle";
import sizeStyle from "@styles/sizeStyle";
import textOverflow from "@styles/textOverflow";
import { GroupPost, PostTagsMap } from "api/PostApi";
import moment from "moment";
import Link from "next/link";
import React, { useEffect, useMemo, useState } from "react";
import styled from "styled-components";
import getKeys from "utils/getKeys";

const Wrapper = styled.article`
  padding: 16px 0;
  background: #ffffff;
  border-bottom: solid 1px ${({ theme: { color } }) => color.grey100};
`;

const ContentWrapper = styled.div`
  width: calc(100% - 72px);
`;

const Tag = styled.p`
  margin-bottom: 4px;
  ${fontStyle("14px", "20px")};
`;

const PostTitle = styled.h2`
  width: 97%;
  margin-bottom: 4px;
  ${textOverflow};
  ${fontStyle("18px", "25px", "bold")};
`;

const Description = styled.div`
  width: 97%;
  margin-bottom: 8px;
  ${textOverflow};
  ${fontStyle("14px", "20px")};
  color: ${({ theme: { color } }) => color.grey500};
`;

const PostImage = styled.img`
  border-radius: 10px;
  object-fit: cover;
  ${sizeStyle("72px", "72px")};
`;

const CreateTime = styled.p`
  ${fontStyle("12px", "17px")};
  color: ${({ theme: { color } }) => color.grey500};
`;

const testImage =
  "https://www.humanesociety.org/sites/default/files/styles/1240x698/public/2020-07/cat-410261.jpg?h=191a1c11&itok=c4ksCwxz";

type Props = {
  post: GroupPost;
  postTags: PostTagsMap;
};

export default function PostCard(props: Props) {
  const { post, postTags } = props;

  const [postImage, setPostImage] = useState<string>("");

  const getTags = useMemo(() => {
    const postId = getKeys(postTags).find((key) => post.id === key);
    if (postId) {
      return postTags[postId].map((tag, idx, arr) => (
        <Tag key={tag.tagId}>
          {`${tag.name}${idx !== arr.length - 1 ? "・" : ""}`}
        </Tag>
      ));
    }
    return [];
  }, [postTags]);

  const contentRefactor = useMemo(() => {
    const content = post.content
      .replace(/<[^>]*>/g, " ")
      .replace(/\s{2,}/g, "，")
      .trim();
    return `<span>${content.substring(0, content.length - 1)}</span>`;
  }, [post.content]);

  useEffect(() => {
    const matchUrlRegex = /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/gi;
    const matchImageRegex = /jpg|png|gif|jpeg/g;
    const parseLink = post.content.match(matchUrlRegex) || [];
    const filterImageLink = parseLink.filter((link) =>
      matchImageRegex.test(link)
    );

    if (filterImageLink) {
      setPostImage(filterImageLink[0] || "");
    }
  }, [post.content]);

  return (
    <Link href={`/post/${post.id}`}>
      <Wrapper>
        <Row justifyContent="space-between" alignItems="flex-start">
          <ContentWrapper>
            <Row>{getTags}</Row>
            <PostTitle>{post.title}</PostTitle>
            <Description
              dangerouslySetInnerHTML={{
                __html: contentRefactor,
              }}
            />
            <CreateTime>
              {moment(post.createdAt).format("YYYY.MM.DD")}
            </CreateTime>
          </ContentWrapper>
          {postImage && <PostImage src={postImage} />}
        </Row>
      </Wrapper>
    </Link>
  );
}
