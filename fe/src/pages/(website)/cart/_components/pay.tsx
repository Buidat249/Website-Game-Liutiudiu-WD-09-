import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

interface Cart {
  cart_id: number;
  user_id: number;
  games: { game_id: number; quantity: number }[]; // Mảng game trong giỏ hàng
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
}

const CheckoutBoxRight = ({ totalPrice }: any) => {  // Thêm prop totalPrice để nhận tổng giá trị
  const navigate = useNavigate();
  const [carts, setCarts] = useState<Cart[]>([]);
  const [games, setGames] = useState<Game[]>([]);
  const [cartCount, setCartCount] = useState(0);

  // Hàm chuyển hướng đến các trang thanh toán
  const handlePayment = (method: any) => {
    if (method === "vnpay") {
      navigate("/pay-vnpay");
    } else if (method === "momo") {
      navigate("/pay-momo");
    } else {
      // Khi nhấn nút "Thanh Toán" chuyển tới PagePayCofirm
      navigate("/payconfirm");
    }
  };

  const updateCartCount = () => {
    const count = carts.reduce(
      (total, cart) =>
        total +
        (cart.games?.reduce((count, game) => count + game.quantity, 0) || 0),
      0
    );
    setCartCount(count);
  };

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

  useEffect(() => {
    updateCartCount();
  }, [carts]); // Cập nhật cartCount khi carts thay đổi

  return (
    <div className="w-full lg:w-1/3 bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-xl font-semibold mb-4">Thanh toán</h3>
      <div className="space-y-2">
      <div className="flex justify-between">
          <span>Tổng sản phẩm</span>
          (
        {carts.reduce((total, cart) => total + (cart.games?.length || 0), 0)}{" "})
        </div>
        <div className="flex justify-between">
          <span>Tổng giá trị sản phẩm</span>
          <span>{totalPrice.toLocaleString()}đ</span>  {/* Hiển thị tổng giá trị */}
        </div>
        <div className="flex justify-between">
          <span>Tổng giá trị phải thanh toán</span>
          <span>{totalPrice.toLocaleString()}đ</span>  {/* Cập nhật tổng thanh toán */}
        </div>
      </div>
      <div className="mt-6 space-y-3">
        <button
          className="w-full bg-blue-600 text-white py-2 rounded"
          onClick={() => handlePayment("confirm")}
        >
          Thanh Toán
        </button>
        <button
          className="w-full bg-blue-700 text-white py-2 rounded flex items-center justify-center"
          onClick={() => handlePayment("vnpay")}
        >
          <span className="mr-2">📱</span> Mua siêu tốc qua Mobile Banking
        </button>
        <button
          className="w-full bg-pink-500 text-white py-2 rounded flex items-center justify-center"
          onClick={() => handlePayment("momo")}
        >
          <span className="mr-2">💸</span> Mua siêu tốc với MoMo
        </button>
      </div>
    </div>
  );
};

export default CheckoutBoxRight;
