import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../../../styles/style.scss';
import wkong from '../../../components/public/external/back wk.png';

interface Product {
  _id: string;
  name: string;
  price: number; // Đảm bảo price là số
  image: string;
  title: string;
  description: string;
  platform: string;
}

const HomePage = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    axios.get('http://localhost:8080/games') // URL trỏ tới backend
      .then((response) => {
        setProducts(response.data.data);
      })
      .catch((error) => {
        console.error('Error fetching products:', error);
      });
  }, []);

  // Lọc các sản phẩm có giá cao nhất
  const featuredProducts = [...products]
    .sort((a, b) => b.price - a.price) // Sắp xếp theo giá từ cao đến thấp
    .slice(0, 5); // Lấy 5 sản phẩm có giá cao nhất

  // Các sản phẩm cho aside-left và aside-right
  const leftProducts = products.slice(0, 3);
  const rightProducts = products.slice(1, 4);

  return (
    <>
      <div className="main">
        <div className="banner">
          <div className="aside-left">
            <div>
              <img src={wkong} alt="Black Myth Wukong Banner" />
            </div>
            <div className="aside-left-small">
              {leftProducts.map((product) => (
                <img key={product._id} src={product.image} alt={product.title} />
              ))}
            </div>
          </div>

          <div className="aside-right">
            {rightProducts.map((product) => (
              <img key={product._id} src={product.image} alt={product.title} />
            ))}
          </div>
        </div>

        <section className="products">
          <h2>Sản phẩm nổi bật</h2>
          <div className="product-grid">
            {featuredProducts.length > 0 ? (
              featuredProducts.map((product) => (
                <div key={product._id} className="product">
                  <img src={product.image} alt={product.name} />
                  <p>{product.name}</p>
                  <p>Giá: {product.price}</p>
                  <p>Mô tả: {product.description}</p>
                  <p>Flatform: {product.platform}</p>
                </div>
              ))
            ) : (
              <p>Không có sản phẩm nổi bật nào.</p>
            )}
          </div>
        </section>

        <div>
          <section className="products">
            <h2>Sản phẩm bán chạy</h2>
            <div className="product-grid">
              {products.length > 0 ? (
                products.map((product) => (
                  <div key={product._id} className="product">
                    <img src={product.image} alt={product.name} />
                    <p>{product.name}</p>
                    <p>Giá: {product.price}</p>
                    <p>Mô tả {product.description}</p>
                    <p>Flatform {product.platform}</p>
                  </div>
                ))
              ) : (
                <p>Không có sản phẩm nổi bật nào.</p>
              )}
            </div>
          </section>
        </div>
        <div>
          <section className="products">
            <h2>Sản phẩm free</h2>
            <div className="product-grid">
              {products.length > 0 ? (
                products.map((product) => (
                  <div key={product._id} className="product">
                    <img src={product.image} alt={product.name} />
                    <p>{product.name}</p>
                    <p>Giá: {product.price}</p>
                    <p>Mô tả {product.description}</p>
                    <p>Flatform {product.platform}</p>
                  </div>
                ))
              ) : (
                <p>Không có sản phẩm nổi bật nào.</p>
              )}
            </div>
          </section>
        </div>

        {/* Các phần còn lại */}
      </div>
    </>
  );
};

export default HomePage;



