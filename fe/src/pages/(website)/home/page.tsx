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
  filter_id: number;
  name: string;
  price: number;
  discount: number;
  final_price: number;
  image: string;
  title: string;
  description: string;
  configuration?: string;
}

interface Filter {
  filter_id: number;
  name: string;
}

const HomePage = () => {
  const [games, setGames] = useState<Game[]>([]);
  const [filters, setFilters] = useState<Filter[]>([]);
  const [gamesToShow, setGamesToShow] = useState<{ [filterId: number]: number }>({});
  console.log('gameun', gamesToShow);

  console.log(games);

  useEffect(() => {
    axios
      .get("http://localhost:8080/games")
      .then((response) => {
        setGames(response.data.data);
        console.log("Games:", response.data.data); // Thêm dòng này
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
      });

    axios
      .get("http://localhost:8080/filters") // Fetch filters data
      .then((response) => {
        setFilters(response.data.data);
        const initialGamesToShow = response.data.data.reduce(
          (acc: { [key: number]: number }, filter: Filter) => {
            acc[filter.filter_id] = 8; // Mặc định hiển thị 8 game cho mỗi filter
            return acc;
          },
          {}
        );
        setGamesToShow(initialGamesToShow);

        console.log("filters:", response.data.data); // Thêm dòng này
      })
      .catch((error) => console.error("Error fetching filters:", error));
  }, []);

  ////// theo danh mục
  const filterGamesByCategory = (filterId: number) => {
    return games.filter((game) => {
      // Kiểm tra nếu filter_id là mảng hoặc số đơn lẻ
      if (Array.isArray(game.filter_id)) {
        return game.filter_id.includes(filterId); // Kiểm tra nếu filterId có trong mảng
      }
      return game.filter_id === filterId; // So sánh trực tiếp nếu filter_id là số
    });
  };

  const handleLoadMore = (filterId: number) => {
    setGamesToShow((prev) => ({
      ...prev,
      [filterId]: prev[filterId] ? prev[filterId] + 8 : 8,
    }));
  };

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
              {games.slice(0, 3).map((game) => (
                <Link to={`/productgame/${game.game_id}`} key={game.game_id}>
                  <img src={game.image} alt={game.title} />
                </Link>
              ))}
            </div>
          </div>
          <div className="aside-right">
            {games.slice(1, 4).map((game) => (
              <img key={game.game_id} src={game.image} alt={game.title} />
            ))}
          </div>
        </div>

        {filters.map((filter) => {
          const filteredGames = filterGamesByCategory(filter.filter_id);
          const gamesToDisplay = filteredGames.slice(0, gamesToShow[filter.filter_id] || 8); // Hiển thị tối đa 8 game cho mỗi filter

          return (
            <section key={filter.filter_id} className="games" style={{ position: "relative" }}>
              <h1 style={{ fontSize: "27px", fontWeight: "bold", color: "black" }}>
                <p style={{ fontSize: "25px", padding: '10px' }}>{filter.name}</p>
              </h1>

              <div
                style={{
                  position: "absolute",
                  top: "0",
                  left: "0",
                  width: "100%",
                  height: "100%",
                  backgroundImage: `url(${wkong})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  zIndex: "-1",
                }}
              ></div>

              <div className="game-grid">
                {gamesToDisplay.length > 0 ? (
                  gamesToDisplay.map((game) => (
                    <div key={game.game_id} className="game">
                      <Link to={`/productgame/${game.game_id}`}>
                        <img src={game.image} alt={game.name} />
                        <p style={{ marginTop: "8px", fontSize: "13px" }}>{game.name}</p>
                        <div className="flex gap-2 final_price-price-discount-container">
                          {game.final_price === 0 ? (
                            <>
                              <p className="final_price">
                                {new Intl.NumberFormat("vi-VN").format(game.final_price)}đ
                              </p>
                              <button className="free-button">Free</button>
                            </>
                          ) : (
                            <>
                              <p className="final_price">
                                {new Intl.NumberFormat("vi-VN").format(game.final_price)}đ
                              </p>
                              <p className="price">
                                {new Intl.NumberFormat("vi-VN").format(game.price)}đ
                              </p>
                              <p className="discount">-{game.discount}%</p>
                            </>
                          )}
                        </div>
                      </Link>
                    </div>
                  ))
                ) : (
                  <p>Không có sản phẩm nào trong danh mục này.</p>
                )}
              </div>

              {/* Nút "Load More" */}
              {filteredGames.length > gamesToDisplay.length && (
                <button onClick={() => handleLoadMore(filter.filter_id)} className="load-more-button">
                  Hiện thêm sản phẩm
                </button>
              )}
            </section>
          );
        })}
      </div>
    </>
  );
};

export default HomePage;
