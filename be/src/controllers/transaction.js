import Transaction from "../models/transaction";

export const addTransaction = async (req, res) => {
    console.log("Received data:", req.body); 
    try {
        const lastTransaction = await Transaction.findOne({}, {}, { sort: { transaction_id: -1 } });
        const newTransactionId = lastTransaction ? lastTransaction.transaction_id + 1 : 1;

        const transactionData = {
            transaction_id: newTransactionId,
            ...req.body,
            status: 'pending'
        };

        const transaction = await Transaction.create(transactionData);
        return res.status(201).json({
            message: "Create pay Done",
            data: transaction,
        });
    } catch (error) {
        console.error("Error creating pay:", error); // Ghi log lỗi
        return res.status(500).json({ message: error.message });
    }
};
export const getTransactions = async (req, res) => {
    try {
        const transaction = await Transaction.find();
        return res.status(200).json({
            message: "Get All transaction Done",
            data: transaction,
        });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};


 // GET /categories/ : id
export const getTransactiondetail = async (req, res) => {
    try {

        const userId = req.params.userId;

        const transaction = await Transaction.find({ user_id: userId });
        if (transaction.length === 0) {
            return res.status(200).json({ data: [] }); // Trả về mảng rỗng nếu không có đơn hàng
          }
          
        return res.status(200).json({
            message: "Get transaction Detail Done",
            data: transaction,
        });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const removeTransaction = async (req, res) => {
    try {
        const transaction = await Transaction.findOneAndDelete({transaction_id:req.params.id});
        if (!transaction) {
            return res.status(404).json({
                message: "transaction Not Found",
            });
        }
        return res.status(200).json({
            message: "Delete transaction Done",
            data: transaction,
        });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};