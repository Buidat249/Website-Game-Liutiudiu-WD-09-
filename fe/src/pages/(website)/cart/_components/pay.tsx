import { message } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCartContext } from "./cartcontext";
// Import hook để sử dụng CartContext

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
  const { selectedGames, setSelectedGames } = useCartContext(); // Sử dụng CartContext
  console.log('dl', selectedGames)
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

  const getQuantityForGame = (gameId: number) => {
    // Tìm game trong giỏ hàng và lấy số lượng
    const cart = carts.find(cart => cart.user_id === user.user_id);
    if (cart) {
      const gameInCart = cart.games.find(game => game.game_id === gameId);
      return gameInCart ? gameInCart.quantity : 1; // Nếu không tìm thấy số lượng thì mặc định là 1
    }
    return 1; // Nếu không có cart, mặc định là 1
  };


  // Hàm chuyển hướng đến các trang thanh toán
  const handlePayment = (method: any) => {
    const selectedItems = games
      .filter((game) => selectedGames[game.game_id]?.selected) // Kiểm tra sản phẩm đã chọn
      .map((game) => ({
        ...game,
        quantity: selectedGames[game.game_id]?.quantity || 1, // Lấy số lượng từ selectedGames
      }));
  
    console.log("Selected Items to be passed to payment: ", selectedItems);
  
    if (selectedItems.length === 0) {
      message.error("Vui lòng chọn ít nhất một sản phẩm!");
      return;
    }
  
    if (method === "vnpay") {
      navigate("/payment", { state: { selectedItems } });
    } else if (method === "momo") {
      navigate("/momo", { state: { selectedItems } });
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
          <span>Tổng giá trị phải thanh toán</span>
          <span>{totalPrice.toLocaleString()}đ</span>
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
