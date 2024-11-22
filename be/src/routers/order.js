import { Router } from "express";
import { addOrder, getAllOrders, getOrderDetail, getOrderStatus, removeOrder, updateOrder } from "../controllers/order";


const router = Router();


router.get(`/orders`, getAllOrders);
router.get(`/orders/:id`, getOrderDetail);
router.get(`/orders/status/:id`, getOrderStatus);
router.post(`/orders`, addOrder);
router.put(`/orders/:id`, updateOrder);
router.delete(`/orders/:id`, removeOrder);
export default router;
