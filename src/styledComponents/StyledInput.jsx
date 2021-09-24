import { styled } from "@/styles/stitches.config";

const StyledInput = styled("input", {
  p: "$4",
  backgroundColor: "$fg",
  color: "white",
  borderRadius: "$lg",
  border: "none",
  "&:active, &:focus": {
    border: "none",
    outline: "none",
  },
});

export default StyledInput;
