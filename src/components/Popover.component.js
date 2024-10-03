import React, { useEffect } from "react";
import { Modal } from "antd";
import { maxWidthPopupSelection } from "../lib/constants";

export function PopoverEvent({ children, top, left, ...props }) {
  return (
    <Modal
      className="transition ease-in-out"
      style={{
        maxWidth: `${maxWidthPopupSelection}px`,
        top: top,
        left: left,
        position: "absolute",
      }}
      {...props}
    >
      <div>{children}</div>
    </Modal>
  );
}
