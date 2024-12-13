import { Router } from "express";
import { addPay, getAllPays, getPayDetail, removePay, updatePay } from "../controllers/pay";


const router = Router();

router.get(`/pays`, getAllPays);
router.get(`/pays/:id`, getPayDetail);
router.post(`/pays`, addPay);
router.put(`/pays/:id`, updatePay);
router.delete(`/pays/:id`, removePay);
export default router;
