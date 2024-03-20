// MainLayout.jsx

import React, { useState } from "react";
import { Layout, Menu } from "antd";
import { DesktopOutlined, PieChartOutlined } from "@ant-design/icons";
import logo from "../assets/programming-hub.svg";
import { useNavigate, Outlet } from "react-router-dom";

const { Header, Content, Footer, Sider } = Layout;

function getItem(label, key, icon, children) {
  const unfocusedIconColor = "#888"; // replace with your desired color
  const unfocusedTextColor = "#888"; // replace with your desired color

  return {
    key,
    icon: React.cloneElement(icon, { style: { color: unfocusedIconColor } }),
    children,
    label,
    style: { color: unfocusedTextColor },
  };
}
const items = [
  getItem("Dashboard", "1", <PieChartOutlined />),
  getItem("Course", "2", <DesktopOutlined />),
];

const MainLayout = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();

  const handleMenuClick = ({ key }) => {
    switch (key) {
      case "1":
        navigate("/");
        break;
      case "2":
        navigate("/course");
        break;
      default:
        break;
    }
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider
        style={{
          backgroundColor: "#161717",
          color: "#fff",
        }}
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}>
        <div className='logo'>
          <img src={logo} alt='Logo' />
        </div>
        <Menu
          style={{
            backgroundColor: "#1E1E1E",
            color: "#fff",
            borderRight: "none",
          }}
          defaultSelectedKeys={["1"]}
          mode='inline'
          items={items}
          onClick={handleMenuClick}
        />
      </Sider>
      <Layout>
        <Content
          style={{
            backgroundColor: "#1E1E1E",
            padding: "16px",
            overflow: "auto", // Add this line
            height: "calc(100vh - 64px)", // And this line
          }}>
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default MainLayout;
