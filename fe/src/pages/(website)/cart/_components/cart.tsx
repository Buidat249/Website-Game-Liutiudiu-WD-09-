import React from 'react';

const CartBoxLeft = () => {
  return (
    <div className="flex-1 bg-white p-6 rounded-lg shadow-md mb-4 lg:mb-0 lg:mr-4">
      <h2 className="text-xl font-bold mb-4">Giỏ hàng (1 sản phẩm)</h2>
      <div className="flex items-center border-b pb-4 mb-4">
        <img
          src="https://yt3.googleusercontent.com/youtube-thumbnail.jpg"
          alt="YouTube Premium"
          className="w-32 h-20 object-cover rounded"
        />
        <div className="flex flex-col flex-1 pl-4">
          <h3 className="text-lg font-semibold">
            YouTube Premium + YouTube Music 1 tháng - Gia hạn chính chủ
          </h3>
          <p className="text-sm text-gray-500">App, Giải trí, Youtube</p>
          <span className="text-green-500">Tình trạng: Còn hàng</span>
        </div>
        <div className="flex items-center">
          <button className="px-2 py-1 bg-gray-200 rounded">-</button>
          <input
            type="text"
            value="1"
            className="w-12 text-center border mx-2"
            readOnly
          />
          <button className="px-2 py-1 bg-gray-200 rounded">+</button>
        </div>
        <div className="text-right pl-4">
          <p className="text-lg font-semibold text-red-500">39.000đ</p>
          <p className="text-sm line-through text-gray-400">280.000đ</p>
        </div>
      </div>
    </div>
  );
};

export default CartBoxLeft;
