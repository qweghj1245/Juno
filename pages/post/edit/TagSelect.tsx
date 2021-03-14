import { NewTag } from "@api/TagApi";
import useDebounce from "@hooks/useDebounce";
import {
  fetchCreateTag,
  fetchTags,
  setSearchTagsDelete,
  setSelectTag,
  setSelectTagDelete,
  tagState,
} from "@redux/tagSlice";
import { Row } from "@styles/flexStyle";
import fontStyle from "@styles/fontStyle";
import sizeStyle from "@styles/sizeStyle";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";

const Wrapper = styled.div`
  position: relative;
`;

const TagInput = styled.input<{ paddingLeft: string }>`
  width: 100%;
  padding: 16px;
  padding-left: ${({ paddingLeft }) => paddingLeft};
  border: 0;
  border-top: solid 1px ${({ theme: { color } }) => color.grey100};
  border-bottom: solid 1px ${({ theme: { color } }) => color.grey100};
  ${fontStyle("14px", "20px")};
`;

const TagContent = styled.div`
  position: absolute;
  top: 100%;
  z-index: 10;
  overflow-y: auto;
  background: ${({ theme: { color } }) => color.white};
  ${sizeStyle("100%", "calc(100vh - 174px)")};
`;

const TagRow = styled(Row)`
  padding: 20px 16px;
  border-bottom: solid 1px ${({ theme: { color } }) => color.grey100};
`;

const Text = styled.div`
  ${fontStyle("14px", "20px")};
`;

const AddTag = styled(TagRow)`
  color: ${({ theme: { color } }) => color.primary};
  ${fontStyle("14px", "20px", "bold")};
`;

const SelectTag = styled.div`
  padding: 8px 16px;
  margin-right: 8px;
  width: max-content;
  border-radius: 9px;
  ${fontStyle("14px", "20px")};
  background: ${({ theme: { color } }) => color.grey100};
`;

const SelectWrapper = styled.div`
  position: relative;
`;

const SelectTagWrapper = styled(Row)`
  position: absolute;
  top: 50%;
  left: 16px;
  transform: translateY(-50%);
`;

export default function TagSelect() {
  const dispatch = useDispatch();
  const { searchTags, newTags, selectTags } = useSelector(tagState);

  const [focusTagInput, setFocusTagInput] = useState<boolean>(false);
  const [searchText, setSearchText] = useState<string>("");
  const [inputPaddingLeft, setInputPaddingLeft] = useState<string>("");
  const [deleteCount, setDeleteCount] = useState<number>(0);

  const tagsRef = useRef<HTMLDivElement>(null);

  const fetchSearchTags = useDebounce((text: string) => {
    dispatch(fetchTags({ tagName: text }));
  }, 800);

  const fetchCreateTagAction = () => {
    dispatch(fetchCreateTag({ name: searchText }));
  };

  const onSearchText = (text: string) => {
    console.log(text);
    if (selectTags.length < 3) {
      setDeleteCount(0);
      setSearchText(text);
    }
  };

  const addLocalTags = (tag: NewTag) => {
    dispatch(setSelectTag(tag));
    dispatch(setSearchTagsDelete());
    setFocusTagInput(false);
    setSearchText("");
  };

  const onKeyPressDelete = (keyCode: number) => {
    if (keyCode === 8 && deleteCount > 1 && selectTags.length > 0) {
      const newSelectTags = [...selectTags];
      newSelectTags.pop();
      dispatch(setSelectTagDelete(newSelectTags));
    } else {
      setDeleteCount(deleteCount + 1);
    }
  };

  useEffect(() => {
    if (newTags.length > 0) {
      addLocalTags(newTags[newTags.length - 1]);
    }
  }, [newTags]);

  useEffect(() => {
    if (searchText) {
      fetchSearchTags(searchText);
    }
  }, [searchText]);

  useEffect(() => {
    setInputPaddingLeft(`${tagsRef!.current!.offsetWidth + 16}px`);
  }, [selectTags]);

  return (
    <Wrapper>
      <SelectWrapper>
        <TagInput
          paddingLeft={inputPaddingLeft}
          placeholder={selectTags.length === 0 ? "＋添加最多三個文章標籤" : ""}
          value={searchText}
          onFocus={() => setFocusTagInput(true)}
          onKeyDown={(e) => onKeyPressDelete(e.keyCode)}
          onChange={(e) => onSearchText(e.target.value)}
        />
        <SelectTagWrapper ref={tagsRef}>
          {selectTags.map((item) => (
            <SelectTag>{item.name}</SelectTag>
          ))}
        </SelectTagWrapper>
      </SelectWrapper>
      {focusTagInput && (
        <TagContent>
          {searchTags.map((tag) => (
            <TagRow
              key={tag.id}
              justifyContent="space-between"
              onClick={() => addLocalTags(tag)}
            >
              <Text>{tag.name}</Text>
              <Text>{tag.count}</Text>
            </TagRow>
          ))}
          {searchTags.length === 0 && searchText && (
            <AddTag
              onClick={fetchCreateTagAction}
            >{`增加 ${searchText} 標籤`}</AddTag>
          )}
        </TagContent>
      )}
    </Wrapper>
  );
}
