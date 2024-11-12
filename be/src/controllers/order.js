import Order from "../models/order"

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
        const order = await Order.findOne({order_id:req.params.id});
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
    console.log(req.body);
    try {
        const lastOrder = await Game.findOne({}, {}, { sort: { order_id: -1 } });
        const newOrderId = lastOrder ? lastOrder.order_id + 1 : 1;

        const orderData = {
            game_id: newOrderId,
            ...req.body // Chứa các trường khác từ frontend
        };

        const order = await Order.create(orderData);
        return res.status(201).json({
            message: "Create Order Done",
            data: order,   
        });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

// PUT / orders / :id

export const updateOrder = async (req, res) => {
    try {
        const order = await Order.findOneAndUpdate({order_id:req.params.id}, req.body, {
            new: true,
        });
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
        const order = await Order.findOneAndDelete({order_id:req.params.id});
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
