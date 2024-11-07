import React from 'react'
import '../styles/style.scss'
import momo from './public/external/ngân hàng/momo.png';
import vnpay from './public/external/ngân hàng/vnpay.png';
import visa from './public/external/ngân hàng/visa.png';
import mastercard from './public/external/ngân hàng/mastercard.png';
import facebook from './public/external/logo/facebook.png';
import youtube from './public/external/logo/youtube.png';
import instar from './public/external/logo/instar.png';

type Props = {}

const Footer = (props: Props) => {
  return (
    <div>
      <div className="wrapper">
        <div className="content">
          {/* Nội dung khác */}
        </div>

        <div className="top-footer">
          <div className="payment-methods">
            <img src={momo} alt="Momo" />
            <img src={vnpay} alt="VNPay" />
            <img src={visa} alt="Visa" />
            <img src={mastercard} alt="MasterCard" />
            <span>và nhiều hình thức thanh toán khác</span>
          </div>
          <div className="social-media">
            <a href="#"><img src={facebook} alt="Facebook" /></a>
            <a href="#"><img src={youtube} alt="YouTube" /></a>
            <a href="#"><img src={instar} alt="Instagram" /></a>
          </div>
          <div className="footer-content">
            <div className="about">
              <h3>GIỚI THIỆU</h3>
              <ul>
                <li><a href="#">Game bản quyền là gì?</a></li>
                <li><a href="#">Giới thiệu Liutisidu Shop</a></li>
                <li><a href="#">Điều khoản dịch vụ</a></li>
                <li><a href="#">Chính sách bảo mật</a></li>
              </ul>
            </div>
            <div className="account">
              <h3>TÀI KHOẢN</h3>
              <ul>
                <li><a href="#">Đăng nhập</a></li>
                <li><a href="#">Đăng ký</a></li>
              </ul>
            </div>
            <div className="contact">
              <h3>LIÊN HỆ</h3>
              <ul>
                <li>Hotline tự động <span className="hotline">1900 888 8386</span></li>
                <li><a href="#">Liên hệ hỗ trợ</a></li>
                <li><a href="#">Chat với CSKH</a></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <footer>
        <p>&copy; 2024 Luutuidiu Store</p>
      </footer>
    </div>
  );
};

export default Footer