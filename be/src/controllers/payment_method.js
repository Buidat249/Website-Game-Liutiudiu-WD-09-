import Payment_Method from "../models/payment_method";


 // GET / payment_methods
 export const getAllPayment_methods = async (req, res) => {
    try {
        const payment_methods = await Payment_Method.find();
        return res.status(200).json({
            message: "Get All Payment_Methods Done",
            data: payment_methods,
        });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};


 // GET /payment_methods/ : id
 export const getPayment_methodDetail = async (req, res) => {
    try {
        const payment_method = await Payment_Method.findOne({payment_method_id : req.params.id});
        if (!payment_method) {
            return res.status(404).json({
                message: "Payment_Method Not Found",
            });
        }
        return res.status(200).json({
            message: "Get Payment_Method Detail Done",
            data: payment_method,
        });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};


// POST /payment_methods
export const addPayment_method = async (req, res) => {
    console.log(req.body);
    try {
        const payment_method = await Payment_Method.create(req.body);
        return res.status(201).json({
            message: "Create Payment_method Done",
            data: payment_method,   
        });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};



// PUT / payment_methods / :id

export const updatePayment_method = async (req, res) => {
    try {
        const payment_method = await Payment_Method.findOneAndUpdate({payment_method_id : req.params.id}, req.body, {
            new: true,
        });
        if (!payment_method) {
            return res.status(404).json({
                message: "Payment_method Not Found",
            });
        }
        return res.status(200).json({
            message: "Update Payment_method Done",
            data: payment_method,
        });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};


// DELETE / payment_methods / :id

export const removePayment_method = async (req, res) => {
    try {
        const payment_method = await Payment_Method.findOneAndDelete({payment_method_id : req.params.id});
        if (!payment_method) {
            return res.status(404).json({
                message: "Payment_method Not Found",
            });
        }
        return res.status(200).json({
            message: "Delete Payment_method Done",
            data: payment_method,
        });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};
