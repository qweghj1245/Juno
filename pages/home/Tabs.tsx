import fontStyle from "@styles/fontStyle";
import sizeStyle from "@styles/sizeStyle";
import React, { useState } from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 52px;
  background: ${({ theme: { color } }) => color.white};
  border-bottom: solid 2px ${({ theme: { color } }) => color.grey500};
`;

const Center = styled.div<{ direction: string }>`
  display: flex;
  justify-content: center;
  position: absolute;
  left: ${({ direction }) => {
    switch (direction) {
      case "left":
        return "21%";
      case "center":
        return "50%";
      default:
        return "50%";
    }
  }};
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

const PostIcon = styled.img`
  position: absolute;
  right: 25px;
  top: 16px;
  ${sizeStyle("20px", "20px")};
`;

enum TabState {
  HOT = "HOT",
  NEW = "NEW",
}

type Props = {
  postIcon?: boolean;
  direction?: "left" | "center";
  onHotClick: () => void;
  onNewClick: () => void;
  onPost?: () => void;
};

const Tabs = (props: Props) => {
  const {
    direction = "center",
    postIcon,
    onHotClick,
    onNewClick,
    onPost,
  } = props;

  const [tabState, setTabState] = useState<TabState>(TabState.HOT);

  const hotClickAction = () => {
    setTabState(TabState.HOT);
    onHotClick();
  };

  const newClickAction = () => {
    setTabState(TabState.NEW);
    onNewClick();
  };

  const onPostAction = () => {
    if (typeof onPost === "function") {
      onPost();
    }
  };

  return (
    <Wrapper>
      <Center direction={direction}>
        <Tab isActive={tabState === TabState.HOT} onClick={hotClickAction}>
          熱門
        </Tab>
        <Tab isActive={tabState === TabState.NEW} onClick={newClickAction}>
          最新
        </Tab>
      </Center>
      {postIcon && (
        <PostIcon
          src="/static/lnr-pencil@3x.png"
          alt="add a post"
          onClick={onPostAction}
        />
      )}
    </Wrapper>
  );
};

export default React.memo(Tabs);
