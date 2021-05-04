import Modal from "@components/Modal";
import Editor from "@draft-js-plugins/editor";
import { memberState } from "@redux/memberSlice";
import { fetchCreateComment, postState } from "@redux/postSlice";
import { Row } from "@styles/flexStyle";
import fontStyle from "@styles/fontStyle";
import sizeStyle from "@styles/sizeStyle";
import { convertFromRaw, convertToRaw, EditorState } from "draft-js";
import draftToHtml from "draftjs-to-html";
import React, { useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";

const Wrapper = styled.div`
  border-radius: 40px 40px 0 0;
  background: ${({ theme: { color } }) => color.white};
  padding: 21px 16px 16px 16px;
  ${sizeStyle("100%", "100%")}

  .DraftEditor-root {
    padding: 16px;
    border: solid 1px ${({ theme: { color } }) => color.grey500};
    height: calc(100vh - 212px);
    ${fontStyle("14px", "17px")};

    .DraftEditor-editorContainer,
    .public-DraftEditor-content {
      height: 100%;
    }

    .public-DraftEditor-content > div {
      height: inherit;
      overflow: scroll;
    }
  }

  /* .DraftEditor-editorContainer,
  .public-DraftEditor-content {
    height: 100%;
  } */
`;

const Title = styled.h2`
  ${fontStyle("20px", "27px", "bold")};
`;

const SendButton = styled.button`
  padding: 8px 24px;
  border-radius: 17px;
  box-shadow: 0px 3px 12px #2853c74d;
  background: ${({ theme: { color } }) => color.primary};
  color: ${({ theme: { color } }) => color.white};
`;

const Avator = styled.img`
  margin-right: 8px;
  border-radius: 50%;
  object-fit: cover;
  background: ${({ theme: { color } }) => color.grey100};
  ${sizeStyle("32px", "32px")};
`;

const Name = styled.h4`
  ${fontStyle("14px", "20px", "bold")};
`;

const CustomRow = styled(Row)<{ marginBottom: string }>`
  margin-bottom: ${({ marginBottom }) => marginBottom};
`;

type Props = {
  close: () => void;
};

// for `draftjs getIn` undefined
const emptyContentState = convertFromRaw({
  entityMap: {},
  blocks: [
    {
      text: "",
      key: "foo",
      type: "unstyled",
      entityRanges: [],
      depth: 0,
      inlineStyleRanges: [],
    },
  ],
});

export default function CommentEditorModal(props: Props) {
  const { close } = props;

  const dispatch = useDispatch();
  const { post } = useSelector(postState);
  const { memberProile } = useSelector(memberState);

  const [editorState, setEditorState] = useState<EditorState>(
    EditorState.createWithContent(emptyContentState)
  );

  const draftjsToHTML = useMemo(() => {
    const json = convertToRaw(editorState.getCurrentContent());
    return draftToHtml(json);
  }, [editorState]);

  const onChange = (edt: EditorState) => {
    setEditorState(edt);
  };

  const deployComment = () => {
    dispatch(
      fetchCreateComment({
        postId: post!.id,
        content: draftjsToHTML,
      })
    );
    close();
  };

  return (
    <Modal secondHeight="90%" alignItems="flex-end" close={close}>
      <Wrapper>
        <CustomRow marginBottom="13px" justifyContent="space-between">
          <Title>留下回應</Title>
          <SendButton onClick={deployComment}>發布</SendButton>
        </CustomRow>
        <CustomRow marginBottom="16px">
          <Avator
            src={memberProile?.avator || ""}
            alt={memberProile?.avatorAlt || ""}
          />
          <div>
            <Name>{memberProile?.name || ""}</Name>
          </div>
        </CustomRow>
        <Editor editorState={editorState} onChange={onChange} />
      </Wrapper>
    </Modal>
  );
}
