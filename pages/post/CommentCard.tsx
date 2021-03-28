import { Row } from "@styles/flexStyle";
import fontStyle from "@styles/fontStyle";
import sizeStyle from "@styles/sizeStyle";
import { Comment } from "api/PostApi";
import moment from "moment";
import React from "react";
import styled from "styled-components";

const Wrapper = styled(Row)`
  padding: 16px 0;
  align-items: flex-start;
  background: ${({ theme: { color } }) => color.white};
  border-bottom: solid 1px ${({ theme: { color } }) => color.grey100};
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

const Content = styled.p`
  ${fontStyle("16px", "22px")};
`;

type Props = {
  comment: Comment;
};

export default function CommentCard(props: Props) {
  const { comment } = props;

  return (
    <Wrapper>
      <Avator
        src={comment.memberInfo.avator || ""}
        alt={comment.memberInfo.name}
      />
      <div>
        <Name>{comment.memberInfo.name}</Name>
        <CreateTime>
          {moment(comment.createdAt).format("YYYY-MM-DD HH:mm")}
        </CreateTime>
        <Content>{comment.content}</Content>
      </div>
    </Wrapper>
  );
}
