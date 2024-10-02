import React from "react";
import "./index.css";
import { Popover, Space } from "antd";
export function PopoverEvent({ children, content, trigger }) {
  return (
    <>
      <Space wrap>
        <Popover content={content} trigger={trigger}>
          {children}
        </Popover>
      </Space>
    </>
  );
}
