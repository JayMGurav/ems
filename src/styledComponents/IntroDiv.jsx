import { styled } from "@/styles/stitches.config";

const IntroDiv = styled("div", {
  maxWidth: "100%",
  py: "$6",
  px: "$2",
  my: "$8",
  bg: "$fg",
  d: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  borderRadius: "$lg",
  gap: "$2",
  "& h1": {
    mb: "$1",
  },
});

export default IntroDiv;
