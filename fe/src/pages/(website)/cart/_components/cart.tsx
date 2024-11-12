import { useQuery } from "@tanstack/react-query";
import { Image, Skeleton, Table } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";

interface Cart {
  cart_id?: number;
  user_id?: number;
  game_id?: number;
  quantity?: number;
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
  configuration?: string;
}

const CartBoxLeft = () => {
  const [carts, setCarts] = useState<Cart[]>([]);
  const [games, setGames] = useState<Game[]>([]);

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

  const getGameById = (game_id: number) => {
    return games.find((game) => game.game_id === game_id);
  };

  return (
    <div className="flex-1 bg-white p-6 rounded-lg shadow-md mb-4 lg:mb-0 lg:mr-4">
      <h2 className="text-xl font-bold mb-4">Giỏ hàng ({carts.length} sản phẩm)</h2>
      {carts.map((cart) => {
        const game = getGameById(cart.game_id || 0);
        return game ? (
          <div key={cart.cart_id} className="flex items-center border-b pb-4 mb-4">
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
              <button className="px-2 py-1 bg-gray-200 rounded">-</button>
              <input
                type="text"
                value={cart.quantity || 1}
                className="w-12 text-center border mx-2"
                readOnly
              />
              <button className="px-2 py-1 bg-gray-200 rounded">+</button>
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
          <Skeleton key={cart.cart_id} active />
        );
      })}
    </div>
  );
};

export default CartBoxLeft;
