import Modal from "@components/Modal";
import { postState } from "@redux/postSlice";
import { Row } from "@styles/flexStyle";
import fontStyle from "@styles/fontStyle";
import sizeStyle from "@styles/sizeStyle";
import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import CommentCard from "./CommentCard";

const Wrapper = styled.div`
  border-radius: 40px 40px 0 0;
  background: ${({ theme: { color } }) => color.white};
  padding: 24px 24px 0 24px;
  ${sizeStyle("100%", "100%")}
`;

const Title = styled.h2`
  ${fontStyle("20px", "27px", "bold")};
`;

const Close = styled.img`
  width: 13px;
`;

type Props = {
  close: () => void;
};

export default function CommentsModal(props: Props) {
  const { close } = props;

  const { commentsResult } = useSelector(postState);

  return (
    <Modal secondHeight="90%" alignItems="flex-end" close={close}>
      <Wrapper>
        <Row justifyContent="space-between">
          <Title>更多回應</Title>
          <Close src="/static/lnr-cross@3x.png" alt="關閉" onClick={close} />
        </Row>
        {commentsResult.comments.map((comment) => (
          <CommentCard comment={comment} />
        ))}
      </Wrapper>
    </Modal>
  );
}
