import styled from "styled-components";

export const Row = styled.div<{ justifyContent?: string; alignItems?: string }>`
  display: flex;
  justify-content: ${({ justifyContent }) => justifyContent};
  align-items: ${({ justifyContent }) => justifyContent || "center"};
`;

export default {};
