import styled from "styled-components/macro";

export const FlexWrapper = styled.div(
  (props) => `
  width: ${props.width || "100%"};
  height: ${props.height || "auto"};
  min-width: ${props.minWidth || "auto"};
  display: flex;
  flex-direction: ${props.direction || "column"};
  justify-content: ${props.justifyContent || "flex-start"};
  align-items: ${props.alignItems || "flex-start"};
  margin: ${props.viewMargin || "0px"};
  padding: ${props.viewPadding || "0px"};
  flex-basis: ${props.flexBasis || "auto"};
  border: ${props.border || "none"};
  background: ${props.background || "transparent"};
  flex-wrap: ${props.flexWrap || "nowrap"};
  border-radius: ${props.borderRadius || "0"};
  position: ${props.position || "static"};
  box-shadow: ${props.boxShadow || "none"};
  cursor: ${props.cursor || "default"};
  overflow: ${props.overflow || "initial"};
  background-size: cover;
`
);