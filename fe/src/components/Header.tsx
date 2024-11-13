import React from 'react';
import '../styles/style.scss';
import logo from './public/external/Remove-bg.ai_1731345887334.png';
import searchIcon from './public/external/timkiem.png';
import cartIcon from './public/external/cart icon.png';
import { Link, useNavigate } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();

  // Lấy thông tin người dùng từ localStorage
  const user = JSON.parse(localStorage.getItem('user') || '{}');

  // Hàm đăng xuất
  const handleLogout = () => {
    // Xóa user khỏi localStorage
    localStorage.removeItem('user');
    localStorage.removeItem('cart'); // Xóa giỏ hàng khỏi localStorage nếu cần
    window.location.reload(); // Refresh để cập nhật lại giao diện hoặc dùng state quản lý
    navigate("/login"); // Điều hướng về trang đăng nhập
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
                  <span>{user.username}</span>
                ) : (
                  <>
                    <Link to="/register" style={{ marginRight: '15px' }}>
                      Đăng kí
                    </Link>
                    /
                    <Link to="/login" style={{ marginLeft: '15px' }}>
                      Đăng nhập
                    </Link>
                  </>
                )}
              </div>
              <div className="cart">
                <Link to="/cart">
                  <img src={cartIcon} alt="Cart Icon" />
                  <span>Giỏ hàng</span>
                  <span className="cart-count">0</span>
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="main-nav">
          <div className="main-nav-content">
            <Link to="/">Trang chủ</Link>
            <Link to="/games">Sản phẩm</Link>
            <Link to="#">Tin tức</Link>
            <Link to="#">Liên hệ</Link>
            <Link to="/paymentMethods">Hình thức thanh toán</Link>
          </div>
        </div>
      </header>
    </div>
  );
};

export default Header;
