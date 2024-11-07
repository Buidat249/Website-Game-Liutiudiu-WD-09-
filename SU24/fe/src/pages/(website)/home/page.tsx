import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../../../styles/style.scss';
import wkong from '../../../components/public/external/back wk.png';

interface Game {
  game_id: number;
  brand_id: number;
  category_id: number;
  name: string;
  price: number; // Đảm bảo price là số
  image: string;
  title: string;
  description: string;
  platform: string;
}

const HomePage = () => {
  const [games, setGames] = useState<Game[]>([]);

  useEffect(() => {
    axios.get('http://localhost:8080/games') // URL trỏ tới backend
      .then((response) => {
        setGames(response.data.data);
      })
      .catch((error) => {
        console.error('Error fetching products:', error);
      });
  }, []);

  // Lọc các sản phẩm có giá cao nhất
  const featuredGames = [...games]
    .sort((a, b) => b.price - a.price) // Sắp xếp theo giá từ cao đến thấp
    .slice(0, 5); // Lấy 5 sản phẩm có giá cao nhất

  // Các sản phẩm cho aside-left và aside-right
  const leftGames = games.slice(0, 3);
  const rightGames = games.slice(1, 4);

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
          <h2>Sản phẩm nổi bật</h2>
          <div className="game-grid">
            {featuredGames.length > 0 ? (
              featuredGames.map((game) => (
                <div key={game.game_id} className="game">
                  <img src={game.image} alt={game.name} />
                  <p>{game.name}</p>
                  <p>Giá: {game.price}</p>
                  <p>Mô tả: {game.description}</p>
                  <p>Flatform: {game.platform}</p>
                </div>
              ))
            ) : (
              <p>Không có sản phẩm nổi bật nào.</p>
            )}
          </div>
        </section>

        <div>
          <section className="games">
            <h2>Sản phẩm bán chạy</h2>
            <div className="game-grid">
              {games.length > 0 ? (
                games.map((game) => (
                  <div key={game.game_id} className="game">
                    <img src={game.image} alt={game.name} />
                    <p>{game.name}</p>
                    <p>Giá: {game.price}</p>
                    <p>Mô tả {game.description}</p>
<p>Flatform {game.platform}</p>
                  </div>
                ))
              ) : (
                <p>Không có sản phẩm nổi bật nào.</p>
              )}
            </div>
          </section>
        </div>
        <div>
          <section className="games">
            <h2>Sản phẩm free</h2>
            <div className="game-grid">
              {games.length > 0 ? (
                games.map((game) => (
                  <div key={game.game_id} className="game">
                    <img src={game.image} alt={game.name} />
                    <p>{game.name}</p>
                    <p>Giá: {game.price}</p>
                    <p>Mô tả {game.description}</p>
                    <p>Flatform {game.platform}</p>
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