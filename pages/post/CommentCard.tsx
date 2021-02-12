import { Row } from "@styles/flexStyle";
import fontStyle from "@styles/fontStyle";
import sizeStyle from "@styles/sizeStyle";
import React from "react";
import styled from "styled-components";

const Wrapper = styled(Row)`
  padding: 16px 0;
  align-items: flex-start;
  background: ${({ theme: { color } }) => color.white};
  border-top: solid 1px ${({ theme: { color } }) => color.grey100};
`;

const Avator = styled.img`
  margin-right: 8px;
  border-radius: 50%;
  background: ${({ theme: { color } }) => color.grey100};
  ${sizeStyle("32px", "32px")};
`;

const Name = styled.h4`
  ${fontStyle("14px", "20px", "bold")};
`;

const CreateTime = styled.h5`
  margin-bottom: 12px;
  ${fontStyle("12px", "17px")};
  color: ${({ theme: { color } }) => color.grey500};
`;

const Comment = styled.p`
  ${fontStyle("16px", "22px")};
`;

export default function CommentCard() {
  return (
    <Wrapper>
      <Avator />
      <div>
        <Name>Jemy</Name>
        <CreateTime>2020/6/20 12:12</CreateTime>
        <Comment>我是麥胞，今天學會濾油</Comment>
      </div>
    </Wrapper>
  );
}
