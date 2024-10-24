import Order_Detail from "../models/order_detail";

 // GET / order_details
 export const getAllOrder_Details = async (req, res) => {
    try {
        const order_details = await Order_Detail.find();
        return res.status(200).json({
            message: "Get All Order_Details Done",
            data: order_details,
        });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

 // GET /order_details/ : id
 export const getOrder_DetailDetail = async (req, res) => {
    try {
        const order_detail = await Order_Detail.findOne({order_detail_id:req.params.id});
        if (!order_detail) {
            return res.status(404).json({
                message: "Order_Detail Not Found",
            });
        }
        return res.status(200).json({
            message: "Get Order_Detail Detail Done",
            data: order_detail,
        });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

 // POST /order_details
 export const addOrder_Detail = async (req, res) => {
    console.log(req.body);
    try {
        const order_detail = await Order_Detail.create(req.body);
        return res.status(201).json({
            message: "Create Order_Detail Done",
            data: order_detail,   
        });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

 // PUT / order_details / :id

 export const updateOrder_Detail = async (req, res) => {
    try {
        const order_detail = await Order_Detail.findOneAndUpdate({order_detail_id:req.params.id}, req.body, {
            new: true,
        });
        if (!order_detail) {
            return res.status(404).json({
                message: "Order_Detail Not Found",
            });
        }
        return res.status(200).json({
            message: "Update Order_Detail Done",
            data: order_detail,
        });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

 // DELETE / order_details / :id

export const removeOrder_Detail = async (req, res) => {
    try {
        const order_detail = await Order_Detail.findOneAndDelete({order_detail_id:req.params.id});
        if (!order_detail) {
            return res.status(404).json({
                message: "Order_Detail Not Found",
            });
        }
        return res.status(200).json({
            message: "Delete Order_Detail Done",
            data: order_detail,
        });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};


