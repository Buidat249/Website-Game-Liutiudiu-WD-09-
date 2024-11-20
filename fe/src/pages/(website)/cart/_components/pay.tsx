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

const CheckoutBoxRight = ({ totalPrice, totalQuantity }: any) => {
  const [carts, setCarts] = useState<Cart[]>([]);
  const [games, setGames] = useState<Game[]>([]);
  const [loading, setLoading] = useState(true);
  const [showPaymentButton, setShowPaymentButton] = useState(false);
  const { selectedGames, setSelectedGames } = useCartContext(); // Sử dụng CartContext
  const [paymentMethod, setPaymentMethod] = useState<string | null>(null);
  const navigate = useNavigate();

  // Kiểm tra user khi đăng nhập
  const user = JSON.parse(localStorage.getItem('user') || '{}');

  // Hàm lấy giỏ hàng từ API
  const fetchCartData = () => {
    if (user?.user_id) {
      setLoading(true);
      axios
        .get(`http://localhost:8080/carts/${user.user_id}`)
        .then((response) => {
          if (response.data && response.data.data) {
            setCarts([response.data.data]);
          } else {
            setCarts([]);
          }
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching carts:", error);
          setLoading(false);
        });
    } else {
      setCarts([]);
      setLoading(false);
    }
  };

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

  // Gọi dữ liệu khi component load và khi user thay đổi
  useEffect(() => {
    if (user?.user_id) {
      fetchCartData();
      fetchGameData();
    }
  }, [user?.user_id]);

  // Lắng nghe sự thay đổi của carts và log ra khi cập nhật
  useEffect(() => {
  }, [carts]); // Khi carts thay đổi, useEffect này sẽ được gọi

  // Xử lý khi bấm nút xác nhận thanh toán
  const handleConfirmPayment = () => {
    const selectedItems = games
      .filter((game) => selectedGames[game.game_id]?.selected)
      .map((game) => ({
        ...game,
        quantity: selectedGames[game.game_id]?.quantity || 1,
      }));
  
    console.log("Selected Items for Momo:", selectedItems); // Kiểm tra lại selectedItems
  
    if (paymentMethod === "vnpay") {
      navigate("/pay-vnpay", { state: { selectedItems } });
    } else if (paymentMethod === "momo") {
      navigate("/pay-momo", { state: { selectedItems } });
    }
  };

  // Hàm xử lý chọn phương thức thanh toán
  const handlePayment = (method: string) => {
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

    if (method === "vnpay" || method === "momo") {
      setPaymentMethod(method); // Lưu phương thức thanh toán
      setShowPaymentButton(true); // Hiện nút Xác Nhận Thanh Toán
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
          {totalQuantity.toLocaleString()}
        </div>
        <div className="flex justify-between">
          <span>Tổng giá trị sản phẩm</span>
          <span>{totalPrice.toLocaleString()}đ</span>
        </div>
        <div className="flex justify-between">
          <span>Số dư hiện tại</span>
          <span className="font-medium text-gray-900">{user.money.toLocaleString()}đ</span>
        </div>
        <div className="flex justify-between">
          <span>Tổng giá trị phải thanh toán</span>
          <span>{totalPrice.toLocaleString()}đ</span>
        </div>
      </div>

      <div className="mt-6 space-y-3">
        {!showPaymentButton && (
          <>
            {user.money.toLocaleString() > totalPrice.toLocaleString() ? (
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
            <p style={{ textAlign: "center", fontSize: "13px", padding: "10px" }}>
              Quét mã. Thanh toán. Không cần nạp tiền
            </p>
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
          </>
        )}

        {showPaymentButton && (
          <button
            className="w-full bg-green-600 text-white py-2 rounded"
            onClick={handleConfirmPayment}
          >
            Xác Nhận Thanh Toán
          </button>
        )}
      </div>
    </div>
  );
};

export default CheckoutBoxRight;
