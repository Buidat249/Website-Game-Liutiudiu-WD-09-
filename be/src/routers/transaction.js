import { Router } from "express";
import { addTransaction, getTransactiondetail, getTransactions, removeTransaction } from "../controllers/transaction";

const router = Router();


router.get(`/transactions`, getTransactions);
router.get(`/transactions/:userId`, getTransactiondetail);
router.post(`/transactions`, addTransaction);
router.delete(`/transactions/:id`, removeTransaction);
export default router;
