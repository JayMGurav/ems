import { styled } from "@/styles/stitches.config";

const Form = styled("form", {
  maxWidth: "$lg",
  w: "$sm",
  mx: "auto",
  p: "$4",
  backgroundColor: "$fg",
  borderRadius: "$lg",
  d: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  "& h2": {
    mt: "$2",
    mb: "$8",
    textAlign: "center",
  },
  "& a": {
    color: "$blue500",
  },
});

export default Form;
