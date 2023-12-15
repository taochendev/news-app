import styled from "styled-components";

interface MaxLineProps {
  maxLine: number;
}

const MaxLine = styled.p<MaxLineProps>`
  -webkit-line-clamp: ${(props) => props.maxLine};
  -webkit-box-orient: vertical;
  text-overflow: ellipsis;
  overflow: hidden;
  display: -webkit-box;
`;

export default MaxLine;
