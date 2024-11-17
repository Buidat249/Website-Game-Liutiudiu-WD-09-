import { Image, Skeleton, Button, message } from "antd";
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
const CheckoutSummary = () => {
  const [carts, setCarts] = useState<Cart[]>([]);
  const [games, setGames] = useState<Game[]>([]);

  const [loading, setLoading] = useState(true);
  console.log(carts);
  const [cartCount, setCartCount] = useState(0);
  const [selectedGames, setSelectedGames] = useState<{
    [gameId: number]: boolean;
  }>({});
  const [paymentSuccess, setPaymentSuccess] = useState(false); // State để theo dõi trạng thái thanh toán
  const navigate = useNavigate();

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>, gameId: number) => {
    setSelectedGames((prevSelected) => ({
      ...prevSelected,
      [gameId]: event.target.checked,
    }));
  };

  const calculateTotal = () => {
    return carts.reduce((total, cart) => {
      cart.games.forEach((gameItem) => {
        if (selectedGames[gameItem.game_id]) {
          const game = games.find((game) => game.game_id === gameItem.game_id);
          if (game) {
            total += game.final_price * gameItem.quantity;
          }
        }
      });
      return total;
    }, 0);
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

  // Kiểm tra user khi đăng nhập
  const user = JSON.parse(localStorage.getItem('user') || '{}');

  // Hàm lấy giỏ hàng từ API
  const fetchCartData = () => {
    if (user?.user_id) {
      setLoading(true);
      axios
        .get(`http://localhost:8080/carts/${user.user_id}`)
        .then((response) => {
          console.log(response.data); // Kiểm tra dữ liệu trả về
          if (response.data && response.data.data) {
            setCarts([response.data.data]);  // Chuyển thành mảng nếu cần
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

    // Hàm cập nhật số lượng game trong giỏ hàng
    const updateQuantity = (
      cart_id: number,
      game_id: number,
      quantity: number
    ) => {
      axios
        .put(`http://localhost:8080/carts/${cart_id}/game/${game_id}`, { quantity })
        .then(() => {
          fetchCartData(); // Tải lại giỏ hàng sau khi cập nhật
        })
        .catch((error) => {
          message.error("Cập nhật số lượng thất bại");
          console.error("Error updating quantity:", error);
        });
    };

    // Hàm xử lý tăng giảm số lượng
    const handleQuantityChange = (
      cart_id: number,
      game_id: number,
      action: "increase" | "decrease"
    ) => {
      const cart = carts.find((cart) => cart.cart_id === cart_id);
      if (cart) {
        const game = cart.games.find((gameItem) => gameItem.game_id === game_id);
        if (game) {
          const newQuantity =
            action === "increase"
              ? game.quantity + 1
              : Math.max(1, game.quantity - 1);
          updateQuantity(cart_id, game_id, newQuantity);
          updateCartCount(); // Gọi hàm cập nhật số lượng sản phẩm sau khi thay đổi
        }
      }
    };


  // Hàm xử lý xác nhận thanh toán
  const handleConfirmPayment = () => {
    // Giả sử thanh toán thành công
    setPaymentSuccess(true);

    // Sau khi xác nhận thanh toán, chuyển hướng về trang chủ sau 2 giây
    setTimeout(() => {
      navigate("/"); // Đưa người dùng về trang chủ
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
          <span className="font-medium text-gray-900"></span>
        </div>
        <div className="flex justify-between text-sm text-gray-600">
          <span>Tổng giá trị phải thanh toán</span>
          <span className="font-medium text-gray-900">831.000đ</span>
        </div>
        <div className="flex justify-between text-sm text-gray-600">
          <span>Số dư hiện tại</span>
          <span className="font-medium text-gray-900">0đ</span>
        </div>
        <div className="flex justify-between text-sm font-bold text-gray-900">
          <span>Số tiền cần nạp thêm</span>
          <span className="text-red-600">831.000đ</span>
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
