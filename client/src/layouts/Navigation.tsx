import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, Layout } from "antd";
import type { MenuProps, MenuTheme } from "antd/lib/menu";
import {
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";
const { Sider } = Layout;

// type MenuItems = Required<MenuProps["items"]>;
interface MenuItem {
  key: string;
  path: string;
  icon: React.ReactNode;
  label: React.ReactNode;
}

const menuItems: MenuItem[] = [
  {
    key: "home",
    path: "/",
    icon: <UserOutlined />,
    get label() {
      return <Link to={this.path}>Home</Link>;
    },
  },
  {
    key: "images",
    path: "/images",
    icon: <VideoCameraOutlined />,
    get label() {
      return <Link to="/images">Photo Album</Link>;
    },
  },
  {
    key: "setting",
    path: "/setting",
    icon: <UploadOutlined />,
    get label() {
      return <Link to="/setting">Setting</Link>;
    },
  },
];

const defaultMenuItemKey = menuItems[1].key;

function Navigation() {
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(true);
  const [current, setCurrent] = useState(getDefaultSelectedKey());

  function getDefaultSelectedKey(): string {
    return (
      menuItems.find((item) => location.pathname === item.path)?.key ||
      defaultMenuItemKey
    );
  }

  const onClickMenu: MenuProps["onClick"] = (e) => setCurrent(e.key);

  return (
    <Sider trigger={null} collapsible collapsed={collapsed}>
      <div className="logo" />
      <Menu
        theme="dark"
        mode="inline"
        selectedKeys={[current]}
        // defaultSelectedKeys={[getDefaultSelectedKey()]}
        items={menuItems}
        onClick={onClickMenu}
      />
    </Sider>
  );
}

export default Navigation;

/**
 * ref: https://v5.reactrouter.com/web/example/auth-workflow
 */
