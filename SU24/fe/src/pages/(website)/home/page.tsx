import React from 'react'
import Banner from './_components/Banner'
import '../../../styles/style.scss'
import wkong from '../../../components/public/external/back wk.png';

type Props = {}

const HomePage = (props: Props) => {
  return (
    <div>
      <div className="main">
        <div className="banner">
          <div className="aside-left">
            <div>
              <img
                src={wkong}
                alt="Black Myth Wukong Banner"
              />
            </div>
            <div className="aside-left-small">
              <img
                src={wkong}
                alt="Black Myth Wukong Banner"
              />
              <img
                src={wkong}
                alt="Black Myth Wukong Banner"
              />
              <img
                src={wkong}
                alt="Black Myth Wukong Banner"
              />
            </div>

          </div>

          <div className="aside-right">
            <img
              src={wkong}
              alt="Black Myth Wukong Banner"
            />
            <img
              src={wkong}
              alt="Black Myth Wukong Banner"
            />
            <img
              src={wkong}
              alt="Black Myth Wukong Banner"
            />
          </div>
        </div>

        <div className="ad-section">
          <div className="ad">
            <p>Steam Nạp thẻ wallet</p>
          </div>
          <div className="ad">
            <p>Phần mềm thiết kế</p>
          </div>
          <div className="ad">
            <p>Phần mềm diệt Virus</p>
          </div>
          <div className="ad">
            <p>Microsoft Office bản quyền</p>
          </div>
        </div>

        <section className="products">
          <h2>Sản phẩm nổi bật</h2>
          <div className="product-grid">
            <div className="product">
              <img
                src="https://via.placeholder.com/200"
                alt="Black Myth Wukong"
              />
              <p>Black Myth Wukong - 1 Ngày</p>
              <p>Giá: 40.000đ</p>
            </div>
            <div className="product">
              <img src="https://via.placeholder.com/200" alt="Netflix" />
              <p>Netflix Premium - 1 Tháng</p>
              <p>Giá: 79.000đ</p>
            </div>
            <div className="product">
              <img src="https://via.placeholder.com/200" alt="Spotify" />
              <p>Spotify Premium 1 năm</p>
              <p>Giá: 329.000đ</p>
            </div>
            <div className="product">
              <img src="https://via.placeholder.com/200" alt="Zoom" />
              <p>Zoom Pro ~ 1 tháng</p>
              <p>Giá: 210.000đ</p>
            </div>
            <div className="product">
              <img src="https://via.placeholder.com/200" alt="Windows 10" />
              <p>Windows 10 Pro</p>
              <p>Giá: 290.000đ</p>
            </div>
            <div className="product">
              <img src="https://via.placeholder.com/200" alt="YouTube" />
              <p>YouTube Premium - 1 Năm</p>
              <p>Giá: 499.000đ</p>
            </div>
            <div className="product">
              <img src="https://via.placeholder.com/200" alt="YouTube" />
              <p>YouTube Premium - 1 Năm</p>
              <p>Giá: 499.000đ</p>
            </div>
            <div className="product">
              <img src="https://via.placeholder.com/200" alt="YouTube" />
              <p>YouTube Premium - 1 Năm</p>
              <p>Giá: 499.000đ</p>
            </div>
            <div className="product">
              <img src="https://via.placeholder.com/200" alt="YouTube" />
              <p>YouTube Premium - 1 Năm</p>
              <p>Giá: 499.000đ</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}

export default HomePage