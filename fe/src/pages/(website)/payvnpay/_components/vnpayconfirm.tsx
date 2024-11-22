import { message } from "antd";
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

interface Game {
  game_id: number;
  name: string;
  price: number;
  discount: number;
  final_price: number;
  quantity: number;
}

interface CheckoutSummaryVnpayProps {
  games: Game[]; // Nhận danh sách game đã chọn
}

const CheckoutSummaryVnpay: React.FC<CheckoutSummaryVnpayProps> = ({ games }) => {
    const location = useLocation();
  const navigate = useNavigate();
  const selectedItems = location.state?.selectedItems || []; 
  console.log('hihi',selectedItems);
  const totalQuantity = games.reduce((acc, game) => acc + game.quantity, 0);
  const totalPrice = games.reduce(
    (acc, game) => acc + game.final_price * game.quantity,
    0
  );
  console.log('tong tien',totalPrice)

  const user = JSON.parse(localStorage.getItem("user") || "{}");

  const handleConfirmPayment = async () => {
    if (totalQuantity < 1) {
      message.warning("Bạn chưa chọn sản phẩm nào để thanh toán!");
      return;
    }
  
    // Dữ liệu gửi lên backend
    const orderData = {
      user_id: user.user_id, // ID người dùng
      games: games.map((game) => ({
        game_id: game.game_id,
        name: game.name,
        quantity: game.quantity,
        price: game.price,
        discount: game.discount,
        final_price: game.final_price,
      })),
      total_price: totalPrice, // Tổng tiền
    };
    console.log('Dữ liệu gửi:', orderData);
  
    try {
      const response = await fetch("http://localhost:8080/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(orderData),
      });
  
      if (response.ok) {
        const data = await response.json();
        console.log("Đơn hàng đã được tạo:", data);
  
        // Sau khi tạo đơn hàng thành công, điều hướng đến trang /vnpayment và truyền dữ liệu cần thiết
        navigate("/vnpayment", { state: { selectedItems, order_id: data.data.order_id } });
      } else {
        message.error("Đơn hàng tạo thất bại!");
      }
    } catch (error) {
      console.error("Lỗi khi tạo đơn hàng:", error);
      message.error("Đã có lỗi xảy ra, vui lòng thử lại!");
    }
  };
  

  const handleBackToCart = () => {
    navigate("/cart");
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <h3 className="text-2xl font-semibold mb-6 text-gray-800">Thanh toán</h3>
      <div className="space-y-4">
        <div className="flex justify-between text-sm text-gray-600">
          <span>Tổng giá trị sản phẩm</span>
          <span className="font-medium text-gray-900">
            {totalPrice.toLocaleString()}đ
          </span>
        </div>
        <div className="flex justify-between text-sm text-gray-600">
          <span>Số dư hiện tại</span>
          <span className="font-medium text-gray-900">
            {user.money.toLocaleString()}đ
          </span>
        </div>
      </div>
      <button
        className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition duration-200 mt-6 flex items-center justify-center"
        onClick={handleConfirmPayment}
      >
        <span className="mr-2">💳</span> Xác nhận thanh toán
      </button>
      <button
        className="mt-4 w-full text-blue-600 text-sm hover:text-blue-800"
        onClick={handleBackToCart}
      >
        🔙 Trở về giỏ hàng
      </button>
    </div>
  );
};

export default CheckoutSummaryVnpay;
