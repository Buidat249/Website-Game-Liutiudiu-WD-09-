import { Button, Image, message } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useNavigate } from 'react-router-dom';

interface Game {
  key_id: number[];
  game_id?: number;
  brand_id?: number;
  category_id: number[]; // Sửa để category_id luôn là một mảng
  platform_id?: number;
  name?: string;
  price?: number;
  discount?: number;
  final_price?: number | undefined;
  rating?: number;
  image?: string;
  description_id?: number[];
  configuration?: string;
  availableKeysCount?: number;
}

interface Platform {
  platform_id: number;
  name: string;
}

interface Description {
  description_id?: any;
  name?: string;
  descriptiondetail_id?: number;
}

interface DescriptionDetail {
  description_id?: number;
  name?: string;
  content?: string;
  image?: string;
  descriptiondetail_id?: number;
}

const ProductDetail = () => {
  const { game_id } = useParams<{ game_id: string }>();
  const [game, setGame] = useState<Game | null>(null);
  const [description, setDescription] = useState<Description[] | null>([]);
  const [descriptionDetail, setDescriptionDetail] = useState<DescriptionDetail[] | null>([]);
  const [categoryName, setCategoryName] = useState<string | null>(null);
  const [relatedGames, setRelatedGames] = useState<Game[]>([]);
  const [platforms, setPlatforms] = useState<Platform[]>([]);
  const [messageApi, contextHolder] = message.useMessage();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  console.log('daaa', game);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:8080/platforms")
      .then((response) => setPlatforms(response.data.data))
      .catch((error) => console.error("Error fetching platforms:", error));

    const fetchGame = async () => {
      try {
        const response = await axios.get<{ data: Game }>(`http://localhost:8080/games/${game_id}`);
        const gameData = response.data.data;

        // Kiểm tra nếu API trả về đúng dữ liệu keys
        const keysResponse = await axios.get<any>(`http://localhost:8080/games/${game_id}/available-keys`);

        // Kiểm tra xem response có chứa data và count không
        let availableKeysCount = 0; // Mặc định là 0 nếu không có dữ liệu hợp lệ

        if (keysResponse?.data && typeof keysResponse.data.count === 'number') {
          availableKeysCount = keysResponse.data.count; // Lấy count nếu có
        }

        // Thêm availableKeysCount vào dữ liệu game
        gameData.availableKeysCount = availableKeysCount;

        setGame(gameData);

        // Lấy category và related games (không thay đổi logic này)
        const categoryId = gameData.category_id[0];
        if (categoryId) {
          const categoryResponse = await axios.get<{ data: { name: string } }>(`http://localhost:8080/categories/${categoryId}`);
          setCategoryName(categoryResponse.data.data.name);
        }

        const categoryIds = gameData.category_id.join(",");
        const relatedResponse = await axios.get<{ data: Game[] }>(`http://localhost:8080/games?category_id=${categoryIds}`);
        const relatedGamesList = relatedResponse.data.data.filter(
          (relatedGame) =>
            relatedGame.game_id !== gameData.game_id &&
            Array.isArray(relatedGame.category_id) &&
            relatedGame.category_id.some((catId) => gameData.category_id.includes(catId))
        );
        setRelatedGames(relatedGamesList);

      } catch (error) {
        console.error("Error fetching game details:", error);
      }
    };


    if (game_id) {
      fetchGame();
    }
  }, [game_id]);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setIsLoggedIn(true);
    }
  }, []);

  useEffect(() => {
    const fetchDescriptions = async () => {
      if (game && Array.isArray(game.description_id) && game.description_id.length > 0) {
        const descriptionIds = game.description_id.join(",");
        try {
          const descriptionResponse = await axios.get<{ data: Description[] | Description }>(
            `http://localhost:8080/descriptions/${descriptionIds}`
          );

          // Kiểm tra xem response có phải là một mảng hay đối tượng
          const descriptions = Array.isArray(descriptionResponse.data.data)
            ? descriptionResponse.data.data
            : [descriptionResponse.data.data]; // Nếu là đối tượng, biến thành mảng

          setDescription(descriptions);

          // Lấy tất cả descriptiondetails từ descriptiondetail_id
          const allDescriptionDetailIds = descriptions
            .map((desc) => desc.descriptiondetail_id)
            .flat()
            .filter((id) => id !== undefined);

          if (allDescriptionDetailIds.length > 0) {
            const descriptionDetailResponse = await axios.get<{ data: DescriptionDetail[] }>(
              `http://localhost:8080/descriptiondetails/${allDescriptionDetailIds.join(",")}`
            );
            setDescriptionDetail(descriptionDetailResponse.data.data);
          }
        } catch (error) {
          console.error("Error fetching descriptions or description details:", error);
        }
      }
    };

    fetchDescriptions();
  }, [game]);




  const addToCart = async (gameId: number) => {
    if (!isLoggedIn) {
      message.error("Bạn cần đăng nhập để thực hiện thao tác này!");
      return;
    }
    const userId = Number(localStorage.getItem("user_id"));

    if (!userId) {
      messageApi.error("Bạn cần đăng nhập để thêm sản phẩm vào giỏ hàng!");
      return;
    }

    // Kiểm tra số lượng keys khả dụng trước khi thêm vào giỏ
    if (game?.availableKeysCount === 0) {
      messageApi.error("Sản phẩm này hiện đã hết hàng.");
      return;
    }

    try {
      const response = await axios.post("http://localhost:8080/carts", { gameId, userId }, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      messageApi.success(response.data.message);
    } catch (error: any) {
      messageApi.error(error.response?.data?.message || "Có lỗi xảy ra khi thêm vào giỏ hàng!");
      console.error("Lỗi:", error);
    }
  };

  const BuyToCart = async (gameId: number) => {
    if (!isLoggedIn) {
      message.error("Bạn cần đăng nhập để thực hiện thao tác này!");
      return;
    }
    const userId = Number(localStorage.getItem("user_id"));

    if (!userId) {
      messageApi.error("Bạn cần đăng nhập để thêm sản phẩm vào giỏ hàng!");
      return;
    }

    // Kiểm tra số lượng keys khả dụng trước khi mua
    if (game?.availableKeysCount === 0) {
      messageApi.error("Sản phẩm này hiện đã hết hàng.");
      return;
    }

    try {
      const response = await axios.post("http://localhost:8080/carts", { gameId, userId }, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      messageApi.success(response.data.message);
      navigate('/cart'); // Điều hướng đến giỏ hàng
    } catch (error: any) {
      messageApi.error(error.response?.data?.message || "Có lỗi xảy ra khi thêm vào giỏ hàng!");
      console.error("Lỗi:", error);
    }
  };


  return (
    <div>
      {contextHolder}
      {game ? (
        <div className="w-[1000px] mx-auto bg-white shadow-lg rounded-lg p-6 my-6">
          <div className="max-w-full w-[1048px]">
            <div className=" p-6">
              <div className="max-w-full  ">
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
                                <h3
                                  className="self-stretch pb-px mt-2.5 text-2xl font-medium leading-8 text-black max-md:max-w-full"
                                  style={{
                                    fontSize: "40px",
                                    fontWeight: "bold",
                                    color: "black",
                                  }}
                                >
                                  {game.name}
                                </h3>
                                <div className="flex gap-2 mt-3.5">
                                  <img
                                    loading="lazy"
                                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/34a92a341a735c918de4d217f1e3fa1e151e569f2247681db994b5d9a036d142?placeholderIfAbsent=true&apiKey=b147c62d1b404bf790d7133a5bf6ed3c"
                                    alt=""
                                    className="object-contain shrink-0 aspect-[0.94] w-[17px]"
                                  />
                                  <div
                                    style={{
                                      fontSize: "17px",
                                      color: "black",
                                    }}
                                  >
                                    Số lượng :{" "}
                                    <span className="text-emerald-500">
                                      {game.availableKeysCount || 0} sản phẩm
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
                                  <div
                                    style={{
                                      fontSize: "17px",
                                      color: "black",
                                    }}
                                  >
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
                                  <div
                                    style={{
                                      fontSize: "17px",
                                      color: "black",
                                    }}
                                  >
                                    Thể loại: {categoryName || "Đang tải..."}
                                  </div>{" "}
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
                          <h4
                            className="grow my-auto text-xl font-medium leading-none text-black"
                            style={{
                              fontSize: "20px",
                              fontWeight: "bold",
                              color: "black",
                            }}
                          >
                            <p className="">
                              {new Intl.NumberFormat("vi-VN").format(game.final_price ?? 0)}đ
                            </p>


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
                          {/* Giá gốc (giá chưa giảm) */}
                          <h6
                            className="grow my-auto text-base leading-loose text-gray-400 line-through text-sm"
                            style={{
                              fontSize: "20px",
                              textDecorationColor: "rgb(161, 159, 159)",
                              textDecorationThickness: "2px",
                              fontWeight: "bold",
                              color: "rgb(161, 159, 159)",
                            }}
                          >
                            {game.price !== undefined
                              ? new Intl.NumberFormat("vi-VN").format(game.price) + "đ"
                              : "Giá không có sẵn"}
                          </h6>

                          {/* Phần trăm giảm giá */}
                          <small
                            className="p-1.5 text-xs leading-none text-white bg-red-500 rounded-md"
                            style={{
                              backgroundColor: "red",
                              color: "white",
                              border: "2px solid red",
                              borderRadius: "10px",
                              fontWeight: "bold",
                              fontSize: "1.2rem",
                              alignItems: "center",
                              padding: "10px",
                            }}
                          >
                            -{game.discount}%
                          </small>
                        </div>
                        <div className="flex shrink-0 mt-3.5 max-w-full h-px border-t border-gray-400 border-opacity-30 w-[450px]" />
                      </div>
                      <div style={{ marginTop: "5px", maxWidth: "fit-content" }}>
                        <Button
                          size="large"
                          type="primary"
                          style={{ marginRight: "5px", color: "#000B1D", width: 219.67 }}
                          onClick={() => BuyToCart(game.game_id as any)}
                          disabled={game?.availableKeysCount === 0} // Kiểm tra số lượng keys khả dụng
                        >
                          <img
                            loading="lazy"
                            src="https://cdn.builder.io/api/v1/image/assets/TEMP/117488c38dda05d787ab8db90683a19f645dbb1be01e2bcf4d57a62e7449f9db?placeholderIfAbsent=true&apiKey=b147c62d1b404bf790d7133a5bf6ed3c"
                            alt="Mua ngay"
                            className="object-contain shrink-0 self-stretch my-auto w-5 aspect-[1.18]"
                          />
                          <span className="self-stretch my-auto">Mua ngay</span>
                        </Button>
                        <Button
                          size="large"
                          style={{ width: 219.67, color: "#000B1D", backgroundColor: "" }}
                          onClick={() => addToCart(game.game_id as any)}
                          disabled={game?.availableKeysCount === 0} // Kiểm tra số lượng keys khả dụng
                        >
                          <img
                            loading="lazy"
                            src="https://cdn.builder.io/api/v1/image/assets/TEMP/8aeae39e84b7d89e22be272674e27eeba5e611f315bdcf2da24e8140860bc80f?placeholderIfAbsent=true&apiKey=b147c62d1b404bf790d7133a5bf6ed3c"
                            alt="Thêm vào giỏ"
                            className="object-contain shrink-0 self-stretch my-auto w-5 aspect-[1.18]"
                          />
                          <span className="self-stretch my-auto">Thêm vào giỏ</span>
                        </Button>
                      </div>

                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* Mô tả*/}
            {description && description.length > 0 && (
              <div className="mt-8">
                <h2 className="text-3xl font-semibold text-gray-800 mb-4">Mô tả sản phẩm</h2>
                {description.map((desc) => (
                  <div key={desc.description_id} className="bg-white shadow-lg rounded-lg p-6 mb-6">


                    {/* Kiểm tra xem descriptiondetail_id có phải là mảng hay không */}
                    {Array.isArray(desc.descriptiondetail_id) && desc.descriptiondetail_id.length > 0 && (
                      <div className="mt-4">
                        {descriptionDetail && descriptionDetail.length > 0 && (
                          <ul className="space-y-4">
                            {descriptionDetail
                              .filter((detail) =>
                                // Kiểm tra xem desc.descriptiondetail_id có phải là mảng và có chứa detail.descriptiondetail_id không
                                Array.isArray(desc.descriptiondetail_id) &&
                                desc.descriptiondetail_id.includes(detail.descriptiondetail_id)
                              )
                              .map((detail) => (
                                <li key={detail.descriptiondetail_id} className="border-t pt-4">
                                  <h5 className="text-xl font-medium text-gray-800">{detail.name}</h5>
                                  <p className="text-gray-600">{detail.content}</p>
                                  {detail.image && <img src={detail.image} alt={detail.name} className="mt-2 w-full max-w-xs rounded-md" />}
                                </li>
                              ))}
                          </ul>
                        )}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}



            {/* Các Game cùng thể loại */}
            <div className="games">
              <section className="games">
                <h1
                  style={{
                    fontSize: "32px",
                    fontWeight: "bold",
                    color: "black",
                  }}
                >
                  Game đề xuất
                </h1>
                <div className="game-grid">
                  {relatedGames.length > 0 ? (
                    relatedGames.map((game) => (
                      <div key={game.game_id} className="game">
                        <Link to={`/productgame/${game.game_id}`}>
                          <img src={game.image} alt={game.name} />
                          <p style={{ fontWeight: "bold", fontSize: "17px" }}>
                            {game.name}
                          </p>
                          <div className="flex gap-2 final_price-price-discount-container">
                            <p className="final_price">
                              {new Intl.NumberFormat("vi-VN").format(game.final_price ?? 0)}
                            </p>

                            <p className="price">
                              {game.price !== undefined
                                ? new Intl.NumberFormat("vi-VN").format(game.price) + "đ"
                                : "Giá không có sẵn"}
                              đ
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
          </div>
        </div>
      ) : (
        <p>Loading...</p>
      )}

    </div>
  );
};

export default ProductDetail;


