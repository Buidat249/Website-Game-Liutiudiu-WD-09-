import { message } from "antd";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

interface Game {
  game_id: number;
  name: string;
  price: number;
  discount: number;
  final_price: number;
  quantity: number;
  key_id: number[]; // Thêm key_id vào
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
  console.log("Tổng tiền", totalPrice);

  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  const handleConfirmPayment = async () => {
    if (totalQuantity < 1) {
      message.warning("Bạn chưa chọn sản phẩm nào để thanh toán!");
      return;
    }

    if (user.money < totalPrice) {
      message.error("Số dư không đủ để thanh toán!");
      return;
    }

    const orderData = {
      user_id: user.user_id,
      games: games.map((game) => ({
        game_id: game.game_id,
        name: game.name,
        quantity: game.quantity,
        price: game.price,
        discount: game.discount,
        final_price: game.final_price,
        key_ids: game.key_id,
      })),
      total_price: totalPrice,
    };
    console.log("Dữ liệu đơn hàng:", orderData);

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

        // Giả sử thanh toán thành công, trừ tiền và cập nhật localStorage
        const newBalance = user.money - totalPrice;
        user.money = newBalance;
        localStorage.setItem("user", JSON.stringify(user));

        // Cập nhật state hiển thị và chuyển hướng
        setPaymentSuccess(true);
        setTimeout(() => {
          navigate("/");
        }, 2000);
        message.success("Thanh toán thành công!");
      } else {
        message.error("Thanh toán thất bại!");
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
      {paymentSuccess && (
        <div className="mt-4 text-center text-green-500 font-semibold">
          Thanh toán thành công! Bạn sẽ được chuyển hướng về trang chủ...
        </div>
      )}
    </div>
  );
};

export default CheckoutSummary;
