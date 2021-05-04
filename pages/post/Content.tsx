import { Row } from "@styles/flexStyle";
import fontStyle from "@styles/fontStyle";
import { PostTags } from "api/PostApi";
import Link from "next/link";
import React, { useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import shareLinkHtml from "utils/shareLinkHtml";

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

  & > p {
    height: 22px;
  }

  & > img {
    width: 100%;
  }
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

  const [contentHtml, setContentHtml] = useState<string>("");

  const contentParser = useCallback(async () => {
    const matchUrlRegex = /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/gi;
    const matchImageRegex = /jpg|png|gif|jpeg/g;
    const parseLink = content.match(matchUrlRegex) || [];
    const filterLink = parseLink.filter((link) => !matchImageRegex.test(link));

    if (filterLink.length > 0) {
      filterLink.map(async (link) => {
        const shareHtml = await shareLinkHtml({ url: link || "" });
        setContentHtml(content.replace(link, shareHtml));
      });
    } else {
      setContentHtml(content);
    }
  }, [content]);

  useEffect(() => {
    contentParser();
  }, [contentParser]);

  return (
    <Wrapper>
      <Row>
        <Category>{categoryName}</Category>
        {tags && <CategoryDot>・</CategoryDot>}
        {tags &&
          tags.map((tag, idx, arr) => (
            <Link key={tag.tagId} href={`/tag/${tag.tagId}`}>
              <Tag key={tag.tagId}>
                {`${tag.name}${idx !== arr.length - 1 ? "・" : ""}`}
              </Tag>
            </Link>
          ))}
      </Row>
      <PostTitle>{title}</PostTitle>
      <Paragraph dangerouslySetInnerHTML={{ __html: contentHtml }} />
    </Wrapper>
  );
}
