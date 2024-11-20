import { message } from "antd";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCartContext } from "../../cart/_components/cartcontext";

interface Game {
  game_id: number;
  name: string;
  price: number;
  discount: number;
  final_price: number;
  quantity: number;
}

interface CheckoutSummaryProps {
  games: Game[]; // Nhận danh sách game đã chọn
}


const CheckoutSummary: React.FC<CheckoutSummaryProps> = ({ games }) => {
  const navigate = useNavigate();
  const totalQuantity = games.reduce((acc, game) => acc + game.quantity, 0);
  const totalPrice = games.reduce(
    (acc, game) => acc + game.final_price * game.quantity,
    0
  );
  console.log('gameee', games)
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  const user = JSON.parse(localStorage.getItem('user') || '{}');


  // Hàm xử lý xác nhận thanh toán
  const handleConfirmPayment = () => {
    if (totalPrice === 0) {
      message.warning("Bạn chưa chọn sản phẩm nào để thanh toán!");
      return;
    }

    // Giả sử thanh toán thành công
    setPaymentSuccess(true);

    // Sau khi xác nhận thanh toán, chuyển hướng về trang chủ sau 2 giây
    setTimeout(() => {
      navigate("/");
    }, 2000);
  };

  // Hàm chuyển hướng về trang giỏ hàng
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
          <span className="font-medium text-gray-900">{user.money.toLocaleString()}đ</span>
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
      {/* Hiển thị thông báo thanh toán thành công nếu state paymentSuccess là true */}
      {paymentSuccess && (
        <div className="mt-4 text-center text-green-500 font-semibold">
          Thanh toán thành công! Bạn sẽ được chuyển hướng về trang chủ...
        </div>
      )}
    </div>
  );
};



export default CheckoutSummary;
