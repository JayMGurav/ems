import { styled, css } from "@/styles/stitches.config";
import { forwardRef } from "react";

const InputDiv = styled("div", {
  my: "$2",
  w: "100%",
});

const StyledInput = styled("input", {
  backgroundColor: "$fg1",
  border: "$0",
  borderRadius: "$md",
  fontSize: "$md",
  w: "$full",
  p: "$2",
  my: "$2",
  color: "$gray50",
  "&:active, &:focus": {
    border: "1px solid $blue400",
    outline: "1px solid $blue400",
  },
});

const Label = styled("label", {
  fontSize: "$sm",
  color: "$gray400",
  mb: "$1",
});
const ErrorMessage = styled("span", {
  color: "$red200",
  fontSize: "$sm",
  mt: "$1",
  mb: "$4",
});

function Input(props, ref) {
  return (
    <InputDiv>
      <Label>{props?.label}</Label>
      <StyledInput ref={ref} {...props} />
      {props?.error && <ErrorMessage>{props.error}</ErrorMessage>}
    </InputDiv>
  );
}

export default forwardRef(Input);
