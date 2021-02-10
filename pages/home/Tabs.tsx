import fontStyle from "@styles/fontStyle";
import React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  height: 52px;
  position: relative;
  border-bottom: solid 2px ${({ theme: { color } }) => color.grey500};
`;

const Center = styled.div`
  display: flex;
  justify-content: center;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);

  & > div:last-child {
    margin-right: 0;
  }
`;

const Tab = styled.div<{ isActive?: boolean }>`
  margin-right: 10px;
  padding: 15px 18px;
  border-bottom-style: solid;
  border-bottom-width: ${({ isActive }) => isActive && "2px"};
  border-bottom-color: ${({ theme: { color } }) => color.primary};
  color: ${({ isActive, theme: { color } }) =>
    isActive ? color.primary : color.grey500};
  ${fontStyle("14px", "20px", "bold")};
`;

const Tabs = () => (
  <Wrapper>
    <Center>
      <Tab>熱門</Tab>
      <Tab isActive>最新</Tab>
    </Center>
  </Wrapper>
);

export default React.memo(Tabs);
