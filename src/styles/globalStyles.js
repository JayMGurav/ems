import { globalCss } from "@/styles/stitches.config";

const globalStyles = globalCss({
  body: {
    padding: 0,
    margin: 0,
    fontFamily: "$body",
    background: "$bgColor",
    color: "$gray50",
    w: "$full",
    minHeight: "100vh",
  },
  a: {
    color: "inherit",
    textDecoration: "none",
  },
  "*+*": {
    boxSizing: "border-box",
  },

  "::-webkit-scrollbar": {
    w: "25px",
    h: "25px",
    cursor: "pointer",
    backgroundColor: "inherit",
  },

  "::-webkit-scrollbar-track": {
    borderRadius: "4px",
    bg: "transparent",
  },

  "::-webkit-scrollbar-thumb": {
    minHeight: "60px",
    bg: "$blue50",
    backgroundClip: "padding-box",
    border: "10px solid transparent",
    borderRadius: "15px",
  },

  "::-webkit-scrollbar-thumb:hover": {
    border: "8px solid transparent",
  },
});

export default globalStyles;
