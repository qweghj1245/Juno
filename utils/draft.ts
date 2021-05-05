import axios from "axios";
import {
  AtomicBlockUtils,
  ContentState,
  convertToRaw,
  EditorState,
} from "draft-js";
import draftToHtml from "draftjs-to-html";
import htmlToDraft from "html-to-draftjs";
import getConfig from "next/config";

const { publicRuntimeConfig } = getConfig();

class Draft {
  constructor() {}

  public draftjsToHTML = (editorState: EditorState) => {
    const json = convertToRaw(editorState.getCurrentContent());
    return draftToHtml(json, {}, false, ({ type, data }) => {
      if (type === "IMAGE") {
        return `<img src="${data.src}" alt="" />`;
      }
    });
  };

  public htmlToDraftjs = (html: any) => {
    const blocksFromHtml = htmlToDraft(html);
    const { contentBlocks, entityMap } = blocksFromHtml;
    const contentState = ContentState.createFromBlockArray(
      contentBlocks,
      entityMap
    );
    const editorState = EditorState.createWithContent(contentState);
    return editorState;
  };

  public insertImage = (
    editorState: EditorState,
    base64: string
  ): EditorState => {
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

  public fetchImgurUrl = async (file: any) => {
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
}

const draft = new Draft();

export default draft;
