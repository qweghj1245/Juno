import { Row } from "@styles/flexStyle";
import fontStyle from "@styles/fontStyle";
import sizeStyle from "@styles/sizeStyle";
import React from "react";
import styled from "styled-components";
// import GoodIconActive from '@assets/icons/lnr-thumbs-up@3x.png';
// import BadIconActive from '@assets/icons/lnr-thumbs-down@3x.png';

const Wrapper = styled(Row)`
  padding: 12px 17px;
  border-bottom: solid 1px ${({ theme: { color } }) => color.grey100};
`;

const Scope = styled(Row)`
  justify-content: space-between;
  min-width: 78px;
  border-radius: 20px;
  margin-right: 12px;
  padding: 8px 14px;
  border: solid 1px ${({ theme: { color } }) => color.grey100};
`;

const Count = styled.span`
  color: ${({ theme: { color } }) => color.grey500};
  ${fontStyle("16px", "22px")};
`;

const CustomImage = styled.img`
  ${sizeStyle("21px", "21px")};
  object-fit: contain;
`;

export default function Evaluation() {
  return (
    <Wrapper>
      <Scope>
        <CustomImage src="/static/icon_thumbsup_gray@3x.png" alt="thumbs up" />
        <Count>12</Count>
      </Scope>
      <Scope>
        <CustomImage
          src="/static/icon_thumbsdown_gray@3x.png"
          alt="thumbs down"
        />
        <Count>12</Count>
      </Scope>
    </Wrapper>
  );
}
