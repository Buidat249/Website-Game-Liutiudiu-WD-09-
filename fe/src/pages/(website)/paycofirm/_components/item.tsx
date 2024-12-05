import React, { useEffect, useState } from "react";
import axios from "axios";

interface CartItemProps {
  game: {
    game_id: number;
    name: string;
    price: number;
    final_price: number;
    image: string;
    description: string;
    key_id: number[];
  };
  quantity: number;
  onKeyIdsUpdate: (gameId: number, keyIds: number[]) => void;
}

const CartItem: React.FC<CartItemProps> = ({ game, quantity, onKeyIdsUpdate }) => {
  const [availableKeysCount, setAvailableKeysCount] = useState<number>(0);
  const [keyIds, setKeyIds] = useState<number[]>([]);
  const [isFetched, setIsFetched] = useState(false); // Cờ kiểm soát để tránh gọi liên tục

  useEffect(() => {
    if (isFetched) return; // Nếu đã fetch, ngừng gọi lại API

    const fetchAvailableKeys = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/games/${game.game_id}/available-keys`
        );

        if (response.data && Array.isArray(response.data.availableKeys)) {
          const availableKeys = response.data.availableKeys.filter(
            (key: any) => !key.is_used
          );
          const fetchedKeyIds = availableKeys.map((key: any) => key.key_id);

          setKeyIds(fetchedKeyIds);
          setAvailableKeysCount(availableKeys.length);

          // Gửi key_ids lên parent component
          onKeyIdsUpdate(game.game_id, fetchedKeyIds);
        } else {
          setAvailableKeysCount(0);
        }
      } catch (error) {
        console.error(`Error fetching keys for game ${game.game_id}:`, error);
        setAvailableKeysCount(0);
      } finally {
        setIsFetched(true); // Đánh dấu đã fetch xong
      }
    };

    fetchAvailableKeys();
  }, [game.game_id, onKeyIdsUpdate, isFetched]);

  return (
    <div className="flex items-center border-b pb-4 mb-4">
      <img src={game.image} alt={game.name} className="w-32 h-20 object-cover rounded" />

      <div className="flex flex-col flex-1 pl-4">
        <h3 className="text-lg font-semibold">{game.name}</h3>
        <p className="text-sm text-gray-500">{game.description}</p>
        <span className="text-green-500">
          Tình trạng: {availableKeysCount} keys khả dụng
        </span>
      </div>

      <div className="flex items-center mx-4">
        <span>Số lượng: {quantity}</span>
      </div>

      <div className="text-right pl-4">
        <p className="text-lg font-semibold text-red-500">
          {(game.final_price * quantity).toLocaleString()}đ
        </p>
        <p className="text-sm line-through text-gray-400">
          {(game.price * quantity).toLocaleString()}đ
        </p>
      </div>
    </div>
  );
};

export default CartItem;
