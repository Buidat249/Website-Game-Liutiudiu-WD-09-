import React, { useEffect, useState } from "react";
import axios from "axios";
import "../../../styles/style.scss";
import wkong from "../../../components/public/external/back wk.png";
import { Link } from "react-router-dom";

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
  configuration?: string;
}

const HomePage = () => {
  const [games, setGames] = useState<Game[]>([]);

  useEffect(() => {
    axios
      .get("http://localhost:8080/games")
      .then((response) => {
        setGames(response.data.data);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
      });
  }, []);

  // Lọc các sản phẩm có giá cao nhất
  const featuredGames = [...games]
    .sort((a, b) => b.price - a.price)
    .slice(0, 8);

  // Lọc các sản phẩm miễn phí
  const freeGames = games.filter((game) => game.price === 0);

  // Các sản phẩm cho aside-left và aside-right
  const leftGames = games.slice(0, 3);
  const rightGames = games.slice(1, 4);

  // Hàm để lấy tên platform dựa trên platform_id

  return (
    <>
      <div className="main">
        <div className="banner">
          <div className="aside-left">
            <div>
              <img src={wkong} alt="Black Myth Wukong Banner" />
            </div>
            <div className="aside-left-small">
              {leftGames.map((game) => (
                <img key={game.game_id} src={game.image} alt={game.title} />
              ))}
            </div>
          </div>
          <div className="aside-right">
            {rightGames.map((game) => (
              <img key={game.game_id} src={game.image} alt={game.title} />
            ))}
          </div>
        </div>
        <section className="games">
          <h1 style={{ fontSize: "27px", fontWeight: "bold", color: "black" }}>
            Game nổi bật
          </h1>
          <div className="game-grid">
            {featuredGames.length > 0 ? (
              featuredGames.map((game) => (
                <div key={game.game_id} className="game">
                  <Link to={`/productgame/${game.game_id}`}>
                    <img src={game.image} alt={game.name} />
                    <p style={{ fontWeight: "bold", fontSize: "17px" }}>
                      {game.name}
                    </p>
                    <div className="flex gap-2 final_price-price-discount-container">
                      <p className="final_price">
                        {new Intl.NumberFormat("vi-VN", {}).format(
                          game.final_price
                        )}
                        đ
                      </p>
                      <p className="price">
                        {new Intl.NumberFormat("vi-VN", {}).format(game.price)}đ
                      </p>
                      <p className="discount">-{game.discount}%</p>
                    </div>
                  </Link>
                </div>
              ))
            ) : (
              <p>Không có sản phẩm nổi bật nào.</p>
            )}
          </div>
        </section>
        <hr />
        <section className="games">
          <h1 style={{ fontSize: "27px", fontWeight: "bold", color: "black" }}>
            Game bán chạy
          </h1>
          <div className="game-grid">
            {featuredGames.length > 0 ? (
              featuredGames.map((game) => (
                <div key={game.game_id} className="game">
                  <Link to={`/productgame/${game.game_id}`}>
                    <img src={game.image} alt={game.name} />
                    <p style={{ fontWeight: "bold", fontSize: "17px" }}>
                      {game.name}
                    </p>
                    <div className="flex gap-2 final_price-price-discount-container">
                      <p className="final_price">
                        {new Intl.NumberFormat("vi-VN", {}).format(
                          game.final_price
                        )}
                        đ
                      </p>
                      <p className="price">
                        {new Intl.NumberFormat("vi-VN", {}).format(game.price)}đ
                      </p>
                      <p className="discount">-{game.discount}%</p>
                    </div>
                  </Link>
                </div>
              ))
            ) : (
              <p>Không có sản phẩm nổi bật nào.</p>
            )}
          </div>
        </section>
        <hr />
        <section className="games">
          <h1 style={{ fontSize: "27px", fontWeight: "bold", color: "black" }}>
            Game mới
          </h1>
          <div className="game-grid">
            {featuredGames.length > 0 ? (
              featuredGames.map((game) => (
                <div key={game.game_id} className="game">
                  <Link to={`/productgame/${game.game_id}`}>
                    <img src={game.image} alt={game.name} />
                    <p style={{ fontWeight: "bold", fontSize: "17px" }}>
                      {game.name}
                    </p>
                    <div className="flex gap-2 final_price-price-discount-container">
                      <p className="final_price">
                        {new Intl.NumberFormat("vi-VN", {}).format(
                          game.final_price
                        )}
                        đ
                      </p>
                      <p className="price">
                        {new Intl.NumberFormat("vi-VN", {}).format(game.price)}đ
                      </p>
                      <p className="discount">-{game.discount}%</p>
                    </div>
                  </Link>
                </div>
              ))
            ) : (
              <p>Không có sản phẩm nổi bật nào.</p>
            )}
          </div>
        </section>
        <hr />
        <section className="games">
          <h1 style={{ fontSize: "27px", fontWeight: "bold", color: "black" }}>
            Game miễn phí
          </h1>
          <div className="game-grid">
            {featuredGames.length > 0 ? (
              featuredGames.map((game) => (
                <div key={game.game_id} className="game">
                  <Link to={`/productgame/${game.game_id}`}>
                    <img src={game.image} alt={game.name} />
                    <p style={{ fontWeight: "bold", fontSize: "17px" }}>
                      {game.name}
                    </p>
                    <div className="flex gap-2 final_price-price-discount-container">
                      <p className="final_price">
                        {new Intl.NumberFormat("vi-VN", {}).format(
                          game.final_price
                        )}
                        đ
                      </p>
                      <p className="price">
                        {new Intl.NumberFormat("vi-VN", {}).format(game.price)}đ
                      </p>
                      <p className="discount">-{game.discount}%</p>
                    </div>
                  </Link>
                </div>
              ))
            ) : (
              <p>Không có sản phẩm nổi bật nào.</p>
            )}
          </div>
        </section>
        <hr/>
        <section className="games">
          <h1 style={{ fontSize: "27px", fontWeight: "bold", color: "black" }}>
            Game của năm
          </h1>
          <div className="game-grid">
            {featuredGames.length > 0 ? (
              featuredGames.map((game) => (
                <div key={game.game_id} className="game">
                  <Link to={`/productgame/${game.game_id}`}>
                    <img src={game.image} alt={game.name} />
                    <p style={{ fontWeight: "bold", fontSize: "17px" }}>
                      {game.name}
                    </p>
                    <div className="flex gap-2 final_price-price-discount-container">
                      <p className="final_price">
                        {new Intl.NumberFormat("vi-VN", {}).format(
                          game.final_price
                        )}
                        đ
                      </p>
                      <p className="price">
                        {new Intl.NumberFormat("vi-VN", {}).format(game.price)}đ
                      </p>
                      <p className="discount">-{game.discount}%</p>
                    </div>
                  </Link>
                </div>
              ))
            ) : (
              <p>Không có sản phẩm nổi bật nào.</p>
            )}
          </div>
        </section>
      </div>
    </>
  );
};

export default HomePage;
