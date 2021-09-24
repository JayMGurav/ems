import { styled } from "@/styles/stitches.config";

export const Table = styled("table", {
  tableLayout: "fixed",
  w: "100%",
  my: "$2",
  p: "$2",

  borderCollapse: "collapse",
  bg: "$fg3",
});

export const THead = styled("thead", {
  borderRadius: "$lg",
});

export const TH = styled("th", {
  bg: "$fg5",
  p: "$2",
  textAlign: "left",
});

export const TD = styled("td", {
  p: "$2",
  textAlign: "left",
});

export const TR = styled("tr", {});
