import PostCard from "@components/PostCard";
import Tabs from "@pages/home/Tabs";
import React from "react";
import styled from "styled-components";

const Wrapper = styled.main`
  padding: 0 16px;
`;

export default function Home() {
  return (
    <>
      <Tabs />
      <Wrapper>
        <PostCard />
      </Wrapper>
    </>
  );
}
