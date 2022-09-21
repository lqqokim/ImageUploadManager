import React from "react";
// import "antd/dist/antd.css";
import "antd/dist/antd.min.css";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import { Layout } from "antd";
import Navigation from "./layouts/Navigation";
import Header from "./layouts/Header";
import Home from "./pages/Home";
import PhotoAlbum from "./pages/PhotoAlbum";
import Setting from "./pages/Setting";
import Error from "./pages/Error";

const { Content } = Layout;

function App() {
  return (
    <Layout>
      <Navigation />

      <Layout className="site-layout">
        <Header />

        <Content
          className="site-layout-background"
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
          }}
        >
          <Routes>
            <Route key="1" path="/" element={<Home />} />
            <Route key="2" path="images" element={<PhotoAlbum />} />
            <Route key="3" path="setting" element={<Setting />} />
            <Route key="4" path="*" element={<Error />} />
          </Routes>
        </Content>
      </Layout>
    </Layout>
  );
}

export default App;
