import React, { useState } from "react";
import {
 
  TagsOutlined,
 
  UserOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Breadcrumb, Layout, Menu, theme } from "antd";
import { NavLink, Outlet } from "react-router-dom";
import { useLocation } from "react-router-dom";

const { Header, Content, Footer, Sider } = Layout;

type MenuItem = Required<MenuProps>["items"][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[]
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
  } as MenuItem;
}

const LayoutAdmin: React.FC = () => {
  const { Header, Content, Footer } = Layout;
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();
  const pathSnippets = location.pathname.split("/").filter((i) => i);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
      >
        <div className="demo-logo-vertical" />
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["1"]}
          items={[
            {
              key: "1",
              icon: <UserOutlined />,
              label: <NavLink to="/admin">Thống kê</NavLink>,
            },
            {
              key: "2",
              icon: <VideoCameraOutlined />,
              label: (
                <NavLink to="/admin/brands">Quản lý hãng phát triển</NavLink>
              ),
            },
            {
              key: "3",
              icon: <TagsOutlined />,
              label: <NavLink to="/admin/carts">Quản lý giỏ hàng</NavLink>,
            },
            {
              key: "4",
              icon: <TagsOutlined />,
              label: <NavLink to="/admin/categories">Quản lý thể loại</NavLink>,
            },
            {
              key: "5",
              icon: <TagsOutlined />,
              label: <NavLink to="/admin/games">Quản lý game</NavLink>,
            },
            {
              key: "6",
              icon: <TagsOutlined />,
              label: <NavLink to="/admin/orders">Quản lý đơn hàng</NavLink>,
            },
            {
              key: "7",
              icon: <TagsOutlined />,
              label: (
                <NavLink to="/admin/payment_methods">
                  Quản lý phương thức thanh toán
                </NavLink>
              ),
            },
            {
              key: "8",
              icon: <TagsOutlined />,
              label: <NavLink to="/admin/platforms">Quản lý nền tảng</NavLink>,
            },
            {
              key: "9",
              icon: <TagsOutlined />,
              label: <NavLink to="/admin/reviews">Quản lý bình luận</NavLink>,
            },
            {
              key: "10",
              icon: <TagsOutlined />,
              label: <NavLink to="/admin/users">Quản lý người dùng</NavLink>,
            },
            {
              key: "11",
              icon: <TagsOutlined />,
              label: <NavLink to="/admin/roles">Quản lý quyền</NavLink>,
            },

            {
              key: "12",
              icon: <TagsOutlined />,
              label: <NavLink to="/admin/filters">Quản lý danh mục</NavLink>,
            },

            {
              key: "13",
              icon: <TagsOutlined />,
              label: <NavLink to="/admin/descriptions">Quản lý mô tả</NavLink>,
            },

            
            {
              key: "14",
              icon: <TagsOutlined />,
              label: <NavLink to="/admin/description_details">Quản lý mô tả chi tiết</NavLink>,
            },
            {
              key: "15",
              icon: <TagsOutlined />,
              label: <NavLink to="/admin">Quản lý tài khoản</NavLink>,
            },
            {
              key: "16",
              icon: <TagsOutlined />,
              label: <NavLink to="/admin/tintucs">Quản lý tin tuc</NavLink>,
            },
            {
              key: "17",
              icon: <TagsOutlined />,
              label: <NavLink to="/admin/categorynews">Quản lý danh mục tin tức</NavLink>,
            },
            {
              key: "18",
              icon: <TagsOutlined />,
              label: <NavLink to="/admin/keys">Quản lý Keys</NavLink>,
            },
          ]}
        />
      </Sider>
      <Layout>
        <Header style={{ padding: 0, background: colorBgContainer }} />
        <Content style={{ margin: "0 16px" }}>
          <Breadcrumb style={{ margin: "16px 0" }}>
            {pathSnippets.map((snippet, index) => (
              <Breadcrumb.Item key={index}>
                {snippet.charAt(0).toUpperCase() + snippet.slice(1)}
              </Breadcrumb.Item>
            ))}
          </Breadcrumb>

          <div
            style={{
              padding: 24,
              minHeight: 360,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            <Outlet />
          </div>
        </Content>
        <Footer style={{ textAlign: "center" }}>
          Ant Design ©{new Date().getFullYear()} Created by Ant UED
        </Footer>
      </Layout>
    </Layout>
  );
};

export default LayoutAdmin;
