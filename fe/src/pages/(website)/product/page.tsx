import React, { useEffect, useState } from "react";
import axios from "axios";
import "../../../styles/style.scss";
import { Link } from "react-router-dom";

interface Game {
  game_id: number;
  brand_id: number;
  category_id: number[];
  filter_id: number[];
  platform_id: number | number[];
  name: string;
  price: number;
  discount: number;
  final_price: number;
  image: string;
  title: string;
  description: string;
  configuration?: string;
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

interface Filter {
  filter_id: number;
  name: string;
}

const ProductPage = () => {
  const [games, setGames] = useState<Game[]>([]);
  const [platforms, setPlatforms] = useState<Platform[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [brands, setBrands] = useState<Brand[]>([]);
  const [filters, setFilters] = useState<Filter[]>([]); // State for filters
  const [filteredGames, setFilteredGames] = useState<Game[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [selectedBrand, setSelectedBrand] = useState<string>("");
  const [selectedFilter, setSelectedFilter] = useState<string>(""); // State for selected filter
  const [priceFrom, setPriceFrom] = useState<number | string>("");
  const [priceTo, setPriceTo] = useState<number | string>("");
  const [sortOrder, setSortOrder] = useState<string>("");

  console.log("hi", selectedCategory);

  useEffect(() => {
    axios
      .get("http://localhost:8080/games")
      .then((response) => {
        setGames(response.data.data);
        setFilteredGames(response.data.data);
      })
      .catch((error) => console.error("Error fetching products:", error));
    axios
      .get("http://localhost:8080/platforms")
      .then((response) => setPlatforms(response.data.data))
      .catch((error) => console.error("Error fetching platforms:", error));

    axios
      .get("http://localhost:8080/categories")
      .then((response) => setCategories(response.data.data))
      .catch((error) => console.error("Error fetching categories:", error));

    axios
      .get("http://localhost:8080/brands")
      .then((response) => setBrands(response.data.data))
      .catch((error) => console.error("Error fetching brands:", error));
    axios
      .get("http://localhost:8080/filters") // Fetch filters data
      .then((response) => setFilters(response.data.data))
      .catch((error) => console.error("Error fetching filters:", error));
  }, []);

  const handleFilter = () => {
    let filtered = [...games];
    // loc the loai
    if (selectedCategory) {
      const categoryId = Number(selectedCategory);
      filtered = filtered.filter(
        (game) =>
          Array.isArray(game.category_id) &&
          game.category_id.includes(categoryId)
      );
    }
    // loc hang phat trien
    if (selectedBrand) {
      const brandId = Number(selectedBrand);
      filtered = filtered.filter((game) => game.brand_id === brandId);
      filtered = filtered.filter(
        (game) =>
          Array.isArray(game.brand_id) && game.brand_id.includes(brandId)
      );
    }

    // loc danh muc 
    if (selectedFilter) {
      const filterId = Number(selectedFilter);
      filtered = filtered.filter(
        (game) =>
          Array.isArray(game.filter_id) && game.filter_id.includes(filterId)
      );
    }
    // loc theo gia
    if (priceFrom !== "" && !isNaN(Number(priceFrom))) {
      filtered = filtered.filter((game) => game.final_price >= Number(priceFrom));
    }
    if (priceTo !== "" && !isNaN(Number(priceTo))) {
      filtered = filtered.filter((game) => game.final_price <= Number(priceTo));
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
    setSelectedCategory("");
    setSelectedBrand("");
    setSelectedFilter(""); // Reset the selected filter.
    setPriceFrom("");
    setPriceTo("");
    setSortOrder("");
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
              <label className="select-label">Chọn thể loại:</label>

              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                <option value="">Tất cả</option>
                {categories.map((category) => (
                  <option
                    key={category.category_id}
                    value={category.category_id}
                  >
                    {category.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="select-wrapper">
              <label className="select-label">Chọn nhà phát triển:</label>
              <select
                value={selectedBrand}
                onChange={(e) => setSelectedBrand(e.target.value)}
              >
                <option value="">Tất cả</option>
                {brands.map((brand) => (
                  <option key={brand.brand_id} value={brand.brand_id}>
                    {brand.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="select-wrapper">
              <label className="select-label">Chọn danh mục:</label>
              <select
                value={selectedFilter}
                onChange={(e) => setSelectedFilter(e.target.value)}
              >
                <option value="">Tất cả</option>
                {filters.map((filter) => (
                  <option key={filter.filter_id} value={filter.filter_id}>
                    {filter.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="price-range">
              <input
                type="text"
                value={priceFrom}
                onChange={(e) => setPriceFrom(e.target.value)}
                placeholder="Mức giá từ"
              />
              <span>-</span>
              <input
                type="text"
                value={priceTo}
                onChange={(e) => setPriceTo(e.target.value)}
                placeholder="Mức giá đến"
              />
            </div>

            <div className="select-wrapper">
              <label className="select-label">Chọn sắp xếp:</label>
              <select
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value)}
              >
                <option value="">Mặc định</option>
                <option value="">Sắp xếp</option>
                <option value="default">Mặc định</option>
                <option value="">Mặc định</option>
                <option value="priceDesc">Giá: Cao đến Thấp</option>
                <option value="priceAsc">Giá: Thấp đến Cao</option>
                <option value="nameAsc">Tên: A đến Z</option>
                <option value="nameDesc">Tên: Z đến A</option>
              </select>
            </div>

            <button className="filter-button-ft" onClick={handleFilter}>
              Lọc
            </button>
            <button className="filter-button-rs" onClick={handleReset}>
              Reset
            </button>
          </div>
        </div>
      </div>

      <div className="games">
        <section className="games">
          <div className="game-grid">
            {filteredGames.length > 0 ? (
              filteredGames.map((game) => (
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
              <p>Không có sản phẩm nổi bật nào.</p>
            )}
          </div>
        </section>

      </div>
    </div>
  );
};

export default ProductPage;
