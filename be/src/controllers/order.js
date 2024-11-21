import Order from "../models/order";

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

// GET /orders/ : id
export const getOrderDetail = async (req, res) => {
  try {
    const order = await Order.findOne({ order_id: req.params.id });
    if (!order) {
      return res.status(404).json({
        message: "Order Not Found",
      });
    }
    return res.status(200).json({
      message: "Get Order Detail Done",
      data: order,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// POST /orders
export const addOrder = async (req, res) => {
  try {
    const { user_id, games, total_price } = req.body;

    // Log thông tin nhận từ frontend
    console.log("Order Data Received:", req.body);

    // Kiểm tra dữ liệu bắt buộc
    if (
      !user_id ||
      !Array.isArray(games) ||
      games.length === 0 ||
      total_price === undefined ||
      total_price === null
    ) {
      return res.status(400).json({
        message: "Invalid data. Please check user_id, games, and total_price.",
        data: req.body, // Gửi lại dữ liệu để debug
      });
    }

    // Kiểm tra các trường trong games (cho phép giá trị 0)
    for (const game of games) {
      if (
        !game.name ||
        game.discount === undefined ||
        game.price === undefined ||
        game.final_price === undefined
      ) {
        return res.status(400).json({
          message: "Missing required fields in game data.",
        });
      }

      // Kiểm tra giá trị của price, discount, và final_price (cho phép bằng 0)
      if (game.price < 0 || game.final_price < 0) {
        return res.status(400).json({
          message: "Price and final price cannot be negative.",
        });
      }

      if (game.discount < 0 || game.discount > 100) {
        return res.status(400).json({
          message: "Discount must be between 0 and 100.",
        });
      }
    }

    // Tạo đơn hàng mới
    const lastOrder = await Order.findOne({}, {}, { sort: { order_id: -1 } });
    const newOrderId =
      lastOrder && lastOrder.order_id ? lastOrder.order_id + 1 : 1;

    const order = await Order.create({
      order_id: newOrderId,
      user_id,
      games,
      total_price,
    });

    res.status(201).json({
      message: "Order created successfully",
      data: order,
    });
  } catch (error) {
    console.error("Error creating order:", error);
    res
      .status(500)
      .json({ message: "An error occurred while creating the order." });
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
