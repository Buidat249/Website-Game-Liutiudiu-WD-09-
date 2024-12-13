import Cart from "../models/cart";
import { VNPay, ProductCode, VnpLocale, dateFormat } from 'vnpay';

function sortObject(obj) {
  const sortedKeys = Object.keys(obj).sort(); // Lấy danh sách key và sắp xếp tăng dần
  const sortedObj = {}; // Khởi tạo đối tượng mới

  for (const key of sortedKeys) {
    sortedObj[key] = obj[key]; // Thêm key và giá trị vào đối tượng mới
  }

  return sortedObj; // Trả về đối tượng đã sắp xếp
}

// GET /carts
export const getAllCarts = async (req, res) => {
  try {
    const carts = await Cart.find();
    return res.status(200).json({
      message: "Get All Carts Done",
      data: carts,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// GET /carts/:user_id
export const getCartDetail = async (req, res) => {
  try {
    // Sử dụng user_id thay vì cart_id
    const cart = await Cart.findOne({ user_id: req.params.id });

    if (!cart) {
      return res.status(404).json({
        message: "Giỏ hàng không tìm thấy",
      });
    }
    return res.status(200).json({
      message: "Get Cart Detail Done",
      data: cart,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// POST /carts
// POST /carts
export const addCart = async (req, res) => {
  const { gameId, userId } = req.body;

  if (!userId || !gameId) {
    return res
      .status(400)
      .json({ message: "Thiếu userId hoặc gameId trong yêu cầu." });
  }

  try {
    let cart = await Cart.findOne({ user_id: userId });

    if (!cart) {
      // Nếu không có giỏ hàng, tạo mới
      cart = new Cart({
        user_id: userId,
        games: [{ game_id: gameId, quantity: 1 }],
      });
    } else {
      // Kiểm tra xem game có trong giỏ hàng chưa
      const gameInCart = cart.games.find((game) => game.game_id === gameId);

      if (gameInCart) {
        // Nếu có rồi thì tăng số lượng
        gameInCart.quantity += 1;
      } else {
        // Nếu chưa có thì thêm mới vào mảng games
        cart.games.push({ game_id: gameId, quantity: 1 });
      }
    }

    // Lưu lại giỏ hàng
    await cart.save();
    res
      .status(200)
      .json({ message: "Sản phẩm đã được thêm vào giỏ hàng!", data: cart });
  } catch (error) {
    console.error("Lỗi khi thêm sản phẩm vào giỏ hàng:", error);
    res
      .status(500)
      .json({ message: "Lỗi khi thêm sản phẩm vào giỏ hàng", error });
  }
};

// PUT /carts/:id
// PUT /carts/:user_id
export const updateCart = async (req, res) => {
  const { user_id } = req.params;
  const { games } = req.body; // Mảng các game mới cần cập nhật vào giỏ hàng

  if (!games || !Array.isArray(games)) {
    return res.status(400).json({
      message: "Thiếu games trong yêu cầu hoặc games không phải là mảng",
    });
  }

  try {
    // Tìm giỏ hàng theo user_id thay vì cart_id
    const cart = await Cart.findOne({ user_id: user_id });
    if (!cart) {
      return res.status(404).json({
        message: "Giỏ hàng không tìm thấy",
      });
    }

    // Cập nhật giỏ hàng với các game mới
    cart.games = games;

    // Lưu lại giỏ hàng
    await cart.save();

    return res.status(200).json({
      message: "Cập nhật giỏ hàng thành công",
      data: cart,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// PUT /carts/:cart_id/game/:game_id
export const updateGameQuantityInCart = async (req, res) => {
  const { cart_id, game_id } = req.params;
  const { quantity } = req.body; // Số lượng mới cần cập nhật

  if (!quantity) {
    return res.status(400).json({ message: "Thiếu quantity trong yêu cầu" });
  }

  try {
    // Tìm giỏ hàng theo cart_id
    const cart = await Cart.findOne({ cart_id: cart_id });
    if (!cart) {
      return res.status(404).json({
        message: "Giỏ hàng không tìm thấy",
      });
    }

    // Tìm game trong giỏ hàng
    const game = cart.games.find((game) => game.game_id === parseInt(game_id)); // Đảm bảo game_id là số
    if (!game) {
      return res.status(404).json({
        message: "Sản phẩm không có trong giỏ hàng",
      });
    }

    // Cập nhật số lượng game trong giỏ hàng
    game.quantity = quantity;

    // Lưu lại giỏ hàng
    await cart.save();

    return res.status(200).json({
      message: "Cập nhật số lượng sản phẩm thành công",
      data: cart,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// DELETE /carts/:id
export const removeCart = async (req, res) => {
  try {
    const cart = await Cart.findOneAndDelete({ cart_id: req.params.id }); // Xóa giỏ hàng
    if (!cart) {
      return res.status(404).json({
        message: "Cart Not Found",
      });
    }
    return res.status(200).json({
      message: "Delete Cart Done",
      data: cart,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// DELETE /carts/:cart_id/game/:game_id
export const removeGameFromCart = async (req, res) => {
  try {
    const { cart_id, game_id } = req.params;
    const user_id = req.query.user_id; // Lấy `user_id` từ query params

    console.log("cart_id:", cart_id, "game_id:", game_id, "user_id:", user_id);

    // Tìm giỏ hàng có `cart_id` và `user_id`
    const cart = await Cart.findOne({ cart_id, user_id });
    if (!cart) {
      return res.status(404).json({
        message: "Giỏ hàng không tìm thấy hoặc không phải của người dùng này",
      });
    }

    // Lọc ra các game không có `game_id` cần xóa
    cart.games = cart.games.filter(
      (gameItem) => gameItem.game_id !== parseInt(game_id)
    );

    // Lưu giỏ hàng sau khi đã xoá game
    await cart.save();

    return res.status(200).json({
      message: "Game removed from cart successfully",
      data: cart,
    });
  } catch (error) {
    console.error("Error in removeGameFromCart:", error); // Kiểm tra lỗi cụ thể
    return res.status(500).json({ message: error.message });
  }
};

export const createPayQrVnPay = async (req, res) => {
  const vnpay = new VNPay({
    tmnCode: "FKYQKRXQ",
    secureSecret: "8K03P3S8NFR8WVJL1PNLFZ5IQIDKIVRB",
    vnpayHost: "https://sandbox.vnpayment.vn",
    testMode: true, 
    hashAlgorithm: "SHA512", 
    enableLog: true, 
    loggerFn: () => {}, 
  });

  var ipAddr = req.headers['x-forwarded-for'] ||
      req.connection.remoteAddress ||
      req.socket.remoteAddress ||
      req.connection.socket.remoteAddress;

  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);

  const paymentUrl = vnpay.buildPaymentUrl({
      vnp_Amount: req.query.amount,
      vnp_IpAddr: ipAddr,
      vnp_TxnRef: req.query.ref,
      vnp_OrderInfo: 'Thanh toan don hang',
      vnp_OrderType: ProductCode.Other,
      vnp_ReturnUrl: 'http://localhost:8080/orders/confirm/vnpay',
      vnp_Locale: VnpLocale.VN, // 'vn' hoặc 'en'
      vnp_CreateDate: dateFormat(new Date()), 
      vnp_ExpireDate: dateFormat(tomorrow), 
  });
  
  res.redirect(paymentUrl)
};
