// src/EmptyCart.js
import React from "react";
import { FaGift, FaPercent, FaUserFriends } from "react-icons/fa";

const EmptyCart = () => {
  return (
    <div className="max-w-5xl mx-auto bg-white shadow-lg rounded-lg p-6 my-4">
      {/* Phần tiến trình thanh toán */}
      <div className="flex justify-between items-center mb-8">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-blue-500 rounded-full"></div>
            <span className="text-blue-600">Giỏ hàng</span>
          </div>
          <span className="text-gray-400">—</span>
          <span className="text-gray-400">Xác nhận</span>
          <span className="text-gray-400">—</span>
          <span className="text-gray-400">Thanh toán</span>
        </div>
      </div>

      {/* Nội dung giỏ hàng trống */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold mb-2">Giỏ hàng trống!</h2>
          <p className="text-gray-600">
            Thêm sản phẩm vào giỏ và quay lại trang này để thanh toán nha bạn
            &lt;3
          </p>
        </div>

        {/* Hình ảnh minh họa */}
        <img
          src="https://i.imgur.com/oEUksmz.png"
          alt="Empty Cart"
          className="w-48"
        />
      </div>

      {/* Các tùy chọn thêm */}
      <div className="mt-8 flex space-x-8 justify-end">
        <div className="flex items-center space-x-2">
          <FaUserFriends className="text-blue-500" />
          <span>Bạn có mã giới thiệu?</span>
        </div>
        <div className="flex items-center space-x-2">
          <FaPercent className="text-blue-500" />
          <span>Bạn có mã ưu đãi?</span>
        </div>
        <div className="flex items-center space-x-2">
          <FaGift className="text-blue-500" />
          <span>Bạn muốn tặng cho bạn bè?</span>
        </div>
      </div>
    </div>
  );
};

export default EmptyCart;
