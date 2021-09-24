import { styled } from "@/styles/stitches.config";

export const ModalContainer = styled("div", {
  position: "fixed",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  zIndex: 99999,
  d: "flex",
  alignItems: "center",
  justifyContent: "center",
});

export const ModalOverlay = styled("div", {
  position: "absolute",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  bg: "rgba(13, 13, 13, 0.25)",
  backdropFilter: "blur(12px)",
});

export const ModalBody = styled("div", {
  position: "relative",
  p: "$4",
  maxHeight: "100%",
  overflowY: "scroll",
  overflowX: "auto",
});

export const ModalBodyContainer = styled("div", {
  position: "relative",
  maxHeight: "60vh",
  maxWidth: "60%",
  w: "fit-content",
  h: "100%",
  p: "$1",
  borderRadius: "$lg",
  bg: "$fg1",
  boxShadow: "0 8px 32px 0 rgba( 0, 0, 0, 0.37 )",
});

export const ModalCloseBtn = styled("button", {
  position: "absolute",
  zIndex: 999999,
  top: "-$10",
  right: "-$2",
  w: "$7",
  h: "$7",
  borderRadius: "$full",
  bg: "$blue100",
  outline: "none",
  border: "none",
  cursor: "pointer",
  d: "flex",
  alignItems: "center",
  justifyContent: "center",
  "& svg": {
    fill: "$red400",
  },
});
