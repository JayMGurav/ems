import { styled } from "@/styles/stitches.config";

const ErrorMessage = styled("div", {
  maxWidth: "$xl",
  mx: "auto",
  my: "$2",
  p: "$2",
  bg: "$red100",
  color: "$red500",
  borderRadius: "$md",
});

export default ErrorMessage;
