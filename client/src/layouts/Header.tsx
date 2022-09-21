import React, { useState } from "react";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { Layout } from "antd";
const { Header: AntHeader } = Layout;

function Header() {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <AntHeader className="site-layout-background" style={{ padding: 0 }}>
      {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
        className: "trigger",
        onClick: () => setCollapsed(!collapsed),
      })}
    </AntHeader>
  );
}

export default Header;
