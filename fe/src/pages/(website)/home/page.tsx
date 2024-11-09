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
  image: string;
  title: string;
  description: string;
}

interface Platform {
  platform_id: number;
  name: string;
}

const HomePage = () => {
  const [games, setGames] = useState<Game[]>([]);
  const [platforms, setPlatforms] = useState<Platform[]>([]);


  useEffect(() => {
    axios
      .get("http://localhost:8080/games")
      .then((response) => {
        setGames(response.data.data);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
      });

    // Lấy danh sách platform
    axios
      .get("http://localhost:8080/platforms")
      .then((response) => {
        setPlatforms(response.data.data);
      })
      .catch((error) => {
        console.error("Error fetching platforms:", error);
      });
  }, []);

  // Lọc các sản phẩm có giá cao nhất
  const featuredGames = [...games].sort((a, b) => b.price - a.price).slice(0, 8);

  // Lọc các sản phẩm miễn phí
  const freeGames = games.filter((game) => game.price === 0);

  // Các sản phẩm cho aside-left và aside-right
  const leftGames = games.slice(0, 3);
  const rightGames = games.slice(1, 4);

  // Hàm để lấy tên platform dựa trên platform_id
  const getPlatformName = (platform_id: number) => {
    if (Array.isArray(platform_id)) {
      return platform_id
        .map((id) => {
          const platform = platforms.find((p) => p.platform_id === id);
          return platform ? platform.name : "Nền tảng không xác định";
        })
        .join(", ");
    } else {
      const platform = platforms.find((p) => p.platform_id === platform_id);
      return platform ? platform.name : "Nền tảng không xác định";
    }
  };

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
                  <Link to={`/productgame/${game.game_id}`}>
                    <img src={game.image} alt={game.name} />
                    <p>{game.name}</p>
                    <div className="flex gap-2">
                      <p>Giá: Miễn phí</p>
                      <p>{getPlatformName(game.platform_id)}</p>
                    </div>
                  </Link>
                </div>
              ))
            ) : (
              <p>Không có sản phẩm nổi bật nào.</p>
            )}
          </div>
        </section>
        <div>
          <section className="games">
            <h2>Sản phẩm miễn phí</h2>
            <div className="game-grid">
              {freeGames.length > 0 ? (
                freeGames.map((game) => (
                  <div key={game.game_id} className="game">
<<<<<<< HEAD
                    <Link to={`/productgame/${game.game_id}`}>
                      <img src={game.image} alt={game.name} />
                      <p>{game.name}</p>
                      <div className="flex gap-2">
                        <p>Giá: Miễn phí</p>
                        <p>{getPlatformName(game.platform_id)}</p>
                      </div>
                    </Link>

=======
                    <img src={game.image} alt={game.name} />
                    <p>{game.name}</p>
                    <div className="flex gap-2">
                      <p>Giá: Miễn phí</p>
                      <p>{getPlatformName(game.platform_id)}</p>
                    </div>
>>>>>>> 6c341defa5f339a0e64827b5da7a63a75eb0a1e3
                  </div>
                ))
              ) : (
                <p>Không có sản phẩm miễn phí nào.</p>
              )}
            </div>
          </section>
        </div>
      </div>
    </>
  );
};

export default HomePage;
