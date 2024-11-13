import React, { useEffect, useState } from "react";
import "../styles/style.scss";
import logo from "./public/external/Remove-bg.ai_1731345887334.png";
import searchIcon from "./public/external/timkiem.png";
import userAvatar from "./public/external/avatar-khach-hang-2-52544.png";
import cartIcon from "./public/external/cart icon.png";
import { Link } from "react-router-dom";
import axios from "axios";

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

  const updateGameCount = () => {
    const count = carts.reduce((total, cart) => total + (cart.games?.length || 0), 0);
    setGameCount(count);
  };

  const addGameToCart = (gameId:any) => {
    // Tìm giỏ hàng của người dùng
    const updatedCarts = [...carts];
    const cartIndex = updatedCarts.findIndex(cart => cart.user_id === user.user_id);
  
    // Nếu tìm thấy giỏ hàng của người dùng, thêm game vào giỏ
    if (cartIndex !== -1) {
      const gameIndex = updatedCarts[cartIndex].games.findIndex(game => game.game_id === gameId);
      if (gameIndex !== -1) {
        // Nếu game đã có trong giỏ, tăng số lượng lên 1
        updatedCarts[cartIndex].games[gameIndex].quantity += 1;
      } else {
        // Nếu game chưa có trong giỏ, thêm mới
        updatedCarts[cartIndex].games.push({ game_id: gameId, quantity: 1 });
      }
    }
  
    // Cập nhật lại carts
    setCarts(updatedCarts);
  };
  

  useEffect(() => {
    axios
      .get("http://localhost:8080/carts")
      .then((response) => {
        setCarts(response.data.data);
      })
      .catch((error) => {
        console.error("Error fetching carts:", error);
      });

    axios
      .get("http://localhost:8080/games")
      .then((response) => {
        setGames(response.data.data);
      })
      .catch((error) => {
        console.error("Error fetching games:", error);
      });
  }, []);

  useEffect(() => {
    updateGameCount();  // Tính lại số lượng game trong giỏ hàng
  }, [carts]); // Mỗi khi `carts` thay đổi, hàm này sẽ được gọi
  

  // Lấy thông tin người dùng từ localStorage
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  return (
    <div>
      <header>
        <div className="top-bar">
          <div className="top-bar-content">
            <span>Kết nối yêu thương cùng Tinder Plus</span>
            <nav>
              <a href="#">Hướng dẫn mua hàng</a>
              <a href="#">Ưu đãi khách hàng</a>
              <a href="#">Thông tin liên hệ</a>
            </nav>
          </div>
        </div>

        <div className="main-header">
          <div className="main-header-content">
            <div className="logo">
              <img src={logo} alt="Luutuidiu logo" />
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
                  // Nếu người dùng đã đăng nhập, hiển thị tên người dùng và liên kết đăng xuất
                  <span>
                    {user.avatar}
                    {user.username}
                  </span>
                ) : (
                  // Nếu chưa đăng nhập, hiển thị các liên kết đăng ký và đăng nhập
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
                <Link to="/cart">
                  <img src={cartIcon} alt="Cart Icon" />
                  <span>
                    Giỏ hàng({gameCount})
                  </span>
                  <span className="cart-count"></span>
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="main-nav">
          <div className="main-nav-content">
            <a href="/">Trang chủ</a>
            <a href="/games">Sản phẩm</a>
            <a href="#">Tin tức</a>
            <a href="#">Liên hệ</a>
            <a href="/paymentMethods">Hình thức thanh toán</a>
          </div>
        </div>
      </header>
    </div>
  );
};

export default Header;
