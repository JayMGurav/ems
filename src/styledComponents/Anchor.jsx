import { styled } from "@/styles/stitches.config";

const Anchor = styled("a", {
  mx: "$2",
  fontSize: "$md",
  color: "inherit",
  d: "inline-block",
  "&:hover": {
    cursor: "pointer",
  },
  variants: {
    color: {
      blue: {
        color: "$blue300",
        "&:hover": {
          color: "$blue400",
        },
      },
      gray: {
        color: "$fg2",
        "&:hover": {
          color: "$fg3",
        },
      },
    },
  },
});

export default Anchor;
