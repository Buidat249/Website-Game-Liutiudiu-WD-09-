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
  const [games, setGames] = useState<Game[]>([]);
  const [gameCount, setGameCount] = useState(0);
  const navigate = useNavigate();

  const updateGameCount = () => {
    const count = carts.reduce(
      (total, cart) => total + (cart.games?.length || 0),
      0
    );
    setGameCount(count);
  };

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user") || "{}");

    // Kiểm tra nếu người dùng đã đăng nhập
    if (user.user_id) {
      // Nếu đã đăng nhập, thực hiện yêu cầu API
      axios
        .get(`http://localhost:8080/carts/${user.user_id}`)
        .then((response) => {
          console.log(response.data); // Kiểm tra dữ liệu trả về
          if (response.data && response.data.data) {
            setCarts([response.data.data]); // Chuyển thành mảng nếu cần
          } else {
            setCarts([]);
          }
        })
        .catch((error) => {
          console.error("Error fetching carts:", error);
        });
    }

    // Lấy thông tin game
    axios
      .get("http://localhost:8080/games")
      .then((response) => {
        setGames(response.data.data);
      })
      .catch((error) => {
        console.error("Error fetching games:", error);
      });
  }, []); // Dependency array rỗng vì không cần phải chạy lại khi dữ liệu thay đổi

  useEffect(() => {
    updateGameCount(); // Tính lại số lượng game trong giỏ hàng
  }, [carts]); // Mỗi khi `carts` thay đổi, hàm này sẽ được gọi

  // Lấy thông tin người dùng từ localStorage
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  // Hàm đăng xuất
  const handleLogout = () => {
    // Xóa user khỏi localStorage
    localStorage.removeItem("user");
    localStorage.removeItem("cart"); // Xóa giỏ hàng khỏi localStorage nếu cần
    window.location.reload(); // Refresh để cập nhật lại giao diện hoặc dùng state quản lý
    navigate("/login"); // Điều hướng về trang đăng nhập
  };

  // Hàm xử lý khi người dùng click vào giỏ hàng
  const handleGoToCart = () => {
    const user = JSON.parse(localStorage.getItem("user") || "{}");

    if (!user.user_id) {
      // Nếu chưa đăng nhập, hiển thị thông báo yêu cầu đăng nhập
      message.warning("Vui lòng đăng nhập để tiếp tục đến giỏ hàng!");
      navigate("/login"); // Chuyển hướng về trang đăng nhập
    } else {
      // Nếu đã đăng nhập, chuyển đến trang giỏ hàng
      navigate("/cart");
    }
  };

  return (
    <div>
      <header>
        <div className="top-bar">
          <div className="top-bar-content">
            <span>Kết nối yêu thương cùng Tinder Plus</span>
            <nav>
              <a href="#">Hướng dẫn mua hàng</a>
              <a href="#">Ưu đãi khách hàng</a>
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
              <span>Liutuidiu</span>
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
                      <img src={user.avatar} alt="User Avatar"></img>
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
                <a onClick={handleGoToCart}> {/* Gọi hàm xử lý khi click vào giỏ hàng */}
                  <img src={cartIcon} alt="Cart Icon" />
                  <span>Giỏ hàng({gameCount})</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="main-nav">
          <div className="main-nav-content">
            <Link to="/">Trang chủ</Link>
            <Link to="/games">Sản phẩm</Link>
            <Link to="#">Tin tức</Link>
            <Link to="/contact">Liên hệ</Link>
            <Link to="/paymentMethods">Hình thức thanh toán</Link>
          </div>
        </div>
      </header>
    </div>
  );
};

export default Header;
