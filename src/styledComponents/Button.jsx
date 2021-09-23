import { styled } from "@/styles/stitches.config";

const Button = styled("button", {
  px: "$4",
  py: "$2",
  fontSize: "$md",
  borderRadius: "$lg",
  border: "$0",
  color: "white",
  "&:hover": {
    cursor: "pointer",
  },
  variants: {
    filled: {
      blue: {
        backgroundColor: "$blue300",
        "&:hover": {
          backgroundColor: "$blue400",
        },
      },
      gray: {
        backgroundColor: "$fg2",
        "&:hover": {
          backgroundColor: "$fg3",
        },
      },
    },
    size: {
      sm: {
        fontSize: "$sm",
        p: "$2 $4",
      },
      lg: {
        fontSize: "$lg",
        p: "$3 $5",
      },
    },
    outlined: {
      true: {
        border: "1px solid $blue800",
        background: "none",
      },
    },
  },
});

export default Button;
