import { message } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCartContext } from "./cartcontext";

interface Cart {
  cart_id: number;
  user_id: number;
  games: { game_id: number; quantity: number }[]; // Mảng game trong giỏ hàng
}

interface Game {
  game_id: number;
  name: string;
  price: number;
  discount: number;
  final_price: number;
  image: string;
  title: string;
  keys: any[];  // Mảng keys của game
}

const CheckoutBoxRight = ({ totalPrice, totalQuantity }: any) => {
  const [games, setGames] = useState<Game[]>([]);
  const { selectedGames } = useCartContext(); // Sử dụng CartContext
  const [paymentMethod, setPaymentMethod] = useState<string | null>(null);
  const navigate = useNavigate();

  // Kiểm tra user khi đăng nhập
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  const money = JSON.parse(localStorage.getItem("money") || "{}");

  // Hàm lấy sản phẩm
  const fetchGameData = () => {
    axios
      .get("http://localhost:8080/games")
      .then((response) => {
        setGames(response.data.data);
      })
      .catch((error) => {
        console.error("Error fetching games:", error);
      });
  };

  // Gọi dữ liệu khi component load
  useEffect(() => {
    fetchGameData();
  }, []);

  // Hàm kiểm tra số lượng keys của sản phẩm
  const checkAvailableKeys = () => {
    const unavailableGames: string[] = []; // Đảm bảo kiểu của unavailableGames là mảng chuỗi
  
    // Kiểm tra từng game đã chọn có đủ keys không
    Object.keys(selectedGames).forEach((gameId : any) => {
      const game = games.find((g) => g.game_id === parseInt(gameId));
      const selectedQuantity = selectedGames[gameId]?.quantity;
  
      if (game && game.keys?.length < selectedQuantity) {
        unavailableGames.push(game.name);
      }
    });
  
    return unavailableGames;
  };

  // Hàm xử lý chọn phương thức thanh toán
  const handlePayment = (method: string) => {
    const unavailableGames = checkAvailableKeys();

    if (unavailableGames.length > 0) {
      // Nếu có sản phẩm thiếu keys
      message.error(
        `Không đủ keys cho các sản phẩm: ${unavailableGames.join(", ")}. Vui lòng chọn lại sản phẩm hoặc số lượng.`
      );
      return;
    }

    const selectedItems = games
      .filter((game) => selectedGames[game.game_id]?.selected)
      .map((game) => ({
        ...game,
        quantity: selectedGames[game.game_id]?.quantity || 1,
      }));

    if (selectedItems.length === 0) {
      message.error("Vui lòng chọn ít nhất một sản phẩm!");
      return;
    }

    if (method === "vnpay") {
      navigate("/vnpayconfirm", { state: { selectedItems } });
    } else if (method === "momo") {
      navigate("/momoconfirm", { state: { selectedItems } });
    } else {
      navigate("/payconfirm", { state: { selectedItems } });
    }
  };

  return (
    <div className="w-full lg:w-1/3 bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-xl font-semibold mb-4">Thanh toán</h3>
      <div className="space-y-2">
        <div className="flex justify-between">
          <span>Tổng sản phẩm</span>
          <span>{totalQuantity.toLocaleString()}</span>
        </div>
        <div className="flex justify-between">
          <span>Tổng giá trị sản phẩm</span>
          <span>{totalPrice.toLocaleString()}đ</span>
        </div>
        <div className="flex justify-between">
          <span>Số dư hiện tại</span>
          <span className="font-medium text-gray-900">
            {user.money.toLocaleString()}đ
          </span>
        </div>
        <div className="flex justify-between">
          <span>Tổng giá trị phải thanh toán</span>
          <span>{totalPrice.toLocaleString()}đ</span>
        </div>
      </div>

      <div className="mt-6 space-y-3">
        {user.money >= totalPrice ? (
          <button
            className="w-full bg-green-600 text-white py-2 rounded"
            onClick={() => handlePayment("confirm")}
          >
            Thanh Toán
          </button>
        ) : (
          <button
            className="w-full bg-blue-600 text-white py-2 rounded"
            onClick={() => navigate("/paymentMethods")}
          >
            Nạp tiền vào tài khoản
          </button>
        )}

        <p
          style={{
            textAlign: "center",
            fontSize: "13px",
            padding: "10px",
          }}
        >
          Quét mã. Thanh toán. Không cần nạp tiền
        </p>

        {/* Hiển thị nút MoMo và VNPAY nếu totalPrice > 0 */}
        {totalPrice > 0 && (
          <>
            <button
              className="w-full bg-blue-700 text-white py-2 rounded flex items-center justify-center"
              onClick={() => handlePayment("vnpay")}
            >
              <span className="mr-2">📱</span> Mua siêu tốc qua Mobile Banking
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default CheckoutBoxRight;
