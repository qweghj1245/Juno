import { css } from "styled-components";

const fontStyle = (
  fontSize: string,
  lineHeight: string,
  fontWeight?: string,
) => css`
  font-size: ${fontSize};
  line-height: ${lineHeight};
  font-weight: ${fontWeight || "normal"};
`;

export default fontStyle;
