import { Category } from "@api/CategoryApi";
import { fetchCategories } from "@redux/categorySlice";
import { wrapper } from "@redux/store";
import { Row } from "@styles/flexStyle";
import fontStyle from "@styles/fontStyle";
import sizeStyle from "@styles/sizeStyle";
import Link from "next/link";
import React from "react";
import styled from "styled-components";

const Title = styled.h1`
  padding: 16px;
  color: ${({ theme: { color } }) => color.grey500};
  border-bottom: solid 1px ${({ theme: { color } }) => color.grey100};
  ${fontStyle("20px", "27px", "bold")};
`;

const Icon = styled.img`
  margin-right: 10px;
  ${sizeStyle("18px", "18px")};
`;

const CategoryTitle = styled.h2`
  ${fontStyle("18px", "25px", "bold")};
`;

const CategoryWrapper = styled(Row)`
  padding: 12px 24px;
  border-bottom: solid 1px ${({ theme: { color } }) => color.grey100};
`;

const testImage =
  "https://www.humanesociety.org/sites/default/files/styles/1240x698/public/2020-07/cat-410261.jpg?h=191a1c11&itok=c4ksCwxz";

type Props = {
  categories: Category[];
};

const CategoryPage = (props: Props) => {
  const { categories } = props;

  return (
    <>
      <Title>分類</Title>
      {categories.map((category) => (
        <Link href="/">
          <CategoryWrapper>
            <Icon src={testImage} />
            <CategoryTitle>{category.name}</CategoryTitle>
          </CategoryWrapper>
        </Link>
      ))}
    </>
  );
};

export const getServerSideProps = wrapper.getServerSideProps(async (ctx) => {
  try {
    await ctx.store.dispatch(fetchCategories());
    const { categories } = ctx.store.getState().category;

    return { props: { categories } };
  } catch (error) {
    return { props: { categories: [] } };
  }
});

export default CategoryPage;
