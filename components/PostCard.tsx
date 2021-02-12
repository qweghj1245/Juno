/* eslint-disable operator-linebreak */
import { Row } from "@styles/flexStyle";
import fontStyle from "@styles/fontStyle";
import sizeStyle from "@styles/sizeStyle";
import Link from "next/link";
import React from "react";
import styled from "styled-components";

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

export default function PostCard() {
  return (
    <Link href="/post/2">
      <Wrapper>
        <Row>
          <Tag>省錢</Tag>
          <Tag>麥當勞</Tag>
          <Tag>分享</Tag>
        </Row>
        <PostTitle>實用麥當勞省錢技巧</PostTitle>
        <Description>內文預覽補充字數補充字數</Description>
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
