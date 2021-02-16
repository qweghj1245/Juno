/* eslint-disable operator-linebreak */
import { Row } from "@styles/flexStyle";
import fontStyle from "@styles/fontStyle";
import sizeStyle from "@styles/sizeStyle";
import { RelationPost } from "api/PostApi";
import moment from "moment";
import Link from "next/link";
import React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  display: block;
  padding: 16px 0;
  background: #ffffff;
  border-bottom: solid 1px ${({ theme: { color } }) => color.grey100};
`;

const Tag = styled.p`
  padding: 4px 8px;
  margin-right: 8px;
  margin-bottom: 8px;
  border-radius: 14px;
  border: solid 1px ${({ theme: { color } }) => color.grey100};
  ${fontStyle("12px", "17px")};
`;

const PostTitle = styled.h2`
  margin-bottom: 8px;
  ${fontStyle("16px", "22px", "bold")};
`;

const PostImage = styled.img`
  border-radius: 10px;
  ${sizeStyle("56px", "56px")};
`;

const CreateTime = styled.p`
  ${fontStyle("12px", "17px")};
  color: ${({ theme: { color } }) => color.grey500};
`;

type Props = {
  post: RelationPost;
};

const testImage =
  "https://www.humanesociety.org/sites/default/files/styles/1240x698/public/2020-07/cat-410261.jpg?h=191a1c11&itok=c4ksCwxz";

export default function PostCard(props: Props) {
  const { post } = props;

  return (
    <Link href={`/post/${post.id}`}>
      <Wrapper>
        <Row>
          <Tag>省錢</Tag>
          <Tag>麥當勞</Tag>
          <Tag>分享</Tag>
        </Row>
        <Row justifyContent="space-between">
          <div>
            <PostTitle>{post.title}</PostTitle>
            <CreateTime>
              {moment(post.createdAt).format("YYYY.MM.DD")}
            </CreateTime>
          </div>
          <PostImage src={testImage} />
        </Row>
      </Wrapper>
    </Link>
  );
}
