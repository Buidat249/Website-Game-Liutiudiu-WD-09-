import { Router } from "express";
import { addPayment_method, getAllPayment_methods, getPayment_methodDetail, removePayment_method, updatePayment_method } from "../controllers/payment_method";



const router = Router();

router.get(`/payment_methods`, getAllPayment_methods);
router.get(`/payment_methods/:id`, getPayment_methodDetail);
router.post(`/payment_methods`, addPayment_method);
router.put(`/payment_methods/:id`, updatePayment_method);
router.delete(`/payment_methods/:id`, removePayment_method);

export default router;
