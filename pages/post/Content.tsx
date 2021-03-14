import { Row } from "@styles/flexStyle";
import fontStyle from "@styles/fontStyle";
import { PostTags } from "api/PostApi";
import React from "react";
import styled from "styled-components";

const Wrapper = styled.main`
  padding: 12px 16px;
  border-bottom: solid 1px ${({ theme: { color } }) => color.grey100};
`;

const Category = styled.h2`
  color: ${({ theme: { color } }) => color.primary};
  ${fontStyle("18px", "25px", "500")};
`;

const Tag = styled.h3`
  ${fontStyle("14px", "20px")};
`;

const PostTitle = styled.h1`
  margin: 12px 0;
  ${fontStyle("24px", "33px", "bold")};
`;

const Paragraph = styled.div`
  ${fontStyle("16px", "22px")};
`;

const CategoryDot = styled.div`
  color: ${({ theme: { color } }) => color.grey500};
  ${fontStyle("18px", "25px", "500")};
`;

type Props = {
  categoryName: string;
  tags?: PostTags[];
  title: string;
  content: string;
};

export default function Content(props: Props) {
  const { categoryName, tags, title, content } = props;

  return (
    <Wrapper>
      <Row>
        <Category>{categoryName}</Category>
        {tags && <CategoryDot>・</CategoryDot>}
        {tags &&
          tags.map((tag, idx, arr) => (
            <Tag key={tag.tagId}>
              {`${tag.name}${idx !== arr.length - 1 ? "・" : ""}`}
            </Tag>
          ))}
      </Row>
      <PostTitle>{title}</PostTitle>
      <Paragraph dangerouslySetInnerHTML={{ __html: content }} />
    </Wrapper>
  );
}
