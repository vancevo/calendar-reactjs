import React from "react";
import { Modal } from "antd";
import {
  maxWidthPopupSelection
} from "../lib/constants"
export function PopoverEvent({ visible, onClose, top, left, children }) {
  return (
    <Modal
      visible={visible}
      onCancel={onClose}
      mask={false}
      closable={false}
      footer={null}
      className="transition ease-in-out"
      style={{
        maxWidth: `${maxWidthPopupSelection}px`,
        top: top,
        left: left,
        position: "absolute"
      }}
    >
      <p>{children}</p>
    </Modal>
  );
}
