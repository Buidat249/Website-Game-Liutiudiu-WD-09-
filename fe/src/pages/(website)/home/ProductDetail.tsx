import { Button, Image } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import FAQ from "./_components/FAQ";

interface Game {
  game_id?: number;
  brand_id?: number;
  category_id: number[]; // Sửa để category_id luôn là một mảng
  platform_id?: number;
  name?: string;
  price?: number;
  discount?: number;
  rating?: number;
  image?: string;
  description?: string;
}

interface Platform {
  platform_id: number;
  name: string;
}


const ProductDetail = () => {
  const { game_id } = useParams<{ game_id: string }>();
  const [game, setGame] = useState<Game | null>(null);
  const [categoryName, setCategoryName] = useState<string | null>(null);
  const [relatedGames, setRelatedGames] = useState<Game[]>([]);
  const [platforms, setPlatforms] = useState<Platform[]>([]);

  useEffect(() => {
    axios.get("http://localhost:8080/platforms")
      .then((response) => setPlatforms(response.data.data))
      .catch((error) => console.error("Error fetching platforms:", error));

    const fetchGame = async () => {
      try {
        const response = await axios.get<{ data: Game }>(
          `http://localhost:8080/games/${game_id}`
        );
        const gameData = response.data.data;
        setGame(gameData);

        // Kiểm tra nếu category_id tồn tại và là mảng
        const categoryId = gameData.category_id[0]; // Lấy giá trị đầu tiên của mảng category_id

        if (categoryId) {
          const categoryResponse = await axios.get<{ data: { name: string } }>(
            `http://localhost:8080/categories/${categoryId}`
          );
          setCategoryName(categoryResponse.data.data.name);
        }

        // Tạo danh sách các category ID
        const categoryIds = gameData.category_id.join(',');

        // Lấy danh sách game liên quan
        const relatedResponse = await axios.get<{ data: Game[] }>(
          `http://localhost:8080/games?category_id=${categoryIds}`
        );

        // Lọc danh sách game liên quan
        const relatedGamesList = relatedResponse.data.data.filter(
          (relatedGame) =>
            relatedGame.game_id !== gameData.game_id &&
            Array.isArray(relatedGame.category_id) && // Kiểm tra category_id của game liên quan tồn tại và là mảng
            relatedGame.category_id.some((catId) =>
              gameData.category_id.includes(catId) // Kiểm tra xem category_id của game liên quan có bao gồm category_id của game hiện tại
            )
        );
        setRelatedGames(relatedGamesList);

        console.log("Related games:", relatedGamesList);
      } catch (error) {
        console.error("Error fetching game details:", error);
      }
    };

    if (game_id) {
      fetchGame();
    }
  }, [game_id]);

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
    <div>
      {game ? (
        <div className="flex flex-col justify-center items-center px-16 py-5 bg-white max-md:px-5">
          <div className="max-w-full w-[1495px]">
            <div className="flex flex-col justify-center items-center px-16 py-5 bg-white max-md:px-5">
              <div className="max-w-full w-[1495px]">
                <div className="flex gap-5 max-md:flex-col">
                  <div className="flex flex-col w-[37%] max-md:ml-0 max-md:w-full">
                    <div className="flex flex-col text-sm font-medium text-center text-blue-600 max-md:mt-4 max-md:max-w-full">
                      <Image src={game.image} alt={game.name} />
                    </div>
                  </div>
                  <div className="flex flex-col ml-5 w-[63%] max-md:ml-0 max-md:w-full">
                    <div className="flex flex-col w-full max-md:mt-5 max-md:max-w-full">
                      <div className="flex flex-col items-start pl-1.5 w-full max-md:max-w-full">
                        <div className="self-stretch max-md:max-w-full">
                          <div className="flex gap-5 max-md:flex-col">
                            <div className="flex flex-col w-[63%] max-md:ml-0 max-md:w-full">
                              <div className="flex flex-col items-start w-full text-sm text-gray-700 max-md:mt-5 max-md:max-w-full">
                                {/* <div>{game.platform}</div> */}
                                <h3 className="self-stretch pb-px mt-2.5 text-2xl font-medium leading-8 text-black max-md:max-w-full">
                                  {game.name}
                                </h3>
                                <div className="flex gap-2 mt-3.5">
                                  <img
                                    loading="lazy"
                                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/34a92a341a735c918de4d217f1e3fa1e151e569f2247681db994b5d9a036d142?placeholderIfAbsent=true&apiKey=b147c62d1b404bf790d7133a5bf6ed3c"
                                    alt=""
                                    className="object-contain shrink-0 aspect-[0.94] w-[17px]"
                                  />
                                  <div>
                                    Tình trạng:{" "}
                                    <span className="text-emerald-500">
                                      {/* {inStock ? "Còn hàng" : "Hết hàng"} */}
                                    </span>
                                  </div>
                                </div>
                                <div className="flex gap-1 mt-3.5">
                                  <img
                                    loading="lazy"
                                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/687b846a6a5ea3bc05b2266705d7d9088f5a4a03b785eb431db3b8ba76c289c8?placeholderIfAbsent=true&apiKey=b147c62d1b404bf790d7133a5bf6ed3c"
                                    alt=""
                                    className="object-contain shrink-0 aspect-[1.29] w-[22px]"
                                  />
                                  <div>
                                    Mã sản phẩm:{" "}
                                    <span className="font-medium">
                                      {/* {productCode} */}
                                    </span>
                                  </div>
                                </div>
                                <div className="flex gap-2 mt-3.5">
                                  <img
                                    loading="lazy"
                                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/d958a4a53a6028c435c3da59a1bfd363fe54fd491ae5ecf61c3d02f8db918292?placeholderIfAbsent=true&apiKey=b147c62d1b404bf790d7133a5bf6ed3c"
                                    alt=""
                                    className="object-contain shrink-0 aspect-[0.94] w-[17px]"
                                  />
                                  <div>Thể loại: {categoryName || "Đang tải..."}</div>{" "}
                                </div>
                              </div>
                            </div>
                            <div className="flex flex-col ml-5 w-[37%] max-md:ml-0 max-md:w-full">
                              <div className="flex flex-col w-full max-md:mt-5">
                                <h5 className="self-start text-lg font-medium leading-snug text-black">
                                  Giới thiệu bạn bè
                                </h5>
                                <p className="mt-3.5 mr-5 text-sm text-gray-700 max-md:mr-2.5">
                                  Giảm giá 5% cho bạn bè được giới thiệu.
                                </p>
                                <div className="flex gap-2 mt-3">
                                  <div className="flex overflow-hidden flex-col px-4 pt-3.5 text-sm text-black whitespace-nowrap bg-white rounded-md border border-gray-300 border-solid ">
                                    <div className="overflow-hidden w-full">
                                      Website link
                                    </div>
                                  </div>
                                  <button className="flex flex-col justify-center px-4 py-3.5 bg-blue-600 rounded-md min-">
                                    <img
                                      loading="lazy"
                                      src="https://cdn.builder.io/api/v1/image/assets/TEMP/584725c1319a411fde7a24056057f509e262b13a9ec157d4ff511918700e8591?placeholderIfAbsent=true&apiKey=b147c62d1b404bf790d7133a5bf6ed3c"
                                      alt="Copy"
                                      className="object-contain aspect-square w-[18px]"
                                    />
                                  </button>
                                  <button className="flex flex-col justify-center px-4 py-3.5 bg-white rounded-md border border-gray-300 border-solid min-">
                                    <img
                                      loading="lazy"
                                      src="https://cdn.builder.io/api/v1/image/assets/TEMP/e02269d5a5a618e86daaa2acb57c65d1fff1df31e3bd8225ec24f31887ad201f?placeholderIfAbsent=true&apiKey=b147c62d1b404bf790d7133a5bf6ed3c"
                                      alt="Share"
                                      className="object-contain aspect-[1.29] w-[22px]"
                                    />
                                  </button>
                                </div>
                                <a
                                  href="#"
                                  className="flex gap-2 items-center self-start mt-2 text-sm text-blue-600 min-h-[21px]"
                                >
                                  <img
                                    loading="lazy"
                                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/a4d2339a4a965f9dcc73822bcd358e3019ca14e16ee4aea1e27c0a5fb26cf96e?placeholderIfAbsent=true&apiKey=b147c62d1b404bf790d7133a5bf6ed3c"
                                    alt=""
                                    className="object-contain shrink-0 self-stretch my-auto aspect-[0.94] w-[17px]"
                                  />
                                  <span className="self-stretch my-auto">
                                    Xem chi tiết
                                  </span>
                                </a>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="flex gap-3 mt-4">
                          <h4 className="grow my-auto text-xl font-medium leading-none text-black">
                            {game.price}
                          </h4>
                          <button className="flex flex-col justify-center py-1">
                            <img
                              loading="lazy"
                              src="https://cdn.builder.io/api/v1/image/assets/TEMP/e063f2101c6e2b7d646fe30f20198d38ea33c4103a7be0a645537733961a760a?placeholderIfAbsent=true&apiKey=b147c62d1b404bf790d7133a5bf6ed3c"
                              alt="Decrease"
                              className="object-contain aspect-square w-[21px]"
                            />
                          </button>
                          <button className="flex flex-col justify-center py-1">
                            <img
                              loading="lazy"
                              src="https://cdn.builder.io/api/v1/image/assets/TEMP/0e31365606729c7016ed5aa825a3d481f05e8f0951f6e5bb3bae99d939b86e6c?placeholderIfAbsent=true&apiKey=b147c62d1b404bf790d7133a5bf6ed3c"
                              alt="Increase"
                              className="object-contain aspect-square w-[21px]"
                            />
                          </button>
                        </div>
                        <div className="flex gap-2 mt-3 font-medium whitespace-nowrap">
                          <h6 className="grow my-auto text-base leading-loose text-gray-400">
                            {game.price}đ
                          </h6>
                          <small className="p-1.5 text-xs leading-none text-white bg-red-500 rounded-md">
                            -{game.discount}%
                          </small>
                        </div>
                        <hr className="flex shrink-0 mt-4 max-w-full h-px border-t border-gray-400 border-opacity-30 w-[450px]" />
                        <h6 className="mt-5 text-base font-medium leading-loose text-black">
                          Các sản phẩm khác
                        </h6>
                        <div className="flex gap-2.5 mt-3.5 max-w-full text-sm font-medium text-blue-600 w-[361px]">
                          <Button className="btn btn-outline-primary">
                            Tài khoản game
                          </Button>
                          <Button className="btn btn-outline-primary">
                            Thuê 1 ngày
                          </Button>
                          <Button className="btn btn-outline-primary">
                            Thuê 1 tuần
                          </Button>
                        </div>
                        <div className="flex gap-3 mt-3 max-w-full text-sm font-medium text-blue-600 w-[264px]">
                          <Button className="btn btn-outline-primary">
                            Mua game
                          </Button>
                          <Button className="btn btn-outline-primary">
                            Tài khoản game - Cũ
                          </Button>
                        </div>
                        <div className="flex shrink-0 mt-3.5 max-w-full h-px border-t border-gray-400 border-opacity-30 w-[450px]" />
                      </div>
                      <div
                        style={{ marginTop: "5px", maxWidth: "fit-content" }}
                      >
                        <Button
                          size="large"
                          type="primary"
                          style={{ marginRight: "5px", width: 219.67 }}
                        >
                          <img
                            loading="lazy"
                            src="https://cdn.builder.io/api/v1/image/assets/TEMP/117488c38dda05d787ab8db90683a19f645dbb1be01e2bcf4d57a62e7449f9db?placeholderIfAbsent=true&apiKey=b147c62d1b404bf790d7133a5bf6ed3c"
                            alt=""
                            className="object-contain shrink-0 self-stretch my-auto w-5 aspect-[1.18]"
                          />
                          <span className="self-stretch my-auto">Mua ngay</span>
                        </Button>
                        <Button size="large" style={{ width: 219.67 }}>
                          <img
                            loading="lazy"
                            src="https://cdn.builder.io/api/v1/image/assets/TEMP/8aeae39e84b7d89e22be272674e27eeba5e611f315bdcf2da24e8140860bc80f?placeholderIfAbsent=true&apiKey=b147c62d1b404bf790d7133a5bf6ed3c"
                            alt=""
                            className="object-contain shrink-0 self-stretch my-auto w-5 aspect-[1.18]"
                          />
                          <span className="self-stretch my-auto">
                            Thêm vào giỏ
                          </span>
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <FAQ game={game} />
            {/* Các Game cùng thể loại */}
            <div className="games">
              <section className="games">
                <h2>Sản phẩm Liên Quan</h2>
                <div className="game-grid">
                  {relatedGames.length > 0 ? (
                    relatedGames.map((game) => (
                      <div key={game.game_id} className="game">
                        <Link to={`/productgame/${game.game_id}`}>
                          <img src={game.image} alt={game.name} />
                          <p>{game.name}</p>
                          <div className="small-p-product">
                            <p>Giá: {game.price === 0 ? 'Miễn phí' : `${game.price} VND`}</p>
                            {/* Kiểm tra nếu platform_id tồn tại */}
                            <p>{game.platform_id ? getPlatformName(game.platform_id) : 'N/A'}</p>
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
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default ProductDetail;
