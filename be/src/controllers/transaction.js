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