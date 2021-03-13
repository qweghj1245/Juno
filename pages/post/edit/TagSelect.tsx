import useDebounce from "@hooks/useDebounce";
import {
  fetchCreateTag,
  fetchTags,
  setSelectTagId,
  tagState,
} from "@redux/tagSlice";
import { Row } from "@styles/flexStyle";
import fontStyle from "@styles/fontStyle";
import sizeStyle from "@styles/sizeStyle";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";

const Wrapper = styled.div`
  position: relative;
`;

const TagInput = styled.input`
  width: 100%;
  padding: 16px;
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

export default function TagSelect() {
  const dispatch = useDispatch();
  const { searchTags, newTags } = useSelector(tagState);

  const [focusTagInput, setFocusTagInput] = useState<boolean>(false);
  const [searchText, setSearchText] = useState<string>("");

  const fetchSearchTags = useDebounce((text: string) => {
    setSearchText(text);
    dispatch(fetchTags({ tagName: text }));
  }, 800);

  const fetchCreateTagAction = () => {
    dispatch(fetchCreateTag({ name: searchText }));
  };

  const addLocalTags = (tagId: number) => {
    dispatch(setSelectTagId(tagId));
    setFocusTagInput(false);
  };

  useEffect(() => {
    if (newTags.length > 0) {
      addLocalTags(newTags[newTags.length - 1].id);
    }
  }, [newTags]);

  return (
    <Wrapper>
      <TagInput
        placeholder="＋添加文章標籤"
        onFocus={() => setFocusTagInput(true)}
        onChange={(e) => fetchSearchTags(e.target.value)}
      />
      {focusTagInput && (
        <TagContent>
          {searchTags.map((tag) => (
            <TagRow
              key={tag.id}
              justifyContent="space-between"
              onClick={() => addLocalTags(tag.id)}
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
