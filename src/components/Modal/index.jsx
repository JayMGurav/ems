import {
  forwardRef,
  useState,
  useImperativeHandle,
  useCallback,
  useEffect,
} from "react";
import { createPortal } from "react-dom";

import {
  ModalContainer,
  ModalOverlay,
  ModalBody,
  ModalCloseBtn,
  ModalBodyContainer,
} from "./Modal.style";

function Modal(props, ref) {
  const [isOpen, setIsOpen] = useState(false);
  const [mountPoint, setMountPoint] = useState(null);

  useEffect(() => {
    const modalMountPoint = document.getElementById("modal-mount-point");
    setMountPoint(modalMountPoint);
    return () => void setMountPoint(null);
  }, []);

  const open = useCallback(() => {
    setIsOpen(true);
  }, []);

  const close = useCallback(() => {
    setIsOpen(false);
  }, []);

  useImperativeHandle(
    ref,
    () => ({
      open,
      close,
    }),
    [open, close]
  );

  return mountPoint
    ? createPortal(
        isOpen ? (
          <ModalContainer>
            <ModalOverlay onClick={close} />
            <ModalBodyContainer>
              <ModalCloseBtn onClick={close}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="30"
                  height="30"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </ModalCloseBtn>
              <ModalBody>{props.children}</ModalBody>
            </ModalBodyContainer>
          </ModalContainer>
        ) : null,
        mountPoint
      )
    : null;
}

export default forwardRef(Modal);
