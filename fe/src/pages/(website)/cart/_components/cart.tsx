import { Image, Skeleton, Button, message } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";

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

const CartBoxLeft = () => {
  const [carts, setCarts] = useState<Cart[]>([]);
  const [games, setGames] = useState<Game[]>([]);

  // Lấy dữ liệu giỏ hàng và sản phẩm
  useEffect(() => {
    axios
      .get("http://localhost:8080/carts")
      .then((response) => {
        setCarts(response.data.data);
      })
      .catch((error) => {
        console.error("Error fetching carts:", error);
      });

    axios
      .get("http://localhost:8080/games")
      .then((response) => {
        setGames(response.data.data);
      })
      .catch((error) => {
        console.error("Error fetching games:", error);
      });
  }, []);

  // Hàm tìm game theo game_id
  const getGameById = (game_id: number) => {
    return games.find((game) => game.game_id === game_id);
  };

  // Hàm cập nhật số lượng game trong giỏ hàng
  const updateQuantity = (cart_id: number, game_id: number, quantity: number) => {
    axios
      .put(`http://localhost:8080/carts/${cart_id}/game/${game_id}`, { quantity })
      .then((response) => {
        
        // Cập nhật lại giỏ hàng sau khi thay đổi
        setCarts((prevCarts) =>
          prevCarts.map((cart) =>
            cart.cart_id === cart_id
              ? {
                  ...cart,
                  games: cart.games.map((gameItem) =>
                    gameItem.game_id === game_id
                      ? { ...gameItem, quantity }
                      : gameItem
                  ),
                }
              : cart
          )
        );
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
      }
    }
  };

  // Render giao diện giỏ hàng
  return (
    <div className="flex-1 bg-white p-6 rounded-lg shadow-md mb-4 lg:mb-0 lg:mr-4">
      <h2 className="text-xl font-bold mb-4">Giỏ hàng ({carts.length} sản phẩm)</h2>
      {carts.length === 0 ? (
        <p>Giỏ hàng của bạn đang trống.</p>
      ) : (
        carts.map((cart) => (
          <div key={cart.cart_id} className="mb-4">
            {cart.games.map((gameItem) => {
              const game = getGameById(gameItem.game_id);
              return game ? (
                <div key={gameItem.game_id} className="flex items-center border-b pb-4 mb-4">
                  <Image
                    src={game.image}
                    alt={game.name}
                    className="w-32 h-20 object-cover rounded"
                  />
                  <div className="flex flex-col flex-1 pl-4">
                    <h3 className="text-lg font-semibold">{game.name}</h3>
                    <p className="text-sm text-gray-500">{game.title}</p>
                    <span className="text-green-500">Tình trạng: Còn hàng</span>
                  </div>
                  <div className="flex items-center">
                    <Button
                      className="px-2 py-1 bg-gray-200 rounded"
                      onClick={() => handleQuantityChange(cart.cart_id, gameItem.game_id, "decrease")}
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
                      onClick={() => handleQuantityChange(cart.cart_id, gameItem.game_id, "increase")}
                    >
                      +
                    </Button>
                  </div>
                  <div className="text-right pl-4">
                    <p className="text-lg font-semibold text-red-500">
                      {game.final_price.toLocaleString()}đ
                    </p>
                    <p className="text-sm line-through text-gray-400">
                      {game.price.toLocaleString()}đ
                    </p>
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
