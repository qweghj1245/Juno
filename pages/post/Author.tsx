import { Row } from "@styles/flexStyle";
import fontStyle from "@styles/fontStyle";
import sizeStyle from "@styles/sizeStyle";
import moment from "moment";
import React from "react";
import styled from "styled-components";

const Wrapper = styled(Row)`
  padding: 12px 16px;
  border-bottom: solid 1px ${({ theme: { color } }) => color.grey100};
`;

const AuthorPhoto = styled.img`
  ${sizeStyle("48px", "48px")};
  border-radius: 50%;
  margin-right: 8px;
  object-fit: cover;
`;

const AuthorName = styled.h3`
  margin-bottom: 4px;
  ${fontStyle("15px", "21px", "bold")};
`;

const CreateTime = styled.h4`
  color: ${({ theme: { color } }) => color.grey500};
  ${fontStyle("12px", "17px")};
`;

type Props = {
  author: string;
  authorAvator: string;
  createdAt: number;
};

export default function Author(props: Props) {
  const { author, authorAvator, createdAt } = props;
  return (
    <Wrapper>
      <AuthorPhoto src={authorAvator} />
      <div>
        <AuthorName>{author}</AuthorName>
        <CreateTime>
          {moment(createdAt).format("YYYY-MM-DD HH:mm:ss")}
        </CreateTime>
      </div>
    </Wrapper>
  );
}
