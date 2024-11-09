import React, { useEffect, useState } from "react";
import axios from "axios";
import "../../../styles/style.scss";
import { Link } from "react-router-dom";

interface Game {
  game_id: number;
  brand_id: number;
  category_id: number[];
  platform_id: number | number[];
  name: string;
  price: number;
  image: string;
  title: string;
  description: string;
}

interface Brand {
  brand_id: number;
  name: string;
}

interface Platform {
  platform_id: number;
  name: string;
}

interface Category {
  category_id: number;
  name: string;
}

const GamePage = () => {
  const [games, setGames] = useState<Game[]>([]);
  const [platforms, setPlatforms] = useState<Platform[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [brands, setBrands] = useState<Brand[]>([]);
  const [filteredGames, setFilteredGames] = useState<Game[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [selectedBrand, setSelectedBrand] = useState<string>('');
  const [priceFrom, setPriceFrom] = useState<number | string>('');
  const [priceTo, setPriceTo] = useState<number | string>('');
  const [sortOrder, setSortOrder] = useState<string>('');

  useEffect(() => {
    axios.get("http://localhost:8080/games")
      .then((response) => {
        setGames(response.data.data);
        setFilteredGames(response.data.data);
      })
      .catch((error) => console.error("Error fetching products:", error));

    axios.get("http://localhost:8080/platforms")
      .then((response) => setPlatforms(response.data.data))
      .catch((error) => console.error("Error fetching platforms:", error));

    axios.get("http://localhost:8080/categories")
      .then((response) => setCategories(response.data.data))
      .catch((error) => console.error("Error fetching categories:", error));

    axios.get("http://localhost:8080/brands")
      .then((response) => setBrands(response.data.data))
      .catch((error) => console.error("Error fetching brands:", error));
  }, []);

  const handleFilter = () => {
    let filtered = [...games];

    // Lọc theo danh mục
    if (selectedCategory) {
      const categoryId = Number(selectedCategory);
      filtered = filtered.filter((game) =>
        Array.isArray(game.category_id) && game.category_id.includes(categoryId)
      );
    }

    // Lọc theo thương hiệu
    if (selectedBrand) {
      const brandId = Number(selectedBrand);
      filtered = filtered.filter((game) => game.brand_id === brandId);
    }

    // Lọc theo giá
    if (priceFrom !== '' && !isNaN(Number(priceFrom))) {
      filtered = filtered.filter((game) => game.price >= Number(priceFrom));
    }
    if (priceTo !== '' && !isNaN(Number(priceTo))) {
      filtered = filtered.filter((game) => game.price <= Number(priceTo));
    }

    // Sắp xếp sản phẩm
    filtered = filtered.sort((a, b) => {
      switch (sortOrder) {
        case "priceDesc":
          return b.price - a.price;
        case "priceAsc":
          return a.price - b.price;
        case "nameAsc":
          return a.name.localeCompare(b.name);
        case "nameDesc":
          return b.name.localeCompare(a.name);
        default:
          return 0;
      }
    });

    setFilteredGames(filtered);
  };

  const handleReset = () => {
    setSelectedCategory('');
    setSelectedBrand('');
    setPriceFrom('');
    setPriceTo('');
    setSortOrder('');
    setFilteredGames(games);
  };

  const getPlatformName = (platform_id: number | number[]) => {
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
    <div className="main">
      <div className="filter">
        <div className="filter-small">
          <div className="filter-options">
            <div className="select-wrapper">
              <label className="select-label">Chọn danh mục:</label>
              <select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}>
                <option value="">Tất cả</option>
                {categories.map((category) => (
                  <option key={category.category_id} value={category.category_id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="select-wrapper">
              <label className="select-label">Chọn thương hiệu:</label>
              <select value={selectedBrand} onChange={(e) => setSelectedBrand(e.target.value)}>
                <option value="">Tất cả</option>
                {brands.map((brand) => (
                  <option key={brand.brand_id} value={brand.brand_id}>
                    {brand.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="price-range">
              <input type="text" value={priceFrom} onChange={(e) => setPriceFrom(e.target.value)} placeholder="Mức giá từ" />
              <span>-</span>
              <input type="text" value={priceTo} onChange={(e) => setPriceTo(e.target.value)} placeholder="Mức giá đến" />
            </div>

            <div className="select-wrapper">
              <label className="select-label">Chọn sắp xếp:</label>
              <select value={sortOrder} onChange={(e) => setSortOrder(e.target.value)}>
                <option value="">Sắp xếp</option>
                <option value="default">Mặc định</option>
                <option value="priceDesc">Giá: Cao đến Thấp</option>
                <option value="priceAsc">Giá: Thấp đến Cao</option>
                <option value="nameAsc">Tên: A đến Z</option>
                <option value="nameDesc">Tên: Z đến A</option>
              </select>
            </div>

            <button className="filter-button-ft" onClick={handleFilter}>Lọc</button>
            <button className="filter-button-rs" onClick={handleReset}>Reset</button>
          </div>
        </div>
      </div>

      <div className="games">
        <section className="games">
          <h2>Sản phẩm</h2>
          <div className="game-grid">
            {filteredGames.length > 0 ? (
              filteredGames.map((game) => (
                <div key={game.game_id} className="game">
                  <Link to={`/productgame/${game.game_id}`}>
                    <img src={game.image} alt={game.name} />
                    <p>{game.name}</p>
                    <div className="small-p-product">
                      <p>Giá: {game.price === 0 ? 'Miễn phí' : `${game.price} VND`}</p>
                      <p>{getPlatformName(game.platform_id)}</p>
                    </div>
                  </Link>
                </div>
              ))
            ) : (
              <p>Không có sản phẩm phù hợp.</p>
            )}
          </div>
        </section>
      </div>
    </div>
  );
};

export default GamePage;
