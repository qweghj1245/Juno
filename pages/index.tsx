import PostCard from "@components/PostCard";
import Tabs from "@pages/home/Tabs";
import PostApi from "api/PostApi";
import React from "react";
import styled from "styled-components";

const Wrapper = styled.main`
  padding: 0 16px;
`;

const Home = (props: any) => {
  console.log("props", props);

  return (
    <>
      <Tabs />
      <Wrapper>
        <PostCard />
      </Wrapper>
    </>
  );
};

export const getStaticProps = async () => {
  const res = await PostApi.fetchPosts();
  return {
    props: { res: res.data },
  };
};

export default Home;
