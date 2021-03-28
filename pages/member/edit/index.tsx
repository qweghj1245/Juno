import Editor from "@draft-js-plugins/editor";
import { fetchPatchMember, memberState } from "@redux/memberSlice";
import fontStyle from "@styles/fontStyle";
import sizeStyle from "@styles/sizeStyle";
import {
  ContentState,
  convertFromRaw,
  convertToRaw,
  EditorState,
} from "draft-js";
import draftToHtml from "draftjs-to-html";
import htmlToDraft from "html-to-draftjs";
import { useRouter } from "next/router";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
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

  .DraftEditor-editorContainer,
  .public-DraftEditor-content {
    height: 100%;
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
  const router = useRouter();

  const dispatch = useDispatch();
  const { memberProile, isPatchDone } = useSelector(memberState);

  const [name, setName] = useState<string>(memberProile!.name);
  const [editorState, setEditorState] = useState<EditorState>(
    EditorState.createWithContent(emptyContentState)
  );

  const draftjsToHTML = useMemo(() => {
    const json = convertToRaw(editorState.getCurrentContent());
    return draftToHtml(json);
  }, [editorState]);

  const htmlToDraftjs = useCallback((html: any) => {
    const blocksFromHtml = htmlToDraft(html);
    const { contentBlocks, entityMap } = blocksFromHtml;
    const contentState = ContentState.createFromBlockArray(
      contentBlocks,
      entityMap
    );
    const editorState = EditorState.createWithContent(contentState);
    return editorState;
  }, []);

  const onFinishEdit = () => {
    const payload = {
      name,
      description: draftjsToHTML,
    };

    dispatch(fetchPatchMember(payload));
  };

  useEffect(() => {
    if (isPatchDone) {
      router.push("/member");
    }
  }, [isPatchDone]);

  useEffect(() => {
    setEditorState(htmlToDraftjs(memberProile!.description));
  }, [memberProile]);

  return (
    <Wrapper>
      <Avator />
      <Label>名稱欄位</Label>
      <NameInput value={name} onChange={(e) => setName(e.target.value)} />
      <Label>個人簡介</Label>
      <Editor
        editorState={editorState}
        onChange={(edt) => setEditorState(edt)}
      />
      <Complete onClick={onFinishEdit}>完成</Complete>
    </Wrapper>
  );
}
