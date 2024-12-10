import Order from "../models/order";
import Transaction from "../models/transaction";
import User from "../models/User";
import Key from "../models/key";

// GET / orders
export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find();
    return res.status(200).json({
      message: "Get All Orders Done",
      data: orders,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// GET /orders/:user_id
export const getOrderDetail = async (req, res) => {
  try {
    const userId = req.params.userId;

    // Chỉ cần gửi tất cả dữ liệu mà không lọc trên backend
    const orders = await Order.find({ user_id: userId });

    if (orders.length === 0) {
      return res.status(200).json({ data: [] }); // Trả về mảng rỗng nếu không có đơn hàng
    }

    return res.status(200).json({ data: orders });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Có lỗi xảy ra khi lấy đơn hàng" });
  }
};

//Get status oders
export const getOrderStatus = async (req, res) => {
  try {
    const order = await Order.findOne({ order_id: parseInt(req.params.id) });
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    return res.status(200).json({
      message: "Order found",
      status: order.status,
      payment_status: order.payment_status, // Trả về payment_status
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// POST /orders

export const addOrder = async (req, res) => {
  try {
    const { user_id, games, total_price, status } = req.body;

    const orderStatus = status || "pending";

    // Kiểm tra dữ liệu đầu vào
    if (
      !user_id ||
      !Array.isArray(games) ||
      games.length === 0 ||
      total_price === undefined
    ) {
      return res.status(400).json({
        message: "Invalid data. Please check user_id, games, and total_price.",
      });
    }

    const updatedGames = [];

    // Lặp qua từng game
    for (const game of games) {
      // Lấy các keys chưa sử dụng của game
      const availableKeys = await Key.find({
        game_id: game.game_id,
        is_used: false,
      }).sort({ createdAt: 1 });

      // Kiểm tra số lượng keys có đủ hay không
      if (availableKeys.length < game.quantity) {
        return res.status(400).json({
          message: `Không đủ số lượng keys cho game ID: ${game.game_id} - ${game.name}. Chỉ còn ${availableKeys.length} keys.`,
        });
      }

      // Cập nhật trạng thái is_used của các keys mà người dùng muốn mua
      const keysToUpdate = availableKeys.slice(0, game.quantity);
      await Key.updateMany(
        { _id: { $in: keysToUpdate.map((key) => key._id) } },
        { $set: { is_used: true, user_id: user_id, used_at: orderStatus == "completed" ? new Date() : undefined } }
      );

      // Cập nhật thông tin game đã mua cùng keys
      updatedGames.push({
        ...game,
        game_keys: keysToUpdate.map((key) => key.key), // Lưu lại danh sách keys đã mua (key string)
        key_ids: keysToUpdate.map((key) => ({
          key_id: key.key_id,
          key_name: key.name,
        })), // Lưu cả key_id và key_name vào key_ids
      });
    }

    // Tạo đơn hàng mới
    const lastOrder = await Order.findOne({}, {}, { sort: { order_id: -1 } });
    const newOrderId = lastOrder ? lastOrder.order_id + 1 : 1;

    const order = await Order.create({
      order_id: newOrderId,
      user_id,
      games: updatedGames, // Cập nhật với game có key_ids và game_keys
      total_price,
      status: orderStatus, // Sửa thành 'completed'
    });

    // Cập nhật ví tiền khách hàng
    if (orderStatus == "completed") {
      const userCur = await User.findOne({ user_id });
      // Cập nhật thông tin người dùng
      const user = await User.findOneAndUpdate(
        { user_id },
        {
          money: Number.parseInt(userCur.money ?? 0) - Number.parseInt(total_price),
        });
    }

    // Trả về thông tin đơn hàng mới đã tạo
    res.status(201).json({
      message: "Order created successfully",
      data: {
        order,
        urlPay: `/carts/create-pay/vnpay?amount=${total_price}&ref=${newOrderId}`,
      },
    });
  } catch (error) {
    console.error("Error creating order:", error);
    res.status(500).json({
      message: "An error occurred while creating the order.",
    });
  }
};

// PUT / orders / :id

export const updateOrder = async (req, res) => {
  try {
    const order = await Order.findOneAndUpdate(
      { order_id: req.params.id },
      req.body,
      {
        new: true,
      }
    );
    if (!order) {
      return res.status(404).json({
        message: "Order Not Found",
      });
    }
    return res.status(200).json({
      message: "Update Order Done",
      data: order,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// DELETE / orders / :id

export const removeOrder = async (req, res) => {
  try {
    const order = await Order.findOneAndDelete({ order_id: req.params.id });
    if (!order) {
      return res.status(404).json({
        message: "Order Not Found",
      });
    }
    return res.status(200).json({
      message: "Delete Order Done",
      data: order,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const confirmVnPay = async (req, res) => {
  if (req.query.vnp_TxnRef.startsWith("naptienthucong")) {
    if (req.query.vnp_TransactionStatus !== '00') {
      return res.redirect(
        `http://localhost:5173/vnpay/fall?order_id=${req.query.vnp_TxnRef}&amount=${req.query.vnp_Amount}`
      );
    }
    const user_id = req.query.vnp_TxnRef.split("_")[1];
    try {
      // Chuyển đổi user_id sang kiểu số
      const userId = parseInt(user_id, 10);
      if (isNaN(userId)) {
        return res.status(400).json({ message: "ID người dùng không hợp lệ" });
      }

      const lastTransaction = await Transaction.findOne({}, {}, { sort: { transaction_id: -1 } });
      const newTransactionId = lastTransaction ? lastTransaction.transaction_id + 1 : 1;

      const transactionData = {
          transaction_id: newTransactionId,
          user_id: userId,
          total_price: Math.floor(Number.parseInt(req.query.vnp_Amount) / 100),
          status: 'completed'
      };

      const transaction = await Transaction.create(transactionData);
      const userCur = await User.findOne({ user_id: userId });
      // Cập nhật thông tin người dùng
      const user = await User.findOneAndUpdate(
        { user_id: userId },
        {
          money:
            Math.floor(Number.parseInt(req.query.vnp_Amount) / 100) + Number.parseInt(userCur.money ?? 0),
        });

      if (!user) {
        return res.status(404).json({
          message: "Không tìm thấy người dùng",
        });
      }

      res.redirect("http://localhost:5173/user/profile");
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  } else {
    try {
      const order = await Order.findOne(
        { order_id: req.query.vnp_TxnRef });
      if (!order) {
        return res.status(404).json({
          message: "Order Not Found",
        });
      }
      
      const keys = order.games.reduce((acc, game) => {
        return acc.concat(game.key_ids.map(key => key.key_id));
      }, []);

      if (req.query.vnp_TransactionStatus !== '00') {
        
        await Order.findOneAndUpdate(
          { order_id: req.query.vnp_TxnRef },
          {
            status: "payment_failed",
          }
        );

        for (const key of keys) {
          await Key.findOneAndUpdate(
            { key_id: key },
            {
              is_used: false,
              used_at: undefined,
              user_id: "",
            }
          );
        }
        return res.redirect(
          `http://localhost:5173/vnpay/fall?order_id=${req.query.vnp_TxnRef}&amount=${req.query.vnp_Amount}`
        );
      }
      await Order.findOneAndUpdate(
        { order_id: req.query.vnp_TxnRef },
        {
          status: "completed",
        }
      );

      for (const key of keys) {
        await Key.findOneAndUpdate(
          { key_id: key },
          {
            is_used: true,
            used_at: new Date()
          }
        );
      }

      res.redirect(
        `http://localhost:5173/vnpay/success?order_id=${req.query.vnp_TxnRef}&amount=${req.query.vnp_Amount}`
      );
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }
};
