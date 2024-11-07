import { Router } from "express";
import { addOrder, getAllOrders, getOrderDetail, removeOrder, updateOrder } from "../controllers/order";


const router = Router();


router.get(`/orders`, getAllOrders);
router.get(`/orders/:id`, getOrderDetail);
router.post(`/orders`, addOrder);
router.put(`/orders/:id`, updateOrder);
router.delete(`/orders/:id`, removeOrder);
export default router;
