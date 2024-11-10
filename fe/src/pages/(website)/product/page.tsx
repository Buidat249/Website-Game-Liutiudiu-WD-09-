import React, { useEffect, useState } from "react";
import axios from "axios";
import "../../../styles/style.scss";
import { Link } from "react-router-dom";

interface Game {
  game_id: number;
  brand_id: number;
  category_id: number[];
<<<<<<< HEAD
=======
  filter_id: number[];
>>>>>>> 1a28ab342f0403d237e4ae4c16aedbd46e6cf76c
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

<<<<<<< HEAD
const ProductPage = () => {
=======
interface Filter {
  filter_id: number;
  name: string;
}

const GamePage = () => {
>>>>>>> 1a28ab342f0403d237e4ae4c16aedbd46e6cf76c
  const [games, setGames] = useState<Game[]>([]);
  const [platforms, setPlatforms] = useState<Platform[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [brands, setBrands] = useState<Brand[]>([]);
<<<<<<< HEAD
  const [filteredGames, setFilteredGames] = useState<Game[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [selectedBrand, setSelectedBrand] = useState<string>('');
=======
  const [filters, setFilters] = useState<Filter[]>([]); // State for filters
  const [filteredGames, setFilteredGames] = useState<Game[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [selectedBrand, setSelectedBrand] = useState<string>('');
  const [selectedFilter, setSelectedFilter] = useState<string>(''); // State for selected filter
>>>>>>> 1a28ab342f0403d237e4ae4c16aedbd46e6cf76c
  const [priceFrom, setPriceFrom] = useState<number | string>('');
  const [priceTo, setPriceTo] = useState<number | string>('');
  const [sortOrder, setSortOrder] = useState<string>('');

<<<<<<< HEAD
=======
  console.log('hi', selectedCategory)

>>>>>>> 1a28ab342f0403d237e4ae4c16aedbd46e6cf76c
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
<<<<<<< HEAD
=======

    axios.get("http://localhost:8080/filters") // Fetch filters data
      .then((response) => setFilters(response.data.data))
      .catch((error) => console.error("Error fetching filters:", error));
>>>>>>> 1a28ab342f0403d237e4ae4c16aedbd46e6cf76c
  }, []);

  const handleFilter = () => {
    let filtered = [...games];

<<<<<<< HEAD
    // Lọc theo danh mục
=======
    // Lọc theo thể loại
>>>>>>> 1a28ab342f0403d237e4ae4c16aedbd46e6cf76c
    if (selectedCategory) {
      const categoryId = Number(selectedCategory);
      filtered = filtered.filter((game) =>
        Array.isArray(game.category_id) && game.category_id.includes(categoryId)
      );
    }

    // Lọc theo thương hiệu
    if (selectedBrand) {
      const brandId = Number(selectedBrand);
<<<<<<< HEAD
      filtered = filtered.filter((game) => game.brand_id === brandId);
=======
      filtered = filtered.filter((game) =>
        Array.isArray(game.brand_id) && game.brand_id.includes(brandId)
      );
    }

    // Lọc theo danh mục
    if (selectedFilter) {
      const filterId = Number(selectedFilter);
      filtered = filtered.filter((game) =>
        Array.isArray(game.filter_id) && game.filter_id.includes(filterId)
      );
>>>>>>> 1a28ab342f0403d237e4ae4c16aedbd46e6cf76c
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
<<<<<<< HEAD
=======
    setSelectedFilter(''); // Reset the selected filter
>>>>>>> 1a28ab342f0403d237e4ae4c16aedbd46e6cf76c
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
<<<<<<< HEAD
              <label className="select-label">Chọn danh mục:</label>
=======
              <label className="select-label">Chọn thể loại:</label>
>>>>>>> 1a28ab342f0403d237e4ae4c16aedbd46e6cf76c
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

<<<<<<< HEAD
=======
            <div className="select-wrapper">
              <label className="select-label">Chọn danh mục:</label>
              <select value={selectedFilter} onChange={(e) => setSelectedFilter(e.target.value)}>
                <option value="">Tất cả</option>
                {filters.map((filter) => (
                  <option key={filter.filter_id} value={filter.filter_id}>
                    {filter.name}
                  </option>
                ))}
              </select>
            </div>

>>>>>>> 1a28ab342f0403d237e4ae4c16aedbd46e6cf76c
            <div className="price-range">
              <input type="text" value={priceFrom} onChange={(e) => setPriceFrom(e.target.value)} placeholder="Mức giá từ" />
              <span>-</span>
              <input type="text" value={priceTo} onChange={(e) => setPriceTo(e.target.value)} placeholder="Mức giá đến" />
            </div>

            <div className="select-wrapper">
              <label className="select-label">Chọn sắp xếp:</label>
              <select value={sortOrder} onChange={(e) => setSortOrder(e.target.value)}>
<<<<<<< HEAD
                <option value="">Sắp xếp</option>
                <option value="default">Mặc định</option>
=======
                <option value="">Mặc định</option>
>>>>>>> 1a28ab342f0403d237e4ae4c16aedbd46e6cf76c
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
<<<<<<< HEAD
                  <img src={game.image} alt={game.name} />
                  <p>{game.name}</p>
                  <div className="small-p-product">
                    <p>Giá: {game.price === 0 ? 'Miễn phí' : `${game.price} VND`}</p>
                    <p>{getPlatformName(game.platform_id)}</p>
                  </div>
=======

                  <Link to={`/productgame/${game.game_id}`}>
                    <img src={game.image} alt={game.name} />
                    <p>{game.name}</p>
                    <div className="small-p-product">
                      <p>Giá: {game.price === 0 ? 'Miễn phí' : `${game.price} VND`}</p>
                      <p>{getPlatformName(game.platform_id)}</p>
                    </div>
                  </Link>

>>>>>>> 1a28ab342f0403d237e4ae4c16aedbd46e6cf76c
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

<<<<<<< HEAD
export default ProductPage;
=======
export default GamePage;
>>>>>>> 1a28ab342f0403d237e4ae4c16aedbd46e6cf76c
