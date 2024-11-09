import React from "react";

const CartItem = () => (
  <div className="flex bg-white p-6 rounded-lg shadow-md mb-4">
    <img
      src="https://via.placeholder.com/150"
      alt="Product"
      className="w-32 h-20 object-cover rounded"
    />
    <div className="flex flex-col flex-1 pl-4">
      <h3 className="text-lg font-semibold">GTA Grand Theft Auto V</h3>
      <p className="text-sm text-gray-500">Premium Online Edition - CD</p>
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
      <p className="text-lg font-semibold text-red-500">490.000đ</p>
      <p className="text-sm line-through text-gray-400">280.000đ</p>
    </div>
  </div>
);

export default CartItem;
