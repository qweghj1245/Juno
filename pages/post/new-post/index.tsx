import Editor from "@draft-js-plugins/editor";
import { fetchCreatePost, postState, setIsNotCreate } from "@redux/postSlice";
import { tagState } from "@redux/tagSlice";
import { Row } from "@styles/flexStyle";
import fontStyle from "@styles/fontStyle";
import sizeStyle from "@styles/sizeStyle";
import axios from "axios";
import {
  AtomicBlockUtils,
  ContentState,
  convertFromRaw,
  convertToRaw,
  EditorState,
} from "draft-js";
import createImagePlugin from "draft-js-image-plugin";
import "draft-js/dist/Draft.css";
import draftToHtml from "draftjs-to-html";
import htmlToDraft from "html-to-draftjs";
import getConfig from "next/config";
import { useRouter } from "next/router";
import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import TagSelect from "./TagSelect";

const { publicRuntimeConfig } = getConfig();

const Wrapper = styled.div`
  height: 100vh;

  .DraftEditor-root {
    padding: 16px;
    border-top: solid 1px ${({ theme: { color } }) => color.grey100};
    height: calc(100vh - 233px);
    ${fontStyle("14px", "17px")};

    figure > img {
      width: 100%;
    }

    .DraftEditor-editorContainer {
      height: 100%;
    }

    .public-DraftEditor-content > div {
      height: inherit;
      overflow: scroll;
    }
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
  box-shadow: 0px 3px 12px #2853c74d;
  background: ${({ theme: { color } }) => color.primary};
  color: ${({ theme: { color } }) => color.white};
  ${fontStyle("12px", "17px", "bold")};
`;

const TitleInput = styled.input`
  width: 100%;
  padding: 16px;
  border: 0;
  ${fontStyle("20px", "27px", "bold")};
`;

const UploadButton = styled.button`
  background: #ededed;
  ${fontStyle("12px", "17px")};
  ${sizeStyle("48px", "48px")};
`;

const CustomLabel = styled.label`
  position: fixed;
  right: 24px;
  top: 84%;
  display: flex;
  align-items: center;
  z-index: 1;
`;

const CustomInputFile = styled.input`
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  top: 0px;
  opacity: 0;
  ${sizeStyle("48px", "48px")};
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

const imagePlugin = createImagePlugin();
const plugins = [imagePlugin];

export default function PostEditor() {
  const router = useRouter();

  const dispatch = useDispatch();
  const { isCreated, currentCategory } = useSelector(postState);
  const { selectTags } = useSelector(tagState);

  const [title, setTitle] = useState<string>("");
  const [editorState, setEditorState] = useState<EditorState>(
    EditorState.createWithContent(emptyContentState)
  );

  const onChange = (edt: EditorState) => {
    // {"blocks":[{"key":"2nr1i","text":"wwweeer","type":"sunstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}
    // const json = convertToRaw(edt.getCurrentContent());
    // console.log("1111", edt.getCurrentContent());
    // console.log("1", JSON.stringify(json)); // 字串化丟入 db
    // console.log("2", EditorState.createWithContent(convertFromRaw(json))); // convertFromRaw 轉成的格式是 ContentState, 但編輯器要的格式是 EditorState
    // console.log("3", edt); // EditorState
    setEditorState(edt);
  };

  const draftjsToHTML = useMemo(() => {
    const json = convertToRaw(editorState.getCurrentContent());
    return draftToHtml(json, {}, false, ({ type, data }) => {
      if (type === "IMAGE") {
        return `<img src="${data.src}" alt="" />`;
      }
    });
  }, [editorState]);

  const htmlToDraftjs = (html: any) => {
    const blocksFromHtml = htmlToDraft(html);
    const { contentBlocks, entityMap } = blocksFromHtml;
    const contentState = ContentState.createFromBlockArray(
      contentBlocks,
      entityMap
    );
    const editorState = EditorState.createWithContent(contentState);
    return editorState;
  };

  const fetchImgurUrl = async (file: any) => {
    if (file) {
      try {
        const formData = new FormData();
        formData.append("image", file);
        formData.append("album", publicRuntimeConfig.NEXT_IMGUR_ALBUM_ID);
        const response = await axios.post(
          "https://api.imgur.com/3/image/",
          formData,
          {
            headers: {
              "Content-type": "application/x-www-form-urlencoded",
              Authorization: `Bearer ${publicRuntimeConfig.NEXT_IMGUR_ACCESS_TOKEN}`,
            },
          }
        );
        return response.data.data.link;
      } catch (error) {
        return "";
      }
    }
    return "";
  };

  const insertImage = (editorState: EditorState, base64: string) => {
    const contentState = editorState.getCurrentContent();
    const contentStateWithEntity = contentState.createEntity(
      "IMAGE",
      "IMMUTABLE",
      { src: base64 }
    );
    const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
    const newEditorState = EditorState.set(editorState, {
      currentContent: contentStateWithEntity,
    });
    return AtomicBlockUtils.insertAtomicBlock(newEditorState, entityKey, " ");
  };

  const handleClick = async (file: any) => {
    const imgurUrl = await fetchImgurUrl(file);
    const newEditorState = insertImage(editorState, imgurUrl);
    setEditorState(newEditorState);
  };

  const deployPost = () => {
    dispatch(
      fetchCreatePost({
        title,
        content: draftjsToHTML,
        categoryId: currentCategory!,
        tags: selectTags.map((item) => item.id),
      })
    );
  };

  const goBack = () => {
    router.back();
  };

  useEffect(() => {
    if (isCreated) {
      dispatch(setIsNotCreate());
      router.push("/");
    }
  }, [isCreated]);

  useEffect(() => {
    if (currentCategory === null) {
      router.push("/");
    }
  }, []);

  return (
    <Wrapper>
      <ButtonWrapper>
        <Cancel onClick={goBack}>取消</Cancel>
        <Deploy onClick={deployPost}>發布</Deploy>
      </ButtonWrapper>
      <TagSelect />
      <TitleInput
        placeholder="標題"
        onChange={(e) => setTitle(e.target.value)}
      />
      <Editor editorState={editorState} plugins={plugins} onChange={onChange} />
      <CustomLabel htmlFor="image">
        <CustomInputFile
          type="file"
          id="image"
          name="image"
          accept="image/png, image/jpeg"
          onChange={(e) => handleClick(e.target.files![0])}
        />
        <UploadButton>上傳圖片</UploadButton>
      </CustomLabel>
    </Wrapper>
  );
}
