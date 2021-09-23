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
    margin: 0,
    padding: 0,
    boxSizing: "border-box",
  },
});

export default globalStyles;
