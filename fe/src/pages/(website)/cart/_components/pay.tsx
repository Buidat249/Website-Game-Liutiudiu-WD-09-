import { message } from "antd";
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
  const [carts, setCarts] = useState<Cart[]>([]);
  const [games, setGames] = useState<Game[]>([]);
  const [loading, setLoading] = useState(true);
  console.log(carts);
  const navigate = useNavigate();
  const [cartCount, setCartCount] = useState(0);
  const [selectedGames, setSelectedGames] = useState<{
    [gameId: number]: boolean;
  }>({});

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

  console.log(user)
  // Hàm lấy giỏ hàng từ API
  const fetchCartData = () => {
    
    if (user?.user_id) {
      setLoading(true);
      axios
        .get(`http://localhost:8080/carts/${user.user_id}`)
        .then((response) => { // Kiểm tra dữ liệu trả về
          
          if (response.data && response.data.data) {
            setCarts([response.data.data]);
            console.log(carts);  // Chuyển thành mảng nếu cần
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

  useEffect(() => {
    updateCartCount();
  }, [carts]); // Cập nhật cartCount khi carts thay đổi


  const getGameById = (game_id: number) => {
    return games.find((game) => game.game_id === game_id);
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

  const removeGame = (cart_id: number, game_id: number, user_id: number) => {
    axios
      .delete(
        `http://localhost:8080/carts/${cart_id}/game/${game_id}?user_id=${user_id}`
      )
      .then((response) => {
        setCarts((prevCarts) =>
          prevCarts.map((cart) =>
            cart.cart_id === cart_id
              ? {
                  ...cart,
                  games: cart.games.filter(
                    (gameItem) => gameItem.game_id !== game_id
                  ),
                }
              : cart
          )
        );
        updateCartCount();
        message.success("Xóa game khỏi giỏ hàng thành công");
      })
      .catch((error) => {
        message.error("Xóa game thất bại");
        console.error("Error removing game:", error);
      });
  };

  return (
    <div className="w-full lg:w-1/3 bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-xl font-semibold mb-4">Thanh toán</h3>
      <div className="space-y-2">
      <div className="flex justify-between">
          <span>Tổng sản phẩm</span>
          (
        {carts.reduce((total, cart) => total + (cart.games?.length || 0), 0)}{" "}
        Game)
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
