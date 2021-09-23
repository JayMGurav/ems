import { styled, css } from "@/styles/stitches.config";

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
  color: "$red100",
  fontSize: "$sm",
  mt: "$1",
});

function Input({ label, errorMessage, ...props }) {
  return (
    <InputDiv>
      <Label>{label}</Label>
      <StyledInput {...props} />
      {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
    </InputDiv>
  );
}

export default Input;
