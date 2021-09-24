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
  boxShadow: "0 8px 32px 0 rgba( 31, 38, 135, 0.37 )",
  backdropFilter: "blur(12px)",
  maxHeight: "60vh",
  maxWidth: "60%",
  overflow: "auto",
});

export const ModalBody = styled("div", {
  position: "relative",
  borderRadius: "$lg",
  bg: "$fg1",
  p: "$4",
});

export const ModalCloseBtn = styled("button", {
  position: "absolute",
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
