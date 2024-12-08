import React from 'react';

interface CartItemMomoProps {
  game: { 
    game_id: number;
    key_id: number[];
    name: string;
    price: number;
    final_price: number;
    image: string;
    description: string;
  };
  quantity: number;
}

const CartItemMomo: React.FC<CartItemMomoProps> = ({ game, quantity }) => {
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
        <span className="text-green-500">Tình trạng: {game.key_id.length}</span>
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

export default CartItemMomo;
