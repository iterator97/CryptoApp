import React, { useState, useEffect } from "react";
import { Button, Menu, Typography, Avatar } from "antd";
import { Link } from "react-router-dom";
import {
  CaretRightOutlined,
  HomeOutlined,
  BulbOutlined,
  FundOutlined,
  MenuOutlined,
  LoginOutlined,
  WechatOutlined,
} from "@ant-design/icons";
import { useSelector } from "react-redux";
import { userSelector } from "../../features/UserSlice";

import icon from "../../images/crypto-icon.png";
import "./Navbar.css";

const Navbar = () => {
  const [activeMenu, setActiveMenu] = useState(true);
  const [screenSize, setScreenSize] = useState(undefined);
  const { isSuccess, channels } = useSelector(userSelector);

  useEffect(() => {
    const handleResize = () => setScreenSize(window.innerWidth);

    window.addEventListener("resize", handleResize);

    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (screenSize <= 800) {
      setActiveMenu(false);
    } else {
      setActiveMenu(true);
    }
  }, [screenSize]);

  return (
    <div className="nav-container">
      <div className="logo-container">
        <Avatar src={icon} size="large" />
        <Typography.Title level={2} className="logo">
          <Link to="/">ICrypto</Link>
        </Typography.Title>
        <Button
          className="menu-control-container"
          onClick={() => setActiveMenu(!activeMenu)}
        >
          <MenuOutlined />
        </Button>
      </div>
      <div>
        {activeMenu && (
          <Menu theme="dark" mode="inline">
            <Menu.Item icon={<HomeOutlined />}>
              <Link to="/">Home</Link>
            </Menu.Item>
            <Menu.Item icon={<FundOutlined />}>
              <Link to="/cryptocurrencies">Cryptocurrencies</Link>
            </Menu.Item>
            <Menu.Item icon={<BulbOutlined />}>
              <Link to="/news">News</Link>
            </Menu.Item>
            {isSuccess && channels ? (
              <Menu.SubMenu
                key="sub1"
                title="Channels"
                theme="dark"
                className="menu-submenu"
                icon={<WechatOutlined />}
              >
                {channels.map((x) => {
                  return (
                    <Menu.Item
                      className="menu-submenu-item"
                      theme="dark"
                      icon={<CaretRightOutlined />}
                    >
                      {x}
                      <Link key={x.id} to={`/channels/${x}`}></Link>
                    </Menu.Item>
                  );
                })}
              </Menu.SubMenu>
            ) : null}

            <Menu.Item icon={<LoginOutlined />}>
              <Link to="/preAccount">Your account</Link>
            </Menu.Item>
          </Menu>
        )}
      </div>
    </div>
  );
};

export default Navbar;
