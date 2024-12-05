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
    key_id: number[]; // Chứa key_id đã được lấy từ API
  };
  quantity: number;
  onKeyIdsUpdate: (gameId: number, keyIds: number[]) => void; // Callback để gửi key_id lên parent component
}

const CartItem: React.FC<CartItemProps> = ({ game, quantity, onKeyIdsUpdate }) => {
  const [availableKeysCount, setAvailableKeysCount] = useState<number>(0);
  const [keyIds, setKeyIds] = useState<number[]>([]);

  useEffect(() => {
    const fetchAvailableKeys = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/games/${game.game_id}/available-keys`
        );
        
        // Lọc các keys có is_used: false
        const availableKeys = response.data.keys.filter((key: any) => !key.is_used);
        
        setKeyIds(availableKeys.map((key: any) => key.key_id));
        setAvailableKeysCount(availableKeys.length);
        
        // Gửi lại key_ids lên parent component
        onKeyIdsUpdate(game.game_id, availableKeys.map((key: any) => key.key_id));
      } catch (error) {
        console.error(`Error fetching keys for game ${game.game_id}:`, error);
        setAvailableKeysCount(0);
      }
    };

    fetchAvailableKeys();
  }, [game.game_id, onKeyIdsUpdate]);

  return (
    <div className="flex items-center border-b pb-4 mb-4">
      {/* Hình ảnh sản phẩm */}
      <img
        src={game.image}
        alt={game.name}
        className="w-32 h-20 object-cover rounded"
      />
      
      {/* Thông tin sản phẩm */}
      <div className="flex flex-col flex-1 pl-4">
        <h3 className="text-lg font-semibold">{game.name}</h3>
        <p className="text-sm text-gray-500">{game.description}</p>
        {/* Hiển thị số lượng keys chưa sử dụng */}
        <span className="text-green-500">
          Tình trạng: {availableKeysCount} keys khả dụng
        </span>
      </div>
      
      {/* Số lượng */}
      <div className="flex items-center mx-4">
        <span>Số lượng: {quantity}</span>
      </div>
      
      {/* Tổng giá */}
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
