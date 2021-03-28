import { Row } from "@styles/flexStyle";
import sizeStyle from "@styles/sizeStyle";
import React, { useEffect } from "react";
import styled from "styled-components";

const Wrapper = styled(Row)`
  background: #0000004d;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 10000;
  ${sizeStyle("100%", "100%")};
`;

const StopPropagation = styled(Row)<{ height?: string }>`
  ${({ height }) =>
    height ? sizeStyle("100%", height) : sizeStyle("100%", "100%")};
`;

type Props = {
  children: React.ReactNode;
  justifyContent?: string;
  alignItems?: string;
  secondHeight: string;
  close: () => void;
};

export default function Modal(props: Props) {
  const { children, justifyContent, alignItems, secondHeight, close } = props;

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  const stopPropagation = (e: React.FormEvent<EventTarget>) => {
    e.stopPropagation();
    e.nativeEvent.stopImmediatePropagation();
  };

  return (
    <Wrapper
      justifyContent={justifyContent}
      alignItems={alignItems}
      onClick={close}
    >
      <StopPropagation height={secondHeight} onClick={stopPropagation}>
        {children}
      </StopPropagation>
    </Wrapper>
  );
}
