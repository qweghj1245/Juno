import { Row } from "@styles/flexStyle";
import fontStyle from "@styles/fontStyle";
import sizeStyle from "@styles/sizeStyle";
import React, { useState } from "react";
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

export default function TagSelect() {
  const [focusTagInput, setFocusTagInput] = useState<boolean>(false);

  return (
    <Wrapper>
      <TagInput
        placeholder="＋添加文章標籤"
        onFocus={() => setFocusTagInput(true)}
      />
      {focusTagInput && (
        <TagContent>
          <TagRow>
            <Text>省錢</Text>
            <Text>1024</Text>
          </TagRow>
          <TagRow>
            <Text>省錢</Text>
            <Text>1024</Text>
          </TagRow>
        </TagContent>
      )}
    </Wrapper>
  );
}
