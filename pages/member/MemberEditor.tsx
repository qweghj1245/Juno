import fontStyle from "@styles/fontStyle";
import sizeStyle from "@styles/sizeStyle";
import React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  position: relative;
  padding-top: 39px;
  display: flex;
  flex-direction: column;
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

const NameInput = styled.div`
  padding: 8px 16px;
  border: 0;
  border-bottom: solid 1px ${({ theme: { color } }) => color.grey100};
  ${fontStyle("14px", "20px", "bold")};
`;

const DesciptionInput = styled.div`
  padding: 8px 16px;
  border: 0;
  border-bottom: solid 1px ${({ theme: { color } }) => color.grey100};
  ${fontStyle("14px", "20px")};
`;

export default function MemberEditor() {
  return (
    <Wrapper>
      <Avator />
      <Label>名稱欄位</Label>
      <NameInput
        contentEditable
        onInput={(e: any) => console.log(e.target.innerText)}
      />
      <Label>個人簡介</Label>
      <DesciptionInput
        contentEditable
        onInput={(e: any) => console.log(e.target.innerText)}
      />
      <Complete>完成</Complete>
    </Wrapper>
  );
}
