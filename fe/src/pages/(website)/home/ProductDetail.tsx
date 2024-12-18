import { Button, Image, message } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useNavigate } from 'react-router-dom';


interface Comment {
  _id: string;
  content: string;
  user_id: number;
  game_id: number;
  rating: number;
  created_at: string;
}

interface Game {
  key_id: number[];
  game_id?: number;
  brand_id?: number;
  category_id: number[]; // Sửa để category_id luôn là một mảng
  platform_id?: number;
  name?: string;
  favourite?: boolean;
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
  const [user, setUser] = useState<any>(null); // Lưu trữ thông tin user
  console.log('use', user)
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();
  const [isFavourite, setIsFavourite] = useState<boolean>(game?.favourite || false); // Ban đầu set giá trị từ game.favourite (nếu có)
  const [activeTab, setActiveTab] = useState('description'); // Trạng thái để xác định tab đang active
  const [comments, setComments] = useState<Comment[]>([]);
  const [filteredComments, setFilteredComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState("");
  const [loading, setLoading] = useState(false);
  const [showMyComments, setShowMyComments] = useState(false);
  const [user_id, setUserId] = useState<number | null>(null); // Lưu user_id
  const [userAvt, setUserAvt] = useState<Record<number, any>>({});
  // State để theo dõi số lượng game liên quan hiển thị
  const [gamesToShow, setGamesToShow] = useState<number>(6); // Mặc định hiển thị 6 game liên quan

  // Hàm xử lý khi nhấn nút "Xem thêm"
  const handleLoadMore = () => {
    setGamesToShow((prev) => prev + 6); // Tăng thêm 6 game mỗi lần nhấn
  };

  // Các game liên quan cần hiển thị
  const gamesToDisplay = relatedGames.slice(0, gamesToShow);

  console.log('u', userAvt);


  useEffect(() => {
    const fetchUserData = async (user_id: number) => {
      if (user_id) {
        try {
          const response = await axios.get(`http://localhost:8080/users/${user_id}`);
          setUserAvt((prevState: Record<number, any>) => ({
            ...prevState,
            [user_id]: response.data.data, // Cập nhật thông tin người dùng vào state
          }));
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      }
    };

    // Duyệt qua các bình luận và lấy thông tin người dùng nếu chưa có trong state
    comments.forEach(comment => {
      if (!user[comment.user_id]) {  // Kiểm tra trong state 'user'
        fetchUserData(comment.user_id); // Chỉ lấy thông tin người dùng nếu chưa có
      }
    });

  }, [comments]);

  // Lấy user_id từ localStorage
  useEffect(() => {
    const storedUserId = Number(localStorage.getItem("user_id"));
    setUserId(storedUserId);
  }, []);

  // Fetch danh sách bình luận khi game_id thay đổi
  useEffect(() => {
    if (game_id) {
      fetchComments();
    }
  }, [game_id]);

  const fetchComments = async () => {
    const gameIdNumber = Number(game_id);

    if (isNaN(gameIdNumber)) {
      console.error("Invalid game_id");
      return;
    }

    try {
      setLoading(true);
      const response = await axios.get(`http://localhost:8080/games/${gameIdNumber}/comments`);
      setComments(response.data.data); // Giả sử API trả về mảng dữ liệu ở `response.data.data`
    } catch (error) {
      console.error("Error fetching comments:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddComment = async () => {
    if (!newComment.trim()) return;

    try {
      setLoading(true);

      // Lấy user_id từ localStorage
      const userIdFromStorage = Number(localStorage.getItem("user_id"));
      const response = await axios.post(`http://localhost:8080/games/${game_id}/comments`, {
        content: newComment,
        user_id: userIdFromStorage,
        rating: 5,
      });

      setComments([response.data.data, ...comments]); // Thêm bình luận mới vào đầu danh sách
      setNewComment(""); // Reset lại input
    } catch (error) {
      console.error("Error adding comment:", error);
    } finally {
      setLoading(false);
    }
  };

  // Lọc bình luận chỉ của người dùng hiện tại
  useEffect(() => {
    if (showMyComments && user_id !== null) {
      setFilteredComments(comments.filter(comment => comment.user_id === user_id));
    } else {
      setFilteredComments(comments);
    }
  }, [comments, showMyComments, user_id]);


  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      // Nếu không có favouriteGames, thêm vào mảng rỗng
      if (!parsedUser.favouriteGames) {
        parsedUser.favouriteGames = [];
      }
      setUser(parsedUser);  // Gán user từ localStorage vào state
    }
  }, []);

  const handleTabClick = (tab: any) => {
    setActiveTab(tab);
  };

  useEffect(() => {
    if (isLoggedIn) {
      const user_id = localStorage.getItem('user_id');
      const game_id = game?.game_id;

      if (!game_id || !user_id) {
        console.error("Không có thông tin user hoặc game_id để kiểm tra");
        return;
      }

      // Lấy danh sách game yêu thích từ localStorage và kiểm tra nếu là mảng
      const storedFavouriteGames = localStorage.getItem(`${user_id}_favouriteGames`);
      const favouriteGames = storedFavouriteGames ? JSON.parse(storedFavouriteGames) : [];

      // Kiểm tra nếu game_id có trong danh sách yêu thích
      const isGameFavourite = Array.isArray(favouriteGames) && favouriteGames.some((g) => g.game_id === game_id);
      setIsFavourite(isGameFavourite); // Cập nhật trạng thái yêu thích
    }
  }, [isLoggedIn, game?.game_id]);

  useEffect(() => {
    if (user?.favouriteGames) {
      const isFavouriteGame = user.favouriteGames.some(
        (fav: any) => fav.game_id === game?.game_id
      );
      setIsFavourite(isFavouriteGame);
    }
  }, [user?.favouriteGames, game?.game_id]);

  const toggleFavourite = async () => {
    if (!isLoggedIn) {
      messageApi.error("Bạn cần đăng nhập để thực hiện hành động này.");
      return;
    }

    const game_id = game?.game_id;
    if (!user || !game_id) {
      messageApi.error("Không có thông tin game hoặc user để thực hiện hành động này.");
      return;
    }

    const newFavouriteStatus = !isFavourite;

    let updatedFavourites;

    // Nếu thêm game vào yêu thích
    if (newFavouriteStatus) {
      updatedFavourites = [...user.favouriteGames, { game_id, favourite: true, _id: Date.now().toString() }];
    } else {
      // Nếu xoá game khỏi yêu thích
      updatedFavourites = user.favouriteGames.filter((fav: any) => fav.game_id !== game_id);
    }

    try {
      // Gửi yêu cầu cập nhật đến backend
      const response = await axios.post(
        `http://localhost:8080/users/${user.user_id}/favourite`,
        { game_id, favourite: newFavouriteStatus }
      );

      console.log('Response from backend:', response.data);  // Kiểm tra dữ liệu trả về từ server

      // Cập nhật lại user và lưu vào localStorage nếu thành công
      const updatedUser = { ...user, favouriteGames: updatedFavourites };
      setUser(updatedUser);
      localStorage.setItem('user', JSON.stringify(updatedUser));  // Lưu lại user vào localStorage

      setIsFavourite(newFavouriteStatus);

      messageApi.success(
        `Game ${newFavouriteStatus ? 'đã được thêm vào' : 'đã bị xoá khỏi'} danh sách yêu thích`
      );
    } catch (error) {
      console.error("Error updating favourite status on server:", error);
      messageApi.error("Không thể cập nhật trạng thái yêu thích trên server.");
    }
  };


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
        console.log('catte', categoryId)
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
    console.log('gido', storedUser);
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
                                      #00000{game.game_id || 0}
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
                          <Button onClick={toggleFavourite}>
                            <img
                              loading="lazy"
                              src={
                                isFavourite
                                  ? "data:image/png;base64,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" // Trái tim rỗng
                                  : "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBwgHBgkIBwgKCgkLDRYPDQwMDRsUFRAWIB0iIiAdHx8kKDQsJCYxJx8fLT0tMTU3Ojo6Iys/RD84QzQ5OjcBCgoKDQwNGg8PGjclHyU3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3N//AABEIALcAxAMBIgACEQEDEQH/xAAbAAEAAwEBAQEAAAAAAAAAAAAAAQQFAgMGB//EADQQAQACAQMCAwYEBAcAAAAAAAABAgMEESESMRMiUQUyQUJhgVJxscE0cpHwFCMzU4KS0f/EABQBAQAAAAAAAAAAAAAAAAAAAAD/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwD9xAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFbU6qmCNu9/hWFDLqM2bvaYiflqDVtkpX3r1j85c+Ph/3af8AaGXTTZL89Mu/8Hk/CDVraLR5ZifylLHnDfFzEzWfh8Hti1mTHxmjqj1gGkOMeSmSvVS28OwARMxETM9oBJKln1ny4uZ9VS/i5p81rT9Aals2KvvZKx9yM2K3a9Jn82ZXR2n5ZRbRZPwg14lLErOfTz5bTH0jld02ui8xTL5bzO0THaQXhESkAAAAAABV1uo8Cm1f9S3aFm1orWbT2iN2FmyTlzWtPeZ2B3ipfPknbmZ7y0MGGuOPWzwwbY6bR93p4gLO5ureIjxAWt3hlwRfmnE+kuPEPFBWre2my7149a+rTwZq5qdVfvCjn6ctdp4tHaVfBmvp8u+3G/mgG1aYrWZniIjeWXqdTOaemsbUif6mv1PiTFKc07/m509OmOq3M+gPbT6eNuq/Eei5SIr7tVaMh4oLe6N1bxU+ID1tSl/eqz9XpppPVHMLniE3i0TE9p7g8fZ+q2mMOSf5Z/ZosHLScWWYj4cw19Jl8fBW0944n8we4AAAAAK3tC3Tpb/Xhk4Y/wAyGn7U/hf+UM3F732BZ3Op57m4O+pHU43RuD06kdThAPTqeeXnt3N0bgjHGz2izzNwevUnqeW5uD16k9by3Nwe3URbl47piQRqPN0yseyL85KfD3o/v+ivknyPX2V/EW/l/wDAaoAAAAAKvtGu+kt9NpZWOfN9m5lp147V/FEwwtui232B67o3c7m4Otzdzubg6QgBIgBIgB0OQHW453AdG7nc3BN58n3WvZNfPe/0/VStO/dq+zcfRpotPe87gtgAAAAAMb2ji8PPv8tuYbKvrMMZ8M1+eOaz9QYsS63ccxxP3TEg73N3O6QSlACRACRACRAAboAN0bomSZ4B6Y6eLljHXvb9G5SOmIr6QoezMHTHjW+PFWiAAAAAAAADJ9pafpv41fdnv9JUX0N6RkrNbcxMbSxNVgnBlms81+WQeUOocQ6gHQhIJEAJEAAIARJKAHrpcM6jNFPhHvfSHlWk3tEV5mZ4bmk08afFFY96eZkHrWsVrFY7Q6AAAAAAAAAB46nBXUYppf7PYB87lx2xZZreNp/VENvV6auopt2tHaWJas472x34mJ7AmEuYSDoQAkQAIESARG8xEcolqez9H0bZctfPPaPQHeg0vg18S8eefX4QugAAAAAAAAAAAAAra3SxqKccXjtKyA+ctE1tatuLR8CGxrdJGor1Rxkjt9WPaJraa2ja0SCUuTcHSEbgJRPaSezR0Gj6ZjLk7961/cD2fo+nbNmr5vlr6NIAAAAAAAAAAAAAAAAAFTW6SNTXeOLx2lbAfN2iaWtW1em1fgjdta3SRqa7xxkjtLGvWaTNbV6bVnsBujdDT0Gj2mMuavPesfuBoNFzGbLHPesfu0wAAAAAAAAAAAAAAAAAAAAAnsq63SRqabxPTeO0rQDO0Ghmkxlzx5onivo0QAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAB/9k="
                              }
                              alt={isFavourite ? "Bỏ yêu thích" : "Thêm yêu thích"}
                              className="object-contain aspect-square w-[21px]"
                            />
                          </Button>

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
                          style={{
                            marginRight: "5px",
                            color: "#fff",  // Đổi màu chữ thành trắng
                            backgroundColor: "#02132E",  // Đặt màu nền của nút
                            width: 219.67
                          }}
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

            <div className="mt-8">
              {/* Hai nút chuyển đổi */}
              <div className="flex mb-4 py-6">
                <button
                  onClick={() => handleTabClick('description')}
                  className={`flex-1 px-6 py-3 font-semibold text-lg rounded-l-lg ${activeTab === 'description' ? 'bg-[#02132E] text-white' : 'bg-gray-200 text-gray-600'} transition-colors hover:bg-[#033154] hover:text-white`}
                >
                  Mô tả sản phẩm
                </button>
                <button
                  onClick={() => handleTabClick('comments')}
                  className={`flex-1 px-6 py-3 font-semibold text-lg rounded-r-lg ${activeTab === 'comments' ? 'bg-[#02132E] text-white' : 'bg-gray-200 text-gray-600'} transition-colors hover:bg-[#033154] hover:text-white`}
                >
                  Bình luận
                </button>
              </div>



              {/* Nội dung hiển thị theo tab */}
              {activeTab === 'description' && description && description.length > 0 && (

                <div>
                  <h2 className="text-2xl font-semibold text-gray-800 mb-4">Mô tả về game</h2>
                  {description.map((desc) => (
                    <div key={desc.description_id} className="bg-white shadow-lg rounded-lg p-6 mb-6">
                      {/* Kiểm tra xem descriptiondetail_id có phải là mảng hay không */}
                      {Array.isArray(desc.descriptiondetail_id) && desc.descriptiondetail_id.length > 0 && (
                        <div className="mt-4">
                          {descriptionDetail && descriptionDetail.length > 0 && (
                            <ul className="space-y-4">
                              {descriptionDetail
                                .filter((detail) =>
                                  Array.isArray(desc.descriptiondetail_id) &&
                                  desc.descriptiondetail_id.includes(detail.descriptiondetail_id)
                                )
                                .map((detail) => (
                                  <li key={detail.descriptiondetail_id} className="border-t pt-4">
                                    <h5 className="text-xl font-medium text-gray-800"><strong>{detail.name}</strong></h5>
                                    <p className="text-gray-600">{detail.content}</p>
                                    {detail.image && (
                                      <img
                                        src={detail.image}
                                        alt={detail.name}
                                        className="mt-2 w-full h-auto rounded-md" // Đặt width là full và height tự động
                                      />
                                    )}
                                  </li>
                                ))}
                            </ul>
                          )}
                        </div>
                      )}
                    </div>
                  ))}
                  {game && (
                    <div>
                      <h2 className="text-2xl font-semibold text-gray-800 mb-4">Cấu hình</h2>
                      <div className="bg-white shadow-lg rounded-lg p-6 mb-6">
                        <div className="mt-6">
                          <p className="text-lg font-medium text-gray-800">
                            <span className="text-black-600">{game.configuration}</span>
                          </p>
                        </div>
                      </div>
                    </div>
                  )}


                </div>

              )}
              {/* Phần Bình luận */}

              {activeTab === 'comments' && (
                <div>
                  <h2 className="text-2xl font-semibold text-gray-800 mb-4">Bình luận</h2>
                  <div className="bg-white shadow-lg rounded-lg p-6 mb-6">


                    {/* Nút "Bình luận của tôi" */}
                    <button
                      onClick={() => setShowMyComments(!showMyComments)}
                      className="mb-4 text-blue-600 hover:underline"
                    >
                      {showMyComments ? "Xem tất cả bình luận" : "Xem bình luận của tôi"}
                    </button>

                    {/* Hiển thị danh sách bình luận */}
                    <div className="space-y-4">
                      {/* Hiển thị trạng thái tải hoặc thông báo khi không có bình luận */}
                      {loading && <p>Đang tải...</p>}
                      {!loading && filteredComments.length === 0 && <p>Chưa có bình luận nào.</p>}

                      {/* Hiển thị danh sách bình luận */}
                      {filteredComments.map((comment) => (
                        <div key={comment._id} className="border-b pb-4">
                          <div className="flex items-center space-x-4">
                            {/* Avatar - Sử dụng ảnh người dùng */}
                            <div className="w-10 h-10 rounded-full overflow-hidden">
                              <img
                                src={userAvt[comment.user_id]?.avatar || "/path/to/default-avatar.png"}
                                alt={`User ${comment.user_id}`}
                                className="w-full h-full object-cover"
                              />
                            </div>

                            {/* Thông tin người dùng và nội dung bình luận */}
                            <div className="flex-1">
                              <h5 className="text-xl font-bold text-gray-800">
                                {userAvt[comment.user_id]?.username || "Người dùng ẩn danh"}
                              </h5>
                              <p className="text-gray-600 break-words max-w-full">
                                {comment.content}
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}

                      {/* Form nhập bình luận */}
                      <div>
                        <textarea
                          placeholder="Viết bình luận của bạn..."
                          className="w-full h-20 border p-4 rounded-lg text-gray-700 resize-none focus:outline-none focus:ring-2 focus:ring-blue-600"
                          value={newComment}
                          onChange={(e) => setNewComment(e.target.value)}
                        />
                        <button
                          className="mt-2 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 disabled:bg-gray-400"
                          onClick={handleAddComment}
                          disabled={loading}
                        >
                          {loading ? "Đang gửi..." : "Gửi bình luận"}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Các Game cùng thể loại */}
            <div className="games">
              <section className="games">
                <h1
                  style={{
                    marginTop: "40px",
                    marginBottom: "30px",
                    fontSize: "32px",
                    fontWeight: "bold",
                    color: "black",
                  }}
                >
                  Game liên quan
                </h1>
                <div className="game-grid">
                  {gamesToDisplay.length > 0 ? (
                    gamesToDisplay.map((game) => (
                      <div key={game.game_id} className="game">
                        <Link to={`/productgame/${game.game_id}`}>
                          <img src={game.image} alt={game.name} />
                          <p style={{ fontWeight: "bold", fontSize: "17px" }}>{game.name}</p>
                          <div className="flex gap-2 final_price-price-discount-container">
                            <p className="final_price">
                              {new Intl.NumberFormat("vi-VN").format(game.final_price ?? 0)}
                            </p>
                            <p className="price">
                              {game.price !== undefined
                                ? new Intl.NumberFormat("vi-VN").format(game.price) + "đ"
                                : "Giá không có sẵn"}
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

                {/* Nút "Xem thêm" */}
                {relatedGames.length > gamesToDisplay.length && (
                  <button onClick={handleLoadMore} className="load-more-button">
                    Xem thêm
                  </button>
                )}
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


