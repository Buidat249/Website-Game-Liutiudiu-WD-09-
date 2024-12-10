import React, { useEffect, useState } from "react";
import "../styles/style.scss";
import logo from "./public/external/Remove-bg.ai_1731345887334.png";
import searchIcon from "./public/external/timkiem.png";
import userAvatar from "./public/external/avatar-khach-hang-2-52544.png";
import cartIcon from "./public/external/cart icon.png";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { message } from "antd"; // Đảm bảo bạn đã import message từ antd

type Props = {};

interface Cart {
  cart_id: number;
  user_id: number;
  games: { game_id: number; quantity: number }[]; // Mảng game trong giỏ hàng
}

interface Game {
  game_id: number;
  brand_id: number;
  category_id: number;
  platform_id: number;
  name: string;
  price: number;
  discount: number;
  final_price: number;
  image: string;
  title: string;
  description: string;
}

const Header = (props: Props) => {
  const [carts, setCarts] = useState<Cart[]>([]);
  const [gameCount, setGameCount] = useState(0);
  const navigate = useNavigate();

  // Cập nhật số lượng game trong giỏ hàng
  const updateGameCount = () => {
    const count = carts.reduce(
      (total, cart) => total + (cart.games?.length || 0),
      0
    );
    setGameCount(count);
  };

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user") || "{}");

    if (user.user_id) {
      const intervalId = setInterval(() => {
        // Polling giỏ hàng mỗi 5 giây
        axios
          .get(`http://localhost:8080/carts/${user.user_id}`)
          .then((response) => {
            if (response.data && response.data.data) {
              setCarts([response.data.data]); // Cập nhật lại giỏ hàng
            } else {
              setCarts([]);
            }
          })
          .catch((error) => {
            console.error("Error fetching carts:", error);
          });
      }, 1000); // Cập nhật giỏ hàng mỗi 5 giây

      return () => {
        clearInterval(intervalId); // Dọn dẹp interval khi component bị hủy
      };
    }
  }, []); // Chạy một lần khi component mount

  useEffect(() => {
    updateGameCount(); // Cập nhật số lượng game trong giỏ hàng khi carts thay đổi
  }, [carts]);

  // Hàm đăng xuất
  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("cart");
    window.location.reload(); // Refresh để cập nhật lại giao diện hoặc dùng state quản lý
    navigate("/login");
  };

  // Hàm xử lý khi người dùng click vào giỏ hàng
  const handleGoToCart = () => {
    const user = JSON.parse(localStorage.getItem("user") || "{}");

    if (!user.user_id) {
      message.warning("Vui lòng đăng nhập để tiếp tục đến giỏ hàng!");
      navigate("/login");
    } else {
      navigate("/cart");
    }
  };
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  return (
    <div>
      <header>
        <div className="top-bar">
          <div className="top-bar-content">
            <span>Kết nối yêu thương cùng Liutiudiu Shop</span>
            <nav>
              <a href="createaccout">Hướng dẫn mua hàng</a>
              {user.role_id === 0 && (
                <a href="/admin">Chuyển đến admin</a>
              )}
              {user.username && (
                <a onClick={handleLogout} href="#">
                  Đăng xuất
                </a>
              )}
            </nav>
          </div>
        </div>


        <div className="main-header">
          <div className="main-header-content">
            <div className="logo">
              <img src={logo} alt="Liutuidiu logo" />
              <span>Liutiudiu Shop</span>
            </div>
            <div className="search-bar">
              <input type="text" placeholder="Tìm kiếm sản phẩm" />
              <button type="submit">
                <img src={searchIcon} alt="Search Icon" />
              </button>
            </div>
            <div className="user-cart">
              <div className="user-info">
                {user.username ? (
                  <div className="flex justify-between items-center">
                    <Link to="/user/profile" style={{ marginRight: "15px" }}>
                      <img src={user.avatar} alt="User Avatar" />
                    </Link>
                    <span>{user.username}</span>
                  </div>
                ) : (
                  <>
                    <Link to="/register" style={{ marginRight: "15px" }}>
                      <span>Đăng kí</span>
                    </Link>
                    /
                    <Link to="/login" style={{ marginLeft: "15px" }}>
                      <span>Đăng nhập</span>
                    </Link>
                  </>
                )}
              </div>
              <div className="cart">
                <a onClick={handleGoToCart}>
                  <img src={cartIcon} alt="Cart Icon" />
                  <span className=" flex justify-between items-center">Giỏ hàng
                    <p style={{ marginRight: "5px", marginLeft: "5px", paddingRight: "5px", paddingLeft: "5px", backgroundColor: "white", borderRadius: "5px", color: "black" }}>{gameCount}</p>
                  </span>
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="main-nav">
          <div className="main-nav-content">
            <Link to="/">Trang chủ</Link>
            <Link to="/games">Sản phẩm</Link>
            <Link to="/tintucs">Tin tức</Link>
            <Link to="/contact">Liên hệ</Link>
            <Link to="/paymentMethods">Hình thức thanh toán</Link>
          </div>
        </div>
      </header>
    </div>
  );
};

export default Header;
