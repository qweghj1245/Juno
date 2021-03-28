import Editor from "@draft-js-plugins/editor";
import fontStyle from "@styles/fontStyle";
import sizeStyle from "@styles/sizeStyle";
import { convertFromRaw, convertToRaw, EditorState } from "draft-js";
import draftToHtml from "draftjs-to-html";
import React, { useMemo, useState } from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  position: relative;
  padding-top: 39px;
  display: flex;
  flex-direction: column;

  .DraftEditor-root {
    padding: 12px 16px 16px;
    height: calc(100vh - 263px);
    ${fontStyle("14px", "17px")};
  }
`;

const Complete = styled.button`
  position: absolute;
  top: 19px;
  right: 16px;
  background: ${({ theme: { color } }) => color.grey100};
  padding: 16px 12px;
  ${fontStyle("12px", "17px")};
`;

const Avator = styled.img`
  margin: 0 auto 12px auto;
  border-radius: 50%;
  background: ${({ theme: { color } }) => color.grey100};
  ${sizeStyle("64px", "64px")};
`;

const Label = styled.h3`
  margin-left: 14px;
  margin-top: 12px;
  color: ${({ theme: { color } }) => color.grey500};
  ${fontStyle("12px", "17px")};
`;

const NameInput = styled.input`
  padding: 8px 16px;
  border: 0;
  border-bottom: solid 1px ${({ theme: { color } }) => color.grey100};
  ${fontStyle("14px", "20px", "bold")};
`;

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

export default function MemberEditor() {
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

  return (
    <Wrapper>
      <Avator />
      <Label>名稱欄位</Label>
      <NameInput
        contentEditable
        onInput={(e: any) => console.log(e.target.innerText)}
      />
      <Label>個人簡介</Label>
      <Editor editorState={editorState} onChange={onChange} />
      <Complete>完成</Complete>
    </Wrapper>
  );
}
