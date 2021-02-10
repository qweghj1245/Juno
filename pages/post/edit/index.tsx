import { Row } from "@styles/flexStyle";
import fontStyle from "@styles/fontStyle";
import { convertFromRaw, convertToRaw, Editor, EditorState } from "draft-js";
import "draft-js/dist/Draft.css";
import React, { useState } from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  height: 100vh;

  .DraftEditor-root {
    padding: 16px;
    border-top: solid 1px ${({ theme: { color } }) => color.grey100};
    ${fontStyle("12px", "17px")};
  }
`;

const ButtonWrapper = styled(Row)`
  justify-content: space-between;
  padding: 16px;
`;

const Cancel = styled.button`
  padding: 8px 24px;
  border-radius: 17px;
  border: solid 1px ${({ theme: { color } }) => color.grey100};
  color: ${({ theme: { color } }) => color.grey500};
  ${fontStyle("12px", "17px", "bold")};
`;

const Deploy = styled.button`
  padding: 8px 24px;
  border-radius: 17px;
  background: ${({ theme: { color } }) => color.grey500};
  ${fontStyle("12px", "17px", "bold")};
`;

const TagInput = styled.input`
  width: 100%;
  padding: 16px;
  border: 0;
  border-top: solid 1px ${({ theme: { color } }) => color.grey100};
  ${fontStyle("12px", "17px")};
`;

const TitleInput = styled.input`
  width: 100%;
  padding: 16px;
  border: 0;
  border-top: solid 1px ${({ theme: { color } }) => color.grey100};
  ${fontStyle("20px", "27px", "bold")};
`;

export default function PostEditor() {
  const [editorState, setEditorState] = useState<EditorState>(
    EditorState.createEmpty(),
  );

  const onChange = (edt: EditorState) => {
    // {"blocks":[{"key":"2nr1i","text":"wwweeer","type":"sunstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}
    const json = convertToRaw(edt.getCurrentContent());
    console.log("1111", edt.getCurrentContent());
    console.log("1", JSON.stringify(json)); // 字串化丟入 db
    console.log("2", EditorState.createWithContent(convertFromRaw(json))); // convertFromRaw 轉成的格式是 ContentState, 但編輯器要的格式是 EditorState
    console.log("3", edt); // EditorState
    setEditorState(edt);
  };

  return (
    <Wrapper>
      <ButtonWrapper>
        <Cancel>取消</Cancel>
        <Deploy>發布</Deploy>
      </ButtonWrapper>
      <TagInput placeholder="＋添加文章標籤" />
      <TitleInput placeholder="標題" />
      <Editor editorState={editorState} onChange={onChange} />
    </Wrapper>
  );
}
