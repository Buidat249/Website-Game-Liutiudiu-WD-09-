import { Image, Skeleton, Button, message } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

interface Cart {
  cart_id: number;
  user_id: number;
  games: { game_id: number; quantity: number }[]; // Mảng game trong giỏ hàng
}

interface Game {
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
}

const CartBoxLeft = ({ setTotalPrice }: any) => {
  const [carts, setCarts] = useState<Cart[]>([]);
  const [games, setGames] = useState<Game[]>([]);
  const [loading, setLoading] = useState(true);
  console.log(carts);
  const navigate = useNavigate();
  const [selectAll, setSelectAll] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const [selectedGames, setSelectedGames] = useState<{
    [gameId: number]: boolean;
  }>({});

  const handleCheckboxChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    gameId: number
  ) => {
    setSelectedGames((prevSelected) => ({
      ...prevSelected,
      [gameId]: event.target.checked,
    }));
  };

  const calculateTotal = () => {
    return carts.reduce((total, cart) => {
      cart.games.forEach((gameItem) => {
        if (selectedGames[gameItem.game_id]) {
          const game = games.find((game) => game.game_id === gameItem.game_id);
          if (game) {
            total += game.final_price * gameItem.quantity;
          }
        }
      });
      return total;
    }, 0);
  };

  const updateCartCount = () => {
    const count = carts.reduce(
      (total, cart) =>
        total +
        (cart.games?.reduce((count, game) => count + game.quantity, 0) || 0),
      0
    );
    setCartCount(count);
  };

  // Kiểm tra user khi đăng nhập
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  console.log(user);
  // Hàm lấy giỏ hàng từ API
  const fetchCartData = () => {
    if (user?.user_id) {
      setLoading(true);
      axios
        .get(`http://localhost:8080/carts/${user.user_id}`)
        .then((response) => {
          // Kiểm tra dữ liệu trả về

          if (response.data && response.data.data) {
            setCarts([response.data.data]);
            console.log(carts); // Chuyển thành mảng nếu cần
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

  // Hàm lấy sản phẩm
  const fetchGameData = () => {
    axios
      .get("http://localhost:8080/games")
      .then((response) => {
        setGames(response.data.data);
      })
      .catch((error) => {
        console.error("Error fetching games:", error);
      });
  };

  // Gọi dữ liệu khi component load và khi user thay đổi
  useEffect(() => {
    if (user?.user_id) {
      fetchCartData();
      fetchGameData();
    }
  }, [user?.user_id]);

  useEffect(() => {
    updateCartCount();
  }, [carts]); // Cập nhật cartCount khi carts thay đổi

  useEffect(() => {
    setTotalPrice(calculateTotal()); // Cập nhật giá trị tổng mỗi khi giỏ hàng thay đổi
  }, [selectedGames, carts, games]);
  // Hàm tìm game theo game_id

  const getGameById = (game_id: number) => {
    return games.find((game) => game.game_id === game_id);
  };

  // Hàm cập nhật số lượng game trong giỏ hàng
  const updateQuantity = (
    cart_id: number,
    game_id: number,
    quantity: number
  ) => {
    axios
      .put(`http://localhost:8080/carts/${cart_id}/game/${game_id}`, {
        quantity,
      })
      .then(() => {
        fetchCartData(); // Tải lại giỏ hàng sau khi cập nhật
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
        const newQuantity =
          action === "increase"
            ? game.quantity + 1
            : Math.max(1, game.quantity - 1);
        updateQuantity(cart_id, game_id, newQuantity);
        updateCartCount(); // Gọi hàm cập nhật số lượng sản phẩm sau khi thay đổi
      }
    }
  };

  const removeGame = (cart_id: number, game_id: number, user_id: number) => {
    axios
      .delete(
        `http://localhost:8080/carts/${cart_id}/game/${game_id}?user_id=${user_id}`
      )
      .then((response) => {
        setCarts((prevCarts) =>
          prevCarts.map((cart) =>
            cart.cart_id === cart_id
              ? {
                  ...cart,
                  games: cart.games.filter(
                    (gameItem) => gameItem.game_id !== game_id
                  ),
                }
              : cart
          )
        );
        updateCartCount();
        message.success("Xóa game khỏi giỏ hàng thành công");
      })
      .catch((error) => {
        message.error("Xóa game thất bại");
        console.error("Error removing game:", error);
      });
  };

  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    const isChecked = e.target.checked;
    setSelectAll(isChecked);

    const updatedSelectedGames: { [gameId: number]: boolean } = {};
    if (isChecked) {
      // Mark all games as selected
      carts.forEach((cart) => {
        cart.games.forEach((gameItem) => {
          updatedSelectedGames[gameItem.game_id] = true;
        });
      });
    } else {
      // Unselect all games
      setSelectedGames({});
    }

    setSelectedGames(updatedSelectedGames);
  };

  // Render giao diện giỏ hàng
  return (
    <div className="flex-1 bg-white p-6 rounded-lg shadow-md mb-4 lg:mb-0 lg:mr-4">
      <h2 className="text-xl font-bold mb-4" style={{paddingTop: "20px"}}>
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
          <div key={cart.cart_id} className="mb-4">
            {cart.games.map((gameItem) => {
              const game = games.find((g) => g.game_id === gameItem.game_id);
              return game ? (
                <>
                  <div
                    key={gameItem.game_id}
                    className="flex items-center border-b pb-4 mb-4"
                  >
                    <input
                      type="checkbox"
                      checked={selectedGames[gameItem.game_id] || false}
                      onChange={(e) =>
                        handleCheckboxChange(e, gameItem.game_id)
                      }
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
                        Tình trạng: Còn hàng
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
                          game.final_price * gameItem.quantity
                        ).toLocaleString()}
                        đ
                      </p>
                      <p className="text-sm line-through text-gray-400">
                        {(game.price * gameItem.quantity).toLocaleString()}đ
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
                </>
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
