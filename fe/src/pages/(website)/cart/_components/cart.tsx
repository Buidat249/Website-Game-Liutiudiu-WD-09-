import { Image, Skeleton, Button, message } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCartContext } from "./cartcontext";

interface Cart {
  cart_id: number;
  user_id: number;
  games: { game_id: number; quantity: number }[]; // Mảng game trong giỏ hàng
}

interface Game {
  key_id: number[];
  game_id: number;
  brand_id: number;
  category_id: number;
  platform_id: number;
  name: string;
  price: number;
  discount: number;
  final_price: number;
  image: string;
  title: string;
  description: string;
  availableKeysCount?: number; // Thêm trường này
}

const CartBoxLeft = ({ setTotalPrice, setTotalQuantity }: any) => {
  const [carts, setCarts] = useState<Cart[]>([]);
  const [games, setGames] = useState<Game[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectAll, setSelectAll] = useState(false);
  const { selectedGames, setSelectedGames } = useCartContext();
  const navigate = useNavigate();



  const user = JSON.parse(localStorage.getItem("user") || "{}");

  // Hàm lấy giỏ hàng từ API
  const fetchCartData = () => {
    if (user?.user_id) {
      setLoading(true);
      axios
        .get(`http://localhost:8080/carts/${user.user_id}`)
        .then((response) => {
          if (response.data && response.data.data) {
            setCarts([response.data.data]);
          } else {
            setCarts([]);
          }
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching carts:", error);
          setLoading(false);
        });
    } else {
      setCarts([]);
      setLoading(false);
    }
  };

  // Hàm lấy sản phẩm từ API
  const fetchGameData = async () => {
    try {
      const response = await axios.get("http://localhost:8080/games");
      const gameData = response.data.data;

      // Lấy thông tin số lượng keys khả dụng cho từng game
      const updatedGames = await Promise.all(
        gameData.map(async (game: Game) => {
          try {
            const keysResponse = await axios.get(`http://localhost:8080/games/${game.game_id}/available-keys`);
            const availableKeysCount = keysResponse.data.count;
            return { ...game, availableKeysCount };
          } catch (error) {
            console.error(`Error fetching keys for game ${game.game_id}:`, error);
            return { ...game, availableKeysCount: 0 }; // Nếu lỗi, giả định số lượng keys = 0
          }
        })
      );

      setGames(updatedGames);
    } catch (error) {
      console.error("Error fetching games:", error);
    }
  };


  // Gọi dữ liệu khi component load và khi user thay đổi
  useEffect(() => {
    if (user?.user_id) {
      fetchCartData();
      fetchGameData();
    }
  }, [user?.user_id]);

  // Hàm cập nhật số lượng game trong giỏ hàng
  const updateQuantity = (cart_id: number, game_id: number, quantity: number) => {
    axios
      .put(`http://localhost:8080/carts/${cart_id}/game/${game_id}`, {
        quantity,
      })
      .then(() => {
        fetchCartData();
        message.success("Số lượng đã được cập nhật");
      })
      .catch((error) => {
        message.error("Cập nhật số lượng thất bại");
        console.error("Error updating quantity:", error);
      });
  };

  // Hàm xử lý tăng giảm số lượng
  const handleQuantityChange = (
    cart_id: number,
    game_id: number,
    action: "increase" | "decrease"
  ) => {
    const cart = carts.find((cart) => cart.cart_id === cart_id);
    if (cart) {
      const game = cart.games.find((gameItem) => gameItem.game_id === game_id);
      if (game) {
        const gameData = games.find((g) => g.game_id === game_id); // Lấy dữ liệu game từ danh sách games
        if (gameData) {
          const availableKeys = gameData.availableKeysCount || 0; // Lấy số lượng keys khả dụng từ API

          const newQuantity =
            action === "increase" ? game.quantity + 1 : Math.max(1, game.quantity - 1);

          // Kiểm tra số lượng mới có vượt quá số lượng keys khả dụng không
          if (newQuantity > availableKeys) {
            message.error(`Số lượng bạn muốn mua vượt quá số lượng keys còn lại (${availableKeys} keys)`);
            return;
          }

          // Cập nhật số lượng nếu hợp lệ
          updateQuantity(cart_id, game_id, newQuantity);

          // Cập nhật selectedGames với số lượng mới và trạng thái đã chọn
          setSelectedGames((prevSelected) => ({
            ...prevSelected,
            [game_id]: {
              selected: true,
              quantity: newQuantity,
            },
          }));
        }
      }
    }
  };


  // Hàm xử lý chọn/deselect game
  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>, gameId: number) => {
    const cart = carts[0]; // Lấy giỏ hàng đầu tiên
    const gameInCart = cart?.games.find((gameItem) => gameItem.game_id === gameId);

    if (gameInCart) {
      const currentQuantity = gameInCart.quantity; // Lấy số lượng hiện tại của game trong giỏ

      // Tìm game trong danh sách games
      const game = games.find((g) => g.game_id === gameId);

      // Kiểm tra nếu game không tồn tại hoặc không có availableKeysCount
      if (!game || game.availableKeysCount === undefined) {
        message.error(`Dữ liệu game không hợp lệ!`);
        return;
      }

      const availableKeys = game.availableKeysCount; // Lấy số lượng keys có sẵn

      if (currentQuantity > availableKeys) {
        // Nếu số lượng trong giỏ lớn hơn số lượng keys, hiển thị lỗi và không cho phép chọn
        message.error(`Không đủ keys cho game ${game?.name}. Chọn lại số lượng hoặc sản phẩm khác.`);
        return; // Dừng lại không cập nhật selectedGames
      }

      // Nếu checkbox được chọn, lưu trạng thái và số lượng hiện tại
      setSelectedGames((prevSelected) => {
        const updatedSelected = { ...prevSelected };
        if (event.target.checked) {
          updatedSelected[gameId] = { selected: true, quantity: currentQuantity };
        } else {
          // Nếu bỏ chọn, xóa sản phẩm khỏi selectedGames
          delete updatedSelected[gameId];
        }
        return updatedSelected;
      });
    }
  };

  // Hàm chọn/deselect tất cả game
  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    const isChecked = e.target.checked;
    setSelectAll(isChecked);

    const updatedSelectedGames: { [gameId: number]: { selected: boolean; quantity: number } } = {};

    if (isChecked) {
      carts.forEach((cart) => {
        cart.games.forEach((gameItem) => {
          // Tìm game trong danh sách games
          const game = games.find((g) => g.game_id === gameItem.game_id);

          if (game && game.availableKeysCount !== undefined) {
            const availableKeys = game.availableKeysCount; // Lấy số lượng keys có sẵn

            if (gameItem.quantity > availableKeys) {
              // Nếu số lượng game trong giỏ lớn hơn số lượng keys, hiển thị lỗi và không chọn
              message.error(`Không đủ keys cho game ${game?.name}. Vui lòng chọn lại số lượng.`);
              return; // Dừng lại nếu không đủ keys
            }

            updatedSelectedGames[gameItem.game_id] = {
              selected: true,
              quantity: gameItem.quantity, // Lấy số lượng từ giỏ hàng
            };
          }
        });
      });
    } else {
      // Nếu bỏ chọn tất cả, reset lại selectedGames
      setSelectedGames({});
    }

    // Cập nhật selectedGames với đối tượng mới
    setSelectedGames(updatedSelectedGames);
  };


  // Tính tổng giá trị giỏ hàng
  const calculateTotal = () => {
    const selectedGameIds = new Set();
    return carts.reduce((total, cart) => {
      cart.games.forEach((gameItem) => {
        if (selectedGames[gameItem.game_id] && !selectedGameIds.has(gameItem.game_id)) {
          const game = games.find((game) => game.game_id === gameItem.game_id);
          if (game) {
            total += game.final_price * gameItem.quantity;
            selectedGameIds.add(gameItem.game_id);
          }
        }
      });
      return total;
    }, 0);
  };

  // Tính tổng số lượng game đã chọn
  const calculateQuantity = () => {
    const selectedGameIds = new Set();
    return carts.reduce((total, cart) => {
      cart.games.forEach((gameItem) => {
        if (selectedGames[gameItem.game_id] && !selectedGameIds.has(gameItem.game_id)) {
          total += 1;
          selectedGameIds.add(gameItem.game_id);
        }
      });
      return total;
    }, 0);
  };

  useEffect(() => {
    setTotalPrice(calculateTotal()); // Cập nhật giá trị tổng mỗi khi giỏ hàng thay đổi
    setTotalQuantity(calculateQuantity()); // Cập nhật sản phẩm tổng mỗi khi giỏ hàng thay đổi
  }, [selectedGames, carts, games]);

  useEffect(() => {
    console.log("Selected Games updated:", selectedGames);
  }, [selectedGames]); // Chạy mỗi khi selectedGames thay đổi

  const removeGame = (cart_id: number, game_id: number, user_id: number) => {
    axios
      .delete(
        `http://localhost:8080/carts/${cart_id}/game/${game_id}?user_id=${user_id}`
      )
      .then(() => {
        fetchCartData();
        message.success("Xóa game khỏi giỏ hàng thành công");
      })
      .catch((error) => {
        message.error("Xóa game thất bại");
        console.error("Error removing game:", error);
      });
  };



  return (
    <div className="flex-1 bg-white p-6 rounded-lg shadow-md mb-4 lg:mb-0 lg:mr-4">
      <h2 className="text-xl font-bold mb-4" style={{ paddingTop: "20px" }}>
        <input
          type="checkbox"
          checked={selectAll}
          onChange={handleSelectAll}
          className="custom-checkbox"
        />
        Giỏ hàng (
        {carts.reduce((total, cart) => total + (cart.games?.length || 0), 0)}{" "}
        Game)
      </h2>
      {carts.length === 0 ? (
        <p>Giỏ hàng của bạn đang trống.</p>
      ) : (
        Array.isArray(carts) &&
        carts.map((cart) => (
          <div key={`${cart.user_id}-${cart.cart_id}`} className="mb-4">
            {cart.games.map((gameItem, index) => {
              const game = games.find((g) => g.game_id === gameItem.game_id);
              return game ? (
                <div
                  key={`${gameItem.game_id}-${gameItem.quantity}-${index}`} // Kết hợp game_id, quantity và index để đảm bảo key duy nhất
                  className="flex items-center border-b pb-4 mb-4"
                >
                  <input
                    type="checkbox"
                    checked={selectedGames[gameItem.game_id]?.selected || false}  // Lấy giá trị 'selected' để gán cho checked
                    onChange={(e) => handleCheckboxChange(e, gameItem.game_id)}
                    className="custom-checkbox"
                  />

                  <Image
                    src={game.image}
                    alt={game.name}
                    className="w-32 h-20 object-cover rounded"
                  />
                  <div className="flex flex-col flex-1 pl-4">
                    <h3 className="text-lg font-semibold">{game.name}</h3>
                    <p className="text-sm text-gray-500">{game.title}</p>
                    <span className="text-green-500">
                      Tình trạng: Còn {game.availableKeysCount ?? 0} keys
                    </span>


                  </div>
                  <div className="flex items-center">
                    <Button
                      className="px-2 py-1 bg-gray-200 rounded"
                      onClick={() =>
                        handleQuantityChange(
                          cart.cart_id,
                          gameItem.game_id,
                          "decrease"
                        )
                      }
                      disabled={gameItem.quantity <= 1} // Không cho giảm xuống dưới 1
                    >
                      -
                    </Button>
                    <input
                      type="text"
                      value={gameItem.quantity}
                      className="w-12 text-center border mx-2"
                      readOnly
                    />
                    <Button
                      className="px-2 py-1 bg-gray-200 rounded"
                      onClick={() =>
                        handleQuantityChange(
                          cart.cart_id,
                          gameItem.game_id,
                          "increase"
                        )
                      }
                    >
                      +
                    </Button>
                  </div>
                  <div className="text-right pl-4">
                    <p className="text-lg font-semibold text-red-500">
                      {(
                        game.final_price
                      ).toLocaleString()}

                      đ
                    </p>
                    <p className="text-sm line-through text-gray-400">
                      {(game.price).toLocaleString()}đ
                    </p>
                  </div>
                  <div className="flex items-center">
                    {/* Nút xoá game */}
                    <Button
                      className="px-2 py-1 bg-red-500 text-white rounded ml-4"
                      onClick={() =>
                        removeGame(
                          cart.cart_id,
                          gameItem.game_id,
                          cart.user_id
                        )
                      }
                    >
                      Xóa
                    </Button>
                  </div>
                </div>
              ) : (
                <Skeleton key={gameItem.game_id} active />
              );
            })}
          </div>
        ))
      )}
    </div>
  );
};

export default CartBoxLeft;
