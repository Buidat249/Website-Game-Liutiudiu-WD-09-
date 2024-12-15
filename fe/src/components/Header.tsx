import React, { useEffect, useState } from "react";
import "../styles/style.scss";
import logo from "./public/external/Remove-bg.ai_1731345887334.png";
import searchIcon from "./public/external/timkiem.png";
import cartIcon from "./public/external/cart icon.png";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { message } from "antd";

type Props = {};

interface Cart {
  cart_id: number;
  user_id: number;
  games: { game_id: number; quantity: number }[]; // Mảng game trong giỏ hàng
}

interface User {
  user_id: number;
  username: string;
  avatar: string;
  role_id: number;
}

const Header = (props: Props) => {
  const [carts, setCarts] = useState<Cart[]>([]);
  const [gameCount, setGameCount] = useState(0);
  const [user, setUser] = useState<User | null>(null); // State lưu thông tin user
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
    const localUser = JSON.parse(localStorage.getItem("user") || "{}");

    if (localUser.user_id) {
      // Fetch thông tin user từ API
      axios
        .get(`http://localhost:8080/users/${localUser.user_id}`)
        .then((response) => {
          if (response.data.data) {
            setUser(response.data.data); // Cập nhật thông ti  n user vào state
          }
        })
        .catch((error) => {
          console.error("Error fetching user data:", error);
        });

      // Polling giỏ hàng mỗi 5 giây
      const intervalId = setInterval(() => {
        axios
          .get(`http://localhost:8080/carts/${localUser.user_id}`)
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
      }, 5000);

      return () => {
        clearInterval(intervalId); // Dọn dẹp interval khi component bị hủy
      };
    }
  }, []);

  useEffect(() => {
    updateGameCount(); // Cập nhật số lượng game trong giỏ hàng khi carts thay đổi
  }, [carts]);

  // Hàm đăng xuất
  const handleLogout = () => {
    localStorage.removeItem("user_id");
    localStorage.removeItem("user");
    localStorage.removeItem("money");
    if (user) {
      localStorage.removeItem(`${user.user_id}_favouriteGames`); // Xóa dữ liệu yêu thích
    }
    window.location.reload(); // Refresh để cập nhật lại giao diện hoặc dùng state quản lý
    navigate("/login");
  };

  // Hàm xử lý khi người dùng click vào giỏ hàng
  const handleGoToCart = () => {
    if (!user) {
      message.warning("Vui lòng đăng nhập để tiếp tục đến giỏ hàng!");
      navigate("/login");
    } else {
      navigate("/cart");
    }
  };

  return (
    <div>
      <header>
        <div className="top-bar">
          <div className="top-bar-content">
            <span>Kết nối yêu thương cùng Liutiudiu Shop</span>
            <nav>
              <Link to="/chatbox">Chat</Link>
              <Link to="/contact/turtorbuy">Hướng dẫn mua hàng</Link>
              {user?.role_id === 0 && (
                <Link to="/admin">Chuyển đến admin</Link>
              )}

              {user?.username && (
                <button style={{marginLeft: '15px'}} onClick={handleLogout} className="logout-button">
                  Đăng xuất
                </button>
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
              <input
                type="text"
                className="text-black"
                placeholder="Tìm kiếm sản phẩm"
              />
              <button type="submit">
                <img src={searchIcon} alt="Search Icon" className="w-6 h-6" />
              </button>
            </div>
            <div className="user-cart">
              <div className="user-info">
                {user ? (
                  <div className="flex justify-between items-center">
                    <Link to="/user/profile" style={{ marginRight: "15px" }}>
                      <img src={user.avatar} alt="User Avatar" />
                    </Link>
                    <span>{user.username}</span>
                  </div>
                ) : (
                  <>
                    <Link
                      to="/register"
                      className="mr-3 text-gray-500 font-semibold hover:text-white hover:underline hover:scale-125 transition-all duration-300"
                    >
                      Đăng kí
                    </Link>
                    /
                    <Link
                      to="/login"
                      className="ml-3 text-gray-500 font-semibold hover:text-white hover:underline hover:scale-125 transition-all duration-300"
                    >
                      Đăng nhập
                    </Link>
                  </>
                )}
              </div>
              <div className="cart">
                <a onClick={handleGoToCart}>
                  <img src={cartIcon} alt="Cart Icon" />
                  <span className="flex justify-between items-center">
                    Giỏ hàng
                    <p
                      style={{
                        marginRight: "5px",
                        marginLeft: "5px",
                        paddingRight: "5px",
                        paddingLeft: "5px",
                        backgroundColor: "white",
                        borderRadius: "5px",
                        color: "black",
                      }}
                    >
                      {gameCount}
                    </p>
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
