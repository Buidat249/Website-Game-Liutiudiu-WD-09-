import React from 'react'
import '../styles/style.scss'
import logo from './public/external/logoliu.png';
import searchIcon from './public/external/timkiem.png';
import userAvatar from './public/external/avatar-khach-hang-2-52544.png';
import cartIcon from './public/external/cart icon.png';
import { Link } from 'react-router-dom';

type Props = {}

const Header = (props: Props) => {

  // Lấy thông tin người dùng từ localStorage
  const user = JSON.parse(localStorage.getItem('user') || '{}');

  
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
                  <span>Xin chào, {user.username} </span>
                ) : (
                  // Nếu chưa đăng nhập, hiển thị các liên kết đăng ký và đăng nhập
                  <>
                    <Link to="/register" style={{ marginRight: '15px' }}>
                      <span>Đăng kí</span>
                    </Link>
                    /
                    <Link to="/login" style={{ marginLeft: '15px' }}>
                      <span>Đăng nhập</span>
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
}

export default Header