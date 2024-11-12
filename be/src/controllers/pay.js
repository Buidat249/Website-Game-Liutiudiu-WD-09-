import Pay from "../models/pay";

export const getAllPays = async (req, res) => {
  try {
    const pays = await Pay.find();
    return res.status(200).json({
      message: "Get All pays Done",
      data: pays,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getPayDetail = async (req, res) => {
    try {
        const pay = await Pay.findOne({pay_id:req.params.id});
        if (!pay) {
            return res.status(404).json({
                message: "pay Not Found",
            });
        }
        return res.status(200).json({
            message: "Get pay Detail Done",
            data: pay,
        });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const addPay = async (req, res) => {
    console.log("Received data:", req.body); 
    try {
        const lastPay = await Pay.findOne({}, {}, { sort: { pay_id: -1 } });
        const newPayId = lastPay ? lastPay.pay_id + 1 : 1;

        const payData = {
            pay_id: newPayId,
            ...req.body // Chứa các trường khác từ frontend
        };

        const pay = await Pay.create(payData);
        return res.status(201).json({
            message: "Create pay Done",
            data: pay,
        });
    } catch (error) {
        console.error("Error creating pay:", error); // Ghi log lỗi
        return res.status(500).json({ message: error.message });
    }
};

export const updatePay = async (req, res) => {
    try {
        const pay = await Pay.findOneAndUpdate({pay_id:req.params.id}, req.body, {
            new: true,
        });
        if (!pay) {
            return res.status(404).json({
                message: "Pay Not Found",
            });
        }
        return res.status(200).json({
            message: "Update Pay Done",
            data: pay,
        });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const removePay = async (req, res) => {
    try {
        const pay = await Pay.findOneAndDelete({pay_id:req.params.id});
        if (!pay) {
            return res.status(404).json({
                message: "Pay Not Found",
            });
        }
        return res.status(200).json({
            message: "Delete Pay Done",
            data: pay,
        });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};


