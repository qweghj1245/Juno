import React from "react";
import styled from "styled-components";
import Author from "../Author";
import Content from "../Content";
import Evaluation from "../Evaluation";
import SectionContent, { SectionType } from "../SectionContent";

const Wrapper = styled.div`
  background: ${({ theme: { color } }) => color.white};
`;

export default function Post() {
  return (
    <Wrapper>
      <Author />
      <Content />
      <Evaluation />
      <SectionContent sectionType={SectionType.COMMENT} />
      <SectionContent sectionType={SectionType.RELATION} />
    </Wrapper>
  );
}
