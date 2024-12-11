import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom"; // Import Link từ react-router-dom

const Favoritelist = () => {
  const [favouriteGames, setFavouriteGames] = useState<any[]>([]); // Danh sách game yêu thích với game_id và favourite
  const [gameDetails, setGameDetails] = useState<any[]>([]); // Danh sách chi tiết game
  const [isLoading, setIsLoading] = useState(true); // Đang tải dữ liệu
  const [error, setError] = useState<string | null>(null); // Xử lý lỗi

  useEffect(() => {
    const userId = localStorage.getItem("user_id"); // Lấy user_id từ localStorage

    if (!userId) {
      setError("Bạn cần đăng nhập để xem danh sách yêu thích.");
      setIsLoading(false);
      return;
    }

    // Lấy danh sách sản phẩm yêu thích từ backend
    const fetchFavouriteGames = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/users/${userId}/favourite`
        );
        const favouriteGamesData = response.data.data;
        setFavouriteGames(favouriteGamesData);
        await fetchGameDetails(favouriteGamesData); // Gọi API để lấy chi tiết từng game
      } catch (error) {
        setError("Lỗi khi tải danh sách yêu thích.");
        setIsLoading(false);
      }
    };

    // Lấy chi tiết game từ backend
    const fetchGameDetails = async (favouriteGamesData: any[]) => {
      const gameIds = favouriteGamesData.map((item) => item.game_id);

      try {
        const gameResponses = await Promise.all(
          gameIds.map((gameId) =>
            axios.get(`http://localhost:8080/games/${gameId}`)
          )
        );
        const gameDetailsData = gameResponses.map((response) => response.data.data);
        setGameDetails(gameDetailsData); // Lưu chi tiết game vào state
        setIsLoading(false);
      } catch (error) {
        setError("Lỗi khi tải chi tiết game.");
        setIsLoading(false);
      }
    };

    fetchFavouriteGames();
  }, []);

  if (isLoading) {
    return <p>Đang tải dữ liệu...</p>;
  }

  return (
    <div className="p-6 bg-white rounded-lg shadow-md max-w-4xl w-[800px] my-6 mx-auto">
      <h2 className="text-2xl font-semibold mb-2">Sản phẩm yêu thích</h2>
      <p className="text-gray-600 mb-4">
        Danh sách các sản phẩm mà bạn đã đánh dấu "yêu thích"
      </p>

      {/* Hiển thị thông báo lỗi nếu có */}
      {error && (
        <div className="text-red-600 text-lg font-medium mb-4">{error}</div>
      )}

      {/* Hiển thị các sản phẩm yêu thích nếu có */}
      {favouriteGames.length > 0 && gameDetails.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {favouriteGames.map((favourite) => {
            const game = gameDetails.find(
              (game) => game.game_id === favourite.game_id
            );
            return (
              game && (
                <div
                  key={game.game_id}
                  className="border p-4 rounded-lg shadow-sm bg-gray-50"
                >
                  {/* Kiểm tra nếu game.image và game.image[0] tồn tại */}
                  <img
                    src={game.image && game.image.length > 0 ? game.image[0] : 'default-image.jpg'}
                    alt={game.name}
                    className="object-cover w-full h-48 rounded-md mb-4"
                  />
                  <h3 className="text-xl font-semibold">{game.name}</h3>
                  <p className="text-gray-600 mb-2">Giá: {game.price} VND</p>
                  <Link
                    to={`/productgame/${game.game_id}`} // Chuyển hướng đến trang chi tiết game
                    className="text-blue-500 hover:text-blue-700"
                  >
                    Xem chi tiết
                  </Link>
                </div>
              )
            );
          })}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center mt-8">
          <div className="text-yellow-600 text-lg font-medium mb-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-6 h-6 inline mr-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 20.5C6.48 20.5 2 16.02 2 12 2 7.98 6.48 3.5 12 3.5s10 4.48 10 8.5c0 4.02-4.48 8.5-10 8.5z"
              />
            </svg>
            Chưa có sản phẩm yêu thích
          </div>
          <p className="text-gray-500 text-base">
            Hãy thêm sản phẩm yêu thích của bạn để theo dõi chúng dễ dàng hơn.
          </p>
        </div>
      )}
    </div>
  );
};

export default Favoritelist;
